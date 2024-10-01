const canvas = document.getElementById("ticTacToeCanvas");
const context = canvas.getContext("2d");
const restartButton = document.getElementById("restartBtn");
const cellSize = canvas.width / 3;

let board = Array(9).fill(null);
let currentPlayer = "X";
let gameOver = false;

const winningCombinations = [
    [0, 1, 2], // Primera fila
    [3, 4, 5], // Segunda fila
    [6, 7, 8], // Tercera fila
    [0, 3, 6], // Primera columna
    [1, 4, 7], // Segunda columna
    [2, 5, 8], // Tercera columna
    [0, 4, 8], // Diagonal principal
    [2, 4, 6]  // Diagonal secundaria
];

const playerXMoves = new Set();
const playerOMoves = new Set();

function drawBoard() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 1; i < 3; i++) {
        context.beginPath();
        context.moveTo(cellSize * i, 0);
        context.lineTo(cellSize * i, canvas.height);
        context.moveTo(0, cellSize * i);
        context.lineTo(canvas.width, cellSize * i);
        context.stroke();
    }
}

function drawMark(index) {
    const col = index % 3;
    const row = Math.floor(index / 3);
    const x = col * cellSize + cellSize / 2;
    const y = row * cellSize + cellSize / 2;

    if (board[index] === "X") {
        context.beginPath();
        context.moveTo(x - 40, y - 40);
        context.lineTo(x + 40, y + 40);
        context.moveTo(x + 40, y - 40);
        context.lineTo(x - 40, y + 40);
        context.stroke();
    } else if (board[index] === "O") {
        context.beginPath();
        context.arc(x, y, 40, 0, Math.PI * 2);
        context.stroke();
    }
}

function checkWinner(moves) {
    return winningCombinations.some(combination =>
        combination.every(index => moves.has(index))
    );
}

canvas.addEventListener("click", (event) => {
    if (gameOver) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const col = Math.floor(x / cellSize);
    const row = Math.floor(y / cellSize);
    const index = row * 3 + col;

    if (board[index] === null) {
        board[index] = currentPlayer;
        drawMark(index);

        // Almacenar jugada en el set correspondiente
        const moves = currentPlayer === "X" ? playerXMoves : playerOMoves;
        moves.add(index);

        if (checkWinner(moves)) {
            alert(`${currentPlayer} ha ganado!`);
            gameOver = true;
        } else if (board.every(cell => cell !== null)) {
            alert("Empate!");
            gameOver = true;
        } else {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
        }
    }
});

drawBoard();
