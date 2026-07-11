---
type: lesson
title: La caché que escondió la capa
description: El navegador sirvió un map.html viejo y la capa Copernicus "no funcionaba"; el fallo no estaba en el código sino en el hard reload que faltaba.
timestamp: 2026-07-11T06:07:00+02:00
time_precision: aproximada
confidence: observacion
status: vigente
chapter: 2
sources:
  - "Historial del repo"
tags: [errores-cazados, mecanica]
---

Tras añadir la capa Copernicus, el mapa seguía sin mostrarla: `renderCopernicus`
era `undefined` en la página — el navegador servía el HTML cacheado. Un
`Cmd+Shift+R` la hizo aparecer. Tercera naturaleza de error en una sola mañana
(tras el dato del futuro y la activación equivocada): **ni modelo ni fuente,
sino sustrato**. El JSON se auto-cachebustea; el HTML no — quedó como regla de
mecánica en CLAUDE.md.
