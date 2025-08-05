const BASE_LEVEL_WIDTH = 3840;
const BACKGROUND_REPEAT_X = 1704;
const END_OF_LEVEL_X = (BASE_LEVEL_WIDTH * backgroundHeightFactor) + 1;

const level1 = new Level(
    END_OF_LEVEL_X,

    [
        new Chicken(END_OF_LEVEL_X),
        new Chicken(END_OF_LEVEL_X),
        new Chicken(END_OF_LEVEL_X),
        new SmallChicken(END_OF_LEVEL_X),
        new SmallChicken(END_OF_LEVEL_X),
        new SmallChicken(END_OF_LEVEL_X),
        new GiantChicken(),
    ],

    [
        new BackgroundObject('./assets/img/5_background/layers/air.png', -1),
        new BackgroundObject('./assets/img/5_background/layers/3_third_layer/full.png', -1),
        new BackgroundObject('./assets/img/5_background/layers/2_second_layer/full.png', -1),
        new BackgroundObject('./assets/img/5_background/layers/1_first_layer/full.png', -1),

        new BackgroundObject('./assets/img/5_background/layers/air.png'),
        new BackgroundObject('./assets/img/5_background/layers/3_third_layer/full.png'),
        new BackgroundObject('./assets/img/5_background/layers/2_second_layer/full.png'),
        new BackgroundObject('./assets/img/5_background/layers/1_first_layer/full.png'),

        new BackgroundObject('./assets/img/5_background/layers/air.png', 1, BACKGROUND_REPEAT_X),
        new BackgroundObject('./assets/img/5_background/layers/3_third_layer/full.png', 1, BACKGROUND_REPEAT_X),
        new BackgroundObject('./assets/img/5_background/layers/2_second_layer/full.png', 1, BACKGROUND_REPEAT_X),
        new BackgroundObject('./assets/img/5_background/layers/1_first_layer/full.png', 1, BACKGROUND_REPEAT_X),
    ],

    [
        new Cloud(-(BASE_LEVEL_WIDTH + 1)),
        new Cloud(),
        new Cloud(BASE_LEVEL_WIDTH - 2),
    ],

    Array(5).fill(null).map(() => new Coin(END_OF_LEVEL_X)),

    Array(5).fill(null).map(() => new ThrowableObject(END_OF_LEVEL_X)),
);
