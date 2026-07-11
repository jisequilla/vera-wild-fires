---
type: lesson
title: La tubería que cegó al guardián
description: Un "| tail -1" enmascaró el exit code del audit y un timestamp futuro — el pecado fundacional de la serie — llegó publicado a main con la puerta en rojo.
timestamp: 2026-07-11T12:52:00+02:00
confidence: observacion
status: vigente
sources:
  - "Historial del repo (commit ca28e1b y su fix)"
relates_to:
  - timestamp-futuro
  - audit-como-puerta
  - gitlink-add-a
tags: [errores-cazados, verificacion, audit]
---

Al commitear la mejora del barrido, el audit dijo **"2 errores"** — pero corría
encadenado como `node scripts/audit.mjs 2>&1 | tail -1`, y el exit code que vio
el `&&` fue el de `tail` (0). El commit pasó, el push publicó. ¿El error
enmascarado? **Un timestamp futuro** (13:00 escrito a las 12:4x) — exactamente
el error del capítulo 1, del capítulo 2, y ahora del autor de la puerta que lo
veta.

Doble lección: (1) los timestamps futuros son un atractor — todo el mundo cae,
humanos, modelos y procesos, y por eso el veto debe ser estructural; (2) **una
puerta solo protege si nada se interpone entre su veredicto y la decisión** — el
audit se ejecuta solo, nunca en tubería. La regla quedó escrita en la skill
/commit. El guardián necesitaba un guardián; resultó ser el propio exit code,
respetado.
