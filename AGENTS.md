# Gym Bro workflow

- Current task: release the reviewed 0.2.4 workout UX update. On November 13 the user explicitly authorized: “merge it to main and delete the other branch”. This supersedes the review-only boundary below. Merge normally, verify the main deployment, then delete only the completed `fix/workout-ux-muscle-map` branch locally and remotely. Preserve the merged history and all user data. Future unrelated releases need their own approval.
- Keep `main` as the approved app. Use one temporary feature branch for the current experiment, starting from latest main. After approval, merge normally, verify deployment, then delete the completed branch. Do not retain a permanent `improvements` branch or accumulate finished branches. No force pushes.
- The reviewed source tip was `c0f2eafba0ff7664b3fa83b7818d09fd5ba53dfb`; merge commit `42c01700b585166ff56fcda7cbbd2355a788ee2f` retains its full history. The preceding production version is tagged `pre-refinement-0.2.1`; the earlier 0.1.2 baseline is tagged `pre-upgrade-0.1.2`.
- Read `docs/APP_UPDATES.md` and the preceding refinement release notes before starting another feature. The original refinement brief is preserved in `docs/refinement/BRIEF.md`.
- Preserve current records, media, imports, units and exercise identities. A code branch does not isolate browser storage. Experimental previews must use separate databases, writer locks, worker/cache scopes and a visible preview environment, or a separate origin. Never open an experimental migration against production storage.
- Production keeps `gymbro-local`; `/preview/` keeps `gymbro-preview-v1`. A main site build publishes both entry points without transferring journal records.
- Use synthetic fixtures. Keep personal exports, converted backups and personal screenshots outside the repository.
- Keep deterministic training facts separate from LLM responses. No frontend provider keys, arbitrary AI code/storage access, implicit cloud sharing, or simulated responses presented as a live model.
- Work autonomously with incremental commits, appropriate tests and progress reports. The user removed feature-by-feature pauses. Ask only for actual missing credentials, cost authorization or irreversible infrastructure decisions.
- The earlier feature-preview deployment was blocked by GitHub environment protection, not by the application build. Retain protection rules; the approved release uses the existing main workflow. Record actual deployment results before claiming publication.

# Current workout UX refinement

- Historical review boundary, superseded by the November 13 release approval above: the November 12 brief required `fix/workout-ux-muscle-map` from main `f4f786dacf042dcb64c55360e72bdb5b764112b7`, with no main changes during review. Keep the original brief as historical context.
- Implement all five areas with stable IDs, additive compatible fields, incremental commits, actual rendered QA and meaningful tests. No paid services or unrelated redesign.
- The user explicitly requests pushing this branch, a PR if permissions allow, and a public isolated browser preview. Preview publication is authorized; keep production root byte-identical to current main, preserve preview storage/cache isolation and respect GitHub environment protection rules. Never claim an invented or unverified preview URL.
- Read the brief and current audit/status under `docs/workout-ux/`. Prior feature-by-feature pauses remain removed.
