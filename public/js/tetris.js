const canvas = document.getElementById("tetris");
const context = canvas.getContext('2d');

context.scale(20, 20);

const objName = varObj => Object.keys(varObj)[0];
const oShape = [
    [1, 1],
    [1, 1]
]
const iShape = [
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0]
]
const sShape = [
    [0, 0, 0],
    [0, 1, 1],
    [1, 1, 0]
]
const zShape = [
    [0, 0, 0],
    [1, 1, 0],
    [0, 1, 1]
]
const lShape = [
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 1]
]
const jShape = [
    [0, 1, 0],
    [0, 1, 0],
    [1, 1, 0]
]
const tShape = [
    [0, 0, 0],
    [1, 1, 1],
    [0, 1, 0]
]

function defColor(aShape) {
    let color = "#f3f3f3";
    switch (objName({ aShape })) {
        case 'oShape':
            color = '#033E8C'
            break;
        case 'iShape':
            color = '#D97C2B'
            break;
        case 'sShape':
            color = '#E02955'
            break;
        case 'zShape':
            color = '#0FA697'
            break;
        case 'lShape':
            color = '#D4A39E'
            break;
        case 'jShape':
            color = '#D9A036'
            break;
        case 'tShape':
            color = '#188FD9'
            break;
    }
    return color;
}

function drawShape(aShape, offset) {
    let color = defColor(aShape);
    aShape.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                context.fillStyle = color;
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
        player.pos.y = 0;
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

function playerMove(dir) {
    player.pos.x += dir;
    if (shapeCollide(arena, player)) {
        player.pos.x -= dir;
    }
}

let player = {
    currentShape: tShape,
    pos: { x: 6, y: 10 }
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
        case 'r':
        case 'R':
            break;
        default:
            break;
    }
});

update();



