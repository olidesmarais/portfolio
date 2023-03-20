// Adaptabilite.js
// Gère l'adaptabilité du site
let set_police = () => {
    const width = '--width';
    const largeur = document.body.offsetWidth;
    document.documentElement.style.setProperty(width, largeur + 'px');
};

let resizeTimer;
window.addEventListener('resize', () => {
    console.log('RESIZE');
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(
        finResize = (() => {
            set_police();
            construire_elements();
            afficherElements();
        })(),
        1000
    );
    
});

document.addEventListener("DOMContentLoaded", function(){
    
    set_police();
    
});