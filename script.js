const canvas = document.getElementById("ticTacToeCanvas");
const context = canvas.getContext("2d");
const cellSize = canvas.width / 3;

let board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
];
let currentPlayer = "X";
let gameOver = false;

function drawBoard() {
    for (let i = 1; i < 3; i++) {
        context.beginPath();
        context.moveTo(cellSize * i, 0);
        context.lineTo(cellSize * i, canvas.height);
        context.moveTo(0, cellSize * i);
        context.lineTo(canvas.width, cellSize * i);
        context.stroke();
    }
}

function drawMark(row, col) {
    const x = col * cellSize + cellSize / 2;
    const y = row * cellSize + cellSize / 2;

    if (board[row][col] === "X") {
        context.beginPath();
        context.moveTo(x - 40, y - 40);
        context.lineTo(x + 40, y + 40);
        context.moveTo(x + 40, y - 40);
        context.lineTo(x - 40, y + 40);
        context.stroke();
    } else if (board[row][col] === "O") {
        context.beginPath();
        context.arc(x, y, 40, 0, Math.PI * 2);
        context.stroke();
    }
}

function checkWinner() {
    for (let i = 0; i < 3; i++) {
        if (board[i][0] === currentPlayer && board[i][1] === currentPlayer && board[i][2] === currentPlayer) return true;
        if (board[0][i] === currentPlayer && board[1][i] === currentPlayer && board[2][i] === currentPlayer) return true;
    }
    if (board[0][0] === currentPlayer && board[1][1] === currentPlayer && board[2][2] === currentPlayer) return true;
    if (board[0][2] === currentPlayer && board[1][1] === currentPlayer && board[2][0] === currentPlayer) return true;
    return false;
}

function checkTie() {
    for (let row of board) {
        if (row.includes("")) return false;
    }
    return true;
}

canvas.addEventListener("click", (event) => {
    if (gameOver) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const col = Math.floor(x / cellSize);
    const row = Math.floor(y / cellSize);

    console.log('Test | Event', {
        col,
        row,
        board: board[row][col]
    })

    if (board[row][col] === "") {
        board[row][col] = currentPlayer;
        drawMark(row, col);

        if (checkWinner()) {
            alert(`¡${currentPlayer} ha ganado!`);
            gameOver = true;
        } else if (checkTie()) {
            alert("¡Empate!");
            gameOver = true;
        } else {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
        }
    }
});

drawBoard();