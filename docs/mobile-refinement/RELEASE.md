# Gym Bro 0.2.5 release

On November 14, 2026 the user approved “merge it to main”. The reviewed source tip is `8633f334c1cae0fd866afd07d638339986bac4a9`, based on the approved 0.2.4 main `b2689eb0f2b1cec47747180d91ef381191a9d11a`. A normal merge preserves every feature commit and the preceding release. The completed development branch is removed after main deployment succeeds, following the established branch workflow.

## Behavior

- Original interactive front/back muscle anatomy, neutral initial selection and separate training/selection states, retaining audited muscle contributions.
- One-time and recurring weekly/custom-weekday schedules, optional end dates, stable occurrence exceptions, explicit edit scopes and exact completion associations.
- Persistent master notification control and per-workout timing, active-app reminders and supported browser notifications after intentional permission. Delivery deduplication survives updates and Undo.
- Settings → Update app opens readable release notes and accurate version information, including when already current. Legacy auto=1 no longer dismisses the screen. Only an explicit install action activates verified files and returns to the app.

The full source diagnosis, artwork behavior, recurrence semantics, tests, screenshots, performance evidence and platform limitations are in [REVIEW.md](REVIEW.md).

## Data and installation

Root schema and IndexedDB version remain 1. Recurring rules, exceptions, preferences, delivery records and workout associations are additive. Existing history, active draft, plans, identities, goals, settings and photo bytes are retained. One-time cancellation uses an additive flag with legacy-compatible stored status values. No reset, global cache deletion, private-data upload or new paid service is introduced.

Production retains `gymbro-local`; preview retains `gymbro-preview-v1`, its writer lock and scoped worker/cache. Publishing main updates both entry points to 0.2.5 without transferring journal records. Existing production installations can open Settings → Update app, read the notes and select Update Now after deployment. The recovery entry is https://jusumusu.github.io/GymBro2.0/update.html?latest=0.2.5 . Older cached clients also get the readable helper instead of automatic dismissal.

The reviewed candidate passed 316 checks. Main-release checks passed: 169 domain, 9 backend, 24 core browser, 22 new-feature browser, 7 stable version-screen and 11 actual 0.2.4 recovery checks (242 total). Both scoped builds and every asset digest were verified. History, draft, settings and photo bytes survived the update. Evidence is in `artifacts/mobile-refinement/release-validation.json`. Publication uses the existing [main Pages workflow](https://github.com/Jusumusu/GymBro2.0/actions/workflows/pages.yml); its run records the actual deployment result.

Reminders require an active app. Reliable closed-app push needs a separate authorized backend, which is not part of this release. Browser notification permission is origin-wide. Physical Android/iPhone installation, actual OS presentation and full accessibility certification remain unverified; real Chromium worker/notification APIs, touch emulation, responsive layouts and offline flows were executed.
