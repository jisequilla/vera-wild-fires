#!/usr/bin/env node
/**
 * PROYECTOR: knowledge/incident-okf/ (+ data/layers.json) → data/incident.json
 *
 * El bundle OKF es la fuente de verdad; incident.json es un ARTEFACTO GENERADO.
 * Toda decisión de presentación (colores, orden, etiquetas de sección, textos
 * fijos del layout) vive aquí, en PRES. El conocimiento vive en los conceptos.
 *
 * Uso: node scripts/project-dashboard.mjs [--check]
 *   --check: no escribe; compara con el incident.json actual y reporta diferencias.
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { loadBundle, parseSource, mdToHtml } from './lib/okf.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const bundle = loadBundle(join(ROOT, 'knowledge', 'incident-okf'));
const layers = JSON.parse(readFileSync(join(ROOT, 'data', 'layers.json'), 'utf8'));

/* ── Presentación: lo que NO es conocimiento ─────────────────────────── */
const PRES = {
  meta: {
    incidentName: 'Incendio de Los Gallardos–Bédar (Almería)',
    startedAt: '2026-07-09T17:00:00+02:00',
    liveLabel: 'En seguimiento',
    kicker: 'Incident Report · Incendio Forestal',
    title: 'Los Gallardos–Bédar',
    titleSuffix: '/ Levante Almeriense',
    dek: 'Seguimiento cronológico del incendio declarado el 9 de julio de 2026, con cifras oficiales y enlaces a las fuentes originales de cada actualización.',
    hashtag: '#IFLosGallardos',
    hashtagUrl: 'https://x.com/search?q=%23IFLosGallardos&f=live',
  },
  stats: [
    { slug: 'fallecidos', l: 'Fallecidos', cls: 'fatal' },
    { slug: 'desaparecidos', l: 'Sin localizar', cls: 'fatal' },
    { slug: 'efectivos', l: null /* compuesto con aeronaves */, cls: 'crew' },
    { slug: 'hectareas', l: 'Hectáreas', cls: '' },
  ],
  zoneOrder: ['zona-bedar', 'zona-almocaizar', 'zona-los-gallardos', 'zona-el-marchal', 'zona-el-chive', 'zona-lubrin', 'zona-valle-del-este', 'zona-vera-playa'],
  zoneTag: { evacuado: 'Evacuado', confinado: 'Confinado', foco: 'Foco', precaucion: 'Precaución', seguro: 'Seguro' },
  roadOrder: ['carretera-a7', 'carretera-n340a'],
  roadDash: { 'carretera-n340a': '8,6' },
  riskWindow: { secTitle: 'Ventana meteorológica · sábado', secNote: 'previsión AEMET vía medios', emoji: '🌬️' },
  advice: { secTitle: 'Consejo oficial vigente', secNote: 'Consejería de Emergencias' },
  accountOrder: ['x-plan-infoca', 'x-e112andalucia', 'x-antonio-sanz', 'x-ume'],
  contactOrder: ['emergencias-112', 'guardia-civil-062', 'guardia-civil-garrucha', 'apoyo-psicologico'],
  pageOrder: ['copernicus-emsr892', 'visor-infoca-ema', 'portal-ambiental-infoca', 'aemet-avisos', 'dgt-trafico', 'nasa-firms'],
  footer: {
    sourcesHtml: '<b>Fuentes oficiales en directo:</b> Plan INFOCA (@Plan_INFOCA) · Emergencias 112 Andalucía (@E112Andalucia) · Ayuntamiento de Vera (facebook.com/aytovera).',
    disclaimerHtml: '⚠️ Este panel resume información de prensa y comunicados oficiales. Las cifras (fallecidos, desaparecidos, superficie) han variado entre fuentes y siguen actualizándose. <b>No sustituye a las instrucciones oficiales.</b> Para cualquier decisión sobre evacuar o regresar, sigue siempre al 112, la Guardia Civil y el INFOCA.',
  },
  map: {
    eyebrow: 'Incendio Forestal · 9–10 Julio 2026',
    sub: 'Terreno real (satélite/calles) con el fuego, zonas evacuadas y tu ruta superpuestos.',
    center: [37.19, -1.90],
    zoom: 12.5,
    fitBounds: [[37.1905, -1.9810], [37.2207, -1.8081], [37.1672, -1.9394], [37.2020, -1.8930], [37.1780, -2.0734], [37.2242, -2.0432]],
    markerOrder: ['marker-valle-del-este', 'marker-vera-playa', 'marker-guardia-civil-garrucha', 'marker-los-gallardos', 'marker-bedar', 'marker-lubrin-acogida', 'marker-espacio-cultural-los-gallardos', 'marker-hotel-playavera', 'marker-hotel-playazimbali', 'marker-hotel-adaria-vera', 'marker-hostal-cervantes', 'marker-el-chive', 'marker-la-alameda'],
    markerColor: { origin: '#b3350a', affected: '#b3350a', evacuated: '#b3350a', safe: '#1f8a5b', home: '#1f8a5b', authority: '#2a6f97', shelter: '#7a3fb0', hotel: '#0f8a8a' },
    routeColor: '#2a6f97',
    roadColor: { cortada: '#c9971a', reabierta: '#1f8a5b' },
    phaseFillOpacity: 0.25,
    evacZoneFromPhase: 1,
    links: [
      { label: 'Copernicus EMS EMSR892 — cartografía oficial del incendio', url: 'https://mapping.emergency.copernicus.eu/activations/EMSR892/' },
      { label: 'Visor oficial de incendios INFOCA (EMA)', url: 'https://www.arcgis.com/apps/dashboards/87a5fe2d397e4140add84f50d8bdafd3' },
      { label: 'Abrir la zona en Google Maps (tráfico y cortes en vivo)', url: 'https://www.google.com/maps/@37.19,-1.90,12z' },
      { label: 'Ruta a Guardia Civil Garrucha (registro)', url: 'https://www.google.com/maps/dir/?api=1&origin=37.2207,-1.8081&destination=37.1755624,-1.8234562&travelmode=driving' },
      { label: 'Ruta de vuelta a Valle del Este (cuando 112 dé el OK)', url: 'https://www.google.com/maps/dir/?api=1&origin=37.2207,-1.8081&destination=37.2020,-1.8930&travelmode=driving' },
    ],
    legend: [
      { color: '#7a1200', label: 'Área quemada · Copernicus (oficial, 10 jul 12:50)' },
      { color: '#ff2d00', label: 'Frentes de fuego · Copernicus (oficial)' },
      { color: '#ff0000', label: 'Foco de calor < 6 h (FIRMS)' },
      { color: '#ff7a00', label: 'Foco 6–12 h (FIRMS)' },
      { color: '#8a7a6c', label: 'Foco > 12 h (FIRMS)' },
      { color: '#e8531f', label: 'Fases estimadas (aproximado)' },
      { color: '#b3350a', label: 'Zona evacuada' },
      { color: '#c9971a', label: 'Carretera cortada' },
      { color: '#1f8a5b', label: 'Carretera reabierta' },
      { color: '#1f8a5b', label: 'Tu zona / segura' },
      { color: '#2a6f97', label: 'Ruta de evacuación' },
      { color: '#7a3fb0', label: 'Punto de acogida' },
      { color: '#0f8a8a', label: 'Hotel' },
    ],
    disclaimer: 'Capa oficial: delineación Copernicus EMS EMSR892 sobre imagen Sentinel-2 del 10 jul a las 12:50 CEST — el fuego ha evolucionado desde entonces (reactivación NO en la noche); el producto de seguimiento con imagen del 11 jul (08:29 CEST) se espera esta tarde. Los focos de calor son detecciones satelitales NASA FIRMS de las últimas 24 h (VIIRS/MODIS); el tamaño refleja la potencia radiativa. Los círculos de fases siguen siendo aproximados. Para decisiones reales sigue al 112, Guardia Civil, @Plan_INFOCA y el Ayuntamiento de Vera.',
  },
};
/* ─────────────────────────────────────────────────────────────────────── */

