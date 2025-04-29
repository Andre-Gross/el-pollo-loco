let canvasHeight = 480;
let canvasWidth = 1920 * 480 / 1080;




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
        }
    })
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


