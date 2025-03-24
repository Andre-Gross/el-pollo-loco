class Cloud extends BackgroundObject {
    height = canvasHeight;
    width = (3840 * this.height / backgroundImgOriginalHeight);

    y = 0;

    speedXPerFrame = 6 / maxFPS;

    constructor(x = 0) {
        super().loadImage('./assets/img/5_background/layers/4_clouds/full.png')

        x = this.calculateX(x);

        this.animate();
    }


    animate() {
        setInterval(() => {
            this.moveLeft()
        }, 1000 / maxFPS)
    }


    calculateX(x) {
        return (x + Math.random() * 500) * backgroundHeightFactor;
    }
}