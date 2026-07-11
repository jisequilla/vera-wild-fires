#!/usr/bin/env node
/**
 * Descarga la cartografía vectorial más reciente de Copernicus EMS para EMSR892
 * (área quemada + frentes de fuego) y actualiza la config del mapa.
 *
 * Uso: node scripts/fetch-copernicus.mjs
 *
 * Elige el producto más nuevo entre la delineación y sus monitorizaciones
 * (DEL, MON1, MON2…) que tenga capas vectoriales publicadas.
 */

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const API = 'https://rapidmapping.emergency.copernicus.eu/backend/dashboard-api/public-activations/?code=EMSR892';
const UA = { headers: { 'User-Agent': 'vera-wild-fires-dashboard/1.0' } };

const res = await fetch(API, UA);
if (!res.ok) throw new Error(`API Copernicus: HTTP ${res.status}`);
const activation = (await res.json()).results[0];

const products = activation.aois.flatMap(aoi => aoi.products);
const candidates = products
  .map(p => {
    const area = p.layers?.find(l => l.json?.includes('observedEventA'));
    const lines = p.layers?.find(l => l.json?.includes('observedEventL'));
    const acquired = p.images?.[0]?.acquisitionTime;
    return area && acquired ? { p, area, lines, acquired } : null;
  })
  .filter(Boolean)
  .sort((a, b) => new Date(b.acquired) - new Date(a.acquired));

if (!candidates.length) throw new Error('Ningún producto con capas vectoriales publicadas todavía.');

const best = candidates[0];
const tag = best.p.monitoring ? `MON${best.p.monitoringNumber}` : 'DEL';
const version = best.p.version?.number ?? 1;
console.log(`Producto más reciente: ${tag} v${version} · imagen ${best.acquired} UTC`);

mkdirSync(join(ROOT, 'data', 'copernicus'), { recursive: true });
const areaFile = `EMSR892_AOI01_${tag}_observedEventA_v${version}.json`;
const linesFile = `EMSR892_AOI01_${tag}_observedEventL_v${version}.json`;

async function download(url, file) {
  const r = await fetch(url, UA);
  if (!r.ok) throw new Error(`${url}: HTTP ${r.status}`);
  const body = await r.text();
  JSON.parse(body); // validar antes de escribir
  writeFileSync(join(ROOT, 'data', 'copernicus', file), body);
  console.log(`✓ ${file} (${(body.length / 1024).toFixed(0)} KB)`);
}

await download(best.area.json, areaFile);
if (best.lines) await download(best.lines.json, linesFile);

// Actualizar la config del mapa en incident.json
const incidentPath = join(ROOT, 'data', 'incident.json');
const incident = JSON.parse(readFileSync(incidentPath, 'utf8'));
const acquiredUtc = new Date(best.acquired + 'Z');
const cest = new Intl.DateTimeFormat('es-ES', { timeZone: 'Europe/Madrid', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }).format(acquiredUtc);
incident.map.copernicus = {
  product: `EMSR892 · ${tag} v${version}`,
  areaUrl: `./data/copernicus/${areaFile}`,
  linesUrl: best.lines ? `./data/copernicus/${linesFile}` : null,
  acquiredLabel: `${cest} CEST`,
  attribution: '© European Union, Copernicus Emergency Management Service'
};
writeFileSync(incidentPath, JSON.stringify(incident, null, 2) + '\n');
console.log(`✓ map.copernicus → ${tag} v${version} (imagen ${cest} CEST)`);
console.log('Recuerda: node scripts/update.mjs para sellar meta.updatedAt');
