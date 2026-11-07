# Appearance, calendar and weekly review

Branch: `feature/appearance-calendar-weekly-review`. Based on main `c35c629`. No merge or deployment is authorized for this task.

Baseline: 95 domain tests, 9 backend tests, 24 core browser checks, 23 upgrade browser checks and 10 updater checks passed before implementation. Results and synthetic screenshots are in `baseline/`.

Implementation: refine the existing light/dark/system tokens and live/prepaint application; centralize date-only week boundaries with preserved Monday defaults; add deterministic, goal-aware weekly reviews with historical recalculation; audit actual screens in both themes at mobile/tablet/desktop widths.

Historical reviews are recalculated from records up to the selected week's cutoff, using current targets and the chosen week setting. No review snapshots or duplicate achievement writes. Personal workout files are not used for QA.
