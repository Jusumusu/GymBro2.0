# Upgrade delivery — November 5, 2026

The upgrade is committed and pushed to `improvements`. The stable `main` branch remains at `3c5985f66bf0c8be93b322926d88385c5cf0eb2e`. Core training, coach tools, responsive interface and secure optional backend are implemented; [full feature status](REVIEW_PLAN.md), [QA](../QA.md), [backend setup](../../server/README.md).

## Actual publication result

[GitHub Actions run 42038654728](https://github.com/Jusumusu/GymBro2.0/actions/runs/42038654728), for source commit `125077b`, completed the build in 13 seconds: stable main build, 87 candidate unit tests, 8 backend tests, preview build, byte-identical stable composition and a 341KB uploaded Pages artifact. Deployment was rejected in 2 seconds:

> Branch "improvements" is not allowed to deploy to github-pages due to environment protection rules.

This run did **not** publish the preview. The existing stable deployment remains in place. No branch policy was changed or bypassed. The intended URL can still return 404 until the owner permits the preview branch.

## Owner action to publish the preview

1. Open [repository environment settings](https://github.com/Jusumusu/GymBro2.0/settings/environments), choose **github-pages**.
2. Under **Deployment branches and tags**, add the branch **improvements** while keeping the existing **main** allowance. Keep any other protection/reviewer rules you require.
3. Open the failed run above and choose **Re-run all jobs** (this rebuilds the Pages artifact if it has expired).
4. Wait for a successful deploy, then open https://jusumusu.github.io/GymBro2.0/preview/ .

The combined artifact keeps stable root files byte-identical and adds the separate preview. Preview has an empty isolated journal; explicitly import a copy of your stable backup if you want to test with records. Return to https://jusumusu.github.io/GymBro2.0/ to use the stable app. Do not merge the upgrade to main as a workaround for the branch restriction.

## Validation and remaining prerequisites

149 passed checks: 87 domain/schema/import/coaching tests, 8 HTTP backend tests with a stub provider, 24 core browser, 20 upgrade browser and 10 update recovery checks. Synthetic 1,500-session benchmark and screenshots are in `artifacts/`. Chromium testing does not certify physical devices or all browsers.

The OpenAI-compatible backend is prepared, with provider credentials held server-side, authentication, exact origin allowlist, limits and consent. Live AI still needs a backend host/provider credentials and real-model evaluation. Local coaching works offline now. No paid service was provisioned. See [limits](../LIMITATIONS.md).
