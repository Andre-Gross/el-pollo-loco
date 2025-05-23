class StartScreen extends DrawableObject {
    x = 0
    y = 0

    height = canvasHeight;
    width = (1920 * this.height / backgroundImgOriginalHeight)

    IMAGES = [
        './assets/img/9_intro_outro_screens/start/startscreen_1.png',
        './assets/img/9_intro_outro_screens/start/startscreen_2.png'
    ]

    imgCache = [];


    /**
     * Constructor initializes the start screen by loading images and
     * randomly selecting one to display.
     */
    constructor() {
        super()
        this.loadImages(this.IMAGES);

        if (Math.random > 0.5) {
            this.img = this.imgCache[this.IMAGES[0]];
        } else {
            this.img = this.imgCache[this.IMAGES[1]];
        }
    }
}