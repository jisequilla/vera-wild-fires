# Vera Wild Fires — Dashboard de emergencia

Panel de seguimiento del incendio de Los Gallardos–Bédar (Almería, jul 2026). El usuario lo vivió en primera persona: se auto-evacuó de Valle del Este a Vera Playa el 10 de julio y volvió a casa el 12. El fuego quedó **extinguido el 24 de julio** con 5.200 ha y 14 víctimas mortales, la última fallecida el 28 en el hospital. Esto no es un proyecto de juguete: el panel es público y su información puede influir en decisiones reales.

Lo que sigue abierto no es el fuego, sino el expediente — ayudas, investigación judicial del origen y exigencia de responsabilidades. El barrido ya no vigila un frente: sigue una historia.

## Reglas de oro (invariantes — no se negocian)

1. **El 112 manda.** El panel es informativo; nunca redactar contenido que suene a instrucción oficial de evacuar o volver. El disclaimer es permanente.
2. **Nunca inventar cifras ni coordenadas.** Si una fuente no lo confirma, se mantiene el valor anterior con su timestamp, o se marca como estimación. Coordenadas: geocodificar (Nominatim); si no existe, sin marcador.
3. **Cada hecho lleva fuente y hora.** Eventos con `sources[].url` al original. Distinguir dato oficial de observación propia (`"observation": true`).
4. **Prohibidos los timestamps futuros.** Comprobar la hora actual antes de fechar un evento (lección real: se estampó un evento a las 09:00 siendo las 05:44). Hora imprecisa → `~` o "madrugada/mañana".
5. **Verificar antes de enlazar.** Abrir y confirmar que un enlace/activación/producto corresponde a ESTE incidente (lección real: el buscador ofreció EMSR671, que era La Palma 2023; el correcto es EMSR892).
6. **Contradicciones entre fuentes se muestran, no se resuelven en silencio** (ej.: el evento "CONTROLADO" convive con el matiz de Moreno; prevalece la versión más cauta).

## Arquitectura (el conocimiento es el sustrato; el panel y la crónica, proyecciones)

- `knowledge/incident-okf/` — **Knowledge Bundle OKF, LA ÚNICA FUENTE DE VERDAD** (perfil: skill `okf-incident-reference`). Seis dominios (events, state, directory, geo, findings, lessons). Tras cambiar conceptos: `node scripts/gen-index.mjs` (índices) y `node scripts/project-dashboard.mjs` (regenera el panel).
- `data/incident.json` — **ARTEFACTO GENERADO por el proyector. NO editarlo a mano** (ni con el deprecado `update.mjs`): cualquier edición directa se pierde en la siguiente proyección. Actualizar el panel = editar/crear conceptos + proyectar.
- `data/layers.json` — plano-máquina de las capas satelitales (lo escriben los fetch; el proyector lo funde).
- `scripts/project-dashboard.mjs` — el proyector. La presentación se reparte en dos: lo **genérico del template** (colores, vocabularios de etiquetas, estructura de la leyenda) vive en su bloque `PRES`; lo **propio de este incidente** (órdenes de conceptos —`orders.stats`, `orders.banners`, `pageOrder`—, etiquetas de las stats, nombres y textos) vive en `incident.config.json`. Ante la duda: si menciona al incendio, es config.
- `index.html` / `map.html` — renderizan el JSON en runtime, polling 15 min. Solo se tocan para cambiar presentación/estructura.
- `data/copernicus/` + `data/firms/` — capas satelitales (GeoJSON locales, versionadas).
- `scripts/fetch-copernicus.mjs` / `fetch-firms.mjs` / `fetch-aemet.mjs` — bajan satélites y meteo a `layers.json`; después, proyectar. `fetch-news.mjs` — titulares nuevos vía RSS a `data/news/`; `fetch-x.mjs` — tuits nuevos de los perfiles oficiales a `data/x/` (ambos gitignored: planos efímeros para el parte de gather, no del panel). `notify-changes.mjs` alerta vía ntfy en el deploy (secrets `AEMET_API_KEY`/`NTFY_TOPIC`, opcionales).
- `originals/` — artefactos originales de la sesión de chat (no tocar).
- `blog/` — crónica en 7 capítulos, **cerrada** con el epílogo de la extinción (voz: ver skill update-blog). El material narrable vive en `lessons/`, con `chapter: N` cuando ya está incorporado.

