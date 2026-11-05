# Execution update

The latest user instruction removes checkpoint approval pauses. The sequence below is retained as an implementation checklist; proceed autonomously and record outcomes, rather than waiting after each item. Production release and paid/external services retain their separate authorization boundaries.

# Feature review checkpoints

The user's explicit review request governs this project. Work on one checkpoint at a time, complete its implementation and useful checks, provide a concrete review, and pause. No automatic advancement after a feature demo. Small styling/implementation decisions within that approved feature do not need separate questions. If a checkpoint is too large to review clearly, split it before implementation. Revisions stay within the same checkpoint until accepted.

**Current:** 01 completed, awaiting review. **Everything after 01 is not started.** Production release needs its own explicit authorization; feature acceptance on `improvements` is not permission to overwrite the live app.

## Audit and protection

| ID | Reviewable result | Acceptance evidence |
|---|---|---|
| 01 | Existing-feature inventory, risks, baseline tests, rollback point and this review plan | [Audit](AUDIT.md), 48 unit + 24 browser + 10 recovery checks; confirmed issues documented. Awaiting approval. |
| 02 | Isolated interactive preview and production release guard | Preview cannot access production DB/media/lock or replace the live site; visibly marked preview, clear way to test/revert. Production manual dispatch ref guard. |
| 03 | Versioned migration/recovery foundation | Native v1, verified legacy v3, photos, history, preferences, active drafts and unknown-time metadata survive round-trip, failed/interrupted migration and supported rollback/export. |

## Core experience

| ID | Reviewable feature | Acceptance evidence |
|---|---|---|
| 04 | Dark-first appearance with light/dark controls and reusable tokens | Actual mobile/desktop preview, contrast/focus/reduced motion, appearance persistence; no lost controls. |
| 05 | Navigation and information hierarchy | Recognizable Workout/Tracking/Settings; plans/history/body all reachable, keyboard/back/refresh work; no needless tab growth. |
| 06 | Smart workout logger | Previous-performance carryover, active/next set, quick completion/edit, accessible numeric input; explicit completion only. Fix F1 and F3 within this reviewed feature. |
| 07 | Autosave, restore, safe cancellation and undo refinement | Refresh/interruption/storage-failure scenarios; stable input focus and correct saved/display state. |
| 08 | Completion summary | Correct completed exercises, sets, load context, PRs, comparisons and observed duration; fix F5, show unknown duration honestly. |
| 09 | Optional workout-summary image sharing | Local export with user-selected data; no involuntary public upload, works without a social account. |

## Training intelligence

| ID | Reviewable feature | Acceptance evidence |
|---|---|---|
| 10 | Configurable progression and per-exercise equipment increments | User-approved double/rep/load/maintain/reduction options, precise kg/lb semantics (F2), clear prior-set explanations, bounded increments. |
| 11 | Exercise library expansion and filters | Search + muscle/equipment/type filters, primary/secondary muscles, difficulty, common mistakes, original/licensed cues; custom exercises preserved. |
| 12 | Ranked temporary substitutions | Goal/pattern/muscle/equipment/preference reasons; no baseline transfer or implicit saved-plan rewrite. |
| 13 | Gains analytics and PR definitions | Deterministic load/rep/strength/volume/frequency comparisons with filters and exercise history; estimates labeled and equipment kept separate. |
| 14 | Rep-aware plateau detection | Correctly recognizes F4 as progress; comparable exposures, RIR/missing-data/adherence safeguards; no one-session plateau claims. |
| 15 | Training-balance analysis | Direct versus estimated indirect work; actionable pattern/muscle observations without unsupported injury-risk claims. |
| 16 | Training calendar | Past/planned/missed sessions and direct history access; calendar states supported by explicit schedule data. |
| 17 | Adaptive schedule suggestions | Missed-session alternatives with preview/accept/reject; no duplicate workouts or forced routine changes. |
| 18 | Optional readiness check-in | Sleep, energy, soreness, fatigue/motivation inputs; conservative interpretation; no exact recovery/medical claims. |

## AI Personal Coach — flagship work

These are substantial independent checkpoints, not a chatbot skin. Keep deterministic facts, evidence, natural language and validated changes separate. A backend/credential blocker never permits a fake live-AI claim. Once the foundations are reviewed, prioritize this platform before optional advanced extras.

