# 0.2.2 review candidate

Branch: `feature/appearance-calendar-weekly-review`, based on main `c35c629`. This work is committed separately for review. **It has not been merged or deployed.** The existing live app and public preview still run the released main version.

The user subsequently requested a working website preview. Its build passed, but GitHub rejected deployment because this branch is not allowed by the `github-pages` environment. [Deployment result and owner steps](PREVIEW.md). Main remains unchanged.

## 1. Changes and entry points

- Settings → **Appearance**: immediate Light Mode, Dark Mode and System Default.
- Settings → **Calendar Preferences → Start of Week**: Sunday or Monday, explicitly described as Sunday–Saturday / Monday–Sunday.
- Workout home: a compact weekly check-in entry point.
- Tracking → **Weekly review**, and the Gains page: the full goal-aware review, previous/next week controls and a date chooser.

All existing logging, plans, imports, photos, history, goals, advanced tools and coach controls remain. Root storage schema and database version stay unchanged; `upgrade.weekStartsOn` is an additive preference defaulting to Monday for existing and new journals. No historical date is rewritten.

## 2. Appearance system

Reusable theme variables cover surfaces, text, accents, form-control boundaries, charts, status colors, dialogs and inverse workout-hero styling. A synchronous head script resolves a small theme cache before styles/app code can paint. IndexedDB remains authoritative; the cache contains only the appearance choice and is isolated between production and preview. Changes persist immediately and follow live OS changes when System Default is selected.

Theme switches temporarily suppress color interpolation, preventing low-contrast intermediate button colors; normal hover feedback remains. The browser theme-color and matching light/dark PWA manifest follow the resolved theme. Both manifests retain the same app ID, scope and icon paths; preview builds keep their separate name and scope.

On the first migration from a version without the appearance cache, the existing dark fallback may appear until IndexedDB supplies the saved preference. Subsequent starts use the prepaint mirror. Browser/OS install splash updates can be cached independently and were not physically certified.

## 3. Visual audit and corrections

Actual Chromium renders were checked, including populated/empty routes, active logging and dialogs in both themes. Main route layout assertions cover 320, 375, 390, 430, 768, 1024 and 1440px; existing regression also covers 280px and landscape.

| Finding | Correction |
|---|---|
| Button color transitions briefly lost contrast during theme switches | Immediate theme palette changes; tested primary text contrast ≥4.5:1 in both themes |
| Form boundaries were too subtle | Shared control-border tokens; tested select boundaries ≥3:1 against the control background |
| Calendar grid and weekday header had different mobile margins | One shared column width and aligned outer margins |
| Logger cards extended beyond adjacent panels | Consistent workout-list margins and a responsive numeric grid; header/input centers checked |
| Icons and completed-set controls used inconsistent optical alignment | Shared inline-flex centering and consistent control heights |
| Tracking tabs wrapped a single trailing item onto a second row | Scrollable mobile tabs with the active section kept visible |
| Mobile safe-area padding could compress bottom navigation | Navigation height and footer clearance include safe-area insets |
| Standalone review repeated the same page heading | One review heading, leaving room for the useful statistics |
| Chart strokes used hard-coded colors and duplicate gradient IDs | Theme-aware strokes/fills and unique gradient IDs |
| Preference saves could award unrelated missing milestones | Appearance/calendar changes preserve unlock records; reviewing weeks never writes achievements |
| Three similar lifting wins crowded out other accomplishments | Up to two exercise wins, leaving space for consistency or goal progress |

Screenshots are in [artifacts/refinement](../../artifacts/refinement). They show only synthetic QA records, never the user's uploaded workout data. Representative views:

- [Light review](../../artifacts/refinement/light-1440-review.png) / [dark review](../../artifacts/refinement/dark-1440-review.png)
- [Mobile light review](../../artifacts/refinement/light-390-review.png) / [dark goal progress](../../artifacts/refinement/dark-390-review-goals.png)
- [Light logger](../../artifacts/refinement/light-390-logger-sets.png) / [dark logger](../../artifacts/refinement/dark-390-logger-sets.png)
- [Light Settings](../../artifacts/refinement/light-390-settings.png) / [dark Settings](../../artifacts/refinement/dark-390-settings.png)

## 4. Calendar rules

`src/calendar.js` owns date-only arithmetic and week boundaries. UTC-noon operations avoid daylight-saving shifts; local device dates identify today. No workout timestamp is converted to change a layout. The chosen boundary applies to home summaries, training calendar, weekly review, coach facts, muscle counts, workload/frequency charts and week-based milestone/streak calculations. Rolling seven-day body-weight statistics remain rolling periods and are labeled accordingly.

Week grouping is recalculated when the preference changes. Saved milestone IDs remain unique and retained. There are no stored weekly snapshots to migrate. Tests cover Sunday/Monday differences, invalid dates, leap days, month/year transitions and four timezone/DST conventions, including Asia/Jerusalem.

