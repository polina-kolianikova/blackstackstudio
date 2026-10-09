(function () {
    const $ = (id) => document.getElementById(id);
    const filters = $('videoFilters'), rail = $('videoRail'), stage = $('videoScroller');
    const empty = $('videoEmpty'), controls = $('videoControls');
    const dialog = $('videoPlayer'), hdPlayer = $('videoPlayerMedia');
    const dialogFrame = dialog.querySelector('.vplayer__frame');
    const previewVideos = new Map();
    if (!filters || !stage || !dialog) return;
    Object.assign(I18N.ru, {
        'video.cat.youtube-format': 'Горизонтальные',
        'video.motionTitle': 'Монтаж', 'video.motionAccent': 'под вашу задачу',
        'video.motionLead': 'Короткие ролики, выпуски, 2D- и 3D-анимация. Закажите одно видео или передайте регулярный монтаж команде.',
        'video.toDesign': 'Дизайн студии', 'video.selected': 'РАБОТЫ УЧАСТНИКОВ КОМАНДЫ',
        'video.swipeHint': 'Листайте. Выбирайте. Смотрите.', 'video.ctaTitle': 'Пришлите исходники или пример ролика',
        'video.teamNote': 'Сделаем один ролик или возьмём монтаж на постоянку.', 'video.discuss': 'Обсудить ролик',
        'video.emptyNote': 'Работы этого формата добавим позже. Пришлите пример и расскажите, какое видео вам нужно.',
        'video.cat.3d-animation': '3D-анимация', 'video.retry': 'Попробовать ещё раз', 'video.loading': 'Загружаем ролик…', 'video.pausePreviews': 'Пауза превью', 'video.resumePreviews': 'Запустить превью', 'video.pausePreview': 'Пауза', 'video.choose': 'Выбрать ролик', 'video.mediaError': 'Не удалось загрузить ролик. Попробуйте открыть его ещё раз.'
    });
    Object.assign(I18N.en, {
        'video.cat.youtube-format': 'Landscape',
        'video.motionTitle': 'Editing', 'video.motionAccent': 'for your project',
        'video.motionLead': 'Short videos, long-form episodes, 2D and 3D animation. Start with one video or hand over your regular editing.',
        'video.toDesign': 'Explore design', 'video.selected': 'WORK BY OUR TEAM MEMBERS',
        'video.swipeHint': 'Browse. Choose. Play.', 'video.ctaTitle': 'Send your footage or a reference video',
        'video.teamNote': 'Get one video edited or work with us on regular releases.', 'video.discuss': 'Discuss your video',
        'video.emptyNote': 'Examples of this format are coming. Send a reference and tell us what you need.',
        'video.cat.3d-animation': '3D animation', 'video.retry': 'Try again', 'video.loading': 'Loading video…', 'video.pausePreviews': 'Pause previews', 'video.resumePreviews': 'Play previews', 'video.pausePreview': 'Pause', 'video.choose': 'Select video', 'video.mediaError': 'This video could not load. Please try opening it again.'
    });
    Object.assign(I18N.uk, {
        'video.cat.youtube-format': 'Горизонтальні',
        'video.motionTitle': 'Монтаж', 'video.motionAccent': 'під ваше завдання',
        'video.motionLead': 'Короткі ролики, випуски, 2D- та 3D-анімація. Замовте одне відео або передайте регулярний монтаж команді.',
        'video.toDesign': 'Дизайн студії', 'video.selected': 'РОБОТИ УЧАСНИКІВ КОМАНДИ',
        'video.swipeHint': 'Гортайте. Обирайте. Дивіться.', 'video.ctaTitle': 'Надішліть матеріали або приклад ролика',
        'video.teamNote': 'Змонтуємо один ролик або долучимося до регулярного монтажу.', 'video.discuss': 'Обговорити ролик',
        'video.emptyNote': 'Роботи цього формату додамо пізніше. Надішліть приклад і розкажіть, яке відео вам потрібне.',
        'video.cat.3d-animation': '3D-анімація', 'video.retry': 'Спробувати ще раз', 'video.loading': 'Завантажуємо ролик…', 'video.pausePreviews': 'Пауза прев’ю', 'video.resumePreviews': 'Запустити прев’ю', 'video.pausePreview': 'Пауза', 'video.choose': 'Обрати ролик', 'video.mediaError': 'Не вдалося завантажити ролик. Спробуйте відкрити його ще раз.'
    });
    const categories = new Map(VIDEO_CATEGORIES.map((cat) => [cat.id, cat]));
    const seen = new Set();
    const allWorks = VIDEO_WORKS.filter((work) => {
        if (!work || !work.id || !work.src || !Array.isArray(work.categories) || !Number.isFinite(work.order) || seen.has(work.id)) return false;
        seen.add(work.id); return true;
    }).sort((a, b) => a.order - b.order);
    let works = [], current = 0, opener = null, dragStart = null, suppressClick = false, wheelAmount = 0, previewsPaused = false, centeredId = null;
    let dialogMedia = null, dialogPreview = null, previewHome = null, dialogWork = null;
    let warmTimer = null, hdStarting = false, playbackSession = 0, pendingTap = null;
    const category = () => new URLSearchParams(location.search).get('category') || 'short-video';
    const label = (work) => t(categories.get(work.categories.includes(category()) ? category() : work.categories[0])?.labelKey || 'video.title');
    const offset = (index) => {
        let d = index - current;
        if (d > works.length / 2) d -= works.length;
        if (d < -works.length / 2) d += works.length;
        return d;
    };
    const writeCategory = (id) => {
        const url = new URL(location.href);
        url.searchParams.set('category', id);
        history.pushState(null, '', url); render();
        filters.querySelector(`[data-category="${CSS.escape(id)}"]`)?.focus({ preventScroll: true });
    };
    function syncText() {
        document.title = t('video.docTitle');
        const motion = $('videoMotionToggle');
        motion.setAttribute('aria-pressed', String(previewsPaused));
        motion.querySelector('span').textContent = t(previewsPaused ? 'video.resumePreviews' : 'video.pausePreviews');
        $('videoPrev').ariaLabel = t('video.prev'); $('videoNext').ariaLabel = t('video.next');
        filters.ariaLabel = t('video.title'); rail.ariaLabel = t('video.title'); dialog.ariaLabel = t('video.open');
        filters.querySelectorAll('button').forEach((btn) => {
            const cat = categories.get(btn.dataset.category);
            btn.firstChild.textContent = t(cat.labelKey);
        });
        stage.querySelectorAll('.vcard').forEach((card, i) => {
            card.querySelector('.vcard__cat').textContent = label(works[i]);
            card.querySelector('.vcard__open').ariaLabel = `${t(i === current ? 'video.open' : 'video.choose')}: ${i + 1}, ${works[i].title || label(works[i])}`;
            card.querySelector('.vcard__preview').textContent = t('video.playPreview');
        });
        if (works.length) {
            $('videoPosition').textContent = `${String(current + 1).padStart(2, '0')} / ${String(works.length).padStart(2, '0')}`;
            $('videoCurrentCategory').textContent = works[current].title || label(works[current]);
        }
        $('videoEmptyTitle').textContent = category() && !categories.has(category()) ? t('video.unknown') : t('video.emptyCategory');
    }
    function cardFor(work, index) {
        const card = document.createElement('article'); card.className = work.aspect === 'landscape' ? 'vcard vcard--landscape' : work.aspect === 'square' ? 'vcard vcard--square' : 'vcard'; card.dataset.workId = work.id;
        const media = document.createElement('div'); media.className = 'vcard__media';
        const video = document.createElement('video');
        video.muted = true; video.loop = true; video.playsInline = true; video.preload = 'none';
        video.setAttribute('muted', ''); video.setAttribute('playsinline', '');
        previewVideos.set(work.id, video);
        video.addEventListener('loadedmetadata', () => applyRestart(video));
        video.addEventListener('error', () => { if (dialogMedia === video && dialog.open) $('videoPlayerError').hidden = false; });
        video.addEventListener('waiting', () => { if (dialogMedia === video && dialog.open) $('videoPlayerLoading').hidden = false; });
        video.addEventListener('playing', () => {
            if (dialogMedia === video && dialog.open) { markFirstFrame(video); return; }
            if (previewsPaused || document.hidden || dialog.open || card.dataset.inStage !== 'true') video.pause();
        }); video.tabIndex = -1;
        video.setAttribute('aria-hidden', 'true'); if (work.poster) video.poster = work.poster;
        media.append(video);
        const open = document.createElement('button'); open.type = 'button'; open.className = 'vcard__open';
        const number = document.createElement('span'); number.className = 'vcard__number'; number.textContent = String(index + 1).padStart(2, '0');
        const cat = document.createElement('span'); cat.className = 'vcard__cat';
        const play = document.createElement('span'); play.className = 'vcard__play'; play.textContent = '↗'; play.setAttribute('aria-hidden', 'true');
        open.append(number, cat, play);
        open.addEventListener('click', (event) => {
            event.stopPropagation();
            if (suppressClick) { suppressClick = false; pendingTap = null; return; }
            const tap = event.detail > 0 ? pendingTap : null;
            pendingTap = null;
            activateCard(tap?.workId || work.id, tap?.button || open);
        });
        const preview = document.createElement('button'); preview.type = 'button'; preview.className = 'vcard__preview'; preview.hidden = true;
        preview.addEventListener('click', () => {
            if (!video.src) video.src = work.preview || work.src;
            video.muted = true;
            video.play().then(() => { preview.hidden = true; }).catch(() => {});
            syncText();
        });
        card.append(media, open, preview); return card;
    }
    function activateCard(workId, button) {
        if (dialog.open) return;
        const index = works.findIndex(work => work.id === workId);
        if (index < 0) return;
        if (current !== index) {
            current = index; layout();
            button?.focus({ preventScroll: true });
            return;
        }
        openPlayer(works[index], button);
    }
    function render() {
        if (dialog.open) { dialog.close(); closePlayer(); }
        clearTimeout(warmTimer);
        previewVideos.forEach((video) => { video.pause(); video.removeAttribute('src'); video.load(); });
        previewVideos.clear();
        const id = category();
        works = allWorks.filter(work => work.categories.includes(id))
            .sort((a, b) => (a.categoryOrder?.[id] ?? a.order) - (b.categoryOrder?.[id] ?? b.order));
        current = 0; centeredId = null;
        const visibleCategories = VIDEO_CATEGORIES.filter(cat => cat.id === id || allWorks.some(work => work.categories.includes(cat.id)));
        filters.classList.toggle('is-five', visibleCategories.length === 5);
        filters.classList.toggle('is-six', visibleCategories.length === 6);
        filters.replaceChildren();
        visibleCategories.forEach((cat) => {
            const btn = document.createElement('button'); btn.type = 'button'; btn.dataset.category = cat.id;
            btn.setAttribute('aria-pressed', String(cat.id === id)); btn.append(document.createTextNode(t(cat.labelKey)));
            const count = document.createElement('span'); count.className = 'vfilters__count';
            count.textContent = allWorks.filter(work => work.categories.includes(cat.id)).length; count.setAttribute('aria-hidden', 'true'); btn.append(count);
            btn.addEventListener('click', () => { if (cat.id !== category()) writeCategory(cat.id); }); filters.append(btn);
        });
        rail.hidden = controls.hidden = works.length === 0; empty.hidden = works.length > 0;
        rail.classList.toggle('is-landscape', works.length > 0 && works.filter(work => ['landscape', 'square'].includes(work.aspect)).length >= works.length / 2);
        stage.replaceChildren(...works.map(cardFor));
        $('videoPrev').disabled = $('videoNext').disabled = works.length < 2;
        $('videoPrev').hidden = $('videoNext').hidden = works.length < 2;
        layout();
    }
    function layout() {
        const mobile = innerWidth <= 760;
        const radius = mobile ? Math.min(innerWidth * 1.3, 600) : Math.min(innerWidth * .5, 800);
        stage.querySelectorAll('.vcard').forEach((card, i) => {
            const d = offset(i), a = d * 23 * Math.PI / 180;
            const visible = Math.abs(d) <= 3;
            card.style.transform = `translate(-50%, -50%) translate3d(${Math.sin(a) * radius}px, ${Math.pow(Math.abs(d), 1.4) * -8}px, ${-(1 - Math.cos(a)) * 360}px) rotateY(${-d * 16}deg) rotateZ(${d * 2.5}deg)`;
            card.style.opacity = visible ? '1' : '0';
            card.style.filter = `brightness(${Math.max(.45, 1 - Math.abs(d) * .07)})`;
            card.style.zIndex = String(20 - Math.abs(d)); card.style.visibility = visible ? 'visible' : 'hidden';
            card.classList.toggle('is-current', d === 0); card.setAttribute('aria-hidden', String(!visible));
            card.querySelector('.vcard__open').tabIndex = d === 0 ? 0 : -1;
            const video = previewVideos.get(card.dataset.workId);
            const entering = visible && card.dataset.inStage !== 'true';
            card.dataset.inStage = String(visible);
            if (entering || (d === 0 && centeredId !== works[i].id)) {
                video.dataset.restart = '1'; applyRestart(video);
            }
        });
        centeredId = works[current]?.id || null;
        syncText(); syncPlayback();
        clearTimeout(warmTimer);
        if (works[current] && !dialog.open) warmTimer = setTimeout(() => prepareFullscreen(works[current]), 180);
    }
    function applyRestart(video) {
        if (video.dataset.restart && video.readyState > 0) {
            video.currentTime = 0; delete video.dataset.restart;
        }
    }
    function move(direction, focus = false) {
        if (works.length < 2) return;
        current = (current + direction + works.length) % works.length; layout();
        if (focus) stage.children[current].querySelector('.vcard__open').focus({ preventScroll: true });
    }
    function syncPlayback() {
        const rect = rail.getBoundingClientRect();
        const onScreen = rect.bottom > 100 && rect.top < innerHeight - 60;
        stage.querySelectorAll('.vcard').forEach((card, i) => {
            const video = previewVideos.get(card.dataset.workId);
            if (!video || video === dialogMedia) return;
            const bounds = card.getBoundingClientRect();
            const visible = Math.min(bounds.bottom, innerHeight) - Math.max(bounds.top, 0) > bounds.height * .15
                && (Math.abs(offset(i)) <= 1 || Math.min(bounds.right, innerWidth) > Math.max(bounds.left, 0))
                && card.dataset.inStage === 'true';
            const play = !rail.hidden && onScreen && visible && !previewsPaused && !document.hidden && !dialog.open;
            if (play) {
                if (!video.getAttribute('src')) video.src = works[i].preview || works[i].src;
                applyRestart(video);
                if (video.paused) video.play().catch(() => {
                    if (!previewsPaused && !document.hidden && !dialog.open) card.querySelector('.vcard__preview').hidden = false;
                });
            } else video.pause();
        });
        if (document.hidden && dialogMedia) dialogMedia.pause();
    }
    function prepareFullscreen(work) {
        if (!work || hdPlayer.dataset.workId === work.id) return;
        hdPlayer.pause();
        hdPlayer.hidden = true;
        hdPlayer.dataset.workId = work.id;
        hdPlayer.poster = work.poster || '';
        hdPlayer.preload = 'auto';
        hdPlayer.src = work.src;
        hdPlayer.load();
    }
    function markFirstFrame(video) {
        if (!dialog.open || dialogMedia !== video) return;
        $('videoPlayerLoading').hidden = true;
        $('videoPlayerError').hidden = true;
        if (!dialog.dataset.firstFrameMs) dialog.dataset.firstFrameMs = String(Math.round(performance.now() - Number(dialog.dataset.openedAt)));
    }
    function restorePreview(time) {
        if (!dialogPreview || !previewHome) return;
        const video = dialogPreview;
        video.pause(); video.muted = true; video.controls = false; video.loop = true; video.playbackRate = 1;
        video.tabIndex = -1; video.setAttribute('aria-hidden', 'true');
        video.hidden = false;
        if (Number.isFinite(time) && video.readyState > 0) video.currentTime = Math.min(time, video.duration || time);
        previewHome.append(video);
        dialogPreview = null; previewHome = null;
    }
    function upgradeFullscreen() {
        if (!dialog.open || !dialogWork || dialogMedia === hdPlayer || hdStarting || hdPlayer.readyState < 3 || hdPlayer.dataset.workId !== dialogWork.id) return;
        const previous = dialogMedia;
        const session = playbackSession;
        const workId = dialogWork.id;
        hdPlayer.currentTime = previous.currentTime;
        hdPlayer.muted = true; hdPlayer.volume = previous.volume; hdPlayer.playbackRate = previous.playbackRate; hdPlayer.controls = true; hdPlayer.loop = false;
        hdStarting = true;
        hdPlayer.play().then(() => {
            if (session !== playbackSession) return;
            if (!dialog.open || dialogWork?.id !== workId || dialogMedia !== previous) { hdPlayer.pause(); return; }
            const paused = previous.paused, muted = previous.muted;
            hdPlayer.volume = previous.volume; hdPlayer.playbackRate = previous.playbackRate;
            previous.pause(); previous.muted = true;
            dialogMedia = hdPlayer; hdPlayer.hidden = false; hdPlayer.muted = muted;
            if (paused) hdPlayer.pause();
            restorePreview(hdPlayer.currentTime); markFirstFrame(hdPlayer);
        }).catch(() => {}).finally(() => { if (session === playbackSession) hdStarting = false; });
    }
    function openPlayer(work, button) {
        if (dialog.open) return;
        clearTimeout(warmTimer);
        playbackSession += 1; hdStarting = false;
        opener = button; dialogWork = work;
        dialog.dataset.openedAt = String(performance.now()); delete dialog.dataset.firstFrameMs;
        $('videoPlayerLabel').textContent = work.title || label(work);
        $('videoPlayerError').hidden = true;
        prepareFullscreen(work);
        if (hdPlayer.readyState >= 3) {
            dialogMedia = hdPlayer; hdPlayer.hidden = false;
        } else {
            dialogPreview = previewVideos.get(work.id);
            previewHome = dialogPreview.parentElement;
            dialogFrame.append(dialogPreview);
            dialogMedia = dialogPreview;
            dialogMedia.hidden = false; dialogMedia.removeAttribute('aria-hidden'); dialogMedia.tabIndex = 0;
            if (!dialogMedia.getAttribute('src')) dialogMedia.src = work.preview || work.src;
        }
        dialogMedia.controls = true; dialogMedia.loop = false; dialogMedia.playbackRate = 1;
        dialogMedia.muted = false; dialogMedia.volume = 1;
        if (dialogMedia.readyState > 0) dialogMedia.currentTime = 0;
        $('videoPlayerLoading').hidden = dialogMedia.readyState >= 2;
        document.body.classList.add('media-open'); dialog.showModal(); syncPlayback();
        const openingMedia = dialogMedia, session = playbackSession;
        openingMedia.play().then(() => {
            if (session !== playbackSession || dialogMedia !== openingMedia) return;
            markFirstFrame(openingMedia); upgradeFullscreen();
        }).catch((error) => {
            if (session === playbackSession && dialog.open && error.name !== 'AbortError') $('videoPlayerLoading').hidden = true;
        });
    }
    function closePlayer() {
        if (dialog.open || !dialogMedia) return;
        playbackSession += 1; hdStarting = false;
        const time = dialogMedia.currentTime;
        dialogMedia.pause(); hdPlayer.pause(); hdPlayer.hidden = true;
        restorePreview(time);
        dialogMedia = null; dialogWork = null;
        $('videoPlayerLoading').hidden = true; $('videoPlayerError').hidden = true;
        document.body.classList.remove('media-open');
        if (opener?.isConnected) opener.focus({ preventScroll: true });
        syncPlayback();
    }
    hdPlayer.addEventListener('canplay', upgradeFullscreen);
    hdPlayer.addEventListener('playing', () => markFirstFrame(hdPlayer));
    hdPlayer.addEventListener('waiting', () => { if (dialogMedia === hdPlayer && dialog.open) $('videoPlayerLoading').hidden = false; });
    hdPlayer.addEventListener('error', () => { if (dialogMedia === hdPlayer && dialog.open) $('videoPlayerError').hidden = false; });
    $('videoRetry').addEventListener('click', () => {
        if (!dialogMedia) return;
        $('videoPlayerError').hidden = true; $('videoPlayerLoading').hidden = false;
        dialogMedia.load(); dialogMedia.play().catch(() => {});
    });
    $('videoMotionToggle').addEventListener('click', () => { previewsPaused = !previewsPaused; syncText(); syncPlayback(); });
    $('videoPrev').addEventListener('click', () => move(-1)); $('videoNext').addEventListener('click', () => move(1));
    stage.addEventListener('transitionend', (event) => { if (event.propertyName === 'transform') syncPlayback(); });
    stage.addEventListener('keydown', (event) => {
        suppressClick = false; pendingTap = null;
        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') { event.preventDefault(); move(event.key === 'ArrowRight' ? 1 : -1, true); }
    });
    stage.addEventListener('pointerdown', (event) => {
        if (event.button !== 0) return;
        const button = event.target.closest('.vcard__open');
        dragStart = { x: event.clientX, y: event.clientY, button, workId: button?.closest('.vcard').dataset.workId };
        suppressClick = false; pendingTap = null;
        if (button) stage.setPointerCapture(event.pointerId);
    });
    stage.addEventListener('pointerup', (event) => {
        if (!dragStart) return;
        const down = dragStart;
        const dx = event.clientX - down.x, dy = event.clientY - down.y; dragStart = null;
        if (stage.hasPointerCapture(event.pointerId)) stage.releasePointerCapture(event.pointerId);
        if (Math.abs(dx) > 35 && Math.abs(dx) > Math.abs(dy)) {
            suppressClick = true; move(dx < 0 ? 1 : -1);
            setTimeout(() => { suppressClick = false; }, 0);
        } else if (down.button && Math.abs(dx) < 15 && Math.abs(dy) < 15) {
            const tap = { workId: down.workId, button: down.button };
            pendingTap = tap;
            setTimeout(() => { if (pendingTap === tap) pendingTap = null; }, 300);
        }
    });
    stage.addEventListener('click', () => {
        if (!pendingTap || suppressClick) return;
        const tap = pendingTap; pendingTap = null;
        activateCard(tap.workId, tap.button);
    });
    stage.addEventListener('pointercancel', () => { dragStart = null; pendingTap = null; });
    stage.addEventListener('wheel', (event) => {
        if (Math.abs(event.deltaX) <= Math.abs(event.deltaY) && !event.shiftKey) return;
        event.preventDefault(); wheelAmount += event.shiftKey ? event.deltaY : event.deltaX;
        if (Math.abs(wheelAmount) > 60) { move(wheelAmount > 0 ? 1 : -1); wheelAmount = 0; }
    }, { passive: false });
    function dismissPlayer() { dialog.close(); closePlayer(); }
    $('videoClose').addEventListener('click', dismissPlayer);
    dialog.addEventListener('cancel', (event) => { event.preventDefault(); dismissPlayer(); });
    dialog.addEventListener('click', (event) => { if (event.target === dialog || event.target === dialogFrame) dismissPlayer(); });
    dialog.addEventListener('close', closePlayer);
    window.addEventListener('popstate', render); window.addEventListener('resize', layout);
    window.addEventListener('scroll', syncPlayback, { passive: true }); document.addEventListener('visibilitychange', syncPlayback);
    $('langSwitch')?.addEventListener('click', syncText);
    document.addEventListener('DOMContentLoaded', render);
})();
