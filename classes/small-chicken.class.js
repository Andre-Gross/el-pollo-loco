class SmallChicken extends Chicken {
    standartHealth = 5;

    originalImgHeight = 210;
    originalImgWidth = 236;
    sizeFactor = 0.35;

    imgOffsetOriginal = {
        left: 41,
        top: 34,
        right: 59,
        bottom: 41
    };

    height = this.calculateHeight();
    width = this.calculateWidth();

    y = this.calculateY();

    minSpeedXPerSecond = 12;
    maxAdditionalSpeedXPerSecond = 36;

    standartSpeedXPerFrame = this.calculateSpeedPerFrame();
    speedXPerFrame = this.standartSpeedXPerFrame;
    

    IMAGES_WALK = [
        './assets/img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        './assets/img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
        './assets/img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        './assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
    ];

    IMAGE_DEAD = './assets/img/3_enemies_chicken/chicken_small/2_dead/dead.png'


    constructor(endOfX) {
        super().loadImage('./assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png')
        this.loadImage(this.IMAGE_DEAD);
        this.loadImages(this.IMAGES_WALK);
        this.endOfX = endOfX;

        this.init(endOfX);
    }

    animate() {
        this.positionInterval = setInterval(() => {
            this.alignSelfTo(world.character)
            this.x -= this.speedXPerFrame;
        }, 1000 / maxFPS);
        this.pushToAllIntervals(this.positionInterval);

        this.imageInterval = setInterval(() => {
            this.setAnimation();
        }, 300 / this.IMAGES_WALK.length)
        this.pushToAllIntervals(this.imageInterval);
    }
}