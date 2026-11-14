# Advanced training QA

Executed with synthetic journals and private browser profiles. Final domain tests pass; new and existing browser suites ran against the appropriate production or composed-preview build. Early harness failures caused by using a preview build where a test required production metadata, a missing local main ref and an overly deep mocked DOM return were corrected, then the affected suites passed. Those failed attempts are not counted as passes.

| Executed suite | Result |
| --- | --- |
| Domain/schema/training/encryption tests | 212 passed |
| Backend HTTP, stub provider | 9 passed |
| Integrated advanced-training browser workflows | 21 passed |
| Core browser regression | 24 passed |
| Upgrade/coach/calendar/muscle-map regression | 23 passed |
| Automatic update polling/notification/isolation | 14 passed |
| Actual archived 0.2.5 → 0.3.0 recovery/update | 11 passed |
| Actual 0.2.5 stable version-screen/update behavior | 7 passed |
| Appearance/week-start/weekly-review regression | 12 passed |
| Exercise discovery/active-set/workout UX | 19 passed |
| Anatomy/recurrence/notifications/mobile regression | 22 passed |
| Composed main + isolated preview in an actual browser | 6 passed |
| Actual new screens/dialogs, 2 themes × 6 widths × 10 states | 120 layout checks passed |
| Initial three-concept review, 2 themes × 6 widths × 6 screens | 216 layout checks passed |

The 159 browser workflow checks above are separate from the layout sweeps. Viewports include 320, 375, 390, 430, 768 and 1024px; established suites also inspect larger desktop widths. Existing 280px logging regression passed. No uncaught app exceptions remained in the executed final flows.

## Covered failure and data cases

- Version 1/2 backups, optional excluded photos, complete state round trip, encrypted export/decryption, wrong password, tampered ciphertext, invalid encryption parameters, duplicate/missing/unknown records through runtime validation, a roughly 2 MB encrypted payload, invalid formats and oversized input guards.
- Successful-file evidence versus requested download; writer-close failure cannot advance success time (explicit API stub); read-back verification uses real file input and compares state/photo bytes. Restore replacement preview, cancellation, exact historical record identities, photo-byte retention and atomic preceding-journal recovery are executed. An actual aborted IndexedDB transaction leaves the journal unchanged. Full physical-device quota exhaustion is not simulated or certified.
- Focus numeric entry, canonical units, RIR, real historical performance, set completion, navigation/normal-mode switching, restoration, superset identity/completion and persistent timer deadlines. Existing suites cover autosave/offline/app update retention.
- Block creation, target snapshots, future-week editing, lighter-week defaults, pause/resume/end rules, duplication implementation, adherence counts, schedule preservation and old-journal defaults. Missed sessions are not counted as completions. Block weeks use explicit calendar-day semantics and pause intervals.
- Deterministic goal/muscle prioritization, plan immutability, completed values/notes/RIR, manual skips, stale proposals, reversible deferrals, new completion retention on undo, superset identities and intentional-reduction exclusion from progression failures.
- Feedback creation/edit/history/dismiss/delete paths, correct exercise identity, privacy exclusion from coach context, explicit alternative review, and supported backups. Physical keyboard/screen-reader coverage is not complete.
- Timed/all-day iCalendar, multi-weekday RRULEs, end windows, stable identities, occurrence exceptions including moved dates outside the original window, future-series splits, UTF-8 octet folding, text escaping, CRLF, alarms, IANA timezone validation, DST gaps and ambiguous times. Independent `icalendar 7.3.0` plus `recurring-ical-events` parsed the actual output and expanded 12 expected March occurrences across New York DST, excluding the canceled/moved originals and retaining their moved replacement/reminders.

## Evidence and commands

Final logs, JSON results and actual screenshots are under `artifacts/advanced-training/integrated/`; original three-concept screenshots remain in the parent directory. New scripts: `npm run test:advanced`, `node tests/browser-advanced-visuals.mjs`; domain/backend commands remain `npm test`, `npm run test:backend`. Existing regression scripts remain in package.json. `npm run build:review` uses fetched origin/main and verifies production bytes before adding the candidate preview. The GitHub build repeated domain/backend tests and composition successfully before Pages rejected deployment under environment protection.

`npm run benchmark` measured 1,500 sessions / 22,500 sets: validation median 3.85 ms, clone 16.1 ms, structured coach context 28.43 ms on this cloud Node runtime. The map comparison against actual archived 0.2.5 recorded 41.68 ms first render including clone and 9.56 ms repeated selections. These are synthetic cloud CPU measurements, not phone frame-rate or startup guarantees. No new app dependencies were installed. Python calendar libraries were isolated in ignored work/ for independent QA only.

For reproducible 0.2.5 update testing, archive main df6000d and build it separately; set `UPDATE_BASELINE_DIST` or `MOBILE_UPDATE_BASELINE_DIST` to its dist directory. For the version-screen labels set `MOBILE_UPDATE_BASELINE_VERSION=0.2.5`. The legacy benchmark comparison accepts `MOBILE_BASELINE_SRC` pointing to that archive's src/muscle-map.js.

## Not certified

Physical iPhone/Android installation, Safari/Firefox, actual Apple/Google import, OS alarm delivery, real share-sheet destinations, real file-picker permissions/OS disk failure, device quota extremes, full WCAG/screen-reader traversal and multi-year phone performance. The app labels export estimates, one-way integration, local storage, missing cloud sync and external notification control honestly.
