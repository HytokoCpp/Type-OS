const btnAction = document.getElementById('btn-action');
const btnVolUp = document.getElementById('btn-vol-up');
const btnVolDown = document.getElementById('btn-vol-down');
const btnPower = document.getElementById('btn-power');

let powerHoldTimer;
let isPowerHeld = false;
let powerHoldTriggered = false;

function handleButtonPress(buttonName) {
    console.log(`[Hardware] ${buttonName} pressed`);
}

btnAction.addEventListener('mousedown', () => handleButtonPress('Action'));
btnAction.addEventListener('touchstart', () => handleButtonPress('Action'), { passive: true });

btnVolUp.addEventListener('mousedown', () => handleButtonPress('Volume Up'));
btnVolUp.addEventListener('touchstart', () => handleButtonPress('Volume Up'), { passive: true });

btnVolDown.addEventListener('mousedown', () => handleButtonPress('Volume Down'));
btnVolDown.addEventListener('touchstart', () => handleButtonPress('Volume Down'), { passive: true });

const startPowerHold = () => {
    isPowerHeld = true;
    powerHoldTriggered = false;
    powerHoldTimer = setTimeout(() => {
        if (isPowerHeld) {
            powerHoldTriggered = true;
            if (!window.isAiActive && typeof window.triggerAssistant === 'function') {
                window.triggerAssistant();
            } else if (window.isAiActive && typeof window.stopAssistant === 'function') {
                window.stopAssistant();
            }
        }
    }, 600);
};

const cancelPowerHold = () => {
    isPowerHeld = false;
    clearTimeout(powerHoldTimer);
    
    if (!powerHoldTriggered) {
        if (window.isAiActive && typeof window.stopAssistant === 'function') {
            window.stopAssistant();
        } else {
            handleButtonPress('Power');
        }
    }
};

btnPower.addEventListener('mousedown', startPowerHold);
btnPower.addEventListener('touchstart', startPowerHold, { passive: true });
btnPower.addEventListener('mouseup', cancelPowerHold);
btnPower.addEventListener('mouseleave', cancelPowerHold);
btnPower.addEventListener('touchend', cancelPowerHold);