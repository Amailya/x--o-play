// --- DOM ՏԱՐՐԵՐ ---
const restartBtn = document.getElementById("restart");
const boardEl = document.getElementById("board");
const statusEl = document.getElementById("status");

// --- Խաղի վիճակի փոփոխականներ ---
let board;
let currentPlayer;
let isGameActive;

// --- Հաղթող կոմբինացիաներ ---
const winCombos = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

// --- Ֆունկցիաներ ---
function startGame() {
  board = Array(9).fill('');
  currentPlayer = 'X';
  isGameActive = true;

  boardEl.innerHTML = '';
  statusEl.textContent = `${currentPlayer} -ի քայլն է`;

  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.dataset.index = i;
    cell.addEventListener('click', handleCellClick);
    boardEl.appendChild(cell);
  }
}

function handleCellClick(event) {
  const index = event.target.dataset.index;

  if (!isGameActive || board[index] !== '') {
    return;
  }

  board[index] = currentPlayer;
  event.target.textContent = currentPlayer;
  event.target.classList.add(currentPlayer.toLowerCase());

  const winningCombo = checkwin(board, currentPlayer);
  if (winningCombo) {
    endGame(winningCombo, false);
    return;
  }

  if (!board.includes('')) {
    endGame(null, true);
    return;
  }

  switchPlayer();
}

function switchPlayer() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  statusEl.textContent = `${currentPlayer} -ի քայլն է`;
}

function checkwin(currentBoard, player) {
  for (const combo of winCombos) {
    const [a, b, c] = combo;
    if (currentBoard[a] === player && currentBoard[b] === player && currentBoard[c] === player) {
      return combo;
    }
  }
  return null;
}

function endGame(winningCombo, isDraw) {
  isGameActive = false;
  if (isDraw) {
    statusEl.textContent = "Ոչ-ոքի";
  } else {
    statusEl.textContent = `Հաղթեց ${currentPlayer}`;
    winningCombo.forEach(index => {
      boardEl.children[index].classList.add('win');
    });
  }
}

restartBtn.addEventListener('click', startGame);
startGame();