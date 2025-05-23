class World {
    height = 480;

    character = new Character();
    level = level1;
    statusBars = [
        new HealthStatusbar(),
        new CoinStatusbar(),
        new BottleStatusbar()
    ];

    startScreen = new StartScreen();
    canvas;
    ctx;
    camera_x = 0;

    keyboard;


    checkCollisionsInterval;
    allIntervals = [];


    /**
     * Constructs the game world.
     * Initializes canvas context, input, world setup and collision checks.
     * 
     * @param {HTMLCanvasElement} canvas - The canvas element for rendering.
     * @param {object} keyboard - Object representing the current keyboard state.
     */
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.checkCollisions();
    }


    /**
     * Adds all relevant game objects (backgrounds, enemies, items, character) to the canvas.
     */
    addGameObjects() {
        this.addObjectToMap(this.level.backgroundObjects);
        this.addObjectToMap(this.level.clouds);
        this.addObjectToMap(this.level.throwableObjects);
        this.addObjectToMap(this.level.coins);
        this.addObjectToMap(this.level.enemies);
        this.addToMap(this.character)
    }


    /**
     * Adds an array of drawable objects to the canvas.
     * 
     * @param {DrawableObject[]} object - Array of game objects to draw.
     */
    addObjectToMap(object) {
        object.forEach(o => {
            this.addToMap(o);
        })
    }

    /**
     * Draws a single object on the canvas and handles direction flip if needed.
     * 
     * @param {DrawableObject} mo - The game object to draw.
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipCtx(mo)
        }

        mo.draw(this.ctx);

        if (mo.otherDirection) {
            this.flipCtxBack(mo)
        }
        if (mo.isObjectWithFrame()) {
            mo.drawFrame(this.ctx);
        }
    }


    /**
     * Handles the event when the character jumps on an enemy.
     * Triggers the enemy hit and resets the jump animation.
     * 
     * @param {Enemy} enemy - The enemy the character jumped on.
     */
    characterJumpOnEnemy(enemy) {
        enemy.getHit();
        this.character.removeIntervalById(this.character.jumpInterval)
        this.character.handleJumpAnimation(false);
    }


    /**
     * Starts a continuous interval that checks for various types of collisions.
     */
    checkCollisions() {
        this.checkCollisionsInterval = setInterval(() => {
            this.checkCollisionsCharacterEnemies();
            this.checkCollisionsCharacterCollectables();
        }, 1000 / maxFPS)
        this.pushToAllIntervals(this.checkCollisionsInterval);
    }


    /**
     * Checks all collisions between the character and collectible items.
     */
    checkCollisionsCharacterCollectables() {
        this.checkCollisionsCharacterThrowableObjects();
        this.checkCollisionsCharacterCoins();
    }


    /**
     * Checks collisions between the character and coins, and collects them if hit.
     */
    checkCollisionsCharacterCoins() {
        this.level.coins.forEach((coin) => {
            if (this.character.isColliding(coin) && !coin.isCollected) {
                coin.collecting(1, 'coins', 20);
            }
        })
    }


    /**
     * Checks collisions between the character and enemies,
     * and triggers damage or stomp effects accordingly.
     */
    checkCollisionsCharacterEnemies() {
        this.level.enemies.forEach((enemy) => {
            if (!enemy.isDead()) {
                if (this.character.isColliding(enemy)) {
                    if (this.character.isJumpOn(enemy)) {
                        this.characterJumpOnEnemy(enemy);
                    } else if (!this.character.isHurt()) {
                        this.enemyHitCharacter(enemy);
                    }
                }
            }
        })
    }


    /**
     * Checks collisions between the character and throwable objects,
     * and allows collection if not thrown.
     */
    checkCollisionsCharacterThrowableObjects() {
        this.level.throwableObjects.forEach((to) => {
            if (this.character.isColliding(to) && !to.isCollected) {
                if (!to.isThrown) {
                    to.collecting(2, 'bottles', 20);
                }
            }
        })
    }


    /**
     * The main draw loop.
     * Clears canvas, draws all visible objects depending on game state,
     * and re-requests the next animation frame.
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.ctx.translate(this.camera_x, 0);

        if (isGameStarted) {

            this.addGameObjects();

            this.ctx.translate(-this.camera_x, 0);
            this.addObjectToMap(this.statusBars);
        } else {
            this.addToMap(this.startScreen);
            this.ctx.translate(-this.camera_x, 0);
        }


        let self = this;
        requestAnimationFrame(() => {
            self.draw()
        });
    }


    /**
     * Restarts the game state by resetting all enemies, clouds,
     * throwable objects, coins, the character and status bars.
     */
    restart() {
        this.level.enemies.forEach((enemy) => {
            enemy.restart()
        });

        this.level.clouds.forEach((cloud) => {
            cloud.restart()
        });

        this.level.throwableObjects.forEach((to) => {
            to.restart()
        });

        this.level.coins.forEach((coin) => {
            coin.restart()
        });

        this.character.restart();

        this.statusBars.forEach((sb) => {
            sb.restart();
        })


    }


    /**
     * Handles what happens when the enemy hits the character.
     * Determines hit direction and applies damage.
     * 
     * @param {Enemy} enemy - The enemy that hit the character.
     */
    enemyHitCharacter(enemy) {
        const hitFromRight = this.character.isHitFromRight(enemy);
        this.character.getHit(hitFromRight);
    }


    /**
     * Flips the canvas context horizontally to draw mirrored objects.
     * 
     * @param {DrawableObject} mo - The object to flip before drawing.
     */
    flipCtx(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }


    /**
     * Restores canvas context after a flip and resets the object's x coordinate.
     * 
     * @param {DrawableObject} mo - The previously flipped object.
     */
    flipCtxBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }


    /**
     * Adds an interval ID to both the local and global interval lists
     * for centralized management and cleanup.
     * 
     * @param {number} interval - The interval ID to store.
     */
    pushToAllIntervals(interval) {
        this.allIntervals.push(interval);
        allGameIntervals.push(interval);
    }


    /**
     * Removes a given interval ID from both the global allGameIntervals array
     * and the instance-specific this.allIntervals array, preserving array integrity.
     *
     * @param {number} intervalId - The interval ID to remove.
     */
    removeIntervalById(intervalId) {
        clearInterval(intervalId);

        const globalIndex = allGameIntervals.indexOf(intervalId);
        if (globalIndex !== -1) {
            allGameIntervals.splice(globalIndex, 1);
        }

        const instanceIndex = this.allIntervals?.indexOf(intervalId);
        if (instanceIndex !== -1) {
            this.allIntervals.splice(instanceIndex, 1);
        }
    }


    /**
     * Sets up world references inside all major object categories
     * so they can interact with world logic.
     */
    setWorld() {
        this.character.world = this;
        this.setWorldFor(this.statusBars);
        this.setWorldFor(this.level.throwableObjects);
        this.setWorldFor(this.level.coins);
        this.setWorldFor(this.level.enemies);
        this.level.enemies.forEach((enemy) => enemy.animate());
    }

    
    /**
     * Assigns the current world instance to each object in the provided array.
     * This is used to establish a reference between game entities (e.g., coins, enemies, status bars)
     * and the world they belong to, enabling interaction and communication.
     *
     * @param {Array<Object>} array - An array of game objects that should reference this world.
     */
    setWorldFor(array) {
        array.forEach((o) => {
            o.world = this;
        })
    }
}