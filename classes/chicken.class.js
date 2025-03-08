class Chicken extends MovableObject {
    standartImgHeight = 243;
    

    height = this.standartImgHeight / backgroundStandartHeight * canvasHeight * 0.5;
    width = 248 * this.height / this.standartImgHeight;

    differenceOfYToCharacter = 34 + this.standartImgHeight - this.height - (23 - 23 * this.height / this.standartImgHeight);

    x = 45;

    constructor() {
        super().loadImage('./assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png')

        this.x = 200 + Math.random() * 500;
        this.y = this.y + this.differenceOfYToCharacter;

        this.animate();
    }

    animate() {
        setInterval(() => {
            this.x = this.x - 12 / 60
        }, 1000 / 60);
    }
}