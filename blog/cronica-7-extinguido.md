# Extinguido: la palabra llegó, y el arco no se cerró con ella

*Séptima y última entrega. Prometí un epílogo corto para cuando declararan la extinción total. La palabra llegó el viernes 24. Cuatro días después llegó otra que no esperaba, y es la que manda en este texto.*

---

## La palabra

Viernes 24 de julio. El dispositivo del Plan INFOCA dio por **extinguido** el incendio de Los Gallardos, quince días después de declararse en Almocáizar. Lo anunció Antonio Sanz en X, sin comparecencia ni titular grande ([`events/2026-07-24-extinguido`](../knowledge/incident-okf/events/2026-07-24-extinguido.md)).

Ya lo había aprendido en el capítulo anterior, pero se repitió con una simetría casi burlona: **la palabra que esperas llega más callada de lo que la imaginas**. Entre el CONTROLADO del día 13 y esta hubo once días de remate y liquidación, con un operativo bajando de más de setecientas personas a dieciocho. La superficie final, medida vía Copernicus: **5.200 hectáreas**.

Con esa cifra y ese balance, es el incendio forestal más letal registrado en Andalucía.

---

## Cuatro días después

El martes 28, en la UCI de Grandes Quemados del Virgen del Rocío, murió una de las mujeres heridas. Llevaba ingresada **desde el 9 de julio** —desde el primer día— con quemaduras en el setenta por ciento de la superficie corporal. Con ella, las víctimas mortales pasaron a **catorce** ([`events/2026-07-28-decimocuarta-victima`](../knowledge/incident-okf/events/2026-07-28-decimocuarta-victima.md)).

Cuatro días después de que el fuego estuviera apagado.

He escrito seis capítulos sobre una máquina que aprende a dudar, y el final me enseña algo que ninguna máquina iba a decirme: **el arco no lo cerró el monte, lo cerró un hospital**. Durante quince días conté hectáreas, focos de calor y niveles de emergencia, con la sensación de que la extinción sería el punto final. No lo fue. Mientras yo actualizaba un panel desde casa, había una habitación en Sevilla donde esto seguía ocurriendo, y siguió ocurriendo después de que todos diéramos el asunto por terminado.

Quedan tres personas hospitalizadas.

No tengo ninguna lección técnica que extraer de esto, y creo que ese es exactamente el punto. Lo escribo aquí porque el panel lo registró y porque una crónica que se saltara este párrafo para ir a la parte interesante sobre satélites no merecería haberse escrito.

---

## Dieciocho días a oscuras

Ahora el error, que en esta serie es obligatorio contarlo.

Al verificar el panel tras aplicar la extinción, conté los polígonos del mapa: **once**. Deberían ser cientos. El perímetro oficial de Copernicus —la única cartografía real que tiene este proyecto, la capa por la que existe medio panel— llevaba **desde el 11 de julio sin dibujarse**. Dieciocho días. En el mapa público. Y nadie lo echó de menos, yo el primero ([`lessons/la-capa-que-nadie-echaba-de-menos`](../knowledge/incident-okf/lessons/la-capa-que-nadie-echaba-de-menos.md)).

La causa es de una tontería perfecta. El mapa pedía dos cosas a la vez: el área quemada y los frentes de fuego. Cuando Copernicus pasó a un tipo de producto que solo trae área, la dirección de los frentes quedó vacía, la petición se fue a una ruta inexistente, el servidor devolvió su página de error, y el bloque que atrapa fallos se llevó por delante **también el área quemada**, que se había descargado perfectamente: veintidós megas, mil setecientos noventa y nueve polígonos, todo correcto. Una capa opcional matando a la obligatoria.

Lo que me quita el sueño no es el fallo, es *dónde estaba mirando*. Este proyecto se impuso verificar cada cambio en el navegador, no fiarse. Y lo hacía: comprobaba que los campos del JSON llegaran bien a la página. Estaban bien. El dato era correcto en disco, correcto en el plano de capas, correcto al pedirlo por red, y **ausente en la pantalla**. Un artefacto puede estar impecable en todas sus capas menos en la única que ve alguien. La comprobación que lo habría cazado el primer día costaba una línea: contar los elementos dibujados.

Y hubo un segundo apagón, más pequeño y más definitivo: la **búsqueda por hashtag de X dejó de funcionar** ([`lessons/el-hashtag-que-dejo-de-existir`](../knowledge/incident-okf/lessons/el-hashtag-que-dejo-de-existir.md)). No por mi culpa ni por las credenciales: X rehízo su cliente web por debajo y ciertos endpoints devuelven error. Durante toda la serie, esa búsqueda fue mi mejor oído — traía a los vecinos, la prensa hiperlocal, los cortes de carretera, cosas que las cuentas oficiales no publican. Ahora leo solo perfiles oficiales, y el barrido lo declara en cada pasada para que ese silencio no se confunda con calma. **Una fuente puede morir sin avisar y sin culpa de nadie**, y el día que pase conviene que tu sistema sepa decir "no miré" en vez de "no había nada".

---

## La cifra que bajó

El 12 de julio, la comparecencia oficial fijó la superficie en unas **7.000 hectáreas**. Ese mismo día, el producto de Copernicus delineaba 4.820 y un análisis independiente sobre Sentinel-2 estimaba 5.255. El panel tomó entonces una decisión que parecía de contable: mantener la cifra oficial como valor, mostrar las técnicas al lado, y anotar que la diferencia probablemente era perímetro sin quemar.

La cifra de cierre fue **5.200** ([`lessons/la-cifra-que-bajo-a-encontrarse-con-el-satelite`](../knowledge/incident-okf/lessons/la-cifra-que-bajo-a-encontrarse-con-el-satelite.md)).

