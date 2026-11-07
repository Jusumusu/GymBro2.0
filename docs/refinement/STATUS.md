# Appearance, calendar and weekly review

Branch: `feature/appearance-calendar-weekly-review`. Based on main `c35c629`. No merge or deployment is authorized for this task.

Baseline: 95 domain tests, 9 backend tests, 24 core browser checks, 23 upgrade browser checks and 10 updater checks passed before implementation. Results and synthetic screenshots are in `baseline/`.

Implemented: saved immediate light/dark/system appearance with prepaint cache and live system updates; theme-matched PWA manifests with stable identity; shared Sunday/Monday date-only week boundaries; goal-aware, deterministic weekly review with history navigation, up to three evidence-based wins and two practical next steps. Existing Monday defaults and all saved dates are retained.

Historical reviews are recalculated from records up to the selected week's cutoff using current targets and the chosen week setting, clearly disclosed in the UI. No review snapshots or duplicate achievement writes. Body-related cloud facts retain separate consent gates. Personal workout files are not used for QA.

Visual audit fixes include theme-change contrast transitions, numeric and icon alignment, consistent logger/calendar margins, safe-area navigation, theme-aware chart strokes and unique gradients, readable status/dialog colors, compact mobile tracking tabs and removal of duplicate review headings. Current refinement browser flow passes all seven viewport widths and both themes. Final regression, screenshots and review instructions are in progress.
