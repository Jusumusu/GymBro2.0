# Advanced training — initial design approval checkpoint

Branch: `feature/advanced-training-experience`, based on remote main `df6000d`. Source push succeeded; main's remote SHA was rechecked unchanged. No merge, production deployment, data migration, new cloud account, paid service or live app UI change was performed.

The complete six-feature update is NOT finished. This checkpoint presents the concrete alternatives required by the user's initial design approval rule. No option has been chosen. Review `DESIGN_REVIEW.md` and the conversation prototype: each concept offers all six screens, light/dark/system appearance and synthetic examples. Pending selection, only isolated design studies and nonvisual foundations have been implemented.

## Work performed

- Audited current release, recurrence, active-set logic, storage, backups, worker/update protocol and preview deployment boundaries. Preserved the full user brief and permanent visual approval rule.
- Created and pushed the dedicated branch, preserving main and all preceding release history.
- Implemented independently tested portable encryption/decryption, pure workout-shortening proposals/application/undo, and timestamp-based rest deadlines. No existing screens call these modules yet. No user data was loaded, migrated or transmitted.
- Produced 36 actual Chromium screenshots of 3 concepts × 2 themes × 6 features, with 216 responsive layout checks. The conversation prototype makes the alternatives reviewable without installing or sharing a journal.

## Executed checks

| Check | Actual result |
| --- | --- |
| Baseline domain suite on current main | 169 passed |
| Domain suite including 15 new tests | 184 passed |
| Existing backend HTTP suite (stub provider) | 9 passed |
| Preview PWA build | Passed, isolated environment metadata |
| Prototype layout: A/B/C, light/dark, six features, six widths | 216 passed |
| Prototype action/timer toggles | Passed; explicitly prototype-only |
| Prototype storage isolation | No IndexedDB databases or localStorage created |
| Browser native Web Crypto | Encrypt/decrypt passed, wrong-password rejection passed, private plaintext hidden |
| Browser runtime errors | None |
| Git whitespace checks | Passed |

Tests include tampered ciphertext, invalid envelope/KDF parameters, fresh salt/IV, password bounds, a roughly 2 MB encrypted payload, native backup parse after decryption, determinism, completed set/value/RIR/note preservation, manual skips, stale preview rejection, undo retaining newly completed work, muscle-priority isolation retention, superset identity and suspended timer recovery. Evidence: `artifacts/advanced-training/design-results.json`; screenshots alongside it. Re-run using `npm test`, `npm run test:backend`, `npm run build:preview`, and `node tests/browser-advanced-design.mjs` (Chromium installed).

## Explicitly pending

- User's design selection and final UI integration for all six features.
- Validated persisted block/feedback/backup settings, atomic recovery snapshots, evidence-based backup status/reminders, explicit photo selection and full restore QA.
- Focus integration and autosave, active-session shortened-workout/progression integration, training block lifecycle and feedback memory/alternatives.
- Standards-compliant iCalendar recurrence/timezone adapter and platform import testing.
- Full app regression, offline/update/migration QA against the final integrated build and physical-device testing where available.
- Verified phone-accessible candidate deployment. No hosted preview URL is claimed. Existing GitHub environment protections remain intact; previous feature deployments were restricted. Git push works, while GitHub CLI token validation fails. The PR is deferred until the requested implementation is complete, as the brief specifies.

Next approval: choose Quiet focus, Performance desk, Guided flow, or a stated combination. This is design approval only; main still requires separate explicit merge approval after implementation and review.
