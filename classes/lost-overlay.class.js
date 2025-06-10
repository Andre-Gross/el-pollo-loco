class LostOverlay extends OverlayObject {
    height = 0;
    width = 0;


    imageDatas = [
        {
            imagePath: './assets/img/You won, you lost/Game over A.png',
            originalWidth: 342,
            originalHeight: 385
        }, {
            imagePath: './assets/img/You won, you lost/Game Over.png',
            originalWidth: 1143,
            originalHeight: 674
        }, {
            imagePath: './assets/img/You won, you lost/You lost b.png',
            originalWidth: 1088,
            originalHeight: 438
        }, {
            imagePath: './assets/img/You won, you lost/You lost.png',
            originalWidth: 1472,
            originalHeight: 675
        }
    ]


    constructor() {
        super()
        const imageData = this.choosePicture();
        
        this.loadImage(imageData.imagePath);
        this.originalImgHeight = imageData.originalHeight;
        this.height = this.calculateHeight(imageData.originalWidth);
        this.width = this.calculateWidth(imageData.originalWidth);

        this.x = (canvasWidth - this.width) / 2;
        this.y = (canvasHeight - this.height) / 2;
    }


    choosePicture() {
        let num = Math.random() * 4;
        num = Math.round(num);
        if (num = 0) {
            num = 4;
        }

        return this.imageDatas[num];
    }
}