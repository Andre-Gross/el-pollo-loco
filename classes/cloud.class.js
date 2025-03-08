class Cloud extends BackgroundObject {
    height = canvasHeight;
    width = (3840 * this.height / backgroundStandartHeight);

    speed = 6 / maxFPS;

    constructor() {
        super().loadImage('./assets/img/5_background/layers/4_clouds/full.png')

        this.x = Math.random() * 500;
        this.y = canvasHeight - this.height;

        this.animate();
    }


    animate() {
        this.moveLeft()
    }
}