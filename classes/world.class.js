class World {
    height = 480;

    character = new Character();
    statusBar = [
        new HealthStatusbar(),
        new CoinStatusbar(),
        new BottleStatusbar()
    ];
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;


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
        mo.drawFrame(this.ctx);
    }


    checkCollisions() {
        setInterval(() => {
            this.level.enemies.forEach((enemy) => {
                if (this.character.isColliding(enemy)) {
                    this.character.hit();
                    console.log(this.character.energy);
                }
            })
        }, 200)
    }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

        this.ctx.translate(this.camera_x, 0);

        this.addObjectToMap(this.level.backgroundObjects);
        this.addObjectToMap(this.level.clouds);
        this.addObjectToMap(this.level.enemies);
        this.addToMap(this.character)

        this.ctx.translate(-this.camera_x, 0);
        this.addObjectToMap(this.statusBar);


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
        this.statusBar.character = this.character;
        this.level.enemies.forEach((enemy) => {
            enemy.world = this;
        })
    }
}