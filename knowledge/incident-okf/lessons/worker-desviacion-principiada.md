---
type: lesson
title: El worker que desobedeció bien
description: En la migración paralela, el worker de state/ rebajó "Vera Playa seguro" de oficial a estimacion contra su propio ticket — porque "seguro" es valoración propia, no del 112.
timestamp: 2026-07-11T10:50:00+02:00
time_precision: aproximada
confidence: observacion
status: vigente
chapter: 4
sources:
  - "PR #2 <https://github.com/jisequilla/vera-wild-fires/pull/2>"
relates_to:
  - state/zona-vera-playa
  - decision-gather-apply-separados
tags: [flota, errores-cazados, verificacion]
---

Durante la migración OKF en paralelo (4 workers, worktrees, tickets congelados),
el worker de `state/` se desvió deliberadamente del contrato: el ticket
sugería confianza oficial/prensa-oficial para las zonas, pero etiquetó
`zona-vera-playa` como **`estimacion`** razonando que "seguro" es una valoración
del autor sobre el perímetro, sin visto bueno del 112 — y lo documentó en su
Anexo en lugar de callarlo.

La lección es doble: (1) las reglas de oro del proyecto, bien escritas en el
contexto compartido, se propagan a los workers y **pueden ganar a un ticket
defectuoso**; (2) el Anexo obligatorio convierte la desviación en conocimiento
en vez de en sorpresa. El ticket estaba mal; el sistema lo corrigió.
