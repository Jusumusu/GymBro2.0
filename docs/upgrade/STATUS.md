# Upgrade status — November 7, 2026

The user removed feature-by-feature pauses and selected an OpenAI-compatible backend. Implementation continued autonomously on `improvements`. The user then explicitly requested “set this as main and commit”, authorizing the 0.2.1 production promotion. The former baseline `3c5985f66bf0c8be93b322926d88385c5cf0eb2e` is retained as `pre-upgrade-0.1.2`.

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

Production release checks passed: **95 domain/schema/import/coaching tests, 9 HTTP backend tests with a stub provider, 24 core browser checks, 23 upgrade browser checks and 11 update/recovery checks**. The recovery suite used the actual archived 0.1.2 app and verified all original journal fields and photo bytes survived the upgrade and first additive preference save. See [QA](../QA.md), `artifacts/`, and the [release note](RELEASE.md).

## Preview publication

The owner resolved the Pages environment branch restriction. [Run 42038654728](https://github.com/Jusumusu/GymBro2.0/actions/runs/42038654728) was rerun successfully on November 5 at 13:58 UTC and published https://jusumusu.github.io/GymBro2.0/preview/ . This preceded the subsequently authorized production promotion. The original rejected attempt is retained in [the release note](RELEASE.md) as historical context.

The 0.2.1 coach fix is included in the authorized main release: explicit offline/AI connection state, evidence-based routine reviews, mode/context retention, bounded conversation for the compatible backend, and visible failure without silent offline fallback. The production workflow retains the preview URL and its separate journal. Production keeps the existing `gymbro-local` database and adds defaults without replacing historical records. Deployment results are recorded in the delivery message.

## External prerequisites / remaining limits

Live cloud AI requires a host, server provider credentials and a private backend access token. No live provider was called or cost incurred; a stub test is not a live AI evaluation. Core local coaching works now. iOS/Safari/Firefox, physical-device installation/touch, full assistive-technology auditing, mobile performance, finite plate quantities, encrypted backup, actual sync and licensed strength-standard data remain outside the validated result. No exact recovery or injury prediction is offered.
