# Vera Wild Fires — Dashboard del Incendio de Los Gallardos–Bédar

Dashboard de seguimiento del incendio forestal declarado el 9 de julio de 2026 en Los Gallardos (Almería), extendido a Bédar y Antas. Datos separados de presentación: todo el contenido vive en `data/incident.json`; los HTML lo leen en runtime y se refrescan solos.

> ⚠️ **Este panel es informativo y NO sustituye instrucciones oficiales.** Para cualquier decisión real: **112**, Guardia Civil (**062**), [@Plan_INFOCA](https://x.com/Plan_INFOCA).

## Estructura

```
data/incident.json     ← única fuente de verdad (editar SOLO esto)
data/copernicus/       ← perímetro oficial (Copernicus EMS EMSR892, GeoJSON)
data/firms/            ← focos de calor NASA FIRMS 24 h (GeoJSON)
index.html             ← dashboard "incident report" (cronología, cifras, zonas, contactos)
map.html               ← mapa Leaflet (capas satelitales + fases, evacuaciones, cortes, ruta)
assets/app.js          ← fetch del JSON + polling cada 15 min + "hace X min"
scripts/update.mjs     ← CLI para actualizar el JSON con timestamp
scripts/fetch-copernicus.mjs ← baja el producto vectorial más reciente de EMSR892
scripts/fetch-firms.mjs      ← baja y recorta los focos de calor FIRMS
originals/             ← artefactos HTML originales de la sesión de chat (referencia)
blog/                  ← crónica en capítulos + material.md (log crudo)
.claude/skills/        ← flujo agéntico (ver abajo)
```

## Flujo agéntico (Claude Code)

Las reglas invariantes viven en `CLAUDE.md`; los procedimientos, en tres skills:

1. **`/gather-updates`** — barre todas las fuentes (scripts satelitales, X con la sesión del usuario, live blogs, búsqueda) y produce un *parte de novedades* con fuente, hora y confianza. **No toca el panel.**
2. **`/update-dashboard`** — aplica hechos verificados al JSON y las capas, y verifica el render en el navegador.
3. **`/update-blog`** — captura material narrable en `blog/material.md` y redacta capítulos de la crónica en su voz.

La separación recolectar/aplicar es deliberada: entre ambas vive la verificación humana.

## Ejecutar en local

`fetch()` no funciona sobre `file://`, así que sirve la carpeta:

```bash
python3 -m http.server 8000
# → http://localhost:8000          (dashboard)
# → http://localhost:8000/map.html (mapa)
```

## Actualizar datos

Editar `data/incident.json` a mano, o usar el CLI (sella `meta.updatedAt` automáticamente):

```bash
# Solo sellar timestamp
node scripts/update.mjs

# Cambiar valores (ruta con puntos; los índices de array son números)
node scripts/update.mjs --set stats.3.n="~4.200" --set map.statusPill="Nuevo estado"

# Añadir evento a la cronología (se marca como AHORA)
node scripts/update.mjs --event '{"timeLabel":"VIE 10 · 17:00","kind":"escalate","title":"Título","html":"Cuerpo con <b>negritas</b>.","sources":[{"name":"Medio","url":"https://…"}]}'
```

El front hace polling del JSON cada 15 minutos — en producción basta con hacer commit del JSON y los visitantes ven el cambio sin recargar.

## Principios de datos

- **Marcar oficial vs. observación propia** — los eventos con `"observation": true` muestran la etiqueta "incluye observación propia".
- **No inventar cifras** — si una fuente no confirma, mantener el valor anterior con su timestamp.
- **Cada evento enlaza a su fuente original** (`sources[].url`).
- Los **perímetros del mapa son aproximados** (dibujados a partir de partes oficiales y prensa), no cartografía oficial.

## Deploy

Workflow de GitHub Pages en `.github/workflows/deploy.yml` — se despliega en cada push a `main`. Activar Pages en el repo: *Settings → Pages → Source: GitHub Actions*.

## Roadmap (Nivel 2–3 del handoff)

- [x] **Copernicus EMS Rapid Mapping** (EMSR892) → perímetro real en el mapa. Refrescar con `node scripts/fetch-copernicus.mjs` cuando salga cada producto de monitorización
- [x] **NASA FIRMS** → focos de calor de las últimas 24 h en el mapa (4 satélites, coloreados por antigüedad). Refrescar con `node scripts/fetch-firms.mjs`
- [x] GitHub Action en cron (`.github/workflows/ingest.yml`, cada ~30 min) — ejecuta `fetch-firms` + `fetch-copernicus`, commitea solo si las capas cambiaron y dispara el deploy
- [ ] **AEMET OpenData** (API key gratuita) → ventana de riesgo meteorológica automática
- [ ] Detección de cambios en cifras clave → notificación (ntfy.sh / Telegram)
- [ ] Registro histórico append-only para reconstruir la evolución
