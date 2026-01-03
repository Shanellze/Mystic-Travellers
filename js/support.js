import Character from './character.js';

class Support extends Character {
    constructor({ ctx, position, battlePosition, image, name, maxHealth, maxMana, defence, minDamage, maxDamage, minMagicDamage, maxMagicDamage, magicAttackCost, healCost, actions }) {
        super({ ctx, position, battlePosition, image, name, maxHealth, maxMana, defence, minDamage, maxDamage, minMagicDamage, maxMagicDamage, magicAttackCost, healCost, actions });
    }
}

export default Support;