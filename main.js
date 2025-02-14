const container = document.getElementById("tic-tac-toe-grid");
let gridSize;
let gameType;
let currentPlayer = "X";
let gameOver = false;

function changeSquare(square, board) {
    if (!gameOver) {
        if (square.innerHTML === "") {
            square.innerHTML = currentPlayer;
            addToArray(square, currentPlayer, board);
            if (isBoardFull(board)) gameDraw();
            currentPlayer = currentPlayer === "X" ? "O" : "X";
        }
    }
}


function addToArray(square, player, board) {
    const playerPlace = square.id.split("square-")[1].split("-");
    board[playerPlace[0] - 1][playerPlace[1] - 1] = player;
    const { winner, winningSquares } = checkWinner(player, board)
    if (winner) gameWon(player, winningSquares);
    return board
}

function checkWinner(player, board) {
    let winningSquares = [];

    for (let row = 0; row < gridSize; row++) {
        if (board[row].every(cell => cell === player)) {
            winningSquares = [];
            for (let col = 0; col < gridSize; col++) {
                winningSquares.push(`square-${row + 1}-${col + 1}`);
            }
            return { winner: true, winningSquares };
        }
    }

    for (let col = 0; col < gridSize; col++) {
        let colWin = true;
        winningSquares = [];
        for (let row = 0; row < gridSize; row++) {
            if (board[row][col] !== player) {
                colWin = false;
                break;
            }
            winningSquares.push(`square-${row + 1}-${col + 1}`);
        }
        if (colWin) return { winner: true, winningSquares };
    }

    let mainDiagonalWin = true;
    winningSquares = [];
    for (let i = 0; i < gridSize; i++) {
        if (board[i][i] !== player) {
            mainDiagonalWin = false;
            break;
        }
        winningSquares.push(`square-${i + 1}-${i + 1}`);
    }
    if (mainDiagonalWin) return { winner: true, winningSquares };

    let antiDiagonalWin = true;
    winningSquares = [];
    for (let i = 0; i < gridSize; i++) {
        if (board[i][gridSize - i - 1] !== player) {
            antiDiagonalWin = false;
            break;
        }
        winningSquares.push(`square-${i + 1}-${gridSize - i}`);
    }
    if (antiDiagonalWin) return { winner: true, winningSquares };

    return { winner: false, winningSquares: [] };
}


function isBoardFull(board) {
    return board.flat().filter(cell => cell === "").length === 0;
}

function gameWon(player, winningSquares) {
    player = player === "X" ? "Player 1" : "Player 2";
    const winningText = document.querySelector('h4');
    winningText.innerHTML = `${player} has won!`
    gameOver = true;
    drawWinningSquares(winningSquares);
}

function drawWinningSquares(winningSquares) {
    const squares = winningSquares.map(id => `#${id}`).join(", ");
    const squareElements = document.querySelectorAll(squares);

    for (let i = 0; i < squareElements.length; i++) {
        squareElements[i].classList.add("winning-square");    
    }
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
    container.appendChild(heading);

    let board = createBoardArray();
    for (let row = 1; row <= gridSize; row++) {
        const rowDiv = document.createElement("div");
        rowDiv.className = "row d-flex w-100";
    
        for (let col = 1; col <= gridSize; col++) {
            const square = document.createElement("div");
            square.id = `square-${row}-${col}`;
            square.className = "col border align-center";
            square.onclick = function () {
                changeSquare(square, board);
            };
            rowDiv.appendChild(square);
        }
        container.appendChild(rowDiv);
    }
}

const removeSettingsDiv = () => document.querySelector("#settings").remove();

function createBoardArray() {
    if (!gridSize) {
        console.error("Grid size not defined!");
        return [];
    }
    let board = new Array(gridSize);
    for (let i = 0; i < gridSize; i++) {
        board[i] = new Array(gridSize).fill("");
    }
    return board;

}

document.querySelectorAll(".btn-outline-primary").forEach(button => {
    button.addEventListener("click", function() {
        this.classList.add("btn-outline-success");

        const parentRow = this.closest(".row");
        parentRow.querySelectorAll(".btn-outline-primary").forEach(btn => {
            btn.disabled = true;
        });

        if (this.id.split("-").includes("grid")) {
            gridSize = parseInt(this.value, 10);
        }
        gameType = this.value;
    });
});


document.querySelector("#btn-start").addEventListener("click", function () {
    if (gridSize && gameType) {
        drawBoard();
    } else {
        console.error("Grid size or game type not set!");
    }
});