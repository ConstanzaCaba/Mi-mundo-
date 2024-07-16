let colores = [];
let recHeight=600;
let recWidth=1200;
var song;
var amp;

function preload() {
  colores = ['rgb(145,255,10)', 'rgb(248,255,10)', 'rgb(255,0,82)','rgb(217,191,255)', 'rgb(255,72,0)'];
  song = loadSound("Burial.mp3");
  song2 = loadSound("Arca.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(2);

  soundButton = createButton('sonido 1');
  soundButton.position(70, 580);
  soundButton.size(70,30);
  soundButton.mousePressed(musicaOn);
  soundButton.style('color', 'white'); 
  soundButton.style('background-color', 'transparent'); // Sin fondo
  soundButton.style('border', '1px solid white'); 
  soundButton.style('font-size', '12px'); // Tamaño de fuente
  soundButton.style('cursor', 'pointer'); // Cambiar cursor al pasar sobre el botón

  soundButton = createButton('sonido 2');
  soundButton.position(70, 620);
  soundButton.size(70,30);
  soundButton.mousePressed(musicaOn2);
  soundButton.style('color', 'white'); 
  soundButton.style('background-color', 'transparent'); // Sin fondo
  soundButton.style('border', '1px solid white'); 
  soundButton.style('font-size', '12px'); // Tamaño de fuente
  soundButton.style('cursor', 'pointer'); // Cambiar cursor al pasar sobre el botón


  amp = new p5.Amplitude();
}

function musicaOn(){
  console.log('musica si');
  if (song.isPlaying()) {
    song.stop();
  } else {
    song.play();
    song2.stop();
    // Puedes ajustar el volumen si es necesario
    // song.setVolume(0.5);
  }
}

function musicaOn2(){
  console.log('musica si');
  if (song2.isPlaying()) {
    song2.stop();
  } else {
    song2.play();
    song.stop();
    // Puedes ajustar el volumen si es necesario
    // song.setVolume(0.5);
  }
}

// Función para generar un número aleatorio entre un mínimo y un máximo
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Función para obtener un color aleatorio del array de colores
function getRandomColor() {
  const randomIndex = getRandomInt(0, colores.length - 1);
  return colores[randomIndex];
}


// Función para dibujar rectángulos aleatorios
function drawRandomRectangles(numRectangles) {
     for (let i = 0; i < numRectangles; i++) {
    // Genera posiciones y tamaños aleatorios
    const x = getRandomInt(-100, recWidth);
    const y = getRandomInt(-100, recHeight);
    const w = getRandomInt(200, 400);
    const h = getRandomInt(90, 300);

    // Genera un color aleatorio del array de colores
    const color = getRandomColor();

    // Dibuja el rectángulo
    fill(color);
    noStroke()
    rect(x, y, w, h);
    filter(BLUR, 30);
  }
}


function colors(numRectangles){
   // blendMode(SOFT_LIGHT);
    drawRandomRectangles(numRectangles); 
    //filter(BLUR, 30);
}

function draw() {
  //background(0);
  let vol = amp.getLevel();
  let numRectangles = Math.floor(map(vol, 0, 1, 1, 50)); // Mapea la amplitud a un número de rectángulos
  colors(numRectangles);

}
