class Coin extends CollectableObjects {

    originalImgHeight = 301;
    originalImgWidth = 300;
    sizeFactor = 1;

    height = this.calculateHeight();
    width = this.calculateWidth()

    imgOffsetOriginal = {
        left: 105,
        top: 104,
        right: 105,
        bottom: 104
    };
    imgOffsetCanvas = this.scaleImgOffset()

    img = './assets/img/8_coin/coin_2.png'


    constructor(endOfX) {
        super()
        this.loadImage(this.img);

        this.x = this.randomizeSpwanX(endOfX);
        this.y = this.randomizeSpwanY()
    }


    randomizeSpwanY() {
        let startY = 200;
        startY = startY * backgroundHeightFactor


        return startY + Math.random() * (this.groundLevel - startY - this.imgOffsetCanvas.top - this.returnVisibleHeight())
    }
}

