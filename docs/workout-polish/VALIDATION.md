# Executed validation at the visual-review checkpoint

This is a staged branch review, not final all-five-feature acceptance. Final UI integration and 21 specialized tracking entries await the design selection.

| Check | Result |
|---|---|
| `npm test` | **253 passed** |
| `npm run test:backend` | **9 passed** |
| Expanded catalog validator | **198 available / 219 prepared total**, no duplicate names/IDs or invalid mappings; 43 released definitions unchanged |
| Existing core Chromium regression | **24 passed**, including backup/photos/offline and subdirectory handling |
| Existing advanced-training browser regression | **21 passed**; rerun after the atomic timer fix |
| Existing automatic-update browser regression | **14 passed** |
| Existing stale-cache recovery browser regression | **10 passed** |
| New actual-app browser checks | **14 passed**: manual/auto/bulk/superset rest, zero on wake, navigation/refresh, disabled preference, new plan search/favorite/filter, legacy custom equipment/conventions and unchanged history/body data |
| New prototype browser checks | **11 passed**: hover/keyboard/exact values, real CDP horizontal touch, native vertical scroll, editable/undoable set states, timer controls, preserved plan edits and no database/worker |
| Controlled automatic-rest queue regressions | **5 failed before / 5 passed after**, included in the 253 unit tests |
| Actual concept renders | **18 phone screens + desktop review**; paired light/dark |
| Responsive checks | All three prototype plan layouts and actual app library/long-name plan rows at **320, 375, 390, 430, 768, 1024 and 1440px** |
| Search observation | 600 mixed alias searches in about **10 ms total** in local Node; this is not a phone benchmark |

Browser checks total **94** across the six browser suites. Fixtures and temporary browser profiles are synthetic and disposable. Actual history/body-data equality is asserted; no personal journal is bundled. Evidence lives under `artifacts/workout-polish/`, including the original-handler identity check and timer failures before correction.

The actual-app suite preserves the released Aero style. New chart attachment, final Focus green states, final plan layout/dirty-close guard and final timer controls are exercised as prototypes until approved. Specialized logging (seconds, band setup, assistance direction) and final cross-feature acceptance are pending. No claim is made that all requested final flows already ship in the candidate.

Headless Chromium and CDP touch input ran. Physical iOS/Safari/Firefox/phone-lock behavior was not certified. A focus/visibility wake and elapsed clock were simulated in the actual app; the deliberate persisted-pageshow reload remains to protect the storage lock. Managed live Site browser routing is unavailable; native Sites deployment results verify publication, not a live phone session.

Production/preview composition uses the existing verifier: production is built from `origin/main` and compared byte-for-byte; candidate assets are served under `/preview/` with preview environment metadata, namespace and lock. Publication records are in STATUS.md. Main remains at the released SHA and is not merged automatically.
