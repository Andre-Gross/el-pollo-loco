class WinOverlay extends OverlayObject {
        height = 0;
    width = 0;


    imageDatas = [
        {
            imagePath: './assets/img/You won, you lost/You Win A.png',
            originalWidth: 905,
            originalHeight: 879,
            sizeFactor: 1
        }, {
            imagePath: './assets/img/You won, you lost/You win B.png',
            originalWidth: 905,
            originalHeight: 203,
            sizeFactor: 0.4
        }, {
            imagePath: './assets/img/You won, you lost/You won A.png',
            originalWidth: 987,
            originalHeight: 879,
            sizeFactor: 1
        }, {
            imagePath: './assets/img/You won, you lost/You Won B.png',
            originalWidth: 987,
            originalHeight: 207,
            sizeFactor: 0.4
        }
    ]


    /**
     * Constructs a new WinOverlay and initializes it.
     */
    constructor() {
        super()
        this.init();
    }
}