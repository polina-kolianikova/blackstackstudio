import * as THREE from './vendor/three.module.js';

const MODULE_BASE = new URL('./', import.meta.url);
const ASSET_VERSION = 'center4';
const clamp = (n, a, b) => Math.min(b, Math.max(a, n));
const number = n => String(n).padStart(2, '0');
function matterRank(u,v){let h=(Math.floor(u*38)*1973+Math.floor(v*38)*9277+89173)>>>0;h=Math.imul((h^(h>>>13))>>>0,1274126177)>>>0;h=(h^(h>>>16))>>>0;return(h&65535)/65535;}
const STEP = .86, PITCH = .76, PANEL_W = 5.2, PANEL_H = 2.925;
const VERTEX = `varying vec2 vUv; void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`;
const SCREEN_FRAGMENT = `uniform sampler2D poster;uniform sampler2D film;uniform float filmMix;uniform float saturation;uniform float gain;varying vec2 vUv;
void main(){vec2 q=abs(vUv-.5)-vec2(.485,.475);if(length(max(q,0.))>.018)discard;vec4 p=texture2D(poster,vUv);vec4 v=texture2D(film,vUv);v.rgb=mix(v.rgb/12.92,pow((v.rgb+.055)/1.055,vec3(2.4)),step(vec3(.04045),v.rgb));vec3 c=mix(p.rgb,v.rgb,filmMix);float l=dot(c,vec3(.2126,.7152,.0722));c=mix(vec3(l),c,saturation)*gain;gl_FragColor=vec4(c,1.);
#include <colorspace_fragment>
}`;
function make(tag, name, text) {
  const node = document.createElement(tag);
  if (name) node.className = `bs-spiral__${name}`;
  if (text !== undefined) node.textContent = text;
  return node;
}
function roundRect(w, h, r) {
  const s = new THREE.Shape(), x = -w / 2, y = -h / 2;
  s.moveTo(x+r,y);s.lineTo(x+w-r,y);s.quadraticCurveTo(x+w,y,x+w,y+r);s.lineTo(x+w,y+h-r);s.quadraticCurveTo(x+w,y+h,x+w-r,y+h);s.lineTo(x+r,y+h);s.quadraticCurveTo(x,y+h,x,y+h-r);s.lineTo(x,y+r);s.quadraticCurveTo(x,y,x+r,y);
  return s;
}
function mount(element, options = {}) {
  if (!(element instanceof HTMLElement)) throw new TypeError('A mount element is required');
  const previous = [...element.childNodes], oldClass = element.className, oldHeight = element.style.height;
  const base = new URL(options.base || './', MODULE_BASE), asset = p => { const url=new URL(p,base);if(url.origin===location.origin)url.searchParams.set('v',ASSET_VERSION);return url.href; };
  let destroyed=false, renderReady=false, renderer, scene, camera, environment, pmrem, resizeObserver, intersectionObserver, frame=0, lastTime=0;
  let cases=[], cards=[], slots=[], active=-1, hover=-1, shown=0, target=0, velocity=0, direction=1;
  let width=0, height=0, start=0, travel=0, grid=false, forceGrid=false, idle=4.53333333333, pointerInside=false, inViewport=true, lastVideoSync=0, lastDrawIdle=0, fps=60;
  let knotTexture=null,knotGeometry=null,knotSamples=[];const nodes=[],nodeMatrices=[],cardMatrices=[],curve1=[],curve2=[],protectMatrices=[new THREE.Matrix4(),new THREE.Matrix4(),new THREE.Matrix4()];const MATTER_PERIOD=13.3333333333;
  const reduced=matchMedia('(prefers-reduced-motion: reduce)'), cleanup=[], textures=new Set(), geometries=new Set(), materials=new Set(), occluders=[];
  let language=options.language||'ru';
  const copy={
    ru:{list:'Списком',space:'В пространстве',label:'Проекты и концепты',hint:'Прокрутите, чтобы исследовать ↓',edition:'15 проектов и концептов / 2026',open:'Открыть сайт',previous:'Предыдущий проект',next:'Следующий проект',nav:'Выбор проекта',concept:'концепт',full:'под ключ',launch:'в запуске',error:'Не удалось загрузить проекты. Обновите страницу.'},
    en:{list:'View as list',space:'Spatial view',label:'Projects and concepts',hint:'Scroll to explore ↓',edition:'15 projects and concepts / 2026',open:'Open website',previous:'Previous project',next:'Next project',nav:'Choose a project',concept:'concept',full:'full delivery',launch:'launching',error:'Projects could not load. Please refresh the page.'},
    uk:{list:'Списком',space:'У просторі',label:'Проєкти та концепти',hint:'Прокрутіть, щоб дослідити ↓',edition:'15 проєктів і концептів / 2026',open:'Відкрити сайт',previous:'Попередній проєкт',next:'Наступний проєкт',nav:'Вибір проєкту',concept:'концепт',full:'під ключ',launch:'у запуску',error:'Не вдалося завантажити проєкти. Оновіть сторінку.'}
  };
  const txt=key=>(copy[language]||copy.ru)[key];
  const caseStatus=item=>txt(item.status==='концепт'?'concept':item.status==='под ключ'?'full':'launch');
  const raycaster=new THREE.Raycaster(), pointer=new THREE.Vector2(), point=new THREE.Vector3(), look=new THREE.Vector3();
  const rememberGeometry=g=>(geometries.add(g),g), rememberMaterial=m=>(materials.add(m),m);
  element.replaceChildren();element.classList.add('bs-spiral');
  const sticky=make('section','sticky'), stage=make('div','stage'), links=make('div','links'), top=make('div','top'), brand=make('div');
  brand.append(make('span','brand','BLACKSTACK'),make('span','edition','SELECTED WORK / 2026'));
  const view=make('button','view','Списком');view.type='button';top.append(brand,view);
  const caption=make('div','caption'), meta=make('div','meta'), domain=make('span'), status=make('span','status');meta.append(domain,status);
  const title=make('a','title'), titleText=make('span');title.target='_blank';title.rel='noopener noreferrer';title.append(titleText,make('span','','↗'));caption.append(meta,title);
  const nav=make('nav','nav'), count=make('span','count'), arrows=make('div','arrows'), prev=make('button','arrow','↑'), next=make('button','arrow','↓');
  nav.setAttribute('aria-label','Выбор проекта');prev.type=next.type='button';prev.setAttribute('aria-label','Предыдущий проект');next.setAttribute('aria-label','Следующий проект');arrows.append(prev,next);nav.append(count,arrows);
  const track=make('div','track'), progress=make('span'), list=make('div','grid');track.append(progress);
  stage.append(links);sticky.append(stage,top,make('div','label','Избранные проекты'),make('div','hint','Прокрутите, чтобы исследовать ↓'),caption,nav,track,list);element.append(sticky);
  function listen(node,event,fn,settings){node.addEventListener(event,fn,settings);cleanup.push(()=>node.removeEventListener(event,fn,settings));}
  function request(){if(renderReady&&!frame&&!destroyed&&!grid&&!document.hidden&&inViewport)frame=requestAnimationFrame(tick);}
  function radius(t){return 6.2;}
  function worldAt(t,out=new THREE.Vector3()){const a=t*STEP,r=radius(t);return out.set(Math.sin(a)*r,-t*PITCH,Math.cos(a)*r);}
  function seek(i){if(!grid)window.scrollTo({top:start+clamp(i,0,cases.length-1)/Math.max(1,cases.length-1)*travel,behavior:'instant'});}
  function readScroll(){
    if(grid)return;
    const update=clamp((scrollY-start)/Math.max(1,travel),0,1)*Math.max(0,cases.length-1),delta=update-target;
    if(delta&&Math.sign(delta)!==direction){direction=Math.sign(delta);syncVideos();}
    target=update;request();
  }
  function clearSlot(slot){
    slot.token++;slot.video.onloadeddata=null;slot.video.onerror=null;slot.video.pause();slot.video.removeAttribute('src');slot.video.load();slot.texture?.dispose();textures.delete(slot.texture);slot.texture=null;slot.index=-1;slot.ready=false;
  }
  function assignSlot(slot,index){
    clearSlot(slot);if(!cases[index]?.video)return;
    slot.index=index;const token=slot.token;slot.video.src=asset(cases[index].video);slot.video.preload='auto';slot.video.load();
    slot.texture=new THREE.VideoTexture(slot.video);slot.texture.colorSpace=THREE.SRGBColorSpace;slot.texture.minFilter=THREE.LinearFilter;slot.texture.magFilter=THREE.LinearFilter;textures.add(slot.texture);
    const ready=()=>{if(destroyed||slot.token!==token||slot.index!==index)return;slot.ready=true;request();};
    slot.video.onloadeddata=()=>{if(slot.video.requestVideoFrameCallback&&!slot.video.paused)slot.video.requestVideoFrameCallback(ready);else if(slot.video.readyState>=2)ready();};
    slot.video.onerror=()=>{if(slot.token!==token)return;slot.ready=false;slot.video.pause();request();};
  }
  function syncVideos(){
    if(destroyed||!slots.length||active<0)return;
    const playing=!grid&&!document.hidden&&inViewport;
    if(!playing){slots.forEach(slot=>slot.video.pause());return;}
    const candidates=[active,active+direction,active-direction].filter(i=>i>=0&&i<cases.length);
    const desired=candidates.slice(0,width<=650?2:3);
    desired.forEach(index=>{
      if(slots.some(s=>s.index===index))return;
      const slot=slots.find(s=>s.index===-1)||slots.filter(s=>!desired.includes(s.index)).sort((a,b)=>Math.abs(b.index-shown)-Math.abs(a.index-shown))[0];
      if(slot)assignSlot(slot,index);
    });
    slots.forEach(slot=>{
      if(slot.index<0)return;
      const visible=Math.abs(slot.index-shown)<1.3;
      if(visible&&slot.video.paused){
        const token=slot.token;
        slot.video.play().then(()=>{
          if(slot.token!==token||grid||document.hidden||!inViewport)return;
          const ready=()=>{if(slot.token===token){slot.ready=true;request();}};
          if(slot.video.requestVideoFrameCallback)slot.video.requestVideoFrameCallback(ready);else if(slot.video.readyState>=2)ready();
        }).catch(()=>{});
      }else if(!visible&&!slot.video.paused)slot.video.pause();
    });
  }
  function select(index){
    if(active===index)return;active=index;const item=cases[index];
    titleText.textContent=item.title;title.href=item.url;title.setAttribute('aria-label',`${item.title}, ${txt('open')}`);domain.textContent=item.domain||new URL(item.url).hostname;status.textContent=caseStatus(item);
    count.replaceChildren(document.createTextNode(number(index+1)),make('em','',` / ${number(cases.length)}`));prev.disabled=index===0;next.disabled=index===cases.length-1;element.dataset.active=item.slug;syncVideos();
  }
  function resize(){
    if(destroyed||!cases.length)return;
    const oldHeight=height,saved=shown,inside=scrollY>=start&&scrollY<=start+travel;width=element.clientWidth;height=innerHeight;start=element.getBoundingClientRect().top+scrollY;travel=(cases.length-1)*.60*height;element.style.height=`${height+travel}px`;
    if(oldHeight&&oldHeight!==height&&inside&&!grid){shown=target=saved;velocity=0;window.scrollTo({top:start+saved/Math.max(1,cases.length-1)*travel,behavior:'instant'});}
    if(renderer){renderer.setSize(width,height);renderer.setPixelRatio(Math.min(devicePixelRatio,width<=650?1.35:1.6));camera.aspect=width/height;camera.fov=width<=650?64:46;camera.updateProjectionMatrix();const particles=scene.userData.particles;if(particles)particles.geometry.setDrawRange(0,Math.min(particles.geometry.attributes.position.count,width<=650?22400:42000));}
    readScroll();draw();
  }
  function updateCamera(){
    const mobile=width<=650,a=shown*STEP,r=mobile?16.4:14.1;
    camera.position.set(Math.sin(a)*r,-shown*PITCH+.62,Math.cos(a)*r);
    look.set(0,-shown*PITCH+.12,0);
    camera.lookAt(look);camera.updateMatrixWorld();
    element.dataset.camera=`${camera.position.x.toFixed(3)},${camera.position.y.toFixed(3)},${camera.position.z.toFixed(3)}`;
    element.dataset.axisX=String(look.clone().project(camera).x*.5+.5);element.dataset.orbitRadius=String(r);
  }
  function updateLivingScene(){
    cards.forEach((card,i)=>{
      if(!card.group)return;
      worldAt(i,card.group.position);
      card.group.position.y+=Math.sin(idle*.7+i*1.71)*.035;
      card.group.position.x+=Math.sin(idle*.39+i*2.1)*.025;
      card.group.rotation.set(-.025+Math.sin(idle*.43+i)*.008,i*STEP+Math.sin(idle*.31+i*1.3)*.008,-.012*Math.sin(i*.8)+Math.sin(idle*.37+i*2.4)*.006);
    });
    nodes.forEach((node,j)=>{
      node.userData.solid.value=1;
      node.material.emissiveIntensity=.19+Math.min(.055,Math.abs(velocity)*.012);
      node.position.copy(node.userData.home);
      node.position.x+=Math.sin(idle*.31+j*.37)*.045;node.position.z+=Math.cos(idle*.27+j*.4)*.05;
      node.rotation.set(node.userData.tilt+Math.sin(idle*.23+j*.4)*.018,node.userData.turn+Math.sin(idle*.21+j*.35)*.035,node.userData.roll+Math.cos(idle*.27+j*.4)*.022);
      const breath=1+Math.sin(idle*.57+j*.45)*.018;node.scale.copy(node.userData.size).multiplyScalar(breath);
    });
    scene.updateMatrixWorld(true);
    nodes.forEach((node,j)=>{nodeMatrices[j].copy(node.matrixWorld);});
    cards.forEach((card,i)=>{
      cardMatrices[i].copy(card.group.matrixWorld);
      const j=Math.min(nodes.length-1,Math.floor(i/2)),node=nodes[j],left=new THREE.Vector3(-1,0,0).applyQuaternion(card.group.quaternion),outward=new THREE.Vector3(0,0,1).applyQuaternion(card.group.quaternion);
      curve1[i].copy(node.position).addScaledVector(left,width<=650?2.9:3.7).addScaledVector(outward,1.6);curve1[i].y=Math.max(node.position.y+.8,-i*PITCH+3.0)+Math.sin(idle*.37+i)*.1;
      curve2[i].set(-PANEL_W*.5,.82,.1).applyMatrix4(card.group.matrixWorld).addScaledVector(left,.85).addScaledVector(outward,-.15);curve2[i].y+=.7;
    });
    for(let k=0;k<3;k++){const i=clamp(Math.round(shown)+k-1,0,cases.length-1);protectMatrices[k].copy(cardMatrices[i]).invert();}
    const field=scene.userData.particles;
    if(field){field.material.uniforms.progress.value=shown;field.material.uniforms.speed.value=Math.min(1,Math.abs(velocity)/3);field.material.uniforms.time.value=idle;field.material.uniforms.resolution.value=height;field.material.uniforms.pixelRatio.value=renderer.getPixelRatio();}
    const j=Math.min(nodes.length-1,Math.floor(Math.max(0,active)/2));element.dataset.matterPhase=((idle/MATTER_PERIOD+j*.173)%1).toFixed(3);element.dataset.particleCount=String(field?.geometry.drawRange.count||0);element.dataset.matterPeriod=String(MATTER_PERIOD);
  }
  const corners=[[-1,-1],[1,-1],[1,1],[-1,1]];
  function projectLinks(){
    if(!renderReady||!camera)return;
    cards.forEach((card,i)=>{
      if(!card.group||!card.screen||!card.backScreen){card.visible=false;card.link.hidden=true;card.link.tabIndex=-1;return;}
      const distance=Math.abs(i-shown);card.group.visible=distance<5.5;
      const frontCenter=card.screen.getWorldPosition(point).clone(),normal=new THREE.Vector3(0,0,1).applyQuaternion(card.group.quaternion),front=normal.dot(camera.position.clone().sub(frontCenter))>0;
      const surface=front?card.screen:card.backScreen,center=surface.getWorldPosition(point).clone();
      const pts=corners.map(([x,y])=>new THREE.Vector3(x*PANEL_W/2,y*PANEL_H/2,0).applyMatrix4(surface.matrixWorld).project(camera));
      const px=pts.map(p=>[(p.x*.5+.5)*width,(-p.y*.5+.5)*height]);
      const minX=Math.min(...px.map(p=>p[0])),maxX=Math.max(...px.map(p=>p[0])),minY=Math.min(...px.map(p=>p[1])),maxY=Math.max(...px.map(p=>p[1]));
      const visible=card.group.visible&&pts.every(p=>p.z>-1&&p.z<1)&&maxX>0&&minX<width&&maxY>80&&minY<height-115&&maxX-minX>35;
      card.link.hidden=!visible;card.visible=visible;if(!visible){card.link.tabIndex=-1;return;}
      const w=maxX-minX,h=maxY-minY;card.bounds={minX,maxX,minY,maxY,w,h};Object.assign(card.link.style,{left:`${minX}px`,top:`${minY}px`,width:`${w}px`,height:`${h}px`,clipPath:`polygon(${px.map(p=>`${(p[0]-minX)/w*100}% ${(p[1]-minY)/h*100}%`).join(',')})`,zIndex:String(Math.round(1000-center.distanceTo(camera.position)*10)),pointerEvents:'auto'});
      card.link.tabIndex=distance<1.6&&minX>=-w*.2&&maxX<=width+w*.2?0:-1;
      card.link.setAttribute('aria-hidden',card.link.tabIndex===0?'false':'true');
    });
    if(pointerInside)hitPointer();
  }
  function coreHitVisible(){return true;}
  function hitPointer(){
    if(!renderReady||!camera||grid)return -1;
    raycaster.setFromCamera(pointer,camera);const hits=raycaster.intersectObjects(occluders,false).filter(hit=>hit.object.visible&&hit.object.parent?.visible!==false&&(!hit.object.userData.core||coreHitVisible(hit)));
    const hit=hits[0],index=hit?.object.userData.caseIndex??-1;
    hover=index;
    cards.forEach((card,i)=>{if(card.visible)card.link.style.pointerEvents=i===index?'auto':'none';});
    return index;
  }
  function pointerAt(event){const box=stage.getBoundingClientRect();pointer.set((event.clientX-box.left)/width*2-1,-(event.clientY-box.top)/height*2+1);pointerInside=true;hitPointer();}
  function positionCaption(){
    const box=cards[active]?.bounds;if(!box)return;
    const mobile=width<=650,captionWidth=Math.min(mobile?width-42:440,Math.max(240,box.w));
    const x=clamp(box.minX, mobile?21:38, width-captionWidth-(mobile?21:38));
    const y=clamp(box.maxY+17,mobile?height*.53:height*.5,height-(mobile?166:135));
    caption.style.left=`${x}px`;caption.style.top=`${y}px`;caption.style.width=`${captionWidth}px`;
    const distance=Math.abs(active-shown),fade=1-THREE.MathUtils.smoothstep(distance,.25,.5);
    caption.style.opacity=String(.4+.6*fade);
  }
  function draw(){
    if(!renderReady||!renderer||grid||!cases.length)return;
    if(active<0||Math.abs(shown-active)>.56)select(clamp(Math.round(shown),0,cases.length-1));
    updateCamera();updateLivingScene();
    const blend=1-Math.exp(-Math.max(.001,idle-lastDrawIdle)*12);lastDrawIdle=idle;
    cards.forEach((card,i)=>{
      if(!card.screen)return;
      const slot=slots.find(s=>s.index===i),uniforms=card.screen.material.uniforms;
      uniforms.film.value=slot?.texture||card.poster;
      uniforms.filmMix.value+=((slot?.ready?1:0)-uniforms.filmMix.value)*blend;
      uniforms.saturation.value=i===active||i===hover?1:0;uniforms.gain.value=i===active?1:clamp(1-Math.abs(i-shown)*.07,.55,.94);
    });
    if(scene.userData.particles){scene.userData.particles.material.uniforms.time.value=idle;scene.userData.particles.material.uniforms.resolution.value=height;scene.userData.particles.material.uniforms.pixelRatio.value=renderer.getPixelRatio();}
    projectLinks();positionCaption();renderer.render(scene,camera);progress.style.transform=`scaleX(${shown/Math.max(1,cases.length-1)})`;
    element.dataset.progress=shown.toFixed(4);element.dataset.target=target.toFixed(4);element.dataset.velocity=velocity.toFixed(4);element.dataset.idle=idle.toFixed(2);element.dataset.fps=fps.toFixed(1);element.dataset.playing=slots.filter(s=>!s.video.paused).map(s=>s.index).join(',');
  }
  function tick(time){
    frame=0;const rawDt=(time-(lastTime||time-16))/1000,dt=Math.min(rawDt,.05);lastTime=time;idle+=dt;fps+=(1/Math.max(.001,rawDt)-fps)*.035;
    const error=target-shown,omega=28,a=omega*error-velocity,decay=Math.exp(-omega*dt);
    shown=clamp(target-(error+a*dt)*decay,0,Math.max(0,cases.length-1));velocity=(velocity+omega*a*dt)*decay;
    if(Math.abs(target-shown)<.00001&&Math.abs(velocity)<.0002){shown=target;velocity=0;}
    if(time-lastVideoSync>120){syncVideos();lastVideoSync=time;}
    draw();request();
  }
  function switchView(value){grid=value||forceGrid||reduced.matches;element.classList.toggle('is-grid',grid);view.textContent=txt(grid?'space':'list');view.hidden=forceGrid||reduced.matches;if(frame)cancelAnimationFrame(frame);frame=0;lastTime=0;syncVideos();if(!grid){resize();request();}}
  function setLanguage(next){
    language=copy[next]?next:'ru';view.textContent=txt(grid?'space':'list');
    sticky.querySelector('.bs-spiral__label').textContent=txt('label');sticky.querySelector('.bs-spiral__hint').textContent=txt('hint');sticky.querySelector('.bs-spiral__edition').textContent=txt('edition');
    prev.setAttribute('aria-label',txt('previous'));nextButtonLabel();nav.setAttribute('aria-label',txt('nav'));
    [...list.children].forEach((link,i)=>{link.querySelector('.bs-spiral__grid-status').textContent=caseStatus(cases[i]);});
    [...links.children].forEach((link,i)=>{link.setAttribute('aria-label',`${cases[i].title}. ${caseStatus(cases[i])}. ${txt('open')}`);});
    if(active>=0){const saved=active;active=-1;select(saved);}
  }
  function nextButtonLabel(){next.setAttribute('aria-label',txt('next'));}
  function buildCase(item,i){
    const link=make('a','card');link.href=item.url;link.target='_blank';link.rel='noopener noreferrer';link.hidden=true;link.tabIndex=-1;link.setAttribute('aria-label',`${number(i+1)}. ${item.title}. ${item.status}. Открыть сайт`);link.append(make('span','sr-only',item.title));links.append(link);listen(link,'focus',()=>{if(link.matches(':focus-visible')&&i!==active)seek(i);});
    const gridLink=make('a','grid-card');gridLink.href=item.url;gridLink.target='_blank';gridLink.rel='noopener noreferrer';const img=document.createElement('img');img.src=asset(item.poster);img.alt=`Сайт ${item.title}`;img.loading='lazy';img.decoding='async';const gridTitle=make('div','grid-title');gridTitle.append(make('span','',item.title),make('span','','↗'));gridLink.append(img,gridTitle,make('div','grid-status',`${number(i+1)} / ${item.status}`));list.append(gridLink);
    return{link,poster:null,group:null,screen:null,backScreen:null,visible:false};
  }
  function makeEnvironment(){
    pmrem=new THREE.PMREMGenerator(renderer);const studio=new THREE.Scene();studio.background=new THREE.Color(.12,.12,.12);
    const positions=[[7,3,0,0,-Math.PI/2,0,5,15],[-7,0,0,0,Math.PI/2,0,4,18],[0,8,0,Math.PI/2,0,0,15,5],[0,-8,0,-Math.PI/2,0,0,8,3],[0,0,-8,0,0,0,3,15],[3,0,8,0,Math.PI,0,3,15]];
    positions.forEach(([x,y,z,rx,ry,rz,w,h],i)=>{const mesh=new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshBasicMaterial({color:i===2?0xffffff:0xb8b8b8,side:THREE.DoubleSide}));mesh.position.set(x,y,z);mesh.rotation.set(rx,ry,rz);studio.add(mesh);});
    environment=pmrem.fromScene(studio,.04);scene.environment=environment.texture;studio.traverse(o=>{o.geometry?.dispose();o.material?.dispose();});
    new THREE.TextureLoader().load(asset('media/chrome-studio.webp'),tex=>{
      if(destroyed){tex.dispose();return;}tex.colorSpace=THREE.SRGBColorSpace;tex.mapping=THREE.EquirectangularReflectionMapping;const nextEnv=pmrem.fromEquirectangular(tex);tex.dispose();environment.dispose();environment=nextEnv;scene.environment=nextEnv.texture;request();
    },undefined,()=>{});
  }
  async function makeCore(){
    knotTexture=await new THREE.TextureLoader().loadAsync(asset('media/liquid-knot.webp'));
    if(destroyed){knotTexture.dispose();return;}
    knotTexture.colorSpace=THREE.SRGBColorSpace;knotTexture.wrapS=knotTexture.wrapT=THREE.ClampToEdgeWrapping;knotTexture.anisotropy=Math.min(renderer.capabilities.getMaxAnisotropy(),8);textures.add(knotTexture);
    const nx=96,ny=88,canvas=document.createElement('canvas');canvas.width=nx+1;canvas.height=ny+1;
    const context=canvas.getContext('2d',{willReadFrequently:true});context.drawImage(knotTexture.image,0,0,nx+1,ny+1);const pixels=context.getImageData(0,0,nx+1,ny+1).data;
    const size=(nx+1)*(ny+1),mask=new Uint8Array(size),distance=new Float32Array(size),positions=[],uvs=[],indices=[];
    for(let k=0;k<size;k++)mask[k]=pixels[k*4+3]>96?1:0;
    const morph=(input,dilate)=>{
      const out=new Uint8Array(size),offsets=[[0,0],[-1,0],[1,0],[0,-1],[0,1]];
      for(let y=0;y<=ny;y++)for(let x=0;x<=nx;x++){let value=dilate?0:1;for(const [dx,dy] of offsets){const xx=x+dx,yy=y+dy,v=xx>=0&&xx<=nx&&yy>=0&&yy<=ny?input[yy*(nx+1)+xx]:0;value=dilate?Math.max(value,v):Math.min(value,v);}out[y*(nx+1)+x]=value;}return out;
    };
    mask.set(morph(morph(morph(morph(mask,false),true),true),false));
    const seen=new Uint8Array(size),components=[];
    for(let k=0;k<size;k++){if(!mask[k]||seen[k])continue;const component=[],queue=[k];seen[k]=1;while(queue.length){const q=queue.pop();component.push(q);const x=q%(nx+1),y=Math.floor(q/(nx+1));for(const [xx,yy] of [[x-1,y],[x+1,y],[x,y-1],[x,y+1]]){const n=yy*(nx+1)+xx;if(xx>=0&&xx<=nx&&yy>=0&&yy<=ny&&mask[n]&&!seen[n]){seen[n]=1;queue.push(n);}}}components.push(component);}
    const largest=Math.max(...components.map(c=>c.length));components.forEach(c=>{if(c.length<Math.max(36,largest*.015))c.forEach(k=>{mask[k]=0;});});
    const fullCell=(x,y)=>[y*(nx+1)+x,y*(nx+1)+x+1,(y+1)*(nx+1)+x,(y+1)*(nx+1)+x+1].every(k=>mask[k]);
    for(let pass=0;pass<3;pass++)for(let y=0;y<ny-1;y++)for(let x=0;x<nx-1;x++){
      const a=fullCell(x,y),b=fullCell(x+1,y),c=fullCell(x,y+1),d=fullCell(x+1,y+1);let fill=-1;
      if(a&&d&&!b&&!c)fill=y*(nx+1)+x+1;else if(b&&c&&!a&&!d)fill=y*(nx+1)+x;
      if(fill>=0){mask[fill]=mask[fill+1]=mask[fill+nx+1]=mask[fill+nx+2]=1;}
    }
    for(let k=0;k<size;k++)distance[k]=mask[k]?30:0;
    for(let pass=0;pass<2;pass++){
      for(let q=0;q<size;q++){const k=pass?size-1-q:q,x=k%(nx+1),y=Math.floor(k/(nx+1));if(!mask[k])continue;let d=distance[k];if(x>0)d=Math.min(d,distance[k-1]+1);if(x<nx)d=Math.min(d,distance[k+1]+1);if(y>0)d=Math.min(d,distance[k-nx-1]+1);if(y<ny)d=Math.min(d,distance[k+nx+1]+1);if(x>0&&y>0)d=Math.min(d,distance[k-nx-2]+Math.SQRT2);if(x<nx&&y>0)d=Math.min(d,distance[k-nx]+Math.SQRT2);if(x>0&&y<ny)d=Math.min(d,distance[k+nx]+Math.SQRT2);if(x<nx&&y<ny)d=Math.min(d,distance[k+nx+2]+Math.SQRT2);distance[k]=d;}
    }
    const roundedDistance=new Float32Array(size);
    for(let y=0;y<=ny;y++)for(let x=0;x<=nx;x++){
      const k=y*(nx+1)+x;if(!mask[k])continue;let sum=0,weight=0;
      for(let dy=-1;dy<=1;dy++)for(let dx=-1;dx<=1;dx++){const xx=x+dx,yy=y+dy;if(xx<0||xx>nx||yy<0||yy>ny)continue;const q=yy*(nx+1)+xx,w=(dx===0?2:1)*(dy===0?2:1);sum+=distance[q]*w;weight+=w;}
      roundedDistance[k]=sum/weight;
    }
    for(let side=0;side<2;side++)for(let y=0;y<=ny;y++)for(let x=0;x<=nx;x++){
      const k=y*(nx+1)+x;
      const px=(x/nx-.5)*3.95,py=(.5-y/ny)*3.6,thickness=.045+.29*Math.sqrt(roundedDistance[k]),bend=.43*Math.sin(px*1.5+py*.7)+.19*Math.cos(py*2.1);
      positions.push(px,py,bend+(side?-thickness:thickness));uvs.push(x/nx,1-y/ny);
    }
    const occupied=(x,y)=>x>=0&&x<nx&&y>=0&&y<ny&&[y*(nx+1)+x,y*(nx+1)+x+1,(y+1)*(nx+1)+x,(y+1)*(nx+1)+x+1].every(k=>mask[k]);
    const wall=(a,b)=>indices.push(a,a+size,b,b,a+size,b+size);
    for(let y=0;y<ny;y++)for(let x=0;x<nx;x++){
      if(!occupied(x,y))continue;const a=y*(nx+1)+x,b=a+1,c=a+nx+1,d=c+1;
      indices.push(a,c,b,b,c,d,a+size,b+size,c+size,b+size,d+size,c+size);
      if(!occupied(x,y-1))wall(b,a);if(!occupied(x,y+1))wall(c,d);if(!occupied(x-1,y))wall(a,c);if(!occupied(x+1,y))wall(d,b);
    }
    const neighbors=Array.from({length:positions.length/3},()=>new Set());
    for(let k=0;k<indices.length;k+=3){const a=indices[k],b=indices[k+1],c=indices[k+2];neighbors[a].add(b).add(c);neighbors[b].add(a).add(c);neighbors[c].add(a).add(b);}
    const roundedPositions=new Float32Array(positions),relaxedPositions=new Float32Array(positions.length);
    for(let pass=0;pass<6;pass++){
      const amount=pass%2?-.44:.42;relaxedPositions.set(roundedPositions);
      neighbors.forEach((adj,k)=>{if(!adj.size)return;let x=0,y=0,z=0;adj.forEach(q=>{x+=roundedPositions[q*3];y+=roundedPositions[q*3+1];z+=roundedPositions[q*3+2];});const n=adj.size;relaxedPositions[k*3]+=(x/n-roundedPositions[k*3])*amount;relaxedPositions[k*3+1]+=(y/n-roundedPositions[k*3+1])*amount;relaxedPositions[k*3+2]+=(z/n-roundedPositions[k*3+2])*amount;});
      roundedPositions.set(relaxedPositions);
    }
    knotGeometry=rememberGeometry(new THREE.BufferGeometry());knotGeometry.setAttribute('position',new THREE.Float32BufferAttribute(roundedPositions,3));knotGeometry.setAttribute('uv',new THREE.Float32BufferAttribute(uvs,2));knotGeometry.setIndex(indices);knotGeometry.computeVertexNormals();
    let area=0;const pa=knotGeometry.attributes.position,ta=new THREE.Vector3(),tb=new THREE.Vector3(),tc=new THREE.Vector3();
    for(let k=0;k<indices.length;k+=3){ta.fromBufferAttribute(pa,indices[k]);tb.fromBufferAttribute(pa,indices[k+1]);tc.fromBufferAttribute(pa,indices[k+2]);const weight=tb.clone().sub(ta).cross(tc.clone().sub(ta)).length()*.5;if(weight>1e-8){area+=weight;knotSamples.push({a:indices[k],b:indices[k+1],c:indices[k+2],area});}}
    const totalNodes=Math.ceil(cases.length/2);
    for(let j=0;j<totalNodes;j++){
      const solid={value:1},material=rememberMaterial(new THREE.MeshStandardMaterial({color:0xb8bdc1,metalness:.87,roughness:.28,envMapIntensity:2.7,emissive:0x242424,emissiveIntensity:.19,side:THREE.DoubleSide}));
      const node=new THREE.Mesh(knotGeometry,material),turn=j*.72+.18*Math.sin(j*.8),tilt=.12*Math.sin(j*.9),roll=.22*Math.cos(j*.75);
      node.userData={core:true,solid,home:new THREE.Vector3(Math.sin(j*.92)*.42,2.15-j*PITCH*2,Math.cos(j*.83)*.38),turn,tilt,roll,size:new THREE.Vector3(1.03+.12*Math.sin(j*1.3),.91+.045*Math.cos(j*1.7),1.25+.12*Math.sin(j*1.1))};
      scene.add(node);occluders.push(node);nodes.push(node);nodeMatrices.push(new THREE.Matrix4());
    }
    for(let i=0;i<cases.length;i++){cardMatrices.push(new THREE.Matrix4());curve1.push(new THREE.Vector3());curve2.push(new THREE.Vector3());}
    const key=new THREE.DirectionalLight(0xffffff,3.2);key.position.set(8,6,10);scene.add(key);const fill=new THREE.DirectionalLight(0xffffff,1.6);fill.position.set(-8,-2,-6);scene.add(fill);scene.add(new THREE.HemisphereLight(0xe5e5e5,0x111111,.9));
  }
  function makeParticles(){
    const count=42000,positions=new Float32Array(count*3),clouds=new Float32Array(count*3),seeds=new Float32Array(count*4),owners=new Float32Array(count*2),ranks=new Float32Array(count);let state=78191;const random=()=>{state=(1664525*state+1013904223)>>>0;return state/4294967296;};
    const source=knotGeometry.attributes.position,uv=knotGeometry.attributes.uv,area=knotSamples[knotSamples.length-1].area;
    const a=new THREE.Vector3(),b=new THREE.Vector3(),c=new THREE.Vector3();
    for(let i=0;i<count;i++){
      const owner=Math.floor(random()*cases.length),node=Math.min(nodes.length-1,Math.floor(owner/2));owners[i*2]=owner;owners[i*2+1]=node;
      const pick=random()*area;let lo=0,hi=knotSamples.length-1;while(lo<hi){const mid=(lo+hi)>>1;if(knotSamples[mid].area<pick)lo=mid+1;else hi=mid;}const triangle=knotSamples[lo];
      const root=Math.sqrt(random()),v=random(),wa=1-root,wb=root*(1-v),wc=root*v;a.fromBufferAttribute(source,triangle.a);b.fromBufferAttribute(source,triangle.b);c.fromBufferAttribute(source,triangle.c);a.multiplyScalar(wa).addScaledVector(b,wb).addScaledVector(c,wc);positions.set([a.x,a.y,a.z],i*3);
      const u=uv.getX(triangle.a)*wa+uv.getX(triangle.b)*wb+uv.getX(triangle.c)*wc,w=uv.getY(triangle.a)*wa+uv.getY(triangle.b)*wb+uv.getY(triangle.c)*wc;ranks[i]=matterRank(u,w);
      const seed=[random(),random(),random(),random()];seeds.set(seed,i*4);
      const family=Math.floor(seed[3]*3),angle=(seed[0]-.5)*(family===1?4.5:3.9)+node*(family===1?-.6:1.1),r=.65+seed[0]*2.55+(seed[1]-.5)*.6;let dx,dy,dz;
      if(family===0){dx=Math.cos(angle)*r*1.25-1.8;dy=Math.sin(angle)*r*.65-1.4;dz=Math.sin(angle)*r*.65+(seed[2]-.5)*1.8;}
      else if(family===1){dx=Math.cos(angle)*r+1.5;dy=Math.sin(angle)*r*.55-2.1;dz=Math.cos(angle)*r*.85+(seed[2]-.5)*1.4-1.0;}
      else{dx=Math.sin(angle)*r*.7+.2;dy=Math.cos(angle)*r*.9+.1;dz=Math.sin(angle)*r-2.0;}
      clouds.set([a.x*.3+dx,a.y*.3+dy,a.z*.35+dz],i*3);
    }
    const geometry=rememberGeometry(new THREE.BufferGeometry());geometry.setAttribute('position',new THREE.BufferAttribute(positions,3));geometry.setAttribute('cloud',new THREE.BufferAttribute(clouds,3));geometry.setAttribute('seed',new THREE.BufferAttribute(seeds,4));geometry.setAttribute('owner',new THREE.BufferAttribute(owners,2));geometry.setAttribute('rank',new THREE.BufferAttribute(ranks,1));geometry.setDrawRange(0,width<=650?22400:42000);
    const material=rememberMaterial(new THREE.ShaderMaterial({transparent:true,depthWrite:false,depthTest:true,blending:THREE.NormalBlending,uniforms:{time:{value:0},progress:{value:0},speed:{value:0},resolution:{value:height},pixelRatio:{value:renderer.getPixelRatio()},sources:{value:nodeMatrices},cards:{value:cardMatrices},curve1:{value:curve1},curve2:{value:curve2},protect:{value:protectMatrices}},vertexShader:`
      attribute vec3 cloud;attribute vec4 seed;attribute vec2 owner;attribute float rank;
      uniform float time;uniform float progress;uniform float speed;uniform float resolution;uniform float pixelRatio;uniform mat4 sources[${Math.ceil(cases.length/2)}];uniform mat4 cards[${cases.length}];uniform vec3 curve1[${cases.length}];uniform vec3 curve2[${cases.length}];uniform mat4 protect[3];varying float vAlpha;varying float vStreak;varying float vHalo;
      float ease(float x){x=clamp(x,0.,1.);return x*x*x*(x*(x*6.-15.)+10.);}vec3 bezier(vec3 a,vec3 b,vec3 c,vec3 d,float t){float m=1.-t;return a*m*m*m+b*3.*m*m*t+c*3.*m*t*t+d*t*t*t;}
      void main(){int id=int(owner.x+.5),node=int(owner.y+.5);float phase=fract(time*.075+owner.y*.173+rank*.075);float focus=1.-smoothstep(.35,1.6,abs(owner.x-progress));
      vec3 surface=(sources[node]*vec4(position,1.)).xyz;vec3 plumeLocal=cloud;plumeLocal+=vec3(sin(time*(.23+seed.x*.3)+seed.y*31.),cos(time*(.29+seed.y*.3)+seed.z*29.),sin(time*(.27+seed.z*.3)+seed.x*37.))*(.13+seed.w*.14);vec3 plume=(sources[node]*vec4(plumeLocal,1.)).xyz;
      vec3 edge=seed.y<.5?vec3(-2.63-seed.z*.045,.18+seed.y*2.*1.29,.105):vec3(-2.6+(seed.y-.5)*2.*2.55,1.49+seed.z*.05,.105);vec3 end=(cards[id]*vec4(edge,1.)).xyz;vec3 landed=mix(surface,end,focus);vec3 p;
      if(phase<.18){p=plume;}else if(phase<.4){p=mix(plume,surface,ease((phase-.18)/.22));}else if(phase<.54){p=surface;}else if(phase<.82){vec3 flight=bezier(surface,curve1[id]+vec3((seed.x-.5)*.75,(seed.y-.5)*.35,(seed.z-.5)*.55),curve2[id]+vec3((seed.x-.5)*.3,(seed.y-.5)*.14,(seed.z-.5)*.22),end,ease((phase-.54)/.28));p=mix(surface,flight,focus);}else if(phase<.9){p=landed;}else{vec3 lift=landed+vec3(0.,1.8,0.),returnControl=plume+vec3(0.,1.1,0.);p=bezier(landed,lift,returnControl,plume,ease((phase-.9)/.1));}
      vec4 mv=modelViewMatrix*vec4(p,1.);gl_Position=projectionMatrix*mv;float coarse=smoothstep(.82,1.,seed.z),hold=smoothstep(.22,.4,phase)*(1.-smoothstep(.54,.575,phase)),travel=smoothstep(.53,.58,phase)*(1.-smoothstep(.9,.97,phase)),arrival=smoothstep(.785,.82,phase)*(1.-smoothstep(.9,.97,phase));float size=mix(2.5+seed.x*1.1,7.4,coarse);size=mix(size,.6+seed.x*.3,hold);size=mix(size,1.7+seed.x*.55,travel);size=mix(size,.8+seed.x*.25,arrival);float cssSize=clamp(size*resolution/900.*11./max(6.,-mv.z),.55,5.);vStreak=speed*(1.-hold)*(1.-arrival)*smoothstep(.48,.92,seed.w);vHalo=smoothstep(.985,1.,seed.z)*(1.-hold)*(1.-travel);gl_PointSize=cssSize*pixelRatio*mix(1.,3.2,vStreak)*mix(1.,3.8,vHalo);float depthFade=exp(-max(0.,-mv.z-9.)*.025);float returning=1.-smoothstep(.9,.95,phase)+smoothstep(.97,1.,phase);float brightness=mix(.75,1.,seed.w);float screenMask=1.;for(int k=0;k<3;k++){vec3 local=(protect[k]*vec4(p,1.)).xyz;float inside=(1.-smoothstep(2.52,2.61,abs(local.x)))*(1.-smoothstep(1.38,1.49,abs(local.y)))*smoothstep(.08,.14,local.z);screenMask*=1.-inside;}float landingFade=smoothstep(.84,.90,phase)*(1.-smoothstep(.90,.97,phase));float retained=smoothstep(.78,.85,seed.w);float landedMask=mix(1.,mix(.08,1.,retained),smoothstep(.82,.84,phase));float phaseGain=mix(1.,.075,hold)*mix(1.,.1,landingFade)*landedMask;vAlpha=brightness*depthFade*mix(.88,1.,focus)*returning*screenMask*phaseGain;}
    `,fragmentShader:`varying float vAlpha;varying float vStreak;varying float vHalo;void main(){vec2 q=gl_PointCoord-.5;q.y*=mix(1.,4.5,vStreak);float d=length(q);if(d>.49)discard;float grain=1.-smoothstep(.12,.49,d),halo=exp(-d*d*22.)*.12;float a=mix(grain,halo,vHalo)*vAlpha;gl_FragColor=vec4(vec3(.88),a);}`}));
    const particles=new THREE.Points(geometry,material);particles.frustumCulled=false;scene.add(particles);scene.userData.particles=particles;
  }
  async function makePanels(){
    const loader=new THREE.TextureLoader(),screenGeometry=rememberGeometry(new THREE.PlaneGeometry(PANEL_W,PANEL_H));
    const bodyGeometry=rememberGeometry(new THREE.ExtrudeGeometry(roundRect(PANEL_W+.075,PANEL_H+.075,.12),{depth:.045,bevelEnabled:true,bevelSize:.018,bevelThickness:.018,bevelSegments:3,curveSegments:8,steps:1}));
    const frameShape=roundRect(PANEL_W+.075,PANEL_H+.075,.12),hole=roundRect(PANEL_W+.005,PANEL_H+.005,.1);frameShape.holes.push(hole);
    const frameGeometry=rememberGeometry(new THREE.ExtrudeGeometry(frameShape,{depth:.018,bevelEnabled:true,bevelSize:.012,bevelThickness:.012,bevelSegments:3,curveSegments:8,steps:1}));
    const back=rememberMaterial(new THREE.MeshPhysicalMaterial({color:0x24272a,metalness:.2,roughness:.13,clearcoat:1,clearcoatRoughness:.12,envMapIntensity:1.7,transparent:true,opacity:.82}));const rim=rememberMaterial(new THREE.MeshStandardMaterial({color:0x888b8d,metalness:1,roughness:.17,envMapIntensity:2.4}));
    await Promise.all(cards.map(async(card,i)=>{
      const poster=await loader.loadAsync(asset(cases[i].poster));if(destroyed){poster.dispose();return;}poster.colorSpace=THREE.SRGBColorSpace;poster.minFilter=THREE.LinearFilter;poster.magFilter=THREE.LinearFilter;poster.anisotropy=Math.min(renderer.capabilities.getMaxAnisotropy(),8);textures.add(poster);card.poster=poster;
      const group=new THREE.Group(),body=new THREE.Mesh(bodyGeometry,back),edge=new THREE.Mesh(frameGeometry,rim);edge.position.z=.045;group.add(body,edge);
      const material=rememberMaterial(new THREE.ShaderMaterial({uniforms:{poster:{value:poster},film:{value:poster},filmMix:{value:0},saturation:{value:0},gain:{value:1}},vertexShader:VERTEX,fragmentShader:SCREEN_FRAGMENT,toneMapped:false}));
      const screen=new THREE.Mesh(screenGeometry,material);screen.position.z=.082;screen.userData.caseIndex=i;body.userData.caseIndex=i;edge.userData.caseIndex=i;
      const backMaterial=rememberMaterial(new THREE.ShaderMaterial({uniforms:{poster:{value:poster},film:{value:poster},filmMix:{value:0},saturation:{value:0},gain:{value:.12}},vertexShader:VERTEX,fragmentShader:SCREEN_FRAGMENT,toneMapped:false}));
      const backScreen=new THREE.Mesh(screenGeometry,backMaterial);backScreen.position.z=-.028;backScreen.rotation.y=Math.PI;backScreen.userData.caseIndex=i;
      group.add(screen,backScreen);worldAt(i,group.position);group.rotation.set(-.055,i*STEP,-.022*Math.sin(i*.8));scene.add(group);card.group=group;card.screen=screen;card.backScreen=backScreen;occluders.push(screen,backScreen,body,edge);
    }));
  }
  const ready=Promise.resolve().then(async()=>{
    try{
      cases=options.cases||await fetch(asset('cases.json')).then(r=>{if(!r.ok)throw Error('Cases unavailable');return r.json();});
      if(!Array.isArray(cases)||!cases.length||cases.some(c=>!c.url||!c.title||!c.poster))throw Error('Invalid cases');if(destroyed)return;
      cards=cases.map(buildCase);width=element.clientWidth;height=innerHeight;
      if(!reduced.matches){try{
        renderer=new THREE.WebGLRenderer({alpha:false,antialias:true,powerPreference:'high-performance'});renderer.domElement.className='bs-spiral__webgl';renderer.domElement.setAttribute('aria-hidden','true');renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.1;renderer.setClearColor(0x060708);stage.prepend(renderer.domElement);
        scene=new THREE.Scene();scene.fog=new THREE.FogExp2(0x08090a,.027);camera=new THREE.PerspectiveCamera(46,width/height,.1,90);
        makeEnvironment();await makeCore();if(destroyed)return;makeParticles();await makePanels();if(destroyed)return;renderReady=cards.every(card=>card.group&&card.screen&&card.backScreen);
        slots=Array.from({length:3},()=>{const video=document.createElement('video');video.muted=true;video.loop=true;video.playsInline=true;video.preload='none';video.hidden=true;video.setAttribute('aria-hidden','true');stage.append(video);return{video,index:-1,ready:false,texture:null,token:0};});
        listen(renderer.domElement,'webglcontextlost',event=>{event.preventDefault();forceGrid=true;switchView(true);});
      }catch(error){console.error('Portfolio scene unavailable',error);forceGrid=true;}}
      listen(window,'scroll',readScroll,{passive:true});listen(window,'resize',resize,{passive:true});listen(document,'visibilitychange',()=>{if(document.hidden){if(frame)cancelAnimationFrame(frame);frame=0;}else{lastTime=0;readScroll();}syncVideos();});listen(reduced,'change',()=>{if(!renderer&&!reduced.matches)forceGrid=true;switchView(false);});
      listen(view,'click',()=>{const wasGrid=grid;switchView(!grid);if(wasGrid)seek(active);else window.scrollTo({top:start,behavior:'instant'});});listen(prev,'click',()=>seek(active-1));listen(next,'click',()=>seek(active+1));
      listen(stage,'pointermove',pointerAt,{passive:true});listen(stage,'pointerover',pointerAt,{passive:true});listen(stage,'pointerleave',()=>{pointerInside=false;hover=-1;cards.forEach(c=>{if(c.visible)c.link.style.pointerEvents='auto';});});
      listen(stage,'pointerdown',event=>{pointerAt(event);const link=event.target.closest?.('.bs-spiral__card'),index=cards.findIndex(c=>c.link===link);if(link&&index!==hover)event.preventDefault();},true);
      resizeObserver=new ResizeObserver(()=>{if(element.clientWidth!==width)resize();});resizeObserver.observe(element);
      intersectionObserver=new IntersectionObserver(entries=>{
        if(destroyed)return;
        const visible=entries[0].isIntersecting&&entries[0].intersectionRatio>0;
        if(visible===inViewport)return;
        inViewport=visible;
        if(!visible){if(frame)cancelAnimationFrame(frame);frame=0;lastTime=0;}else readScroll();
        syncVideos();
      },{threshold:0});
      const box=sticky.getBoundingClientRect();inViewport=box.bottom>0&&box.top<innerHeight;
      intersectionObserver.observe(sticky);select(0);switchView(false);resize();return api;
    }catch(error){if(!destroyed)sticky.replaceChildren(make('p','error','Не удалось загрузить проекты. Обновите страницу.'));}
  });
  const api={ready,setLanguage,destroy(){
    destroyed=true;renderReady=false;if(frame)cancelAnimationFrame(frame);cleanup.forEach(fn=>fn());resizeObserver?.disconnect();intersectionObserver?.disconnect();slots.forEach(clearSlot);textures.forEach(t=>t.dispose());geometries.forEach(g=>g.dispose());materials.forEach(m=>m.dispose());environment?.dispose();pmrem?.dispose();renderer?.dispose();renderer?.forceContextLoss();element.replaceChildren(...previous);element.className=oldClass;element.style.height=oldHeight;delete element.dataset.active;delete element.dataset.progress;delete element.dataset.camera;delete element.dataset.target;delete element.dataset.velocity;delete element.dataset.idle;delete element.dataset.fps;delete element.dataset.playing;delete element.dataset.matterPhase;delete element.dataset.particleCount;delete element.dataset.matterPeriod;delete element.dataset.axisX;delete element.dataset.orbitRadius;
  }};
  return api;
}
export const BSSpiral={mount};window.BSSpiral=BSSpiral;
