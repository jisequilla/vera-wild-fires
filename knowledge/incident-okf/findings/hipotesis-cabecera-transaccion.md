---
type: lead
title: La cabecera ausente como causa del 404 de `search`
description: Que el 404 venga de no poder derivar X-Client-Transaction-Id es la hipótesis más sostenida por la evidencia, pero no está probada — probarla exige justo lo que nadie sabe hacer.
timestamp: 2026-07-29T19:30:00+02:00
time_precision: aproximada
confidence: pista
status: vigente
triage: pending
sources:
  - "Traza del backend: `WARNING twitter_cli.client: Failed to init ClientTransaction: 'NoneType' object has no attribute 'group'` en cada invocación"
  - "Portada de x.com: la cadena `ondemand` aparece cero veces; ahora sirve `abs.twimg.com/x-web/x-web/entry-client-logged-out-*.js`"
relates_to:
  - lessons/el-hashtag-que-dejo-de-existir
tags: [fuentes, fragilidad-plataformas, hipotesis]
---

**La hipótesis.** X migró su cliente web y dejó de servir el bundle
`responsive-web/client-web/ondemand.s.<hash>a.js`. La librería que deriva la
cabecera `X-Client-Transaction-Id` lee índices de ese fichero; al no existir, su
expresión regular no casa y la inicialización revienta. La herramienta degrada
con elegancia y **omite la cabecera**: los endpoints que no la exigen siguen
respondiendo, los que sí la exigen devuelven 404.

**Lo que la sostiene.** Tres observaciones que encajan y ninguna que la
contradiga: con el `queryId` correcto también da 404 (luego no es el ID); los
endpoints REST 1.1 heredados también dan 404; y el resto de GraphQL
(`whoami`, `feed`, `user`, `user-posts`, `bookmarks`) sigue vivo. Un fallo de
credenciales o de versión no produciría ese patrón selectivo.

**Por qué sigue en `pending` y no se promueve.** Confirmarla exigiría generar una
cabecera válida contra el bundle nuevo y comprobar que `search` revive — que es
exactamente lo que hoy nadie sabe hacer. Sin esa prueba, esto es una explicación
coherente, no un hecho. Se registra como pista para no reinvestigar lo ya
descartado, no como causa establecida.

**Qué la resolvería.** Que aparezca un parche upstream y `search` vuelva (la
sonda del barrido lo detectaría y avisaría), o que alguien publique la
derivación de la cabecera contra el cliente nuevo. Mientras tanto, la
consecuencia práctica es la misma con hipótesis o sin ella: el hashtag no se
puede consultar.

**Riesgo que se deriva de ella, y que sí conviene tener presente:** si la
hipótesis es correcta, `user-posts` funciona hoy porque *su* endpoint todavía no
exige la cabecera, no porque esté exento. El día que X extienda la exigencia,
cae igual — y el barrido debe seguir gritándolo (exit 5), no devolver vacío.
