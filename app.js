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

const grid = document.getElementById("emotions");
const result = document.getElementById("result");
const resultEmotion = document.getElementById("result-emotion");
const arabicEl = document.getElementById("arabic");
const refEl = document.getElementById("ref");
const againBtn = document.getElementById("again");
const closeBtn = document.getElementById("close");

let currentEmotion = null;
const cache = {};
const bags = {};

function shuffle(list) {
  const a = list.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = a[i];
    a[i] = a[j];
    a[j] = tmp;
  }
  return a;
}

function stripTashkeel(s) {
  return (s || "")
    .replace(/[\u064B-\u065F\u0670\u0640]/g, "")
    .replace(/[أإآ]/g, "ا")
    .replace(/ة/g, "ه")
    .replace(/ى/g, "ي");
}

function flex(phrase) {
  return phrase
    .split("")
    .map((ch) => ch.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
    .join("[\\u064B-\\u065F\\u0670\\u0640]*");
}

function extractMatn(text) {
  if (!text) return "";
  let t = text.trim();

  const tailRe = new RegExp(
    "(" +
      ["قال أبو عيسى", "قال ابو عيسى", "قال أبو عيسي", "هذا حديث", "وفي الباب"]
        .map(flex)
        .join("|") +
      ").*$"
  );
  t = t.replace(tailRe, "").trim();

  const startRe = new RegExp(
    "(" +
      [
        "سمعت رسول الله",
        "سمعت النبي",
        "فقال رسول الله",
        "فقال النبي",
        "قال رسول الله",
        "قال النبي",
        "أن رسول الله",
        "ان رسول الله",
        "أن النبي",
        "ان النبي",
        "عن رسول الله",
        "عن النبي",
        "صلى الله عليه وسلم قال",
        "صلي الله عليه وسلم قال",
        "يقول الله",
        "قال الله عز وجل",
        "قال الله تعالى",
        "قال الله"
      ]
        .map(flex)
        .join("|") +
      ")"
  );

  const found = t.match(startRe);
  if (found && found.index >= 0) t = t.slice(found.index);

  t = t.replace(/\s+/g, " ").trim();
  return t.length >= 12 ? t : text.replace(/\s+/g, " ").trim();
}

function quranPool(id) {
  return ((typeof TEXTS !== "undefined" && TEXTS[id]) || [])
    .filter((x) => x.arabic && x.arabic.trim())
    .map((x) => {
      const ayah = (x.ref || "").replace(/^Koran\s*/i, "").trim();
      return {
        type: "quran",
        text: x.arabic.trim(),
        collection: "القرآن",
        number: ayah,
        ref: ayah ? ("القرآن " + ayah) : "القرآن"
      };
    });
}

function keyOf(text) {
  return stripTashkeel(text || "").slice(0, 90);
}

function mergePool(id, hadiths) {
  const out = [];
  const seen = new Set();
  const mappedHadiths = (hadiths || []).map((item) => ({
    type: "hadith",
    text: extractMatn(item.text || ""),
    collection: item.collection || "",
    number: item.number || "",
    ref: ((item.collection || "") + (item.number ? " " + item.number : "")).trim()
  }));
  for (const item of quranPool(id).concat(mappedHadiths)) {
    if (!item.text) continue;
    const k = item.type + ":" + keyOf(item.text);
    if (seen.has(k)) continue;
    seen.add(k);
    out.push(item);
  }
  return out;
}

function refillBag(id) {
  bags[id] = shuffle(cache[id] || []);
}

async function loadEmotionPool(id) {
  if (cache[id]) return cache[id];
  let hadiths = [];
  try {
    const res = await fetch("data/index/" + id + ".json");
    if (res.ok) hadiths = await res.json();
  } catch (err) {
    console.error(id, err);
  }
  cache[id] = mergePool(id, hadiths);
  refillBag(id);
  return cache[id];
}

function takeFromBag(id) {
  const pool = cache[id] || [];
  if (!pool.length) return null;
  if (!bags[id] || bags[id].length === 0) refillBag(id);
  return bags[id].pop();
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

async function showText(id, name, face) {
  currentEmotion = { id, name, face };
  await loadEmotionPool(id);
  const item = takeFromBag(id);
  if (!item) return;
  resultEmotion.textContent = `${face} ${name}`;
  arabicEl.textContent = item.text;
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
