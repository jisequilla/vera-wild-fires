---
type: decision
title: La coherencia se fuerza, no se recuerda
description: scripts/audit.mjs convierte en puerta ejecutable lo que antes era disciplina — bundle válido, proyección fresca, docs sin rutas muertas — y /commit añade la capa de juicio que ningún grep alcanza.
timestamp: 2026-07-11T11:15:00+02:00
time_precision: aproximada
confidence: observacion
status: vigente
chapter: 4
sources:
  - "scripts/audit.mjs + .claude/skills/commit/SKILL.md"
relates_to:
  - gitlink-add-a
  - timestamp-futuro
tags: [arquitectura, decisiones, verificacion]
---

Tres veces en dos días el repo enseñó dos verdades (README con el flujo viejo
tras cada flip). La respuesta no fue "prestar más atención" sino una **puerta
ejecutable**: `audit.mjs` valida el bundle (incluido el veto a timestamps
futuros), regenera índices stale, comprueba que `incident.json` coincide con la
proyección del bundle, y caza rutas muertas en los docs. La skill `/commit` la
envuelve con lo que un script no puede ver: ¿los docs siguen enseñando el flujo
que este diff acaba de cambiar? Probada en negativo antes de estrenarla — una
puerta que no puede fallar no es una puerta.
