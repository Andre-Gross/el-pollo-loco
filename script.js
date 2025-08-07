const MIN_WIDTH = 720;
const MIN_HEIGHT = 480;
const ASPECT_RATIO = MIN_WIDTH / MIN_HEIGHT;

let canvasHeight = 480;
let canvasWidth = 720;

const backgroundImgOriginalHeight = 1080;
const backgroundImgOriginalWidth = 3840;
const backgroundHeightFactor = calculateBackgroundHeightFactor();

let savedViewportHeigth;
let savedViewportWidth;

const backgroundMusic = new Audio('./assets/acoustic-mexican-guitar.mp3')
let isGameMuted = false;


let allButtons = [];


/**
 * Starts playing background music and restarts it automatically if it ends or errors.
 * @param {HTMLAudioElement} audio - The audio element to play.
 */
function playBackgroundMusic(audio = backgroundMusic) {
    audio.loop = false;
    if (isGameMuted) {
        toggleMuteBackgroundMusic(audio, true)
    }
    audio.play().catch((e) => console.warn('Autoplay prevented:', e));
    audio.volume = 0.1;

    audio.addEventListener('ended', () => {
        audio.currentTime = 0;
        audio.play();
    });

    audio.addEventListener('error', () => {
        console.error('Audio error occurred. Restarting...');
        audio.currentTime = 0;
        audio.play();

    });
}


/**
 * Mutes or unmutes the background music without stopping it.
 * @param {HTMLAudioElement} audio - The audio element to mute/unmute.
 * @param {boolean} mute - Whether the audio should be muted.
 */
function toggleMuteBackgroundMusic(audio, shallMute) {
    audio.muted = shallMute;
}


/**
 * Calculates the factor to scale the background image height relative to the canvas height.
 * @returns {number} The scaling factor for the background height.
 */
function calculateBackgroundHeightFactor() {
    return canvasHeight / backgroundImgOriginalHeight;
}


/**
 * Checks the viewport size and adjusts root CSS variables accordingly if below minimum dimensions.
 */
function checkAndSetElementSizes() {

    let width = window.innerWidth;
    let height = window.innerHeight;


    if (width < MIN_WIDTH || height < MIN_HEIGHT) {
        let newWidth = width;
        let newHeight = width / ASPECT_RATIO;

        if (newHeight > height) {
            newHeight = height;
            newWidth = height * ASPECT_RATIO;
        }

        resetAllRootVariables(newHeight, newWidth);
    }
}


/**
 * Handles the game leaving procedure: pauses game, disables input, shows start screen, hides mobile buttons.
 */
function leaveGame() {
    const startGameButton = document.getElementById('start-game-btn');
    startGameButton.onclick
    pauseGame();
    deactivateKeyboard();
    touchControls.deactivate();
    showStartScreen();
    toggleDisplayMobileTouchButtons(false);
}


/**
 * Resets CSS root variables related to canvas size and UI scaling.
 * @param {number} newHeight - New canvas height.
 * @param {number} newWidth - New canvas width.
 */
function resetAllRootVariables(newHeight, newWidth) {
    const baseFontSize = newHeight / 7.5;
    const buttonPadding = newHeight / 40;

    setRootVariable('--canvas-width', `${newWidth}px`);
    setRootVariable('--canvas-height', `${newHeight}px`);
    setRootVariable('--base-font-size', `${baseFontSize}px`);
    setRootVariable('--button-padding', `${buttonPadding}px`);
}


/**
 * Sets a CSS root variable on the specified element.
 * @param {string} variableName - The name of the CSS variable (with or without --).
 * @param {string} value - The value to assign to the variable.
 * @param {HTMLElement} [element=document.documentElement] - The element on which to set the variable.
 */
function setRootVariable(variableName, value, element = document.documentElement) {
    const cssVarName = variableName.startsWith('--') ? variableName : `--${variableName}`;

    element.style.setProperty(cssVarName, value);
}


/**
 * Sets the width and height attributes of a given canvas or container element.
 * @param {HTMLElement} element - The element to resize.
 * @param {number} [height=canvasHeight] - Height in pixels.
 * @param {number} [width=canvasWidth] - Width in pixels.
 */
function setSizeOfSingleContainer(element, height = canvasHeight, width = canvasWidth) {
    element.height = height;
    element.width = width;
}


