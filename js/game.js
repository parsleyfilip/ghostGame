let canvas, ctx;
let player;
let enemies = [];
let lives = 3;
const keys = {};
let gameOver = false;

function init() {
    canvas = document.getElementById('gameCanvas');
    ctx = canvas.getContext('2d');
    canvas.width = 800;
    canvas.height = 600;

    player = new Sprite(100, 100, 50, 50, 'images/sprite1.png');
    // Create enemies
    let enemySpawnInterval = setInterval(() => {
        if (!gameOver) {
            let enemy = new Sprite(
                Math.random() * canvas.width,
                Math.random() * canvas.height,
                30,
                30,
                'images/sprite2.png'
            );
            enemies.push(enemy);
        }
    }, 2000);

    window.addEventListener('keydown', (e) => {
        keys[e.key] = true;
    });

    window.addEventListener('keyup', (e) => {
        keys[e.key] = false;
    });

    gameLoop();
}

function gameLoop() {
    if (!gameOver) {
        update();
    }
    draw();
    requestAnimationFrame(gameLoop);
}

function update() {
    if (keys['w']) player.move(0, -player.speed);
    if (keys['a']) player.move(-player.speed, 0);
    if (keys['s']) player.move(0, player.speed);
    if (keys['d']) player.move(player.speed, 0);

    // Update enemy positions
    for (let enemy of enemies) {
        // Calculate the direction towards the player
        let dx = player.x - enemy.x;
        let dy = player.y - enemy.y;
        let angle = Math.atan2(dy, dx);

        // Calculate the movement speed based on the distance to the player
        let distance = Math.sqrt(dx * dx + dy * dy);
        let speed = distance / 50;

        // Add some randomness to the speed
        speed += Math.random() * 0.2 - 0.1;

        // Add some randomness to the direction
        angle += Math.random() * 2.4 - 0.2;

        // Move the enemy towards the player
        enemy.move(Math.cos(angle) * speed, Math.sin(angle) * speed);

        // Check collision with player
        if (player.collidesWith(enemy)) {
            if (!enemy.touchingPlayer) {
                enemy.touchingPlayer = true;
                setTimeout(() => {
                    if (enemy.touchingPlayer) {
                        lives--;
                        if (lives <= 0) {
                            gameOver = true;
                            console.log('Game over!');
                        }
                    }
                }, 100);
            }
        } else {
            enemy.touchingPlayer = false;
        }
    }
}

function die() {
    gameOver = true;
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    player.draw(ctx);

    // Draw enemies
    for (let enemy of enemies) {
        enemy.draw(ctx);
    }

    // Draw lives
    ctx.fillStyle = 'red';
    ctx.font = '24px Arial';
    ctx.fillText(`Lives: ${lives}`, 10, 30);

    // Draw game over screen
    if (gameOver) {
        ctx.fillStyle = 'black';
        ctx.globalAlpha = 0.7;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.globalAlpha = 1.0;
        ctx.fillStyle = 'white';
        ctx.font = '48px Arial';
        ctx.fillText('Game Over', canvas.width / 2 - 125, canvas.height / 2);

        // Draw respawn button
        ctx.fillStyle = 'white';
        ctx.fillRect(canvas.width / 2 - 75, canvas.height / 2 + 50, 150, 50);
        ctx.fillStyle = 'black';
        ctx.font = '24px Arial';
        ctx.fillText('Respawn', canvas.width / 2 - 50, canvas.height / 2 + 83);

        // Add event listener for respawn button click
        canvas.addEventListener('click', () => {
            location.reload();
        });
    }
}