//Imports
import { resources } from './resource.js';
import InputHandler from './inputHandler.js';
import Sprite from './sprite.js';
import Player from './player.js';
import Support from './support.js';
import Enemy from './enemy.js';

//Setting up the canvas
const canvas = document.querySelector('#gameCanvas');
const ctx = canvas.getContext("2d");
canvas.width = 1200;
canvas.height = 600;
ctx.fillStyle = 'black';
ctx.fillRect(0, 0, canvas.width, canvas.height);

//Declaring variables
var gameState = 'playing';
const moveDelay = 10;
let lastMoveTime = 0;
let currentPlayerIndex;
let currentPlayer;
let maxPartySize = 2;
let enemyParty = [];
let currentAction;
let previousAction;
let cursorXPos;
let cursorYPos;
let hasFled;
let heroParty;

let text;

//Loading audio files
var mapTheme = new Audio('music/mapTheme.wav');
var battleTheme = new Audio('music/battleTheme.wav');


//Get the information of the user that has logged in
let playerName = sessionStorage.getItem("username");
let score = sessionStorage.getItem("score");
let currentUser = { name: playerName, score: score };

//Clear the current user from session storage - holds the session storage only until the browser is closed
window.addEventListener('popstate', () => {
    sessionStorage.clear();
});


//Loading the map data
const battleZoneData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 220, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 220, 220, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 220, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

const collisions = [0, 0, 0, 0, 0, 0, 0, 0, 0, 376, 376, 376, 376, 376, 376, 376, 376, 376, 376, 0, 376, 376, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 376, 0, 0, 376, 376, 376, 376, 376, 376, 0, 0, 376, 0, 0, 376, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 376, 0, 0, 376, 0, 0, 0, 376, 0, 376, 0, 0, 0, 0, 0, 0, 376, 376, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 376, 0, 0, 0, 376, 0, 0, 0, 0, 0, 0, 0, 0, 376, 0, 376, 0, 376, 0, 376, 0, 0, 0, 0,
    0, 0, 0, 0, 376, 376, 376, 0, 0, 376, 376, 0, 0, 0, 0, 0, 0, 0, 0, 0, 376, 0, 0, 376, 376, 376, 0, 0, 0, 0,
    0, 0, 376, 376, 0, 376, 0, 0, 376, 0, 0, 376, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 376, 376, 0, 0, 0,
    0, 376, 0, 376, 376, 376, 376, 0, 376, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 376, 0, 376, 0, 0,
    0, 376, 0, 376, 376, 0, 376, 0, 376, 0, 376, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 376, 0, 376, 0, 0,
    0, 376, 0, 376, 0, 0, 376, 0, 376, 376, 0, 0, 376, 376, 376, 0, 376, 376, 376, 376, 376, 376, 0, 376, 376, 376, 0, 0, 376, 0,
    0, 376, 0, 376, 0, 376, 376, 0, 376, 376, 376, 376, 376, 0, 0, 0, 376, 0, 0, 376, 376, 0, 0, 376, 0, 0, 376, 0, 376, 0,
    0, 376, 0, 0, 0, 0, 0, 0, 376, 0, 376, 0, 376, 376, 376, 376, 376, 0, 0, 0, 376, 0, 0, 0, 0, 376, 0, 0, 376, 0,
    0, 376, 0, 0, 0, 0, 0, 0, 0, 0, 0, 376, 0, 0, 0, 0, 0, 0, 376, 0, 0, 0, 0, 0, 0, 376, 376, 376, 376, 0,
    0, 376, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 376, 0,
    0, 376, 376, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 376, 376, 376, 0, 0, 376, 0, 376, 0,
    0, 376, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 376, 376, 376, 0, 0, 376, 376, 0, 0,
    0, 376, 0, 376, 0, 0, 0, 0, 0, 0, 0, 0, 376, 0, 0, 376, 376, 376, 0, 0, 0, 0, 0, 0, 0, 0, 376, 0, 0, 0,
    0, 0, 376, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 376, 376, 0, 376, 0, 0, 0, 0, 0, 0, 0, 376, 376, 0, 0, 0,
    0, 0, 376, 0, 376, 0, 0, 0, 0, 0, 0, 0, 0, 0, 376, 0, 0, 376, 0, 0, 0, 376, 0, 0, 0, 376, 0, 0, 0, 0,
    0, 0, 0, 376, 376, 376, 0, 0, 376, 376, 376, 376, 376, 376, 0, 0, 0, 0, 376, 376, 376, 376, 376, 376, 376, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 376, 376, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

const battleZonesMap = []
for (let i = 0; i < battleZoneData.length; i += 30) {
    battleZonesMap.push(battleZoneData.slice(i, 30 + i))
}

const collisionsMap = []
for (let i = 0; i < collisions.length; i += 30) {
    collisionsMap.push(collisions.slice(i, 30 + i))
}


class Boundary {
    static width = 88
    static height = 88
    constructor({ position }) {
        this.position = position
        this.width = 88
        this.height = 88
    }

    draw() {
        ctx.fillStyle = 'rgba(255, 0, 0, 0)'
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}


//Analysing the map data and creating boundaries
const offset = {
    x: 0,
    y: -1000
}

const boundaries = []

collisionsMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol == 376)
            boundaries.push(
                new Boundary({
                    position: {
                        x: j * Boundary.width + offset.x,
                        y: i * Boundary.height + offset.y
                    }
                })
            )
    })
})

