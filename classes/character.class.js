class Character extends MovableObject {
    standartImgHeight = 1200;
    standartImgWidth = 610;
    height = this.standartImgHeight * backgroundHeightFactor * 0.5;
    width = this.standartImgWidth * this.height / this.standartImgHeight;

    speedXPerSecond = 480;
    speedXPerFrame = this.speedXPerSecond / maxFPS;

    imgOffsetStandard = {
        left: 96,
        top: 464,
        right: 97,
        bottom: 60
    };
    imgOffsetCanvas = this.scaleImgOffset();

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

    world;


    constructor() {
        super().loadImage('./assets/img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_WALK);
        this.loadImages(this.IMAGES_JUMP);

        this.x = 70;
        this.y = this.calculateY();
        this.applyGravity();

        this.animate();
    }


    animate() {

        setInterval(() => {
            this.setPosition();
        }, 1000 / maxFPS);

        setInterval(() => {
            this.setAnimation();
        }, 1000 / this.IMAGES_WALK.length)
    }


    isPressedLeft() {
        return (this.world.keyboard.ARROW_LEFT || this.world.keyboard.A);
    }


    isPressedRight() {
        return (this.world.keyboard.ARROW_RIGHT || this.world.keyboard.D);
    }


    isPressedUp() {
        return (this.world.keyboard.ARROW_UP || this.world.keyboard.W || this.world.keyboard.SPACE);
    }


    setAnimation() {
        if (this.isAboveGround()) {
            this.playAnimation(this.IMAGES_JUMP);
        } else {
            if (this.isPressedUp()) {
                this.playAnimation(this.IMAGES_JUMP);
            } else if (this.isPressedRight() || this.isPressedLeft()) {
                this.playAnimation(this.IMAGES_WALK);
            } else {
                this.playAnimation(this.IMAGES_IDLE);
            }
        }
    }


    setPosition() {
        if (this.isPressedUp() && !this.isAboveGround()) {
            this.jump();
        } else if (this.isPressedRight() && this.x < this.world.level.level_end_x) {
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