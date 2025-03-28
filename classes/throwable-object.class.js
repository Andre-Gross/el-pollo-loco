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

    lastThrow = 0;

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

        this.x = this.randomizeSpwanX(endOfX);
        this.y = this.calculateY();
    }


    animate() {
        setInterval(() => {
            this.x += this.speedXPerFrame;
        }, 1000 / maxFPS);

        setInterval(() => {
            this.playAnimation(this.IMAGES_THROW);
        }, 600 / this.IMAGES_THROW.length)
    }


    isThrown() {
        let timepassed = new Date().getTime() - this.lastThrow;
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }


    throw(i) {
        const character = this.world.character;

        this.x = character.returnVisibleMiddleXOfObject();
        this.y = character.returnVisibleMiddleYOfObject();
        this.height = this.originalImgHeight * backgroundHeightFactor * 0.4;
        this.width = this.originalImgWidth * this.height / this.originalImgHeight;
        this.lastThrow = new Date().getTime();
        this.playAnimation(this.IMAGES_THROW);
        this.jump(5);
        this.applyGravity();

        this.animate()
        // setTimeout(() => {
        //     this.world.level.throwableObjects.splice(i, 1);
        // }, 1000)
    }
}

