let canvas;
let world;
let keyboard = new Keyboard();

let canvasHeight = 480;
let canvasWidth = 1920 * 480 / 1080;
const backgroundImgOriginalHeight  = 1080;
let backgroundHeightFactor = canvasHeight / backgroundImgOriginalHeight;


let maxFPS = 60;

function init() {
    canvas = document.getElementById('canvas');
    canvas.height = canvasHeight;
    canvas.width = canvasWidth;
    world = new World(canvas, keyboard);
}


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