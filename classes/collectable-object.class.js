class CollectableObjects extends MovableObject {

    x;
    y;


    /**
     * Handles the collection of this object.
     * Marks the object as collected, hides it by setting size to zero,
     * updates the character's collected items count,
     * and updates the corresponding status bar's percentage.
     * 
     * @param {string} idOfStatusbar - The key to identify which status bar to update.
     * @param {string} item - The item type key that was collected (e.g. 'coins').
     * @param {number} valuePerItem - The value percentage each collected item contributes.
     */
    collecting(idOfStatusbar, item, valuePerItem) {
        const statusbar = this.world.statusBars[idOfStatusbar];
        const character = this.world.character;
        let percentage

        this.isCollected = true;
        this.height = 0;
        this.width = 0;

        character.collectedItems[item]++;
        percentage = character.collectedItems[item] * valuePerItem;

        statusbar.setPercentage(percentage);
    }


    /**
     * Initializes the position of the collectable object.
     * Marks the object as not collected.
     * Sets the x coordinate to a randomized spawn position based on the given endOfX boundary.
     * Sets the y coordinate by calling calculateY.
     * 
     * @param {number} [endOfX=this.endOfX] - The maximum x position boundary for spawning.
     */
    init(endOfX = this.endOfX) {
        this.isCollected = false;
        this.x = this.randomizeSpawnX(endOfX);
        this.y = this.calculateY();
    }



    /**
     * Resets the collectable object to its initial state.
     * Restores its size and re-initializes its position.
     */
    restart() {
        this.setSizes();
        this.init();
    }
}