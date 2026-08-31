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
const lastIndex = {};

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
  if (!list || list.length === 0) return 0;
  if (list.length === 1) return 0;
  let i;
  do {
    i = Math.floor(Math.random() * list.length);
  } while (i === lastIndex[key]);
  lastIndex[key] = i;
  return i;
}

function showText(id, name, face) {
  currentEmotion = { id, name, face };
  const list = (TEXTS[id] || []).filter((item) => item.arabic && item.arabic.trim());
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
