# Gym Bro 2.0

Private, offline-first strength training with an optional OpenAI-compatible coach backend. Native ES modules, Node 22+ and no npm dependencies. The 0.2.1 upgrade is promoted to `main` with user authorization. `improvements` remains available for separate experiments.

- Stable: https://jusumusu.github.io/GymBro2.0/
- Upgrade preview: https://jusumusu.github.io/GymBro2.0/preview/
- [Upgrade status and scope](docs/upgrade/STATUS.md)

The preview has a **separate journal**, database, writer lock and service-worker scope. It starts empty. To try your own records, export JSON in the stable app, then explicitly import that backup in preview Settings. Your stable journal stays separate; changes do not synchronize between them. Keep your original backup.

## Run and verify

```sh
npm run dev              # serve source; open the printed HTTP URL
npm test                 # deterministic, schema, migration and coaching tests
npm run test:backend     # localhost HTTP tests with a stub AI provider
npm run build            # standalone production PWA in dist/
npm run build:site       # production + preserved isolated /preview/ in dist/
npm run preview          # serve dist/
npm run test:e2e          # core Chromium regression
npm run test:upgrade      # upgraded UI, responsive layouts and storage isolation
npm run test:update       # stale-cache recovery without journal deletion
npm run benchmark         # synthetic 1,500-session CPU benchmark
```

Browser tests require installed Chromium (`CHROMIUM_PATH` can override its location), use temporary profiles and synthetic records, and write results/screenshots to `artifacts/`. No installation is needed for ordinary app development. Use HTTP/HTTPS, not a file URL.

## Included in the upgrade

Dark-first appearance with light/system controls; clearer navigation; previous-performance logging; correct completion summaries and local PNG exports; searchable editable history; 40 exercises plus custom movements; ranked temporary swaps; per-exercise progression rules; conservative optional lighter-load candidates; rep-aware plateau checks; richer analytics; calendar and approved rescheduling; optional readiness; explicit goals and milestones; an interactive front/back muscle map; plate calculations; optional haptics; plan duplication, ordering, warm-ups, supersets, drop sets, per-set targets and rest guidance.

The **local coach** works offline with deterministic facts and templates, and clearly states that no live AI is running in that mode. Routine-change questions review the saved program, recorded progress, equipment conflicts and missing evidence rather than defaulting to a weekly summary. It can review your week, explain an exercise trend, propose a program, and preview supported journal actions. Editable program proposals and every coach action require explicit in-app approval. Its label always identifies local analysis.

The **cloud coach** uses a server-held provider key. It is prepared and tested with a stub provider, but no paid provider or backend hosting is provisioned. Start with [Connect conversational AI](docs/AI_SETUP.md), then follow [backend setup](server/README.md). Select cloud mode only after configuring your backend, entering its private access token for the current session and consenting to outbound context. No provider key belongs in the browser, repository or chat.

## Production and preview deployment

GitHub Settings → Pages uses **GitHub Actions**. Pushing `main` tests and builds the release at the normal app URL, retaining an isolated copy under `/preview/`. The production journal keeps its original database and writer lock; it gains additive upgrade defaults. Preview workouts remain in their separate journal and are not automatically merged into production.

Pushing code changes to `improvements` builds current main unchanged at the root and adds that candidate under `/preview/`. Composition verifies every root file byte-for-byte. Both workflows share deployment concurrency and the permitted `github-pages` environment.

The pre-upgrade code is tagged `pre-upgrade-0.1.2`; the upgrade and merge history are retained. Export before any future rollback: new built-in exercise IDs are unknown to 0.1.2, so a code rollback alone is not a lossless downgrade of newly recorded data. [Release/data notes](docs/upgrade/RELEASE.md).

## Backups and old app recovery

In Settings, export complete JSON regularly. Native backups restore after validation and explicit full replacement. Original Gym Bro v3 exports merge through a separate preview with kg confirmation and duplicate detection; unsupported legacy shapes fail without changing records. [Backup details](docs/BACKUP.md).

If an old installed shell hides the update button, open `update.html` beside the relevant app URL, close other windows of that app and select **Update and open Gym Bro**. For preview use `/GymBro2.0/preview/update.html`; for stable use `/GymBro2.0/update.html`. The helper refreshes app files, not workouts or photos.

## Documentation

[Architecture](docs/ARCHITECTURE.md) · [Training rules](docs/RESEARCH.md) · [QA evidence](docs/QA.md) · [Known limits](docs/LIMITATIONS.md) · [Coach contracts and evaluation](docs/upgrade/COACH.md) · [Optional sync design](docs/upgrade/SYNC.md)

Browser data is device-local and can be cleared. Backups are not encrypted. Estimates and coaching suggestions remain editable; no medical assessment, recovery score, verified population strength standard or automatic cloud sync is claimed.
