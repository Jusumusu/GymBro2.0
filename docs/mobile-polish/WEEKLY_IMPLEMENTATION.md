# Approved Weekly B — Unified Performance Summary

The user selected **Weekly B** during the mobile-polish review. The actual Weekly Check-In now uses its single unified summary surface, large recorded-session count, seven-day rhythm and three secondary metrics. `src/weekly-summary.css` supplies the approved layout while `src/weekly-review-ui.js` renders the existing review result.

The original `buildWeeklyReview` calculations are unchanged. The main count is actual recorded workouts against the current profile frequency target. It does not substitute matched scheduled sessions for workouts. Scheduled matches, upcoming/missed counts and a distinct frequency target remain visible below when applicable. Weight entries/coverage, goals, wins, current-goal context, observations, scientific qualifications and the review methodology remain available.

The day rhythm uses the review’s civil-date start and through bounds. A day can show multiple actual saved sessions. Dates beyond the partial review’s through date have a distinct future state and are not treated as missed sessions. Sunday/Monday preferences and month/year boundaries come from the shared calendar functions.

The secondary metrics are completed working sets, recorded workload and exercise-specific record events. Workload uses the current display unit; its compact headline is accompanied by the exact converted number and `kg × reps` or `lb × reps`. It is explicitly described as recorded work rather than muscle growth. Record events come directly from the review’s existing record tracker, which does not call first exposures new records.

The comparison sentence uses the existing matching-elapsed-day window, not a full prior week against a partial current week. It shows an actual set difference or a clear absent-baseline message. It invents no effort score or percentage.

Previous/next/This week and the native date input retain their existing action names and controller. Equal navigation columns center the date structurally. The date and navigation buttons share one aligned row; the native picker remains keyboard/touch accessible. The workout teaser stays compact and links to the full review.

## Executed verification

- `node --test tests/mobile-polish-weekly-design.test.mjs`: 8 tests covering bounded real day counts, Sunday/Monday and year boundaries, frequency-versus-schedule distinction, exact unit conversion, matching-day comparisons, empty data, retained context and the compact teaser.
- `node tests/browser-mobile-polish-weekly-design.mjs`: 7 actual-app checks and 18 light/dark viewport cases (320/360/375/390/414/430/768/1024/1440px). The checks compare the rendered values to the existing review result, exercise actual history/date controls and preferences, verify three equal metrics/seven day columns/date centering, keep all saved records, and reopen the installed app offline.
- `artifacts/mobile-polish/weekly/`: executed results and actual integrated light/dark/empty captures.

The isolated test build lives under `work/mobile-polish/weekly-source/`; it uses the actual app source and a separate browser profile with synthetic records. Tests do not claim physical iPhone/WebKit coverage. `MOBILE_POLISH_WEEKLY_ROOT` can select a composed final app root for an integrated rerun.

No storage migration, analytics redefinition or main merge is introduced. The approved visual implementation remains on `feature/mobile-polish-muscle-map-refresh`.

The selected B lower section also includes its six-week workload view, using the existing shared live chart inspector. Windows follow the selected Sunday/Monday convention and include only saved records through the review cutoff. The existing summary engine calculates load × reps; display units convert canonical kilograms. Quiet weeks show zero recorded workload, not a claim of zero physical activity. A wholly empty window has an honest empty state. Two additional pure cases verify the cutoff/window/unit behavior; native touch is checked in the integrated captures suite.
