# Exercise bar: stationary glass during horizontal scrolling

The reported glitch was reproduced with real touch input against published preview build `3783d0b16a28`. The glass face was an absolutely positioned child of the horizontal scroller. A 225px swipe moved that face from x=22 to x=-203 while the bar stayed at x=22. Its press animation also expanded its width from 346px to about 350px and compressed its height, adding movement during a scroll gesture.

The actual normal and Focus workout now render a stationary glass frame around the native horizontal rail. The face, optical rim and backdrop remain aligned with the entire visible bar at every scroll position. Labels and the selected pill scroll together. Manual scrolling ends any selection spring; the pill uses a left-edge transform origin to keep width changes aligned. The exercise bar keeps touch lighting but does not scale on press or release. Bottom navigation and timer press/release behavior are preserved.

No workout data, training logic, material values or release boundaries change. These repair checks used an isolated 0.8.0 preview beside unchanged 0.7.0 / `054060a0162f` production. The user subsequently authorized the 0.8.0 release; see `release.json`.

Verified fixed build: `7febcc8a695c`.

- `npm test`: 301 passed.
- `node tests/browser-exercise-bar.mjs`: 8 checks, 16 layouts covering 320/390/430/768px in both themes, Chromium lens and Chrome-iOS UA CSS fallback; actual forward/reverse/end drags, stationary geometry during the gesture, distant auto-follow, pill alignment, manual scroll across redraw, Focus gesture independence, journal retention and accessibility preferences.
- `browser-fluid-glass.mjs`: 10 retained shared-material, native-touch, rest timer, reduced-motion/transparency and offline checks passed.
- `browser-continuity.mjs`: 9 integrated checks and 14 layouts passed, including saved set animations, Focus, Settings and offline retention.
- Actual installed published build `3783d0b16a28` → fixed build: 7 updater/offline checks preserve the entire journal and private photo bytes; production remains separate and unchanged.

The shared-material and Continuity suites ran with their existing source in isolated working directories so their reports do not overwrite the earlier release evidence. Reports and screenshots are in `artifacts/workout-interactions/exercise-bar*`. Reproduce the exact published-build upgrade with:

```sh
npm run build:review
GYMBRO_UPGRADE_FROM_COMMIT=7e3eb30a2b7a71dfa2ead7849960e827af9b6c5d \
GYMBRO_UPGRADE_FROM_BUILD=3783d0b16a28 \
GYMBRO_UPGRADE_ARTIFACTS=artifacts/workout-interactions/exercise-bar-upgrade \
node tests/browser-continuity-upgrade.mjs
```

Browser checks execute Chromium. The Chrome-iOS UA exercises the CSS fallback; it does not certify a physical iPhone or the WebKit engine. The public deployment receipt and current updater link are maintained in PR #6. Release was authorized November 23, 2026; the current release builds and upgrade checks are recorded in `release.json`.
