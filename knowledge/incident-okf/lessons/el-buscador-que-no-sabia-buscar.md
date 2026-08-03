---
type: lesson
title: El buscador que no sabía buscar
description: El expediente migró al BOJA, que no tiene RSS; su buscador resultó ser Solr desnudo tras un GET — pero con una relevancia tan poco fiable que hubo que quitarle el trabajo de decidir qué importa.
timestamp: 2026-08-03T20:00:00+02:00
time_precision: aproximada
confidence: observacion
status: vigente
sources:
  - "Medición reproducible sobre eboja/buscador/search.do: q='incendio forestal Almería'+ventana desde 10-jul → 0 resultados; q='incendio' → 16; q='\"Los Gallardos\" incendio' sin ventana → 12.890"
  - "Decreto del Presidente 11/2026 (luto oficial) <https://www.juntadeandalucia.es/boja/2026/513/1>"
relates_to:
  - lessons/el-hashtag-que-dejo-de-existir
  - lessons/decision-perfiles-sobre-hashtag
tags: [fuentes, ingesta, scraping, expediente]
---

Con el fuego extinguido, la historia cambió de cauce: las ayudas, los decretos y
los nombramientos no salen en rueda de prensa sino en el **BOJA** — que no tiene
RSS útil. La sorpresa al abrirlo con un scraper fue doble.

**La buena:** el buscador de la sede es **Solr desnudo detrás de un GET plano**.
La paginación filtra sus parámetros crudos (`fq=bojaDateNormalized:[20260710 TO *]`,
`sort`, `start=10`), así que lo que parecía scraping frágil es casi una API no
documentada: ventana de fechas, orden descendente, paginación estable. Toda la
fragilidad del markup queda acotada a un selector (`ul.listado_resultados > li`).

**La mala:** ese buscador no sabe buscar. Hace *stemming* que iguala el
municipio con un apellido —la mitad de los resultados de «Los Gallardos» eran
ceses y nombramientos de una delegada llamada Gallardo Pinto— y su semántica
multi-término no resiste una medición: `incendio forestal Almería` devuelve **0**
resultados, `incendio` a secas devuelve **16**, y una frase entrecomillada con un
término suelto dispara 12.890. Tres palabras razonables producían un silencio
que parecía "no hay nada" y era "no has preguntado como el motor quería".

De ahí la forma del vigía (`fetch-boja.mjs`): **preguntar ancho y decidir en
casa**. Consultas de una palabra o frase entrecomillada, ventana temporal, y la
relevancia la deciden los `filterPatterns` en cliente — con la obligación de
declarar el recuento («39 escaneadas, 37 fuera de filtro»), porque un silencio
sin números no se distingue de un barrido roto. Y antes de fiarse del filtro, se
leyeron a mano los 16 descartes de `incendio`: oposiciones, consorcios de otras
provincias, ruido legítimo. **El silencio se audita una vez antes de creerlo
para siempre.**

Quedaba la trampa conocida: en este buscador, la página de cero resultados es
**idéntica** a una rediseñada (ni listado ni paginado). La respuesta es herencia
directa de la cuenta de control de X: una **consulta de control** (`decreto`,
que siempre publica) desambigua — si ella también devuelve vacío, no es silencio
informativo, es el buscador roto, y el barrido muere ruidoso en vez de reportar
"sin novedades".

Primer rendimiento del vigía, y es un dato con forma de ausencia: desde el 10 de
julio, **una sola publicación del BOJA nombra a Los Gallardos** — el decreto de
luto oficial. Las ayudas, a 3 de agosto, aún no han pisado el boletín. Antes esa
frase habría sido una impresión; ahora es un recuento.
