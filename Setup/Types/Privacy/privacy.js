window.renderPrivacyScreen = function() {
    const navController = document.querySelector('.setup-nav-controller');
    
    const privPage = document.createElement('div');
    privPage.className = 'setup-page page-enter-right page-privacy';
    
    const topBar = document.createElement('div');
    topBar.className = 'copying-top-bar';
    
    const backBtn = document.createElement('div');
    backBtn.className = 'nav-icon-btn';
    backBtn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>`;

    topBar.appendChild(backBtn);

    const contentArea = document.createElement('div');
    contentArea.className = 'privacy-content';

    const iconWrapper = document.createElement('div');
    iconWrapper.className = 'privacy-icon-wrapper';
    iconWrapper.innerHTML = `
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="26" cy="22" r="7" fill="#007aff"/>
            <path d="M13 46v-5c0-4.42 3.58-8 8-8h10c4.42 0 8 3.58 8 8v5H13z" fill="#007aff"/>
            <circle cx="44" cy="22" r="7" fill="#82b1ff"/>
            <path d="M35 34.5c2.2-2.9 5.6-4.5 9-4.5h2c4.42 0 8 3.58 8 8v5H35v-4z" fill="#82b1ff"/>
        </svg>
    `;

    const textArea = document.createElement('div');
    textArea.className = 'privacy-text-mask';

    const title = document.createElement('h2');
    title.className = 'privacy-title';
    title.innerText = 'Данные и конфиденциальность';

    const p1 = document.createElement('p');
    p1.className = 'privacy-desc';
    p1.innerText = 'Этот значок появляется, когда функция устройства запрашивает использование Вашей личной информации.';

    const p2 = document.createElement('p');
    p2.className = 'privacy-desc';
    p2.innerText = 'Система собирает эту информацию только тогда, когда это необходимо для работы определенных функций, обеспечения безопасности сервисов или персонализации Вашего опыта.';

    const p3 = document.createElement('p');
    p3.className = 'privacy-desc';
    p3.innerText = 'Мы считаем, что конфиденциальность — это фундаментальное право человека, поэтому каждый продукт разработан так, чтобы минимизировать сбор и использование Ваших данных, обрабатывая их прямо на устройстве, когда это возможно.';

    textArea.appendChild(title);
    textArea.appendChild(p1);
    textArea.appendChild(p2);
    textArea.appendChild(p3);

    contentArea.appendChild(iconWrapper);
    contentArea.appendChild(textArea);

    const bottomSheet = document.createElement('div');
    bottomSheet.className = 'privacy-bottom-sheet';

    const continueBtn = document.createElement('button');
    continueBtn.className = 'btn-privacy-primary';
    continueBtn.innerText = 'Продолжить';

    const learnMoreBtn = document.createElement('button');
    learnMoreBtn.className = 'btn-privacy-secondary';
    learnMoreBtn.innerText = 'Узнать больше';

    bottomSheet.appendChild(continueBtn);
    bottomSheet.appendChild(learnMoreBtn);

    privPage.appendChild(topBar);
    privPage.appendChild(contentArea);
    privPage.appendChild(bottomSheet);
    
    navController.appendChild(privPage);

    void privPage.offsetWidth;
    privPage.classList.remove('page-enter-right');
    privPage.classList.add('page-active');

    setTimeout(() => {
        privPage.classList.add('animate-content');
    }, 100);

    backBtn.addEventListener('click', () => {
        privPage.classList.remove('page-active');
        privPage.classList.add('page-enter-right');
        const locPage = document.querySelector('.page-location');
        if (locPage) {
            locPage.classList.remove('page-exit-left');
            locPage.classList.add('page-active');
        }
        setTimeout(() => privPage.remove(), 600);
    });

    continueBtn.addEventListener('click', () => {
        continueBtn.style.transform = 'scale(0.96)';
        setTimeout(() => continueBtn.style.transform = 'scale(1)', 150);
        setTimeout(() => {
            privPage.classList.remove('page-active');
            privPage.classList.add('page-exit-left');
            if (typeof window.renderFaceIDScreen === 'function') {
                window.renderFaceIDScreen();
            }
        }, 300);
    });
};