# Architecture — 0.2 preview

A dependency-free ECMAScript-module PWA with Node 22+ build/test tools and an optional server-side LLM adapter. No account or network is required for core training. The user-authorized 0.2.1 release is on `main` for the deployment root; `improvements` remains available for experiments. Main builds also retain the isolated preview path.

## Modules and contracts

| Layer | Modules | Responsibility |
|---|---|---|
| Data | `model.js`, `extensions.js` | Canonical kg/cm, bounded schema v1, additive upgrade defaults, advanced prescriptions and preferences |
| Catalog / programs | `exercises.js`, `planner.js` | 40 original-text movements + custom entries, ranked swaps, templates, empty unchecked drafts |
| Deterministic tools | `engine.js`, `analytics.js`, `training-tools.js` | Progression/reduction candidates, observed records, weekly facts, goals, distribution and scheduling |
| Coach | `coach.js`, `coach-contract.js` | Relevant bounded context, local analysis, cloud client, validated preview-only actions |
| Optional backend | `server/coach-server.mjs` | Exact origins, authentication/limits, server-held key, compatible provider adapter and response checks |
| Persistence | `storage.js`, `backup.js`, `legacy-import.js` | IndexedDB state/media, atomic restore, native JSON/CSV and verified legacy merge |
| Presentation | `app.js`, `upgrade-ui.js`, `upgrade-controller.js`, `ui.js` | Hash routes, queued writes, dialogs/forms, escaped text, explicit approval, charts and exports |
| Delivery | `environment.js`, `style.css`, `upgrade.css`, `public/`, `scripts/` | Isolated preview, themes, responsive layout, worker/update and static composition |

The existing controller remains large; new functionality has separate view/controller/domain modules. Runtime validation is used rather than TypeScript/Zod. There are no CDN scripts, fonts or third-party packages. Future tooling changes should retain the pure tested domain functions and stable identities.

## Data and transactions

Weights are canonical kg and measurements cm; display units do not mutate history. Total, per-dumbbell and added-load conventions remain exercise-specific. Completed sessions retain actual values, prescriptions, notes and timestamps. Imported unknown times remain explicit sentinels, never fabricated durations. Warm-ups and unchecked rows are excluded from working metrics.

Every mutation clones the latest state, validates and completes a database write before replacing in-memory state. Writes are queued. A failed write leaves the previous committed state intact and shows an error. One-step deletion/discard undo is session-local and invalidates on subsequent changes. Pending writes warn on ordinary exit; valid drafts persist across reloads. Web Locks enforce one writer on supported browsers; avoid concurrent editing where unavailable.

Root schema stays v1 and the optional `upgrade.version=1` extension supplies defaults at load/import. Unknown extension versions fail without clearing data. Advanced optional prescription fields are validated. Older native backups remain readable. Expanded catalog IDs mean an older app cannot read every newly created preview backup; database isolation and retained original backups are the rollback mechanism.

Structured state and photo blobs have separate IndexedDB stores. Restore writes both in one transaction. Photos are local; native backups contain original bytes/metadata and are not encrypted. No personal export is committed. Catalog expansion cannot change verified legacy variant identities or reimport signatures.

## Preview / production isolation

`environment.js` chooses separate database (`gymbro-preview-v1`) and writer lock from the `/preview/` path or preview meta. Path detection prevents accidentally missing HTML meta from opening the stable database. Both state and media are inside the selected database. Production uses the original names. The preview is a usability/data-isolation boundary within the same origin, not an adversarial security sandbox.

`build --preview` marks HTML and manifest. Scoped relative assets, manifest and worker caches let `/GymBro2.0/preview/` coexist with stable `/GymBro2.0/`. Composition rejects a candidate lacking the separate database/lock contract, copies the stable build unchanged, appends preview and hashes every stable file. GitHub Pages deploys this combined artifact through the shared `pages` concurrency group. The production workflow deploys only main. No experimental migration opens stable IndexedDB.

## Offline and update behavior

The build emits content-versioned worker assets; source dev mode does not register a worker. Essential workout/planning/history/analytics/goals/catalog/local-coach use works offline after the initial production load. Cloud calls are not cached and fail visibly when unavailable. New workers wait for old app windows to close; there is no automatic `skipWaiting`.

The uncached `update.html` helper verifies fresh network files, takes the matching writer lock, unregisters only its own scope and removes only that scope's app caches. It does not delete IndexedDB, localStorage, photos or other/nested application scopes. Preview uses its own lock and relative update URL. The recovery test checks old cache-first code, writer blocking, offline refusal and exact preservation of journal/media.

## Optional AI and sync

The cloud provider has no journal storage handle. It receives selected facts after consent and can return only explanation plus whitelisted proposals. The browser checks action constraints twice and requires approval against an unchanged journal before save. Provider fact references are validated; free-form factual correctness still needs live evaluation. Backend credentials/hosting are external prerequisites. [Coach architecture/evaluation](upgrade/COACH.md) and [backend setup](../server/README.md).

Sync is design-only and separately scoped: [optional sync architecture](upgrade/SYNC.md). No cloud journal, medical recovery score, wearable connection or verified universal strength standard is claimed.
