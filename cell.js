const promptArray = [];
const userArray = [];
let counter = 0;
let round = 0;

function Cell(x, y, w) {
  this.x = x;
  this.y = y;
  this.w = w;
}

Cell.prototype.drawCell = function (xoff, yoff) {
  stroke(0);
  noFill();
  rect(this.x + xoff, this.y + yoff, this.w, this.w);
};

Cell.prototype.register = function (i, j) {
  userArray.push([i, j]);
};

Cell.prototype.contains = function (x, y) {
  return (
    x - 175 > this.x &&
    x - 175 < this.x + this.w &&
    y > this.y &&
    y < this.y + this.w
  );
};

function promptSequence() {
  console.log(`Round: ${round + 1}`);
  counter = 0;
  myInterval = setInterval(blueSquare, 500);

  function blueSquare() {
    i = floor(random(3)) * 50;
    j = floor(random(3)) * 50;

    clearScreen();
    fill(0, 0, 255);

    setTimeout(clearScreen, 300);

    if (counter > round - 1) {
      promptArray.push([i / 50, j / 50]);
      clearInterval(myInterval);
    }

    square(promptArray[counter][0] * 50, promptArray[counter][1] * 50, 50);
    counter++;
  }
}

function clearScreen() {
  background(255);
}

function flashBlue(i, j) {
  clearScreen();
  fill("cyan");
  square(i * 50 + 175, j * 50, 50);
  setTimeout(clearScreen, 100);
}
