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

The student page works fully at this point, using the spoken codes below.
The live teacher view needs step 2.

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

1. Open `teacher.html` on your own screen. Type the class, e.g. **6H1**.
2. Send the student link in the meeting chat.
3. Students type their name and class on screen 1. The class they type must match
   what you typed — `6H1`, not `6h 1`.
4. Press **Open the next screen** when you want the class to move. Everybody advances.
5. Watch the cards. Each card shows a student's name, which screen they are on, a progress
   bar for all nine screens, and every answer they have typed so far, updating as they type.
6. A card fades when a student has done nothing for 90 seconds.

### If a student cannot connect

Every screen also has a two-digit code. Read it out and they can carry on alone.

| Screen | Code |
|---|---|
| 2 · Eight words | **17** |
| 3 · The pile | **43** |
| 4 · Your questions | **26** |
| 5 · Where do you stand | **58** |
| 6 · Why is it made of that? | **34** |
| 7 · Property and job | **71** |
| 8 · Book page 25 | **92** |

The codes are printed on the teacher page too. Do not show that page to the class.

---

## 4 · What is on each screen

| # | Screen | Min | CBI phase | Book |
|---|---|---|---|---|
| 1 | Start — name, class, the three goals | 3 | — | — |
| 2 | Eight words | 6 | Set up | p.24 vocabulary table, all 8 terms |
| 3 | The pile — sort 18 objects by material | 8 | Engage | — |
| 4 | Your questions — write 2, sort them A/B/C | 4 | Engage | — |
| 5 | Where do you stand — three positions | 3 | Engage | — |
| 6 | Why is it made of that? — match 6 full sentences | 6 | Focus | — |
| 7 | Property and job — sort, then three sentences | 8 | Focus | — |
| 8 | Book page 25 — Q1 matching + all 4 Talk & Write | 5 | Focus | p.25 Q1, Talk & Write |
| 9 | Your page — checklist, then print or copy | 2 | — | — |

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

Screen 9 checks thirteen things and sends a student back to any screen they left unfinished.
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
assets/student.js        the nine screens
assets/teacher.js        the dashboard
assets/sync.js           Firebase wrapper; silently does nothing when not configured
assets/firebase-config.js  ← the only file you need to edit
.nojekyll                tells GitHub Pages to serve the files as they are
```

To change wording, objects or questions, edit **`assets/data.js`** only.

---

Built for Victor Moronu, The Olympia Schools, Hanoi.
