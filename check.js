
/* ============ EDIT THESE DETAILS ============ */
const CONFIG={
 groom:"Manohar", bride:"Suneetha",
 groomParents:["Mrs. Tanneeru Vijaya","Mr. Rama Mohan"],
 brideParents:["Smt. Pappugiri Pushpavathi","Late Sri Subramanyam"],
 venue:"Rahul Convention Centre, Tiruchanur Road, Tirupati",
 mapUrl:"https://maps.app.goo.gl/oTvj8wwtyne2R8SP8",
 events:[
  {icon:"🌿",name:"Haldi",date:"November 4th, 2026",time:"8 AM onwards"},
  {icon:"🪔",name:"Pellikuthuru Ceremony",date:"November 5th, 2026",time:"7 AM onwards",place:"At our Residence"},
  {icon:"🍽️",name:"Reception & Dinner",date:"November 5th, 2026",time:"7 PM onwards",place:"Rahul Convention Centre, Tiruchanur Road, Tirupati",map:"https://maps.app.goo.gl/oTvj8wwtyne2R8SP8"},
  {icon:"🔥",name:"Wedding",date:"November 6th, 2026",time:"Between 7:00 AM to 8:00 AM",place:"Rahul Convention Centre, Tiruchanur Road, Tirupati",map:"https://maps.app.goo.gl/oTvj8wwtyne2R8SP8"}
 ],
 countdownTo:"2026-11-06T07:00:00+05:30",
 photos:[
  {src:"01.jpg",pos:"50% 45%"},
  {src:"02.jpg",pos:"50% 45%"},
  {src:"03.jpg",pos:"50% 45%"},
  {src:"04.jpg",pos:"50% 45%"},
  {src:"05.jpg",pos:"50% 45%"}
 ],
 music:"music.mp3"             // drop your music file next to index.html
};
/* ============================================ */
const $=s=>document.querySelector(s);
const names=CONFIG.bride+" & "+CONFIG.groom;
document.querySelectorAll('[data-names]').forEach(e=>e.textContent=names);

[$('#gp1').textContent,$('#gp2').textContent]=CONFIG.groomParents;
[$('#bp1').textContent,$('#bp2').textContent]=CONFIG.brideParents;

$('#vName').textContent=CONFIG.venue;$('#mapBtn').href=CONFIG.mapUrl;
$('#evList').innerHTML=CONFIG.events.map((e,i)=>`<div class="card ev reveal"><div class="icon">${e.icon}</div><h3>${e.name}</h3><div class="date">${e.date}</div><div class="small evx">${e.time}</div>${e.place?`<div class="small evx">${e.place}</div>`:''}${e.map?`<div class="evx"><a href="${e.map}" target="_blank" rel="noopener">View on Map</a></div>`:''}</div>`).join('');
/* reveal */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('in')}),{threshold:.2});
document.querySelectorAll('.reveal').forEach(e=>io.observe(e));
/* slideshow: swipe/scroll + autoplay */
const car=$('#car'),dots=$('#dots');let ci=0,pause=false,pt;
car.innerHTML=CONFIG.photos.map(p=>`<div class="sl${p.fit==='contain'?' ctn':''}" ${p.fit==='contain'?`style="--bg:url(${p.src})"`:''}><img src="${p.src}" style="object-position:${p.pos||'50% 50%'}" loading="lazy" alt=""></div>`).join('');
dots.innerHTML=CONFIG.photos.map((_,i)=>`<i data-i="${i}"></i>`).join('');
const go=i=>car.scrollTo({left:i*car.clientWidth,behavior:'smooth'});
const setDot=()=>{ci=Math.round(car.scrollLeft/car.clientWidth);[...dots.children].forEach((d,i)=>d.classList.toggle('on',i===ci))};
car.addEventListener('scroll',setDot);setDot();
dots.onclick=e=>{if(e.target.dataset.i!=null){go(+e.target.dataset.i);pause=true;clearTimeout(pt);pt=setTimeout(()=>pause=false,6000)}};
['touchstart','mousedown','wheel'].forEach(ev=>car.addEventListener(ev,()=>{pause=true;clearTimeout(pt);pt=setTimeout(()=>pause=false,6000)},{passive:true}));
setInterval(()=>{if(!pause)go((ci+1)%CONFIG.photos.length)},3800);
/* countdown */
const T=new Date(CONFIG.countdownTo).getTime();
function tick(){let s=Math.max(0,Math.floor((T-Date.now())/1000));
 $('#cdD').textContent=Math.floor(s/86400);$('#cdH').textContent=Math.floor(s%86400/3600);$('#cdM').textContent=Math.floor(s%3600/60);$('#cdS').textContent=s%60}
tick();setInterval(tick,1000);
/* music */
const aud=$('#aud'),mb=$('#music');aud.src=CONFIG.music;let on=false;
function setMusic(v){on=v;mb.textContent=v?'🔊':'🔇';v?aud.play().catch(()=>{}):aud.pause()}
mb.onclick=()=>setMusic(!on);
const envelopeBtn=$('#envelopeBtn'),envelopeScreen=$('#envelope-screen'),envHint=$('#envHint');let opened=false;
envelopeBtn.addEventListener('click',()=>{if(opened)return;opened=true;envelopeBtn.classList.add('opening');envHint.textContent="Opening…";setMusic(true);
 setTimeout(()=>envelopeScreen.classList.add('hidden'),900);setTimeout(()=>{envelopeScreen.style.display='none'},1600)});
/* falling petals */
const cv=$('#petals'),cx=cv.getContext('2d');let P=[];
function rs(){cv.width=innerWidth;cv.height=innerHeight}rs();addEventListener('resize',rs);
for(let i=0;i<22;i++)P.push({x:Math.random()*innerWidth,y:Math.random()*innerHeight,r:4+Math.random()*5,v:.4+Math.random()*.8,s:Math.random()*6,c:['#f4a6b8','#f8c9d4','#f0b44c'][i%3]});
(function f(){cx.clearRect(0,0,cv.width,cv.height);P.forEach(p=>{p.y+=p.v;p.s+=.02;p.x+=Math.sin(p.s)*.7;if(p.y>cv.height+10){p.y=-10;p.x=Math.random()*cv.width}
 cx.save();cx.translate(p.x,p.y);cx.rotate(p.s);cx.globalAlpha=.7;cx.fillStyle=p.c;cx.beginPath();cx.ellipse(0,0,p.r,p.r/2,0,0,7);cx.fill();cx.restore()});requestAnimationFrame(f)})();
