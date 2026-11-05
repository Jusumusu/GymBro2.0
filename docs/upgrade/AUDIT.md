# Checkpoint 01 — current product audit

Audited November 5, 2026. App version 0.1.2, code baseline `3c5985f66bf0c8be93b322926d88385c5cf0eb2e`. Work remains on `improvements`. This is an inventory and evidence report, not a claim that the new product brief has been implemented or that every existing feature is defect-free.

## Outcome

Preserve the current native-module architecture and its pure training functions. The core local tracker is working, with tested recovery/import behavior. Major requested additions include a dark/light design system, richer logger/completion experience, goals/calendar/muscle map, and a real AI coaching platform. There is currently no LLM integration, backend, authentication or cloud synchronization.

Before interactive preview work, isolate browser data. Before a coach consumes plateau/duration data, fix the confirmed correctness issues below. No application behavior changed during this checkpoint.

## Repository and architecture inventory

| Area | Current implementation | Consequence for the upgrade |
|---|---|---|
| Runtime/build | Dependency-free JavaScript ES modules, Node ≥22; tested on Node 24. `package.json`, `scripts/build.mjs`, `scripts/serve.mjs`. No package lock or external dependencies. | Retain working modules. Add dependencies only for a demonstrated need; a framework rewrite is not a prerequisite. |
| UI/controller | `src/app.js` renders views and dispatches form/actions; `src/ui.js` provides escaped HTML, original SVG icons, chart/field helpers. | Incrementally extract views/controllers while implementing approved features. Avoid changing the whole app at once. |
| Styling | `src/style.css` tokens and responsive breakpoints, light appearance only. Large dense CSS/JS lines limit readability. | Build dark/light tokens and reusable controls, preserving interaction behavior. |
| Models | `src/model.js`, state schema v1, bounded runtime validation, valid calendar dates, reference checks, UUIDs, canonical kg/cm. | Add explicit tested migrations when schema changes. Unknown native versions currently fail rather than auto-migrate. |
| Persistence | `src/storage.js`: IndexedDB `gymbro-local` v1; `state` and `media` stores; one `current` structured state record; photo blobs separate. | Keep original database readable and recoverable. Avoid whole-state writes for every key as history grows. |
| Mutation flow | Clone current state → apply mutation → validate → await transaction → replace in-memory state; writes serialize. | Reuse for validated actions, add clear transaction/revision semantics as needed. |
| Concurrency | Origin-wide `gymbro-writer` Web Lock, page-exit warning for pending writes, pagehide lock release. | Preview must have a separate lock/database. Unsupported Web Locks browsers need deliberate fallback coverage. |
| Training | `engine.js`, `planner.js`, `exercises.js`, `analytics.js`. Pure functions separated from UI. | Preserve deterministic calculations and fix identified limits before using them as coach facts. |
| Portability | Native v1 backup parser/export; original Gym Bro v3 converter/merge in `legacy-import.js`; atomic state/media restore. | Preserve both import paths and existing exercise identities; add migration fixtures for new state fields. |
| PWA | Relative manifest/scope/start path, 192/512 PNG and SVG icons, content-versioned asset precache, hash routes; no `skipWaiting`. | Retain offline logging and subdirectory support. Test upgrades rather than just fresh installs. |
| Recovery | `public/update.*`, excluded from precache; validates a reachable production shell, guards writers, refreshes only matching app files. | Preserve data-safe update recovery for previously installed versions. |
| Deployment | `.github/workflows/pages.yml` builds/tests and deploys `main`; manual dispatch also exists. | Branch pushes are safe, but manual deployment is not branch-guarded. Preview/release controls need their own checkpoint. |
| Tests | Native Node tests plus real Chromium/CDP regression and update scripts, synthetic fixtures. | Extend meaningful coverage per feature. Do not call this Playwright or full cross-browser certification. |
| Documentation | Architecture, backup, research, limitations, QA, setup/deploy instructions. | Several original setup statements are historical (network access, deployment state). Update them when their corresponding feature/workflow is reviewed. |

Inspected source modules, controller/view/action paths, styles, assets/manifest, service worker/recovery files, build/server scripts, workflow, validation, import fixtures, test runners and existing product/research documentation. Binary icons and existing/browser-generated visual artifacts were reviewed as assets, not executable sources. No personal export was added to the repository.

## Current feature inventory

Status: **Working** means implemented, with baseline coverage noted later; **Partial** means capabilities exist but do not satisfy the upgraded brief; **Absent** means no functioning implementation is advertised.

