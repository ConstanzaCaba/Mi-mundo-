let img = [];
let sphere1Pos, sphere2Pos, squarePos, boxPos;
let showPuzzle = false;
let cam1;
let cam2;
let usingCam1 = false;
let usingCam2 = true;

// puzzle
let source = [];
let tiles = [];
let cols = 4;
let rows = 4;
let w = 400;
let h = 400;
let board = [];
let blankSpot = -1;
let imgSize = 400;
let canvas2;
//ARREGLO PARA TRANSLADAR EL PUZZLE!
let x2=550;
let y2=120;

let stopButton;
let soundButton;
let icono;
var song;
let linkButton;

let textY;
let textSpeed = 0.5;

let boxSize = 100; // Tamaño inicial de la caja
let boxSpeed = 0.2; 
let sphereSize = 100;
let sphereSpeed = 0.08;
//let colores;
//let colorGenerator;//borrar


function preload() {
  song = loadSound("LIQUEN.mp3");
  
  font1 = loadFont('fuentes/HelveticaNeueLTProRoman.otf');
  font2 = loadFont('fuentes/bus-stop.ttf');

  img = [loadImage('foto1.jpg'), loadImage('foto2.jpg'), loadImage('foto3.jpg'), loadImage('pasto.jpg'), loadImage('pie.jpg')];
  source = [loadImage('foto1.jpg'), loadImage('foto2.jpg'), loadImage('foto3.jpg'), loadImage('pasto.jpg')];

  pie=loadModel('feet.obj');

  iconoImg = loadImage('icono.png');

}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  canvas2 = createGraphics(400, 400, WEBGL);
  canvas2.background(255,30,0);
//canvas2.clear();

  textFont(font1);
  textSize(15);

  sphere1Pos = createVector(100, 50, 50);
  sphere2Pos = createVector(20, 200, 250);
  squarePos = createVector(0, 0, 0);
  boxPos = createVector(200, 200, 200);

  cam2 = createCamera();
 
  cam1 = createCamera();
  cam1.setPosition(0, 0, 300);
  cam1.lookAt(0, 0, 0);

  setCamera(cam2);

  angleMode(DEGREES);

  stopButton = createButton('home');
  stopButton.position(1395, 610);
  stopButton.size(80, 40);
  stopButton.style('display', 'none'); // Oculta el botón inicialmente
  stopButton.mousePressed(reiniciarPagina);
  //estilo del botón homeee
  stopButton.style('color', 'white'); // Texto en blanco
  stopButton.style('background-color', 'transparent'); // Sin fondo
  stopButton.style('border', '1px solid white'); // Borde blanco de 1px
  stopButton.style('font-size', '16px'); // Tamaño de fuente
  stopButton.style('cursor', 'pointer'); // Cambiar cursor al pasar sobre el botón

  soundButton = createButton('');
  soundButton.position(30, 100);
  soundButton.size(30,30);
  soundButton.mousePressed(musicaOn);
  soundButton.style('background-color', 'transparent'); // Sin fondo
  soundButton.style('border', '1px solid rgb(200,255,0)'); // Borde blanco de 1px
  soundButton.style('cursor', 'pointer'); // Cambiar cursor al pasar sobre el botón

  linkButton = createButton('Visuales');
  linkButton.position(30, 140);
  linkButton.size(70, 30);
  linkButton.mousePressed(abrirPagina);
  linkButton.style('color', 'rgb(200,255,0)');
  linkButton.style('background-color', 'transparent');
  linkButton.style('border', '1px solid rgb(200,255,0)');
  linkButton.style('font-size', '12px');
  linkButton.style('cursor', 'pointer');

  textY=-120;
}

function musicaOn(){
  console.log('musica si');
  if (song.isPlaying()) {
    song.stop();
  } else {
    song.play();
    // Puedes ajustar el volumen si es necesario
    // song.setVolume(0.5);
  }
}

function abrirPagina() {
  window.open ('colores.html'); // Abre el enlace en la misma pestaña
}

