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
     * @param {number} levelEndX - The x-coordinate marking the end of the level.
     * @param {Array<Enemy>} enemies - Array of enemy objects present in the level.
     * @param {Array<DrawableObject>} backgroundObjects - Array of background objects for the level.
     * @param {Array<Cloud>} clouds - Array of cloud objects for the level.
     * @param {Array<Coin>} coins - Array of collectible coin objects in the level.
     * @param {Array<ThrowableObject>} throwableObjects - Array of throwable objects available in the level.
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