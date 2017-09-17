// checkers.js

/** The state of the game */
var state = {
    over: false,
    turn: 'b',
    board: [
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, "w", "b", null, null, null],
        [null, null, null, "b", "w", null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null]
    ],
    lastMousePosition: {x: -1, y: -1},
    scoreWhite: 2,
    scoreBlack: 2
};
var ctx, scoreBoard;


/** @function checkForVictory
 * Checks to see if a victory has been actived
 * (All peices of one color have been captured)
 * @return {boolean} one of three values:
 * "White wins", "Black wins", or null, if neither
 * has yet won.
 */
function checkForVictory() {
    var victory = true;
    var white = 0, black = 0;
    for (var y = 0; y < 8; y++) {
        for (var x = 0; x < 8; x++) {
            if (state.board[y][x] == "w") {
                white++;
                continue;
            }
            if (state.board[y][x] == "b") {
                black++;
                continue;
            }
            if (getMoves(x, y).length > 0) victory = false;
        }
    }
    state.scoreBlack = black;
    state.scoreWhite = white;
    updateScoreBoard();
    renderBoard();
    setTimeout(function () {
        if (victory) {
            if (white > black)
                alert("White wins " + white + " to " + black + " !!!");
            if (white < black)
                alert("Black wins " + black + " to " + white + " !!!");
            if (white == black)
                alert("It a draw!!!");
            state = {
                over: false,
                turn: 'b',
                board: [
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, "w", "b", null, null, null],
                    [null, null, null, "b", "w", null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null]
                ],
                lastMousePosition: {x: -1, y: -1},
                scoreWhite: 2,
                scoreBlack: 2
            };
            updateScoreBoard();
            renderBoard();
        }
    }, 100);

    return victory;

}

/** @function nextTurn()
 * Starts the next turn by changing the
 * turn property of state.
 */
function nextTurn() {
    if (state.turn === 'b') state.turn = 'w';
    else state.turn = 'b';
}

function getFillStyle() {
    if (state.turn == "w") return "#fff";
    return "#111"
}

function getOpponent() {
    if (state.turn == "w") return "b";
    return "w"
}


/**
 * Funtion to check if placing stone on x y is OK
 * @param x mouse x
 * @param y mouse y
 * @param dir 0 is top then +1 clockwise
 */
function checkDirection(x, y, dir) {
    var op = getOpponent();
    var pl = state.turn;
    var pathLength = 0;
    var foundOpponent = false;

    function checkPath() {
        if (foundOpponent) {
            if (!state.board[ny][nx]) return 0;
            if (state.board[ny][nx] == op) pathLength++;
            if (state.board[ny][nx] == pl) return pathLength;
        } else {
            if (!state.board[ny][nx] || state.board[ny][nx] == pl) return 0;
            if (state.board[ny][nx] == op) {
                foundOpponent = true;
                pathLength++;
            }
        }
    }

    var ret, nx, ny;
    switch (dir) {
        case 0:
            for (ny = y - 1, nx = x; ny > -1; ny--) {
                if ((ret = checkPath()) != undefined) return ret;
            }
            break;
        case 1:
            for (ny = y - 1, nx = x + 1; ny > -1 && nx < 8; ny--, nx++) {
                if ((ret = checkPath()) != undefined) return ret;
            }
            break;
        case 2:
            for (ny = y, nx = x + 1; ny > -1 && nx < 8; nx++) {
                if ((ret = checkPath()) != undefined) return ret;
            }
            break;
        case 3:
            for (ny = y + 1, nx = x + 1; ny < 8 && nx < 8; ny++, nx++) {
                if ((ret = checkPath()) != undefined) return ret;
            }
            break;
        case 4:
            for (ny = y + 1, nx = x; ny < 8 && nx < 8; ny++) {
                if ((ret = checkPath()) != undefined) return ret;
            }
            break;
        case 5:
            for (ny = y + 1, nx = x - 1; ny < 8 && nx > -1; ny++, nx--) {
                if ((ret = checkPath()) != undefined) return ret;
            }
            break;
        case 6:
            for (ny = y, nx = x - 1; ny < 8 && nx > -1; nx--) {
                if ((ret = checkPath()) != undefined) return ret;
            }
            break;
        case 7:
            for (ny = y - 1, nx = x - 1; ny > -1 && nx > -1; ny--, nx--) {
                if ((ret = checkPath()) != undefined) return ret;
            }
            break;
            return 0;
    }

}

function getMoves(x, y) {
    var paths = [];
    for (var i = 0; i < 8; i++) {
        var dirPath = checkDirection(x, y, i);
        if (dirPath > 0) {
            paths.push({dir: i, length: dirPath});
        }
    }
    return paths;
}


