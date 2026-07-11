# La mañana en que el mapa dijo la verdad: del artefacto al dashboard vivo

*Segunda entrega de la crónica. La primera contaba la evacuación y las lecciones de usar IA en plena emergencia. Esta cuenta lo que pasó al día siguiente: cómo unas páginas HTML hechas a mano en una tarde de tensión se convirtieron en un panel vivo alimentado por satélites — y cómo cada paso volvió a poner a prueba la misma lección: verifica, siempre.*

---

## Sábado, antes del amanecer

Amanezco en Vera Playa. El fuego sigue activo, pero lejos, hacia el oeste. A las 03:28 de la madrugada, Emergencias 112 anunció la reapertura de la A-7 — la autovía que es mi camino de vuelta a casa, cuando llegue el visto bueno que aún no ha llegado.

La noche anterior había tomado una decisión pequeña pero importante: dejar de editar HTML a mano. Durante la emergencia, cada actualización del panel que construí era cirugía manual sobre el código — cambiar un "11" por un "12", reescribir un párrafo, mover un evento. Funcionaba, pero no escalaba. Y en una emergencia, la fricción para actualizar es fricción para estar informado.

Así que esa mañana, con el asistente de código, hicimos la operación completa: separar los **datos** de la **presentación**. Todo el contenido — cronología, cifras, zonas, marcadores del mapa — vive ahora en un único fichero de datos. Las páginas lo leen y se redibujan solas cada quince minutos. Actualizar el panel ya no es editar una web: es editar un hecho, con su fuente y su hora, y dejar que la web se entere sola.

No parece gran cosa. Lo es. Es la diferencia entre una foto y una ventana.

---

## El expediente EMSR671, o por qué se verifica dos veces

Buscando páginas oficiales del incendio, encontramos que la UE había activado el servicio de emergencias Copernicus — cartografía satelital oficial, gratuita, para este incendio concreto. El buscador nos sugirió una activación: EMSR671.

La abrimos antes de enlazarla. Era el incendio de **La Palma. De 2023.**

Tres años y mil kilómetros de error, servido con toda naturalidad por un buscador. Si lo hubiéramos pegado en el panel sin abrirlo, habríamos puesto un enlace "oficial" que llevaba a otra isla y otro año — exactamente la clase de error que en la primera crónica casi me manda de vuelta hacia el fuego. La activación real resultó ser **EMSR892**, verificada leyendo su ficha: "Wildfire in Andalusia, Spain", 9 de julio de 2026, Almería. Solo entonces entró en el panel.

Y hubo una segunda vez, más sutil. Al anotar el parte de la mañana del sábado, el asistente le puso hora: las 09:00. Eran las 05:44. **Un dato del futuro, otra vez** — el mismo tipo de alucinación temporal de la primera crónica, ahora en la otra dirección: no inventada por el modelo, sino introducida por descuido al escribir. La cazamos antes de publicar. La lección se refina: no basta con dudar de la IA; hay que dudar del proceso entero, incluido uno mismo.

---

## X, la puerta que solo se abre desde dentro

Queríamos leer las cuentas oficiales — @Plan_INFOCA, @E112Andalucia — directamente, sin esperar a que la prensa las citara. Primer intento, sin sesión: X nos sirvió esqueletos vacíos y una página de error. La fuente más oficial del incendio, cerrada a cal y canto para quien no tenga cuenta.

Con mi sesión abierta, la puerta se abrió. Y la búsqueda del hashtag del incendio resultó más valiosa que los propios perfiles: ahí estaba el tuit de las 03:28 de la reapertura de la A-7, **antes de que ningún medio lo publicara**. También el parte nocturno del INFOCA de las 23:25, con el detalle de medios que ningún periódico recogió entero.

La moraleja tecnológica es incómoda pero real: la información pública de emergencias vive en una plataforma privada que decide quién la lee. Para un sistema de información ciudadana en catástrofes, eso es una dependencia frágil. La alternativa sólida existe, y era el siguiente paso.

---

## El satélite no negocia

Lo mejor del día: sustituir mis círculos dibujados a mano — honestos, pero inventados — por el **perímetro real del fuego**.

