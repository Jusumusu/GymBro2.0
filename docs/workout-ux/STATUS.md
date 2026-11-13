# Workout UX release status

The user approved release on November 13, 2026: “merge it to main and delete the other branch”. The reviewed tip is `11bdb4e76adad037ea76383d5a101ab705b6d9d6`, based on approved main `f4f786d` (0.2.3). The release uses a normal merge retaining every feature commit. The completed `fix/workout-ux-muscle-map` branch is deleted after successful main publication.

All five improvements are complete. Review validation: 149 domain tests, 9 backend tests and 107 browser checks. The review report includes corrections, actual screenshots in both themes, seven responsive widths and unverified physical-browser scenarios. See [review evidence](REVIEW.md) and [release/data notes](RELEASE.md).

## Deployment

The isolated feature preview succeeded after the owner allowed its branch: [run 43214543450](https://github.com/Jusumusu/GymBro2.0/actions/runs/43214543450), rerun on November 12, built and deployed the actual candidate. The earlier branch-protection rejections are historical; no protection rule was bypassed. PR creation returned API Forbidden, so the approved release uses native Git merge and push.

The [main Pages workflow](https://github.com/Jusumusu/GymBro2.0/actions/workflows/pages.yml) tests and publishes 0.2.4 at https://jusumusu.github.io/GymBro2.0/ and preserves the separate preview at https://jusumusu.github.io/GymBro2.0/preview/. The individual workflow run records the actual publication outcome. Production and preview retain separate journals, locks, workers and caches. Settings updates remain within their current scope.

## Historical review download

The [verified review ZIP](https://raw.githubusercontent.com/Jusumusu/GymBro2.0/9d9b6290d88f7e9b39b974310d01af2ad303f7aa/artifacts/workout-ux/review-preview.zip) is pinned to its original commit so deleting the branch does not break the download. It contains main 0.2.3 for comparison and the reviewed 0.2.4 preview, not a new production backup. Provenance and SHA-256 remain in `artifacts/workout-ux/review-package.json`. No personal records or credentials are included.
