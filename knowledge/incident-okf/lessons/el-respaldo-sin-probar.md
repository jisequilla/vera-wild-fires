---
type: lesson
title: El respaldo que nadie había probado
description: El fallback diario de AEMET publicó «rachas 0 km/h» en la ventana de riesgo — dos bugs en el único camino del script que no tenía fixture, y que solo se ejecuta cuando el principal falla.
timestamp: 2026-07-19T21:07:00+02:00
confidence: observacion
status: vigente
sources:
  - "Diagnóstico sobre data/layers.json del commit 45d7ecc (ingesta automática, 19 jul 18:42Z)"
relates_to:
  - lessons/lo-vigente-caduca
  - lessons/tuberia-que-cego-al-guardian
tags: [verificacion, errores-cazados, scripts]
---

El 19 de julio la ingesta automática publicó esto en la ventana meteorológica
del panel:

```
"municipio": "Vera (4100)"          ← el INE de Vera es 04100
"rachasKmh": 0
"resumen": "E 15 km/h (rachas 0) · … (agregado diario)"
```

**Rachas de 0 km/h en un panel de incendios.** No era un hueco: era una
promesa de calma. Ese mismo día la horaria real daba rachas de 26 km/h.

**Los dos bugs, ambos en `agregaDiaria`:**

AEMET manda `""` —no `null`— en los periodos sin dato. En JavaScript `+""`
es `0`, y `Number.isFinite(0)` es `true`, así que el guardia
`.map(r => +r.value).filter(Number.isFinite)` convertía «sin dato» en «cero»
en vez de descartarlo. El segundo: la diaria devuelve `id` como **número**,
y el cero inicial de `"04100"` se pierde al serializar.

**Lo que hace a esto una lección y no una anécdota:** el camino horario tenía
fixture (`aemet-horaria.json`), modo `--dry` y estaba correcto — su filtro de
viento **sí** guardaba contra `""`. El camino diario no tenía fixture, no tenía
modo de prueba, y nunca se había ejecutado en producción. Solo se dispara
cuando el principal falla; es decir, **exactamente cuando más se le necesita y
menos se le está mirando**.

Un respaldo sin probar no es un respaldo: es una segunda forma de fallar, con
la agravante de que parece que funciona.

**Cómo se cerró:** coerción segura (`num()`) en los dos caminos, el código de
municipio se toma de `incident.config.json` en vez de la respuesta, fixture
`aemet-diaria.json` que reproduce el caso exacto de producción (`id` numérico
y `rachaMax` vacías) y modo `--dry-diaria` para ejercitarlo. Y un cambio de
criterio en la salida: **un dato ausente se dice** (`rachas s/d`), no se omite
ni se rellena con cero — en una ventana de riesgo por viento, la racha que
falta es justo la que hay que ver.

Misma forma que [[lo-vigente-caduca]]: el fallo no fue decir algo incorrecto,
fue **no admitir que no se sabía**.
