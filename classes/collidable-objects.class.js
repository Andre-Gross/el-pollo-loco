class CollidableObject extends MovableObject {
    groundLevel = this.calculateGroundLevel();

    speedXPerSecond;
    standardSpeedXPerFrame;
    speedXPerFrame;
    speedY = 0;
    acceleration = 0.35;

    otherDirection = false;
    currentImage = 0;
    currentAudio = null;
    isObjectMuted = false;
    currentAnimation;
    positionInterval;
    gravityInterval;
    imageInterval;
    timeForFullAnimation;
    pictureForCurrentAnimation;

    imgOffsetCanvas = {}


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
        this.pushToAllIntervals(this.gravityInterval)
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
     * Initiates a jump by setting the vertical speed.
     * 
     * @param {number} [speedY=10] - Initial vertical speed for the jump.
     */
    jump(speedY = 10) {
        this.speedY = speedY;
    }


    /**
     * Mutes or unmutes the current object's audio, if available.
     * Also sets the internal mute state.
     *
     * @param {boolean} shallMute - Whether to mute (true) or unmute (false) the object.
     */
    toggleMute(shallMute) {
        if (this.currentAudio) {
            this.currentAudio.muted = shallMute;
        }
        this.isObjectMuted = shallMute;
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
     * Plays a new audio sound if it's not already playing.
     * If the passed audio is already playing, it continues.
     * Otherwise, it stops the current audio and plays the new one.
     * 
     * @param {HTMLAudioElement} newAudio - The audio element to play
     */
    playOrSwitchSound(newAudio) {
        if (this.currentAudio === newAudio) {
            if (!newAudio.paused) {
                return;
            }
            newAudio.play();
        } else {
            if (this.currentAudio) {
                this.currentAudio.pause();
                this.currentAudio.currentTime = 0;
            }
            this.currentAudio = newAudio;
            newAudio.play();
        }
        if (this.isObjectMuted) {
            this.toggleMute(this.isObjectMuted);
        }
    }


    /**
     * Returns a random X coordinate within the given range for spawning.
     * 
     * @param {number} endOfX - Upper bound for spawn X.
     * @param {number} [startOfX=200] - Lower bound for spawn X.
     * @returns {number} Random X coordinate within range.
     */
    randomizeSpawnX(endOfX, startOfX = 200) {
        return startOfX + Math.random() * (endOfX - 800)
    }


    /**
     * Clears animation intervals and removes related interval IDs.
     */
    stopAnimation() {
        this.clearAnimation();
        this.removeIntervalById(this.positionInterval);
        this.removeIntervalById(this.imageInterval);
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


    /**
     * Stops the currently playing audio, if any.
     *
     * This method pauses the current audio playback, resets its playback position
     * to the beginning, and clears the reference to the current audio element.
     * 
     * Call this when you want to immediately stop any active audio, for example
     * before playing a different sound or when cleaning up.
     */
    stopCurrentSound() {
        if (this.currentAudio) {
            this.currentAudio.pause();
            this.currentAudio.currentTime = 0;
            this.currentAudio = null;
        }
    }
}