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
    lastMousePosition: {x: -1, y: -1}
};
var ctx;


/** @function ApplyMove
 * A function to apply the selected move to the game
 * @param {object} move - the move to apply.
 */
function applyMove(x, y, move) {

}

/** @function checkForVictory
 * Checks to see if a victory has been actived
 * (All peices of one color have been captured)
 * @return {String} one of three values:
 * "White wins", "Black wins", or null, if neither
 * has yet won.
 */
function checkForVictory() {

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
    if (state.turn == "w") return "#dac457";
    return "#111"
}

function getOpponent() {
    if (state.turn == "w") return "b";
    return "w"
}

/**
 *
 * @param x mouse x
 * @param y mouse y
 * @param dir 0 is top then +1 clockwise
 */
function checkDirection(x, y, dir) {
    var path = null;
    switch (dir){
        case 0:
            for(var ny = x;ny > -1;ny--){

            }
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:

    }

}

function getMove(x, y) {

    return null;
}


function handleHover(event) {
    if (!ctx) return;
    var x = Math.floor(event.clientX / 100);
    var y = Math.floor(event.clientY / 100);
    if (state.lastMousePosition.x == x && state.lastMousePosition.y == y) return;
    state.lastMousePosition.x = x;
    state.lastMousePosition.y = y;
    renderBoard();
    if (!state.board[y][x]) {
        var move = getMove(x, y);
        if (!move) return;

        ctx.strokeStyle = "yellow";
        ctx.beginPath();
        ctx.arc(x * 100 + 50, y * 100 + 50, 40, 0, Math.PI * 2);
        ctx.fill();
    }

}


function handleClick(event) {
    console.log(event);
}

function renderBoard() {
    for (var y = 0; y < 8; y++) {
        for (var x = 0; x < 8; x++) {
            if ((x + y) % 2 == 1) {
                ctx.fillStyle = "#444";
                ctx.fillRect(x * 100, y * 100, 100, 100);
            }
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
                        ctx.fillStyle = "#dac457";
                        ctx.arc(x * 100 + 50, y * 100 + 50, 40, 0, Math.PI * 2);
                        ctx.fill();
                        break;
                }
            }

        }
    }
}

function renderMove(x, y) {
    for (var y = 0; y < 8; y++) {
        for (var x = 0; x < 8; x++) {
            if ((x + y) % 2 == 1) {
                ctx.fillStyle = "#444";
                ctx.fillRect(x * 100, y * 100, 100, 100);
            }
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
                        ctx.fillStyle = "#dac457";
                        ctx.arc(x * 100 + 50, y * 100 + 50, 40, 0, Math.PI * 2);
                        ctx.fill();
                        break;
                }
            }

        }
    }
}

function setup() {
    var canvas = document.createElement("canvas");
    canvas.width = 800;
    canvas.height = 800;
    document.body.appendChild(canvas);
    ctx = canvas.getContext("2d");
    canvas.onmousemove = handleHover;
    canvas.onclick = handleClick;
    renderBoard();
}
setup();