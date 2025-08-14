class CharacterPepe extends Character {
    DIE_ANIMATION_DURATION_MS = 2000;
    CHECK_THROW_INTERVAL_MS = 1000 / maxFPS;
    JUMP_ANIMATION_DURATION_MS = 500;

    originalImgHeight = 1200;
    originalImgWidth = 610;

    imgOffsetOriginal = {
        left: 96,
        top: 464,
        right: 186,
        bottom: 60,
        bottomHitbox: 60,
    };

    speedXPerSecond = 480;
    speedXPerFrame = this.calculateSpeedPerFrame(this.speedXPerSecond);

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

    picturesForCurrentAnimation = this.IMAGES_IDLE;


    /**
     * Creates a new character instance and initializes all required values.
     */
    constructor() {
        super()
        this.loadImage('./assets/img/2_character_pepe/2_walk/W-21.png');
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
        this.registerStopWalkingListener()
    }


    /**
     * Starts the character's death animation by cycling through the death image sequence.
     * After the animation is completed, a static final frame is shown.
     * All intervals and timeouts are tracked for later cleanup.
     */
    die() {
        let index = 0;
        let dieInterval = setInterval(() => {
            if (index === this.IMAGES_DEAD.length) {
                this.removeIntervalById(dieInterval);
            } else {
                let path = this.IMAGES_DEAD[index];
                this.img = this.imgCache[path];
                index++;
            }
        }, this.DIE_ANIMATION_DURATION_MS / this.IMAGES_DEAD.length);

        let dieTimeout = setTimeout(() => {
            this.img = this.imgCache[this.IMAGES_DEAD.slice(5, 6)];
            this.removeTimeoutById(dieTimeout);
        }, this.DIE_ANIMATION_DURATION_MS)
        this.pushToAllTimeouts(dieTimeout);
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
        }, this.JUMP_ANIMATION_DURATION_MS / this.picturesForCurrentAnimation.length);

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

        if (i < 3 && startFromGround) {
            return this.handleJumpAnimationStart(jumpDatas);
        } else if (i <= 3 || this.speedY > this.SUMMIT_SPEED_Y) {
            return this.handleJumpAnimationUpwards(jumpDatas);
        } else if (i === 6) {
            return { ...jumpDatas, i: 0 };
        } else if (this.standOnGround()) {
            return this.handleJumpAnimationLanding(jumpDatas);
        } else {
            this.handleJumpAnimationMidAir();
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
        if (jumpDatas.i === 0) {
            this.jump();
        }
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
            if (!jumpDatas.startFromGround) {
                this.jump();
            }
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
     * @param {number} this.SUMMIT_SPEED_Y - Threshold speed to determine mid-air phase.
     * @returns {void}
     */
    handleJumpAnimationMidAir() {
        if (this.speedY < this.SUMMIT_SPEED_Y && this.speedY > -this.SUMMIT_SPEED_Y) {
            this.img = this.imgCache[this.IMAGES_JUMP.slice(4, 5)];
        } else if (this.speedY < -this.SUMMIT_SPEED_Y) {
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
        }, this.JUMP_ANIMATION_DURATION_MS / this.picturesForCurrentAnimation.length);

        this.pushToAllIntervals(this.jumpInterval);
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
}