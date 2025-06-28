let canvasHeight = 480;
let canvasWidth = 1920 * canvasHeight / 1080;

const backgroundImgOriginalHeight = 1080;
const backgroundImgOriginalWidth = 3840;
let backgroundHeightFactor = calculateBackgroundHeightFactor();

let savedViewportHeigth;
let savedViewportWidth;


function calculateBackgroundHeightFactor() {
    return canvasHeight / backgroundImgOriginalHeight;
}


function checkAndSetElementSizes() {
    const minWidth = 720;
    const minHeight = 480;
    const aspectRatio = minWidth / minHeight;

    let width = window.innerWidth;
    let height = window.innerHeight;


    if (width < minWidth || height < minHeight) {
        let newWidth = width;
        let newHeight = width / aspectRatio;

        if (newHeight > height) {
            newHeight = height;
            newWidth = height * aspectRatio;
        }

        resetAllRootVariables(newHeight, newWidth);
    }
}


function leaveGame() {
    const startGameButton = document.getElementById('start-game-btn');
    startGameButton.onclick
    pauseGame();
    toggleButtonContainer(false);
    deactivateKeyboard();
    showStartScreen();
}


function resetAllRootVariables(newHeight, newWidth) {
    const baseFontSize = newHeight / 7.5;
    const buttonPadding = newHeight / 40;

    setRootVariable('--canvas-width', `${newWidth}px`);
    setRootVariable('--canvas-height', `${newHeight}px`);
    setRootVariable('--base-font-size', `${baseFontSize}px`);
    setRootVariable('--button-padding', `${buttonPadding}px`);
}


function setRootVariable(variableName, value, element = document.documentElement) {
    const cssVarName = variableName.startsWith('--') ? variableName : `--${variableName}`;

    element.style.setProperty(cssVarName, value);
}


function setSizeOfSingleContainer(element, height = canvasHeight, width = canvasWidth) {
    element.height = height;
    element.width = width;
}


function showFinishedGameButtons() {
    const restartGameBtn = document.getElementById('restart-game-btn');
    const leaveGameBtn = document.getElementById('show-leave-game-btn');

    const visibleButtons = [
        restartGameBtn,
        leaveGameBtn
    ]

    showRightButtons(visibleButtons);

    setTimeout(() => {
        toggleButtonContainer(false);
    }, 2000)
}


function showRightFrontElement(element) {
    const canvas = document.getElementById('canvas');
    const controlContainer = document.getElementById('control-container');
    const creditsContainer = document.getElementById('credits-container');
    const startScreen = document.getElementById('start-screen');

    canvas.classList.add('d-none');
    toggleDisplayNone(controlContainer, 'd-flex', false);
    toggleDisplayNone(creditsContainer, 'd-flex', false);
    toggleDisplayNone(startScreen, 'd-flex', false);

    if (element === canvas) {
        canvas.classList.remove('d-none');
    } else {
        toggleDisplayNone(element, 'd-flex', true);
    }
}


function showRightButtons(visibleButtonOrButtons) {
    const allButtons = [
        document.getElementById('restart-game-btn'),
        document.getElementById('start-game-btn'),
        document.getElementById('show-start-screen-btn'),
        document.getElementById('show-controls-btn'),
        document.getElementById('show-credits-btn'),
        document.getElementById('back-to-game-btn'),
        document.getElementById('show-leave-game-btn'),
    ]

    if (Array.isArray(visibleButtonOrButtons)) {
        allButtons.forEach((button) => {
            if (!visibleButtonOrButtons.includes(button)) {
                toggleDisplayNone(button, 'd-flex', false);
            } else {
                toggleDisplayNone(button, 'd-flex', true);
            }
        })
    } else {
        allButtons.forEach((button) => {
            toggleDisplayNone(button, 'd-flex', false);
        }); +
            toggleDisplayNone(visibleButtonOrButtons, 'd-flex', true)
    }
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
    const startGameButton = document.getElementById('start-game-btn');
    const showControlsButton = document.getElementById('show-controls-btn');
    const showCreditsButton = document.getElementById('show-credits-btn');

    visibleButtons = [
        startGameButton,
        showControlsButton,
        showCreditsButton
    ]

    showRightButtons(visibleButtons);
}


function showControls() {
    controlContainer = document.getElementById('control-container');
    showStartScreenButton = document.getElementById('show-start-screen-btn')
    controlsButton = document.getElementById('show-controls-btn');

    showRightFrontElement(controlContainer);

    showControlsButtons();
}


function showControlsButtons() {
    const startGameButton = document.getElementById('start-game-btn');
    const showStartScreenButton = document.getElementById('show-start-screen-btn');
    const showCreditsButton = document.getElementById('show-credits-btn');

    visibleButtons = [
        startGameButton,
        showStartScreenButton,
        showCreditsButton
    ]

    showRightButtons(visibleButtons);
}


function toggleButtonContainer(toggleToIngameButtonContainer) {
    const startscreenButtonContainer = document.getElementById('startscreen-button-container');
    const ingameButtonContainer = document.getElementById('ingame-button-container');

    toggleDisplayNone(startscreenButtonContainer, 'd-flex', !toggleToIngameButtonContainer);
    toggleDisplayNone(ingameButtonContainer, 'd-flex', toggleToIngameButtonContainer);
}


function toggleControlsIngame(changeToControls) {
    const canvas = document.getElementById('canvas');
    const controlContainer = document.getElementById('control-container');

    if (changeToControls) {
        pauseGame();
    } else {
        resumeGame();
    }

    toggleDisplayNone(canvas, 'd-flex', !changeToControls);
    toggleDisplayNone(controlContainer, 'd-flex', changeToControls);
    toggleControlsButtonsIngame(changeToControls);
}


function toggleControlsButtonsIngame(changeToControls) {
    const backToGameButton = document.getElementById('back-to-game-btn');
    const startscreenButtonContainer = document.getElementById('startscreen-button-container');
    const ingameButtonContainer = document.getElementById('ingame-button-container');

    toggleDisplayNone(ingameButtonContainer, 'd-flex', !changeToControls);
    toggleDisplayNone(startscreenButtonContainer, 'd-flex', changeToControls);
    showRightButtons(backToGameButton);
}


function showCredits() {
    const creditsContainer = document.getElementById('credits-container');
    const showStartScreenButton = document.getElementById('show-start-screen-btn')
    const creditsButton = document.getElementById('show-credits-btn');

    showRightFrontElement(creditsContainer);

    showControlsButtons();
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


window.addEventListener('load', () => {
    checkAndSetElementSizes();
});


window.addEventListener('resize', () => {
    checkAndSetElementSizes();
})