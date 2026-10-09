import { CATEGORIES, DESIGNERS, WORKS } from './works.js?v=4';

const works = WORKS.slice().sort((a, b) => a.order - b.order).map((work, index) => ({ ...work, index }));
const designerById = new Map(DESIGNERS.map(designer => [designer.id, designer]));
const designers = DESIGNERS.filter(designer => works.some(work => work.designerId === designer.id));
const categoryById = new Map(CATEGORIES.filter(category => works.some(work => work.categories.includes(category.id))).map(category => [category.id, category]));
const deck = document.querySelector('#artDeck');
const stage = document.querySelector('#artStage');
const tabsRoot = document.querySelector('#categoryTabs');
const grid = document.querySelector('#workGrid');
const dialog = document.querySelector('#workDialog');
const media = document.querySelector('#dialogMedia');
const closeButton = document.querySelector('#closeDialog');
const search = document.querySelector('#workSearch');
const designerSelect = document.querySelector('#designerSelect');
const gallery = document.querySelector('#dialogGallery');
const galleryThumbs = document.querySelector('#dialogThumbs');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const cards = new Map();
let tabs = [];
let filtered = [];
let selected = 0;
let opener;
let dialogImages = [];
let dialogImage = 0;
let pointer = null;
let pendingTap = null;
let blockClicksUntil = 0;
let wheelDistance = 0;
let wheelReset;
let searchTimer;
let renderVersion = 0;
let state = { category: 'all', designer: '', query: '' };

