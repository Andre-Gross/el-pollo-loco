class Chicken extends MovableObject {
    standartChickenImgHeigt = 243;
    height = this.standartChickenImgHeigt / backgroundStandartHeight * canvasHeight * 0.5;
    width = 248 * this.height / this.standartChickenImgHeigt;

    x = 45;
    differenceOfYToCharacter = 34 + this.standartChickenImgHeigt - this.height - (23 - 23 * this.height / this.standartChickenImgHeigt);

    minSpeedPerSecond = 6;
    maxAdditionalSpeedPerSecond = 18;

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
        this.y = this.y + this.differenceOfYToCharacter;
        this.speed = (this.minSpeedPerSecond + Math.random() * this.maxAdditionalSpeedPerSecond) / maxFPS;

        this.animate();
    }

    animate() {
        setInterval(() => {
            this.x = this.x - this.speed
        }, 1000 / maxFPS);

        setInterval(() => {
            this.playAnimation(this.IMAGES_WALK);
        }, 600 / this.IMAGES_WALK.length)
    }
}