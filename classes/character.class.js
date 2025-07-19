class Character extends MovableObject {
    standartHealth = 100000000;

    collectedItems = {};

    originalImgHeight = 1200;
    originalImgWidth = 610;
    sizeFactor = 0.5;

    imgOffsetOriginal = {
        left: 96,
        top: 464,
        right: 97,
        bottom: 60
    };

    speedXPerSecond = 480;
    speedXPerFrame = this.calculateSpeedPerFrame(this.speedXPerSecond);

    lastVisibleEndY;

    jumpDatas = {};

    IMAGES_IDLE = [
        './assets/img/2_character_pepe/1_idle/idle/I-1.png',
        './assets/img/2_character_pepe/1_idle/idle/I-2.png',
        './assets/img/2_character_pepe/1_idle/idle/I-3.png',
        './assets/img/2_character_pepe/1_idle/idle/I-4.png',
        './assets/img/2_character_pepe/1_idle/idle/I-5.png',
        './assets/img/2_character_pepe/1_idle/idle/I-6.png',
        './assets/img/2_character_pepe/1_idle/idle/I-7.png',
        './assets/img/2_character_pepe/1_idle/idle/I-8.png',
        './assets/img/2_character_pepe/1_idle/idle/I-9.png',
        './assets/img/2_character_pepe/1_idle/idle/I-10.png',
    ];
    IMAGES_SLEEP = [
        './assets/img/2_character_pepe/1_idle/long_idle/I-11.png',
        './assets/img/2_character_pepe/1_idle/long_idle/I-12.png',
        './assets/img/2_character_pepe/1_idle/long_idle/I-13.png',
        './assets/img/2_character_pepe/1_idle/long_idle/I-14.png',
        './assets/img/2_character_pepe/1_idle/long_idle/I-15.png',
        './assets/img/2_character_pepe/1_idle/long_idle/I-16.png',
        './assets/img/2_character_pepe/1_idle/long_idle/I-17.png',
        './assets/img/2_character_pepe/1_idle/long_idle/I-18.png',
        './assets/img/2_character_pepe/1_idle/long_idle/I-19.png',
        './assets/img/2_character_pepe/1_idle/long_idle/I-20.png',
    ]
    IMAGES_WALK = [
        './assets/img/2_character_pepe/2_walk/W-21.png',
        './assets/img/2_character_pepe/2_walk/W-22.png',
        './assets/img/2_character_pepe/2_walk/W-23.png',
        './assets/img/2_character_pepe/2_walk/W-24.png',
        './assets/img/2_character_pepe/2_walk/W-25.png',
        './assets/img/2_character_pepe/2_walk/W-26.png',
    ];
    IMAGES_JUMP = [
        './assets/img/2_character_pepe/3_jump/J-31.png',
        './assets/img/2_character_pepe/3_jump/J-32.png',
        './assets/img/2_character_pepe/3_jump/J-33.png',
        './assets/img/2_character_pepe/3_jump/J-34.png',
        './assets/img/2_character_pepe/3_jump/J-35.png',
        './assets/img/2_character_pepe/3_jump/J-36.png',
        './assets/img/2_character_pepe/3_jump/J-37.png',
        './assets/img/2_character_pepe/3_jump/J-38.png',
        './assets/img/2_character_pepe/3_jump/J-39.png',
    ];
    IMAGES_HURT = [
        './assets/img/2_character_pepe/4_hurt/H-41.png',
        './assets/img/2_character_pepe/4_hurt/H-42.png',
        './assets/img/2_character_pepe/4_hurt/H-43.png',
    ];
    IMAGES_DEAD = [
        './assets/img/2_character_pepe/5_dead/D-51.png',
        './assets/img/2_character_pepe/5_dead/D-52.png',
        './assets/img/2_character_pepe/5_dead/D-53.png',
        './assets/img/2_character_pepe/5_dead/D-54.png',
        './assets/img/2_character_pepe/5_dead/D-55.png',
        './assets/img/2_character_pepe/5_dead/D-56.png',
        './assets/img/2_character_pepe/5_dead/D-57.png',
    ];


    SOUND_WALKING = new Audio('./assets/sounds/character/ch-running_cut.mp3');
    SOUND_JUMP = new Audio('./assets/sounds/character/ch_jump.mp3');
    SOUND_SNORING = new Audio('./assets/sounds/character/ch_snoring.mp3');
    SOUND_GET_HIT = new Audio('./assets/sounds/character/char_get-hit.mp3')

    timeForFullAnimation = 1000;
    picturesForCurrentAnimation = this.IMAGES_IDLE;
    sleepTimer = Date.now();

    isJumpAllowed = true;
    checkThrowInterval;


    /**
     * Creates a new character instance.
     *
     * Loads all necessary images for different animations,
     * sets initial sizes and image offsets,
     * initializes character state,
     * applies gravity,
     * starts animation and input checking.
     */
    constructor() {
        super().loadImage('./assets/img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_SLEEP);
        this.loadImages(this.IMAGES_WALK);
        this.loadImages(this.IMAGES_JUMP);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);

        this.setSizes();
        this.imgOffsetCanvas = this.scaleImgOffset();

        this.init();
        this.applyGravity();

        this.animate();
        this.checkThrow();
        this.registerStopWalkingListener()
    }


    /**
     * Initializes the character's position and health.
     * Also sets up the initially collected items.
     *
     * @returns {void}
     */
    init() {
        this.health = this.standartHealth;
        this.setCollectedItems();

        this.x = 70;
        this.y = this.calculateY();
        this.lastVisibleEndY = this.returnVisibleEndY();
        this.jumpDatas = {
            i: 0,
            startFromGround: true,
            alreadyJumped: false,
        }
    }


    /**
     * Starts the animation logic by adding intervals for position and image updates.
     *
     * @returns {void}
     */
    animate() {
        this.addPositionInterval();
        this.addImageInterval();
    }


    /**
     * Starts a repeated check for bottle-throwing input.
     * If the throw key is pressed and bottles are available, the character throws a bottle.
     * Also ensures the interval is tracked for later cleanup.
     *
     * @returns {void}
     */
    checkThrow() {
        this.checkThrowInterval = setInterval(() => {
            if (this.checkThrowCollectedBottle()) {
                this.searchAndThrowBottle();
                this.world.keyboard.T = false;
            }
        }, 1000 / maxFPS);
        this.pushToAllIntervals(this.checkThrowInterval);
    }


    /**
     * Checks whether the player has pressed the throw key and has at least one bottle.
     *
     * @returns {boolean} True if the throw key is pressed and bottles are available.
     */
    checkThrowCollectedBottle() {
        return this.isPressedThrow() && this.collectedItems['bottles'] > 0;
    }


    /**
     * Determines whether the character has been inactive long enough to enter sleep mode.
     *
     * @returns {boolean} True if 5 seconds have passed since the last activity.
     */
    checkTimeToSleep() {
        return Date.now() - this.sleepTimer > 10000;
    }


    die() {
        let index = 0;
        let dieInterval = setInterval(() => {
            if (index === 7) {
                this.removeIntervalById(dieInterval);
            } else {
                let path = this.IMAGES_DEAD[index];
                this.img = this.imgCache[path];
                index++;
            }
        }, 2000 / this.IMAGES_DEAD.length);

        let dieTimeout = setTimeout(() => {
            this.img = this.imgCache[this.IMAGES_DEAD.slice(5, 6)];
            this.removeTimeoutById(dieTimeout);
        }, 2000)
        this.pushToAllTimeouts(dieTimeout);
    }


    /**
     * Applies damage to the character and triggers a knockback animation.
     * Updates the health bar accordingly.
     *
     * @param {boolean} hitFromRight - True if the hit comes from the right side.
     * @param {number} [damage=10] - Amount of health to subtract.
     * @param {number} [duration=500] - Duration of the knockback effect in milliseconds.
     *
     * @returns {void}
     */
    getHit(hitFromRight, damage = 10, duration = 200) {
        this.knockBack(hitFromRight, duration);
        this.hit(damage);
        world.fixedStatusbars[0].setPercentage(this.health);

        if (this.health <= 0) {
            world.handleGameOverByPlayerDead();
        }
    }


    allowJump() {
        let allowJumpInterval = setInterval(() => {
            if (this.standOnGround()) {
                this.isJumpAllowed = true;
                this.removeIntervalById(allowJumpInterval);
            }
        }, 1000 / maxFPS)
        this.pushToAllIntervals(allowJumpInterval);
    }


    isJumpOn(mo) {
        return this.returnVisibleEndY() > mo.returnVisibleStartY() && this.lastVisibleEndY < mo.returnVisibleStartY();
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
     * Checks if the player is pressing the left movement key.
     *
     * @returns {boolean} True if left arrow or A key is pressed.
     */
    isPressedLeft() {
        return (this.world.keyboard.ARROW_LEFT || this.world.keyboard.A);
    }


    /**
     * Checks if the player is pressing any movement key (left, right, or up).
     *
     * @returns {boolean} True if any movement key is pressed.
     */
    isPressedMove() {
        return (this.isPressedLeft() || this.isPressedRight() || this.isPressedUp())
    }


    /**
     * Checks if the player is pressing the right movement key.
     *
     * @returns {boolean} True if right arrow or D key is pressed.
     */
    isPressedRight() {
        return (this.world.keyboard.ARROW_RIGHT || this.world.keyboard.D);
    }


    /**
     * Checks if the player is pressing the throw key.
     *
     * @returns {boolean} True if the T key is pressed.
     */
    isPressedThrow() {
        return (this.world.keyboard.T)
    }


    /**
     * Checks if the player is pressing the jump key.
     *
     * @returns {boolean} True if up arrow, W, or spacebar is pressed.
     */
    isPressedUp() {
        return (this.world.keyboard.ARROW_UP || this.world.keyboard.W || this.world.keyboard.SPACE);
    }


    /**
     * Starts the jump animation sequence.
     * Handles the main interval and passes control to the appropriate phase function
     * depending on the current state of the character.
     * 
     * @param {boolean} [startFromGround=true] - Whether the character starts the jump from the ground.
     *
     * @returns {void}
     */
    handleJumpAnimation(startFromGround = true) {
        this.removeIntervalById(this.imageInterval);

        this.jumpDatas.i = 0;
        this.jumpDatas.startFromGround = startFromGround;
        this.jumpDatas.alreadyJumped = false;

        this.jumpInterval = setInterval(() => {
            this.jumpDatas = this.handleJumpAnimationPhase(this.jumpDatas);

            if (this.jumpDatas.i === 0 && this.jumpDatas.alreadyJumped) {
                this.handleJumpAnimationEnd();
            }
        }, 500 / this.picturesForCurrentAnimation.length);

        this.pushToAllIntervals(this.jumpInterval);
    }


    /**
     * Controls the logic of the current jump animation phase.
     * Delegates execution to specific functions based on jump state and vertical speed.
     * 
     * @param {Object} jumpDatas - The jump animation state object
     * @param {number} jumpDatas.i - The current animation frame index.
     * @param {boolean} jumpDatas.alreadyJumped - Whether the jump has already been triggered.
     * @param {boolean} jumpDatas.startFromGround - Whether the character starts the jump from the ground.
     * @returns {Object} - Updated jumpDatas object.
     */
    handleJumpAnimationPhase(jumpDatas) {
        const { i, alreadyJumped, startFromGround } = jumpDatas;
        const summitSpeedY = 5;

        if (i < 3 && startFromGround) {
            return this.handleJumpAnimationStart(jumpDatas);
        } else if (i <= 3 || this.speedY > summitSpeedY) {
            return this.handleJumpAnimationUpwards(jumpDatas);
        } else if (i === 6) {
            return { ...jumpDatas, i: 0 };
        } else if (this.standOnGround()) {
            return this.handleJumpAnimationLanding(jumpDatas);
        } else {
            this.handleJumpAnimationMidAir(summitSpeedY);
            return jumpDatas;
        }
    }


    /**
     * Handles the initial jump frames while the character is still on the ground.
     * 
     * @param {Object} jumpDatas - The jump animation state object
     * @returns {Object} - Updated jumpDatas object.
     */
    handleJumpAnimationStart(jumpDatas) {
        this.playAnimation(this.IMAGES_JUMP.slice(0, 3), jumpDatas.i);
        return {
            ...jumpDatas,
            i: jumpDatas.i + 1
        };
    }


    /**
     * Handles the upwards phase of the jump after leaving the ground.
     * Triggers the actual jump and sets the appropriate image.
     * 
     * @param {Object} jumpDatas - The jump animation state object
     * @returns {Object} - Updated jumpDatas object.
     */
    handleJumpAnimationUpwards(jumpDatas) {
        let { i, alreadyJumped } = jumpDatas;

        if (!alreadyJumped) {
            this.jump();
            this.stopCurrentSound();
            this.playOrSwitchSound(this.SOUND_JUMP);
            alreadyJumped = true;
            i = 4;
        }

        this.img = this.imgCache[this.IMAGES_JUMP.slice(3, 4)];

        return {
            ...jumpDatas,
            i,
            alreadyJumped
        };
    }


    /**
     * Handles the mid-air phase between ascent and descent.
     * Chooses the correct image depending on the vertical speed (near zero or falling).
     * 
     * @param {number} summitSpeedY - Threshold speed to determine mid-air phase.
     * @returns {void}
     */
    handleJumpAnimationMidAir(summitSpeedY) {
        if (this.speedY < summitSpeedY && this.speedY > -summitSpeedY) {
            this.img = this.imgCache[this.IMAGES_JUMP.slice(4, 5)];
        } else if (this.speedY < -summitSpeedY) {
            this.img = this.imgCache[this.IMAGES_JUMP.slice(5, 6)];
        }
    }


    /**
     * Handles the landing phase when the character touches the ground again.
     * 
     * @param {Object} jumpDatas - The jump animation state object
     * @returns {Object} - Updated jumpDatas object.
     */
    handleJumpAnimationLanding(jumpDatas) {
        this.playAnimation(this.IMAGES_JUMP.slice(6, 8), jumpDatas.i - 4);
        return {
            ...jumpDatas,
            i: jumpDatas.i + 1
        };
    }


    /**
     * Ends the jump animation.
     * Clears related intervals and resumes the idle or default animation.
     *
     * @returns {void}
     */
    handleJumpAnimationEnd() {
        this.removeIntervalById(this.jumpInterval);
        this.removeIntervalById(this.positionInterval);

        this.jumpDatas.i = 0;
        this.jumpDatas.startFromGround = true;
        this.jumpDatas.alreadyJumped = false;

        this.animate();
    }


    /**
     * Pauses the jump animation
     * All state is preserved in jumpDatas for later resumption
     *
     * @returns {void}
     */
    pauseJumpAnimation() {
        this.removeIntervalById(this.jumpInterval);
    }

    /**
     * Resumes the jump animation from the current state in jumpDatas
     * Only resumes if there was an active jump animation (i > 0)
     *
     * @returns {void}
     */
    resumeJumpAnimation() {
        this.jumpInterval = setInterval(() => {
            this.jumpDatas = this.handleJumpAnimationPhase(this.jumpDatas);

            if (this.jumpDatas.i === 0 && this.jumpDatas.alreadyJumped) {
                this.handleJumpAnimationEnd();
            }
        }, 500 / this.picturesForCurrentAnimation.length);

        this.pushToAllIntervals(this.jumpInterval);
    }


    resumeGameplay() {
        this.resumeRightAnimation();
        this.applyGravity();
        this.checkThrow();
    }


    /**
    * Resumes the appropriate animation based on the current character state.
    * Automatically determines whether to continue a paused jump animation
    * or start the default idle/walking animation.
    * 
    * @returns {void}
    */
    resumeRightAnimation() {
        if (this.jumpDatas.i > 0) {
            this.resumeJumpAnimation();
        } else {
            this.animate();
        }
    }


    /**
     * Applies a knockback effect to the character, pushing it left or right for a given duration.
     *
     * During the knockback, the character jumps once, then moves away from the source of the hit
     * at a fixed interval until the duration expires or the player manually moves.
     *
     * @param {boolean} hitFromRight - Indicates if the hit comes from the right side (true) or left side (false).
     * @param {number} duration - Duration of the knockback effect in milliseconds.
     */
    knockBack(hitFromRight, duration) {
        this.jump(3)
        this.removeAnimationById();
        const knockBackInterval = setInterval(() => {
            if (hitFromRight && this.x > 0) {
                this.moveLeft(this.otherDirection)
            } else if (this.x < this.world.level.level_end_x) {
                this.moveRight(!this.otherDirection)
            }
            this.setWorldCameraPositionX();
        }, 1000 / maxFPS)

        const knockBackTimeout = setTimeout(() => {
            this.removeIntervalById(knockBackInterval);
            this.animate();
            this.removeTimeoutById(knockBackTimeout);
        }, duration)

        this.pushToAllTimeouts(knockBackTimeout);

        this.pushToAllIntervals(this.knockBackInterval)
    }


    /**
     * Registers a keyup event listener that checks whether all movement keys
     * (ArrowLeft, ArrowRight, A, D) are released. If none are pressed and the
     * current sound is the walking sound, it stops playback.
     */
    registerStopWalkingListener() {
        window.addEventListener('keyup', () => {
            const k = this.world.keyboard;
            const noMovement = !k.ARROW_LEFT && !k.ARROW_RIGHT && !k.A && !k.D;

            if (noMovement && this.currentAudio === this.SOUND_WALKING) {
                this.stopCurrentSound();
            }
        });
    }


    /**
     * Stops all running animation and movement intervals.
     * This includes position, image, and jump updates.
     *
     * @returns {void}
     */
    removeAllIntervals() {
        this.removeIntervalById(this.positionInterval);
        this.removeIntervalById(this.imageInterval);
        this.removeIntervalById(this.jumpInterval);
        this.removeIntervalById(this.gravityInterval)
    }


    /**
     * Restarts the character by clearing all intervals,
     * resetting the sleep timer, and reinitializing state and animations.
     *
     * @returns {void}
     */
    restart() {
        this.removeAllIntervals();
        this.applyGravity()
        this.setSleepTimer();
        this.init();
        this.animate();
        this.otherDirection = false;
    }


    /**
     * Sets the sleep timer to the current timestamp.
     *
     * @returns {void}
     */
    setSleepTimer() {
        this.sleepTimer = Date.now();
    }


    /**
     * Sets the collected item counts (bottles and coins).
     *
     * @param {number} [bottles=0] - Number of collected bottles.
     * @param {number} [coins=0] - Number of collected coins.
     * @returns {void}
     */
    setCollectedItems(bottles = 0, coins = 0) {
        this.collectedItems = {
            bottles: bottles,
            coins: coins
        }
    }


    /**
     * Searches the level for a collected bottle and throws the first one found.
     * Only one bottle is thrown per call.
     *
     * @returns {void}
     */
    searchAndThrowBottle() {
        const throwableObjects = this.world.level.throwableObjects
        for (let i = 0; i < throwableObjects.length; i++) {
            const bottle = throwableObjects[i];
            if (bottle.isCollected) {
                this.throwBottle(bottle);
                break
            }
        }
    }


    /**
     * Determines and plays the appropriate animation based on the character's current state.
     * Only one animation is played per call, following a priority order:
     * dead, hurt, jumping, walking, sleeping, and idle.
     *
     * Some animations also trigger a sleep timer after being played.
     *
     * @returns void
     */
    setAnimation() {
        if (this.isHurt()) {
            this.playAnimationAndSetSleepTimer(1000, this.IMAGES_HURT);
            this.playOrSwitchSound(this.SOUND_GET_HIT);
        } else if (this.isPressedUp() && this.isJumpAllowed) {
            this.handleJumpAnimation();
            this.setSleepTimer();
        } else if (this.isPressedRight() || this.isPressedLeft()) {
            this.playAnimationAndSetSleepTimer(1000, this.IMAGES_WALK);
            this.playOrSwitchSound(this.SOUND_WALKING);
        } else if (this.checkTimeToSleep()) {
            this.playRightAnimation(2000, this.IMAGES_SLEEP);
            this.playOrSwitchSound(this.SOUND_SNORING);
        } else {
            this.playRightAnimation(1000, this.IMAGES_IDLE);
        }
    }


    /**
     * Plays an animation and then sets a sleep timer.
     *
     * This is used for states that should automatically transition toward a sleep condition
     * if no further input is received.
     *
     * @param timeForFullAnimation - Duration of the animation in milliseconds.
     * @param imageSet - Array of image paths representing the animation frames.
     * @returns void
     */
    playAnimationAndSetSleepTimer(timeForFullAnimation, imageSet) {
        this.playRightAnimation(timeForFullAnimation, imageSet);
        this.setSleepTimer();
    }


    /**
     * Updates the character's horizontal position if alive.
     * Skips movement logic entirely if the character is dead.
     *
     * @returns {void}
     */

    setPosition() {
        if (this.isDead()) {
            return
        } else {
            this.setPositionLeftAndRight();
        }
    }

    /**
     * Moves the character left or right based on input,
     * while ensuring they stay within the level bounds.
     * Also updates the camera position to follow the character.
     *
     * @returns {void}
     */
    setPositionLeftAndRight() {
        if (this.isPressedRight() && this.x < this.world.level.level_end_x) {
            this.moveRight();
        } else if (this.isPressedLeft() && this.x > 0) {
            this.moveLeft();
        }
        this.setWorldCameraPositionX();
    }


    /**
     * Updates the horizontal position of the world camera
     * to follow the character based on their current x position.
     *
     * @returns {void}
     */
    setWorldCameraPositionX() {
        this.world.camera_x = -this.x + 100;
    }


    /**
     * Throws a collected bottle and updates the player's inventory and UI.
     *
     * @param {{ throw: Function, isCollected: boolean }} bottle - The bottle object to be thrown.
     * @returns {void}
     */
    throwBottle(bottle) {
        bottle.throw()
        bottle.isCollected = false;
        this.collectedItems.bottles--;
        this.handleStatusPercentage(2, this.collectedItems.bottles);
    }
}
