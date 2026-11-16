# Released-app visual audit

Baseline: main `f8b5d80d914c8d877d67d4155965be26170bed08`, Gym Bro 0.4.0. New work: `feature/liquid-glass-visual-redesign`. Production and training behavior remain unchanged.

The current light mode has a useful foundation: a real session ticket with a clear start action, a compact weekly rhythm, open exercise rows, inline previous-set context and solid logging fields. The five studies keep that order, the five existing primary destinations, existing icons and installed branding. They propose typography, surface, spacing and control treatments rather than new workflows.

Dark mode's purple cast spans paper, surfaces, secondary text, borders, active fields, navigation glass and muscle heat colors. Changing only the primary accent cannot resolve it. Repeated tinted cards also weaken the distinction between content, active controls, completed work and records. The new studies individually specify paired neutral surfaces, legible secondary text and separate semantic colors.

## Evidence and isolation

`scripts/capture-visual-baseline.mjs` renders the released app against an ephemeral synthetic journal, exports its actual HTML views and closes the disposable browser profile. Baseline screenshots are in `artifacts/liquid-glass/baseline/`. All concepts use the same fictional Alex Example journal: twelve saved sessions, a recent 60 kg × 10 bench set and three planned November sessions. No personal export or photo is used.

The gallery displays those components in isolated shadow roots. It loads only a pure icon/escaping helper from the app. It does not import the application controller, storage, update code or worker. Representative interactions change RAM only. Changes reset on reload. The real production updater and journal are never invoked.

## Reference principles

- [Apple materials](https://developer.apple.com/design/human-interface-guidelines/materials) and [adopting Liquid Glass](https://developer.apple.com/documentation/technologyoverviews/adopting-liquid-glass): reserve translucent material for the functional control layer above content. Translate that principle to bounded CSS backdrop blur; do not claim native Apple rendering.
- [Linear's UI refinement](https://linear.app/now/how-we-redesigned-the-linear-ui): neutral surfaces, deliberate density, alignment and consistent paired themes. Apply those principles while preserving Gym Bro's navigation.
- [Hevy workout tracking](https://www.hevyapp.com/features/track-workouts/): previous performance, readable set fields, recognizable completion and optional rest controls. Preserve the existing information rather than copying an interface.

These are design principles, not copied layouts, artwork or branding. Source pages were reviewed; native iOS apps were not tested. Existing Gym Bro icons are retained. Additional local fonts are licensed under SIL OFL; licenses accompany the gallery.

## Approval boundary

This is the pre-approval package required by Parts 2, 7–9 and 18 of [the user's brief](BRIEF.md). Five coherent light/dark directions and four material levels must be shown before real-app aesthetic implementation. No prior palette or glass approval carries forward. The released app and main remain at the stable baseline; a final design and release need explicit approval.
