# Gym Bro upgrade workflow

- Use the existing checkout. The user explicitly authorized promoting the 0.2.1 upgrade to `main`: “set this as main and commit”. The former production baseline `3c5985f66bf0c8be93b322926d88385c5cf0eb2e` is retained by the `pre-upgrade-0.1.2` tag. Future feature experiments should use `improvements`.
- Read `docs/upgrade/STATUS.md` and `docs/upgrade/REVIEW_PLAN.md` before starting a feature.
- The user superseded the review pauses: “dont pause any more just go ahead with the whole thing.” Proceed through the upgrade autonomously with incremental commits, tests and progress reports. Ask only for actual missing credentials, cost authorization or irreversible infrastructure decisions.
- The current 0.2.1 promotion, production push and deployment are authorized. Keep reviewable commits and retained history; no force push. Future unrelated production releases need their own authorization.
- Preserve current records, media, imports, units, and exercise identities. A code branch does not isolate browser storage. Preview work must use a separate database, writer lock, worker/cache scope and clearly marked preview environment, or a genuinely separate origin. Never open an experimental data migration against the production database.
- Use synthetic test fixtures. Keep personal exports, converted private backups and personal screenshots outside the repository.
- Keep deterministic training facts separate from future LLM responses. No frontend API keys, arbitrary AI code/storage access, implicit cloud data sharing, or simulated responses presented as a live LLM.
