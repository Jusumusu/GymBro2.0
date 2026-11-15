# Data backup and recovery

Settings → Backup & Data → Export backup. Keep the file outside browser storage in a trusted location. Version 2 includes the supported complete journal, programs, active draft, goals, schedules, training blocks, feedback and preferences. Progress photos require explicit selection; original images may include camera metadata. Optional password protection encrypts the entire payload. Losing the password makes that file unrecoverable. Native version 1 files remain supported.

A requested browser download is not marked successful. Supported file-writer completion or reading back and verifying a saved file supplies evidence. Local browser persistence is never called a backup. Reminders are optional and respect the master Notifications switch.

CSV is an analysis export, not full restoration. It uses canonical kg regardless of display units, includes completed sets with their types, and escapes spreadsheet formulas in user text.

## Restore safely

1. Export current data if you want to keep it.
2. Import a Gym Bro JSON file.
3. Review counts and duplicate IDs.
4. Confirm full replacement.

Restore is not a merge. Re-importing does not add duplicate sessions. IDs, references, calendar dates, and numeric bounds are validated. Incomplete photos, unsupported image payloads, oversized files (>100 MB backup or >8 MB/image), malformed JSON, and unknown schema versions are rejected. State and photo blobs restore in one IndexedDB transaction; quota failures abort it. The preceding journal and its photo blobs are captured in the same transaction before replacement. Settings offers explicit preceding-journal recovery; a read-back check verifies the restored state. Restore shares the autosave write queue.

## Limits

Browser eviction, private browsing, manual data clearing, device loss, changing site origins, or uninstall behavior can remove records. Persistent storage is user-requested and may be denied. There is no cloud backup or device sync. Plain exports are unencrypted; select a password to use authenticated encryption. Export before moving to a new host/origin.

Draft inputs autosave after validation. An input pending during a crash may not have committed. A normal exit warns while writes are pending. A database-open failure never resets stored data. Retry after fixing storage permission/access. There is no repair UI for manually corrupted IndexedDB; recover from a valid external backup.

Original Gym Bro v3 exports support the merge flow below; other legacy versions are rejected. Do not change version fields to bypass validation. Undo is only the most recent deletion/discard, before a subsequent write, during the current page session.

## Import the original Gym Bro v3 export directly

The file you already downloaded from the original app can be selected in **Settings → Backup & Data → Restore from backup**. No file conversion download is required.

1. Choose the original complete JSON export and select **Validate & preview**.
2. Review new workouts, matching workouts skipped, new weigh-ins and programs. If weigh-in dates conflict, existing Gym Bro 2.0 values are kept.
3. Confirm the source weights are **kilograms**, even if your current display is pounds.
4. Select **Merge into history**. Your current workouts, active draft, settings, measurements and photos are kept. An unset body-weight target can be filled from the original export.

The merge recognizes movement names, not reused short IDs: seated leg curls cannot become dumbbell curls, and seated cable rows cannot become barbell rows. Exact attachment/position variants use distinct custom exercises. Matching date/performance records are skipped on repeat imports. Two sessions with different performance on the same date stay separate. Exact identical same-day sessions cannot be distinguished from duplicate records in this date-only format.

The old session-level warm-up checkbox is preserved as a note. No individual warm-up types or RIR were recorded, so positive-repetition rows become completed working sets and RIR stays blank. Zero-rep placeholders remain incomplete. Unknown timestamps are explicit zero sentinels, not measured session durations. Old rest/increment preferences are retained as notes; your current profile increment drives future recommendations. Old achievement flags are retained as import receipts and current achievements are computed using current rules.

Unsupported legacy photos, measurements, additional saved-plan schemas, lift targets, units and unrecognized movements stop the import without changing your journal. Native Gym Bro 2.0 backups still perform explicit full replacement; the preview makes the distinction clear.

If the update button is missing or the app stays on old code, open `update.html` beside the app (for this deployment: https://jusumusu.github.io/GymBro2.0/update.html). Close other Gym Bro tabs and app windows and choose **Update and open Gym Bro**. The helper checks that fresh app files are reachable, unregisters only this app’s worker, and refreshes only its offline app cache. IndexedDB records, photos, unfinished workouts, localStorage and other app scopes remain intact. It stops if another Gym Bro writer window is open or the network is unavailable. You can also reach it through **Settings → Update app**. On the welcome screen, **Import existing workouts** opens the same import flow without profile setup.

## Upgrade preview and additive fields

Preview uses `gymbro-preview-v1` for both state and media, a separate writer lock and service-worker cache scope. It never opens `gymbro-local`. Export your stable JSON before testing, then explicitly import a copy in preview if desired. Preview changes do not sync back. The relative preview update page refreshes preview code only.

The upgrade keeps native root schema v1 and adds a validated extension v1 for appearance, goals, calendar, optional readiness, progression rules and coach preferences/messages/decisions. Old backups get defaults without losing core fields. Unknown extension versions stop safely. Backend client tokens and provider keys are never in this backup. Conversation/preferences may be sensitive; backups remain unencrypted.

Retain your pre-upgrade backup: expanded built-in exercise IDs are unknown to the former 0.1.2 app, so that old version cannot read every new backup. Main and preview now both support 0.2.1 records but keep their journals separate. Older plan editors can also drop advanced fields. A code rollback to 0.1.2 alone does not provide a lossless data downgrade. Export preview data separately before removing it.

See [advanced backup/encryption/recovery architecture](advanced-training/ARCHITECTURE.md) and [actual test coverage](advanced-training/QA.md). The 100 MB payload limit becomes approximately 134 MB for an encrypted envelope; individual photos retain the 8 MB limit.