const battleZones = []

battleZonesMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol == 220)
            battleZones.push(
                new Boundary({
                    position: {
                        x: j * Boundary.width + offset.x,
                        y: i * Boundary.height + offset.y
                    }
                })
            )
    })
})


//Creating the images
const mainMenuBackground = new Sprite({
    ctx: ctx,
    position: {
        x: -300,
        y: -470
    },
    image: resources.images.mainMenuBackgroundImage.image
})

const background = new Sprite({
    ctx: ctx,
    position: {
        x: offset.x,
        y: offset.y
    },
    image: resources.images.backgroundImage.image
})

const foreground = new Sprite({
    ctx: ctx,
    position: {
        x: offset.x,
        y: offset.y
    },
    image: resources.images.foregroundImage.image
})

const battleScene = new Sprite({
    ctx: ctx,
    position: {
        x: 0,
        y: 0
    },
    image: resources.images.battleSceneImage.image
})

//Storing all movable objects
const moveableObjects = [background, foreground, ...boundaries, ...battleZones];

//Magic abilities
const magic = ['Fire', 'Heal'];

//Creating the characters
const player = new Player({
    ctx: ctx,
    position: {
        x: canvas.width / 2,
        y: canvas.height / 2
    },
    battlePosition: {
        x: 350,
        y: 200
    },
    image: resources.images.hero.image,
    name: currentUser.name,
    maxHealth: 140,
    maxMana: 50,
    defence: 6,
    minDamage: 15,
    maxDamage: 17,
    minMagicDamage: 20,
    maxMagicDamage: 25,
    magicAttackCost: 9,
    healCost: 0,
    actions: ['Attack', magic[0], 'Guard', 'Flee']
});

const support1 = new Support({
    ctx: ctx,
    position: {
        x: canvas.width / 2,
        y: canvas.height / 2
    },
    battlePosition: {
        x: 350,
        y: 300
    },
    image: resources.images.healer.image,
    name: 'Ellie',
    maxHealth: 100,
    maxMana: 60,
    defence: 4,
    minDamage: 9,
    maxDamage: 11,
    minMagicDamage: 0,
    maxMagicDamage: 0,
    magicAttackCost: 0,
    healCost: 9,
    actions: ['Attack', magic[1], 'Guard', 'Flee']
});


const inputHandler = new InputHandler(player);
const playerParty = [player, support1];

//Checks whether one object collides with another object
function mapCollisions({ object1, object2 }) {
    return (
        object1.position.x + 64 >= object2.position.x &&
        object1.position.x <= object2.position.x + object2.width &&
        object1.position.y <= object2.position.y + object2.height &&
        object1.position.y + 64 >= object2.position.y
    )
}


//game loop
function animate() {
    if (gameState === 'playing') {
        mapTheme.play();
        ctx.fillRect(0, 0, canvas.width, canvas.height);  // Clear the canvas
        update();
        background.draw();
        boundaries.forEach(boundary => {
            boundary.draw();
        });
        battleZones.forEach(battleZone => {
            battleZone.draw();
        });
        player.position.x = canvas.width / 2;
        player.position.y = canvas.height / 2;
        player.animate();
        player.draw();
        foreground.draw();
        requestAnimationFrame(animate);
    } else if (gameState === 'battle') {
        //start battle
        transitionToBattle();
    } else if (gameState === 'gameOver') {

        if (player.score > currentUser.score) {
            //update score
            const user = JSON.parse(localStorage[currentUser.name])
            sessionStorage.setItem("score", player.score);
            user.score = player.score;
            //update local storage
            localStorage[currentUser.name] = JSON.stringify(user);
        }
        //start game over
        transitionToGameOver();
    }
}



