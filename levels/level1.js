const level1 = new Level(
    [
        new Chicken(),
        new Chicken(),
        new Chicken(),
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
        new Cloud(-(3840 * backgroundHeightFactor) + 1),
        new Cloud(),
        new Cloud((3840 * backgroundHeightFactor) - 2),
    ],
    ((3840 * backgroundHeightFactor) - 2),
)