---
type: metric
title: Hectáreas
description: Superficie del incendio al cierre de fase — la cifra de la comparecencia de estabilización de Moreno (~7.000); no creció desde el viernes por la noche en términos de perímetro activo.
timestamp: 2026-07-12T11:15:00+02:00
time_precision: aproximada
value: "~7.000"
unit: hectáreas
confidence: prensa-oficial
status: vigente
sources:
  - "eldiario.es (directo, citando la comparecencia de Moreno en el PMA) <https://www.eldiario.es/sociedad/ultima-hora-incendio-almeria-directo-fuego-gallardos-frena-avance-calcinar-6-600-hectareas_133_13374215.html>"
  - "EL PAÍS (12 jul 12:21) <https://elpais.com/espana/2026-07-12/ultimas-noticias-del-incendio-forestal-de-los-gallardos-almeria-en-directo.html>"
  - "La Voz de Almería <https://www.lavozdealmeria.com/almeria/sucesos/599241/estabilizado-incendio-gallardos-dias-lucha-llamas.html>"
tags: [superficie, balance]
---

Cifra vigente: **~7.000 hectáreas** — el balance de la comparecencia de
estabilización de Moreno (12 jul, 11:15, Puesto de Mando Avanzado), sobre
los términos de Los Gallardos, Bédar, Lubrín y Antas; el más afectado es
Bédar. Es un ajuste de medición sobre las 6.600 del sábado (perímetro
consolidado al cierre), no un crecimiento del fuego: el perímetro llevaba
desde el viernes por la noche sin avanzar y quedó estabilizado a las 11:00.
Con esa superficie es el **cuarto mayor incendio de la historia de
Andalucía** (Canal Sur, 12 jul).

**Matiz técnico:** un análisis independiente sobre Sentinel-2 (eforestal,
21:36) estima **5.255 ha realmente quemadas** — un 20 % menos que la cifra
oficial, que puede incluir superficie perimetrada no quemada. El panel
mantiene la oficial como valor y muestra ambas aquí.

**Producto Copernicus DEL (delineación, no monitorización):** primera
imagen posterior al fuego, adquirida el 12 jul a las 20:37 CEST — 1.799
polígonos que suman **~4.820 ha**. Es la medición técnica más reciente
disponible, en línea con las estimaciones MON1 previas (4.753–5.255 ha) y
por debajo de la cifra oficial política (~7.000 ha) — la brecha entre
"superficie perimetrada" y "superficie realmente quemada" se mantiene.

## Historia de la fluctuación

| Momento | Valor | Fuente |
|---|---|---|
| 10 jul ~11:00 | ~3.150 ha (Los Gallardos, Bédar y Antas) | Estrella Digital |
| 10 jul 12:50 (imagen) | 3.200 ha delineadas sobre Sentinel-2 | Copernicus EMS · EMSR892 |
| 10 jul ~15:00 | ~4.000 ha (Sanz) | La Voz de Almería / COPE |
| 11 jul madrugada | ~4.000 ha (sin cambios) | Libertad Digital |
| 11 jul ~10:15 | 6.600 | Telecinco/Infobae citando emergencias — perímetro ampliado en la noche |
| 11 jul 21:14 | 6.600, «que no han aumentado durante hoy sábado» | DatosAlmería (agregador, balance vespertino) |
| 11 jul 21:36 | 5.255 ha estimadas sobre Sentinel-2 de hoy y ayer | eforestal (técnico independiente, tier estimación) <https://x.com/eforestal/status/2076027991461597232> |
| 11 jul 08:29 (imagen; publicado ~23:45) | 4.753 ha delineadas (suma de polígonos MON1) | Copernicus EMS · EMSR892 MON1 |
| 12 jul 11:15 | **~7.000** — balance de la comparecencia de estabilización (Moreno, PMA) | eldiario.es / EL PAÍS / La Voz relatando al presidente |
| 12 jul 20:37 (imagen; producto del 13 jul) | 4.820 ha delineadas (1.799 polígonos, producto DEL) | Copernicus EMS · EMSR892 DEL v1 |
