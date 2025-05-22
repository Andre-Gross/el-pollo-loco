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


    /**
     * Creates an instance of the small chicken enemy and initializes its state.
     *
     * @param {number} endOfX - The maximum horizontal coordinate the character can reach.
     *                          Used to calculate a random spawn position within that range.
     */
    constructor(endOfX) {
        super().loadImage('./assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png')
        this.loadImage(this.IMAGE_DEAD);
        this.loadImages(this.IMAGES_WALK);
        this.endOfX = endOfX;

        this.setSizes();
        this.y = this.calculateY();

        this.init(endOfX);
    }


    /**
     * Starts the animation by adding position and image update intervals.
     * @returns void
     */
    animate() {
        this.addPositionInterval();
        this.addImageInterval(300, this.IMAGES_WALK);
    }
}