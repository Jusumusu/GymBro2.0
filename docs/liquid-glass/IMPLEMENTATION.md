# Approved Aero implementation

The user selected **A** on November 17, 2026, approving Aero with the recommended balanced glass, and explicitly approved merging on November 18 after reviewing the working preview. Implementation was developed on `feature/liquid-glass-visual-redesign`; [the 0.5.0 release notes](../RELEASE_0.5.0.md) describe the approved production release.

## Applied system

The palette is taken from A's reviewed tokens: refined white/mineral-blue light mode and neutral graphite/soft-blue dark mode, with Manrope headings/body and DM Sans numerals. Content and fields remain solid. Completed sets use green/checks, the active set uses blue and a rail/border, and records, warnings and errors have distinct semantic colors. The existing session ticket, weekly rhythm, open movement rows, input order and completion target remain.

Balanced material uses 80% fill, 16px blur, restrained saturation and an edge highlight. It is limited to navigation, exercise selection, rest controls and dialog chrome. Unsupported filtering and reduced transparency use opaque surfaces. Reduced motion remains respected. Desktop retains the reviewed control rail, with the existing profile/privacy information accessible.

The updater, synchronous appearance initialization, browser theme color and paired PWA manifests use the same palette. Installed icons, application identity and preference keys are preserved. Version 0.5.0 identifies this candidate. No storage schema, workout/progression calculation or provider/backend behavior is changed; the app controller's only visible edit is the approved “Gains” navigation label.

## Verification

Actual browser evidence is collected in `artifacts/liquid-glass/implementation/`. Historical gallery-only verification remains in `REVIEW.md` and `DEPLOYMENT.md`.

| Check | Executed result |
| --- | --- |
| Domain / backend | 231 / 9 passed |
| Full app appearance | 178 route/layout checks across 320, 375, 390, 430, 768, 1024 and 1280, both themes; real pointer completion, keyboard undo, aligned columns, rest, Focus, dialogs, offline fonts/data and updater |
| Core browser | 24 passed, including backup/import and photos |
| Advanced training | 21 integrated cases passed |
| Progression / current-set layout | 12 actual layouts and training interactions passed |
| Workout UX | 19 passed |
| Appearance / weekly review | 12 passed, including pre-paint theme, system preference, seven widths, empty states, dialogs and offline use |
| Automatic updates | 14 passed |
| Stale-cache recovery | 10 passed |
| Actual 0.4.0 → 0.5.0 upgrade | 6 passed; complete journal, unfinished workout, appearance, unrelated preference and private photo bytes survived exactly; new shell/fonts/data reload offline |
| Composed production/preview isolation | 6 passed; stable production root byte-identical; separate preview journal, writer lock, worker and cache verified |
| Semantic color contrast | 26 actual light/dark pairs; minimum 5.19:1 |
| Preview chrome | Onboarding label and unobscured exercise/desktop navigation at seven widths; no production database opened |

The previous logger header inset was corrected to align labels and numeric fields with Aero's reviewed 2px horizontal row padding. Symmetric insets, one active set, opaque inputs and the 44px completion target remain checked. The “Gains” label and displayed 0.5.0 version are the only app-controller edits. Training, planning, schema, storage and backup modules are byte-unchanged from stable main.

Regression suites run against separate copied builds and collect new evidence without overwriting earlier release artifacts. Update tests intentionally stamp releases, so their build directories must never be shared via symlinks.

## Performance observations

The actual released build and Aero use the same twelve-session fictional journal and active logger in local headless Chromium at 390×900.

| Observation | 0.4.0 | Aero 0.5.0 |
| --- | --- | --- |
| Warm logger ready, median of five | 150.8 ms | 111.8 ms |
| Input handler including layout, P95 of twenty | 0.9 ms | 1 ms |
| Theme switch including layout, P95 of twenty | 4.1 ms | 4.3 ms |
| Scrolling frame interval, P95 of fifty-nine intervals | 16.7 ms | 16.7 ms |
| Source CSS | 104,326 bytes | 110,152 bytes |
| Source JavaScript | 377,015 bytes | 377,012 bytes |

The active logger retains two visible material layers; blur decreases from 22px to 16px. No font, framework or runtime dependency was added. This run shows no material responsiveness regression. It does not certify physical iPhone/Safari, installed PWA behavior, memory use or battery life. Those device-specific observations remain a verification limit, rather than a claimed result.

The five-direction gallery is retained for reference. The actual app is packaged at `/preview/` on its separate review origin, using the existing preview database/lock namespace and its own worker/cache scope. Production records are never opened there. The implementation review page is `aero.html`; deployment status is recorded in `DEPLOYMENT.md`.

The pre-release rollback point is `f8b5d80d914c8d877d67d4155965be26170bed08` / 0.4.0. No data migration is introduced. PR #3 retains the review and implementation history through a normal merge. Design review and release approval are complete; the main deployment is verified before handoff, then the completed feature branch is removed.
