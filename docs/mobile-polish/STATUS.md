# 0.9.0 — Approved mobile designs integrated

The user selected **Weekly B · Anatomy C · Identity D · Settings B** on November 25, 2026. All four are now integrated in the real app on `feature/mobile-polish-muscle-map-refresh` / PR #7. Approval is recorded in `approval.json`. The user subsequently authorized “merge to main” for this scope. The preceding release is 0.8.0 (`234c6f1`); release checks/build identities are in `release.json` and the exact production publication receipt is maintained in PR #7.

- Weekly B uses one unified performance summary with the real frequency target, daily saved-session rhythm, working-set workload and record events. Its six-week workload chart uses live touch inspection. The existing schedule-versus-frequency distinction, body context, goals, wins, historical cutoff, units and method details remain.
- Anatomy C uses the exact original Athletic Atlas scaffold and 24 front/24 back regions. Actual analytics own training fills; selection remains a separate outline. Upper/middle/lower trapezius retain canonical Back, with no invented separate historical totals. All fourteen groups, name/keyboard controls, recent exercises and trends remain.
- Identity D supplies the approved Aperture paths for the header, onboarding, favicon, touch icon and themed PWA assets. Existing app IDs/scopes are unchanged. The generated light/dark 192/512px PNGs have transparent safe margins; system/manual theme changes update the displayed asset paths. Installed icon refresh timing remains platform-controlled.
- Settings B supplies seven aligned categories and one visible retained panel. All 44 existing controls and their controllers remain. Category selection writes no journal data; temporary form edits, canonical unit metadata and exclusions survive navigation and unrelated redraws.

The independent technical repairs remain: continuous exact-point chart dragging, stable persisted set completion, controlled updates, structural Gains/date alignment and the Coach In Development placeholder without data deletion. The current implementation landing page is `implementation/`, with eight actual app captures; `review/` and `muscle-map/` retain the original proposals as historical comparison.

Verification and exact build identities are in `verification.json`; original pre-approval evidence is preserved in `technical-verification.json`. The current publication receipt and URL are maintained in PR #7. Domain-specific details are in WEEKLY_IMPLEMENTATION.md, ATLAS_IMPLEMENTATION.md, IDENTITY_IMPLEMENTATION.md and SETTINGS_IMPLEMENTATION.md.

Reproduce the current app checks with:

```sh
npm test
npm run test:backend
npm run build:review
node tests/capture-mobile-polish-applied.mjs
node tests/browser-mobile-polish-approved-upgrade.mjs
MOBILE_POLISH_WEEKLY_ROOT=review-site/preview node tests/browser-mobile-polish-weekly-design.mjs
GYMBRO_SETTINGS_TEST_ROOT=review-site/preview node tests/browser-mobile-polish-settings-design.mjs
node tests/browser-mobile-polish-atlas.mjs
```

The pre-release composed preview verified byte-identical 0.8 production. The final dual-scope release check (`npm run build:site && node tests/browser-mobile-polish-release.mjs`) verifies the exact published 0.8 production and 0.9 preview updates independently, including complete journals, active workouts, private photo bytes, offline reopening and preview-only documentation links. Database, lock, worker and cache scopes stay separate. Synthetic fixtures only were used. Browser QA executes Chromium and includes touch, keyboard and reduced-height viewport simulation; physical iPhone/WebKit, Android and installed Home Screen behavior remain unverified. Source screenshots and native publication receipts are distinct from managed live-Site browser QA, which is unavailable in this environment. No record reset, exercise-ID rename, paid service or unrelated feature is introduced. The approved scope is authorized for release to main.
