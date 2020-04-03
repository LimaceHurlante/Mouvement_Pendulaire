//----------Sliders // Coucou Anaïs
let sli = [];
let can;
let pv = [];
let cc;
let ccStart;
let ang = 0;
let myAng;
let psss = 0;
let nb = 30;

//----------Queue
var ballon = []
var sett;
var r = 20;
var queueLimite = 30;



function setup() {

  //can = createCanvas(400, 400);
  //can.addClass('myClass');
  //can.parent(cc); 

  //----------Sliders
  ccStart = createElement("center", " ");
  sli[0] = createSlider(0, 10, 0);
  sli[1] = createSlider(0, 15, 0);
  sli[0].parent(ccStart);
  sli[1].parent(ccStart);
  createP("");
  ccStart.style("background-color", 'gray');
  setTimeout(lanceAnim, 10000);
  cc = createElement("center", " ")

  for (var i = 2; i < nb; i++) {
    sli[i] = createSlider(0, 255, 50)
    sli[i].addClass('myClass');
    sli[i].parent(cc);
    pv[i] = createP('');
    pv[i].parent(cc);
  }

  //----------Queue
  can = createCanvas(600, 600);
  can.elt.style.position = "fixed";
  can.style("position", "0,0");
  noStroke();
  fill(80, 50, 255);
  sett = setInterval(creationAuto, 1000)
}


function draw() {
  drawSliders();
  // drawQueue();
}
//----------Sliders
function lanceAnim() {
  if (sli[0].value() === 0 && sli[1].value() === 0) {
    sli[0].value(8);
    sli[1].value(3);
  }



}

function drawSliders() {
  ang += sli[0].value() / 100;
  psss += sli[1].value() / 100;
  for (var i = 2; i < sli.length; i++) {
    myAng = ang + map(i, 0, 9, 0, psss);
    sli[i].value(map(sin(myAng), -1, 1, 0, 255));
  }
}

//----------Queue
function drawQueue() {
  background(190);

  for (var i = 0; i < ballon.length; i++) {
    ballon[i].display();
    ballon[i].move();
  }
  if (ballon.length > 6) {
    clearInterval(sett);
  }

}

function creationAuto() {
  ballon.push(new Balle(-r / 2, random(5, height - 5)));
}

function mouseClicked() {
  ballon.push(new Balle(mouseX, mouseY));
}
class Balle {
  constructor(x, y) {
    this.queue = [];
    this.balle = createVector(x, y);
    this.speed = createVector(random(1, 3), 0)
    this.R = random(200);
    this.G = random(200);
    this.B = random(200);
  }

  move() {
    this.speed.y += 0.1
    if (this.balle.y - r / 2 > height) {

      this.speed.y = this.speed.y * -1;

    }

    this.balle.add(this.speed);
    if (this.balle.x > width + r / 2) {
      this.balle.x = -r / 2;
    }

    this.queue.push(createVector(this.balle.x, this.balle.y));
    if (this.queue.length > queueLimite) {
      this.queue.splice(0, 1);
    }
  }

  display() {
    fill(this.R, this.G, this.B);
    circle(this.balle.x, this.balle.y, r);
    for (var i = 0; i < this.queue.length; i++) {
      fill(this.R, this.G, this.B, map(i, 0, 10, 0, 255));
      circle(this.queue[i].x, this.queue[i].y, r);
    }
  }
}
