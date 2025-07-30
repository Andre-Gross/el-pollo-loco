class CollectableObject extends CollidableObject {

    /**
     * Handles the collection of this object.
     * 
     * @param {string} idOfStatusbar - The key to identify which status bar to update.
     * @param {string} item - The item type key that was collected (e.g. 'coins').
     * @param {number} valuePerItem - The value percentage each collected item contributes.
     */
    collecting(idOfStatusbar, item, valuePerItem) {
        this.markAsCollected();
        this.updateCollectedItems(item, valuePerItem, idOfStatusbar);
    }


    /**
     * Marks the object as collected and hides it.
     */
    markAsCollected() {
        this.isCollected = true;
        this.height = 0;
        this.width = 0;
    }


    /**
     * Updates the character's collected item count and status bar.
     * 
     * @param {string} item - Key of the item collected.
     * @param {number} valuePerItem - Percentage value of each item.
     * @param {string} idOfStatusbar - The status bar to update.
     */
    updateCollectedItems(item, valuePerItem, idOfStatusbar) {
        const statusbar = this.world.fixedStatusbars[idOfStatusbar];
        const character = this.world.character;

        character.collectedItems[item]++;
        const percentage = character.collectedItems[item] * valuePerItem;
        statusbar.setPercentage(percentage);
    }


    /**
     * Initializes the collectable object's position.
     * Inherits default size and positioning from MovableObject.
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