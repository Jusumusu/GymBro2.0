# Advanced training — audit and technical boundary

Base: released main df6000d (0.2.5). The initial workspace was 0.2.3; the feature branch was fast-forwarded to fetched main before implementation. No main branch was modified. This supersedes initial observations about individual-only schedules: the actual release already has authoritative recurring rules, occurrence exceptions and active-set/superset selection.

## Existing contracts to preserve

Native ES modules, no npm dependencies. IndexedDB v1 has state and media stores; root journal schema and upgrade extension are v1. `migrateState` provides additive defaults. `validateState` validates imports and writes. Save/restore transactions and writer locks protect active sessions. Active set identity is centralized in `active-workout.js`. Recurrence is centralized in `recurrence.js`: series families, future segments, original occurrence dates, exceptions and explicit completion associations. `notifications.enabled` is the master control. Photo bytes live separately from metadata. Existing backups are version 1 JSON; whole-state replacement is confirmed, and a legacy merge parser is separate.

Production uses gymbro-local; preview uses gymbro-preview-v1 with separate lock, worker scope and caches. Preserve the verified offline-shell/update handshake. Never solve migration by clearing storage. A branch alone does not isolate a browser journal.

## Design gate

Three coherent directions cover all six screens: Quiet focus, Performance desk and Guided flow. The interactive conversation fragment is mirrored under docs/advanced-training for provenance. These are synthetic, isolated design studies with no storage, notifications, network calls or service worker. No direction is selected. Do not wire or finalize new app UI until selection. Permanent rule recorded in AGENTS.md.

## Technical foundations implemented before approval

- `backup-crypto.js`: password-protected portable envelope v1, PBKDF2-SHA256 (600,000 iterations), random 16-byte salt, AES-256-GCM with random 12-byte IV and authenticated format parameters. Encrypts the entire backup including metadata; does not retain passwords. Strict input/size bounds and generic authentication errors. Wraps existing lossless backup JSON instead of changing old files. UI must explain password loss and offer explicit photo inclusion. A clicked download is not evidence of a completed save; use File System Access close success where available, otherwise label requested export separately and offer read-back verification.
- `time-adaptive.js`: deterministic pure proposal, stale-source guard, explicit application and reversible set deferral. Completed sets and all entries/notes stay present. Muscle priorities outrank compound defaults; estimated remaining time includes rest, transitions and warm-ups. Superset rest is deliberately conservatively counted per exercise, so estimates can overstate time. Never promise an exact finish. UI integration must flush edits before proposing/applying and must exclude intentional reduction from failure/plateau heuristics. These functions are not yet invoked by the app.
- `focus-timer.js`: serializable epoch deadline, derived remaining time and bounded adjustments. No background interval dependency; app integration must remain opt-in and use existing autosave/active set ownership.

## Remaining implementation after design selection

1. Add validated additive advanced extension v1: backup evidence/reminder settings, block definitions and exercise feedback. Old journals retain every field. Test backups with new records and older shapes. Atomic recovery snapshot must contain preceding state plus private media bytes, be bounded/replaceable and restore only after confirmation. Verify state after restore. Explicit selected-photo exports must remove excluded photo metadata from the exported clone only.
2. Focus presentation must use the SAME draft and activeSet/reconcileActiveSet/selectActiveSet helpers as normal mode; persist navigation/timer without regenerating entries. Reuse actual historical exposure and recommendation logic. Superset identity remains per exercise/set.
3. Blocks reference existing plan and series identities; do not materialize a parallel schedule. Define elapsed calendar weeks using explicit start date and pause intervals, never completed-session counts. Freeze prescription snapshots on drafts, completed sessions and intentional time changes. Pause/resume affects future targets; missed sessions do not increment a session counter. Future edits must not affect earlier snapshots. Lower-stress weeks are optional, not automatic load increases.
4. Store feedback with immutable exercise ID, session ID, timestamp, category, text and dismissed flag. Edit/delete explicitly; surface one recent relevant note. Rank alternatives using audited catalog/mappings; require review before changes. No external transmission.
5. iCalendar adapter must consume authoritative recurrence families and exceptions, including moved/canceled dates, future splits and stable UIDs. Existing scheduling is DEVICE LOCAL, not pinned to a named zone. UI must explicitly capture the export time zone; timed events require VTIMEZONE for standards compliance and DST testing, all-day events use DATE. Fold UTF-8 lines at 75 octets, escape text, use CRLF and VALARM. Do not claim two-way sync/dedup or Apple/Google device compatibility from format tests alone.
6. Backup reminders are optional, rate-limited, based on verified evidence, and respect notifications.enabled. Browser-local persistence is never a backup. Cloud sync remains future work requiring an optional authenticated backend, authorization, conflict handling and private encrypted blob storage; static Pages alone cannot sync.

## Publication

The existing preview workflow has historical GitHub environment restrictions. Do not weaken protections. Source pushes appear possible, but `gh auth status` reports an invalid GH_TOKEN, so no PR or deployment is claimed. A working local build and design review are independent of GitHub publication. The actual feature preview must preserve current main root byte-for-byte using compose-preview and remain visibly isolated.
