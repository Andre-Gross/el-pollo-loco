class Enemy extends MovableObject {
    
    init(endOfX = this.endOfX) {
        this.health = this.standardHealth;
        this.x = this.randomizeSpawnX(endOfX, this.minSpawnX);
    }


    /**
     * Sets the horizontal movement speed per frame.
     * Initializes standard and current speed.
     * @returns void
     */
    setSpeedX(speedXPerSecond = this.speedXPerSecond) {
        this.standardSpeedXPerFrame = this.calculateSpeedPerFrame(speedXPerSecond);
        this.speedXPerFrame = this.standardSpeedXPerFrame;
    }
}