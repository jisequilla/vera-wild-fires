# lessons — la cantera de la crónica

Errores cazados, decisiones con su porqué y coincidencias notables. Sustituye a `blog/material.md`; `chapter: N` marca lo ya incorporado a un capítulo.

<!-- okf:index:begin -->
- **[La coherencia se fuerza, no se recuerda](audit-como-puerta.md)** — scripts/audit.mjs convierte en puerta ejecutable lo que antes era disciplina — bundle válido, proyección fresca, docs sin rutas muertas — y /commit añade la capa de juicio que ningún grep alcanza.
- **[La caché que escondió la capa](cache-navegador.md)** — El navegador sirvió un map.html viejo y la capa Copernicus "no funcionaba"; el fallo no estaba en el código sino en el hard reload que faltaba.
- **[3.198 ≈ 3.200 — la comprobación de coherencia interna](coherencia-copernicus-3198.md)** — La suma de los polígonos vectoriales de Copernicus (3.198 ha) cuadró con la cifra declarada del producto (3.200) — el tipo de check que separa un dato usable de un adorno.
- **[Recolectar y aplicar, separados a propósito](decision-gather-apply-separados.md)** — /gather-updates produce el parte y jamás toca el panel; /update-dashboard consume hechos verificados — entre ambos vive la verificación humana.
- **[El loop graduado: automatizar el barrido, graduar el juicio](decision-loop-graduado.md)** — Ante la propuesta de automatizar «/gather-updates && /update-dashboard» cada hora, la respuesta fue graduar en vez de encadenar — el && habría colapsado la puerta de verificación que ya había cazado tres errores.
- **[Publicar tal cual, con la capa personal incluida](decision-publicar-tal-cual.md)** — Ante tres posturas (tal cual / despersonalizado / acceso restringido), el autor eligió publicar con sus ubicaciones — decisión consciente, con precisión de urbanización, no de dirección. *(personal)*
- **[El proyector que vivía en UTC](el-proyector-que-vivia-en-utc.md)** — Las horas derivadas de la línea de tiempo se desplazaban dos horas cuando proyectaba el cron de GitHub Actions — el runner vive en UTC y deriveLabel usaba la zona horaria local de la máquina.
- **[El satélite calla; la tierra, no](el-satelite-calla-la-tierra-no.md)** — Trece horas sin un solo foco de calor detectado desde órbita — y a la misma hora, la UME rematando llamas reales hacia el cementerio de El Marchal. Dos verdades simultáneas que el panel debía mostrar juntas.
- **[EMSR671 era La Palma 2023](emsr671-la-palma.md)** — El buscador ofreció una activación Copernicus equivocada como si fuera la de este incendio; abrir la ficha antes de enlazar evitó publicar un enlace "oficial" falso.
- **[\"Estabilizado a las 13:00\" — a las 11:27](estabilizado-a-las-13.md)** — La IA mezcló datos de otro incendio (otro año) y sirvió una hora futura como hecho consumado; el usuario lo cazó mirando el reloj.
- **[El volteo de la fuente de verdad, con puerta de diff](flip-fuente-de-verdad.md)** — incident.json pasó a ser artefacto generado solo después de que el proyector reprodujera el panel vivo — cronología idéntica como conjunto, conteos exactos, deriva textual revisada a mano.
- **[El git add -A que se tragó los worktrees](gitlink-add-a.md)** — Un add indiscriminado coló cuatro worktrees como gitlinks en un commit publicado; cazado en la misma sesión, revertido y convertido en regla del flujo /commit.
- **[La carrera con el propio cron](la-carrera-con-el-propio-cron.md)** — Dos veces en una tarde el cron de GitHub Actions empujó mientras la sesión aplicaba hechos — y en el primer rebase, «--ours» resultó ser el remoto: la resolución se tragó nuestra proyección sin avisar.
- **[El primer ciclo completo de la máquina terminada](primer-ciclo-completo.md)** — El parte matinal de Sanz recorrió todo el sistema — barrido, conceptos, proyección, auditoría, publicación — sin que ningún paso dependiera de memoria humana.
- **[El timestamp del futuro](timestamp-futuro.md)** — Un evento del sábado quedó fechado a las 09:00 siendo las 05:44 — la misma clase de error que la IA cometió el día 10, ahora introducido al redactar.
- **[La tubería que cegó al guardián](tuberia-que-cego-al-guardian.md)** — Un "| tail -1" enmascaró el exit code del audit y un timestamp futuro — el pecado fundacional de la serie — llegó publicado a main con la puerta en rojo.
- **[El worker que desobedeció bien](worker-desviacion-principiada.md)** — En la migración paralela, el worker de state/ rebajó "Vera Playa seguro" de oficial a estimacion contra su propio ticket — porque "seguro" es valoración propia, no del 112.
- **[X solo abre desde dentro — y el hashtag rinde más que los perfiles](x-solo-logueado.md)** — Deslogueado, X sirve esqueletos vacíos; con sesión, la búsqueda live de #IFLosGallardos dio la reapertura de la A-7 antes que ningún medio.
<!-- okf:index:end -->
