class Endboss extends Enemy {
    STANDARD_HEALTH = 100;

    originalImgHeight = 1217;
    originalImgWidth = 1045;

    speedXPerSecond = 240;

    imgOffsetOriginal = {
        left: 187,
        top: 468,
        right: 139,
        bottom: 125
    };

    timeForFullAnimation = 1000;
    walkAttackCounter = 0;
    attackState = {};

    SOUND_GET_HIT = new Audio('./assets/sounds/endboss/eb_get_hit_cut.mp3');
    SOUND_LANDING = new Audio('./assets/sounds/endboss/eb_landing_cut.mp3');
    SOUND_JUMP = new Audio('./assets/sounds/endboss/eb_jump_cut.mp3');
    SOUND_WALKING = new Audio('./assets/sounds/endboss/eb_walking_edited.mp3');

    IMAGES_ALERT = [
        'assets/img/4_enemie_boss_chicken/2_alert/G5.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G6.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G7.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G8.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G9.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G10.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G11.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G12.png',
    ]
    IMAGES_ATTACK = [
        './assets/img/4_enemie_boss_chicken/3_attack/G13.png',
        './assets/img/4_enemie_boss_chicken/3_attack/G14.png',
        './assets/img/4_enemie_boss_chicken/3_attack/G15.png',
        './assets/img/4_enemie_boss_chicken/3_attack/G16.png',
        './assets/img/4_enemie_boss_chicken/3_attack/G17.png',
        './assets/img/4_enemie_boss_chicken/3_attack/G18.png',
        './assets/img/4_enemie_boss_chicken/3_attack/G19.png',
        './assets/img/4_enemie_boss_chicken/3_attack/G20.png',
    ]
    IMAGES_DEAD = [
        './assets/img/4_enemie_boss_chicken/5_dead/G24.png',
        './assets/img/4_enemie_boss_chicken/5_dead/G25.png',
        './assets/img/4_enemie_boss_chicken/5_dead/G26.png',
    ]
    IMAGES_HURT = [
        './assets/img/4_enemie_boss_chicken/4_hurt/G21.png',
        './assets/img/4_enemie_boss_chicken/4_hurt/G22.png',
        './assets/img/4_enemie_boss_chicken/4_hurt/G23.png',
    ]
    IMAGES_WALK = [
        './assets/img/4_enemie_boss_chicken/1_walk/G1.png',
        './assets/img/4_enemie_boss_chicken/1_walk/G2.png',
        './assets/img/4_enemie_boss_chicken/1_walk/G3.png',
        './assets/img/4_enemie_boss_chicken/1_walk/G4.png',
    ]


    /**
     * Constructs the enemy boss character.
     * Loads all relevant images, sets initial properties, sizes, speed, and applies gravity.
     */
    constructor() {
        super().loadImage('assets/img/4_enemie_boss_chicken/2_alert/G5.png');
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_WALK);
        this.picturesForCurrentAnimation = this.IMAGES_ALERT;

        this.setSizes();
        this.imgOffsetCanvas = this.scaleImgOffset();
        this.setSpeedX();
        this.init();

