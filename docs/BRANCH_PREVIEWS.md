# Deploying the Aero branch

**Release approval, November 18, 2026:** the user approved merging Aero into main. This is the procedure used for the completed branch preview; the feature branch is removed after the production release is verified. See [0.5.0 release notes](RELEASE_0.5.0.md).

Use **Deploy isolated Aero preview** (`.github/workflows/preview.yml`) on `feature/liquid-glass-visual-redesign`. Pushing a matching change starts a fresh run. For manual dispatch, choose that exact branch in the workflow's **Run workflow** menu.

The previous preview configuration listened to the completed `feature/training-refinement-visual-redesign` branch, so Aero pushes started no workflow. Re-running an older run uses that run's original branch, commit and workflow; it does not deploy the latest Aero source.

The production workflow (`pages.yml`) deliberately deploys only main. Keep it that way. The preview workflow builds stable main at `/`, builds the candidate with preview storage/lock/worker isolation at `/preview/`, and verifies every stable production file is byte-identical before uploading the site. No main merge is needed to build the preview.

## GitHub Pages environment

The preview deploy job uses the existing protected **github-pages** environment. A successful build does not override its deployment-branch rules. If GitHub rejects the branch before the deploy job starts, a repository owner must open [Settings → Environments](https://github.com/Jusumusu/GymBro2.0/settings/environments), select **github-pages**, and allow the exact `feature/liquid-glass-visual-redesign` branch under **Deployment branches and tags**, retaining main and all other required protection/review rules. Then re-run the failed deploy job from the new Aero run.

Do not remove the environment, disable protection or deploy the feature app to the production root to work around a rejection. The connected GitHub app does not expose environment-administration actions here; an owner must make any required settings change.

The already-published, separate [Aero working preview](https://gym-bro-design-review.jesse03sousa.chatgpt.site/preview/) remains available while GitHub Pages approval is pending. Sign in with the owning ChatGPT account if prompted.
