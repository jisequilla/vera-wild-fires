# Vera Wild Fires — Dashboard de emergencia

Panel de seguimiento del incendio de Los Gallardos–Bédar (Almería, jul 2026). El usuario vive la emergencia en primera persona (auto-evacuado de Valle del Este a Vera Playa). Esto no es un proyecto de juguete: la información de este panel puede influir en decisiones reales.

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
- `scripts/project-dashboard.mjs` — el proyector; toda decisión de presentación (colores, orden, textos de layout) vive en su bloque `PRES`.
- `index.html` / `map.html` — renderizan el JSON en runtime, polling 15 min. Solo se tocan para cambiar presentación/estructura.
- `data/copernicus/` + `data/firms/` — capas satelitales (GeoJSON locales, versionadas).
- `scripts/fetch-copernicus.mjs` / `fetch-firms.mjs` — bajan datos satelitales y actualizan `layers.json`; después, proyectar.
- `originals/` — artefactos originales de la sesión de chat (no tocar).
- `blog/` — crónica en capítulos (voz: ver skill update-blog).

## Flujo agéntico

`/gather-updates` (recolectar y contrastar, SIN tocar el panel) → revisión → `/update-dashboard` (aplicar hechos verificados) → `/update-blog` (capturar material para la crónica). La separación recolectar/aplicar es deliberada: entre ambas vive la verificación.

## Mecánica que ya nos mordió (no re-aprender)

- Tras editar HTML, el navegador puede servir caché: **hard reload** (`Cmd+Shift+R`) antes de diagnosticar "no funciona". El JSON se auto-cachebusts; el HTML no.
- X/Twitter solo se lee con la sesión del usuario en Chrome (deslogueado = esqueletos vacíos). La búsqueda live del hashtag `#IFLosGallardos` rinde más que los perfiles.
- Servidor local: `python3 -m http.server 8471` (fetch no funciona sobre `file://`). Puede seguir corriendo de una sesión anterior — probar antes de relanzar.
- Los tests de renderizado se hacen comprobando campos con JS en la página, no solo con curl.

## Git

Repo git-inited, **sin commits todavía**. Cuenta personal: `gh auth switch -u jisequilla` antes de cualquier push/PR. Deploy previsto: GitHub Pages (workflow ya en `.github/workflows/deploy.yml`).
