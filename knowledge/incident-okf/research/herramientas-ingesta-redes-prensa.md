---
type: dossier
title: "¿Qué herramientas/MCP pueden robustecer la ingesta de X, redes sociales y prensa local del loop?"
description: La palanca gratis e inmediata es RSS (Google News RSS + feed nativo de La Voz, ambos probados hoy); para X no existe atajo legal-gratis — la sesión de Chrome sigue siendo el método, y agent-browser (Vercel Labs) puede volverlo headless y scriptable; Facebook no tiene herramienta viable; el "Context7 de noticias" más cercano es GDELT, con límites duros.
timestamp: 2026-07-11T22:44:00+02:00
confidence: observacion
status: vigente
sources:
  - "Google News RSS (probado con curl, 11 jul 22:38 — devolvió piezas aún no indexadas por WebSearch) <https://news.google.com/rss/search?q=incendio+Los+Gallardos&hl=es&gl=ES&ceid=ES:es>"
  - "La Voz de Almería — feed RSS 2.0 nativo (probado con curl) <https://www.lavozdealmeria.com/rss/>"
  - "vercel-labs/agent-browser — README (abierto y leído) <https://github.com/vercel-labs/agent-browser>"
  - "GDELT DOC API (probado: vivo, límite 1 req/5 s) <https://api.gdeltproject.org/api/v2/doc/doc>"
  - "Guías de precios X API 2026 — sin tier gratuito de lectura <https://www.socialcrawl.dev/blog/x-twitter-api-2026>"
  - "Scrapfly — estado del scraping de X en 2026 (Nitter/snscrape muertos) <https://scrapfly.io/blog/posts/how-to-scrape-twitter>"
  - "Apify — actores/MCP de scraping X (comercial) <https://apify.com/scrapers/twitter>"
relates_to:
  - lessons/decision-loop-graduado
tags: [dossier, herramientas, mcp, rss, x, ingesta]
---

**Respuesta corta:** la mejora más barata y sólida no es un MCP de redes: es
**RSS**. Para X no hay atajo — la sesión de Chrome del autor sigue siendo el
único camino gratis y razonable, y **agent-browser** (el enlace de Vercel
Labs) es el candidato para convertir ese camino en script headless. Facebook
sigue sin solución. El "Context7 de noticias locales" no existe; lo más
cercano es GDELT y el propio Google News RSS por consulta.

**1 · Prensa: RSS, probado hoy mismo.** `news.google.com/rss/search?q=...`
respondió al primer curl con piezas que WebSearch aún no indexaba — incluida
una de El Mundo sobre Endesa y el cable de origen que el loop debe recoger.
La Voz de Almería mantiene un **feed RSS 2.0 real** en `/rss/` (esquiva sus
404 intermitentes y los bloqueos de WebFetch), y Diario de Almería responde
200 en `/rss`. Un `fetch-news.mjs` al estilo de fetch-firms (Google News RSS
por query + feeds nativos, dedupe por URL, salida a un plano para el parte)
convertiría la mitad "prensa" del barrido en determinista. Sin API keys, sin
coste, sin ToS-gris.

**2 · X: no hay puerta trasera legal-gratis en 2026.** La API oficial ya no
tiene tier gratuito de lectura (pay-per-use, ~5 $/1.000 lecturas; los planes
legacy cerrados). Nitter, snscrape y Twint están muertos desde que X eliminó
las cuentas-invitado. Los MCP "listos" (Apify, Bright Data) son wrappers
comerciales de scraping con proxies — coste por uso y zona gris de ToS. El
método actual (leer con TU sesión en TU Chrome) sigue siendo el mejor
equilibrio. La evolución natural es **agent-browser (Vercel Labs)**: CLI en
Rust sobre CDP con demonio persistente, **modo servidor MCP** y — la clave —
**reutilización de perfiles de Chrome y estado de sesión** (`--profile`,
`--restore`, importación de auth de un Chrome ya logueado). Permitiría un
`fetch-x.mjs` headless con la misma sesión, scriptable desde el ciclo, sin
tener la pestaña visible como rehén.

**3 · Facebook: el hueco se queda.** Graph API solo sirve para páginas
propias; los scrapers de terceros están rotos o son de pago con ToS en
contra. El canal del Ayuntamiento de Vera seguirá siendo lectura manual (o
su web/bandos, si publica en paralelo).

**4 · El "Context7 de noticias":** no existe un índice curado de prensa
local española consultable por agentes. Lo más parecido: **GDELT** (índice
global de noticias, actualización cada 15 min, API abierta — probada hoy:
viva, con límite estricto de 1 petición/5 s y metadatos sesgados al inglés)
y el propio Google News RSS, que para cobertura local española rinde mejor.

## Lo verificado

- Google News RSS responde y adelanta a WebSearch → **observacion** (curl,
  11 jul 22:38, con hallazgo inmediato).
- La Voz emite RSS 2.0 en `/rss/`; Diario de Almería 200 en `/rss` →
  **observacion** (curl).
- X API sin lectura gratuita; Basic/Pro legacy cerrados → **prensa** (guías
  de precios 2026 concordantes).
- Nitter/snscrape/Twint inoperativos → **prensa** (Scrapfly, CarryFeed).
- agent-browser: Rust+CDP, headless, MCP, perfiles de Chrome reutilizables →
  **observacion** (README oficial abierto).
- GDELT vivo con rate-limit 1/5 s → **observacion** (dos sondas).

## Lo NO confirmado / abierto

- Contenido real del feed `/rss` de Diario de Almería (respondió 200; falta
  validar que emite artículos y no un portal HTML).
- agent-browser frente al anti-bot de X en headless con perfil importado —
  requiere prueba práctica; X puede invalidar la sesión duplicada.
- Fiabilidad/coste sostenido de los actores Apify "free tier" para X.
- Si el Ayuntamiento de Vera publica sus avisos en algún canal con RSS
  (web municipal/bandos) — alternativa al Facebook vetado, por explorar.
