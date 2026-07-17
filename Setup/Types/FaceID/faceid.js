window.faceIdStream = null;

window.renderFaceIDScreen = function() {
    const navController = document.querySelector('.setup-nav-controller');
    
    const faceIdPage = document.createElement('div');
    faceIdPage.className = 'setup-page page-enter-right page-faceid';
    
    const topBar = document.createElement('div');
    topBar.className = 'copying-top-bar';
    
    const backBtn = document.createElement('div');
    backBtn.className = 'nav-icon-btn';
    backBtn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>`;

    topBar.appendChild(backBtn);

    const contentArea = document.createElement('div');
    contentArea.className = 'faceid-content';

    const iconWrapper = document.createElement('div');
    iconWrapper.className = 'faceid-icon-wrapper';
    iconWrapper.innerHTML = `
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path class="faceid-bracket" d="M30 20 H20 V30" stroke="#82b1ff" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
            <path class="faceid-bracket" d="M70 20 H80 V30" stroke="#82b1ff" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
            <path class="faceid-bracket" d="M30 80 H20 V70" stroke="#82b1ff" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
            <path class="faceid-bracket" d="M70 80 H80 V70" stroke="#82b1ff" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
            <path class="faceid-face" d="M40 45 V50" stroke="#007aff" stroke-width="6" stroke-linecap="round"/>
            <path class="faceid-face" d="M60 45 V50" stroke="#007aff" stroke-width="6" stroke-linecap="round"/>
            <path class="faceid-face" d="M50 48 V60" stroke="#007aff" stroke-width="6" stroke-linecap="round"/>
            <path class="faceid-smile" d="M40 68 C45 73, 55 73, 60 68" stroke="#007aff" stroke-width="6" stroke-linecap="round"/>
        </svg>
    `;

    const title = document.createElement('h2');
    title.className = 'faceid-title';
    title.innerText = 'Настройка Face ID';

    const desc = document.createElement('p');
    desc.className = 'faceid-desc';
    desc.innerText = 'Сначала расположите лицо в рамке камеры. Затем плавно двигайте головой по кругу, чтобы показать все ракурсы Вашего лица.';

    contentArea.appendChild(iconWrapper);
    contentArea.appendChild(title);
    contentArea.appendChild(desc);

    const scanTextWrapper = document.createElement('div');
    scanTextWrapper.className = 'faceid-scan-text-wrapper';
    const scanDesc = document.createElement('p');
    scanDesc.className = 'faceid-scan-desc';
    scanDesc.innerText = 'Расположите лицо в рамке.';
    scanTextWrapper.appendChild(scanDesc);

    const bottomSheet = document.createElement('div');
    bottomSheet.className = 'privacy-bottom-sheet faceid-bottom';

    const continueBtn = document.createElement('button');
    continueBtn.className = 'btn-privacy-primary';
    continueBtn.innerText = 'Начать';

    const setupLaterBtn = document.createElement('button');
    setupLaterBtn.className = 'btn-privacy-secondary';
    setupLaterBtn.innerText = 'Настроить позже в Настройках';

    bottomSheet.appendChild(continueBtn);
    bottomSheet.appendChild(setupLaterBtn);

    faceIdPage.appendChild(topBar);
    faceIdPage.appendChild(contentArea);
    faceIdPage.appendChild(scanTextWrapper);
    faceIdPage.appendChild(bottomSheet);
    
    navController.appendChild(faceIdPage);

    void faceIdPage.offsetWidth;
    faceIdPage.classList.remove('page-enter-right');
    faceIdPage.classList.add('page-active');

    const island = document.querySelector('.dynamic-island');

    setTimeout(() => {
        faceIdPage.classList.add('animate-content');
    }, 50);

    const stopCamera = () => {
        if (window.faceIdStream) {
            window.faceIdStream.getTracks().forEach(track => track.stop());
            window.faceIdStream = null;
        }
        const viewfinder = document.querySelector('.island-camera-viewfinder');
        if (viewfinder) viewfinder.remove();
        if (island) {
            island.classList.remove('faceid-scan-mode');
            island.classList.remove('camera-active');
            island.classList.remove('scanning');
        }
    };

    backBtn.addEventListener('click', () => {
        stopCamera();
        faceIdPage.classList.remove('page-active');
        faceIdPage.classList.add('page-enter-right');
        const privPage = document.querySelector('.page-privacy');
        if (privPage) {
            privPage.classList.remove('page-exit-left');
            privPage.classList.add('page-active');
        }
        setTimeout(() => faceIdPage.remove(), 500);
    });

    const proceedNext = () => {
        stopCamera();
        faceIdPage.classList.remove('page-active');
        faceIdPage.classList.add('page-exit-left');
        if (typeof window.renderPasscodeScreen === 'function') {
            window.renderPasscodeScreen();
        }
    };

    setupLaterBtn.addEventListener('click', () => {
        setupLaterBtn.style.transform = 'scale(0.96)';
        setTimeout(() => setupLaterBtn.style.transform = 'scale(1)', 150);
        setTimeout(proceedNext, 200);
    });

    continueBtn.addEventListener('click', () => {
        continueBtn.style.transform = 'scale(0.96)';
        setTimeout(() => continueBtn.style.transform = 'scale(1)', 150);
        
        setTimeout(() => {
            contentArea.classList.add('fade-out-down');
            bottomSheet.classList.add('fade-out-down');

            setTimeout(() => {
                island.classList.add('faceid-scan-mode');
                island.classList.add('camera-active');
                island.classList.add('scanning');

                const viewfinder = document.createElement('div');
                viewfinder.className = 'island-camera-viewfinder';
                
                const tl = document.createElement('div'); tl.className = 'scan-corner tl';
                const tr = document.createElement('div'); tr.className = 'scan-corner tr';
                const bl = document.createElement('div'); bl.className = 'scan-corner bl';
                const br = document.createElement('div'); br.className = 'scan-corner br';
                
                const video = document.createElement('video');
                video.autoplay = true;
                video.playsInline = true;
                video.muted = true;

                viewfinder.appendChild(tl);
                viewfinder.appendChild(tr);
                viewfinder.appendChild(bl);
                viewfinder.appendChild(br);
                viewfinder.appendChild(video);
                island.appendChild(viewfinder);

                setTimeout(() => {
                    viewfinder.classList.add('visible');
                    navigator.mediaDevices.getUserMedia({ video: true })
                        .then(stream => {
                            window.faceIdStream = stream;
                            video.srcObject = stream;
                        })
                        .catch(err => {
                            video.style.display = 'none';
                            viewfinder.style.backgroundImage = "url('assets/wallpapers/classic1.png')";
                            viewfinder.style.backgroundSize = "cover";
                            viewfinder.style.backgroundPosition = "center";
                        });
                }, 500);

                title.innerText = '';
                desc.innerText = '';

                bottomSheet.innerHTML = '';
                
                const laterBtn = document.createElement('button');
                laterBtn.className = 'btn-privacy-secondary';
                laterBtn.innerText = 'Настроить позже в Настройках';
                laterBtn.style.marginBottom = '15px';
                
                const restartBtn = document.createElement('button');
                restartBtn.className = 'btn-privacy-secondary';
                restartBtn.style.background = 'transparent';
                restartBtn.innerText = 'Начать заново';

                laterBtn.addEventListener('click', proceedNext);
                restartBtn.addEventListener('click', proceedNext);

                bottomSheet.appendChild(laterBtn);
                bottomSheet.appendChild(restartBtn);

                setTimeout(() => {
                    scanTextWrapper.classList.add('visible');
                    bottomSheet.classList.remove('fade-out-down');
                    bottomSheet.classList.add('fade-in-up');
                }, 400);

                setTimeout(() => {
                    scanTextWrapper.classList.remove('visible');
                    bottomSheet.classList.remove('fade-in-up');
                    bottomSheet.classList.add('fade-out-down');

                    setTimeout(() => {
                        stopCamera();
                        
                        iconWrapper.style.display = 'none';
                        contentArea.classList.remove('fade-out-down');
                        contentArea.classList.add('fade-in-up');

                        const successIcon = document.createElement('div');
                        successIcon.className = 'faceid-success-icon';
                        successIcon.innerHTML = `
                            <svg viewBox="0 0 52 52">
                                <circle class="success-circle" cx="26" cy="26" r="24" fill="none"/>
                                <path class="success-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
                            </svg>
                        `;
                        contentArea.insertBefore(successIcon, title);

                        setTimeout(() => {
                            successIcon.classList.add('visible');
                        }, 50);

                        setTimeout(() => {
                            title.innerText = 'Face ID настроен';
                            title.style.textAlign = 'center';
                            title.style.marginTop = '20px';
                            desc.innerText = 'Теперь Вы можете использовать Face ID для разблокировки телефона.';
                            desc.style.textAlign = 'center';

                            title.style.opacity = '1';
                            desc.style.opacity = '1';

                            bottomSheet.innerHTML = '';
                            
                            const finalBtn = document.createElement('button');
                            finalBtn.className = 'btn-privacy-primary';
                            finalBtn.innerText = 'Продолжить';
                            finalBtn.addEventListener('click', () => {
                                finalBtn.style.transform = 'scale(0.96)';
                                setTimeout(() => finalBtn.style.transform = 'scale(1)', 150);
                                setTimeout(proceedNext, 200);
                            });

                            bottomSheet.appendChild(finalBtn);
                            bottomSheet.classList.remove('fade-out-down');
                            bottomSheet.classList.add('fade-in-up');
                        }, 600);

                    }, 600);

                }, 4000);

            }, 300);
        }, 100);
    });
};