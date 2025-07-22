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


    /**
     * Initializes the health status bar with default settings and image.
     */    
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.height = this.calculateHeight();
        this.width = this.calculateWidth();
        this.y = this.calculateY(this.position ?? 0);
        this.setPercentage(this.percentage);
    }


    /**
     * Resets the health bar percentage to the character’s current health.
     */
    restart() {
        this.percentage = this.world.character.health;
        this.setPercentage(this.percentage);
    }
}