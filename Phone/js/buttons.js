const btnAction = document.getElementById('btn-action');
const btnVolUp = document.getElementById('btn-vol-up');
const btnVolDown = document.getElementById('btn-vol-down');
const btnPower = document.getElementById('btn-power');

function handleButtonPress(buttonName) {
    console.log(`[Hardware] ${buttonName} pressed`);
}

btnAction.addEventListener('mousedown', () => handleButtonPress('Action'));
btnAction.addEventListener('touchstart', () => handleButtonPress('Action'), {passive: true});

btnVolUp.addEventListener('mousedown', () => handleButtonPress('Volume Up'));
btnVolUp.addEventListener('touchstart', () => handleButtonPress('Volume Up'), {passive: true});

btnVolDown.addEventListener('mousedown', () => handleButtonPress('Volume Down'));
btnVolDown.addEventListener('touchstart', () => handleButtonPress('Volume Down'), {passive: true});

btnPower.addEventListener('mousedown', () => handleButtonPress('Power'));
btnPower.addEventListener('touchstart', () => handleButtonPress('Power'), {passive: true});