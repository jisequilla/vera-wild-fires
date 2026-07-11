---
type: lesson
title: "La carrera con el propio cron"
description: Dos veces en una tarde el cron de GitHub Actions empujó mientras la sesión aplicaba hechos — y en el primer rebase, «--ours» resultó ser el remoto: la resolución se tragó nuestra proyección sin avisar.
timestamp: 2026-07-11T18:06:00+02:00
time_precision: aproximada
time_label: "SÁB 11 · tarde"
confidence: observacion
status: vigente
chapter: 5
sources:
  - "Historial del repo (rebases de los commits 5ab4b45 y dee38d5)"
relates_to:
  - el-proyector-que-vivia-en-utc
  - flip-fuente-de-verdad
tags: [git, rebase, cron, automatizacion, blog]
---

Construimos un sistema con dos manos que escriben en el mismo repo: el **cron
satelital** (cada 30 min, en GitHub Actions) y la **sesión con juicio** (el
loop horario). La tarde del sábado se pisaron dos veces: `git push` rechazado,
`git pull --rebase`, conflicto en los artefactos generados.

**La trampa:** en un rebase, `--ours` y `--theirs` significan lo contrario que
en un merge — `--ours` es el REMOTO (la rama sobre la que te reaplicas), no lo
tuyo. En la primera carrera lo resolvimos al revés y la proyección con los tres
eventos nuevos quedó silenciosamente sustituida por la del cron. Se cazó
verificando el JSON después (30 eventos donde debían ser 33), no por suerte.

**La doctrina que quedó:** con artefactos GENERADOS, el conflicto de rebase no
se «resuelve» eligiendo un lado — se elige cualquiera, y después se
**re-proyecta desde el bundle y se re-audita antes del push**. El generador es
la verdad; el conflicto es ruido. En la segunda carrera, aplicada la doctrina,
la resolución salió limpia a la primera. La lección quedó congelada en el
prompt del propio loop (skill `/watch-loop`) para que ninguna sesión futura la
re-aprenda a golpes.