Es tentador leerlo como una victoria, y no lo es. 5.200 no coincide exactamente con ninguna de las mediciones que yo mostraba, y la cifra oficial nunca corrigió nada: simplemente apareció otra. Lo que se valida no es el acierto —acertar una vez no es un método—, sino la forma de sostener la discrepancia: no elegir entre fuentes que se contradicen, no "arreglar" la oficial por mi cuenta, y dejar las dos visibles con su procedencia hasta que la realidad decidiera. Si hubiera adoptado las 4.820 por parecerme mejores, habría publicado durante doce días una cifra sin respaldo institucional. Si hubiera borrado las técnicas por no ser oficiales, no habría tenido nada que decir cuando la oficial bajó.

Con una ironía que me obliga a escribirla: durante esos mismos días, el mapa no estaba enseñando los satélites que le daban la razón.

---

## Lo que sigue encendido

El fuego se apagó; el expediente no. El 28 de julio el Consejo de Ministros declaró **zona afectada gravemente por emergencia de protección civil**, citando expresamente Los Gallardos como el episodio de más peso entre los 211 de este semestre, y aprobó medidas laborales extraordinarias ([`events/2026-07-28-zona-gravemente-afectada`](../knowledge/incident-okf/events/2026-07-28-zona-gravemente-afectada.md)). Aquí una nota honesta y personal: **no está confirmado que esa declaración alcance a Vera**, que no figura entre los cuatro municipios señalados como más afectados. El panel lo dice así, sin suponerlo en ninguna de las dos direcciones, aunque suponerlo a mi favor me convendría.

Y los vecinos de Bédar y Los Gallardos se han organizado ([`events/2026-07-24-plataforma-afectados`](../knowledge/incident-okf/events/2026-07-24-plataforma-afectados.md)). Un grupo de trabajo, unas siete personas, con un argumento que corta: este ha sido el **tercer gran incendio** de la comarca, cada uno peor que el anterior. Las familias de las víctimas piden revisar cómo se gestionó la emergencia, y los testimonios apuntan a un punto muy concreto: **cómo se notificó**. La investigación judicial sobre el origen —un cable de una línea eléctrica abandonada— sigue abierta.

Esa es la historia que sigue viva cuando el fuego ya no lo está, y no es la mía. Yo volví a una casa intacta.

---

## Lo que me llevo

**1. El final no lo pone el hecho técnico.** El fuego se declaró extinguido el 24; la catorceava víctima murió el 28. Los sistemas de información marcan hitos —estabilizado, controlado, extinguido— y es fácil confundir el hito con el final. Las consecuencias siguen su propio calendario, casi siempre más largo.

**2. Un artefacto puede estar bien en todas sus capas menos en la que se ve.** Dieciocho días con la capa principal del mapa ausente, con el dato correcto en todas las etapas menos en la pantalla. Verificar significa mirar lo que mira el usuario, no lo que produce tu código.

**3. Una fuente puede morir sin avisar.** Mi mejor canal de información desapareció por una decisión de ingeniería ajena, sin error mío. Lo que un sistema honesto debe garantizar no es tener siempre datos, sino **saber distinguir "no había nada" de "no pude mirar"**.

**4. Sostener una contradicción es más útil que resolverla pronto.** Doce días mostrando dos cifras incompatibles con su procedencia, sin elegir. Cuando la realidad decidió, el panel tenía algo que contar. Si hubiera elegido, habría tenido que borrar.

---

## El final

La guardia se desmonta. No hay frente que vigilar, no hay focos de calor —cero en las últimas veinticuatro horas—, y un panel que siguiera anunciándose "en vivo" sobre un incendio apagado estaría mintiendo con la mejor de las intenciones. El panel sigue publicado, ahora como lo que es: un registro con fecha de cierre, no una guardia.

Catorce personas murieron. Volví a una casa intacta y sé perfectamente que eso fue suerte y geografía, no mérito. Todo lo que he contado en siete capítulos sobre dudar, verificar y no inventar cifras tiene sentido únicamente por esto: porque detrás de cada dato de este panel había gente decidiendo si salir de su casa. Que las herramientas ayuden a decidir mejor es la única razón por la que valía la pena construirlas, y sigue sin pesar nada al lado de los nombres.

---

*Aquí termina la crónica. El panel queda publicado en su estado final, y el patrón que salió de él —el knowledge bundle, el barrido, la auditoría— vive en una plantilla, por si al próximo le sirve de algo empezar con la máquina ya montada. Ojalá no haga falta.*

---

### Nota sobre las fuentes y la honestidad

Todo lo narrado ocurrió entre el 24 y el 29 de julio de 2026 y es verificable. Los hechos del incendio son conceptos con fuente y hora en el repositorio público del panel: la extinción del 24 (anunciada por el vicepresidente Sanz, recogida por elDiario.es, Canal Sur y moncloa.com — solo una de las tres da hora, y por eso figura como aproximada); la decimocuarta víctima (Junta de Andalucía vía RTVE y moncloa.com); la declaración de zona gravemente afectada y el decreto laboral (resumen oficial del Consejo de Ministros en La Moncloa); la plataforma de afectados (El Debate y La Voz de Almería). La superficie final de 5.200 ha procede de las crónicas de la extinción; el historial completo de la cifra, con sus mediciones satelitales discrepantes, está en [`state/hectareas`](../knowledge/incident-okf/state/hectareas.md). La cifra de heridos hospitalizados (3) viene de prensa, no de nota oficial, y el panel lo marca como tal. El fallo de la capa del mapa y el de la búsqueda de X son observación propia, diagnosticados y corregidos en abierto. Lo que no está confirmado —si la declaración de zona afectada alcanza a Vera— se dice que no lo está. Y como en cada entrega: ante cualquier decisión real durante una emergencia, manda el 112, no este panel ni esta crónica.