function draw() {
   
  background(0)
  textFont(font2);
  if (showPuzzle) {
    console.log(showPuzzle)
    //translate(-width/2,-height/2,0);
    ortho();
    setCamera(cam1);
    usingCam1 = true;
    usingCam2 = false;
   //canvas2.background(255,0,0);
   // mostrarPuzzle();
    //image(canvas2,0,0);
    acomodar(x2,y2);

  } else {

    orbitControl();
    noStroke();
    specularMaterial(250);
    shininess(50);
    directionalLight(245,255,140,0,1,1);//nuevo
    estrellas();

  // Draw first sphere
  push(); 
  translate(sphere1Pos.x, sphere1Pos.y, sphere1Pos.z);
  texture(img[0]);
  imageLight(img[0]);
  sphere(sphereSize);
  fill(192,212,235);
  text('click!',-20,textY,0);
  pop();
  sphereSize += sphereSpeed;
  if (sphereSize > 105 || sphereSize < 95) {
    sphereSpeed *= -1; // Invierte la dirección del cambio de tamaño
  }
  textY += textSpeed;
  if (textY > 5 || textY < -120) {
    textSpeed *= -1; // Invierte la dirección del movimiento
  }

  // Draw second sphere
  push();
  translate(sphere2Pos.x, sphere2Pos.y, sphere2Pos.z);
  texture(img[1]);
  imageLight(img[1]);
  sphere(sphereSize);
  fill(255,5,10);
  rotateY(70);
  text('click!',-20,textY,0);
  pop();
  sphereSize += sphereSpeed;
  if (sphereSize > 110 || sphereSize < 98) {
    sphereSpeed *= -1; // Invierte la dirección del cambio de tamaño
  }
  textY += textSpeed;
  if (textY > 5 || textY < -120) {
    textSpeed *= -1; // Invierte la dirección del movimiento
  }

  // Draw second square (box)
  push();
  translate(boxPos.x, boxPos.y, boxPos.z);
  rotateY(HALF_PI / 2);
  imageLight(img[2]);
  texture(img[2]);
  box(boxSize);
  fill(255,5,100);
  rotateY(-70);
  text('click!',-20,textY/2,0);
  pop();

  boxSize += boxSpeed;
  if (boxSize > 110 || boxSize < 98) {
    boxSpeed *= -1; // Invierte la dirección del cambio de tamaño
  }
  textY += textSpeed;
  if (textY > 5 || textY < -120) {
    textSpeed *= -1; // Invierte la dirección del movimiento
  }

  // Draw first square
  push();
  translate(squarePos.x, squarePos.y, squarePos.z);
  rotateX(90);
  texture(img[3]);
  imageLight(img[3]);
  translate(60,150,-330);
  plane(350, 350);
  pop();

  //if (showPuzzle) {
   // push();
   // setCamera(cam1);
   // usingCam1=true;

     //canvas2.background(0);
   // translate(-width / 2, -height / 2);
   // image(canvas2, 0, 0);
   // mostrarPuzzle();
   // pop();} 

   push();
   scale(5);
   translate(-10,-26,20);
   fill(248,255,10);
   rotateX(180);
   rotateY(-110);
   imageLight(img[4]);
   model(pie);
   pop();
}
}


function estrellas(){
    push();
    rotateZ(frameCount * 0.08);
    rotateX(frameCount * 0.08);
    rotateY(frameCount * 0.08);
    strokeWeight(0.2);
    stroke(255,255,255);
    ambientLight(255,255,255,100);
    //ambientLight(300);
    fill(0);
    //specularMaterial(255,255,255);
    shininess(300);
    //emissiveMaterial(255, 255, 0);
    translate(20,140,100);
    sphere(5,24,4);
    translate(200,150,60);
    sphere(8,24,4);
    translate(100,5,200);
    sphere(8,24,4);
    translate(10,50,-400);
    sphere(10,24,4);
    translate(-420,-250,300);
    sphere(10,24,4);
    translate(-50,-100,-100);
    sphere(5,24,4);
    translate(50,130,-120);
    sphere(10,24,4);
    translate(-80,200,150);
    sphere(10,24,4);
    translate(-130,200,350);
    sphere(10,24,4);
    translate(-130,-300,150);
    sphere(10,24,4);
    translate(630,-400,-200);
    sphere(5,24,4);
    translate(330,200,50);
    sphere(10,24,4);
    translate(-330,400,-550);
    sphere(10,24,4);
    pop()
    }


function setupPuzzle(img) {

  tiles = [];
  board = [];

  w = imgSize / cols;
  h = imgSize / rows;

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * w;
      let y = j * h;
      let tileImg = createImage(w, h);
      tileImg.copy(img, x, y, w, h, 0, 0, w, h);
      let index = i + j * cols;
      board.push(index);
      let tile = new Tile(index, tileImg);
      tiles.push(tile);
    }
  }
  tiles.pop();
  board.pop();
  board.push(-1);
  simpleShuffle(board);
}

function swap(i, j, arr) {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

function randomMove(arr) {
  let r1 = floor(random(cols));
  let r2 = floor(random(rows));
  move(r1, r2, arr);
}

function simpleShuffle(arr) {
  for (let i = 0; i < 50; i++) {
    randomMove(arr);
  }
}

function mostrarPuzzle() {
  //translate(x2,y2);
  canvas2.background(0);
  
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let index = i + j * cols;
      let x = i * w;
      let y = j * h;
      let tileIndex = board[index];
      if (tileIndex > -1) {
        let img = tiles[tileIndex].img;
        image(img, x, y, w, h);
      }
    }
  }

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * w;
      let y = j * h;
      strokeWeight(1);
      canvas2.noFill();
      canvas2.rect(x, y, w, h);
    }
  }

  if (isSolved()) {
    console.log("SOLVED");
    colorGenerator.drawRandomRectangles(20);
    //colorGenerator.drawRandomRectangles(2);
    stopButton.style('display', 'block');
    translate(-380,66);
    //fill('rgba(255, 255, 255, 0.5)'); //cambiar el color del texto a blanco
    stroke(255,255,255);
    textFont(font1);
    textSize(90);
    textAlign(LEFT);
    text('GANASTE            *~¨  .°. °¨~¨.:',-10,0);
    text('SOS TOD4 UN4 SOÑADORA ',0,100);
    textFont(font2);
    text('estas lista para',0,200);
    text('emprender el viaje',0,300);
    text('de tus sueños',0,400);
  }
}

