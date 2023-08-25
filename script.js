let color = "black";
let sketch = true;
let clickArea = document.querySelector(".board");
clickArea.addEventListener("click", function () {
  if (window.innerWidth > 768) {
    sketch = !sketch;
    if (sketch) {
      document.querySelector(".mode").textContent = "Color Mode: On";
      document.querySelector(".mode").style.color = "#04acc9";
    } else {
      document.querySelector(".mode").textContent = "Color Mode: Off";
      document.querySelector(".mode").style.color = "#e30101";
    }
  } else if (window.innerWidth < 768) {
    sketch = true;
    document.querySelector(".mode").textContent = "Color Mode: On";
    document.querySelector(".mode").style.color = "#04acc9";
  }
});
function settleBoard(size) {
  const board = document.querySelector(".board");
  const squares = board.querySelectorAll("div");
  squares.forEach((div) => div.remove());
  board.style.gridTemplateColumns = `repeat(${size} , 1fr)`;
  board.style.gridTemplateRows = `repeat(${size} , 1fr)`;
  const amount = size * size;
  for (let i = 0; i < amount; i++) {
    let square = document.createElement("div");
    square.addEventListener("mouseover", squareColor);
    square.style.backgroundColor = "white";
    board.appendChild(square);
  }
}
function squareColor() {
  if (sketch === true) {
    if (color === "random") {
      this.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
    } else {
      this.style.backgroundColor = color;
    }
  }
}
function changeSize(sizeInput) {
  if (sizeInput <= 100 && sizeInput >= 2) {
    document.querySelector(".error").style.display = "none";
    settleBoard(sizeInput);
  } else {
    document.querySelector(".error").style.display = "block";
  }
}

const inputValue = document.querySelector('input[type="text"]');
inputValue.addEventListener("change", function () {
  changeSize(this.value);
});
function changeColor(userChoice) {
  color = userChoice;
}

const colorButtons = document.querySelectorAll("button.color-but");
colorButtons.forEach((button) => {
  button.addEventListener("click", function () {
    color = button.textContent.toLowerCase();
    changeColor(color);
  });
});

const eraser = document.querySelector("button.eraser");
eraser.addEventListener("click", function () {
  changeColor("white");
});

const random = document.querySelector("button.random");
random.addEventListener("click", function () {
  changeColor("random");
});

const reset = document.querySelector("button.reset");
reset.addEventListener("click", resetBoard);
function resetBoard() {
  const board = document.querySelector(".board");
  const squares = board.querySelectorAll("div");
  squares.forEach((div) => (div.style.backgroundColor = "white"));
}
settleBoard(16);
