# The Materials Bench

An online lesson for **Grade 6 Natural Science in English, Week 5, period E9 — Materials & Plastic**
(The Olympia Schools, Hanoi · supplementary book pages 24–25).

Two pages:

| Page | Who | What it does |
|---|---|---|
| `index.html` | students | Nine screens. Each one locks until the teacher opens it. A student cannot move on until the task on the screen is finished. |
| `teacher.html` | you | Opens the screens for the whole class, and shows what every student is typing and clicking, live. |

Language is pitched at **A1–A2**, with Vietnamese glosses. Everything works on a phone or a laptop.

---

## 1 · Put it online (10 minutes, free)

1. Make a new GitHub repository — call it anything, e.g. `materials-bench`.
2. Upload every file in this folder, keeping the `assets/` folder as it is.
3. In the repository, go to **Settings → Pages**.
4. Under *Build and deployment*, set **Source: Deploy from a branch**, **Branch: `main` / `(root)`**, then **Save**.
5. Wait about a minute. Your pages are then at:

```
https://YOUR-USERNAME.github.io/materials-bench/            ← give this to students
https://YOUR-USERNAME.github.io/materials-bench/teacher.html ← keep this for yourself
```

Without step 2 the student page still works, but every screen is open from the start and
you cannot hold the class together. Do step 2.

---

## 2 · Turn on the live teacher view (10 minutes, free, no card needed)

1. Go to <https://console.firebase.google.com> and sign in with any Google account.
2. **Add project** → give it a name → you can switch Google Analytics **off** → **Create project**.
3. In the left menu choose **Build → Realtime Database** → **Create Database**.
   * Location: Singapore (`asia-southeast1`) is closest to Hanoi.
   * Choose **Start in test mode** → **Enable**.
4. Click the gear icon → **Project settings** → scroll to *Your apps* → click the **web** icon `</>`.
   Give it a nickname, click **Register app**. Firebase shows you a block of code.
5. Copy the five values out of that block into **`assets/firebase-config.js`** in this folder:

```js
window.FIREBASE_CONFIG = {
  apiKey:      "AIza…",
  authDomain:  "your-project.firebaseapp.com",
  databaseURL: "https://your-project-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId:   "your-project",
  appId:       "1:123…:web:abc…"
};
```

`databaseURL` is the one that matters most. If it is missing from the block Firebase showed you,
copy it from the top of the **Realtime Database** page.

6. Commit and push the change. Within a minute the teacher page says **live · 6H1** instead of
   *no Firebase set up*.

### Database rules

Test mode expires after 30 days and then nothing will save. Before that, go to
**Realtime Database → Rules** and paste this:

```json
{
  "rules": {
    "rooms": {
      ".read": true,
      ".write": true
    }
  }
}
```

This lets anyone who has your page address read and write the lesson data.
For a classroom that is fine — no names, no marks, no personal data beyond a first name and a class.
Do not store anything else there. Press **Clear the class** on the teacher page when the lesson ends.

---

## 3 · Running the lesson

1. Open `teacher.html` on your own screen. It connects on its own — there is nothing to type.
2. Send the student link in the meeting chat.
3. Students type their name and class, pick a racing animal, and tap **Join the class**.
   They all appear on your board within a couple of seconds, whatever class they write.
4. Press **Open the next screen** when you want the class to move. **Everybody moves** —
   finished or not. A student who was mid-answer sees *Your teacher moved the class on.*
5. Watch the cards. Each shows the name, their class, which screen they are on, a progress
   bar for all twelve screens, and every answer as they type it. A student who has not
   finished the screen they are on is marked **not finished**.
6. A card fades when a student has done nothing for 90 seconds.
7. **End session** at the end: it deletes everybody's work from the board, resets to screen 1,
   and reloads every student page instantly so the next class starts clean. It cannot be undone.

Everyone who opens the student page is in the same room. The class they type is only a label
on their card — it no longer has to match anything.


### The preview window

On the left of the dashboard is **What the class sees now** — a live copy of the student page.
It follows you: press *Open the next screen* and the preview moves too, so you always know
what is in front of the class without a second device.

It is a real working copy, so you can click through it while you explain. Nothing you do in it
reaches the class and nothing appears on the board. **Reset** clears it; **Open full size**
opens the real student page in a new tab, which is what you share to your screen if you want
to demonstrate something properly.

On a narrow window the preview sits above the student cards instead of beside them.

### Start session / End session

The button at the top right toggles.

