let canvas;
let world;
let keyboard = new Keyboard();

let maxFPS = 60;

isGameStarted = false;

let allGameIntervals = [];
let allGameTimeouts = [];


/**
 * Returns the player to the home screen.
 * - Stops the game and resets related state variables
 * - Displays the start screen
 * - Deactivates all controls
 * - Pauses the game
 * - Shows the home screen buttons
 */
function backToHome() {
    isGameStarted = false;
    startScreen = document.getElementById('start-screen');

    canvas = document.getElementById('canvas');

    showRightFrontElement(startScreen);
    deactivateControls();
    pauseGame();

    const visibleButtons = returnVisibleButtonsBackToHome();

    showRightButtons(visibleButtons);

    world.isGameFinished = false;
    world.isGameWon = false;
}


/**
 * Returns the list of buttons that should be visible on the home screen.
 * @returns {HTMLElement[]} Array of button elements for the home screen
 */
function returnVisibleButtonsBackToHome() {
    startGameButton = document.getElementById('start-game-btn')
    showControlsButton = document.getElementById('show-controls-btn')
    showStartScreenButton = document.getElementById('show-start-screen-btn')

    return [
        startGameButton,
        showControlsButton,
        showStartScreenButton,
        returnRightVolumeButton()
    ]
}


/**
 * Resumes the game after it has been paused.
 * - Pauses any ongoing intervals to ensure a controlled resume
 * - Checks collisions
 * - Resumes character gameplay
 * - Resumes or animates enemy behavior
 * - Updates the movable status bar position
 */
function resumeGame() {
    pauseGame();
    world.checkCollisions();
    world.character.resumeGameplay();
    world.level.enemies.forEach((enemy) => {
        if (enemy.resumeGameplay) {
            enemy.resumeGameplay()
        } else {
            enemy.animate()
        }
        world.movableStatusbar.setPositionInterval();
    })

}


/**
 * Starts or restarts the game.
 * - Creates a new World instance if no game is running
 * - Restarts the existing game if already started
 * - Displays the game canvas
 * - Activates keyboard and touch controls
 * - Shows the in-game control buttons
 * - Enables mobile touch buttons if applicable
 */
function startGame() {
    canvas = document.getElementById('canvas');

    if (!isGameStarted) {
        world = new World(canvas, keyboard);
        isGameStarted = true;
    } else {
        world.restart()
    }

    showRightFrontElement(canvas);
    activateKeyboard();
    touchControls.activate();

    const visibleButtons = returnVisibleButtonsStartGame();
    showRightButtons(visibleButtons);

    toggleDisplayMobileTouchButtons(true);
}


/**
 * Returns the list of buttons that should be visible during the game.
 * @returns {HTMLElement[]} Array of button elements for in-game controls
 */
function returnVisibleButtonsStartGame() {
    const restartGameBtnIngame = document.getElementById('restart-game-btn-ingame');
    const showControlsBtnIngame = document.getElementById('show-controls-btn-ingame');
    const leaveGameBtn = document.getElementById('leave-game-btn');

    return [
        restartGameBtnIngame,
        showControlsBtnIngame,
        leaveGameBtn,
        returnRightVolumeButton()
    ]
}


/**
 * Pauses the game by:
 * - Stopping all active game intervals and timeouts
 * - Storing the duration of the Endboss walk attack if active
 */
function pauseGame() {
    const endbossWalkAttack = world.level.enemies[6].attackState.walkAttack;
    if (endbossWalkAttack.start != 0) {
        endbossWalkAttack.duration = Date.now() - endbossWalkAttack.start;
    }
    allGameIntervals.forEach((interval) => { clearInterval(interval) });
    allGameIntervals = [];

    allGameTimeouts.forEach((timeout) => {
        clearTimeout(timeout)
    })
    allGameTimeouts = [];
}


