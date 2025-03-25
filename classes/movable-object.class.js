class MovableObject extends DrawableObject {

    health = 100;
    lastHit = 0;

    groundLevel = canvasHeight * 415 / 480;

    speedXPerSecond;
    speedXPerFrame;
    speedY = 0;
    acceleration = 0.35;

    otherDirection = false;
    currentImage = 0;

    IMAGES_WALK;


    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            } else if (!this.isAboveGround() && this.speedY < 0) {
                this.y = this.calculateY();
            }
        }, 1000 / maxFPS);
    }


    calculateY() {
        return this.groundLevel - (this.height - this.imgOffsetCanvas.bottom);
    }


    calculateSpeedPerFrame(speedPerSecond) {
        return speedPerSecond / maxFPS;
    }


    drawFrame(ctx) {
        if (this.isObjectWithFrame()) {
            ctx.beginPath();
            ctx.lineWidth = '1.5';
            ctx.strokeStyle = 'blue';
            ctx.rect(...this.returnRectDatas());
            ctx.stroke();
        }
    }


    handleStatusPercentage(id, amountOfItems, valuePerItem = 20) {
        const statusbar = this.world.statusBars[id];
        const percentage = amountOfItems * valuePerItem;
        statusbar.setPercentage(percentage);
    }


    hit(damage = 10) {
        this.health -= damage;
        if (this.health < 0) {
            this.health = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }


    isAboveGround() {
        return this.y + this.height - this.imgOffsetCanvas.bottom < this.groundLevel;
    }


    isColliding(mo) {
        return (
            this.returnVisibleStartX() < mo.returnVisibleStartX() + mo.returnVisibleWidth() &&
            this.returnVisibleStartY() < mo.returnVisibleStartY() + mo.returnVisibleHeight() &&
            this.returnVisibleStartX() + this.returnVisibleWidth() > mo.returnVisibleStartX() &&
            this.returnVisibleStartY() + this.returnVisibleHeight() > mo.returnVisibleStartY()
        )
    }

    isJumpOn(mo) {
        return (
            this.returnVisibleEndY() - mo.returnVisibleStartY() <
            (this.returnVisibleEndY() - mo.returnVisibleEndY()) * -1) &&
            !this.isHurt()
    }


    isDead() {
        return this.health == 0;
    }


    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1;
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


    randomizeSpwanX(endOfX) {
        return 200 + Math.random() * (endOfX - 800)
    }


    returnRectDatas() {
        return [
            this.returnVisibleStartX(),
            this.returnVisibleStartY(),
            this.returnVisibleWidth(),
            this.returnVisibleHeight()
        ];
    }


    returnVisibleStartX() {
        return this.x + this.imgOffsetCanvas.left;
    }


    returnVisibleStartY() {
        return this.y + this.imgOffsetCanvas.top;
    }


    returnVisibleMiddleXOfObject() {
        return (2 * this.returnVisibleStartX() + this.returnVisibleWidth()) / 2
    }


    returnVisibleMiddleYOfObject() {
        return (2 * this.returnVisibleStartY() + this.returnVisibleHeight()) / 2
    }


    returnVisibleEndX() {
        return this.returnVisibleStartX() + this.returnVisibleWidth()
    }


    returnVisibleEndY() {
        return this.returnVisibleStartY() + this.returnVisibleHeight()
    }


    returnVisibleWidth() {
        return this.width - this.imgOffsetCanvas.right - this.imgOffsetCanvas.left;
    }


    returnVisibleHeight() {
        return this.height - this.imgOffsetCanvas.bottom - this.imgOffsetCanvas.top;
    }
}