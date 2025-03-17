class MovableObject extends DrawableObject {

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

    energy = 100;
    lastHit = 0;


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


    drawFrame(ctx) {
        if (this instanceof (Character || Chicken || Endboss))
            ctx.beginPath();
        ctx.lineWidth = '1.5';
        ctx.strokeStyle = 'blue';
        ctx.rect(
            this.returnVisibleStartX(),
            this.returnVisibleStartY(),
            this.returnVisibleWidth() ,
            this.returnVisibleHeight());
        ctx.stroke();
    }


    hit(damage = 10) {
        this.energy -= damage;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }


    isDead() {
        return this.energy == 0;
    }


    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }


    isAboveGround() {
        return this.y + this.height < this.groundLevel;
    }


    isColliding(mo) {
        return (this.returnVisibleStartX() < mo.returnVisibleStartX() + mo.returnVisibleWidth() &&
            this.returnVisibleStartY() < mo.returnVisibleStartY() + mo.returnVisibleHeight()  &&
            this.returnVisibleStartX() + this.returnVisibleWidth() > mo.returnVisibleStartX() &&
            this.returnVisibleStartY() + this.returnVisibleHeight() > mo.returnVisibleStartY())
    }


    jump(speedY = 10) {
        this.speedY = speedY;
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


    returnVisibleStartX() {
        return this.x + this.imgOffsetCanvas.left;
    }


    returnVisibleStartY() {
        return this.y + this.imgOffsetCanvas.top;
    }


    returnVisibleWidth() {
        return this.width - this.imgOffsetCanvas.right - this.imgOffsetCanvas.left;
    }


    returnVisibleHeight() {
        return this.height - this.imgOffsetCanvas.bottom - this.imgOffsetCanvas.top;
    }
}