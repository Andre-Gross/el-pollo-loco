let canvas;
let world;
let keyboard = new Keyboard;

let canvasHeight = 480;
let backgroundStandartHeight = 1080;

let maxFPS = 60;

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas);

    console.log('My character is', world.character)
}


document.addEventListener('keydown', (event) => {
    let key = event.key;

    if (key === 'd' || key === 'ArrowRight') {
        keyboard.LEFT = false;
        keyboard.RIGHT = true;
    } else if (key === 'a' || key === 'ArrowLeft') {
        keyboard.RIGHT = false;
        keyboard.LEFT = true;
    } else if (key === 'w' || key === ' ' || key === 'ArrowUp') {
        keyboard.UP = true;
    }

    console.log(keyboard)
})


document.addEventListener('keyup', (event => {
    let key = event.key;

    if (key === 'd' || key === 'ArrowRight') {
        keyboard.RIGHT = false;
    } else if (key === 'a' || key === 'ArrowLeft') {
        keyboard.LEFT = false;
    } else if (key === 'w' || key === ' ' || key === 'ArrowUp') {
        keyboard.UP = false;
    }

    console.log(keyboard)
}))