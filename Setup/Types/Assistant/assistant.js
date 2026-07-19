window.renderAssistantIntroScreen = function() {
 const navController = document.querySelector('.setup-nav-controller');
 
 const assistPage = document.createElement('div');
 assistPage.className = 'setup-page page-enter-right page-assistant';
 
 const topBar = document.createElement('div');
 topBar.className = 'copying-top-bar';
 
 const backBtn = document.createElement('div');
 backBtn.className = 'nav-icon-btn';
 backBtn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>`;

 topBar.appendChild(backBtn);

 const contentArea = document.createElement('div');
 contentArea.className = 'assistant-content';

 const orbWrapper = document.createElement('div');
 orbWrapper.className = 'kolyan-orb-wrapper';
 
 const orb = document.createElement('div');
 orb.className = 'kolyan-orb';
 orbWrapper.appendChild(orb);

 const title = document.createElement('h2');
 title.className = 'assistant-title';
 title.innerText = 'Знакомьтесь, Колян';

 const desc = document.createElement('p');
 desc.className = 'assistant-desc';
 desc.innerText = 'Наш собственный искусственный интеллект, разработанный эксклюзивно для HyOS.';

 const featuresList = document.createElement('div');
 featuresList.className = 'assistant-features-list';
 
 featuresList.innerHTML = `
 <div class="assistant-feature-item fade-in-cascade" style="animation-delay: 0.3s">
 <div class="feature-icon">
 <svg viewBox="0 0 24 24" fill="none" stroke="#007aff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
 </div>
 <div class="feature-text">
 <h3>Что он умеет</h3>
 <p>Управляет настройками, находит любую информацию, пишет тексты и запускает приложения.</p>
 </div>
 </div>
 <div class="assistant-feature-item fade-in-cascade" style="animation-delay: 0.4s">
 <div class="feature-icon">
 <svg viewBox="0 0 24 24" fill="none" stroke="#ff2a5f" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
 </div>
 <div class="feature-text">
 <h3>Добрый и отзывчивый</h3>
 <p>Колян всегда вежлив, обладает эмпатией, понимает контекст и готов поддержать любую беседу.</p>
 </div>
 </div>
 <div class="assistant-feature-item fade-in-cascade" style="animation-delay: 0.5s">
 <div class="feature-icon">
 <svg viewBox="0 0 24 24" fill="none" stroke="#34c759" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
 </div>
 <div class="feature-text">
 <h3>Полностью безопасен</h3>
 <p>Все процессы ИИ происходят локально. Ваши данные и диалоги никогда не покидают это устройство.</p>
 </div>
 </div>
 `;

 contentArea.appendChild(orbWrapper);
 contentArea.appendChild(title);
 contentArea.appendChild(desc);
 contentArea.appendChild(featuresList);

 const bottomSheet = document.createElement('div');
 bottomSheet.className = 'privacy-bottom-sheet';

 const continueBtn = document.createElement('button');
 continueBtn.className = 'btn-privacy-primary';
 continueBtn.innerText = 'Продолжить';

 const setupLaterBtn = document.createElement('button');
 setupLaterBtn.className = 'btn-privacy-secondary';
 setupLaterBtn.innerText = 'Настроить позже';

 bottomSheet.appendChild(continueBtn);
 bottomSheet.appendChild(setupLaterBtn);

 assistPage.appendChild(topBar);
 assistPage.appendChild(contentArea);
 assistPage.appendChild(bottomSheet);
 
 navController.appendChild(assistPage);

 void assistPage.offsetWidth;
 assistPage.classList.remove('page-enter-right');
 assistPage.classList.add('page-active');

 setTimeout(() => {
  assistPage.classList.add('animate-content');
 }, 100);

 backBtn.addEventListener('click', () => {
  assistPage.classList.remove('page-active');
  assistPage.classList.add('page-enter-right');
  const passPage = document.querySelector('.page-passcode');
  if (passPage) {
   passPage.classList.remove('page-exit-left');
   passPage.classList.add('page-active');
  }
  setTimeout(() => assistPage.remove(), 600);
 });

 const proceedNext = () => {
  assistPage.classList.remove('page-active');
  assistPage.classList.add('page-exit-left');
  renderAssistantSettingsScreen();
 };

 setupLaterBtn.addEventListener('click', () => {
  setupLaterBtn.style.transform = 'scale(0.96)';
  setTimeout(() => setupLaterBtn.style.transform = 'scale(1)', 150);
  setTimeout(proceedNext, 300);
 });

 continueBtn.addEventListener('click', () => {
  continueBtn.style.transform = 'scale(0.96)';
  setTimeout(() => continueBtn.style.transform = 'scale(1)', 150);
  setTimeout(() => renderAssistantVoiceScreen(assistPage), 300);
 });
};

function renderAssistantVoiceScreen(prevPage) {
 const navController = document.querySelector('.setup-nav-controller');
 const island = document.querySelector('.dynamic-island');
 
 const voicePage = document.createElement('div');
 voicePage.className = 'setup-page page-enter-right page-assistant-voice';
 
 const contentArea = document.createElement('div');
 contentArea.className = 'assistant-content voice-training-content';

 const siriWave = document.createElement('div');
 siriWave.className = 'kolyan-wave-container';
 siriWave.innerHTML = `
 <div class="kolyan-wave w1"></div>
 <div class="kolyan-wave w2"></div>
 <div class="kolyan-wave w3"></div>
 <div class="kolyan-wave w4"></div>
 <div class="kolyan-wave w5"></div>
 `;

 const instructions = document.createElement('h2');
 instructions.className = 'assistant-title';

 const transcriptText = document.createElement('p');
 transcriptText.className = 'assistant-desc transcript-text';
 transcriptText.style.color = '#007aff';
 transcriptText.style.fontWeight = '500';
 transcriptText.innerText = 'Жду команду...';

 const bottomSheet = document.createElement('div');
 bottomSheet.className = 'privacy-bottom-sheet';
 bottomSheet.style.background = 'transparent';
 bottomSheet.style.boxShadow = 'none';

 const skipBtn = document.createElement('button');
 skipBtn.className = 'btn-privacy-secondary';
 skipBtn.innerText = 'Пропустить';

 bottomSheet.appendChild(skipBtn);

 contentArea.appendChild(siriWave);
 contentArea.appendChild(instructions);
 contentArea.appendChild(transcriptText);
 
 voicePage.appendChild(contentArea);
 voicePage.appendChild(bottomSheet);
 navController.appendChild(voicePage);

 prevPage.classList.remove('page-active');
 prevPage.classList.add('page-exit-left');

 void voicePage.offsetWidth;
 voicePage.classList.remove('page-enter-right');
 voicePage.classList.add('page-active');

 const phrases = [
  { text: 'Скажите: «Привет, Колян»', check: (t) => t.includes('привет') || t.includes('коля') || t.includes('кальян') },
  { text: 'Скажите: «Колян, какая погода?»', check: (t) => t.includes('погод') || t.includes('какая') },
  { text: 'Скажите: «Колян, включи таймер»', check: (t) => t.includes('тайм') || t.includes('включи') }
 ];
 let currentStep = 0;
 let isListeningActive = true;

 instructions.innerText = phrases[currentStep].text;

 setTimeout(() => {
  voicePage.classList.add('animate-content');
  siriWave.classList.add('listening');
  if (island) island.classList.add('mic-active');
 }, 500);

 const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
 let recognition = null;

 const completeSetup = () => {
  isListeningActive = false;
  if (island) island.classList.remove('mic-active');
  if (recognition) recognition.stop();
  siriWave.classList.remove('listening');
  instructions.style.opacity = '0';
  transcriptText.style.opacity = '0';
   
  setTimeout(() => {
   instructions.classList.remove('success-text');
   instructions.innerText = 'Обучение завершено!';
   instructions.style.opacity = '1';
    
   setTimeout(() => {
    voicePage.classList.remove('page-active');
    voicePage.classList.add('page-exit-left');
    renderAssistantVoiceSelectScreen();
    setTimeout(() => voicePage.remove(), 600);
   }, 1500);
    
  }, 400);
 };

 if (SpeechRecognition) {
  recognition = new SpeechRecognition();
  recognition.lang = 'ru-RU';
  recognition.interimResults = true;
  recognition.continuous = true;

  recognition.onresult = (event) => {
   let transcript = '';
   for (let i = event.resultIndex; i < event.results.length; ++i) {
    transcript += event.results[i][0].transcript;
   }
    
   const lowerText = transcript.toLowerCase();
   transcriptText.innerText = `«${transcript}»`;
    
   if (phrases[currentStep] && phrases[currentStep].check(lowerText)) {
    instructions.classList.add('success-text');
    transcriptText.style.color = '#34c759';
    recognition.stop();
     
    setTimeout(() => {
     currentStep++;
     if (currentStep < phrases.length) {
      instructions.style.opacity = '0';
      transcriptText.style.opacity = '0';
       
      setTimeout(() => {
       instructions.classList.remove('success-text');
       instructions.innerText = phrases[currentStep].text;
       transcriptText.innerText = 'Жду команду...';
       transcriptText.style.color = '#007aff';
        
       instructions.style.opacity = '1';
       transcriptText.style.opacity = '1';
        
       if (isListeningActive) {
        try { recognition.start(); } catch(e) {}
       }
      }, 400);
     } else {
      completeSetup();
     }
    }, 1200);
   }
  };

  recognition.onerror = (event) => {
   if (event.error === 'not-allowed') {
    transcriptText.innerText = 'Нет доступа к микрофону';
    transcriptText.style.color = '#ff3b30';
   }
  };

  recognition.onend = () => {
   if (isListeningActive && currentStep < phrases.length && !instructions.classList.contains('success-text')) {
    try { recognition.start(); } catch(e) {}
   }
  };

  try { recognition.start(); } catch (e) {}
 } else {
  transcriptText.innerText = 'Микрофон не поддерживается';
  transcriptText.style.color = '#ff3b30';
  setTimeout(() => {
   instructions.classList.add('success-text');
   setTimeout(() => completeSetup(), 1500);
  }, 2000);
 }

 skipBtn.addEventListener('click', () => {
  skipBtn.style.transform = 'scale(0.96)';
  setTimeout(() => skipBtn.style.transform = 'scale(1)', 150);
  isListeningActive = false;
  if (island) island.classList.remove('mic-active');
  if (recognition) recognition.stop();
  setTimeout(() => {
   voicePage.classList.remove('page-active');
   voicePage.classList.add('page-exit-left');
   renderAssistantVoiceSelectScreen();
   setTimeout(() => voicePage.remove(), 600);
  }, 300);
 });
}

function renderAssistantVoiceSelectScreen() {
 const navController = document.querySelector('.setup-nav-controller');
 
 const voiceSelPage = document.createElement('div');
 voiceSelPage.className = 'setup-page page-enter-right page-assistant-voice-sel';
 
 const topBar = document.createElement('div');
 topBar.className = 'copying-top-bar';
 const backBtn = document.createElement('div');
 backBtn.className = 'nav-icon-btn';
 backBtn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>`;
 topBar.appendChild(backBtn);

 const title = document.createElement('h2');
 title.className = 'passcode-title';
 title.innerText = 'Голос Коляна';

 const desc = document.createElement('p');
 desc.className = 'passcode-desc';
 desc.innerText = 'Выберите голос для вашего ассистента.';

 const listWrapper = document.createElement('div');
 listWrapper.className = 'locale-list-wrapper';

 const groupWrapper = document.createElement('div');
 groupWrapper.className = 'locale-group';
 groupWrapper.style.animationDelay = '0.1s';
 listWrapper.appendChild(groupWrapper);

 const bottomSheet = document.createElement('div');
 bottomSheet.className = 'privacy-bottom-sheet';
 const finishBtn = document.createElement('button');
 finishBtn.className = 'btn-privacy-primary';
 finishBtn.innerText = 'Продолжить';
 bottomSheet.appendChild(finishBtn);

 voiceSelPage.appendChild(topBar);
 voiceSelPage.appendChild(title);
 voiceSelPage.appendChild(desc);
 voiceSelPage.appendChild(listWrapper);
 voiceSelPage.appendChild(bottomSheet);
 
 navController.appendChild(voiceSelPage);

 void voiceSelPage.offsetWidth;
 voiceSelPage.classList.remove('page-enter-right');
 voiceSelPage.classList.add('page-active');
 
 setTimeout(() => { voiceSelPage.classList.add('animate-content'); }, 100);

 const populateVoices = () => {
  let voices = window.speechSynthesis.getVoices();
  let ruVoices = voices.filter(v => v.lang.includes('ru') || v.lang.includes('RU'));
  
  groupWrapper.innerHTML = '';

  if (ruVoices.length === 0) {
   const item = document.createElement('div');
   item.className = 'locale-item';
   item.innerHTML = `<span>Системный голос (По умолчанию)</span><svg viewBox="0 0 24 24" fill="none" stroke="#007aff" stroke-width="2" width="20" height="20"><path d="M20 6L9 17l-5-5"/></svg>`;
   groupWrapper.appendChild(item);
  } else {
   ruVoices.forEach((v, index) => {
    const item = document.createElement('div');
    item.className = 'locale-item voice-option';
     
    const isChecked = index === 0;
    item.innerHTML = `
     <span>Голос ${index + 1} (${v.name.split(' ')[0]})</span>
     <svg class="check-icon" style="opacity: ${isChecked ? 1 : 0}" viewBox="0 0 24 24" fill="none" stroke="#007aff" stroke-width="2" width="20" height="20"><path d="M20 6L9 17l-5-5"/></svg>
    `;

    item.addEventListener('click', () => {
     document.querySelectorAll('.voice-option .check-icon').forEach(icon => icon.style.opacity = '0');
     item.querySelector('.check-icon').style.opacity = '1';
      
     window.speechSynthesis.cancel();
     const utterance = new SpeechSynthesisUtterance("Привет! Я Колян, ваш виртуальный ассистент.");
     utterance.voice = v;
     window.speechSynthesis.speak(utterance);
    });

    groupWrapper.appendChild(item);
   });
  }
 };

 if (window.speechSynthesis.getVoices().length > 0) {
  populateVoices();
 } else {
  window.speechSynthesis.onvoiceschanged = populateVoices;
 }

 backBtn.addEventListener('click', () => {
  window.speechSynthesis.cancel();
  voiceSelPage.classList.remove('page-active');
  voiceSelPage.classList.add('page-enter-right');
  setTimeout(() => voiceSelPage.remove(), 600);
 });

 finishBtn.addEventListener('click', () => {
  window.speechSynthesis.cancel();
  finishBtn.style.transform = 'scale(0.96)';
  setTimeout(() => finishBtn.style.transform = 'scale(1)', 150);
  setTimeout(() => {
   voiceSelPage.classList.remove('page-active');
   voiceSelPage.classList.add('page-exit-left');
   renderAssistantSettingsScreen();
  }, 300);
 });
}

