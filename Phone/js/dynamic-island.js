const dynamicIsland = document.querySelector('.dynamic-island');
let pressTimer;
window.isIslandEnabled = false;
window.isAiActive = false;

function startPress(e) {
    if (!window.isIslandEnabled) return;
    pressTimer = setTimeout(() => {
        if (!window.isAiActive) {
            dynamicIsland.classList.add('vibrate');
        }
    }, 500);
}

function cancelPress(e) {
    if (!window.isIslandEnabled) return;
    clearTimeout(pressTimer);
    dynamicIsland.classList.remove('vibrate');
}

dynamicIsland.addEventListener('mousedown', startPress);
dynamicIsland.addEventListener('touchstart', startPress, { passive: true });
dynamicIsland.addEventListener('mouseup', cancelPress);
dynamicIsland.addEventListener('mouseleave', cancelPress);
dynamicIsland.addEventListener('touchend', cancelPress);

window.triggerIslandLock = function() {
    window.isIslandEnabled = true;
    
    const lockIcon = document.createElement('img');
    lockIcon.className = 'island-lock-icon';
    lockIcon.src = 'Dynamic_Types/dynamic_dot_locked.png';
    
    dynamicIsland.appendChild(lockIcon);
    
    dynamicIsland.classList.add('expanded-lock');
    
    setTimeout(() => {
        lockIcon.classList.add('visible');
    }, 100);
    
    setTimeout(() => {
        lockIcon.src = 'Dynamic_Types/dynamic_dot_unlocked.png';
    }, 600);
    
    setTimeout(() => {
        lockIcon.classList.add('move-left');
    }, 900);
    
    setTimeout(() => {
        dynamicIsland.classList.remove('expanded-lock');
    }, 1300);
    
    setTimeout(() => {
        lockIcon.style.opacity = '0';
    }, 2000);
    
    setTimeout(() => {
        lockIcon.remove();
    }, 2300);
};

window.triggerAssistant = function() {
    if (window.isAiActive) return;
    window.isAiActive = true;
    
    dynamicIsland.classList.add('ai-active');
    
    const aiContainer = document.createElement('div');
    aiContainer.className = 'ai-container';
    
    const blackTop = document.createElement('div');
    blackTop.className = 'ai-black-top';
    
    const ballsWrapper = document.createElement('div');
    ballsWrapper.className = 'ai-balls-wrapper';
    
    const colors = ['#ff2a5f', '#00e5ff', '#ff9500'];
    colors.forEach((c, i) => {
        const ball = document.createElement('div');
        ball.className = `ai-ball ai-ball-${i+1}`;
        ballsWrapper.appendChild(ball);
    });
    
    aiContainer.appendChild(blackTop);
    aiContainer.appendChild(ballsWrapper);
    dynamicIsland.appendChild(aiContainer);
    
    setTimeout(() => {
        dynamicIsland.classList.add('shake-twice');
    }, 50);
    
    setTimeout(() => {
        dynamicIsland.classList.remove('shake-twice');
    }, 400);
};

window.stopAssistant = function() {
    if (!window.isAiActive) return;
    window.isAiActive = false;
    
    dynamicIsland.classList.remove('ai-active');
    
    const container = dynamicIsland.querySelector('.ai-container');
    if (container) {
        container.style.opacity = '0';
        setTimeout(() => {
            container.remove();
        }, 500);
    }
};

dynamicIsland.addEventListener('click', () => {
    if (window.isAiActive) {
        window.stopAssistant();
    }
});