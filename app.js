const NAMES = {
  verdriet: "حزن",
  angst: "خوف",
  boos: "غضب",
  eenzaam: "وحدة",
  blij: "فرح",
  dankbaar: "شكر",
  spijt: "توبة",
  moe: "تعب",
  hoop: "أمل",
  rust: "سكينة"
};

const KEYS = {
  verdriet: ["لا تحزن", "لا تهنوا", "حزن", "مصيب", "يبكي", "بكى", "صابر", "ما يصيب المسلم"],
  angst: ["لا تخف", "لا تخاف", "حسبنا الله", "الهم", "فزع", "وجل", "توكل"],
  boos: ["لا تغضب", "الغضب", "كظم", "الغيظ", "يملك نفسه"],
  eenzaam: ["ما ودعك", "اني قريب", "اجيب دعوة", "غريب", "انا معه"],
  blij: ["فرح", "تبسم", "بوجه طلق", "فليفرحوا"],
  dankbaar: ["شكر", "الحمد لله", "اشكر", "نعمتان"],
  spijt: ["توب", "استغفر", "لا تقنطوا", "التائب", "يغفر"],
  moe: ["يسروا", "الدين يسر", "لا يكلف", "اليسر", "نصب"],
  hoop: ["لا تيأس", "لا تقنط", "مخرجا", "رحمتي", "فرج"],
  rust: ["تطمئن", "السكينة", "سكينة", "ذكر الله"]
};

const SOURCES = [
  {
    name: "صحيح البخاري",
    url: "https://cdn.jsdelivr.net/gh/mhashim6/Open-Hadith-Data@1515f6cba21efed20d8916bf55acef1dffa0d2d5/Sahih_Al-Bukhari/sahih_al-bukhari_ahadith.utf8.csv"
  },
  {
    name: "صحيح مسلم",
    url: "https://cdn.jsdelivr.net/gh/mhashim6/Open-Hadith-Data@1515f6cba21efed20d8916bf55acef1dffa0d2d5/Sahih_Muslim/sahih_muslim_ahadith.utf8.csv"
  },
  {
    name: "سنن الترمذي",
    url: "https://cdn.jsdelivr.net/gh/mhashim6/Open-Hadith-Data@1515f6cba21efed20d8916bf55acef1dffa0d2d5/Sunan_Al-Tirmidhi/sunan_al-tirmidhi_ahadith.utf8.csv"
  }
];

const grid = document.getElementById("emotions");
const result = document.getElementById("result");
const resultEmotion = document.getElementById("result-emotion");
const arabicEl = document.getElementById("arabic");
const refEl = document.getElementById("ref");
const againBtn = document.getElementById("again");
const closeBtn = document.getElementById("close");
const statusEl = document.getElementById("status");

let currentEmotion = null;
const lastIndex = {};
const extra = {};

function norm(s) {
  return (s || "")
    .replace(/[\u064B-\u065F\u0670\u0640]/g, "")
    .replace(/[أإآ]/g, "ا")
    .replace(/ة/g, "ه")
    .replace(/ى/g, "ي");
}

function parseCsv(text) {
  const out = [];
  const re = /^"([^"]*)","([\s\S]*?)"\s*$/;
  for (const line of text.split(/\r?\n/)) {
    if (!line) continue;
    const m = line.match(re);
    if (m) out.push([m[1], m[2].replace(/\s+/g, " ").trim()]);
  }
  return out;
}

function seedPool(id) {
  return ((TEXTS[id] || [])
    .filter((x) => x.arabic && x.arabic.trim())
    .map((x) => ({ arabic: x.arabic.trim(), ref: x.ref || "" })));
}

function poolFor(id) {
  const a = seedPool(id);
  const b = extra[id] || [];
  const seen = new Set();
  const out = [];
  for (const item of a.concat(b)) {
    const key = item.arabic.slice(0, 90);
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(item);
  }
  return out;
}

EMOTIONS.forEach((emo) => {
  const name = NAMES[emo.id] || emo.name;
  const btn = document.createElement("button");
  btn.className = "emo";
  btn.type = "button";
  btn.innerHTML = `<span class="face">${emo.face}</span><span class="name">${name}</span>`;
  btn.addEventListener("click", () => showText(emo.id, name, emo.face));
  grid.appendChild(btn);
});

function pickIndex(list, key) {
  if (!list || list.length <= 1) return 0;
  let i;
  do {
    i = Math.floor(Math.random() * list.length);
  } while (i === lastIndex[key]);
  lastIndex[key] = i;
  return i;
}

function showText(id, name, face) {
  currentEmotion = { id, name, face };
  const list = poolFor(id);
  if (!list.length) return;
  const i = pickIndex(list, id);
  const item = list[i];
  resultEmotion.textContent = `${face} ${name}`;
  arabicEl.textContent = item.arabic;
  arabicEl.style.display = "block";
  refEl.textContent = item.ref || "";
  result.classList.remove("hidden");
  result.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

againBtn.addEventListener("click", () => {
  if (!currentEmotion) return;
  showText(currentEmotion.id, currentEmotion.name, currentEmotion.face);
});

closeBtn.addEventListener("click", () => {
  result.classList.add("hidden");
});

async function loadBooks() {
  statusEl.textContent = "جاري تحميل الأحاديث...";
  Object.keys(NAMES).forEach((k) => (extra[k] = []));
  let total = 0;
  for (const src of SOURCES) {
    try {
      const res = await fetch(src.url);
      const text = await res.text();
      const rows = parseCsv(text);
      for (const [num, body] of rows) {
        if (!body || body.length < 40 || body.length > 800) continue;
        const n = norm(body);
        for (const [emo, words] of Object.entries(KEYS)) {
          if (words.some((w) => n.includes(norm(w)))) {
            extra[emo].push({ arabic: body, ref: src.name + " " + num });
          }
        }
      }
      total += rows.length;
    } catch (err) {
      console.error(src.name, err);
    }
  }
  const counts = Object.entries(extra).map(([k, v]) => `${NAMES[k]} ${v.length}`).join(" · ");
  statusEl.textContent = total ? ("تم التحميل: " + counts) : "تعذر تحميل الملفات، تُعرض الآيات المحفوظة فقط.";
}

loadBooks();