//Updates the screen based on inputs
function update() {
    const speed = 5;
    const currentTime = Date.now();

    if (inputHandler.keys.ArrowUp.pressed || inputHandler.keys.ArrowDown.pressed || inputHandler.keys.ArrowRight.pressed || inputHandler.keys.ArrowLeft.pressed) {
        for (let i = 0; i < battleZones.length; i++) {
            const battleZone = battleZones[i]
            //Calculating when the player is standing on a battle zone
            const overlappingArea = ((Math.min(player.position.x + player.frameWidth, battleZone.position.x + battleZone.width) - Math.max(player.position.x, battleZone.position.x))
                * (Math.min(player.position.y + player.frameHeight, battleZone.position.y + battleZone.height) - Math.max(player.position.y, battleZone.position.y)))
            if (
                mapCollisions({
                    object1: player,
                    object2: battleZone
                }) &&
                overlappingArea > (player.frameWidth * player.frameHeight) / 2
                && Math.random() < 0.01 //Probability of activating a battle
            ) {

                gameState = 'battle';
                break;

            }
        }
    }

    //used to handle idle time during battles 
    if (currentTime - lastMoveTime >= moveDelay) {

        //Checks if the user is moving up
        if (inputHandler.keys.ArrowUp.pressed && inputHandler.lastKey === "ArrowUp") {
            player.direction = 'up';

            //Checks for collisions
            for (let i = 0; i < boundaries.length; i++) {
                const boundary = boundaries[i]
                if (
                    mapCollisions({
                        object1: player,
                        object2: {
                            ...boundary,
                            position: {
                                x: boundary.position.x,
                                y: boundary.position.y + speed
                            }
                        }
                    })
                ) {
                    //Stops the player if they collide with a boundary
                    player.isMoving = false
                    break
                }
            }

            //Moves all objects when the player moves
            if (player.isMoving)
                moveableObjects.forEach((moveableObjects) => {
                    moveableObjects.position.y += speed
                })
            lastMoveTime = currentTime;
        }
        //Checks if the user is moving down
        else if (inputHandler.keys.ArrowDown.pressed && inputHandler.lastKey === "ArrowDown") {
            player.direction = 'down';

            //Checks for collisions
            for (let i = 0; i < boundaries.length; i++) {
                const boundary = boundaries[i]
                if (
                    mapCollisions({
                        object1: player,
                        object2: {
                            ...boundary,
                            position: {
                                x: boundary.position.x,
                                y: boundary.position.y - speed
                            }
                        }
                    })
                ) {
                    //Stops the player if they collide with a boundary
                    player.isMoving = false
                    break
                }
            }

            //Moves all objects when the player moves
            if (player.isMoving)
                moveableObjects.forEach((moveableObjects) => {
                    moveableObjects.position.y -= speed
                })
            lastMoveTime = currentTime;
        }
        //Checks if the user is moving left
        if (inputHandler.keys.ArrowLeft.pressed && inputHandler.lastKey === "ArrowLeft") {
            player.direction = 'left';

            //Checks for collisions
            for (let i = 0; i < boundaries.length; i++) {
                const boundary = boundaries[i]
                if (
                    mapCollisions({
                        object1: player,
                        object2: {
                            ...boundary,
                            position: {
                                x: boundary.position.x + speed,
                                y: boundary.position.y
                            }
                        }
                    })
                ) {
                    //Stops the player if they collide with a boundary
                    player.isMoving = false
                    break
                }
            }

            //Moves all objects when the player moves
            if (player.isMoving)
                moveableObjects.forEach((moveableObjects) => {
                    moveableObjects.position.x += speed
                })
            lastMoveTime = currentTime;
        }
        //Checks if the user is moving right
        else if (inputHandler.keys.ArrowRight.pressed && inputHandler.lastKey === "ArrowRight") {
            player.direction = 'right';

            //Checks for collisions
            for (let i = 0; i < boundaries.length; i++) {
                const boundary = boundaries[i]
                if (
                    mapCollisions({
                        object1: player,
                        object2: {
                            ...boundary,
                            position: {
                                x: boundary.position.x - speed,
                                y: boundary.position.y
                            }
                        }
                    })
                ) {
                    //Stops the player if they collide with a boundary
                    player.isMoving = false
                    break
                }
            }

            //Moves all objects when the player moves
            if (player.isMoving)
                moveableObjects.forEach((moveableObjects) => {
                    moveableObjects.position.x -= speed
                })
            lastMoveTime = currentTime;
        }
    }
}

