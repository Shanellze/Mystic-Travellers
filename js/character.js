class Character {
    constructor({ctx, position, battlePosition, image, name, maxHealth, maxMana, defence, minDamage, maxDamage, minMagicDamage, maxMagicDamage, magicAttackCost, healCost, actions }) {
        this.ctx = ctx;
        this.position = position;
        this.battlePosition = battlePosition;
        this.image = image;
        this.framesPerRow = 3;
        this.frameWidth = image.width / this.framesPerRow;
        this.frameHeight = image.height / 4;
        this.frameIndex = 0;

        //Setting initial variables
        this.currentFrameIndex = 7;
        this.isMoving = false;
        this.direction = 'down';
        this.walkingFrames = {
            up: [0, 1, 2],
            right: [3, 4, 5],
            down: [6, 7, 8],
            left: [9, 10, 11],
        };

        //Character stats
        this.name = name;
        this.health = maxHealth;
        this.maxHealth = maxHealth;
        this.mana = maxMana;
        this.maxMana = maxMana;
        this.defence = defence;
        this.minDamage = minDamage;
        this.maxDamage = maxDamage;
        this.minMagicDamage = minMagicDamage;
        this.maxMagicDamage = maxMagicDamage;
        this.magicAttackCost = magicAttackCost;
        this.healCost = healCost;
        this.actions = actions;
        this.defeated = false;
        this.isGuarding = false;

    }

    //Draw an image frame by frame
    draw() {
        const frameX = this.currentFrameIndex % this.framesPerRow;
        const frameY = Math.floor(this.currentFrameIndex / this.framesPerRow);

        const offsetX = frameX * this.frameWidth;
        const offsetY = frameY * this.frameHeight;

        this.ctx.drawImage(
            this.image,
            offsetX,
            offsetY,
            this.frameWidth,
            this.frameHeight - 0.5,
            this.position.x,
            this.position.y,
            this.frameWidth * 2,
            this.frameHeight * 2
        );
    }
    
    //Used to animate character
    animate() {
        if (this.isMoving) {
            const frames = this.walkingFrames[this.direction];
            const totalFrames = frames.length;
            const animationSpeed = 0.2;

            this.frameIndex += animationSpeed;
            if (this.frameIndex >= totalFrames) {
                this.frameIndex = 0;
            }

            this.currentFrameIndex = frames[Math.floor(this.frameIndex)];
        }
    }


    //Character Actions
    
    attack() {
        //Randomises the damage dealt
        const damageDealt = Math.floor(Math.random() * (this.maxDamage - this.minDamage + 1)) + this.minDamage;
        return damageDealt;
    }

    magicAttack() {
        //Randomises the damage dealt
        const magicDamageDealt = Math.floor(Math.random() * (this.maxMagicDamage - this.minMagicDamage + 1)) + this.minMagicDamage;
        this.mana -= this.magicAttackCost;
        return magicDamageDealt;
    }

    heal() {
        const healthGained = 25;
        this.mana -= this.healCost;
        return healthGained;
    }
}

export default Character;