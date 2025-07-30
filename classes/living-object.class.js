class LivingObject extends CollidableObject {
    standartHealth = 100;
    health;
    lastHit = 0;

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
            this.speedXPerFrame = this.standardSpeedXPerFrame
        } else {
            this.otherDirection = true;
            this.speedXPerFrame = -this.standardSpeedXPerFrame
        }
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
}