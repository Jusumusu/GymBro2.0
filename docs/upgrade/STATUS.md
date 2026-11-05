# Upgrade status — November 5, 2026

The user removed feature-by-feature pauses and selected an OpenAI-compatible backend. Implementation continued autonomously on `improvements`. The stable baseline on `main` is `3c5985f66bf0c8be93b322926d88385c5cf0eb2e`; no production merge is authorized or performed.

## Implemented

- Compatible extension defaults/validation; isolated preview database, lock, media and worker/cache scope; stable-root byte comparison during preview composition.
- Dark/light/system appearance, streamlined navigation, better logger focus/completion, freestyle access, exact unit increment preservation, correct historical finish times, summary and real PNG export.
- 40 built-in movements, original cues and custom exercises; combined filters and temporary ranked substitutions; stable legacy movement identities despite catalog growth.
- Rep/load/double/manual progression, per-exercise rules, optional bounded reduction candidates after repeated misses, no fabricated baselines, high-rep plateau correction and matched-load repetition records.
- Calendar/scheduling with approved missed-session adjustments; optional sparse readiness; goals, milestones, muscle map and lazily rendered additional analytics.
- Deterministic offline coach; bounded structured context, recent conversation and explicit memory; styles, weekly review, dismissible observations, editable program proposals, preview/approve/reject journal actions and decision receipts.
- OpenAI-compatible authenticated backend, exact origin allowlist, rate/body/time limits, server-only provider key and validated responses. The browser stores its backend access token only in memory.
- Plan duplication, drag ordering and keyboard move controls, warm-ups, supersets, set-specific targets, rests, plate-size calculator and optional supported-device haptics.
- Optional sync architecture and deployment/privacy documentation; no account or cloud dependency added to core use.

## Validation

Current coach-fix validation: 95 calculation/schema/import/coaching tests, 9 real HTTP backend tests with a stub provider and 23 upgrade browser checks passed. The prior core browser (24) and stale-app recovery (10) results remain the 0.2 baseline; those two suites were not rerun for this focused patch. Viewport assertions cover 280–1440 px and landscape. See [QA](../QA.md) and `artifacts/` for final outcomes; [feature checklist](REVIEW_PLAN.md) records coverage and limits.

## Preview publication

The owner resolved the Pages environment branch restriction. [Run 42038654728](https://github.com/Jusumusu/GymBro2.0/actions/runs/42038654728) was rerun successfully on November 5 at 13:58 UTC and published https://jusumusu.github.io/GymBro2.0/preview/ . Main remains `3c5985f`. The original rejected attempt is retained in [the release note](RELEASE.md) as historical context.

The 0.2.1 coach fix stays on `improvements`: explicit offline/AI connection state, evidence-based routine reviews, mode/context retention, bounded conversation for the compatible backend, and visible failure without silent offline fallback. Its deployment result is recorded with the delivery message. Preview continues to use a separate journal.

## External prerequisites / remaining limits

Live cloud AI requires a host, server provider credentials and a private backend access token. No live provider was called or cost incurred; a stub test is not a live AI evaluation. Core local coaching works now. iOS/Safari/Firefox, physical-device installation/touch, full assistive-technology auditing, mobile performance, finite plate quantities, encrypted backup, actual sync and licensed strength-standard data remain outside the validated result. No exact recovery or injury prediction is offered.
