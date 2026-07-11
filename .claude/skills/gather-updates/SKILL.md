---
name: gather-updates
description: Sweep all sources of the Los Gallardos–Bédar fire (satellite scripts, X via the user's Chrome, press live blogs, official pages) and produce a verified "parte de novedades" WITHOUT touching the dashboard. Use when the user asks "qué ha pasado", "actualiza la información", "novedades del incendio", "sweep the sources", or before any dashboard update.
---

# Gather Updates — el barrido de fuentes

Produce un **parte de novedades**: hechos nuevos con fuente, hora y nivel de confianza. NO modifica `data/incident.json` ni ningún HTML — aplicar cambios es trabajo de `/update-dashboard`.

## Antes de empezar

Leer `data/incident.json` (meta.updatedAt + últimos eventos del timeline) para saber qué es YA conocido. Todo el barrido se contrasta contra eso.

## Fuentes, en orden

### 1. Satélites (deterministas, sin juicio — siempre primero)

```bash
node scripts/fetch-firms.mjs        # focos de calor 24 h
node scripts/fetch-copernicus.mjs   # ¿hay producto DEL/MON más nuevo?
```

Interpretar: ¿focos <6 h? ¿dónde respecto al perímetro (dentro = rescoldos, fuera = avance)? ¿Copernicus publicó una monitorización nueva? Si los scripts cambiaron ficheros, anotarlo como hecho ("nueva capa disponible").

### 2. X — solo con la sesión del usuario en Chrome

Requiere que el usuario esté logueado en X en Chrome. Si la página devuelve esqueletos vacíos o "X / Error", avisar y saltar (no insistir más de 2 veces).

- **Búsqueda live del hashtag** (rinde más que los perfiles): `https://x.com/search?q=%23IFLosGallardos&f=live`
- Perfiles oficiales: `@Plan_INFOCA`, `@E112Andalucia`, `@UMEgob`, `@AEMET_Andalucia`

Extracción (javascript_tool sobre la pestaña):
```js
Array.from(document.querySelectorAll('article')).slice(0, 12).map(a => {
  const t = a.querySelector('[data-testid="tweetText"]');
  const time = a.querySelector('time');
  const link = time?.closest('a');
  const user = a.querySelector('[data-testid="User-Name"]');
  return { user: user?.textContent.split('@')[1]?.split('·')[0],
           time: time?.getAttribute('datetime'),
           url: link?.href,
           text: t?.textContent.slice(0, 500) };
})
```

**Solo cuentas oficiales cuentan como hechos.** Analistas/particulares (ej. detecciones satelitales de terceros) valen como pista para contrastar, nunca como hecho directo. Capturar la URL del tuit concreto (el `time` → `closest('a')`) para citarla como fuente.

### 3. Live blogs de prensa (WebFetch)

Los directos conocidos (URLs estables, se actualizan in situ):
- La Voz de Almería: `lavozdealmeria.com/almeria/sucesos/597610/...`
- El Español: `elespanol.com/espana/andalucia/20260710/incendio-forestal-gallardos...`
- elDiario.es: `eldiario.es/andalucia/ultima-hora-incendio-gallardos...`
- Libertad Digital, COPE, OKDiario (ver sources ya citadas en el timeline del JSON)

Prompt de extracción: pedir SOLO actualizaciones posteriores a `meta.updatedAt`, con timestamp de cada una.

### 4. WebSearch de cierre

`incendio Los Gallardos última hora` + variantes con la fecha de hoy. Busca lo que los directos no tengan (declaraciones, cifras nuevas, páginas oficiales nuevas).

## Formato de salida — el parte de novedades

Para cada hecho:

| Campo | Valor |
|---|---|
| Hecho | una frase, con cifras exactas |
| Hora | timestamp del hecho (NUNCA futuro; impreciso → "~" ) |
| Fuente | nombre + URL (tuit concreto, no perfil, si viene de X) |
| Estado | **NUEVO** / ya conocido / **CONTRADICE** a X del timeline |
| Confianza | oficial / prensa citando oficial / prensa / pista sin confirmar |

Cerrar con: (a) qué cambia para el usuario (flanco este, A-7, visto bueno del 112), (b) contradicciones abiertas, (c) recomendación de qué aplicar con `/update-dashboard`.

## Reglas

- Cifras que fluctúan entre fuentes: reportar ambas con sus fuentes, no elegir en silencio.
- Nada de este barrido toca el dashboard. Ni "solo esta cifra pequeña".
- Si una fuente no carga tras 2 intentos, anotarla como no consultada y seguir.
