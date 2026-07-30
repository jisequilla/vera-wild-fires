---
name: gather-updates
description: Sweep all sources of the Los Gallardos–Bédar fire (satellite scripts, RSS, X official profiles via fetch-x.mjs, press live blogs, official pages, Valle del Este watch) and produce a verified "parte de novedades" WITHOUT touching the dashboard. Use when the user asks "qué ha pasado", "actualiza la información", "novedades del incendio", "sweep the sources", or before any dashboard update.
---

# Gather Updates — el barrido de fuentes

Produce un **parte de novedades**: hechos nuevos con fuente, hora y nivel de confianza. NO modifica el bundle ni el panel — aplicar es trabajo de `/update-dashboard`. La separación es deliberada: entre ambas vive la verificación.

## Antes de empezar

1. `date` — la hora real manda (nada de timestamps futuros ni de "hoy" asumido).
2. Leer `data/incident.json` (meta.updatedAt + últimos eventos) — qué es YA conocido; todo se contrasta contra eso.

## El registro de fuentes vive en el bundle

**`knowledge/incident-okf/directory/` es el registro de fuentes constatadas** — no esta skill. Leer su `index.md` al empezar: `official-account`/`official-page` son las fuentes de tier `oficial`; los conceptos `media-source` documentan el **historial contrastado** de cada medio y el tier con que citarlo. Cuando un medio nuevo demuestre valor (o falle), eso es conocimiento: proponer en el parte crearle/actualizarle su concepto `media-source` — el registro se gana, no se hereda. Las URLs de abajo son arranque; ante discrepancia, manda el bundle.

## Fuentes, en orden

### 1. Satélites y RSS (deterministas, sin juicio — siempre primero)

```bash
node scripts/fetch-firms.mjs        # focos de calor 24 h
node scripts/fetch-copernicus.mjs   # ¿hay producto DEL/MON más nuevo?
node scripts/fetch-news.mjs         # titulares NUEVOS vía RSS (Google News + feeds locales)
node scripts/fetch-x.mjs            # tuits NUEVOS de los perfiles oficiales
```

Interpretar: ¿focos <6 h? ¿dónde respecto al perímetro Copernicus (dentro = rescoldos; fuera = avance)? ¿horas sin detecciones (señal de mejora)? ¿producto de monitorización nuevo? Los fetch reescriben `layers.json` aunque no haya novedad — si las capas no cambiaron, no es un hecho.

`fetch-news.mjs` emite SOLO titulares no vistos en ciclos anteriores (dedupe en `data/news/`, gitignored — plano efímero del parte, no del panel; config en el bloque `news` de `incident.config.json`). Cada titular es una PISTA con fuente y hora: los relevantes se abren y contrastan como cualquier hallazgo — el RSS adelanta a los buscadores, no sustituye la verificación.

**Leer sus avisos de techo, no solo su lista.** Google News RSS corta a **100 items por consulta y no lo dice**. El script lo detecta y avisa en dos niveles: `⚠` techo alcanzado pero la ventana sigue cubierta (margen estrecho, conviene afinar la consulta), y `✗` recorte DENTRO de la ventana — **hay titulares que no se han visto** y el recuento de ese ciclo es un subconjunto, no el total. Medido el 30-jul: una consulta sobre un incendio grande devuelve 91 titulares en 24 h contra el tope de 100; una sobre este incendio, 22. Estrechar la consulta ayuda pero no libra del techo a esa escala.

### 2. X — perfiles oficiales, vía `fetch-x.mjs` (paso 1)

`fetch-x.mjs` ya trae los tuits nuevos de `@Plan_INFOCA` y `@E112Andalucia` con permalink y hora, deduplicados entre ciclos (`data/x/`, gitignored; roster en el bloque `x` de `incident.config.json`). Descarta retuits: el autor del item es la cuenta retuiteada, y atribuirlo al perfil oficial falsearía la fuente.

**Leer el código de salida, no solo la lista** — un barrido vacío no es lo mismo que un barrido roto:

| Exit | Significa | Qué va al parte |
|---|---|---|
| 0 | barrido hecho | los tuits nuevos (o "sin novedad", sesión viva) |
| 2 | credenciales ausentes/caducadas | **"X no consultada"** — nunca "sin novedades" |
| 5 | capacidad upstream desaparecida | **"X no consultada"** + avisar: el endpoint murió, como murió `search` |
| 3 / 4 | formato roto / backend ausente | **"X no consultada"** + diagnosticar |

