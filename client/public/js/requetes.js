/*20050502 - Olivier Desmarais
 *Fichier contenant les fonctions impliquées dans les requêtes
 */

let listeElements = [];
let nbElements = 0;
let listeElementsDisponibles = false;

//Accède aux données contenues dans le fichier JSON dans le serveur  
function requetes() {
    let chemin = 'serveur/donnees/listeElements.json'
    fetch(chemin).then((response) => {
        if(response.ok) {
            response.json().then((reponseJSON) => {
            listeElements = reponseJSON;
            // console.log(listeElements);
            listeElementsDisponibles = true;
            nbElements = listeElements.length;
            determinerTailleEcran();
            afficherOptionsFiltres();
            filtrerListe();
            construire_elements();
        });
        } else {
            console.log('Mauvaise réponse du réseau');
        }
    })
    .catch((error) => {
        console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);
    });
}

let contenuFichierTexte = 'Avant';

function lireFichierTexte(nomFichier, textarea) {

    fetch(nomFichier).then((response) => {
        if(response.ok) {
        response.text().then((reponseTexte) => {
            //contenuFichierTexte = reponseTexte;
            
            textarea.value = reponseTexte;
        });
        } else {
            contenuFichierTexte = 'Mauvaise réponse du réseau';
        }
    })
    .catch((error) => {
        contenuFichierTexte = 'Il y a un problème avec le fichier : ' + error.message;
    });
}


