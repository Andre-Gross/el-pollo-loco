const endOfXInLevel1 = (3840 * backgroundHeightFactor) + 1;

const level1 = new Level(
    endOfXInLevel1,
    [
        new Chicken(endOfXInLevel1),
        new Chicken(endOfXInLevel1),
        new Chicken(endOfXInLevel1),
        new Endboss(),
    ],
    [
        new BackgroundObject('./assets/img/5_background/layers/air.png', -(3840 * backgroundHeightFactor) + 1),
        new BackgroundObject('./assets/img/5_background/layers/3_third_layer/full.png', -(3840 * backgroundHeightFactor) + 1),
        new BackgroundObject('./assets/img/5_background/layers/2_second_layer/full.png', -(3840 * backgroundHeightFactor) + 1),
        new BackgroundObject('./assets/img/5_background/layers/1_first_layer/full.png', -(3840 * backgroundHeightFactor) + 1),
        new BackgroundObject('./assets/img/5_background/layers/air.png'),
        new BackgroundObject('./assets/img/5_background/layers/3_third_layer/full.png'),
        new BackgroundObject('./assets/img/5_background/layers/2_second_layer/full.png'),
        new BackgroundObject('./assets/img/5_background/layers/1_first_layer/full.png'),
        new BackgroundObject('./assets/img/5_background/layers/air.png', (3840 * backgroundHeightFactor) - 2),
        new BackgroundObject('./assets/img/5_background/layers/3_third_layer/full.png', (3840 * backgroundHeightFactor) - 2),
        new BackgroundObject('./assets/img/5_background/layers/2_second_layer/full.png', (3840 * backgroundHeightFactor) - 2),
        new BackgroundObject('./assets/img/5_background/layers/1_first_layer/full.png', (3840 * backgroundHeightFactor) - 2),
    ],
    [
        new Cloud(-(3840 + 1)),
        new Cloud(),
        new Cloud(3840- 2),
    ],
    [
        new ThrowableObject(endOfXInLevel1),
        new ThrowableObject(endOfXInLevel1),
        new ThrowableObject(endOfXInLevel1),
        new ThrowableObject(endOfXInLevel1),
        new ThrowableObject(endOfXInLevel1),
    ],
)