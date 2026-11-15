# Advanced training — approved 0.3.0 release

- Merged branch: `feature/advanced-training-experience`, based on preceding main `df6000d` (0.2.5). Normal merge `e6c139813f6aa57ba62649724523dc381a2b8722` retains full feature history.
- Release: 0.3.0; all six requested features implemented.
- Design: **A — Quiet focus**, explicitly selected by the user on November 14, 2026. Original A/B/C studies and approval record are retained in DESIGN_REVIEW.md. No material design departure is intended.
- PR: https://github.com/Jusumusu/GymBro2.0/pull/1 . Merged successfully after the user explicitly authorized “Merge to main”.
- Review guide: REVIEW.md. Technical/data changes: ARCHITECTURE.md. Executed validation/platform limits: QA.md.
- Tests: 212 domain, 9 backend and 159 browser workflow checks passed, plus 120 final UI layout checks. Initial design alternatives passed 216 layout checks. Independent calendar parsing/recurrence expansion passed.
- Data: no production journal opened/migrated/transmitted; synthetic test data only. Additive validated fields, shared autosave/restore queue, immutable target snapshots, reversible set deferrals, real file evidence and atomic preceding-state/media recovery protect existing records. Production and preview storage/lock/worker/cache names remain separate.
- Preview: https://jusumusu.github.io/GymBro2.0/preview/ . After the user adjusted the GitHub deployment configuration, retrying workflow run 43610715966 succeeded. Native deployment logs confirm the published URL. Composed root-byte and browser isolation checks passed; approved main stays unchanged at the root. Direct live-site fetching from this execution network is restricted, so physical-device verification remains with the user. The local review ZIP remains available. No alternate Site or paid service was created.
- Known limits: no cloud synchronization; password loss cannot be recovered; export windows are bounded; reimports may duplicate calendar events; physical Apple/Google/Safari/phone/OS behavior is unverified. See QA.md for explicit stubs versus real API/file tests.

The authorized main merge and production deployment succeeded. GitHub Actions run 43698445481 passed build, tests and publication. The production app is https://jusumusu.github.io/GymBro2.0/ ; the preview keeps its separate journal. The completed feature branch is removed after successful publication. See RELEASE.md and artifacts/advanced-training/release/publication.json for evidence.
