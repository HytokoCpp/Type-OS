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
    desc.innerText = 'Телефон может распознавать уникальные трехмерные особенности Вашего лица для автоматической разблокировки и подтверждения личности.';
    
    contentArea.appendChild(iconWrapper);
    contentArea.appendChild(title);
    contentArea.appendChild(desc);
    
    const scanTextWrapper = document.createElement('div');
    scanTextWrapper.className = 'faceid-scan-text-wrapper';
    const scanDesc = document.createElement('p');
    scanDesc.className = 'faceid-scan-desc';
    scanDesc.innerText = 'Плавно двигайте головой по кругу.';
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
    
    const stopScanning = () => {
        if (island) {
            island.classList.remove('camera-active');
            island.classList.remove('faceid-scan-mode');
            const islandLottieWrapper = island.querySelector('.island-faceid-lottie');
            if (islandLottieWrapper) islandLottieWrapper.remove();
        }
    };
    
    backBtn.addEventListener('click', () => {
        stopScanning();
        faceIdPage.classList.remove('page-active');
        faceIdPage.classList.add('page-enter-right');
        const privPage = document.querySelector('.page-privacy');
        if (privPage) {
            privPage.classList.remove('page-exit-left');
            privPage.classList.add('page-active');
        }
        setTimeout(() => faceIdPage.remove(), 600);
    });
    
    const proceedNext = () => {
        stopScanning();
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
            iconWrapper.style.transition = 'opacity 0.3s ease';
            title.style.transition = 'opacity 0.3s ease';
            desc.style.transition = 'opacity 0.3s ease';
            bottomSheet.style.transition = 'opacity 0.3s ease';
            
            iconWrapper.style.opacity = '0';
            title.style.opacity = '0';
            desc.style.opacity = '0';
            bottomSheet.style.opacity = '0';
            
            setTimeout(() => {
                if (island) {
                    island.classList.add('camera-active');
                    island.classList.add('faceid-scan-mode');
                    
                    const islandLottieWrapper = document.createElement('div');
                    islandLottieWrapper.className = 'island-faceid-lottie';
                    island.appendChild(islandLottieWrapper);
                    
                    lottie.loadAnimation({
                        container: islandLottieWrapper,
                        renderer: 'svg',
                        loop: true,
                        autoplay: true,
                        path: '../Setup/assets/animations/faceid.json'
                    });
                    
                    setTimeout(() => {
                        islandLottieWrapper.classList.add('visible');
                    }, 50);
                }
                
                iconWrapper.style.display = 'none';
                
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
                    bottomSheet.style.opacity = '1';
                }, 300);
                
                setTimeout(() => {
                    stopScanning();
                    scanTextWrapper.classList.remove('visible');
                    bottomSheet.style.opacity = '0';
                    
                    setTimeout(() => {
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
                                setTimeout(proceedNext, 300);
                            });
                            
                            bottomSheet.appendChild(finalBtn);
                            bottomSheet.style.opacity = '1';
                        }, 600);
                        
                    }, 400);
                    
                }, 4000);
                
            }, 400);
        }, 150);
    });
};