import { mountMobilePortfolio } from './portfolio-mobile.js?v=locale20261027';

const element = document.getElementById('projects');
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const language = document.documentElement.lang || 'ru';
let instance, generation = 0, visitorMoved = false;
let started = false, observer;
const initialHash = location.hash;
for (const event of ['wheel', 'touchstart', 'keydown']) {
  addEventListener(event, () => { visitorMoved = true; }, {once:true, passive:true});
}

async function mount() {
  const run = ++generation;
  instance?.destroy();
  instance = null;
  if (reduced.matches) {
    element.classList.remove('portfolio-pending');
    instance = mountMobilePortfolio(element, {language});
  } else {
    const [{BSSpiral}] = await Promise.all([import('../spiral/spiral.js?v=spiral20261119'), document.fonts.ready]);
    if (run !== generation) return;
    element.classList.remove('portfolio-pending');
    instance = BSSpiral.mount(element, {language});
  }
  await instance.ready;
  if (run !== generation) return;
  instance.setLanguage(language);
  if (!visitorMoved && initialHash && initialHash !== '#hero' && location.hash === initialHash) {
    let id;
    try { id = decodeURIComponent(initialHash.slice(1)); } catch { return; }
    document.getElementById(id)?.scrollIntoView({behavior:'instant'});
  }
}

function start() {
  if (started) return;
  started = true; observer?.disconnect(); mount();
}
reduced.addEventListener('change', () => { if (started) mount(); else if (reduced.matches) start(); });
if (reduced.matches || typeof IntersectionObserver === 'undefined') start();
else {
  element.classList.add('portfolio-pending');
  observer = new IntersectionObserver(entries => {
    if (entries.some(entry => entry.isIntersecting)) start();
  }, {rootMargin:'600px 0px',threshold:0});
  observer.observe(element);
}
