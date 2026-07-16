let isSwipeAllowed = false;

function runStartupAnimation() {
    const screen = document.querySelector('.screen');
    
    const logoContainer = document.createElement('div');
    logoContainer.className = 'boot-logo-container';
    
    const logo = document.createElement('img');
    logo.src = '../iBoot/assets/icons/logo.png';
    logo.className = 'boot-logo';
    
    logoContainer.appendChild(logo);
    screen.appendChild(logoContainer);

    setTimeout(() => {
        logoContainer.classList.add('glassy');
        
        setTimeout(() => {
            logoContainer.classList.add('falling');
            
            setTimeout(() => { showWallpaper(); }, 1000);
            
            setTimeout(() => {
                logoContainer.classList.add('bar-formed');
                
                setTimeout(() => {
                    logo.remove();
                    logoContainer.className = 'home-bar expanded';
                    initSetupWelcome();
                }, 1000);
                
            }, 800);
            
        }, 1500);
        
    }, 6000);
}

function showWallpaper() {
    const screen = document.querySelector('.screen');
    const wallpaper = document.createElement('div');
    wallpaper.className = 'system-wallpaper';
    screen.insertBefore(wallpaper, screen.firstChild);

    setTimeout(() => {
        wallpaper.classList.add('visible');
    }, 50);
}

function initSetupWelcome() {
    const screen = document.querySelector('.screen');
    
    const lottieContainer = document.createElement('div');
    lottieContainer.className = 'setup-lottie-container';
    screen.appendChild(lottieContainer);

    const anim = lottie.loadAnimation({
        container: lottieContainer,
        renderer: 'svg',
        loop: false,
        autoplay: false,
        path: '../Setup/assets/animations/hello.json'
    });

    anim.addEventListener('DOMLoaded', () => { anim.playSegments([0, 490], true); });

    anim.addEventListener('complete', () => {
        showUnlockHint();
        if (typeof window.triggerIslandLock === 'function') window.triggerIslandLock();
        initSwipeLogic();
    });

    setTimeout(() => { lottieContainer.classList.add('visible'); }, 100);
}

function showUnlockHint() {
    const screen = document.querySelector('.screen');
    const hint = document.createElement('div');
    hint.className = 'swipe-hint';
    hint.innerHTML = 'Swipe to unlock <span class="arrow">↑</span>';
    screen.appendChild(hint);

    setTimeout(() => { hint.classList.add('visible'); }, 100);

    const homeBar = document.querySelector('.home-bar');
    if (homeBar) homeBar.classList.add('bouncing');
}

function initSwipeLogic() {
    isSwipeAllowed = true;
    const screen = document.querySelector('.screen');
    let startY = 0;
    let isDragging = false;
    let rafId = null;

    // Заранее готовим невидимый экран настроек в самом низу
    prepareNavigationController();

    const lottieContainer = document.querySelector('.setup-lottie-container');
    const swipeHint = document.querySelector('.swipe-hint');
    const navController = document.querySelector('.setup-nav-controller');

    const handleStart = (e) => {
        if (!isSwipeAllowed) return;
        startY = e.touches ? e.touches[0].clientY : e.clientY;
        isDragging = true;
        
        if (lottieContainer) lottieContainer.style.transition = 'none';
        if (swipeHint) swipeHint.style.transition = 'none';
        if (navController) navController.style.transition = 'none';
    };

    const handleMove = (e) => {
        if (!isDragging) return;
        const currentY = e.touches ? e.touches[0].clientY : e.clientY;
        const delta = startY - currentY;
        
        if (delta > 0) {
            if (rafId) cancelAnimationFrame(rafId);
            rafId = requestAnimationFrame(() => {
                const scaleValue = Math.max(0.85, 1 - delta / 800);
                
                // Анимация параллакса (текст уходит вдаль, а экран настроек выезжает снизу)
                if (lottieContainer) lottieContainer.style.transform = `translate(-50%, calc(-50% - ${delta * 0.4}px)) scale(${scaleValue})`;
                if (swipeHint) swipeHint.style.transform = `translateX(-50%) translateY(-${delta}px)`;
                if (navController) navController.style.transform = `translateY(calc(100% - ${delta}px))`;
            });
        }
    };

    const handleEnd = (e) => {
        if (!isDragging) return;
        isDragging = false;
        if (rafId) cancelAnimationFrame(rafId);
        
        const endY = e.changedTouches ? e.changedTouches[0].clientY : e.clientY;
        const delta = startY - endY;

        const smoothSpring = 'transform 0.6s cubic-bezier(0.32, 0.72, 0, 1)';
        if (lottieContainer) lottieContainer.style.transition = smoothSpring + ', opacity 0.4s ease';
        if (swipeHint) swipeHint.style.transition = smoothSpring + ', opacity 0.4s ease';
        if (navController) navController.style.transition = smoothSpring;

        if (delta > 80) { // Свайп успешен
            isSwipeAllowed = false;
            if (lottieContainer) {
                lottieContainer.style.transform = `translate(-50%, -100vh) scale(0.8)`;
                lottieContainer.style.opacity = '0';
            }
            if (swipeHint) {
                swipeHint.style.transform = `translateX(-50%) translateY(-100vh)`;
                swipeHint.style.opacity = '0';
            }
            if (navController) {
                navController.style.transform = `translateY(0)`;
                // Запускаем анимации элементов внутри контроллера
                document.querySelector('.page-language').classList.add('animate-content');
            }
            
            const homeBar = document.querySelector('.home-bar');
            if (homeBar) homeBar.classList.remove('bouncing');

            setTimeout(() => {
                if (lottieContainer) lottieContainer.remove();
                if (swipeHint) swipeHint.remove();
            }, 600);

        } else { // Возврат назад (отмена свайпа)
            if (lottieContainer) lottieContainer.style.transform = 'translate(-50%, -50%) scale(1)';
            if (swipeHint) swipeHint.style.transform = 'translateX(-50%) translateY(0)';
            if (navController) navController.style.transform = `translateY(100%)`;
        }
    };

    screen.addEventListener('touchstart', handleStart, {passive: true});
    screen.addEventListener('touchmove', handleMove, {passive: true});
    screen.addEventListener('touchend', handleEnd);
    screen.addEventListener('mousedown', handleStart);
    screen.addEventListener('mousemove', handleMove);
    screen.addEventListener('mouseup', handleEnd);
    screen.addEventListener('mouseleave', handleEnd);
}

