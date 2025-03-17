class MovableObject {

    standartImgHeight;
    standartImgWidth;
    height = 150;
    width = 50;

    img;
    imgCache = [];
    currentImage = 0;
    IMAGES_WALK;

    imgOffset = {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
    };

    groundLevel = canvasHeight * 426.66666667 / 480;
    x = 120;
    y;


    otherDirection = false;
    speedXPerSecond;
    speedXPerFrame;
    speedY = 0;
    acceleration = 0.35;

    imgOffsetStandard = {};
    imgOffsetCanvas = {};


    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            } else if (!this.isAboveGround() && this.speedY < 0) {
                this.y = this.groundLevel - this.height;
            }
        }, 1000 / maxFPS);
    }


    calculateY() {
        return this.groundLevel - (this.height - this.imgOffsetCanvas.bottom);
    }


    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    }


    drawFrame(ctx) {
        ctx.beginPath();
        ctx.lineWidth = '1.5';
        ctx.strokeStyle = 'blue';
        ctx.rect(
            this.x + this.imgOffsetCanvas.left,
            this.y + this.imgOffsetCanvas.top,
            this.width - this.imgOffsetCanvas.right - this.imgOffsetCanvas.left,
            this.height - this.imgOffsetCanvas.bottom - this.imgOffsetCanvas.top);
        ctx.stroke();
    }


    isAboveGround() {
        return this.y + this.height < this.groundLevel;
    }


    jump(speedY = 10) {
        this.speedY = speedY;
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


    moveLeft() {
        this.x -= this.speedXPerFrame;
        this.otherDirection = true;
    }


    moveRight() {
        this.x += this.speedXPerFrame;
        this.otherDirection = false;
    }


    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imgCache[path];
        this.currentImage++
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