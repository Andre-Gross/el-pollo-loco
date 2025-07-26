class Level {
    enemies;
    backgroundObjects;
    clouds;
    coins;
    throwableObjects;
    levelEndX;


    /**
     * Creates a new Level instance.
     * 
     * @param {number} level_end_x - The x-coordinate marking the end of the level.
     * @param {Array} enemies - Array of enemy objects present in the level.
     * @param {Array} backgroundObjects - Array of background objects for the level.
     * @param {Array} clouds - Array of cloud objects for the level.
     * @param {Array} coins - Array of collectible coin objects in the level.
     * @param {Array} throwableObjects - Array of throwable objects available in the level.
     */    
    constructor(levelEndX, enemies, backgroundObjects, clouds, coins, throwableObjects) {
        this.levelEndX= levelEndX;
        this.enemies = enemies;
        this.backgroundObjects = backgroundObjects;
        this.clouds = clouds;
        this.coins = coins
        this.throwableObjects = throwableObjects;
    }
}