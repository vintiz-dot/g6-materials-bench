/* Teacher dashboard — live view + remote unlock */
(function(){
"use strict";
const L=window.LESSON, SC=L.screens, N=SC.length;
const $=s=>document.querySelector(s);
const el=(t,c,h)=>{const d=document.createElement(t);if(c)d.className=c;if(h!=null)d.innerHTML=h;return d;};
const esc=s=>String(s==null?"":s).replace(/[&<>"]/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[m]));
let room="", ref=null, students={}, stage=1, skip={};
try{skip=JSON.parse(localStorage.getItem("g6w5skip")||"{}");}catch(e){skip={};}
try{room=localStorage.getItem("g6w5room")||"";}catch(e){}

const A=[["quiz","Quiz scores"],["table","Property table"],["groups","Groups"],["q1","Question 1"],["q2","Question 2"],["qs","Sorted A/B/C"],
 ["stand","Stands"],["standWhy","Because"],["why","Why-matching"],["quadWrong","Wrong box"],
 ["link","Link sentence"],["durPos","Lasting → easy"],["durNeg","Lasting → impossible"],
 ["def","Our rule"],["match","Book Q1"],["talk","Talk & Write"],["extra","Extra work"]];

function boot(){
 $("#app").innerHTML=
 '<div class="eyebrow">The Olympia Schools · Grade 6 · Week 5 · Period E9</div>'+
 '<h2 class="title">Teacher control</h2>'+
 '<p class="sub">Type the class, then open the screens one at a time. You see every student as they work.</p>'+
 '<div class="tbar"><label style="font-size:13px;color:var(--muted)">Class</label>'+
 '<input id="room" placeholder="6H1" value="'+esc(room)+'">'+
 '<span class="pillstat" id="stat">not connected</span>'+
 '<span class="pillstat" id="count">0 students</span></div>'+
 '<div class="card" style="margin-bottom:16px"><div class="eyebrow">Open the screens</div>'+
 '<div id="steps" style="display:flex;gap:7px;flex-wrap:wrap;margin:10px 0"></div>'+
 '<div class="eyebrow" style="margin-top:14px">Not using a screen today? Switch it off</div>'+
 '<div id="skips" style="display:flex;gap:7px;flex-wrap:wrap;margin:10px 0"></div>'+
 '<div style="display:flex;gap:10px;flex-wrap:wrap"><button class="btn ghost" id="minus">&larr; Close one</button>'+
 '<button class="btn g" id="plus">Open the next screen &rarr;</button>'+
 '<button class="btn ghost" id="wipe" style="color:var(--crimson);border-color:var(--crimson)">Clear the class</button></div>'+
 '<div class="hint" style="margin-top:12px" id="codehint"></div></div>'+
 '<div class="tsplit">'+
 '<div class="tprev"><div class="card"><div style="display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap;margin-bottom:10px">'+
 '<div class="eyebrow" style="margin:0">What the class sees now</div>'+
 '<div style="display:flex;gap:7px"><button class="btn ghost" id="pvreload" style="padding:5px 11px;font-size:12.5px">Reset</button>'+
 '<a class="btn ghost" id="pvopen" href="index.html" target="_blank" rel="noopener" style="padding:5px 11px;font-size:12.5px;text-decoration:none">Open full size</a></div></div>'+
 '<div class="frame"><iframe id="pv" title="Student view" src="index.html?preview=1"></iframe></div>'+
 '<div id="race"></div>'+
 '<div style="font-size:12.5px;color:var(--muted);margin-top:9px">This is a real copy of the student page. Click about in it — nothing you do here reaches the class or the board.</div>'+
 '</div></div>'+
 '<div class="tstu">'+
 '<div class="tbar"><button class="btn ghost" id="sortn">Sort by name</button>'+
 '<button class="btn ghost" id="sortp">Sort by progress</button>'+
 '<label class="pillstat" style="font-weight:500;display:flex;align-items:center;gap:8px;cursor:pointer"><input type="checkbox" id="only" style="width:16px;height:16px;accent-color:var(--green)"> show only students who are behind</label></div>'+
 '<div class="tgrid" id="grid"></div><div id="empty"></div></div></div>';

 steps();skips();codes();paint();
 $("#pvreload").onclick=()=>{const f=$("#pv");f.src="index.html?preview=1&r="+Date.now();};
 window.addEventListener("message",e=>{if(e.data&&e.data.ready)beam();});
 $("#room").oninput=e=>{room=e.target.value;try{localStorage.setItem("g6w5room",room);}catch(x){}connect();};
 $("#plus").onclick=()=>setStage(nextLive(stage,1));
 $("#minus").onclick=()=>setStage(nextLive(stage,-1));
 $("#wipe").onclick=()=>{if(confirm("Remove every student's work from this class board? Their own device keeps their work."))
   {if(window.SYNC)SYNC.clearRoom(room);students={};paint();}};
 $("#sortn").onclick=()=>{sortBy="n";paint();};
 $("#sortp").onclick=()=>{sortBy="p";paint();};
 $("#only").onchange=paint;
 connect();
}
let sortBy="n";

function steps(){
 const w=$("#steps");w.innerHTML="";
 SC.forEach(c=>{
  const off=!!skip[c.n], on=c.n<=stage&&!off;
  const b=el("button",null,c.n+" · "+c.short);
  b.style.cssText="border-radius:9px;padding:7px 12px;font-size:13px;font-weight:600;border:1.5px solid "+
   (on?"var(--green)":"var(--line)")+";background:"+(on?"var(--soft)":"transparent")+";color:"+
   (off?"var(--muted)":on?"var(--green)":"var(--muted)")+(off?";text-decoration:line-through;opacity:.5":"");
  b.disabled=off;
  b.onclick=()=>setStage(c.n);
  w.appendChild(b);
 });
}
function skips(){
 const w=$("#skips");w.innerHTML="";
 SC.filter(c=>c.n>1&&c.n<SC.length).forEach(c=>{
  const off=!!skip[c.n];
  const b=el("button",null,(off?"\u2715 ":"")+c.n+" \u00b7 "+c.short);
  b.style.cssText="border-radius:9px;padding:7px 12px;font-size:13px;font-weight:600;border:1.5px solid "+
   (off?"var(--crimson)":"var(--line)")+";background:"+(off?"var(--warnBg)":"transparent")+";color:"+
   (off?"var(--crimson)":"var(--muted)");
  b.onclick=()=>{if(off)delete skip[c.n];else skip[c.n]=true;
   try{localStorage.setItem("g6w5skip",JSON.stringify(skip));}catch(x){}
   if(window.SYNC&&SYNC.available()&&room)SYNC.setSkip(room,skip);
   steps();skips();codes();beam();};
  w.appendChild(b);
 });
 const off=Object.keys(skip).length;
 w.appendChild(el("span","",'<span style="font-size:13px;color:var(--muted);align-self:center">'+
  (off?"Students jump straight over "+(off===1?"that screen":"those screens")+".":"All screens are on.")+'</span>'));
}
function codes(){
 $("#codehint").innerHTML='<b>If a student cannot connect</b>, read the code for that screen out loud:<br>'+
  SC.filter(c=>c.code&&!skip[c.n]).map(c=>c.n+" "+c.short+" = <b>"+c.code+"</b>").join(" &nbsp;·&nbsp; ");
}
function nextLive(from,dir){let i=from+dir;
 while(i>=1&&i<=N&&skip[i])i+=dir;
 return Math.max(1,Math.min(N,i));}
function setStage(n){stage=n;steps();beam();race();if(window.SYNC&&SYNC.available()&&room)SYNC.setStage(room,n);}
function beam(){const f=$("#pv");if(!f||!f.contentWindow)return;
 try{f.contentWindow.postMessage({go:stage,skip:skip},"*");}catch(e){}}

function connect(){
 const ok=window.SYNC&&SYNC.available();
 $("#stat").textContent=!window.SYNC||!SYNC.configured?"no Firebase set up — codes only":ok?(room?"live · "+SYNC.room(room):"type a class"):"cannot reach Firebase";
 if(!ok||!room)return;
 if(ref)SYNC.unwatch(ref);
 ref=SYNC.watchStudents(room,d=>{students=d||{};paint();});
 SYNC.setStage(room,stage);
 SYNC.setSkip(room,skip);
}

function race(){
 const w=$("#race");if(!w)return;
 const cfg=SC[stage-1], which=cfg&&cfg.quiz;
 const rs=Object.keys(students).map(k=>students[k]).filter(Boolean);
 if(!which||!rs.length){w.innerHTML="";return;}
 const key=which==="warm"?"pw":"pe", ck=which==="warm"?"cw":"ce", spec=which==="warm"?L.quizWarm:L.quizExit;
 const board=rs.map(r=>({n:r.nk||r.n,p:r[key]||0,c:r[ck]})).sort((a,b)=>b.p-a.p);
 const finished=board.filter(r=>r.c!=null).length;
 /* per-question distribution */
 const dist=spec.map((q,i)=>{
   const c=[0,0,0,0];let seen=0;
   rs.forEach(r=>{const pk=((r.qa||{})[which==="warm"?"w":"e"]||[])[i];
     if(pk!=null&&pk>=0){c[pk]++;seen++;}else if(pk===-1)seen++;});
   return {q:q.q,a:q.a,c:c,seen:seen};
 });
 w.innerHTML='<div class="card" style="margin-top:14px"><div class="eyebrow">'+
  (which==="warm"?"Warm-up race":"Exit ticket race")+' · '+finished+' of '+rs.length+' finished</div>'+
  '<div class="lb" style="border:0;padding:0;margin:10px 0 4px">'+
  board.slice(0,8).map((r,i)=>'<div class="lbrow"><span class="pos">'+(i+1)+'</span>'+
   '<span class="who">'+esc(r.n)+'</span><span class="pt">'+r.p+'</span></div>').join("")+'</div>'+
  '<div class="eyebrow" style="margin-top:14px">How the class answered</div>'+
  dist.map((d,i)=>{
   const tot=Math.max(1,d.c.reduce((x,y)=>x+y,0));
   const pcRight=Math.round(d.c[d.a]/tot*100);
   if(!d.seen)return "";
   return '<div class="qd"><div class="qdq"><b>Q'+(i+1)+'</b> '+esc(d.q)+
    '<span class="qdp'+(pcRight<50?" low":"")+'">'+pcRight+'% right</span></div>'+
    '<div class="qdbar">'+d.c.map((v,k)=>'<i class="'+(k===d.a?"ok":"")+'" style="width:'+
      Math.round(v/tot*100)+'%" title="'+esc(spec[i].o[k])+': '+v+'"></i>').join("")+'</div></div>';
  }).join("")+'</div>';
}
function paint(){
 const g=$("#grid");g.innerHTML="";
 race();
 let rows=Object.keys(students).map(k=>students[k]).filter(Boolean);
 if($("#only").checked)rows=rows.filter(r=>(r.st||1)<stage||!(r.dn||[])[ (r.st||1)-1 ]);
 rows.sort(sortBy==="n"?(a,b)=>String(a.n).localeCompare(String(b.n))
                      :(a,b)=>((b.dn||[]).reduce((x,y)=>x+y,0))-((a.dn||[]).reduce((x,y)=>x+y,0)));
 $("#count").textContent=Object.keys(students).length+" student"+(Object.keys(students).length===1?"":"s");
 $("#empty").innerHTML=rows.length?"":'<div class="hint">Nobody has opened the page for this class yet. Check the class name matches what the students type on screen 1.</div>';
 rows.forEach(r=>{
  const stale=Date.now()-(r.up||0)>90000;
  const c=el("div","stu"+(stale?" stale":""));
  const cur=r.st||1, stuck=!((r.dn||[])[cur-1]);
  c.innerHTML='<div class="nm">'+esc(r.n)+'</div>'+
   '<div class="meta">screen '+cur+' of '+N+' · '+ago(r.up)+(stuck?' · <span style="color:var(--amber);font-weight:600">not finished</span>':'')+'</div>'+
   '<div class="bars">'+SC.map((s,i)=>'<i class="'+((r.ex||[])[i]?"c":((r.dn||[])[i]?"d":""))+'"></i>').join("")+'</div>'+
   (r.pw||r.pe?'<div class="r"><div class="k">Races</div><div class="v">warm-up <b>'+(r.pw||0)+
     '</b>'+(r.ce!=null?' → exit <b>'+(r.pe||0)+'</b>'+
     (r.cw!=null?' · <span style="color:var(--green);font-weight:700">'+((r.ce-r.cw)>=0?"+":"")+(r.ce-r.cw)+' correct</span>':""):"")+
     '</div></div>':"")+
   A.map(([k,lab])=>{const v=(r.a||{})[k];if(v==null||String(v).trim()==="")return "";
     return '<div class="r"><div class="k">'+lab+'</div><div class="v">'+esc(v)+'</div></div>';}).join("");
  const id=idOf(r);
  const act=el("div","");act.style.cssText="display:flex;gap:7px;margin-top:11px;flex-wrap:wrap;align-items:center";
  const pb=el("button","btn ghost","Move on →");
  pb.style.cssText="padding:6px 12px;font-size:13px";
  pb.title="Let this student go to the next screen without finishing this one";
  pb.onclick=()=>{if(window.SYNC)SYNC.pushStudent(room,id,Math.min(N,cur+1));
   pb.textContent="Moved";setTimeout(()=>{pb.textContent="Move on →";},1800);};
  const jb=document.createElement("select");
  jb.style.cssText="border:1.5px solid var(--line);border-radius:9px;padding:6px 9px;font-size:13px;background:var(--card);color:var(--text)";
  jb.innerHTML='<option value="">send to screen…</option>'+SC.filter(x=>!skip[x.n]).map(x=>'<option value="'+x.n+'">'+x.n+' · '+x.short+'</option>').join("");
  jb.onchange=()=>{if(jb.value&&window.SYNC){SYNC.pushStudent(room,id,+jb.value);jb.value="";}};
  act.appendChild(pb);act.appendChild(jb);c.appendChild(act);
  g.appendChild(c);
 });
}
function idOf(r){return Object.keys(students).find(k=>students[k]===r)||"";}
function ago(t){if(!t)return "—";const s=Math.round((Date.now()-t)/1000);
 return s<10?"just now":s<60?s+"s ago":Math.round(s/60)+" min ago";}

boot();
setInterval(()=>{paint();},10000);
setTimeout(connect,1500);
})();
