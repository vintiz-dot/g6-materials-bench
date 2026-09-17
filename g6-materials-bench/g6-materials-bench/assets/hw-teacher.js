/* Homework dashboard — who has handed in, and what they wrote */
(function(){
"use strict";
const H=window.HW;
const $=s=>document.querySelector(s);
const el=(t,c,h)=>{const d=document.createElement(t);if(c)d.className=c;if(h!=null)d.innerHTML=h;return d;};
const esc=s=>String(s==null?"":s).replace(/[&<>"]/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[m]));
const txt=v=>String(v==null?"":v).trim();
let subs={}, sortBy="name", onlyIn=false;

function boot(){
 $("#app").innerHTML=
 '<div class="eyebrow">The Olympia Schools · '+esc(H.meta.grade)+' · '+esc(H.meta.week)+' · homework</div>'+
 '<h2 class="title">'+esc(H.meta.title)+'</h2>'+
 '<p class="sub">Everything students type at home appears here. Nothing is marked automatically.</p>'+
 '<div class="tbar"><span class="pillstat" id="stat">connecting…</span>'+
 '<span class="pillstat" id="cnt">0</span>'+
 '<button class="btn ghost" id="sn">Sort by name</button>'+
 '<button class="btn ghost" id="sp">Sort by progress</button>'+
 '<label class="pillstat" style="font-weight:500;display:flex;gap:8px;align-items:center;cursor:pointer">'+
 '<input type="checkbox" id="only" style="width:16px;height:16px;accent-color:var(--green)"> only handed in</label>'+
 '<button class="btn g" id="csv" style="margin-left:auto">Download all answers (CSV)</button></div>'+
 '<div class="hint" style="margin-bottom:16px"><b>Mark one thing:</b> does every reason name a <b>property</b>? '+
 '“Wood is not see-through” ✓ · “Wood is wrong for a window” ✗. '+
 'Reasons that name no property word are highlighted in amber below.</div>'+
 '<div id="rows"></div>';
 $("#sn").onclick=()=>{sortBy="name";paint();};
 $("#sp").onclick=()=>{sortBy="pct";paint();};
 $("#only").onchange=e=>{onlyIn=e.target.checked;paint();};
 $("#csv").onclick=csv;
 connect();
}
function connect(){
 const ok=window.SYNC&&SYNC.available();
 const st=$("#stat");
 st.textContent=!window.SYNC||!SYNC.configured?"Firebase is not set up":ok?"● live":"cannot reach Firebase";
 st.style.color=ok?"var(--green)":"var(--crimson)";
 if(!ok)return;
 SYNC.watchBoard("",rs=>{subs={};(rs||[]).forEach(r=>subs[r.id]=r);paint();});
}
function nudge(v){
 const s=String(v||"").toLowerCase();
 if(!s)return false;
 return !H.propWords.some(w=>s.indexOf(w)>=0);
}
function val(v){return txt(v)?esc(txt(v)):'<em>—</em>';}
function reason(v){return txt(v)?('<span class="'+(nudge(v)?"amber":"")+'">'+esc(txt(v))+'</span>'):'<em>—</em>';}

function paint(){
 let rs=Object.keys(subs).map(k=>subs[k]).filter(r=>r&&txt(r.n));
 if(onlyIn)rs=rs.filter(r=>r.sub);
 rs.sort(sortBy==="name"?(a,b)=>txt(a.n).localeCompare(txt(b.n),'vi'):(a,b)=>(b.pct||0)-(a.pct||0));
 $("#cnt").textContent=rs.length+" student"+(rs.length===1?"":"s")+" · "+rs.filter(r=>r.sub).length+" handed in";
 const w=$("#rows");w.innerHTML="";
 if(!rs.length){w.innerHTML='<div class="hint">Nobody has started yet. Send them the homework link.</div>';return;}
 rs.forEach(r=>{
  const d=el("details","stu");
  const p1=(r.p1||[]).filter(x=>txt(x.t)&&txt(x.p)&&txt(x.j)).length;
  const p2=(r.p2||[]).filter(x=>txt(x.obj)).length;
  d.innerHTML='<summary><span class="nm">'+esc(txt(r.n))+'</span>'+
   '<span class="cls">'+esc(txt(r.c)||"—")+'</span>'+
   (r.sub?'<span class="in">handed in</span>':'<span class="wip">still working</span>')+
   '<span class="pc">'+(r.pct||0)+'%</span></summary>'+
   '<div class="body">'+
   '<h4>Part 1 · nine things ('+p1+'/9)</h4><table class="mini"><tr><th>Material</th><th>Thing</th><th>Property tested</th><th>Job it makes possible</th></tr>'+
   (r.p1||[]).map(x=>(txt(x.t)||txt(x.p)||txt(x.j))?('<tr><td>'+esc(x.m||"")+'</td><td>'+val(x.t)+'</td><td>'+reason(x.p)+'</td><td>'+val(x.j)+'</td></tr>'):"").join("")+
   '</table>'+
   '<h4>Part 2 · the swap test ('+p2+'/3)</h4>'+
   (r.p2||[]).map(x=>txt(x.obj)?('<div class="sw"><b>'+esc(x.obj)+'</b>'+
     ["PLASTIC","WOOD","GLASS"].map((m,k)=>'<span class="v '+((x.v||[])[k]==="FAILS"?"f":(x.v||[])[k]==="works"?"o":"")+'">'+
      m+': '+(txt((x.v||[])[k])||"—")+((x.v||[])[k]==="FAILS"?' — '+reason((x.w||[])[k]):'')+'</span>').join("")+'</div>'):"").join("")+
   '<h4>Part 3 · the big question</h4><dl>'+
   row("I say",(r.p3||{}).a)+
   row("WOULD work for",(r.p3||{}).b1)+
   rowR("…the property",(r.p3||{}).b2)+
   row("WOULD NOT work for",(r.p3||{}).c1)+
   rowR("…the property (assessed)",(r.p3||{}).c2)+
   row("Proves the classmate wrong",(r.p3||{}).ct)+'</dl>'+
   '<h4>Part 4 · the new material</h4><dl>'+
   row("Should replace",[txt((r.p4||{}).a1),txt((r.p4||{}).a2)].filter(Boolean).join(" · "))+
   row("Should NOT replace",(r.p4||{}).b)+
   rowR("Because that job needs",(r.p4||{}).c)+'</dl>'+
   ((txt((r.p5||{}).easy)||txt((r.p5||{}).hard))?'<h4>Part 5 · the hard one</h4><dl>'+
     row("Lasting makes EASY",(r.p5||{}).easy)+row("Lasting makes IMPOSSIBLE",(r.p5||{}).hard)+'</dl>':"")+
   '<div class="tick">Self-check: '+((r.chk||[]).filter(Boolean).length)+'/3 ticked · last saved '+ago(r.up)+
   (r.sub?' · handed in '+ago(r.subAt):'')+'</div>'+
   '</div>';
  w.appendChild(d);
 });
}
function row(k,v){return '<div class="r"><div class="k">'+k+'</div><div class="v">'+val(v)+'</div></div>';}
function rowR(k,v){return '<div class="r"><div class="k">'+k+'</div><div class="v">'+reason(v)+'</div></div>';}
function ago(t){if(!t)return "—";const s=Math.round((Date.now()-t)/1000);
 return s<60?"just now":s<3600?Math.round(s/60)+" min ago":Math.round(s/3600)+" h ago";}

function csv(){
 const rs=Object.keys(subs).map(k=>subs[k]).filter(r=>r&&txt(r.n))
   .sort((a,b)=>txt(a.n).localeCompare(txt(b.n),'vi'));
 const head=["Name","Class","Handed in","Percent"];
 for(let i=1;i<=9;i++)head.push("P1."+i+" material","P1."+i+" thing","P1."+i+" property","P1."+i+" job");
 for(let i=1;i<=3;i++){head.push("P2."+i+" object");
  ["plastic","wood","glass"].forEach(m=>head.push("P2."+i+" "+m,"P2."+i+" "+m+" why"));}
 head.push("P3 I say","P3 would work","P3 property","P3 would not work","P3 property (assessed)","P3 counter-case");
 head.push("P4 replace 1","P4 replace 2","P4 not replace","P4 property");
 head.push("P5 easy","P5 impossible","Self-check");
 const q=v=>'"'+String(v==null?"":v).replace(/"/g,'""').replace(/\r?\n/g," ")+'"';
 const lines=[head.map(q).join(",")];
 rs.forEach(r=>{
  const c=[txt(r.n),txt(r.c),r.sub?"yes":"no",(r.pct||0)+"%"];
  for(let i=0;i<9;i++){const x=(r.p1||[])[i]||{};c.push(x.m||"",txt(x.t),txt(x.p),txt(x.j));}
  for(let i=0;i<3;i++){const x=(r.p2||[])[i]||{};c.push(txt(x.obj));
   for(let k=0;k<3;k++)c.push(txt((x.v||[])[k]),txt((x.w||[])[k]));}
  const p3=r.p3||{},p4=r.p4||{},p5=r.p5||{};
  c.push(txt(p3.a),txt(p3.b1),txt(p3.b2),txt(p3.c1),txt(p3.c2),txt(p3.ct));
  c.push(txt(p4.a1),txt(p4.a2),txt(p4.b),txt(p4.c));
  c.push(txt(p5.easy),txt(p5.hard),((r.chk||[]).filter(Boolean).length)+"/3");
  lines.push(c.map(q).join(","));
 });
 const blob=new Blob(["﻿"+lines.join("\r\n")],{type:"text/csv;charset=utf-8"});
 const a=document.createElement("a");
 a.href=URL.createObjectURL(blob);
 a.download="G6_W5_homework_"+new Date().toISOString().slice(0,10)+".csv";
 document.body.appendChild(a);a.click();
 setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove();},1200);
}
boot();
setInterval(paint,15000);
setTimeout(connect,1500);
})();
