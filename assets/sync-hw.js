/* Live sync. Works with Firebase Realtime Database when
   assets/firebase-config.js is filled in; otherwise every
   function is a safe no-op and the pages run offline. */
(function(){
"use strict";
const cfg = window.FIREBASE_CONFIG || {};
const ready = !!(cfg.databaseURL && cfg.apiKey);
let db = null, failed = false;

function boot(){
  if(!ready || db || failed) return db;
  try{
    if(typeof firebase === "undefined"){ failed = true; return null; }
    if(!firebase.apps.length) firebase.initializeApp(cfg);
    db = firebase.database();
  }catch(e){ failed = true; db = null; }
  return db;
}

/* One shared room. Everybody who opens the page is in it, whatever
   class they type — the class is only a label on their card. */
const ROOM = "G6HW5";
function room(){ return ROOM; }

/* Firebase rejects a write that contains undefined ANYWHERE inside the object,
   and it rejects the WHOLE write. Strip them before sending. */
function clean(v){
  if(v===undefined) return null;
  if(v===null || typeof v!=="object") return v;
  if(Array.isArray(v)) return v.map(x=>clean(x));
  const o={};
  for(const k in v){ if(v[k]!==undefined) o[k]=clean(v[k]); }
  return o;
}
/* A write must never fail silently again. */
let lastErr=null, onErr=null;
function fail(where,e){
  lastErr = where+": "+((e&&e.message)?e.message:e);
  try{ console.error("[SYNC] "+lastErr); }catch(x){}
  if(onErr) try{ onErr(lastErr); }catch(x){}
}
function okAgain(){ if(lastErr){ lastErr=null; if(onErr) onErr(null); } }

window.SYNC = {
  available(){ return !!boot(); },
  configured: ready,

  /* ---- student ---- */
  lastError(){ return lastErr; },
  onError(fn){ onErr = fn; if(fn) fn(lastErr); },

  push(roomCode, id, payload){
    const d = boot(); if(!d) return;
    try{
      d.ref("rooms/"+room()+"/students/"+id).set(clean(payload))
       .then(okAgain).catch(e=>fail("could not save your work",e));
    }catch(e){ fail("could not save your work",e); }
  },
  watchStage(roomCode, fn){
    const d = boot(); if(!d) return;
    try{ d.ref("rooms/"+room(roomCode)+"/stage").on("value", s=>fn(s.val()||1)); }catch(e){}
  },
  watchBoard(roomCode, fn){
    const d = boot(); if(!d) return;
    try{ d.ref("rooms/"+room(roomCode)+"/students").on("value", s=>{
      const v = s.val()||{}; fn(Object.keys(v).map(k=>Object.assign({id:k}, v[k])));
    }); }catch(e){}
  },
  watchSkip(roomCode, fn){
    const d = boot(); if(!d) return;
    try{ d.ref("rooms/"+room(roomCode)+"/skip").on("value", s=>fn(s.val()||{})); }catch(e){}
  },
  watchPush(roomCode, id, fn){
    const d = boot(); if(!d) return;
    try{ d.ref("rooms/"+room(roomCode)+"/push/"+id).on("value", s=>fn(s.val())); }catch(e){}
  },

  /* ---- teacher ---- */
  setStage(roomCode, n){
    const d = boot(); if(!d) return;
    try{ d.ref("rooms/"+room()+"/stage").set(n).catch(e=>fail("opening a screen",e)); }catch(e){ fail("opening a screen",e); }
  },
  setSkip(roomCode, obj){
    const d = boot(); if(!d) return;
    try{ d.ref("rooms/"+room()+"/skip").set(clean(obj)||{}).catch(e=>fail("switching a screen off",e)); }catch(e){ fail("switching a screen off",e); }
  },
  pushStudent(roomCode, id, n){
    const d = boot(); if(!d) return;
    try{ d.ref("rooms/"+room()+"/push/"+id).set({to:n, at:Date.now()}).catch(e=>fail("moving a student",e)); }catch(e){ fail("moving a student",e); }
  },
  watchStudents(roomCode, fn){
    const d = boot(); if(!d) return null;
    const ref = d.ref("rooms/"+room(roomCode)+"/students");
    try{ ref.on("value", s=>fn(s.val()||{})); }catch(e){}
    return ref;
  },
  unwatch(ref){ try{ if(ref) ref.off(); }catch(e){} },
  clearRoom(roomCode){
    const d = boot(); if(!d) return;
    try{ d.ref("rooms/"+room()+"/students").remove(); }catch(e){}
  },
  /* START: wipe every student's work, reload every open page, open the lesson */
  startSession(){
    const d = boot(); if(!d) return;
    try{
      d.ref("rooms/"+room()+"/students").remove();
      d.ref("rooms/"+room()+"/push").remove();
      d.ref("rooms/"+room()+"/stage").set(1);
      d.ref("rooms/"+room()+"/live").set(true);
      d.ref("rooms/"+room()+"/reset").set(Date.now());
    }catch(e){}
  },
  /* END: close the lesson and clear the board. Student work stays on their device. */
  endSession(){
    const d = boot(); if(!d) return;
    try{
      d.ref("rooms/"+room()+"/live").set(false);
      d.ref("rooms/"+room()+"/students").remove();
      d.ref("rooms/"+room()+"/push").remove();
    }catch(e){}
  },
  watchLive(fn){
    const d = boot(); if(!d) return;
    try{ d.ref("rooms/"+room()+"/live").on("value", s=>fn(s.val())); }catch(e){}
  },
  watchReset(fn){
    const d = boot(); if(!d) return;
    try{ d.ref("rooms/"+room()+"/reset").on("value", s=>fn(s.val()||0)); }catch(e){}
  },
  room: room
};
})();
