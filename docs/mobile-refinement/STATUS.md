# Muscle map, schedules and mobile reliability review

Branch: `feature/muscle-map-scheduling-refinement`, from stable main `b2689eb` (0.2.4). No main merge or push is authorized. The exact brief is preserved in BRIEF.md. The user clarified that the version screen must stay visible and say the app is current even with no newer release.

Baseline: 149 domain tests and 9 backend tests passed. The released 0.2.4 update flow was reproduced in Chromium with its actual service worker. Settings → Update app adds `auto=1`; the helper immediately invokes its own update button and navigates back after verifying the already-current build. The observed reading interval was 2,074 ms (see `artifacts/mobile-refinement/update-baseline.json`). This is a confirmed source-level/controlled-browser cause; no physical phone was inspected. Repair the consent boundary rather than adding a delay.

The phantom chest selection has a separate concrete cause: `upgrade-ui.js` initializes `muscle` to `Chest`, conflating initial navigation with explicit selection. The existing figure also uses rectangular regions. Replace it with original anatomical SVG paths while retaining the centralized contribution system.

Schedule baseline: one-time dated entries in `upgrade.schedule`, inferred same-date completion, no recurrence or reminders. Keep existing entries; add rules, occurrence exceptions and explicit completion associations without materializing unbounded future sessions. Notifications will be off by default, permission requests intentional, and closed-app push explicitly unsupported without a backend.

Implementation checkpoint: the new original front/back SVG, null/toggle selection, recurring rules/exceptions, scoped edits, completion associations and active-app reminders are implemented. Domain checks: 167 passed. The new mobile integration suite: 20 checks passed, including actual touch, keyboard focus, schedule editing, native Chromium notification creation/deduplication, offline reload and both themes across 320/375/390/430/768/1024 widths.

A real UI issue found during integration was corrected: reminder dropdowns compared numeric preference values to string option keys, silently selecting a different timing on edit. The values are now normalized, and the browser suite checks individual timing survives all editing scopes. Test-harness corrections separately included waiting for a new document after reload, SVG event dispatch and normal async CDP evaluation. No scenario was skipped.
