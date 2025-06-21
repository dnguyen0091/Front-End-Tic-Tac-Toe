// Initialize game state
let gameState = Array(9).fill(null);
let turn = 0; // Moved to global scope
let scoreX = 0;
let scoreO = 0;

function initGame() {
    // Reset the game state array
    gameState = [null, null, null, null, null, null, null, null, null];
    
    // Reset each cell on the game board
    let cells = document.querySelectorAll('button.grid-item');
    for (let i = 0; i < cells.length; i++) {
        cells[i].innerHTML = '';
    }
    
    // Reset the turn counter
    turn = 0;
    
    // Update the turn text to indicate it's player X's turn
    changeTurnTxt();
}

document.addEventListener('DOMContentLoaded', function() {
    initGame(); // Initialize the game state when the DOM content is loaded
    let cells = document.querySelectorAll('button.grid-item');
    for (let i = 0; i < cells.length; i++) {
        cells[i].addEventListener('click', function() {
            if(this.innerHTML === '' && gameState[i] === null) {
                let playerSymbol = turn % 2 === 0 ? 'X' : 'O';
                this.innerHTML = playerSymbol;
                gameState[i] = playerSymbol; // Update the game state array
                turn++;
                changeTurnTxt();
                checkWinConditions();
            }
        });
    }
});

function changeTurnTxt() {
    let turnTxt = document.getElementById('turn');
    let playerSymbol = turn % 2 === 0 ? 'X' : 'O';
    turnTxt.innerHTML = `It's ${playerSymbol}'s turn`;
}

function checkWinConditions() {
    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]            // Diagonals
    ];

    for (let condition of winConditions) {
        const [a, b, c] = condition;
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            alert(`${gameState[a]} wins!`);
            if (gameState[a] === 'X') {
                scoreX++;
            } else if (gameState[a] === 'O') {
                scoreO++;
            }
            editScore();
            initGame();
            return;
        }
    }

    if (!gameState.includes(null)) {
        alert("It's a draw!");
        initGame();
    }
}

function editScore() {
    let player1 = document.getElementsByClassName('playerx')[0]; // Access the first element
    let player2 = document.getElementsByClassName('playero')[0]; // Corrected class name to 'playero'

    player1.innerHTML = 'Player X: ' + scoreX;
    player2.innerHTML = 'Player O: ' + scoreO;
}
