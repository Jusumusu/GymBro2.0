# Gym Bro 0.6.0 — release scope

This release contains the validated rest-timer repairs, expanded exercise library and version/update corrections. The user explicitly authorized merging PR #4 on November 19, 2026. Earlier review-only/no-merge notes describe previous checkpoints.

## Released behavior

- Individual and bulk set completion use the same optional automatic-rest policy. Queued actions recheck the current workout/set/preference, and late timer actions tolerate a closed draft. Deadline calculation, refresh and foreground repainting remain reliable.
- The usable library grows from 43 to 198 exercises, retaining every released definition, stable historical reference and custom record. Search aliases, equipment families, paging, favorites, recent selections and canonical ordinal muscle mapping remain integrated. Legacy custom equipment/load conventions survive editing, and custom records are labeled explicitly.
- App/update metadata, Settings and release notes identify 0.6.0 consistently. The normal production updater installs the released main build; the preview updater keeps its own channel and journal.
- The three light/dark chart/Focus/plan concepts remain in the RAM-only review. Links from either production or preview documentation always open the isolated app preview.

## Still in review

Final interactive-chart attachment, selected Focus completion styling, plan-creator layout/dirty-close guard and final timer controls are not applied without a design selection. Twenty-one band, assisted and timed definitions remain prepared but inactive until their truthful tracking is integrated. The three concepts and shared interaction preparation are retained in source for that follow-up. Releasing this technical update does not select a concept or claim all five improvements are complete.

## Executed release validation

- 253 unit tests and 9 backend tests passed.
- Seven actual production-upgrade browser checks install released main 0.5.0 (`5fd52d1`, build `22b389901373`) and update it in place to production 0.6.0. Complete synthetic journal equality, a colliding custom exercise ID, legacy timer metadata, private photo bytes and offline restart are verified. Both review URL locations are checked for preview-only app links.
- Earlier targeted preview-upgrade, automatic-update and stale-cache regression checks remain recorded in VERSION_UPDATE.md. Domain/training/storage implementations are unchanged by release preparation.

Production build: `062b5fb80f5d`. Preview build: `99f04ce94cbc`. The composed site retains separate `/preview/` database, writer lock, manifest and worker/cache scope. No workout records are transferred between channels or reset. Physical mobile browsers were not certified.

Evidence: `artifacts/workout-polish/production-upgrade/`. Production update entry point after successful deployment: https://jusumusu.github.io/GymBro2.0/update.html?latest=0.6.0 . Design review: https://jusumusu.github.io/GymBro2.0/preview/docs/workout-polish/review/ .
