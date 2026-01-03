class Spritesheet {
    constructor(image, frameWidth, frameHeight, framesPerRow, totalFrames) {
        this.image = image;
        this.frameWidth = frameWidth;
        this.frameHeight = frameHeight;
        this.framesPerRow = framesPerRow;
        this.totalFrames = totalFrames;
        this.currentFrame = 0;
    }

    //used to draw the sprites frame by frame
    draw(ctx, x, y) {
        const row = Math.floor(this.currentFrame / this.framesPerRow);
        const col = this.currentFrame % this.framesPerRow;

        ctx.drawImage(
            this.image,
            col * this.frameWidth,
            row * this.frameHeight,
            this.frameWidth,
            this.frameHeight,
            x,
            y,
            this.frameWidth * 3.5,
            this.frameHeight * 3.5
        );

    }
}

export default Spritesheet;