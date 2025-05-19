class Character extends MovableObject {
    health = 100000000

    collectedItems = {
        bottles: 0,
        coins: 0
    }

    originalImgHeight = 1200;
    originalImgWidth = 610;
    sizeFactor = 0.5;

    height = this.calculateHeight();
    width = this.calculateWidth();

    imgOffsetOriginal = {
        left: 96,
        top: 464,
        right: 97,
        bottom: 60
    };
    imgOffsetCanvas = this.scaleImgOffset();

    x = 70;
    y = this.calculateY();

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

    timeForFullAnimation = 1000;
    picturesForCurrentAnimation = this.IMAGES_IDLE;
    sleepTimer = Date.now();

    checkThrowInterval;


    constructor() {
        super().loadImage('./assets/img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_SLEEP);
        this.loadImages(this.IMAGES_WALK);
        this.loadImages(this.IMAGES_JUMP);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);

        this.applyGravity();

        this.animate();
        this.checkThrow();
    }


    animate() {
        this.positionInterval = setInterval(() => {
            this.setPosition();
        }, 1000 / maxFPS);

        this.imageInterval = setInterval(() => {
            this.setAnimation();
        }, this.timeForFullAnimation / this.picturesForCurrentAnimation.length)

        this.pushAnimationToAllIntervals();
    }


    checkThrow() {
        this.checkThrowInterval = setInterval(() => {
            if (this.isPressedThrow() && this.collectedItems['bottles'] > 0) {
                const throwableObjects = this.world.level.throwableObjects
                for (let i = 0; i < throwableObjects.length; i++) {
                    const bottle = throwableObjects[i];
                    if (bottle.isCollected) {
                        bottle.throw()
                        bottle.isCollected = false;
                        this.collectedItems.bottles--;
                        this.handleStatusPercentage(2, this.collectedItems.bottles);
                        break
                    }
                }
                this.world.keyboard.T = false;


            }
        }, 1000 / maxFPS);
        this.pushToAllIntervals(this.checkThrowInterval);
    }


    checkTimeToSleep() {
        return Date.now() - this.sleepTimer > 5000;
    }


    getHit(hitFromRight, damage = 10, duration = 500) {
        this.hit(damage);
        world.statusBars[0].setPercentage(this.health);
        this.knockBack(hitFromRight, duration);
    }


    isPressedLeft() {
        return (this.world.keyboard.ARROW_LEFT || this.world.keyboard.A);
    }


    isPressedMove() {
        return (this.isPressedLeft() || this.isPressedRight() || this.isPressedUp())
    }


    isPressedRight() {
        return (this.world.keyboard.ARROW_RIGHT || this.world.keyboard.D);
    }


    isPressedThrow() {
        return (this.world.keyboard.T)
    }


    isPressedUp() {
        return (this.world.keyboard.ARROW_UP || this.world.keyboard.W || this.world.keyboard.SPACE);
    }


    handleJumpAnimation(startFromGround = true) {
        this.removeIntervalById(this.imageInterval);
        let i = 0;
        let summitSpeedY = 5;
        let alreadyJumped = false;
        this.jumpInterval = setInterval(() => {
            if (i < 3 && startFromGround) {
                this.playAnimation(this.IMAGES_JUMP.slice(0, 3), i)
                i++
            } else if (i <= 3 || this.speedY > summitSpeedY) {
                if (!alreadyJumped) {
                    this.jump();
                    alreadyJumped = true
                    i = 4;
                    // this.positionInterval = setInterval(() => {
                    //     this.setPositionLeftAndRight();
                    // }, 1000 / maxFPS)
                }
                this.img = this.imgCache[this.IMAGES_JUMP.slice(3, 4)]
            } else if (i === 6) {
                this.removeIntervalById(this.jumpInterval);
                this.removeIntervalById(this.positionInterval);
                this.animate();
            } else if (this.standOnGround()) {
                // if (!alreadyStand) {
                //     removeIntervalById(this.positionInterval);
                // }
                this.playAnimation(this.IMAGES_JUMP.slice(6, 8), i - 4)
                i++;
            } else if (this.speedY < summitSpeedY && this.speedY > -summitSpeedY) {
                this.img = this.imgCache[this.IMAGES_JUMP.slice(4, 5)]
            } else if (this.speedY < -summitSpeedY) {
                this.img = this.imgCache[this.IMAGES_JUMP.slice(5, 6)]
            }
        }, 500 / this.picturesForCurrentAnimation.length)

        this.pushToAllIntervals(this.jumpInterval);
    }


    knockBack(hitFromRight, duration) {
        this.jump(3)
        const knockBackInterval = setInterval(() => {
            if (hitFromRight && this.x > 0) {
                this.moveLeft()
            } else if (this.x < this.world.level.level_end_x) {
                this.moveRight()
            }
            if (this.isPressedMove()) {
                clearTimeout(knockBackTimeout);
                this.removeIntervalById(knockBackInterval);
            }
        }, 1000 / maxFPS)

        const knockBackTimeout = setTimeout(() => {
            this.removeIntervalById(knockBackInterval);
        }, duration)

        this.pushToAllIntervals(this.knockBackInterval)
    }


    resetSleepTimer(time = 0) {
        this.sleepTimer = Date.now();
    }


    setAnimation() {
        if (this.isDead()) {
            this.playRightAnimation(2000, this.IMAGES_DEAD)
        } else if (this.isHurt()) {
            this.playRightAnimation(1000, this.IMAGES_HURT)
            this.resetSleepTimer();
        } else if (this.isAboveGround()) {
            this.playRightAnimation(1000, this.IMAGES_JUMP)
            this.resetSleepTimer();
        } else {
            if (this.isPressedUp()) {
                this.handleJumpAnimation();
                this.resetSleepTimer();
            } else if (this.isPressedRight() || this.isPressedLeft()) {
                this.playRightAnimation(1000, this.IMAGES_WALK);
                this.resetSleepTimer();
            } else {
                if (this.checkTimeToSleep()) {
                    this.playRightAnimation(2000, this.IMAGES_SLEEP)
                } else {
                    this.playRightAnimation(1000, this.IMAGES_IDLE)
                }
            }
        }
    }


    setPosition() {
        if (this.isDead()) {
            return
        } else {
            this.setPositionLeftAndRight();
        }
    }


    setPositionLeftAndRight() {
        if (this.isPressedRight() && this.x < this.world.level.level_end_x) {
            this.moveRight();
        } else if (this.isPressedLeft() && this.x > 0) {
            this.moveLeft();
        }
        this.setWorldCameraPositionX();
    }


    setWorldCameraPositionX() {
        this.world.camera_x = -this.x + 70;
    }
}
