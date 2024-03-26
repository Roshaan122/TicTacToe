function minimax(board, depth, isMaximizingPlayer) {
    // Base case: Check if the game is over or depth limit reached
    const result = checkWinner(board);
    if (result !== null || depth === 0) {
        return result === 'X' ? 1 : result === 'O' ? -1 : 0;
    }

    if (isMaximizingPlayer) {
        let bestScore = -Infinity;
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                if (board[i][j] === '') {
                    board[i][j] = 'X';
                    const score = minimax(board, depth - 1, false);
                    board[i][j] = '';
                    bestScore = Math.max(score, bestScore);
                }
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                if (board[i][j] === '') {
                    board[i][j] = 'O';
                    const score = minimax(board, depth - 1, true);
                    board[i][j] = '';
                    bestScore = Math.min(score, bestScore);
                }
            }
        }
        return bestScore;
    }
}
function checkWinner(board) {
    // Check rows
    for (let i = 0; i < board.length; i++) {
        if (board[i][0] === board[i][1] && board[i][1] === board[i][2] && board[i][0] !== '') {
            return board[i][0];
        }
    }

    // Check columns
    for (let i = 0; i < board[0].length; i++) {
        if (board[0][i] === board[1][i] && board[1][i] === board[2][i] && board[0][i] !== '') {
            return board[0][i];
        }
    }

    // Check diagonals
    if (board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[0][0] !== '') {
        return board[0][0];
    }
    if (board[0][2] === board[1][1] && board[1][1] === board[2][0] && board[0][2] !== '') {
        return board[0][2];
    }

    // Check for a draw
    let isDraw = true;
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j] === '') {
                isDraw = false;
                break;
            }
        }
        if (!isDraw) {
            break;
        }
    }
    if (isDraw) {
        return 'draw';
    }

    return null;
}

function findBestMove(board, depth) {
    let bestMove = { row: -1, col: -1 };
    let bestScore = Infinity;
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j] === '') {
                board[i][j] = 'O'; // Try opponent's move
                const score = minimax(board, depth - 1, true);
                board[i][j] = '';
                if (score < bestScore) {
                    bestScore = score;
                    bestMove = { row: i, col: j };
                }
            }
        }
    }
    return bestMove;
}

// Example usage:
const board = [
    ['X', 'O', ''],
    ['', 'X', 'O'],
    ['', '', 'X']
];
const bestMove = findBestMove(board, 5);
console.log(bestMove); // Output: { row: 2, col: 0 }