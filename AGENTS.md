# Gym Bro upgrade workflow

- Use the existing checkout and `improvements` branch. The current production baseline is `3c5985f66bf0c8be93b322926d88385c5cf0eb2e` on `main`.
- Read `docs/upgrade/STATUS.md` and `docs/upgrade/REVIEW_PLAN.md` before starting a feature.
- The user explicitly requested: “check with me when each step and feature are done so can approve it or make changes.” Complete and test one review checkpoint, provide a concrete review result, then stop for their response. Do not start the next feature while approval is pending. Routine implementation choices within the approved feature do not need separate questions.
- Chat approvals and corrections take precedence. Record an approval in STATUS.md and proceed without requesting it again.
- Commit reviewable work to `improvements`. Do not merge/push to `main` or run a production deployment without explicit release authorization. The existing workflow also permits manual dispatch; do not use it to deploy this branch to production.
- Preserve current records, media, imports, units, and exercise identities. A code branch does not isolate browser storage. Preview work must use a separate database, writer lock, worker/cache scope and clearly marked preview environment, or a genuinely separate origin. Never open an experimental data migration against the production database.
- Use synthetic test fixtures. Keep personal exports, converted private backups and personal screenshots outside the repository.
- Keep deterministic training facts separate from future LLM responses. No frontend API keys, arbitrary AI code/storage access, implicit cloud data sharing, or simulated responses presented as a live LLM.
