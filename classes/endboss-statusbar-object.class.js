class EndbossStatusbar extends Statusbar {

    position = 3;
    percentage = 100;
    positionInterval;

    IMAGES = [
        './assets/img/7_statusbars/2_statusbar_endboss/orange/orange0.png',
        './assets/img/7_statusbars/2_statusbar_endboss/orange/orange20.png',
        './assets/img/7_statusbars/2_statusbar_endboss/orange/orange40.png',
        './assets/img/7_statusbars/2_statusbar_endboss/orange/orange60.png',
        './assets/img/7_statusbars/2_statusbar_endboss/orange/orange80.png',
        './assets/img/7_statusbars/2_statusbar_endboss/orange/orange100.png',
    ]


    /**
     * Initializes the health status bar with default settings and image.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.height = this.calculateHeight();
        this.width = this.calculateWidth();
        this.y = 2000;
        this.setPercentage(this.percentage);

        this.setPositionInterval();
    }


    setPositionInterval() {
        this.positionInterval = setInterval(() => {
            if (this.world) {
                const endbossDatas = this.returnEndbossDatas();

                this.y = this.calculateY(endbossDatas);
                this.x = this.calculateX(endbossDatas);
            }
        }, 1000 / maxFPS)
    }


    calculateX(endbossDatas) {
        if (endbossDatas.otherDirection) {
            return endbossDatas.returnVisibleStartX();
        } else {
            return endbossDatas.returnVisibleEndX() - this.width;
        }
    }


    calculateY(endbossDatas) {
        return endbossDatas.returnVisibleStartY() - (200 * backgroundHeightFactor);
    }


    /**
     * Returns the first object in world.enemies that is an instance of the Endboss class.
     * @returns {Endboss|null} The matching Endboss object, or null if none is found.
     */
    returnEndbossDatas() {
        return world.level.enemies.find(item => item instanceof Endboss) || null;
    }

}