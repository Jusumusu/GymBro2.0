# Gym Bro upgrade workflow

- Use the existing checkout and `improvements` branch. The current production baseline is `3c5985f66bf0c8be93b322926d88385c5cf0eb2e` on `main`.
- Read `docs/upgrade/STATUS.md` and `docs/upgrade/REVIEW_PLAN.md` before starting a feature.
- The user superseded the review pauses: “dont pause any more just go ahead with the whole thing.” Proceed through the upgrade autonomously with incremental commits, tests and progress reports. Ask only for actual missing credentials, cost authorization or irreversible infrastructure decisions.
- Commit reviewable work to `improvements`. Do not merge/push to `main` or run a production deployment without explicit release authorization. The existing workflow also permits manual dispatch; do not use it to deploy this branch to production.
- Preserve current records, media, imports, units, and exercise identities. A code branch does not isolate browser storage. Preview work must use a separate database, writer lock, worker/cache scope and clearly marked preview environment, or a genuinely separate origin. Never open an experimental data migration against the production database.
- Use synthetic test fixtures. Keep personal exports, converted private backups and personal screenshots outside the repository.
- Keep deterministic training facts separate from future LLM responses. No frontend API keys, arbitrary AI code/storage access, implicit cloud data sharing, or simulated responses presented as a live LLM.
