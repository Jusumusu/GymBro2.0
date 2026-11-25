# Mobile polish audit — 0.8.0 baseline

The starting point is released main `234c6f1ef1226b47a032c69897a9a1ad3b6c7873`, production 0.8.0 / `4b0e4c7ae1d1`; the released preview is `539371b238f9`. The working tree was clean and the requested new branch did not exist locally or remotely. Work uses `feature/mobile-polish-muscle-map-refresh` only. The complete user request is retained in BRIEF.md.

## Architecture and existing functionality

The app is a dependency-free ES-module PWA. `src/app.js` owns queued state commits and the current route; specialist controllers provide active workout, timer, schedules, library and updates. `src/storage.js`/`environment.js` retain schema-v1 IndexedDB state and private photos. Production and `/preview/` use different database names, writer locks, worker/cache scopes and build metadata. The server is optional; Coach backend/contract tests use a stub provider.

Aero styling layers existing layout CSS, design tokens, design-system rules, liquid glass and the approved A — Continuity treatments. Major routes include normal/Focus workouts, Programs/library/plan editing, Gains, body/history/calendar/goals, Weekly Check-In, muscle map and Settings. The user explicitly requests hiding the visible Coach experience while preserving its data/code. All 44 current Settings controls were captured from a synthetic profile for review comparisons.

## Confirmed issues and repairs

| Area | Observed cause | Current scope |
| --- | --- | --- |
| Chart touch | The real app's chart renderer was static; the existing inspector was only used in an old study. Its descendant capture-transfer cancellation also interrupted native touch dragging. | Reusable inspector now hydrates all real chart callsites, retains exact source points/units and preserves vertical scrolling. See CHART_AUDIT.md. |
| Workout spasm | Full completion rerenders destroyed cards/inputs, replayed main's entrance and changed height above the tap. An appearing Focus rest header caused another large offset. | Saved completion refreshes normal rows in place, anchors visible content once, rejects stale scroll coordinates and coordinates existing Focus transforms. See WORKOUT_AUDIT.md. |
| Unchosen refresh | A persisted-pageshow handler unconditionally reloaded the app. A replayable updater URL also acted as lasting consent. | Restored documents resume; new installs require one-use tab consent or an explicit helper click. Prompts remain stable until a decision. See PWA_AUDIT.md. |
| Gains dividers | The outer bottom border was 2px versus 1px at the top; separate row padding/heights broke the shared divider geometry. | One consistent grid with equal rows, matching outer strokes and shared boundaries, preserving Aero type/colour. Before/after captures are in artifacts/mobile-polish/baseline and layout. |
| Weekly date | Responsive action/date wrapping and native value alignment did not share one centred mobile structure. | A single-column mobile control group and centred native value replace uneven wrapping; calendar math and existing statistics are unchanged. The proposed visual layouts await selection. |
| Coach | The user explicitly set aside the visible unfinished experience. | Existing-style In Development view exposes no unfinished actions. Legacy rendering/controllers and all saved Coach fields remain. |

## Design boundary

The real app retains the current muscle map, installed logo, Weekly statistics treatment and A — Continuity Settings composition. New significant visual directions are isolated studies: three Weekly, four anatomical maps, five logo identities and three Settings approaches. They use matched fictional data; clicking a shortlist is not approval. Original SVGs do not introduce unlicensed artwork or new historical muscle categories. Trapezius already exists under canonical Back in the app; the studies improve its shape/subregions without pretending aggregate Back totals measure separate trap histories.

## Mobile/performance evidence

Actual touch and animation-frame checks target the reported failures. Horizontal chart inspection is frame-coalesced; large-history drawing retains all 50,000 inspection records while reducing SVG circles from 50,000 to 641 and generated markup from about 10.18 MB to 1.76 MB in a local synthetic observation. Workout completion retains mounted cards and inputs rather than reconstructing them. No heavy charting or 3D runtime was added.

Eleven screens were inspected at nine widths in both themes; plan/block dialogs at seven widths; reduced keyboard-height Focus inputs remain hit-testable. The gallery covers seven widths, anatomy eight, and chart readouts eight. Source browser QA uses fresh Chromium profiles and synthetic records; it does not certify physical iPhone/WebKit, Android or installed Home Screen behavior. Root production files remain byte-identical in the composed preview build. No real personal exports or photos are used.
