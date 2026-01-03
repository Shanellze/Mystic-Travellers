class Sprite {
    constructor({ ctx, position, image }) {
        this.ctx = ctx;
        this.position = position;
        this.image = image;
    }

    draw() {
        this.ctx.drawImage(this.image, this.position.x, this.position.y);
    }
}

export default Sprite;