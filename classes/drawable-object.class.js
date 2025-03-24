class DrawableObject {

    originalImgHeight;
    originalImgWidth;

    height;
    width;

    imgOffsetOriginal = {
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
        if (this.isObjectWithFrame()) {
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


    isObjectWithFrame() {
        return this instanceof Character || this instanceof Chicken || this instanceof Endboss || this instanceof ThrowableObject
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
            left: this.imgOffsetOriginal.left * this.height / this.originalImgHeight,
            top: this.imgOffsetOriginal.top * this.height / this.originalImgHeight,
            right: this.imgOffsetOriginal.right * this.height / this.originalImgHeight,
            bottom: this.imgOffsetOriginal.bottom * this.height / this.originalImgHeight
        };
    }
}