class MovableObject extends DrawableObject {
    allIntervals = [];
    allTimeouts = [];


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
     * Adds a timeout ID to both the instance-specific and global timeout lists
     * so it can be cleared later if needed.
     *
     * @param {number} timeout - The ID returned by setTimeout().
     */
    pushToAllTimeouts(timeout) {
        this.allTimeouts.push(timeout);
        allGameTimeouts.push(timeout);
    }


    /**
     * Moves the object left by decreasing its X coordinate.
     * Sets direction flag to indicate facing left.
     */
    moveLeft(otherDirection = true) {
        this.x -= this.speedXPerFrame;
        this.otherDirection = otherDirection;
    }


    /**
     * Moves the object right by increasing its X coordinate.
     * Sets direction flag to indicate facing right.
     */
    moveRight(otherDirection = false) {
        this.x += this.speedXPerFrame;
        this.otherDirection = otherDirection;
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
     * Removes a timeout by its ID from both the global and instance-specific timeout lists.
     * Ensures the timeout is cleared and no longer tracked.
     *
     * @param {number} timeoutID - The ID of the timeout to remove.
     */
    removeTimeoutById(timeoutID) {
        clearTimeout(timeoutID);

        const globalIndex = allGameTimeouts.indexOf(timeoutID);
        if (globalIndex !== -1) {
            allGameTimeouts.splice(globalIndex, 1);
        }

        const instanceIndex = this.allTimeouts?.indexOf(timeoutID);
        if (instanceIndex !== -1) {
            this.allTimeouts.splice(instanceIndex, 1);
        }
    }

}