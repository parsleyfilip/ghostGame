let canvas, ctx;
let player;
const keys = {};

function init() {
    canvas = document.getElementById('gameCanvas');
    ctx = canvas.getContext('2d');
    canvas.width = 800;
    canvas.height = 600;

    player = new Sprite(100, 100, 50, 50, 'images/sprite1.png');

    window.addEventListener('keydown', (e) => {
        keys[e.key] = true;
    });

    window.addEventListener('keyup', (e) => {
        keys[e.key] = false;
    });

    gameLoop();
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

function update() {
    if (keys['w']) player.move(0, -player.speed);
    if (keys['a']) player.move(-player.speed, 0);
    if (keys['s']) player.move(0, player.speed);
    if (keys['d']) player.move(player.speed, 0);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    player.draw(ctx);
}
