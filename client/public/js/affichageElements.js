let listeAffichage = [];
//let premier_ajout = true;
let liste_divs = [];

// Reconstrction du DOM lors d'un changement à 
// la taille de la fenêtre
// window.addEventListener('resize', function() {
//     construire_elements();
// });

function afficherElements() {
    let sectionElements = document.getElementById("elements");
    sectionElements.innerHTML = "";

    let fondPale = false; 

    for (let element of listeAffichage) {
        let div_element;
        for (let div of liste_divs) {
            if (div.id == element.id_element)
                div_element = div;
        }
        if (fondPale) {
            div_element.classList.add('pale');
            div_element.classList.remove('fonce');
        } else {
            div_element.classList.add('fonce');
            div_element.classList.remove('pale');
        }
        sectionElements.append(div_element);
        
        fondPale = !fondPale;
    }
}

/*  Fonction construire_element()
    Appelée au lancement du programme pour exécuter les étapes suivantes :
    1- Construction de la liste d'affichage
    2- Premier affichager des éléments
    3- Stockage des divs contenants informations associées à un élément
    Par la suite, l'affichage se faire par la fonction afficherElements(), 
    où les divs stockées à l'étape 3 sont affichés en fonction des filtres.
*/
function construire_elements() {

    // for (element of listeElements) {
    //     listeAffichage.push(element);
    // }
    
    majListeAffichage();

    let sectionElements = document.getElementById("elements");
    sectionElements.innerHTML = "";

    let fondPale = false; 
    
    for (let contenu of listeAffichage) {
        
        //Création du divContenu
        let divContenu = document.createElement('div');
        divContenu.setAttribute('id', contenu.id_element);
        sectionElements.appendChild(divContenu);
        
        divContenu.classList.add( 'contenu', 'text-center', contenu.dimension);

        if (fondPale)
            divContenu.classList.add('pale');
        else
            divContenu.classList.add('fonce');
        

        //Création des card-header et card-body
        //ajouterEnfants(divContenu, contenu.dimension, 2, ['card-header-', 'card-body-'])[0];

        divContenu.append(
            (() => {
                const header = document.createElement('div');
                header.classList = 'card-header';
                header.append(
                    (() => {
                        let titre = document.createElement('div');
                        titre.classList = 'card-title';
                        titre.innerHTML = remplirTitre(contenu);
                        return titre;
                    })(),
                    (() => {
                        let resume = document.createElement('div');
                        resume.classList = 'card-resume';
                        resume.innerHTML = remplirResume(contenu);
                        return resume;
                    })()
                );


                return header;
            })(),
            (() => {
                const body = document.createElement('div');
                body.classList = 'card-body';
                return body;
            })(),
        );

        //Remplissage card-header
        // ajouterEnfants(divContenu.childNodes[0], contenu.dimension, 2, ['card-title-', 'card-resume-']);
        // divContenu.childNodes[0].childNodes[0].innerHTML = remplirTitre(contenu);
        // divContenu.childNodes[0].childNodes[1].innerHTML = remplirResume(contenu);
        
        remplir_texte( 'contexte', contenu, divContenu.childNodes[1]);

        // Afficher le média
        const carousel = construire_carousel(contenu);
        if (contenu.dimension != 'multi') {
            remplirMedia(contenu, divContenu.childNodes[1]);
        } 
        else {
            //Ajout du carousel au divBody
            divContenu.childNodes[1].append(carousel);
            remplirMedia(contenu, carousel.childNodes[0]);
            construire_carousel_complement(contenu, carousel);
        }

        //Afficher le complément
        remplir_texte( 'demarche', contenu, divContenu.childNodes[1]);

        if(contenu.note.length > 0) {
            ajouterNote(contenu, divContenu.childNodes[1]);
        }
        if(contenu.avertissement.length > 0) {
            ajouterAvertissement(contenu, divContenu.childNodes[1]);
        }

        liste_divs.push(divContenu);
        fondPale = !fondPale;
    }

    let head = document.getElementsByTagName('head')[0];
    let chemin_tronc = 'client/public/canevas/';
    let chemin_specifique;
    for (let contenu of listeAffichage) {
        if (contenu.type == 'executable') {
            let script;
            script = document.createElement('script');
            head.append(script);
            chemin_specifique = contenu.specifique[0].chemin + '/' + contenu.specifique[0].chemin + '.js'
            script.setAttribute('src', chemin_tronc + chemin_specifique);
        }
    }


    let divCloture = document.createElement('div');
    if (fondPale)
        ajouterClasse(divCloture, ['contenu', 'text-center', 'pale']);
    else
        ajouterClasse(divCloture, ['contenu', 'text-center', 'fonce']);

    let texteCloture = document.createElement('h4');
    texteCloture.innerHTML = "D'autres projets à venir ..."
    divCloture.appendChild(texteCloture);

    sectionElements.appendChild(divCloture);
}

