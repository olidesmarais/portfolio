document.addEventListener("DOMContentLoaded", function(){


        console.log('listiner');

        initialisation = () => {
            
            
            // let width;
            // detecter_largeur = () => {
            //     if (window.innerWidth) {
            //         // Cas des appareils mobiles
            //         width = window.innerWidth * window.devicePixelRatio;
            //     } else if (document.documentElement.clientWidth) {
            //         // Cas des ordinateurs de bureau
            //         width = document.documentElement.clientWidth;
            //     }
    
            //     console.log('Largeur disponible pour le document : ' + width);
            //     console.log('Screen.availWidth : ' + screen.availWidth)
            // }
            // detecter_largeur();
    
            
            parametrer_afficahge = () => {

                const class_name = 'test';
        
                const div = document.getElementsByTagName('body')[0];
                console.log('body.offsetWidth : ' + div.offsetWidth);
                
                // const largeur = (div.offsetWidth - 16) / 19;
                const largeur = (div.offsetWidth - 16) / 19;
                //console.log(largeur);
    
                for (let styleSheet of document.styleSheets) {
                    const cssRules = styleSheet.cssRules;
                    for (let rule of cssRules) {
                        // switch(rule.selectorText) {
                        //     case '.test':
                        //         if (rule.selectorText.includes('header'))
                        //             rule.style.fontSize = (largeur) + 'px';
                        //         else
                        //             rule.style.backgroundColor = 'rgb(194, 204, 145';
                        //         break;
                        // }
                        if (rule.selectorText.includes('header')) {
                            if (rule.selectorText.includes('.test'))
                                rule.style.fontSize = (largeur - largeur * 0.1) + 'px';
                            // rule.style.backgroundColor = 'black';
                            //console.log(rule);
                        }
                    }
                }

                console.log('parametrer_affichage');
                
                const element = 'h1';
        
                const body = document.body;
                console.log('body.offsetWidth : ' + body.offsetWidth);
                
                // const largeur = (body.offsetWidth - 16) / 19;
                let pas_lettres;
                console.log('pas_lettres : ' + pas_lettres);
    
                const titre1 = document.getElementById('titre1');
                const titre2 = document.getElementById('titre2');
                const titre3 = document.getElementById('titre3');
    
                titre1. 
    
                //Parcourir les styles sheets
                // for (let styleSheet of document.styleSheets) {
                //     //Identifier la styleSheet 'style.css'
                //     if (styleSheet.href.includes('client/public/css/style.css')) {
                //         // Parcourir les règles
                //         for (let rule of styleSheet.cssRules) {
                //             // switch(rule.selectorText) {
                //             //     case '.test':
                //             //         if (rule.selectorText.includes('header'))
                //             //             rule.style.fontSize = (pas_lettres) + 'px';
                //             //         else
                //             //             rule.style.backgroundColor = 'rgb(194, 204, 145';
                //             //         break;
                //             // }
                //             if (rule.selectorText.includes('header')) {
                //                 console.log('includes');
                //                 console.log('rule');
                //                 console.log(rule);
                //                 if (rule.selectorText.includes('h1')) {
                //                     pas_lettres = (body.offsetWidth - 16) / 7;
                //                     rule.style.fontSize = (pas_lettres - pas_lettres * 0.1) + 'px';
                //                 // rule.style.backgroundColor = 'black';
                //                 //console.log(rule);
                //                 }
                //             }
                //         }
                //     }
                // }
    
    
                
    
            };
            parametrer_afficahge();
        };
        initialisation();
    });