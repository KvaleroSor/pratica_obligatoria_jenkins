User -> Kike Valero - Modificacions OldREADME
# PRÀCTICA JENKINS

## Qué es Jenkins?

Jenkins es un servidor de còdig obert que s´utilitza per l´automatització de tasques. La principal funció de Jenkins és 
facilitar la "integració continua - CI" i la "entrega continua - CD". A diferencia de altres ferramentes que fan "el mateix"
Jenkins oferix una gran amalgama de plugins que permeten la seua integració amb diferents tecnologies i ferramentes com 
GitHub, Docker, Kubernetes, etc.

Tasques de Jenkins: 

- Creació.
- Prova i lliurament.
- Implementació de programari.

Jenkins també permet als desarrolladors detectar errors en etapes tempranes del cicle de desenvolupament, açò ens ajudarà 
a millorar la qualitat del nostre software.

Està basat en una arquitectura "Mestre" - "Esclau".

- Mestre: Es el encarregat de: 

    - Programar treballs.
    - Assignar esclaus.
    - Enviar compilacions als seus esclaus.
    - Recuperar la resposta dels resultats de compilació dels seus esclaus.
    
- Esclau: Rep peticions d´un node mestre i executa els treballs de construcció que aquest li envia.

---

### Proces de creació de una Pipeline a Jenkins.

Primer que tot accedint al nostre "localhost:8080" si així ho tinguem mapejat al "docker-compose.yml" ens trobarem amb la pantalla principal
de Jenkins.

#### Creació nova tasca.

![Pantalla principal jenkins](./img/25-%20pantalla%20principal%20jenkins.png)

Veurem seleccionat amb un quadre blanc que puguem afegir una "Nueva Tarea". 

---

#### Nom de la tasca i selecció de Pipeline.

- Una vegada ho fem ens trobarem amb la següent pantalla.

![Pantalla creació pipeline](./img/3-%20creant%20pipeline.png)

Assignarem un nom a la tasca i seleccionarem "Pipeline".

---

#### Paràmetres.

![Configurant la nostar pipeline](./img/8-%20configurant%20pipeline.png)

En la nostra Pipeline com vullguem passar-li alguns paràmetres el que farem serà dir-li que "Esta tarea debe parametrizarse".
Depenguent dels paràmetres que nosaltres vullguem passar-li seleccionarem entre les diferents opcions que tinguem, nosaltres 
seleccionarem l´opció "Parametros de cadena" (fa referencia a parametres d´entrada de cadena de text).

---

#### Vinculació amb repositori de GitHub.

- Una vegada configurats els paràmetres, donarem pas a la següent configuració, el repositori de GitHub amb el que anem a treballar.

![Configurant la nostra pipeline 2](./img/9-%20configurant%20pipeline.png)

- IMPORTANT! 

    - Copiar de forma correcta el enllaç al repositori per evitar-se errades de conexió.
    - Afegir la branca amb la que vullguem treballar.

Els dos punts que marquem com a importants els tinguem resaltats amb un recuadre blanc.

---

- MOLT IMPORTANT!

    - L´us de credencials. Com he pogut veure a l´imatge anterior per poder conectar-se al repositori remot hem fet us de "Credentials". 
    Aquestes credencials hauran sigut creades previament al nostre Jenkins per tal de fer us d´elles en el moment ho necessitem.

1. Representa la credencial que hem utilitzat per conectar-se al nostre repo remot.

![Credencial github](./img/26-%20credencial%20github.png)

2. Representa la resta de credencials que hem necessitat per poder executar correctament els nostres Stages.

![Credencials projecte](./img/24-%20variables%20sensibles%20guardades%20com%20a%20credencials.png)

- A aquestes variables accedirem desde el jenkins file de la següent manera.

![Acces a variables d´entorn](./img/31-%20acces%20a%20variables%20dentorn.png)

Desde l´arxiu "Jenkinsfile" accedirem a aquestes variables utilitzant l´element "Environment" i accedint a les variables que 
tinguem com a credencials i que necessitarem per al projecte.

--- 

Seguint els següents passos dueriem de poder crear una Pipeline sense cap problema. 


--- 

### Instal·lant el plugin Build Monitor View.

- Per poder instal·lar el plugin el primer que farem serà dirigir-se al apartat "Administrar jenkins".

![Instal·lar plugin pas 1](./img/27-%20instalar%20plugin%20pas%201.png)

---

- Una vegada situats dins de l´administrador de Jenkins, navegarem fins l´apartat "Plugins".

![Instal·lar plugin pas 2](./img/28-%20instalar%20plugin%20pas%202.png)

---

- En l´apartat "Available plugins" buscarem per nom el plugin que ens interesa per al nostre projecte i l´instal·larem.

![Instal·lar plugin pas 3](./img/2-%20instalant%20pluggin.png)

Una vegada instal·lat el plugin el podrem veure disponible a l´apartat "Installed plugins".

---

- Situats al nostre panel de control veurem a la part superior un simbol de "+" per poder afegir noves vistes. Crearem una nova vista utilitzant el 
plugin "Build Monitor View". 

