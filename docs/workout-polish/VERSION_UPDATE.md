# Preview version correction — November 19, 2026

The development branch incorrectly retained the released **0.5.0** package version and Aero release notes. Settings also contained a literal 0.5.0 caption. Although build hashes already distinguished code updates, users could not identify the workout-polish preview by its displayed version or notes.

The preview is now **0.6.0**. Package/release metadata and notes agree; Settings derives its caption from the generated HTML release metadata. The updater explicitly labels its preview channel and displays “Gym Bro 0.6.0 preview”. Notes describe the currently available timer/library fixes and clearly identify the outstanding visual selection. The existing three-number version validation and update activation protocol remain unchanged.

Production remains **0.5.0**, build `22b389901373`, from main `5fd52d1`. Preview build: `1a553f395adc`. Composition verified that production files are byte-identical. Preview storage, writer lock and worker/cache scope remain separate. This version correction neither selects a visual concept nor authorizes a main merge.

## Executed checks

- **253 unit tests** and **9 backend tests** passed.
- **7 actual upgrade checks** installed the archived, deployed 0.5.0 preview (`9b290ef7fd20`) and updated it to 0.6.0 using the real updater. The new version/notes appear, the full synthetic journal and private photo bytes survive, offline reload succeeds, and the separately seeded production journal remains at 0.5.0 unchanged.
- **14 automatic-update** and **10 stale-cache** browser regression checks passed.

Evidence: `artifacts/workout-polish/version-update/` and the existing update-regression folders. Chromium ran; physical mobile browsers were not certified. All fixtures are synthetic.

The source remains on `feature/workout-polish-exercise-library` in draft PR #4. The 0.6.0 preview is published through the existing protected GitHub Pages workflow under `/preview/`. The normal production updater continues to follow the released main app; it does not install preview builds into the production journal.
