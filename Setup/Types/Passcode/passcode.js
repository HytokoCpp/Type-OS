window.renderPasscodeScreen = function() {
    const navController = document.querySelector('.setup-nav-controller');
    
    const passPage = document.createElement('div');
    passPage.className = 'setup-page page-enter-right page-passcode';
    
    const topBar = document.createElement('div');
    topBar.className = 'copying-top-bar';
    
    const backBtn = document.createElement('div');
    backBtn.className = 'nav-icon-btn';
    backBtn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>`;
    topBar.appendChild(backBtn);

    const title = document.createElement('h2');
    title.className = 'passcode-title';
    title.innerText = 'Создание код-пароля';

    const desc = document.createElement('p');
    desc.className = 'passcode-desc';
    desc.innerText = 'Защитите свои данные';

    const dotsContainer = document.createElement('div');
    dotsContainer.className = 'passcode-dots';

    let expectedLength = 6;
    let currentPasscode = '';
    let firstPasscode = '';

    const renderDots = () => {
        dotsContainer.innerHTML = '';
        for (let i = 0; i < expectedLength; i++) {
            const dot = document.createElement('div');
            dot.className = 'passcode-dot';
            if (i < currentPasscode.length) {
                dot.classList.add('filled');
            }
            dotsContainer.appendChild(dot);
        }
    };
    renderDots();

    const optionsWrapper = document.createElement('div');
    optionsWrapper.className = 'passcode-options-wrapper';

    const optionsBtn = document.createElement('div');
    optionsBtn.className = 'passcode-options-btn';
    optionsBtn.innerHTML = 'Параметры код-пароля';

    const optionsMenu = document.createElement('div');
    optionsMenu.className = 'passcode-options-menu';
    
    const opt4 = document.createElement('div');
    opt4.className = 'passcode-opt-item';
    opt4.innerText = '4-значный код-пароль';
    
    const opt6 = document.createElement('div');
    opt6.className = 'passcode-opt-item';
    opt6.innerText = '6-значный код-пароль';

    optionsMenu.appendChild(opt4);
    optionsMenu.appendChild(opt6);
    optionsWrapper.appendChild(optionsBtn);
    optionsWrapper.appendChild(optionsMenu);

    optionsBtn.addEventListener('click', () => {
        optionsWrapper.classList.toggle('expanded');
    });

    const setMode = (len) => {
        expectedLength = len;
        currentPasscode = '';
        firstPasscode = '';
        title.innerText = 'Создание код-пароля';
        optionsWrapper.classList.remove('expanded');
        renderDots();
    };

    opt4.addEventListener('click', () => setMode(4));
    opt6.addEventListener('click', () => setMode(6));

    const keypad = document.createElement('div');
    keypad.className = 'passcode-keypad';

    const keyLetters = {
        '2': 'A B C', '3': 'D E F',
        '4': 'G H I', '5': 'J K L', '6': 'M N O',
        '7': 'P Q R S', '8': 'T U V', '9': 'W X Y Z'
    };

    const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', 'delete'];

    const handleInput = (val) => {
        if (optionsWrapper.classList.contains('expanded')) {
            optionsWrapper.classList.remove('expanded');
            return;
        }

        if (val === 'delete') {
            currentPasscode = currentPasscode.slice(0, -1);
            renderDots();
        } else if (val !== '') {
            if (currentPasscode.length < expectedLength) {
                currentPasscode += val;
                renderDots();

                if (currentPasscode.length === expectedLength) {
                    setTimeout(() => {
                        if (firstPasscode === '') {
                            firstPasscode = currentPasscode;
                            currentPasscode = '';
                            title.innerText = 'Подтвердите код-пароль';
                            renderDots();
                        } else {
                            if (currentPasscode === firstPasscode) {
                                localStorage.setItem('hyos_passcode', currentPasscode);
                                passPage.classList.remove('page-active');
                                passPage.classList.add('page-exit-left');
                                console.log("[Setup] Passcode saved. Proceed to next.");
                            } else {
                                dotsContainer.classList.add('shake');
                                setTimeout(() => {
                                    dotsContainer.classList.remove('shake');
                                    currentPasscode = '';
                                    firstPasscode = '';
                                    title.innerText = 'Коды не совпадают. Попробуйте еще раз.';
                                    renderDots();
                                }, 400);
                            }
                        }
                    }, 100);
                }
            }
        }
    };

    keys.forEach(keyVal => {
        const key = document.createElement('div');
        key.className = 'passcode-key';
        
        if (keyVal === '') {
            key.style.visibility = 'hidden';
        } else {
            const bg = document.createElement('div');
            bg.className = 'key-bg';
            
            const txt = document.createElement('div');
            txt.className = 'key-txt-wrapper';
            
            if (keyVal === 'delete') {
                txt.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 4H8l-7 8 7 8h13a2 2 0 002-2V6a2 2 0 00-2-2zM18 9l-6 6M12 9l6 6"/></svg>`;
            } else {
                const mainNum = document.createElement('span');
                mainNum.className = 'key-num';
                mainNum.innerText = keyVal;
                txt.appendChild(mainNum);
                
                if (keyLetters[keyVal]) {
                    const subLet = document.createElement('span');
                    subLet.className = 'key-sub';
                    subLet.innerText = keyLetters[keyVal];
                    txt.appendChild(subLet);
                }
            }

            key.appendChild(bg);
            key.appendChild(txt);

            let isPointerDown = false;
            let centerX = 0, centerY = 0;
            let rafId = null;

            key.addEventListener('pointerdown', (e) => {
                isPointerDown = true;
                const rect = key.getBoundingClientRect();
                centerX = rect.left + rect.width / 2;
                centerY = rect.top + rect.height / 2;
                
                bg.classList.add('dragging');
                bg.style.transform = 'translate(0px, 0px) scale(1.35)';
                
                if (e.target.setPointerCapture) {
                    e.target.setPointerCapture(e.pointerId);
                }
            });

            key.addEventListener('pointermove', (e) => {
                if (!isPointerDown) return;
                
                const clientX = e.touches ? e.touches[0].clientX : e.clientX;
                const clientY = e.touches ? e.touches[0].clientY : e.clientY;
                
                const dx = clientX - centerX;
                const dy = clientY - centerY;
                
                const maxStretch = 30;
                const dist = Math.sqrt(dx*dx + dy*dy);
                let boundedDx = dx;
                let boundedDy = dy;
                
                if (dist > maxStretch) {
                    boundedDx = (dx / dist) * maxStretch;
                    boundedDy = (dy / dist) * maxStretch;
                }

                if (rafId) cancelAnimationFrame(rafId);
                rafId = requestAnimationFrame(() => {
                    const angle = Math.atan2(boundedDy, boundedDx);
                    const stretchX = 1.35 + (dist / maxStretch) * 0.15;
                    const stretchY = 1.35 - (dist / maxStretch) * 0.1;
                    
                    bg.style.transform = `translate(${boundedDx}px, ${boundedDy}px) rotate(${angle}rad) scaleX(${stretchX}) scaleY(${stretchY})`;
                });
            });

            const endPress = () => {
                if (!isPointerDown) return;
                isPointerDown = false;
                if (rafId) cancelAnimationFrame(rafId);
                
                bg.classList.remove('dragging');
                bg.style.transform = 'translate(0px, 0px) scale(1)';
            };

            key.addEventListener('pointerup', () => {
                endPress();
                handleInput(keyVal);
            });
            key.addEventListener('pointerleave', endPress);
            key.addEventListener('pointercancel', endPress);
        }
        keypad.appendChild(key);
    });

    passPage.appendChild(topBar);
    passPage.appendChild(title);
    passPage.appendChild(desc);
    passPage.appendChild(dotsContainer);
    passPage.appendChild(optionsWrapper);
    passPage.appendChild(keypad);
    
    navController.appendChild(passPage);

    void passPage.offsetWidth;
    passPage.classList.remove('page-enter-right');
    passPage.classList.add('page-active');

    setTimeout(() => {
        passPage.classList.add('animate-content');
    }, 100);

    backBtn.addEventListener('click', () => {
        passPage.classList.remove('page-active');
        passPage.classList.add('page-enter-right');
        const faceIdPage = document.querySelector('.page-faceid');
        if (faceIdPage) {
            faceIdPage.classList.remove('page-exit-left');
            faceIdPage.classList.add('page-active');
        }
        setTimeout(() => passPage.remove(), 600);
    });
};