/* Lesson content — Grade 6, Week 5, Period E9 · Materials & Plastic
   The Olympia Schools, Hanoi · book pp. 24–25
   Language level: A1–A2. Short sentences. One idea per line. */

window.LESSON = {

goals: [
  ["Science goal",  "I can say WHY we use a material for a job."],
  ["Language goal", "I can say: “___ is used for ___ because it is ___.”"],
  ["Thinking goal", "I can say how ONE thing about a material can be good AND bad."]
],

/* ── screen 2 · all eight words from the book, page 24 ── */
words: [
  ["property","tính chất","Something a material IS. Hard. Soft. Light.",true],
  ["application","ứng dụng","The job we use a material for.",false],
  ["fossil fuel","nhiên liệu hoá thạch","Oil, gas and coal. They come from under the ground.",false],
  ["biodegradable","phân huỷ sinh học","It rots away. Nature eats it.",false],
  ["ore","quặng","Rock with metal inside it.",false],
  ["limestone","đá vôi","A soft white rock. We use it to make cement.",false],
  ["fabric","vải","Cloth. We make it from thin threads.",false],
  ["coal","than đá","A hard black rock. It burns.",false]
],

/* ── screen 3 · the pile ── */
pile: [
  ["bottle","Plastic water bottle","chai nhựa"],
  ["cap","Bottle cap","nắp chai"],
  ["bag","Plastic bag","túi ni lông"],
  ["straw","Drinking straw","ống hút"],
  ["pot","Yoghurt pot","hộp sữa chua"],
  ["cup","Bubble tea cup","cốc trà sữa"],
  ["can","Soft drink can","lon nước ngọt"],
  ["tin","Food tin","hộp thiếc"],
  ["foil","Aluminium foil","giấy bạc"],
  ["news","Old newspaper","báo cũ"],
  ["sheet","Used exam paper","giấy kiểm tra"],
  ["box","Cardboard box","thùng carton"],
  ["napkin","Paper napkin","khăn giấy"],
  ["jar","Glass jar","lọ thuỷ tinh"],
  ["gbottle","Glass bottle","chai thuỷ tinh"],
  ["sock","Old sock","tất cũ"],
  ["tote","Cloth bag","túi vải"],
  ["sticks","Wooden chopsticks","đũa gỗ"]
],
ban: ["kitchen","school","food","drink","eat","toy","bathroom","office","rubbish","trash",
      "garbage","waste","use","using","used","clean","study","home","house","shop","bếp",
      "học","ăn","uống","đồ chơi","rác","nhà","dùng"],

/* ── screen 6 · why is it made of that? ── */
why: [
  ["bottle","Water bottle","chai nước","A water bottle is made of plastic because plastic is light and it does not break when you drop it."],
  ["window","Window","cửa sổ","A window is made of glass because glass lets light through, so you can see outside."],
  ["pan","Saucepan","cái nồi","A saucepan is made of metal because metal is hard and heat can pass through it."],
  ["tshirt","T-shirt","áo phông","A T-shirt is made of fabric because fabric is soft and air can pass through it."],
  ["pencil","Pencil","bút chì","A pencil is made of wood because wood is light and you can cut it easily."],
  ["coat","Raincoat","áo mưa","A raincoat is made of plastic because plastic is waterproof, so the rain runs off it."]
],
whyQ: {
  q: "Look at every sentence. What kind of word comes after BECAUSE?",
  opts: ["a property of the material","the name of the object","the price of the object"],
  right: 0,
  yes: "Yes. After BECAUSE we always say a PROPERTY. That is the reason somebody chose that material.",
  no: "Not that one. Read sentence 1 again: light… does not break. Those are properties."
},

/* ── screen 7 · quadrants ── */
props: ["hard","flexible","waterproof","light","see-through","cheap","lasts a long time"],
funcs: ["holds water","protects a phone","keeps food fresh","lets light through"],

/* ── screen 8 · book page 25 ── */
match: [
  ["Metal","found in the ground; strong, hard and shiny"],
  ["Fabric","made of thin threads woven together"],
  ["Rock","underground, on beaches, in soil"],
  ["Wood","comes from trees"],
  ["Glass","strong, but it can break into pieces"]
],
talk: [
  { q:"1 · What do we use fabric for?", subject:"Fabric",
    b2:["clothes","bags","curtains","towels"],
    b3:["soft","warm","light","made of thin threads"] },
  { q:"2 · What is limestone used to build?", subject:"Limestone",
    b2:["buildings","walls","roads","cement"],
    b3:["hard","strong","found in the ground","cheap"] },
  { q:"3 · Why do companies like to use plastic?", subject:"Plastic",
    b2:["bottles","bags","packaging","phone cases"],
    b3:["cheap","light","waterproof","easy to shape"] },
  { q:"4 · What is one problem with waste?", subject:"Waste", single:true,
    b2:["it does not rot away","it fills up the ground","animals eat it","it goes into the sea"] }
],

/* ── extension · shown only when the screen task is finished ── */
extra: {
  2:"Look at the word PROPERTY. Write one property of your pen.",
  3:"Look at your groups. Which group has the most things in it? Why do you think so?",
  4:"Write one more question. Start with: How could we…?",
  5:"Write the name of one thing made of plastic that helps people.",
  6:"Choose one thing in your room. Write: ___ is made of ___ because ___.",
  7:"Find one property that is GOOD for one job and BAD for another job. Write both jobs.",
  8:"What is one thing in your school that should be made of a different material? Why?"
},

screens: [
  {n:1,  code:null, min:3, title:"Start",                  short:"Start"},
  {n:2,  code:"17", min:6, title:"Eight words",            short:"Words"},
  {n:3,  code:"43", min:8, title:"The pile",               short:"Pile"},
  {n:4,  code:"26", min:4, title:"Your questions",         short:"Questions"},
  {n:5,  code:"58", min:3, title:"Where do you stand",     short:"Stand"},
  {n:6,  code:"34", min:6, title:"Why is it made of that?",short:"Why"},
  {n:7,  code:"71", min:8, title:"Property and job",       short:"Property"},
  {n:8,  code:"92", min:5, title:"Book page 25",           short:"Book"},
  {n:9,  code:null, min:2, title:"Your page",              short:"Summary"}
]
};
