# La máquina monta guardia: automatizar el barrido sin automatizar la duda

*Quinta entrega de la crónica. La cuarta contó cómo el panel dejó de necesitarme para los datos. Esta cuenta el paso siguiente y más delicado: dejarlo vigilar solo — y descubrir dónde está la línea que ninguna automatización debe cruzar.*

---

## La pregunta en boca de otra

Sábado por la tarde, Vera Playa. En la televisión, Canal Sur entrevista a tres mujeres desalojadas a la carrera — Manoli, Puri y Paloma — y una de ellas hace en voz alta la única pregunta que me importa desde el jueves: *"¿Tú crees que hoy podremos volver?"*

Nadie le responde. A mí tampoco. El 112 no ha dado el visto bueno y esa palabra no se puede acelerar, ni se debe. Lo que sí se puede es no perdérsela: que cuando llegue — a la hora que llegue — algo la esté escuchando.

Así que propuse lo obvio: **automatizarlo todo**. Cada hora, que el sistema barra las fuentes *y aplique* lo que encuentre al panel. Recolectar y publicar, encadenados, sin mí en medio.

Y aquí ocurrió algo que merece quedar escrito, porque invierte el guion de toda la serie: llevábamos cuatro capítulos con el humano dudando de la máquina. Esta vez **la máquina dudó de mí**.

---

## El `&&` peligroso

La objeción era simple: ese "y" encadena dos verbos cuya separación es el alma del sistema. Entre *recolectar* y *aplicar* vive la verificación — el hueco donde se cazaron la activación equivocada de Copernicus, el "estabilizado" que nadie había declarado, el evento fechado en el futuro. Automatizar la cadena entera habría publicado el próximo titular ambiguo a las tantas de la madrugada, sin que nadie dudara.

Lo que acordamos fue una guardia **graduada** ([`lessons/decision-loop-graduado`](../knowledge/incident-okf/lessons/decision-loop-graduado.md)). Cada hora, barrido completo: satélites, la búsqueda en vivo del hashtag, los directos de prensa, y una vigilancia expresa de mi urbanización y de cualquier señal de retorno. Pero al aplicar, tres niveles:

- **Solo se aplica solo** lo inequívoco: hechos de cuenta oficial, con enlace al comunicado concreto, sin contradicción con lo sabido y sin palabras ambiguas. Una cifra nueva del INFOCA entra; un "parcialmente estabilizado" de titular, jamás.
- **Todo lo demás espera en una cola** — cambios de estado, contradicciones, titulares con niebla — y me llega un aviso al móvil.
- Y la señal que espero de verdad — **la luz verde del 112 — es siempre aviso, nunca aplicación silenciosa.** Hay decisiones que no se delegan ni al mejor sistema: esa palabra tiene que despertarme a mí.

---

## Ciclo uno: el número que asustaba

Primera pasada de la guardia, 16:23. Los satélites devuelven **614 focos de calor** en la ventana de 24 horas. Seiscientos catorce. El número asusta hasta que miras lo único que importa: las edades. Todos anteriores a las 04:19 de la madrugada. **Trece horas de silencio orbital**, pases de mediodía incluidos.

La tentación era titular "sin fuego". Veinte minutos antes, la UME había publicado que sus unidades seguían **extinguiendo llamas reales** camino del cementerio de El Marchal ([`events/2026-07-11-ume-focos-secundarios-el-marchal`](../knowledge/incident-okf/events/2026-07-11-ume-focos-secundarios-el-marchal.md)). Las dos cosas eran ciertas a la vez: los sensores orbitales tienen un umbral y una cadencia, y un foco pequeño en remate puede arder por debajo de lo que distinguen o entre dos pasadas. **El silencio del satélite acota lo que queda; no certifica el cero** ([`lessons/el-satelite-calla-la-tierra-no`](../knowledge/incident-okf/lessons/el-satelite-calla-la-tierra-no.md)). El panel acabó diciendo las dos verdades en una frase: *13 h sin focos · UME remata El Marchal · aún activo*.

El ciclo aplicó tres hechos oficiales — el cierre de todos los albergues con los evacuados ya realojados, el trabajo de la UME, el parte de medios del INFOCA — y de propina cazó un bug que llevaba vivo un día entero: cada vez que el proceso automático regeneraba el panel desde los servidores de GitHub, las horas derivadas salían **desplazadas dos horas**, porque aquellos servidores viven en UTC y el código formateaba con "la hora local de la máquina" ([`lessons/el-proyector-que-vivia-en-utc`](../knowledge/incident-okf/lessons/el-proyector-que-vivia-en-utc.md)). Un panel de emergencia con las horas corridas es desinformación involuntaria. Se arregló fijando la zona horaria a fuego en el código.

Y una confesión que ya es costumbre en esta serie: al documentar ESE bug de tiempo, el asistente fechó la lección… cinco minutos en el futuro. La diferencia con el jueves es que esta vez **la auditoría la frenó antes de publicar**. El mismo pecado fundacional de la serie, cazado a tiempo por primera vez. Las puertas funcionan cuando muerden.

---

## La carrera contra nosotros mismos

