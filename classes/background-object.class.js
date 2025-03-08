class BackgroundObject extends MovableObject {
    height = canvasHeight;
    width = (3840 * this.height / backgroundStandartHeight);

    constructor(imagePath, x = 0) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = 480 - this.height;
    }
}