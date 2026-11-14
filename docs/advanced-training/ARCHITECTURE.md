# Advanced training architecture — 0.3.0 candidate

Base: approved main `df6000d` (0.2.5). Work remains on `feature/advanced-training-experience`; main is unchanged. The initial checkout was older and was fast-forwarded to fetched main before implementation. The user selected **A — Quiet focus** after reviewing three alternatives.

## Storage and compatibility

Root journal schema and IndexedDB version remain 1. Production retains `gymbro-local`, preview retains `gymbro-preview-v1`, and their writer locks, worker scopes and cache namespaces remain separate. No localStorage/IndexedDB reset, provider account, paid service, runtime dependency or automatic user-data upload is introduced.

`upgrade.advanced` is an additive, validated extension v1. It contains backup evidence/reminder preferences, block definitions and private exercise feedback. Existing upgrade settings, recurring rules, occurrence exceptions, goals, photo metadata and notification ledger retain their authoritative locations. Old journals receive defaults in memory and on the next normal save; imports do not silently migrate unsupported versions.

Drafts may retain focus selection, a rest deadline, a block target snapshot and intentional time-adaptation metadata. Completed sessions retain target/adaptation snapshots, while transient focus/timer fields are removed. `validateAdvancedSession` validates new optional fields during save/import. Feedback and block identities are validated for duplicates; exercise notes reference known exercise identities. New UI interpolations escape untrusted text and identities.

## Backups and evidence

Plain backups use format `gymbro-backup`, version 2. Version 1 continues to parse explicitly. The complete state includes supported old and new user records. Photos require explicit selection in the export UI; when excluded, photo metadata is removed from an exported clone, never the journal. Missing media or an export beyond the supported 100 MB restore limit stops the export. CSV remains available using canonical kilograms.

Optional password protection wraps the entire JSON payload and metadata in an encrypted-envelope v1: PBKDF2-SHA256 with 600,000 iterations, random 16-byte salt, AES-256-GCM with random 12-byte IV, 128-bit tag and authenticated format parameters. Passwords are used only for the operation and never persisted. Wrong passwords/tampering fail authentication; invalid parameters and oversized inputs are rejected before expensive work. Password loss is unrecoverable. Cloud sync is not implemented or claimed.

A File System Access writer records success only after `close()` succeeds. Cancellation, permission failure and interrupted writes do not advance the successful-backup timestamp. Download fallback records only a requested download. Read-back verification checks schema, supported media, current journal equivalence, actual photo bytes, export timestamp and optional decryption before recording evidence. Excluded photos remain clearly labeled. Last-success time represents the backed-up snapshot, not subsequent edits. Reminders are optional, notification-gated and rate-limited to no more than one per seven days; requested downloads do not suppress overdue successful-backup reminders.

Native and legacy restore retain their respective full-replacement/explicit merge previews and confirmations. Restore operations share the journal write queue with autosaves. An IndexedDB transaction captures the preceding state and its photo blobs under `restore-recovery` before writing replacement state/media. An abort keeps the preceding journal intact. The result is read back and compared. Recovery itself requires confirmation, preserves a new preceding snapshot, and verifies its result. One preceding snapshot is retained; recovery data is local, not an external backup. Existing unreferenced media is not destructively purged during restore.

## Focus Mode and timers

Focus is a presentation of the SAME draft and set identities as normal mode. It reuses the numeric autosave handler, canonical load conversion, completion action and authoritative active-set selector. Set chips review previous/completed sets; exercise navigation, skip, full workout and exit preserve data. Historical performance comes from recorded exposures; current guidance uses existing progression logic. Superset buttons retain independent entries and counts.

Optional rest state is an epoch deadline, not a decrementing counter. A repaint interval never determines elapsed time. Manual start/stop/adjustment and optional auto-start survive navigation/reload; supersets rest after balanced working rounds. No background OS alarm is promised. Finished deadlines display “continue when ready”; users control dismissal.

## Blocks and periodization

A block references existing plan IDs; it never materializes another schedule. Existing recurring occurrences remain authoritative, with no duplicate sessions created. Creation converts selected existing programs into a block, chooses a start date, 1–52 weeks, goal and progression approach. Defaults hold sets/load steady; an optional lighter final week reduces set/load factors and raises target RIR. Future weeks can be customized. Pause/resume records calendar-day intervals; ending and duplication preserve completed records. Duplication retains custom weekly targets.

