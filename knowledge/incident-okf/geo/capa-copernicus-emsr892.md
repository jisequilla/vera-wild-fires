---
type: satellite-layer
title: Capa Copernicus EMS · EMSR892 (DEL v1)
description: Cartografía oficial de emergencia de Copernicus para este incendio; área quemada y frentes de fuego observados.
timestamp: 2026-07-10T12:50:00+02:00
resource: https://mapping.emergency.copernicus.eu/activations/EMSR892/
confidence: oficial
status: vigente
sources:
  - "Copernicus EMS · activación EMSR892 <https://mapping.emergency.copernicus.eu/activations/EMSR892/>"
tags: [capa, satelite]
---

Producto **EMSR892 · DEL v1**, adquisición del 10 de julio a las 12:50 CEST.
Verificado que la activación corresponde a ESTE incendio (lección EMSR671).

Datos locales versionados en el repo:

- Área quemada: `data/copernicus/EMSR892_AOI01_DEL_observedEventA_v1.json`
- Frentes de fuego: `data/copernicus/EMSR892_AOI01_DEL_observedEventL_v1.json`

Se refrescan con `scripts/fetch-copernicus.mjs` (dashboard-api pública,
`rapidmapping.emergency.copernicus.eu`).

Atribución: © European Union, Copernicus Emergency Management Service.
