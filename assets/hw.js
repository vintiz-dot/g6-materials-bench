/* Homework page — Grade 6 W5 · Why is it made of that? */
(function(){
"use strict";
const H=window.HW, K="g6hw5";
const $=s=>document.querySelector(s);
const el=(t,c,h)=>{const d=document.createElement(t);if(c)d.className=c;if(h!=null)d.innerHTML=h;return d;};
const esc=s=>String(s==null?"":s).replace(/[&<>"]/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[m]));
const txt=v=>String(v==null?"":v).trim();

const BLANK={id:"",name:"",cls:"",p1:[],p2:[],p3:{},p4:{},p5:{},chk:[],sub:false,subAt:0};
let S;
try{S=Object.assign({},BLANK,JSON.parse(localStorage.getItem(K)||"{}"));}catch(e){S=Object.assign({},BLANK);}
if(!S.id)S.id="h"+Math.random().toString(36).slice(2,10);
for(let i=0;i<9;i++)S.p1[i]=S.p1[i]||{t:"",p:"",j:""};
for(let i=0;i<3;i++)S.p2[i]=S.p2[i]||{obj:"",v:["","",""],w:["","",""]};

let pT=null;
function save(){try{localStorage.setItem(K,JSON.stringify(S));}catch(e){}
 clearTimeout(pT);pT=setTimeout(push,1500);paintProgress();}
function push(){
 if(!window.SYNC||!SYNC.available()||txt(S.name).length<2)return;
 SYNC.push("",S.id,{
  n:txt(S.name), c:txt(S.cls), up:Date.now(),
  sub:!!S.sub, subAt:S.subAt||0,
  pct:pct(),
  p1:S.p1.map((r,i)=>({m:H.p1.rows[i],t:txt(r.t),p:txt(r.p),j:txt(r.j)})),
  p2:S.p2.map(r=>({obj:txt(r.obj),v:r.v.map(txt),w:r.w.map(txt)})),
  p3:{a:txt(S.p3.a),b1:txt(S.p3.b1),b2:txt(S.p3.b2),c1:txt(S.p3.c1),c2:txt(S.p3.c2),ct:txt(S.p3.ct)},
  p4:{a1:txt(S.p4.a1),a2:txt(S.p4.a2),b:txt(S.p4.b),c:txt(S.p4.c)},
  p5:{easy:txt(S.p5.easy),hard:txt(S.p5.hard)},
  chk:[0,1,2].map(i=>S.chk[i]?1:0)
 });
}
function p1done(){return S.p1.filter(r=>txt(r.t)&&txt(r.p)&&txt(r.j)).length;}
function p2done(){return S.p2.filter(r=>txt(r.obj)&&r.v.filter(txt).length>=2).length;}
function p3done(){return !!(txt(S.p3.a)&&txt(S.p3.b1)&&txt(S.p3.b2)&&txt(S.p3.c1)&&txt(S.p3.c2));}
function p4done(){return !!(txt(S.p4.a1)&&txt(S.p4.b)&&txt(S.p4.c));}
function p5done(){return !!(txt(S.p5.easy)&&txt(S.p5.hard));}
function core(){return p1done()===9&&p2done()===3&&p3done();}
function pct(){
 const bits=[p1done()/9, p2done()/3, p3done()?1:0, p4done()?1:0, p5done()?1:0];
 return Math.round((bits[0]*35+bits[1]*25+bits[2]*20+bits[3]*15+bits[4]*5));
}

/* ───────── build the page ───────── */
function build(){
 const m=H.meta;
 $("#hdr").innerHTML=
  '<div><h1>'+esc(H.meta.title)+'</h1><p class="sub">Homework · '+esc(m.grade)+' · '+esc(m.subject)+
  ' · '+esc(m.week)+' · '+esc(m.pages)+'</p></div>';

 const w=$("#work");

 /* who */
 const who=el("div","card");
 who.innerHTML='<div class="two"><div><label for="nm">Your name · Tên của bạn</label>'+
  '<input id="nm" placeholder="Nguyễn Minh Anh"></div>'+
  '<div><label for="cl">Your class · Lớp</label><input id="cl" placeholder="6H1"></div></div>';
 w.appendChild(who);
 const nm=who.querySelector("#nm"),cl=who.querySelector("#cl");
 nm.value=S.name;cl.value=S.cls;
 nm.oninput=()=>{S.name=nm.value;save();};
 cl.oninput=()=>{S.cls=cl.value;save();};

 w.appendChild(el("div","bigq",'<span>The question this homework answers</span><b>'+esc(H.bigQ)+'</b>'));

 /* part 1 */
 w.appendChild(part(1,H.p1.title,H.p1.mins));
 w.appendChild(el("p","lead",H.p1.lead+'<br><span class="vn">'+esc(H.p1.vn)+'</span>'));
 const t1=el("div","tblwrap");
 t1.innerHTML='<table class="t1"><thead><tr><th>Material</th><th>The thing I found</th>'+
  '<th>A property I tested with my hands</th><th>The job that property makes possible</th></tr></thead>'+
  '<tbody><tr class="eg"><td>example</td><td>'+esc(H.p1.eg[0])+'</td><td>'+esc(H.p1.eg[1])+'</td><td>'+esc(H.p1.eg[2])+'</td></tr></tbody></table>';
 const tb=t1.querySelector("tbody");
 H.p1.rows.forEach((mat,i)=>{
  const tr=el("tr");
  tr.innerHTML='<td class="lab">'+mat+'</td><td><input data-k="t"></td><td><input data-k="p"></td><td><input data-k="j"></td>';
  tr.querySelectorAll("input").forEach(inp=>{
   const k=inp.dataset.k; inp.value=S.p1[i][k]||"";
   inp.oninput=()=>{S.p1[i][k]=inp.value;save();};
  });
  tb.appendChild(tr);
 });
 w.appendChild(t1);

 /* part 2 */
 w.appendChild(part(2,H.p2.title,H.p2.mins));
 w.appendChild(el("p","lead",H.p2.lead));
 const swaps=el("div","swaps");
 swaps.appendChild(el("div","swap eg",
  '<div class="so"><span>example</span><b>'+esc(H.p2.eg.obj)+'</b></div>'+
  H.p2.mats.map((mm,k)=>'<div class="sm"><span>made of '+mm+'?</span><b>'+esc(H.p2.eg.v[k])+'</b>'+
   (H.p2.eg.why[k]?'<i>'+esc(H.p2.eg.why[k])+'</i>':'')+'</div>').join("")));
 S.p2.forEach((row,i)=>{
  const d=el("div","swap");
  d.innerHTML='<div class="so"><span>my object '+(i+1)+'</span><input class="objin" placeholder="e.g. a spoon"></div>'+
   H.p2.mats.map((mm,k)=>'<div class="sm"><span>made of '+mm+'?</span>'+
    '<div class="vb" data-k="'+k+'">'+H.p2.verdicts.map(v=>'<button data-v="'+v+'">'+v+'</button>').join("")+'</div>'+
    '<input class="why" data-k="'+k+'" placeholder="which property is missing?" hidden></div>').join("");
  const oi=d.querySelector(".objin");oi.value=row.obj;
  oi.oninput=()=>{row.obj=oi.value;save();};
  d.querySelectorAll(".vb").forEach(vb=>{
   const k=+vb.dataset.k;
   const why=d.querySelector('.why[data-k="'+k+'"]');
   const paint=()=>{
    vb.querySelectorAll("button").forEach(b=>b.classList.toggle("on",b.dataset.v===row.v[k]));
    const fail=row.v[k]==="FAILS";
    why.hidden=!fail; if(fail)why.value=row.w[k]||"";
    hint(why,row.w[k]);
   };
   vb.querySelectorAll("button").forEach(b=>{
    b.onclick=()=>{row.v[k]=(row.v[k]===b.dataset.v)?"":b.dataset.v;
     if(row.v[k]!=="FAILS")row.w[k]="";save();paint();};
   });
   why.oninput=()=>{row.w[k]=why.value;save();hint(why,why.value);};
   paint();
  });
  swaps.appendChild(d);
 });
 w.appendChild(swaps);
 w.appendChild(el("div","warn","<b>Careful.</b> "+H.p2.warn+'<br><span class="vn">'+esc(H.p2.vn)+"</span>"));

 /* part 3 */
 w.appendChild(part(3,H.p3.title,H.p3.mins));
 w.appendChild(el("p","lead",H.p3.lead+" Use all three sentences."));
 const f=el("div","frames");
 f.innerHTML=
  '<div><b>1 ·</b> I say <input id="f1" class="mid" placeholder="yes / no / it depends"></div>'+
  '<div><b>2 ·</b> One thing it <b>WOULD</b> work for is <input id="f2a" placeholder="the object">, because that job needs <input id="f2b" placeholder="the property"> <span class="d">(a property).</span></div>'+
  '<div><b>3 ·</b> One thing it <b>WOULD NOT</b> work for is <input id="f3a" placeholder="the object">, because that job needs <input id="f3b" placeholder="the property"> <span class="d">(a property), and this material does not have it.</span></div>';
 w.appendChild(f);
 const map3={f1:"a",f2a:"b1",f2b:"b2",f3a:"c1",f3b:"c2"};
 Object.keys(map3).forEach(id=>{
  const inp=f.querySelector("#"+id),k=map3[id];
  inp.value=S.p3[k]||"";
  inp.oninput=()=>{S.p3[k]=inp.value;save();if(k==="b2"||k==="c2")hint(inp,inp.value);};
  if(k==="b2"||k==="c2")hint(inp,inp.value);
 });
 const ctr=el("div","warn");
 ctr.innerHTML='<b>Prove a classmate wrong.</b> '+H.p3.counter.q+
  '<textarea id="ct" rows="2" placeholder="'+esc(H.p3.counter.ph)+'"></textarea>';
 const ct=ctr.querySelector("#ct");ct.value=S.p3.ct||"";
 ct.oninput=()=>{S.p3.ct=ct.value;save();};
 w.appendChild(ctr);

 /* part 4 */
 w.appendChild(part(4,H.p4.title,H.p4.mins));
 w.appendChild(el("div","newmat",'<span>A factory invents a new material</span><b>'+esc(H.p4.card)+'</b>'));
 w.appendChild(el("p","lead",H.p4.lead));
 const f4=el("div","frames");
 f4.innerHTML='<div><b>a ·</b> '+esc(H.p4.a)+': <input id="a1" placeholder="one thing"> and <input id="a2" placeholder="another thing"></div>'+
  '<div><b>b ·</b> '+esc(H.p4.b)+': <input id="b" placeholder="one thing"></div>'+
  '<div><b>c ·</b> Why not? That job needs the property <input id="c" placeholder="the property"> <span class="d">, and this material does not have it.</span></div>';
 w.appendChild(f4);
 ["a1","a2","b","c"].forEach(id=>{const inp=f4.querySelector("#"+id);
  inp.value=S.p4[id]||"";inp.oninput=()=>{S.p4[id]=inp.value;save();if(id==="c")hint(inp,inp.value);};
  if(id==="c")hint(inp,inp.value);});

 /* part 5 */
 w.appendChild(part(5,H.p5.title,H.p5.mins,true));
 w.appendChild(el("p","lead",H.p5.lead));
 const f5=el("div","frames");
 f5.innerHTML='<div><b class="g">'+esc(H.p5.easy)+'</b><input id="e5" placeholder="e.g. making a water pipe that…"></div>'+
  '<div><b class="r">'+esc(H.p5.hard)+'</b><input id="h5" placeholder="e.g. throwing it away and…"></div>';
 w.appendChild(f5);
 [["e5","easy"],["h5","hard"]].forEach(([id,k])=>{const inp=f5.querySelector("#"+id);
  inp.value=S.p5[k]||"";inp.oninput=()=>{S.p5[k]=inp.value;save();};});

 /* bands + check + hand in */
 const bands=el("div","bands");
 H.bands.forEach(([a,b],i)=>bands.appendChild(el("div","b"+(i+1),'<span>'+esc(a)+'</span>'+esc(b))));
 w.appendChild(bands);

 const chk=el("div","chk");
 chk.innerHTML='<h3>Before you hand it in — tick these yourself</h3>';
 H.check.forEach((c,i)=>{
  const r=el("label","ckline",'<input type="checkbox"><span>'+c+'</span>');
  const b=r.querySelector("input");b.checked=!!S.chk[i];
  b.onchange=()=>{S.chk[i]=b.checked;save();};
  chk.appendChild(r);
 });
 w.appendChild(chk);

 const fin=el("div","finish");
 fin.innerHTML='<div id="finmsg"></div><div class="fbtns">'+
  '<button class="btn g" id="hand">Hand in my homework</button>'+
  '<button class="btn ghost" id="pr">Print it</button></div>';
 w.appendChild(fin);
 fin.querySelector("#pr").onclick=()=>window.print();
 fin.querySelector("#hand").onclick=()=>{
  if(txt(S.name).length<2){alert("Write your name at the top first.");window.scrollTo(0,0);return;}
  if(!core()&&!confirm("Parts 1, 2 and 3 are not finished.\n\nHand it in anyway?"))return;
  S.sub=true;S.subAt=Date.now();save();push();paintProgress();
  const f=$("#finmsg");f.className="ok";
  f.innerHTML="<b>Handed in.</b> Your teacher can see it now. You can still change your answers — it saves by itself.";
 };
 paintProgress();
}
function part(n,title,mins,opt){
 return el("div","part"+(opt?" opt":""),'<div class="pn">'+n+'</div><h2>'+esc(title)+'</h2>'+
  '<span class="mins">'+mins+' min</span>');
}
function hint(inp,val){
 const v=String(val||"").toLowerCase();
 const has=!v || H.propWords.some(w=>v.indexOf(w)>=0);
 inp.classList.toggle("nudge",!has);
 inp.title=has?"":"Name a property: hard, flexible, waterproof, see-through, light, cheap, lasts a long time…";
}
function paintProgress(){
 const p=pct(),bar=$("#bar2"),lab=$("#plab");
 if(bar)bar.style.width=p+"%";
 if(lab)lab.innerHTML=(S.sub?'<b class="in">Handed in</b> · ':'')+
  'Part 1 <b>'+p1done()+'/9</b> · Part 2 <b>'+p2done()+'/3</b> · Part 3 <b>'+(p3done()?"done":"—")+
  '</b> · Part 4 <b>'+(p4done()?"done":"—")+'</b> · Part 5 <b>'+(p5done()?"done":"—")+'</b>';
 const st=$("#livetx");
 if(st){const err=window.SYNC&&SYNC.lastError&&SYNC.lastError();
  st.textContent=err?("Not saving — "+err):(window.SYNC&&SYNC.available())?"Saved to your teacher":"Saved on this device";
  const lv=$("#live");if(lv){lv.classList.toggle("on",!!(window.SYNC&&SYNC.available())&&!err);lv.classList.toggle("err",!!err);}}
}
build();
if(window.SYNC&&SYNC.onError)SYNC.onError(()=>paintProgress());
setTimeout(()=>{paintProgress();push();},1500);
setInterval(push,20000);
window.addEventListener("beforeunload",push);
})();
