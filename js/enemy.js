class Enemy extends Sprite {
    constructor(x, y, width, height, imageSrc) {
        super(x, y, width, height, imageSrc);
        this.touchingPlayer = false;
        this.health = 3;
    }

    takeDamage() {
        this.health--;
        if (this.health <= 0) {
            this.destroy();
        }
    }

    destroy() {
        score++;
        // Remove the enemy from the game
        const index = enemies.indexOf(this);
        if (index !== -1) {
            enemies.splice(index, 1);
        }
    }

    // Additional methods specific to Enemy can be added here
}

const ENEMY_SIZE = 30;
const ENEMY_SPAWN_INTERVAL = 2000;

function spawnEnemies() {
    setInterval(() => {
        if (!gameOver) {
            let enemy = new Enemy(
                Math.random() * canvas.width,
                Math.random() * canvas.height,
                ENEMY_SIZE,
                ENEMY_SIZE,
                'images/sprite2.png'
            );
            enemies.push(enemy);
        }
    }, ENEMY_SPAWN_INTERVAL);
}

function updateEnemies() {
    for (let enemy of enemies) {
        moveEnemyTowardsPlayer(enemy);
        checkCollisions(enemy);
    }
}

function moveEnemyTowardsPlayer(enemy) {
    let dx = player.x - enemy.x;
    let dy = player.y - enemy.y;
    let angle = Math.atan2(dy, dx);
    let distance = Math.sqrt(dx * dx + dy * dy);
    let speed = distance / 50 + Math.random() * 0.2 - 0.1;
    angle += Math.random() * 2.4 - 0.2;
    enemy.move(Math.cos(angle) * speed, Math.sin(angle) * speed);
}

function checkCollisions(enemy) {
    if (player.collidesWith(enemy)) {
        handlePlayerCollision(enemy);
    } else {
        enemy.touchingPlayer = false;
    }

    for (let bullet of player.bullets) {
        if (bullet.collidesWith(enemy)) {
            enemy.takeDamage();
            bullet.y = BULLET_OUT_OF_SCREEN_Y;
        }
    }
}

function handlePlayerCollision(enemy) {
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
}