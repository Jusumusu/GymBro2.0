# 0.7.0 development preview — awaiting visual selection

Branch: `feature/weekly-review-progression-search`  
Draft PR: https://github.com/Jusumusu/GymBro2.0/pull/5  
Released main: `30b63d01483cb7c4fe3df9dace07c98b9d416d9e` / **0.6.0**. Nothing is merged into main.

Design review: https://gym-bro-design-review.jesse03sousa.chatgpt.site/preview/docs/weekly-review-progression-search/review/  
Functional app: https://gym-bro-design-review.jesse03sousa.chatgpt.site/preview/

The retained Sites project is private to its owner. Its source was tested in local Chromium before packaging; native Sites deployment verifies publication. The managed live-site browser is unavailable, so no live Safari or physical-phone verification is claimed.

## Current optical-glass correction — November 21

The user rejected the previous frosted result: “it should be clear just with the liquid glass effect”. The current finish removes the 16px blur and broad white wash. The centre is sharp with only 2.5% light / 3.5% dark white fill; reflections and shadows are confined to the rim. Small text/icon halos preserve local contrast while leaving the pane clear. Selected-control geometry, typography, Aero colours and all logging surfaces remain unchanged.

Current review and live optical demo: https://gym-bro-design-review.jesse03sousa.chatgpt.site/preview/docs/weekly-review-progression-search/optical-glass/

A small SVG displacement field bends only the rounded perimeter of supported Chromium backdrops. Geometry is cached (maximum 24 inactive/active size entries), rebuilt on resize rather than scrolling, and disposed on page exit. No journal access, DOM screenshot, cloned workout content, provider dependency or animation loop is used. SVG references use the actual document URL so the hosted root's base URL does not break the effect.

