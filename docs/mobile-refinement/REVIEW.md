# Gym Bro 0.2.5 — muscle map, recurring schedules and mobile reliability

All changes are on `feature/muscle-map-scheduling-refinement`, based on approved main `b2689eb0f2b1cec47747180d91ef381191a9d11a` (0.2.4). Nothing is merged into main. The user’s clarification is implemented: Settings → Update app always opens a readable version screen, including when no newer build exists.

[Preview](https://jusumusu.github.io/GymBro2.0/preview/) · [Deployment/PR status](STATUS.md) · [Exact brief](BRIEF.md)

## Mobile update cause and correction

The released 0.2.4 flow was reproduced with its actual cached service worker. Settings added `auto=1` to the helper URL. The helper’s module immediately invoked its own Update button; verification of an already-current build then called `location.replace()` back to the app. The captured interval was 2,074 ms, insufficient to read notes or confirm. This is concrete controlled-browser evidence of the consent/navigation problem, not a claim that a physical iPhone or Android was inspected. See [baseline trace](../../artifacts/mobile-refinement/update-baseline.json).

The repair changes the consent boundary, with no artificial dismissal timer:

- A Settings visit opens a stable version page. Legacy `auto=1` is deliberately ignored, so an old cached client also receives the readable screen.
- The page shows the actual published version, short scrollable release notes, an update action and Later. If the active worker matches, it explicitly says **You’re running the latest version** and offers an intentional refresh.
- Automatic detection remains nonintrusive. The available-update notice contains notes and Later; only its explicit Update Now action carries an install intent to the helper. Downloading or detecting a worker never closes a reading screen.
- Before navigation the app flushes pending writes and blocks on failed saves or invalid set input. The helper uses the existing per-scope writer lock, verifies every offline asset, rechecks the latest build and waits for matching worker activation before returning to Settings.
- The initial status check cannot overwrite installation progress. Repeated button activation is guarded. Interrupted/partial downloads retain the prior complete offline shell and journal, with safe retry.
- Browsers without offline-update support can still open version information and readable notes, with an accurate disabled-install explanation. Offline failures retain the working app and explain reconnection.

`public/release-notes.json` is the maintained release source. The builder requires its version to match `package.json`, incorporates its bytes into the build ID, and publishes bounded text notes in uncached `version.json`. Existing worker digest verification, scoped cleanup, network-only recovery/metadata and explicit activation remain. No indiscriminate cache/storage clearing or forced workout reload is added.

The test command `npm run test:mobile-update` archives/builds the real released 0.2.4 commit from Git history, serves it, installs its actual worker, publishes the candidate and exercises the old-client entry, readable notes, explicit activation, saved draft and already-current screen. It does not merely relabel the newest app. Git history must include `b2689eb`; `MOBILE_UPDATE_BASELINE_DIST` can supply an independently archived build. The preview itself can also be installed from `/preview/` as a separate Home Screen app; its Settings updater remains in that scope.

## Original anatomical map

`src/anatomy.js` contains original proportionate SVG paths drawn for this app, not copied competitor artwork. A Front/Back segmented control displays one figure without stretching. Anterior and posterior muscle shapes are individually focusable and labeled. The posterior trapezius, upper-back and lat shapes resolve to the existing **Back** classification; distinct historical totals are not invented.

The old module initialized selection to `Chest`. Selection now starts at `null`, changes only through explicit activation, toggles off on a second activation and can be cleared. Switching sides or reopening the map clears selection. Training color remains separate from selection; selected paths use a dashed outline, focused paths a different stroke, plus pressed state and textual selection status. A name selector supplies practical alternative touch targets for small regions. Focus returns to the exact selected path after rendering.

The existing centralized primary/secondary/stabilizing contribution system remains authoritative. Squat quadriceps and glute contributions are retained, as are raw historical records and all existing stable exercise IDs. The information card shows recent exercises and direct/estimated contributions, with advanced trends collapsed. Relative weekly shading is not described as measured activation, growth or recovery.

## Recurring schedules

Calendar → Schedule session supports a saved program, start date, optional local time, one-time/weekly/custom weekdays, reminder timing and an optional inclusive end date. Without an end, it repeats until stopped. Rules generate bounded visible occurrences; no unlimited future workouts are inserted into history.

Editing scopes are explicit: this occurrence, this and future, or the entire series. Individual moves/skips/cancellations use exceptions keyed by the original date. Future edits split rule segments but retain their family key, preserving occurrence identities, exceptions and completed associations. Overlapping duplicate rules at the same workout/time are rejected even with different start dates. One-time scheduling and the previous approved-reschedule/remove flows remain available, preserving their metadata and reminder settings.

Starting a scheduled workout associates its exact occurrence ID. Saving keeps actual dates and start/finish times; it completes only that occurrence. Ordinary plan completion links automatically only when a unique matching same-day occurrence exists. Ambiguous matches are not guessed. Legacy one-time completion matching consumes each historical record at most once. Future occurrences and saved history are never marked complete in bulk. Stopping affects future generated entries while completed history remains.

The calendar distinguishes upcoming/completed/missed/skipped/canceled states with text and styling. Compact cells cap visible items and expose full day details; a readable agenda keeps names/times accessible. Missed entries are bounded to the last 90 days. Sunday/Monday preferences change layout, not actual dates or recurrence weekdays.

Dates use calendar arithmetic, not repeated 24-hour millisecond additions. Times follow the device’s local zone. DST-skipped wall times stay on the intended date and have no shifted reminder; repeated fall-back times choose the first occurrence and the delivery ledger prevents a second notification. One-day-before reminders use the prior local calendar day at the same wall time, including 23/25-hour DST days.

## Notifications and supported limits

Settings → Notifications has a persistent **Workout Notifications On/Off** master, default lead timing and permission/availability status. It defaults to Off. Timing choices are at workout time, 15/30/60 minutes before and one local day before. Per-workout preferences survive master toggling. Untimed workouts do not invent a notification time.

When enabled and the app is active, recurrence-aware scans produce in-app reminders. With supported browser permission, the active registration also creates a native browser notification. Permission is requested only through its intentional control; denial does not block in-app functionality or repeatedly prompt. Disabling the master removes controlled visible reminders/notifications and preserves schedules and individual settings.

A persisted bounded delivery ledger prevents duplicate reminders and survives reload/update. Canceled, skipped and completed occurrences are excluded. Edits recalculate future due times. Enabling/reopening does not replay a backlog; due-time grace is bounded and past sessions are not replayed. Background ledger writes preserve Undo without allowing an undo to erase delivery deduplication. Notification clicks target the correct app scope/calendar.

This GitHub Pages app has **no reliable closed-app push scheduling**. Ordinary timers and service workers cannot promise delivery when the app is closed, suspended or throttled. Reliable closed-app delivery would require an authorized backend with subscription storage, a scheduler and push credentials; none was added or purchased. Notification permission itself is origin-wide by browser design. Preview isolates the database, master switch, delivery ledger, worker, notification tags and writer lock, but cannot create a separate OS permission for a path on the same origin.

## Performance evidence

The identified map bottleneck was repeated full-history work and exercise resolution on every selection. Derived weekly/recent facts now use a WeakMap keyed by immutable saved-state identity and date, resolving definitions once; changes to saved data invalidate the cache naturally. Calendar occurrences are grouped by date instead of rescanning recurrence rules for every cell. One anatomical view and bounded library pages render at a time; normal numeric input saves still avoid full-page rendering.

A controlled Node comparison used 1,500 synthetic workouts / 13,500 sets and 14 canonical selections. The recorded median selection batch changed from **125.32 ms to 18.97 ms**. First render including cloning, source size and measurement limits are in [performance.json](../../artifacts/mobile-refinement/performance.json). This measures cloud CPU/string rendering, not phone startup, frame rates or a guaranteed device speedup. Browser navigation-cycle heap observations are recorded separately; they are not long-term leak certification. No new dependencies, fonts, paid services or AI infrastructure were introduced.

## Executed QA and corrections

Baseline: 149 domain and 9 backend tests passed, plus the actual released update-flow reproduction. Candidate results are recorded in the final status and JSON evidence. Suites include domain/schema/recurrence/DST checks; backend boundaries; core and upgraded workflows; prior appearance/calendar behavior; library/active-set regressions; actual 0.2.4 update recovery with private photo bytes; multiple-release automatic updates, failed saves and corrupt downloads; the dedicated stable version screen; actual touch/keyboard/notification APIs; six required widths in both themes; offline use; and production/preview composition with byte-identical root files.

Confirmed corrections include numeric/string reminder option preservation; duplicate recurring-rule detection; preserving reminder timing/unknown fields in legacy rescheduling; retaining Undo during automatic ledger saves; and representing one-time cancellation through an additive flag while retaining legacy stored status values. Controlled tests cover these paths. Test-harness issues were corrected separately: new-document reload synchronization, SVG activation, async CDP serialization and waiting for scheduled focus restoration. Prior tests assuming two simultaneous figures were updated to exercise the new explicit Front/Back control. No scenario was skipped to conceal a failure.

Actual synthetic screenshots and JSON: [artifacts/mobile-refinement](../../artifacts/mobile-refinement). Physical Android Chrome installation, iPhone Safari/Home Screen lifecycle, OS notification presentation/clicks, native keyboards, screen-reader traversal and a full accessibility audit remain unverified. Real Chromium service-worker transitions, viewport/touch emulation, permission states and native notification creation were executed. This is not physical-device certification.

## Data integrity and review boundary

Root schema and IndexedDB version stay **1**. Recurrence rules, exceptions, reminder preferences/delivery records and explicit workout occurrence associations are additive. Existing one-time records and unknown metadata are retained. Canonical one-time cancellation stores the prior-compatible skipped status plus a cancellation flag; early candidate canceled-status records normalize without mutating the imported object. History, plans, records, goals, body data, photos and active workouts are never reset.

Production keeps `gymbro-local`; preview keeps `gymbro-preview-v1`, with distinct locks, worker/cache scopes and notifications. A prior preview journal is preserved; a never-used preview starts empty. Importing a copy of a backup is optional and explicit. Preview changes never synchronize to production. Main stays on 0.2.4 until separate approval; its installed updater does not cross into the experimental preview.

The branch deployment builds current main separately and verifies every production file remains byte-identical while placing the candidate only under `/preview/`. GitHub deployment outcome/URL is checked; the composed layout is exercised locally. The cloud network does not allow a direct fetch of the GitHub Pages hostname, so no separate cloud-to-live HTTP probe is claimed. The owner confirmed the preview deployment worked. Main must not be merged without explicit approval.
