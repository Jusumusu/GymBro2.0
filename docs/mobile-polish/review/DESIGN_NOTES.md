# Gym Bro — Mobile design review

These are proposals awaiting explicit selection. No concept selection in this gallery changes the app, installs branding, records approval or opens a journal database. The working preview retains the approved Aero identity while independent functional repairs proceed.

The unified gallery is `index.html`. Each standalone interactive study is `screen.html?area=weekly|settings|logo&concept=a&theme=light|dark`. The anatomy area links `../muscle-map/` and its matched front/back comparison sheets.

## Weekly Check-In

All three studies share three explicit fictional weekly records (3/4/4 sessions and 56/66/68 working sets). The opening example is the week of 16–22 November 2026, four recorded sessions, 68 working sets, 18,420 kg of working-set load × reps, and a recorded bench set of 65 kg × 8. The trend consists of six explicit fictional weekly totals. It does not interpolate measurements or imply measured muscle growth. The dates use UTC civil-date arithmetic to avoid time-zone shifts. Week navigation and Sunday/Monday controls are interactive; weeks beyond the example range show a clear empty state.

- **A — Minimal Editorial, recommended:** a quiet 2×2 typographic composition, subtle dividers and a short observation. The statistics feel connected without separate bordered boxes. It needs a little more vertical reading space.
- **B — Unified Summary:** one substantial surface combines session rhythm, session count and three secondary metrics. It gives the most immediate overview; its panel is visually heavier.
- **C — Coaching Review:** the recorded observation leads, followed by a compact statistics strip and a restrained next-week note. More human and contextual; it asks for more reading and depends on factual copy.

The centered date selector has equal 44px navigation columns around a flexible, centered date column. No corrective pixel offsets are used. The design-only chart allows touch and keyboard inspection of its explicit fictional points; the working app’s chart repair is tested separately.

## Mobile Settings

`settings-fixture.json` contains the seven current rendered app groups, captured from a fresh synthetic profile named Alex Morgan. `settings-inventory.json` lists all **44 native controls**, their forms and labels, plus the current actions. No personal export or real user data was used. Appearance, workout/rest/audio/vibration/wake lock, training/profile/units/equipment, notifications, week convention, backup/restore/export, privacy/version/offline tools remain represented.

Every study renders this same full inventory. Category changes and theme switches retain temporary control values. Form saves give explicit example-only feedback. Backup, import, permissions and other tool actions open a review explanation rather than accessing files, device permissions, data or cloud services. Each concept is its own document, so canonical control/form IDs and radio groups cannot collide across studies.

- **A — Clean Grouped:** one continuous page, a compact contents grid and a profile disclosure. The least navigation overhead, with a long page as the tradeoff.
- **B — Refined Categories, recommended:** a clear aligned index of all seven categories plus one focused section. This removes the crowded top row while keeping the Settings structure visible. Switching topics takes a category tap.
- **C — Dedicated Screens:** a compact overview and one category per page-like view, with an explicit back control. The calmest screen, with an additional navigation step.

The Coach style preference is retained in the Settings inventory even while the working Coach route is temporarily placed in development. No stored preference is deleted.

## Five original logo studies

The SVG paths in `logos.js` and `logos/*.svg` were created for this review. They do not reuse third-party logos, equipment clip art or proprietary illustrations. Local Manrope and DM Sans use the app’s existing bundled font licenses. This is visual exploration, not a trademark clearance opinion.

- **A — Openform, recommended:** a connected geometric GB monogram with an ice-blue field. Strong name association, compact outline and continuity with Aero. Quiet rather than overtly sporty.
- **B — Forward wordmark:** a slanted typographic identity with a cut detail and a paired geometric G app icon. Strong full-name readability; the icon uses the initial rather than the full wordmark.
- **C — Steady Ascent:** a warm slate/copper progression symbol with stepped diagonals. A distinctive abstract direction; it needs association with the name before the symbol is familiar.
- **D — Aperture:** a folded vector ribbon/prism that suggests restrained depth and glass-compatible light. A simpler single-color rendition serves tiny sizes; its layered detail is strongest at larger sizes.
- **E — Pace:** a bold performance G with a directional notch. High contrast and a confident stamp-like silhouette; less understated than A.

Each is shown on light and dark surfaces, in the app header, on the workout opening, as a safe-margin app icon, at 48/32/20px and in a launch presentation. No public icon, favicon, manifest or installed-PWA branding is replaced. Platform-controlled icon caching remains relevant after a later approval.

## Anatomy

See the anatomy review’s own documentation for geometry, canonical mappings, trapezius regions and accuracy limits. **C — Athletic Atlas** is the recommended phone-oriented model; the four concepts remain review-only.

## Validation and limits

`tests/browser-mobile-polish-review.mjs` checks actual rendered layouts, native control inventory, in-memory preference persistence, temporary shortlists, week boundaries, date centering, touch/keyboard chart inspection and absence of journal or service-worker access. It captures all eleven Weekly/Settings/logo studies in light and dark mode plus desktop comparisons. Results are in `artifacts/mobile-polish/review/results.json`.

Browser tests execute Chromium and use synthetic data. They do not certify physical iPhone/WebKit rendering or establish aesthetic approval. Final implementation waits for the user’s selections; no main merge is authorized.