const wrap = (index, count = filtered.length) => ((index % count) + count) % count;
const authorName = work => designerById.get(work.designerId)?.name || '';
function wordCount(count) {
  const last = count % 10, teens = count % 100;
  return `${count} ${last === 1 && teens !== 11 ? 'работа' : last > 1 && last < 5 && (teens < 12 || teens > 14) ? 'работы' : 'работ'}`;
}
function createTab(category, count) {
  const tab = document.createElement('button');
  tab.type = 'button'; tab.setAttribute('role', 'tab'); tab.id = 'tab-' + category.id;
  tab.dataset.categoryTab = category.id;
  tab.setAttribute('aria-controls', 'workPanel');
  tab.append(document.createTextNode(category.label));
  const number = document.createElement('span'); number.setAttribute('aria-hidden', 'true'); number.textContent = String(count).padStart(2, '0');
  tab.append(number);
  return tab;
}
function buildFilters() {
  const fragment = document.createDocumentFragment();
  fragment.append(createTab({ id: 'all', label: 'Всё' }, works.length));
  for (const category of categoryById.values()) fragment.append(createTab(category, works.filter(work => work.categories.includes(category.id)).length));
  tabsRoot.replaceChildren(fragment);
  tabs = [...tabsRoot.querySelectorAll('button')];
  for (const [index, tab] of tabs.entries()) {
    tab.addEventListener('click', () => { state.category = tab.dataset.categoryTab; applyFilters('push'); });
    tab.addEventListener('keydown', event => {
      const direction = event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0;
      if (!direction && event.key !== 'Home' && event.key !== 'End') return;
      event.preventDefault();
      const next = event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 : wrap(index + direction, tabs.length);
      state.category = tabs[next].dataset.categoryTab;
      applyFilters('push'); tabs[next].focus({ preventScroll: true });
    });
  }
  document.querySelector('#designerFilter').hidden = designers.length === 0;
  const team = document.createElement('option'); team.value = ''; team.textContent = 'Вся команда';
  designerSelect.replaceChildren(team);
  for (const designer of designers) {
    const option = document.createElement('option'); option.value = designer.id; option.textContent = designer.name;
    designerSelect.append(option);
  }
}
function readUrl() {
  const params = new URL(location.href).searchParams;
  const category = params.get('category') || 'all', designer = params.get('designer') || '';
  state = { category: categoryById.has(category) ? category : 'all', designer: designers.some(item => item.id === designer) ? designer : '', query: params.get('q') || '' };
  search.value = state.query; designerSelect.value = state.designer;
}
function writeUrl(mode) {
  const url = new URL(location.href);
  for (const [key, value] of [['category', state.category === 'all' ? '' : state.category], ['designer', state.designer], ['q', state.query]]) {
    if (value) url.searchParams.set(key, value); else url.searchParams.delete(key);
  }
  if (url.href !== location.href) history[mode === 'push' ? 'pushState' : 'replaceState'](null, '', url);
}
function applyFilters(mode = false) {
  if (dialog.open) dismissDialog();
  pointer = null; pendingTap = null; stage.classList.remove('is-dragging');
  const query = state.query.trim().toLocaleLowerCase('ru');
  const scope = works.filter(work => (!state.designer || work.designerId === state.designer)
    && (!query || [work.title, work.tag, authorName(work), ...work.categories.map(id => categoryById.get(id)?.label || '')].join(' ').toLocaleLowerCase('ru').includes(query)));
  filtered = scope.filter(work => state.category === 'all' || work.categories.includes(state.category));
  for (const tab of tabs) {
    const category = tab.dataset.categoryTab;
    tab.querySelector('span').textContent = String(scope.filter(work => category === 'all' || work.categories.includes(category)).length).padStart(2, '0');
  }
  selected = state.category === 'all' && !query && !state.designer && filtered.length > 2 ? 2 : 0;
  const active = tabs.find(tab => tab.dataset.categoryTab === state.category) || tabs[0];
  if (tabsRoot.scrollWidth > tabsRoot.clientWidth) tabsRoot.scrollLeft = Math.max(0, active.offsetLeft - tabsRoot.clientWidth / 2 + active.clientWidth / 2);
  for (const tab of tabs) {
    tab.setAttribute('aria-selected', String(tab === active)); tab.tabIndex = tab === active ? 0 : -1;
  }
  document.querySelector('#workPanel').setAttribute('aria-labelledby', active.id);
  document.querySelector('#categoryDescription').textContent = categoryById.get(state.category)?.description || 'Выберите направление — внутри проектов можно посмотреть все материалы.';
  document.querySelector('#archiveCount').textContent = wordCount(filtered.length);
  document.querySelector('#catalogEmpty').hidden = filtered.length > 0;
  document.querySelector('#workPanel').hidden = filtered.length === 0;
  document.querySelector('#previousWork').disabled = document.querySelector('#nextWork').disabled = filtered.length < 2;
  renderDeck(0, true); renderGrid(); renderPacks();
  if (mode) writeUrl(mode);
}
function makeCard(work) {
  const card = document.createElement('button'); card.type = 'button'; card.className = 'art-card';
  card.dataset.workIndex = work.index;
  const image = document.createElement('img'); image.src = work.poster || work.src;
  image.alt = `${work.title} — ${work.tag}`; image.draggable = false; image.decoding = 'async';
  card.append(image);
  const count = makeGalleryCount(work); if (count) card.append(count);
  if (work.kind === 'video') {
    const play = document.createElement('span'); play.className = 'art-card__play'; play.setAttribute('aria-hidden', 'true'); play.textContent = '▶'; card.append(play);
  }
  const open = document.createElement('span'); open.className = 'art-card__open'; open.textContent = '↗'; open.setAttribute('aria-hidden', 'true'); card.append(open);
  card.addEventListener('click', event => {
    event.stopPropagation();
    if (event.detail && performance.now() < blockClicksUntil) { pendingTap = null; return; }
    const tap = event.detail ? pendingTap : null; pendingTap = null;
    openWork(tap?.index ?? work.index, tap?.button || card);
  });
  return card;
}
function makeGalleryCount(work) {
  if (!work.gallery || work.gallery.length < 2) return null;
  const badge = document.createElement('span'); badge.className = 'case-count';
  badge.textContent = `▦ ${work.gallery.length}`; badge.title = `Материалы проекта: ${work.gallery.length}`;
  badge.setAttribute('aria-hidden', 'true'); return badge;
}
function pose(delta) {
  let points;
  if (innerWidth <= 680) points = [[0, 0, 0, 0, 1, 1], [184, 24, 42, 7, .78, .62], [300, 50, 60, 10, .6, .42], [400, 60, 70, 12, .45, 0]];
  else if (innerWidth <= 1000) points = [[0, -4, 0, 0, 1, 1], [230, 8, 33, 5, .82, .8], [390, 28, 51, 9, .65, .42], [640, 56, 65, 12, .5, 0]];
  else points = [[0, -4, 0, 0, 1, 1], [266, 8, 33, 5, .87, .8], [467, 28, 51, 9, .7, .42], [640, 56, 65, 12, .5, 0]];
  const distance = Math.min(3, Math.abs(delta)), step = Math.min(2, Math.floor(distance)), fraction = distance - step;
  const values = points[step].map((value, index) => value + (points[step + 1][index] - value) * fraction);
  const sign = Math.sign(delta);
  return { transform: `translate(-50%, -50%) translateX(${values[0] * sign}px) translateY(${values[1]}px) rotateY(${-values[2] * sign}deg) rotateZ(${values[3] * sign}deg) scale(${values[4]})`, opacity: values[5] };
}
function renderDeck(direction = 0, reset = false, cursor = selected) {
  const version = ++renderVersion;
  if (reset) { deck.replaceChildren(); cards.clear(); }
  if (!filtered.length) return;
  const visible = new Set(), indices = new Set();
  for (let slot = -3; slot <= 3; slot++) indices.add(wrap(Math.round(cursor) + slot));
  const normalizedCursor = wrap(cursor);
  for (const index of indices) {
    const work = filtered[index];
    let delta = index - normalizedCursor;
    if (delta > filtered.length / 2) delta -= filtered.length;
    if (delta < -filtered.length / 2) delta += filtered.length;
    if (Math.abs(delta) > 3) continue;
    visible.add(work.index);
    let card = cards.get(work.index);
    if (!card) {
      card = makeCard(work); cards.set(work.index, card);
      if (!reset && direction && !stage.classList.contains('is-dragging') && !reducedMotion.matches) {
        card.dataset.slot = direction > 0 ? '3' : '-3';
        card.style.transform = pose(direction > 0 ? 3 : -3).transform; card.style.opacity = '0';
        deck.append(card); card.getBoundingClientRect();
      } else deck.append(card);
    }
    const position = pose(delta);
    card.dataset.slot = String(Math.round(delta));
    card.style.transform = position.transform;
    card.style.opacity = String(position.opacity);
    card.style.zIndex = String(Math.round(50 - Math.abs(delta) * 10));
    card.setAttribute('aria-hidden', String(Math.abs(delta) >= 3));
    card.tabIndex = work.index === filtered[selected].index ? 0 : -1;
    card.setAttribute('aria-label', `Открыть: ${work.title}, ${work.tag}${authorName(work) ? ', ' + authorName(work) : ''}`);
  }
  for (const [index, card] of cards) {
    if (visible.has(index)) continue;
    card.dataset.slot = direction > 0 ? '-3' : '3'; card.style.transform = pose(direction > 0 ? -3 : 3).transform; card.style.opacity = '0';
    card.tabIndex = -1; card.setAttribute('aria-hidden', 'true');
  }
  setTimeout(() => {
    if (version !== renderVersion) return;
    for (const [index, card] of cards) if (!visible.has(index)) { card.remove(); cards.delete(index); }
  }, reducedMotion.matches ? 0 : 480);
  const current = filtered[selected];
  document.querySelector('#workTitle').textContent = current.title;
  document.querySelector('#workTag').textContent = [current.tag, authorName(current)].filter(Boolean).join(' · ');
  document.querySelector('#workIndex').textContent = `${String(selected + 1).padStart(2, '0')} / ${String(filtered.length).padStart(2, '0')}`;
}
function move(direction, followFocus = false) {
  if (filtered.length < 2) return;
  const focusOnCard = deck.contains(document.activeElement);
  selected = wrap(selected + direction); renderDeck(direction);
  if (followFocus && focusOnCard) cards.get(filtered[selected].index)?.focus({ preventScroll: true });
}
function renderGrid() {
  const fragment = document.createDocumentFragment();
  for (const work of filtered) {
    const card = document.createElement('button'); card.type = 'button'; card.className = 'work-card'; card.dataset.work = work.index;
    card.setAttribute('aria-label', `Открыть: ${work.title}, ${work.tag}`);
    const imageFrame = document.createElement('span'); imageFrame.className = 'work-card__image';
    const image = document.createElement('img'); image.src = work.poster || work.src; image.alt = `${work.title} — ${work.tag}`; image.loading = 'lazy'; image.decoding = 'async'; imageFrame.append(image);
    const count = makeGalleryCount(work); if (count) imageFrame.append(count);
    if (work.kind === 'video') { const play = document.createElement('span'); play.className = 'work-card__play'; play.textContent = '▶'; play.setAttribute('aria-hidden', 'true'); imageFrame.append(play); }
    const metadata = document.createElement('span'); metadata.className = 'work-card__meta';
    const title = document.createElement('b'); title.textContent = work.title;
    const tag = document.createElement('span'); tag.textContent = [work.tag, authorName(work)].filter(Boolean).join(' · ');
    metadata.append(title, tag); card.append(imageFrame, metadata);
    card.addEventListener('click', () => openWork(work.index, card)); fragment.append(card);
  }
  grid.replaceChildren(fragment);
}
function renderPacks() {
  const root = document.querySelector('#packLinks');
  const links = new Map();
  for (const work of filtered) if (work.categories.includes('stickers') && work.link) links.set(work.link, work.title);
  root.hidden = (state.category !== 'all' && state.category !== 'stickers') || links.size === 0;
  const label = document.createElement('span'); label.textContent = 'Telegram-паки'; root.replaceChildren(label);
  for (const [url, name] of links) { const link = document.createElement('a'); link.href = url; link.textContent = name + ' ↗'; link.target = '_blank'; link.rel = 'noopener noreferrer'; root.append(link); }
}
function openWork(index, trigger) {
  if (dialog.open || !works[index]) return;
  const work = works[index]; opener = trigger;
  const target = filtered.findIndex(item => item.index === index);
  if (target >= 0 && target !== selected) { const direction = target - selected; selected = target; renderDeck(direction); }
  document.querySelector('#dialogTitle').textContent = work.title;
  document.querySelector('#dialogTag').textContent = [work.tag, authorName(work)].filter(Boolean).join(' · ');
  const assets = work.gallery?.length ? work.gallery : [{ src: work.src, kind: work.kind, poster: work.poster }];
  dialogImages = assets.map(asset => typeof asset === 'string' ? { src: asset, kind: 'image', alt: work.title } : { kind: 'image', alt: asset.title || work.title, ...asset });
  gallery.hidden = dialogImages.length < 2;
  dialog.classList.toggle('has-gallery', dialogImages.length > 1);
  galleryThumbs.replaceChildren(...dialogImages.map((asset, imageIndex) => {
    const button = document.createElement('button'); button.type = 'button'; button.className = 'dialog__thumb';
    button.ariaLabel = `Показать материал ${imageIndex + 1}`;
    const image = document.createElement('img'); image.src = asset.thumb || asset.poster || asset.src; image.alt = ''; image.loading = 'lazy';
    button.append(image); button.addEventListener('click', () => showDialogImage(imageIndex));
    return button;
  }));
  showDialogImage(0);
  const packLink = document.querySelector('#dialogPack'); packLink.hidden = !work.link;
  if (work.link) packLink.href = work.link; else packLink.removeAttribute('href');
  dialog.showModal(); document.body.classList.add('dialog-open'); closeButton.focus({ preventScroll: true });
  media.querySelector('video')?.play().catch(() => {});
}
function showDialogImage(imageIndex) {
  if (!dialogImages.length) return;
  dialogImage = wrap(imageIndex, dialogImages.length);
  const asset = dialogImages[dialogImage];
  const previous = media.querySelector('video');
  if (previous) { previous.pause(); previous.removeAttribute('src'); previous.load(); }
  const element = document.createElement(asset.kind === 'video' ? 'video' : 'img');
  media.classList.remove('is-long');
  if (asset.kind === 'video') {
    if (asset.poster) element.poster = asset.poster;
    element.controls = true; element.playsInline = true; element.preload = 'auto'; element.muted = false;
  } else {
    element.alt = asset.alt || '';
    element.addEventListener('load', () => {
      if (media.firstElementChild === element) media.classList.toggle('is-long', element.naturalHeight > element.naturalWidth * 2);
    });
  }
  element.src = asset.src; media.replaceChildren(element); dialog.scrollTop = 0;
  document.querySelector('#dialogImagePosition').textContent = `${String(dialogImage + 1).padStart(2, '0')} / ${String(dialogImages.length).padStart(2, '0')}`;
  [...galleryThumbs.children].forEach((button, index) => button.setAttribute('aria-pressed', String(index === dialogImage)));
  const thumb = galleryThumbs.children[dialogImage];
  if (thumb) galleryThumbs.scrollLeft = Math.max(0, thumb.offsetLeft - galleryThumbs.clientWidth / 2 + thumb.clientWidth / 2);
  if (dialog.open && asset.kind === 'video') element.play().catch(() => {});
}
document.querySelector('#previousImage').addEventListener('click', () => showDialogImage(dialogImage - 1));
document.querySelector('#nextImage').addEventListener('click', () => showDialogImage(dialogImage + 1));
dialog.addEventListener('keydown', event => {
  if (dialogImages.length < 2 || event.target.closest('video') || !['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
  event.preventDefault();
  showDialogImage(dialogImage + (event.key === 'ArrowRight' ? 1 : -1));
  galleryThumbs.children[dialogImage]?.focus({ preventScroll: true });
});
function cleanDialog() {
  if (dialog.open) return;
  const video = media.querySelector('video');
  if (video) { video.pause(); video.removeAttribute('src'); video.load(); }
  media.replaceChildren(); media.classList.remove('is-long');
  dialogImages = []; gallery.hidden = true; galleryThumbs.replaceChildren(); dialog.classList.remove('has-gallery');
  document.body.classList.remove('dialog-open');
  const focusTarget = opener?.isConnected ? opener : cards.get(filtered[selected]?.index) || stage;
  focusTarget.focus({ preventScroll: true });
}
function dismissDialog() { dialog.close(); cleanDialog(); }
closeButton.addEventListener('click', dismissDialog);
dialog.addEventListener('close', cleanDialog);
dialog.addEventListener('cancel', event => { event.preventDefault(); dismissDialog(); });
dialog.addEventListener('click', event => {
  if (event.target !== dialog) return;
  const bounds = dialog.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dismissDialog();
});
document.querySelector('#previousWork').addEventListener('click', () => move(-1));
document.querySelector('#nextWork').addEventListener('click', () => move(1));
stage.addEventListener('keydown', event => {
  pendingTap = null;
  if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
  event.preventDefault(); move(event.key === 'ArrowLeft' ? -1 : 1, true);
});
function onWheel(event) {
  if (event.ctrlKey || filtered.length < 2 || dialog.open) return;
  event.preventDefault();
  const unit = event.deltaMode === 1 ? 18 : event.deltaMode === 2 ? 300 : 1;
  wheelDistance += (Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY) * unit;
  clearTimeout(wheelReset); wheelReset = setTimeout(() => { wheelDistance = 0; }, 160);
  const steps = Math.trunc(wheelDistance / 95);
  if (steps) { move(steps); wheelDistance -= steps * 95; }
}
stage.addEventListener('wheel', onWheel, { passive: false });
document.querySelector('.reel-footer').addEventListener('wheel', onWheel, { passive: false });
stage.addEventListener('pointerdown', event => {
  if (event.button !== 0 || dialog.open) return;
  const button = event.target.closest('.art-card');
  pointer = { x: event.clientX, y: event.clientY, base: selected, cursor: selected, button, index: button ? Number(button.dataset.workIndex) : null, dragging: false };
  pendingTap = null; blockClicksUntil = 0; stage.setPointerCapture(event.pointerId);
});
stage.addEventListener('pointermove', event => {
  if (!pointer || filtered.length < 2) return;
  const dx = event.clientX - pointer.x, dy = event.clientY - pointer.y;
  if (!pointer.dragging && (Math.abs(dx) < 10 || Math.abs(dx) < Math.abs(dy) * 1.2)) return;
  pointer.dragging = true; stage.classList.add('is-dragging');
  const step = innerWidth <= 680 ? 184 : innerWidth <= 1000 ? 230 : 266;
  pointer.cursor = pointer.base - dx / step;
  selected = wrap(Math.round(pointer.cursor));
  renderDeck(dx < 0 ? 1 : -1, false, filtered.length > 4 ? pointer.cursor : selected);
});
stage.addEventListener('pointerup', event => {
  if (!pointer) return;
  const down = pointer; pointer = null;
  if (stage.hasPointerCapture(event.pointerId)) stage.releasePointerCapture(event.pointerId);
  if (down.dragging) {
    blockClicksUntil = performance.now() + 250;
    const distance = down.cursor - down.base;
    let target = Math.round(down.cursor);
    if (Math.abs(distance) > .2 && target === down.base) target = down.base + Math.sign(distance);
    stage.classList.remove('is-dragging'); deck.getBoundingClientRect();
    selected = wrap(target); renderDeck(Math.sign(distance));
  } else if (down.button && Math.abs(event.clientX - down.x) < 15 && Math.abs(event.clientY - down.y) < 15) {
    const tap = { index: down.index, button: down.button }; pendingTap = tap;
    setTimeout(() => { if (pendingTap === tap) pendingTap = null; }, 300);
  }
});
stage.addEventListener('click', () => {
  if (!pendingTap || performance.now() < blockClicksUntil) return;
  const tap = pendingTap; pendingTap = null; openWork(tap.index, tap.button);
});
stage.addEventListener('pointercancel', () => { pointer = null; pendingTap = null; stage.classList.remove('is-dragging'); renderDeck(); });
window.addEventListener('resize', () => renderDeck(0, false, pointer?.dragging ? pointer.cursor : selected));
document.addEventListener('visibilitychange', () => { if (document.hidden) media.querySelector('video')?.pause(); });
search.addEventListener('input', () => { clearTimeout(searchTimer); searchTimer = setTimeout(() => { state.query = search.value; applyFilters('replace'); }, 120); });
designerSelect.addEventListener('change', () => { state.designer = designerSelect.value; applyFilters('push'); });
document.querySelector('#resetFilters').addEventListener('click', () => { state = { category: 'all', designer: '', query: '' }; search.value = ''; designerSelect.value = ''; applyFilters('push'); tabs[0].focus(); });
window.addEventListener('popstate', () => { readUrl(); applyFilters(); });
buildFilters(); readUrl(); applyFilters('replace');