Copernicus publica los vectores de su cartografía: el área quemada y los frentes de fuego, delineados sobre imagen de satélite Sentinel-2. Los descargamos, los pusimos en el mapa, y por primera vez el panel mostró la verdad geométrica del incendio: una mancha irregular y dentada abrazando Bédar, con los frentes marcados en el borde oeste — exactamente donde los partes decían que estaba la pelea.

Hicimos una comprobación que recomiendo a cualquiera que monte algo así: sumamos las áreas de los polígonos descargados. **3.198 hectáreas.** El producto oficial declaraba 3.200. Cuadra. Ese tipo de coherencia interna es lo que separa un dato usable de un adorno.

El producto también cuantificaba lo que el fuego se llevó en su primer día: el **100 % del bosque** del área cartografiada. 2.713 hectáreas de matorral. 7,3 hectáreas de viviendas. Números fríos para un paisaje que conozco.

Y encima, la capa de **NASA FIRMS**: 577 detecciones de calor de las últimas 24 horas, de cuatro satélites distintos, coloreadas por antigüedad. El enjambre de puntos grises — el incendio de ayer — calcaba el perímetro de Copernicus casi punto por punto. Dos sistemas independientes, la misma forma. Y en el borde noroeste, una franja de puntos naranjas — detecciones de la noche — desbordando el perímetro viejo hacia Lubrín y El Chive: **la reactivación nocturna, confirmada por física orbital**, no por titulares. La última detección satelital coincidía al minuto con lo que un analista había publicado en X. Tres fuentes independientes contando la misma historia: eso es lo más parecido a la verdad que se puede tener en mitad de una emergencia.

---

## Lo que añade este capítulo a la tesis

La primera crónica terminaba con una idea: la IA es el bibliotecario, no la fuente, y necesita un humano que dude. Este capítulo la extiende:

**1. La arquitectura es parte de la honestidad.** Separar datos de presentación no es una decisión técnica: es la que permite que cada cifra lleve su fuente y su hora pegadas. Un panel donde actualizar es fácil es un panel que estará actualizado; uno donde es difícil, miente por desactualización.

**2. Verificar es un hábito, no un paso.** El expediente EMSR671, la hora del futuro, la caché del navegador enseñando una versión vieja del mapa: tres errores de tres naturalezas distintas en una sola mañana, cazados por la misma costumbre de abrir y comprobar antes de publicar.

**3. Los datos oficiales abiertos son el suelo firme.** X puede cerrar la puerta; la prensa puede tardar; pero Copernicus y FIRMS publican datos verificables, con hora de adquisición, descargables por cualquiera, sin llave. Cualquier sistema serio de información en catástrofes debería construirse sobre esa capa, y usar el resto como complemento.

**4. La redundancia independiente es el detector de mentiras.** Cuando la prensa, un tuit y dos constelaciones de satélites dicen lo mismo, puedes actuar. Cuando solo lo dice una fuente, esperas. Esa regla, aplicada con disciplina, es más valiosa que cualquier herramienta concreta.

---

## Sigo sin volver a casa

El fuego sigue activo mientras escribo. La ventana de viento en calma de esta madrugada era la oportunidad de los equipos de extinción; el producto satelital de esta tarde dirá cuánto la aprovecharon. El panel se actualizará con un comando, no con cirugía.

Y yo sigo en la costa, esperando el visto bueno del 112 — que ninguna capa satelital, ningún dashboard y ninguna IA deben sustituir. Las herramientas mejoraron mucho en veinticuatro horas. El criterio sobre quién manda no ha cambiado nada.

---

*Tercera entrega prevista: el debate — cómo serían los sistemas de información ciudadana para catástrofes que aprendieran de todo esto, y qué salvaguardas necesitarían para no hacer más daño que bien.*

---

### Nota sobre las fuentes y la honestidad

Los datos de esta entrega provienen de Copernicus EMS (activación EMSR892), NASA FIRMS, Emergencias 112 Andalucía y Plan INFOCA (vía X), y prensa que los citaba, verificados en el momento. Los errores descritos (la activación equivocada, la hora del futuro) ocurrieron de verdad y se corrigieron antes de publicar nada — contarlos es el punto. Como en la primera entrega: en emergencias, distingue siempre lo verificado de lo estimado, y ante cualquier decisión real, manda el 112.
