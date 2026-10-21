# Maps and Bulletin presentation

16 October 2026 — implemented in the reboot application.

## Maps

- Replaced the placeholder background with local SVG cartography: buildings, streets, parks, canal banks and bridges.
- Retained the three existing public places and their descriptions: Civic Square, Greyhaven Library and North Station.
- Added working search and empty results, category filters, place selection, pointer dragging, keyboard panning, bounded zoom controls, overview reset and an expandable place list.
- Added light/dark cartography and a compact layout for 320×568.
- This remains an illustrative fictional city map. It does not establish case routes, travel times or a person's whereabouts, and does not access geolocation or a map service. Pin positions retain the existing content coordinates.

## Bulletin

- Added a publication masthead and reading-stage indicator, an editorial cover, a known-date timeline and a single flowing article.
- Removed the duplicated opening paragraph when expanding the full brief. All eight accepted brief paragraphs are still rendered verbatim. Removed the orphaned photo caption that had no accompanying Daniel photograph; the cover uses the existing Greyhaven landscape and identifies it as a city image.
- Replaced raw-code-style evidence cards with readable record fields, visible source boundaries and optional verbatim transcriptions of E001 and E002.
- The `VERIFIED` text remains explicitly a marking visible in the crop, not an application verification result.
- Added aligned source columns for the comparison, keeping redactions, uncertainty, wrong-answer feedback and hints.
- Preserved story actions, knowledge conditions, explicit Send and the existing save schema. No engine, narrative manuscript, save data or legacy files were edited.

## Changed files

- `src/ui/MapsApp.tsx` — map artwork and interactions.
- `src/ui/BulletinPresentation.tsx` — cover, article, source reader and comparison.
- `src/ui/maps-bulletin.css` — responsive and theme styling.
- `src/ui/UtilityApps.tsx`, `src/ui/BulletinSlice.tsx`, `src/App.tsx` — integration.
- `tests/e2e/maps-bulletin.spec.ts` — four browser regressions and screenshot capture.

## Actual validation

| Command | Result |
| --- | --- |
| `npm run typecheck` | PASS |
| `npm run lint` | PASS |
| `npm test` | 12/12 PASS, 3 files |
| `npm run build` | PASS |
| `npm run test:e2e -- tests/e2e/maps-bulletin.spec.ts` | 4/4 PASS |
| `npm run test:e2e` | Final suite: 17/17 PASS, 25.1 seconds |

New checks exercise search, filters, pin selection, drag/keyboard pan, zoom/reset, no case advancement from Maps, exact source transcriptions, nonduplicated article content, investigation gates, wrong answers and hints. Existing tests cover handle/anonymous story routes, explicit Send, reload persistence, channel isolation and legacy-save preservation.

Rendered light/dark screenshots were inspected at 390×844 and compact screenshots at 320×568. Source typography was enlarged after the first visual review. These are Chrome browser checks, not physical Android or iOS Safari tests. Multi-touch pinch zoom is not implemented; touch dragging and explicit zoom controls are available. Full Episode 01 integration and Gate B acceptance remain separate work.

## Browser screenshots

- [Maps](../../../qa/maps-bulletin/maps-390x844.png)
- [Maps — dark](../../../qa/maps-bulletin/maps-dark.png)
- [Maps — small phone](../../../qa/maps-bulletin/maps-small.png)
- [Bulletin cover](../../../qa/maps-bulletin/bulletin-cover-light.png)
- [Full brief](../../../qa/maps-bulletin/bulletin-article-light.png)
- [Older source](../../../qa/maps-bulletin/bulletin-preview-light.png)
- [Current source](../../../qa/maps-bulletin/bulletin-current-light.png)
- [Source comparison](../../../qa/maps-bulletin/bulletin-comparison-light.png)
- [Current source — dark](../../../qa/maps-bulletin/bulletin-current-dark.png)
