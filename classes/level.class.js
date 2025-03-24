class Level {
    enemies;
    backgroundObjects;
    clouds;
    throwableObjects;
    level_end_x;

    constructor(enemies, backgroundObjects, clouds, throwableObjects, level_end_x) {
        this.enemies = enemies;
        this.backgroundObjects = backgroundObjects;
        this.clouds = clouds;
        this.throwableObjects = throwableObjects;
        this.level_end_x = level_end_x;
    }
}