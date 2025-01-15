const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;
const BULLET_OUT_OF_SCREEN_Y = -10;
let score = 0;

let canvas, ctx;
let player;
let enemies = [];
let lives = 3;
const keys = {};
let gameOver = false;

function init() {
    canvas = document.getElementById('gameCanvas');
    ctx = canvas.getContext('2d');
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;
    player = new Player(100, 100, PLAYER_SIZE, PLAYER_SIZE, 'images/sprite1.png');
    spawnEnemies();

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    canvas.addEventListener('contextmenu', handleRightClick);

    gameLoop();
}

function handleKeyDown(e) {
    keys[e.key] = true;
    if (e.key === ' ') {
        player.shoot();
        console.log('Pew pew!');
    }
}

function handleKeyUp(e) {
    keys[e.key] = false;
}

function handleRightClick(e) {
    e.preventDefault();
    player.shoot();
    console.log('Pew pew!');
}

function gameLoop() {
    if (!gameOver) {
        update();
    }
    draw();
    requestAnimationFrame(gameLoop);
}

function update() {
    handlePlayerMovement();
    player.updateBullets();
    updateEnemies();
}

function handlePlayerMovement() {
    if (keys['w']) player.move(0, -player.speed);
    if (keys['a']) player.move(-player.speed, 0);
    if (keys['s']) player.move(0, player.speed);
    if (keys['d']) player.move(player.speed, 0);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    player.draw(ctx);
    enemies.forEach(enemy => enemy.draw(ctx));
    drawLives();
    if (gameOver) {
        drawGameOverScreen();
    }
}

function drawLives() {
    ctx.fillStyle = 'red';
    ctx.font = '24px Arial';
    ctx.fillText(`Lives: ${lives}`, 10, 30);
}

function drawGameOverScreen() {
    ctx.fillStyle = 'black';
    ctx.globalAlpha = 0.7;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.globalAlpha = 1.0;
    ctx.fillStyle = 'white';
    ctx.font = '48px Arial';
    ctx.fillText('Game Over', canvas.width / 2 - 125, canvas.height / 2);
    drawRespawnButton();
}

function drawRespawnButton() {
    ctx.fillStyle = 'white';
    ctx.fillRect(canvas.width / 2 - 75, canvas.height / 2 + 50, 150, 50);
    ctx.fillStyle = 'black';
    ctx.font = '24px Arial';
    ctx.fillText('Respawn', canvas.width / 2 - 50, canvas.height / 2 + 83);
    canvas.addEventListener('click', handleRespawnClick);
}

function handleRespawnClick() {
    location.reload();
}

init();