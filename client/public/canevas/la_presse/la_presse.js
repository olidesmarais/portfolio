
la_presse = (sketch) => {

  let img;
  let pressed = false;
  let press_spot;
  let centre;
  let chemin_image = 'client/public/image/la_presse.png';

  sketch.preload = () => {
    img = sketch.loadImage(chemin_image);
  }
  sketch.setup = () => {
    let div = document.getElementById('canevas_la_presse');
    let largeur = div.offsetWidth / 2;
    let canevas = sketch.createCanvas(largeur, largeur * img.height / img.width);
  
    div.innerHTML = '';
    canevas.parent(div);
    canevas.id('executable_la_presse');
    sketch.frameRate(30);
    centre = sketch.createVector(sketch.width / 2, sketch.height / 2);
  }
  sketch.draw = () => {
    sketch.imageMode('CORNER');
    sketch.background(255);
    if (pressed) {
      let zoom = 3;
      sketch.push();
      sketch.scale(zoom);
      sketch.image(img, (-sketch.mouseX * 2) / zoom,  (-sketch.mouseY * 2) / zoom, sketch.width, sketch.height);
      sketch.pop();
    }
    else {
      sketch.image(img, 0,  0, sketch.width, sketch.height);
    }    
  }
  
  sketch.mousePressed = () => {  
    pressed = true;
    press_spot = sketch.createVector(sketch.mouseX - centre.x, sketch.mouseY - centre.y);
  }
  
  sketch.touchStarted = (event) => {  
    // event.preventDefault();
    pressed = true;
    press_spot = sketch.createVector(sketch.mouseX - centre.x, sketch.mouseY - centre.y);
  }

  sketch.mouseReleased = () => {
    pressed = false;
    
  }

  sketch.touchEnded = () => {  
    pressed = false;
  }
}

new p5(la_presse);








