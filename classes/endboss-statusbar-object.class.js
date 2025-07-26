class EndbossStatusbar extends Statusbar {
    OFFSET_Y = 200;

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


    /**
     * Calculates the X position of the status bar based on endboss direction.
     * @param {Endboss} endbossDatas - The endboss instance to track.
     * @returns {number} The calculated X coordinate.
     */
    calculateX(endbossDatas) {
        if (endbossDatas.otherDirection) {
            return endbossDatas.returnVisibleStartX();
        } else {
            return endbossDatas.returnVisibleEndX() - this.width;
        }
    }


    /**
     * Calculates the Y position of the status bar.
     * @param {Endboss} endbossDatas - The endboss instance to track.
     * @returns {number} The calculated Y coordinate.
     */
    calculateY(endbossDatas) {
        return endbossDatas.returnVisibleStartY() - (200 * backgroundHeightFactor);
    }


    /**
     * Finds the first Endboss object in the current level.
     * @returns {Endboss|null} The matching Endboss object, or null if none is found.
     */
    findEndboss() {
        return world.level.enemies.find(item => item instanceof Endboss) || null;
    }


    /**
     * Updates the status bar's position based on the endboss's current location.
     */
    setPositionInterval() {
        this.positionInterval = setInterval(() => {
            if (this.world) {
                const endboss = this.findEndboss();
                if (!endboss) return;

                this.updatePosition(endboss);
            }
        }, 1000 / maxFPS)
        this.pushToAllIntervals(this.positionInterval);
    }


    /**
     * Updates the X and Y position of the status bar based on the given endboss.
     * @param {Endboss} endboss - The endboss to track.
     */
    updatePosition(endboss) {
        this.y = this.calculateY(endboss);
        this.x = this.calculateX(endboss);
    }

}