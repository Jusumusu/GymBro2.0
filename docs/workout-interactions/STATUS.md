# 0.8.0 workout experience — visual review

Branch: `feature/workout-interactions-ux-refinement`. Stable main remains `2ce9a22c675d30fda5501dcc2e3edfeefef66295` / 0.7.0. No main merge is authorized. The full request is in BRIEF.md; root causes, Settings inventory and API compatibility evidence are in AUDIT.md.

## Implemented independently

Training Block date/duration fields stack at phone widths and use equal control heights. The existing timer no longer starts after the last outstanding required working set; skipping or shortening the last required work also resolves active rest. Existing Finish remains explicit and saves the workout once.

One required-work measure powers existing normal/Focus progress displays. It excludes warm-ups and explicitly skipped/deferred/optional rows, counts added working sets and recalculates when completed work is reopened. No progress is awarded for opening an exercise. The new visual progress treatments await selection.

Focus supports conservative left/right touch swipes and keyboard arrows, calling its existing navigation controller. Numeric controls, menus, vertical motion, small/slow drags, multi-touch/cancellation and starts within 28px of the screen edge are excluded. Existing accessible buttons and instant transitions remain pending visual selection. Navigation preserves entered values, notes, RIR, superset ordering and the shared timer.

The current exercise bar follows changed active exercises horizontally and preserves manual scrolling across unrelated redraws. It does not scroll the page. Measured timer height reserves clearance in Focus; informational toasts sit above the timer and cannot intercept taps.

New existing-style Workout preferences expose separate default-off countdown sound, completion sound, rest vibration and Keep Screen Awake. Profile saves preserve these additive optional booleans. There is no database/schema migration. Audio and wake-lock controllers do not read or write workout history; the normal journal commit remains authoritative.

Timer alerts sample the existing deadline: one beep at each final second, then a distinct completion tone. Pause/resume retains millisecond timing and suppresses duplicate seconds. Reset/cancel stop old voices; hidden expiry does not replay missed sounds. Native Web Audio is armed from a user interaction, never assumed available while locked/backgrounded. Rest vibration also respects the existing haptics preference. Scheduled notification preferences remain independent.

Wake lock defaults off, follows only a visible active workout and releases at work completion, save/discard, preference-off or page exit. Late requests are released. Device releases/refusals remain quiet and bounded; visibility or a new interaction can retry. Unsupported or power-restricted devices remain usable.

## Three design packages — none selected

| Decision | A — Continuity (recommended) | B — Center stage | C — Quiet control |
|---|---|---|---|
| Focus navigation | Adjacent exercise peek, directional carousel | Full-panel slide and clear position | Existing layout, compact swipe cue |
| Set completion | One continuous sliding blue plane | Restrained completion pulse | Row flow with a small check response |
| Settings | Grouped single page, full profile expandable | Dedicated category pages | Quick controls plus deeper categories |
| Focus timer | Compact header material | Floating dock with a separate scrollable content region | Integrated below the set controls |
| Progress | Thin line under exercise navigation | Connected exercise sequence | Compact completed/total count |

A keeps frequently used controls discoverable without extra navigation. B gives each task more space but adds category taps and a scrolling Focus region. C changes the familiar workout least and makes routine preferences quick to reach. The user may mix any of the five decisions.

The review includes eighteen actual light/dark mobile captures and live studies with swipe/keyboard navigation, immediate set state, all three animation examples, actual Settings control fragments, pause/resume/reset/skip, opt-in audible countdown, reduced-motion behavior and beginning/middle/almost-finished/complete fixtures. Settings saves and toggles stay in demo memory; no journal database is opened by the studies. Choosing controls in the gallery does not submit approval.

## Verification and reproduction

Executed counts, build identities and publication results are recorded in verification.json. Evidence is under `artifacts/workout-interactions/`.

- `npm test` and `npm run test:backend` cover domain logic, timer signal deduplication, final-work reconciliation and wake-lock request/release/races/refusal.
- `npm run build:review` composes byte-identical released production and an isolated 0.8 preview.
- `node tests/browser-workout-interactions.mjs` checks existing Settings retention, preference persistence, fourteen block layouts, reduced-height block creation, actual touch/keyboard gestures, state preservation, auto-follow/manual scrolling and final completion cleanup. Wake Lock is a lifecycle test double.
- `node tests/browser-workout-audio.mjs` uses native Chromium Web Audio with trusted pointer input; observes actual oscillator scheduling, pause/resume, mute, simulated hidden expiry and dismissal. It does not certify a physical speaker or locked-phone audio.
- `node tests/browser-workout-review.mjs` renders the three packages in both themes, checks all Settings controls, real animations and reduced motion, accurate progress, responsive placements and gallery assets/frames.
- `node tests/browser-workout-interactions-upgrade.mjs` installs the actual archived 0.7 preview worker beside production, then updates to 0.8 while preserving the full journal, active draft/timer, preferences, custom collision and private photo bytes; it reopens offline and verifies production remains unchanged.
- Build the candidate production shell with `npm run build`, then run `node scripts/test-workout-regressions.mjs browser browser-advanced-training browser-training-refinement browser-workout-ux browser-refinement browser-app-updates browser-update browser-design-implementation` for all eight existing browser regression suites, including 178 Aero layouts.

Only Chromium was executed. Native iPhone/Safari, Home Screen PWA operation, Android hardware, system back gestures, locked-device audio, battery restrictions and screen-sleep prevention on a physical phone remain unverified. API compatibility data and runtime capability detection are documented separately. This update preserves Aero; no unselected Weekly or earlier visual study is integrated, and no specialized tracking definition is activated.

## Publication

Review: https://gym-bro-design-review.jesse03sousa.chatgpt.site/

Functional preview update: https://gym-bro-design-review.jesse03sousa.chatgpt.site/preview/update.html?latest=0.8.0&refresh=519dac74fd42

Draft PR: https://github.com/Jusumusu/GymBro2.0/pull/6

The existing Site stays owner-private. Source packaging verifies every offline asset digest; native publication verifies the exact pushed Site commit. No live managed-Site browser tool is available, so Site publication is verified through its native deployment result and repository browser QA.

GitHub Actions run [45001047784](https://github.com/Jusumusu/GymBro2.0/actions/runs/45001047784) built successfully but rejected deployment: `Branch "feature/workout-interactions-ux-refinement" is not allowed to deploy to github-pages due to environment protection rules.` This was verified from the run summary. The existing protected rule is retained. An owner can allow this exact branch in Settings → Environments → github-pages → Deployment branches and tags; the existing private Site supplies the working review without weakening those rules. PR #6 records the final publication result.
