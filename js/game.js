let canvas;
let world;
let keyboard = new Keyboard();

let maxFPS = 60;

isGameStarted = false;

let allGameIntervals = [];


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

    toggleDisplayNone(startGameButton, 'd-inline-block', true);
    toggleDisplayNone(showControlsButton, 'd-inline-block', true);
    toggleDisplayNone(showStartScreenButton, 'd-inline-block', true)
}


function startGame() {
    if (!isGameStarted) {
        startGameButton = document.getElementById('start-game-btn')
        showControlsButton = document.getElementById('show-controls-btn')
        showStartScreenButton = document.getElementById('show-start-screen-btn')

        canvas = document.getElementById('canvas');
        showRightFrontElement(canvas);
        activateKeyboard();
        world = new World(canvas, keyboard);
        isGameStarted = true;

        toggleDisplayNone(startGameButton, 'd-inline-block', false);
        toggleDisplayNone(showControlsButton, 'd-inline-block', false);
        toggleDisplayNone(showStartScreenButton, 'd-inline-block', false)
    }
}


function pauseGame() {
    allGameIntervals.forEach((interval) => { clearInterval(interval) });
    allGameIntervals = [];
}


