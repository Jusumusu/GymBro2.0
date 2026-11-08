# App updates — 0.2.3

The user requested that Settings always load the latest published app and that available updates prompt immediately with an option to load them. They authorized main publication without a separate design review if the existing site appearance stays unchanged. Existing layout/theme styles are unchanged; only the requested functional notification and update-status text are added.

## User behavior

- On startup, return to the app, reconnection and every 60 seconds while visible, fetch uncached release metadata. Show **Update available → Load update / Later** as soon as a different build is detected. Build identity detects fixes even when the version number is unchanged.
- **Later** dismisses that build for the current app session; a newer build can notify again. Settings still exposes **Update app** and the latest check result.
- Both **Load update** and Settings **Update app** flush pending workout writes and open the uncached updater with explicit consent to install. A failed save or invalid workout value blocks navigation and explains the problem. One click starts the download; no second confirmation is needed.
- The updater rechecks the server's latest release, rather than installing the build remembered by a notification. It checks again before activation in case a newer release finishes publishing during the download.
- It verifies the entire new offline shell before activation, then reloads to Settings. No automatic reload interrupts a workout. Offline requests, incomplete downloads and another writing window leave the working app and journal intact.

Checks require an open/running app and connectivity. A closed or suspended app cannot receive an instant server-push notification; it checks on return. Old 0.2.2 installations must update once to gain the new behavior. If needed, close other Gym Bro windows and use [the uncached update helper](https://jusumusu.github.io/GymBro2.0/update.html?latest=0.2.3). Browser/OS background scheduling and physical-device push are not claimed.

## Release and cache contract

`scripts/build.mjs` generates scope-specific `version.json`, HTML build/version metadata and a worker with the same release ID. The ID includes app inputs, the version, worker/helper code and production/preview identity. Each offline asset has a SHA-256 digest of its actual emitted bytes, including the final HTML and theme manifests. Update helper script/style URLs also contain the build ID.

The worker fetches and verifies the full new shell using uncached build URLs before completing installation. Mixed or partially published files fail installation; the preceding active cache remains intact. A waiting worker activates only on an explicit matching-build message from the update page. Recovery files and `version.json` always use the network and never enter the shell cache. Root shell handling does not substitute production HTML for a nested preview URL.

The updater does not unregister the working worker or clear its cache before the replacement is ready. It never deletes IndexedDB or localStorage. Activation removes only obsolete caches in the same worker scope; sibling/nested scopes and unrelated apps remain. Production and preview retain separate metadata, workers, caches, databases and writer locks. Web Locks provides the existing multi-window protection where supported.

## Executed checks

| Suite | Result |
|---|---|
| Domain tests | 125 passed, including metadata/environment validation |
| Backend HTTP tests | 9 passed, stub provider |
| Core Chromium regression | 24 passed, including photos/import/export, responsive layouts, offline use and Pages subdirectory scope |
| New automatic-update browser suite | 13 passed: real foreground polling, notification, dismiss/reconnect, same-version build changes, real failed autosave, pending write flush, one-click newest-version load, already-current refresh, incomplete-release recovery, and production/preview isolation |
| Current-protocol stale-cache recovery | 10 passed |
| Actual archived 0.2.2 → 0.2.3 recovery | 11 passed, preserving workouts, active draft, preferences, body data and private photo bytes |

Results and four actual light/dark phone/desktop prompt screenshots are in `artifacts/app-updates/`; other suite evidence remains under `artifacts/`. The prompt's button hit area is checked above other status toasts. Chromium was executed; Safari/Firefox and physical-device installation were not certified. Main site composition is verified before push and in the existing deployment workflow.
