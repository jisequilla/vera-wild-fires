---
name: update-blog
description: Capture session activity as chronicle material and draft/extend chapters of the Los Gallardos fire blog series in its established voice. Use when the user says "captura esto para el blog", "actualiza la crónica", "update the blog/chronicle", or after a session with narratable material (errors caught, notable data, decisions).
---

# Update Blog — la crónica en capítulos

Dos modos. Preguntar cuál solo si no se deduce del contexto.

## Modo A — capturar material (rápido, sin redactar)

Añadir a `blog/material.md` (crearlo si no existe) entradas crudas con fecha/hora real:

```markdown
## 2026-07-11 · sesión de la madrugada
- 05:44 — Cazado timestamp futuro (evento fechado 09:00 siendo las 05:44). Lección: dudar del proceso, no solo del modelo.
- ~06:00 — EMSR671 resultó ser La Palma 2023; el real es EMSR892. Verificado abriendo la ficha antes de enlazar.
```

Qué merece captura: errores cazados (son el corazón de la serie), datos notables con su momento, decisiones de diseño con su porqué, coincidencias entre fuentes independientes, momentos personales que el usuario mencione. Crudo y fechado; la prosa llega en el modo B.

## Modo B — redactar/extender un capítulo

### La serie

1. `cronica-evacuacion-con-ia.md` — la evacuación y las lecciones de usar IA en la emergencia.
2. `cronica-2-el-dashboard-vivo.md` — la reconstrucción: dashboard vivo, verificaciones, satélites.
3. (prevista) El debate: sistemas de información ciudadana para catástrofes y sus salvaguardas.

### La voz (no negociable — es la firma de la serie)

- **Español, primera persona** (J3R3). Arco: **empieza personal/sensorial, acaba analítico** (sección de lecciones numeradas en negrita).
- **Los errores propios y de la IA se cuentan, no se esconden** — son la tesis: "la IA amplifica el juicio humano, pero necesita un humano que dude".
- **Humildad ante las víctimas.** Hubo muertos reales. Nada de triunfalismo ("la IA me salvó" está prohibido), nada de convertir la tragedia en anécdota tech.
- Títulos de sección cortos y narrativos ("El olor", "El satélite no negocia").
- Cierra SIEMPRE con: enlace a la siguiente entrega prevista + sección `### Nota sobre las fuentes y la honestidad` (qué es oficial, qué es observación propia, y que ante decisiones reales manda el 112).
- Separadores `---` entre secciones; cursivas para el subtítulo bajo el H1.

### Proceso

1. Leer `blog/material.md` y el capítulo anterior (para continuidad de tono y referencias cruzadas).
2. Contrastar cualquier cifra/hora con `data/incident.json` — la crónica no puede contradecir al panel.
3. Borrador de ~1.200–1.900 palabras. Ofrecer al usuario ajustes de longitud/tono y, si lo pide, versión corta para LinkedIn (800–1.000).
4. Las entradas de `material.md` ya incorporadas a un capítulo se marcan con `[→ cap. N]`.

## Reglas

- Solo hechos que ocurrieron. La serie pierde todo su valor si algo resulta embellecido.
- Distinguir siempre observación propia de dato oficial, también dentro de la narración.
- No inventar diálogos ni precisar horas que no constan; "~" y "madrugada" son legítimos.
