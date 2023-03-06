function afficherVideo (idx, contenu, parent) {
    let div = document.createElement('div');
    parent.append(div);

    let largeur = div.offsetWidth; 
    if (contenu.orientation == 'vertical')
        largeur /= 2;
    else
        largeur *= 0.8;

    let hauteur = contenu.hauteur * largeur / contenu.largeur;
    let xml = contenu.specifique[idx].xml;

    //Pour les dimensions multi, commencer avec la première vidéo.
    if (contenu.dimension == 'multi') {
        div.classList.add('carousel-item');
        if (idx == 0)
            div.classList.add('active');
    }

    div.innerHTML = `<iframe ${xml} width=\"${largeur}\" height=\"${hauteur}\"></iframe>`;
    
    // Pour les contenus de type multi, certain ont une date qui leur est propre. 
    // Dans ce cas, la date ne sera pas indiquée sous le titre comme les autres,
    // mais bien sous l'élément lorsqu'il est affiché. 
    if (contenu.jour == '') 
        div.innerHTML += `<p>${contenu.specifique[idx].sous_titre}</p>
                          <p class='date'>${afficherDate(contenu.specifique[idx])}</p>`;

}

function afficherImage(src, alt) {
    return '<img src="' + src + '" alt="' + alt +'">';
}

function afficherCarousselle(sousListe) {

    let resultat = '';
    let id = sousListe[0].id_element.slice(0,-2);
    
    resultat += `
                <div id="${id}" class="carousel slide" data-bs-ride="carousel">
                <div class="carousel-indicators">
            `
    //Indicateur
    resultat += '<button type="button" data-bs-target="' + id + '" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>';
    
    for (let idx = 1 ; idx < sousListe.length ; idx++) {
        resultat += '<button type="button" data-bs-target="#' + id + '" data-bs-slide-to="' + idx + '" aria-label="Slide ' + idx+1 + '"></button>';
    }
    resultat += `
                </div>
                <div class="carousel-inner">
            `
    
    //Inner
    resultat += '<div class="carousel-item active">'
    resultat += afficherVideo(sousListe[0].source);
    resultat += '<p class="titre-video"><strong>' + sousListe[0].titre + '</strong></p>';
    resultat += '<p class="date">' + afficherDate(sousListe[0]) + '</p></div>';

    for (let idx = 1 ; idx < sousListe.length ; idx++) {
        resultat += '<div class="carousel-item">'
        resultat += afficherVideo(sousListe[idx].source);
        resultat += '<p class="titre-video"><strong>' + sousListe[idx].titre + '</strong></p>';
        resultat += '<p class="date">' + afficherDate(sousListe[idx]) + '</p></div>';
    }

    resultat += `
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#${id}" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#${id}" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
                </div>
            `
    return resultat;
 }

 function afficherTexte(noSource, contenu) { 
    let texte = contenu.specifique[noSource];
    let description = texte.intitule;

    let div = document.createElement('div');
    div.setAttribute('class', 'card-complement-' + contenu.dimension);

    div.append(
        a = (() => {
            const a = document.createElement('a');
            a.classList.add('btn', 'btn-primary');
            a.textContent = 'Afficher ' + texte.intitule;
            a.setAttribute('onclick', `afficherTextArea(this,'${description}', ${noSource})`)
            //afficherTextArea(this, '${description}', ${noSource + 1})
            return a;
        })(),
        br = document.createElement('br'),
        ta = (() => {
            const ta = document.createElement('textarea');
            ta.setAttribute('class', 'cache');
            return ta;
        })()
    );
    
    return div;

    // return  `
    //             <a onclick="afficherTextArea(this, '${description}', ${noSource + 1})" class="btn btn-primary">${description}</a>
    //             <br>
    //             <textarea class="cache";></textarea>
    //         `
}

 function afficherTextArea(a, description, noSource) {
    let parent = a.parentNode;
    console.log(a);

    //Identifier le textarea
    let tabEnfants = parent.getElementsByTagName('textarea');
    let textarea = tabEnfants[0];

    //Identifier l'emplacement de l'éléments dans la liste
    let element = parent.parentNode.parentNode;
    let id = getPosition(element.id, listeElements);

    //Afficher
    if (textarea.classList.contains('cache')) {
        textarea.classList.remove('cache');
        textarea.value = lireFichierTexte(listeElements[id].specifique[noSource].lien, textarea); 
        a.innerHTML = 'Masquer ' + description;
    //Cacher
    } else {
        textarea.classList.add('cache');
        a.innerHTML = 'Afficher ' + description;
    }
}

function afficherUrl(idx, contenu, noSource, isSingle) {
    
    let source;
    if (noSource == 0)
        source = 1;
    else
        source = 3;

    let id = getPosition(contenu.id_element, listeElements);

    let classes = "btn btn-primary";
    if (isSingle)
        classes += " btn-url";

    return `
        <a href='${listeElements[id].specifique[idx].url}' target='_blank' class='${classes}'>
            ${listeElements[id].specifique[idx].texte}
        </a>
    `
}

function afficherExecutable(idx, contenu) {
 
    let div = document.getElementById('canevas_' + contenu.specifique[idx].chemin);
    if (!div) {
        div = document.createElement('div');
        div.setAttribute('id', 'canevas_' + contenu.specifique[idx].chemin);
    }
    return div;
}