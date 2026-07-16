window.renderWifiScreen = function() {
    const navController = document.querySelector('.setup-nav-controller');
    
    const wifiPage = document.createElement('div');
    wifiPage.className = 'setup-page page-enter-right page-wifi';
    
    const iconWrapper = document.createElement('div');
    iconWrapper.className = 'wifi-icon-wrapper';
    iconWrapper.innerHTML = `
        <svg class="wifi-svg" viewBox="0 0 24 24">
            <path class="wifi-wave3" d="M12 4C7.31 4 3.07 5.9 0 8.98L2.12 11.1C4.66 8.56 8.16 7 12 7s7.34 1.56 9.88 4.1l2.12-2.12C20.93 5.9 16.69 4 12 4z"/>
            <path class="wifi-wave2" d="M12 8c-2.97 0-5.67 1.16-7.66 3.05l2.12 2.12c1.42-1.42 3.38-2.3 5.54-2.3 2.16 0 4.12.88 5.54 2.3l2.12-2.12C17.67 9.16 14.97 8 12 8z"/>
            <path class="wifi-wave1" d="M12 12c-1.84 0-3.51.72-4.75 1.89l2.12 2.12c.67-.68 1.62-1.1 2.63-1.1s1.96.42 2.63 1.1l2.12-2.12C15.51 12.72 13.84 12 12 12z"/>
            <circle class="wifi-dot" cx="12" cy="18" r="2"/>
        </svg>
    `;

    const title = document.createElement('div');
    title.className = 'locale-title';
    title.innerText = 'Choose a Wi-Fi Network';
    
    const listWrapper = document.createElement('div');
    listWrapper.className = 'locale-list-wrapper';

    let html = `
        <div class="locale-group-title" style="animation-delay: 0.1s">My Networks</div>
        <div class="locale-group" style="animation-delay: 0.15s">
            <div class="locale-item" onclick="window.selectWifi('WLAN1')">
                <span>WLAN1</span>
                <div style="display:flex; align-items:center;">
                    <svg class="wifi-lock" viewBox="0 0 24 24"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg>
                    <span class="chevron">›</span>
                </div>
            </div>
        </div>
        <div class="locale-group-title" style="animation-delay: 0.2s">Other Options</div>
        <div class="locale-group" style="animation-delay: 0.25s">
            <div class="locale-item">
                <span>Other Network...</span>
                <span class="chevron">›</span>
            </div>
            <div class="locale-item">
                <span>Proxy Settings</span>
                <span class="chevron">›</span>
            </div>
            <div class="locale-item">
                <span>Connect to Mac or PC</span>
                <span class="chevron">›</span>
            </div>
        </div>
    `;
    listWrapper.innerHTML = html;

    wifiPage.appendChild(iconWrapper);
    wifiPage.appendChild(title);
    wifiPage.appendChild(listWrapper);
    navController.appendChild(wifiPage);

    void wifiPage.offsetWidth;
    wifiPage.classList.remove('page-enter-right');
    wifiPage.classList.add('page-active');
    wifiPage.classList.add('animate-content');
};

window.selectWifi = function(networkName) {
    const wifiPage = document.querySelector('.page-wifi');
    if (wifiPage) {
        wifiPage.classList.remove('page-active');
        wifiPage.classList.add('page-exit-left');
    }
    renderWifiPasswordScreen(networkName);
};

function renderWifiPasswordScreen(networkName) {
    const navController = document.querySelector('.setup-nav-controller');
    
    const passPage = document.createElement('div');
    passPage.className = 'setup-page page-enter-right page-wifi-pass';
    
    const title = document.createElement('div');
    title.className = 'locale-title';
    title.innerText = `Enter Password for "${networkName}"`;
    
    const contentWrapper = document.createElement('div');
    contentWrapper.style.width = '100%';
    contentWrapper.style.padding = '0 20px';
    contentWrapper.style.boxSizing = 'border-box';

    const input = document.createElement('input');
    input.type = 'password';
    input.className = 'wifi-password-input';
    input.placeholder = 'Password';

    const connectBtn = document.createElement('button');
    connectBtn.className = 'wifi-connect-btn';
    connectBtn.innerText = 'Connect';

    input.addEventListener('input', (e) => {
        if (e.target.value.length >= 8) {
            connectBtn.classList.add('enabled');
        } else {
            connectBtn.classList.remove('enabled');
        }
    });

    connectBtn.addEventListener('click', () => {
        if (!connectBtn.classList.contains('enabled') || connectBtn.classList.contains('loading')) return;
        
        connectBtn.classList.add('loading');
        input.disabled = true;

        setTimeout(() => {
            if (input.value === '123456789') {
                connectBtn.classList.remove('loading');
                connectBtn.style.background = '#34c759';
                connectBtn.innerText = 'Connected';
                
                setTimeout(() => {
                    const passPage = document.querySelector('.page-wifi-pass');
                    if (passPage) {
                        passPage.classList.remove('page-active');
                        passPage.classList.add('page-exit-left');
                    }
                    if (typeof window.renderCopyingScreen === 'function') {
                        window.renderCopyingScreen();
                    }
                }, 800);
            } else {
                connectBtn.classList.remove('loading');
                connectBtn.classList.add('error');
                input.disabled = false;
                
                setTimeout(() => {
                    connectBtn.classList.remove('error');
                }, 400);
            }
        }, 1500);
    });

    contentWrapper.appendChild(input);
    contentWrapper.appendChild(connectBtn);
    passPage.appendChild(title);
    passPage.appendChild(contentWrapper);
    navController.appendChild(passPage);

    void passPage.offsetWidth;
    passPage.classList.remove('page-enter-right');
    passPage.classList.add('page-active');
    passPage.classList.add('animate-content');

    setTimeout(() => {
        input.focus();
    }, 600);
}