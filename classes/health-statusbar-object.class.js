class HealthStatusbar extends Statusbar {

    IMAGES = [
        './assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
        './assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        './assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        './assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        './assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        './assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png'
    ]
    percentage = 100;


    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.init()
    }


    init() {
        this.setPercentage(this.percentage);
    }


    restart() {
        this.percentage = this.world.character.health;
        this.init();
    }
}