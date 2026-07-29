# Handoff — la ingesta de X está caída (y la alternativa que sí funciona)

Diagnóstico hecho desde la sesión de `dotfiles`. Nada de este repo se ha modificado:
`fetch-x.mjs`, `incident.config.json` y `twitter-cli` siguen exactamente como estaban.
Este documento es la entrega del hallazgo, no el arreglo.

## Titular

`node scripts/fetch-x.mjs` (barrido real) **no puede funcionar hoy**, con credenciales
o sin ellas. El comando `twitter search` —el único que usa el script— devuelve HTTP 404
contra la API de X. No es un problema de configuración de este repo.

El paso pendiente que quedó anotado (crear `~/.config/vera-fires/x.env` con
`TWITTER_AUTH_TOKEN` y `TWITTER_CT0`) **es correcto pero no desbloquea nada**: la sesión
con la que se hicieron estas pruebas ya está autenticada —vía cookies de Chrome— y
`search` devuelve 404 igualmente. Si se crea el fichero esperando que arregle el barrido,
se perderá el tiempo buscando en el sitio equivocado.

## Causa raíz

X migró su cliente web. La portada de `x.com` ya no sirve el bundle
`responsive-web/client-web/ondemand.s.<hash>a.js`; ahora sirve
`abs.twimg.com/x-web/x-web/entry-client-logged-out-*.js`. La cadena `ondemand`
aparece **cero veces** en el HTML.

La librería `x_client_transaction` deriva la cabecera `X-Client-Transaction-Id` leyendo
índices de ese fichero `ondemand.s`. Al no existir, su regex no casa y revienta en
`x_client_transaction/utils.py:59` (`.search(...)` devuelve `None`, `.group(1)` explota).
De ahí el aviso que aparece en cada invocación:

```
WARNING twitter_cli.client: Failed to init ClientTransaction: 'NoneType' object has no attribute 'group'
```

`twitter-cli` degrada con elegancia (`client.py:1128` protege el uso), así que no casca:
simplemente **omite la cabecera**. Los endpoints que no la exigen siguen respondiendo;
los que sí la exigen devuelven 404.

## Qué se descartó (para no volver a investigarlo)

- **No son las credenciales.** `twitter status` → `authenticated: true` como `@jisequilla`.
- **No es un queryId caducado.** `graphql.py:36` tiene uno viejo para `SearchTimeline`
  (`MJpyQGqgklrVl_0X9gNy3A`), pero el auto-refresco **funciona**: reintenta al recibir 404,
  consulta la fuente comunitaria y resuelve el vigente (`Yw6L66Pw54NHKuq4Dp7b4Q`).
  Con el ID correcto **también da 404**.
- **No es la versión.** `twitter-cli` 0.8.5 es la última publicada (17/03/2026). El pin
  a 0.8.5 fue la decisión correcta y despinchar no arregla nada.
- **No hay parche upstream a la vista.** `x-client-transaction-id` va por 0.0.1, publicada
  en abril de 2025. Un único release frente a un frontend que se ha reescrito.

## Radio de impacto medido

| Comando | Estado |
|---|---|
| `whoami`, `feed`, `user`, `user-posts`, `bookmarks` | funcionan |
| `search` | **404** |
| REST 1.1 heredado (`verify_credentials`, `settings.json`) | **404** |

Que el ID correcto también falle, que los REST heredados fallen, y que el resto de
GraphQL siga vivo, apunta a la cabecera ausente como causa del 404. **Es la hipótesis
más sostenida por la evidencia, no un hecho probado**: probarlo exigiría generar una
cabecera válida contra el bundle nuevo, que es justamente lo que nadie sabe hacer ahora.

## Dos bugs del script que este fallo destapa

1. **El 404 se reporta como "salida malformada" (exit 3).** El backend emite
   `{ok:false, error:{code:"not_found", message:"…(HTTP 404)…"}}`. En `fetch-x.mjs:89`,
   `isAuth()` busca `auth|cookie|login|credential|401|403`; ninguno casa con
   `not_found` ni con `404`, así que cae en `die(3, …)`. La salida no está malformada:
   el endpoint ya no existe. Es la misma clase de error de clasificación que ya se
   corrigió una vez (el orden payload-antes-que-status), en una categoría nueva:
   *backend vivo y autenticado, pero capacidad desaparecida*. Merece su propio código.

