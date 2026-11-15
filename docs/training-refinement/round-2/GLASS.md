# Contour + Prism — Glass refinement

The user approved the combined design and its revised dark mode, then paused app-wide styling to ask for a liquid-glass treatment like Apple's. This is the concrete glass review requested before resuming implementation. Direction I remains the approved solid reference; direction J adds the proposed material.

## Where glass belongs

- Floating navigation: translucent fill, background blur/saturation, a luminous rim, soft depth and a selected capsule. The page genuinely scrolls behind the dock.
- Exercise selector: a glass segment that can remain visible while scrolling the active session.
- Rest timer: a floating glass panel, with working sample adjustment and close controls.

The session card, working-set fields, active-row contrast, recommendation text and charts stay on solid surfaces. Light retains warm accents; dark retains the approved neutral charcoal/plum/lavender palette. The existing logo and installed icon are unchanged. The effect has no continuous animation or pointer tracking.

This is a web material inspired by Liquid Glass, implemented with translucent CSS surfaces, backdrop filters and edge lighting. It does not claim to use Apple's native UI framework or reproduce native optical refraction exactly.

## Set completion refinement

The user also dislikes the repeated Log buttons and requests a cleaner, more modern treatment. Three real variants are provided in `completion.html`, rendered from the actual prototype rows in light and dark:

- **A — Quiet circle (recommended/default):** a 27 px visual ring inside a 44 px target. The unfinished ring is empty; completion fills it and reveals a check.
- **B — Soft square:** a restrained square that fills on completion, using the same target and interaction.
- **C — Inline check:** an open check, framed and emphasized when complete.

All retain one-tap completion and undo, accessible action labels, `aria-pressed`, keyboard focus and the original set identities. No swipe or long press is introduced. The prototype’s Done column makes the action explicit. Circle is used in the new full-screen previews, pending the user's preference.

## Prototype

`index.html?direction=J` opens the interactive glass version. `glass.html` compares both themes for each of the six existing review screens. The Material control offers Glass and Reduce transparency; an OS reduced-transparency preference and unsupported-backdrop-filter fallback also use a readable solid material. Rest time is explicitly a fictional sample, kept in memory only.

The actual app is still awaiting this material review; the preceding approval of the solid hybrid is retained. No training or storage code changed during this study. Main remains unchanged and no merge is authorized.

## Validation

`npm run test:design-glass` passes 84 responsive checks across six screens, two themes and seven widths/formats. It checks local font loading, base text/button/hero contrast, one active row, 44 px logging buttons, valid completion and invalid-entry rejection, exercise search and favorites. Material checks confirm actual translucent blur, opaque inputs, an unobstructed current Log action, a working sample timer, manual and OS reduced-transparency fallbacks, correct direct-link preference state, and completion/undo in all three 44 px control variants. No runtime exceptions, CSP violations, app database, localStorage or service worker registrations were observed.

Screenshots start with `J-` in `artifacts/training-refinement/round-2/`; `board-glass-workout.png` and `board-glass-active.png` compare both themes. `board-completion-light.png` and `board-completion-dark.png` compare the three completion controls. The focused contrast checks do not certify every possible scrolling backdrop or physical browser. Actual-device and full-app checks follow implementation. Public Pages publication remains subject to the repository's existing environment branch rule.
