---
type: metric
title: Hectáreas
description: Superficie final del incendio — 5.200 ha medidas mediante Copernicus, la cifra con la que el Plan INFOCA lo dio por extinguido el 24 de julio.
timestamp: 2026-07-24T21:00:00+02:00
time_precision: aproximada
value: "5.200"
unit: hectáreas
confidence: prensa-oficial
status: vigente
sources:
  - "elDiario.es (24 jul: 5.200 ha medidas vía Copernicus, frente a las 12.200 estimadas inicialmente) <https://www.eldiario.es/andalucia/incendio-gallardos-extinguido-semanas-fuego-causo-muerte-13-personas_1_13406026.html>"
  - "Canal Sur (25 jul: 5.200 ha, «inferior a las 7.000 estimadas en los primeros informes») <https://www.canalsur.es/noticias/andalucia/almeria/infoca-declara-extinguido-incendio-gallardos_1_1425128.html>"
  - "eldiario.es (directo, citando la comparecencia de Moreno en el PMA) <https://www.eldiario.es/sociedad/ultima-hora-incendio-almeria-directo-fuego-gallardos-frena-avance-calcinar-6-600-hectareas_133_13374215.html>"
  - "EL PAÍS (12 jul 12:21) <https://elpais.com/espana/2026-07-12/ultimas-noticias-del-incendio-forestal-de-los-gallardos-almeria-en-directo.html>"
  - "La Voz de Almería <https://www.lavozdealmeria.com/almeria/sucesos/599241/estabilizado-incendio-gallardos-dias-lucha-llamas.html>"
relates_to:
  - events/2026-07-24-extinguido
tags: [superficie, balance]
---

Cifra final: **5.200 hectáreas**, medidas mediante Copernicus — la superficie con
la que el Plan INFOCA dio el incendio por extinguido el 24 de julio, sobre los
términos de Los Gallardos, Bédar, Lubrín y Antas (el más afectado, Bédar).

**La brecha se cerró a favor de los satélites.** Durante toda la emergencia
convivieron dos familias de cifras: la oficial-política (~7.000 ha, balance de la
comparecencia de estabilización de Moreno el 12 jul) y las mediciones técnicas
—producto Copernicus DEL con 1.799 polígonos sumando ~4.820 ha, MON1 con 4.753 y
un análisis independiente sobre Sentinel-2 (eforestal) con 5.255—. Este panel
mantuvo la oficial como valor y mostró ambas. La cifra de cierre, **5.200 ha**,
aterriza dentro del rango técnico y por debajo de la política: la diferencia era,
como se sospechaba, superficie perimetrada que no llegó a quemarse.

Conviene recordar el punto de partida para medir el ajuste: **12.200 ha** llegó a
estimarse en las primeras horas. La cifra final es menos de la mitad.

Aun con 5.200 ha, es el incendio forestal **más letal** registrado en Andalucía
por número de víctimas mortales (14).

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
| 24 jul (extinción) | **5.200** — superficie final medida vía Copernicus; cierra la brecha con las mediciones técnicas | elDiario.es / Canal Sur |
