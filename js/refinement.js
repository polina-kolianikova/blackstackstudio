(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const fine = matchMedia('(hover: hover) and (pointer: fine)');
  const header = document.querySelector('.nav');
  const nav = header?.querySelector('.nav__links');
  const contact = header?.querySelector('.nav__cta');
  if (contact) {
    const label = contact.querySelector('span:first-child');
    if (label) {
      label.id ||= 'refinedContactLabel';
      contact.setAttribute('aria-labelledby', label.id);
    }
    contact.querySelector('.nav__cta-arrow')?.setAttribute('aria-hidden', 'true');
  }
  let toggle;
  if (nav && header.querySelector('.nav__right')) {
    nav.id ||= 'refinedNavigation';
    toggle = document.createElement('button');
    toggle.className = 'refine-menu-toggle';
    toggle.type = 'button';
    toggle.setAttribute('aria-label', {en:'Menu',uk:'Меню',ru:'Меню'}[document.documentElement.lang] || 'Menu');
    toggle.setAttribute('aria-controls', nav.id);
    toggle.setAttribute('aria-expanded', 'false');
    toggle.innerHTML = '<i aria-hidden="true"></i><i aria-hidden="true"></i>';
    header.querySelector('.nav__right').insertBefore(toggle, header.querySelector('.nav__cta'));
    const close = () => { nav.classList.remove('is-open'); toggle.setAttribute('aria-expanded','false'); };
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') !== 'true';
      toggle.setAttribute('aria-expanded', String(open)); nav.classList.toggle('is-open', open);
      if (open) nav.querySelector('a')?.focus();
    });
    nav.addEventListener('click', event => { if (event.target.closest('a')) close(); });
    document.addEventListener('keydown', event => { if (event.key === 'Escape' && nav.classList.contains('is-open')) { close(); toggle.focus(); } });
    document.addEventListener('pointerdown', event => { if (!header.contains(event.target)) close(); });
    matchMedia('(min-width:901px)').addEventListener('change', event => { if(event.matches) close(); });
  }

  const hero = document.querySelector('.bs-home .hero');
  const stages = [...document.querySelectorAll('.process__step')];
  const activeStages = new Set();
  let heroVisible = false, raf = 0, pointerX = 0, shownX = 0, lastTime = 0;
  const clamp = n => Math.max(0, Math.min(1, n));
  function request() { if (!raf && !document.hidden) raf = requestAnimationFrame(update); }
  function update(now) {
    raf = 0;
    const dt = lastTime ? Math.min(.05, (now-lastTime)/1000) : 1/60; lastTime = now;
    if (reduced.matches) {
      hero?.style.removeProperty('--hero-depth-x');
      stages.forEach(stage => stage.style.setProperty('--stage-progress','1'));
      return;
    }
    if (hero && heroVisible && fine.matches) {
      shownX += (pointerX-shownX) * (1-Math.exp(-10*dt));
      hero.style.setProperty('--hero-depth-x', shownX.toFixed(4));
    }
    activeStages.forEach(stage => {
      const rect = stage.getBoundingClientRect();
      const p = clamp((innerHeight*.85-rect.top)/(innerHeight*.48));
      stage.style.setProperty('--stage-progress', p.toFixed(4));
    });
    if (heroVisible && Math.abs(pointerX-shownX) > .001) request();
  }
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (entry.target === hero) heroVisible = entry.isIntersecting;
      else if (entry.isIntersecting) activeStages.add(entry.target);
      else activeStages.delete(entry.target);
    }
    request();
  }, {threshold:0});
  if (hero) {
    observer.observe(hero);
    hero.addEventListener('pointermove', event => {
      if (!fine.matches || reduced.matches) return;
      pointerX = (event.clientX/innerWidth-.5)*2; request();
    }, {passive:true});
    hero.addEventListener('pointerleave', () => { pointerX=0; request(); });
  }
  stages.forEach(stage => observer.observe(stage));
  addEventListener('scroll', () => { if (activeStages.size) request(); }, {passive:true});
  addEventListener('resize', request, {passive:true});
  reduced.addEventListener('change', () => { shownX=pointerX=0; request(); });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) { cancelAnimationFrame(raf); raf=0; lastTime=0; }
    else request();
  });

  document.querySelectorAll('.card,.process__step,.direction-card').forEach(card => {
    let cardFrame = 0, x = 50, y = 0;
    card.addEventListener('pointermove', event => {
      if (reduced.matches || !fine.matches) return;
      const rect = card.getBoundingClientRect();
      x=(event.clientX-rect.left)/rect.width*100; y=(event.clientY-rect.top)/rect.height*100;
      if (!cardFrame) cardFrame = requestAnimationFrame(() => {
        cardFrame=0; card.style.setProperty('--mx',`${x.toFixed(1)}%`); card.style.setProperty('--my',`${y.toFixed(1)}%`);
      });
    }, {passive:true});
    card.addEventListener('pointerleave', () => {
      cancelAnimationFrame(cardFrame); cardFrame=0;
      card.style.removeProperty('--mx'); card.style.removeProperty('--my');
    });
  });
  document.querySelectorAll('.faq__item').forEach(item => item.addEventListener('toggle', () => {
    if (item.open && !reduced.matches) item.querySelector('.faq__a')?.animate(
      [{opacity:.45,transform:'translateY(-5px)'},{opacity:1,transform:'translateY(0)'}],
      {duration:250,easing:'cubic-bezier(.2,.7,.2,1)'}
    );
  }));
  request();
})();