| Feature | Status and actual behavior | Preserve / improve |
|---|---|---|
| Onboarding | Working: name optional; 7 primary goals; experience; frequency; duration; units; structure; five equipment categories. | Preserve editable profile and skipped nonessential fields. |
| Advanced preferences | Partial: exclusions, secondary goal, muscle priority, day preferences, notes, global increment, optional rest timer and adaptation toggle. Some are stored preferences rather than scheduling/secondary-goal logic. | Make future effects explicit; do not infer medical restrictions from free text. |
| Welcome import | Working: original/native backup selection before onboarding. | Preserve access for users migrating existing history. |
| Navigation | Working: Workout, Programs, Gains, Body, Settings; separate History hash route. | Proposed Workout/Tracking/Settings organization requires a reviewed information hierarchy, not removed features. |
| Appearance | Partial: coherent light/green tokens, responsive desktop/sidebar/mobile bottom navigation, focus and reduced-motion styles. | Dark-first design and light/dark settings are absent. |
| Generated plans | Working: full-body, upper/lower, PPL templates; equipment/exclusion, experience, primary-goal, priority and time heuristics. Existing programs retained on generation. | Weekly schedule and preference ranking are limited; no LLM plan generation. |
| Manual program editor | Working: create/edit/delete, select exercises, sets and min/max reps; one-step deletion undo. | No duplication, drag/drop, supersets, set-specific prescription UI or advanced rest rules. |
| Custom exercises | Working: primary muscle/pattern/equipment/compound flag and original notes. | No user-defined equipment categories or media upload for exercise demonstration. |
| Library | Working: 26 built-ins with original technique cues, pattern, muscles, equipment and load convention; free-text search. | No separate muscle/equipment/type filter controls, common-mistake field, rich media or advanced difficulty presentation. |
| Start/resume | Working from a program; draft restored from IndexedDB. Partial freestyle access: only exposed if there are no saved plans (F1). | Add a clear empty-workout entry without deleting plans. |
| Set entry | Working: weight/reps/optional RIR numeric inputs, explicit check/uncheck, edit completed values, add sets, remove last set with confirmation. | No previous-value autofill, active/next-set emphasis or expanded per-set targets. Completion feedback can become stale (F3). |
| Set types | Working: working, warm-up, drop, failure; warm-ups excluded from working-set analytics. | No superset grouping or dedicated warm-up prescription. |
| Previous performance | Working: exercise-specific prior working sets beside inputs. | Improve carryover without treating prefilled targets as completed performance. |
| Bulk controls | Working: first weight/reps copy, check/uncheck all, clear/discard confirmations. | Preserve fast actions and validation. |
| Exercise management | Working: temporary substitution, move up/down, removal, notes and editable session targets. | Substitutions currently filter by same movement pattern and available equipment; no scored ranking or detailed difference explanation. |
| Progression | Working/partial: no fabricated baseline; double progression; goal range defaults; missing-RIR confirmation; limited jump increments; return/readiness/decline rules; optional user-applied load. | Increment is global; rules need configuration and clearer data explanations. False plateau is confirmed (F4). |
| Autosave/recovery | Working for valid numeric inputs and set actions; restart/refresh retains draft; errors surfaced. | Test quota/crash behavior, stale feedback, optimistic-input failures and cross-browser concurrency. |
| Undo | Working: sets can be unchecked; deletion/discard snapshot undo invalidates after later writes. | Not a persistent/general action history; do not promise unlimited undo. |
| Rest timer | Working: optional, off by default; starts after completion, profile duration, dismissible. | No OS notifications, audio or haptics. |
| Workout finish | Working: at least one checked set, explicit incomplete-set confirmation, original unchecked values retained, saved journal. | No completion dashboard, reliable edit-proof duration, PR comparison panel or coach observations. |
| History | Working: date-sorted entries, editing preserves session ID, deletion/undo. | No search, calendar, tags, detailed comparisons or share image. Editing changes finish timestamp (F5). |
| Strength analytics | Working: same-exercise Epley estimates for externally loaded 1–10 rep sets; 4/12 week, 6 month, 1 year/all-time windows; first/latest change. | No true max testing, per-lift target model or comprehensive rep/load trends. High-rep strength estimates deliberately omitted. |
| Training analytics | Working: completed sessions/sets/reps/load×reps; direct weekly muscle counts and separate heuristic 0.5 indirect sets. | No exact hypertrophy/recovery claim; future coach must retain these limits. Full historical volume comparisons/workload trends limited. |
| Weekly review | Partial: deterministic text from current week, within-week estimated-strength comparisons, simple consistency emphasis. | Not AI; no rich previous-week/month comparison or comprehensive PR/goal review. |
| Plateau detection | Partial heuristic; 4 best-set score exposures; confirmed rep-improvement counterexample (F4). | Must change before making stronger coach claims. |
| Readiness | Partial: optional 1–5 check-in, used conservatively. | No individual sleep, energy, soreness, fatigue or motivation records. |
| Body weight | Working: one entry/date, same-day edit/delete, optional target, recorded history, 7-day actual-sample average and previous-window comparison. | No fabricated missing days; richer trends/goal view still needed. |
| Measurements | Working: chest, waist, shoulders, arms, thighs, hips, calves and custom names; per-name chart, kg/lb display also changes cm/in. | Preserve canonical cm and same-name/date uniqueness. |
| Progress photos | Working: front/side/back dates; local raster blobs, 8 MB/20 MP limit, grid comparison, 24-at-a-time loading, delete and complete backup. | No alignment overlay or dedicated comparison tool; full-sized image decoding can be expensive. |
| Achievements | Working: 93 tier IDs in 14 categories, persistent unlocked state, current values recalculated, no duplicate unlock IDs. | Criteria and PR labeling can improve; no unsafe max-attempt incentive or OS push notifications. |
| Strength standards | Absent by design; explicit unsupported-dataset explanation. | Do not invent benchmark thresholds. |
| Goals/calendar/schedule | Partial body-weight/frequency targets and current-week dots only. | Lift goals, future sessions, missed-session planning, adaptation previews and interactive history calendar absent. |
| Sharing | Absent; no account/public profile needed. | Optional, explicit user export only. |
| JSON portability | Working: complete native backup with media; bounded validation/preview; explicit replacement; atomic restore. | Whole-file encoding and 100 MB cap limit large collections. v1→future migration framework not present. |
| Original v3 import | Working for verified snapshots/known movements; deterministic IDs, matching record skips, merge preserves current data/draft/media, current weights win conflicts, kg confirmation. | Unsupported legacy media/measurements/extra plans/units fail explicitly. Keep this route during all schema changes. |
| CSV | Working: completed set rows, canonical kg, formula-prefix escaping. | Not a restore format. |
| Device privacy | Working: no remote training API/tracker; optional persistence request, no cloud accounts. | Data remains origin/device-local; backups not encrypted or guaranteed against browser eviction. |
| Coach / LLM | Absent: no chat, context tools, backend, prompt system, action protocol, memory, provider key or evaluation suite. | Build the layered system from trustworthy facts. Never relabel deterministic text as live AI. |
| Other extras | Absent: plate calculator, haptics, wearable/health sync, cloud sync, nutrition. | Optional future features; no paid service assumed. |

