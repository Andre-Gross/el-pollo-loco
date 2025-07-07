class Enemy extends MovableObject {
    
    init(endOfX = this.endOfX) {
        this.health = this.standartHealth;
        this.x = this.randomizeSpwanX(endOfX, 400);
    }


    /**
     * Sets the horizontal movement speed per frame.
     * Initializes standard and current speed.
     * @returns void
     */
    setSpeedX(speedXPerSecond = this.speedXPerSecond) {
        this.standartSpeedXPerFrame = this.calculateSpeedPerFrame(speedXPerSecond);
        this.speedXPerFrame = this.standartSpeedXPerFrame;
    }
}