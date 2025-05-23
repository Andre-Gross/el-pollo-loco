class BottleStatusbar extends Statusbar {
    position = 2;

    IMAGES = [
        './assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png',
        './assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png',
        './assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png',
        './assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png',
        './assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png',
        './assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png',
    ]
    percentage = 0;


    /**
     * Initializes the bottle status bar.
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
     * Updates the bottle status bar based on the number of collected throwable objects.
     */    
    restart() {
        const collectedBottles = this.world.character.collectedItems['bottles'];
        const amountOfTO = this.world.level.throwableObjects.length;
        this.percentage = amountOfTO > 0 ? (100 / amountOfTO * collectedBottles) : 0;

        this.setPercentage(this.percentage);
    }
}