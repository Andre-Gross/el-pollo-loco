class Chicken extends MovableObject {
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

    x = this.calculateX();
    y = this.calculateY();

    minSpeedXPerSecond = 6;
    maxAdditionalSpeedXPerSecond = 18;
    
    speedXPerFrame = this.calculateSpeedPerFrame();

    IMAGES_WALK = [
        './assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        './assets/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
        './assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        './assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
    ];


    constructor() {
        super().loadImage('./assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png')
        this.loadImages(this.IMAGES_WALK);

        this.animate();
    }

    animate() {
        setInterval(() => {
            this.x -= this.speedXPerFrame;
        }, 1000 / maxFPS);

        setInterval(() => {
            this.playAnimation(this.IMAGES_WALK);
        }, 600 / this.IMAGES_WALK.length)
    }


    calculateX() {
        return 200 + Math.random() * 500;
    }


    calculateSpeedPerFrame() {
        return (this.minSpeedXPerSecond + Math.random() * this.maxAdditionalSpeedXPerSecond) / maxFPS;
    }
}