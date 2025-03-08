let canvas;
let world;

let canvasHeight = 480;
let backgroundStandartHeight = 1080;

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas);

    console.log('My character is', world.character)
}