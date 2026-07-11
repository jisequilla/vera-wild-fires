# El panel que se actualiza solo: un debate sobre IA, datos en vivo y las catástrofes que vienen

*Tercera entrega de la crónica. La primera contaba una evacuación; la segunda, cómo unas páginas hechas a mano se volvieron un dashboard vivo. Esta empieza en el momento en que pulsé "publicar" — y se convierte en lo que prometí desde el principio: un debate honesto sobre si sistemas así deberían existir para todos, y con qué salvaguardas.*

---

## El botón

Esta mañana, cuarenta y pocas horas después de oler el humo, el panel dejó de ser mío.

Un commit, un repositorio público, y una URL que cualquiera puede abrir: el mapa con el perímetro oficial del fuego, los focos de calor de cuatro satélites, la cronología con sus fuentes. Y encima, un pequeño robot: cada media hora, una máquina de GitHub descarga los datos satelitales nuevos, comprueba si algo cambió de verdad, y si cambió, publica. La primera vez que corrió solo, añadió 37 focos de calor de los pases de madrugada — datos que ningún humano tocó, en un panel que ya no necesita que yo esté despierto.

Antes de pulsar el botón hubo una conversación que casi me salto, y que resultó ser la más importante del día: el panel era *personal*. Decía "tu origen", "posición actual", dibujaba mi ruta de evacuación. Publicarlo era contarle a cualquiera, con precisión de urbanización, dónde vivo y dónde duermo esta semana. Decidí publicarlo tal cual — la crónica iba a contar lo mismo de todos modos — pero la decisión fue *consciente*, y esa es la cuestión: en estos sistemas, la privacidad no es un detalle técnico de después. Es diseño.

Y con la URL viva, la pregunta que llevaba dos días aplazando ya no se puede aplazar: **¿deberían existir sistemas así para todo el mundo? ¿Construidos por quién, con qué reglas?** Esto ya no es una historia. Es un debate. Vamos a tenerlo.

---

## El caso a favor, sin adornos

Lo que esta emergencia me enseñó cabe en una frase: **la información existía; lo que no existía era su forma usable.**

Todo lo que necesité estaba publicado en algún sitio: los partes del INFOCA en X, los cortes de carretera del 112, la previsión de AEMET, el perímetro de Copernicus, los focos de FIRMS. Ninguna pieza era secreta. Pero estaban repartidas en seis plataformas, tres idiomas técnicos y veinte pestañas, mientras yo decidía si volver o no a una casa con el fuego detrás. El valor que añadió la IA no fue *saber* — fue *ensamblar*: agregar, fechar, enlazar la fuente, y ponerlo en un mapa que se entiende de un vistazo.

Y hay un dato que me sigue pareciendo el más elocuente de toda la experiencia: cuando el fuego se reactivó de noche por el noroeste, lo contaron — por separado y sin saberlo — un tuit del 112, un directo de prensa y una franja de puntos naranjas de FIRMS desbordando el perímetro viejo. **Tres testigos independientes, la misma historia.** Esa redundancia es lo más parecido a la verdad que existe en mitad del caos, y hoy está al alcance de cualquiera que sepa ensamblarla. Ahí está el caso a favor: lo que yo improvisé en dos días, con herramientas gratuitas y datos abiertos, una administración o una comunidad podría tenerlo *antes* de la próxima catástrofe. Inundaciones, DANAs, apagones, incendios: la arquitectura es la misma; solo cambian las palabras del JSON.

---

## El caso en contra, sin piedad

Ahora, el abogado del diablo — y le voy a dar munición de verdad, porque la tengo de primera mano.

**Uno: estos sistemas alucinan, y en emergencias las alucinaciones matan.** A mí la IA me dijo que el fuego estaba "estabilizado a las 13:00" cuando eran las 11:27. Un buscador me ofreció como cartografía "de este incendio" la activación de La Palma de 2023. Yo mismo, con la máquina, casi fecho un parte a una hora que no había llegado. Tres errores en dos días, cazados porque *alguien dudaba*. Un sistema así, escalado a mil usuarios sin ese alguien, escala también sus errores — con un barniz de dashboard profesional que los hace más creíbles, no menos.

**Dos: el panel bonito compite con la autoridad.** Mi página dice en cada vista "el 112 manda". Pero seamos honestos: si diez mil vecinos miran un mapa no oficial que se actualiza cada 15 minutos, y el canal oficial tarda una hora, ¿a quién creerán cuando discrepen? En Los Gallardos se descartó el Es-Alert *por miedo a generar confusión* — la autoridad gestiona la confusión como un riesgo operativo. Un ecosistema de paneles ciudadanos desincronizados puede ser exactamente esa confusión, multiplicada.

