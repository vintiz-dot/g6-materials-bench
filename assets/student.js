/* Student page — Grade 6 W5 E9 · The Materials Bench */
(function(){
"use strict";
const L=window.LESSON, SC=L.screens, N=SC.length;
const PREVIEW=new URLSearchParams(location.search).has("preview");
const LSKEY=PREVIEW?"g6w5preview":"g6w5v2";

/* ───────── icons ───────── */
const IC={
 bottle:'<path d="M9.5 2.5h5v2.6l1.2 2.2V20a1.6 1.6 0 0 1-1.6 1.6H9.9A1.6 1.6 0 0 1 8.3 20V7.3l1.2-2.2V2.5Z"/><path d="M8.4 11.5h7.3"/>',
 cap:'<rect x="4.5" y="8.5" width="15" height="7.5" rx="2"/><path d="M7.5 8.5v7.5M10.5 8.5v7.5M13.5 8.5v7.5M16.5 8.5v7.5"/>',
 bag:'<path d="M5.8 7.8h12.4l-1.2 13.4H7L5.8 7.8Z"/><path d="M9 7.8V6a3 3 0 0 1 6 0v1.8"/>',
 straw:'<path d="M7.5 2.6 11 11l-1.8 2.6 4.6 8.2"/><path d="M6.4 2.6h3"/>',
 pot:'<path d="M6.6 7.6h10.8l-1.5 13.6H8.1L6.6 7.6Z"/><path d="M5.6 7.6h12.8"/>',
 cup:'<path d="M6.8 8.2h10.4l-1.4 13H8.2L6.8 8.2Z"/><path d="M5.8 8.2c0-1.7 2.8-2.8 6.2-2.8s6.2 1.1 6.2 2.8"/><path d="M13.6 5.6 15 1.8"/>',
 can:'<rect x="7" y="4.4" width="10" height="17.2" rx="2.4"/><ellipse cx="12" cy="4.6" rx="5" ry="1.6"/><path d="M7 10h10M7 16h10"/>',
 tin:'<rect x="6.4" y="5.6" width="11.2" height="14.4" rx="1.4"/><ellipse cx="12" cy="5.8" rx="5.6" ry="1.5"/><rect x="6.4" y="10" width="11.2" height="5.4"/>',
 foil:'<path d="M3.4 7.4c2.6-2 4.6 2 7.2 0s4.6 2 7.2 0 4.6 2 3 3.4l-5.4 9.8H8.4L3.4 10.6c-1.2-1.2-1-2.4 0-3.2Z"/>',
 news:'<rect x="3.6" y="5.4" width="16.8" height="13.2" rx="1.2"/><path d="M6.4 8.8h5.4M6.4 11.6h5.4M6.4 14.4h5.4M14.4 8.8h3.2M14.4 12.4h3.2"/>',
 sheet:'<path d="M6 2.8h8l4 4v14.4H6V2.8Z"/><path d="M14 2.8v4h4"/><path d="M8.6 12h6.8M8.6 15.4h6.8M8.6 18h4"/>',
 box:'<path d="M3.4 8.6 12 5.2l8.6 3.4v9.8L12 21.8l-8.6-3.4V8.6Z"/><path d="M3.4 8.6 12 12l8.6-3.4M12 12v9.8"/>',
 napkin:'<rect x="4.4" y="4.4" width="15.2" height="15.2" rx="1.6"/><path d="M4.4 12h15.2M12 4.4v15.2"/>',
 jar:'<path d="M7 9h10v10.6a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V9Z"/><rect x="6.2" y="5.2" width="11.6" height="3.8" rx="1.2"/>',
 gbottle:'<path d="M10.6 2.6h2.8v5.2l2.6 4v8.2a1.6 1.6 0 0 1-1.6 1.6H9.6A1.6 1.6 0 0 1 8 19.9v-8.1l2.6-4V2.6Z"/><path d="M10.6 5.6h2.8"/>',
 sock:'<path d="M8 2.8h4.6v9.6l4.4 3.6a3.4 3.4 0 0 1-4.2 5.3L8 17.6V2.8Z"/><path d="M8 6.6h4.6"/>',
 tote:'<path d="M5.4 8h13.2l-1 13.2H6.4L5.4 8Z"/><path d="M8.6 8V6.2a3.4 3.4 0 0 1 6.8 0V8"/><path d="M5.4 11.4h13.2"/>',
 sticks:'<path d="M7.4 21.4 12.6 3.2M11.4 21.4 16.6 3.2"/><path d="M11.6 6.4h4.4M6.6 6.4h4"/>',
 window:'<rect x="3.6" y="3.6" width="16.8" height="16.8" rx="1.4"/><path d="M12 3.6v16.8M3.6 12h16.8"/>',
 pan:'<path d="M3.4 10.6h12.4v3.6a5 5 0 0 1-5 5H8.4a5 5 0 0 1-5-5v-3.6Z"/><path d="M15.8 12.4h4.8"/>',
 tshirt:'<path d="M8.6 3.4 5 5.6l1.6 3.8 1.8-.8v10h7.2v-10l1.8.8L19 5.6l-3.6-2.2a3.6 3.6 0 0 1-6.8 0Z"/>',
 pencil:'<path d="m5 19 1-4L17.4 3.6a1.8 1.8 0 0 1 2.6 2.6L8.6 17.6 5 19Z"/><path d="m15.6 5.4 3 3"/>',
 coat:'<path d="M9 3.4 4.6 6v14.6h14.8V6L15 3.4l-3 2.6-3-2.6Z"/><path d="M12 6v14.6"/>'
};
const svg=k=>'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+(IC[k]||'')+'</svg>';

/* ───────── state ───────── */
const BLANK={id:"",name:"",cls:"",stage:1,open:{1:true},excused:{},skip:{},read:{},animal:"",qz:{},ccq:{},tbl:{},tjob:{},groups:[{n:"",items:[]},{n:"",items:[]},{n:"",items:[]}],
 placed:{},q1:"",q2:"",qs:{},stand:null,standWhy:"",why:{},whyQ:null,quad:{},link:"",durPos:"",durNeg:"",def:"",
 match:{},mTries:0,talk:{},extra:{}};
let S;
try{S=Object.assign({},BLANK,JSON.parse(localStorage.getItem(LSKEY)||"{}"));}catch(e){S=Object.assign({},BLANK);}
if(!S.groups||!S.groups.length)S.groups=[{n:"",items:[]},{n:"",items:[]},{n:"",items:[]}];
if(!S.id)S.id="s"+Math.random().toString(36).slice(2,10);
if(!S.animal)S.animal=L.animals[Math.floor(Math.random()*L.animals.length)];
function firstName(){const p=txt(S.name).split(/\s+/);return p[p.length-1]||p[0]||"";}
function nick(){return (firstName()||"Someone")+" the "+S.animal;}
let remoteStage=1;
function save(){try{localStorage.setItem(LSKEY,JSON.stringify(S));}catch(e){}pushSoon();}

/* ───────── helpers ───────── */
const $=s=>document.querySelector(s);
const el=(t,c,h)=>{const d=document.createElement(t);if(c)d.className=c;if(h!=null)d.innerHTML=h;return d;};
const esc=s=>String(s==null?"":s).replace(/[&<>"]/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[m]));
const txt=v=>String(v||"").trim();
const banned=n=>L.ban.find(w=>n.toLowerCase().includes(w));
const ALLT=L.props.map(t=>[t,"p"]).concat(L.funcs.map(t=>[t,"f"]));
function head(ph,cls,t,sub,mins){return '<div class="eyebrow '+cls+'">'+ph+' &middot; '+mins+' min</div><h2 class="title">'+t+'</h2><p class="sub">'+sub+'</p>';}
function modal(h){$("#modalCard").innerHTML=h;$("#modal").classList.add("on");}
$("#modal").addEventListener("click",e=>{if(e.target.id==="modal")$("#modal").classList.remove("on");});

/* ───────── screen keys ───────── */
const KEY={1:"start",2:"warm",3:"words",4:"pile",5:"quest",6:"stand",7:"why",8:"prop",9:"table",10:"book",11:"exit",12:"sum"};

/* ───────── completion ───────── */
function talkDone(i){const t=S.talk[i]||{};return L.talk[i].single?!!txt(t.a):(!!txt(t.a)&&!!txt(t.b));}
function goodGroups(){return S.groups.filter(g=>txt(g.n).length>=3&&!banned(g.n));}
function ccqDone(id){const c=L.ccq[id];if(!c)return true;
 const g=S.ccq[id]||{};return c.items.every((it,i)=>g[i]);}
function saybackDone(){const g=S.ccq.say||{};return L.sayback.items.every((it,i)=>g[i]);}
function done(n){
 if(S.skip[n]||S.excused[n])return true;
 switch(KEY[n]){
 case "start":return txt(S.name).length>=2&&txt(S.cls).length>=2;
 case "warm": return !!(S.qz.warm);
 case "words":return L.words.every((w,i)=>S.read[i]);
 case "pile": return ccqDone(4)&&goodGroups().length>=2&&Object.keys(S.placed).length>=12;
 case "quest":return txt(S.q1).length>=8&&txt(S.q2).length>=8&&S.qs[1]&&S.qs[2];
 case "stand":return S.stand!=null&&txt(S.standWhy).length>=4;
 case "why":  return ccqDone(7)&&Object.keys(S.why).length===L.why.length&&S.whyQ===L.whyQ.right;
 case "prop": return ccqDone(8)&&ALLT.every(([t])=>S.quad[t])&&txt(S.link).length>=8&&txt(S.durPos).length>=2&&txt(S.durNeg).length>=2&&txt(S.def).length>=8&&saybackDone();
 case "table":return L.propTable.every((r,i)=>S.tbl[i]===i)&&L.propTable.filter((r,i)=>txt(S.tjob[i]).length>2).length>=4;
 case "book": return ccqDone(10)&&Object.keys(S.match).length===L.match.length&&L.talk.every((t,i)=>talkDone(i));
 case "exit": return !!(S.qz.exit);
 default:return true;}}
function todo(n){switch(KEY[n]){
 case "start":return "Write your name and your class.";
 case "warm": return "Finish the race.";
 case "words":return "Tap all eight cards. ("+L.words.filter((w,i)=>S.read[i]).length+"/8)";
 case "pile": return !ccqDone(4)?"Answer the check questions first."
   :"Name 2 groups and put in 12 things. ("+goodGroups().length+"/2 names · "+Object.keys(S.placed).length+"/12 things)";
 case "quest":return "Write 2 questions and sort them both.";
 case "stand":return "Choose a box, then say why.";
 case "why":  return !ccqDone(7)?"Answer the check question first.":"Match all six, then answer the question.";
 case "prop": return !ccqDone(8)?"Answer the check questions first."
   :!saybackDone()?"Say the rule back at the bottom.":"Fill every box, then write the three sentences.";
 case "table":return "Match all 7 meanings ("+L.propTable.filter((r,i)=>S.tbl[i]===i).length+"/7), then add 4 jobs of your own ("+
   L.propTable.filter((r,i)=>txt(S.tjob[i]).length>2).length+"/4).";
 case "book": return !ccqDone(10)?"Answer the check question first.":"Match all five, then finish the four sentences.";
 case "exit": return "Finish the race.";
 default:return "";}}

function live(n){return !S.skip[n];}
function nextOf(n){for(let i=n+1;i<=N;i++)if(live(i))return i;return null;}
function prevOf(n){for(let i=n-1;i>=1;i--)if(live(i))return i;return null;}

/* ───────── sync ───────── */
let pT=null;
function pushSoon(){if(PREVIEW||!window.SYNC||!SYNC.available())return;clearTimeout(pT);pT=setTimeout(pushNow,1200);}
function pushNow(){
 if(PREVIEW||!window.SYNC||!SYNC.available()||txt(S.name).length<2)return;
 SYNC.push(S.cls,S.id,{
  n:txt(S.name)||"(no name)",nk:nick(),c:txt(S.cls),st:S.stage,up:Date.now(),
  pw:(S.qz.warm||{}).pts||0, pe:(S.qz.exit||{}).pts||0,
  cw:(S.qz.warm||{}).correct, ce:(S.qz.exit||{}).correct,
  qa:{w:S.qz.warm_picks||[], e:S.qz.exit_picks||[]},
  dn:SC.map(c=>done(c.n)?1:0),
  ex:SC.map(c=>(S.excused[c.n]||S.skip[c.n])?1:0),
  a:{
   groups:S.groups.filter(g=>txt(g.n)||g.items.length).map(g=>txt(g.n)+": "+g.items.map(i=>L.pile[+i.slice(1)][1]).join(", ")).join(" | "),
   q1:S.q1,q2:S.q2,qs:(S.qs[1]||"-")+"/"+(S.qs[2]||"-"),
   stand:S.stand==null?"":["disagree","not sure","agree"][S.stand],standWhy:S.standWhy,
   why:Object.keys(S.why).length+"/6"+(S.whyQ==null?"":S.whyQ===L.whyQ.right?" · rule OK":" · rule wrong"),
   quadWrong:ALLT.filter(([t,k])=>S.quad[t]&&S.quad[t]!==k).map(x=>x[0]).join(", "),
   link:S.link,durPos:S.durPos,durNeg:S.durNeg,def:S.def,
   match:Object.keys(S.match).length+"/5 ("+S.mTries+" wrong)",
   talk:L.talk.map((t,i)=>sentence(i)).filter(Boolean).join(" | "),
   extra:Object.keys(S.extra).map(k=>"S"+k+": "+S.extra[k]).filter(x=>x.length>5).join(" | "),
   table:L.propTable.filter((r,i)=>S.tbl[i]===i).length+"/7 matched · jobs: "+
     L.propTable.map((r,i)=>txt(S.tjob[i])).filter(Boolean).join(", "),
   quiz:(S.qz.warm?"warm-up "+S.qz.warm.pts+" ("+S.qz.warm.correct+"/10)":"")+
        (S.qz.exit?"  →  exit "+S.qz.exit.pts+" ("+S.qz.exit.correct+"/10)":"")
  }});
}
function liveBadge(){
 let b=$("#live");
 if(PREVIEW||!window.SYNC||!SYNC.configured){if(b)b.remove();return;}
 if(!b){b=el("div","","<span class=\"d\"></span><span id=\"livetx\">connecting…</span>");b.id="live";document.body.appendChild(b);}
 const ok=SYNC.available();
 b.classList.toggle("on",ok);
 $("#livetx").textContent=ok?"Connected to your teacher":"Offline — work is saved here";
}

/* ───────── nav ───────── */
function linked(){return !!(window.SYNC&&SYNC.available()&&SYNC.configured);}
function maxOpen(){return linked()?Math.max(1,remoteStage):N;}
function openTo(n){return n<=maxOpen();}
function dots(){const d=$("#dots");d.innerHTML="";for(let i=1;i<=N;i++){const x=el("div","dot");
 if(!live(i)){x.classList.add("skip");d.appendChild(x);continue;}
 if(done(i)&&i<S.stage)x.classList.add("done");if(i===S.stage)x.classList.add("now");d.appendChild(x);}}
let tInt=null;
function timer(m){clearInterval(tInt);const end=Date.now()+m*60000;const t=()=>{const r=Math.max(0,end-Date.now());const c=$("#clock");
 c.textContent=Math.floor(r/60000)+":"+String(Math.floor(r%60000/1000)).padStart(2,"0");
 c.style.color=r<=0?"#F07A63":r<60000?"#E0A93F":"#9FC4D4";};t();tInt=setInterval(t,1000);}
function show(n){
 if(n>maxOpen())n=maxOpen();
 if(!live(n)){const f=nextOf(n)||prevOf(n)||1;if(f!==n)return show(f);}
 S.stage=n;save();
 document.querySelectorAll(".scr").forEach(s=>{s.classList.remove("on");});
 let sec=document.getElementById("s"+n);
 if(!sec){sec=el("section","scr");sec.id="s"+n;$("#shell").appendChild(sec);}
 sec.classList.add("on");
 const cfg=SC[n-1];
 $("#barTitle").textContent=n+" / "+N+" · "+cfg.title;
 if(n!==3){sel=null;const pk=$("#picker");if(pk){pk.hidden=true;pk.innerHTML="";}}
 window.scrollTo(0,0);
 S.open[n]=true;timer(cfg.min);render(n);
 refresh();
}
function refresh(){
 const n=S.stage,ok=done(n);
 dots();
 const nx=$("#next"),nxt=nextOf(n);
 $("#back").disabled=!prevOf(n);
 if(!nxt){nx.textContent="Save my page";nx.disabled=false;$("#navNote").textContent="Print it, or copy it to your teacher.";return;}
 const joining=(n===1&&remoteStage>1&&linked());
 nx.textContent=joining?"Join the class →":"Next";
 const openNext=openTo(nxt);
 nx.disabled=!ok||!openNext;
 $("#navNote").textContent=
   !ok?todo(n)
   :!openNext?"Finished. Wait — your teacher will open the next screen."
   :S.excused[n]?"Your teacher said you can go on."
   :joining?"Your class is on screen "+remoteStage+". Tap to join them."
   :"Finished. You can go on.";
}
$("#back").onclick=()=>{const p=prevOf(S.stage);if(p)show(p);};
$("#next").onclick=()=>{
 const nx=nextOf(S.stage);
 if(!nx){window.print();return;}
 if(!done(S.stage))return;
 if(S.stage===1&&remoteStage>1&&linked()){show(remoteStage);return;}
 if(openTo(nx))show(nx);
};


/* ───────── concept-check block ───────── */
function ccqBlock(id,spec,host,onDone){
 const g=S.ccq[id]=S.ccq[id]||{};
 const c=el("div","ccq",'<div class="hd">'+esc(spec.hd)+'</div>');
 spec.items.forEach((it,i)=>{
  const row=el("div","ccqi",'<p>'+esc(it.q)+'</p>');
  const ob=el("div","ccqo");
  const ord=it.o.map((_,k)=>k);
  for(let k=ord.length-1;k>0;k--){const j=Math.floor(Math.random()*(k+1));
   const t=ord[k];ord[k]=ord[j];ord[j]=t;}
  const right=ord.indexOf(it.a);
  ord.forEach(oi=>0);
  ord.map(oi=>it.o[oi]).forEach((o,k)=>{
   const b=el("button",g[i]&&k===right?"ok":"",o);
   b.onclick=()=>{
    if(g[i])return;
    if(k===right){g[i]=true;save();b.classList.add("ok");
     row.querySelectorAll(".ccqo button").forEach(x=>{if(x!==b)x.disabled=true;});
     let w=row.querySelector(".ccqw");if(!w){w=el("div","ccqw g");row.appendChild(w);}
     w.className="ccqw g";w.textContent=it.w;
     if(spec.items.every((z,j)=>g[j])){const d=el("div","ccqdone","✓ Good. You can start now.");
      if(!c.querySelector(".ccqdone"))c.appendChild(d);}
     if(onDone)onDone();after(S.stage);
    }else{
     b.classList.add("no");setTimeout(()=>b.classList.remove("no"),500);
     let w=row.querySelector(".ccqw");if(!w){w=el("div","ccqw r");row.appendChild(w);}
     w.className="ccqw r";w.textContent="Try again.";
    }};
   ob.appendChild(b);
  });
  row.appendChild(ob);
  if(g[i]){const w=el("div","ccqw g",esc(it.w));row.appendChild(w);
   ob.querySelectorAll("button").forEach((x,k)=>{if(k!==right)x.disabled=true;});}
  c.appendChild(row);
 });
 if(spec.items.every((z,j)=>g[j]))c.appendChild(el("div","ccqdone","✓ Good. You can start now."));
 host.appendChild(c);
 return c;
}
function gateBy(id,wrap){
 const upd=()=>wrap.classList.toggle("gated",!ccqDone(id));
 upd();return upd;
}

/* ───────── extension box ───────── */
function extra(n,host){
 if(!L.extra[n]||!done(n))return;
 const d=el("div","extra",'<div class="hd">Finished early? Try this</div>'+
  '<p style="margin:0 0 8px;font-size:15px">'+esc(L.extra[n])+'</p><textarea rows="2"></textarea>');
 const t=d.querySelector("textarea");t.value=S.extra[n]||"";
 t.oninput=()=>{S.extra[n]=t.value;save();};
 host.appendChild(d);
}
function after(n){const h=document.getElementById("s"+n);if(!h)return;
 const old=h.querySelector(".extra");if(old)old.remove();
 const box=h.querySelector(".stack")||h;extra(n,box);refresh();}

/* ───────── router ───────── */
function render(n){({start:r1,warm:rQuiz,words:r2,pile:r3,quest:r4,stand:r5,why:r6,prop:r7,table:rTable,book:r8,exit:rQuiz,sum:r9})[KEY[n]]();}

/* ───────── QUIZ SCREENS (2 warm-up · 10 exit) ───────── */
let boardRows=[],boardPaint=null;
function rQuiz(){
 const n=S.stage,which=SC[n-1].quiz,spec=which==="warm"?L.quizWarm:L.quizExit;
 const s=document.getElementById("s"+n);
 const prev=S.qz[which];
 s.innerHTML='<div class="eyebrow '+(which==="warm"?"eng":"foc")+'">'+
  (which==="warm"?"Warm-up race · what do you already know?":"Exit ticket race · what do you know now?")+
  '</div><h2 class="title">'+(which==="warm"?"Warm-up race":"Exit ticket race")+'</h2>'+
  '<p class="sub">You are <b>'+esc(nick())+'</b> on the leaderboard.</p>'+
  '<div id="qhost"></div>';
 const host=s.querySelector("#qhost");
 if(prev){
  s.querySelector(".sub").innerHTML="You already played. Your score: <b>"+prev.pts+" points</b>.";
  host.innerHTML='<div class="qend"><div class="qbig">'+prev.pts+'</div><div class="qbigl">points</div>'+
   '<div class="qstats"><span><b>'+prev.correct+'</b> / '+spec.length+' correct</span>'+
   '<span>best streak <b>'+prev.best+'</b></span></div><div class="lbwrap"></div></div>';
  paintStatic(host.querySelector(".lbwrap"));
  boardPaint=()=>paintStatic(host.querySelector(".lbwrap"));
  return;
 }
 QUIZ.run(host,spec,{
  title:which==="warm"?"Warm-up race":"Exit ticket race",
  sub:which==="warm"?"Ten quick questions. Nobody is marked. Just go fast and have fun."
                    :"Ten questions about today. Show me what you know.",
  board:()=>rows(which),
  onBoard:fn=>{boardPaint=fn;},
  onAnswer:a=>{S.qz[which+"_live"]=a.pts;
   const pk=S.qz[which+"_picks"]=S.qz[which+"_picks"]||[];pk[a.i]=a.pick;save();pushNow();
   if(boardPaint)boardPaint();},
  onFinish:r=>{S.qz[which]={pts:r.pts,correct:r.correct,best:r.best};save();pushNow();after(n);}
 });
}
function rows(which){
 const key=which==="warm"?"pw":"pe";
 const out=boardRows.map(r=>({n:r.nk||r.n,pts:r[key]||0,me:r.id===S.id}));
 const liveP=S.qz[which+"_live"]||((S.qz[which]||{}).pts)||0;
 const mine=out.find(r=>r.me);
 if(mine)mine.pts=Math.max(mine.pts,liveP);
 else out.push({n:nick(),pts:liveP,me:true});
 return out;
}
function paintStatic(w){
 if(!w)return;
 const which=SC[S.stage-1].quiz,rs=rows(which).slice().sort((a,b)=>b.pts-a.pts);
 if(rs.length<2){w.innerHTML="";return;}
 const me=rs.findIndex(r=>r.me);
 w.innerHTML='<div class="lb"><div class="lbhd">Leaderboard</div>'+
  rs.slice(0,5).map((r,i)=>'<div class="lbrow'+(r.me?" me":"")+'"><span class="pos">'+(i+1)+
   '</span><span class="who">'+esc(r.n)+'</span><span class="pt">'+r.pts+'</span></div>').join("")+
  (me>=0?'<div class="lbme">You are <b>'+(me+1)+'</b> of '+rs.length+'</div>':'')+'</div>';
}

/* ───────── 1 · START ───────── */
function r1(){
 const s=document.getElementById("s1");
 s.innerHTML='<div class="eyebrow">Grade 6 · Science in English · Week 5</div>'+
 '<h2 class="title">The Materials Bench</h2>'+
 '<p class="sub">Book pages 24 and 25. Have your book open next to you.</p>'+
 '<div class="stack">'+
 '<div class="card"><label for="nm" style="font-size:13px;color:var(--muted)">Your name · Tên của bạn</label>'+
 '<input id="nm" placeholder="Nguyễn Minh Anh" style="width:100%;border:0;border-bottom:2px solid var(--line);background:transparent;padding:8px 0;font-size:18px;font-family:var(--display);font-weight:600;color:var(--ink)">'+
 '<div style="height:14px"></div>'+
 '<label for="cl" style="font-size:13px;color:var(--muted)">Your class · Lớp</label>'+
 '<input id="cl" placeholder="6H1" style="width:100%;border:0;border-bottom:2px solid var(--line);background:transparent;padding:8px 0;font-size:18px;font-family:var(--display);font-weight:600;color:var(--ink)"></div>'+
 '<div id="nickwrap" hidden><div class="card" style="text-align:center"><div class="eyebrow" style="text-align:left">Your racing name</div><div id="nick" style="font-family:var(--display);font-size:26px;font-weight:700;color:var(--green);margin:6px 0 10px"></div><button class="btn ghost" id="reroll">Give me another animal</button><div style="font-size:13px;color:var(--muted);margin-top:9px">This is the name on the class leaderboard.</div></div></div><div id="goalwrap" hidden><div class="eyebrow">Today you will learn</div><div class="goals">'+
 L.goals.map(([k,v])=>'<div class="goal"><b>'+k+'</b><span>'+v+'</span></div>').join("")+'</div></div>'+
 '<div class="dark"><b>How this works.</b><br>There are 12 screens.<br>Your teacher opens them one at a time.<br>You cannot go on until you finish the work on the screen.<br>If you join late, you go straight to the screen the class is on.'+
 '<div class="vn" style="color:#9FC4D4;margin-top:6px">Bạn phải làm xong mới sang màn hình tiếp theo. Vào muộn thì bạn vào thẳng màn hình cả lớp đang làm.</div></div>'+
 '</div>';
 const nm=s.querySelector("#nm"),cl=s.querySelector("#cl"),gw=s.querySelector("#goalwrap");
 const nw=s.querySelector("#nickwrap"),nk=s.querySelector("#nick");
 nm.value=S.name;cl.value=S.cls;
 s.querySelector("#reroll").onclick=()=>{
  let a;do{a=L.animals[Math.floor(Math.random()*L.animals.length)];}while(a===S.animal&&L.animals.length>1);
  S.animal=a;save();nk.textContent=nick();};
 const upd=()=>{const ok=txt(S.name).length>=2&&txt(S.cls).length>=2;
  gw.hidden=!ok;nw.hidden=!ok;nk.textContent=nick();refresh();};
 nm.oninput=()=>{S.name=nm.value;save();upd();};
 cl.oninput=()=>{S.cls=cl.value;save();upd();};
 upd();
}

/* ───────── 2 · EIGHT WORDS ───────── */
function r2(){
 const s=document.getElementById("s"+S.stage);
 s.innerHTML=head("Set up","","Eight words","Book page 24. Tap every card. Say the word out loud.",6)+
 '<div class="stack"><div class="grid words" id="wg"></div>'+
 '<div class="dark"><b style="color:#4CC490">PROPERTY</b> is the big word today.<br>'+
 'A property is not good. A property is not bad.<br>It is only good or bad when you say <b>what job it must do</b>.'+
 '<div class="vn" style="color:#9FC4D4;margin-top:6px">Tính chất không tốt, không xấu. Nó chỉ tốt hay xấu khi ta nói nó phải làm việc gì.</div></div></div>';
 const g=s.querySelector("#wg");
 L.words.forEach(([en,vn,def,key],i)=>{
  const b=el("button","word"+(key?" key":"")+(S.read[i]?" read":""),
   (S.read[i]?'<span class="tick">&#10003;</span>':'')+
   '<div class="en">'+en+'</div><div class="viet">'+vn+'</div><div class="def">'+def+'</div>');
  b.onclick=()=>{S.read[i]=true;save();r2();after(S.stage);};
  g.appendChild(b);
 });
 extra(S.stage,s.querySelector(".stack"));
}

/* ───────── 3 · THE PILE ───────── */
let sel=null;
function r3(){
 const s=document.getElementById("s"+S.stage);
 s.innerHTML=head("Engage","eng","The pile","All of this was going in the bin. Now it is your data.",8)+
 '<div class="stack">'+
 '<div class="warn"><b>The rule:</b> do <b>NOT</b> put things together because we use them in the same place.<br>Put them together because they are <b>made of the same thing</b>.<br>'+
 '<span class="vn">Phân nhóm theo <b>chất liệu</b>, không theo công dụng.</span></div>'+
 '<div id="ccq4"></div>'+
 '<div id="pilework"><div class="hint">Tap a thing. Then choose a group.<br>Give every group a name: plastic, metal, paper, glass, cloth, wood.</div>'+
 '<div class="grid pile" id="pile"></div>'+
 '<div class="grid groups" id="grps" style="margin-top:12px"></div>'+
 '<button class="btn ghost" id="addg" style="margin-top:12px">+ One more group</button></div>'+
 '</div>';
 const wrap=s.querySelector("#pilework");
 const up=gateBy(4,wrap);
 ccqBlock(4,L.ccq[4],s.querySelector("#ccq4"),up);
 drawPile();drawGroups();picker();
 s.querySelector("#addg").onclick=()=>{if(S.groups.length<6){S.groups.push({n:"",items:[]});save();drawGroups();picker();}};
 extra(S.stage,s.querySelector(".stack"));
}
function drawPile(){
 const p=document.getElementById("pile");if(!p)return;p.innerHTML="";
 L.pile.forEach(([ic,en,vn],i)=>{
  const id="o"+i;
  const b=el("button","spec"+(S.placed[id]!=null?" used":"")+(sel===id?" sel":""),
   svg(ic)+'<div class="en">'+en+'</div><div class="viet">'+vn+'</div>');
  b.onclick=()=>{sel=(sel===id?null:id);drawPile();drawGroups();picker();};
  p.appendChild(b);
 });
}
function drawGroups(){
 const g=document.getElementById("grps");if(!g)return;g.innerHTML="";
 S.groups.forEach((grp,gi)=>{
  const d=el("div","grp"+(sel?" armed":""));
  const inp=el("input");inp.value=grp.n;inp.placeholder="Name this group…";
  inp.oninput=()=>{grp.n=inp.value;save();picker();
   const bad=banned(inp.value);let m=d.querySelector(".grpmsg");
   if(bad){if(!m){m=el("div","grpmsg");d.appendChild(m);}m.textContent="“"+bad+"” is where we USE it. What is it MADE OF?";}
   else if(m)m.remove();
   after(S.stage);};
  d.appendChild(inp);
  const ch=el("div","chips");
  grp.items.forEach((id,ii)=>{
   const c=el("span","chip",esc(L.pile[+id.slice(1)][1])+'<button aria-label="Remove">&times;</button>');
   c.querySelector("button").onclick=e=>{e.stopPropagation();grp.items.splice(ii,1);delete S.placed[id];save();drawPile();drawGroups();picker();after(S.stage);};
   ch.appendChild(c);
  });
  d.appendChild(ch);
  d.onclick=e=>{if(e.target.tagName==="INPUT"||e.target.tagName==="BUTTON")return;place(gi);};
  g.appendChild(d);
 });
}
function place(gi){
 if(!sel)return;
 S.groups[gi].items.push(sel);S.placed[sel]=gi;sel=null;save();
 drawPile();drawGroups();picker();after(S.stage);
}
function picker(){
 const pk=$("#picker");if(!pk)return;
 if(S.stage!==3||!sel){pk.hidden=true;pk.innerHTML="";return;}
 pk.innerHTML='<div class="lab">Put <b>'+esc(L.pile[+sel.slice(1)][1])+'</b> in which group?</div>';
 S.groups.forEach((g,i)=>{const b=el("button",null,esc(txt(g.n)||("Group "+(i+1))));b.onclick=()=>place(i);pk.appendChild(b);});
 const x=el("button","x","Cancel");x.onclick=()=>{sel=null;drawPile();drawGroups();picker();};
 pk.appendChild(x);pk.hidden=false;
}

/* ───────── 4 · QUESTIONS ───────── */
function r4(){
 const s=document.getElementById("s"+S.stage);
 s.innerHTML=head("Engage","eng","Your questions","Somebody chose the material for every thing in the pile. Why?",4)+
 '<div class="stack">'+
 '<div class="dark"><p style="margin:0">Every thing in that pile was chosen by a person.<br>A person said: <b>this thing must be made of THIS.</b></p>'+
 '<p style="margin:10px 0 0;font-size:19px;font-family:var(--display);font-weight:600;color:#fff">What did they think about?</p></div>'+
 qbox(1,"Why does")+qbox(2,"What if")+'</div>';
 [1,2].forEach(i=>{
  const t=s.querySelector("#q"+i);t.value=S["q"+i];
  t.oninput=()=>{S["q"+i]=t.value;save();after(S.stage);};
  s.querySelectorAll('[data-q="'+i+'"]').forEach(b=>{
   if(S.qs[i]===b.dataset.c)b.classList.remove("ghost");
   b.onclick=()=>{S.qs[i]=b.dataset.c;save();
    s.querySelectorAll('[data-q="'+i+'"]').forEach(x=>x.classList.add("ghost"));
    b.classList.remove("ghost");after(S.stage);};
  });
 });
 extra(S.stage,s.querySelector(".stack"));
}
function qbox(i,stem){
 return '<div class="card"><label style="font-size:13px;color:var(--muted)" for="q'+i+'">Question '+i+' — begin with <b>'+stem+'</b></label>'+
 '<input id="q'+i+'" placeholder="'+stem+' …" style="width:100%;border:0;border-bottom:2px solid var(--line);background:transparent;padding:8px 0;font-size:17px;font-family:var(--display);color:var(--ink)">'+
 '<div style="font-size:12.5px;color:var(--muted);margin:12px 0 7px">Now put your question in a box:</div>'+
 '<div style="display:flex;gap:7px;flex-wrap:wrap">'+
 ["A — we can test this today","B — we must find out","C — a big question"].map((t,k)=>
  '<button class="btn ghost" style="flex:1;min-width:145px;font-size:13px" data-q="'+i+'" data-c="'+"ABC"[k]+'">'+t+'</button>').join("")+
 '</div></div>';
}

/* ───────── 5 · WHERE DO YOU STAND ───────── */
function r5(){
 const s=document.getElementById("s"+S.stage);
 s.innerHTML=head("Engage","eng","Where do you stand?","There is no right answer. Choose one box.",3)+
 '<div class="stack">'+
 '<div class="dark" style="text-align:center;font-family:var(--display);font-size:clamp(18px,4.2vw,24px);font-weight:600;color:#fff;line-height:1.35">'+
 '&ldquo;The world would be better if plastic was never made.&rdquo;'+
 '<div class="vn" style="color:#9FC4D4;font-family:var(--body);font-size:14px;font-style:italic;margin-top:8px">Thế giới sẽ tốt hơn nếu con người chưa từng tạo ra nhựa.</div></div>'+
 '<div class="stand" id="st"></div>'+
 '<div class="card"><div style="font-family:var(--display);font-size:16px;color:var(--ink);margin-bottom:4px">I chose this box because…</div>'+
 '<textarea id="sw" rows="2" style="width:100%;border:0;border-bottom:2px solid var(--green);background:transparent;padding:6px 0;font-size:16px"></textarea></div>'+
 '<div class="hint">Your teacher will ask somebody in a different box: <b>&ldquo;What would we lose if you are right?&rdquo;</b></div>'+
 '<div style="font-size:13px;color:var(--muted);font-style:italic">Remember your box. You choose again at the end of the next lesson.</div></div>';
 const box=s.querySelector("#st");
 ["I do not agree","I am not sure —<br>it depends","I agree"].forEach((lab,i)=>{
  const b=el("button",S.stand===i?"on":"",'<span class="n">'+(i+1)+'</span>'+lab);
  b.onclick=()=>{S.stand=i;save();r5();after(S.stage);};
  box.appendChild(b);
 });
 const w=s.querySelector("#sw");w.value=S.standWhy;w.oninput=()=>{S.standWhy=w.value;save();after(S.stage);};
 extra(S.stage,s.querySelector(".stack"));
}

/* ───────── 6 · WHY IS IT MADE OF THAT? ───────── */
let wsel=null;
function r6(){
 const s=document.getElementById("s"+S.stage);
 s.innerHTML=head("Focus","foc","Why is it made of that?","Tap a thing. Then tap the sentence that says why.",5)+
 '<div class="stack"><div id="ccq7"></div><div class="card" id="whywork">'+
 '<div class="whyrow" id="wr"></div><div id="ws"></div></div>'+
 '<div class="card" id="wq" hidden></div></div>';
 const up7=gateBy(7,s.querySelector("#whywork"));
 ccqBlock(7,L.ccq[7],s.querySelector("#ccq7"),up7);
 const wr=s.querySelector("#wr"),ws=s.querySelector("#ws");
 L.why.forEach(([ic,en,vn])=>{
  const b=el("button","whyo"+(S.why[en]?" ok":"")+(wsel===en?" sel":""),
   svg(ic)+'<div class="en">'+en+'</div><div class="viet">'+vn+'</div>');
  b.onclick=()=>{if(S.why[en])return;wsel=(wsel===en?null:en);r6();};
  wr.appendChild(b);
 });
 L.why.map(x=>x[3]).slice().sort((a,b)=>a.length-b.length).forEach(sen=>{
  const taken=Object.values(S.why).indexOf(sen)>=0;
  const b=el("button","sent"+(taken?" ok":""),sen.replace(/because/,"<b>because</b>"));
  b.onclick=()=>{
   if(!wsel){b.classList.add("no");setTimeout(()=>b.classList.remove("no"),500);return;}
   const right=L.why.find(x=>x[1]===wsel)[3];
   if(sen===right){S.why[wsel]=sen;wsel=null;save();r6();after(S.stage);}
   else{b.classList.add("no");setTimeout(()=>b.classList.remove("no"),600);}
  };
  ws.appendChild(b);
 });
 if(Object.keys(S.why).length===L.why.length){
  const q=s.querySelector("#wq");q.hidden=false;
  q.innerHTML='<div class="eyebrow foc">Now the important question</div>'+
   '<p style="margin:0 0 10px;font-size:16px">'+L.whyQ.q+'</p><div class="mcq" id="mq"></div><div id="mqm" style="font-size:14.5px"></div>';
  const mq=q.querySelector("#mq");
  L.whyQ.opts.forEach((o,i)=>{
   const b=el("button",S.whyQ===i?(i===L.whyQ.right?"ok":"no"):"",o);
   b.onclick=()=>{S.whyQ=i;save();r6();after(S.stage);};
   mq.appendChild(b);
  });
  if(S.whyQ!=null)q.querySelector("#mqm").innerHTML=S.whyQ===L.whyQ.right
   ?'<span style="color:var(--green);font-weight:600">'+L.whyQ.yes+'</span>'
   :'<span style="color:var(--crimson);font-weight:600">'+L.whyQ.no+'</span>';
 }
 extra(S.stage,s.querySelector(".stack"));
}

/* ───────── 7 · PROPERTY AND JOB ───────── */
let qsel=null;
function r7(){
 const s=document.getElementById("s"+S.stage);
 s.innerHTML=head("Focus","foc","Property and job","Tap a word. Then tap the box it goes in.",7)+
 '<div class="stack"><div id="ccq8"></div><div id="propwork" class="stack"><div class="tiles" id="tiles"></div>'+
 '<div class="grid quads">'+
 '<div class="quad q1" data-b="p"><h4>A PROPERTY — what it IS</h4><div class="body"><div class="chips"></div></div></div>'+
 '<div class="quad q2" data-b="f"><h4>A JOB — what it DOES</h4><div class="body"><div class="chips"></div></div></div></div>'+
 '<button class="btn ghost" id="chk" style="align-self:flex-start">Check my two boxes</button>'+
 '<div id="chkmsg" style="font-size:14.5px"></div>'+
 '<div class="card"><div class="eyebrow foc">Sentence 1 — the link</div>'+
 '<p style="margin:0 0 6px;font-size:14.5px;color:var(--muted)">How do you go from the left box to the right box?</p>'+
 '<textarea id="lk" rows="2" style="width:100%;border:0;border-bottom:2px solid var(--amber);background:transparent;font-size:16px;padding:6px 0" placeholder="We choose a material when…"></textarea></div>'+
 '<div class="card"><div class="eyebrow foc">Sentence 2 — the hard one</div>'+
 '<p style="margin:0 0 10px;font-size:15px"><b>&ldquo;Lasts a long time&rdquo;</b> is a property.<br>Find one job it makes <b>easy</b>. Find one job it makes <b>impossible</b>. The same property, two times.</p>'+
 '<label style="font-size:13px;color:var(--green);font-weight:600">It makes this EASY</label>'+
 '<input id="dp" style="width:100%;border:0;border-bottom:2px solid var(--green);background:transparent;padding:6px 0;font-size:16px" placeholder="a water pipe that…">'+
 '<div style="height:12px"></div><label style="font-size:13px;color:var(--crimson);font-weight:600">It makes this IMPOSSIBLE</label>'+
 '<input id="dn" style="width:100%;border:0;border-bottom:2px solid var(--crimson);background:transparent;padding:6px 0;font-size:16px" placeholder="throwing it away and…"></div>'+
 '<div class="card locked" id="defc"><div class="eyebrow" style="color:#5E4B8B">Sentence 3 — our rule</div>'+
 '<p style="margin:0 0 6px;font-size:14.5px;color:var(--muted)">Finish the boxes above. Then this one opens.</p>'+
 '<textarea id="df" rows="2" style="width:100%;border:0;border-bottom:2px solid #5E4B8B;background:transparent;font-size:16px;padding:6px 0" placeholder="A good material is…"></textarea></div>'+
 '<div id="say"></div></div></div>';
 const up8=gateBy(8,s.querySelector("#propwork"));
 ccqBlock(8,L.ccq[8],s.querySelector("#ccq8"),up8);
 ccqBlock("say",L.sayback,s.querySelector("#say"));
 drawTiles();
 s.querySelectorAll(".quad").forEach(q=>{q.onclick=()=>{if(!qsel)return;S.quad[qsel]=q.dataset.b;qsel=null;save();drawTiles();after(S.stage);};});
 s.querySelector("#chk").onclick=()=>{
  if(!ALLT.every(([t])=>S.quad[t])){$("#chkmsg").innerHTML='<span style="color:var(--amber)">Put every word in a box first.</span>';return;}
  const w=ALLT.filter(([t,k])=>S.quad[t]!==k).length;
  $("#chkmsg").innerHTML=w===0
   ?'<span style="color:var(--green);font-weight:600">All correct. A property is what the material IS. A job is what it DOES.</span>'
   :'<span style="color:var(--crimson);font-weight:600">'+w+' '+(w===1?"word is":"words are")+' in the wrong box.</span> Ask: is this what it <b>is</b>, or what it <b>does</b>?';
 };
 const lk=s.querySelector("#lk"),dp=s.querySelector("#dp"),dn=s.querySelector("#dn"),df=s.querySelector("#df");
 lk.value=S.link;dp.value=S.durPos;dn.value=S.durNeg;df.value=S.def;
 const g=()=>{const ok=txt(S.link).length>=8&&txt(S.durPos).length>=2&&txt(S.durNeg).length>=2;
  s.querySelector("#defc").classList.toggle("locked",!ok);after(S.stage);};
 lk.oninput=()=>{S.link=lk.value;save();g();};
 dp.oninput=()=>{S.durPos=dp.value;save();g();};
 dn.oninput=()=>{S.durNeg=dn.value;save();g();};
 df.oninput=()=>{S.def=df.value;save();after(S.stage);};
 g();
 extra(S.stage,s.querySelector(".stack"));
}
function drawTiles(){
 const t=document.getElementById("tiles");if(!t)return;t.innerHTML="";
 ALLT.forEach(([w])=>{if(S.quad[w])return;
  const b=el("button","tile"+(qsel===w?" sel":""),w);
  b.onclick=()=>{qsel=(qsel===w?null:w);drawTiles();};
  t.appendChild(b);});
 document.querySelectorAll(".quad").forEach(q=>{
  const box=q.querySelector(".chips");box.innerHTML="";
  ALLT.filter(([w])=>S.quad[w]===q.dataset.b).forEach(([w])=>{
   const c=el("span","chip",esc(w)+'<button aria-label="Remove">&times;</button>');
   c.querySelector("button").onclick=e=>{e.stopPropagation();delete S.quad[w];save();drawTiles();after(S.stage);};
   box.appendChild(c);});
  q.classList.toggle("armed",!!qsel);
 });
}

/* ───────── 9 · WHAT EACH PROPERTY DOES ───────── */
let tsel=null;
function rTable(){
 const s=document.getElementById("s"+S.stage);
 s.innerHTML=head("Focus","foc","What each property does","Seven properties. Match the meaning, then add one job of your own.",6)+
 '<div class="stack">'+
 '<div class="hint">Tap a meaning below. Then tap the empty box next to the property it belongs to.<br>'+
 '<span class="vn">Chạm vào một nghĩa, rồi chạm vào ô trống của tính chất đó.</span></div>'+
 '<div class="tiles" id="mbank"></div>'+
 '<div class="ptab" id="ptab"><div class="ph">Property</div><div class="ph">What it means</div>'+
 '<div class="ph">A job it makes possible</div></div>'+
 '<div class="warn"><b>Look at Durability.</b> It makes water pipes possible. Now think: what job does it make <b>impossible</b>? That is the big idea of today.</div>'+
 '</div>';
 drawTable();
 extra(S.stage,s.querySelector(".stack"));
}
function drawTable(){
 const bank=document.getElementById("mbank"),tab=document.getElementById("ptab");
 if(!bank||!tab)return;
 bank.innerHTML="";
 L.propTable.forEach((r,i)=>{
  if(Object.values(S.tbl).indexOf(i)>=0)return;
  const b=el("button","tile"+(tsel===i?" sel":""),r[1]);
  b.onclick=()=>{tsel=(tsel===i?null:i);drawTable();};
  bank.appendChild(b);
 });
 if(!bank.children.length)bank.innerHTML='<span style="font-size:13.5px;color:var(--green);font-weight:600">✓ All seven matched.</span>';
 tab.querySelectorAll(".prow").forEach(x=>x.remove());
 L.propTable.forEach((r,i)=>{
  const row=el("div","prow");
  const filled=S.tbl[i]!=null;
  row.innerHTML='<div class="pn">'+esc(r[0])+'</div>'+
   '<div class="pm'+(filled?" full":"")+'">'+(filled?esc(L.propTable[S.tbl[i]][1]):"tap a meaning →")+'</div>'+
   '<div class="pj"><div class="given">'+esc(r[2])+'</div>'+
   '<input placeholder="and one more…" aria-label="Your own job for '+esc(r[0])+'"></div>';
  const mcell=row.querySelector(".pm");
  mcell.onclick=()=>{
   if(filled){delete S.tbl[i];save();tsel=null;drawTable();after(S.stage);return;}
   if(tsel==null)return;
   if(tsel===i){S.tbl[i]=tsel;tsel=null;save();drawTable();after(S.stage);}
   else{mcell.classList.add("no");setTimeout(()=>mcell.classList.remove("no"),520);}
  };
  const inp=row.querySelector("input");
  inp.value=S.tjob[i]||"";
  inp.oninput=()=>{S.tjob[i]=inp.value;save();after(S.stage);};
  tab.appendChild(row);
 });
}

/* ───────── 8 · BOOK PAGE 25 ───────── */
let msel=null;
function sentence(i){
 const t=S.talk[i]||{},d=L.talk[i];
 if(d.single)return txt(t.a)?d.subject+" is a problem because "+t.a+".":"";
 return (txt(t.a)&&txt(t.b))?d.subject+" is used for "+t.a+" because it is "+t.b+".":"";
}
function r8(){
 const s=document.getElementById("s"+S.stage);
 s.innerHTML=head("Focus","foc","Book page 25","Question 1, then Talk and Write About It — all four.",5)+
 '<div class="stack"><div id="ccq9"></div><div id="bookwork" class="stack">'+
 '<div class="card"><div class="eyebrow foc">Q1 · match the material to the words</div><div id="mw"></div></div>'+
 '<div class="dark"><b>Every answer uses this sentence:</b>'+
 '<div style="font-family:var(--display);font-size:18px;color:#fff;margin-top:8px">&ldquo;______ is used for ______ because it is ______.&rdquo;</div>'+
 '<div style="font-size:13.5px;margin-top:8px;color:#9FC4D4">The last gap must be a <b>property</b>. That is the part your teacher marks.</div></div>'+
 '<div id="tw"></div></div></div>';
 const up9=gateBy(10,s.querySelector("#bookwork"));
 ccqBlock(10,L.ccq[10],s.querySelector("#ccq9"),up9);
 /* Q1 */
 const w=s.querySelector("#mw");
 const mrow=el("div","mrow");mrow.style.margin="10px 0 14px";
 L.match.forEach(([m])=>{
  const b=el("button","mat-b"+(S.match[m]?" ok":"")+(msel===m?" sel":""),m);
  b.style.flex="1 1 92px";
  b.onclick=()=>{if(S.match[m])return;msel=(msel===m?null:m);r8();};
  mrow.appendChild(b);});
 w.appendChild(mrow);
 L.match.map(x=>x[1]).slice().sort((a,b)=>a.length-b.length).forEach(d=>{
  const taken=Object.values(S.match).indexOf(d)>=0;
  const b=el("button","des-b"+(taken?" ok taken":""),d);
  b.style.width="100%";b.style.marginBottom="7px";
  b.onclick=()=>{if(!msel)return;
   if(d===L.match.find(m=>m[0]===msel)[1]){S.match[msel]=d;msel=null;save();r8();after(S.stage);}
   else{S.mTries++;save();b.classList.add("no");setTimeout(()=>b.classList.remove("no"),600);}};
  w.appendChild(b);});
 /* Talk & Write */
 const tw=s.querySelector("#tw");
 L.talk.forEach((d,i)=>tw.appendChild(builder(d,i)));
 extra(S.stage,s.querySelector(".stack"));
}
function builder(d,i){
 S.talk[i]=S.talk[i]||{a:"",b:""};
 const t=S.talk[i];
 const c=el("div","card");c.style.marginBottom="12px";
 const slot=(k,ph)=>'<button class="slot'+(txt(t[k])?"":" empty")+'" data-k="'+k+'">'+(txt(t[k])?esc(t[k]):ph)+'</button>';
 const line=d.single
  ? '&ldquo;<b>'+d.subject+'</b> is a problem because '+slot("a","____________")+'.&rdquo;'
  : '&ldquo;<b>'+d.subject+'</b> is used for '+slot("a","________")+' because it is '+slot("b","________")+'.&rdquo;';
 c.innerHTML='<div style="font-size:13px;color:var(--muted);margin-bottom:8px">'+d.q+'</div>'+
  '<div class="build">'+line+'</div><div class="bank"></div>';
 const bank=c.querySelector(".bank");
 const need=!txt(t.a)?"a":(!d.single&&!txt(t.b)?"b":null);
 if(need){
  const opts=need==="a"?d.b2:d.b3;
  bank.innerHTML='<div class="hd">'+(need==="a"?(d.single?"Choose one reason":"Choose one job"):"Choose one property")+'</div>';
  opts.forEach(o=>{const b=el("button",null,o);b.onclick=()=>{t[need]=o;save();redraw(c,d,i);after(S.stage);};bank.appendChild(b);});
  const own=el("button","own","✎ my own words");
  own.onclick=()=>{
   bank.innerHTML='<div class="hd">Write your own</div>';
   const inp=el("input");inp.style.cssText="flex:1;min-width:180px;border:0;border-bottom:2px solid var(--green);background:transparent;padding:6px 0;font-size:15px";
   const ok=el("button",null,"OK");
   ok.onclick=()=>{if(txt(inp.value)){t[need]=txt(inp.value);save();redraw(c,d,i);after(S.stage);}};
   bank.appendChild(inp);bank.appendChild(ok);inp.focus();
  };
  bank.appendChild(own);
 }else{
  bank.innerHTML='<div class="hd" style="color:var(--green)">&#10003; Done — tap a green word to change it</div>';
 }
 c.querySelectorAll(".slot").forEach(b=>{b.onclick=()=>{t[b.dataset.k]="";save();redraw(c,d,i);after(S.stage);};});
 return c;
}
function redraw(c,d,i){const n=builder(d,i);c.replaceWith(n);}

/* ───────── 9 · YOUR PAGE ───────── */
function checks(){
 return [
  [2,"You played the warm-up race", !!S.qz.warm],
  [3,"You read all eight words", L.words.every((w,i)=>S.read[i])],
  [4,"You made groups by material", goodGroups().length>=2&&Object.keys(S.placed).length>=12],
  [5,"You wrote two questions", txt(S.q1).length>=8&&txt(S.q2).length>=8],
  [6,"You chose a box and said why", S.stand!=null&&txt(S.standWhy).length>=4],
  [7,"You matched all six things", Object.keys(S.why).length===L.why.length],
  [7,"You found what comes after BECAUSE", S.whyQ===L.whyQ.right],
  [8,"Every word is in a box", ALLT.every(([t])=>S.quad[t])],
  [8,"No word is in the wrong box", ALLT.every(([t,k])=>S.quad[t]===k)],
  [8,"Sentence 1 — the link", txt(S.link).length>=8],
  [8,"Sentence 2 — easy AND impossible", txt(S.durPos).length>=2&&txt(S.durNeg).length>=2],
  [8,"Sentence 3 — our rule", txt(S.def).length>=8],
  [8,"You said the rule back", saybackDone()],
  [9,"All 7 property meanings matched", L.propTable.every((r,i)=>S.tbl[i]===i)],
  [9,"You added jobs of your own", L.propTable.filter((r,i)=>txt(S.tjob[i]).length>2).length>=4],
  [10,"Book Q1 — all five matched", Object.keys(S.match).length===L.match.length],
  [10,"Talk and Write — all four sentences", L.talk.every((t,i)=>talkDone(i))],
  [11,"You played the exit ticket race", !!S.qz.exit]
 ];
}
function r9(){
 const s=document.getElementById("s"+S.stage);
 const ck=checks().filter(c=>live(c[0])&&!S.excused[c[0]]),miss=ck.filter(c=>!c[2]);
 const row=(k,v)=>'<div class="row"><div class="k">'+k+'</div><div class="v">'+(txt(v)?esc(v):'<em>not answered</em>')+'</div></div>';
 const gl=S.groups.filter(g=>txt(g.n)||g.items.length)
   .map(g=>'<b>'+esc(txt(g.n)||"(no name)")+'</b> — '+(g.items.map(i=>L.pile[+i.slice(1)][1]).join(", ")||"empty")).join("<br>");
 const props=ALLT.filter(([t])=>S.quad[t]==="p").map(x=>x[0]).join(", ")||"—";
 const funcs=ALLT.filter(([t])=>S.quad[t]==="f").map(x=>x[0]).join(", ")||"—";
 const wrong=ALLT.filter(([t,k])=>S.quad[t]&&S.quad[t]!==k).map(x=>x[0]);
 const standW=S.stand==null?"":["I do not agree","I am not sure — it depends","I agree"][S.stand];

 s.innerHTML='<div class="noprint">'+head("Finish","","Your page","Check the list. Fix anything with a red cross. Then save it.",2)+
 '<div class="card" style="margin-bottom:16px"><div class="eyebrow">'+(miss.length?miss.length+" thing"+(miss.length>1?"s":"")+" to fix":"Everything is finished")+'</div><div id="cks"></div></div></div>'+
 '<div class="sum" id="paper">'+
 '<div style="display:flex;justify-content:space-between;align-items:baseline;gap:12px;flex-wrap:wrap;border-bottom:2px solid var(--ink);padding-bottom:10px">'+
 '<div><div style="font-family:var(--display);font-size:22px;font-weight:700;color:var(--ink)">'+(esc(txt(S.name))||"(no name)")+'</div>'+
 '<div style="font-size:13px;color:var(--muted)">Class '+(esc(txt(S.cls))||"—")+' · Grade 6 Science in English · Week 5 · Materials &amp; Plastic · E9</div></div>'+
 '<div style="font-size:12px;color:var(--muted)">'+new Date().toLocaleDateString("en-GB")+'</div></div>'+
 (S.qz.warm||S.qz.exit?'<h3>My two races</h3><div class="racebox">'+
   '<div><span>Warm-up</span><b>'+((S.qz.warm||{}).pts||0)+'</b><i>'+((S.qz.warm||{}).correct||0)+'/10 correct</i></div>'+
   '<div class="arrow">→</div>'+
   '<div><span>Exit ticket</span><b>'+((S.qz.exit||{}).pts||0)+'</b><i>'+((S.qz.exit||{}).correct||0)+'/10 correct</i></div>'+
   '<div class="grew">'+(((S.qz.exit||{}).correct||0)-((S.qz.warm||{}).correct||0)>=0?"+":"")+
     (((S.qz.exit||{}).correct||0)-((S.qz.warm||{}).correct||0))+' more correct</div></div>':"")+
 '<h3>My groups</h3><div style="font-size:14px">'+(gl||"<em>no groups</em>")+'</div>'+
 '<h3>My questions</h3><dl>'+row("Question 1 (box "+(S.qs[1]||"—")+")",S.q1)+row("Question 2 (box "+(S.qs[2]||"—")+")",S.q2)+'</dl>'+
 '<h3>Where I stand</h3><dl>'+row("My box",standW)+row("Because",S.standWhy)+'</dl>'+
 '<h3>Why is it made of that?</h3><dl>'+row("Matched",Object.keys(S.why).length+"/6")+
 row("After BECAUSE comes",S.whyQ==null?"":L.whyQ.opts[S.whyQ])+'</dl>'+
 '<h3>Property and job</h3><dl>'+row("I said these are properties",props)+row("I said these are jobs",funcs)+
 row("In the wrong box",wrong.length?wrong.join(", "):"none")+
 row("The link",S.link)+row("Lasting makes EASY",S.durPos)+row("Lasting makes IMPOSSIBLE",S.durNeg)+row("Our rule",S.def)+'</dl>'+
 '<h3>What each property does</h3><dl>'+
 L.propTable.map((r,i)=>row(r[0],(S.tbl[i]===i?"✓ ":"✗ ")+(txt(S.tjob[i])?"my job: "+S.tjob[i]:"no job written"))).join("")+'</dl>'+
 '<h3>Book page 25</h3><dl>'+row("Q1 matching",Object.keys(S.match).length+"/5"+(S.mTries?" ("+S.mTries+" wrong tries)":" (first time)"))+
 L.talk.map((d,i)=>row(d.q,sentence(i))).join("")+'</dl>'+
 (Object.keys(S.extra).filter(k=>txt(S.extra[k])).length?'<h3>Extra work</h3><dl>'+
   Object.keys(S.extra).filter(k=>txt(S.extra[k])).map(k=>row("Screen "+k,S.extra[k])).join("")+'</dl>':"")+
 '<div style="margin-top:20px;padding-top:10px;border-top:1px solid var(--line);font-size:12px;color:var(--muted)">Next lesson: name one thing about plastic that is the reason we use it AND the reason it is a problem.</div>'+
 '</div>'+
 '<div class="noprint" style="display:flex;gap:10px;margin-top:16px;flex-wrap:wrap">'+
 '<button class="btn g" id="pr">Save as PDF / Print</button>'+
 '<button class="btn ghost" id="cp">Copy my answers</button></div>'+
 '<div class="noprint hint" style="margin-top:12px">On a phone: tap <b>Save as PDF</b>, then send the file to your teacher. If that does not work, tap <b>Copy my answers</b> and paste it in the chat.</div>';

 const cw=s.querySelector("#cks");
 ck.forEach(([scr,label,ok])=>{
  const r=el("div","chkline",'<div class="st '+(ok?"y":"n")+'">'+(ok?"&#10003;":"&#10007;")+'</div>'+
   '<div class="tx">'+label+'<span class="q">Screen '+scr+'</span></div>');
  if(!ok){const g=el("button","go","Go to "+scr);g.onclick=()=>show(scr);r.appendChild(g);}
  cw.appendChild(r);
 });
 s.querySelector("#pr").onclick=()=>window.print();
 s.querySelector("#cp").onclick=()=>{
  const t=s.querySelector("#paper").innerText,b=s.querySelector("#cp");
  const ok=()=>{b.textContent="Copied";setTimeout(()=>b.textContent="Copy my answers",1800);};
  if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(t).then(ok,()=>{});
  else{const ta=document.createElement("textarea");ta.value=t;document.body.appendChild(ta);ta.select();try{document.execCommand("copy");ok();}catch(e){}ta.remove();}
 };
}

/* ───────── remote unlock ───────── */
let watching=false,lastPush=0,seenReset=0;
try{seenReset=+localStorage.getItem("g6w5reset")||0;}catch(e){}
function toast(msg){
 let t=$("#toast");
 if(!t){t=el("div","",'');t.id="toast";document.body.appendChild(t);}
 t.textContent=msg;t.classList.add("on");
 clearTimeout(t._h);t._h=setTimeout(()=>t.classList.remove("on"),4200);
}
function watchRemote(){
 if(PREVIEW||!window.SYNC||!SYNC.available())return;
 if(watching)return;
 watching=true;
 SYNC.watchStage(S.cls,n=>{
  const was=remoteStage;remoteStage=n||1;
  if(remoteStage===was){refresh();return;}
  for(let i=1;i<=remoteStage;i++)S.open[i]=true;save();
  /* the teacher moves the whole class, finished or not */
  if(S.stage!==remoteStage&&txt(S.name).length>=2){
   if(remoteStage>was&&!done(S.stage))toast("Your teacher moved the class on.");
   show(remoteStage);
  }else refresh();
 });
 SYNC.watchBoard(S.cls,rs=>{boardRows=rs||[];if(boardPaint)boardPaint();});
 SYNC.watchReset(v=>{
  if(!v||v<=seenReset)return;
  try{localStorage.setItem("g6w5reset",String(v));localStorage.removeItem(LSKEY);}catch(e){}
  location.reload();
 });
 SYNC.watchSkip(S.cls,sk=>{
  const before=JSON.stringify(S.skip);
  S.skip={};Object.keys(sk||{}).forEach(k=>{if(sk[k])S.skip[+k]=true;});
  if(JSON.stringify(S.skip)!==before){save();show(S.stage);}
 });
 SYNC.watchPush(S.cls,S.id,p=>{
  if(!p||!p.to||p.at===lastPush)return;
  lastPush=p.at;
  const to=Math.max(1,Math.min(N,p.to));
  if(to<=S.stage)return;
  for(let i=1;i<to;i++){S.open[i]=true;if(!done(i))S.excused[i]=true;}
  S.open[to]=true;save();
  toast("Your teacher moved you on. You do not need to finish that screen.");
  show(to);
 });
}

/* ───────── preview mode (teacher page iframe) ───────── */
if(PREVIEW){
 for(let i=1;i<=N;i++)S.open[i]=true;
 if(!txt(S.name))S.name="Preview";
 S.cls="";
 document.documentElement.classList.add("previewing");
 window.addEventListener("message",e=>{
  const m=e.data||{};
  if(m.skip){S.skip={};Object.keys(m.skip).forEach(k=>{if(m.skip[k])S.skip[+k]=true;});}
  if(m.go){for(let i=1;i<=N;i++)S.open[i]=true;save();show(Math.max(1,Math.min(N,m.go)));}
  else if(m.skip){save();show(S.stage);}
  if(m.reset){try{localStorage.removeItem(LSKEY);}catch(x){}location.reload();}
 });
 try{parent.postMessage({ready:true},"*");}catch(e){}
}

/* ───────── boot ───────── */
S.open[1]=true;
liveBadge();
setTimeout(()=>{liveBadge();watchRemote();pushNow();},1200);
setTimeout(()=>{liveBadge();watchRemote();},4000);
setInterval(pushNow,15000);
show(Math.min(S.stage||1,N));
})();
