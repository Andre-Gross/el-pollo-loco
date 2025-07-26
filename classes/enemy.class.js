class Enemy extends MovableObject {
    minSpawnX = 400;


    /**
     * Initializes or resets the enemy's health and spawn position.
     * @param {number} [endOfX=this.endOfX] - The maximum X-coordinate for spawning.
     * @returns {void}
     */
    init(endOfX = this.endOfX) {
        this.health = this.standardHealth;
        this.x = this.randomizeSpawnX(endOfX, this.minSpawnX);
    }


    /**
     * Sets the horizontal movement speed per frame based on speed per second.
     * @param {number} [speedXPerSecond=this.speedXPerSecond] - Speed in pixels per second.
     * @returns {void}
     */
    setSpeedX(speedXPerSecond = this.speedXPerSecond) {
        this.standardSpeedXPerFrame = this.calculateSpeedPerFrame(speedXPerSecond);
        this.speedXPerFrame = this.standardSpeedXPerFrame;
    }
}