class Character extends MovableObject {
    standartHeight = 1200;
    height = this.standartHeight / backgroundStandartHeight * canvasHeight * 0.5;
    width = 610 * this.height / this.standartHeight;

    speed = 480 / maxFPS;

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
    ]

    world;

    constructor() {
        super().loadImage('./assets/img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALK)

        this.x = 70;

        this.animate();
    }

    animate() {

        setInterval(() => {
            if (this.world.keyboard.ARROW_RIGHT) {
                this.x += this.speed;
                this.otherDirection = false;
            } else if (this.world.keyboard.ARROW_LEFT) {
                this.x -= this.speed;
                this.otherDirection = true;
            }
            this.world.camera_x = -this.x;
        }, 1000 / maxFPS)

        setInterval(() => {
            if (this.world.keyboard.ARROW_RIGHT || this.world.keyboard.ARROW_LEFT) {

                let i = this.currentImage % this.IMAGES_WALK.length;
                let path = this.IMAGES_WALK[i];
                this.img = this.imgCache[path];
                this.currentImage++
            }
        }, 1000 / this.IMAGES_WALK.length)
    }
}