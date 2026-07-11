---
type: decision
title: El volteo de la fuente de verdad, con puerta de diff
description: incident.json pasó a ser artefacto generado solo después de que el proyector reprodujera el panel vivo — cronología idéntica como conjunto, conteos exactos, deriva textual revisada a mano.
timestamp: 2026-07-11T11:09:00+02:00
time_precision: aproximada
confidence: observacion
status: vigente
chapter: 4
sources:
  - "Historial del repo (commit del flip)"
relates_to:
  - decision-gather-apply-separados
tags: [arquitectura, decisiones, okf]
---

El panel público nunca se detuvo mientras se le cambiaba el suelo: el proyector
(bundle OKF + capas satelitales → `incident.json`) solo sustituyó a la edición
directa **después de superar una puerta de diff** contra el fichero vivo — 24/24
eventos idénticos como conjunto, fuentes evento a evento, conteos exactos, y 53
derivas textuales revisadas una a una (todas, prosa enriquecida de los workers).
La puerta encontró además tres huecos reales antes de abrir: coordenadas de
carreteras sin migrar, la prosa de los banners viviendo en ninguna parte, y un
bug del propio proyector. Regla que queda: **un flip sin puerta es una apuesta;
con puerta, es un paso.**
