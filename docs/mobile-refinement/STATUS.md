# 0.2.5 release status

The user approved main release on November 14, 2026: “merge it to main”. The reviewed development tip is `8633f334c1cae0fd866afd07d638339986bac4a9`, based on 0.2.4 main `b2689eb`. The normal merge retains the full history; the completed development branch is deleted only after successful main publication. [Release/data notes](RELEASE.md) · [Review evidence](REVIEW.md) · [Original brief](BRIEF.md).

## Publication

The [main Pages workflow](https://github.com/Jusumusu/GymBro2.0/actions/workflows/pages.yml) publishes 0.2.5 at https://jusumusu.github.io/GymBro2.0/ and preserves the separate journal at https://jusumusu.github.io/GymBro2.0/preview/ . The individual workflow run records the actual publication outcome. Production uses build `7a48ed84ab77`; preview uses `04e4f979efcb`. Journals, writer locks and worker/cache scopes remain separate.

The branch preview was successfully published during review: [final reviewed deployment 43474954597](https://github.com/Jusumusu/GymBro2.0/actions/runs/43474954597). Earlier environment-rule rejections were resolved by the owner without bypassing protection. PR creation returned `Post "https://api.github.com/graphql": Forbidden`; the approved release uses native Git merge and push instead. [Historical reviewed changes](https://github.com/Jusumusu/GymBro2.0/compare/b2689eb0f2b1cec47747180d91ef381191a9d11a...8633f334c1cae0fd866afd07d638339986bac4a9) remain accessible after branch deletion.

## Validation and limits

The reviewed candidate passed 316 checks: 169 domain, 9 backend and 138 browser checks. Final review evidence is in `artifacts/mobile-refinement/final-validation.json`; the release checks are recorded separately. The actual released update-screen dismissal was reproduced at 2,074 ms and repaired at the consent boundary, without a delay workaround. Settings remains readable when already current.

Root schema/database version stay 1. No personal export was used for testing. Existing workouts, drafts, plans, settings, recurring schedules and photos are preserved. Reminders work in an active app; reliable closed-app delivery needs separate infrastructure. Physical phone installation, OS notification presentation/clicks and full accessibility certification are not claimed.

## Historical review reproduction

For the original 0.2.4-root + 0.2.5-preview comparison, use the reviewed commit and a local main reference at its original 0.2.4 baseline. The current main build publishes the approved release at both scopes. `npm run test:mobile-update` independently archives the real 0.2.4 source from Git history and serves controlled versions in a temporary browser site, without downgrading production or transferring data.