Safari/WebKit does not reliably support SVG backdrop displacement ([WebKit bug 245510](https://bugs.webkit.org/show_bug.cgi?id=245510)); it gets the clear CSS finish and reflective rim, with no unsupported filter URL or frosted fallback. This is a web approximation, not Apple's native shader. A Safari-targeted branch was checked through user-agent emulation in Chromium; actual physical iPhone/Safari rendering is not certified.

Eight browser checks cover the same real app/material comparison in both themes, seven widths, unchanged solid fields/cards and complete journal, photo/short-screen/reduced-transparency fallbacks, offline reload, the interactive optical demo and WebKit-targeted compatibility path. A stationary before/after pixel comparison confirms the actual refraction affects only the lens bounds. Three new pure geometry tests check the neutral centre, bounded/symmetric edge field and rejected unbounded allocations; all 287 domain/unit tests pass. The existing full-app Aero suite also passed 178 layout checks plus real pointer completion, keyboard undo, navigation, timer, dialogs, offline reload and updater flows.

## Earlier Clear-glass refinement — superseded

The user explicitly kept **A — Aero** and requested glass more transparent than **Expressive**. Clear is applied to the branch's existing selective glass controls: **28% light / 34% dark fill, 16px blur**, compared with Expressive's **66% fill, 24px blur**. Palette, typography, geometry and the existing Weekly layout are retained. Inputs/cards/dialog content stay solid. Photo backgrounds, short navigation viewports, reduced-transparency preferences and unsupported filtering use readable solid fallbacks. No new runtime dependency or backdrop observer is added.

Current refinement review: https://gym-bro-design-review.jesse03sousa.chatgpt.site/preview/docs/weekly-review-progression-search/clear-glass/

Seven actual Chromium checks cover paired real-app captures, seven widths in each theme, solid fields/cards, unchanged journal, short-screen/reduced-transparency/photo fallbacks and offline reload with the complete active journal. This does not certify physical Safari/iOS/Android behavior.

## Earlier design checkpoint

No new Weekly Check-In layout is selected. The earlier three glass presets were superseded by the user’s explicit request for Clear glass beyond Expressive. The brief requires this checkpoint before meaningful final aesthetic integration. Three actual rendered, paired light/dark layouts are available: **A Weekly brief**, **B Coach’s letter**, **C Week in view**. Three independently selectable glass levels are available: **A Subtle**, **B Balanced**, **C High**. Recommendation: **Weekly A + Glass B**. The review supports mixing, body/strength/new-journal fixtures, active workouts, menus, modals and opaque fallback. Choices in the preview do not submit approval.

The functional app retains the approved Aero layout with the requested Clear glass values. Its search alignment is a minor repair to the existing component. Earlier chart/Focus/program-creator concepts and 21 special tracking definitions remain unselected/inactive; this update does not claim their integration.

## Implemented independently

- **Weekly Check-In:** recurring occurrences, moved/canceled schedule handling through the shared calendar model, exact saved-workout links, separate schedule/frequency targets, matching-day partial-week comparisons, real goal-specific narratives, at most three wins and two future actions. Lighter/shortened sessions remain in workload totals but do not establish performance changes. Saved block names and targets inform context. Actual body averages require explicit sample/date coverage to qualify as a win, with rapid changes treated neutrally. Tape entries are labeled observations. Body consent excludes derived body facts. Historical reviews are date-bounded, regenerated from recorded facts and current preferences, not saved snapshots; recomputation is read-only.
- **Progression:** the existing all-set ceiling behavior, missing-RIR support, explicit RIR targets, equipment increments and 7.5% product guard remain. Early load-mode increases require a recent complete controlled exposure with matching load and targets. Repeated-miss reduction candidates need comparable evidence; unrelated manual load changes, stale history and incomplete sessions cannot trigger them. Zero-added-load ceilings give meaningful manual guidance. Return-session gaps use calendar days. Maintain mode is explained accurately. Assistance/band/timed custom conventions do not receive inverted numeric overload advice. Explicit Use load changes only eligible unfinished working/failure rows. No sets, exercises or program changes are applied automatically.
- **Search:** exact name > exact alias > phrase prefix > token matches > strong partial > bounded fuzzy matching, including transpositions. Whole-phrase typo matches outrank longer variations; favorites/recency break lexical ties only. Unicode custom names and IDs are retained; short queries do not use fuzzy matching. Starting a query clears a previous category to make global search explicit; filters selected during a query are honored. All matching is local/offline, with no new dependency or service.
- **Search alignment:** the phone frame and child input applied overlapping padding, the phone breakpoint hid its icon, and the undefined search icon fell back to a dumbbell. One frame now owns spacing, border and focus ring; the child is borderless/unpadded, the magnifier is real, and Clear aligns to the same control height. Geometry was checked in both themes at 320, 375, 390, 430, 768, 1024 and 1440px; a reduced-height viewport checks keyboard-space behavior, not a physical keyboard.
- **Catalog:** **198 → 254 available (+56)**, all 198 released records deep-equal to the captured baseline; 275 definitions include 21 previously prepared inactive tracking entries. New variations have stable IDs, cues, gear/load conventions and centralized ordinal anatomy mappings. No canonical ID or history is remapped; existing colliding custom IDs win. No unsupported hold is disguised as a rep exercise.

## Coverage

Primary regions count exercises by their first primary muscle; secondary discovery is tracked separately in catalog-coverage.json. Ordinal anatomy roles are coaching estimates, not activation or growth percentages.

| Region | 0.6.0 | Preview |
|---|---:|---:|
| Chest | 26 | 31 |
| Back | 27 | 33 |
| Quads | 26 | 31 |
| Hamstrings | 14 | 20 |
| Glutes | 18 | 22 |
| Shoulders | 21 | 26 |
| Biceps | 13 | 18 |
| Triceps | 14 | 16 |
| Calves | 9 | 12 |
| Core | 12 | 15 |
| Adductors | 3 | 7 |
| Spinal erectors | 2 | 4 |
| Forearms | 8 | 12 |
| Obliques | 5 | 7 |

Gear coverage: barbell 26→31; dumbbell 45→59; bodyweight 37→48; cable 35→49; Smith 7→9; plate-loaded 12→15; selectorized 17→20; kettlebell 6→10. Generic machines 8, EZ bar 4 and trap bar 1 retain their previous useful entries without padding the count with aliases.

## Validation

Actual outputs are under `artifacts/weekly-review-progression-search/` and the source test scripts. Final counts/build identities and deployment provenance are in verification.json.

- Domain/unit tests and all 9 backend HTTP tests pass; catalog validation reports zero duplicate IDs/names or invalid mappings, with all 198 released definitions unchanged.
- Seven existing browser regression suites pass: core app, advanced training, training refinement, workout UX, appearance/weekly review, automatic updates and stale-cache recovery. The old OHP browser assertion was broadened from two hard-coded IDs to its actual shoulder/vertical-press semantics, because the released catalog already contains additional OHP variations. It still rejects unrelated search results.
- Ten new app/browser checks cover role-aware Use load, typo/filter/custom-ID behavior, seven-width search geometry in both themes, a reduced-height keyboard viewport, recurring review counts, actual gallery screenshots/iframe, and separate unchanged production root.
- Seven real archived **0.6.0 preview → 0.7.0 preview** upgrade checks preserve the full journal, active draft/timer, custom collision, preferences, private photo bytes and unrelated storage, then reopen offline. The separate 0.6.0 production journal and metadata remain identical.
- Forty-six prototype/rendered checks cover all three layouts/glass levels in light/dark, menus/modals, seven widths and opaque fallback. Representative rendered navigation-background contrast samples exceed 4.5:1; this is not a universal contrast certification for arbitrary backgrounds.
- The 5,000-row local search benchmark includes a separate 4× CPU-slowed Chromium run. Recorded timings are observations, not guarantees for physical phones.

No database migration, storage deletion, history rewrite or automatic plan change is introduced. Build composition verifies byte-identical approved production files and separate preview database/lock/worker/cache scopes. All fixtures/screenshots are synthetic; no personal journal is packaged.

## Publication constraint

GitHub runs #27 and #28 built successfully. Run #28, https://github.com/Jusumusu/GymBro2.0/actions/runs/44550737996, tested `4c937d0` and then rejected deployment before any deploy steps:

> Branch "feature/weekly-review-progression-search" is not allowed to deploy to github-pages due to environment protection rules.

The repository connector cannot administer environment rules. Keep protections intact. A repository owner can add this exact Branch rule at https://github.com/Jusumusu/GymBro2.0/settings/environments → github-pages → Deployment branches and tags, then rerun the latest branch run. Rerunning the older deleted training-refinement branch cannot publish this version. The separate private Sites review is available while GitHub Pages remains blocked; its existing owner-only audience is preserved.
