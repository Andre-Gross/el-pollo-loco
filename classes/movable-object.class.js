class MovableObject extends DrawableObject {
    currentImage = 0;
    IMAGES_WALK;

    groundLevel = canvasHeight * 415 / 480;

    otherDirection = false;
    speedXPerSecond;
    speedXPerFrame;
    speedY = 0;
    acceleration = 0.35;

    imgOffsetStandard = {};
    imgOffsetCanvas = {};

    health = 100;
    lastHit = 0;

    world;


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


    handleStatusPercentage(id, amountOfItems, valuePerItem = 20) {
        const statusbar = this.world.statusBar[id];
        const percentage = amountOfItems * valuePerItem;
        statusbar.setPercentage(percentage);
    }


    hit(damage = 10) {
        this.health -= damage;
        if (this.health < 0) {
            this.health = 0;
        } else {
            world.statusBar[0].setPercentage(this.health)
            this.lastHit = new Date().getTime();
        }
    }


    isDead() {
        return this.health == 0;
    }


    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }


    isAboveGround() {
        return this.y + this.height - this.imgOffsetCanvas.bottom < this.groundLevel;
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


    returnVisibleWidth() {
        return this.width - this.imgOffsetCanvas.right - this.imgOffsetCanvas.left;
    }


    returnVisibleHeight() {
        return this.height - this.imgOffsetCanvas.bottom - this.imgOffsetCanvas.top;
    }
}