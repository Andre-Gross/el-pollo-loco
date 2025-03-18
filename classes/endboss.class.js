class Endboss extends MovableObject {
    standartImgHeight = 1217;
    standartImgWidth = 1045;
    height = this.standartImgHeight * 0.4;
    width = this.standartImgWidth * this.height / this.standartImgHeight;

    x = 45;
    y;
    differenceOfYToCharacter = - 840 + this.standartImgHeight - this.height - (125 - 125 * this.height / this.standartImgHeight);

    imgOffsetStandard = {
        left: 0,
        top: 0,
        right: 0,
        bottom: 125
    };

    imgOffsetCanvas = this.scaleImgOffset();

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
        this.x = 2700 / backgroundImgOriginalHeight * canvasHeight;
        this.y = this.calculateY();

        this.animate()

    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_ALERT);
        }, 1200 / this.IMAGES_ALERT.length)
    }
}