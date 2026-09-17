/* Teacher dashboard — live view + remote unlock */
(function(){
"use strict";
const L=window.LESSON, SC=L.screens, N=SC.length;
const $=s=>document.querySelector(s);
const el=(t,c,h)=>{const d=document.createElement(t);if(c)d.className=c;if(h!=null)d.innerHTML=h;return d;};
const esc=s=>String(s==null?"":s).replace(/[&<>"]/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[m]));
let room="", ref=null, students={}, stage=1;
try{room=localStorage.getItem("g6w5room")||"";}catch(e){}

const A=[["groups","Groups"],["q1","Question 1"],["q2","Question 2"],["qs","Sorted A/B/C"],
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
 '<div style="display:flex;gap:10px;flex-wrap:wrap"><button class="btn ghost" id="minus">&larr; Close one</button>'+
 '<button class="btn g" id="plus">Open the next screen &rarr;</button>'+
 '<button class="btn ghost" id="wipe" style="color:var(--crimson);border-color:var(--crimson)">Clear the class</button></div>'+
 '<div class="hint" style="margin-top:12px" id="codehint"></div></div>'+
 '<div class="tbar"><button class="btn ghost" id="sortn">Sort by name</button>'+
 '<button class="btn ghost" id="sortp">Sort by progress</button>'+
 '<label class="pillstat" style="font-weight:500;display:flex;align-items:center;gap:8px;cursor:pointer"><input type="checkbox" id="only" style="width:16px;height:16px;accent-color:var(--green)"> show only students who are behind</label></div>'+
 '<div class="tgrid" id="grid"></div><div id="empty"></div>';

 steps();codes();paint();
 $("#room").oninput=e=>{room=e.target.value;try{localStorage.setItem("g6w5room",room);}catch(x){}connect();};
 $("#plus").onclick=()=>setStage(Math.min(N,stage+1));
 $("#minus").onclick=()=>setStage(Math.max(1,stage-1));
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
  const on=c.n<=stage;
  const b=el("button",null,c.n+" · "+c.short);
  b.style.cssText="border-radius:9px;padding:7px 12px;font-size:13px;font-weight:600;border:1.5px solid "+
   (on?"var(--green)":"var(--line)")+";background:"+(on?"var(--soft)":"transparent")+";color:"+(on?"var(--green)":"var(--muted)");
  b.onclick=()=>setStage(c.n);
  w.appendChild(b);
 });
}
function codes(){
 $("#codehint").innerHTML='<b>If a student cannot connect</b>, read the code for that screen out loud:<br>'+
  SC.filter(c=>c.code).map(c=>c.n+" "+c.short+" = <b>"+c.code+"</b>").join(" &nbsp;·&nbsp; ");
}
function setStage(n){stage=n;steps();if(window.SYNC&&SYNC.available()&&room)SYNC.setStage(room,n);}

function connect(){
 const ok=window.SYNC&&SYNC.available();
 $("#stat").textContent=!window.SYNC||!SYNC.configured?"no Firebase set up — codes only":ok?(room?"live · "+SYNC.room(room):"type a class"):"cannot reach Firebase";
 if(!ok||!room)return;
 if(ref)SYNC.unwatch(ref);
 ref=SYNC.watchStudents(room,d=>{students=d||{};paint();});
 SYNC.setStage(room,stage);
}

function paint(){
 const g=$("#grid");g.innerHTML="";
 let rows=Object.keys(students).map(k=>students[k]).filter(Boolean);
 if($("#only").checked)rows=rows.filter(r=>(r.st||1)<stage||!(r.dn||[])[ (r.st||1)-1 ]);
 rows.sort(sortBy==="n"?(a,b)=>String(a.n).localeCompare(String(b.n))
                      :(a,b)=>((b.dn||[]).reduce((x,y)=>x+y,0))-((a.dn||[]).reduce((x,y)=>x+y,0)));
 $("#count").textContent=Object.keys(students).length+" student"+(Object.keys(students).length===1?"":"s");
 $("#empty").innerHTML=rows.length?"":'<div class="hint">Nobody has opened the page for this class yet. Check the class name matches what the students type on screen 1.</div>';
 rows.forEach(r=>{
  const stale=Date.now()-(r.up||0)>90000;
  const c=el("div","stu"+(stale?" stale":""));
  c.innerHTML='<div class="nm">'+esc(r.n)+'</div>'+
   '<div class="meta">screen '+(r.st||1)+' of '+N+' · '+ago(r.up)+'</div>'+
   '<div class="bars">'+SC.map((s,i)=>'<i class="'+((r.dn||[])[i]?"d":((r.st||1)>s.n?"c":""))+'"></i>').join("")+'</div>'+
   A.map(([k,lab])=>{const v=(r.a||{})[k];if(v==null||String(v).trim()==="")return "";
     return '<div class="r"><div class="k">'+lab+'</div><div class="v">'+esc(v)+'</div></div>';}).join("");
  g.appendChild(c);
 });
}
function ago(t){if(!t)return "—";const s=Math.round((Date.now()-t)/1000);
 return s<10?"just now":s<60?s+"s ago":Math.round(s/60)+" min ago";}

boot();
setInterval(()=>{paint();},10000);
setTimeout(connect,1500);
})();
