class DrawableObject {
    endOfX;

    originalImgHeight;
    originalImgWidth;
    sizeFactor;

    height
    width

    imgOffsetOriginal = {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
    };
    imgOffsetCanvas = {}

    img;
    imgCache = [];
    currentImage = 0;

    x;
    y;


    calculateHeight() {
        return this.originalImgHeight * backgroundHeightFactor * this.sizeFactor
    }


    calculateWidth() {
        return this.originalImgWidth * this.height / this.originalImgHeight
    }


    setSizes() {
        this.height = this.calculateHeight();
        this.width = this.calculateWidth();
    }


    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    }


    isObjectWithFrame() {
        return this instanceof Character || this instanceof Chicken || this instanceof Endboss || this instanceof ThrowableObject
    }


    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
        this.imgCache[path] = this.img;
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