//Transitions to the battle sequence
function transitionToBattle() {
    // Initialization code for starting a battle
    heroParty = 0;
    heroParty = [...playerParty];
    currentPlayerIndex = 0;
    currentPlayer = heroParty[currentPlayerIndex];
    enemyParty = generateEnemyParty(maxPartySize);
    currentAction = ' ';
    previousAction = ' ';
    cursorXPos = canvas.width / 2 + 20;
    cursorYPos = canvas.height - 135;
    player.isMoving = false;
    hasFled = false;

    //Plays the battle music
    mapTheme.pause();
    mapTheme.currentTime = 0;
    battleTheme.play();

    //Starts the battle
    battle();
}

//Loops the battle sequence
function battle() {
    if (!(currentAction == 'ConfirmText')) {
        //Draw the elements of the scene
        battleScene.draw();
        heroParty.forEach(player => {
            player.position.x = player.battlePosition.x;
            player.position.y = player.battlePosition.y;
            player.currentFrameIndex = 4;
            player.draw();
        });
        enemyParty.forEach(enemy => {
            enemy.draw();
        });
        displayBattleHUD();
        HUDelements();
        ctx.fillStyle = 'white';
        ctx.fillText('> ', cursorXPos, cursorYPos);
    }


    //Take keyboard inputs from the user to perform actions
    if (inputHandler.keys.ArrowUp.pressed && inputHandler.lastKey === "ArrowUp") {
        inputHandler.keys.ArrowUp.pressed = false;
        cursorYPos -= 35;
    } else if (inputHandler.keys.ArrowDown.pressed && inputHandler.lastKey === "ArrowDown") {
        inputHandler.keys.ArrowDown.pressed = false;
        cursorYPos += 35;
    } else if (inputHandler.keys.Backspace.pressed && inputHandler.lastKey === "Backspace") {
        inputHandler.keys.Backspace.pressed = false;
        goBack();
    } else if (inputHandler.keys.Enter.pressed && inputHandler.lastKey === "Enter") {
        inputHandler.keys.Enter.pressed = false;
        if (currentAction == ' ') {
            currentAction = getAction();
        } else if (currentAction == 'ConfirmText') {
            currentAction = 'NextPlayer';
        }
        confirmSelection();
    }


    // Ensure the cursor stays within the valid range
    let minPos = 135
    if (currentAction == 'SelectEnemy') {
        for (let i = 0; i < enemyParty.length; i++) {
            if (i >= 1) {
                minPos = minPos - 35
            }
        }
    } else if (currentAction == 'SelectPlayer') {
        for (let i = 0; i < heroParty.length; i++) {
            if (i >= 1) {
                minPos = minPos - 35
            }
        }
    } else if (currentAction == ' ') {
        for (let i = 0; i < currentPlayer.actions.length; i++) {
            if (i >= 1) {
                minPos = minPos - 35
            }
        }
    }


    if (cursorYPos < canvas.height - 135) {
        cursorYPos = canvas.height - minPos;
    } else if (cursorYPos > canvas.height - minPos) {
        cursorYPos = canvas.height - 135;
    }


    //Check if a player has died
    heroParty.forEach(player => {
        if (player.health <= 0) {
            player.defeated = true;
            player.health = 0;

            //remove them from the party
            const index = heroParty.indexOf(player);
            if (index !== -1) {
                heroParty.splice(index, 1);
            }
        }
    });

    //Check if any enemy has died
    enemyParty.forEach(enemy => {
        if (enemy.health <= 0) {
            heroParty.forEach(player => {
                if (player instanceof Player) {
                    player.score += enemy.value;
                    return;
                }
            });

            //remove them from the party
            const index = enemyParty.indexOf(enemy);
            if (index !== -1) {
                enemyParty.splice(index, 1);
            }
        }
    });


    //Check if the player has been defeated
    if (heroParty.length === 0) {
        gameState = 'gameOver';
        animate();
        //Check if the player has fled or the enemyies have been defeated
    } else if (enemyParty.length === 0 || hasFled) {
        postBattleProcessing();
    } else {
        requestAnimationFrame(battle);
    }
}

//Allows the user to return to the previous option
function goBack() {
    //Positions the cursor
    cursorXPos = canvas.width / 2 + 20;
    if (currentAction == "Attack") {
        cursorYPos = canvas.height - 135;
    }
    else if (currentAction == "Fire" || currentAction == "Heal") {
        cursorYPos = canvas.height - 100;
    }

    currentAction = ' ';
    previousAction = ' ';

}

