

//Adaptation aux appareils mobiles : https://stackoverflow.com/questions/6850164/get-the-device-width-in-javascript

/**************************************************************
 * Fonction permettant de retrouver la position d'un élément
 * dans une liste.
 * IN  : id de l'élément à trouver dans la liste
 * IN  : liste dans laquelle trouver l'élément
 * OUT : position de l'élément à trouver 
 *       ou -1 s'il n'est pas trouvé
 **************************************************************/

function getPosition(id, liste) {
    
    //let id = element.id;
    if (liste.length == 0)
        return -1;

    for (let idx = 0 ; idx < liste.length ; idx++) {
        if (liste[idx].id_element == id)
            return idx;
    }
    
    return -1;
}

/**************************************************************
 * Fonction permettant de trier en ordre décroissant les
 *  éléments de contenus dans la listeÉléments. La fonction
 *  appelle la méthode sort().
 * La date est stockée dans le JSON comme trois attributs : 
 * jour, mois et annee.
 **************************************************************/

function filtrerListe() {
    listeElements.sort(function (a, b) {
        if (a.jour == '')
            a = a.specifique[0];
        if (b.jour == '')
            b = b.specifique[0];

        if (parseInt(a.annee) - parseInt(b.annee))
            return parseInt(b.annee) - parseInt(a.annee);
        if (parseInt(a.mois) - parseInt(b.mois))
            return parseInt(b.mois) - parseInt(a.mois)
        if (parseInt(a.jour) - parseInt(b.jour))
            return parseInt(b.jour) - parseInt(a.jour);
        return 1
    })
}



/**************************************************************
 * Fonction permettant de déterminer la taille de l'écran et 
 * d'afficher le contenu en conséquenc.
 * Fonction en vigueur jusqu'à ce que le portfolio soit adapté 
 * pour les appareils mobiles.
 * Méthode appelée lors du chargement de la page. 
 **************************************************************/
function determinerTailleEcran() {
    let largeur = window.innerWidth;
    //if (largeur >= 1024) {
        document.getElementsByTagName('body')[0].innerHTML = `
                            <div id="fb-root"></div>
                            <script async defer crossorigin="anonymous" src="https://connect.facebook.net/fr_CA/sdk.js#xfbml=1&version=v12.0" nonce="y8xirfV0"></script>
                            <!--Début du header-->
                            <header class="bg-light">
                            <div class="p-5 headerTitre">
                                <h1 class="mb-3">Bienvenue</h1>
                                <h2 class="mb-3">dans mon portfolio</h2>
                                <h3>par Olivier Desmarais</h3>
                            </div>
                            <div class="p-5 headerTexte">
                                <h3>D'abord,</h3>
                                <h4>
                                j'ai codé ce site Web en HTML. 
                                Il référe  à des éléments de Bootstrap 
                                personnalisés grâce au CSS.
                                </h4>
                                <h4>
                                Je l'ai développé sur <em>Visual Studio Code</em>.
                                </h4>
                                <br>
                                <h5>
                                Comme vous le savez peut-être, vous pouvez consulter
                                le code grâce au clique droit, avec l'option 
                                <em>Afficher le code source de la page</em>.
                                </h5>
                            </div>
                            </header>
                            <!--Fin du header-->
                            <!-- Navbar -->
                            <nav class="navbar-expand-lg navbar-light bg-white">
                            <div class="txtNav">
                                <h3>De plus,</h3>
                                <h5>
                                vous vous apprêtez à décrouvrir différents projets
                                que j'ai eu la chance de réaliser. Ces données sont stockées
                                dans un fichier JSON accédé par PHP. <!--Je sais d'ailleurs
                                faire l'équivalent à partir d'un fichier XML.-->
                                </h5>
                                <br>
                                <h4>
                                Plusieurs fonctions JavaScript vous permettront 
                                de filtrer mes accomplissements selon le domaine. 
                                </h4>
                                <!--<h5>
                                Certaines commandes JQuerry sont également utilisées.
                                </h5>-->
                            </div>
                            <div class="container-fluid">
                                <div class="collapse navbar-collapse allignementCentre" id="navbarExample01">
                                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                                    <li class="nav-item active" onclick="changerFiltre(this)">
                                    <a class="nav-link" aria-current="page">Tout</a>
                                    </li>
                                    <li class="nav-item" onclick="changerFiltre(this)">
                                    <a class="nav-link">Communication</a>
                                    </li>
                                    <li class="nav-item" onclick="changerFiltre(this)">
                                    <a class="nav-link">Programmation</a>
                                    </li>
                                    <li class="nav-item" onclick="changerFiltre(this)">
                                    <a class="nav-link">Animation</a>
                                    </li>
                                </ul>
                                </div>
                            </div>
                            <div class="txtNav">
                                <!--Début accordéon-->
                                <div class="accordion accordion-flush" id="filtresSups">
                                <div class="accordion-item">
                                    <h2 class="accordion-header" id="flush-headingOne">
                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                        <h5>
                                        Ces filtres supplémentaires sont aussi disponibles 
                                        pour affiner votre recherche.
                                        </h5>
                                    </button>
                                    </h2>
                                    <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#filtresSups">
                                    <div id='filtreCompetences' class='goupeCheckbox'>
                                        <p><strong>Compétences</strong></h5>
                                    </div>
                                    <div id='filtreLogiciels' class='goupeCheckbox'>
                                        <p><strong>Logiciels</strong></p>
                                    </div>
                                    </div>
                                </div>
                                <!--Fin accordéon-->
                                <!---
                                <h5>
                                Des filtres supplémentaires sont aussi disponibles 
                                pour affiner votre recherche.
                                </h5>
                                <div id='filtreCompetences' class='goupeCheckbox'>
                                <p><strong>Compétences</strong></h5>
                                </div>
                                <div id='filtreLogiciels' class='goupeCheckbox'>
                                <p><strong>Logiciels</strong></p>
                                </div>-->
                            </div>
                            </nav>
                            <!-- Fin Navbar -->
                            <main>
                            <div id="elements">
                            </div>
                            </main>
                            <footer class="footer text-muted">
                                <p><strong>Pour me joindre</strong><br>
                                olidesmarais@hotmail.com<br>
                                (514) 404-7808</p>
                                <p><strong>Dernière mise à jour</strong><br>
                                    5 mars 2023</p>
                            </footer>
                        `
    /*} else { //Si l'écran n'a pas la taille nécessaire
        document.getElementsByTagName('body')[0].innerHTML = 
        `
            <div class="p-5 headerTexte">   
                <h5>Mon portfolio n'est malheureusement pas encore adapté pour un écran de cette taille.</h5>
                <br>
                <h5>S'il vous plaît, tentez d'y accéder avec un appareil de plus grande taille ou agrandissez la fenêtre et raffraîchissez la page.</h5>
            </div>
        `
    }*/
}

function lettre_majuscule(mot) {
    return mot.charAt(0).toUpperCase() + mot.slice(1);
}

