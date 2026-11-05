# Gym Bro 2.0

Private, offline-first strength training with an optional OpenAI-compatible coach backend. Native ES modules, Node 22+ and no npm dependencies. The upgrade is on `improvements`; `main` remains the stable app.

- Stable: https://jusumusu.github.io/GymBro2.0/
- Upgrade preview: https://jusumusu.github.io/GymBro2.0/preview/
- [Upgrade status and scope](docs/upgrade/STATUS.md)

The preview has a **separate journal**, database, writer lock and service-worker scope. It starts empty. To try your own records, export JSON in the stable app, then explicitly import that backup in preview Settings. Your stable journal stays separate; changes do not synchronize between them. Keep your original backup.

## Run and verify

```sh
npm run dev              # serve source; open the printed HTTP URL
npm test                 # deterministic, schema, migration and coaching tests
npm run test:backend     # localhost HTTP tests with a stub AI provider
npm run build            # static PWA in dist/
npm run preview          # serve dist/
npm run test:e2e          # core Chromium regression
npm run test:upgrade      # upgraded UI, responsive layouts and storage isolation
npm run test:update       # stale-cache recovery without journal deletion
npm run benchmark         # synthetic 1,500-session CPU benchmark
```

Browser tests require installed Chromium (`CHROMIUM_PATH` can override its location), use temporary profiles and synthetic records, and write results/screenshots to `artifacts/`. No installation is needed for ordinary app development. Use HTTP/HTTPS, not a file URL.

## Included in the upgrade

Dark-first appearance with light/system controls; clearer navigation; previous-performance logging; correct completion summaries and local PNG exports; searchable editable history; 40 exercises plus custom movements; ranked temporary swaps; per-exercise progression rules; conservative optional lighter-load candidates; rep-aware plateau checks; richer analytics; calendar and approved rescheduling; optional readiness; explicit goals and milestones; an interactive front/back muscle map; plate calculations; optional haptics; plan duplication, ordering, warm-ups, supersets, drop sets, per-set targets and rest guidance.

The **local coach** works offline with deterministic facts and templates. It can review your week, explain an exercise trend, propose a program, and preview supported journal actions. Editable program proposals and every coach action require explicit in-app approval. Its label always identifies local analysis.

The **cloud coach** uses a server-held provider key. It is prepared and tested with a stub provider, but no paid provider or backend hosting is provisioned. Follow [backend setup](server/README.md). Select cloud mode only after configuring your backend, entering its private access token for the current session and consenting to outbound context. No provider key belongs in the browser, repository or chat.

## Deploy without replacing the stable app

GitHub Settings → Pages must use **GitHub Actions**. Pushing `improvements` runs the preview workflow: build the current stable `main`, build this candidate, verify stable files remain byte-identical, and add the candidate under `/preview/`. The `github-pages` environment must permit the `improvements` branch. The production workflow is guarded to `main`. Do not merge or push this upgrade to `main` until a production release is requested.

A later stable deployment may remove the preview folder; pushing a candidate change rebuilds it. Return to the stable URL to stop testing. Branch rollback instructions and data boundaries are in [the release checklist](docs/upgrade/REVIEW_PLAN.md).

## Backups and old app recovery

In Settings, export complete JSON regularly. Native backups restore after validation and explicit full replacement. Original Gym Bro v3 exports merge through a separate preview with kg confirmation and duplicate detection; unsupported legacy shapes fail without changing records. [Backup details](docs/BACKUP.md).

If an old installed shell hides the update button, open `update.html` beside the relevant app URL, close other windows of that app and select **Update and open Gym Bro**. For preview use `/GymBro2.0/preview/update.html`; for stable use `/GymBro2.0/update.html`. The helper refreshes app files, not workouts or photos.

## Documentation

[Architecture](docs/ARCHITECTURE.md) · [Training rules](docs/RESEARCH.md) · [QA evidence](docs/QA.md) · [Known limits](docs/LIMITATIONS.md) · [Coach contracts and evaluation](docs/upgrade/COACH.md) · [Optional sync design](docs/upgrade/SYNC.md)

Browser data is device-local and can be cleared. Backups are not encrypted. Estimates and coaching suggestions remain editable; no medical assessment, recovery score, verified population strength standard or automatic cloud sync is claimed.
