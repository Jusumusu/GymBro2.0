# Review checkpoint — November 18, 2026

Branch: `feature/workout-polish-exercise-library`, from released main `5fd52d1` / 0.5.0. Draft PR: https://github.com/Jusumusu/GymBro2.0/pull/4. Main has not changed and no merge is authorized.

## Visual selection required

The user's brief explicitly says “Wait for my selection” and “Do not finalize unapproved aesthetic changes.” The three-direction [interactive review](https://gym-bro-design-review.jesse03sousa.chatgpt.site/preview/docs/workout-polish/review/) is published on the existing owner-private Site. A Inline precision is recommended. All three pair exact-point readouts, completed/current/upcoming Focus states, plan-creator organization and timer controls in light/dark. The app retains its released Aero styling until selection. This is one combined approval checkpoint, not a completed release.

## Completed independently

- Audited the baseline timer, charts, Focus, native plan dialog and 43-exercise library. Manual timer operation worked in Chromium. Subsequent tests reproduced a bulk-completion auto-rest omission and stale queued timer callbacks; both are fixed with before/after evidence. A rejected lifecycle hypothesis and the limits of physical-device reproduction are recorded in AUDIT.md.
- Prepared persistent rest pause/resume/reset operations, bounded adjustments, backward-compatible validation and one lifecycle-aware repaint interval. Existing manual/automatic/superset operation is tested. New controls are in the prototype; final app controls await approval.
- Prepared a shared immutable chart model, nearest-point selection and pointer/keyboard adapter, including missing data, separate series labels, edge positioning and bounded large-history drawing. App chart styling/attachment awaits approval.
- Expanded the available library to 198 exercises while preserving all 43 released definitions and custom/historical identities. Another 21 specialized tracking definitions are prepared separately. See CATALOG.md and catalog-coverage.json.
- Rendered 18 phone concept screens plus the desktop review and checked the three plan layouts at seven widths. Executed CDP touch and keyboard tests, including normal vertical scrolling. Physical iOS/Safari testing is not claimed.

Validation: [executed checks and limits](VALIDATION.md): 253 unit, 9 backend and 94 browser checks passed.

## Hosting

GitHub Actions run https://github.com/Jusumusu/GymBro2.0/actions/runs/44346733157 passed the build, test and unchanged-production composition job. The deploy job failed before any steps ran; no deploy logs were produced. The workflow retains the existing protected `github-pages` environment and targets the new branch. The connector cannot inspect deployment-branch protection details, so this report does not assert an unverified rejection reason or weaken protection.

The existing private Sites host is the working fallback. Source revision `f1c01228dca1214fecf9398bf9baf191e4fa784c`, saved version `appgprj_6afb13cac5348191bf97192174fa7bf8~appgver_840ed4d51ed081918c25ef2af9c60d91`, deployment `appgdep_6afdd2e16d048191a2aa4629e4a11171`: native publication succeeded. The initial published review used candidate build `feaa8c9b0060`. Subsequent catalog publication is recorded below when complete. Site ownership/audience and the original gallery are preserved. Managed live-browser routing is unavailable; native successful deployment verifies publication, while rendered interaction evidence comes from the repository's Chromium tests.

## Remaining after selection

Integrate the chosen chart/Focus/plan/timer design; complete duration/band/assistance logging and activate those entries with truthful metrics; implement the plan's dirty-close guard; then run final all-five-feature integration, offline/update and mobile acceptance checks. Keep the PR in draft until that work is complete. No merge is automatic.

## Latest published checkpoint

Candidate GitHub source `8ad380b06a984b448034a57b97d5f194f71c2a90`; candidate build **802bb4843f2a** (preview 0.5.0). Production composition remains build **22b389901373**, byte-identical to main `5fd52d1`. GitHub run https://github.com/Jusumusu/GymBro2.0/actions/runs/44352639335 passed its build/test/catalog/composition job, but its deploy job again failed before steps.

The working owner-private fallback now includes the **198-exercise catalog, confirmed timer repairs and three-direction review**. Site source `344a910a941b78f057e3989599ddb365feddef21`; saved version `appgprj_6afb13cac5348191bf97192174fa7bf8~appgver_b0971b3a9390819190708552629e4275`; deployment `appgdep_6afdd8b9d98481918153d1eb0e3ff17e` **succeeded**.

- Review: https://gym-bro-design-review.jesse03sousa.chatgpt.site/preview/docs/workout-polish/review/
- Isolated candidate app: https://gym-bro-design-review.jesse03sousa.chatgpt.site/preview/

The review is RAM-only. The app has its own preview journal; existing installations may offer the normal Load update prompt for the new build. This publication does not approve or finalize a visual direction. The combined selection request is still pending, and no main merge is authorized.
