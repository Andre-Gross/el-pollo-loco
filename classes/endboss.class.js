class Endboss extends Enemy {
    STANDARD_HEALTH = 100;
    isEndbossTriggered = false;

    /**
     * Initializes the enemy's position and health.
     * Sets the initial x and y coordinates based on the canvas size and sets the default health.
     */
    init() {
        this.x = 2700 / backgroundImgOriginalHeight * canvasHeight;
        this.y = this.calculateY();
        this.isEndbossTriggered = false;

        this.health = this.STANDARD_HEALTH;

        this.resetAttackState();
    }


    /**
     * Starts the animation loop for the enemy.
     * Aligns the enemy to the player character and updates the animation frames.
     * 
     * @returns {void}
     */
    animate() {
        this.imageInterval = setInterval(() => {
            this.alignSelfTo(world.character)
            this.setAnimation();
        }, this.timeForFullAnimation / this.picturesForCurrentAnimation.length)
        this.pushToAllIntervals(this.imageInterval);
    }


    /**
     * Handles the death of the Endboss.
     * Stops all movement, plays the death animation and sound, 
     * and sets the final state to dead.
     * 
     * @returns {void}
     */
    die() {
        const timeToDie = 900;

        this.speedXPerFrame = 0
        this.handleDeathAnimation(timeToDie);
    }


    /**
     * Applies damage to the enemy and stops horizontal movement if health reaches zero.
     * 
     * @param {number} [damage=10] - Amount of damage to apply.
     * @returns {void}
     */
    getHit(damage = 10) {
        this.hit(damage);
        this.world.movableStatusbar.setPercentage(this.health);
        if (this.health <= 0) {
            world.handleGameOver(this, true);
        }
    }


    /**
     * Starts the horizontal position interval moving the boss.
     *
     * @param {number} speed - Speed per frame (positive or negative).
     * @returns {void}
     */
    startPositionInterval(speed) {
        this.positionInterval = setInterval(() => {
            this.x += speed;
        }, 1000 / maxFPS);
        this.pushToAllIntervals(this.positionInterval);
    }


    /**
     * Indicates that this object displays a hitbox using animation frames.
     * 
     * This is used for debugging or collision detection visuals.
     * Overrides the base method to enable hitbox rendering for this object.
     * 
     * @returns {boolean} Always returns `true`.
     */
    isObjectWithFrame() {
        return true
    }


    /**
     * Restarts the movement and animation cycles of the object.
     *
     * This method clears the current intervals for position updates and image animation,
     * reinitializes the object state, updates the status bar with the current health,
     * and restarts the animation.
     */
    restart() {
        this.removeIntervalById(this.positionInterval);
        this.removeIntervalById(this.imageInterval);
        this.init();
        this.world.movableStatusbar.setPercentage(this.health);
        this.animate();
    }


    /**
     * Handles the death animation and schedules final frame.
     *
     * @param {number} timeToDie - Total duration of the death animation.
     * @returns {void}
     */
    handleDeathAnimation(timeToDie) {
        this.playRightAnimation(timeToDie, this.IMAGES_DEAD, 0);
        setTimeout(() => {
            this.stopAnimation();
            this.img = this.imgCache[this.IMAGES_DEAD[2]];
        }, timeToDie - (timeToDie / this.IMAGES_DEAD.length));
    }


    /**
     * Determines and triggers the appropriate animation based on character state.
     * Prioritizes death, hurt, attack, and idle in that order.
     *
     * @returns {void}
     */
    setAnimation() {
        if (this.isHurt()) {
            this.playRightAnimation(600, this.IMAGES_HURT);
            this.playOrSwitchSound(this.SOUND_GET_HIT);
        } else if (this.shallAttack()) {
            this.handleAttackDecision();
        } else {
            this.playRightAnimation(1200, this.IMAGES_ALERT);
        }
    }
}