![Instal·lar plugin pas 4](./img/30-%20instalar%20plugins%20pas%204.png)

![Instal·lar plugin pas 5](./img/5-%20configurant%20blue%20monitor.png)

--- 

- El resultat de la vista utilitzant el plugin instal·lat serà el següent.

![Instal·lar plugin pas 6](./img/7-%20resultat%20blue%20monitor.png)

---

### Creació pràctica Jenkins.

- Per a la creació de la nostra pràctica hem agafat el còdig d´una pràctica anterior que es basava en React. Per tal de treballar sense que 
les nostres modificacions afecten al còdig de la branca principal, creem la branca "ci_jenkins".

![Creació de la branca de treball](./img/1-%20creant%20branca%20ci_jenkins.png)

---

#### Pas 1 - Petició de dades.

- Per a poder treballar amb petició de dades al nostre "Jenkinsfile" hauren d´utillitzar el següent element.

![Petició de dades 1](./img/32-%20peticio%20de%20dades.png)

- També haurem d´afegir un stage que gestione les dades que volem introduir per paràmetres.

![Petició de dades 2](./img/33-%20stage%20peticio%20de%20dades.png)

- En el moment creem aquest apartat en el nostre "Jenkinsfile" quan executem la nostra "Pipeline" ens apareixerà de la següent forma.

![Peticíó de dades 3](./img/11-%20executant%20peticio%20de%20dades.png)

- I el resultat una vegada haja corregut la nostra "Pipeline" serà la següent.

![Petició de dades 4](./img/10-%20executant%20peticio%20de%20dades.png)

--- 

#### Pas 2 - Linter Stage.

El linter s´encarregarà de revisar el nostre còdig per a que es complixquen una serie de regles, per tal de que tot el còdig
seguixca el mateix patrò, ens ajuda per estandaritzar.

- Imagte del stage de linter, s´encarregarà de correr linter.

![Linter stage 1](./img/34-%20stage%20linter.png)

- En cas de que el nostre linter correga i hi hagen regles al nostre còdig que no estan complint-se el resultat serà el següent.

![Linter stage 2](./img/12-%20linter%20encontrant%20errors.png)

- Una vegada corregim els errors, podem veure que linter ens facilita l´informació d´on estan situats eixos errors, els corregim i 
el resultat deuria de ser el següent.

![Linter stage 3](./img/13-%20corrent%20linter%20sense%20errates.png)

Podem veure que el proces finalitza de manera exitosa per a nosaltres.

- Nosaltres hem afegit un "indexLinter.js" per gestionar el valor que linter retorna i mostrar a la nostra "Pipeline" d´una forma un poc
més vistosa el resultat de linter.

![Linter stage 4](./img/35-%20stage%20linter%20.png)

--- 

#### Pas 3 - Test Stage.

Els tests que realitzarem son uns tests simples sobre la funció "handler" ubicada en el nostre arxiu "pages/api/users/index.js"
i seran per comprobar rutes.

- Imatge de l´stage, s´encarregarà de correr jest.

![Test stage 1](./img/36-%20stage%20test.png)

- La funció que farà les proves estarà ubicada dins d´un directori "tests" i s´anomena "handler.tests.js", es la següent.

![Test stage 2](./img/15-%20handler-test-js%20afegit%20al%20projecte%20per%20als%20tests.png)

Per poder correr els tests amb jest utilitzant JavaScript com utilitzem al nostre còdig crearem un arxiu ".babelrc" que serà el encarregat en fer transpilacions, açò ens facilitarà l´eina ja que si el nostre còdig utilitza ferramentes més novedoses de JavaScript que no siguen compatibles amb totes les versions de Node.js o navegadors.

En conclusió, quan utilitzem Jest per a fer tests, podem configurar babel per a que transpile el nostre còdig abans de que Jest el excute.

- Arxiu .babelrc.

![Test stage 3](./img/37-%20stage%20test%20babel.png)

Una vegada fetes totes les configuracions, executem la nostra "Pipeline".

- Resultat dels tests sense errates.

![Test stage 4](./img/14-%20corrent%20jest%20test%20sense%20errates.png)

---

#### Pas 4 - Build Stage.

Aquest stage s´encarregara de crear una versió empaquetada del nostre projecte per posteriorment desplegarlo a la plataforma Vercel.

- Imatge de l´stage.

![Build Stage 1](./img/38-%20stage%20build%20.png)

- Imatge del resultat una vegada executada la "Pipeline".

![Build Stage 2](./img/16-%20corrent%20npm%20build%20per%20a%20desplegue.png)

---

#### Pas 5 - Update Readme.

- El script que executarà aquest stage per poder actualitzar el README.md serà el següent.

![Update Readme 1](./img/40-%20script%20update%20stage.png)

Aquest script el que farà serà, en el moment s´executen els nostres test de jest segons el resultat, bé siga satisfactori o bé siga que fallen els tests
afegirà una insignia darrere del text "RESULTADO DE LOS ÚLTIMOS TESTS".

