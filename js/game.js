let canvas;
let world;
let keyboard = new Keyboard();

let maxFPS = 60;

isGameStarted = false;

let allGameIntervals = [];
let allGameTimeouts = [];


function activateKeyboard() {
    activateKeyDown();
    activateKeyUp();
}


function handleKeyDown(event) {
    let key = event.key;

    if (key === 'd') {
        keyboard.D = true;
    } else if (key === 'ArrowRight') {
        keyboard.ARROW_RIGHT = true;
    } else if (key === 'a') {
        keyboard.A = true;
    } else if (key === 'ArrowLeft') {
        keyboard.ARROW_LEFT = true;
    } else if (key === 'w') {
        keyboard.W = true;
    } else if (key === ' ') {
        keyboard.SPACE = true;
    } else if (key === 'ArrowUp') {
        keyboard.ARROW_UP = true;
    } else if (key === 't') {
        keyboard.T = true;
    }
}

function handleKeyUp(event) {
    let key = event.key;

    if (key === 'd') {
        keyboard.D = false;
    } else if (key === 'ArrowRight') {
        keyboard.ARROW_RIGHT = false;
    } else if (key === 'a') {
        keyboard.A = false;
    } else if (key === 'ArrowLeft') {
        keyboard.ARROW_LEFT = false;
    } else if (key === 'w') {
        keyboard.W = false;
    } else if (key === ' ') {
        keyboard.SPACE = false;
    } else if (key === 'ArrowUp') {
        keyboard.ARROW_UP = false;
    } else if (key === 't') {
        keyboard.T = false;
    }
}


function activateKeyDown() {
    document.addEventListener('keydown', handleKeyDown);
}


function activateKeyUp() {
    document.addEventListener('keyup', handleKeyUp);
}


function deactivateKeyboard() {
    deactivateKeyDown();
    deactivateKeyUp();
}

function deactivateKeyDown() {
    document.removeEventListener('keydown', handleKeyDown);
}


function deactivateKeyUp() {
    document.removeEventListener('keyup', handleKeyUp);
}


function backToHome() {
    isGameStarted = false;
    startScreen = document.getElementById('start-screen');

    startGameButton = document.getElementById('start-game-btn')
    showControlsButton = document.getElementById('show-controls-btn')
    showStartScreenButton = document.getElementById('show-start-screen-btn')

    canvas = document.getElementById('canvas');
    showRightFrontElement(startScreen);
    deactivateKeyboard();
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

    const visibleButtons = [
        restartGameBtnIngame,
        showControlsBtnIngame,
        leaveGameBtn,
        returnRightVolumeButton()
    ];
    showRightButtons(visibleButtons);
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


