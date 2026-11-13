Historical review-stage PR description. The user approved a normal merge into main and deletion of the completed branch on November 13, 2026. See [release notes](RELEASE.md).

The training map omitted secondary-only involvement, the library and exercise menu required long scrolling, and the logger could mark a next set in multiple exercises. This update makes squat/glute contributions visible, adds a shared search/recent/favorite exercise browser, aligns date controls, compacts exercise options and persists exactly one current set.

- Audited all 40 existing movements and added front squat, conventional deadlift and reverse lunge variants with separate stable identities. Direct, weighted secondary and bounded stabilizing contributions remain distinct; no activation/growth percentages are claimed.
- Search, aliases, meaningful body-part categories, optional combined filters, favorites and recents work across browsing, plans, workout additions and replacements. Plan picking retains the live unsaved form.
- Existing exercise actions remain accessible; destructive actions keep confirmation. Logged replacements retain the original entered sets and are undoable.
- Current-set selection supports warm-ups, supersets, skipped/reopened sets, reordering and reload. Completed exercises stay editable.

Root schema and database version remain 1. Preferences and draft cursor/skip flags are additive. Existing raw history, exercise IDs, units, photos and other settings are preserved. Custom metadata is explicit/editable; a new catalog identity cannot take over a previously valid custom ID.

Validation and screenshots: see `docs/workout-ux/REVIEW.md` and `artifacts/workout-ux/`. Baseline and final executed checks are recorded there; physical Safari/Firefox/device certification is not claimed. The preview workflow builds main byte-identically and adds only the candidate at its isolated preview path. The review stage did not merge or push main; the subsequent approved release promotes this reviewed source.