Training weeks follow elapsed calendar dates from the start, subtracting paused days. Missed/rescheduled sessions do not masquerade as completions or increment a workout-driven week counter. A paused block freezes its target week but does not silently cancel calendar appointments. Overlapping blocks for the same plans are rejected.

At session creation, targets are copied into the draft and the original saved plan remains unchanged. Existing active/completed snapshots are never rewritten by future-week edits. Load factors use an actual non-shortened, non-lighter historical reference; no starting weight is invented. Dashboard/check-in summaries show recorded block sessions, elapsed/remaining weeks and upcoming lighter weeks. Comparable within-block estimated-strength trends require at least two relevant recorded exposures; neither attendance nor estimated strength is presented as a direct measurement of hypertrophy.

## Time adaptation

A pure deterministic engine estimates remaining work using sets, reps, rest, transitions, goal, muscle priority, compound/accessory role and coverage. Explicit muscle priorities can outweigh compound defaults. Completed sets and all entered values/notes remain present. Lower-priority remaining work is tagged skipped/deferred rather than deleted. Superset identities remain intact; estimates count rests conservatively and may overstate actual superset duration.

The user reviews original/proposed estimates, retained/reduced/deferred work and reasons, adjusts the budget, and explicitly applies or rejects. A source guard rejects stale previews. Undo restores time-deferred remaining work and retains newly completed sets and pre-existing manual skips. Normal, Focus and existing coach shortening use the same session-level mechanism. Intentional reductions and lighter-block sessions do not count as progression failures/plateaus. Saved plans and historical records are unchanged.

## Feedback and privacy

Feedback retains exercise ID, workout ID/date, original/update timestamps, category, text and dismissal state. A concise recent useful memory appears in both workout presentations; editing, dismissal, deletion and historical review remain available. Repeated equipment/difficulty feedback ranks alternatives from the existing catalog/mappings. Applying an alternative requires explicit confirmation and retains original logged work. Discomfort is recorded without diagnosis; the interface offers skipping and appropriate cautious guidance.

New private feedback is excluded from outbound coach context and from calendar descriptions. Supported backups include it. Existing optional cloud-coach consent and private access-token behavior remain unchanged.

## Calendar exports

The iCalendar adapter consumes existing one-time schedules, recurring segments/family keys and exceptions. It uses stable UIDs, bounded weekly RRULEs, EXDATE for canceled/moved originals and separate stable exception events. It handles future rule splits and exceptions moved into an export window from outside it. No thousands-of-occurrences expansion is written to the file.

Exports deliberately require a selected date window (maximum five years), including ongoing series. Existing schedules follow device-local wall-clock values; export captures an explicit region/city time zone. Timed events include VTIMEZONE observances calculated from actual browser timezone offsets across the window, preserving DST. All-day events use DATE and exclusive next-day ends. Text is escaped, lines fold at 75 UTF-8 octets, output uses CRLF, and VALARM reflects the chosen calendar reminder. A nonexistent explicitly chosen DST wall time is rejected; ambiguous fold times use the first occurrence. Standard recurring-calendar behavior skips nonexistent generated occurrences.

Download is available; file sharing appears only when supported for the actual file. Instructions distinguish Apple open/share from Google desktop import. Reimports may duplicate events depending on the receiving app. Export does not establish continuous or two-way sync; external reminders remain controlled by that calendar/OS, separately from Gym Bro notifications. Physical Apple/Google import testing is not claimed.

## Preview and future infrastructure

The composed review build takes approved `origin/main` unchanged at `/` and puts the candidate only under `/preview/`, checking every root asset byte-for-byte. GitHub's build passed; Pages deployment rejected the feature branch under existing environment protection rules. Those rules were not changed. A separate Sites route was investigated, but its required source/publishing helper is not installed in this environment; no Site was created and no alternate live URL is claimed.

A downloadable local review bundle provides the composed site and dependency-free server. Hosting a private preview on a separate HTTPS origin is also compatible with preview metadata and starts a separate journal. Cloud backup/sync would need an optional authenticated storage service, per-user authorization, encryption/key recovery decisions, conflict/version semantics, deletion handling and consent. Static GitHub Pages alone cannot provide it.
