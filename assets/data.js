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

/* ── property table · match the meaning, then add your own job ── */
propTable: [
 ["Strength",     "It does not break when you push it or pull it.", "bridge cables · bottle caps · bicycle frames"],
 ["Flexibility",  "It bends, and it can spring back.",              "hose pipes · packaging film · shoe soles"],
 ["Hardness",     "You cannot scratch it or dent it.",              "work surfaces · tools · floor tiles"],
 ["Density",      "How heavy it is for its size.",                  "aircraft parts · bottles you have to carry"],
 ["Waterproofing","It does not soak up water.",                     "raincoats · food packaging · pipes"],
 ["Durability",   "It does not break down over a long time.",       "water pipes · window frames"],
 ["Transparency", "Light goes through it. You can see through it.", "windows · bottles you need to see into"]
],

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
  3:"Look at the word PROPERTY. Write one property of your pen.",
  4:"Look at your groups. Which group has the most things in it? Why do you think so?",
  5:"Write one more question. Start with: How could we…?",
  6:"Write the name of one thing made of plastic that helps people.",
  7:"Choose one thing in your room. Write: ___ is made of ___ because ___.",
  8:"Find one property that is GOOD for one job and BAD for another job. Write both jobs.",
  9:"Choose one more property. Write a job it makes IMPOSSIBLE.",
 10:"What is one thing in your school that should be made of a different material? Why?"
},

/* ── animals for the leaderboard nickname ── */
animals: ["Tiger","Dragon","Panda","Shark","Eagle","Fox","Whale","Owl","Rhino","Cobra",
          "Falcon","Buffalo","Dolphin","Leopard","Phoenix","Crab","Turtle","Wolf"],

/* ── screen 2 · warm-up quiz · what do you already know? ── */
quizWarm: [
 {q:"Ice, water and steam. How many different materials is this?",
  o:["1 — it is all water","2","3","None of them"],a:0,
  w:"All water. Only the STATE changes. That was last week."},
 {q:"You heat something. What do the particles do?",
  o:["They move faster","They stop moving","They get bigger","They disappear"],a:0,
  w:"Heat gives particles energy, so they move faster."},
 {q:"A window is made of…", o:["glass","wood","fabric","rubber"],a:0,
  w:"Glass. Soon you will say WHY."},
 {q:"A T-shirt is made of…", o:["fabric","metal","glass","wood"],a:0,
  w:"Fabric — thin threads woven together."},
 {q:"Chopsticks are usually made of…", o:["wood","glass","fabric","paper"],a:0,
  w:"Wood. Light, cheap, easy to cut."},
 {q:"A drink can is made of…", o:["metal","paper","wood","glass"],a:0,
  w:"Metal — thin, strong and it does not leak."},
 {q:"Which one does NOT let water through?",
  o:["a plastic bag","a paper napkin","a cloth towel","a piece of wood"],a:0,
  w:"Only plastic keeps the water out. Remember that word: waterproof."},
 {q:"Which one is the hardest?", o:["metal","paper","fabric","a sponge"],a:0,
  w:"Metal. You cannot scratch it with a coin."},
 {q:"Plastic stays in the ground for 400 years. Is that good or bad?",
  o:["Bad","Good","It depends on the job","Nobody knows"],a:2,
  w:"Remember your answer! You will see this question again at the end."},
 {q:"Who decides that a bottle is made of plastic?",
  o:["A person, for a reason","Nobody","The machine","It just happens"],a:0,
  w:"A person chose it. Today we find out what they were thinking."}
],

