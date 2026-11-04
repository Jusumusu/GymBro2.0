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

Legacy Gym Bro backups require a tested migration and are intentionally rejected. Do not change version fields to bypass validation. Undo is only the most recent deletion/discard, before a subsequent write, during the current page session.
