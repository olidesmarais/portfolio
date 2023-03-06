jeu_serpent = (sketch) => {

  let chemin = 'client/public/canevas/jeu_serpent/';

  //Code du jeu_serpent.js
  //Paramètre du jeu
  let DIMENSION_ECRAN;
  let DIMENSION_DAMIER;
  let HAUTEUR_ENTETE;
  const NB_CARRES_PAR_LIGNE = 12;
  let TAILLE_CARRE;
  const FREQUENCE_DEPLACEMENT = 15;
  
  
  //Serpent
  let serpent;
  let son_deplacement, son_manger;
  
  //Variables globales
  let damier;
  let debut, jeu, fin, gagne;
  let message_fin;
  let son;
  
  //Interactivité
  let bouton_debut, bouton_fin;
  
  //Pointage
  let score, meilleur_score;
  
  //Son
  const audioContext = new AudioContext();


  sketch.preload = () => {
    //DIMENSION_ECRAN = sketch.createVector(760, 850);

    son_deplacement = sketch.loadSound(chemin + 'deplacement.wav');
    son_manger= sketch.loadSound(chemin + "manger_edite.wav");
  }

  sketch.setup = () => {
    //Affichage
    let div = document.getElementById('canevas_jeu_serpent');
    let largeur = div.offsetWidth;
    
    // Dimensions originale : 760 x 850
    DIMENSION_ECRAN = sketch.createVector(largeur, largeur * 850 / 760);
    DIMENSION_DAMIER = 720 * DIMENSION_ECRAN.x / 760;
    HAUTEUR_ENTETE = 100 * DIMENSION_ECRAN.y / 850;
    TAILLE_CARRE = DIMENSION_DAMIER / NB_CARRES_PAR_LIGNE;
    
    let canevas = sketch.createCanvas((DIMENSION_ECRAN.x), (DIMENSION_ECRAN.y));
    div.innerHTML = '';
    canevas.parent('canevas_jeu_serpent');
    canevas.id('executable_jeu_serpent')
    
    //Interactivité
    bouton_debut = new sketch.Bouton( DIMENSION_ECRAN.x / 2, DIMENSION_ECRAN.y / 2 + DIMENSION_ECRAN.y / 16, "Jouer");
    bouton_fin = new sketch.Bouton( DIMENSION_ECRAN.x / 2, DIMENSION_ECRAN.y / 2 + DIMENSION_ECRAN.y / 8, "Rejouer");
    
    //Audio
    son = true;

    //Déroulement
    debut = true;
    meilleur_score = 0;
  }

  sketch.draw = () => {
    sketch.background(104, 146, 104);
    sketch.randomSeed(sketch.millis());
    
    if (debut) {
      sketch.fill(255);
      sketch.textAlign(sketch.CENTER, sketch.CENTER);
      sketch.textSize(DIMENSION_ECRAN.x * 0.075);
      sketch.text("Le jeu du serpent", DIMENSION_ECRAN.x / 2, DIMENSION_ECRAN.x / 3);
      sketch.textSize(DIMENSION_ECRAN.x * 0.03);
      bouton_debut.render();
      sketch.fill(255);
      sketch.text("Déplacement : flèches ou AWSD \n Audio (ON/OF) : m", DIMENSION_ECRAN.x / 2, DIMENSION_ECRAN.y - DIMENSION_ECRAN.y / 4);
    }
    
    //Déroulement du jeu
    if(jeu) {
      /*Entête*/
      sketch.afficher_score();
      
      /*Jeu*/
      //Mises à jour
      if (sketch.frameCount % FREQUENCE_DEPLACEMENT == 0) {
      //Gestion serpent
      serpent.deplacement();
      }
      serpent.update();
      
      //Affichage
      damier.render();
      serpent.render();
    }
    //Fin du jeu
    if(fin) {
      sketch.textAlign(sketch.CENTER, sketch.CENTER);
      sketch.textSize(20);
      sketch.fill(255);
      sketch.afficher_score();
      sketch.text(message_fin, sketch.width / 2, sketch.height / 2);
      bouton_fin.render();
    }
  }

  sketch.keyPressed = (touche) => {      
    if (touche.key == 'm' || touche.key == 'M') {
      son = !son;
    }
    
    if (debut || fin) {
      if (touche.key == 'Enter' || touche.key == ' ')
        sketch.debut_partie();
    }
    if (jeu) {
      if (touche.key == 'ArrowUp' || touche.key == 'w' || touche.key == 'W')
        if (serpent.corps[0].coordonnees_damier.y - 1 != serpent.corps[1].coordonnees_damier.y)
          serpent.corps[0].direction = 'h';
      if (touche.key == 'ArrowRight' || touche.key == 'd' || touche.key == 'D')
        if (serpent.corps[0].coordonnees_damier.x + 1 != serpent.corps[1].coordonnees_damier.x)
          serpent.corps[0].direction = 'd';
      if (touche.key == 'ArrowDown' || touche.key == 's' || touche.key == 'S')
        if (serpent.corps[0].coordonnees_damier.y + 1 != serpent.corps[1].coordonnees_damier.y)
          serpent.corps[0].direction = 'b';
      if (touche.key == 'ArrowLeft' || touche.key == 'a' || touche.key == 'A') 
        if (serpent.corps[0].coordonnees_damier.x - 1 != serpent.corps[1].coordonnees_damier.x)
          serpent.corps[0].direction = 'g';
    }
  }

  sketch.mouseReleased = () => {
    audioContext.resume();
    if (debut) {
      if (bouton_debut.clic())
        sketch.debut_partie();
    }
    if (fin) {
      if (bouton_fin.clic()) 
        sketch.debut_partie();
    }

  }

   sketch.debut_partie = async () => {

    //Création des instances

    damier = new sketch.Damier();
    serpent = new sketch.Serpent(2, 2);

    jeu = true;
    debut = fin = gagne = false;


    damier.nouvelle_nourriture();
    score = serpent.corps.length;

  }
 
  sketch.fin_partie = () => {
    jeu = false;
    fin = true;
    if (score > meilleur_score)
    meilleur_score = score;
 }
 
 sketch.afficher_score = () => {
    sketch.textAlign(sketch.CENTER, sketch.CENTER);
    sketch.fill(255);

    if(jeu) {
      sketch.fill(255);
      score = serpent.corps.length;
      if (score > meilleur_score)
      meilleur_score = score;
      sketch.text("taille : " + score, DIMENSION_DAMIER / 4, HAUTEUR_ENTETE / 2);
      sketch.text("meuilleur score : " + meilleur_score, sketch.width - sketch.width/4, HAUTEUR_ENTETE / 2);
    }

    if(fin) {
      sketch.textSize(DIMENSION_ECRAN.x * 0.04);
      sketch.text("score : " + score, sketch.width/4, sketch.height / 3);
      sketch.text("meuilleur score : " + meilleur_score, sketch.width - sketch.width/4, sketch.height / 3);

    }
  }
  //Classe Bouton
  sketch.Bouton = function (px, py, t) {
  
    this.position = sketch.createVector(px, py); 
    this.largeur = 150 * DIMENSION_ECRAN.x / 760;
    this.hauteur = 50 * DIMENSION_ECRAN.y / 850;
    this.texte = t;

    
    this.render = () => {
      sketch.rectMode(sketch.CENTER);
      sketch.noStroke();
      sketch.fill(230);
      sketch.rect(this.position.x, this.position.y, this.largeur, this.hauteur);
      sketch.textAlign(sketch.CENTER, sketch.CENTER);
      sketch.textSize(DIMENSION_ECRAN.x * 0.03);
      sketch.fill(0);
      sketch.text(this.texte, this.position.x, this.position.y);
    }
    
    this.clic = () => {
      return sketch.mouseX > this.position.x - this.largeur / 2 && sketch.mouseX < this.position.x + this.largeur / 2 &&
             sketch.mouseY > this.position.y - this.hauteur / 2 && sketch.mouseY < this.position.y + this.hauteur /2;
    }
  }
  //Classe Daminer
  sketch.Damier = function () {
    
    this.initialisation = () => {
      let idx, jdx;
      idx = jdx = 0;
      let fonce = false;
      let couleur;
      let marge_x, debut_x, fin_x, marge_y, debut_y, fin_y;
      marge_x = (DIMENSION_ECRAN.x - DIMENSION_DAMIER) / 2;
      debut_x = marge_x;
      fin_x = DIMENSION_ECRAN.x - marge_x;
      marge_y = (DIMENSION_ECRAN.y - DIMENSION_DAMIER - HAUTEUR_ENTETE) / 2;
      debut_y = HAUTEUR_ENTETE + marge_y;
      fin_y = DIMENSION_ECRAN.y - marge_y;
      let bornes_x = [debut_x, fin_x];
      let bornes_y = [debut_y, fin_y];

      //Déterminer la position
      for (let px = bornes_x[0] + TAILLE_CARRE / 2; px < bornes_x[1] ; px += TAILLE_CARRE) {
        this.grille[idx] = [];
        for (let py = bornes_y[0] + TAILLE_CARRE / 2 ; py < bornes_y[1] ; py += TAILLE_CARRE) {
          //Détrminer la couleur
          if (fonce)
            couleur = sketch.color(0, 171, 102) ;
          else
            couleur = sketch.color(133, 187, 101);
          
          //Ajout du carré dans le damier
          this.grille[idx][jdx] = new sketch.Carre_damier( px, py, couleur, TAILLE_CARRE);

          //Mise à jour des variable après chaque carré
          fonce =! fonce;
          jdx++;
          jdx = jdx % NB_CARRES_PAR_LIGNE;
        }
        //Mise à jour des variable après chaque rangée
        fonce =! fonce;
        idx++;
        idx = idx % 12;
      }
    }
  
    this.render = () => {
      for (let rangee of this.grille) 
        for (let carre of rangee) 
          carre.render();
    }
    
    //Fonction qui remet de la nourriture dans le damier
    this.nouvelle_nourriture = () => {
      {
        let carre_nourriture;
        do {
          carre_nourriture = sketch.createVector(Math.floor(sketch.random( 0, NB_CARRES_PAR_LIGNE)), Math.floor(sketch.random( 0, NB_CARRES_PAR_LIGNE)));
        } while (this.grille[carre_nourriture.x][carre_nourriture.y].occupe) ;
        
        this.grille[carre_nourriture.x][carre_nourriture.y].presence_nourriture = true;
      }
    }
    
    this.occupe = (coordonnee) => {
      return this.grille[coordonnee.x][coordonnee.y].occupe;
    }
    
    this.get_presence_nourriture = (coordonnee) => {
      return this.grille[coordonnee.x][coordonnee.y].presence_nourriture;
    }
    
    this.set_presence_nourriture = (coordonnee, state) => {
      this.grille[coordonnee.x][coordonnee.y].presence_nourriture = state;
    }
    this.grille = [];
    this.initialisation();
  }
  //Classe Carré damier
  sketch.Carre_damier = function (px, py, c, t) {
  
      this.position = sketch.createVector( px, py);
      this.couleur = c;
      this.taille = t;
      this.occupe = false;
      this.presence_nourriture = false;
    
    this.render = () => {
      sketch.rectMode(sketch.CENTER);
      sketch.noStroke();
      sketch.fill(this.couleur);
  
      sketch.rect( this.position.x, this.position.y, this.taille, this.taille);
      
      if (this.presence_nourriture) {
        sketch.fill(0,0,200);
        sketch.ellipse(this.position.x, this.position.y, TAILLE_CARRE * 0.4, TAILLE_CARRE * 0.4);
      }
    }
  
  }
  // Classe Serpent
  sketch.Serpent = function (dx, dy) {
    
      // 3 cercles de départ
      this.corps = [];
      this.corps.push(new sketch.Cercle_serpent( dx, dy, 'd', true));
      this.corps.push(new sketch.Cercle_serpent( dx - 1, dy, 'd', false));
      this.corps.push(new sketch.Cercle_serpent( dx - 2, dy, 'd', false));
      this.taille = this.corps.length;
      this.queue;
      //this.direction_precedente;
      // nourriture
      this.mange = false;
      //this.direction_precedente = 'd';
    
    //Affichage du serpent
    this.render = () => {
      //Corps (trait)
      sketch.noFill();
      sketch.stroke(122,37,118);
      sketch.strokeWeight(parseInt(TAILLE_CARRE * 0.7));
      sketch.beginShape();
      sketch.curveVertex(this.corps[0].position.x, this.corps[0].position.y);
      for (let cercle of this.corps)
        sketch.curveVertex(cercle.position.x, cercle.position.y);
      sketch.curveVertex(this.corps[this.corps.length - 1].position.x, this.corps[this.corps.length - 1].position.y);
      sketch.endShape();
      
      // Tâches (cercles)
      for (let cercle of this.corps)
        cercle.render();
    }
    
    // Update du serpent
    // Enclenche la mise à jour de tous les cercles de son corps
    // Incrémente leur position par la vitesse
    this.update = () => {
      for (let cercle of this.corps) 
        cercle.update();
    }
    
    //Fonction permettant au serpent de se déplacer.
    //Déplacement de tous les cercles
    this.deplacement = () => {
      //print("deplacement");
      //Update de la tête
      let damier_precedent, damier_actuel;
      let deplacementAnnule;
      //boolean premier = true; 
      //Mémorisation du dernier cercle
      // il sera ajouté à la fin du corps si le serpent a mangé
      this.queue = new sketch.Cercle_serpent(this.corps[this.corps.length - 1]);
      
      for (let cercle of this.corps) {
        //Déplacement du cercle
        damier_precedent = sketch.createVector(cercle.coordonnees_damier.x, cercle.coordonnees_damier.y);
        if (cercle.premier && this.direction_precedente != cercle.direction && son)
          son_deplacement.play();
        cercle.deplacement();
        damier_actuel = sketch.createVector(cercle.coordonnees_damier.x, cercle.coordonnees_damier.y);
        
        //Vérifications à faire pour la tête
        if (cercle.premier) {
          deplacementAnnule = this.analyseTete();
          if (deplacementAnnule)
            return;
          //premier = false;
        } 
        
        cercle.maj_vitesse();
        
        //Mise à jour du damier
        damier.grille[damier_precedent.x][damier_precedent.y].occupe = false;
        damier.grille[damier_actuel.x][damier_actuel.y].occupe = true;
      }
      
      //Mise à jour de la direction des cercles de tout le corps
      for (let idx = this.corps.length - 1 ; idx > 0 ; idx--)
        this.corps[idx].direction = this.corps[idx - 1].direction;
      
      //Gestion de la nourriture mangee
      if (this.mange) {
        this.grandir(); 
      }
    }
    
    this.grandir = () => {
      if (son)
        son_manger.play();
      
      //MAJ serpent
      this.corps.push(this.queue);
      damier.grille[this.queue.coordonnees_damier.x][this.queue.coordonnees_damier.y].occupe = true;
      this.taille += 1;
      this.mange = false;
      
      if (this.corps.length == NB_CARRES_PAR_LIGNE * NB_CARRES_PAR_LIGNE) {
        gagne = true;
        message_fin = "gagné !!!";
        sketch.fin_partie();
      }
      else {
        //MAJ nourriture
        damier.set_presence_nourriture(this.corps[0].coordonnees_damier, false);
        damier.nouvelle_nourriture();
      }
    }
    
    //Fonction qui performe les analyses de la position de la tête pour déterminer si :
    //  - le déplacement est illégal (hors du damier ou sur une case occuopée)
    //  - de la nourriture a été rencontrée
    this.analyseTete = () => {
      this.direction_precedente = this.corps[0].direction;
      
      //Déplacement hors jeu
      if (this.corps[0].aLexterieur()) {
          message_fin = "PERDU ! - Foncé dans un mur";
          sketch.fin_partie();
          return true;
      }
      //Déplacement sur case occupée
      if (damier.occupe(this.corps[0].coordonnees_damier)) {
          message_fin = "PERDU ! - Foncé sur lui-même";
          //fin = true;
          sketch.fin_partie();
          return true;
      }
      // Déplacement sur une case avec de la nourriture 
      if (damier.get_presence_nourriture(this.corps[0].coordonnees_damier)) {
          this.mange = true;
      }  
      return false;
    }
  }
  // Classe Cercle serpent
  //Classe des cercles qui composent le corps du serpent

  sketch.Cercle_serpent = function (...args) {
    
    this.render = () => { 
      sketch.noStroke();
      sketch.fill(200, 0, 0);
      sketch.ellipse( this.position.x, this.position.y, TAILLE_CARRE * 0.25, TAILLE_CARRE * 0.25);
    }
    
    this.update = () => {
      this.position.x += this.vitesse.x;
      this.position.y += this.vitesse.y;
    }
    
    this.deplacement = () => {
      //Déplacement
      this.origine = damier.grille[this.coordonnees_damier.x][this.coordonnees_damier.y].position;
      
      switch(this.direction) {
        case 'h':
          this.coordonnees_damier.y -= 1;
          break;
        case 'd':
          this.coordonnees_damier.x += 1;
          break;
        case 'b':
          this.coordonnees_damier.y += 1;
          break;
        case 'g':
          this.coordonnees_damier.x -= 1;
          break;
        default: 
          console.log("Problème direction déplacement");
          sketch.noLoop();
      }
    }
    
    this.maj_vitesse = () => {
      this.position = sketch.createVector(this.origine.x, this.origine.y);
      let destination = damier.grille[this.coordonnees_damier.x][this.coordonnees_damier.y].position;
      
      this.vitesse.x = (destination.x - this.origine.x) / FREQUENCE_DEPLACEMENT;
      this.vitesse.y = (destination.y - this.origine.y) / FREQUENCE_DEPLACEMENT;
    }
    
    this.aLexterieur = () => {
      return this.coordonnees_damier.x < 0 || this.coordonnees_damier.x >= NB_CARRES_PAR_LIGNE || this.coordonnees_damier.y < 0 || this.coordonnees_damier.y >= NB_CARRES_PAR_LIGNE;
    }

    this.copier_cercle = (autre) => {
      return new Cercle_serpent()
    }
    //Constructeur
    if (args.length == 1) {
      //args : (autre)
      let autre = args[0];
      this.coordonnees_damier = sketch.createVector( autre.coordonnees_damier.x, autre.coordonnees_damier.y);
      
      this.direction = autre.direction;
      this.premier = false;
      
      this.origine = autre.origine;
      
      this.vitesse = sketch.createVector();
      this.position = autre.position; 
      this.maj_vitesse();
      
      damier.grille[this.coordonnees_damier.x][this.coordonnees_damier.y].occupe = true;
    }
    else {
      //args : ( dx, dy, d, p)
      this.coordonnees_damier = sketch.createVector( args[0], args[1]);
      this.direction = args[2];
      this.premier = args[3];
      this.position = sketch.createVector(damier.grille[this.coordonnees_damier.x][this.coordonnees_damier.y].position.x, damier.grille[this.coordonnees_damier.x][this.coordonnees_damier.y].position.y);
      this.vitesse = this.origine = this.destination = sketch.createVector();

      damier.grille[args[0]][args[1]].occupe = true;
    }
  }

}
new p5(jeu_serpent);