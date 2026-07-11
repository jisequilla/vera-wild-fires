# Material para la crónica — log crudo

Entradas fechadas, sin pulir. `[→ cap. N]` = ya incorporada a un capítulo.

## 2026-07-10 · noche — reconstrucción del panel

- Repo sembrado: datos separados de presentación, `incident.json` como única fuente de verdad. [→ cap. 2]
- Los dos artefactos originales preservados en `originals/` como registro histórico. [→ cap. 2]

## 2026-07-11 · madrugada — la sesión de los satélites

- 05:44 — Cazado timestamp futuro: evento del sábado fechado a las 09:00 siendo las 05:44. La misma clase de error que la IA cometió el día 10 ("estabilizado a las 13:00" a las 11:27), ahora introducido por descuido humano-máquina al redactar. [→ cap. 2]
- ~05:50 — X deslogueado sirve esqueletos vacíos; con la sesión del usuario, la búsqueda live del hashtag rinde más que los perfiles. El tuit de la reapertura de la A-7 (03:28, @E112Andalucia) estaba ahí antes que en ningún medio. [→ cap. 2]
- ~06:00 — EMSR671 (sugerido por el buscador) resultó ser La Palma 2023. El real: EMSR892, verificado abriendo la ficha. [→ cap. 2]
- ~06:07 — La capa Copernicus "no funcionaba": era la caché del navegador sirviendo el HTML viejo. Hard reload y apareció. Tercera naturaleza de error del día. [→ cap. 2]
- ~06:10 — Coherencia interna: la suma de polígonos de Copernicus da 3.198 ha; el producto declara 3.200. [→ cap. 2]
- ~06:30 — FIRMS: 577 focos en 24 h. Los grises calcan el perímetro Copernicus; los naranjas desbordan al NO (El Chive, La Alameda) = la reactivación nocturna vista desde órbita. Última detección 22:17, coincide al minuto con el tuit de un analista. [→ cap. 2]

## 2026-07-11 · mañana — el flujo agéntico (material para cap. 3)

- Paso atrás deliberado: ¿qué es regla, qué es skill, qué es script? Reglas = invariantes que deben sobrevivir a un prompt descuidado (112 manda, no inventar, no timestamps futuros). Skills = procedimientos con juicio (cómo barrer X, dónde va cada hecho). Scripts = acciones deterministas sin juicio (fetch satélites). [→ cap. 3]
- Decisión de diseño: recolectar (`/gather-updates`) y aplicar (`/update-dashboard`) son skills SEPARADAS a propósito — entre ambas vive la verificación. La tesis de la crónica ("un humano que dude") convertida en arquitectura de pipeline. [→ cap. 3]
- Las lecciones aprendidas a golpes (caché, X logueado, Nominatim, verificar activaciones) quedan codificadas en CLAUDE.md y las skills: el sistema ya no depende de recordarlas. [→ cap. 3]

## 2026-07-11 · mañana — la publicación (material para cap. 3)

- Decisión consciente antes de publicar: el panel era PERSONAL ("tu origen", "posición actual", ruta de evacuación propia). Tres posturas sobre la mesa (tal cual / despersonalizado / acceso restringido); el autor eligió publicar tal cual — precisión de urbanización, no de dirección, y la crónica contará lo mismo de todos modos. La decisión de privacidad es parte del diseño de estos sistemas, no un detalle. [→ cap. 3]
- ~07:1x — Primer commit (21 ficheros) y repo público. El primer deploy de Pages FALLÓ: el workflow corrió 10 segundos antes de que Pages estuviera habilitado. Re-run y verde. Otro modo de fallo menor cazado y anotado. [→ cap. 3]
- URL pública viva: https://jisequilla.github.io/vera-wild-fires/ — de artefacto en un chat a infraestructura pública en ~36 h de emergencia. [→ cap. 3]
- Cron de ingesta cada ~30 min (minutos :17 y :47, deliberadamente fuera de :00/:30): baja FIRMS + Copernicus, commitea SOLO si las capas cambiaron de verdad (si no, revierte el re-sellado y sale limpio), y dispara el deploy explícitamente (el push del bot no dispara workflows — gotcha de GitHub esquivado). [→ cap. 3]
- El primer run automático publicó datos que ningún humano tocó: 614 focos (37 nuevos — los pases satelitales de la madrugada, último a las 04:19 CEST). El panel se actualizó solo mientras hablábamos de otra cosa. [→ cap. 3]
- Decadencia conocida: GitHub pausa los crons tras 60 días sin actividad en el repo. Los sistemas de emergencia improvisados tienen fecha de caducidad silenciosa — material directo para el debate. [→ cap. 3]
- La capa humana queda intacta a propósito: el cron solo mueve datos satelitales; eventos, cifras y zonas siguen pasando por gather → ojos humanos → update. [→ cap. 3]
