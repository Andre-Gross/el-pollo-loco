class ThrowableObject extends CollectableObjects {

    originalImgHeight = 400;
    originalImgWidth = 400;
    sizeFactor = 0.4;

    speedXPerSecond = 300;
    speedXPerFrame = this.speedXPerSecond / maxFPS;
    speedY = 5;
    acceleration = 0.1;

    imgOffsetOriginal = {};

    imgOffsetOriginal_1SalsaBottle = {
        left: 177,
        top: 78,
        right: 75,
        bottom: 44
    };

    imgOffsetOriginal_2SalsaBottle = {
        left: 118,
        top: 78,
        right: 134,
        bottom: 44
    };

    splashSound = new Audio('./assets/sounds/bottle/bo-breaking-glass_cut.mp3')

    isThrown = false;
    throwInterval;
    splashTimeFullAnimation = 600

    IMAGES_GROUND = [
        './assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        './assets/img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ]
    IMAGES_SPLASH = [
        './assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        './assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        './assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        './assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        './assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        './assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ]
    IMAGES_THROW = [
        './assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        './assets/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        './assets/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        './assets/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ]


    constructor(endOfX) {
        super()

        this.setSizes();

        this.chooseStartImage();
        this.imgOffsetCanvas = this.scaleImgOffset();

        this.loadImages(this.IMAGES_THROW);
        this.loadImages(this.IMAGES_SPLASH);

        this.endOfX = endOfX;
        this.init(endOfX);
    }


    /**
     * Resets the throwable object to its initial state.
     * Marks it as not collected and not thrown,
     * clears all active intervals,
     * resets size and chooses a start image,
     * then re-initializes position.
     */
    restart() {
        this.isCollected = false;
        this.isThrown = false;
        this.removeAllIntervals();
        this.setSizes();

        this.chooseStartImage();
        this.init();
    }


    /**
     * Initializes the position of the throwable object.
     * Sets the x coordinate randomly within the allowed boundary (endOfX)
     * and calculates the y coordinate accordingly.
     * 
     * @param {number} [endOfX=this.endOfX] - The maximum x boundary for spawning.
     */
    init(endOfX = this.endOfX) {
        this.x = this.randomizeSpawnX(endOfX);
        this.y = this.calculateY();
    }


    /**
     * Starts the animation of the throwable object.
     * Sets up intervals to update the x position based on the character's direction,
     * cycles through throw images for animation,
     * and stores all intervals for later management.
     */
    animate() {
        const character = this.world.character;

        if (character.otherDirection) {
            this.positionInterval = setInterval(() => {
                this.x -= this.speedXPerFrame;
            }, 1000 / maxFPS);
        } else {
            this.positionInterval = setInterval(() => {
                this.x += this.speedXPerFrame;
            }, 1000 / maxFPS);
        }

        this.imageInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_THROW);
        }, 600 / this.IMAGES_THROW.length)

        this.pushAnimationToAllIntervals();
    }


    /**
     * Randomly selects one of two ground images as the start image for the throwable object,
     * loads the selected image, and sets the corresponding image offsets.
     */
    chooseStartImage() {
        if (Math.random() > 0.5) {
            this.loadImage(this.IMAGES_GROUND[0]);
            this.imgOffsetOriginal = this.imgOffsetOriginal_1SalsaBottle;
        } else {
            this.loadImage(this.IMAGES_GROUND[1]);
            this.imgOffsetOriginal = this.imgOffsetOriginal_2SalsaBottle;
        }

    }


    /**
     * Checks for collisions with enemies and ground continuously.
     * If collision with a living enemy or ground is detected,
     * stops all intervals, stops vertical movement,
     * starts splash animation, and deals damage to the enemy if hit.
     */
    handleCollidingWithEnemy() {
        this.throwInterval = setInterval(() => {
            this.world.level.enemies.forEach((enemy) => {
                if (this.isCollidingLivingEnemy(enemy) || this.standOnGround()) {
                    this.removeAllIntervals();
                    this.speedY = 0;
                    this.setSplashAnimation();
                    setTimeout(() => {
                        this.height = 0;
                        this.width = 0;
                    }, this.splashTimeFullAnimation - (this.splashTimeFullAnimation / this.IMAGES_SPLASH.length));
                    this.playSound(this.splashSound);
                    if (this.isCollidingLivingEnemy(enemy)) {
                        enemy.getHit(20);
                    }
                }
            })
        })
        this.pushToAllIntervals(this.throwInterval);
    }


    /**
     * Determines whether the throwable object is above the ground level.
     * 
     * @returns {boolean} True if the object is above ground, otherwise false.
     */
    isAboveGround() {
        return this.returnVisibleMiddleYOfObject() < this.groundLevel;
    }


    /**
     * Checks collision between this object and another movable object.
     * Collision is based on visible middle points and boundaries.
     * 
     * @param {MovableObject} mo - Another movable object to check collision with.
     * @returns {boolean} True if colliding, otherwise false.
     */
    isColliding(mo) {
        return (
            this.returnVisibleMiddleXOfObject() < mo.returnVisibleStartX() + mo.returnVisibleWidth() &&
            this.returnVisibleMiddleYOfObject() < mo.returnVisibleStartY() + mo.returnVisibleHeight() &&
            this.returnVisibleMiddleXOfObject() > mo.returnVisibleStartX() &&
            this.returnVisibleMiddleYOfObject() > mo.returnVisibleStartY()
        )
    }


    /**
     * Checks collision specifically with a living enemy.
     * 
     * @param {Enemy} enemy - The enemy to check collision with.
     * @returns {boolean} True if colliding and the enemy is not dead, otherwise false.
     */
    isCollidingLivingEnemy(enemy) {
        return this.isColliding(enemy) && !enemy.isDead()
    }


    /**
     * Removes all active intervals related to animations and movement,
     * including throw and gravity intervals.
     */
    removeAllIntervals() {
        this.removeAnimationById();
        this.removeIntervalById(this.throwInterval);
        this.removeIntervalById(this.gravityInterval);
    }


    playSound() {
        this.currentAudio = this.splashSound;
        this.splashSound.play();
        if (this.isObjectMuted) {
            this.toggleMute(this.isObjectMuted);
        }
    }


    /**
     * Sets the throwable object's coordinates to the character's visible middle point,
     * and sets size based on original image dimensions and background scaling.
     */
    setCoordinatesAndSizes() {
        const character = this.world.character;
        this.x = character.returnVisibleMiddleXOfObject();
        this.y = character.returnVisibleMiddleYOfObject();
        this.height = this.originalImgHeight * backgroundHeightFactor * 0.4;
        this.width = this.originalImgWidth * this.height / this.originalImgHeight;
    }


    /**
     * Sets the object's size by calculating height and width according to scaling.
     */
    setSizes() {
        this.height = this.calculateHeight();
        this.width = this.calculateWidth();
    }


    /**
     * Starts the splash animation by cycling through splash images
     * over the total splash animation duration.
     */
    setSplashAnimation() {
        this.imageInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_SPLASH);
        }, this.splashTimeFullAnimation / this.IMAGES_SPLASH.length)
        this.pushToAllIntervals(this.imageInterval);
    }


    /**
     * Checks if the throwable object stands on the ground,
     * based on its visible middle Y position and ground level.
     * 
     * @returns {boolean} True if standing on ground, otherwise false.
     */
    standOnGround() {
        return this.returnVisibleMiddleYOfObject() >= this.groundLevel;
    }


    /**
     * Initiates the throwing action:
     * sets initial position and size, marks as thrown,
     * makes the object jump, applies gravity,
     * starts animation and collision handling.
     */
    throw() {
        this.setCoordinatesAndSizes();
        this.isThrown = true;
        this.jump(5);
        this.applyGravity();

        this.animate()
        this.handleCollidingWithEnemy();

        this.world.character.setSleepTimer();
    }
}

