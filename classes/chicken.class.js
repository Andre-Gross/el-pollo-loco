class Chicken extends MovableObject {
    standartImgHeight = 243;
    standartImgWidth = 248;
    height = this.standartImgHeight * backgroundHeightFactor * 0.5;
    width = this.standartImgWidth * this.height / this.standartImgHeight;

    x = 45;
    differenceOfYToCharacter = 34 + this.standartImgHeight - this.height - (23 - 23 * this.height / this.standartImgHeight);

    minSpeedXPerSecond = 6;
    maxAdditionalSpeedXPerSecond = 18;

    imgOffsetStandard = {
        left: 7,
        top: 15,
        right: 6,
        bottom: 23
    };
    imgOffsetCanvas = this.scaleImgOffset();

    IMAGES_WALK = [
        './assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        './assets/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
        './assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        './assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
    ];

    world;


    constructor() {
        super().loadImage('./assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png')
        this.loadImages(this.IMAGES_WALK);

        this.x = 200 + Math.random() * 500;
        this.y = this.calculateY();
        this.speedX = (this.minSpeedXPerSecond + Math.random() * this.maxAdditionalSpeedXPerSecond) / maxFPS;

        this.animate();
    }

    animate() {
        setInterval(() => {
            this.x -= this.speedX;
        }, 1000 / maxFPS);

        setInterval(() => {
            this.playAnimation(this.IMAGES_WALK);
        }, 600 / this.IMAGES_WALK.length)
    }
}