function remplirTitre(contenu) {
    let resultat = '';
    resultat += `
                    <h3>${contenu.titre}</h3>
                    <h4>${contenu.sous_titre}</h4>
                    <h5>${lettre_majuscule(contenu.categorie)}</h5>
                `
    // Certains contenus de dimension multi ont une date qui leur est propre. 
    // Elle sera alors affichée sour le média. Sinon, la date sera indiquée
    // sous le titre. 
    if(contenu.jour != '')
        resultat += afficherDate(contenu);
    
    return resultat;
}

function remplirResume(contenu) {
    let resultat = '';

    //Compétences
    if (contenu.competences.length > 0) {
        resultat  +=  '<ul class="bullet-point" ">'; // style="margin-right:14%;
        resultat += '<h4>Compétences</h4>';
        for (let competence of contenu.competences) {
            if (competence)
                resultat += '<li>' + affichage_texte_option(competence) + '</li>';
        }
        resultat += '</ul>';
    }

    //Technique
    if(contenu.logiciels.length > 0) {
        resultat += '<ul class="bullet-point">'
        resultat += '<h4>Logiciels</h4>';
        for (let logiciel of contenu.logiciels) {
            resultat += '<li>' + affichage_texte_option(logiciel) + '</li>';
        }
        resultat += '</ul>';
    }

    return resultat;
}

//function remplirSimple(contenu, divBody)
function remplirMedia(contenu, parent){

    for (idx = 0 ; idx < Object.keys(contenu.specifique).length ; idx++) {
        switch(contenu.type) {
            case 'bouton':
                parent.innerHTML += afficherUrl(idx, contenu, 0, true);
                break;
            case 'video':
                // divBody.innerHTML += afficherVideo(idx, contenu, divBody);
                afficherVideo(idx, contenu, parent);
                break;
            case 'executable':
                parent.append(afficherExecutable(idx, contenu));
                break;
            case 'texte':
                parent.append(afficherTexte(idx, contenu));
                break;
            default :
                console.log('remplirSimple : type non reconnu');
        }
    }
    
    //Afficher la date
    // if (contenu.dimension == 'mutli' && contenu.jour == '') {
    //     divBody.append( 
    //         div = (() => {
    //             const p = document.createElement('p');
    //             p.setAttribute('class', 'date');
    //             p.textContent = afficherDate(contenu);
    //             return p;
    //         })()
    //     );
    // }
    // let p = document.createElement('p');
    // p.setAttribute('class', 'date');
    // div.append(p);
    // p.textContent = afficherDate(contenu);

    //let div_complement = document.createElement('div', {class : "card-complement-" + dimension});


    // divBody.innerHTML += '<div class="card-complement-' + dimension + '">';
    // divBody.innerHTML += '<p class="date">' + afficherDate(contenu) + '</p>';
    // divBody.innerHTML += '<h5 class="card-intertitre-' + dimension + '">Démarche</h5><p class="card-text">' + contenu.demarche + '</p></div>';
    
    
    //divBody.append(div_complement);
}

//  function remplirDouble(contenu, divBody) {
//     let body = '';

//     body += '<h5 class="card-intertitre">Contexte</h5><p class="card-text">' + contenu.contexte + '</p>';
//     let tabAlt = ['avant', 'après'];
//     let tabTxt = ['le code', 'le résultat'];

//     for (let idx = 0 ; idx < 2 ; idx++) {
//         body += '<div class="card-complement">';
//         if (contenu.source[0] == 'texte')
//             body += afficherTexte(idx, tabTxt[idx]);
//         if (contenu.source[0] == 'image')
//             body += afficherImage(contenu.source[idx + 1], tabAlt[idx]);
//         if (contenu.source[0] == 'url')    
//             body += afficherUrl(contenu, idx, false);
//         body += '</div>';
        
//     }

//      body += '<h5 class="card-intertitre">Démarche</h5><p class="card-text">' + contenu.demarche + '</p>';

//      divBody.innerHTML = body;
//  }

//  function remplirMulti(contenu, divBody) {
//     body = '';

//     body += `
//                 <div class="card-complement-multi">
//                     <h5 class="card-intertitre-multi">Contexte</h5>
//                     <p class="card-text">${contenu.contexte}</p>
//                  </div>
//             `

//     body += affichercarouselle(contenu.source);

//     body += `
//                 <div class="card-complement-multi">
//                     <h5 class="card-intertitre-multi">Démarche</h5>
//                     <p class="card-text">${contenu.demarche}</p>
//                  </div>

//             `

//     divBody.innerHTML = body;
//  }

 function afficherDate (contenu) {
    let jour = String(contenu.jour);
    let noMois = parseInt(contenu.mois);
    let mois;
    let annee = String(contenu.annee);

    switch(noMois) {
        case 1 : mois = 'janvier'; break;
        case 2 : mois = 'février'; break;
        case 3 : mois = 'mars'; break;
        case 4 : mois = 'avril'; break;
        case 5 : mois = 'mai'; break;
        case 6 : mois = 'juin'; break;
        case 7 : mois = 'juillet'; break;
        case 8 : mois = 'août'; break;
        case 9 : mois = 'septembre'; break;
        case 10 : mois = 'octobre'; break;
        case 11 : mois = 'novembre'; break;
        case 12 : mois = 'décembre'; break;
        default :
            console.log('probleme avec mois : ' + noMois);
            mois = "";
    }
    return jour + ' ' + mois + ' ' + annee;
}

