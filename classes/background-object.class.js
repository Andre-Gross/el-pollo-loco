class BackgroundObject extends MovableObject {
    y = 0
    position

    imOffsetCanvas = {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
    };

    constructor(imagePath, position = 0) {
        super().loadImage(imagePath);
        this.position = position;

        this.setSizeOfObject();
        this.setPositionOfObject();
    }


    setSizeOfObject() {
        this.height = canvasHeight;
        this.width = (3840 * this.height / backgroundImgOriginalHeight);
    }


    setPositionOfObject(position = this.position) {
        this.x = backgroundImgOriginalWidth * position * this.height / backgroundImgOriginalHeight - (position);
    }
}