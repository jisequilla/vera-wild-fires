---
type: satellite-layer
title: Capa NASA FIRMS · focos de calor 24 h
description: Focos de calor de las últimas 24 horas (VIIRS/MODIS) de NASA FIRMS sobre la zona del incendio.
timestamp: 2026-07-11T06:06:00+00:00
resource: https://firms.modaps.eosdis.nasa.gov/map/
confidence: oficial
status: vigente
sources:
  - "NASA FIRMS Fire Map <https://firms.modaps.eosdis.nasa.gov/map/>"
tags: [capa, satelite]
---

Focos de calor de las últimas 24 h; última descarga: 2026-07-11 06:06 UTC.

Datos locales versionados en el repo:

- `data/firms/heatspots.json` (GeoJSON agregado)

Se refrescan con `scripts/fetch-firms.mjs` a partir de los CSV públicos de
FIRMS (sin API key): S-NPP VIIRS, NOAA-20 VIIRS, NOAA-21 VIIRS y MODIS
(`firms.modaps.eosdis.nasa.gov/data/active_fire/...`).

Atribución: NASA FIRMS (VIIRS/MODIS).