- Si nosaltres forcem a que els nostres tests fallen.

![Update Readme 2](./img/21-%20forsant%20el%20fallo%20del%20tests.png)

- El que nosaltres podrem vore als logs de la Pipeline serà lo següent.

![Update Readme 3](./img/19-%20forçant%20errata%20als%20tests.png)

- El resultat al README.md serà el següent.

![Udate Readme 3](./img/20-%20badge%20error%20al%20fallar%20test.png)

- Si els tests funcionen sense errates el que veurem al README.md serà el següent.

![Update Readme 4](./img/41-%20resultat%20dels%20tests%20exitos%20al%20readme.png)


- Stage que executa l´script abans mostrat.

![Update Readme 5](./img/39-%20update%20stage%20.png)

---

#### Pas 6 - Push Changes.

Aques stage el que farà serà en afegir els canvis, fer commit i push deixos canvis al repositori remot de qualsevol arxiu que haja canviat i estigua 
esperant per ser afegit a la zona de stage.

- El script que realitzarà aquesta acció.

    - Com podrem veure a aquest stage, ja estem fent uns de les credencials abans creades a Jenkins i declarades a l´element "Environment" del nostre arxiu Jenkinsfile.

![Push stage 1](./img/42-%20script%20push%20stage.png)

- Una vegada executada la nostra "Pipeline" i corrent aquest stage, aquest serà el resultat que podrem observar.

    - El missatge que apareixerà al commit seran els paràmetres que abans també gastavem, "executor" i "motiu".

![Push satge 2](./img/17-%20corrent%20push%20stage.png)

- El stage que executarà el script es el següent.

![Push stage 3](./img/43-%20stage%20push.png)

---

#### Pas 7 - Deploy to Vercel.

Este stage s´encarregarà de desplegar el nostre projecte en vercel. En aqueste stage podrem veure com també fem us de les credencials creades anteriorment
al nostre Jenkins.

- Script que executarà els comandos per al desplegue.

![Deploy stage 1](./img/44-%20script%20desplegue%20vercel.png)

- El resultat que podrem veure una vegada estiga el còdig desplegat a vercel de forma exitosa serà el següent.

![Deploy stage 2](./img/18-%20corrent%20deploy%20.png)

- El stage que executarà el script es aquest.

![Deploy stage 3](./img/45-%20stage%20deploy.png)

- Nota.

    - En aquest stage puguem veure una particularitat, i es que ens trobem amb l´apartat "when/expression", açò fa referencia a que aquest stage s´esperarà a que l´últim stage davant dell s´execute, i s´assegurarà de que eixe mateix stage s´ha executat correctament, ja que qualsevol dels stages que vagen per davant si no s´executen com toca, el stage que està davant del "Deploy to vercel" no s´executarà.

    En conclusió, es una forma de fer que aquest stage s´espere a la correcta execució dels stages que el precedixen.

---

#### Pas 8 - Notifiació Telegram.

En aquest stage també trobem credencials mostrades anteriorment. Podrem veure que necessitem gastar un token de telegram per poder conectar-se al nostre bot, a més a més, 
uns dels paràmetres d´entrada serà el identificador del chat/bot amb el que interactuarem, més en concret el paràmetre "chatId".

Aquest s´executarà al post, una vegada s´hagen executat tots els stages, arrecollirem amb variables d´entorn els valors de retorno dels comandos i mitjantsan un script 
gestionarem eixes dades de la següent forma.

- Script que gestiona el missatge de telegram.

![Notificació stage 1](./img/46-%20script%20telegram.png)

En aquest script gestionem les variables d´entorn i la funció que s´encarrega d´enviar el missatge al nostre bot.

Hem afegit les "ternaries" per tal de mostrar un missatge més clar al usuari en el missatge de telegram.

- Imatge de l´stage | post de telegram al jenkinsfile.

    - En aquesta imatge pugem veure que hi han dos definicions d´un stage i d´un post. La que està descomentada és la del post, personalment m´agrada més perquè s´executa sempre gràcies al element "always", independenment dels resultats de les altres stages i ens pot donar un bon feedback per notificació al telegram de com ha anat la nostra "Pipeline".

    - Per altra banda l´stage s´executaria si la resta ha funcionat correctament, sino no s´executaria.

![Notificació stage 2](./img/47-%20stage-post%20notificacio.png)

- Resultats del missatge de telegram amb l´informació dels stages.

    - 0 - S´ha executat l´stage de manera exitosa.
        - "Identificador de l´stage" s´ha executat exitosament - ✅

    - 1 - S´ha executat l´stage però no de manera exitosa.
        - "Identificador de l´stage" ha trovat errors - ❌ | ha fallat - ❌

- Imatge del resultat d´un missatge a telegram amb errates.

![Notificació stage 3](./img/22-%20missatge%20al%20telegram%20mostrar%20la%20errata.png)

- Imatge del resultat d´un missatge a telegram sense errates.

![Notificació stage 4](./img/48-%20missatge%20telegram%20correcte.png)





