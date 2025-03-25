class Level {
    enemies;
    backgroundObjects;
    clouds;
    coins;
    throwableObjects;
    level_end_x;

    constructor(level_end_x, enemies, backgroundObjects, clouds, coins, throwableObjects) {
        this.level_end_x = level_end_x;
        this.enemies = enemies;
        this.backgroundObjects = backgroundObjects;
        this.clouds = clouds;
        this.coins = coins
        this.throwableObjects = throwableObjects;
    }
}