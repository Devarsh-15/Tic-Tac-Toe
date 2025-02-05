let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let msgContainer = document.querySelector(".msgContainer");
let msg = document.querySelector("#msg");
let newGame = document.querySelector("#newGame");

let winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Select all elements with the class 'box'
const boxess = document.querySelectorAll(".box");

// Add a click event listener to each box
boxess.forEach(function (box) {
  box.addEventListener("click", function () {
    this.style.backgroundColor = " #cf1414"; // Change the background color on click
  });
});

let turn0 = true;

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    // console.log("Clicked!");
    if (turn0) {
      box.innerText = "O";
      turn0 = false;
    } else {
      box.innerText = "X";
      turn0 = true;
    }
    box.disabled = true;
    checkWinner();
  });
});
const resetGame = () => {
  turn0 = true;
  enableboxes();
  boxes.forEach((box) => {
    box.style.backgroundColor = ""; // Reset to default (CSS-defined) background color
  });
};
const enableboxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
    msgContainer.classList.add("hide");
  }
};
const disableboxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const drawGame = () => {
  msg.innerText = "It's a Draw!";
  msgContainer.classList.remove("hide");
};

const showWinner = (winner) => {
  msg.innerText = `Congratulations!! Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disableboxes();

  // newGame.addEventListener("click",()=>{
  //     console.log("New Game");
  // })
};
const checkWinner = () => {
  let filledCount = 0;
  let winnerFound = false;
  for (let pattern of winPatterns) {
    let pos1 = boxes[pattern[0]].innerText;
    let pos2 = boxes[pattern[1]].innerText;
    let pos3 = boxes[pattern[2]].innerText;

    if (pos1 != "" && pos2 != "" && pos3 != "") {
      if (pos1 === pos2 && pos2 === pos3) {
        // console.log("Wiiner is here !! ");
        showWinner(pos1);
        winnerFound = true;
        break;
      }
    }
  }
  if (!winnerFound) {
    boxes.forEach((box) => {
      if (box.innerText !== "") {
        filledCount++;
      }
    });
  }

  if (filledCount === 9) {
    drawGame();
  }
};

newGame.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
