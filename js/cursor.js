(() => {
  const cursor = document.getElementById('cursor');
  const dot = document.getElementById('cursorDot');
  if (!cursor || !dot) return;
  const fine = matchMedia('(pointer: fine)');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let frame=0,last=0,x=0,y=0,shownX=0,shownY=0,visible=false;
  const enabled = () => fine.matches && !reduced.matches;
  function hide() {
    cursor.style.opacity=dot.style.opacity='0'; visible=false;
    cancelAnimationFrame(frame); frame=0; last=0;
  }
  function mode() {
    document.body.classList.toggle('has-refined-cursor',enabled());
    hide();
  }
  function draw(now) {
    frame=0;
    if (!enabled() || document.hidden) return;
    const dt=last?Math.min(.05,(now-last)/1000):1/60; last=now;
    const alpha=1-Math.exp(-24*dt);
    shownX+=(x-shownX)*alpha; shownY+=(y-shownY)*alpha;
    cursor.style.transform=`translate3d(${shownX}px,${shownY}px,0) translate(-50%,-50%)`;
    dot.style.transform=`translate3d(${x}px,${y}px,0) translate(-50%,-50%)`;
    if(Math.abs(x-shownX)+Math.abs(y-shownY)>.1) frame=requestAnimationFrame(draw);
  }
  addEventListener('pointermove',event=>{
    if(!enabled()) return;
    x=event.clientX;y=event.clientY;
    if(!visible){shownX=x;shownY=y;visible=true;cursor.style.opacity=dot.style.opacity='1';}
    if(!frame)frame=requestAnimationFrame(draw);
  },{passive:true});
  document.addEventListener('pointerover',event=>{
    const target=event.target instanceof Element?event.target:null;
    cursor.classList.toggle('is-case',!!target?.closest('.bs-spiral__card,[data-cursor="case"]'));
    cursor.classList.toggle('is-hover',!!target?.closest('a,button,summary,[data-cursor="hover"]'));
  },{passive:true});
  document.addEventListener('pointerdown',()=>cursor.classList.add('is-down'));
  document.addEventListener('pointerup',()=>cursor.classList.remove('is-down'));
  document.addEventListener('pointerleave',hide);
  document.addEventListener('keydown',event=>{if(event.key==='Tab')hide();});
  document.addEventListener('visibilitychange',()=>{if(document.hidden)hide();});
  fine.addEventListener('change',mode);reduced.addEventListener('change',mode);mode();
})();