        this.applyGravity();

    }


    /**
     * Initializes the enemy's position and health.
     * Sets the initial x and y coordinates based on the canvas size and sets the default health.
     */
    init() {
        this.x = 2700 / backgroundImgOriginalHeight * canvasHeight;
        this.y = this.calculateY();

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
            world.handleGameOverByEndbossDead();
        }
    }


    /**
     * Starts the boss jump attack sequence.
     * Manages all animation phases using a frame-based loop.
     * 
     * @returns {void}
     */
    handleJumpAttack(i = this.attackState.jumpAttack.i, alreadyJumped = this.attackState.jumpAttack.alreadyJumped) {
        this.removeIntervalById(this.imageInterval);

        this.jumpInterval = setInterval(() => {
            ({ i, alreadyJumped } = this.handleJumpAttackPhase({ i, alreadyJumped }));
            this.attackState.jumpAttack = {
                i: i,
                alreadyJumped: alreadyJumped
            }
        }, 500 / this.picturesForCurrentAnimation.length);

        this.pushToAllIntervals(this.jumpInterval);
    }


    /**
     * Controls the current phase of the boss jump attack.
     * Delegates logic based on frame index and vertical state.
     * 
     * @param {Object} params
     * @param {number} params.i - Current frame index.
     * @param {boolean} params.alreadyJumped - Whether the boss has already jumped.
     * @returns {{ i: number, alreadyJumped: boolean }} - Updated animation state.
     */
    handleJumpAttackPhase({ i, alreadyJumped }) {
        if (i < 3) {
            return this.handleJumpAttackStart(i);
        } else if (i === 3) {
            return this.handleJumpAttackLeap({ i, alreadyJumped });
        } else if (i === 6) {
            this.handleJumpAttackEnd();
        } else if (this.standOnGround()) {
            return this.handleJumpAttackLanding(i);
        } else if (this.speedY > 0) {
            this.handleJumpAttackMidAir();
        } else if (this.speedY < 0) {
            this.handleJumpAttackDescending();
        }
        return { i, alreadyJumped };
    }


    /**
     * Handles the start phase of the boss jump attack.
     * 
     * @param {number} i - Current frame index.
     * @returns {{ i: number }} - Updated index.
     */
    handleJumpAttackStart(i) {
        this.playAnimation(this.IMAGES_ATTACK.slice(0, 3), i);
        return { i: i + 1 };
    }


    /**
     * Triggers the boss's actual jump and horizontal movement.
     * 
     * @param {Object} params
     * @param {number} params.i - Current frame index.
     * @param {boolean} params.alreadyJumped - Whether the jump was already triggered.
     * @returns {{ i: number, alreadyJumped: boolean }} - Updated state.
     */
    handleJumpAttackLeap({ i, alreadyJumped }) {
        if (!alreadyJumped) {
            this.jump(13);
            this.playOrSwitchSound(this.SOUND_JUMP);
            this.alignSelfTo(world.character);
            this.startPositionInterval(-this.speedXPerFrame);
            alreadyJumped = true;
            i = 4;
        }
        this.img = this.imgCache[this.IMAGES_ATTACK.slice(3, 4)];
        return { i, alreadyJumped };
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
     * Displays the appropriate image while the boss is falling.
     * 
     * @returns {void}
     */
    handleJumpAttackMidAir() {
        this.img = this.imgCache[this.IMAGES_ATTACK.slice(4, 5)];
    }


    /**
     * Displays the appropriate image while the boss is ascending.
     * 
     * @returns {void}
     */
    handleJumpAttackDescending() {
        this.img = this.imgCache[this.IMAGES_ATTACK.slice(5, 6)];
    }


    /**
     * Handles the landing animation once the boss touches the ground.
     * 
     * @param {number} i - Current frame index.
     * @returns {{ i: number }} - Updated index.
     */
    handleJumpAttackLanding(i) {
        this.removeIntervalById(this.positionInterval);
        this.alignSelfTo(world.character);
        this.playAnimation(this.IMAGES_ATTACK.slice(6, 8), i - 4);
        this.playOrSwitchSound(this.SOUND_LANDING);
        return { i: i + 1 };
    }

    /**
     * Ends the boss jump attack sequence.
     * Clears active intervals and returns to default animation.
     * 
     * @returns {void}
     */
    handleJumpAttackEnd() {
        this.removeIntervalById(this.jumpInterval);
        this.animate();

        this.resetAttackState();
    }


    /**
     * Initiates the walk attack sequence for the boss.
     * Increases movement speed, starts animation and movement,
     * and ends the sequence after a fixed duration.
     * 
     * @returns {void}
     */
    handleWalkAttack(timeForWalkAttack = 1000) {
        const additionalSpeed = 150 / maxFPS;
        const walkAttackSpeed = this.standardSpeedXPerFrame + additionalSpeed;

        this.handleWalkAttackAnimation();
        this.handleWalkAttackMovement(walkAttackSpeed);
        this.playOrSwitchSound(this.SOUND_WALKING);

        this.attackState.walkAttack.start = Date.now();
        let walkAttackTimeout = setTimeout(() => {
            this.handleWalkAttackEnd();
            this.removeTimeoutById(walkAttackTimeout)
            this.stopCurrentSound();
        }, timeForWalkAttack);
        this.pushToAllTimeouts(walkAttackTimeout);
    }


    /**
     * Starts the attack animation interval.
     * Shows walking or alert animation based on movement.
     * 
     * @returns {void}
     */
    handleWalkAttackAnimation() {
        this.removeIntervalById(this.imageInterval);
        this.imageInterval = setInterval(() => {
            if (this.speedXPerFrame === 0) {
                this.playAnimation(this.IMAGES_ALERT);
            } else {
                this.playAnimation(this.IMAGES_WALK);
            }
        }, 600 / this.IMAGES_WALK.length);
        this.pushToAllIntervals(this.imageInterval);
    }


    /**
     * Starts the movement interval that moves the boss to the left.
     * Aligns the boss to the main character before moving.
     * 
     * @returns {void}
     */
    handleWalkAttackMovement(speed) {
        this.alignSelfTo(world.character);
        if (this.otherDirection) {
            speed = -speed;
        }
        this.positionInterval = setInterval(() => {
            this.x -= speed;
        }, 1000 / maxFPS);
        this.pushToAllIntervals(this.positionInterval);
    }


    /**
     * Ends the walk attack sequence.
     * Restores original speed and stops animation.
     * 
     * @param {number} additionalSpeed - The temporary speed that was added during the attack.
     * @returns {void}
     */
    handleWalkAttackEnd() {
        this.removeAnimationById();
        this.animate();
        this.resetAttackState();
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
     * Resumes the Endboss's behavior after being paused or interrupted.
     * Continues animations, gravity, sounds, and attack checks.
     * 
     * @returns {void}
     */
    resumeGameplay() {
        const jump = this.attackState.jumpAttack
        const walk = this.attackState.walkAttack
        this.applyGravity()
        if (jump.i > 0) {
            this.handleJumpAttack(jump.i, jump.alreadyJumped);
            if (jump.i > 3) {
                this.positionInterval = setInterval(() => {
                    this.x -= this.speedXPerFrame;
                }, 1000 / maxFPS)
                pushToAllIntervals(this.positionInterval);
            }
        } else if (walk.duration > 0) {
            this.handleWalkAttack(walk.duration);
        } else {
            this.animate();
        }
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
     * Resets the Endboss's attack state to its default values.
     * This is typically called after an attack has finished or was interrupted.
     * 
     * @returns {void}
     */
    resetAttackState() {
        this.attackState = {
            currentAttack: null,

            jumpAttack: {
                i: 0,
                alreadyJumped: false
            },

            walkAttack: {
                start: 0,
                duration: 0
            }
        }
    }


    /**
     * Determines whether the enemy should initiate an attack based on proximity and probability.
     *
     * @param {number} [probabilityOfAttackInPercent=5] - Chance (in percent) to initiate an attack when close to the player.
     * @returns {boolean} - `true` if attack should be initiated, otherwise `false`.
     */
    shallAttack(probabilityOfAttackInPercent = 5) {
        const character = world.character;
        if (this.calculateDistanceTo(character) < this.speedXPerSecond * 2) {
            return Math.random() > (100 - probabilityOfAttackInPercent) / 100
        }
    }


    /**
     * Determines whether the enemy should perform a jump attack.
     * A jump attack is triggered if the player is close enough and
     * either the walk attack counter reached 2 or a random chance succeeds.
     *
     * @returns {boolean} - `true` if jump attack should be performed, otherwise `false`.
     */
    shallJumpAttack() {
        if (this.calculateDistanceTo(world.character) < this.speedXPerSecond) {
            if (this.counterWalkAttack >= 2 || Math.random() > 0.5) {
                this.counterWalkAttack = 0;
                return true
            }
        }
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


    /**
     * Handles the death animation and schedules final frame.
     *
     * @param {number} timeToDie - Total duration of the death animation.
     * @returns {void}
     */
    handleDeathAnimation(timeToDie) {
        this.playRightAnimation(timeToDie, this.IMAGES_DEAD, 0);
        setTimeout(() => {
            this.removeAnimationById();
            this.img = this.imgCache[this.IMAGES_DEAD[2]];
        }, timeToDie - (timeToDie / this.IMAGES_DEAD.length));
    }


    /**
     * Decides whether to execute a jump or walk attack.
     * Increments the walk attack counter if applicable.
     *
     * @returns {void}
     */
    handleAttackDecision() {
        if (this.shallJumpAttack()) {
            this.handleJumpAttack();
        } else {
            this.handleWalkAttack();
            this.counterWalkAttack++;
        }
    }
}