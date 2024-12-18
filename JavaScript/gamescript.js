let canvas, ctx;
let sprites = [];
const NUM_SPRITES = 5;

function init() {
    canvas = document.getElementById('gameCanvas');
    ctx = canvas.getContext('2d');
    canvas.width = 800;
    canvas.height = 600;

    for (let i = 0; i < NUM_SPRITES; i++) {
        const x = Math.random() * (canvas.width - 50);
        const y = Math.random() * (canvas.height - 50);
        const sprite = new Sprite(x, y, 50, 50, 'images/sprite' + (i % 3 + 1) + '.png');
        sprites.push(sprite);
    }

    start();
}

function start() {
    requestAnimationFrame(gameLoop);
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

function update() {
    sprites.forEach(sprite => sprite.update());
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw background
    ctx.fillStyle = 'lightblue';
    ctx.fillRect(0, 0, canvas.width, canvas.height / 2);
    ctx.fillStyle = 'green';
    ctx.fillRect(0, canvas.height / 2, canvas.width, canvas.height / 2);

    // Draw sprites
    sprites.forEach(sprite => sprite.draw(ctx));
}
