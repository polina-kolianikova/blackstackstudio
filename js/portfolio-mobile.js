const base = new URL('../spiral/', import.meta.url);
const copy = {
  ka:{title:'პროექტები და კონცეფციები',previous:'წინა პროექტი',next:'შემდეგი პროექტი',hint:'გადაათვალიერეთ პროექტები',concept:'კონცეფცია',full:'სრული პროექტი',launch:'გაშვების პროცესში',error:'პროექტები ვერ ჩაიტვირთა. განაახლეთ გვერდი.'},
  ru:{title:'Проекты и концепты',previous:'Предыдущий проект',next:'Следующий проект',hint:'Листайте проекты',concept:'концепт',full:'под ключ',launch:'в запуске',error:'Не удалось загрузить проекты. Обновите страницу.'},
  en:{title:'Projects and concepts',previous:'Previous project',next:'Next project',hint:'Swipe to explore',concept:'concept',full:'full delivery',launch:'launching',error:'Projects could not load. Please refresh the page.'},
  uk:{title:'Проєкти та концепти',previous:'Попередній проєкт',next:'Наступний проєкт',hint:'Гортайте проєкти',concept:'концепт',full:'під ключ',launch:'у запуску',error:'Не вдалося завантажити проєкти. Оновіть сторінку.'}
};
const make = (tag, name, text) => {
  const node = document.createElement(tag);
  node.className = `portfolio-mobile__${name}`;
  if (text !== undefined) node.textContent = text;
  return node;
};

export function mountMobilePortfolio(element, options = {}) {
  let language = options.language || 'ru', disposed = false, frame = 0, active = 0;
  const originalClass = element.className;
  const originalHeight = element.style.height;
  const controller = new AbortController();
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const t = key => (copy[language] || copy.ru)[key];
  element.classList.add('portfolio-mobile');
  const heading = make('header','heading');
  heading.append(make('span','brand','BLACKSTACK'), make('h2','title',t('title')));
  const rail = make('div','rail');
  rail.setAttribute('role','group');
  rail.setAttribute('aria-label',t('title'));
  const controls = make('div','controls');
  const hint = make('span','hint',t('hint'));
  const previous = make('button','arrow','←'), next = make('button','arrow','→');
  previous.type = next.type = 'button';
  const count = make('span','count');
  previous.disabled = next.disabled = true;
  count.setAttribute('aria-live','polite');
  controls.append(hint,previous,count,next);
  element.replaceChildren(heading,rail,controls);
  let cases = [], cards = [];
  const status = item => t(item.status === 'концепт' ? 'concept' : item.status === 'под ключ' ? 'full' : 'launch');

  function update() {
    frame = 0;
    if (disposed || !cards.length) return;
    const start = rail.getBoundingClientRect().left + parseFloat(getComputedStyle(rail).paddingLeft);
    active = cards.reduce((best, card, i) => Math.abs(card.getBoundingClientRect().left-start) < Math.abs(cards[best].getBoundingClientRect().left-start) ? i : best, 0);
    previous.disabled = active === 0;
    next.disabled = active === cards.length-1;
    const label = `${String(active+1).padStart(2,'0')} / ${cards.length}`;
    if (count.textContent !== label) count.textContent = label;
  }
  function seek(delta) {
    const card = cards[Math.max(0,Math.min(cards.length-1,active+delta))];
    if (!card) return;
    const left = rail.scrollLeft + card.getBoundingClientRect().left - rail.getBoundingClientRect().left - parseFloat(getComputedStyle(rail).paddingLeft);
    rail.scrollTo({left,behavior:reduced.matches?'instant':'smooth'});
  }
  previous.addEventListener('click',()=>seek(-1),{signal:controller.signal});
  next.addEventListener('click',()=>seek(1),{signal:controller.signal});
  rail.addEventListener('scroll',()=>{if(!frame)frame=requestAnimationFrame(update);},{passive:true,signal:controller.signal});
  const observer = new ResizeObserver(update);
  observer.observe(rail);
  setLanguage(language);
  const ready = fetch(new URL('cases.json',base),{signal:controller.signal}).then(response=>{
    if (!response.ok) throw Error('Projects unavailable');
    return response.json();
  }).then(items=>{
    if (disposed) return;
    cases = items;
    cards = cases.map((item,i)=>{
      const link = make('a','card');
      link.href=item.url; link.target='_blank'; link.rel='noopener noreferrer';
      const image = make('img','poster');
      image.src=new URL(item.poster,base); image.alt=item.title; image.width=960; image.height=600;
      image.loading=i<2?'eager':'lazy'; image.decoding='async';
      const text = make('div','caption');
      text.append(make('h3','name',item.title),make('span','status',status(item)));
      link.append(image,text);
      rail.append(link);
      return link;
    });
    update();
    setLanguage(language);
  }).catch(error=>{
    if (error.name === 'AbortError' || disposed) return;
    rail.replaceChildren(make('p','error',t('error')));
    controls.hidden=true;
  });
  function setLanguage(nextLanguage) {
    language=copy[nextLanguage]?nextLanguage:'ru';
    heading.querySelector('h2').textContent=t('title');
    rail.setAttribute('aria-label',t('title'));
    hint.textContent=t('hint');
    previous.setAttribute('aria-label',t('previous')); next.setAttribute('aria-label',t('next'));
    cards.forEach((card,i)=>{card.querySelector('.portfolio-mobile__status').textContent=status(cases[i]);});
  }
  return {ready,setLanguage,destroy(){
    disposed=true; controller.abort(); observer.disconnect(); cancelAnimationFrame(frame);
    element.replaceChildren(); element.className=originalClass; element.style.height=originalHeight;
  }};
}
