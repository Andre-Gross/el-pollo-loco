class ThrowableObject extends CollectableObjects {

    originalImgHeight = 400;
    originalImgWidth = 400;
    sizeFactor = 0.4;

    height = this.calculateHeight();
    width = this.calculateWidth();

    x;
    y;

    speedXPerSecond = 300;
    speedXPerFrame = this.speedXPerSecond / maxFPS;
    speedY = 5;
    acceleration = 0.1;

    imgOffsetOriginal = {};

    imgOffsetOriginal_1SalsaBottle = {
        left: 177,
        top: 78,
        right: 75,
        bottom: 44
    };

    imgOffsetOriginal_2SalsaBottle = {
        left: 118,
        top: 78,
        right: 134,
        bottom: 44
    };

    isThrown = false;
    throwInterval;
    splashTimeFullAnimation = 600

    IMAGES_GROUND = [
        './assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        './assets/img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ]
    IMAGES_THROW = [
        './assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        './assets/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        './assets/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        './assets/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ]
    IMAGES_SPLASH = [
        './assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        './assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        './assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        './assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        './assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        './assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ]


    constructor(endOfX) {
        super()
        if (Math.random() > 0.5) {
            this.loadImage(this.IMAGES_GROUND[0]);
            this.imgOffsetOriginal = this.imgOffsetOriginal_1SalsaBottle;
            this.imgOffsetCanvas = this.scaleImgOffset();
        } else {
            this.loadImage(this.IMAGES_GROUND[1]);
            this.imgOffsetOriginal = this.imgOffsetOriginal_2SalsaBottle;
            this.imgOffsetCanvas = this.scaleImgOffset();
        }
        this.loadImages(this.IMAGES_THROW);
        this.loadImages(this.IMAGES_SPLASH);

        this.x = this.randomizeSpwanX(endOfX);
        this.y = this.calculateY();
    }


    animate() {
        this.positionInterval = setInterval(() => {
            this.x += this.speedXPerFrame;
        }, 1000 / maxFPS);

        this.imageInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_THROW);
        }, 600 / this.IMAGES_THROW.length)
    }


    clearAllIntervals() {
        this.clearAnimation();
        clearInterval(this.throwInterval);
        clearInterval(this.gravityInterval);
    }


    isAboveGround() {
        return this.returnVisibleMiddleYOfObject() < this.groundLevel;
    }


    isColliding(mo) {
            return (
                this.returnVisibleMiddleXOfObject() < mo.returnVisibleStartX() + mo.returnVisibleWidth() &&
                this.returnVisibleMiddleYOfObject() < mo.returnVisibleStartY() + mo.returnVisibleHeight() &&
                this.returnVisibleMiddleXOfObject() > mo.returnVisibleStartX() &&
                this.returnVisibleMiddleYOfObject() > mo.returnVisibleStartY()
            )
    }


    handleCollidingWithEnemy(i) {
        this.throwInterval = setInterval(() => {
            this.world.level.enemies.forEach((enemy) => {
                if ((this.isColliding(enemy) && !enemy.isDead()) || this.standOnGround()) {
                    this.clearAllIntervals();
                    this.speedY = 0;
                    this.setSplashAnimation();
                    setTimeout(() => {
                        this.height = 0;
                        this.width = 0;
                    }, this.splashTimeFullAnimation - (this.splashTimeFullAnimation / this.IMAGES_SPLASH.length));
                }
            })
        })
    }


    setCoordinatesAndSizes() {
        const character = this.world.character;
        this.x = character.returnVisibleMiddleXOfObject();
        this.y = character.returnVisibleMiddleYOfObject();
        this.height = this.originalImgHeight * backgroundHeightFactor * 0.4;
        this.width = this.originalImgWidth * this.height / this.originalImgHeight;
    }


    setSplashAnimation() {
        this.imageInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_SPLASH);
        }, this.splashTimeFullAnimation / this.IMAGES_SPLASH.length)
    }
    

    standOnGround() {
        return this.returnVisibleMiddleYOfObject() >= this.groundLevel;
    }


    throw(i) {
        this.setCoordinatesAndSizes();
        this.isThrown = true;
        this.jump(5);
        this.applyGravity();

        this.animate()
        this.handleCollidingWithEnemy(i);
    }
}

