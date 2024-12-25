# PRÀCTICA JENKINS

## Qué es Jenkins?

- Jenkins es un servidor de còdig obert que s´utilitza per l´automatització de tasques. La principal funció de Jenkins és 
facilitar la "integració continua - CI" i la "entrega continua - CD". A diferencia de altres ferramentes que fan "el mateix"
Jenkins oferix una gran amalgama de plugins que permeten la seua integració amb diferents tecnologies i ferramentes com 
GitHub, Docker, Kubernetes, etc.

- Tasques de Jenkins: 

    - Creació.
    - Prova i lliurament.
    - Implementació de programari.

- Jenkins també permet als desarrolladors detectar errors en etapes tempranes del cicle de desenvolupament, açò ens ajudarà 
a millorar la qualitat del nostre software.

- Està basat en una arquitectura "Mestre" - "Esclau".

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

![Pantalla principal jenkins](./img/25-%20pantalla%20principal%20jenkins.png)




