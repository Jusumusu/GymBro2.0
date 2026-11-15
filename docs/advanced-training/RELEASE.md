# Gym Bro 0.3.0 release

The user reviewed the isolated advanced-training preview, selected **A — Quiet focus**, then explicitly requested **“Merge to main”**. This supersedes the earlier review-only merge boundary. The reviewed feature source tip was `03189a97de76b6b36e4554d16fc5ff46b67e1634`, based on approved 0.2.5 main `df6000d8db32d3e5904a4f8e160dbd3ab15cc7f3`. A normal merge of [PR #1](https://github.com/Jusumusu/GymBro2.0/pull/1) retains every feature commit and the preceding release history.

## Included

Verified and optionally encrypted backups with atomic preceding-journal recovery; optional Focus Mode with real previous performance, supersets and persistent-deadline rest timers; multiweek blocks with immutable session targets and lighter/future-week controls; reversible time-adaptive workouts; private exercise feedback/memory and reviewed alternatives; standards-based calendar exports with recurrence, exceptions, time zones and external reminders.

The complete feature guide, approval record, technical contracts and limits remain in [REVIEW.md](REVIEW.md), [DESIGN_REVIEW.md](DESIGN_REVIEW.md), [ARCHITECTURE.md](ARCHITECTURE.md) and [QA.md](QA.md).

## Release verification

Fresh pre-merge checks passed: **212 domain tests, 9 backend HTTP tests with a stub provider, and 24 actual Chromium core regression checks**. Both scoped PWA builds and their integrity-verified offline shells were generated successfully. Production metadata identifies 0.3.0 build `6cc880441d25`; preview metadata identifies 0.3.0 build `7abdda1beaf7`. Distinct scope hashes are expected. Executed logs and build metadata are retained under `artifacts/advanced-training/release/`.

The reviewed candidate also passed 159 browser workflow checks, 120 new-interface layout checks across both themes and all requested widths, actual archived 0.2.5 update/recovery checks, and independent iCalendar/DST/exception parsing. Physical Apple/Google Calendar import, Safari/Firefox, mobile OS alarms/share sheets, and full physical-device performance/accessibility remain unverified. No cloud synchronization service is introduced.

## Data and installation

Root journal and IndexedDB versions remain 1. New data is additive and validated. Production retains `gymbro-local` and its writer lock; `/preview/` retains `gymbro-preview-v1` and its separate worker, lock and cache scope. Publishing the release does not copy preview journal records into production. Current drafts, historical exercise identities, private photo bytes, settings and older supported backups remain protected by the existing journal/verified-update contracts and the new queued atomic recovery path.

The approved main workflow publishes the release at https://jusumusu.github.io/GymBro2.0/ and retains the separate preview entry at https://jusumusu.github.io/GymBro2.0/preview/. Existing installations can open Settings → Update app, read the notes, then choose Update Now. No automatic reload interrupts an active workout. Export a backup before any later code rollback; older code may retain fields while not understanding the new training semantics.

Main deployment is verified from the actual GitHub Actions result before publication is reported. The completed feature branch is removed after successful deployment, following AGENTS.md; source/history remain available through the merge and PR. The final deployment/merge record is retained in `artifacts/advanced-training/release/publication.json`.

## Publication result

PR #1 merged normally as `e6c139813f6aa57ba62649724523dc381a2b8722`. [Main workflow run 43698445481](https://github.com/Jusumusu/GymBro2.0/actions/runs/43698445481) passed build/tests and deployment; native deployment logs report success at https://jusumusu.github.io/GymBro2.0/ . The completed feature branch is removed after this verified publication. The journal database names and preview separation remain unchanged.
