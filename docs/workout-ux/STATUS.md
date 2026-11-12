# Workout UX refinement

Branch: `fix/workout-ux-muscle-map`, baseline main `f4f786d` (0.2.3). No merge or main push is authorized. Public isolated preview and PR creation are requested, subject to actual permissions.

Audit: native dependency-free ES modules; additive upgrade preferences, root schema/database version 1. The map currently checks direct counts for highlighting and omits secondary-only work. All secondary muscles use the same 0.5 heuristic. The library and picker use flat lists; plan selection is a long dropdown. Exercise options expose 11 actions in one stack. Exercise highlighting currently marks the next exercise, with a per-exercise next-set marker, rather than one persisted active set.

Exercise action inventory: frequent replacement, target/note editing and progression/rest rules; bulk weight/reps copy and check/uncheck; exercise reorder; remove last set and remove exercise (both already confirmed). All 11 will remain accessible. Set-type editing, adding sets, recommendation application, rest tools and exercise cues also remain.

Baseline: 125 domain and 9 backend checks passed. 24 core Chromium checks also passed before implementation.

All five improvements implemented. Domain cases: 147 passed. Core browser: 24, enhanced workflows: 23, prior appearance/calendar review: 12, actual 0.2.3 update/recovery: 11, and dedicated workout/browser/visual checks: 19 passed. Actual screenshots cover both themes and all requested widths. See [review guide](REVIEW.md).

Preview publication and PR creation are pending the branch push and actual permission checks. The GitHub CLI reports failed authentication; API access returns Forbidden. Main remains unchanged. No published candidate URL or PR URL is claimed yet.
