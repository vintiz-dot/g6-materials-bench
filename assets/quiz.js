/* Quiz engine — student-paced race with a live leaderboard.
   window.QUIZ.run(host, spec, opts) */
(function(){
"use strict";
const SHAPES=["▲","◆","●","■"];
const COLS=["#CC4B37","#1C7293","#C8871B","#2E9E6B"];
const T=25;                       // seconds per question
const el=(t,c,h)=>{const d=document.createElement(t);if(c)d.className=c;if(h!=null)d.innerHTML=h;return d;};
const esc=s=>String(s==null?"":s).replace(/[&<>"]/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[m]));

/* ---------- confetti ---------- */
function burst(host){
 if(matchMedia("(prefers-reduced-motion: reduce)").matches)return;
 const c=el("canvas","qfx");const r=host.getBoundingClientRect();
 c.width=r.width;c.height=r.height;host.appendChild(c);
 const x=c.getContext("2d");const P=[];
 for(let i=0;i<70;i++)P.push({x:c.width/2,y:c.height*0.42,
  vx:(Math.random()-0.5)*11,vy:Math.random()*-11-3,
  s:3+Math.random()*5,c:COLS[i%4],a:1,rot:Math.random()*6});
 let f=0;
 (function loop(){
  f++;x.clearRect(0,0,c.width,c.height);
  P.forEach(p=>{p.vy+=0.42;p.x+=p.vx;p.y+=p.vy;p.rot+=0.2;p.a-=0.013;
   if(p.a<=0)return;x.save();x.globalAlpha=Math.max(0,p.a);x.translate(p.x,p.y);x.rotate(p.rot);
   x.fillStyle=p.c;x.fillRect(-p.s/2,-p.s/2,p.s,p.s*1.6);x.restore();});
  if(f<95)requestAnimationFrame(loop);else c.remove();
 })();
}

/* ---------- main ---------- */
function run(host,spec,opts){
 opts=opts||{};
 const st={i:0,pts:0,streak:0,best:0,correct:0,answers:[],locked:false};
 let tick=null;

 function board(){
  const rows=(opts.board&&opts.board())||[];
  if(!rows.length)return "";
  rows.sort((a,b)=>(b.pts||0)-(a.pts||0));
  const me=rows.findIndex(r=>r.me);
  const top=rows.slice(0,5).map((r,i)=>
   '<div class="lbrow'+(r.me?" me":"")+'"><span class="pos">'+(i+1)+'</span>'+
   '<span class="who">'+esc(r.n)+'</span><span class="pt">'+(r.pts||0)+'</span></div>').join("");
  let strip="";
  if(me>=0){
   const ahead=me>0?rows[me-1]:null;
   strip='<div class="lbme">You are <b>'+(me+1)+(["st","nd","rd"][me]||"th")+'</b> of '+rows.length+
    (ahead?' · <b>'+esc(ahead.n)+'</b> is '+Math.max(0,(ahead.pts||0)-(rows[me].pts||0))+' points ahead':' · you are winning!')+'</div>';
  }
  return '<div class="lb"><div class="lbhd">Leaderboard</div>'+top+strip+'</div>';
 }

 function paintBoard(){const b=host.querySelector(".lbwrap");if(b)b.innerHTML=board();}
 if(opts.onBoard)opts.onBoard(paintBoard);

 function q(){
  const item=spec[st.i];
  const pct=Math.round(st.i/spec.length*100);
  host.innerHTML=
   '<div class="qtop"><div class="qprog"><i style="width:'+pct+'%"></i></div>'+
   '<div class="qmeta"><span>Question <b>'+(st.i+1)+'</b> of '+spec.length+'</span>'+
   '<span class="qscore">'+st.pts+' pts</span>'+
   (st.streak>1?'<span class="qstreak">🔥 '+st.streak+' in a row</span>':'')+'</div></div>'+
   '<div class="qcard"><div class="qring"><svg viewBox="0 0 44 44"><circle class="bg" cx="22" cy="22" r="19"/>'+
   '<circle class="fg" cx="22" cy="22" r="19"/></svg><span class="qsec">'+T+'</span></div>'+
   '<h2 class="qq">'+esc(item.q)+'</h2>'+
   '<div class="qopts">'+item.o.map((o,i)=>
     '<button class="qo" data-i="'+i+'" style="--oc:'+COLS[i]+'"><span class="sh">'+SHAPES[i]+'</span>'+esc(o)+'</button>').join("")+
   '</div><div class="qfb" hidden></div></div>'+
   '<div class="lbwrap">'+board()+'</div>';

  const ring=host.querySelector(".fg"),sec=host.querySelector(".qsec");
  const C=2*Math.PI*19;ring.style.strokeDasharray=C;
  let left=T*1000,t0=Date.now();
  st.locked=false;
  clearInterval(tick);
  tick=setInterval(()=>{
   left=T*1000-(Date.now()-t0);
   const f=Math.max(0,left/(T*1000));
   ring.style.strokeDashoffset=C*(1-f);
   sec.textContent=Math.max(0,Math.ceil(left/1000));
   if(left<=0){clearInterval(tick);answer(-1,0);}
  },80);

  host.querySelectorAll(".qo").forEach(b=>{
   b.onclick=()=>{if(st.locked)return;answer(+b.dataset.i,Math.max(0,left/(T*1000)));};
  });
 }

 function answer(pick,frac){
  st.locked=true;clearInterval(tick);
  const item=spec[st.i], ok=pick===item.a;
  let gained=0;
  if(ok){
   st.streak++;st.best=Math.max(st.best,st.streak);st.correct++;
   const mult=st.streak>=5?2:st.streak>=4?1.8:st.streak>=3?1.5:st.streak>=2?1.2:1;
   gained=Math.round((100+Math.round(100*frac))*mult);
   st.pts+=gained;
  }else st.streak=0;
  st.answers.push(pick);

  host.querySelectorAll(".qo").forEach(b=>{
   const i=+b.dataset.i;
   if(i===item.a)b.classList.add("right");
   else if(i===pick)b.classList.add("wrong");
   b.disabled=true;
  });
  const fb=host.querySelector(".qfb");fb.hidden=false;
  fb.className="qfb "+(ok?"good":"bad");
  fb.innerHTML=(ok?'<b>Correct! +'+gained+'</b>':pick<0?'<b>Time!</b>':'<b>Not that one.</b>')+
   '<span>'+esc(item.w)+'</span>';
  if(ok)burst(host.querySelector(".qcard"));
  const sc=host.querySelector(".qscore");if(sc)sc.textContent=st.pts+" pts";
  if(opts.onAnswer)opts.onAnswer({i:st.i,pick:pick,ok:ok,pts:st.pts,streak:st.streak});

  setTimeout(()=>{st.i++;if(st.i<spec.length)q();else end();},ok?1900:2600);
 }

 function end(){
  const rows=((opts.board&&opts.board())||[]).slice().sort((a,b)=>(b.pts||0)-(a.pts||0));
  const me=rows.findIndex(r=>r.me);
  const medal=me===0?"🥇":me===1?"🥈":me===2?"🥉":"";
  host.innerHTML='<div class="qend">'+
   (medal?'<div class="medal">'+medal+'</div>':'')+
   '<div class="qbig">'+st.pts+'</div><div class="qbigl">points</div>'+
   '<div class="qstats"><span><b>'+st.correct+'</b> / '+spec.length+' correct</span>'+
   '<span>best streak <b>'+st.best+'</b></span>'+
   (me>=0?'<span><b>'+(me+1)+(["st","nd","rd"][me]||"th")+'</b> of '+rows.length+'</span>':'')+'</div>'+
   '<div class="lbwrap">'+board()+'</div></div>';
  burst(host.querySelector(".qend"));
  if(opts.onFinish)opts.onFinish({pts:st.pts,correct:st.correct,best:st.best,answers:st.answers});
 }

 /* intro */
 host.innerHTML='<div class="qstart"><div class="qbolt">⚡</div>'+
  '<h2>'+esc(opts.title||"Ready?")+'</h2>'+
  '<p>'+esc(opts.sub||"")+'</p>'+
  '<ul class="qrules"><li><b>'+spec.length+'</b> questions</li>'+
  '<li><b>'+T+'</b> seconds each</li>'+
  '<li>Answer <b>fast</b> for more points</li>'+
  '<li><b>3 in a row</b> = 1.5× · <b>5 in a row</b> = 2×</li></ul>'+
  '<button class="btn g qgo">Start</button></div>';
 host.querySelector(".qgo").onclick=()=>q();

 return {state:st,repaint:paintBoard};
}
window.QUIZ={run:run,T:T};
})();
