function make2DArray(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

let promptGrid;
let userGrid;
let cols = 3;
let rows = 3;
let w = 50;
let roundDisplay;

function setup() {
  createCanvas(325, 325);
  background(255);
  promptGrid = make2DArray(cols, rows);

  roundDisplay = createP(`Round: ${round + 1}`);
  roundDisplay.position(50, 200);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      promptGrid[i][j] = new Cell(i * w, j * w, w);
    }
  }

  userGrid = make2DArray(cols, rows);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      userGrid[i][j] = new Cell(i * w, j * w, w);
    }
  }

  promptSequence();
}

function draw() {
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      promptGrid[i][j].drawCell(0, 0);
    }
  }

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      userGrid[i][j].drawCell(175, 0);
    }
  }
}

function keyPressed() {
  // Clearing array
  if (keyCode == ENTER) {
    console.log(roundWon());
    if (roundWon() == true) {
      // promptArray.splice(0, promptArray.length);
      userArray.splice(0, userArray.length);

      round++;
      roundDisplay.html(`Round: ${round + 1}`);
      promptSequence();
    } else {
      roundDisplay.html(`Well done, you completed ${round} rounds`);
      console.log("Answer:");
      for (let i = 0; i < round + 1; i++) {
        console.log(promptArray[i]);
      }
    }
  }
}

function mousePressed() {
  if (mouseButton == LEFT) {
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        if (promptGrid[i][j].contains(mouseX, mouseY)) {
          flashBlue(i, j);
          promptGrid[i][j].register(i, j);
        }
      }
    }
  }
}

function roundWon() {
  let win = true;

  for (let i = 0; i < round + 1; i++) {
    for (let j = 0; j < round + 1; j++) {
      if (promptArray[i][j] != userArray[i][j]) {
        win = false;
      }
    }
  }
  return win;
}
