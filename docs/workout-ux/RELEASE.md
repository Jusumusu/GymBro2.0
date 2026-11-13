# Gym Bro 0.2.4 release

On November 13, 2026 the user approved merging the reviewed `fix/workout-ux-muscle-map` tip `11bdb4e76adad037ea76383d5a101ab705b6d9d6` into main, publishing the normal main app and deleting the completed branch. The normal merge preserves the previous 0.2.3 main and every feature commit for review or reversal.

The release adds anatomically classified direct, secondary and stabilizing muscle contributions; a shared searchable exercise browser with recents, favorites and filters; symmetric date controls; compact options retaining all 11 actions; and one persisted active workout set with neutral completed rows. No unrelated redesign, new service or dependency is introduced. The detailed behavior and test evidence are in [REVIEW.md](REVIEW.md).

## Data and updates

Root schema and IndexedDB version remain 1. New browser preferences, draft cursor and skip flags are additive. Raw history, loads, dates, photos, stable exercise identities, imported load conventions and unknown custom metadata are retained. Calculated muscle charts can change because their classifications are corrected.

Production uses `gymbro-local`; preview retains `gymbro-preview-v1`. The main workflow publishes version 0.2.4 at both entry points without transferring records between journals. An existing main installation can now use Settings → Update app to load 0.2.4 after deployment, or accept its update notification. The update verifies the offline shell before activation and does not delete journal storage. The uncached main helper is https://jusumusu.github.io/GymBro2.0/update.html?latest=0.2.4 .

## Validation and publication

The reviewed candidate passed 149 domain tests, 9 backend tests and 107 browser checks. Release checks passed: 149 domain tests, 9 backend tests, 24 core browser checks, 19 workout refinement checks, 11 actual 0.2.3 update-recovery checks and 13 automatic-update checks (225 total). The production-plus-preview build and all emitted asset hashes also passed. Synthetic records are used throughout. Physical Safari/Firefox, native device installation and a complete accessibility certification remain unverified.

Publication uses the existing [main Pages workflow](https://github.com/Jusumusu/GymBro2.0/actions/workflows/pages.yml), with its environment protection retained. Delete only the completed feature branch after confirming the successful main deployment; merged commits and the pinned review download remain available.
