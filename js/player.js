import Character from './character.js';

class Player extends Character {
    constructor({ ctx, position, battlePosition, image, name, maxHealth, maxMana, defence, minDamage, maxDamage, minMagicDamage, maxMagicDamage, magicAttackCost, healCost, actions }) {
        super({ ctx, position, battlePosition, image, name, maxHealth, maxMana, defence, minDamage, maxDamage, minMagicDamage, maxMagicDamage, magicAttackCost, healCost, actions });

        //initialise the players score
        this.score=0;

    }
}

export default Player;