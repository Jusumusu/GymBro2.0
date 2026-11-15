# Implemented candidate — 0.4.0

The user approved Contour + Prism, its revised charcoal/lavender dark mode and selective glass, then selected **B — Soft square** for set completion. The real application now uses that design on `feature/training-refinement-visual-redesign`. Main merge remains unapproved. Earlier studies are review history, not alternative runtime themes.

## Result

- Central light/dark tokens and components live in `src/design-tokens.css` and `src/design-system.css`. Manrope and DM Sans are self-hosted, licensed, included in the release hashes and cached in the verified offline shell. No external font services or new runtime dependencies are used.
- Workout home uses the approved session ticket, compact weekly rhythm and open movement preview with actual program targets and saved loads. History, empty workouts, weekly check-ins, insights and program management remain available.
- Actual per-set completion uses B: a restrained 31 px square inside the existing 44 px action, filled with a check on completion. Pointer, keyboard, undo, ARIA state, automatic advance and set identities are preserved. The previous-performance column remains present.
- Floating mobile navigation, the exercise jump selector and the real rest timer share the glass material. Fields and information surfaces remain opaque. Reduced-transparency and unsupported-filter fallbacks use solid surfaces. Exercise jumping scrolls only; it does not change any set or plan.
- Programs/library, blocks, Focus Mode, Gains/charts, body history/photos, workout history/summary, calendar/recurrence, goals, muscle map, weekly review, coaching, backup/settings/notifications, dialogs and the standalone update page use the same visual system. Larger chart-axis labels remain readable on phones.
- App name, installed icons, manifest identity, exercise identities and schema are unchanged. Browser chrome colors match each theme. Existing update consent, private-data boundaries and production/preview isolation are retained.

## Training refinements retained

The earlier audit/fixes remain included: optional per-set RIR no longer requires an arbitrary extra ceiling exposure; all relevant working sets must qualify; current block RIR targets, exercise modes and available increments remain respected; warm-up/drop sets and stale historical prescriptions do not veto a legitimate working-set increase. Default failure handling remains conservative and uncertainty is explained. A short optional RIR explanation is available in the real logger. Suggestions do not append sets/exercises or change plans automatically.

## Validation

Synthetic journals only. Executed on the final application rather than the prototypes:

- 231 unit checks and backend boundary checks pass.
- Actual application: screen matrix across both themes at 320, 375, 390, 430, 768, 1024 and 1280 px. Checks include every main route, active logging, dialogs, Focus Mode and large set controls. Screenshots and exact counts are in `artifacts/training-refinement/implementation/results.json`.
- Real pointer completion and keyboard undo, single active set, symmetric frame spacing, read-only exercise jumps, timer adjustment, OS reduced-transparency fallback, backups/blocks/custom-exercise dialogs, offline font loading and full draft preservation pass.
- Existing core suite: 24 browser checks. Advanced training: 21 integration checks, including actual backup encryption/recovery/transaction abort and private photo preservation. Refinement: 12 checks, including historical weeks, themes and calendar preferences. Automatic updater: 14 checks.
- Composed site: 6 checks pass with actual approved main 0.3.0 at root and candidate 0.4.0 under `/preview/`. Production history, settings and unfinished workout remain unchanged after preview imports, edits, updates and offline use. Stable root assets are verified byte-identical.

The earlier headline/theme-color expectations in the regression tests were updated to the approved text/colors; behavioral checks remain intact. Font assets add about 126 KB before transport compression. The 1,500-session/22,500-set Node benchmark is recorded in `artifacts/performance-results.json`; timings are environment-specific and were collected alongside browser work. No physical-device frame-rate or battery certification is claimed. There is no continuous glass animation.

## Review and publication

Actual candidate screenshots are in `artifacts/training-refinement/implementation/`; other integration suites also refresh their synthetic evidence. All code and assets remain on the review branch. Existing GitHub Pages composition can publish the candidate without changing production. Publication must be verified from the real deployment result; the prior github-pages environment restriction is documented in DEPLOYMENT.md. No new URL is claimed solely from a successful build.
