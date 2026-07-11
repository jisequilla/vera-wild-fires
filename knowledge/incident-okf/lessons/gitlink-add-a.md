---
type: lesson
title: El git add -A que se tragó los worktrees
description: Un add indiscriminado coló cuatro worktrees como gitlinks en un commit publicado; cazado en la misma sesión, revertido y convertido en regla del flujo /commit.
timestamp: 2026-07-11T11:00:00+02:00
time_precision: aproximada
confidence: observacion
status: vigente
chapter: 4
sources:
  - "Historial del repo (commits de consolidación y fix)"
tags: [errores-cazados, git, flota]
---

En la consolidación post-migración, un `git add -A` rutinario añadió los cuatro
worktrees de los workers como *gitlinks* (modo 160000) — repos embebidos vacíos
en un repositorio público. El aviso de git se leyó DESPUÉS de pushear. Se
revirtió dos commits más tarde y `.claude/worktrees/` entró en `.gitignore`.

La lección alimentó directamente la skill `/commit`: **nunca `git add -A` a
ciegas** — el paso 1 del flujo es leer `git status` antes de añadir nada. El
orquestador que audita a sus workers también necesita auditarse a sí mismo.
