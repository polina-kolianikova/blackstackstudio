(function (root) {
    'use strict';
    const KEY = 'blackstack.privacy';
    const VERSION = 1;
    const MAX_AGE = 180 * 24 * 60 * 60 * 1000;
    const categories = ['preferences', 'attribution', 'externalMedia'];
    function parse(value, now = Date.now()) {
        try {
            const record = JSON.parse(value);
            if (record?.version !== VERSION || !Number.isFinite(record.at) || !Number.isFinite(record.expires)
                || record.at > now || record.expires <= now || record.expires <= record.at
                || record.expires > record.at + MAX_AGE) return null;
            if (!categories.every(key => typeof record[key] === 'boolean')) return null;
            return record;
        } catch (_) { return null; }
    }
    if (typeof module !== 'undefined') module.exports = {KEY, VERSION, MAX_AGE, parse};
    if (!root.document) return;
    let consent;
    try { consent = parse(root.localStorage.getItem(KEY)); } catch (_) { consent = null; }
    if (!consent) { try { root.localStorage.removeItem(KEY); } catch (_) {} }
    const allows = category => Boolean(consent && consent.expires > Date.now() && consent[category] === true);
    function clearOptional() {
        if (!allows('preferences')) {
            for (const key of ['blackstack.language', 'bs.lang', 'blackstack-admin-language']) {
                try { root.localStorage.removeItem(key); } catch (_) {}
            }
        }
        if (!allows('attribution')) {
            try { root.sessionStorage.removeItem('bs_instagram_attribution_v1'); } catch (_) {}
        }
    }
    clearOptional();
    function setConsent(values) {
        const now = Date.now();
        consent = {version: VERSION, at: now, expires: now + MAX_AGE};
        for (const key of categories) consent[key] = values[key] === true;
        try { root.localStorage.setItem(KEY, JSON.stringify(consent)); } catch (_) {}
        clearOptional();
        if (allows('preferences') && ['ru', 'en', 'uk', 'ka'].includes(root.document.documentElement.lang)) {
            try { root.localStorage.setItem('blackstack.language', root.document.documentElement.lang); } catch (_) {}
        }
        renderState();
        root.dispatchEvent(new root.CustomEvent('blackstackprivacychange', {detail: {...consent}}));
    }
    const copy = {
        ru: {title:'Ваши настройки приватности',intro:'Необязательные функции выключены. Выберите, что разрешить. Сайт и связь с командой доступны при любом выборе.',settings:'Настроить',reject:'Только необходимые',accept:'Разрешить необязательные',save:'Сохранить выбор',close:'Закрыть настройки',policy:'Политика cookies',privacy:'Конфиденциальность',essential:'Необходимые',essentialText:'Сохраняем ваш выбор приватности на 180 дней. Этот пункт всегда включён.',preferences:'Запоминать язык',preferencesText:'Сохранять выбранный язык между посещениями, до 180 дней.',attribution:'Учитывать источник обращения',attributionText:'Запоминать переход из Instagram в этой вкладке до 24 часов и передавать метку в заявку. Без рекламных пикселей и идентификатора посетителя.',externalMedia:'Видео YouTube',externalMediaText:'Загружать плеер YouTube после нажатия на видео. Google получает данные соединения и может использовать собственные технологии хранения.',necessary:'Всегда включено',withdraw:'Вы можете изменить или отозвать разрешения здесь в любое время.',youtube:'Чтобы открыть плеер YouTube, разрешите соединение с Google. Google получит IP-адрес и данные браузера. Можно также открыть видео напрямую на YouTube.',allowYoutube:'Разрешить YouTube и открыть видео'},
        en: {title:'Your privacy choices',intro:'Optional features are off. Choose what to allow. You can use the website and contact the team with any choice.',settings:'Settings',reject:'Necessary only',accept:'Allow optional features',save:'Save choices',close:'Close settings',policy:'Cookie policy',privacy:'Privacy',essential:'Necessary',essentialText:'We remember your privacy choice for 180 days. This is always enabled.',preferences:'Remember language',preferencesText:'Keep your chosen language between visits for up to 180 days.',attribution:'Enquiry source',attributionText:'Remember an Instagram visit in this tab for up to 24 hours and include that source in your enquiry. No advertising pixels or visitor identifier.',externalMedia:'YouTube videos',externalMediaText:'Load the YouTube player when you open a video. Google receives connection data and may use its own storage technologies.',necessary:'Always enabled',withdraw:'You can change or withdraw permissions here at any time.',youtube:'To load the YouTube player, allow a connection to Google. Google will receive your IP address and browser information. You can also open the video directly on YouTube.',allowYoutube:'Allow YouTube and play'},
        uk: {title:'Ваші налаштування приватності',intro:'Необов’язкові функції вимкнені. Оберіть, що дозволити. Сайт і зв’язок із командою доступні за будь-якого вибору.',settings:'Налаштувати',reject:'Лише необхідні',accept:'Дозволити необов’язкові',save:'Зберегти вибір',close:'Закрити налаштування',policy:'Політика cookies',privacy:'Конфіденційність',essential:'Необхідні',essentialText:'Зберігаємо ваш вибір приватності на 180 днів. Цей пункт завжди ввімкнений.',preferences:'Запам’ятовувати мову',preferencesText:'Зберігати обрану мову між відвідуваннями до 180 днів.',attribution:'Джерело звернення',attributionText:'Запам’ятовувати перехід з Instagram у цій вкладці до 24 годин і передавати позначку в заявку. Без рекламних пікселів та ідентифікатора відвідувача.',externalMedia:'Відео YouTube',externalMediaText:'Завантажувати плеєр YouTube після натискання на відео. Google отримує дані з’єднання і може використовувати власні технології зберігання.',necessary:'Завжди ввімкнено',withdraw:'Ви можете змінити або відкликати дозволи тут у будь-який час.',youtube:'Щоб відкрити плеєр YouTube, дозвольте з’єднання з Google. Google отримає IP-адресу та дані браузера. Також можна відкрити відео безпосередньо на YouTube.',allowYoutube:'Дозволити YouTube і відкрити відео'},
        ka: {title:'კონფიდენციალურობის პარამეტრები',intro:'არასავალდებულო ფუნქციები გამორთულია. აირჩიეთ, რის ნებას რთავთ. ვებსაიტი და გუნდთან კავშირი ნებისმიერი არჩევანისას ხელმისაწვდომია.',settings:'პარამეტრები',reject:'მხოლოდ აუცილებელი',accept:'არასავალდებულო ფუნქციების დაშვება',save:'არჩევანის შენახვა',close:'პარამეტრების დახურვა',policy:'Cookies პოლიტიკა',privacy:'კონფიდენციალურობა',essential:'აუცილებელი',essentialText:'კონფიდენციალურობის არჩევანს 180 დღით ვინახავთ. ეს ფუნქცია ყოველთვის ჩართულია.',preferences:'ენის დამახსოვრება',preferencesText:'არჩეული ენის შენახვა ვიზიტებს შორის, მაქსიმუმ 180 დღით.',attribution:'მომართვის წყარო',attributionText:'Instagram-დან გადასვლის დამახსოვრება ამ ჩანართში მაქსიმუმ 24 საათით და წყაროს განაცხადში მითითება. სარეკლამო პიქსელებისა და ვიზიტორის იდენტიფიკატორის გარეშე.',externalMedia:'YouTube ვიდეოები',externalMediaText:'YouTube პლეერის ჩატვირთვა ვიდეოზე დაჭერის შემდეგ. Google იღებს კავშირის მონაცემებს და შესაძლოა გამოიყენოს შენახვის საკუთარი ტექნოლოგიები.',necessary:'ყოველთვის ჩართულია',withdraw:'ნებართვების შეცვლა ან გაუქმება აქ ნებისმიერ დროს შეგიძლიათ.',youtube:'YouTube პლეერის გასახსნელად დაუშვით Google-თან კავშირი. Google მიიღებს IP მისამართსა და ბრაუზერის მონაცემებს. ასევე შეგიძლიათ ვიდეო პირდაპირ YouTube-ზე გახსნათ.',allowYoutube:'YouTube-ის დაშვება და ვიდეოს გახსნა'}
    };
    const language = () => copy[root.document.documentElement.lang] ? root.document.documentElement.lang : 'en';
    const text = key => copy[language()][key];
    const policyPath = name => (language() === 'ru' ? '' : '/' + language()) + '/' + name + '.html';
    let banner, dialog, previousFocus;
    const make = (tag, className, value) => {
        const element = root.document.createElement(tag);
        if (className) element.className = className;
        if (value) element.textContent = value;
        return element;
    };
    function button(label, action) {
        const element = make('button', 'privacy-button', label);
        element.type = 'button'; element.addEventListener('click', action);
        return element;
    }
    function selectAll(value) { setConsent(Object.fromEntries(categories.map(key => [key, value]))); dialog?.close(); }
    function policyLinks() {
        const links = make('p', 'privacy-links');
        for (const [name, label] of [['cookies','policy'],['privacy','privacy']]) {
            const link = make('a', '', text(label)); link.href = policyPath(name); links.append(link);
        }
        return links;
    }
    function buildUI() {
        if (banner) return;
        banner = make('section', 'privacy-banner'); banner.id = 'privacyNotice';
        banner.setAttribute('role', 'region'); banner.setAttribute('aria-labelledby', 'privacyNoticeTitle');
        const title = make('h2', '', text('title')); title.id = 'privacyNoticeTitle';
        const actions = make('div', 'privacy-actions');
        actions.append(button(text('reject'), () => selectAll(false)), button(text('accept'), () => selectAll(true)), button(text('settings'), openSettings));
        banner.append(title, make('p','',text('intro')), actions, policyLinks());
        dialog = make('dialog', 'privacy-dialog'); dialog.id = 'privacySettings';
        dialog.setAttribute('aria-labelledby', 'privacySettingsTitle');
        const heading = make('h2','',text('title')); heading.id = 'privacySettingsTitle';
        dialog.append(heading, make('p','',text('withdraw')));
        const required = make('section','privacy-category'); required.append(make('h3','',text('essential')), make('p','',text('essentialText')),make('strong','',text('necessary'))); dialog.append(required);
        for (const key of categories) {
            const row = make('label','privacy-category');
            const input = make('input'); input.type = 'checkbox'; input.name = key;
            const label = make('span'); label.append(make('strong','',text(key)),make('span','privacy-description',text(key+'Text')));
            row.append(input,label); dialog.append(row);
        }
        const controls = make('div','privacy-actions');
        controls.append(button(text('reject'),()=>selectAll(false)),button(text('save'),()=>{
            setConsent(Object.fromEntries(categories.map(key=>[key,dialog.querySelector(`input[name="${key}"]`).checked]))); dialog.close();
        }),button(text('accept'),()=>selectAll(true)),button(text('close'),()=>dialog.close()));
        dialog.append(controls,policyLinks());
        dialog.addEventListener('close',()=>previousFocus?.focus({preventScroll:true}));
        root.document.body.append(banner,dialog); renderState();
    }
    function renderState() {
        if (banner) banner.hidden = Boolean(consent && consent.expires > Date.now());
        if (dialog) for (const key of categories) dialog.querySelector(`input[name="${key}"]`).checked = allows(key);
    }
    function openSettings() {
        buildUI(); renderState(); previousFocus = root.document.activeElement;
        if (!dialog.open) dialog.showModal();
    }
    root.BlackStackPrivacy = {
        allows, openSettings, setConsent,
        getConsent: () => consent ? {...consent} : null,
        text,
        grant(category) {
            if (!categories.includes(category)) return;
            setConsent(Object.fromEntries(categories.map(key=>[key,key===category||allows(key)])));
        }
    };
    root.document.addEventListener('DOMContentLoaded', () => {
        buildUI();
        root.document.querySelectorAll('[data-privacy-settings]').forEach(element=>element.addEventListener('click',openSettings));
    });
})(typeof window !== 'undefined' ? window : globalThis);
