const SPACE_KEY = ' ';

const keyMap = {
    d: 'D',
    ArrowRight: 'ARROW_RIGHT',
    a: 'A',
    ArrowLeft: 'ARROW_LEFT',
    w: 'W',
    [SPACE_KEY]: 'SPACE',
    ArrowUp: 'ARROW_UP',
    t: 'T'
};


/**
 * Handles setting key state for keydown or keyup event.
 * @param {KeyboardEvent} event - The keyboard event.
 * @param {boolean} isPressed - True if key is pressed, false if released.
 */
function handleKeyEvent(event, isPressed) {
    const mappedKey = keyMap[event.key];
    if (mappedKey) {
        keyboard[mappedKey] = isPressed;
    }
}


/**
 * Keydown event handler that marks a key as pressed.
 * @param {KeyboardEvent} event - The keyboard event.
 */
function handleKeyDown(event) {
    handleKeyEvent(event, true);
}


/**
 * Keyup event handler that marks a key as released.
 * @param {KeyboardEvent} event - The keyboard event.
 */
function handleKeyUp(event) {
    handleKeyEvent(event, false);
}


/**
 * Deactivates all player input controls.
 * - Disables keyboard input
 * - Disables touch controls
 */
function deactivateControls() {
    deactivateKeyboard();
    touchControls.deactivate();
}


/**
 * Activates keyboard input by setting up keydown and keyup listeners.
 */
function activateKeyboard() {
    activateKeyDown();
    activateKeyUp();
}


/**
 * Adds the keydown event listener.
 */
function activateKeyDown() {
    document.addEventListener('keydown', handleKeyDown);
}


/**
 * Adds the keyup event listener.
 */
function activateKeyUp() {
    document.addEventListener('keyup', handleKeyUp);
}



/**
 * Deactivates all keyboard input by removing event listeners.
 */
function deactivateKeyboard() {
    deactivateKeyDown();
    deactivateKeyUp();
}


/**
 * Removes the keydown event listener.
 */
function deactivateKeyDown() {
    document.removeEventListener('keydown', handleKeyDown);
}


/**
 * Removes the keyup event listener.
 */
function deactivateKeyUp() {
    document.removeEventListener('keyup', handleKeyUp);
}


/**
 * Module that simulates keyboard input using touch UI on mobile devices.
 * Provides `activate()` and `deactivate()` methods.
 * @namespace
 */
const touchControls = (function () {
    let listeners = [];


    /**
     * Maps touchable UI buttons to keyboard keys.
     * Assumes the required HTML elements are present.
     * @returns {Object[]} Array of mapping objects with element and key.
     */
    function getTouchMappings() {
        const bottleBtn = document.getElementById('throw-bottle-btn');
        const [arrowUpBtn, arrowLeftBtn, arrowRightBtn] =
            document.querySelectorAll('#direction-buttons button:not(.blind-button)');

        return [
            { element: bottleBtn, key: 'T' },
            { element: arrowUpBtn, key: 'ARROW_UP' },
            { element: arrowLeftBtn, key: 'ARROW_LEFT' },
            { element: arrowRightBtn, key: 'ARROW_RIGHT' },
        ];
    }


    /**
     * Attaches touchstart and touchend listeners to an element for a given key.
     * @param {{ element: HTMLElement, key: string }} mapping - The mapping object.
     */
    function createAndAttachListeners({ element, key }) {
        const startFn = () => keyboard[key] = true;
        const endFn = () => keyboard[key] = false;

        element.addEventListener('touchstart', startFn, { passive: true });
        element.addEventListener('touchend', endFn, { passive: true });

        listeners.push({ element, startFn, endFn });
    }


    /**
     * Activates touch controls by attaching listeners to relevant buttons.
     */
    function activate() {
        const mappings = getTouchMappings();
        mappings.forEach(createAndAttachListeners);
    }


    /**
     * Removes all previously attached touch listeners.
     */
    function removeListeners() {
        listeners.forEach(({ element, startFn, endFn }) => {
            element.removeEventListener('touchstart', startFn);
            element.removeEventListener('touchend', endFn);
        });
    }


    /**
     * Deactivates touch controls and clears all listeners.
     */
    function deactivate() {
        removeListeners();
        listeners = [];
    }

    return { activate, deactivate };
})();