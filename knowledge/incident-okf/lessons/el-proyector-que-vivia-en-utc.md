---
type: lesson
title: "El proyector que vivía en UTC"
description: Las horas derivadas de la línea de tiempo se desplazaban dos horas cuando proyectaba el cron de GitHub Actions — el runner vive en UTC y deriveLabel usaba la zona horaria local de la máquina.
timestamp: 2026-07-11T16:28:00+02:00
time_precision: aproximada
time_label: "SÁB 11 · tarde"
confidence: observacion
status: vigente
chapter: 5
sources:
  - "Proyección del cron 16:13 vs local (deriveLabel en scripts/project-dashboard.mjs)"
relates_to:
  - lessons/flip-fuente-de-verdad
  - lessons/timestamp-futuro
tags: [proyector, utc, timezone, cron]
---

El primer ciclo del loop horario destapó un bug que llevaba vivo desde el flip:
los eventos sin `time_label` explícito mostraban su hora **desplazada dos horas**
(«13:31» por «15:31») cada vez que proyectaba el cron — el runner de GitHub
Actions vive en UTC y `deriveLabel` formateaba con la zona horaria local de la
máquina. En local (Madrid) el panel salía bien; en CI, mal. Nadie lo vio porque
la mayoría de eventos llevan `time_label` explícito.

**Por qué importa:** un panel de emergencia con horas corridas dos horas es
desinformación involuntaria. La lección general: todo código que formatee
tiempo para humanos debe fijar la zona horaria explícitamente
(`Intl.DateTimeFormat` con `timeZone: 'Europe/Madrid'`) — «la del sistema» es
una lotería según dónde corra.

**Cómo se cazó:** verificando el JSON tras un rebase conflictivo, no mirando el
HTML. El dato raro (una hora que no cuadraba con lo leído una hora antes) se
investigó en vez de ignorarse.

**Posdata inevitable:** al escribir ESTA lección sobre bugs de tiempo, el
asistente la fechó cinco minutos en el futuro. El audit la frenó antes de
publicar — primera vez que la puerta caza el pecado fundacional a tiempo.
