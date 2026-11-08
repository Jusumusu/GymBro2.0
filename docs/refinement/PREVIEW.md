# Historical feature-preview deployment

The user first requested a working website preview while keeping 0.2.2 separate from main. [Run 42459315097](https://github.com/Jusumusu/GymBro2.0/actions/runs/42459315097), commit `2c63c47`, ran on November 8, 2026 at 07:33 UTC (09:33 in Jerusalem). Its build passed and produced a Pages artifact, but GitHub rejected deployment:

> Branch "feature/appearance-calendar-weekly-review" is not allowed to deploy to github-pages due to environment protection rules.

No protection rule was bypassed or changed. The local composition check also passed: every production asset was byte-identical to main `c35c629`. See [the historical build evidence](../../artifacts/refinement/preview-build-results.json).

## Superseded by main approval

The user subsequently approved merging and releasing 0.2.2: “great work, commit this branch to main”. The approved release uses the existing main workflow, which publishes both https://jusumusu.github.io/GymBro2.0/ and its isolated https://jusumusu.github.io/GymBro2.0/preview/ copy. There is no need to allow or rerun the old feature-branch deployment. [Release/data notes](RELEASE.md).

Preview retains its separate journal. Production workouts do not appear automatically; explicitly import a copy of a complete backup to review them there. Preview edits do not sync back to production. Main is the only long-lived branch; finished feature branches are removed after successful release.