//Allows the user to make a selection
function confirmSelection() {
    switch (currentAction) {
        case 'Attack':
            //Selects a target to attack
            previousAction = currentAction;
            currentAction = 'SelectEnemy';
            selectTarget();
            break;

        case 'Fire':
            //Selects a target to attack
            previousAction = currentAction;
            currentAction = 'SelectEnemy';
            selectTarget();
            break;

        case 'Heal':
            //Selects a target to heal
            previousAction = currentAction;
            currentAction = 'SelectPlayer';
            selectTarget();
            break;

        case 'Guard':
            //guards against the enemies turn
            displayTextHUD(currentPlayer.name + " has decide to guard!");
            currentPlayer.isGuarding = true;
            currentAction = 'ConfirmText';
            confirmSelection();
            break;

        case 'Flee':
            //Exits the battle
            displayTextHUD(currentPlayer.name + " has decide to flee!");
            currentAction = 'ConfirmText';
            hasFled = true;
            confirmSelection();
            break;

        case 'SelectEnemy':

            const enemy = getTarget();

            if (enemy == null) {
                goBack();
                break;
            }

            //Attack the selected target
            if (previousAction == 'Attack') {

                const damage = currentPlayer.attack();
                enemy.health -= damage;

                // Check if the target is defeated
                if (enemy.health <= 0) {
                    displayTextHUD(enemy.name + " has been defeated!");
                } else {
                    displayTextHUD(currentPlayer.name + " has inflicted " + damage + " damage to " + enemy.name);
                }

            }
            //Magic attacks the selected target
            else if (previousAction == 'Fire') {
                if (currentPlayer.mana >= currentPlayer.magicAttackCost) {
                    const damage = currentPlayer.magicAttack();
                    enemy.health -= damage;

                    // Check if the target is defeated
                    if (enemy.health <= 0) {
                        displayTextHUD(enemy.name + " has been defeated!");
                    } else {
                        displayTextHUD(currentPlayer.name + " has inflicted " + damage + " damage to " + enemy.name);
                    }

                } else {
                    goBack();
                    break;
                }
            }

            currentAction = 'ConfirmText';
            confirmSelection();
            break;

        case 'SelectPlayer':
            //Heal the selected target
            let target = getTarget();
            let healing;
            let newHealth;

            if (target == null) {
                goBack();
                break;
            }

            healing = currentPlayer.heal();
            newHealth = target.health + healing;
            if (newHealth > target.maxHealth) {
                healing = target.maxHealth - target.health;
            }
            target.health += healing;
            displayTextHUD(currentPlayer.name + " has restored " + healing + " health to " + target.name);
            currentAction = 'ConfirmText';
            confirmSelection();
            break;


        case 'NextPlayer':
            if (currentPlayerIndex === heroParty.length - 1) {
                // Reset the turn
                currentPlayerIndex = 0;
                // Enemy turn
                enemyTurn();
                // Players turn
                heroParty.forEach(player => {
                    player.isGuarding = false;
                });
            } else {
                currentPlayerIndex++;
                currentPlayer = heroParty[currentPlayerIndex];
            }
            currentPlayer = heroParty[currentPlayerIndex];


            currentAction = ' ';
            previousAction = ' ';
            cursorXPos = canvas.width / 2 + 20;
            cursorYPos = canvas.height - 135;
            requestAnimationFrame(battle);

        case 'ConfirmText':
            break;
    }
}