function renderAssistantSettingsScreen() {
 const navController = document.querySelector('.setup-nav-controller');
 
 const setPage = document.createElement('div');
 setPage.className = 'setup-page page-enter-right page-assistant-settings';
 
 const topBar = document.createElement('div');
 topBar.className = 'copying-top-bar';
 
 const backBtn = document.createElement('div');
 backBtn.className = 'nav-icon-btn';
 backBtn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>`;
 topBar.appendChild(backBtn);

 const title = document.createElement('h2');
 title.className = 'passcode-title';
 title.innerText = 'Настройки Коляна';

 const desc = document.createElement('p');
 desc.className = 'passcode-desc';
 desc.innerText = 'Вы можете изменить эти параметры позже в Настройках.';

 const listWrapper = document.createElement('div');
 listWrapper.className = 'locale-list-wrapper';

 const html = `
  <div class="locale-group">
  <div class="locale-item toggle-item">
  <span>Слушать «Привет, Колян»</span>
  <label class="ios-switch">
  <input type="checkbox" checked>
  <span class="ios-slider"></span>
  </label>
  </div>
  <div class="locale-item toggle-item">
  <span>Вызов боковой кнопкой</span>
  <label class="ios-switch">
  <input type="checkbox" checked>
  <span class="ios-slider"></span>
  </label>
  </div>
  </div>
  <div class="locale-group">
  <div class="locale-item toggle-item">
  <div style="display:flex; flex-direction:column; align-items:flex-start; gap:4px;">
  <span>Отправка данных</span>
  <span style="font-size:12px; color:#86868b;">Помочь улучшить ИИ</span>
  </div>
  <label class="ios-switch">
  <input type="checkbox">
  <span class="ios-slider"></span>
  </label>
  </div>
  </div>
 `;
 listWrapper.innerHTML = html;

 const bottomSheet = document.createElement('div');
 bottomSheet.className = 'privacy-bottom-sheet';

 const finishBtn = document.createElement('button');
 finishBtn.className = 'btn-privacy-primary';
 finishBtn.innerText = 'Продолжить';

 bottomSheet.appendChild(finishBtn);

 setPage.appendChild(topBar);
 setPage.appendChild(title);
 setPage.appendChild(desc);
 setPage.appendChild(listWrapper);
 setPage.appendChild(bottomSheet);
 
 navController.appendChild(setPage);

 void setPage.offsetWidth;
 setPage.classList.remove('page-enter-right');
 setPage.classList.add('page-active');

 setTimeout(() => {
  setPage.classList.add('animate-content');
 }, 100);

 backBtn.addEventListener('click', () => {
  setPage.classList.remove('page-active');
  setPage.classList.add('page-enter-right');
  const introPage = document.querySelector('.page-assistant-voice-sel');
  if (introPage) {
   introPage.classList.remove('page-exit-left');
   introPage.classList.add('page-active');
  }
  setTimeout(() => setPage.remove(), 600);
 });

 finishBtn.addEventListener('click', () => {
  finishBtn.style.transform = 'scale(0.96)';
  setTimeout(() => finishBtn.style.transform = 'scale(1)', 150);
  setTimeout(() => {
   setPage.classList.remove('page-active');
   setPage.classList.add('page-exit-left');
   renderAssistantDownloadScreen();
  }, 300);
 });
}

function renderAssistantDownloadScreen() {
 const navController = document.querySelector('.setup-nav-controller');
 
 const dlPage = document.createElement('div');
 dlPage.className = 'setup-page page-enter-right page-assistant-dl';

 const contentArea = document.createElement('div');
 contentArea.className = 'assistant-content dl-content';

 const orbWrapper = document.createElement('div');
 orbWrapper.className = 'kolyan-dl-orb-wrapper';
 
 const orb = document.createElement('div');
 orb.className = 'kolyan-orb dl-orb';
 orbWrapper.appendChild(orb);

 const title = document.createElement('h2');
 title.className = 'assistant-title dl-title';
 title.innerText = 'Загрузка нейросети Колян';

 const tooltipText = document.createElement('p');
 tooltipText.className = 'assistant-desc dl-tooltip';
 tooltipText.innerText = 'Инициализация WebGPU...';

 const timeRemaining = document.createElement('p');
 timeRemaining.className = 'dl-time';
 timeRemaining.innerText = 'Подготовка среды';

 contentArea.appendChild(orbWrapper);
 contentArea.appendChild(title);
 contentArea.appendChild(tooltipText);
 contentArea.appendChild(timeRemaining);

 dlPage.appendChild(contentArea);
 navController.appendChild(dlPage);

 void dlPage.offsetWidth;
 dlPage.classList.remove('page-enter-right');
 dlPage.classList.add('page-active');

 setTimeout(() => {
  dlPage.classList.add('animate-content');
  startRealAIDownload(tooltipText, timeRemaining, dlPage);
 }, 500);
}

async function startRealAIDownload(tooltipElement, timeElement, pageElement) {
 try {
  console.log("%c[Колян ИИ] Запуск инициализации локальной нейросети...", "color: #00e5ff; font-weight: bold;");
  tooltipElement.innerText = 'Загрузка системных модулей...';
  
  const webllm = await import("https://esm.run/@mlc-ai/web-llm");
  console.log("%c[Колян ИИ] Загрузчик нейросети успешно подключен к ядру.", "color: #34c759;");
  
  const modelIdentifier = "Qwen2.5-1.5B-Instruct-q4f16_1-MLC";
  
  const initProgressCallback = (report) => {
   console.log("%c[Колян ИИ] Отчёт загрузки весов:%c " + report.text, "color: #ff9500; font-weight: bold;", "color: default;");
   
   let cleanReportText = report.text;
   if (cleanReportText.includes(']')) {
    cleanReportText = cleanReportText.split(']')[1];
   }
   cleanReportText = cleanReportText.trim();
   
   tooltipElement.innerText = cleanReportText;
   
   if (report.progress !== undefined && report.progress !== null) {
    const percent = Math.round(report.progress * 100);
    timeElement.innerText = `Загружено компонентов: ${percent}% (около 1 ГБ)`;
    console.log(`%c[Колян ИИ] Общий прогресс установки: ${percent}%`, "color: #00e5ff;");
   }
  };

  tooltipElement.innerText = 'Проверка совместимости WebGPU...';
  console.log("%c[Колян ИИ] Запуск диагностического теста аппаратного ускорения...", "color: #ff2a5f;");
  
  if (!navigator.gpu) {
   throw new Error("Аппаратное ускорение WebGPU не поддерживается браузером или отключено.");
  }
  
  const adapter = await navigator.gpu.requestAdapter();
  if (!adapter) {
   throw new Error("Видеоядро не выделило аппаратный адаптер для WebGPU.");
  }
  console.log("%c[Колян ИИ] Графическое ядро для ИИ обнаружено успешно:", "color: #34c759;", adapter);
  
  window.aiEngine = await webllm.CreateMLCEngine(
   modelIdentifier,
   { initProgressCallback: initProgressCallback }
  );
  
  console.log("%c[Колян ИИ] Нейросеть Колян успешно загружена в ОЗУ устройства и готова к вычислениям!", "color: #34c759; font-weight: bold;");
  
  tooltipElement.innerText = 'Установка завершена!';
  tooltipElement.classList.add('success-text');
  timeElement.innerText = 'Колян готов к работе!';
  
  setTimeout(() => {
   pageElement.classList.remove('page-active');
   pageElement.classList.add('page-exit-left');
   if (typeof window.renderWelcomeScreen === 'function') {
    window.renderWelcomeScreen();
   } else if (typeof window.completeSetup === 'function') {
    window.completeSetup();
   }
  }, 2000);
  
 } catch (error) {
  console.error("%c[Колян ИИ] Критическая ошибка при развёртывании нейросети!%c", "color: #ff3b30; font-weight: bold;", "color: default;", error);
  tooltipElement.innerText = 'Ошибка установки';
  tooltipElement.style.color = '#ff3b30';
  timeElement.innerText = error.message || 'Убедитесь, что устройство поддерживает WebGPU.';
 }
}