function acomodar(x2,y2){
 translate(x2,y2);
  push()
     translate(-width/2,-height/2,0); 
     image(canvas2,0,0);
     mostrarPuzzle();
  pop()
}

function isSolved() {
  for (let i = 0; i < board.length - 1; i++) {
    if (board[i] !== tiles[i].index) {
      return false;
    }
  }
  return true;
}

function move(i, j, arr) {
  let blank = findBlank();
  let blankCol = blank % cols;
  let blankRow = floor(blank / rows);

  if (isNeighbor(i, j, blankCol, blankRow)) {
    swap(blank, i + j * cols, arr);
  }
}

function isNeighbor(i, j, x, y) {
  if (i !== x && j !== y) {
    return false;
  }
  if (abs(i - x) == 1 || abs(j - y) == 1) {
    return true;
  }
  return false;
}

function findBlank() {
  for (let i = 0; i < board.length; i++) {
    if (board[i] == -1) return i;
  }
}


function mousePressed() {
if (showPuzzle){
  let adjustedX = mouseX - x2;
  let adjustedY = mouseY - y2;
  let i = floor(adjustedX / w);
  let j = floor(adjustedY / h);
  move(i,j,board);} else{

  let mouseRay = calculateMouseRay();

  if (intersectsSphere(mouseRay, sphere1Pos, 100)) {
    onSphere1Click();
  }

  if (intersectsSphere(mouseRay, sphere2Pos, 100)) {
    onSphere2Click();
  }

  if (intersectsBox(mouseRay, squarePos, createVector(200, 200, 0))) {
    onSquareClick();
  }

  if (intersectsBox(mouseRay, boxPos, createVector(100, 100, 100))) {
    onBoxClick();
  }
}}

function calculateMouseRay() {
  let cameraZ = (height / 2.0) / tan(PI * 30.0 / 180.0);
  let mouseX3D = mouseX - width / 2;
  let mouseY3D = mouseY - height / 2;
  let mouseZ3D = -cameraZ;

  let rayOrigin = createVector(0, 0, cameraZ);
  let rayDirection = createVector(mouseX3D, mouseY3D, mouseZ3D).normalize();
  return { origin: rayOrigin, direction: rayDirection };
}

function intersectsSphere(ray, center, radius) {
  let oc = p5.Vector.sub(ray.origin, center);
  let a = p5.Vector.dot(ray.direction, ray.direction);
  let b = 2.0 * p5.Vector.dot(oc, ray.direction);
  let c = p5.Vector.dot(oc, oc) - radius * radius;
  let discriminant = b * b - 4 * a * c;
  return discriminant > 0;
}

function intersectsBox(ray, center, dimensions) {
  let tmin = (center.x - dimensions.x / 2 - ray.origin.x) / ray.direction.x;
  let tmax = (center.x + dimensions.x / 2 - ray.origin.x) / ray.direction.x;

  if (tmin > tmax) [tmin, tmax] = [tmax, tmin];

  let tymin = (center.y - dimensions.y / 2 - ray.origin.y) / ray.direction.y;
  let tymax = (center.y + dimensions.y / 2 - ray.origin.y) / ray.direction.y;

  if (tymin > tymax) [tymin, tymax] = [tymax, tymin];

  if ((tmin > tymax) || (tymin > tmax)) return false;

  if (tymin > tmin) tmin = tymin;
  if (tymax < tmax) tmax = tymax;

  let tzmin = (center.z - dimensions.z / 2 - ray.origin.z) / ray.direction.z;
  let tzmax = (center.z + dimensions.z / 2 - ray.origin.z) / ray.direction.z;

  if (tzmin > tzmax) [tzmin, tzmax] = [tzmax, tzmin];

  if ((tmin > tzmax) || (tzmin > tmax)) return false;

  if (tzmin > tmin) tmin = tzmin;
  if (tzmax < tmax) tmax = tzmax;

  return true;
}

function onSphere1Click() {
  setupPuzzle(source[0]);
  showPuzzle = true;
  console.log("Sphere 1 clicked!");
}

function onSphere2Click() {
  setupPuzzle(source[1]);
  showPuzzle = true;
  console.log("Sphere 2 clicked!");
}

//function onSquareClick() {
 // console.log("Square clicked!");}

function onBoxClick() {
  setupPuzzle(source[2]);
  showPuzzle = true;
  console.log("Box clicked!");
}

function reiniciarPagina () {
  window.location.reload();
} 