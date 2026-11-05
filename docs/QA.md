# Quality assurance — 0.2 preview

Test date: November 5, 2026. Linux, Node 24.22.1, Chromium 155.0.8059.79. All test journals/photos are synthetic and use temporary profiles. The stable `main` baseline is `3c5985f`; the original audit remains in [upgrade/AUDIT.md](upgrade/AUDIT.md).

## Executed checks

| Command / check | Result | Evidence |
|---|---|---|
| `npm test` | 87 passed, 0 failed/skipped | `artifacts/unit-results.txt` |
| `npm run test:backend` | 8 passed | Real localhost HTTP and in-process stub provider; no real LLM |
| `npm run test:e2e` | 24 browser checks passed | `artifacts/browser-results.json` |
| `npm run test:upgrade` | 20 browser checks passed | `artifacts/upgrade-results.json` |
| `npm run test:update` | 10 recovery checks passed | Old cached build, online/offline/locking/data/media/cache scope assertions |
| `npm run build` and `build:preview` | Static relative PWA builds | HTML/manifest environment and worker assets checked |
| Stable + preview composition | Byte-identical stable files | `compose-preview.mjs` hashes every root asset; rejects unsafe candidate inputs |
| Synthetic long history | 1,500 sessions / 22,500 sets / 2.47MB JSON | `artifacts/performance-results.json` |

Browser automation uses native Chromium DevTools because this app has no package dependencies. Interactions use DOM clicks/requestSubmit and actual IndexedDB readback, image download, offline browser networking and screenshots. This is real browser execution, but is not equivalent to physical touch or a complete assistive-technology audit.

## Coverage

Original core checks cover onboarding, generated/manual plans, set/RIR/type/completion/copy, draft reload, partial finish/history edits, deletion undo, custom movement, same-day weight replacement, measurement/photo persistence, canonical unit conversion, native full backup/atomic media restore, verified legacy import/reimport/kg confirmation, analytics/milestones, offline set writes and repository subdirectory workers.

Upgrade checks cover dark/light appearance, exact canonical increment after unit changes, goals, approved missed-session rescheduling, sparse readiness/plates, filters/duplication/advanced plan fields, cleared completion controls and counters, real local PNG output, summary/finish timestamp retention, actual-history local coaching, editable program approval, rejected-action preservation, explicit memory deletion, cloud consent/token non-persistence, SVG map and independent same-origin preview database. All upgraded routes fit 280, 320, 360, 375, 390, 414, 430, 768 and 1440 px; Coach/calendar/map also fit landscape. No uncaught exceptions occurred in successful final flows.

Unit tests include original engine A–L and schema/import cases plus missing data, high-rep progress, matched-load PRs, future records, bounded reductions, conservative load mode, unusual exact plate combinations, advanced prescriptions/superset guidance, catalog completeness, stable legacy identities, true downward body-goal progress, optional-data consent, adversarial notes, memory provenance, stale/unsupported/unsafe proposals, schedule clone isolation, response fact IDs and bounded long conversation.

The updater reproduces a stale cached shell, opens the uncached helper, refuses offline or concurrent-writer replacement, then verifies unchanged history, draft, body/profile/photo metadata, **exact photo bytes**, localStorage and unrelated/nested caches. The updated version appears and the offline worker registers again.

## Performance and visual review

The committed Node benchmark measured validation median 6.55ms (max 13.79), clone median 30.90ms (max 38.13), and structured context median 2.71ms (max 18.73) on 1,500 synthetic sessions. Context was 3,786 bytes in that baseline. The 0.2.1 follow-up measured validation 7.28ms median, clone 32.86ms median and context 2.23ms median (4,425 bytes); updated raw values are in the artifact. CPU results vary by machine and do not measure mobile rendering, IndexedDB latency, startup or huge media backups. State is still cloned/validated/written as a whole on each mutation; additional analytics render lazily.

Screenshots in `artifacts/` show the core flows plus `upgrade-coach`, `upgrade-mobile-coach`, `upgrade-completion`, `upgrade-calendar` and `upgrade-muscle-map`. Desktop/mobile/logger/map/coach screenshots were visually inspected. Charts expose text summaries and recent actual values; SVG regions and controls have labels, keyboard handling and visible focus. Reduced-motion support remains in place. No complete WCAG or screen-reader certification is claimed.

## Failures found and corrected

- Empty workout access when programs already existed; rounded canonical unit increments; stale checked appearance after clearing reps; false high-rep plateaus; rewritten historical finish times.
- Null unit selector in an exercise-rule dialog; SVG interaction assumptions in the browser driver; very narrow numeric input/sidebar containment.
- Catalog expansion initially exposed missing validator identities and a legacy-name precedence risk. Validator IDs now derive from the catalog; verified legacy variants resolve before newly added names. Final unit and full import browser suites were rerun successfully.

Early failed runs are not counted as passes. Only final passing results are committed as evidence.

## Not tested / external prerequisites

No live AI provider or hosted backend was configured; no numerical/language quality certification for a live model. No Safari/iOS/Firefox or physical-device install/vibration/keyboard/screen-reader/200%-text audit, quota exhaustion/eviction, mobile performance profile, huge-photo backup or independent exercise-science validation. Haptic fallback is progressive enhancement. Finite plate quantities, actual sync, encrypted backup and a licensed population strength dataset are not implemented. See [limits](LIMITATIONS.md) and [coach evaluation](upgrade/COACH.md).

GitHub Actions [run 42038654728](https://github.com/Jusumusu/GymBro2.0/actions/runs/42038654728) passed the build/tests/composition and uploaded the 341KB Pages artifact. Its initial deployment attempt was rejected by the environment branch rule. The owner then permitted the branch and successfully reran it at 13:58 UTC, publishing the preview; the stable main ref remains unchanged. The live site host is also outside this executor’s allowed HTTP destinations, so direct HTTP verification was not performed. [Publication steps](upgrade/RELEASE.md).

## 0.2.1 coach quality follow-up

Focused checks after the reported generic routine answer: **95 unit/domain tests, 9 HTTP backend tests and 23 upgrade browser checks passed**. New coverage includes routine review versus replacement, named-program selection, missing evidence, load/rep progress, repeated misses, equipment conflicts, rep/rest/weekly intent, exercise-context resolution, bounded conversation sanitization, retained cloud mode/question/exercise and explicit cloud failure without fallback. Browser and backend cloud paths use stubs; no live provider was configured.

The original blocked deployment was successfully rerun by the owner at 13:58 UTC, publishing the 0.2 preview. The patch stays on improvements and preserves stable main. Core 24-check and updater 10-check suites above were not rerun for this focused coaching patch. Updated screenshots show connection disclosure and offline labels.
