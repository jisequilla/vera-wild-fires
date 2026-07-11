---
name: update-blog
description: Capture session activity as chronicle material and draft/extend chapters of the Los Gallardos fire blog series in its established voice. Use when the user says "captura esto para el blog", "actualiza la crónica", "update the blog/chronicle", or after a session with narratable material (errors caught, notable data, decisions).
---

# Update Blog — la crónica en capítulos

Dos modos. Preguntar cuál solo si no se deduce del contexto.

## Modo A — capturar material (rápido, sin redactar)

Crear conceptos `lesson` o `decision` en `knowledge/incident-okf/lessons/` (perfil: skill `okf-incident-reference`; plantillas: los conceptos existentes del dominio). Tras crear, regenerar índices: `node scripts/gen-index.mjs`. (`blog/material.md` está congelado — era el mecanismo previo.)

Qué merece captura: errores cazados (son el corazón de la serie), datos notables con su momento, decisiones de diseño con su porqué, coincidencias entre fuentes independientes, momentos personales que el usuario mencione. Frontmatter honesto (timestamp real, `time_precision` si es impreciso); la prosa del capítulo llega en el modo B.

## Modo B — redactar/extender un capítulo

### La serie

1. `cronica-evacuacion-con-ia.md` — la evacuación y las lecciones de usar IA en la emergencia.
2. `cronica-2-el-dashboard-vivo.md` — la reconstrucción: dashboard vivo, verificaciones, satélites.
3. `cronica-3-el-debate.md` — la publicación y el debate: sistemas de información ciudadana y salvaguardas.
4. `cronica-4-la-maquina-que-duda.md` — la flota de agentes, OKF como sustrato, el volteo y la auditoría.
5. (posible cierre) La vuelta a casa, cuando el 112 dé su palabra. Corto.

### La voz (no negociable — es la firma de la serie)

- **Español, primera persona** (J3R3). Arco: **empieza personal/sensorial, acaba analítico** (sección de lecciones numeradas en negrita).
- **Los errores propios y de la IA se cuentan, no se esconden** — son la tesis: "la IA amplifica el juicio humano, pero necesita un humano que dude".
- **Humildad ante las víctimas.** Hubo muertos reales. Nada de triunfalismo ("la IA me salvó" está prohibido), nada de convertir la tragedia en anécdota tech.
- Títulos de sección cortos y narrativos ("El olor", "El satélite no negocia").
- Cierra SIEMPRE con: enlace a la siguiente entrega prevista + sección `### Nota sobre las fuentes y la honestidad` (qué es oficial, qué es observación propia, y que ante decisiones reales manda el 112).
- Separadores `---` entre secciones; cursivas para el subtítulo bajo el H1.

### Proceso

1. Leer `knowledge/incident-okf/lessons/` (los conceptos sin `chapter:` son el material fresco) y el capítulo anterior (continuidad de tono y referencias cruzadas).
2. Contrastar cualquier cifra/hora con el bundle (`state/`, `events/`) — la crónica no puede contradecir al conocimiento.
3. Borrador de ~1.200–1.900 palabras, citando concept-ids donde aporte verificabilidad. Ofrecer ajustes de longitud/tono y, si lo pide, versión corta para LinkedIn (800–1.000).
4. Al incorporar un concepto a un capítulo, añadirle `chapter: N` y regenerar índices.

## Reglas

- Solo hechos que ocurrieron. La serie pierde todo su valor si algo resulta embellecido.
- Distinguir siempre observación propia de dato oficial, también dentro de la narración.
- No inventar diálogos ni precisar horas que no constan; "~" y "madrugada" son legítimos.
