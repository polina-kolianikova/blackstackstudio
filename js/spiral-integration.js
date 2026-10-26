import { mountMobilePortfolio } from './portfolio-mobile.js';

const element = document.getElementById('projects');
const compact = matchMedia('(max-width: 900px), (hover: none) and (pointer: coarse)');
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const language = document.documentElement.lang || 'ru';
let instance, generation = 0, visitorMoved = false;
const initialHash = location.hash;
for (const event of ['wheel', 'touchstart', 'keydown']) {
  addEventListener(event, () => { visitorMoved = true; }, {once:true, passive:true});
}

async function mount() {
  const run = ++generation;
  instance?.destroy();
  instance = null;
  if (compact.matches || reduced.matches) {
    instance = mountMobilePortfolio(element, {language});
  } else {
    const [{BSSpiral}] = await Promise.all([import('../spiral/spiral.js?v=usability20261026'), document.fonts.ready]);
    if (run !== generation) return;
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

compact.addEventListener('change', mount);
reduced.addEventListener('change', mount);
mount();
