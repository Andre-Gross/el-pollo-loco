class Endboss extends MovableObject {
    standartEndbossHeight = 1217;
    height = this.standartEndbossHeight * 0.4;
    width = 1045 * this.height / this.standartEndbossHeight;

    x = 45;
    differenceOfYToCharacter = - 840 + this.standartEndbossHeight - this.height - (125 - 125 * this.height / this.standartEndbossHeight);

    IMAGES_ALERT = [
        'assets/img/4_enemie_boss_chicken/2_alert/G5.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G6.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G7.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G8.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G9.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G10.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G11.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G12.png',
    ]

    constructor() {
        super().loadImage('assets/img/4_enemie_boss_chicken/2_alert/G5.png');
        this.loadImages(this.IMAGES_ALERT);
        this.x = 2700 / backgroundStandartHeight * canvasHeight;
        this.y = this.y + this.differenceOfYToCharacter;

        this.animate()

    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_ALERT);
        }, 1200 / this.IMAGES_ALERT.length)
    }
}