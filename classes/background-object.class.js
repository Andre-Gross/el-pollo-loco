class BackgroundObject extends MovableObject {
    y = 0;
    position;
    

    /**
     * Creates a background object at a given position with a given image.
     * @param {string} imagePath - The path to the background image.
     * @param {number} [position=0] - Relative horizontal position (0 = first, 1 = second, etc.).
     */
    constructor(imagePath, position = 0) {
        super().loadImage(imagePath);
        this.position = position;

        this.setSize();
        this.setPositionOfObject();
    }


    /**
     * Sets the X position of the background object based on its position index.
     * @param {number} [position=this.position] - Index of the background repetition.
     */
    setPositionOfObject(position = this.position) {
        this.x = (backgroundImgOriginalWidth * position * backgroundHeightFactor) - position;
    }


    /**
     * Sets the size of the background object to match the canvas height,
     * scaling the width proportionally.
     */
    setSize() {
        const originalImgWidth = 3840;
        this.height = canvasHeight;
        this.width = (originalImgWidth * backgroundHeightFactor);
    }
}