# Emotions

Static Arabic site. Click an emotion to get a Quran verse or hadith.

## Build

```bash
python3 scripts/build_hadith_index.py
python3 tests/test_index.py
```

Matching uses the matn only. Compiler grading such as "حديث حسن غريب" is stripped before scoring and is never treated as emotional content.

Generated files: `data/hadith-index.json`, `data/build-report.json`, `data/index/<emotion>.json`.
