let recHeight = 1000;
let recWidth = 600;

class Colors {
  constructor(colores, recWidth, recHeight) {
    this.colores = colores;
    this.recWidth = recWidth;
    this.recHeight = recHeight;
  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  getRandomColor() {
    const randomIndex = this.getRandomInt(0, this.colores.length - 1);
    return this.colores[randomIndex];
  }

  drawRandomRectangles(numRectangles) {
    for (let i = 0; i < numRectangles; i++) {
      const x = this.getRandomInt(-700, this.recWidth);
      const y = this.getRandomInt(-200, this.recHeight);
      const w = this.getRandomInt(400, 600);
      const h = this.getRandomInt(90, 500);
      const color = this.getRandomColor();
      fill(color);
      noStroke();
      rect(x, y, w, h);
      filter(BLUR, 30);
      frameRate(2);
    }
  }
}

let colores = ['rgb(145,255,10)', 'rgb(248,255,10)', 'rgb(255,0,82)', 'rgb(217,191,255)', 'rgb(255,72,0)'];
let colorGenerator = new Colors(colores, recWidth, recHeight);