//Create and display the Dialouge HUD
function displayTextHUD(text) {

    ctx.fillStyle = 'black';
    ctx.fillRect(0, canvas.height - 165, canvas.width, 165);
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 2;
    ctx.strokeRect(0, canvas.height - 165, canvas.width, 165);
    ctx.fillStyle = 'white';
    ctx.font = '35px CustomFont';
    ctx.fillText(text, 30, canvas.height - 135);

}
//Create and display the battle HUD
function displayBattleHUD() {

    // Drawing the Player's HUD
    ctx.fillStyle = 'black';
    ctx.fillRect(0, canvas.height - 165, canvas.width / 2, 165);
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 2;
    ctx.strokeRect(0, canvas.height - 165, canvas.width / 2, 165);

    // Drawing the Actions HUD
    ctx.fillStyle = 'black';
    ctx.fillRect(canvas.width / 2, canvas.height - 165, canvas.width / 2 + 160, 165);
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 2;
    ctx.strokeRect(canvas.width / 2, canvas.height - 165, canvas.width / 2 + 160, 165);

    // Drawing the Enemies HUD
    ctx.fillStyle = 'black';
    ctx.fillRect(canvas.width / 2 + 160, canvas.height - 165, canvas.width - 10, 165);
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 2;
    ctx.strokeRect(canvas.width / 2 + 160, canvas.height - 165, canvas.width - 10, 165);
}
//Display the text to the battle HUD
function HUDelements() {
    let xPos;
    let yPos;
    let actionsXPos;
    let actionsYPos;
    let columnWidth = 200;


    ctx.fillStyle = 'white';
    ctx.font = '35px CustomFont';

    xPos = 0;
    yPos = canvas.height - 135;
    columnWidth = 200;
    heroParty.forEach(player => {
        ctx.font = '35px CustomFont';


        // Calculate the center position for the name
        const nameWidth = ctx.measureText(player.name).width;
        const nameXPos = xPos + (columnWidth - nameWidth) / 2;


        if (currentPlayer.name == player.name) {
            ctx.fillStyle = '#F96167';

            //Display the players information
            ctx.fillText(player.name, nameXPos, yPos);
            ctx.fillText("Health: " + player.health, xPos + columnWidth, yPos);
            ctx.fillText("Mana: " + player.mana, xPos + 2 * columnWidth, yPos);
            yPos += 35;

            actionsXPos = canvas.width / 2 + 40;
            actionsYPos = canvas.height - 135;

            //Displaying the current players actions
            (player.actions).forEach(action => {
                ctx.font = '35px CustomFont';

                if ((cursorYPos == actionsYPos && cursorXPos == canvas.width / 2 + 20) || (previousAction == action)) {
                    ctx.fillStyle = '#F9E795';
                    ctx.fillText(action, actionsXPos, actionsYPos);
                    actionsYPos += 35;
                } else {
                    ctx.fillStyle = 'white';
                    ctx.fillText(action, actionsXPos, actionsYPos);
                    actionsYPos += 35;
                }
            });
        } else if (cursorYPos == yPos && cursorXPos == 10) {
            ctx.fillStyle = '#F9E795';

            //Display the players information
            ctx.fillText(player.name, nameXPos, yPos);
            ctx.fillText("Health: " + player.health, xPos + columnWidth, yPos);
            ctx.fillText("Mana: " + player.mana, xPos + 2 * columnWidth, yPos);
            yPos += 35;

        } else {
            ctx.fillStyle = 'white';

            //Display the players information
            ctx.fillText(player.name, nameXPos, yPos);
            ctx.fillText("Health: " + player.health, xPos + columnWidth, yPos);
            ctx.fillText("Mana: " + player.mana, xPos + 2 * columnWidth, yPos);
            yPos += 35;

        }
    });

    //Draw in the enemies party information
    xPos = canvas.width / 2 + 200;
    yPos = canvas.height - 135;
    enemyParty.forEach(enemy => {
        ctx.font = '35px CustomFont';

        // Calculate the center position for the name
        const nameWidth = ctx.measureText(enemy.name).width;
        const nameXPos = xPos + (columnWidth - nameWidth) / 2;

        if (cursorYPos == yPos && cursorXPos == canvas.width / 2 + 180) {
            ctx.fillStyle = '#F9E795';
            ctx.fillText(enemy.name, nameXPos, yPos);
            ctx.fillText("Health: " + enemy.health, xPos + columnWidth, yPos);
            yPos += 35;
        } else {
            ctx.fillStyle = 'white';
            ctx.fillText(enemy.name, nameXPos, yPos);
            ctx.fillText("Health: " + enemy.health, xPos + columnWidth, yPos);
            yPos += 35;
        }
    });
}


//Returns the selected action
function getAction() {
    let chosenIndex;
    let xPos = canvas.width / 2 + 20;
    if (cursorYPos == canvas.height - 135 && cursorXPos == xPos) {
        chosenIndex = 0;
    }
    else if (cursorYPos == canvas.height - 100 && cursorXPos == xPos) {
        chosenIndex = 1;
    }
    else if (cursorYPos == canvas.height - 65 && cursorXPos == xPos) {
        chosenIndex = 2;
    }
    else if (cursorYPos == canvas.height - 30 && cursorXPos == xPos) {
        chosenIndex = 3;
    }
    return currentPlayer.actions[chosenIndex];
}

//Positions the cursor to select a target
function selectTarget() {
    if (currentAction == 'SelectEnemy') {
        cursorXPos = canvas.width / 2 + 180;
        cursorYPos = canvas.height - 135;
    } else if (currentAction == 'SelectPlayer') {
        cursorXPos = 10;
        cursorYPos = canvas.height - 135;
    }
}