function handleHover(event) {
    if (!ctx) return;
    var x = Math.floor(event.clientX / 100);
    var y = Math.floor(event.clientY / 100);
    if (state.lastMousePosition.x == x && state.lastMousePosition.y == y) return;
    if (x < 0 || y < 0 || y > 7 || x > 7) return;
    state.lastMousePosition.x = x;
    state.lastMousePosition.y = y;
    renderBoard();
    if (!state.board[y][x]) {
        var moves = getMoves(x, y);
        if (moves.length == 0) return renderBoard();
        renderBoard();
        moves.forEach(function (move) {
            renderMove(x, y, move.dir, move.length);
        });
    }

}


function handleClick(event) {
    var x = state.lastMousePosition.x;
    var y = state.lastMousePosition.y;
    renderBoard();
    if (!state.board[y][x]) {
        var moves = getMoves(x, y);
        if (moves.length == 0) return renderBoard();
        moves.forEach(function (move) {
            applyMove(x, y, move.dir, move.length);
        });
        nextTurn();
        checkForVictory();
        renderBoard();
    }
}

function renderBoard() {
    for (var y = 0; y < 8; y++) {
        for (var x = 0; x < 8; x++) {
            ctx.fillStyle = "#56dc56";
            ctx.strokeStyle = "black";
            ctx.fillRect(x * 100, y * 100, 100, 100);
            ctx.strokeRect(x * 100, y * 100, 100, 100);

            if (state.board[y][x]) {
                switch (state.board[y][x]) {
                    case "b":
                        ctx.beginPath();
                        ctx.fillStyle = "#111";
                        ctx.arc(x * 100 + 50, y * 100 + 50, 40, 0, Math.PI * 2);
                        ctx.fill();
                        break;
                    case "w":
                        ctx.beginPath();
                        ctx.fillStyle = "#fff";
                        ctx.arc(x * 100 + 50, y * 100 + 50, 40, 0, Math.PI * 2);
                        ctx.fill();
                        break;
                }
            }

        }
    }
}

function drawSquarePath(x, y) {
    ctx.fillStyle = "rgba(255, 0, 0, 0.47)";
    ctx.fillRect(x * 100, y * 100, 100, 100);
}

function renderMove(x, y, dir, length) {
    var path = getPathCords(x, y, dir, length);
    path.forEach(function (square) {
        drawSquarePath(square.x, square.y);
    })
}

function getPathCords(x, y, dir, length) {
    var path = [];
    var lengthLimit = -2, nx, ny;

    switch (dir) {
        case 0:
            for (ny = y, nx = x; lengthLimit < length && (ny > -1); ny--, lengthLimit++) {
                path.push({x: nx, y: ny});
            }
            break;
        case 1:
            for (ny = y, nx = x; lengthLimit < length && (ny > -1 || nx < 8); ny--, nx++, lengthLimit++) {
                path.push({x: nx, y: ny});
            }
            break;
        case 2:
            for (ny = y, nx = x; lengthLimit < length && (ny > -1 || nx < 8); nx++, lengthLimit++) {
                path.push({x: nx, y: ny});
            }
            break;
        case 3:
            for (ny = y, nx = x; lengthLimit < length && (ny < 8 || nx < 8); ny++, nx++, lengthLimit++) {
                path.push({x: nx, y: ny});
            }
            break;
        case 4:
            for (ny = y, nx = x; lengthLimit < length && (ny < 8 || nx < 8); ny++, lengthLimit++) {
                path.push({x: nx, y: ny});
            }
            break;
        case 5:
            for (ny = y, nx = x; lengthLimit < length && (ny < 8 || nx > -1); ny++, nx--, lengthLimit++) {
                path.push({x: nx, y: ny});
            }
            break;
        case 6:
            for (ny = y, nx = x; lengthLimit < length && (ny < 8 || nx > -1); nx--, lengthLimit++) {
                path.push({x: nx, y: ny});
            }
            break;
        case 7:
            for (ny = y, nx = x; lengthLimit < length && (ny > -1 || nx > -1); ny--, nx--, lengthLimit++) {
                path.push({x: nx, y: ny});
            }
            break;
    }
    return path;
}

/** @function ApplyMove
 * A function to apply the selected move to the game
 * @param x
 * @param y
 * @param dir
 * @param length
 */
function applyMove(x, y, dir, length) {
    var path = getPathCords(x, y, dir, length);
    if (path.length == 0) return;
    for (var i = 0; i < path.length; i++) {
        state.board[path[i].y][path[i].x] = state.turn;
    }
    return renderBoard();
}

function updateScoreBoard() {
    scoreBoard.innerHTML = "<br>Turn: " + (state.turn == "w" ? "white" : "black") + "<br>Black score: " + state.scoreBlack + "<br>White score: " + state.scoreWhite;
}

function setup() {
    var canvas = document.createElement("canvas");
    scoreBoard = document.createElement("div");
    canvas.width = 800;
    canvas.height = 800;
    document.body.appendChild(canvas);
    document.body.appendChild(scoreBoard);
    ctx = canvas.getContext("2d");
    canvas.onmousemove = handleHover;
    canvas.onclick = handleClick;
    renderBoard();
    updateScoreBoard();
}
setup();