## Confirmed findings

These findings were **not fixed** during the audit. Each is assigned to a future review checkpoint.

| ID | Evidence | Impact / planned review |
|---|---|---|
| F1 | Actual Chromium: onboarding generates 2 saved plans; home has 0 visible `start-empty` controls. Source exposes freestyle only when no plan exists. | Logger/start UX: users should not have to remove saved plans to start empty. |
| F2 | Actual Chromium: changing profile display kg→lb and saving changes canonical increment from 2.5 kg to 2.4992939587 kg. | Progression configuration: round presentation without modifying the canonical increment. Historical session/body loads remain unchanged in this reproduction. |
| F3 | Actual Chromium: complete a set, clear its reps; persisted `done=false`, but completion button still has `aria-pressed=true` until another render. | Logger feedback/undo: display must match saved completion. No saved performance was fabricated in this reproduction. |
| F4 | Pure engine: 3×12, 3×13, 3×14, 3×15 at 20 kg, target 12–20, RIR 2. Total reps rise 36→39→42→45, but engine returns “four exposures show little change…may be a plateau” with moderate completeness. Best-set score clips reps at 10. | Plateau review: distinguish rep progress from genuine stagnation before coach personalization. |
| F5 | Source-confirmed: `finishWorkout()` always sets `finishedAt=Date.now()`, including editing existing history. Imported times may be zero/unknown. | Completion/duration model: preserve observed duration and distinguish unknown/imported times; do not calculate years-long durations from an old start. No duration UI is currently claimed. |

