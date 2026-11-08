# Gym Bro workflow

- The user approved the 0.2.2 refinement with “great work, commit this branch to main”. Merging, committing, pushing main and the resulting normal production deployment are authorized for this release. This supersedes the earlier review-only restriction. Future unrelated releases need their own approval.
- Keep `main` as the approved app. Use one temporary feature branch for the current experiment, starting from latest main. After approval, merge normally, verify deployment, then delete the completed branch. Do not retain a permanent `improvements` branch or accumulate finished branches. No force pushes.
- The reviewed source tip was `c0f2eafba0ff7664b3fa83b7818d09fd5ba53dfb`; merge commit `42c01700b585166ff56fcda7cbbd2355a788ee2f` retains its full history. The preceding production version is tagged `pre-refinement-0.2.1`; the earlier 0.1.2 baseline is tagged `pre-upgrade-0.1.2`.
- Read `docs/refinement/STATUS.md`, `docs/refinement/REVIEW.md` and the release note before starting another feature. The original user brief is preserved in `docs/refinement/BRIEF.md`.
- Preserve current records, media, imports, units and exercise identities. A code branch does not isolate browser storage. Experimental previews must use separate databases, writer locks, worker/cache scopes and a visible preview environment, or a separate origin. Never open an experimental migration against production storage.
- Production keeps `gymbro-local`; `/preview/` keeps `gymbro-preview-v1`. A main site build publishes both entry points without transferring journal records.
- Use synthetic fixtures. Keep personal exports, converted backups and personal screenshots outside the repository.
- Keep deterministic training facts separate from LLM responses. No frontend provider keys, arbitrary AI code/storage access, implicit cloud sharing, or simulated responses presented as a live model.
- Work autonomously with incremental commits, appropriate tests and progress reports. The user removed feature-by-feature pauses. Ask only for actual missing credentials, cost authorization or irreversible infrastructure decisions.
- The earlier feature-preview deployment was blocked by GitHub environment protection, not by the application build. Retain protection rules; the approved release uses the existing main workflow. Record actual deployment results before claiming publication.
