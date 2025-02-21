// Adaptabilite.js
// Gère l'adaptabilité du site

let isTouchDevice;

let set_police = () => {
    const width = '--width';
    const largeur = document.body.offsetWidth;
    document.documentElement.style.setProperty(width, largeur + 'px');
};

document.addEventListener("DOMContentLoaded", function(){
    isTouchDevice = 'ontouchstart' in document.documentElement;
    set_police();
});