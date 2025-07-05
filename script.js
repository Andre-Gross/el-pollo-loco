let canvasHeight = 480;
let canvasWidth = 1920 * canvasHeight / 1080;

const backgroundImgOriginalHeight = 1080;
const backgroundImgOriginalWidth = 3840;
let backgroundHeightFactor = calculateBackgroundHeightFactor();

let savedViewportHeigth;
let savedViewportWidth;

const backgroundMusic = new Audio('./assets/acoustic-mexican-guitar.mp3')
let isGameMuted = false;


/**
 * Starts playing background music and restarts it automatically if it ends or errors.
 * @param {HTMLAudioElement} audio - The audio element to play.
 */
function playBackgroundMusic(audio = backgroundMusic) {
    audio.loop = false;
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
    deactivateKeyboard();
    touchControls.deactivate();
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


    setTimeout(() => {
        showRightButtons(visibleButtons);
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
        document.getElementById('ur-volume-off-btn'),
        document.getElementById('ur-volume-on-btn'),
        document.getElementById('restart-game-btn-ingame'),
        document.getElementById('show-controls-btn-ingame'),
        document.getElementById('leave-game-btn')
    ];

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

    const visibleButtons = [
        startGameButton,
        showControlsButton,
        showCreditsButton,
        returnRightVolumeButton()
    ];

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

    const visibleButtons = [
        startGameButton,
        showStartScreenButton,
        showCreditsButton,
        returnRightVolumeButton()
    ]

    showRightButtons(visibleButtons);
}


function returnRightVolumeButton() {
    const volumeOffBtn = document.getElementById('ur-volume-off-btn');
    const volumeOnBtn = document.getElementById('ur-volume-on-btn');

    if (isGameMuted) {
        return volumeOffBtn;
    } else {
        return volumeOnBtn;
    }
}


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


function toggleControlsButtonsIngame(changeToControls) {
    const backToGameButton = document.getElementById('back-to-game-btn');
    showRightButtons(backToGameButton);
}


function showCredits() {
    const creditsContainer = document.getElementById('credits-container');

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


function toggleDisplayMobileTouchButtons(shallVisible) {
    const mobileTouchButtons = document.getElementById('mobile-touch-buttons')

    toggleDisplayNone(mobileTouchButtons, 'd-flex', shallVisible);
}


function toggleMute(shallMute) {
    toggleMuteBackgroundMusic(backgroundMusic, shallMute);
    world.toggleMute(shallMute);
    isGameMuted = shallMute;
}


window.addEventListener('load', () => {
    checkAndSetElementSizes();
});


window.addEventListener('resize', () => {
    checkAndSetElementSizes();
})


document.addEventListener('DOMContentLoaded', () => {
    playBackgroundMusic();
})