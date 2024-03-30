const board = document.getElementById('board');
const status1 = document.getElementById('status');
const cells = document.querySelectorAll('.cell');
const player1Input = document.getElementById('player1');
const player2Input = document.getElementById('player2');
const currentDate = document.getElementById('date');

let currentPlayer = 'X';
let gameStatus = ['-', '-', '-', '-', '-', '-', '-', '-', '-'];
let moves = 0;
let gameOver = false;
let player1Name = 'Player 1';
let player2Name = 'Player 2';

function setPlayerNames() {
    if (player1Input.value !== '') {
        player1Name = player1Input.value;
    } else {
        player1Name = 'Player 1';
    }

    if (player2Input.value !== '') {
        player2Name = player2Input.value;
    } else {
        player2Name = 'Player 2';
    }

    if (currentPlayer === 'X') {
        status1.textContent = player1Name + "'s turn";
    } else {
        status1.textContent = player2Name + "'s turn";
    } 
}

function updateDate() {
    var date1 = new Date();
    var date = new Date(date1).toLocaleDateString();
    currentDate.textContent = "Current Date: " + date;
}

function handleMove(cellIndex) {
    if (!gameOver && gameStatus[cellIndex] === '-') {
        gameStatus[cellIndex] = currentPlayer;
        cells[cellIndex].textContent = currentPlayer;
        moves++;
        checkWinner();
        if (!gameOver) {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            setPlayerNames();
        }
    }
}

function checkWinner() {
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (let combo of winningCombos) {
        const [a, b, c] = combo;
        if (gameStatus[a] !== '-' && gameStatus[a] === gameStatus[b] && gameStatus[a] === gameStatus[c]) {
            gameOver = true;
            status1.textContent = currentPlayer === 'X' ? player1Name + ' wins!' : player2Name + ' wins!';
            return;
        }
    }

    if (moves === 9) {
        gameOver = true;
        status1.textContent = "It's a draw!";
    }
}

function resetGame() {
    gameStatus = ['-', '-', '-', '-', '-', '-', '-', '-', '-'];
    currentPlayer = 'X';
    moves = 0;
    gameOver = false;
    player1Input.value = '';
    player2Input.value = '';
    setPlayerNames();
    cells.forEach(cell => cell.textContent = '');
}

setPlayerNames();
updateDate();
