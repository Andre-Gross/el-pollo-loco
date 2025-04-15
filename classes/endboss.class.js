class Endboss extends MovableObject {
    originalImgHeight = 1217;
    originalImgWidth = 1045;

    height = this.calculateHeight();
    width = this.calculateWidth();

    x;
    y;

    speedXPerSecond = 240;
    speedXPerFrame = this.calculateSpeedPerFrame(this.speedXPerSecond);

    imgOffsetOriginal = {
        left: 187,
        top: 468,
        right: 139,
        bottom: 125
    };

    imgOffsetCanvas = this.scaleImgOffset();

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

    timeForFullAnimation = 1000;
    picturesForCurrentAnimation = this.IMAGES_ALERT;


    constructor() {
        super().loadImage('assets/img/4_enemie_boss_chicken/2_alert/G5.png');
        this.loadImages(this.IMAGES_ALERT);
        this.x = 2700 / backgroundImgOriginalHeight * canvasHeight;
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_WALK);
        this.x = 600 / backgroundImgOriginalHeight * canvasHeight;
        this.y = this.calculateY();

        this.applyGravity();

        this.animate()

    }


    animate() {

        this.imageInterval = setInterval(() => {
            this.setAnimation();
        }, this.timeForFullAnimation / this.picturesForCurrentAnimation.length)
    }


    getHit(damage = 10) {
        this.hit(damage);
        if (this.health === 0) {
            this.speedXPerFrame = 0
        }
    }


    handleAttackAnimation() {
        clearInterval(this.imageInterval);
        let i = 0;
        let alreadyJumped = false;
        this.jumpInterval = setInterval(() => {
            if (i < 3) {
                this.playAnimation(this.IMAGES_ATTACK.slice(0, 3), i)
                i++
            } else if (i === 3) {
                if (!alreadyJumped) {
                    this.jump();
                    this.positionInterval = setInterval(() => {
                        this.x -= this.speedXPerFrame;
                    }, 1000 / maxFPS);

                    alreadyJumped = true
                    i = 4;
                }
                this.img = this.imgCache[this.IMAGES_ATTACK.slice(3, 4)];
            } else if (i === 6) {
                clearInterval(this.jumpInterval);
                this.animate();
            } else if (this.standOnGround()) {
                clearInterval(this.positionInterval);
                alreadyJumped = false;
                this.playAnimation(this.IMAGES_ATTACK.slice(6, 8), i - 4)
                i++
            } else if (this.speedY > 0) {
                this.img = this.imgCache[this.IMAGES_ATTACK.slice(4, 5)]
            } else if (this.speedY < 0) {
                this.img = this.imgCache[this.IMAGES_ATTACK.slice(5, 6)]
            }
        }, 500 / this.picturesForCurrentAnimation.length)
    }


    setAnimation() {
        const timeToDie = 900;
        if (this.isDead()) {
            this.playRightAnimation(timeToDie, this.IMAGES_DEAD, 0);
            setTimeout(() => {
                this.clearAnimation();
                this.img = this.imgCache[this.IMAGES_DEAD[2]];
            }, timeToDie - (timeToDie / this.IMAGES_DEAD.length))
        } else if (this.isHurt()) {
            this.playRightAnimation(600, this.IMAGES_HURT);
        } else {
            this.playRightAnimation(1200, this.IMAGES_ALERT);
        }
    }
}