async function prepareNavigationController() {
    if (document.querySelector('.setup-nav-controller')) return;
    const screen = document.querySelector('.screen');
    
    const navController = document.createElement('div');
    navController.className = 'setup-nav-controller';
    
    const langPage = document.createElement('div');
    langPage.className = 'setup-page page-active page-language';
    
    const globeWrapper = document.createElement('div');
    globeWrapper.className = 'globe-wrapper';
    globeWrapper.innerHTML = `
        <svg class="globe-svg" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M2 12h20"></path>
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
        </svg>
    `;

    const title = document.createElement('div');
    title.className = 'locale-title';
    title.innerText = 'Languages';
    
    const listWrapper = document.createElement('div');
    listWrapper.className = 'locale-list-wrapper';

    langPage.appendChild(globeWrapper);
    langPage.appendChild(title);
    langPage.appendChild(listWrapper);
    navController.appendChild(langPage);
    screen.appendChild(navController);

    try {
        const response = await fetch('https://get.geojs.io/v1/ip/geo.json');
        const data = await response.json();
        populateLanguages(listWrapper, data.country_code);
    } catch (error) {
        populateLanguages(listWrapper, 'US');
    }
}

function populateLanguages(wrapper, detectedCountryCode) {
    const ipToLang = {
        'RU': 'ru', 'US': 'en', 'GB': 'en', 'DE': 'de', 'FR': 'fr', 'ES': 'es', 'IT': 'it', 'CN': 'zh', 'JP': 'ja'
    };
    
    let suggestedLangCode = ipToLang[detectedCountryCode] || 'en';
    let suggestedLang = systemLanguages.find(l => l.code === suggestedLangCode);
    let otherLangs = systemLanguages.filter(l => l.code !== suggestedLangCode);

    let html = `
        <div class="locale-group-title" style="animation-delay: 0.1s">Suggested</div>
        <div class="locale-group" style="animation-delay: 0.15s">
            <div class="locale-item" onclick="window.selectLanguage('${suggestedLang.code}')">
                <span>${suggestedLang.name}</span>
                <span class="chevron">›</span>
            </div>
        </div>
        <div class="locale-group-title" style="animation-delay: 0.2s">Other Languages</div>
        <div class="locale-group" style="animation-delay: 0.25s">
    `;
    
    otherLangs.forEach((lang, index) => {
        const delay = 0.3 + (index * 0.04);
        html += `
            <div class="locale-item fade-in-cascade" style="animation-delay: ${delay}s" onclick="window.selectLanguage('${lang.code}')">
                <span>${lang.name}</span>
                <span class="chevron">›</span>
            </div>
        `;
    });
    
    html += `</div>`;
    wrapper.innerHTML = html;
}

window.selectLanguage = function(langCode) {
    const langPage = document.querySelector('.page-language');
    if (langPage) {
        langPage.classList.remove('page-active');
        langPage.classList.add('page-exit-left');
    }
    renderCountryScreen(langCode);
};

function renderCountryScreen(langCode) {
    const navController = document.querySelector('.setup-nav-controller');
    
    const countryPage = document.createElement('div');
    countryPage.className = 'setup-page page-enter-right page-country';
    
    const title = document.createElement('div');
    title.className = 'locale-title';
    title.innerText = 'Select Your Country or Region';
    
    const listWrapper = document.createElement('div');
    listWrapper.className = 'locale-list-wrapper';

    let html = '<div class="locale-group" style="animation-delay: 0.1s">';
    systemCountries.forEach((country, index) => {
        const delay = 0.15 + (index * 0.03);
        html += `
            <div class="locale-item fade-in-cascade" style="animation-delay: ${delay}s" onclick="window.selectCountry('${country.code}')">
                <span>${country.name}</span>
                <span class="chevron">›</span>
            </div>
        `;
    });
    html += '</div>';
    listWrapper.innerHTML = html;

    countryPage.appendChild(title);
    countryPage.appendChild(listWrapper);
    navController.appendChild(countryPage);

    void countryPage.offsetWidth;

    countryPage.classList.remove('page-enter-right');
    countryPage.classList.add('page-active');
    countryPage.classList.add('animate-content');
}

window.selectCountry = function(countryCode) {
    const countryPage = document.querySelector('.page-country');
    if (countryPage) {
        countryPage.classList.remove('page-active');
        countryPage.classList.add('page-exit-left');
    }
    if (typeof renderWifiScreen === 'function') {
        renderWifiScreen();
    }
};