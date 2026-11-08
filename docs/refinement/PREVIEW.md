# Requested website preview

The user requested a working website link after the branch was submitted for review. The candidate remains on `feature/appearance-calendar-weekly-review`; main has not been merged, pushed or changed.

Intended website: https://jusumusu.github.io/GymBro2.0/preview/ . **This address still shows the previously published version until the blocked deployment is allowed and rerun.**

## Actual result

[GitHub Actions run 42459315097](https://github.com/Jusumusu/GymBro2.0/actions/runs/42459315097), commit `2c63c47`, ran on November 8, 2026 at 07:33 UTC (09:33 in Jerusalem). The build passed and produced the Pages artifact. Deployment was rejected with:

> Branch "feature/appearance-calendar-weekly-review" is not allowed to deploy to github-pages due to environment protection rules.

No protection rule was bypassed or changed. The local composition check also passed: every production asset was byte-identical to a standalone build of main `c35c629868d3545c0095c3360c5b5b992226bc12`. Only the isolated preview contains the candidate. See [build evidence](../../artifacts/refinement/preview-build-results.json).

## Owner action

1. Open [repository environment settings](https://github.com/Jusumusu/GymBro2.0/settings/environments), then **github-pages**.
2. Under **Deployment branches and tags**, keep the existing rules and add a branch rule for the exact name `feature/appearance-calendar-weekly-review`.
3. Open [the failed run](https://github.com/Jusumusu/GymBro2.0/actions/runs/42459315097) and select **Re-run jobs → Re-run failed jobs**.
4. After deployment succeeds, open the preview URL above. It should show version **0.2.2** and the preview banner. If an old cached preview remains, use the [preview update helper](https://jusumusu.github.io/GymBro2.0/preview/update.html).

The normal app stays on current main. Preview has its own journal; production workouts do not appear automatically. To review with real data, explicitly import a copy of a complete JSON backup into preview Settings. Preview edits do not sync back to production.

The workflow now supports this feature branch as well as `improvements`; source changes on either allowed branch publish to the same preview path once GitHub permits deployment. A future main merge still requires the user's explicit approval.
