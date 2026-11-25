# Stable workout completion and existing motion

Released 0.8.0 rebuilt `#app` on every completed set. This discarded all workout cards, inputs and the active row, then replayed the main entrance animation. The completed-exercise label also changed the height above the tapped row. Real frame traces recorded a roughly 27.5–31.5px row displacement when finishing an exercise on a phone. In Focus, appearing auto-rest expanded the shared header by about 78px at 390px or 116px at 320px, adding a separate abrupt shift.

Completion now persists through the same authoritative queue before its visual response. Normal-workout completion and check-all refresh the existing rows, accessible state, exercise status, progress and shared timer in place. A single measured anchor correction accounts for new feedback above a visible tapped row. Existing cards and input nodes survive, and same-route redraws do not replay the main entrance. Other operations keep their existing controllers.

The motion controller rejects coordinates captured before an intervening user scroll. Focus accounts for the measured header-height delta with the existing 260ms transform/easing on the content wrapper while retaining the approved horizontal card transition. Reduced Motion remains immediate. There is no animation-controlled persistence or arbitrary delay in the data path.

The unrelated forced BFCache restore reload was removed in coordination with the PWA repair. Persisted page restoration paints the existing rest deadline and resynchronizes wake-lock/layout state; persisted pagehide does not tear down the document's writer/controllers. An actual permanent exit still cleans up listeners, observers and writer ownership.

## Executed checks

`node tests/browser-mobile-polish-workout.mjs` exercises real trusted touch, animation frames and IndexedDB transactions with synthetic data: 12 checks cover ordinary completion, final exercise sets at three widths, final workout, out-of-order work, supersets, reopened/skipped sets, rapid taps, user scrolling during save, Focus timer/exercise changes, Reduced Motion, reduced-height input hit geometry and offline retention. Only one state write and at most one highlight plane are accepted for a completion. Normal final-set row movement is bounded to 0.5px in the recorded candidate traces, with card/input identity retained. Focus starts at the previous input position and settles through the existing motion duration as the header appears.

The retained Continuity browser suite also passed its nine checks and fourteen layouts in isolated evidence output. Reports, before/after traces and captures are in `artifacts/mobile-polish/workout/`. The optional `GYMBRO_WORKOUT_TEST_ROOT` accepts a built preview root; otherwise the test builds a separate current-source fixture under ignored `work/`.

These are Chromium viewport/touch tests, not physical iPhone/WebKit, Android or soft-keyboard certification. The underlying Aero material and A — Continuity layout remain approved and unchanged; no proposed visual concept is silently applied.
