# PWA update control — November 25, 2026

Baseline: released main `234c6f1ef1226b47a032c69897a9a1ad3b6c7873`, production 0.8.0 / `4b0e4c7ae1d1`. No production journal was opened by these tests; all records and photos are synthetic.

## Confirmed paths and repairs

1. **A restored page forced a document reload.** The released `app.js` unconditionally called `location.reload()` on a persisted `pageshow` event. The browser test executes that released handler and observes an actual document navigation without any Update choice. The event itself is dispatched with the standards-defined persisted flag; this does not certify physical WebKit BFCache behavior. The repaired app keeps its document on restoration, repaints deadline-based timer/wake UI and checks release metadata. Persisted `pagehide` retains the writer lock and controllers instead of leaving a frozen page unable to save; real exits still release and clean up. That app lifecycle repair was coordinated with the workout stability work.

2. **A URL was treated as reusable permission.** The old uncached updater called its Update button automatically whenever `?intent=apply` was present. A reload, restored helper or saved URL could repeat the action without a fresh decision. Current app prompts mint an unpredictable, tab-local consent token only after an explicit Update Now action and successful journal flush. The helper removes the URL intent and consumes the token before installation. It checks scope, environment, age (under 60 seconds) and one-time equality. Replayed, expired or legacy flags show the ordinary explicit update button.

3. **The prompt was transient even when the user had not chosen.** Each newer-build check removed and recreated its notice; a metadata response matching the installed build removed it outright. The repaired controller updates the same notice in place and preserves the decision controls/focus. Only Update or Later dismisses the decision. Later suppresses that build for the current document; Settings still offers the update.

4. **Asynchronous work could outlive the intended interaction.** Stopping the controller while registration was pending could still attach listeners and a polling timer afterward. A generation guard prevents that restart. The updater's initial description also now has an interaction generation so a stale description cannot overwrite a subsequent explicit action/error. The latter is a code-path repair; the initial multi-tab harness failures were test readiness mistakes, not evidence of that race. The final browser test verifies that the lock-blocked error remains visible.

The worker already stages and hashes the entire shell, calls `skipWaiting` only on a matching `ACTIVATE_UPDATE` message, and scopes cache cleanup to its own registration. There is no unconditional controller-change reload. These existing protections were retained. No schema, journal/media storage or server infrastructure changes were introduced.

## User-visible behavior

- Detection, polling, focus, online events and persisted restoration can show or update the notice. They do not navigate the document or activate an update through app code.
- Update Now first flushes pending writes. Current clients carry a single-use intent to the helper, then install and return once. A failed save stays in the working app.
- The already-shipped 0.8 client cannot mint the new token. Its old one-click notice link now safely opens the helper with an explicit Update button. This one-time migration confirmation is intentional; subsequent current-client notices retain one-action convenience.
- Settings Update app opens release information and waits for the helper button. Bookmarked legacy flags and expired tokens also wait.
- Another open writer blocks installation with a retry message. Offline or incomplete releases keep the verified old cache and journal. Neither recovery nor retry clears local data.

## Executed targeted checks

`node --test tests/mobile-polish-pwa.test.mjs`: **5 passed**. It covers durable prompt identity/focus, Later across repeated events, explicit consent after save, failed-save navigation blocking, metadata-only visits, registration-stop races and storage denial.

`node tests/browser-mobile-polish-pwa.mjs`: **10 passed** against the actual archived published 0.8 source/worker and current 0.9 source-built fixtures. The same-version B/C variants contain real fixture-only source deltas; no shipped version is fabricated. This suite reproduces the released restoration reload, waits without taking action, chooses Later, explicitly upgrades, preserves every journal field and private photo byte, checks persisted restore/writer ownership, keeps prompt identity/focus across newer metadata, rejects replay/expired intents, verifies separate-window blocking, and reopens offline. Each approved installation produces exactly one return to the app. Results, fixture build identities and the actual navigation counts are in `artifacts/mobile-polish/pwa/results.json`.

The retained `tests/browser-app-updates.mjs` also passed **14 checks** in a separate fixture working directory. It covers enabled reminder/recurrence retention, actual foreground polling (60 seconds), no automatic reload, failed autosave blocking, newest-build selection, explicit already-current refresh, interrupted/incomplete release recovery, separate production/preview workers and writer locks, offline handling, and phone/desktop prompt layouts. Its new reports are under `artifacts/mobile-polish/pwa/retained/`; historical reports were untouched. No existing assertion changes were needed.

All fixture builds are isolated under `work/mobile-polish/pwa/`. The test does not change root `dist`, `review-site` or historical release evidence. Rerun it after final integration to associate its A fixture with the final source build.

## Limits

Chromium executes the worker, cache, IndexedDB, Web Locks and navigation checks. Persisted lifecycle events are dispatched to exercise the app's own handler; a physical iPhone, WebKit's frozen-page eligibility, installed Home Screen lifecycle and Android hardware were unavailable. A browser/OS may reload discarded pages or naturally activate a verified waiting worker after all old clients close; those events are distinct from an application-triggered refresh during a live user's update decision. The new app cannot retroactively remove the forced-restoration handler from an already cached 0.8 document before that document is explicitly updated.
