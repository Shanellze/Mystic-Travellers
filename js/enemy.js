import Spritesheet from './spritesheet.js';

class Enemy {
    constructor({ctx, position, image, name, health, minDamage, maxDamage, value}) {
      this.ctx = ctx;
      this.position = position;
      this.spritesheet = new Spritesheet(image, 16, 16, 4, 16);
      this.name = name;
      this.health = health;
      this.minDamage = minDamage;
      this.maxDamage = maxDamage;
      this.value = value;
    }
  
    //Draws the enemy
    draw() {
        this.spritesheet.draw(this.ctx, this.position.x, this.position.y);
    }
  
    //Battle actions
    attack() {
        //Randomises the damage dealt
        const damageDealt = Math.floor(Math.random() * (this.maxDamage - this.minDamage + 1)) + this.minDamage;
        return damageDealt;
    }
}

export default Enemy;