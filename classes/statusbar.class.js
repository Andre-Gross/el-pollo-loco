class Statusbar extends DrawableObject {
    standartImgHeight = 158;
    standartImgWidth = 595;

    height = this.standartImgHeight * backgroundHeightFactor;
    width = this.standartImgWidth * this.height / this.standartImgHeight;

    x = 10;
    y = 0;

    // imgOffsetStandard = {
    //     left: 15,
    //     top: 53,
    //     right: 9,
    //     bottom: 22
    // };
    // imgOffsetCanvas = this.scaleImgOffset();

    percentage;

    character = {
        x : 0
    };


    setPercentage(percentage) {
        this.percentage = percentage;
        let imagePath = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imgCache[imagePath];
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
}