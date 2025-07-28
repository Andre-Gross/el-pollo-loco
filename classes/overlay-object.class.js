class OverlayObject extends DrawableObject {
    sizeFactor = 2;


    /**
     * Initializes the overlay by choosing an image and calculating size and position.
     */
    init() {
        const imageData = this.choosePicture();

        this.loadImage(imageData.imagePath);
        this.originalImgHeight = imageData.originalHeight;
        this.originalImgWidth = imageData.originalWidth;
        this.sizeFactor = imageData.sizeFactor;
        this.height = this.calculateHeight();
        this.width = this.calculateWidth();

        this.x = (canvasWidth - this.width) / 2;
        this.y = (canvasHeight - this.height) / 2;
    }


    /**
     * Randomly selects an image data object from the available imageDatas array.
     * The imageDatas property must be defined in subclasses.
     * 
     * @returns {{imagePath: string, originalWidth: number, originalHeight: number, sizeFactor: number}} The selected image data.
     */
    choosePicture() {
        let num = Math.random() * 4;
        num = Math.round(num);
        if (num === 4) {
            num = 0;
        }

        return this.imageDatas[num];
    }

}