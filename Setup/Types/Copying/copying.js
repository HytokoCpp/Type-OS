window.renderCopyingScreen = function() {
    const navController = document.querySelector('.setup-nav-controller');
    
    const copyPage = document.createElement('div');
    copyPage.className = 'setup-page page-enter-right page-copying';
    
    const topBar = document.createElement('div');
    topBar.className = 'copying-top-bar';
    
    const backBtn = document.createElement('div');
    backBtn.className = 'nav-icon-btn';
    backBtn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>`;
    
    const accBtn = document.createElement('div');
    accBtn.className = 'nav-icon-btn';
    accBtn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="5" r="2"/><path d="M12 8v6m-4-4h8m-4 4l-3 6m3-6l3 6"/></svg>`;

    topBar.appendChild(backBtn);
    topBar.appendChild(accBtn);

    const graphicArea = document.createElement('div');
    graphicArea.className = 'copying-graphic-area';

    const backPhone = document.createElement('div');
    backPhone.className = 'mock-phone back-phone';
    
    const frontPhone = document.createElement('div');
    frontPhone.className = 'mock-phone front-phone';
    
    const grid = document.createElement('div');
    grid.className = 'mock-apps-grid';
    const colors = ['#ff3b30', '#ffcc00', '#4cd964', '#5ac8fa', '#007aff', '#5856d6', '#ff9500', '#ff2d55', '#34c759', '#ffcc00', '#af52de', '#ff3b30'];
    colors.forEach(color => {
        const app = document.createElement('div');
        app.className = 'mock-app';
        app.style.backgroundColor = color;
        grid.appendChild(app);
    });
    frontPhone.appendChild(grid);

    graphicArea.appendChild(backPhone);
    graphicArea.appendChild(frontPhone);

    const bottomSheet = document.createElement('div');
    bottomSheet.className = 'copying-bottom-sheet';

    const title = document.createElement('h2');
    title.innerText = 'Быстрая настройка Телефон';

    const desc = document.createElement('p');
    desc.innerText = 'Поднесите текущий Телефон или планшет к новому Телефон, чтобы войти в свой Аккаунт и настроить все необходимое.';

    const searchArea = document.createElement('div');
    searchArea.className = 'search-area';
    
    const spinner = document.createElement('div');
    spinner.className = 'apple-spinner';
    for (let i = 0; i < 8; i++) {
        const blade = document.createElement('div');
        blade.className = 'spinner-blade';
        spinner.appendChild(blade);
    }
    
    const searchText = document.createElement('span');
    searchText.innerText = 'Поиск устройств поблизости...';
    
    searchArea.appendChild(spinner);
    searchArea.appendChild(searchText);

    const skipBtn = document.createElement('button');
    skipBtn.className = 'btn-skip-setup';
    skipBtn.innerText = 'Настроить без другого устройства';

    bottomSheet.appendChild(title);
    bottomSheet.appendChild(desc);
    bottomSheet.appendChild(searchArea);
    bottomSheet.appendChild(skipBtn);

    copyPage.appendChild(topBar);
    copyPage.appendChild(graphicArea);
    copyPage.appendChild(bottomSheet);
    
    navController.appendChild(copyPage);

    void copyPage.offsetWidth;
    copyPage.classList.remove('page-enter-right');
    copyPage.classList.add('page-active');

    setTimeout(() => {
        graphicArea.classList.add('animate-graphic');
        bottomSheet.classList.add('animate-sheet');
    }, 100);

    backBtn.addEventListener('click', () => {
        copyPage.classList.remove('page-active');
        copyPage.classList.add('page-enter-right');
        const passPage = document.querySelector('.page-wifi-pass');
        if (passPage) {
            passPage.classList.remove('page-exit-left');
            passPage.classList.add('page-active');
        }
        setTimeout(() => copyPage.remove(), 600);
    });

    skipBtn.addEventListener('click', () => {
        skipBtn.style.transform = 'scale(0.96)';
        setTimeout(() => skipBtn.style.transform = 'scale(1)', 150);
        
        setTimeout(() => {
            copyPage.classList.remove('page-active');
            copyPage.classList.add('page-exit-left');
            if (typeof window.renderLocationScreen === 'function') {
                window.renderLocationScreen();
            }
        }, 300);
    });
};