document.addEventListener("DOMContentLoaded", function(){
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


            

        };
        parametrer_afficahge();
    };
    initialisation();
});