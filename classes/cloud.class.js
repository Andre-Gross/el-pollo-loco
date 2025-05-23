class Cloud extends BackgroundObject {
    height = canvasHeight;
    originalWidth = 3840
    width = (this.originalWidth * this.height / backgroundImgOriginalHeight);

    standardX;
    y = 0;

    speedXPerFrame = 6 / maxFPS;


    /**
     * Creates a Cloud instance.
     * Loads the cloud image, initializes position and starts animation.
     * 
     * @param {number} [x=0] - Initial horizontal position for the cloud.
     */
    constructor(x = 0) {
        super().loadImage('./assets/img/5_background/layers/4_clouds/full.png')

        this.standardX  = x
        this.init(x);

        this.animate();
    }


    /**
     * Starts the horizontal movement animation of the cloud.
     * Moves the cloud left on each animation frame.
     */
    animate() {
        this.positionInterval = setInterval(() => {
            this.moveLeft()
        }, 1000 / maxFPS)
        this.pushToAllIntervals(this.positionInterval);
    }


    /**
     * Calculates a randomized horizontal start position based on the given base x.
     * Adds a random offset and scales with background height factor.
     * 
     * @param {number} x - Base horizontal position.
     * @returns {number} - Calculated horizontal position.
     */    
    calculateX(x) {
        return x + (Math.random() * 500 * backgroundHeightFactor);
    }


    /**
     * Initializes the cloud's horizontal position.
     * Uses the provided x or defaults to the stored standard x.
     * 
     * @param {number} [x=this.standartX] - Horizontal position to initialize.
     */
    init(x = this.standardX ) {
        this.x = this.calculateX(x);
    }
}