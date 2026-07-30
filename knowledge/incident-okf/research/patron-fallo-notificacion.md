---
type: dossier
title: ¿Se repite en Madrid–Ávila el fallo de notificación de Los Gallardos?
description: Sí en la capa física —el fuego destruye la infraestructura de la que depende el aviso— y no verificado en la capa de decisión: que no se activara ES-Alert está documentado en Almería, no en Madrid.
timestamp: 2026-07-30T08:50:00+02:00
time_precision: aproximada
confidence: prensa
status: vigente
sources:
  - "The Objective (29 jul 2026) <https://theobjective.com/tecnologia/2026-07-29/fallos-comunicacion-incendio-almeria-madrid-avila/>"
  - "Comunidad de Madrid · página oficial #IFSierraOeste <https://www.comunidad.madrid/seguridad-emergencias-asem-112/incendio-forestal-sierra-oeste-ifsierraoeste-julio-2026>"
  - "La Voz de Almería (29 jul): «Los testimonios cuestionan la notificación de la emergencia»"
relates_to:
  - events/2026-07-24-plataforma-afectados
  - state/fallecidos
tags: [notificacion, es-alert, comparado, responsabilidades]
---

**Respuesta corta.** Hay que separar dos capas que la prensa mezcla. La **física**
—el fuego destruye la infraestructura de telecomunicaciones de la que depende el
aviso— se repite en Madrid y Ávila, documentada en ambos incidentes. La **de
decisión** —no activar ES-Alert— está documentada en Almería y **no está
verificada** en Madrid: la página oficial de la Comunidad de Madrid no menciona
ES-Alert en ningún punto. Ausencia de mención no es prueba de ausencia de alerta.

## Lo que ocurrió en Los Gallardos

**ES-Alert no se activó** en las primeras horas. La justificación es de Antonio
Sanz, consejero de Sanidad, Presidencia y Emergencias de la Junta de Andalucía:
unas viviendas debían evacuarse y otras confinarse, así que un mensaje único
podría generar confusión. *(confianza: prensa citando declaración oficial)*

En paralelo, la infraestructura falló: **varias antenas de telefonía quedaron
inutilizadas por el fuego** —reconocido por la propia Junta— y hubo **pérdidas de
señal en REJA**, la red digital profesional de emergencias de Andalucía, según
denunció Valentín Laínez, bombero forestal y secretario de organización de CGT en
el INFOCA. La Junta sostiene que la red de coordinación profesional siguió
funcionando. *(confianza: prensa; la discrepancia entre sindicato y
administración se registra, no se resuelve)*

Las familias de las víctimas y la plataforma de afectados sitúan sus quejas
justamente ahí: en **cómo se notificó** la emergencia
([`events/2026-07-24-plataforma-afectados`](../events/2026-07-24-plataforma-afectados.md)).

## Lo que ocurre en Madrid–Ávila

La capa física se repite con nitidez y con cifras: **16 municipios y unos 40
núcleos de población** perdieron cobertura móvil o fija por fibra cortada,
estaciones base dañadas y cortes de suministro eléctrico. Las operadoras
desplegaron medidas de contingencia —unidades móviles de Vodafone en Pelayos de
la Presa y Cenicientos, servicio de contingencia de MasOrange para unos 5.000
usuarios sin 5G, wifi por satélite en el centro de evacuación de San Martín de
Valdeiglesias, y activación de Starlink *Direct to Cell*—. Cuatro estaciones en
Ávila quedaron apagadas por acceso bloqueado por el fuego. *(confianza: prensa)*

**Sobre ES-Alert en Madrid no hay dato.** La página oficial del `#IFSierraOeste`
de la Comunidad de Madrid enumera once municipios evacuados o confinados —Pelayos
de la Presa, San Martín de Valdeiglesias, Villa del Prado, Villamanta, Navas del
Rey, Cadalso de los Vidrios, Cenicientos, Navalagamella, Sotillo de la Adrada,
Casillas y Fresnedillas de la Oliva—, cifra ~34.000 ha en la Comunidad y declara
el incendio estabilizado, pero **no menciona ES-Alert ni una vez**. Los canales de
comunicación que declara son el 112, un teléfono de atención y sus redes sociales.

## El patrón, nombrado con precisión

Lo que se repite y está probado es una **dependencia circular**: el sistema de
aviso masivo viaja por la misma infraestructura de telefonía que el incendio
destruye. Cuanto más grave es el fuego, menos capacidad de avisar queda —
exactamente cuando más falta hace. No es un fallo de gestión de una comunidad
concreta; es una propiedad del diseño.

Lo que **no** está probado es que la decisión de no alertar se haya repetido. Ese
salto lo insinúan los titulares y no lo sostiene ninguna fuente consultada.

## Lo que este dossier no afirma

No adjudica responsabilidades. Hay una **investigación judicial abierta** sobre el
origen del incendio de Los Gallardos y un debate político vivo, con el PSOE-A
pidiendo comisión de investigación y la Junta acusando de rédito político. Este
dossier registra qué dijo cada quién y con qué respaldo; no dictamina si la
decisión sobre ES-Alert fue correcta, ni si un aviso masivo habría salvado vidas.
Nadie con los datos públicos puede afirmar eso.

## Discrepancia con nuestro propio bundle

The Objective (29 jul) cifra **13 fallecidos**; este bundle sostiene **14** desde
el fallecimiento del día 28 ([`state/fallecidos`](../state/fallecidos.md)). El
artículo va un día por detrás. Prevalece el bundle, que tiene fuente y hora del
hecho posterior.

## Validación lateral, y útil

**Sotillo de la Adrada** aparece a la vez en la lista oficial de municipios
evacuados de la Comunidad de Madrid y entre los focos FIRMS que detectamos por
nuestra cuenta el 30 de julio. La detección satelital independiente coincidió con
el municipio oficialmente afectado — señal de que la ingesta FIRMS sirve para
localizar dónde mirar, aunque no para nombrar qué incendio es.

## Pendiente de comprobar

Si ES-Alert se activó en Madrid o Ávila, cuándo y con qué texto. La fuente que lo
resolvería es la Delegación del Gobierno o Protección Civil estatal, no la página
autonómica. Hasta tenerlo, la comparación queda a medias y así debe presentarse.
