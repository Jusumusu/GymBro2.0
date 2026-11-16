# Public preview status

Review branch: `feature/training-refinement-visual-redesign`.
Draft PR: https://github.com/Jusumusu/GymBro2.0/pull/2

GitHub Actions run https://github.com/Jusumusu/GymBro2.0/actions/runs/43701492232 built and validated the candidate successfully. It also verified that approved main remains unchanged at the production root.

Publication was rejected before the deployment job started:

> Branch "feature/training-refinement-visual-redesign" is not allowed to deploy to github-pages due to environment protection rules.

No new public preview is claimed. Existing production and previously published preview content have not been replaced by this run. The owner must allow this exact branch in Settings → Environments → github-pages → Deployment branches before retrying deployment. Do not remove the environment rules or change main to bypass them.

The locally tested candidate includes the real app, isolated gallery and rendered side-by-side comparison. Once publication succeeds, derive links from the actual Pages deployment output; candidate routes are `/preview/`, `/preview/docs/training-refinement/gallery.html` and `/preview/docs/training-refinement/comparison.html` below the confirmed repository site root.

While publication is blocked, all rendered visual alternatives and the actual-app before/after captures are available in the PR under `artifacts/training-refinement/`. The interactive gallery source is under `docs/training-refinement/`; `npm run build:review` reproduces the protected root/preview composition locally without switching or changing main.
