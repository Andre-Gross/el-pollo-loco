let canvas;
let world;
let keyboard = new Keyboard();

let maxFPS = 60;

isGameStarted = false;

let allGameIntervals = [];
let allGameTimeouts = [];


function backToHome() {
    isGameStarted = false;
    startScreen = document.getElementById('start-screen');

    startGameButton = document.getElementById('start-game-btn')
    showControlsButton = document.getElementById('show-controls-btn')
    showStartScreenButton = document.getElementById('show-start-screen-btn')

    canvas = document.getElementById('canvas');
    showRightFrontElement(startScreen);
    deactivateKeyboard();
    touchControls.deactivate();
    pauseGame();
    world = null;

    const visibleButtons = [
        startGameButton,
        showControlsButton,
        showStartScreenButton,
        returnRightVolumeButton()
    ]

    showRightButtons(visibleButtons);


    world.isGameFinished = false;
    world.isGameWon = false;
}


function resumeGame() {
    world.checkCollisions();
    world.character.resumeGameplay();
    world.level.enemies.forEach((enemy) => {
        if (enemy.resumeGameplay) {
            enemy.resumeGameplay()
        } else {
            enemy.animate()
        }
        world.movableStatusbar.setPositionInterval();
    })

}


function startGame() {
    canvas = document.getElementById('canvas');
    const restartGameBtnIngame = document.getElementById('restart-game-btn-ingame');
    const showControlsBtnIngame = document.getElementById('show-controls-btn-ingame');
    const leaveGameBtn = document.getElementById('leave-game-btn');


    if (!isGameStarted) {
        world = new World(canvas, keyboard);
        isGameStarted = true;
    } else {
        world.restart()
    }

    showRightFrontElement(canvas);
    activateKeyboard();
    touchControls.activate();

    const visibleButtons = [
        restartGameBtnIngame,
        showControlsBtnIngame,
        leaveGameBtn,
        returnRightVolumeButton()
    ];
    showRightButtons(visibleButtons);

    toggleDisplayMobileTouchButtons(true);
}


function pauseGame() {
    const endbossWalkAttack = world.level.enemies[6].attackState.walkAttack;
    if (endbossWalkAttack.start != 0) {
        endbossWalkAttack.duration = Date.now() - endbossWalkAttack.start;
    }
    allGameIntervals.forEach((interval) => { clearInterval(interval) });
    allGameIntervals = [];

    allGameTimeouts.forEach((timeout) => {
        clearTimeout(timeout)
    })
    allGameTimeouts = [];
}


