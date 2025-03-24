class BottleStatusbar extends Statusbar {
    IMAGES = [
        './assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png',
        './assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png',
        './assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png',
        './assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png',
        './assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png',
        './assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png',
    ]
    percentage = 0;


    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.height = this.originalImgHeight * backgroundHeightFactor * 0.7;
        this.width = this.originalImgWidth * this.height / this.originalImgHeight;
        this.y += 2 * (this.height - 5);
        this.setPercentage(0);
    }
}