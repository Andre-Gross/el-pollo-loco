const keyMap = {
    d: 'D',
    ArrowRight: 'ARROW_RIGHT',
    a: 'A',
    ArrowLeft: 'ARROW_LEFT',
    w: 'W',
    ' ': 'SPACE',
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


function handleKeyDown(event) {
    handleKeyEvent(event, true);
}


function handleKeyUp(event) {
    handleKeyEvent(event, false);
}


function activateKeyboard() {
    activateKeyDown();
    activateKeyUp();
}


function activateKeyDown() {
    document.addEventListener('keydown', handleKeyDown);
}


function activateKeyUp() {
    document.addEventListener('keyup', handleKeyUp);
}


function deactivateKeyboard() {
    deactivateKeyDown();
    deactivateKeyUp();
}

function deactivateKeyDown() {
    document.removeEventListener('keydown', handleKeyDown);
}


function deactivateKeyUp() {
    document.removeEventListener('keyup', handleKeyUp);
}


const touchControls = (function () {
    let listeners = [];

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

    function createAndAttachListeners({ element, key }) {
        const startFn = () => keyboard[key] = true;
        const endFn = () => keyboard[key] = false;

        element.addEventListener('touchstart', startFn, { passive: true });
        element.addEventListener('touchend', endFn, { passive: true });

        listeners.push({ element, startFn, endFn });
    }

    function activate() {
        const mappings = getTouchMappings();
        mappings.forEach(createAndAttachListeners);
    }

    function removeListeners() {
        listeners.forEach(({ element, startFn, endFn }) => {
            element.removeEventListener('touchstart', startFn);
            element.removeEventListener('touchend', endFn);
        });
    }

    function deactivate() {
        removeListeners();
        listeners = [];
    }

    return { activate, deactivate };
})();