/**
 * Shows the game finish buttons (restart and leave) after a delay.
 */
function showFinishedGameButtons() {
    const restartGameBtn = document.getElementById('restart-game-btn');
    const leaveGameBtn = document.getElementById('show-leave-game-btn');

    const visibleButtons = [
        restartGameBtn,
        leaveGameBtn
    ]

    showRightButtons(visibleButtons);
}


/**
 * Shows the specified front UI element and hides others.
 * @param {HTMLElement} element - The element to show in front.
 */
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


/**
 * Shows only the specified button(s) and hides all others.
 * @param {HTMLElement|HTMLElement[]} visibleButtonOrButtons - Button or array of buttons to show.
 */
function showRightButtons(visibleButtonOrButtons) {
    allButtons.forEach((button) => {
        if (Array.isArray(visibleButtonOrButtons)) {
            toggleDisplayNone(button, 'd-flex', visibleButtonOrButtons.includes(button));
        } else {
            toggleDisplayNone(button, 'd-flex', false);
        }
    });

    if (!Array.isArray(visibleButtonOrButtons)) {
        toggleDisplayNone(visibleButtonOrButtons, 'd-flex', true);
    }
}


/**
 * Displays the start screen with a randomized background image.
 */
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


/**
 * Shows buttons related to the start screen.
 */
function showStartScreenButtons() {
    const startGameButton = document.getElementById('start-game-btn');
    const showControlsButton = document.getElementById('show-controls-btn');
    const showCreditsButton = document.getElementById('show-credits-btn');
    const impressumButton = document.getElementById('impressum-btn');

    const visibleButtons = [
        startGameButton,
        showControlsButton,
        showCreditsButton,
        impressumButton,
        returnRightVolumeButton()
    ];

    showRightButtons(visibleButtons);
}


/**
 * Displays the controls overlay screen.
 */
function showControls() {
    controlContainer = document.getElementById('control-container');
    showStartScreenButton = document.getElementById('show-start-screen-btn')
    controlsButton = document.getElementById('show-controls-btn');

    showRightFrontElement(controlContainer);

    showControlsButtons();
}


/**
 * Shows buttons for the controls overlay screen.
 */
function showControlsButtons() {
    const startGameButton = document.getElementById('start-game-btn');
    const showStartScreenButton = document.getElementById('show-start-screen-btn');
    const showCreditsButton = document.getElementById('show-credits-btn');

    const visibleButtons = [
        startGameButton,
        showStartScreenButton,
        showCreditsButton,
        returnRightVolumeButton()
    ]

    showRightButtons(visibleButtons);
}


/**
 * Returns the currently appropriate volume button element based on mute state.
 * @returns {HTMLElement} The volume on or off button element.
 */
function returnRightVolumeButton() {
    const volumeOffBtn = document.getElementById('ur-volume-off-btn');
    const volumeOnBtn = document.getElementById('ur-volume-on-btn');

    if (isGameMuted) {
        return volumeOffBtn;
    } else {
        return volumeOnBtn;
    }
}


/**
 * Toggles the ingame controls screen visibility and updates UI accordingly.
 * @param {boolean} changeToControls - If true, show controls; otherwise, show game.
 */
function toggleControlsIngame(changeToControls) {
    const canvas = document.getElementById('canvas');
    const controlsContainer = document.getElementById('control-container');

    if (changeToControls) {
        pauseGame();
    } else {
        resumeGame();
    }

    toggleDisplayNone(canvas, 'd-flex', !changeToControls);
    toggleDisplayNone(controlsContainer, 'd-flex', changeToControls);
    toggleControlsButtonsIngame(changeToControls);
}


/**
 * Shows or hides buttons relevant to ingame controls screen.
 * @param {boolean} changeToControls - Whether controls screen is active.
 */
function toggleControlsButtonsIngame(changeToControls) {
    const backToGameButton = document.getElementById('back-to-game-btn');

    if (changeToControls) {
        showRightButtons(backToGameButton);
    } else {
        const restartGameBtnIngame = document.getElementById('restart-game-btn-ingame');
        const showControlsBtnIngame = document.getElementById('show-controls-btn-ingame');
        const leaveGameBtn = document.getElementById('leave-game-btn');

        const visibleButtons = [
            restartGameBtnIngame,
            showControlsBtnIngame,
            leaveGameBtn,
            returnRightVolumeButton()
        ];

        showRightButtons(visibleButtons);
    }

}


