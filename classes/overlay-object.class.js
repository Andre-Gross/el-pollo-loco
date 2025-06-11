class OverlayObject extends DrawableObject {
    sizeFactor = 2;


    init() {
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