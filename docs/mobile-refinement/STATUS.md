# 0.2.5 muscle map, schedules and mobile reliability review

Branch: `feature/muscle-map-scheduling-refinement`, from stable main `b2689eb0f2b1cec47747180d91ef381191a9d11a` (0.2.4). Main remains unchanged; nothing is merged. The user must approve a later promotion. [Detailed report](REVIEW.md) · [Exact brief](BRIEF.md).

## Preview

https://jusumusu.github.io/GymBro2.0/preview/

GitHub initially rejected this new branch because of the github-pages environment rule. The owner added it and [run 43470057296](https://github.com/Jusumusu/GymBro2.0/actions/runs/43470057296) succeeded, confirming the actual preview address. The [branch preview workflow](https://github.com/Jusumusu/GymBro2.0/actions/workflows/preview.yml?query=branch%3Afeature%2Fmuscle-map-scheduling-refinement) records subsequent final-source publications. No environment protection was bypassed.

The final tested preview is 0.2.5, build `04e4f979efcb`. Production is archived approved main 0.2.4, build `0f3f536c00e0`, with every composed production asset verified byte-identical. Six local composed-site browser checks passed, including explicit import into the separate preview journal, stable preview updater, offline edits and returning to unchanged production history/settings/draft/code. Direct access to the GitHub Pages hostname is not allowed by this cloud network; deployment status/URL was verified through GitHub and the actual composed paths were tested locally. The owner also confirmed the preview worked.

In preview Settings → Update app, the version screen stays open even when already current. Older preview clients can use https://jusumusu.github.io/GymBro2.0/preview/update.html?latest=0.2.5 . Production’s installed updater remains on the approved production channel until a main release is explicitly authorized.

## Results and limitations

316 candidate checks passed with zero final failures: 169 domain, 9 backend and 138 browser checks. The complete suite table, corrections, actual screenshots, performance scope and data behavior are in REVIEW.md and `artifacts/mobile-refinement/final-validation.json`. The controlled released-app trace reproduced the disappearing helper after 2,074 ms; this was repaired at the consent boundary, without a dismissal-delay workaround.

Root schema/database version stay 1. Rules, exceptions, preferences, delivery records and associations are additive. No personal export was used. Preview keeps separate storage, locks, worker/cache scopes and notification delivery state. Browser permission is necessarily origin-wide.

Reminders work in the active app, with supported browser notifications after explicit permission. Reliable closed-app delivery needs a separate authorized push backend; none was added. Physical Android/iPhone Home Screen behavior, actual OS presentation/clicks and full accessibility certification remain unverified.

## Pull request

`gh pr create` was actually attempted and returned `Post "https://api.github.com/graphql": Forbidden`. No PR exists from that attempt. [Open the comparison/PR form](https://github.com/Jusumusu/GymBro2.0/compare/main...feature/muscle-map-scheduling-refinement?expand=1); the prepared body is [PR.md](PR.md). No merge is authorized.

## Reproduce locally

Run `npm run build:review`, then `node scripts/serve.mjs review-site`; open the printed local address at `/preview/`. `npm run test:review-site` exercises that exact composition. `npm run test:mobile-update` builds the real archived 0.2.4 source from Git history and publishes the candidate into a temporary controlled browser site. No production downgrade or data transfer is needed to test two versions.
