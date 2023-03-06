
function ajouterClasse (element, tabClasses) {
    //let classe = document.createAttribute('class');
    for (let valClasse of tabClasses) {
        element.classList.add(valClasse);
    }
}

function ajouterEnfants(element, type, nbEnfants, tabClasses) {
        
    for (let idx = 0 ; idx < nbEnfants ; idx++) {
        let div = document.createElement('div');
        let nomClasse = tabClasses[idx] + type;
        ajouterClasse(div, [nomClasse]);

        element.appendChild(div);
    }

    return element.childNodes;
}