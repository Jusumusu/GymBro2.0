# 0.9.0 development preview — technical repairs and visual review

Main remains the approved 0.8.0 release (`234c6f1`). This update stays on `feature/mobile-polish-muscle-map-refresh`; no main merge or final new visual direction is authorized. The user brief is BRIEF.md. Audit/root causes, domain-specific evidence and reproducible tests are documented in AUDIT.md, CHART_AUDIT.md, WORKOUT_AUDIT.md and PWA_AUDIT.md.

The actual preview integrates chart touch inspection, stable set completion, consent-controlled updates, structural Gains/date alignment and an existing-style Coach In Development placeholder. Existing workout history, active values, photos, Coach data and all Settings controls are preserved. The new logo, anatomy and substantial Weekly/Settings proposals remain outside the real app until selected.

The unified review is `review/`. It includes paired light/dark live studies, actual phone captures in the repository and fair fictional fixtures. The four original front/back SVG anatomy studies are in `muscle-map/`. Recommendations:

| Area | Recommended | Alternatives |
| --- | --- | --- |
| Weekly Check-In | A — Minimal Editorial | B Unified Summary; C Coaching Review |
| Muscle map | C — Athletic Atlas | A Essential Anatomy; B Clinical Detail; D Sculpted Form |
| Logo | A — Openform | B Forward Wordmark; C Steady Ascent; D Aperture; E Pace |
| Settings | B — Refined Categories | A Clean Grouped; C Dedicated Screens |

The gallery explains tradeoffs, supports temporary comparisons and records no approval. All 44 current Settings controls appear in each Settings study, using in-memory example state. No review page opens a journal database or installs a worker. Logo assets remain original SVG concepts, not replacements for installed icons. Trapezius shapes retain canonical Back grouping, and an aggregated Back total is not presented as a separate trap measurement.

Executed tests, exact candidate build IDs and publication receipts are tracked in verification.json and the draft PR. Common commands:

```sh
npm test
npm run test:backend
npm run build:review
node tests/browser-mobile-polish-layout.mjs
node tests/browser-mobile-polish-charts.mjs
node tests/browser-mobile-polish-workout.mjs
node tests/browser-mobile-polish-pwa.mjs
node tests/browser-mobile-polish-review.mjs
node tests/browser-mobile-polish-muscle-review.mjs
node scripts/test-mobile-polish-regressions.mjs
```

`build:review` composes unchanged released production with an isolated candidate under `/preview/`. The normal repository server and Chromium harness verify source interactions. Publication is verified by native deployment receipts; no managed live-Site browser tool or physical mobile devices are available in this environment. Wake-lock lifecycle checks use the existing injected double. Device background audio, platform-controlled icon caching, installed PWA restarts and operating-system gestures are not universally guaranteed.

The remaining visual implementation is intentionally awaiting the user's per-area selections. No unselected design, exercise identity rename, data reset, paid service, unrelated feature or main merge is introduced.
