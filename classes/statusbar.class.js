class Statusbar extends MovableObject {

    percentage;

    originalImgHeight = 158;
    originalImgWidth = 595;
    sizeFactor = 0.7;

    height;
    width;

    position;
    x = 10;
    y;

    world;


    /**
     * Calculates the percentage of a value in relation to a maximum value.
     * @param {number} currentValue - The current value.
     * @param {number} maxValue - The maximum value.
     * @returns {number} Percentage value (0–100).
     */
    calculatePercentage(currentValue, maxValue) {
        return currentValue / maxValue * 100;
    }


    /**
     * Calculates the Y position of the status bar based on its vertical position index.
     * @param {number} position - The vertical position index.
     * @returns {number} The Y offset for the status bar.
     */
    calculateY(position) {
        return position * (this.height - 5)
    }


    /**
     * Determines the image index based on the current percentage.
     * @returns {number} Image index (0–5) corresponding to the percentage level.
     */
    resolveImageIndex() {
        if (this.percentage >= 100) {
            return 5;
        } else if (this.percentage >= 80) {
            return 4;
        } else if (this.percentage >= 60) {
            return 3;
        } else if (this.percentage >= 40) {
            return 2;
        } else if (this.percentage >= 20) {
            return 1;
        } else {
            return 0;
        }
    }


    /**
     * Updates the status bar image according to the new percentage.
     * @param {number} percentage - The current fill level in percent.
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let imagePath = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imgCache[imagePath];
    }
}