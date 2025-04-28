let canvas;
let world;
let keyboard = new Keyboard();

let canvasHeight = 480;
let canvasWidth = 1920 * 480 / 1080;
const backgroundImgOriginalHeight = 1080;
let backgroundHeightFactor = canvasHeight / backgroundImgOriginalHeight;


let maxFPS = 60;


isGameStarted = false;


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


function init() {
    canvas = document.getElementById('canvas');
    canvas.height = canvasHeight;
    canvas.width = canvasWidth;
}


function startGame() {
    if (!isGameStarted) {
        activateKeyboard();
        world = new World(canvas, keyboard);
        isGameStarted = true;
        // world.isGameStarted = true;
        // world.level.enemies.forEach(enemy => {
        //     if (enemy instanceof Endboss) {
        //         enemy.standartSpeedXPerFrame = enemy.calculateSpeedPerFrame(enemy.speedXPerSecond);
        //     } else {
        //         enemy.standartSpeedXPerFrame = enemy.calculateSpeedPerFrame();
        //     }
        // });
    }
}


function toggleControls() {
    canvas = document.getElementById('canvas');
    controlContainer = document.getElementById('controlContainer');

    controlContainer.height = canvasHeight;
    controlContainer.width = canvasWidth;

    if (controlContainer.classList.contains('d-none')) {
        canvas.classList.add('d-none');
        toggleDisplayNone(canvas, 'd-flex', true);
    } else {
        canvas.classList.remove('d-none');
        toggleDisplayNone(canvas, 'd-flex', false);
    }
}


/**
 * Toggles the display of an element based on the specified mode.
 * @param {HTMLElement} element - The DOM element to toggle.
 * @param {string} displayMode - The CSS class to apply when visible (default: "d-block").
 * @param {boolean|string} shallVisible - Whether the element should be visible or hidden, or toggle state if undefined.
 */
function toggleDisplayNone(
    element,
    displayMode = "d-block",
    shallVisible = ""
) {
    let eleClass = element.classList;
    if (shallVisible === true) {
        eleClass.remove("d-none");
        eleClass.add(displayMode);
    } else if (shallVisible === false) {
        eleClass.remove(displayMode);
        eleClass.add("d-none");
    } else {
        if (eleClass.contains("d-none")) {
            eleClass.remove("d-none");
            eleClass.add(displayMode);
        } else {
            eleClass.remove(displayMode);
            eleClass.add("d-none");
        }
    }
}


