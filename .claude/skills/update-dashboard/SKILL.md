---
name: update-dashboard
description: Apply verified facts about the Los Gallardos–Bédar fire to data/incident.json and the map layers, then verify the render in the browser. Use after /gather-updates or when the user hands over confirmed facts — "actualiza el dashboard", "añade este evento", "update the map/heat map".
---

# Update Dashboard — aplicar hechos verificados

Consume hechos verificados (del parte de `/gather-updates` o dados por el usuario) y los aplica al panel. Si un hecho llega sin fuente o sin hora, pedirla o marcarlo como estimación — nunca colarlo como confirmado.

## Dónde va cada tipo de hecho

| Hecho | Destino | Cómo |
|---|---|---|
| Suceso con hora | `timeline[]` | `node scripts/update.mjs --event '{...}'` (marca `current` y desmarca el anterior) |
| Cifra global (ha, víctimas, efectivos) | `stats[]` | `--set stats.N.n="..."` — y si la cifra aparece en el banner, actualizar ambos |
| Cambio de situación general | `banners[0]` + `map.statusPill` | script node (el banner es HTML largo) |
| Evacuación/confinamiento nuevo | `zones[]` + marcador en `map.markers` | script node; coordenadas SOLO de Nominatim (`curl nominatim.openstreetmap.org/search?format=json&q=...` con User-Agent) |
| Corte/reapertura de carretera | `roadClosures[]` + `map.closures[]` (+leyenda si cambia el color) | reabierta = verde `#1f8a5b` |
| Previsión meteo | `riskWindow` | tono `safe` si favorable, `ember` si crítica |
| Avance del fuego (aproximado) | `map.firePhases[]` (fase nueva) | círculos aproximados, en fade — lo oficial son las capas satelitales |
| Capas satelitales | `data/copernicus/`, `data/firms/` | `node scripts/fetch-copernicus.mjs` / `fetch-firms.mjs` |
| Página oficial nueva | `officialPages[]` | SOLO tras abrirla y confirmar que es de ESTE incidente |

Ediciones múltiples: un script node inline (leer JSON → mutar → escribir) y **cerrar siempre con `node scripts/update.mjs`** para sellar `meta.updatedAt`. Nunca editar contenido en los HTML.

## Reglas de datos (resumen operativo de CLAUDE.md)

- **Hora del evento < hora actual.** Comprobar la hora real antes de fechar. Impreciso → `timeLabel` con `~` o "madrugada/mañana".
- `kind`: `origin` | `escalate` | `fatal` | `""`. Observación propia del usuario → `"observation": true`.
- Fuente = URL concreta (tuit individual, artículo), no portada ni perfil.
- Contradicción con un evento existente → nuevo evento que la explicite (patrón "Matiz:"), no sobrescribir el viejo.
- Lo que queda obsoleto (una ventana meteo pasada, un banner viejo) se reetiqueta o reemplaza — el panel nunca debe implicar que un aviso caducado sigue vigente.

## Verificación (obligatoria, en este orden)

1. `node -e "JSON.parse(require('fs').readFileSync('data/incident.json','utf8'))"` — parsea.
2. Servidor vivo: `curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:8471/index.html` (si no, `python3 -m http.server 8471 &`).
3. Navegador (pestaña del grupo MCP): recargar `index.html` y `map.html`. **Si se tocó HTML: hard reload (`cmd+shift+r`)** — la caché ya nos escondió una capa entera.
4. Comprobar con `javascript_tool`: `updatedStamp` refleja la hora nueva; nº de eventos; si se tocó el mapa, contar `path.leaflet-interactive` y capas (`copernicusLayers.length`, `firmsLayer.getLayers().length`).
5. Screenshot para el usuario si el cambio es visual.

## Al terminar

Resumir: qué se aplicó (con horas y fuentes), qué se descartó y por qué, y qué significa para el usuario (flanco este / A-7 / visto bueno del 112). Si hubo material narrable (error cazado, dato notable), sugerir `/update-blog`.
