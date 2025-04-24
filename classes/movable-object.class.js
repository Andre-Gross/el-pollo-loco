class MovableObject extends DrawableObject {

    health = 100;
    lastHit = 0;

    groundLevel = canvasHeight * 415 / 480;

    speedXPerSecond;
    standartSpeedXPerFrame;
    speedXPerFrame;
    speedY = 0;
    acceleration = 0.35;

    otherDirection = false;
    currentImage = 0;
    currentAnimation;
    positionInterval;
    gravityInterval;
    imageInterval;
    timeForFullAnimation;
    pictureForCurrentAnimation;

    IMAGES_WALK;


    alignSelfTo(mo) {
        const middleOfThis = this.returnVisibleMiddleXOfObject();
        const middleOfObject = mo.returnVisibleMiddleXOfObject();
        if (Math.abs(middleOfThis - middleOfObject) < 50) {
            this.speedXPerFrame = 0;
        } else if (middleOfThis >= middleOfObject) {
            this.otherDirection = false;
            this.speedXPerFrame = this.standartSpeedXPerFrame
        } else {
            this.otherDirection = true;
            this.speedXPerFrame = -this.standartSpeedXPerFrame
        }
    }


    applyGravity() {
        this.gravityInterval = setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            } else if (!this.isAboveGround() && this.speedY < 0) {
                this.y = this.calculateY();
            }
        }, 1000 / maxFPS);
    }


    calculateDistanceTo(mo) {
        const distance = Math.abs(this.x - mo.x);
        return distance;
    }


    calculateSpeedPerFrame(speedPerSecond) {
        return speedPerSecond / maxFPS;
    }


    calculateY() {
        return this.groundLevel - (this.height - this.imgOffsetCanvas.bottom);
    }


    clearAnimation() {
        clearInterval(this.imageInterval);
        clearInterval(this.positionInterval)
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


    standOnGround() {
        return this.returnVisibleEndY() >= this.groundLevel;
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


    isCurrentAnimationRightAnimation(pictureSet) {
        return this.picturesForCurrentAnimation === pictureSet
    }


    isJumpOn(mo) {
        return (
            this.returnVisibleEndY() - mo.returnVisibleStartY() <
            (this.returnVisibleEndY() - mo.returnVisibleEndY()) * -1) &&
            this.speedY < 0
    }


    isDead() {
        return this.health <= 0;
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


    playAnimation(images, i) {
        if (!i) {
            i = this.currentImage % images.length;
        }
        let path = images[i];
        this.img = this.imgCache[path];
        this.currentImage++
    }


    playRightAnimation(time, pictureSet, index) {
        if (!this.isCurrentAnimationRightAnimation(pictureSet)) {
            this.resetAnimationImages(time, pictureSet)
        }
        this.playAnimation(pictureSet, index)
    }


    randomizeSpwanX(endOfX) {
        return 200 + Math.random() * (endOfX - 800)
    }


    resetAnimationImages(time, pictureSet) {
        this.timeForFullAnimation = time;
        this.picturesForCurrentAnimation = pictureSet;
        this.clearAnimation();
        this.animate();
    }


    isHitFromRight(mo) {
        if (this.x < mo.x) {
            return true;
        } else {
            return false;
        }
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