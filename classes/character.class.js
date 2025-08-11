class Character extends LivingObject {
    static KNOCKBACK_JUMP_STRENGTH = 3;
    STANDARD_HEALTH = 100;
    SUMMIT_SPEED_Y = 5;

    collectedItems = {};
    sizeFactor = 0.5;

    lastVisibleEndY;

    jumpDatas = {};

    timeForFullAnimation = 1000;
    sleepTimer = Date.now();

    isJumpAllowed = true;
    checkThrowInterval;
    knockBackTimeout;

    lastThrownBottle = new Date().getTime();


    /**
     * Initializes the character's position and health.
     * Also sets up the initially collected items.
     *
     * @returns {void}
     */
    init() {
        this.health = this.STANDARD_HEALTH;
        this.setCollectedItems();

        this.x = 70;
        this.y = this.calculateY();
        this.lastVisibleEndY = this.returnVisibleEndY();
        this.jumpDatas = {
            i: 0,
            startFromGround: true,
            alreadyJumped: false,
        }

        this.checkThrow();
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
                this.lastThrownBottle = Date.now();
            }
        }, this.CHECK_THROW_INTERVAL_MS / maxFPS);
        this.pushToAllIntervals(this.checkThrowInterval);
    }

    /**
     * Checks if the player can throw a collected bottle.
     * 
     * Conditions:
     * - The throw action/button is currently pressed.
     * - There is at least one bottle collected.
     * - The cooldown time since the last thrown bottle has passed (1500 ms).
     * 
     * @returns {boolean} True if the player can throw a bottle, otherwise false.
     */
    checkThrowCollectedBottle() {
        const THROW_COOLDOWN_MS = 1500;
        const currentTime = Date.now();
        const timeSinceLastThrow = currentTime - (this.lastThrownBottle || 0);

        const hasBottles = this.collectedItems['bottles'] > 0;
        const cooldownOver = timeSinceLastThrow > THROW_COOLDOWN_MS;

        return this.isPressedThrow() && hasBottles && cooldownOver;
    }


    /**
     * Determines whether the character has been inactive long enough to enter sleep mode.
     *
     * @returns {boolean} True if 5 seconds have passed since the last activity.
     */
    checkTimeToSleep() {
        return Date.now() - this.sleepTimer > 10000;
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
    getHit(hitFromRight, damage = 20, duration = 200) {
        this.knockBack(hitFromRight, duration);
        this.hit(damage);
        world.fixedStatusbars[0].setPercentage(this.health);

        if (this.health <= 0) {
            world.handleGameOver(this, false);
        }
    }


    /**
     * Enables jumping once the character is detected to be standing on the ground.
     * Continuously checks ground status and clears the interval once jumping is allowed.
     */
    allowJump() {
        let allowJumpInterval = setInterval(() => {
            if (this.standOnGround()) {
                this.isJumpAllowed = true;
                this.removeIntervalById(allowJumpInterval);
            }
        }, 1000 / maxFPS)
        this.pushToAllIntervals(allowJumpInterval);
    }


    /**
     * Checks whether the character is jumping onto the given movable object from above.
     * @param {MovableObject} mo - The movable object to check against.
     * @returns {boolean} True if the character is falling onto the object from above.
     */
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
     * Pauses the jump animation
     * All state is preserved in jumpDatas for later resumption
     *
     * @returns {void}
     */
    pauseJumpAnimation() {
        this.removeIntervalById(this.jumpInterval);
    }


    /**
     * Resumes core gameplay behavior after a pause or interruption.
     * Restarts the rightward movement animation, reapplies gravity,
     * and re-enables the ability to throw objects.
     */
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
        this.jump(Character.KNOCKBACK_JUMP_STRENGTH)
        this.stopAnimation();
        this.knockBackInterval = this.returnKnockbackInterval(hitFromRight);

        this.knockBackTimeout = this.returnKnockbackTimeout(duration);

        this.pushToAllTimeouts(this.knockBackTimeout);

        this.pushToAllIntervals(this.knockBackInterval)
    }

    /**
     * Starts and returns an interval that applies horizontal knockback movement.
     *
     * The character is pushed left or right on each tick depending on the direction
     * of the hit. The movement stops when the interval is manually cleared.
     *
     * @param {boolean} hitFromRight - If true, the character is hit from the right and moves left; otherwise, it moves right.
     * @returns {number} The interval ID that controls the knockback movement.
     */
    returnKnockbackInterval(hitFromRight) {
        return setInterval(() => {
            if (hitFromRight && this.x > 0) {
                this.moveLeft(this.otherDirection)
            } else if (this.x < this.world.level.levelEndX) {
                this.moveRight(!this.otherDirection)
            }
            this.setWorldCameraPositionX();
        }, 1000 / maxFPS)
    }


    /**
     * Starts and returns a timeout that ends the knockback effect after a set duration.
     *
     * Once triggered, it removes the knockback movement interval,
     * restarts character animation, and clears the timeout from tracking.
     *
     * @param {number} duration - Duration in milliseconds before the knockback effect ends.
     * @returns {number} The timeout ID that will stop the knockback after the duration.
     */
    returnKnockbackTimeout(duration) {
        return setTimeout(() => {
            this.removeIntervalById(this.knockBackInterval);
            this.animate();
            this.removeTimeoutById(this.knockBackTimeout);
        }, duration)
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
        if (this.isPressedRight() && this.x < this.world.level.levelEndX) {
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