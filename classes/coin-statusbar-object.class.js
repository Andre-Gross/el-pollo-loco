class CoinStatusbar extends Statusbar {

    // imgOffsetStandard = {
    //     left: 15,
    //     top: 39,
    //     right: 9,
    //     bottom: 22
    // };
    // imgOffsetCanvas = this.scaleImgOffset();

    IMAGES = [
        './assets/img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png',
        './assets/img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png',
        './assets/img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png',
        './assets/img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png',
        './assets/img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png',
        './assets/img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png'
    ]
    percentage = 0;


    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.height = this.standartImgHeight * backgroundHeightFactor * 0.7;
        this.width = this.standartImgWidth * this.height / this.standartImgHeight;
        this.y += this.height - 5;
        this.setPercentage(0);
    }
}