---
type: lesson
title: La capa que nadie echaba de menos
description: El perímetro oficial de Copernicus estuvo 18 días sin pintarse en el mapa público; solo lo delataba un console.error, y una capa opcional ausente se llevaba por delante a la obligatoria.
timestamp: 2026-07-29T22:40:00+02:00
time_precision: aproximada
confidence: observacion
status: vigente
chapter: 7
sources:
  - "Verificación de render en navegador (29 jul): 11 polígonos donde debía haber ~1.810; `console.error` en map.html:142"
  - "Historial del repo: linesUrl pasó a null entre los commits del 11 jul 19:54 y 21:09"
relates_to:
  - lessons/tuberia-que-cego-al-guardian
  - lessons/cache-navegador
  - state/hectareas
tags: [errores-cazados, verificacion, mapa]
---

Del **11 al 29 de julio**, el mapa público no pintó el perímetro oficial de
Copernicus —la capa más importante que tiene, la única cartografía real del
incendio—. Dieciocho días. Nadie lo echó de menos.

**La mecánica.** `map.html` pedía área y frentes de fuego en un mismo
`Promise.all`. Cuando el producto Copernicus vigente pasó de MON1 a **DEL**, que
solo trae área, `linesUrl` quedó a `null`; `fetch(null)` resolvió a `/null`, el
servidor devolvió su página 404, `.json()` reventó con «Unexpected token '<'» y
el `catch` común se llevó por delante **también el área quemada**, que se había
descargado perfectamente (1.799 polígonos, 22 MB, HTTP 200).

**Las dos lecciones de diseño.** Una capa **opcional** nunca debe poder tumbar a
la obligatoria: lo que es prescindible en el dato tiene que serlo también en el
código. Y un `catch` que engloba varias fuentes **esconde cuál falló** — el error
decía "no se pudo cargar la capa Copernicus" cuando la mitad de Copernicus estaba
cargada y correcta.

**La lección de proceso, que es la que duele.** El fallo era observable desde el
primer minuto: un `console.error` en cada carga. Pero la verificación de render
que este proyecto se impuso comprobaba *campos del JSON con JS en la página* —y
esos estaban bien—, no la consola ni el recuento de elementos dibujados. El dato
era correcto en disco, correcto en `layers.json`, correcto al hacer `fetch`… y
ausente en pantalla. **Un artefacto puede estar bien en todas sus capas menos en
la que ve el usuario.**

De aquí sale la comprobación barata que ahora acompaña a cada cambio del mapa:
contar elementos (`path.leaflet-interactive`) y leer la consola. Once polígonos
donde debería haber cientos es una capa entera desaparecida, y se ve en un
vistazo si uno se molesta en mirar.

Ironía que conviene registrar: el panel llevaba desde el 12 de julio mostrando en
`state/hectareas` que las mediciones satelitales contradecían la cifra oficial.
Tenía razón — la cifra final bajó a encontrarse con ellas. Y mientras tanto no
estaba enseñando esos satélites en el mapa.
