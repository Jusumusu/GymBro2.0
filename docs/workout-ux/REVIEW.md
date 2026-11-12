# 0.2.4 workout precision and discovery review

All work is on `fix/workout-ux-muscle-map`, based on main `f4f786d` (0.2.3). **Nothing is merged or pushed to main.** The branch is prepared for an isolated public preview and a PR; [current deployment/PR status](STATUS.md) records actual outcomes. Source and screenshots can be reviewed independently of publication.

## Five improvements and entry points

1. **Tracking → Muscle map.** Audited all 40 existing exercise definitions. Added separate front-squat, conventional-deadlift and reverse-lunge movements without changing existing identities. Squats now highlight quadriceps and glutes, along with relevant adductors and bounded stabilizers. Front/back regions share one source of truth and the selected outline does not color an untrained muscle. The legend distinguishes no recorded work, low, moderate and high relative weekly contributions in both themes.
2. **Programs → Find an exercise**, and the workout/plan pickers. Search is global, including aliases (RDL/OHP/DB/BB), relevant muscles, equipment and Unicode custom names. Search does not require or remain trapped in a category. Recently Used follows search, then Favorites and supported body-part categories. Optional equipment, muscle, movement and type/custom filters combine. Quick sections cap their rows and avoid duplicate favorite/recent entries; result pages render 30 entries at a time. Similar replacement alternatives retain the previous ranking logic.
3. **Dates.** Seven-column weekday/date geometry, equal date-button dimensions, centered weekly/history boxes and shared date-control sizing. Sunday/Monday conventions and all historical date values remain unchanged. Month/year transitions were exercised.
4. **Exercise Options.** Three frequent actions, one More Actions section and concise optional technique cues replace the tall stack. All 11 previous actions remain: replacement, targets/notes, progression/rest, copy weight/reps, check/uncheck, reorder up/down, remove last set and remove exercise. Destructive actions keep confirmation. Keyboard/backdrop dismissal and focus restoration are supported; Escape from the plan browser returns to its unsaved form.
5. **Active workout.** Exactly one eligible current set, with manual selection through set options or input focus. Warm-ups, supersets, out-of-order work, skipped/reopened sets, adds/removals/reordering and reload are supported. Completed rows are neutral and editable. Small complete/finished-with-skips indicators appear near exercise names. Skipping preserves entered values and never marks sets complete.

### Contribution rules

`src/muscle-contributions.js` centralizes ordinal classifications; catalog definitions carry them, so a custom exercise is not classified merely by sharing a built-in name/ID. Direct targets count actual completed working sets. Secondary high/moderate/low weights are 0.75/0.5/0.25; stabilizing high/moderate/low weights are 0.25/0.15/0.1. These are transparent coaching heuristics, not measured activation, mechanical tension or hypertrophy percentages. Warm-ups, unchecked and skipped sets do not count. Unlike the preceding challenging-set filter, completed working sets are included regardless of the optional RIR value.

Three completed back-squat sets produce 3 direct quadriceps sets, 2.25 estimated glute contributions, 1.5 adductor contributions and 0.3 minor spinal-erector contributions. Secondary/stabilizing values are never labeled direct sets. Adding values across muscles does not give a count of distinct performed sets.

Heat uses the same maximum direct-plus-secondary total across the selected week, with ordinal low/moderate/high bands. Stabilizer-only work is capped at low intensity. Colors compare muscles within a week; numeric weekly chart values remain the comparison across weeks. Changes to exercise classification, edits, deletions or week conventions recalculate the view from raw records, without rewriting those records.

The audit differentiates unsupported rows from braced barbell rows, low-incline press from flat press, hip hinges from knee-flexion isolation, and primary targets from incidental bracing. Legacy custom exercises use only their own saved primary/secondary labels until the user reviews the editable contribution controls. A compound checkbox never invents extra targets.

### Library and workout data behavior

Recents merge the latest saved completed working-set use with explicit exercise selection, deduplicate by ID and show at most six. Selecting an exercise for a plan counts as a selection even if the plan is later cancelled. Up to 50 selection timestamps are retained. Favorite IDs are separate preferences; missing custom IDs are hidden at view time, never silently deleted. Renamed exercises resolve through the same ID.

Plan picking temporarily hides the existing form while retaining its actual DOM, values and row order. Favorite changes and recency saves do not render away that form or alter the plan before Save. Selecting a custom exercise uses the same flow. Global search and categories reference canonical records, not copies of exercises.

