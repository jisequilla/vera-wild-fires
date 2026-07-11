---
name: gather-updates
description: Sweep all sources of the Los Gallardos–Bédar fire (satellite scripts, X via the user's Chrome, press live blogs, official pages, Valle del Este watch) and produce a verified "parte de novedades" WITHOUT touching the dashboard. Use when the user asks "qué ha pasado", "actualiza la información", "novedades del incendio", "sweep the sources", or before any dashboard update.
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
```

Interpretar: ¿focos <6 h? ¿dónde respecto al perímetro Copernicus (dentro = rescoldos; fuera = avance)? ¿horas sin detecciones (señal de mejora)? ¿producto de monitorización nuevo? Los fetch reescriben `layers.json` aunque no haya novedad — si las capas no cambiaron, no es un hecho.

`fetch-news.mjs` emite SOLO titulares no vistos en ciclos anteriores (dedupe en `data/news/`, gitignored — plano efímero del parte, no del panel; config en el bloque `news` de `incident.config.json`). Cada titular es una PISTA con fuente y hora: los relevantes se abren y contrastan como cualquier hallazgo — el RSS adelanta a los buscadores, no sustituye la verificación.

### 2. X — solo con la sesión del usuario en Chrome

Si devuelve esqueletos vacíos o "X / Error": avisar y saltar (máximo 2 intentos).

- **Búsqueda live del hashtag** (rinde más que los perfiles): `https://x.com/search?q=%23IFLosGallardos&f=live`
- Perfiles oficiales del bundle: `@Plan_INFOCA`, `@E112Andalucia`, `@antoniosanz`, `@UMEgob` (+ los que directory/ haya sumado)

Extracción (javascript_tool sobre la pestaña):
```js
Array.from(document.querySelectorAll('article')).slice(0, 14).map(a => {
  const t = a.querySelector('[data-testid="tweetText"]');
  const time = a.querySelector('time');
  const link = time?.closest('a');
  const user = a.querySelector('[data-testid="User-Name"]');
  return { user: user?.textContent.split('@')[1]?.split('·')[0],
           time: time?.getAttribute('datetime'), url: link?.href,
           text: t?.textContent.slice(0, 350) };
})
```

Tuit truncado y relevante → abrir su URL y extraer el texto completo antes de citarlo. Capturar SIEMPRE la URL del tuit concreto (el `time` → `closest('a')`).

### 3. Vigilancia específica: Valle del Este y el retorno

El interés operativo del autor. Barrer expresamente:

- **Términos**: "Valle del Este", "Vera" + retorno/regreso/desalojados, "urbanización", "vuelta a casa" — en el hashtag live, en WebSearch y en los directos.
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
