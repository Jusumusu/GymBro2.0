# Gym Bro 0.5.0 — Aero

The user selected A — Aero on November 17, 2026, reviewed the working GitHub Pages preview and approved merging on November 18. [PR #3](https://github.com/Jusumusu/GymBro2.0/pull/3) preserves the design review, implementation and deployment fix history.

The release applies mineral-blue accents, neutral graphite dark mode, refined light surfaces, Manrope and DM Sans, and balanced glass across the existing app. Logging fields remain opaque. Blue active sets, green completion and separate record/warning/error colors clarify state. Material is limited to navigation, exercise selection, rest controls and dialog chrome, with reduced-transparency, unsupported-filter and reduced-motion fallbacks.

Training, progression, planning, schemas, storage, backups, exercise/set identities and installed icons are unchanged. There is no data migration. The actual 0.4.0-to-0.5.0 upgrade test preserves the complete synthetic journal, active workout, appearance and private photo bytes, then reloads the new shell and fonts offline.

Validation includes 231 domain and 9 backend checks, 178 full-app layouts across seven widths in both themes, the core/training/workout/appearance/update regressions, preview isolation, semantic contrast and a local performance comparison. Detailed evidence and device-verification limits remain in [the implementation report](liquid-glass/IMPLEMENTATION.md).

The main Pages workflow runs `build:site`, publishing 0.5.0 at the [production app](https://jusumusu.github.io/GymBro2.0/) and retaining `/preview/` as a separate journal, writer lock and worker/cache scope. Existing installations use Settings → Update app and explicitly install the verified update; no automatic reload interrupts training. Workouts and photos stay on the device.

The pre-release rollback point is `f8b5d80d914c8d877d67d4155965be26170bed08` / 0.4.0. Production deployment must be confirmed successful before the completed feature branch is removed. The isolated five-concept review gallery remains available as historical design evidence.
