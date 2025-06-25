class Coin extends CollectableObjects {

    BASE_Y_OFFSET = 200;

    originalImgHeight = 301;
    originalImgWidth = 300;
    sizeFactor = 1;

    imgOffsetOriginal = {
        left: 105,
        top: 104,
        right: 105,
        bottom: 104
    };

    img = './assets/img/8_coin/coin_2.png'


    /**
     * Creates a new Coin object and initializes its image, size, and position.
     * @param {number} endOfX - The maximum X-coordinate within which the coin can spawn.
     */
    constructor(endOfX) {
        super()
        this.loadImage(this.img);
        this.endOfX = endOfX;

        this.height = this.calculateHeight();
        this.width = this.calculateWidth()
        this.imgOffsetCanvas = this.scaleImgOffset()

        this.init(endOfX);
    }


    /**
     * Initializes the coin by setting its size and random position.
     * @param {number} [endOfX=this.endOfX] - The optional X-bound for random placement.
     */
    init(endOfX = this.endOfX) {
        this.setSizes();

        this.x = this.randomizeSpwanX(endOfX);
        this.y = this.randomizeSpawnY()

        this.isCollected = false;
    }


    /**
     * Calculates a random Y position for the coin within vertical bounds.
     * Takes into account the background scale and coin size.
     * @returns {number} The randomized Y position.
     */
    randomizeSpawnY() {
        const startY = this.BASE_Y_OFFSET * backgroundHeightFactor

        return startY + Math.random() * (this.groundLevel - startY - this.imgOffsetCanvas.top - this.returnVisibleHeight())
    }
}

