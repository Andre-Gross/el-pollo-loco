class LostOverlay extends OverlayObject {
    height = 0;
    width = 0;


    imageDatas = [
        {
            imagePath: './assets/img/You won, you lost/Game over A.png',
            originalWidth: 342,
            originalHeight: 385,
            sizeFactor: 2
        }, {
            imagePath: './assets/img/You won, you lost/Game Over.png',
            originalWidth: 1143,
            originalHeight: 674,
            sizeFactor: 0.8
        }, {
            imagePath: './assets/img/You won, you lost/You lost b.png',
            originalWidth: 1088,
            originalHeight: 438,
            sizeFactor: 0.6
        }, {
            imagePath: './assets/img/You won, you lost/You lost.png',
            originalWidth: 1472,
            originalHeight: 675,
            sizeFactor: 0.5
        }
    ]


    constructor() {
        super()
        const imageData = this.choosePicture();
        
        this.loadImage(imageData.imagePath);
        this.originalImgHeight = imageData.originalHeight;
        this.sizeFactor = imageData.sizeFactor;
        this.height = this.calculateHeight(imageData.originalWidth);
        this.width = this.calculateWidth(imageData.originalWidth);

        this.x = (canvasWidth - this.width) / 2;
        this.y = (canvasHeight - this.height) / 2;
    }


    choosePicture() {
        let num = Math.random() * 4;
        num = Math.round(num);
        if (num === 4) {
            num = 0;
        }

        return this.imageDatas[num];
    }
}