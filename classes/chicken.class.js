class Chicken extends Enemy {
    standartHealth = 10;

    originalImgHeight = 243;
    originalImgWidth = 248;
    sizeFactor = 0.5;

    height = this.calculateHeight();
    width = this.calculateWidth();

    imgOffsetOriginal = {
        left: 7,
        top: 15,
        right: 6,
        bottom: 23
    };
    imgOffsetCanvas = this.scaleImgOffset();

    y = this.calculateY();

    minSpeedXPerSecond = 6;
    maxAdditionalSpeedXPerSecond = 18;

    standartSpeedXPerFrame = this.calculateSpeedPerFrame();
    speedXPerFrame = this.standartSpeedXPerFrame;

    endOfX
    

    IMAGES_WALK = [
        './assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        './assets/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
        './assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        './assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
    ];

    IMAGE_DEAD = './assets/img/3_enemies_chicken/chicken_normal/2_dead/dead.png'


    constructor(endOfX) {
        super()
        this.loadImage('./assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png')
        this.loadImage(this.IMAGE_DEAD);
        this.loadImages(this.IMAGES_WALK);
        this.endOfX = endOfX;

        this.init(endOfX);
    }


    animate() {
        this.addPositionInterval();
        this.addImageInterval();
    }


    addPositionInterval() {
        this.positionInterval = setInterval(() => {
            this.alignSelfTo(world.character)
            this.x -= this.speedXPerFrame;
        }, 1000 / maxFPS);
        this.pushToAllIntervals(this.positionInterval);
    }


    addImageInterval() {
        this.imageInterval = setInterval(() => {
            this.setAnimation();
        }, 600 / this.IMAGES_WALK.length)
        this.pushToAllIntervals(this.imageInterval);
    }


    calculateSpeedPerFrame() {
        return (this.minSpeedXPerSecond + Math.random() * this.maxAdditionalSpeedXPerSecond) / maxFPS;
    }


    getHit(damage = 10) {
        this.hit(damage);
        if (this.health === 0) {
            this.removeIntervalById(this.positionInterval);
        }
    }


    setAnimation() {
        if (this.isDead()) {
            this.img = this.imgCache[this.IMAGE_DEAD];
        } else if (this.speedXPerFrame === 0) {
            this.img = this.imgCache[this.IMAGES_WALK[0]];
        } else {
            this.playAnimation(this.IMAGES_WALK)
        }
    }
}