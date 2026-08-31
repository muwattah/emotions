#!/usr/bin/env python3
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
EXPECTED = [
    "verdriet", "angst", "boos", "eenzaam", "blij",
    "dankbaar", "spijt", "moe", "hoop", "rust",
]
GRADING = re.compile(
    r"(حديث غريب|هذا حديث غريب|حسن غريب|صحيح غريب|غريب من هذا الوجه|غريب لا نعرفه)"
)
TASHKEEL = re.compile(r"[\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06ED\u0640]")


def norm(s: str) -> str:
    s = TASHKEEL.sub("", s or "")
    s = s.replace("أ", "ا").replace("إ", "ا").replace("آ", "ا")
    s = re.sub(r"\s+", " ", s).strip()
    return s


def main() -> int:
    errors = []
    index_path = ROOT / "data" / "hadith-index.json"
    report_path = ROOT / "data" / "build-report.json"
    if not index_path.exists():
        errors.append("missing data/hadith-index.json")
        print("FAIL", errors)
        return 1
    raw = index_path.read_bytes()
    try:
        raw.decode("utf-8")
    except UnicodeDecodeError:
        errors.append("hadith-index.json is not utf-8")
    INDEX = json.loads(index_path.read_text(encoding="utf-8"))
    for emo in EXPECTED:
        part = ROOT / "data" / "index" / f"{emo}.json"
        if not part.exists():
            errors.append(f"missing data/index/{emo}.json")
            continue
        items = json.loads(part.read_text(encoding="utf-8"))
        if len(items) < 1:
            errors.append(f"{emo} has zero texts")
        seen = set()
        for i, item in enumerate(items):
            if not item.get("text"):
                errors.append(f"{emo}[{i}] empty text")
            if not item.get("collection"):
                errors.append(f"{emo}[{i}] missing collection")
            if not str(item.get("number", "")).strip():
                errors.append(f"{emo}[{i}] missing number")
            key = norm(item.get("text", ""))
            if key in seen:
                errors.append(f"{emo} duplicate normalized matn")
            seen.add(key)
        if emo == "eenzaam":
            for item in items:
                n = norm(item["text"])
                if GRADING.search(item["text"]) and not any(
                    x in n for x in ["ما ودعك", "اني قريب", "انا معه", "مع عبدي", "وحيدا", "الوحده"]
                ):
                    errors.append(f"eenzaam grading-only match {item['number']}")
    app = (ROOT / "app.js").read_text(encoding="utf-8")
    if "data/index/" not in app:
        errors.append("app.js path mismatch")
    if "quranPool" not in app or "القرآن" not in app:
        errors.append("quran mix missing")
    if "refillBag" not in app:
        errors.append("random bag refill missing")
    data_js = (ROOT / "data.js").read_text(encoding="utf-8")
    if "3:139" not in data_js:
        errors.append("quran verses missing from data.js")
    print("items", sum(len(v) for v in INDEX.values()))
    print("eenzaam", len(INDEX.get("eenzaam", [])))
    if errors:
        print("FAIL")
        for e in errors[:40]:
            print(" -", e)
        return 1
    print("PASS")
    return 0


if __name__ == "__main__":
    sys.exit(main())