function retirerElementsAffichage (tabId) {
    for (let id of tabId) {
        let position = getPosition(id, listeAffichage);
        listeAffichage.splice(position, 1);
    }
}

function ajouterAvertissement(contenu, divBody) {
    let divAvertissement = document.createElement('div');
    let nomClass = 'disclamer';
    ajouterClasse(divAvertissement, [nomClass]);

    let resultat = '';
    resultat += '<span class="disclamer-image"><i class="fa fa-exclamation-triangle" style="font-size:235%;"></i></span>'
    resultat += '<p class="disclamer-text">' + contenu.avertissement + '</p>';
    
    divAvertissement.innerHTML = resultat;
    divBody.appendChild(divAvertissement);
}

function ajouterNote(contenu, divBody) {
    let divNote = document.createElement('div');
    let nomClass = 'disclamer';
    ajouterClasse(divNote, [nomClass]);
    let resultat = '';
    resultat += '<span class="disclamer-image"><i class="fa fa-plus-circle" style="font-size:235%;"></i></span>'
    resultat += '<p class="disclamer-text">' + contenu.note + '</p>';
    
    divNote.innerHTML = resultat;
    divBody.appendChild(divNote);
}

function remplir_texte( texte, contenu, parent) {

    //let div = document.createElement('div');
    //div.setAttribute('class', 'card-complement-' + contenu.dimension);
    //parent.append(div);

    //Afficher la démarche
    let titre;
    if (texte == 'demarche')
        titre = 'Démarche';
    else if (texte == 'contexte')
        titre = 'Contexte';
    else
        titre = '';

    parent.append(
        h5 = (() => {
            const h5 = document.createElement('h5');
            h5.setAttribute('class', 'card-intertitre');
            h5.innerHTML = titre;

            return h5;
        })(),
        (() => {
            const p = document.createElement('p');
            p.setAttribute('class', 'card-text');
            p.innerHTML = contenu[texte];
            return p;
        })()
    );

}

function construire_carousel(contenu) {
    const id_carousel = contenu.id_element + '_carousel';
    const carousel = document.createElement('div');
    carousel.setAttribute('id', id_carousel);
    carousel.classList.add('carousel');
    carousel.setAttribute('data-bs-ride', 'carousel');
    // divBody.append(carousel);

    // Portion du carousel qui contient les iframe.
    // Retourné par la fonction en tant que parent
    // des iframe.
    carousel.append(
        inner = (() => {
            const inner = document.createElement('div');
            inner.setAttribute('class', 'carousel-inner');
            return inner;
        })()
    );
    return carousel;
}

function construire_carousel_complement(contenu, carousel) {
    const dimension_media = (()=>{
        // Accès au div 'carousel-inner' qui est présentement actif
        // #id_element_carousel > .carousel-inner > carousel-item
        let parent = document.getElementById(carousel.id).childNodes[0].childNodes[0];
        // Retour du width et du height du média, enfant de carousel-item
        return {
            'width': parent.childNodes[0].width,
            'height': parent.childNodes[0].height,
        };
    })();
    
    carousel.append(
        inner, 
        // Petits indicateur sous les vidéos
        indicateur = (() => {
            const indicateur = document.createElement('div');
            indicateur.classList.add('carousel-indicators');
            for (let idx = 0 ; idx < Object.keys(contenu.specifique).length ; idx++) {
                indicateur.append(
                    bouton = (() => {
                        const bouton = document.createElement('button');
                        bouton.setAttribute('type', 'button');
                        bouton.setAttribute('data-bs-target', '#' + carousel.id);
                        bouton.setAttribute('data-bs-slide-to', idx);
                        bouton.setAttribute('aria-label', `Slide ${idx + 1}`)
                        if (idx == 0) {
                            bouton.classList.add('active');
                            bouton.setAttribute('aria-current', 'true');
                        }
                        return bouton;
                    })()
                );
            }
            return indicateur;
        })(),
        prev = (() => {
            const prev = document.createElement('button');
            prev.classList.add('carousel-control-prev');
            prev.setAttribute('type', 'button');
            prev.setAttribute('data-bs-target', '#' + carousel.id);
            prev.setAttribute('data-bs-slide','prev');
            prev.setAttribute('style', 'height:' + dimension_media.height + 'px');
            prev.innerHTML = `<span class='carousel-control-prev-icon fleche' aria-hidden='true'></span>
                              <span class='visually-hidden'>Previous</span>
                             `
            return prev;
        })(),
        next = (() => {
            const next = document.createElement('button');
            next.classList.add('carousel-control-next');
            next.setAttribute('type', 'button');
            next.setAttribute('data-bs-target', '#' + carousel.id);
            next.setAttribute('data-bs-slide','next');
            next.setAttribute('style', 'height:' + dimension_media.height + 'px');
            next.innerHTML = `<span class='carousel-control-next-icon fleche' aria-hidden='true'></span>
                              <span class='visually-hidden'>Next</span>
                             `
            return next;
        })()
    );
    return inner;
}