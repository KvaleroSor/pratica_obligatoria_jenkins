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

Una vegada ho fem ens trobarem amb la següent pantalla.

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

Una vegada configurats els paràmetres, donarem pas a la següent configuració, el repositori de GitHub amb el que anem a treballar.

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

Per poder instal·lar el plugin el primer que farem serà dirigir-se al apartat "Administrar jenkins".

![Instal·lar plugin pas 1](./img/27-%20instalar%20plugin%20pas%201.png)

---

Una vegada situats dins de l´administrador de Jenkins, navegarem fins l´apartat "Plugins".

![Instal·lar plugin pas 2](./img/28-%20instalar%20plugin%20pas%202.png)

---

En l´apartat "Available plugins" buscarem per nom el plugin que ens interesa per al nostre projecte i l´instal·larem.

![Instal·lar plugin pas 3](./img/2-%20instalant%20pluggin.png)

Una vegada instal·lat el plugin el podrem veure disponible a l´apartat "Installed plugins".

---

Situats al nostre panel de control veurem a la part superior un simbol de "+" per poder afegir noves vistes. Crearem una nova vista utilitzant el 
plugin "Build Monitor View". 

![Instal·lar plugin pas 4](./img/30-%20instalar%20plugins%20pas%204.png)

![Instal·lar plugin pas 5](./img/5-%20configurant%20blue%20monitor.png)

--- 

El resultat de la vista utilitzant el plugin instal·lat serà el següent.

![Instal·lar plugin pas 6](./img/7-%20resultat%20blue%20monitor.png)

---

### Creació pràctica Jenkins.

Per a la creació de la nostra pràctica hem agafat el còdig d´una pràctica anterior que es basava en React. Per tal de treballar sense que 
les nostres modificacions afecten al còdig de la branca principal, creem la branca "ci_jenkins".

![Creació de la branca de treball](./img/1-%20creant%20branca%20ci_jenkins.png)

---

#### Pas 1 - Petició de dades.

Per a poder treballar amb petició de dades al nostre "Jenkinsfile" hauren d´utillitzar el següent element.

![Petició de dades 1](./img/32-%20peticio%20de%20dades.png)

També haurem d´afegir un stage que gestione les dades que volem introduir per paràmetres.

![Petició de dades 2](./img/33-%20stage%20peticio%20de%20dades.png)

En el moment creem aquest apartat en el nostre "Jenkinsfile" quan executem la nostra "Pipeline" ens apareixerà de la següent forma.

![Peticíó de dades 3](./img/11-%20executant%20peticio%20de%20dades.png)

I el resultat una vegada haja corregut la nostra "Pipeline" serà la següent.

![Petició de dades 4](./img/10-%20executant%20peticio%20de%20dades.png)

--- 

#### Pas 2 - Linter Stage.

El linter s´encarregarà de revisar el nostre còdig per a que es complixquen una serie de regles, per tal de que tot el còdig
seguixca el mateix patrò, ens ajuda per estandaritzar.

Imagte del stage de linter, s´encarregarà de correr linter.

![Linter stage 1](./img/34-%20stage%20linter.png)

En cas de que el nostre linter correga i hi hagen regles al nostre còdig que no estan complint-se el resultat serà el següent.

![Linter stage 2](./img/12-%20linter%20encontrant%20errors.png)

Una vegada corregim els errors, podem veure que linter ens facilita l´informació d´on estan situats eixos errors, els corregim i 
el resultat deuria de ser el següent.

![Linter stage 3](./img/13-%20corrent%20linter%20sense%20errates.png)

Podem veure que el proces finalitza de manera exitosa per a nosaltres.

Nosaltres hem afegit un "indexLinter.js" per gestionar el valor que linter retorna i mostrar a la nostra "Pipeline" d´una forma un poc
més vistosa el resultat de linter.

![Linter stage 4](./img/35-%20stage%20linter%20.png)

--- 

#### Pas 3 - Test Stage.

Els tests que realitzarem son uns tests simples sobre la funció "handler" ubicada en el nostre arxiu "pages/api/users/index.js"
i seran per comprobar rutes.

Imatge de l´stage, s´encarregarà de correr jest.

![Test stage 1](./img/36-%20stage%20test.png)

La funció que farà les proves estarà ubicada dins d´un directori "tests" i s´anomena "handler.tests.js", es la següent.

![Test stage 2](./img/15-%20handler-test-js%20afegit%20al%20projecte%20per%20als%20tests.png)

Per poder correr els tests amb jest utilitzant JavaScript com utilitzem al nostre còdig crearem un arxiu ".babelrc" que serà el encarregat en fer transpilacions, açò ens facilitarà l´eina ja que si el nostre còdig utilitza ferramentes més novedoses de JavaScript que no siguen compatibles amb totes les versions de Node.js o navegadors.

En conclusió, quan utilitzem Jest per a fer tests, podem configurar babel per a que transpile el nostre còdig abans de que Jest el excute.

Arxiu .babelrc.

![Test stage 3](./img/37-%20stage%20test%20babel.png)

Una vegada fetes totes les configuracions, executem la nostra "Pipeline".

Resultat dels tests sense errates.

![Test stage 4](./img/14-%20corrent%20jest%20test%20sense%20errates.png)

---

#### Pas 4 - Build Stage.

Aquest stage s´encarregara de crear una versió empaquetada del nostre projecte per posteriorment desplegarlo a la plataforma Vercel.

Imatge de l´stage.

![Build Stage 1](./img/38-%20stage%20build%20.png)

Imatge del resultat una vegada executada la "Pipeline".

![Build Stage 2](./img/16-%20corrent%20npm%20build%20per%20a%20desplegue.png)








