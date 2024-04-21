let board = Array(3)
  .fill(null)
  .map(() => Array(3).fill(null));
let currentPlayer = "X";
let statusCheck = false;
const boardElement = document.getElementById("board");
const playerTurnElement = document.getElementById("playerTurn");
const resetButton = document.getElementById("resetButton");
const startButton = document.getElementById("startButton");
const statusText = document.getElementById("status");

function placeMove(x, y) {
  if (!statusCheck || board[x][y] || winner()) {
    return;
  }
  board[x][y] = currentPlayer;
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  console.log(board); // Đang tìm lỗi chút nhớ xoá !!!
  renderBoard();
}
function winner() {
  // Từng hàng
  for (let i = 0; i < 3; i++) {
    if (
      board[i][0] &&
      board[i][0] === board[i][1] &&
      board[i][0] === board[i][2]
    ) {
      return {
        winner: board[i][0],
        line: [
          [i, 0],
          [i, 1],
          [i, 2],
        ],
      };
    }
  }

  // Từng cột
  for (let i = 0; i < 3; i++) {
    if (
      board[0][i] &&
      board[0][i] === board[1][i] &&
      board[0][i] === board[2][i]
    ) {
      return {
        winner: board[0][i],
        line: [
          [0, i],
          [1, i],
          [2, i],
        ],
      };
    }
  }
  //phải trên xuống trái dưới
  if (
    board[0][2] &&
    board[0][2] === board[1][1] &&
    board[0][2] === board[2][0]
  ) {
    return {
      winner: board[0][2],
      line: [
        [0, 2],
        [1, 1],
        [2, 0],
      ],
    };
  }
  //trái trên xuống phải dưới
  if (
    board[0][0] &&
    board[0][0] === board[1][1] &&
    board[0][0] === board[2][2]
  ) {
    return {
      winner: board[0][0],
      line: [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
    };
  }

  // hòa
  if (!board.flat().includes(null)) {
    return { winner: "Tie" };
  }
}

function renderBoard() {
  boardElement.innerHTML = "";
  const winningResult = winner();
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const cell = document.createElement("div");
      cell.className = "cell";
      cell.addEventListener("click", () => placeMove(i, j));
      if (board[i][j]) {
        const imageAdd = document.createElement("img");
        imageAdd.src =
          board[i][j] === "X" ? "./assets/x.png" : "./assets/o.png";
        cell.appendChild(imageAdd);
      }
      if (
        winningResult &&
        winningResult.line &&
        winningResult.line.some((cell) => cell[0] === i && cell[1] === j)
      ) {
        cell.classList.add("winning-cell");
      }
      boardElement.appendChild(cell);
    }
  }
  if (winningResult) {
    statusText.innerHTML =
      winningResult.winner === "Tie"
        ? "Chưa có người chiến thắng!<br>Bấm chơi lại để bắt đầu lại!"
        : `Người chơi ${winningResult.winner} đã chiến thắng!<br>Bấm chơi lại để bắt đầu lại!`;
  } else {
    playerTurnElement.textContent = `Lượt người chơi: ${currentPlayer}`;
  }
}

resetButton.addEventListener("click", () => {
  const winningResult = winner();
  if (winningResult) {
    board = Array(3)
      .fill(null)
      .map(() => Array(3).fill(null));
    currentPlayer = "X";
    statusCheck = false;
    renderBoard();
    statusText.textContent = "Bấm bắt đầu để chơi";
  }
});

startButton.addEventListener("click", () => {
  if (!statusCheck) {
    statusCheck = true;
    statusText.textContent = "Hãy chiến đấu hết mình!";
  }
});

renderBoard();
