---
type: contradiction
title: Fallecidos — 11 vs 12 entre fuentes
description: Durante horas del día 10 convivieron dos cifras oficiales de fallecidos; prevaleció la de presidencia (12).
timestamp: 2026-07-10T13:30:00+02:00
confidence: prensa-oficial
status: vigente
triage: confirmado
sources:
  - "Estrella Digital <https://www.estrelladigital.es/articulo/sucesos/incendio-devastador-gallardos-almeria-deja-19-personas-localizar-11-fallecidos/20260710102849448536.html>"
  - "El Español <https://elespanol.com/espana/andalucia/20260710/incendio-gallardos-almeria-ultima-hora-fuego-deja-muertos-desaparecidos-quemar-hectareas/1003744316760_10.html>"
relates_to:
  - state/fallecidos
  - events/2026-07-10-balance-oficial-superficie
  - events/2026-07-10-moreno-fase-control-lenta
tags: [victimas, discrepancia-fuentes]
---

A las ~11:00 del día 10 la Junta **rebajó** el balance a 11 fallecidos (con 19
desaparecidos); a las ~13:30 el presidente Moreno lo **elevó de nuevo a 12** (con
23 desaparecidos, identificación por ADN). Ambas cifras convivieron en prensa
durante horas.

**Resolución**: prevaleció la cifra de presidencia (12), que es la vigente en
`state/fallecidos`. La fluctuación completa (6 → 12 → 11 → 12) queda documentada
en el cuerpo de esa métrica. Triage `confirmado`: la contradicción fue real y se
resolvió; se conserva como registro del patrón "las cifras fluctúan entre
fuentes en emergencias".
