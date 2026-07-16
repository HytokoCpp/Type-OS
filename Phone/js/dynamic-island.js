const dynamicIsland = document.querySelector('.dynamic-island');
let pressTimer;
window.isIslandEnabled = false;

function startPress(e) {
    if (!window.isIslandEnabled) return;
    pressTimer = setTimeout(() => {
        dynamicIsland.classList.add('vibrate');
    }, 500);
}

function cancelPress(e) {
    if (!window.isIslandEnabled) return;
    clearTimeout(pressTimer);
    dynamicIsland.classList.remove('vibrate');
}

dynamicIsland.addEventListener('mousedown', startPress);
dynamicIsland.addEventListener('touchstart', startPress);

dynamicIsland.addEventListener('mouseup', cancelPress);
dynamicIsland.addEventListener('mouseleave', cancelPress);
dynamicIsland.addEventListener('touchend', cancelPress);

window.triggerIslandLock = function() {
    window.isIslandEnabled = true;
    
    const lockIcon = document.createElement('div');
    lockIcon.className = 'island-lock-icon';
    
    const unlockedSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="16" height="16"><path d="M17 9V7A5 5 0 0 0 7 7h2a3 3 0 0 1 6 0v2H7a3 3 0 0 0-3 3v7a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-7a3 3 0 0 0-3-3z"/></svg>`;
    const lockedSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="16" height="16"><path d="M17 9V7A5 5 0 0 0 7 7v2a3 3 0 0 0-3 3v7a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-7a3 3 0 0 0-3-3zM9 7a3 3 0 0 1 6 0v2H9V7z"/></svg>`;
    
    lockIcon.innerHTML = unlockedSvg;
    dynamicIsland.appendChild(lockIcon);

    dynamicIsland.classList.add('expanded-lock');

    setTimeout(() => {
        lockIcon.classList.add('visible');
    }, 100);

    setTimeout(() => {
        lockIcon.classList.add('move-left');
    }, 400);

    setTimeout(() => {
        lockIcon.innerHTML = lockedSvg;
    }, 700);

    setTimeout(() => {
        dynamicIsland.classList.remove('expanded-lock');
    }, 1100);
};