class Level {
    enemies;
    backgroundObjects;
    clouds;
    level_end_x;
    throwableObjects

    constructor(enemies, backgroundObjects, clouds, level_end_x, throwableObjects) {
        this.enemies = enemies;
        this.backgroundObjects = backgroundObjects;
        this.clouds = clouds;
        this.level_end_x = level_end_x;
        this.throwableObjects =  throwableObjects;
    }
}