//Return the selected target
function getTarget() {
    let chosenIndex;
    //Check which enemy the user has selected
    if (currentAction == 'SelectEnemy') {
        let xPos = canvas.width / 2 + 180;
        if (cursorYPos == canvas.height - 135 && cursorXPos == xPos) {
            chosenIndex = 0;
        }
        else if (cursorYPos == canvas.height - 100 && cursorXPos == xPos) {
            chosenIndex = 1;
        }
        else if (cursorYPos == canvas.height - 65 && cursorXPos == xPos) {
            chosenIndex = 2;
        }
        else if (cursorYPos == canvas.height - 30 && cursorXPos == xPos) {
            chosenIndex = 3;
        }

        // Check if the enemy is alive
        if (enemyParty[chosenIndex].health <= 0) {
            //Play a sound to indicate that the option is not possible - remove the console log after
            goBack();
            return null;
        }

        return enemyParty[chosenIndex];

        //Check which player the user has selected
    } else if (currentAction == 'SelectPlayer') {
        let xPos = 10;
        if (cursorYPos == canvas.height - 135 && cursorXPos == xPos) {
            chosenIndex = 0;
        }
        else if (cursorYPos == canvas.height - 100 && cursorXPos == xPos) {
            chosenIndex = 1;
        }
        else if (cursorYPos == canvas.height - 65 && cursorXPos == xPos) {
            chosenIndex = 2;
        }
        else if (cursorYPos == canvas.height - 30 && cursorXPos == xPos) {
            chosenIndex = 3;
        }

        // Check if the player is alive
        if (heroParty[chosenIndex].health <= 0) {
            //Play a sound to indicate that the option is not possible - remove the console log after
            goBack();
            return null;
        }
        console.log(chosenIndex);
        return heroParty[chosenIndex];
    }

}

//Randomises the enmey party
function generateEnemyParty(maxPartySize) {
    let xPos;
    let yPos;
    let enemyParty = [];
    const minEnemies = 1;
    //randomises the party size
    const partySize = Math.floor(Math.random() * (maxPartySize - minEnemies + 1)) + minEnemies;
    //enemy data
    const possibleEnemies = [
        {
            image: resources.images.ghostling.image,
            name: 'Ghostling',
            health: 30,
            minDamage: 4,
            maxDamage: 7,
            value: 5
        },

        {
            image: resources.images.hellfire.image,
            name: 'Hellfire',
            health: 90,
            minDamage: 11,
            maxDamage: 13,
            value: 15
        },

        {
            image: resources.images.razorbane.image,
            name: 'Razorbane',
            health: 50,
            minDamage: 9,
            maxDamage: 11,
            value: 10
        },

        {
            image: resources.images.smogfang.image,
            name: 'Smogfang',
            health: 50,
            minDamage: 9,
            maxDamage: 11,
            value: 10
        },

        {
            image: resources.images.snatcher.image,
            name: 'Snatcher',
            health: 120,
            minDamage: 8,
            maxDamage: 9,
            value: 15
        }

    ];

    for (let i = 0; i < partySize; i++) {
        //Randomises the enemy
        const randomIndex = Math.floor(Math.random() * (possibleEnemies.length));
        //positions the enemies for battle
        switch (i) {
            case 0:
                xPos = 850;
                yPos = 200;
                break;
            case 1:
                xPos = 850;
                yPos = 300;
                break;
            case 2:
                xPos = 950;
                yPos = 200;
                break;
            case 3:
                xPos = 950;
                yPos = 300;
                break;
        }
        const enemy = new Enemy({
            ctx: ctx,
            position: { x: xPos, y: yPos },
            image: possibleEnemies[randomIndex].image,
            name: possibleEnemies[randomIndex].name,
            health: possibleEnemies[randomIndex].health,
            minDamage: possibleEnemies[randomIndex].minDamage,
            maxDamage: possibleEnemies[randomIndex].maxDamage,
            value: possibleEnemies[randomIndex].value
        });
        enemyParty.push(enemy);
    }

    return enemyParty;
}

//Generates the enemys turn
function enemyTurn() {
    let damage;
    // Perform actions for each enemy in the enemy party
    for (let i = 0; i < enemyParty.length; i++) {
        const enemy = enemyParty[i];

        const targetPlayer = heroParty[Math.floor(Math.random() * heroParty.length)];

        if (targetPlayer.isGuarding) {
            damage = enemy.attack() - targetPlayer.defence;
        } else {
            damage = enemy.attack();
        }

        targetPlayer.health -= damage;

        // Check if the target is defeated
        if (targetPlayer.health <= 0) {
            displayTextHUD(targetPlayer.name + " has been defeated by " + enemy.name + "!");
        } else {
            displayTextHUD(enemy.name + " has inflicted " + damage + " damage to " + targetPlayer.name);
        }

    }
}