## Flujo agéntico

`/gather-updates` (recolectar y contrastar, SIN tocar el panel) → revisión → `/update-dashboard` (aplicar hechos verificados como conceptos + proyectar) → `/update-blog` (capturar material para la crónica) → `/commit` (auditoría de coherencia + docs + push). La separación recolectar/aplicar es deliberada: entre ambas vive la verificación. **Todo commit pasa por `/commit`** — `node scripts/audit.mjs` es la puerta.

`/watch-loop` automatiza el ciclo en modo graduado (cada hora: barrido completo → auto-aplica SOLO hechos oficiales claros → lo ambiguo y todo cambio de estado queda en cola con ping ntfy; la luz verde del 112 siempre es ping). El cron vive solo en la sesión: tras cerrar Claude Code o reiniciar el Mac, re-armar con `/watch-loop`.

## Mecánica que ya nos mordió (no re-aprender)

- Tras editar HTML, el navegador puede servir caché: **hard reload** (`Cmd+Shift+R`) antes de diagnosticar "no funciona". El JSON se auto-cachebusts; el HTML no.
- X/Twitter se lee con `scripts/fetch-x.mjs` (backend `twitter-cli` pineado; credenciales en `~/.config/vera-fires/x.env`, cuenta secundaria de solo lectura, **nunca** en un `.envrc` de raíz). La vía operativa son los **perfiles oficiales** vía `user-posts` (`@Plan_INFOCA`, `@E112Andalucia`); ojo: `@112andalucia` es un placeholder con 0 tuits. El barrido lanza el proceso hijo con `HOME` en un directorio vacío a propósito: con credenciales caducadas, `twitter-cli` re-extrae cookies del navegador real y saltaría en silencio a la cuenta principal — la jaula convierte eso en fallo ruidoso (exit 2).
- La búsqueda por hashtag (`twitter search`) **está caída desde el 29-jul-2026**: X migró su cliente web, ya no sirve el bundle `ondemand.s` del que se derivaba `X-Client-Transaction-Id`, y los endpoints que la exigen devuelven 404. No son las credenciales, ni un `queryId` caducado, ni la versión del CLI — todo eso se descartó. Mientras estuvo viva, el hashtag `#IFLosGallardos` **sí rendía más que los perfiles** (capturaba prensa local, vecinos y cortes de carretera); hoy los perfiles no son la mejor opción sino la única operativa, y esa capa ciudadana falta. El barrido lo declara en cada ciclo y sondea `search` para avisar si revive (`x.queries` sigue en `incident.config.json`).
- Fallo ausente ≠ fallo silencioso: `fetch-x.mjs` distingue por código de salida — 2 credenciales, 3 formato, 4 backend ausente, **5 capacidad upstream desaparecida** (autenticado pero el endpoint ya no existe). Un barrido vacío que parece "no hay novedad" es peor que un error. `--dry` valida solo el contrato contra el fixture: **no** es señal de que la ingesta funcione.
- Servidor local: `python3 -m http.server 8471` (fetch no funciona sobre `file://`). Puede seguir corriendo de una sesión anterior — probar antes de relanzar.
- Los tests de renderizado se hacen comprobando campos con JS en la página, no solo con curl. **Y con la consola**: el perímetro de Copernicus estuvo 18 días sin pintarse en el mapa público (11–29 jul) sin que nada lo delatara salvo un `console.error`. Causa: `map.html` pedía área y frentes en un mismo `Promise.all`, y cuando el producto pasó a DEL —que solo trae área— `linesUrl` quedó a `null`, la petición fue a `/null`, el 404 devolvió HTML y el `catch` se llevó también el área quemada, que había cargado bien. Regla general: **una capa opcional nunca debe poder tumbar a la obligatoria**, y un `catch` que engloba varias fuentes esconde cuál falló.
- Contar elementos, no confiar en que "se ve bien": si el mapa muestra 11 polígonos donde debería haber cientos, falta una capa entera. `document.querySelectorAll('path.leaflet-interactive').length` es la comprobación barata.

## Git

Repo git-inited, **sin commits todavía**. Cuenta personal: `gh auth switch -u jisequilla` antes de cualquier push/PR. Deploy previsto: GitHub Pages (workflow ya en `.github/workflows/deploy.yml`).
