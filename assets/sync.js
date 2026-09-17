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
const ROOM = "LIVE";
function room(){ return ROOM; }

window.SYNC = {
  available(){ return !!boot(); },
  configured: ready,

  /* ---- student ---- */
  push(roomCode, id, payload){
    const d = boot(); if(!d) return;
    try{ d.ref("rooms/"+room(roomCode)+"/students/"+id).set(payload); }catch(e){}
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
    try{ d.ref("rooms/"+room(roomCode)+"/stage").set(n); }catch(e){}
  },
  setSkip(roomCode, obj){
    const d = boot(); if(!d) return;
    try{ d.ref("rooms/"+room(roomCode)+"/skip").set(obj||{}); }catch(e){}
  },
  pushStudent(roomCode, id, n){
    const d = boot(); if(!d) return;
    try{ d.ref("rooms/"+room(roomCode)+"/push/"+id).set({to:n, at:Date.now()}); }catch(e){}
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
  /* wipe everyone's work and reload every open page */
  endSession(){
    const d = boot(); if(!d) return;
    try{
      d.ref("rooms/"+room()+"/students").remove();
      d.ref("rooms/"+room()+"/push").remove();
      d.ref("rooms/"+room()+"/stage").set(1);
      d.ref("rooms/"+room()+"/reset").set(Date.now());
    }catch(e){}
  },
  watchReset(fn){
    const d = boot(); if(!d) return;
    try{ d.ref("rooms/"+room()+"/reset").on("value", s=>fn(s.val()||0)); }catch(e){}
  },
  room: room
};
})();
