const container = document.getElementById("tic-tac-toe-grid");
let gridSize;
let gameType;
let currentPlayer = "X";
let board = new Array(gridSize);
let gameOver = false;

function changeSquare(square) {
    if (!gameOver) {
        if (square.innerHTML === "") {
            square.innerHTML = currentPlayer;
            addToArray(square, currentPlayer);
            if (isBoardFull()) gameDraw();
            currentPlayer = currentPlayer === "X" ? "O" : "X";
        };
    };
};

function addToArray(square, player) {
    const playerPlace = square.id.split("square-")[1].split("-");
    board[playerPlace[0] - 1][playerPlace[1] - 1] = player;
    if (checkWinner(player)) gameWon(player);
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

function isBoardFull() {
    return board.flat().filter(cell => cell === "").length === 0;
}

function gameWon(player) {
    player = player === "X" ? "Player 1" : "Player 2";
    const winningText = document.querySelector('h4');
    winningText.innerHTML = `${player} has won!`
    gameOver = true;
}

function gameDraw() {
    const winningText = document.querySelector('h4');
    winningText.innerHTML = 'Its a draw!'
    gameOver = true;
}

function drawBoard() {
    removeSettingsDiv();
    const heading = document.createElement("h4");
    heading.innerHTML = "Start the game by pressing on one of the squares.";
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

    createBoardArray();
}

const removeSettingsDiv = () => document.querySelector("#settings").remove();

function createBoardArray() {
    for (let i = 0; i < gridSize; i++) {
        board[i] = new Array(gridSize).fill("");
    }
}

document.querySelectorAll(".btn-outline-primary").forEach(button => {
    button.addEventListener("click", function() {
        this.classList.add("btn-outline-success");

        const parentRow = this.closest(".row");
        parentRow.querySelectorAll(".btn-outline-primary").forEach(btn => {
            btn.disabled = true;
        });

        if (this.id.split("-").includes("grid")) {
            gridSize = this.value;
        } gameType = this.value;
    });
});

document.querySelector("#btn-start").addEventListener("click", function() {
    if (gridSize && gameType) drawBoard();
})

