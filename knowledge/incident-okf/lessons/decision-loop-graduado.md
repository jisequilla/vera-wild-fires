---
type: decision
title: "El loop graduado: automatizar el barrido, graduar el juicio"
description: Ante la propuesta de automatizar «/gather-updates && /update-dashboard» cada hora, la respuesta fue graduar en vez de encadenar — el && habría colapsado la puerta de verificación que ya había cazado tres errores.
timestamp: 2026-07-11T18:05:00+02:00
time_precision: aproximada
time_label: "SÁB 11 · tarde"
confidence: observacion
status: vigente
sources:
  - "Skill /watch-loop (.claude/skills/watch-loop/SKILL.md, commit f2590f2)"
relates_to:
  - decision-gather-apply-separados
  - estabilizado-a-las-13
tags: [loop, automatizacion, diseño, blog]
---

La propuesta era razonable: **«automatiza /gather-updates && /update-dashboard
cada hora»**. La respuesta que acabó acordada fue otra: ese `&&` encadena dos
verbos cuya separación es el alma del panel — entre recolectar y aplicar vive
la duda que cazó el EMSR671, el timestamp futuro y el «estabilizado a las
13:00». Automatizarla entera habría publicado titulares ambiguos sin que nadie
dudara.

**El diseño graduado:** cada hora, barrido completo; se auto-aplica SOLO el
tier claro (hechos `oficial` con URL concreta, sin contradicción, sin
vocabulario ambiguo — cifras y eventos fechados); TODO cambio de estado
semántico, contradicción o titular ambiguo queda **en cola con aviso al móvil**;
y la señal más esperada — la luz verde del 112 para volver — es SIEMPRE ping,
jamás apply silencioso.

**Los dos primeros ciclos validaron el diseño desde ángulos opuestos:** el
ciclo 1 aplicó tres hechos oficiales y cazó un bug; el ciclo 2 no aplicó NADA
— todo llegó por debajo del tier — y eso también era el sistema funcionando.
Cuando el humano revisó la cola (8 items), rechazó dos con un criterio que
ninguna regla habría codificado: la visita presidencial «no aporta valor — es
noticia, no conocimiento», y la cifra de heridos «esperamos a la oficial».
La máquina propone tiers; el humano sigue siendo quien decide qué merece ser
conocimiento.
