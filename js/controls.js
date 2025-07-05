


function activateKeyboard() {
    activateKeyDown();
    activateKeyUp();
}


function handleKeyDown(event) {
    let key = event.key;

    if (key === 'd') {
        keyboard.D = true;
    } else if (key === 'ArrowRight') {
        keyboard.ARROW_RIGHT = true;
    } else if (key === 'a') {
        keyboard.A = true;
    } else if (key === 'ArrowLeft') {
        keyboard.ARROW_LEFT = true;
    } else if (key === 'w') {
        keyboard.W = true;
    } else if (key === ' ') {
        keyboard.SPACE = true;
    } else if (key === 'ArrowUp') {
        keyboard.ARROW_UP = true;
    } else if (key === 't') {
        keyboard.T = true;
    }
}

function handleKeyUp(event) {
    let key = event.key;

    if (key === 'd') {
        keyboard.D = false;
    } else if (key === 'ArrowRight') {
        keyboard.ARROW_RIGHT = false;
    } else if (key === 'a') {
        keyboard.A = false;
    } else if (key === 'ArrowLeft') {
        keyboard.ARROW_LEFT = false;
    } else if (key === 'w') {
        keyboard.W = false;
    } else if (key === ' ') {
        keyboard.SPACE = false;
    } else if (key === 'ArrowUp') {
        keyboard.ARROW_UP = false;
    } else if (key === 't') {
        keyboard.T = false;
    }
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
            document.querySelectorAll('#direction-buttons button');

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

        element.addEventListener('touchstart', startFn);
        element.addEventListener('touchend', endFn);

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