const canvas = document.getElementById("tetris");
const context = canvas.getContext('2d');

context.scale(20, 20);

const allShapes = 'OISZLJT';
const colors = [
    null,
    '#033E8C',
    '#D97C2B',
    '#E02955',
    '#0FA697',
    '#D4A39E',
    '#D9A036',
    '#188FD9'
]

function createShape(type) {
    switch (type) {
        case 'O':
            return [
                [1, 1],
                [1, 1]
            ];
        case 'I':
            return [
                [0, 2, 0, 0],
                [0, 2, 0, 0],
                [0, 2, 0, 0],
                [0, 2, 0, 0]
            ];
        case 'S':
            return [
                [0, 0, 0],
                [0, 3, 3],
                [3, 3, 0]
            ];
        case 'Z':
            return [
                [0, 0, 0],
                [4, 4, 0],
                [0, 4, 4]
            ];
        case 'L':
            return [
                [0, 5, 0],
                [0, 5, 0],
                [0, 5, 5]
            ];
        case 'J':
            return [
                [0, 6, 0],
                [0, 6, 0],
                [6, 6, 0]
            ];
        case 'T':
            return [
                [0, 0, 0],
                [7, 7, 7],
                [0, 7, 0]
            ];
        default:
            alert("Object Doesn't Exist!");
            break;
    }
}

function drawShape(aShape, offset) {
    aShape.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                context.fillStyle = colors[value];
                context.fillRect(
                    x + offset.x,
                    y + offset.y,
                    1, 1
                );
            }
        });
    });
}

function draw() {
    context.fillStyle = "#222";
    context.fillRect(0, 0, canvas.width, canvas.height);
    drawShape(arena, { x: 0, y: 0 });
    drawShape(player.currentShape, player.pos);
}

function shapeDrop() {
    player.pos.y++;
    if (shapeCollide(arena, player)) {
        player.pos.y--;
        addShape(arena, player);
        playerReset();
        arenaSweep();
        updateScore();
    }
    dropCounter = 0;
}

let dropCounter = 0;
let dropInterval = 1000;
let lastTime = 0;

function update(time = 0) {
    const deltaTime = time - lastTime;
    lastTime = time;

    dropCounter += deltaTime;
    if (dropCounter > dropInterval) {
        shapeDrop();
    }
    draw();
    requestAnimationFrame(update);
}

function createArena(w, h) {
    const anArena = [];
    while (h--) {
        anArena.push(new Array(w).fill(0));
    }
    return anArena;
}

function addShape(arena, player) {
    player.currentShape.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                arena[y + player.pos.y][x + player.pos.x] = value;
            }
        });
    });
}

function arenaSweep() {
    let rowCount = 1;
    outer: for (let y = arena.length - 1; y >= 0; y--) {
        for (let x = 0; x < arena[y].length; x++) {
            if (arena[y][x] === 0) {
                continue outer;
            }
        }
        const row = arena.splice(y, 1)[0].fill(0);
        arena.unshift(row);
        y++;

        player.score += rowCount * 10;
        rowCount *= 2;
    }
}

function updateScore() {
    document.getElementById('score').innerText = player.score;
}

function shapeCollide(arena, player) {
    const [sh, off] = [player.currentShape, player.pos];
    for (let y = 0; y < sh.length; ++y) {
        for (let x = 0; x < sh[y].length; ++x) {
            if (
                sh[y][x] !== 0 &&
                (
                    arena[y + off.y] &&
                    arena[y + off.y][x + off.x]
                ) !== 0
            ) {
                return true;
            }
        }
    }
    return false;
}

function playerReset() {
    const shapeIndex = allShapes.length * Math.random() | 0;
    player.currentShape = createShape(allShapes[shapeIndex]);
    player.pos.y = 0;
    player.pos.x =
        (arena[0].length / 2 | 0) -
        (player.currentShape[0].length / 2 | 0);
}

function playerRotate(dir) {
    const pos = player.pos.x;
    let offset = -1;
    rotate(player.currentShape, dir);
    while (shapeCollide(arena, player)) {
        player.pos.x += offset;
        offset = -(offset + (offset > 0 ? 1 : -1));
        if (offset > (player.currentShape[0].length - 2)) {
            rotate(player.currentShape, -dir);
            player.pos.x = pos;
            return;
        }
    }
}

function rotate(shape, dir) {
    for (let y = 0; y < shape.length; y++) {
        for (let x = 0; x < y; x++) {
            [
                shape[x][y],
                shape[y][x],
            ] = [
                    shape[y][x],
                    shape[x][y],
                ];
        }
    }
    if (dir > 0) {
        shape.forEach(row => row.reverse());
    } else {
        shape.reverse();
    }
}

function playerMove(dir) {
    player.pos.x += dir;
    if (shapeCollide(arena, player)) {
        player.pos.x -= dir;
    }
}

let player = {
    currentShape: null,
    pos: { x: 0, y: 0 },
    score: 0,
}

const arena = createArena(15, 25);

document.addEventListener('keydown', e => {
    switch (e.key) {
        case 'a':
        case 'A':
        case 'ArrowLeft':
            playerMove(-1);
            break;
        case 'd':
        case 'D':
        case 'ArrowRight':
            playerMove(1);
            break;
        case 's':
        case 'S':
        case 'ArrowDown':
            shapeDrop();
            break;
        case 'ArrowUp':
            break;
        case 'e':
        case 'E':
            playerRotate(1);
            break;
        case 'q':
        case 'Q':
            playerRotate(-1);
        default:
            break;
    }
});

playerReset();
updateScore();
update();



