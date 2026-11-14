# Advanced training — implementation ready for review

- Branch: `feature/advanced-training-experience`, based on approved main `df6000d` (0.2.5).
- Candidate: 0.3.0; all six requested features implemented.
- Design: **A — Quiet focus**, explicitly selected by the user on November 14, 2026. Original A/B/C studies and approval record are retained in DESIGN_REVIEW.md. No material design departure is intended.
- PR: https://github.com/Jusumusu/GymBro2.0/pull/1 . Main merge is not authorized and has not occurred.
- Review guide: REVIEW.md. Technical/data changes: ARCHITECTURE.md. Executed validation/platform limits: QA.md.
- Tests: 212 domain, 9 backend and 159 browser workflow checks passed, plus 120 final UI layout checks. Initial design alternatives passed 216 layout checks. Independent calendar parsing/recurrence expansion passed.
- Data: no production journal opened/migrated/transmitted; synthetic test data only. Additive validated fields, shared autosave/restore queue, immutable target snapshots, reversible set deferrals, real file evidence and atomic preceding-state/media recovery protect existing records. Production and preview storage/lock/worker/cache names remain separate.
- Preview: composed build and browser isolation passed. GitHub build/tests/root-byte checks passed, but deployment was rejected by the existing github-pages branch restriction. Protection rules were not changed. No live candidate URL is claimed. The tested local review ZIP is under artifacts/advanced-training/review-preview.zip; instructions are in REVIEW.md. No paid service or alternate hosted Site was created.
- Known limits: no cloud synchronization; password loss cannot be recovered; export windows are bounded; reimports may duplicate calendar events; physical Apple/Google/Safari/phone/OS behavior is unverified. See QA.md for explicit stubs versus real API/file tests.

Nothing has been merged into main or deployed to production. A separate explicit merge approval is required after review.
