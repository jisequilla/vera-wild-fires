# La máquina que duda: una flota de agentes, un formato abierto y el día que el panel dejó de necesitarme

*Cuarta entrega de la crónica. La primera contó una evacuación; la segunda, un dashboard vivo; la tercera abrió el debate. Esta cuenta cómo el sistema aprendió a sostenerse solo — con una flota de agentes trabajando en paralelo, un formato abierto de conocimiento, y la tesis de toda la serie convertida, por fin, en arquitectura.*

---

## La mejor mañana

Sábado, 11:02. El consejero de Emergencias publica el mejor parte desde que huelo humo: la noche fue favorable, no hubo nuevos desalojos, y con viento de 2 km/h los equipos pasan de contener el fuego a atacarlo de frente. Los satélites lo corroboran a su manera, que es la única que tienen: cero focos de calor en siete horas.

Veinticinco minutos después, ese parte estaba en el panel público, con su fuente y su hora. Y yo me di cuenta de algo extraño: **casi no había hecho nada.** El barrido de fuentes siguió un procedimiento escrito; el hecho se registró como una pieza de conocimiento con su tuit enlazado; el panel se regeneró solo a partir de eso; una auditoría automática dio el visto bueno; y la publicación fue un empujón final. Mi único trabajo real fue el del principio de esta serie: **dudar** — revisar el parte de novedades antes de que tocara nada.

Cómo se llegó a eso es la historia de este capítulo. Empieza con una decisión aparentemente académica y acaba con cuatro agentes de IA trabajando en paralelo mientras yo miraba a uno de ellos pensar en una ventana de terminal.

---

## El conocimiento se independiza

Hasta ayer, el "cerebro" del panel era un fichero JSON: útil, pero con un defecto de nacimiento — mezclaba lo que *sabemos* (el fuego se reactivó a las 22:11) con cómo se *muestra* (en naranja, en la posición cuatro, con este HTML). Y la crónica que estás leyendo duplicaba esos mismos hechos en prosa. Dos copias de la verdad terminan siempre igual: contándose mentiras la una a la otra.

La solución fue adoptar un formato abierto de conocimiento — OKF, publicado por Google Cloud hace unas semanas, tan simple que cabe en una frase: *una carpeta de ficheros Markdown donde cada fichero es un concepto y su cabecera dice qué es*. Sobre esa base definimos nuestro perfil: cada concepto lleva **fuente, hora y nivel de confianza** — oficial, prensa citando a oficial, prensa, observación propia, estimación. La regla de oro de toda la serie ("distingue siempre lo verificado de lo estimado") dejó de ser disciplina y pasó a ser **esquema**: un hecho sin fuente y sin hora, literalmente, no compila.

El panel web y esta crónica pasan a ser lo mismo: **proyecciones** de ese conocimiento. Una lo pinta como mapa; la otra, como narración. Ninguna de las dos es ya la verdad — solo la enseñan.

---

## La flota

Quedaba migrar todo lo acumulado — 73 piezas de conocimiento — y aquí probamos algo que llevaba días tentándome: trabajo en paralelo con agentes.

El modelo, tomado de un proyecto propio del trabajo, separa tres papeles que nunca deben mezclarse: **el que construye no aprueba; el que valida no fusiona; el humano tiene la última palabra.** La sesión principal (el "cerebro") troceó el trabajo en cuatro superficies sin solaparse, escribió cuatro *tickets congelados* — contratos autocontenidos que no admiten preguntas, solo decisiones documentadas — y lanzó cuatro workers, cada uno en su copia aislada del repositorio.

A tres los lancé sin verlos, como procesos de fondo. Al cuarto lo vi trabajar: una ventana de terminal donde un agente leía su ticket, dumpeaba la cronología, escribía concepto a concepto y validaba su propio trabajo con un parser antes de entregarlo. Hay algo que no sabía que necesitaba ver: *cómo piensa el que trabaja para ti*. Cuando terminó, no me fie de su palabra — leí su traza de sesión, comando a comando. Los hechos coincidían con el relato. Esa desconfianza sistemática no es cinismo: es la tesis de la serie aplicada hacia adentro.

Los cuatro entregaron. Setenta y tres conceptos, cero invasiones de territorio ajeno, y cuatro "anexos" donde cada worker confesó sus ambigüedades y decisiones.

---

## El trabajador que desobedeció bien

Y en uno de esos anexos, la joya del día.

El ticket del worker de estado sugería etiquetar las zonas con confianza oficial. El worker se desvió, deliberadamente, en un solo caso: se negó a etiquetar "Vera Playa — seguro" como dato oficial, razonando que *"seguro" es una valoración del autor sobre el perímetro, sin visto bueno del 112 — llamarlo oficial violaría la regla de oro del proyecto*. Lo marcó como estimación y lo documentó en su anexo en lugar de callárselo.

Leed eso otra vez: **el ticket estaba mal, y el sistema lo corrigió.** Las reglas del proyecto, bien escritas en el contexto compartido, pesaron más que la instrucción concreta. Llevaba tres capítulos diciendo que estas herramientas necesitan un humano que dude; resulta que, si les enseñas a dudar, a veces dudan mejor que tu propio contrato. No es magia — es que la regla estaba escrita donde podían leerla. La duda, como todo lo demás, es infraestructura.

---

## El volteo

