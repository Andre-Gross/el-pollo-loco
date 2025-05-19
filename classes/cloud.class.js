class Cloud extends BackgroundObject {
    height = canvasHeight;
    width = (3840 * this.height / backgroundImgOriginalHeight);

    standartX;
    y = 0;

    speedXPerFrame = 6 / maxFPS;

    constructor(x = 0) {
        super().loadImage('./assets/img/5_background/layers/4_clouds/full.png')

        this.standartX = x
        this.init(x);

        this.animate();
    }


    animate() {
        this.positionInterval = setInterval(() => {
            this.moveLeft()
        }, 1000 / maxFPS)
        this.pushToAllIntervals(this.positionInterval);
    }


    calculateX(x) {
        return (x + Math.random() * 500) * backgroundHeightFactor;
    }


    init(x = this.standartX) {
        this.x = this.calculateX(x);
    }
}