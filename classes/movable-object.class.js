class MovableObject extends DrawableObject {

    standartHealth = 100;
    health;
    lastHit = 0;

    groundLevel = this.calculateGroundLevel();

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

    allIntervals = []

    IMAGES_WALK;


    /**
     * Starts an interval to update the object's position repeatedly
     * according to the current speed and direction.
     */
    addPositionInterval() {
        this.positionInterval = setInterval(() => {
            this.setPosition();
        }, 1000 / maxFPS);
        this.pushToAllIntervals(this.positionInterval);
    }


    /**
     * Starts an interval to update the object's animation frames
     * cycling through a given set of images within a specified animation duration.
     * 
     * @param {number} [timeForFullAnimation=this.timeForFullAnimation] - Total time for one animation loop.
     * @param {Array} [picturesForCurrentAnimation=this.picturesForCurrentAnimation] - Array of images for the animation.
     */
    addImageInterval(timeForFullAnimation = this.timeForFullAnimation, picturesForCurrentAnimation = this.picturesForCurrentAnimation) {
        this.imageInterval = setInterval(() => {
            this.setAnimation();
        }, timeForFullAnimation / picturesForCurrentAnimation.length)
        this.pushToAllIntervals(this.imageInterval);
    }


    /**
     * Aligns this object horizontally to another movable object.
     * Adjusts speed and facing direction to move toward or away from the target.
     * Stops movement if close enough horizontally.
     * 
     * @param {MovableObject} mo - The object to align to.
     */
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


    /**
     * Applies gravity by continuously updating vertical position and vertical speed.
     * Stops falling when the object reaches the ground level.
     */
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


    /**
     * Calculates the absolute horizontal distance to another movable object.
     * 
     * @param {MovableObject} mo - The other object.
     * @returns {number} Horizontal distance in pixels.
     */
    calculateDistanceTo(mo) {
        const distance = Math.abs(this.x - mo.x);
        return distance;
    }


    /**
     * Calculates the Y coordinate of the ground level based on canvas height.
     * 
     * @returns {number} Y coordinate representing ground level.
     */
    calculateGroundLevel() {
        return canvasHeight * 415 / 480
    }


    /**
     * Converts speed from units per second to units per frame
     * based on the configured frames per second.
     * 
     * @param {number} speedPerSecond - Speed in units per second.
     * @returns {number} Speed in units per frame.
     */
    calculateSpeedPerFrame(speedPerSecond) {
        return speedPerSecond / maxFPS;
    }


    /**
     * Calculates the Y coordinate where the object stands on the ground,
     * considering its height and image offsets.
     * 
     * @returns {number} Y coordinate for ground contact.
     */
    calculateY() {
        return this.groundLevel - (this.height - this.imgOffsetCanvas.bottom);
    }


    /**
     * Stops all animation-related intervals (image and position updates).
     */
    clearAnimation() {
        clearInterval(this.imageInterval);
        clearInterval(this.positionInterval)
    }


    /**
     * Draws a debug frame rectangle around the object's visible area on the canvas.
     * 
     * @param {CanvasRenderingContext2D} ctx - The canvas drawing context.
     */
    drawFrame(ctx) {
        if (this.isObjectWithFrame()) {
            ctx.beginPath();
            ctx.lineWidth = '1.5';
            ctx.strokeStyle = 'blue';
            ctx.rect(...this.returnRectDatas());
            ctx.stroke();
        }
    }


    /**
     * Updates the percentage of a status bar identified by id
     * based on the amount of collected items and their value.
     * 
     * @param {string} id - Identifier of the status bar.
     * @param {number} amountOfItems - Number of items collected.
     * @param {number} [valuePerItem=20] - Value each item contributes to the percentage.
     */
    handleStatusPercentage(id, amountOfItems, valuePerItem = 20) {
        const statusbar = this.world.fixedStatusbars[id];
        const percentage = amountOfItems * valuePerItem;
        statusbar.setPercentage(percentage);
    }


    /**
     * Reduces the object's health by a damage amount,
     * prevents health from dropping below zero,
     * and updates the timestamp of the last hit.
     * 
     * @param {number} [damage=10] - Damage amount to subtract from health.
     */
    hit(damage = 10) {
        this.health -= damage;
        if (this.health < 0) {
            this.health = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }


    /**
     * Checks if the object is standing on the ground level.
     * 
     * @returns {boolean} True if object's visible bottom touches or passes ground level.
     */
    standOnGround() {
        return this.returnVisibleEndY() >= this.groundLevel;
    }


    /**
     * Checks if the object is above the ground level.
     * 
     * @returns {boolean} True if the object's bottom edge is above the ground.
     */
    isAboveGround() {
        return this.y + this.height - this.imgOffsetCanvas.bottom < this.groundLevel;
    }


    /**
     * Checks whether this object collides with another movable object
     * based on their visible bounding boxes.
     * 
     * @param {MovableObject} mo - The other object.
     * @returns {boolean} True if the objects overlap.
     */
    isColliding(mo) {
        return (
            this.returnVisibleStartX() < mo.returnVisibleStartX() + mo.returnVisibleWidth() &&
            this.returnVisibleStartY() < mo.returnVisibleStartY() + mo.returnVisibleHeight() &&
            this.returnVisibleStartX() + this.returnVisibleWidth() > mo.returnVisibleStartX() &&
            this.returnVisibleStartY() + this.returnVisibleHeight() > mo.returnVisibleStartY()
        )
    }


    /**
     * Checks if the currently set animation matches the given image set.
     * 
     * @param {Array} imageSet - Image set to compare with.
     * @returns {boolean} True if the current animation matches the image set.
     */
    isCurrentAnimationRightAnimation(imageSet) {
        return this.picturesForCurrentAnimation === imageSet
    }


    /**
     * Checks if this object is jumping onto another object from above.
     * 
     * @param {MovableObject} mo - The other object.
     * @returns {boolean} True if the object is currently jumping on the other.
     */
    isJumpOn(mo) {
        return (
            this.returnVisibleEndY() - mo.returnVisibleStartY() <
            (this.returnVisibleEndY() - mo.returnVisibleEndY()) * -1) &&
            this.speedY < 0
    }


    /**
     * Checks whether the object is dead (health zero or below).
     * 
     * @returns {boolean} True if health is zero or less.
     */
    isDead() {
        return this.health <= 0;
    }


    /**
     * Checks if the object was hit less than one second ago.
     * 
     * @returns {boolean} True if the object is currently hurt.
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }


    /**
     * Initiates a jump by setting the vertical speed.
     * 
     * @param {number} [speedY=10] - Initial vertical speed for the jump.
     */
    jump(speedY = 10) {
        this.speedY = speedY;
    }


    /**
     * Moves the object left by decreasing its X coordinate.
     * Sets direction flag to indicate facing left.
     */
    moveLeft() {
        this.x -= this.speedXPerFrame;
        this.otherDirection = true;
    }


    /**
     * Moves the object right by increasing its X coordinate.
     * Sets direction flag to indicate facing right.
     */
    moveRight() {
        this.x += this.speedXPerFrame;
        this.otherDirection = false;
    }


    /**
     * Updates the object's image to the current frame in the animation sequence.
     * 
     * @param {Array} images - Array of image paths.
     * @param {number} [i] - Optional index of the frame to display.
     */
    playAnimation(images, i) {
        if (!i) {
            i = this.currentImage % images.length;
        }
        let path = images[i];
        this.img = this.imgCache[path];
        this.currentImage++
    }


    /**
     * Plays an animation with the given images and time.
     * Resets animation if the image set differs from the current one.
     * 
     * @param {number} time - Total time for the animation loop.
     * @param {Array} imageSet - Array of images for animation.
     * @param {number} index - Frame index to display.
     */
    playRightAnimation(time, imageSet, index) {
        if (!this.isCurrentAnimationRightAnimation(imageSet)) {
            this.resetAnimationImages(time, imageSet)
        }
        this.playAnimation(imageSet, index)
    }


    /**
     * Adds current position and image intervals to the list of all active intervals.
     */
    pushAnimationToAllIntervals() {
        this.pushToAllIntervals(this.positionInterval);
        this.pushToAllIntervals(this.imageInterval);
    }


    /**
     * Adds an interval ID to both the instance's interval list and the global interval list.
     * 
     * @param {number} interval - Interval ID to add.
     */
    pushToAllIntervals(interval) {
        this.allIntervals.push(interval);
        allGameIntervals.push(interval);
    }


    /**
     * Returns a random X coordinate within the given range for spawning.
     * 
     * @param {number} endOfX - Upper bound for spawn X.
     * @param {number} [startOfX=200] - Lower bound for spawn X.
     * @returns {number} Random X coordinate within range.
     */
    randomizeSpwanX(endOfX, startOfX = 200) {
        return startOfX + Math.random() * (endOfX - 800)
    }


    /**
     * Clears animation intervals and removes related interval IDs.
     */
    removeAnimationById() {
        this.clearAnimation();
        this.removeIntervalById(this.positionInterval);
        this.removeIntervalById(this.imageInterval);
    }


    /**
     * Removes a given interval ID from both the global allGameIntervals array
     * and the instance-specific this.allIntervals array, preserving array integrity.
     *
     * @param {number} intervalId - The interval ID to remove.
     */
    removeIntervalById(intervalId) {
        clearInterval(intervalId);

        const globalIndex = allGameIntervals.indexOf(intervalId);
        if (globalIndex !== -1) {
            allGameIntervals.splice(globalIndex, 1);
        }

        const instanceIndex = this.allIntervals?.indexOf(intervalId);
        if (instanceIndex !== -1) {
            this.allIntervals.splice(instanceIndex, 1);
        }
    }


    /**
     * Resets the animation images and restarts the animation timer.
     * 
     * @param {number} time - Total animation duration.
     * @param {Array} imageSet - New set of images for the animation.
     */
    resetAnimationImages(time, imageSet) {
        this.timeForFullAnimation = time;
        this.picturesForCurrentAnimation = imageSet;
        this.clearAnimation();
        this.animate();
    }


    /**
     * Determines if the object is hit from the right side by another object.
     * 
     * @param {MovableObject} mo - The other object.
     * @returns {boolean} True if this object is to the left of the other object.
     */
    isHitFromRight(mo) {
        if (this.x < mo.x) {
            return true;
        } else {
            return false;
        }
    }


    /**
     * Restarts the object's animation and position intervals.
     */
    restart() {
        this.removeIntervalById(this.positionInterval);
        this.removeIntervalById(this.imageInterval);
        this.init();
        this.animate();
    }


    /**
     * Returns an array representing the object's visible bounding rectangle:
     * [startX, startY, width, height].
     * 
     * @returns {number[]} Array of rectangle parameters.
     */
    returnRectDatas() {
        return [
            this.returnVisibleStartX(),
            this.returnVisibleStartY(),
            this.returnVisibleWidth(),
            this.returnVisibleHeight()
        ];
    }


    /**
     * Returns the X coordinate of the visible left edge of the object,
     * considering image offsets.
     * 
     * @returns {number} X coordinate.
     */
    returnVisibleStartX() {
        return this.x + this.imgOffsetCanvas.left;
    }


    /**
     * Returns the Y coordinate of the visible top edge of the object,
     * considering image offsets.
     * 
     * @returns {number} Y coordinate.
     */
    returnVisibleStartY() {
        return this.y + this.imgOffsetCanvas.top;
    }


    /**
     * Returns the X coordinate of the visible horizontal center of the object.
     * 
     * @returns {number} X coordinate of center.
     */
    returnVisibleMiddleXOfObject() {
        return (2 * this.returnVisibleStartX() + this.returnVisibleWidth()) / 2
    }


    /**
     * Returns the Y coordinate of the visible vertical center of the object.
     * 
     * @returns {number} Y coordinate of center.
     */
    returnVisibleMiddleYOfObject() {
        return (2 * this.returnVisibleStartY() + this.returnVisibleHeight()) / 2
    }


    /**
     * Returns the X coordinate of the visible right edge of the object.
     * 
     * @returns {number} X coordinate.
     */
    returnVisibleEndX() {
        return this.returnVisibleStartX() + this.returnVisibleWidth()
    }


    /**
     * Returns the Y coordinate of the visible bottom edge of the object.
     * 
     * @returns {number} Y coordinate.
     */
    returnVisibleEndY() {
        return this.returnVisibleStartY() + this.returnVisibleHeight()
    }


    /**
     * Returns the visible width of the object,
     * considering image offsets.
     * 
     * @returns {number} Width in pixels.
     */
    returnVisibleWidth() {
        return this.width - this.imgOffsetCanvas.right - this.imgOffsetCanvas.left;
    }


    /**
     * Returns the visible height of the object,
     * considering image offsets.
     * 
     * @returns {number} Height in pixels.
     */
    returnVisibleHeight() {
        return this.height - this.imgOffsetCanvas.bottom - this.imgOffsetCanvas.top;
    }
}