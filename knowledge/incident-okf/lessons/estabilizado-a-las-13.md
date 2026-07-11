---
type: lesson
title: "\"Estabilizado a las 13:00\" — a las 11:27"
description: La IA mezcló datos de otro incendio (otro año) y sirvió una hora futura como hecho consumado; el usuario lo cazó mirando el reloj.
timestamp: 2026-07-10T11:27:00+02:00
confidence: observacion
status: vigente
chapter: 1
sources:
  - "Crónica cap. 1 (blog/cronica-evacuacion-con-ia.md)"
relates_to:
  - lessons/timestamp-futuro
tags: [verificacion, errores-cazados, alucinacion]
---

En plena emergencia, el asistente afirmó que el fuego estaba "estabilizado a las
13:00" cuando eran las 11:27 — información de *otro incendio de otro año*
mezclada con el actual. De haberse creído, era una razón para volver a casa,
hacia el fuego.

Es la lección fundacional de todo el proyecto: **la IA amplifica el juicio
humano, pero necesita un humano que dude**. Origen directo de la regla "no
timestamps futuros" y del eje `confidence` de este bundle.
