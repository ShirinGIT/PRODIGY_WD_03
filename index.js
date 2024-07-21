const gameBoard = document.getElementById('game-board');
const resetButton = document.getElementById('reset-button');
let currentPlayer = 'X';
let gameBoardState = Array(9).fill(null);
let gameOver = false;

function renderGameBoard() {
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.className = 'game-cell';
        cell.textContent = gameBoardState[i] || '';
        cell.addEventListener('click', handleCellClick.bind(null, i));
        gameBoard.appendChild(cell);
    }
}

function handleCellClick(index) {
    if (gameOver || gameBoardState[index]) return;
    gameBoardState[index] = currentPlayer;
    const cell = gameBoard.children[index];
    cell.textContent = currentPlayer;
    checkForWin();
    currentPlayer = currentPlayer === 'X'? 'O' : 'X';
}

function checkForWin() {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let i = 0; i < winningCombinations.length; i++) {
        const combination = winningCombinations[i];
        if (gameBoardState[combination[0]] === gameBoardState[combination[1]] && gameBoardState[combination[1]] === gameBoardState[combination[2]] && gameBoardState[combination[0]]!== null) {
            const gameStatusElement = document.getElementById("game-status");
            gameStatusElement.textContent = `Player ${gameBoardState[combination[0]]} wins!`;
            gameOver = true;
            return;
        }
    }

    if (!gameBoardState.includes(null)) {
        const gameStatusElement = document.getElementById("game-status");
        gameStatusElement.textContent = 'It\'s a draw!';
        gameOver = true;
    }
    
}

resetButton.addEventListener('click', resetGame);

function resetGame() {
    gameBoardState = Array(9).fill(null);
    currentPlayer = 'X';
    gameOver = false;
    gameBoard.innerHTML = ''; // Clear the game board
    renderGameBoard(); // Re-render the game board
    const gameStatusElement = document.getElementById("game-status");
    gameStatusElement.textContent = '';
}

renderGameBoard();