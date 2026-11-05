# Quality assurance report — 0.1 release candidate

Latest test date: November 5, 2026. Original baseline: November 4, 2026. Environment: Linux, Node 24.22.1, Chromium 155.0.8059.79. No physical-device certification or live GitHub deployment was performed.

## Executed evidence

- `npm test`: **48 named tests passed**, 0 failed, 0 skipped. Actual individual test names and runner totals are in `artifacts/unit-results.txt`.
- `npm run build`: completed; relative production assets and worker precache emitted to `dist/`.
- `npm run test:e2e`: **24 browser checks passed** using a temporary Chromium profile and a real local server. Results are recorded in `artifacts/browser-results.json`. No uncaught browser exceptions in the main tested flow.
- Root-path and GitHub Pages-style `/pages-test/` production deployment paths both loaded, activated a scoped worker, and reloaded offline.

The direct DevTools test driver was written because Playwright could not be installed through the unavailable environment proxy. It performs DOM interactions, validation, IndexedDB readback assertions, screenshots, viewport changes, and browser-level network disabling. These are actual Chromium executions, not mock browser results. Some interactions use DOM `click()` and `requestSubmit()` rather than physical pointer input, so touch ergonomics and full keyboard/screen-reader behavior still need device testing.

## Calculation/domain tests

Required engine cases A–L: no baseline fabrication; rep progression; top-range load progression; excessive effort; missed targets; one temporary decline; sustained decline; return after a break; kg/lb round trip; exercise-substitution isolation; missing RIR; goal changes with immutable history.

Additional cases cover incomplete sessions, unchecked values, warm-ups, failure types, unusual increments and jump limits, low readiness, disabled adaptations, bodyweight handling, duplicate session evidence, invalid/nonfinite values, e1RM limits, equipment/exclusion-aware plans, goal ranges, true working-set totals, sparse weight averages, separate direct/fractional sets, 93 unique milestones in 14 categories, schema bounds, duplicate records, invalid dates/references, malformed imports, CSV formula escaping, and repeated exercise blocks counted as one exposure.

## Browser checks

1. Onboarding at 280, 320, and 390 px.
2. Profile creation and generated programs.
3. Weight/reps/RIR inputs, set completion, first-set bulk copy.
4. Draft recovery after reload.
5. Partial workout save with checked/unchecked sets preserved appropriately.
6. History edit without duplicate session creation.
7. Manual program creation, deletion, and immediate one-step undo.
8. Custom exercise creation.
9. Same-date weight entry replacement.
10. Measurement storage and chart rendering.
11. Photo upload to IndexedDB and image rendering.
12. Unit switching without modifying canonical historical weights.
13. Complete JSON backup, preview, duplicate detection, and atomic photo+state restore.
14. Analytics, milestones, weekly review, explicit lack of strength-standard dataset.
15. All six routes at 280, 320, 360, 375, 390, 414, 430, 768, and 1440 px, with horizontal-overflow assertions.
16. Landscape at 844 × 390.
17. Reduced-motion CSS behavior.
18. Active-workout inputs at 280 px.
19. Offline production reload and persisted set logging while browser networking is disabled.
20. No uncaught exceptions in that flow.
21. Subdirectory asset loading, scoped worker activation, and offline refresh.

## Visual artifacts

Actual screenshots: `01-onboarding.png`, `02-workout-home.png`, `03-active-workout.png`, `04-body-journal.png`, `05-gains-dashboard.png`, `06-mobile-home.png`, `07-landscape.png`, `08-smallest-workout.png` in `artifacts/`. They show only synthetic records entered explicitly by browser tests; real new-user state is empty. Desktop, mobile, and 280px workout screenshots were visually inspected. Secondary text was darkened after review. No claim of a complete contrast audit is made.

## Not certified

Safari/iOS, Firefox, Android installation prompts, physical touchscreen use, actual OS-level PWA installation, service-worker update lifecycle across browser restarts, full screen-reader and keyboard traversal, 200% large-text audits, automated WCAG contrast auditing, quota exhaustion/eviction, corrupted live database repair, huge media collections, GitHub Actions execution, and live publisher research.

Some advanced logger controls (reordering, every special-set transition, every error path, every timer scenario) have not received exhaustive browser coverage. Runtime validation and domain checks cover their shared model, but that is not equivalent to full interaction certification. No wearable integrations or external strength datasets exist to test. See LIMITATIONS.md before calling this a complete production release.

## Fixed during testing

- Corrected the unit-runner invocation so output reports each named case rather than only a file-level result.
- Fixed the browser driver's async evaluation and navigation waits; early failed runs are not reported as passes.
- Scoped service-worker cache cleanup to each registration, preventing cross-path cache deletion.
- Invalidated undo snapshots after later writes to avoid restoring stale journals over new data.
- Added single-writer locking, invalid-numeric completion guards, real image decode checks, and one-exposure-per-session aggregation.

## November 5, 2026 — direct legacy import update

- 48 named unit/domain tests passed (34 existing plus 14 legacy-import cases).
- Browser regression now includes original-file merge, duplicate reimport, explicit kg confirmation, and preservation of current workouts, profile, draft and photo blobs.
- Eight additional local browser checks with the supplied original export passed: preview, all sessions/sets, exact values and identities, body tracking, history display, gains chart, repeat import and reload persistence. No personal export or screenshots from that test are committed.
- Native full-backup restoration remains covered by the existing regression. Unsupported legacy formats fail before any persisted state changes.
- Test navigation polling now tolerates Chromium context replacement while reloading; an early driver-only navigation failure was corrected and rerun.

## November 5, 2026 — stale app recovery

`npm run test:update` reproduces an old cache-first shell, deploys newer app files, opens the uncached recovery page, verifies writer-lock and offline guards, and checks that history, active draft, body data, exact photo bytes, localStorage, and unrelated/nested cache scopes survive the update. The welcome screen exposes backup import before onboarding. Production helper assets are excluded from precache to keep the recovery route reachable from older shells.
