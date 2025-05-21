class BottleStatusbar extends Statusbar {
    position = 2;
    y = this.calculateY(this.position);
    
    valuePerItem;

    IMAGES = [
        './assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png',
        './assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png',
        './assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png',
        './assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png',
        './assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png',
        './assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png',
    ]
    percentage = 0;


    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.init();
    }


    init() {
        this.setPercentage(this.percentage);
    }


    restart() {
        const collectedBottles = this.world.character.collectedItems['bottles'];
        const amountOfTO = this.world.level.throwableObjects.lenght;
        this.percentage = 100 / amountOfTO * collectedBottles;

        this.init();
    }
}