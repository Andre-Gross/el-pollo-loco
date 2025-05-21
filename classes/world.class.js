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


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.checkCollisions();
    }


    addGameObjects() {
        this.addObjectToMap(this.level.backgroundObjects);
        this.addObjectToMap(this.level.clouds);
        this.addObjectToMap(this.level.throwableObjects);
        this.addObjectToMap(this.level.coins);
        this.addObjectToMap(this.level.enemies);
        this.addToMap(this.character)
    }


    addObjectToMap(object) {
        object.forEach(o => {
            this.addToMap(o);
        })
    }

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


    characterJumpOnEnemy(enemy) {
        enemy.getHit();
        this.character.removeIntervalById(this.character.jumpInterval)
        this.character.handleJumpAnimation(false);
    }


    checkCollisions() {
        this.checkCollisionsInterval = setInterval(() => {
            this.checkCollisionsCharacterEnemies();
            this.checkCollisionsCharacterCollectables();
        }, 1000 / maxFPS)
        this.pushToAllIntervals(this.checkCollisionsInterval);
    }


    checkCollisionsCharacterCollectables() {
        this.checkCollisionsCharacterThrowableObjects();
        this.checkCollisionsCharacterCoins();
    }


    checkCollisionsCharacterCoins() {
        this.level.coins.forEach((coin) => {
            if (this.character.isColliding(coin) && !coin.isCollected) {
                coin.collecting(1, 'coins', 20);
            }
        })
    }


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


    checkCollisionsCharacterThrowableObjects() {
        this.level.throwableObjects.forEach((to) => {
            if (this.character.isColliding(to) && !to.isCollected) {
                if (!to.isThrown) {
                    to.collecting(2, 'bottles', 20);
                }
            }
        })
    }


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


    enemyHitCharacter(enemy) {
        const hitFromRight = this.character.isHitFromRight(enemy);
        this.character.getHit(hitFromRight);
    }


    flipCtx(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }


    flipCtxBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }


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


    setWorld() {
        this.character.world = this;
        this.setWorldInStatusbars();
        this.setWorldInThrowableObjects();
        this.setWorldInCoins();
        this.setWorldInEnemies()
    }


    setWorldInCoins() {
        this.level.coins.forEach((o) => {
            o.world = this;
        })
    }


    setWorldInEnemies() {
        this.level.enemies.forEach((enemy) => {
            enemy.world = this;
            enemy.animate()
        })
    }


    setWorldInStatusbars() {
        this.statusBars.forEach((statusBar) => {
            statusBar.world = this
        });
    }


    setWorldInThrowableObjects() {
        this.level.throwableObjects.forEach((o) => {
            o.world = this;
        })
    }
}