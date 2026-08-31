#!/usr/bin/env python3
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
INDEX = json.loads((ROOT / "data" / "hadith-index.json").read_text(encoding="utf-8"))
REPORT = json.loads((ROOT / "data" / "build-report.json").read_text(encoding="utf-8"))
EXPECTED = [
    "verdriet", "angst", "boos", "eenzaam", "blij",
    "dankbaar", "spijt", "moe", "hoop", "rust",
]


def main() -> int:
    errors = []
    for emo in EXPECTED:
        if emo not in INDEX:
            errors.append(f"missing {emo}")
            continue
        seen = set()
        for i, item in enumerate(INDEX[emo]):
            if not item.get("text"):
                errors.append(f"{emo}[{i}] empty text")
            if not item.get("collection"):
                errors.append(f"{emo}[{i}] missing collection")
            if not str(item.get("number", "")).strip():
                errors.append(f"{emo}[{i}] missing number")
            key = (item["collection"], item["number"], item["text"][:60])
            if key in seen:
                errors.append(f"{emo} exact dup {key}")
            seen.add(key)
        part = ROOT / "data" / "index" / f"{emo}.json"
        if not part.exists():
            errors.append(f"missing split file {part.name}")
        else:
            json.loads(part.read_text(encoding="utf-8"))
    app = (ROOT / "app.js").read_text(encoding="utf-8")
    if "data/index" not in app:
        errors.append("frontend does not load generated index")
    print("items", sum(len(v) for v in INDEX.values()))
    if errors:
        print("FAIL")
        for e in errors[:30]:
            print(" -", e)
        return 1
    print("PASS")
    return 0


if __name__ == "__main__":
    sys.exit(main())