Machine-readable evidence: [UI observations](baseline/ui-findings.json), [engine counterexample](baseline/engine-finding.json). F1–F3 used an isolated synthetic browser journal. F4 used synthetic pure-function inputs. These demonstrate actual gaps beyond the passing regression suite.

## Data, release and scalability risks

| Risk | Status / required safeguard |
|---|---|
| Preview on the same origin shares production IndexedDB | Confirmed architecture: `gymbro-local` is hard-coded and not keyed by URL path. A separate GitHub repository/path on `jusumusu.github.io` is still the same origin. Preview isolation is a blocker before user-facing experiments. Use a truly separate origin or explicitly separate preview DB, lock and cache/worker scope. Never seed previews from real records without user-controlled import. |
| Manual workflow can deploy a non-main branch | `workflow_dispatch` is present without a ref condition on deploy. Do not run it for `improvements`; add a production branch guard in the preview/release checkpoint. Current branch pushes do not trigger deployment. |
| Code rollback does not roll back browser records | Preserve original backups and versioned migrations; retain an export path compatible with stored data. Do not change the production DB name to simulate isolation. |
| Whole-state writes / recalculation | A clone, validation and IndexedDB rewrite happen per valid numeric input. Multiple summaries/achievement/history traversals happen during rendering. Current small fixtures pass; years-of-history performance is not established. Profile representative large datasets before optimizing. |
| Media volume / restore leftovers | JSON base64 export loads all photos into memory; full restore puts new media but does not prune old unreferenced blobs. Potential memory/quota pressure needs testing; no data-loss failure was reproduced. |
| Clock/duration/history assumptions | Exact dates are separate from timestamps; imported timestamps use zero sentinels, profile weekdays are preferences, not planned sessions. Future coach/scheduling facts must distinguish missing from observed. |
| Model evolution | Schema v1 is validated, but general v1→v2 migrations do not exist. Add versioned migrations and rollback/export fixtures before introducing goals/readiness/coach memory. |
| AI privacy and action safety | No existing backend or AI credentials. Cloud LLM calls require a reviewed secure backend and explicit relevant-data consent. Never ship frontend keys, send all notes by default, execute generated code or let LLMs modify IndexedDB directly. |
| Training evidence | Current research notes explicitly mark supplied 2025/2026 sources as unverified and thresholds as coaching heuristics. Do not promote them to scientific certainty through AI wording. |
| Browser coverage | Chromium exercised; physical install, Safari/iOS, Firefox, exhaustive screen-reader/keyboard, large-text, storage eviction/quota and long-term performance are unverified. |

## Verification performed at this checkpoint

| Check | Result | Evidence |
|---|---|---|
| `npm test` | 48 named cases passed; 0 failed/skipped | [Unit results](baseline/unit-results.txt) |
| `npm run build` | Production build completed | Node 24, relative assets and precache generation; no production deployment |
| `npm run test:e2e` | 24 real Chromium checks passed | [Browser results](baseline/browser-results.json) |
| `npm run test:update` | 10 real Chromium checks passed | [Recovery results](baseline/update-results.json) |
| Targeted UI observations | F1/F2/F3 reproduced; 0 uncaught exceptions | [UI findings](baseline/ui-findings.json) |
| Targeted training observation | F4 reproduced | [Engine finding](baseline/engine-finding.json) |

Browser regression includes onboarding, logging, bulk actions, draft reload, incomplete completion, history edit, plan creation/delete/undo, custom exercises, body tracking/photos, unit preservation, native restore, legacy merge/duplicates, preservation of active draft and photo blobs, actual offline reload/logging and GitHub Pages-style subpaths. Six routes were checked for overflow at 280, 320, 360, 375, 390, 414, 430, 768 and 1440 px; landscape 844×390 and reduced motion are included. These are selected checks, not exhaustive certification of every button or all accessibility criteria.

Actual synthetic baseline visuals: [desktop](baseline/desktop.png), [mobile](baseline/mobile.png). No physical-device or cloud-AI behavior was tested.

## Rollback and approval

Current production baseline: [`3c5985f`](https://github.com/Jusumusu/GymBro2.0/commit/3c5985f66bf0c8be93b322926d88385c5cf0eb2e). Audit documentation is committed on `improvements`; application files remain at that baseline. Future feature commits must be small and reviewable, with explicit migration/recovery tests when persistent records change.

After approval, the proposed next step is **02: isolated preview and release guard**. No theme redesign, coach implementation, backend provisioning, data migration or production deployment begins under this audit checkpoint. Review [the full feature sequence](REVIEW_PLAN.md) and change the order or scope before approving if desired.
