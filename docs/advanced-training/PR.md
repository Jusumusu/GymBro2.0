Gym Bro's local journal now has verifiable file backups and safe recovery, while workouts gain the approved A — Quiet focus interface, multiweek target blocks, reversible time budgets, private exercise memory and calendar-file exports. Existing plans, completed sets/history, recurring occurrences and PWA update semantics are preserved.

- Backups distinguish local persistence, requested downloads and saved/read-back-verified files; optional authenticated encryption and explicit photo selection; confirmed atomic restore/recovery.
- Focus Mode shares the normal draft/autosave/set identities, with actual previous performance, superset switching and optional persistent-deadline rest timing.
- Blocks reuse existing plans/schedules, freeze session targets, support lighter weeks/future edits/pause/resume/end/duplication and report recorded progress.
- Shortening previews deterministic estimates and changes, then temporarily defers remaining sets; completed values/notes and original plans remain intact. Undo and coach shortening share the same mechanism.
- Exercise feedback is private/editable/dismissible, appears in both workout modes, and offers reviewed alternatives without auto-replacing logged work.
- iCalendar uses bounded RRULEs, stable IDs, occurrence exceptions, UTF-8 folding, VTIMEZONE/DST and chosen external reminders; no two-way sync is implied.

Validation: **212 domain + 9 backend + 159 browser workflow checks**, plus **120 final UI layout checks** across both themes and all six requested widths. Independent calendar parsing/expansion passed. Actual archived 0.2.5 update/recovery, photo retention and composed preview isolation were exercised. Details and actual screenshots: [review guide](docs/advanced-training/REVIEW.md), [QA](docs/advanced-training/QA.md), [architecture](docs/advanced-training/ARCHITECTURE.md).

**Published release:** https://jusumusu.github.io/GymBro2.0/ . PR #1 merged normally after the user explicitly requested “Merge to main”. GitHub Actions run 43698445481 passed build/tests and production deployment. The preview remains available at https://jusumusu.github.io/GymBro2.0/preview/ with a separate journal. Direct fetching of the Pages host is blocked from this execution network; native deployment logs verify publication.

Physical Apple/Google calendar import, mobile OS alerts/share sheets and Safari/Firefox are not certified. File-writer completion/failure uses explicit API stubs; real fallback download, file-input verification/restore and aborted IndexedDB transactions are exercised. No automatic cloud sync/backend, paid service or new runtime dependency is introduced.

**Released:** user approval, normal merge and main deployment are complete. Full source history and data safeguards are retained. The completed feature branch is removed after successful publication.
