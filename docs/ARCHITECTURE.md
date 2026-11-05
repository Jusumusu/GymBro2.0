# Architecture

Gym Bro 0.1 is a dependency-free ECMAScript-module PWA. The environment proxy prevented installing the preferred React/TypeScript/Vite stack. Choosing native modules allowed a working, testable, fully local build. Node ≥22 provides the server/build/test tools; installed Chromium supplies real browser automation through DevTools. No CDN, remote API, external font, or paid service is required.

## Separation

- `model.js`: schema v1, bounded runtime validation, IDs, dates, canonical-unit conversion.
- `exercises.js`: 26 exercise entries with original technique text, muscle/pattern/equipment metadata; user-defined exercises.
- `planner.js`: goal-, equipment-, exclusion-, experience-, priority-, and time-aware templates and manual plans.
- `engine.js`: pure deterministic progression with exercise-isolated history, reasons, and completeness labels.
- `analytics.js`: actual working-set totals, strength estimates, weekly direct/indirect sets, weight trends, and 93 milestones in 14 categories.
- `storage.js`: IndexedDB state/media stores and atomic restore.
- `backup.js`: versioned validated JSON backups and spreadsheet-safe CSV.
- `legacy-import.js`: validated original Gym Bro v3 migration, deterministic exercise/session identities, non-destructive history merge, duplicate/conflict reporting.
- `ui.js`: escaped HTML, icons, accessible chart summaries.
- `app.js`: hash routes, views, forms, queued mutations, actions.
- `style.css`: original design system, 280px+ responsive layout, focus styles, reduced motion.

UI view/controller splitting and a TypeScript toolchain are future maintenance improvements. Domain functions are independent of the UI and ready for migration.

## Integrity and privacy

Weights are kg and lengths cm internally. Unit settings affect display/input only. Load semantics distinguish total load, per-dumbbell load, and added bodyweight resistance. Saved sessions snapshot their prescriptions and actual sets. Profile changes cannot silently rewrite past sessions.

Mutations clone the latest state, validate it, and finish an IndexedDB write transaction before replacing in-memory state. Inputs are serialized. Completed sets need explicit load, reps ≥1, and explicit completion. Unchecked entries stay in the journal but do not influence progression. Persistence errors are surfaced; failed writes leave previous records intact.

Web Locks permit one writable tab where supported. Other tabs show a close/reload message. The browser warns on ordinary exit with pending writes. One-step deletion/discard undo is invalidated by subsequent writes, avoiding stale snapshot overwrites. It is session-scoped, not crash recovery. Drafts persist across visits.

Photo blobs are separate from frequently updated structured state. Restore writes state and media in one atomic transaction. Upload cleans up a blob if metadata saving fails. Photos are never uploaded. JSON backups include original image metadata and are not encrypted. CSP, escaped user strings, bounded file imports, valid raster formats, no ads, and no trackers reduce avoidable exposure.

## PWA/deployment

`npm run build` emits `dist/`, injects a content-versioned precache, and marks production HTML. Development mode does not register the service worker. Relative assets, hash routing, manifest scope/start/ID, and scoped worker caches support repository subpaths. First production load must succeed before offline use.

New service workers wait until tabs close: no `skipWaiting` and no IndexedDB deletion during updates. Essential logging, program editing, analytics, and recommendations need no network. HTTPS or localhost is required. The GitHub Pages workflow builds and uploads `dist/`; no deployment has been performed here.

## Honest boundaries

No cloud sync, wearables, health-platform integration, OS notifications, universal strength-standard dataset, or clinical recovery score is claimed. Native backups use schema v1. A verified original Gym Bro v3 session format can now be merged after preview; synthetic fixtures cover regressions. Unsupported legacy media, measurements, extra saved-plan formats and lift targets fail explicitly. Personal exports are kept outside the repository.

## Update recovery

`public/update.html`, `update.js`, and `update.css` are copied to the production build but deliberately excluded from the precache. The helper can therefore load through an old cache-first worker. It verifies network access to a real production shell, takes the single-writer lock, unregisters only the matching app scope, removes its app-file caches, and navigates to a fresh shell. It never deletes IndexedDB/localStorage or media. Nested/other application cache scopes are excluded from cleanup. Build version tokens keep helper assets independently refreshable. Ordinary worker installation still avoids `skipWaiting`; update recovery is an explicit user action after other app windows close.
