---
type: lesson
title: El timestamp del futuro
description: Un evento del sábado quedó fechado a las 09:00 siendo las 05:44 — la misma clase de error que la IA cometió el día 10, ahora introducido al redactar.
timestamp: 2026-07-11T05:44:00+02:00
confidence: observacion
status: vigente
chapter: 2
sources:
  - "Historial del repo (commit de corrección)"
relates_to:
  - lessons/estabilizado-a-las-13
tags: [verificacion, errores-cazados]
---

Al anotar el parte de la madrugada del sábado, el evento quedó fechado a las
**09:00 siendo las 05:44** — un dato del futuro presentado como pasado. Se cazó
antes de publicar y se corrigió a "madrugada" (`time_precision: franja`).

**La lección que refina la tesis:** no basta con dudar del modelo; hay que dudar
del proceso entero, incluido el humano-con-máquina que redacta. De aquí sale la
regla de oro nº 4 del proyecto (prohibidos los timestamps futuros) y el campo
`time_precision` de este perfil: la imprecisión honesta ("~", "madrugada") es
legítima; la precisión inventada, no.

Incorporada a la crónica en el capítulo 2 ("El expediente EMSR671, o por qué se
verifica dos veces").
