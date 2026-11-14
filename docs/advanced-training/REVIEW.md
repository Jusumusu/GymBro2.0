# Gym Bro 0.3.0 — advanced training review

All six features are implemented on `feature/advanced-training-experience` using **A — Quiet focus**, selected by the user on November 14, 2026. Production remains 0.2.5; nothing has been merged into main. [Pull request #1](https://github.com/Jusumusu/GymBro2.0/pull/1).

## Try the six features

1. **Backup protection:** Settings → Backup & Data is near the top. Export a file with optional photos/password protection. A downloaded file is labeled requested until it is read back and verified; a supported file-writer completion supplies direct evidence. Set an optional weekly/monthly/quarterly reminder. Restore validates and previews contents before replacement, keeps an atomic preceding-journal/photo snapshot, then verifies the result. “Recover journal before last restore” reverses an unwanted restore after confirmation. Native v1 and v2 files and the existing original-app legacy merge are supported.
2. **Focus Mode:** start/resume a workout, then choose Focus Mode. Log weight, reps and optional RIR on one exercise/set, review recorded previous performance and current guidance, switch superset partners, navigate exercises or return to the full workout. Set chips review completed work. An optional rest timer can start manually or after completed sets, adjust ±15 seconds and retain its deadline across navigation/reload. It does not promise a background OS alarm.
3. **Training blocks:** Programs → Create block. Associate existing programs, choose start/duration/goal/progression and optionally a lighter final week. Review the existing recurring schedule, customize future weeks, pause/resume, duplicate or end. A draft receives frozen weekly targets without rewriting its plan or completed sessions. Tracking/Weekly Review shows block progress and comparable recorded trends when enough evidence exists. Pausing target progression does not silently cancel calendar appointments.
4. **Time-adaptive workouts:** in normal or Focus Mode, select Shorten workout and choose remaining minutes. Review estimated original/proposed duration and retained/reduced/deferred sets before accepting. Adjust the budget or cancel. Restore remaining sets to undo, preserving completed work and pre-existing manual skips. This also replaces the coach's older destructive shortening method. Intentional reductions and lighter weeks are excluded from progression-failure/plateau interpretation.
5. **Exercise feedback:** Feedback & notes records a quick category and optional setup/technique note. Recent useful reminders appear next time in both modes. Edit, dismiss, review history or delete. Repeated equipment/difficulty feedback can offer catalog alternatives, always requiring confirmation before applying. Logged work remains present. Discomfort guidance offers stopping/skipping without diagnosis. Feedback stays local, is backed up, and is excluded from outbound coach facts and calendar descriptions.
6. **Phone calendars:** Calendar → Export calendar, or export an individual occurrence. Choose the export date window, time zone and external-calendar reminder. The `.ics` file includes bounded weekly recurrence, moved/canceled occurrence handling, stable identities and DST timezone observances. Download or share where supported. Apple: open/share into Calendar; Google: desktop Settings → Import & export. Export is one-way, reimports may duplicate events, and alerts depend on the calendar/OS settings independently of Gym Bro's Notifications switch.

## Preview

The candidate composes approved `origin/main` unchanged at the root and the new build only under `/preview/`. Root files are checked byte-for-byte; preview has its own database, writer lock, worker/cache scope and visible banner. It starts empty and never opens the production journal. Importing your own backup is an explicit copy; neither journal synchronizes to the other.

GitHub's [preview workflow run](https://github.com/Jusumusu/GymBro2.0/actions/runs/43608835653) passed build/tests/composition but rejected deployment:

> Branch "feature/advanced-training-experience" is not allowed to deploy to github-pages due to environment protection rules.

The rules were retained, as required by AGENTS.md. The existing `/preview/` URL must not be represented as containing this candidate. A separate Sites deployment was investigated but its required publishing helper is unavailable in the selected environment; no Site was created. No new live preview URL is claimed.

`artifacts/advanced-training/review-preview.zip` contains the tested composed review site, a dependency-free local server and instructions. Unzip, enter its folder, run `node serve.mjs site`, and open `http://localhost:5173/preview/`. This is a local review address, not a phone-accessible hosted URL. Localhost supports PWA testing in compatible browsers; plain LAN HTTP on a phone does not provide the same secure-context APIs. Alternatively run `npm run build:review` and `node scripts/serve.mjs review-site` from the checkout.

## Validation and limits

See [QA.md](QA.md) for the executed suites, actual screenshots, independent calendar parsing and limitations, and [ARCHITECTURE.md](ARCHITECTURE.md) for schemas, cryptography, recovery, progression and recurrence semantics.

No cloud sync/backend, paid service or account authentication was added. Password loss is unrecoverable. Large photo collections may exceed export or device quotas. Calendar imports on physical Apple/Google clients, OS alert delivery, physical phones and Safari/Firefox are not certified. File-writer completion/failure is tested with explicit browser API stubs; actual fallback downloads and file-input read-back/restore are exercised in Chromium. Superset duration estimates are conservative. Export before any code rollback: backward retention does not guarantee older code understands new training semantics.

Main merge approval is still required separately. This update has not been merged or deployed to production.