/**
 * Displays the credits overlay screen.
 */
function showCredits() {
    const creditsContainer = document.getElementById('credits-container');

    showRightFrontElement(creditsContainer);

    showCreditsButtons();
}


/**
 * Shows buttons for the credits overlay screen.
 */
function showCreditsButtons() {
    const startGameButton = document.getElementById('start-game-btn');
    const showStartScreenButton = document.getElementById('show-start-screen-btn');
    const showControlsButton = document.getElementById('show-controls-btn');

    const visibleButtons = [
        startGameButton,
        showStartScreenButton,
        showControlsButton,
        returnRightVolumeButton()
    ]

    showRightButtons(visibleButtons);
}


/**
 * Toggles display of an element between visible (with specified class) or hidden ('d-none').
 * @param {HTMLElement} element - The element to toggle.
 * @param {string} [displayMode="d-block"] - CSS class to apply when visible.
 * @param {boolean|string} [shallVisible=""] - True to show, false to hide, empty to toggle.
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


/**
 * Toggles visibility of the mobile touch button container.
 * @param {boolean} shallVisible - True to show, false to hide.
 */
function toggleDisplayMobileTouchButtons(shallVisible) {
    const mobileTouchButtons = document.getElementById('mobile-touch-buttons-container')

    toggleDisplayNone(mobileTouchButtons, 'd-flex', shallVisible);
}


/**
 * Mutes or unmutes the background music and updates UI accordingly.
 * @param {boolean} shallMute - Whether to mute the background music.
 */
function toggleMute(shallMute) {
    const volumeOffBtn = document.getElementById('ur-volume-off-btn');
    const volumeOnBtn = document.getElementById('ur-volume-on-btn');

    toggleMuteBackgroundMusic(backgroundMusic, shallMute);
    if (world) {
        world.toggleMute(shallMute);
    }
    isGameMuted = shallMute;
    saveGameMutedState();

    toggleDisplayNone(volumeOffBtn, 'd-flex', shallMute);
    toggleDisplayNone(volumeOnBtn, 'd-flex', !shallMute);
}


/**
 * Saves the current mute state of the game to localStorage.
 * @param {boolean} [isMuted=isGameMuted] - Mute state to save.
 */
function saveGameMutedState(isMuted = isGameMuted) {
    localStorage.setItem('isGameMuted', JSON.stringify(isMuted));
}


/**
 * Loads the mute state from localStorage.
 * @returns {boolean} The saved mute state or false if none saved.
 */
function loadGameMutedState() {
    const value = localStorage.getItem('isGameMuted');
    return value !== null ? JSON.parse(value) : false;
}


/**
 * Runs a callback function after the first user interaction (click, keydown, or touch).
 * @param {Function} callback - Function to execute on first user interaction.
 */
function onFirstUserInteraction(callback) {
    function handler() {
        callback();

        document.removeEventListener('click', handler);
        document.removeEventListener('keydown', handler);
        document.removeEventListener('touchstart', handler);
    }

    document.addEventListener('click', handler);
    document.addEventListener('keydown', handler);
    document.addEventListener('touchstart', handler);
}


window.addEventListener('load', () => {
    checkAndSetElementSizes();
});


window.addEventListener('resize', () => {
    checkAndSetElementSizes();
})


document.addEventListener('DOMContentLoaded', () => {
    allButtons = [
        document.getElementById('restart-game-btn'),
        document.getElementById('start-game-btn'),
        document.getElementById('show-start-screen-btn'),
        document.getElementById('show-controls-btn'),
        document.getElementById('show-credits-btn'),
        document.getElementById('back-to-game-btn'),
        document.getElementById('show-leave-game-btn'),
        document.getElementById('ur-volume-off-btn'),
        document.getElementById('ur-volume-on-btn'),
        document.getElementById('restart-game-btn-ingame'),
        document.getElementById('show-controls-btn-ingame'),
        document.getElementById('leave-game-btn'),
        document.getElementById('impressum-btn'),
    ];

    showStartScreen();

    isGameMuted = loadGameMutedState();
    backgroundMusic.muted = isGameMuted;
    toggleMute(isGameMuted);

    onFirstUserInteraction(() => {
        playBackgroundMusic();
    });
})