**Start session** wipes everything and begins: every open student page reloads to a blank
screen 1, the board clears, and the class pointer goes back to screen 1. Press it before the
lesson, or between two classes. It cannot be undone.

**End session** closes the lesson: the board clears and students see a red bar saying the lesson
has finished. Their own work stays on their device, so they can still print their page.

### What students can and cannot do

| | Before **Start session** | While running | After **End session** |
|---|---|---|---|
| Type name and class | yes | yes | yes |
| Go past screen 1 | **no** | only when you open the next screen | no |
| Press **I'm finished** | no | yes | no |
| Print their page | — | yes | yes |

Nobody gets into the lesson until you press **Start session**. A student who opens the link
early sees an amber bar — *Waiting for your teacher* — types their name, and waits. The moment
you start, the bar disappears and they are in.

If the page cannot reach Firebase at all (a blocked school network, an ad blocker), it releases
the class after ten seconds rather than let a connection problem kill the lesson. `check.html`
tells you in advance whether that is going to happen.

### Who controls the screen

**You do, always.** Students cannot move themselves. On every screen a student sees one button:

* **I'm finished** — greyed out until the task is actually complete.
* Pressing it reveals the **extra question** for that screen and the button becomes
  *Waiting for your teacher…*

Your control card shows **"7 of 22 finished"** next to the screen name, turning green when
everybody is done, and each student card is tagged **✓ finished** or **working**. That number is
how you decide when to move on. When you do, everybody moves — finished or not.

There is no Back button for students. The only exception is your own preview pane, which stays
clickable so you can look ahead.


### Moving one student on

Every student card has **Move on →**. Press it and that student goes to the next screen
without finishing the one they are on. They see a green message saying you moved them.
The screen they skipped shows amber on their progress bar, so you can still see it was
never finished, and it is left out of their checklist on screen 9.

Next to it, **send to screen…** jumps that one student to any screen you choose — useful for
a student who joins the lesson late.

### Skipping a screen for the whole class

Under *Not using a screen today? Switch it off*, tap any screen to turn it off.
It goes red, and it disappears from the lesson for every student: **Next** jumps straight
over it, nobody has to complete it, and it is left out of the end checklist.
Tap it again to bring it back, even mid-lesson.

Use it when you are short of time. Screen 7 is the one that carries the concept — switch
that one off last.

### Students who join late

There are no codes. A latecomer types their name and class and the button says
**Join the class →** — one tap and they are on whatever screen you have open.
Nobody can get ahead of you: when a student finishes a screen before you open the next one,
their button says *Finished. Wait — your teacher will open the next screen.* The moment you
open it, everyone who was waiting moves forward on their own.

If Firebase is not set up, there is nothing holding the class together: every screen is open
and students move at their own speed. The teacher page says so plainly when that is the case.

---

## 4 · What is on each screen

| # | Screen | Min | CBI phase | Book |
|---|---|---|---|---|
| 1 | Start — name, class, racing name, the three goals | 1 | — | — |
| 2 | **⚡ Warm-up race** — 10 questions, live leaderboard | 5 | — | — |
| 3 | Eight words | 3 | Set up | p.24 vocabulary table, all 8 terms |
| 4 | The pile — sort 18 objects by material | 6 | Engage | — |
| 5 | Your questions — write 2, sort them A/B/C | 3 | Engage | — |
| 6 | Where do you stand — three positions | 2 | Engage | — |
| 7 | Why is it made of that? — match 6 full sentences | 4 | Focus | — |
| 8 | Property and job — sort, three sentences, say the rule back | 6 | Focus | — |
| 9 | What each property does — match 7 meanings, add your own jobs | 6 | Focus | — |
| 10 | Book page 25 — Q1 matching + all 4 Talk & Write | 4 | Focus | p.25 Q1, Talk & Write |
| 11 | **🏁 Exit ticket race** — the same 10 ideas, tested | 4 | — | — |
| 12 | Your page — checklist, both race scores, print or copy | 1 | — | — |

### The two races

Ten questions each, 25 seconds a question, four colour-and-shape answer tiles.
100 points for correct, up to +100 for speed, and a streak multiplier — 3 in a row ×1.5,
5 in a row ×2. A live leaderboard after every question shows the top five and tells each
student where they are and who is ahead of them. Everyone races under a nickname
(**Minh Anh the Tiger**); your dashboard still shows real names.