**La capa ciudadana no está cubierta.** La búsqueda por hashtag (`twitter search`) devuelve 404 desde el 29-jul-2026 — ver `lessons/el-hashtag-que-dejo-de-existir`. Se pierden prensa local, vecinos y avisos de carretera, así que **el parte debe declarar esa ausencia**: el silencio de las cuentas oficiales no es silencio del mundo. Compensar con RSS, live blogs y WebSearch. El script sondea `search` en cada ciclo: si algún día anuncia que revive, recuperar el hashtag (`x.queries` sigue en la config).

Tuit truncado y relevante → abrir su URL y extraer el texto completo antes de citarlo.

### 3. Vigilancia específica: Valle del Este y el retorno

El interés operativo del autor. Barrer expresamente:

- **Términos**: "Valle del Este", "Vera" + retorno/regreso/desalojados, "urbanización", "vuelta a casa" — en WebSearch, en los directos y en el RSS. (El hashtag live era el mejor canal para esto y ya no está: es justo la búsqueda que más se resiente.)
- **Ayuntamiento de Vera** (`directory/ayto-vera-facebook`): el canal que anunciaría avisos específicos del municipio. Facebook no es legible sin sesión — navegarlo en el Chrome del usuario (`facebook.com/aytovera`).
- **Señales que buscan**: autorizaciones/protocolos de retorno, menciones a urbanizaciones de Vera, servicios municipales para evacuados, cambios en la doctrina "solo acompañado".
- Nada encontrado también es dato: "sin novedades específicas de VdE" va al parte. Los hallazgos alimentan `state/zona-valle-del-este`.

### 4. Live blogs de prensa (WebFetch)

Los directos con historial en `directory/` (media-source) — hoy: La Voz de Almería (ojo: 404 intermitentes, buscar su directo del día), El Español, Telecinco, elDiario (cerró su directo el 11 jul — si reabre, anotarlo). Prompt: SOLO actualizaciones posteriores a `meta.updatedAt`, con el timestamp de cada una.

**Sitio que WebFetch no puede abrir** (Onda Cero, Diario de Almería, 404 raros de La Voz): usar `agent-browser` por Bash — `agent-browser open "<url>"`, `agent-browser get text body` (o `snapshot` para estructura). Corre headless con perfil propio, sin tocar el Chrome del usuario.

### 5. WebSearch de cierre

`incendio Los Gallardos última hora` + variantes con la fecha real de hoy. Busca lo que los directos no tengan.

## Cómo categorizar lo encontrado

Cada hallazgo se clasifica en el parte con el destino que tendría (lo aplica `/update-dashboard`):

| Hallazgo | Destino futuro | Tier |
|---|---|---|
| Suceso fechado | `events/` (event) | según fuente |
| Cifra que cambia | `state/<metrica>` + fila de fluctuación | según fuente |
| Cambio de situación/zona/carretera | `state/…` (el viejo → superseded) | según fuente |
| Previsión meteo | `state/` (forecast, supersede) | prensa-oficial |
| Dos fuentes que chocan | `findings/` (contradiction) — reportar AMBAS, no elegir | — |
| Rumor/analista/particular | pista — contrastar, jamás hecho directo | pista |
| Fuente nueva que demostró valor | `directory/` (media-source con historial) | observacion |
| Error/decisión narrable del propio barrido | `lessons/` | observacion |

**Tiers** (eje `confidence` del perfil): `oficial` (cuenta/organismo oficial, tuit concreto) · `prensa-oficial` (medio relatando fuente oficial — incluye medios públicos tipo Canal Sur) · `prensa` (elaboración propia del medio) · `observacion` (sentidos/valoración del autor o nuestra) · `estimacion` (aproximación propia) · `pista` (sin confirmar).

## Formato de salida — el parte de novedades

Tabla: **Hecho** (una frase, cifras exactas) · **Hora** (del hecho; imprecisa → `~`) · **Fuente** (nombre + URL concreta) · **Estado** (NUEVO / ya conocido / MATIZA / CONTRADICE / ACTUALIZA) · **Confianza** (tier).

Cerrar con: **(a)** qué cambia para el autor (Valle del Este, flanco este, A-7, visto bueno del 112), **(b)** contradicciones abiertas, **(c)** recomendación concreta para `/update-dashboard` — incluido qué descartar y por qué.

## Reglas

- Cifras que fluctúan entre fuentes: reportar todas con sus fuentes.
- Nada de este barrido toca el bundle ni el panel. Ni "solo esta cifra pequeña".
- Fuente que no carga tras 2 intentos → "no consultada" en el parte, y seguir.
- Titulares ambiguos ("parcialmente estabilizado") no se aplican hasta que la palabra la use la autoridad — patrón EMSR671: abrir y confirmar antes de citar.
