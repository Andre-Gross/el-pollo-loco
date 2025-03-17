class Level {
    enemies;
    backgroundObjects;
    clouds;
    level_end_x

    constructor(enemies, backgroundObjects, clouds, level_end_x) {
        this.enemies = enemies;
        this.backgroundObjects = backgroundObjects;
        this.clouds = clouds;
        this.level_end_x = level_end_x;
    }
}