Question 9 of the warm-up and question 9 of the exit ticket are **the same question**:
*Plastic lasts a long time. Is that good or bad?* Most classes answer *bad* on the way in and
*it depends on the job* on the way out. Screen 12 puts the two scores side by side, so the
growth is on the page.

While a race is running, your dashboard shows the leaderboard **and a bar for every question**
showing how the class answered. A question under 50% turns red. That is the fastest formative
read you will get all lesson.

### Concept-checking questions

Screens 4, 7, 8 and 10 open with two or three tap-checks that **lock the task** until they are
right — unlimited tries, because it is a check and not a test. *Can I put things together
because we use them in the kitchen?* Screen 8 also closes with a **say the rule back** check
that asks which sentence is a rule that works for every material.

**45 minutes.** The reading on pp.24–25, Q2 on coal and fossil fuels, the hands-on fair test and
the poster all belong to period **E10**, in the room.

Students who finish a screen early get an open question on that screen. It never blocks them.

### What the lesson is actually for

One idea has to survive: **a property is not good or bad until you say what job it must do.**
Screen 6 builds it (after *because* there is always a property), screen 7 forces it
(*lasts a long time* makes one job easy and one job impossible), and the rule they write in
sentence 3 is what next lesson builds on. Everything else is scaffolding for that.

---

## 5 · Student work

Screen 12 checks sixteen things and sends a student back to any screen they left unfinished.
Then they print to PDF, or copy their answers and paste them to you.
Their work is also saved in their own browser, so a student who drops out and rejoins
comes back to where they were.

---

## Files

```
index.html               student page
teacher.html             teacher control and live view
assets/app.css           all styling, light and dark
assets/data.js           every word, object, sentence and question — edit lesson content here
assets/student.js        the twelve screens
assets/quiz.js           the race engine: timer, scoring, streaks, confetti, leaderboard
assets/teacher.js        the dashboard
assets/sync.js           Firebase wrapper; silently does nothing when not configured
assets/firebase-config.js  ← the only file you need to edit
.nojekyll                tells GitHub Pages to serve the files as they are
```

To change wording, objects or questions, edit **`assets/data.js`** only.

---

---

## Before every lesson — the two-minute check

**Open `check.html` on the same link you give the students.** It tests the lesson file and its
build number, whether you are on the real web link or a local file, whether Firebase loaded,
whether your settings are filled in, which room this lesson uses, whether it can reach the
database, whether it can actually **write and read back**, and who is in the room right now.
Every red row comes with the exact fix.

If every row is green and you still see nobody, the students are on a **cached copy**. Tell them
to close the tab and reopen the link, or hand out the link with `?v=2` on the end.

The build number shows next to the title on the teacher page. If yours differs from a student's,
one of you is on an old copy.

**Why this lesson used to show no students:** each student was put in a room named after whatever
they typed as their class, so `6H 1` was invisible to a teacher on `6H1`, silently. Each lesson
now has one fixed room set in code — this one is `G6W5` — and the class a student types is only
a label on their card.

Built for Victor Moronu, The Olympia Schools, Hanoi.

---

## The homework — a second, separate page

`homework.html` is the Week 5 homework, **Why is it made of that?**, done at home in a browser.
`homework-teacher.html` is where the answers arrive.

```
https://YOU.github.io/REPO/homework.html          ← send this to students
https://YOU.github.io/REPO/homework-teacher.html  ← keep this for yourself
```

It is completely separate from the lesson: its own Firebase room (`G6HW5`, set at the top of
`assets/sync-hw.js`), no session to start, no screens to open. Students can do it any evening,
at their own speed, and come back to it — everything saves as they type, on their device and
to Firebase.

**Five parts, about 40 minutes.** Nine objects from their own home with a property they tested
by hand; a swap grid where every FAILS must name the missing property; the big question with
three sentence frames and a counter-case; a material that does not exist yet; and the optional
durability question. Parts 1–3 are the must-do.

**The nudge.** Any reason that contains no property word — hard, flexible, waterproof,
see-through, light, cheap, lasts… — gets an amber underline on the student page and an amber
highlight on yours. It never blocks them and it never marks them. It just asks the question the
whole lesson asks.

**Hand in my homework** stamps a time and flags them as handed in. They can still edit
afterwards; it re-saves.

**On your page**: every student as a collapsible card with all five parts laid out, sorted by
name or by progress, filterable to those who have handed in, and **Download all answers (CSV)**
— one row per student, one column per question, opens straight in Excel. Export it before you
clear anything.

**What to mark:** does every reason name a property? Part 3 sentence 3 and Part 4c are the two
that count.