Replacing an exercise containing entered work asks for confirmation. It retains the original exercise and entered values, marks its unfinished sets skipped, and inserts the replacement with its own unset load baseline. Other exercises and the workout identity remain. Replacement is undoable. No checked set is transferred to a different movement.

## Executed validation

Before implementation: **125 domain tests, 9 backend HTTP tests and 24 core browser checks passed**. Baseline evidence is under `baseline/`.

Candidate validation:

| Check | Executed result |
|---|---|
| Domain/schema/import/coaching and new refinement cases | 147 passed |
| Backend HTTP checks | 9 passed |
| Existing core Chromium workflows | 24 passed |
| Existing enhanced training/coach/preview workflows | 23 passed |
| Existing appearance/calendar/review browser checks | 12 passed |
| Actual archived 0.2.3 → 0.2.4 update/recovery | 11 passed, including private photo bytes and active draft |
| New workout/browser/visual suite | 19 passed |
| Preserved automatic-update browser suite | 13 passed, including real foreground polling |
| Actual main + preview composition | 5 passed, including explicit import, offline edits and untouched production |

The new suite covers all five areas, category-independent aliases, persistence, custom editing/selection, live plan-value preservation, keyboard dismissal/focus, warm-up/superset/skip/manual progression, confirmation/undo, symmetric calendar geometry, month/year boundaries, seven widths (320/375/390/430/768/1024/1440), both themes and offline use. The recorded 1,244-exercise search timing (including UI debounce) is in the browser-results JSON; it is not a physical-phone performance guarantee.

Actual synthetic screenshots and JSON are in [artifacts/workout-ux](../../artifacts/workout-ux). Representative views: [library](../../artifacts/workout-ux/light-390-library-home.png), [search](../../artifacts/workout-ux/dark-390-library-search.png), [map](../../artifacts/workout-ux/light-390-muscles.png), [compact options](../../artifacts/workout-ux/light-390-options.png), [current set](../../artifacts/workout-ux/dark-390-current-set.png), [calendar](../../artifacts/workout-ux/light-1440-calendar.png).

Confirmed QA issues were corrected and rerun: the catalog fixture needed two programs to respect the existing 40-exercise-per-plan cap; the browser test needed an async dynamic-import wrapper; Escape required interception before a noncancelable browser CloseWatcher event to retain the plan form; the composed-site harness was corrected to observe native restore completion without assuming it navigates to History. Removing the last favorite now returns keyboard focus to the visible browser controls. No application failure was hidden by skipping a scenario. Physical Safari/Firefox, screen-reader traversal, native numeric keyboards and a complete WCAG audit remain unverified.

## Storage and history safety

Root schema and IndexedDB version remain **1**. Additive preferences: `upgrade.exerciseBrowser.favorites` and `recentSelections`. Draft-only cursor `activeSetId` and optional set `skipped` flags are backward-compatible fields. Explicit custom contribution metadata is optional and validated. Unknown legacy object fields are retained. Existing production/preview database names, locks, media and worker scopes stay separate.

All 40 previously reserved built-in IDs remain protected. If a new catalog ID collides with a previously valid custom ID, the user's custom definition remains authoritative, unique and correctly mapped; it is not replaced by the new built-in. This collision path is tested. Classification changes can change estimated muscle charts, while raw sessions, dates, loads, sets, records and associations remain intact. Photos stay in their existing media store. No private workout export was used for QA.

## Preview and approval

Use the existing preview workflow only from this branch. It builds current main separately, hashes every production asset before/after composition and adds the candidate only under its isolated preview path. GitHub environment protection is retained. Actual deployment status and any owner action are recorded in STATUS; a successful build alone is not described as a published preview.

For the exact verified local deployment layout, check out the branch, run `npm run build:review`, then `node scripts/serve.mjs review-site` and open `/preview/` at the printed local address. This archives and builds main without checking it out or changing its branch. `npm run test:review-site` executes the composed-build isolation test. Use a separate local origin/profile from other Gym Bro testing. A self-contained static review bundle is also provided under `artifacts/workout-ux/review-preview.zip` with a Node server and instructions; no Git checkout or npm packages are needed to run that bundle. Preview starts with its separate journal; explicit backup import is optional and changes never sync to production.

The intended PR body is [PR.md](PR.md). Native Git push is available, while the GitHub CLI authentication check fails and its API returns Forbidden; a PR URL will be reported only if creation actually succeeds. Main promotion requires explicit user approval after review.
