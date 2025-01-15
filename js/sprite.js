class Sprite {
    constructor(x, y, width, height, imageSrc) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.image = new Image();
        this.image.src = imageSrc;
        this.speed = 5;
    }

    draw(ctx) {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    move(dx, dy) {
        const newX = this.x + dx;
        const newY = this.y + dy;
        if (newX >= 0 && newX + this.width <= canvas.width) {
            this.x = newX;
        }
        if (newY >= 0 && newY + this.height <= canvas.height) {
            this.y = newY;
        }
    }

    collidesWith(sprite) {
        return (
            this.x < sprite.x + sprite.width &&
            this.x + this.width > sprite.x &&
            this.y < sprite.y + sprite.height &&
            this.y + this.height > sprite.y
        );
    }
}




