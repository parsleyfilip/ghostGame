const PLAYER_SIZE = 50;



class Player {
    constructor(x, y, width, height, sprite) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.sprite = new Image();
        this.sprite.src = sprite;
        this.speed = 5;
        this.bullets = [];
    }


    
    move(dx, dy) {
        this.x += dx;
        this.y += dy;
    }

    shoot() {
        this.bullets.push(new Bullet(this.x + this.width / 2, this.y));
    }

    updateBullets() {
        this.bullets = this.bullets.filter(bullet => bullet.y > BULLET_OUT_OF_SCREEN_Y);
        this.bullets.forEach(bullet => bullet.update());
    }

    draw(ctx) {
        ctx.drawImage(this.sprite, this.x, this.y, this.width, this.height);
        this.bullets.forEach(bullet => bullet.draw(ctx));
    }

    collidesWith(enemy) {
        return !(this.x > enemy.x + enemy.width ||
                 this.x + this.width < enemy.x ||
                 this.y > enemy.y + enemy.height ||
                 this.y + this.height < enemy.y);
    }
}