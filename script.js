let canvasHeight = 480;
let canvasWidth = 1920 * canvasHeight / 1080;

let savedViewportHeigth;
let savedViewportWidth;


function setSizeOfEachContainer() {
    canvas = document.getElementById('canvas');
    controlContainer = document.getElementById('control-container');
    startScreen = document.getElementById('start-screen');

    setSizeOfSingleContainer(canvas);
    setSizeOfSingleContainer(controlContainer);
    setSizeOfSingleContainer(startScreen);
}


function setSizeOfSingleContainer(element, height = canvasHeight, width = canvasWidth) {
    element.height = height;
    element.width = width;
}


function showRightFrontElement(element) {
    canvas = document.getElementById('canvas');

    canvas.classList.add('d-none');
    toggleDisplayNone(controlContainer, 'd-block', false);
    toggleDisplayNone(startScreen, 'd-block', false);

    if (element === canvas) {
        canvas.classList.remove('d-none');
    } else {
        toggleDisplayNone(element, 'd-block', true);
    }
}


function showRightButtons(visibleButtons) {
    const allButtons = [
        document.getElementById('start-game-btn'),
        document.getElementById('restart-game-btn'),
        document.getElementById('show-controls-btn'),
        document.getElementById('show-start-screen-btn'),
    ]

    allButtons.forEach((button) => {
        if (!visibleButtons.includes(button)) {
            toggleDisplayNone(button, 'd-inline-block', false);
        } else {
            toggleDisplayNone(button, 'd-inline-block', true);
        }
    })
}


function showStartScreen() {
    startScreen = document.getElementById('start-screen');

    if (Math.random() > 0.5) {
        startScreen.src = './assets/img/9_intro_outro_screens/start/startscreen_1.png'
    } else {
        startScreen.src = './assets/img/9_intro_outro_screens/start/startscreen_2.png'
    }

    showRightFrontElement(startScreen);

    showStartScreenButtons();
}


function showStartScreenButtons() {
    startGameButton = document.getElementById('start-game-btn');
    showControlsButton = document.getElementById('show-controls-btn');

    visibleButtons = [
        startGameButton,
        showControlsButton,
    ]

    showRightButtons(visibleButtons);
}


function showControls() {
    controlContainer = document.getElementById('control-container');
    showStartScreenButton = document.getElementById('show-start-screen-btn')
    controlsButton = document.getElementById('show-controls-btn');

    showRightFrontElement(controlContainer);

    toggleDisplayNone(showStartScreenButton, 'd-inline-block', true);
    toggleDisplayNone(controlsButton, 'd-inline-block', false);
}


function showControlsButtons() {
    startGameButton = document.getElementById('start-game-btn');
    restartGameButton = document.getElementById('restart-game-btn');
    showControlsButton = document.getElementById('show-controls-btn');
    showStartScreenButton = document.getElementById('show-start-screen-btn');

    visibleButtons = [
        startGameButton,
        showStartScreenButton,
    ]

    showRightButtons(visibleButtons);
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


addEventListener("DOMContentLoaded", (event) => {
    setSizeOfEachContainer();

    setInterval(() => {
        viewportHeight = window.innerHeight;
        viewportWidth = window.innerWidth;

        if (viewportHeight != savedViewportHeigth || viewportWidth != savedViewportWidth) {
            savedViewportHeigth = viewportHeight;
            savedViewportWidth = viewportWidth;

            canvasHeight = viewportHeight * 0.8;
            canvasWidth = 1920 * canvasHeight / 1080;
            
            if (canvasWidth > viewportWidth) {
                canvasWidth = viewportWidth;
                canvasHeight = canvasWidth * 1080 / 1920;
            }
        }
        setSizeOfEachContainer();
    }, 1000)
});