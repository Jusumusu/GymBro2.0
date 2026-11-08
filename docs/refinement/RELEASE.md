# Gym Bro 0.2.2 — approved main release

The user approved promotion on November 8, 2026: “great work, commit this branch to main”. Merge `42c01700b585166ff56fcda7cbbd2355a788ee2f` retains the reviewed branch tip `c0f2eafba0ff7664b3fa83b7818d09fd5ba53dfb` and its full history. The preceding main `c35c629868d3545c0095c3360c5b5b992226bc12` is retained as tag `pre-refinement-0.2.1`.

## Included

Immediate persisted light/dark/system appearance, theme-aware PWA colors, responsive alignment refinements, consistent Sunday/Monday week preferences and goal-aware weekly reviews with historical navigation. [Calculation rules, screenshots and limitations](REVIEW.md). No additional application-source changes were introduced during promotion.

## Data contract

Production stays in `gymbro-local`; the preserved `/preview/` copy stays in `gymbro-preview-v1` with its separate lock and worker scope. Root schema/database versions remain unchanged. Existing journals retain Monday as their default; no saved workout date is rewritten. The theme cache contains only the appearance preference. Production and preview records do not transfer or sync automatically.

Fresh release checks passed: **124 domain tests, 9 actual localhost backend tests with a stub provider, and 11 browser update/recovery checks using the actual archived 0.2.1 main app**. The update verified workouts, active drafts, profile/body records, photo metadata and private photo bytes. The candidate's previously executed full browser/visual suites remain documented in the review guide. Production/preview build composition is checked before push and again in the main workflow.

## Publication and branch cleanup

Pushing approved main invokes [the normal Pages workflow](https://github.com/Jusumusu/GymBro2.0/actions/workflows/pages.yml), which runs tests, builds both scopes and publishes https://jusumusu.github.io/GymBro2.0/ plus its isolated `/preview/` copy. The actual workflow result is verified before reporting the release as published. The earlier rejected feature-preview run is historical and does not need rerunning or an environment-rule change.

After successful deployment, delete the completed `feature/appearance-calendar-weekly-review` branch. Only main remains until the next experiment; all merged commits and the preceding release tag remain recoverable. Do not rewrite shared history to roll back. Export a complete JSON backup before any future data/code rollback.
