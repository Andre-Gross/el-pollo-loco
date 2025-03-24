class Statusbar extends DrawableObject {
    percentage;

    originalImgHeight = 158;
    originalImgWidth = 595;
    sizeFactor = 0.7;

    height = this.calculateHeight();
    width = this.calculateWidth();

    position;
    x = 10;
    y = 0;


    calculatePercentage(currentValue, maxValue) {
        return currentValue / maxValue * 100;
    }


    calculateY(position) {
        return this.y + position * (this.height - 5)
    }


    resolveImageIndex() {
        if (this.percentage >= 100) {
            return 5;
        } else if (this.percentage >= 80) {
            return 4;
        } else if (this.percentage >= 60) {
            return 3;
        } else if (this.percentage >= 40) {
            return 3;
        } else if (this.percentage >= 20) {
            return 2;
        } else {
            return 0;
        }
    }


    setPercentage(percentage) {
        this.percentage = percentage;
        let imagePath = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imgCache[imagePath];
    }
}