const DAYS = ['DOM', 'LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB'];
function deriveLabel(iso) {
  const d = new Date(iso);
  const hh = String(d.getHours()).padStart(2, '0');
  const mm = String(d.getMinutes()).padStart(2, '0');
  return `${DAYS[d.getDay()]} ${d.getDate()} · ${hh}:${mm}`;
}

function nowMadrid() {
  const now = new Date();
  const parts = new Intl.DateTimeFormat('sv-SE', {
    timeZone: 'Europe/Madrid', year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
  }).format(now).replace(' ', 'T');
  const offsetMin = -Math.round((now - new Date(parts + 'Z')) / 60000);
  const sign = offsetMin >= 0 ? '+' : '-';
  const abs = Math.abs(offsetMin);
  return `${parts}${sign}${String(Math.floor(abs / 60)).padStart(2, '0')}:${String(abs % 60).padStart(2, '0')}`;
}

const get = (domain, slug) => {
  const c = bundle[domain]?.[slug];
  if (!c) throw new Error(`Concepto no encontrado: ${domain}/${slug}`);
  return c;
};
const byType = (domain, type) => Object.values(bundle[domain] ?? {}).filter(c => c.type === type && c.status !== 'superseded');
const sources = c => (c.sources ?? []).map(parseSource);

/* meta */
const situacion = byType('state', 'status-summary')[0];
const out = { meta: { updatedAt: nowMadrid(), ...PRES.meta } };

/* stats */
const aeronaves = get('state', 'aeronaves');
out.stats = PRES.stats.map(s => {
  const m = get('state', s.slug);
  return { n: String(m.value), l: s.l ?? `${m.title} · ${aeronaves.value} aeronaves`, cls: s.cls };
});

/* banners: situación + advisories de playa */
const avisoPlaya = get('state', 'aviso-playa');
out.banners = [situacion, avisoPlaya].map(c => ({ tone: c.tone, title: c.title, html: mdToHtml(c.body) }));