Construimos, sin darnos cuenta del todo, un sistema con dos manos escribiendo en el mismo repositorio: el proceso satelital de cada media hora y la guardia horaria con juicio. El sábado por la tarde se pisaron dos veces — la sesión intentaba publicar y el cron se le había adelantado ([`lessons/la-carrera-con-el-propio-cron`](../knowledge/incident-okf/lessons/la-carrera-con-el-propio-cron.md)).

La primera vez, el arreglo del conflicto se llevó por delante — en silencio — la proyección con los tres hechos nuevos, por una trampa de Git que merece nota al pie: al rebasar, "lo nuestro" y "lo suyo" significan lo contrario que de costumbre. Se detectó verificando el resultado (treinta eventos donde debían ser treinta y tres), no por suerte. Y dejó doctrina: cuando el fichero en conflicto es un artefacto *generado*, no se elige un lado — se elige cualquiera, **se regenera desde el conocimiento y se re-audita antes de publicar**. El generador es la verdad; el conflicto, ruido. La segunda carrera, con la doctrina aplicada, salió limpia a la primera.

---

## El ciclo que no hizo nada

La segunda pasada de la guardia, 17:23, es mi favorita precisamente porque **no aplicó nada**. Todo lo que encontró — el análisis de ADN de las víctimas, la visita presidencial anunciada, un directo de prensa que reabría — llegaba por debajo del umbral del nivel oficial. A la cola, aviso al móvil, y el panel sin tocar.

Un sistema que a veces no hace nada no está fallando: está **distinguiendo**. La versión encadenada que yo propuse habría publicado algo cada hora, porque los sistemas encadenados confunden actividad con información.

Luego revisé la cola: ocho elementos. Apliqué seis. Y rechacé dos con un criterio que me costaría escribir como regla: la visita del presidente el lunes — *es noticia, no conocimiento del incidente* — y la cifra de heridos, que prefiero esperar de fuente oficial. Ahí está el reparto de papeles al que ha llegado toda esta arquitectura: **la máquina propone con nivel de confianza; el humano decide qué merece ser conocimiento.**

---

## Lo que me llevo

**1. Automatiza el barrido; gradúa el juicio; no delegues jamás la decisión.** Son tres capas distintas y la tentación de fundirlas en un `&&` es enorme. El nivel de confianza de cada hecho — oficial, prensa, pista — no era burocracia del formato: resultó ser exactamente la frontera de lo automatizable.

**2. El silencio del sensor acota; no certifica el cero.** Trece horas sin focos desde órbita y llamas reales en el suelo a la misma hora. Un panel honesto muestra las dos verdades en la misma frase, con la más cauta delante.

**3. Dos autómatas en un mismo repositorio necesitan doctrina de conflicto.** Y con artefactos generados la doctrina es una: no resuelvas — regenera desde la fuente de verdad y re-audita.

**4. Un ciclo que no aplica nada es el sistema funcionando.** La cola con aviso convirtió "no estoy seguro" en un estado de primera clase, con sitio propio entre el silencio y la publicación.

**5. Las lecciones se congelan donde la próxima sesión las lea.** La guardia muere con la sesión — es efímera por diseño. Lo que no muere es la orden que la rearma, escrita en el repositorio con las cicatrices del primer día incorporadas: la trampa del rebase, la auditoría sin tuberías, el titular ambiguo que espera. Re-aprender a golpes es el único lujo que este proyecto no se permite.

---

## Mientras tanto

Siguen siendo doce. La Guardia Civil analiza el ADN de las víctimas para devolverles el nombre, y una veintena de personas sigue sin localizar. Nada de lo que hace este sistema — ni un ciclo, ni una cola, ni un aviso — pesa nada al lado de eso, y conviene escribirlo en la misma página donde uno se alegra de que sus scripts funcionen.

Yo sigo en Vera Playa. La guardia pasa cada hora; el móvil, en la mesa. La próxima vez que vibre puede ser otra cola de tres elementos grises — o puede ser la palabra que espero desde el jueves. Cuando llegue, la contará el cierre de esta serie.

---

*Siguiente y última entrega prevista: la vuelta a casa, cuando el 112 dé su palabra. Corta, espero.*

---

### Nota sobre las fuentes y la honestidad

Todo lo narrado ocurrió el 11 de julio de 2026 y es verificable: los hechos del incendio, como conceptos con fuente y hora en el repositorio público del panel (los citados aquí: el cierre de albergues y el trabajo de la UME en El Marchal son de cuentas oficiales del 112 y la UME, con enlace al tuit concreto; la entrevista de Canal Sur, de su cuenta pública); las lecciones técnicas, como conceptos en `lessons/` con sus commits. Los 614 focos y las trece horas de silencio son datos de NASA FIRMS tal como los descargó el sistema a las 16:23. La cifra de fallecidos (12) y desaparecidos (~20, con 7 denuncias formales) es la oficial vigente al escribir. Lo que es observación o valoración mía — incluida la interpretación del silencio satelital — va marcado como tal también en el conocimiento del panel. Y como en cada entrega: ante cualquier decisión real durante una emergencia, manda el 112.
