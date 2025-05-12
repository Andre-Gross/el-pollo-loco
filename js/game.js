let canvas;
let world;
let keyboard = new Keyboard();

const backgroundImgOriginalHeight = 1080;
const backgroundImgOriginalWidth = 3840;
let backgroundHeightFactor = canvasHeight / backgroundImgOriginalHeight;

let maxFPS = 60;

isGameStarted = false;

let allGameIntervals = [];


function activateKeyboard() {
    activateKeyDown();
    activateKeyUp();
}


function activateKeyDown() {
    document.addEventListener('keydown', (event) => {
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
            keyboard.T = true
        }
    })
}


function activateKeyUp() {
    document.addEventListener('keyup', (event => {
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
    }))
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
    allGameIntervals.forEach((interval) => {clearInterval(interval)});
    allGameIntervals = [];
}