## 5. Weekly review calculations

The review is a **recalculated view**, not an immutable saved snapshot. It uses recorded data through the selected week end, or through today for a partial week. Current goals/targets and the chosen week convention are disclosed. Later workouts, weigh-ins, goal creation and saved future unlock flags cannot leak into a past review.

The review includes a relevant headline, recorded statistics, up to three wins, a concise contextual message, one or two next steps, and goal progress. Primary goal and explicit exercise targets influence ranking; secondary goals remain visible.

- Frequency uses actual completed sessions and the current profile target. Explicit calendar matching is separate: completing three scheduled sessions cannot silently satisfy a five-session profile target. A workout can match only one scheduled entry. Future sessions are upcoming, not missed.
- Working sets/reps/load exclude unchecked and warm-up rows. Load × reps is training context, not a muscle-growth measurement.
- Rep gains require the same exercise, set count and recorded loads; load gains require no loss of reps across comparable sets. PRs require an earlier baseline and distinguish working load, matched-load reps and estimated strength (1–10 reps). Incremental peaks avoid repeatedly scanning all prior sets.
- Body-weight comparisons use actual samples only. With at least two entries in each week, weekly averages can support a qualified movement toward an explicit target. Sparse entries are labeled as limited; no measurements are imputed. Changes below 0.1kg are not promoted as biggest wins; that is a UI noise rule, not a medical threshold. Water, conditions and normal fluctuations are acknowledged. Weight change is not claimed to measure fat or muscle change.
- Load, estimated-strength, cumulative-workout and body targets use records available at the cutoff. No finish date or guaranteed forecast is invented.
- Milestone highlights compare raw recorded values before/through the week. Opening the review does not award anything or duplicate an unlock.
- Next steps respect missing evidence, saved rep ceilings, near-failure effort, equipment and exclusions. Missing sessions are described without guilt or catch-up prescriptions.

The full local review works offline. The optional coach receives bounded deterministic review facts; derived body facts require both the request and stored body-sharing consent. No live model was required or provisioned.

## 6. Executed validation

Baseline before implementation: **95 domain tests, 9 HTTP backend tests, 24 core browser checks, 23 upgrade browser checks and 10 update checks**, all passed. Baseline evidence is in `docs/refinement/baseline`.

Final checks:

| Command | Result |
|---|---|
| `npm test` | 124 passed, 0 failed/skipped |
| `npm run test:backend` | 9 passed; actual localhost HTTP, stub provider |
| `npm run test:e2e` | 24 passed |
| `npm run test:upgrade` | 23 passed |
| `npm run test:refinement` | 12 passed; seven viewport widths, both themes, all 12 routes, empty states, logger, dialogs, contrast, persistence and offline |
| `UPDATE_BASELINE_DIST=<archived-main-dist> npm run test:update` | 11 passed, using the actual 0.2.1 main app; records/photo bytes preserved through update and preference save |
| `npm run build` / `npm run build:site` | Build and local production/preview isolation checked; no publication |

The domain cases cover all requested review scenarios: weight loss/gain, strength, consistency, PRs, missed sessions, multiple goals, sparse/no data, unchanged progress, fluctuating weights, changing week conventions, historical weeks and missing weigh-ins. Additional checks cover privacy gates, raw-field preservation and distinct calendar/profile targets. JSON results and actual screenshots are committed under `artifacts/`.

A 1,500-session / 22,500-set Node benchmark is recorded in `artifacts/performance-results.json`. After removing repeated history scans, structured context construction measured about 50ms median on this cloud CPU. This is not a mobile rendering guarantee. Initial failed QA attempts were corrected and rerun; only final passing evidence is retained.

## 7. Remaining limits

Chromium desktop/emulation was executed; Safari, Firefox, physical installation/splash behavior, screen-reader traversal, 200% text and a complete WCAG audit were not certified. Native numeric keyboards and vibration still need physical-device checks. The contrast assertions cover primary actions and control boundaries, not every possible content combination.

Historical goals are current targets applied to historical records, not a record of what the user intended at that time. Readiness, indirect sets and coaching are heuristics. Live cloud AI still requires its separate host/provider credentials and real-model evaluation. No clinical claim, encrypted backup or sync service is added.

## 8. Review and publish later

For a local review without deploying:

```sh
git switch feature/appearance-calendar-weekly-review
npm run build:site
npm run preview
```

Open the printed local URL under **`/preview/`** for the isolated journal. No provider key is needed for the weekly review. A native backup can be imported explicitly into that preview; it does not sync back to production.

Review the branch/compare and screenshots first. Only after explicit approval should a normal pull request merge this branch into `main`. The existing main workflow then tests and publishes production plus its separate preview. Keep a complete JSON backup and a code tag before any future production release; never force-push shared history as a rollback. No merge or deployment was performed by this task.
