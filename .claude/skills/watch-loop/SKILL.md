---
name: watch-loop
description: Arm the hourly graduated watch loop of the Los Gallardos–Bédar fire (full gather sweep → auto-apply only clear official facts → queue+ntfy everything ambiguous). Use when the user asks to "start the loop", "re-arm the watch", "activa el ciclo", after a session restart or a computer reboot. Accepts an optional interval argument ("2h", "3h").
---

# Watch Loop — el ciclo de vigilancia graduado

Arma el ciclo automático **recolectar → aplicar (solo tier claro) → avisar**. El cron vive SOLO en la sesión (muere al cerrar Claude Code o reiniciar el Mac; caduca a los 7 días) — por eso existe esta skill: re-armarlo idéntico con una orden.

## Diseño (acordado con el usuario — no cambiar sin su OK)

La separación gather/apply es la salvaguarda del proyecto; el loop la respeta en modo graduado:

- **Auto-aplica** SOLO: hechos `confidence: oficial` con URL concreta al tuit/comunicado, sin contradicción con el estado vigente y sin vocabulario ambiguo. Cifras y eventos fechados califican.
- **NUNCA auto-aplica**: cambios de estado semántico (`state/situacion`, zonas, carreteras), titulares ambiguos («estabilización», «controlado» sin declaración formal de la autoridad), contradicciones. Eso se presenta en sesión + ping ntfy.
- **La luz verde del 112 para el retorno es SIEMPRE ping, jamás apply silencioso.**

## Procedimiento

1. **Pre-checks**: `date` (la hora real manda) · `CronList` — si ya hay un ciclo armado con este prompt, avisar y no duplicar · confirmar que `.env` existe (NTFY_TOPIC para los pings).
2. **Armar el cron** con `CronCreate`: por defecto `23 * * * *` (cada hora, minuto :23 — off-peak deliberado). Si el usuario pasa intervalo ("2h" → `23 */2 * * *`, "3h" → `23 */3 * * *`). El prompt del job es el bloque canónico de abajo, VERBATIM.
3. **Primer ciclo inmediato**: ejecutar el bloque canónico una vez a mano — valida Chrome/X, satélites y la puerta antes de dejar volar al cron.
4. **Informar**: armado + constraints (sesión viva, Mac despierto, 7 días) + hora del próximo disparo.

## Prompt canónico del job (verbatim en CronCreate)

```
Ciclo horario del panel del incendio (loop graduado acordado con el usuario). Ejecutar en /Users/jeremiasdeisequilla/repos/personal/vera-wild-fires:

1. `date` primero — la hora real manda (jamás timestamps futuros).
2. Barrido /gather-updates COMPLETO: (a) satélites: node scripts/fetch-firms.mjs && node scripts/fetch-copernicus.mjs && node scripts/fetch-aemet.mjs; interpretar focos <6h y si hay producto Copernicus MON nuevo; (b) X con la sesión de Chrome del usuario: búsqueda live https://x.com/search?q=%23IFLosGallardos&f=live (si sale esqueleto vacío, 2 intentos y saltar); (c) live blogs de prensa del registro directory/ vía WebFetch; (d) WebSearch de cierre "incendio Los Gallardos última hora" con la fecha real; (e) vigilancia expresa Valle del Este / retorno / luz verde 112 / Ayuntamiento de Vera.
3. APLICAR SOLO el tier claro: hechos confidence=oficial con URL concreta al tuit/comunicado, sin contradicción con el estado actual y sin vocabulario ambiguo ("estabilización", "parcialmente", "controlado" solo si la autoridad lo declara formalmente). Cifras (state/ métricas) y eventos fechados SÍ califican; cambios de estado semántico (zonas, carreteras, state/situacion) NO se auto-aplican — se quedan en cola para el usuario.
4. Si se aplicó algo: node scripts/gen-index.mjs && node scripts/project-dashboard.mjs, luego node scripts/audit.mjs SOLO en su propia invocación (JAMÁS encadenado con | ni &&) — solo con audit verde: git add explícito de los paths tocados (nunca -A), commit y push (gh auth switch -u jisequilla si hace falta). Si el push es rechazado (el cron de Actions empujó antes): git pull --rebase y OJO — en rebase, --ours es el REMOTO; tras resolver, re-proyectar y re-auditar antes de push.
5. TODO lo demás (contradicciones, titulares ambiguos, señales de VdE/retorno, luz verde del 112) → presentar el parte en la sesión Y enviar ntfy push: source .env y curl -H "Title: Parte IFLosGallardos" -H "Priority: high" -d "<resumen 1-2 líneas>" https://ntfy.sh/$NTFY_TOPIC. La luz verde del 112 SIEMPRE es ping, nunca apply silencioso.
6. Si el barrido viene vacío (sin hechos nuevos) este ciclo y el anterior también, decirlo en una línea y proponer al usuario espaciar el ciclo a 2-3 h.
7. Cerrar con un parte breve: qué se aplicó (hora+fuente), qué quedó en cola, qué significa para Valle del Este / A-7 / retorno.
```

## Lecciones ya incorporadas al prompt (no re-aprender)

- El rebase contra el cron de Actions: `--ours` en rebase es el remoto, no lo tuyo (nos comió una proyección el 11 jul).
- Audit siempre solo, jamás con tuberías (`lessons/tuberia-que-cego-al-guardian`).
- Facebook (Ayto Vera) puede no estar permitido en la sesión del navegador → "no consultada" y seguir.
- FIRMS reescribe `layers.json` aunque no haya novedad — sin cambio de capas, no es un hecho.

## Desarmar

`CronList` → `CronDelete <id>`. Espaciar = desarmar + re-armar con el intervalo nuevo.
