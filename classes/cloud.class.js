class Cloud extends BackgroundObject {
    height = canvasHeight;
    width = (3840 * this.height / backgroundImgOriginalHeight);

    speed = 6 / maxFPS;

    constructor(x = 0) {
        super().loadImage('./assets/img/5_background/layers/4_clouds/full.png')

        this.x = x + Math.random() * 500;
        this.y = canvasHeight - this.height;

        this.animate();
    }


    animate() {
        this.moveLeft()
    }
}