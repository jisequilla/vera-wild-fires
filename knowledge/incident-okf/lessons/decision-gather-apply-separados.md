---
type: decision
title: Recolectar y aplicar, separados a propósito
description: /gather-updates produce el parte y jamás toca el panel; /update-dashboard consume hechos verificados — entre ambos vive la verificación humana.
timestamp: 2026-07-11T07:30:00+02:00
time_precision: aproximada
confidence: observacion
status: vigente
chapter: 3
sources:
  - "Skills del repo (.claude/skills/)"
tags: [arquitectura, decisiones, verificacion]
---

Al diseñar el flujo agéntico se decidió que la recolección de fuentes y la
aplicación al panel fueran **skills separadas con una costura entre medias**: el
parte de novedades (hechos + fuente + confianza) se revisa antes de aplicarse.
La tesis de la crónica — "un humano que dude" — convertida en arquitectura de
pipeline. El mismo principio gobierna el cron: **automatiza los datos, nunca el
juicio** (satélites solos; palabras, por ojos humanos).