/* ── screen 10 · exit ticket · did the idea land? ── */
quizExit: [
 {q:"What is a PROPERTY?",
  o:["Something the material IS","A job the material does","The price of it","The colour of the box"],a:0,
  w:"A property is what the material IS: hard, light, waterproof."},
 {q:"What is a JOB (a function)?",
  o:["Something the material DOES","Something the material IS","The name of the shop","How heavy it is"],a:0,
  w:"A job is what it DOES: holds water, keeps food fresh."},
 {q:"Which one is a PROPERTY?",
  o:["waterproof","holds water","keeps food fresh","protects a phone"],a:0,
  w:"Waterproof is what it IS. The other three are jobs."},
 {q:"Which one is a JOB?",
  o:["lets light through","hard","cheap","light"],a:0,
  w:"Lets light through is what it DOES."},
 {q:"After the word BECAUSE we always say…",
  o:["a property","the name of the object","the price","the shop"],a:0,
  w:"After because comes a property. That is the reason somebody chose it."},
 {q:"A raincoat is made of plastic because plastic is…",
  o:["waterproof","heavy","soft","see-through"],a:0,
  w:"Waterproof. The rain runs off it."},
 {q:"A window is made of glass because glass is…",
  o:["see-through","heavy","soft","cheap"],a:0,
  w:"See-through. That property makes the job possible."},
 {q:"Plastic lasts a very long time. This makes ONE job impossible. Which one?",
  o:["Throwing it away safely","Making a water pipe","Making a bottle","Making a chair"],a:0,
  w:"The same property makes pipes easy AND makes throwing it away impossible."},
 {q:"Plastic lasts a long time. Is that good or bad?",
  o:["It depends on the job","Bad","Good","Nobody knows"],a:0,
  w:"It depends on the job. This is the big idea of today's lesson."},
 {q:"Which sentence is a RULE that works for EVERY material?",
  o:["We choose a material when its properties match the job",
     "Plastic is bad","Metal is the strongest","Glass breaks easily"],a:0,
  w:"A rule must work for a material you have never seen. Only the first one does."}
],

/* ── concept-checking questions · they gate the task ── */
ccq: {
 4:{ hd:"Before you start — check you understand",
     items:[
  {q:"Can I put things together because we use them in the kitchen?",o:["No","Yes"],a:0,
   w:"No. That is where we USE them."},
  {q:"Can a plastic bottle and a plastic bag go in the same group?",o:["Yes","No"],a:0,
   w:"Yes. They are made of the same thing."},
  {q:"How many groups must I make?",o:["You choose","Always 3","Always 6"],a:0,
   w:"You choose. There is no right number."}]},
 7:{ hd:"Before you start — check you understand",
     items:[
  {q:"In these sentences, which part tells you WHY?",o:["the part AFTER because","the part BEFORE because"],a:0,
   w:"The reason always comes after because."}]},
 8:{ hd:"Before you start — check you understand",
     items:[
  {q:"A raincoat keeps you dry. Is that a property or a job?",o:["a job","a property"],a:0,
   w:"Keeping you dry is what it DOES. That is a job."},
  {q:"Plastic is waterproof. Is that a property or a job?",o:["a property","a job"],a:0,
   w:"Waterproof is what it IS. That is a property."}]},
 10:{ hd:"Before you write — check you understand",
     items:[
  {q:"Which word can go in the LAST gap? “… because it is ______.”",o:["cheap","bottles"],a:0,
   w:"The last gap must be a property. “Bottles” is a job."}]}
},

/* ── the generalization check that closes screen 8 ── */
sayback:{
 hd:"Say the rule back",
 items:[
  {q:"“Lasting a long time” is…",o:["It depends on the job","Good","Bad"],a:0,
   w:"One property. Good for a pipe, terrible for a bin. It depends on the job."},
  {q:"Which sentence is a rule for EVERY material — even one nobody has invented yet?",
   o:["We choose a material when its properties match the job","Plastic is bad","Wood comes from trees"],a:0,
   w:"That is your rule. Write it in your book."}]
},

screens: [
  {n:1,  code:null, min:1, title:"Start",                   short:"Start"},
  {n:2,  code:null, min:5, title:"Warm-up race",            short:"Warm-up", quiz:"warm"},
  {n:3,  code:null, min:3, title:"Eight words",             short:"Words"},
  {n:4,  code:null, min:6, title:"The pile",                short:"Pile"},
  {n:5,  code:null, min:3, title:"Your questions",          short:"Questions"},
  {n:6,  code:null, min:2, title:"Where do you stand",      short:"Stand"},
  {n:7,  code:null, min:4, title:"Why is it made of that?", short:"Why"},
  {n:8,  code:null, min:6, title:"Property and job",        short:"Property"},
  {n:9,  code:null, min:6, title:"What each property does", short:"Table"},
  {n:10, code:null, min:4, title:"Book page 25",            short:"Book"},
  {n:11, code:null, min:4, title:"Exit ticket race",        short:"Exit", quiz:"exit"},
  {n:12, code:null, min:1, title:"Your page",               short:"Summary"}
]
};
