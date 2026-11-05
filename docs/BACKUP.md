# Data backup and recovery

Settings → Export complete JSON backup. Keep it outside browser storage in a location you control. It includes profile, custom exercises, plans, completed sessions, active draft, body weights, measurements, unlock IDs, and original photos. It is not encrypted; photos may include camera metadata.

CSV is an analysis export, not full restoration. It uses canonical kg regardless of display units, includes completed sets with their types, and escapes spreadsheet formulas in user text.

## Restore safely

1. Export current data if you want to keep it.
2. Import a Gym Bro JSON file.
3. Review counts and duplicate IDs.
4. Confirm full replacement.

Restore is not a merge. Re-importing does not add duplicate sessions. IDs, references, calendar dates, and numeric bounds are validated. Incomplete photos, unsupported image payloads, oversized files (>100 MB backup or >8 MB/image), malformed JSON, and unknown schema versions are rejected. State and photo blobs restore in one IndexedDB transaction; quota failures abort it.

## Limits

Browser eviction, private browsing, manual data clearing, device loss, changing site origins, or uninstall behavior can remove records. Persistent storage is user-requested and may be denied. There is no cloud backup or guaranteed encryption. Export before moving to a new host/origin.

Draft inputs autosave after validation. An input pending during a crash may not have committed. A normal exit warns while writes are pending. A database-open failure never resets stored data. Retry after fixing storage permission/access. There is no repair UI for manually corrupted IndexedDB; recover from a valid external backup.

Original Gym Bro v3 exports support the merge flow below; other legacy versions are rejected. Do not change version fields to bypass validation. Undo is only the most recent deletion/discard, before a subsequent write, during the current page session.

## Import the original Gym Bro v3 export directly

The file you already downloaded from the original app can be selected in **Settings → Import a backup**. No file conversion download is required.

1. Choose the original complete JSON export and select **Validate & preview**.
2. Review new workouts, matching workouts skipped, new weigh-ins and programs. If weigh-in dates conflict, existing Gym Bro 2.0 values are kept.
3. Confirm the source weights are **kilograms**, even if your current display is pounds.
4. Select **Merge into history**. Your current workouts, active draft, settings, measurements and photos are kept. An unset body-weight target can be filled from the original export.

The merge recognizes movement names, not reused short IDs: seated leg curls cannot become dumbbell curls, and seated cable rows cannot become barbell rows. Exact attachment/position variants use distinct custom exercises. Matching date/performance records are skipped on repeat imports. Two sessions with different performance on the same date stay separate. Exact identical same-day sessions cannot be distinguished from duplicate records in this date-only format.

The old session-level warm-up checkbox is preserved as a note. No individual warm-up types or RIR were recorded, so positive-repetition rows become completed working sets and RIR stays blank. Zero-rep placeholders remain incomplete. Unknown timestamps are explicit zero sentinels, not measured session durations. Old rest/increment preferences are retained as notes; your current profile increment drives future recommendations. Old achievement flags are retained as import receipts and current achievements are computed using current rules.

Unsupported legacy photos, measurements, additional saved-plan schemas, lift targets, units and unrecognized movements stop the import without changing your journal. Native Gym Bro 2.0 backups still perform explicit full replacement; the preview makes the distinction clear.

After an app update, close all installed-app windows and browser tabs and reopen to activate the new service worker. Settings → Check for app update can download a pending update first.
