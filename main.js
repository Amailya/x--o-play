
const boardEl = document.getElementById("board");
const statusEl = document.getElementById("status");
const restartBtn = document.getElementById("restart");
const stopButton = document.getElementById("stopButton");

const player_O = "O";
const player_x = "X";


let board;
let currentPlayer;
let isGameActive;

const winCombos = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];


function startGame() {
  board = Array(9).fill('');
  currentPlayer = 'X';
  isGameActive = true;

  boardEl.innerHTML = '';

  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.dataset.index = i;
    cell.addEventListener('click', handleCellClick);
    boardEl.appendChild(cell);
  }

  statusEl.textContent = `${currentPlayer} - ի քայլն է`;
}

function handleCellClick(event) {
  const index = event.target.dataset.index;
  if (!isGameActive || board[index] !== '') return;

  makeMove(index);
  switchPlayer();
  setTimeout(aiMove, 1000);
}

function switchPlayer() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  statusEl.textContent = `${currentPlayer} - ի քայլն է`;
}

function checkWin(currentBoard, player) {
  for (const combo of winCombos) {
    const [a, b, c] = combo;
    if (currentBoard[a] === player && currentBoard[b] === player && currentBoard[c] === player) {
      return combo;
    }
  }
  return null;
}

function endGame(winCombo, isDraw) {
  isGameActive = false;
  if (isDraw) {
    statusEl.textContent = "Ոչ ոքի 🙃";
  } else {
    statusEl.textContent = `Հաղթեց ${currentPlayer}! 🎉`;
    winCombo.forEach(i => boardEl.children[i].classList.add('win'));
  }
}

function makeMove(index) {
  board[index] = currentPlayer;
  boardEl.children[index].textContent = currentPlayer;
  boardEl.children[index].classList.add(currentPlayer.toLowerCase());

  const winningCombo = checkWin(board, currentPlayer);
  if (winningCombo) return endGame(winningCombo, false);
  if (!board.includes('')) return endGame([], true);
}

function aiMove() {
  if (!isGameActive) return;
  const bestMoveIndex = findBestMove();
  if (bestMoveIndex !== -1) {
    makeMove(bestMoveIndex);
    if (isGameActive) switchPlayer();
  }
}

function findBestMove() {
  for (let i = 0; i < 9; i++) {
    if (board[i] === '') {
      const boardCopy = [...board];
      boardCopy[i] = player_O;
      if (checkWin(boardCopy, player_O)) return i;
    }
  }
  for (let i = 0; i < 9; i++) {
    if (board[i] === '') {
      const boardCopy = [...board];
      boardCopy[i] = player_x;
      if (checkWin(boardCopy, player_x)) return i;
    }
  }
  const strategicMoves = [4, 0, 2, 6, 8, 1, 3, 5, 7];
  for (const move of strategicMoves) if (board[move] === '') return move;
  return -1;
}

stopButton.addEventListener('click', () => {
   isGameActive = false;
});
restartBtn.addEventListener('click', startGame);
startGame(); 