async function verifySystem() {
    const startTime = Date.now();
    let isValid = true;
    
    const coreElements = ['.phone-frame', '.screen', '.dynamic-island'];
    
    coreElements.forEach(selector => {
        if (!document.querySelector(selector)) {
            isValid = false;
        }
    });
    
    if (document.body.children.length > 50) {
        isValid = false;
    }
    
    const elapsedTime = Date.now() - startTime;
    if (elapsedTime < 5000) {
        await new Promise(resolve => setTimeout(resolve, 5000 - elapsedTime));
    }
    
    if (isValid && typeof runStartupAnimation === 'function') {
        runStartupAnimation();
    } else {
        systemPanic();
    }
}

function systemPanic() {
    const screen = document.querySelector('.screen');
    screen.style.backgroundColor = '#aa0000';
    screen.innerHTML = '';
}

window.addEventListener('load', verifySystem);