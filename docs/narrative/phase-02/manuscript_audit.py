"""Reproducible document-only checks for the Episode 01 manuscript.

This does not execute story state, prove narrative quality, or validate gameplay.
Run from any directory: python docs/narrative/phase-02/manuscript_audit.py
"""

from __future__ import annotations

import hashlib
import re
from pathlib import Path
from urllib.parse import unquote


ROOT = Path(__file__).resolve().parent
ACTS = sorted(ROOT.glob("01_EPISODE_01_SCREENPLAY_ACT_*.md"))
assert len(ACTS) == 6, f"Expected six Acts, found {len(ACTS)}"
texts = [path.read_text(encoding="utf-8") for path in ACTS]
joined = "\n".join(texts)

scenes = re.findall(r"^## (E01-S\d{2})\b", joined, re.MULTILINE)
expected = [f"E01-S{i:02}" for i in range(1, 31)]
assert scenes == expected, f"Scene sequence differs: {scenes}"
destinations = re.findall(r"→ S(\d{2})\b", joined)
assert destinations and all(1 <= int(scene) <= 30 for scene in destinations), "Act arrow references a scene outside E01-S01–S30"

ids = re.findall(r"`((?:P-S\d{2}-[A-Z]+|C0[123]-(?:TIP|SHARE|FRAME)\.[ABC]))`", joined)
assert len(set(ids)) == 56, f"Expected 56 stable option IDs, found {len(set(ids))}"

coverage = (ROOT / "13_PHASE_02C_BRANCH_AND_KNOWLEDGE_COVERAGE.md").read_text(encoding="utf-8")
coverage_ids = re.findall(r"^\| `((?:P-S\d{2}-[A-Z]+|C0[123]-(?:TIP|SHARE|FRAME)\.[ABC]))` \|", coverage, re.MULTILINE)
assert len(coverage_ids) == 56 and len(set(coverage_ids)) == 56, "Choice coverage must contain 56 unique rows"
assert set(coverage_ids) == set(ids), "Choice coverage and Act IDs differ"

paper = (ROOT / "11_PHASE_02C_PAPER_PLAY_TRACES.md").read_text(encoding="utf-8")
for name, section in (("SOCIAL", paper.split("## Route SOCIAL", 1)[1].split("## Route QUIET", 1)[0]), ("QUIET", paper.split("## Route QUIET", 1)[1].split("## Targeted", 1)[0])):
    route_scenes = re.findall(r"^\| S(\d{2}) \|", section, re.MULTILINE)
    assert route_scenes == [f"{n:02}" for n in range(1, 31)], f"{name} paper trace is incomplete: {route_scenes}"

investigations = (ROOT / "12_PHASE_02C_INVESTIGATION_ACCEPTANCE.md").read_text(encoding="utf-8")
case_rows = re.findall(r"^\| \*\*(I0[1-7] (?:SOCIAL|QUIET))\*\*", investigations, re.MULTILINE)
expected_cases = {f"I{i:02} {route}" for i in range(1, 8) for route in ("SOCIAL", "QUIET")}
assert len(case_rows) == 14 and set(case_rows) == expected_cases, "Investigation acceptance must cover I01–I07 on both routes"

asset = ROOT / "assets" / "GCRO-EXP-20261008-041.txt"
data = asset.read_bytes()
assert len(data) == 2012, f"Master E012 size changed: {len(data)}"
assert data.startswith(b"PAGE 1 OF 4\n") and data.endswith(b"\n")
assert b"\r" not in data and not data.startswith(b"\xef\xbb\xbf")
digest = hashlib.sha256(data).hexdigest()
expected_digest = "887c59c42ea8b375737b78a3e79ae0d8d57da7c8698e7e21adea955136d730de"
assert digest == expected_digest, f"E012 master changed: {digest}"
for page in range(1, 5):
    assert data.count(f"PAGE {page} OF 4\n".encode()) == 1

asset_doc = (ROOT / "04_EPISODE_01_IN_WORLD_ASSETS.md").read_text(encoding="utf-8")
p04 = asset_doc.split("## P04 —", 1)[1].split("## P05 —", 1)[0]
page_blocks = re.findall(r"```text\n(.*?)\n```", p04, re.DOTALL)
assert len(page_blocks) == 4, "P04 must quote all four pages"
quoted_master = "\n\n".join(
    f"PAGE {number} OF 4\n{block}" for number, block in enumerate(page_blocks, 1)
) + "\n"
assert quoted_master.encode("utf-8") == data, "P04 Markdown and E012 master differ"

links_checked = 0
anchors_checked = 0
for markdown in ROOT.glob("*.md"):
    content = markdown.read_text(encoding="utf-8")
    for target in re.findall(r"(?<!!)\[[^\]]+\]\(([^)]+)\)", content):
        if target.startswith(("http:", "https:", "mailto:")):
            continue
        local, _, fragment = unquote(target).partition("#")
        resolved = (markdown.parent / local).resolve() if local else markdown
        assert resolved.is_file(), f"Broken local link: {markdown.name} -> {target}"
        links_checked += 1
        if fragment and resolved.suffix.lower() == ".md":
            destination = resolved.read_text(encoding="utf-8")
            headings = re.findall(r"^#{1,6} (.+)$", destination, re.MULTILINE)
            slugs = {re.sub(r"\s", "-", re.sub(r"[^\w\s-]", "", heading.lower()).strip()) for heading in headings}
            assert fragment in slugs, f"Broken local anchor: {markdown.name} -> {target}"
            anchors_checked += 1

word_counts = [len(text.split()) for text in texts]
print("Acts:", len(ACTS))
print("Scene IDs:", len(scenes), "sequential and unique")
print("Act scene-arrow destinations:", len(destinations), "reference S01-S30")
print("Stable choice IDs:", len(set(ids)), "unique")
print("Choice coverage rows:", len(coverage_ids), "same ID set as Acts")
print("Paper trace scenes: 30 SOCIAL, 30 QUIET in sequence")
print("Investigation cases:", len(case_rows), "I01-I07 on both routes")
print("Act words:", ", ".join(str(count) for count in word_counts))
print("Total Act words:", sum(word_counts))
print("E012 master bytes:", len(data))
print("E012 master SHA-256:", digest)
print("E012 master matches P04 quoted page text: yes")
print("Local file links:", links_checked, "resolved; anchors:", anchors_checked, "resolved")
print("Scope: document structure and master-asset bytes only; no gameplay test")
