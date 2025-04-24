class World {
    height = 480;

    startScreen = new StartScreen();

    character = new Character();
    statusBars = [
        new HealthStatusbar(),
        new CoinStatusbar(),
        new BottleStatusbar()
    ];
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;

    isGameStarted = false;


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.checkCollisions();
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


    checkCollisions() {
        setInterval(() => {
            this.level.enemies.forEach((enemy) => {
                if (!enemy.isDead()) {
                    if (this.character.isColliding(enemy)) {
                        if (this.character.isJumpOn(enemy)) {
                            enemy.getHit();
                            clearInterval(this.character.jumpInterval);
                            this.character.handleJumpAnimation(false);
                        } else {
                            const hitFromRight = this.character.isHitFromRight(enemy);
                            this.character.getHit(hitFromRight);
                        }
                    }
                }
            })
            this.level.throwableObjects.forEach((bottle) => {
                if (this.character.isColliding(bottle) && !bottle.isCollected) {
                    if (!bottle.isThrown) {
                        bottle.collecting(2, 'bottles', 20);
                    }
                }
            })
            this.level.coins.forEach((coin) => {
                if (this.character.isColliding(coin) && !coin.isCollected) {
                    coin.collecting(1, 'coins', 20);
                }
            })
        }, 1000 / maxFPS)
    }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.ctx.translate(this.camera_x, 0);

        if (this.isGameStarted) {


            this.addObjectToMap(this.level.backgroundObjects);
            this.addObjectToMap(this.level.clouds);
            this.addObjectToMap(this.level.throwableObjects);
            this.addObjectToMap(this.level.coins);
            this.addObjectToMap(this.level.enemies);
            this.addToMap(this.character)

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


    setWorld() {
        this.character.world = this;
        this.statusBars.forEach((statusBar) => {
            statusBar.world = this
        });
        this.level.throwableObjects.forEach((o) => {
            o.world = this;
        })
        this.level.coins.forEach((o) => {
            o.world = this;
        })
        this.level.enemies.forEach((enemy) => {
            enemy.world = this;
            enemy.animate()
        })
    }
}