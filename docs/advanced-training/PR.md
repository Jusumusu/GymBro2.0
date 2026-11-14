Gym Bro's local journal now has verifiable file backups and safe recovery, while workouts gain the approved A — Quiet focus interface, multiweek target blocks, reversible time budgets, private exercise memory and calendar-file exports. Existing plans, completed sets/history, recurring occurrences and PWA update semantics are preserved.

- Backups distinguish local persistence, requested downloads and saved/read-back-verified files; optional authenticated encryption and explicit photo selection; confirmed atomic restore/recovery.
- Focus Mode shares the normal draft/autosave/set identities, with actual previous performance, superset switching and optional persistent-deadline rest timing.
- Blocks reuse existing plans/schedules, freeze session targets, support lighter weeks/future edits/pause/resume/end/duplication and report recorded progress.
- Shortening previews deterministic estimates and changes, then temporarily defers remaining sets; completed values/notes and original plans remain intact. Undo and coach shortening share the same mechanism.
- Exercise feedback is private/editable/dismissible, appears in both workout modes, and offers reviewed alternatives without auto-replacing logged work.
- iCalendar uses bounded RRULEs, stable IDs, occurrence exceptions, UTF-8 folding, VTIMEZONE/DST and chosen external reminders; no two-way sync is implied.

Validation: **212 domain + 9 backend + 159 browser workflow checks**, plus **120 final UI layout checks** across both themes and all six requested widths. Independent calendar parsing/expansion passed. Actual archived 0.2.5 update/recovery, photo retention and composed preview isolation were exercised. Details and actual screenshots: [review guide](docs/advanced-training/REVIEW.md), [QA](docs/advanced-training/QA.md), [architecture](docs/advanced-training/ARCHITECTURE.md).

**Preview limitation:** GitHub's build/tests/root-byte verification passed, but Pages deployment rejected this feature branch under the existing github-pages protection rules. Those protections were retained. No live candidate URL is claimed. A tested local preview bundle is included under artifacts/advanced-training/review-preview.zip.

Physical Apple/Google calendar import, mobile OS alerts/share sheets and Safari/Firefox are not certified. File-writer completion/failure uses explicit API stubs; real fallback download, file-input verification/restore and aborted IndexedDB transactions are exercised. No automatic cloud sync/backend, paid service or new runtime dependency is introduced.

**Do not merge:** the user approved design A only. Main remains unchanged; release requires separate explicit merge approval.