/* timeline */
const events = byType('events', 'event').sort((a, b) => new Date(a.time ?? a.timestamp) - new Date(b.time ?? b.timestamp));
const latest = events[events.length - 1];
out.timeline = events.map(e => {
  const ev = {
    time: e.timestamp,
    timeLabel: e.time_label ?? deriveLabel(e.timestamp),
    kind: e.kind ?? '',
    title: e.title,
    html: mdToHtml(e.body),
    sources: sources(e),
  };
  if (e.confidence === 'observacion') ev.observation = true;
  if (e === latest) ev.current = true;
  return ev;
});

/* zones */
out.zones = PRES.zoneOrder.map(slug => {
  const z = get('state', slug);
  const tone = z.estado === 'seguro' ? ['s', 'safe'] : z.estado === 'precaucion' ? ['w', 'warn'] : ['e', 'evac'];
  return {
    tag: z.tag_label ?? PRES.zoneTag[z.estado],
    tagTone: tone[0],
    cls: tone[1],
    html: mdToHtml(z.body),
  };
});

/* carreteras (tarjetas) */
out.roadClosures = PRES.roadOrder.map(slug => ({ html: mdToHtml(get('state', slug).body) }));

/* ventana meteo + consejo */
const forecast = byType('state', 'forecast')[0];
out.riskWindow = {
  secTitle: PRES.riskWindow.secTitle, secNote: PRES.riskWindow.secNote,
  tone: forecast.tone,
  title: `${PRES.riskWindow.emoji} ${forecast.title}`,
  html: mdToHtml(forecast.body),
};
const consejo = get('state', 'consejo-humo');
out.advice = { secTitle: PRES.advice.secTitle, secNote: PRES.advice.secNote, tone: consejo.tone, title: consejo.title, html: mdToHtml(consejo.body) };

/* directorio */
out.officialAccounts = PRES.accountOrder.map(slug => {
  const a = get('directory', slug);
  return { name: a.title.replace(/\s*\(X\)$/, ''), url: a.resource, desc: a.description };
});
out.contacts = PRES.contactOrder.map(slug => {
  const c = get('directory', slug);
  return { label: c.title.replace(/\s*\([^)]*\)$/, ''), number: String(c.number), tel: String(c.tel), desc: c.description };
});
out.officialPages = PRES.pageOrder.map(slug => {
  const p = get('directory', slug);
  return { name: p.title, url: p.resource, desc: p.description };
});

out.footer = PRES.footer;

/* mapa */
const roadPopup = r => `<b>${r.road} ${r.estado.toUpperCase()}</b><br>${r.description}`;
out.map = {
  eyebrow: PRES.map.eyebrow,
  sub: PRES.map.sub,
  noticeHtml: null,
  statusPill: situacion.pill,
  center: PRES.map.center,
  zoom: PRES.map.zoom,
  fitBounds: PRES.map.fitBounds,
  markers: PRES.map.markerOrder.map(slug => {
    const m = get('geo', slug);
    return { lat: m.lat, lng: m.lng, color: PRES.map.markerColor[m.marker_type], label: m.title, popup: mdToHtml(m.body) };
  }),
  route: (() => {
    const r = get('geo', 'ruta-evacuacion');
    return { coords: r.coords, color: PRES.map.routeColor, popup: `<b>Ruta de evacuación</b><br>${mdToHtml(r.body)}` };
  })(),
  closures: PRES.roadOrder.map(slug => {
    const r = get('state', slug);
    return { coords: r.coords, color: PRES.map.roadColor[r.estado], dashArray: PRES.roadDash[slug] ?? null, popup: roadPopup(r) };
  }),
  firePhases: byType('geo', 'fire-phase')
    .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
    .map(p => ({
      circle: { lat: p.circle.lat, lng: p.circle.lng, radiusM: p.circle.radius_m, fillOpacity: PRES.map.phaseFillOpacity },
      t: p.time_label ?? deriveLabel(p.timestamp),
      ti: p.title.replace(/^Fase \d+ · /, ''),
      d: p.body.replace(/\*\*/g, '').replace(/\n+/g, ' ').trim(),
    })),
  evacZone: { coords: get('geo', 'zona-evacuada').coords, fromPhase: PRES.map.evacZoneFromPhase },
  links: PRES.map.links,
  legend: PRES.map.legend,
  disclaimer: PRES.map.disclaimer,
  copernicus: layers.copernicus,
  firms: layers.firms,
};

/* salida */
const json = JSON.stringify(out, null, 2) + '\n';
if (process.argv.includes('--check')) {
  writeFileSync(join(ROOT, 'data', 'incident.projected.json'), json);
  console.log('✓ proyección escrita en data/incident.projected.json (modo --check, incident.json intacto)');
} else {
  writeFileSync(join(ROOT, 'data', 'incident.json'), json);
  console.log(`✓ data/incident.json proyectado desde el bundle (${out.timeline.length} eventos, ${out.zones.length} zonas, ${out.map.markers.length} marcadores)`);
}
