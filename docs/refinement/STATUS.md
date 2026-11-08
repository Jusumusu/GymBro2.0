# Appearance, calendar and weekly review

Branch: `feature/appearance-calendar-weekly-review`. Based on main `c35c629`. No main merge or production release is authorized. The user subsequently requested a website preview: its build passed, but GitHub's environment branch rule blocked deployment. [Actual result and owner steps](PREVIEW.md). Main and the previously published website remain unchanged.

Baseline: 95 domain tests, 9 backend tests, 24 core browser checks, 23 upgrade browser checks and 10 updater checks passed before implementation. Results and synthetic screenshots are in `baseline/`.

Implemented: saved immediate light/dark/system appearance with prepaint cache and live system updates; theme-matched PWA manifests with stable identity; shared Sunday/Monday date-only week boundaries; goal-aware, deterministic weekly review with history navigation, up to three evidence-based wins and two practical next steps. Existing Monday defaults and all saved dates are retained.

Historical reviews are recalculated from records up to the selected week's cutoff using current targets and the chosen week setting, clearly disclosed in the UI. No review snapshots or duplicate achievement writes. Body-related cloud facts retain separate consent gates. Personal workout files are not used for QA.

Visual audit fixes include theme-change contrast transitions, numeric and icon alignment, consistent logger/calendar margins, safe-area navigation, theme-aware chart strokes and unique gradients, readable status/dialog colors, compact mobile tracking tabs and removal of duplicate review headings. Final validation: 124 domain tests, 9 backend tests, 24 core browser checks, 23 upgrade browser checks, 11 actual-main update/recovery checks and 12 refinement browser checks passed. Both themes, seven viewport widths, all main routes, sparse/empty states, active logging, dialogs, offline operation and persistence were checked. See [the review guide](REVIEW.md) for calculations, screenshots, limitations and local review instructions. Main remains at `c35c629`; no merge or deployment was performed.
