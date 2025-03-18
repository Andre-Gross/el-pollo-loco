class DrawableObject {

    standartImgHeight;
    standartImgWidth;

    height;
    width;

    imgOffsetStandard = {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
    };
    imgOffsetCanvas = this.scaleImgOffset();

    img;
    imgCache = [];
    currentImage = 0;

    x;
    y;


    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    }


    drawFrame(ctx) {
        if (this instanceof (Character || Chicken || Endboss)) {
            ctx.beginPath();
            ctx.lineWidth = '1.5';
            ctx.strokeStyle = 'blue';
            ctx.rect(
                this.returnVisibleStartX(),
                this.returnVisibleStartY(),
                this.returnVisibleWidth(),
                this.returnVisibleHeight());
            ctx.stroke();
        }
    }


    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }


    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imgCache[path] = img;
        });
    }


    scaleImgOffset() {
        return {
            left: this.imgOffsetStandard.left * this.height / this.standartImgHeight,
            top: this.imgOffsetStandard.top * this.height / this.standartImgHeight,
            right: this.imgOffsetStandard.right * this.height / this.standartImgHeight,
            bottom: this.imgOffsetStandard.bottom * this.height / this.standartImgHeight
        };
    }
}