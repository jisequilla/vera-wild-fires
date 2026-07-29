---
type: lesson
title: El hashtag que dejó de existir
description: La búsqueda live de #IFLosGallardos —la fuente que más rindió en julio— devolvió 404 el 29; no fue una credencial ni una versión, fue que X se rehízo por debajo.
timestamp: 2026-07-29T19:30:00+02:00
time_precision: aproximada
confidence: observacion
status: vigente
supersedes: lessons/x-solo-logueado
sources:
  - "Diagnóstico reproducible: `twitter status` → authenticated:true; `twitter search` → ok:false / HTTP 404; `twitter user-posts Plan_INFOCA` → ok:true"
relates_to:
  - lessons/x-solo-logueado
  - lessons/el-respaldo-sin-probar
  - findings/hipotesis-cabecera-transaccion
  - lessons/decision-perfiles-sobre-hashtag
tags: [fuentes, fragilidad-plataformas, verificacion]
---

El 29 de julio la ingesta de X dejó de funcionar. `twitter search` devuelve
**HTTP 404** con la sesión autenticada y la cuenta correcta. Se descartaron, una
por una, las tres explicaciones cómodas: **no eran las credenciales** (`status`
responde `authenticated: true`), **no era un `queryId` caducado** (el
auto-refresco resuelve el vigente y con el ID correcto también da 404), y **no
era la versión** (0.8.5 es la última publicada). Lo que cambió fue X: migró su
cliente web y ya no sirve el bundle del que la herramienta derivaba una cabecera
que ciertos endpoints exigen.

**La lección no es "X es frágil"** —eso ya lo sabíamos desde el muro de login de
julio—. Es más incómoda: *una fuente puede morir sin avisar y sin culpa de nadie
en nuestro lado*. Ningún fichero de este repo cambió; el barrido se rompió
igual. El diagnóstico solo avanzó cuando se dejó de buscar el fallo en la
configuración propia.

**Corolario operativo, y el que más cuesta aceptar:** lo que rendía más ya no
está. La búsqueda por hashtag capturaba prensa local, vecinos, avisos de
carretera — la capa ciudadana que a veces llegaba antes que la oficial. Hoy los
perfiles oficiales no son la mejor opción: son la única operativa. Esa pérdida
se declara en cada barrido en vez de disimularse, porque un parte vacío que
parece "no hay novedad" miente peor que un error.

**Reproducible en treinta segundos**, por si algún día conviene comprobar si el
apagón sigue vigente:

```bash
twitter status                                    # authenticated: true
twitter search "devops" -t latest --max 3 --json  # ok:false, not_found (HTTP 404)
twitter user-posts Plan_INFOCA --max 3 --json     # ok:true, con datos
```

Segunda trampa, más silenciosa: el test en verde. `fetch-x.mjs --dry` seguía
pasando durante todo el apagón, porque valida el contrato contra un fixture y no
toca la red. **El camino de test estaba sano mientras la realidad estaba rota.**
De ahí que el script distinga por código de salida *capacidad upstream
desaparecida* (5) de *formato roto* (3): sin esa categoría, un endpoint muerto se
reportaba como "salida malformada" y mandaba a investigar al sitio equivocado.
