class Bullet {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 5;
        this.height = 10;
        this.speed = 7;
    }

    update() {
        this.y -= this.speed;
    }

    draw(ctx) {
        ctx.fillStyle = 'yellow';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    collidesWith(enemy) {
        return !(this.x > enemy.x + enemy.width ||
                 this.x + this.width < enemy.x ||
                 this.y > enemy.y + enemy.height ||
                 this.y + this.height < enemy.y);
    }
}