---
type: lesson
title: Lo vigente caduca sin avisar
description: La stat «~20 sin localizar · en búsqueda» siguió seis días en el panel tras cerrarse la búsqueda — un dato correcto el 13 que se volvió falso el 19 sin que nadie lo tocara.
timestamp: 2026-07-19T20:05:00+02:00
confidence: observacion
status: vigente
sources:
  - "Barrido de /gather-updates del 19 jul 19:47 (contraste del bundle contra sí mismo)"
relates_to:
  - state/desaparecidos
  - events/2026-07-15-identificacion-completa
  - lessons/timestamp-futuro
tags: [verificacion, errores-cazados, panel]
---

El barrido del 19 de julio salió a buscar novedades fuera y encontró el
problema dentro. El panel mostraba **«~20 · Sin localizar · en búsqueda»**
—concepto sellado el 13 jul a las 11:01, `status: vigente`— cuando las
batidas habían terminado el **12 jul ~14:00** sin más víctimas y la
identificación genética de las **13** se había cerrado el **15 jul**. El
propio concepto contenía ambos hechos. Nadie mintió: el dato fue correcto
el día que se escribió.

**La lección:** `status: vigente` no es una propiedad permanente, es una
**afirmación con fecha de caducidad** que nadie renueva. Las reglas de oro
protegen la entrada del dato —fuente, hora, no inventar cifras— pero no su
salida. Un hecho puede pudrirse en el sitio sin que ninguna fuente nueva lo
contradiga, simplemente porque el mundo siguió y la tarjeta no.

**Lo que lo hacía peligroso era el verbo.** «~20» era solo una cifra vieja;
**«en búsqueda»** era una afirmación operativa falsa en un panel que la
gente lee para decidir. La etiqueta prometía un dispositivo trabajando que
llevaba una semana desmontado.

**Cómo se cerró:** la métrica pasó a `superseded` con `superseded_by` hacia
la identificación completa —nada se borra, la fluctuación 19→23→~20 sigue
ahí— y la stat se retiró de `orders.stats`. El panel bajó de cinco cifras a
cuatro. Cuatro que aguantan una lectura atenta valen más que cinco con una
que miente por inercia.

**La regla que se deriva:** todo barrido contrasta el bundle **contra sí
mismo**, no solo contra el mundo. La pregunta no es únicamente «¿qué hay de
nuevo?», sino «¿qué de lo que afirmo hoy dejó de ser verdad sin que nadie
me avisara?».
