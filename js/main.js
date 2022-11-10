const btnSbmit = document.querySelector(".btn-primary");
const btnReset = document.querySelector(".btn-danger");
const select = document.querySelector("select");
const countdown = document.querySelector(".fw-bold");
let bombs;
let maxCells;
let difficulty;
let winIncre = 0;

btnSbmit.addEventListener("click", function () {
  difficulty = select.value;
  generateCells(difficulty);

  maxCells = generateCells(difficulty);

  bombs = generateBombsList(difficulty);
});

function generateCells(difficulty) {
  const grilContainer = document.querySelector(".gril-container");
  grilContainer.innerHTML = "";
  const parseDifficulty = parseInt(difficulty);
  const counter = parseDifficulty * parseDifficulty;

  for (i = 1; i <= counter; i++) {
    const cell = document.createElement("div");
    cell.classList.add("square");
    cell.style.flexBasis = 100 / parseDifficulty + "%";
    cell.dataset.numCell = i;
    cell.addEventListener("click", onCellClick);
    grilContainer.append(cell);
  }
  return counter;
}

function onCellClick() {
  const numCell = +this.dataset.numCell;

  if (bombs.includes(numCell)) {
    this.classList.add("bg-danger");
    for (i = 0; i < bombs.length; i++) {
      const hideBombs = document.querySelector(
        `.gril-container :nth-child(${bombs[i]})`
      );
      hideBombs.classList.add("bg-danger");
    }
    alert(`HAI PRESO UNA BOMBA! Caselle sicure selezionate ${winIncre}`);
    removeAddEventListener2(difficulty);
  } else {
    winIncre++;
    if (winIncre === maxCells - parseInt(difficulty)) {
      alert(
        `CONGRATULAZIONI HAI VINTO! Caselle sicure selezionate ${winIncre}`
      );
    }
    this.classList.toggle("bg-primary");
  }
}

function randomNum(min, max) {
  return Math.floor(Math.random() * (1 + max - min)) + min;
}

function generateBombsList(difficulty) {
  const bombsContainer = [];
  const numTot = difficulty * difficulty;
  while (bombsContainer.length < difficulty) {
    const positionBombs = randomNum(1, numTot);
    if (!bombsContainer.includes(positionBombs)) {
      bombsContainer.push(positionBombs);
    }
  }
  console.log(bombsContainer);
  return bombsContainer;
}

function removeAddEventListener2(difficulty) {
  const deleteCounter = difficulty * difficulty;
  console.log(deleteCounter);

  const pippo = document.querySelectorAll(".square");
  pippo.forEach((square) => {
    square.removeEventListener("click", onCellClick);
  });
}
