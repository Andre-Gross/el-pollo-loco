class CoinStatusbar extends Statusbar {

    position = 1;

    IMAGES = [
        './assets/img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png',
        './assets/img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png',
        './assets/img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png',
        './assets/img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png',
        './assets/img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png',
        './assets/img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png'
    ]
    percentage = 0;


    /**
     * Initializes the coin status bar.
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
     * Updates the coin status bar based on the number of collected coins.
     */    
    restart() {
        const collectedCoins = this.world.character.collectedItems['coins'];
        const amountOfCoins = this.world.level.coins.length;
        this.percentage = amountOfCoins > 0 ? (100 / amountOfCoins * collectedCoins) : 0;

        this.setPercentage(this.percentage);
    }
}
