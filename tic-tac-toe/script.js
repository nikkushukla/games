document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const cells = document.querySelectorAll('.cell');
    const resultScreen = document.getElementById('result-screen');
    const resultText = document.getElementById('result-text');
    const newGameButton = document.getElementById('new-game-button');

    let currentPlayer = 'X';
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;

    cells.forEach(cell => {
        cell.addEventListener('click', () => {
            const index = cell.dataset.index;

            if (gameBoard[index] === '' && gameActive) {
                gameBoard[index] = currentPlayer;
                cell.textContent = currentPlayer;
                cell.classList.add(currentPlayer);

                if (checkWinner()) {
                    displayResult(`${currentPlayer} wins!`);
                    gameActive = false;
                } else if (gameBoard.every(cell => cell !== '')) {
                    displayResult('It\'s a draw!');
                    gameActive = false;
                } else {
                    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                }
            }
        });
    });

    newGameButton.addEventListener('click', () => {
        resetGame();
    });

    function checkWinner() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];

        return winPatterns.some(pattern => {
            const [a, b, c] = pattern;
            return gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[b] === gameBoard[c];
        });
    }

    function displayResult(result) {
        resultText.textContent = result;
        resultScreen.style.display = 'block';
    }

    function resetGame() {
        gameBoard = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
        currentPlayer = 'X';

        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('X', 'O');
        });

        resultScreen.style.display = 'none';
    }
});