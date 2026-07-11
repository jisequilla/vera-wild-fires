/** Lectura del Knowledge Bundle OKF: parser del subconjunto YAML del perfil incident. */

import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

function parseScalar(raw) {
  const v = raw.trim();
  if (/^".*"$/.test(v) || /^'.*'$/.test(v)) return v.slice(1, -1);
  if (v === 'true') return true;
  if (v === 'false') return false;
  if (/^\[.*\]$/.test(v)) return v.slice(1, -1).split(',').map(x => parseScalar(x));
  if (/^-?\d+(\.\d+)?$/.test(v)) return Number(v);
  return v;
}

export function parseFrontmatter(text) {
  if (!text.startsWith('---')) return null;
  const end = text.indexOf('\n---', 3);
  if (end === -1) return null;
  const lines = text.slice(4, end).split('\n');
  const fm = {};
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    const top = line.match(/^([\w-]+):\s*(.*)$/);
    if (!top) { i++; continue; }
    const [, key, rest] = top;
    if (rest !== '') { fm[key] = parseScalar(rest); i++; continue; }
    // bloque anidado: lista o mapa de un nivel
    const block = [];
    i++;
    while (i < lines.length && /^\s{2,}\S/.test(lines[i])) { block.push(lines[i]); i++; }
    if (block.length && block[0].trim().startsWith('- ')) {
      fm[key] = block.map(l => parseScalar(l.trim().slice(2)));
    } else {
      const map = {};
      for (const l of block) {
        const m = l.trim().match(/^([\w-]+):\s*(.*)$/);
        if (m) map[m[1]] = parseScalar(m[2]);
      }
      fm[key] = map;
    }
  }
  return { fm, body: text.slice(end + 4).replace(/^-*\n/, '').trim() };
}

/** "Nombre <url>" → {name, url} */
export function parseSource(s) {
  const m = String(s).match(/^(.*?)\s*<(.*)>$/);
  return m ? { name: m[1], url: m[2] } : { name: String(s), url: null };
}

/** Carga el bundle completo: {dominio: {slug: {slug, ...frontmatter, body}}} */
export function loadBundle(root) {
  const bundle = {};
  for (const d of readdirSync(root).filter(x => statSync(join(root, x)).isDirectory())) {
    bundle[d] = {};
    for (const f of readdirSync(join(root, d)).filter(f => f.endsWith('.md') && f !== 'index.md' && f !== 'log.md' && !f.startsWith('_'))) {
      const parsed = parseFrontmatter(readFileSync(join(root, d, f), 'utf8'));
      if (!parsed || !parsed.fm.type) continue;
      const slug = f.replace(/\.md$/, '');
      bundle[d][slug] = { slug, ...parsed.fm, body: parsed.body };
    }
  }
  return bundle;
}

/** Markdown del cuerpo → string HTML plano del dashboard (negritas + una línea). */
export function mdToHtml(md) {
  return md
    .split(/\n{2,}/).map(p => p.replace(/\n/g, ' ').trim()).join(' ')
    .replace(/\*\*(.+?)\*\*/g, '<b>$1</b>')
    .trim();
}
