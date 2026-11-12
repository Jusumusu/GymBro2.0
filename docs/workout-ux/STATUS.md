# Workout UX refinement

Branch: `fix/workout-ux-muscle-map`, baseline main `f4f786d` (0.2.3). No merge or main push is authorized. Public isolated preview and PR creation are requested, subject to actual permissions.

Audit: native dependency-free ES modules; additive upgrade preferences, root schema/database version 1. The map currently checks direct counts for highlighting and omits secondary-only work. All secondary muscles use the same 0.5 heuristic. The library and picker use flat lists; plan selection is a long dropdown. Exercise options expose 11 actions in one stack. Exercise highlighting currently marks the next exercise, with a per-exercise next-set marker, rather than one persisted active set.

Exercise action inventory: frequent replacement, target/note editing and progression/rest rules; bulk weight/reps copy and check/uncheck; exercise reorder; remove last set and remove exercise (both already confirmed). All 11 will remain accessible. Set-type editing, adding sets, recommendation application, rest tools and exercise cues also remain.

Baseline: 125 domain and 9 backend checks passed. 24 core Chromium checks also passed before implementation.

All five improvements implemented. Domain cases: 147 passed. Core browser: 24, enhanced workflows: 23, prior appearance/calendar review: 12, actual 0.2.3 update/recovery: 11, and dedicated workout/browser/visual checks: 19 passed. Actual screenshots cover both themes and all requested widths. See [review guide](REVIEW.md).

The branch was pushed; [run 43208077307](https://github.com/Jusumusu/GymBro2.0/actions/runs/43208077307) built successfully, but deployment was rejected: `Branch "fix/workout-ux-muscle-map" is not allowed to deploy to github-pages due to environment protection rules.` Production was not replaced. The owner was asked to add this exact branch to the existing github-pages environment branch rules and rerun the failed deployment. Public preview publication is not claimed while this restriction remains.

`gh pr create` failed with `Post "https://api.github.com/graphql": Forbidden`; no PR was created. [Open the GitHub comparison/PR form](https://github.com/Jusumusu/GymBro2.0/compare/main...fix/workout-ux-muscle-map?expand=1); the prepared description is in [PR.md](PR.md).

The exact standalone main 0.2.3 + built preview 0.2.4 composition passed all five local browser isolation checks, including copying a native backup into preview, modifying it offline, and returning to byte-identical production code with unchanged production history/draft/settings. Automatic-update checks also passed (13). A runnable static local review package is provided as the best available fallback; see [review guide](REVIEW.md).

Main remains at `f4f786d`; nothing has been merged or pushed to main.
