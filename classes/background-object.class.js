class BackgroundObject extends MovableObject {
    height = canvasHeight;
    width = (3840 * this.height / backgroundImgOriginalHeight);

    imOffsetCanvas = {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
      };

    constructor(imagePath, x = 0) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = 480 - this.height;
    }
}