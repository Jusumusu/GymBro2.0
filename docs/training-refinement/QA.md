# Review checkpoint validation

**Historical pre-design checkpoint.** The selected design is now implemented in 0.4.0; see [current implementation and QA](IMPLEMENTATION.md).

Candidate 0.3.1, based on released main 0.3.0 (`636b906`). This checkpoint precedes final aesthetic selection. Tests use synthetic journals only.

- 231 unit checks pass, including 19 new progression cases and integration of the real draft block RIR target. Coverage includes full/partial ceilings, minimum misses, missing/0/1/2/3/5 RIR, explicit targets, contradictory unrelated legacy feedback, extra reps, mixed loads, warm-up/drop sets, skipped work, intentional time adaptations, changed historical targets, increments/modes/readiness and edited history. Advice remains pure; no sets or exercises are appended.
- Actual logger: both themes × 320/375/390/430/768/1024 px. Exactly one active set, no horizontal overflow, symmetric frame insets and vertical spacing. Completion advances; Focus Mode and reload preserve the draft. Explicit Use load preserves completed loads, plan/history and all set identities; manual overrides persist.
- Gallery: 540 layout checks (five directions × two themes × nine screens × six widths), ten desktop captures and all ten palette contrast checks. Set advance, catalog search, favorite toggles and a sample dialog pass. No runtime exceptions, CSP violations, app database, localStorage or service worker registrations. The side-by-side comparison loads all five rendered directions, switches themes/screens and uses a contained swipe rail without phone-page overflow.
- Existing advanced-training integration suite passes: backup encryption/verification/recovery, real transaction abort, Focus Mode/supersets/rest timers, blocks, adaptive workouts, feedback, recurring calendar export and complete backup compatibility.
- Core end-to-end suite passes, including existing original-export merge/deduplication, private photo preservation and analytics. Backend boundary suite passes.

- Composed review site: six browser checks pass. Approved main 0.3.0 remains byte-identical at root; candidate 0.3.1 has separate storage, writer lock and worker scope. Preview imports/edits, offline reload and update-page navigation preserve the production journal and unfinished draft.
- Existing automatic updater: 14 browser checks pass, including reconnection, foreground polling and production/preview data preservation.

GitHub build/validation passed; public deployment was blocked by the github-pages environment branch rule. See `DEPLOYMENT.md` for the exact rejection and owner action. No new public URL is claimed. Local browser checks use Chromium device emulation, not physical iOS/Android hardware. Final-design screen coverage and full accessibility/performance audit follow the user's aesthetic selection.