//Reset the players health to 1 and exits the battle
function postBattleProcessing() {
    // Increment the users score
    playerParty.forEach(player => {
        if (player.health <= 0) {
            player.health = 1;
            player.defeated = false;
        }
    });

    //stop music
    battleTheme.pause();
    battleTheme.currentTime = 0;

    //return to map
    gameState = 'playing';
    animate();
}



//Loops the main menu until an input is given
function mainMenuLoop() {
    // Display the main menu screen
    displayMainMenu();

    //Check if the user has logged in
    if (currentUser.name != null) {
        //Take keyboard inputs from the user to perform actions
        if (inputHandler.keys.Enter.pressed && inputHandler.lastKey === "Enter") {
            inputHandler.keys.Enter.pressed = false;
            player.score = 0;
            gameState = 'playing';
            animate();
        } else {
            //Play error music
            requestAnimationFrame(mainMenuLoop);
        }
    } else {
        requestAnimationFrame(mainMenuLoop);
    }

}

//Displays the main menu
function displayMainMenu() {
    // Clear the entire canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    mainMenuBackground.draw();

    const titleText = "Mystic Travellers";
    const highscoreText = "Highscore: " + currentUser.score;
    const startText = " - Press Enter to start - ";
    const notLoggedInText = " - Sign in to play -"


    ctx.fillStyle = "e5e5e5";
    ctx.font = '100px CustomFont';
    const titleTextWidth = ctx.measureText(titleText).width;
    const titleTextX = (canvas.width - titleTextWidth) / 2;
    const titleTextY = 200;
    ctx.fillText(titleText, titleTextX, titleTextY);

    ctx.fillStyle = "white";
    if (currentUser.name != null) {
        ctx.font = '35px CustomFont';
        const highscoreTextWidth = ctx.measureText(highscoreText).width;
        const highscoreTextX = (canvas.width - highscoreTextWidth) / 2;
        const highscoreTextY = 250;
        ctx.fillText(highscoreText, highscoreTextX, highscoreTextY);

        ctx.font = '35px CustomFont';
        const startTextWidth = ctx.measureText(startText).width;
        const startTextX = (canvas.width - startTextWidth) / 2;
        const startTextY = 500;
        ctx.fillText(startText, startTextX, startTextY);
    } else {
        ctx.font = '35px CustomFont';
        const notLoggedInTextWidth = ctx.measureText(notLoggedInText).width;
        const notLoggedInTextX = (canvas.width - notLoggedInTextWidth) / 2;
        const notLoggedInTextY = 500;
        ctx.fillText(notLoggedInText, notLoggedInTextX, notLoggedInTextY);
    }

}


//Starts the game loop
function transitionToGameOver() {
    battleTheme.pause();
    battleTheme.currentTime = 0;
    text = generateRandomText();
    displayGameOver();
}

//Generates random
function generateRandomText() {
    const gameOverTexts = [
        "So, this is how the great " + player.name + " has fallen. How disappointing.",
        "Farewell, " + player.name + ". Your journey ends here.",
        "This was hardly a surprise.",
        "The saga of " + player.name + " concludes with sorrow.",
        "You dissapoint me, " + player.name + ".",
        "Not your best day, huh " + player.name + "?"
    ];

    // Randomly select a game over message
    const randomIndex = Math.floor(Math.random() * gameOverTexts.length);
    return gameOverTexts[randomIndex];
}

//Displays the game over screen
function displayGameOver() {
    // Clear the entire canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";

    const gameOverText = "GAME OVER";
    const scoreText = "Score: " + player.score;

    ctx.font = '35px CustomFont';
    const textWidth = ctx.measureText(text).width;
    const textX = (canvas.width - textWidth) / 2;
    const textY = 120;
    ctx.fillText(text, textX, textY);

    ctx.font = '150px CustomFont';
    const gameOverTextWidth = ctx.measureText(gameOverText).width;
    const gameOverX = (canvas.width - gameOverTextWidth) / 2;
    const gameOverY = canvas.height / 2;
    ctx.fillText(gameOverText, gameOverX, gameOverY);

    ctx.font = '35px CustomFont';
    const scoreTextWidth = ctx.measureText(scoreText).width;
    const scoreTextX = (canvas.width - scoreTextWidth) / 2;
    const scoreTextY = 400;
    ctx.fillText(scoreText, scoreTextX, scoreTextY);


}


//Starting the game loop
mainMenuLoop();