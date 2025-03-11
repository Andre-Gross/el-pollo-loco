class World {
    height = 480;

    character = new Character();
    enemies = [
        new Chicken(),
        new Chicken(),
        new Chicken(),
    ]
    backgroundObjects = [
        new BackgroundObject('./assets/img/5_background/layers/air.png', -(3840 * canvasHeight / backgroundStandartHeight) + 1),
        new BackgroundObject('./assets/img/5_background/layers/3_third_layer/full.png', -(3840 * canvasHeight / backgroundStandartHeight) + 1),
        new BackgroundObject('./assets/img/5_background/layers/2_second_layer/full.png', -(3840 * canvasHeight / backgroundStandartHeight) + 1),
        new BackgroundObject('./assets/img/5_background/layers/1_first_layer/full.png', -(3840 * canvasHeight / backgroundStandartHeight) + 1),
        new BackgroundObject('./assets/img/5_background/layers/air.png'),
        new BackgroundObject('./assets/img/5_background/layers/3_third_layer/full.png'),
        new BackgroundObject('./assets/img/5_background/layers/2_second_layer/full.png'),
        new BackgroundObject('./assets/img/5_background/layers/1_first_layer/full.png'),
        new BackgroundObject('./assets/img/5_background/layers/air.png', (3840 * canvasHeight / backgroundStandartHeight) - 2),
        new BackgroundObject('./assets/img/5_background/layers/3_third_layer/full.png', (3840 * canvasHeight / backgroundStandartHeight) - 2),
        new BackgroundObject('./assets/img/5_background/layers/2_second_layer/full.png', (3840 * canvasHeight / backgroundStandartHeight) - 2),
        new BackgroundObject('./assets/img/5_background/layers/1_first_layer/full.png', (3840 * canvasHeight / backgroundStandartHeight) - 2),
    ]
    clouds = [
        new Cloud()
    ]
    canvas
    ctx;
    keyboard;
    camera_x = 0;


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
    }


    setWorld() {
        this.character.world = this;
    }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

        this.ctx.translate(this.camera_x, 0);

        this.addObjectToMap(this.backgroundObjects);
        this.addObjectToMap(this.clouds);
        this.addObjectToMap(this.enemies);
        this.addToMap(this.character)

        this.ctx.translate(-this.camera_x, 0);


        let self = this;
        requestAnimationFrame(() => {
            self.draw()
        });
    }

    addToMap(mo) {
        if(mo.otherDirection) {
            this.flipCtx(mo)
        }
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height)

        if (mo.otherDirection) {
            this.flipCtxBack(mo)
        }
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


    addObjectToMap(object) {
        object.forEach(o => {
            this.addToMap(o);
        })
    }
}