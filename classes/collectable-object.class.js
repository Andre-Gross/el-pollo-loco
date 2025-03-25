class CollectableObjects extends MovableObject {

    isCollected = false;


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

}