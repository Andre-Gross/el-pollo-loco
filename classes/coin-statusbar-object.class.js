class CoinStatusbar extends Statusbar {

    position = 1;
    y = this.calculateY(this.position);

    IMAGES = [
        './assets/img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png',
        './assets/img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png',
        './assets/img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png',
        './assets/img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png',
        './assets/img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png',
        './assets/img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png'
    ]
    percentage = 0;


    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.init()
    }


    init(percentage = this.percentage) {
        this.setPercentage(percentage);
    }


    restart() {
        const collectedCoins = this.world.character.collectedItems['coins'];
        const amountOfCoins = this.world.level.coins.lenght;
        this.percentage = 100 / amountOfCoins * collectedCoins;

        this.init();
    }
}
