const gridSize = 3; // 3x3 grid
const container = document.getElementById("tic-tac-toe-grid");
let currentPlayer = "X";
let board = new Array(gridSize);

function changeSquare(square) {
    if (square.innerHTML === "") {
        square.innerHTML = currentPlayer;
        addToArray(square, currentPlayer);
        currentPlayer = currentPlayer === "X" ? "O" : "X";
    }
}

function addToArray(square, player) {
    const playerPlace = square.id.split("square-")[1].split("-");
    board[playerPlace[0] - 1][playerPlace[1] - 1] = player;
    if (checkWinner(player) === True) gameWon(player);
}

function checkWinner(player) {
    for (let row = 0; row < gridSize; row++) {
        if (board[row].every(cell => cell === player)) {
            return true;
        }
    }

    for (let col = 0; col < gridSize; col++) {
        let colWin = true;
        for (let row = 0; row < gridSize; row++) {
            if (board[row][col] !== player) {
                colWin = false;
                break;
            }
        }
        if (colWin) return true;
    }

    let mainDiagonalWin = true;
    for (let i = 0; i < gridSize; i++) {
        if (board[i][i] !== player) {
            mainDiagonalWin = false;
            break;
        }
    }
    if (mainDiagonalWin) return true;

    let antiDiagonalWin = true;
    for (let i = 0; i < gridSize; i++) {
        if (board[i][gridSize - i - 1] !== player) {
            antiDiagonalWin = false;
            break;
        }
    }
    if (antiDiagonalWin) return true;

    return false;
}

for (let row = 1; row <= gridSize; row++) {
    const rowDiv = document.createElement("div");
    rowDiv.className = "row d-flex w-100";

    for (let col = 1; col <= gridSize; col++) {
        const square = document.createElement("div");
        square.id = `square-${row}-${col}`;
        square.className = "col border align-center";
        square.onclick = function () {
            changeSquare(square);
        };
        rowDiv.appendChild(square);
    }

    container.appendChild(rowDiv);
}

for (let i = 0; i < gridSize; i++) {
    board[i] = new Array(gridSize).fill("");
}
