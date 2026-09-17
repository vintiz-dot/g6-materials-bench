/* Grade 6 · Week 5 homework — Why is it made of that? */
window.HW = {
build:"2026-09-17a",
meta:{grade:"Grade 6", subject:"Natural Science in English", week:"Week 5",
      title:"Why is it made of that?", pages:"Book pp. 24–25"},
bigQ:"Could we make everything out of one material?",
rule:"We choose a material when its properties match the job.",

p1:{ mins:10,
 title:"Go and look",
 lead:"Walk around your home. Find <b>three things made of plastic, three of wood and three of glass</b>.<br>For every one, write <b>one property you can test with your own hands</b> — bend it, tap it, look through it, feel the weight.",
 vn:"Viết một tính chất mà bạn tự kiểm tra được bằng tay.",
 eg:["water bottle","it bends and springs back","it does not break when I drop it"],
 rows:["Plastic","Plastic","Plastic","Wood","Wood","Wood","Glass","Glass","Glass"]},

p2:{ mins:10,
 title:"The swap test",
 lead:"Choose <b>one</b> thing from Part 1 for each material. Then try to make it from the <b>other two</b> materials.",
 eg:{obj:"a window", v:["works badly","FAILS","works"], why:["it scratches","wood is not see-through",""]},
 mats:["PLASTIC","WOOD","GLASS"],
 verdicts:["works","works badly","FAILS"],
 warn:"“It would look strange” is not a reason. “It would break” is not a reason either — tell me <b>which property</b> is missing.",
 vn:"Phải nói rõ thiếu tính chất nào."},

p3:{ mins:8,
 title:"Now answer the big question",
 lead:"Look at your nine things. <b>Could ONE material make all nine?</b>",
 f1:{pre:"1 · I say", post:"", ph:"yes / no / it depends"},
 f2:{pre:"2 · One thing it WOULD work for is", mid:", because that job needs", post:"(a property).",
     ph:"the object", ph2:"the property"},
 f3:{pre:"3 · One thing it WOULD NOT work for is", mid:", because that job needs", post:"(a property), and this material does not have it.",
     ph:"the object", ph2:"the property"},
 counter:{q:"A student says: <b>“Yes — we could make everything out of plastic.”</b><br>Write the <b>one</b> thing from your list that proves them wrong, and the property that decides it.",
          ph:"The thing that proves them wrong is…"}},

p4:{ mins:7,
 title:"A material nobody has made yet",
 card:"It is see-through. It is very hard. It never breaks. It is cheap.",
 lead:"You have never seen this material. Use the rule anyway.",
 a:"Two things from your list it SHOULD replace",
 b:"One thing it should NOT replace",
 c:"Why not? That job needs the property ______, and this material does not have it."},

p5:{ mins:5,
 title:"The hard one — only if you want it",
 lead:"Plastic <b>lasts a very long time</b>. That is <b>one</b> property.<br>Write one job it makes <b>easy</b>, and one job it makes <b>impossible</b>. Same property, both times.",
 easy:"It makes this job EASY", hard:"It makes this job IMPOSSIBLE"},

check:[
 "Every reason I wrote names a <b>property</b>, not a feeling. I did not write “it is bad” or “it looks strange”.",
 "I answered Part 4 about a material I have <b>never seen</b>, using the same rule.",
 "I can say this out loud: <b>“We choose a material when its properties match the job.”</b>"],

bands:[["Everyone must finish","Parts 1, 2 and 3."],
       ["Most of you should finish","Part 4 as well."],
       ["Try it if you want a challenge","Part 5."]],

/* used only to nudge — never to mark */
propWords:["hard","soft","flex","bend","spring","waterproof","water","light","heavy","see",
 "through","transparent","clear","cheap","strong","last","sharp","hot","heat","cold","break",
 "shatter","scratch","smooth","rough","stretch","thin","thick","sink","float","rust","burn","melt"]
};
