const grid = document.getElementById("emotions");
const result = document.getElementById("result");
const resultEmotion = document.getElementById("result-emotion");
const arabicEl = document.getElementById("arabic");
const textEl = document.getElementById("text");
const refEl = document.getElementById("ref");
const againBtn = document.getElementById("again");
const closeBtn = document.getElementById("close");

let currentEmotion = null;
const lastIndex = {};

EMOTIONS.forEach((emo) => {
  const btn = document.createElement("button");
  btn.className = "emo";
  btn.type = "button";
  btn.innerHTML = `<span class="face">${emo.face}</span><span class="name">${emo.name}</span>`;
  btn.addEventListener("click", () => showText(emo.id, emo.name, emo.face));
  grid.appendChild(btn);
});

function pickIndex(list, key) {
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
  const list = TEXTS[id];
  const item = list[pickIndex(list, id)];
  resultEmotion.textContent = `${face} ${name}`;
  arabicEl.textContent = item.arabic || "";
  arabicEl.style.display = item.arabic ? "block" : "none";
  textEl.textContent = item.text;
  refEl.textContent = item.ref;
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
