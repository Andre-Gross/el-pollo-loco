class Chicken extends Enemy {
    standardHealth = 10;

    originalImgHeight = 243;
    originalImgWidth = 248;
    sizeFactor = 0.5;

    imgOffsetOriginal = {
        left: 7,
        top: 15,
        right: 6,
        bottom: 23
    };

    minSpeedXPerSecond = 6;
    maxAdditionalSpeedXPerSecond = 18;


    IMAGES_WALK = [
        './assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        './assets/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
        './assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        './assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
    ];

    IMAGE_DEAD = './assets/img/3_enemies_chicken/chicken_normal/2_dead/dead.png';

    SOUND_DIE = new Audio('./assets/sounds/chicken/chick-die-by-char-landing_cut.mp3');


    /**
     * Creates a new enemy chicken instance.
     *
     * Loads images for walking and dead states,
     * initializes position and speed,
     * and sets up necessary sizes and offsets.
     *
     * @param endOfX - The x-coordinate limit where the chicken stops moving.
     */
    constructor(endOfX) {
        super()
        this.loadImage('./assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png')
        this.loadImage(this.IMAGE_DEAD);
        this.loadImages(this.IMAGES_WALK);
        this.endOfX = endOfX;

        this.setSizes();
        this.imgOffsetCanvas = this.scaleImgOffset();
        this.y = this.calculateY();

        this.setSpeedX();

        this.init(endOfX);
    }


    /**
     * Starts the animation by adding position and image update intervals.
     * @returns void
     */
    animate() {
        this.addPositionInterval();
        this.addImageInterval(600, this.IMAGES_WALK);
    }


    /**
     * Adds an interval to update the enemy's position regularly.
     * Moves the enemy left by speedXPerFrame each frame.
     * Aligns the enemy to the main character.
     * @returns void
     */
    addPositionInterval() {
        this.positionInterval = setInterval(() => {
            this.alignSelfTo(world.character)
            this.x -= this.speedXPerFrame;
        }, 1000 / maxFPS);
        this.pushToAllIntervals(this.positionInterval);
    }


    /**
     * Calculates the horizontal speed per frame with a random additional speed.
     * @returns number The calculated speed per frame.
     */
    calculateSpeedPerFrame(minSpeedXPerSecond = this.minSpeedXPerSecond) {
        return (minSpeedXPerSecond + Math.random() * this.maxAdditionalSpeedXPerSecond) / maxFPS;
    }


    /**
     * Processes getting hit by reducing health by damage.
     * If health reaches zero, stops the position update interval.
     * @param damage - The amount of damage to apply (default is 10).
     * @returns void
     */
    getHit(damage = 10) {
        this.hit(damage);
        if (this.health === 0) {
            this.removeIntervalById(this.positionInterval);
            this.playOrSwitchSound(this.SOUND_DIE);
        }
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


    resumeGameplay() {
        if (!this.isDead()) {
            this.animate()
        }
    }


    /**
     * Sets the current animation based on the enemy's state.
     * Shows dead image if dead,
     * shows first walk image if speed is zero,
     * otherwise plays walk animation.
     * @returns void
     */
    setAnimation() {
        if (this.isDead()) {
            this.img = this.imgCache[this.IMAGE_DEAD];
        } else if (this.speedXPerFrame === 0) {
            this.img = this.imgCache[this.IMAGES_WALK[0]];
        } else {
            this.playAnimation(this.IMAGES_WALK)
        }
    }
}