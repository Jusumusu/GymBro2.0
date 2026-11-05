# Release 0.1 limitations and roadmap

## Implemented versus remaining

The core app is functional and browser-tested, but the full product brief goes beyond this release. These are deliberate scope disclosures, not nonfunctional advertised buttons:

- Live research and the two user-supplied 2025/2026 DOIs could not be verified because the environment proxy was unreachable. Independent science review is still required.
- React, TypeScript, Zod, Vite, Vitest, and Playwright could not be installed. Native modules, runtime validation, Node's runner, and direct Chromium automation are the working fallback. A future migration should preserve existing pure domain functions and schema.
- No licensed/versioned strength-standard dataset: population tiers are explicitly unavailable rather than invented. Own-lift progress works.
- Weekly direct/indirect counts and conservative fatigue/plateau reviews work; automatic dynamic volume changes, statistical personalization, technique scoring, and richer sleep/soreness feedback are not implemented.
- Secondary goals and preferred weekdays are stored as preferences; primary goal drives prescriptions. Favorite/disliked ranking beyond exclusions, location presets, imported strength baselines, custom equipment types, supersets, and individual plate inventory/calculation are not implemented. Equipment increments are global, editable per profile, not per-exercise.
- Program templates rotate by manual choice; there is no enforced calendar scheduler. Expected duration is a user preference and exercise-count heuristic. Automatic routine selection does not yet rotate to the next plan.
- Strength e1RM charts, totals and time ranges work; per-lift target tracking, population comparisons, richer PR history, monthly summaries, and detailed session-duration analytics remain future work.
- Body weight and measurement history work, with actual-sample averages. Photo history supports paged loading and side-by-side grid display, not alignment overlays or a dedicated compare tool. Backups over 100 MB need smaller collections or a future streaming archive design.
- Milestones are persistent deterministic IDs. Achievement progress values are current data counts, so deleting source records can reduce current progress while unlocked badges remain earned. No OS push/notification system; only unobtrusive app messages and an opt-in rest timer.
- Original Gym Bro v3 complete exports with the verified session/snapshot format now merge directly, including body weights and the original routine. Additional legacy photos, measurements, saved-plan formats, lift targets, unknown exercises and pounds-based legacy exports require separate conversion and are rejected. Native backups still use schema v1. Legacy per-session warm-up flags remain notes; set rows use completed working-set semantics when reps are positive. Dates are exact; missing times and durations remain unknown.
- No health platforms, wearable integration, cloud synchronization, encrypted backup, nutrition module, or external media. No licensed exercise videos were bundled.
- Single-writer protection requires Web Locks (modern Chromium tested). Browsers without Web Locks can open multiple tabs; avoid concurrent editing there. No multi-device sync or conflict resolution.
- Numeric autosaves rerender on actions, not every key, to preserve input focus. If a storage write fails, the toast reports it; reload displays last committed data. Unsaved invalid numeric inputs must be corrected before set completion/finish.
- One-step undo is session-local and invalidates on subsequent writes. It is not an edit history. Full backups are the recovery mechanism.
- Full keyboard/screen-reader, iOS/Safari, Firefox, large-text, physical-device install, update lifecycle, and quota/eviction audits are not certified. See QA for tested checks.

## Next milestones

1. Restore package/research access; independently review evidence and exact recommendation thresholds.
2. Expand the tested legacy importer to additional formats and legacy media when fixtures are available; streamed ZIP media backup for large journals.
3. Split UI controller/view modules; introduce TypeScript tooling and cross-browser Playwright plus automated accessibility audits.
4. Add per-exercise equipment increments, favorites, schedule rotation, lift goals, date filters for photos, and richer data-derived weekly reviews.
5. Obtain a permitted versioned reference strength dataset, documenting sampling limitations; expose only supported comparisons.
6. Validate adaptive volume suggestions prospectively, with user approval and transparent evidence.
7. Add optional health integrations only after platform support, consent, and device testing.