| ID | Reviewable feature/result | Acceptance evidence |
|---|---|---|
| 19 | Coach architecture, consent and data boundaries | Reviewed data → analytics → coaching → AI → action contracts, privacy/retention design and failure behavior; no credentials in frontend. |
| 20 | Structured training context and deterministic tools | Minimal relevant facts with provenance, actual gaps/estimates, no photo/body/readiness sharing without appropriate consent; notes treated as data. |
| 21 | Local coaching foundation and read-only coach UI | Useful data-grounded local insights, honest rules-based label, missing-data states; core app remains offline. |
| 22 | Secure backend/provider integration interface | Server-held credentials, authentication/abuse protection, bounded requests, secure configuration and deployment instructions; no paid provisioning without authorization. |
| 23 | Live conversational coach | Real provider responses only when configured/consented; structured validation, facts not invented, observable error/fallback paths and minimized outbound data. External credentials may be a genuine prerequisite. |
| 24 | Proactive coaching | Meaningful improvements/milestones/plateaus, low repetition, user controls; no workout interruption. |
| 25 | Weekly AI review | Accurate workouts, consistency, trends, PRs and next-week priorities; adjustable detail, clearly grounded observations. |
| 26 | AI plan generator | Valid structured sets/reps/rest/schedule/rationale; editable preview and explicit approval; no overwrite of current plans. |
| 27 | Natural-language application actions | Interpret → validate → preview → confirm → execute → verify; stale-action and permission tests; no arbitrary code/storage access. |
| 28 | Optional coach memory | Explicit versus inferred preferences distinguishable; inspect/edit/delete; memory never substitutes for workout records. |
| 29 | Coaching styles | Supportive, analytical, motivational, educational, minimal; same facts/rules across tones. |
| 30 | Coach evaluation and refinement | Beginner/no data, extensive history, progress, plateau, inconsistency, corruption, conflicts, unsafe requests, rejected changes, deletion, nonexistent facts and adversarial notes. Document failures honestly. |

## Advanced features

Each builder subfeature is a separate approval checkpoint.

| ID | Reviewable feature | Acceptance evidence |
|---|---|---|
| 31a | Plan duplication and custom templates | Original plans preserved, predictable IDs, preview/edit/save flows. |
| 31b | Drag/drop plus accessible keyboard exercise ordering | Works on touch/keyboard with stable focus and persistence. |
| 31c | Set-specific targets, warm-up configuration and rest preferences | Working/warm-up/drop semantics remain distinct, usable default editor, honest duration estimates. |
| 31d | Supersets and advanced set grouping | Group/order/persistence/undo correctness; ordinary logging stays simple. |
| 32 | Lift/strength/consistency/body goals | User-defined targets, correct progress and no unsupported forecasts; previous records retained. |
| 33 | Achievement improvements | Clear current criteria and next tiers, correct PR semantics, persistent unique unlocks; no unsafe reward incentives. |
| 34 | Front/back interactive muscle map | Tap targets, direct/indirect counts and trends, accessible labels and small-screen usability. |
| 35 | Barbell plate calculator | Real plate inventory, total/bar conventions, unit and impossible-load tests. |
| 36 | Optional haptic/interaction feedback | Progressive enhancement only on supported devices; no required permissions or broken fallback. |
| 37 | Optional sync architecture | Authentication, isolation, merge/conflicts, backup/account deletion design; implementation/provisioning only if explicitly authorized and not a core dependency. |

## Final hardening and release

| ID | Reviewable result | Acceptance evidence |
|---|---|---|
| 38 | Long-history performance | Representative multi-year synthetic data, startup/input/chart/backup profiles; improve measured bottlenecks. |
| 39 | Accessibility/visual consistency audit | Keyboard, screen-reader labels, contrast, large text, reduced motion, mobile/landscape; inspect screenshots and fix issues. |
| 40 | Cross-browser/PWA/data regression | Supported browser/device matrix, offline interruption, update, native/legacy imports, migration/media recovery; list unrun physical-device checks. |
| 41 | Release candidate and production approval | Final feature/bug/test/AI/privacy/limit docs; confirmed rollback path; no production merge/deploy until user explicitly authorizes it. |

## What each review includes

1. The feature implemented and the user-visible result.
2. A safe preview/how-to-test; screenshots when visual.
3. Checks actually run, outcomes, remaining risks and external blockers.
4. A small saved commit on `improvements` and any rollback/migration implications.
5. One clear approval/revision question; wait before the next feature.

Separate technical completion from user approval. A local rules engine is not an LLM; a provider interface is not a functioning cloud integration; tests on Chromium are not physical-device certification; an `improvements` commit is not a production release.
