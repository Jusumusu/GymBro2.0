# Optional sync architecture — design only

No sync service, account, remote journal or hosting was created. Core logging, photos, goals and local coaching remain independent of network access. JSON export remains the portable recovery mechanism.

A future opt-in service should use established authentication (passkeys or a managed OIDC provider), short-lived sessions and server-enforced user ownership for every query/object. Keep development/preview and production in separate projects or tenants; a URL path alone is not a security boundary. Store structured records separately from encrypted transport/private photo blobs and use row/object access policies, never browser-selected user IDs as authorization.

Use stable UUIDs, per-record revisions, tombstones and a durable client outbox. Sync explicit mutations instead of replacing the whole database. The server checks an expected revision; conflicting edits are surfaced with both versions and a user-selected resolution. Completed set data and timestamps should not silently win by last-write time. Keep backups/snapshots for rollback and retain imported-source receipts for deduplication. Use idempotency keys and resumable photo upload with hashes; failed retries must not duplicate sessions.

The UI should show local-only, pending, synced and conflict status. Account sign-out must explain whether a local copy remains. Export before account deletion; then revoke sessions, delete server records/photos, expire derived data and document backup retention. Coach provider requests are a separate consent and retention boundary, not an implicit consequence of enabling sync.

Implement and test cross-user isolation, offline edits, concurrent set changes, deletion resurrection, clock skew, partial media upload, quota failures, lost connectivity, expired auth, export and deletion before provisioning a service. Provider choice, recurring cost and a real conflict-resolution experience require a separate scoped implementation.
