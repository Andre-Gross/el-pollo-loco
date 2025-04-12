class Endboss extends MovableObject {
    originalImgHeight = 1217;
    originalImgWidth = 1045;
    
    height = this.calculateHeight();
    width = this.calculateWidth();

    x = 45;
    y;

    imgOffsetOriginal = {
        left: 187,
        top: 468,
        right: 139,
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