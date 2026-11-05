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

87 calculation/schema/import/coaching tests; 8 real HTTP backend tests with a stub provider; 24 core browser checks; 20 upgrade browser checks; 10 stale-app recovery checks. Viewport assertions cover 280–1440 px and landscape. See [QA](../QA.md) and `artifacts/` for final outcomes; [feature checklist](REVIEW_PLAN.md) records coverage and limits.

## Publication blocked by GitHub environment protection

[Preview run 42038654728](https://github.com/Jusumusu/GymBro2.0/actions/runs/42038654728) built and uploaded the combined 341KB Pages artifact successfully. GitHub rejected the deploy job: `Branch "improvements" is not allowed to deploy to github-pages due to environment protection rules.` No preview was published by this run; `/preview/` can still return 404. Main remains `3c5985f`.

The owner can open repository Settings → Environments → github-pages → Deployment branches and tags, keep the existing main allowance and add `improvements`, then re-run **all jobs** in that run. No protection setting was changed or bypassed here. The intended preview URL is https://jusumusu.github.io/GymBro2.0/preview/ . Once published, it starts with a separate empty journal; importing a stable backup is an explicit user action. See [release note](RELEASE.md).

## External prerequisites / remaining limits

Live cloud AI requires a host, server provider credentials and a private backend access token. No live provider was called or cost incurred; a stub test is not a live AI evaluation. Core local coaching works now. iOS/Safari/Firefox, physical-device installation/touch, full assistive-technology auditing, mobile performance, finite plate quantities, encrypted backup, actual sync and licensed strength-standard data remain outside the validated result. No exact recovery or injury prediction is offered.