Con el conocimiento migrado faltaba el paso irreversible: que el JSON del panel dejara de editarse a mano y pasara a *generarse* desde el conocimiento. Voltear la fuente de verdad de un sistema público, con el incendio aún activo, es el tipo de cambio que rompe cosas.

No se rompió nada, y no por suerte: por **puerta de diff**. El proyector tuvo que demostrar que reproducía el panel vivo — los 24 eventos idénticos como conjunto, las fuentes evento a evento, cada sección con sus conteos exactos — antes de que nada cambiara de dueño. La puerta encontró, antes de abrirse, tres huecos que ningún plan había previsto y un bug del propio proyector. Desde entonces, editar el JSON a mano es un acto sin sentido: la siguiente proyección lo pisa. La verdad vive en un solo sitio.

---

## El guardián (y mi propia mancha)

Que nadie piense que esto va de máquinas infalibles vigiladas por un humano infalible. Ese mismo día, consolidando el trabajo de la flota, ejecuté un `git add -A` rutinario que se tragó cuatro directorios de trabajo como repositorios fantasma — y leí el aviso de git *después* de publicar. Se corrigió dos commits más tarde.

De esa mancha nació la última pieza: los commits del proyecto pasan ahora por una **auditoría ejecutable** — ¿es válido cada concepto? ¿hay algún timestamp del futuro? ¿el panel coincide con lo que el conocimiento proyecta? ¿los docs citan rutas que ya no existen? — envuelta en un procedimiento que añade lo que ningún script puede comprobar: *¿la documentación sigue enseñando el flujo que este cambio acaba de cambiar?* La probamos en negativo antes de estrenarla, rompiendo algo a propósito para verla morder. Una puerta que no puede fallar no es una puerta.

El error del "estabilizado a las 13:00" era de la IA. El timestamp del futuro fue del proceso. El `git add -A` fue mío. Tres capítulos, tres culpables distintos, una sola respuesta: **convertir cada error en una regla que no dependa de recordarlo.**

---

## Lo que aprendí (la parte analítica)

**1. El conocimiento merece ser el sustrato, no el subproducto.** Cuando los hechos viven en un formato abierto con fuente, hora y confianza, el dashboard, el blog y lo que venga después son solo proyecciones. Se acabó el mantener dos verdades sincronizadas a mano — que es como se pudren los sistemas de información en emergencias.

**2. El paralelismo útil no va de velocidad sino de papeles.** Cuatro agentes fueron más rápidos, sí. Pero el valor estaba en la separación: el que construye no aprueba, el que valida no fusiona, el humano decide. Y en los anexos obligatorios, que convirtieron cada ambigüedad en conocimiento en vez de en sorpresa.

**3. Las reglas bien escritas se propagan — y pueden ganar a la instrucción.** Un worker desobedeció su ticket para obedecer el principio del proyecto. Si tus valores solo viven en tu cabeza, tus herramientas no pueden defenderlos. Si viven en el contexto compartido, sí.

**4. Los volteos se hacen con puerta.** Cambiar la fuente de verdad de un sistema vivo exige demostrar equivalencia antes, no pedir disculpas después. La puerta de diff encontró más problemas que todo el plan previo.

**5. La coherencia se fuerza, no se recuerda.** README enseñando flujos muertos, proyecciones olvidadas, adds indiscriminados: nada de eso se arregla "prestando más atención". Se arregla con una auditoría que muerde en cada commit — incluidos los del orquestador.

---

## El panel ya no me necesita

Mientras escribo, el producto satelital de Copernicus con la imagen de la reactivación está al caer; cuando se publique, un proceso automático lo detectará, lo descargará y lo pondrá en el mapa público sin que nadie se lo pida. Los focos de calor se refrescan solos cada media hora. El conocimiento espera, ordenado, el siguiente hecho.

Yo sigo en Vera Playa. Sigue sin llegar la única palabra que importa — el visto bueno del 112 para volver a casa — y ningún sistema del mundo puede acelerarla, ni debe. Pero hay una diferencia respecto al jueves que quiero dejar escrita: aquella tarde, la información correcta dependía de que yo no me durmiera. Hoy duerme conmigo apagado.

Ese era el objetivo, creo, desde el primer capítulo, aunque no supe verlo hasta ahora: no construir una máquina que sepa más que yo, sino una que **herede mi manera de dudar** — y me devuelva el tiempo de mirar el mar mientras el fuego, por fin, pierde.

---

*Si el incendio da su última palabra — la vuelta a casa — habrá un cierre de la serie. Corto, espero.*

---

### Nota sobre las fuentes y la honestidad

Todo lo narrado ocurrió entre el 10 y el 11 de julio de 2026 y es verificable en el repositorio público del panel: los cuatro pull requests de la flota con sus anexos, el commit del volteo, el `git add -A` errado y su corrección, y cada hecho del incendio como concepto con su fuente (los citados aquí: `events/2026-07-11-parte-matinal-sanz`, `lessons/worker-desviacion-principiada`, `lessons/gitlink-add-a`, `lessons/flip-fuente-de-verdad`). Las cifras (6.600 ha, ~20 ilocalizables con 7 denuncias formales, 1.448 evacuados) son oficiales o de prensa citando a oficiales, con sus enlaces en el bundle. Como siempre: lo verificado se distingue de lo estimado, y ante cualquier decisión real durante una emergencia, manda el 112.
