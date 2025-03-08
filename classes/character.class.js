class Character extends MovableObject {
    standartHeight = 1200;
    height = this.standartHeight / backgroundStandartHeight * canvasHeight * 0.5;
    width = 610 * this.height / this.standartHeight;

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
    ]

    constructor() {
        super().loadImage('./assets/img/2_character_pepe/1_idle/idle/I-1.png')
        this.loadImages(this.IMAGES_IDLE)

        this.x = 70;

        this.animate();
    }

    animate() {
        setInterval(() => {
            let i = this.currentImage % this.IMAGES_IDLE.length;
            let path = this.IMAGES_IDLE[i];
            this.img = this.imgCache[path];
            this.currentImage++
        }, 4000 / this.IMAGES_IDLE.length)
    }
}