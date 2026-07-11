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

- Paso atrás deliberado: ¿qué es regla, qué es skill, qué es script? Reglas = invariantes que deben sobrevivir a un prompt descuidado (112 manda, no inventar, no timestamps futuros). Skills = procedimientos con juicio (cómo barrer X, dónde va cada hecho). Scripts = acciones deterministas sin juicio (fetch satélites).
- Decisión de diseño: recolectar (`/gather-updates`) y aplicar (`/update-dashboard`) son skills SEPARADAS a propósito — entre ambas vive la verificación. La tesis de la crónica ("un humano que dude") convertida en arquitectura de pipeline.
- Las lecciones aprendidas a golpes (caché, X logueado, Nominatim, verificar activaciones) quedan codificadas en CLAUDE.md y las skills: el sistema ya no depende de recordarlas.