2. **La consulta de control apunta a una cuenta muerta.** `controlQuery` es
   `from:112andalucia`, y esa cuenta existe pero tiene **0 tweets** y 124 seguidores.
   No es el 112 real. Aunque `search` funcionase, el control devolvería 0 y dispararía
   el falso veredicto "sesión muerta" de `fetch-x.mjs:157`. Las cuentas reales son:

   | Handle | Quién es | Tweets |
   |---|---|---|
   | `E112Andalucia` | EMA 112 | 57.388 |
   | `Plan_INFOCA` | EMA INFOCA | 40.913 |
   | `112andalucia` | placeholder, 0 tweets | — |
   | `InfoINFOCA` | no existe | — |

Además: **`--dry` sigue pasando en verde**, porque usa el fixture y no toca la red.
El camino de test está sano mientras la realidad está rota. No tomar el `--dry` como
señal de que la ingesta funciona.

## La alternativa verificada: perfiles oficiales en vez de hashtag

`user-posts` funciona y devuelve **exactamente el esquema que `validate()` ya espera**
(`id`, `author.screenName`, `text`, `createdAt`/`createdAtISO`). Comprobado en vivo:

```
Plan_INFOCA    2026-07-29T16:15Z  🔴 ACTUALIZACIÓN #IFBélmez, #Cordoba, en paraje Presa Sierra Boyera
Plan_INFOCA    2026-07-29T15:27Z  🔴 DECLARADO | Incendio en #Bélmez, #Cordoba
E112Andalucia  2026-07-29T16:50Z  📢La #EMA pide vigilar a la población más vulnerable…
```

Mismo convenio `#IF<Nombre>` que usa `incident.config.json` para `#IFLosGallardos`.
Formato estructurado, con hora, de la fuente que la invariante 1 declara soberana.

### Esto contradice a `CLAUDE.md:35` — y hay que resolverlo, no ignorarlo

La línea dice: *"La búsqueda live del hashtag `#IFLosGallardos` rinde más que los perfiles."*
Esa observación fue real y se ganó con trabajo. Dos matices, ambos honestos:

- Se escribió **cuando `search` funcionaba**. Hoy la comparación no existe: los perfiles
  no son la peor opción, son la única opción operativa.
- **Se pierde alcance de verdad.** El hashtag captura prensa local, vecinos, avisos de
  carretera y observación ciudadana que las cuentas oficiales no publican. Para alguien
  auto-evacuado, ese ruido a veces contiene la señal que llega antes. No es un cambio
  gratis: se cambia cobertura por fiabilidad.

Lo que sí juega a favor del cambio: las invariantes 1 y 3 ya priman fuente oficial con
hora y URL, y el tier system iba a degradar el ruido del hashtag de todas formas.

Si se adopta, **`CLAUDE.md:35` debe reescribirse**, o quedará una creencia caducada
guiando decisiones futuras.

## Trabajo concreto pendiente

1. Mover el roster de cuentas a `incident.config.json` bajo `x` (p. ej. `accounts:
   ["Plan_INFOCA", "E112Andalucia"]`), conservando `queries` para cuando `search` reviva.
2. En `runQuery`, cambiar `['search', query, '-t','Latest', …]` por
   `['user-posts', handle, '--max', …]`. `validate()` **no se toca**: el esquema ya encaja.
3. Arreglar `controlQuery` → `Plan_INFOCA` (o el equivalente con `user-posts`).
4. Añadir código de salida para *capacidad upstream ausente*, distinto del 3.
5. Filtrar retuits si el tier system lo requiere: el timeline de `E112Andalucia` mezcla
   RTs (apareció `@antoniosanz` en la muestra) y `validate()` atribuiría el item al autor
   retuiteado. El payload trae `isRetweet`.
6. Regenerar el fixture `scripts/fixtures/x-search.json` con salida real de `user-posts`,
   o el `--dry` seguirá validando un formato que ya no se pide.

**Sin verificar** (no había fichero de credenciales para probarlo): que `user-posts`
funcione dentro de la jaula de `makeCage()` con `TWITTER_AUTH_TOKEN`/`TWITTER_CT0` por
entorno. Aquí se probó con las cookies de Chrome del usuario. Conviene confirmarlo antes
de dar el barrido por bueno.

## Reproducir en 30 segundos

```bash
twitter status                                   # authenticated: true
twitter search "devops" -t latest --max 3 --json # ok:false, HTTP 404
twitter user-posts Plan_INFOCA --max 3 --json    # ok:true, con datos
twitter -v search "x" --json 2>&1 | grep -i retry # el reintento con queryId vivo, y su 404
```

## Riesgo a medio plazo

`user-posts` funciona hoy porque su endpoint todavía no exige la cabecera de transacción,
no porque esté exento. Si X extiende esa exigencia, cae igual. Conviene que el script
reporte "upstream caído" de forma ruidosa e inequívoca: en un panel de emergencia, un
barrido vacío que parece "no hay novedad" es peor que un error.
