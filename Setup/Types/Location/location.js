window.renderLocationScreen = function() {
    const navController = document.querySelector('.setup-nav-controller');
    
    const locPage = document.createElement('div');
    locPage.className = 'setup-page page-enter-right page-location';
    
    const topBar = document.createElement('div');
    topBar.className = 'copying-top-bar';
    
    const backBtn = document.createElement('div');
    backBtn.className = 'nav-icon-btn';
    backBtn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>`;

    topBar.appendChild(backBtn);

    const contentArea = document.createElement('div');
    contentArea.className = 'location-content';

    const iconWrapper = document.createElement('div');
    iconWrapper.className = 'location-icon-wrapper';
    
    const ripple1 = document.createElement('div');
    ripple1.className = 'loc-ripple loc-ripple-1';
    const ripple2 = document.createElement('div');
    ripple2.className = 'loc-ripple loc-ripple-2';
    
    const pin = document.createElement('div');
    pin.className = 'loc-pin';
    pin.innerHTML = `<svg viewBox="0 0 24 24" fill="#007aff"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>`;

    iconWrapper.appendChild(ripple1);
    iconWrapper.appendChild(ripple2);
    iconWrapper.appendChild(pin);

    const title = document.createElement('h2');
    title.className = 'loc-title';
    title.innerText = 'Службы геолокации';

    const desc = document.createElement('p');
    desc.className = 'loc-desc';
    desc.innerText = 'Службы геолокации позволяют Картам и другим приложениям использовать данные о Вашем местоположении. Это необходимо для работы навигации и поиска локальных сервисов.';

    const btnWrapper = document.createElement('div');
    btnWrapper.className = 'loc-btn-wrapper';

    const enableBtn = document.createElement('button');
    enableBtn.className = 'btn-loc-primary';
    enableBtn.innerText = 'Включить службы геолокации';

    const disableBtn = document.createElement('button');
    disableBtn.className = 'btn-loc-secondary';
    disableBtn.innerText = 'Не использовать геопозицию';

    btnWrapper.appendChild(enableBtn);
    btnWrapper.appendChild(disableBtn);

    contentArea.appendChild(iconWrapper);
    contentArea.appendChild(title);
    contentArea.appendChild(desc);
    contentArea.appendChild(btnWrapper);

    locPage.appendChild(topBar);
    locPage.appendChild(contentArea);
    
    navController.appendChild(locPage);

    void locPage.offsetWidth;
    locPage.classList.remove('page-enter-right');
    locPage.classList.add('page-active');

    setTimeout(() => {
        locPage.classList.add('animate-content');
    }, 100);

    backBtn.addEventListener('click', () => {
        locPage.classList.remove('page-active');
        locPage.classList.add('page-enter-right');
        const copyPage = document.querySelector('.page-copying');
        if (copyPage) {
            copyPage.classList.remove('page-exit-left');
            copyPage.classList.add('page-active');
        }
        setTimeout(() => locPage.remove(), 600);
    });

    const proceedNext = () => {
        locPage.classList.remove('page-active');
        locPage.classList.add('page-exit-left');
        if (typeof window.renderPrivacyScreen === 'function') {
            window.renderPrivacyScreen();
        }
    };

    enableBtn.addEventListener('click', () => {
        enableBtn.style.transform = 'scale(0.96)';
        setTimeout(() => enableBtn.style.transform = 'scale(1)', 150);
        setTimeout(proceedNext, 300);
    });

    disableBtn.addEventListener('click', () => {
        disableBtn.style.transform = 'scale(0.96)';
        setTimeout(() => disableBtn.style.transform = 'scale(1)', 150);
        setTimeout(proceedNext, 300);
    });
};