**Tres: la infraestructura improvisada caduca en silencio.** Mi robot de ingesta corre en la capa gratuita de GitHub, que pausa los crons tras 60 días de inactividad. X me cerró la puerta hasta que inicié sesión, y puede cerrarla del todo mañana. El panel que hoy salva una tarde de angustia puede estar mostrando datos de hace tres semanas cuando llegue la siguiente emergencia — con toda la apariencia de estar vivo. Un sistema de emergencias que *parece* funcionar es peor que uno que claramente no existe.

**Cuatro: la privacidad se decide una vez y se lamenta para siempre.** Yo publiqué mi ubicación a sabiendas. Pero imagina el mismo panel construido por un ayuntamiento con datos de vecinos, o por un particular entusiasta que no se detiene a pensarlo. Las rutas de evacuación de la gente, sus casas vacías señaladas en un mapa público durante un incendio: eso también es información para quien saquea.

---

## Donde el debate se resuelve (o al menos, donde yo lo resuelvo)

He vivido los dos lados del argumento en carne propia, así que me niego a terminar en un "depende". Esto es lo que creo que haría falta para que la balanza caiga del lado bueno — y cada punto viene de algo que me pasó, no de un whitepaper:

**1. Datos abiertos como cimiento, plataformas privadas como adorno.** Copernicus y FIRMS funcionaron sin llave, sin login y sin permiso; X necesitó mi sesión y me dio error la mitad de las veces. Un sistema serio se construye sobre lo primero y trata lo segundo como prescindible. Aquí Europa, por cierto, tiene algo que casi nunca se celebra: su infraestructura pública de datos de emergencia es *excelente*. Lo que falta no es el dato, es la última milla.

**2. La cadena de custodia visible, siempre.** Cada cifra de mi panel lleva fuente y hora pegadas. No como buena práctica: como *requisito estructural* — el JSON no admite un hecho sin ellas. Cualquier sistema ciudadano debería heredar esa regla: si no puedes decir de dónde y de cuándo, no entra. La confianza no se pide; se enseña el recibo.

**3. Un humano que duda, institucionalizado.** Mi pipeline separa *recolectar* de *aplicar*, y entre ambos hay un paso de verificación que no se puede saltar. Los satélites entran solos (son deterministas); las palabras — cifras, evacuaciones, declaraciones — pasan por ojos humanos. Esa asimetría es la lección central de toda la serie convertida en arquitectura: **automatiza los datos, nunca el juicio.**

**4. Subordinación explícita, técnica y visual, a la autoridad.** El disclaimer no basta. El sistema ideal se *degrada* ante lo oficial: si el 112 emite, el panel lo muestra encima de todo, y calla lo suyo donde contradiga. La alternativa — competir con la autoridad en velocidad — gana usuarios y mata gente.

**5. Mantenimiento como parte del diseño, no como esperanza.** Fecha de caducidad visible ("estos datos dejarán de actualizarse el X"), monitorización del propio sistema, y la humildad de apagarlo cuando la emergencia acaba. Un panel muerto que parece vivo es el peor resultado posible de todo este experimento.

---

## Lo que le diría a quien quiera construir el suyo

Que lo haga. En serio — la próxima DANA, el próximo apagón, el próximo incendio van a pillar a alguien como me pillaron a mí, y dos días de trabajo con herramientas gratuitas separan "veinte pestañas y pánico" de "un mapa que se entiende". Pero que lo haga habiendo leído la parte de esta serie donde todo sale mal: el dato del futuro, la activación equivocada, la caché que esconde la verdad, la puerta de X que se cierra. Los errores no son anécdotas — son el manual.

Y que recuerde para qué es: yo sigo en Vera Playa, mirando de vez en cuando un mapa que ahora se actualiza sin mí, esperando exactamente lo mismo que el primer día — que una voz con autoridad me diga que puedo volver a casa. Ningún panel sustituye eso. Los muertos de este incendio, a los que ninguna herramienta devolverá, merecen que esa frase no sea retórica: **la tecnología ensambla la información; la autoridad y el juicio humano deciden.** Todo lo demás es, y debe seguir siendo, ayuda.

---

*Fin de la serie, por ahora. Si el incendio o el panel dan otra lección que merezca contarse, habrá cuarta entrega.*

---

### Nota sobre las fuentes y la honestidad

Los hechos de esta entrega — la publicación, el robot de ingesta, los 614 focos, los fallos descritos — ocurrieron tal cual entre el 10 y el 11 de julio de 2026 y pueden verificarse en el repositorio público del panel (historial de commits incluido, errores incluidos). Las posiciones del debate son mías y de nadie más. Como en toda la serie: lo oficial se distingue de lo observado, lo observado de lo opinado, y ante cualquier decisión real durante una emergencia, manda el 112.
