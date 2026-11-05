# Gym Bro

**Your training. A little stronger.**

An original, private, local-first fitness PWA with workout logging, editable programs, explainable progression, body tracking, real-data analytics, and 93 progressive milestones. No account, API key, subscriptions, or package downloads required.

## Run locally

Use Node.js 22+ (tested with 24):

```sh
npm run dev
```

Open the port printed by the server in your browser. Do not open `index.html` directly with a file URL: ES modules, IndexedDB, and service workers need an HTTP origin. This task already has an isolated checkout; use it directly, without creating another worktree.

```sh
npm test             # 48 named calculation/engine/schema/backup/import tests
npm run build        # production PWA in dist/
npm run preview      # serve production build
npm run test:e2e     # actual Chromium browser suite; installed Chromium required
```

Browser tests start an isolated local server and temporary Chromium profile, capture screenshots in `artifacts/`, and exercise offline mode. Set `CHROMIUM_PATH`, `E2E_PORT`, or `CDP_PORT` if your installation differs. The driver uses native DevTools Protocol, not Playwright. No npm install is needed because there are no external dependencies.

## Upload to GitHub

1. Extract the **source** ZIP and upload its contents to the root of your new `GymBro2.0` repository. Include the hidden `.github/workflows/pages.yml` directory. The ZIP contains an app folder: upload the files *inside* it, not another nested repository folder.
2. In GitHub **Settings → Pages → Build and deployment**, choose **GitHub Actions**.
3. Push/upload to `main`, or run the “Deploy Gym Bro to GitHub Pages” workflow manually.
4. Open the Pages URL GitHub reports. Load once online; subsequent essential use works offline. Install through the browser menu on supported devices.

The workflow builds `dist/` and deploys relative assets, so `/GymBro2.0/` paths work. It does not publish an existing Gym Bro app. The provided **static** ZIP already contains the generated site: upload its contents to any static HTTPS host; a GitHub repository alone is not a web host until Pages is enabled. On GitHub, the source + Actions route is recommended.

## Included functionality

- Onboarding/profile: seven primary goals, experience, units, equipment, exclusions, priorities, optional secondary goal and day preferences, notes, automatic-suggestion and timer toggles.
- Editable generated full-body / upper-lower / push-pull-legs programs; custom/manual plans, exercise library, custom exercises.
- Resume/autosave, numeric set logging, RIR, working/warm-up/drop/failure types, check/uncheck, first-set bulk copy, reorder/substitute/remove, editable targets/notes, optional rest timer.
- Save and edit history; confirm destructive actions; one-step deletion/discard undo.
- Exercise-isolated, deterministic double progression, missing-RIR rules, break/fatigue/plateau prompts, editable loads and reasons.
- Actual-record strength charts, direct/heuristic secondary set counts, weekly review, milestones.
- Same-day weight editing, seven-day averages, measurements, private raster photos, side-by-side photo grid with paged loading.
- Validated JSON export/import preview with atomic restore, duplicate handling, and direct original Gym Bro v3 history merge, CSV export, offline shell and manifest.

## Important release boundaries

This is a functional **0.1 release candidate**, not the entire multi-phase vision certified as finished. The network proxy prevented live research and preferred framework installation. It uses maintainable native JavaScript modules and Node tests rather than React/TypeScript/Vite/Vitest. See [known limitations and roadmap](docs/LIMITATIONS.md) and the [QA report](docs/QA.md) for exact scope and evidence.

No strength-standard thresholds are fabricated. No unverified cloud/health integrations are advertised. Data starts empty: screenshots use only records entered by browser tests, never seed a new user's journal.

## Documentation

- [Architecture](docs/ARCHITECTURE.md)
- [Research and engine rules](docs/RESEARCH.md)
- [Backup and recovery](docs/BACKUP.md)
- [QA evidence](docs/QA.md)
- [Limitations and roadmap](docs/LIMITATIONS.md)

Browser data is private to the device and origin. Export backups regularly; browser storage can be cleared. Backups are not encrypted. Use your own judgment on loads and technique: recommendations are editable coaching heuristics, not medical or clinically validated advice.

## Import workouts from the original Gym Bro

In Settings, choose **Import a backup**, select the original app’s v3 complete JSON export, and choose **Validate & preview**. Review counts, confirm that the source uses kilograms, and choose **Merge into history**. Existing workouts, draft, profile, measurements and photo blobs stay in place; matching workouts are skipped. Existing same-date body weights win conflicts, which the preview reports. This supports the verified v3 session format and its known exercises; files with legacy photos, measurements, extra saved plans or lift targets require a separate conversion and are rejected without changing your data. Gym Bro 2.0 backups continue to use explicit full replacement.
