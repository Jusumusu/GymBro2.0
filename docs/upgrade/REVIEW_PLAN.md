# Implementation and release checklist

The user superseded the original per-feature review pauses with “dont pause any more just go ahead with the whole thing.” This is a completed implementation checklist, not a queue awaiting feature approvals. Production `main` remains a separate release decision.

| Original items | Result | Evidence / material limit |
|---|---|---|
| 01 audit | Complete | [Audit](AUDIT.md); protected stable baseline `3c5985f` |
| 02 isolated preview | Complete | Distinct database/lock/worker scope; browser readback; composition hashes every stable asset |
| 03 data foundation | Complete | Additive defaults and validation, native round-trip and verified legacy v3 merge, atomic storage/media restore; unknown duration stays unknown |
| 04–05 appearance/navigation | Complete | Dark/light/system, mobile navigation and Tracking sections; nine widths and landscape |
| 06–07 smart logging/autosave | Complete | Previous values remain unchecked; next set/superset guidance; accurate checkbox/counter after clearing; existing queued writes/draft/undo retained |
| 08–09 summary/sharing | Complete | Working totals, observed PR types, comparisons, real elapsed or unknown time; local 1080px PNG export |
| 10 progression | Complete | Double/reps/load/manual modes, per-exercise increments/rests, conservative optional reduction after repeated misses; suggestions stay editable |
| 11 library | Complete | 40 built-ins + custom, original cues, metadata/mistakes and muscle/equipment/type filters; no unlicensed media |
| 12 substitutions | Complete | Pattern/muscle, equipment, goal/priorities, beginner support and recent-use ranking; temporary replacements keep their own baseline |
| 13–15 analytics/plateau/balance | Complete | Actual load/reps/frequency, matched-load records and cautious estimated strength; stable high-rep progress is not a plateau; direct/heuristic indirect sets |
| 16–17 calendar/adaptation | Complete | Explicit planned/completed/missed state; previewed rescheduling preserves saved routine and past sessions |
| 18 readiness | Complete | Optional per-field subjective check-in; missing values remain missing; conservative interpretation |
| 19–22 coach architecture/tools/local/backend | Complete | [Coach design/evaluation](COACH.md), [backend setup](../../server/README.md); authenticated HTTP/stub-provider tests |
| 23 live AI | Integration prepared | Real compatible provider path and consent UI; external host/credentials needed; no actual provider response evaluated |
| 24–25 proactive/weekly | Complete locally; cloud capable | Dismissible factual observations and week review, with adjustable style/detail; cloud depends on item 23 |
| 26 plan generation | Complete locally; cloud capable | Equipment/profile-aware proposal, edit names/exercises/sets/reps/rest/strategy/weekdays, approve before save/schedule |
| 27 natural language actions | Complete within whitelist | Active sets, substitution, shortening, schedule variant, plan creation, memory deletion; reject/stale/data-preservation tests; no arbitrary commands |
| 28–29 memory/styles | Complete | Explicit preferences inspect/edit/delete; inferred memory not transmitted; five styles keep the same numerical rules |
| 30 evaluation | Complete for local/contracts | No-data/progress/plateau/long-history/conflict/corruption/unsafe/rejection/deletion/adversarial fixtures; live-model evaluation remains pending |
| 31a–d builder | Complete | Duplicate/manual templates, draggable rows + accessible up/down, set targets/warm-ups/rests/groups; existing drop/failure logging retained |
| 32–34 goals/milestones/map | Complete | Lift/e1RM/cumulative workouts/body goals; weekly target from profile; transparent milestone criteria and image export; SVG map linked to performed sets |
| 35 plate calculator | Complete for available sizes | Exact integer-gram combinations and closest achievable load; assumes sufficient matching pairs, no finite quantity inventory |
| 36 haptics | Complete | Optional Vibration API enhancement with unsupported-device fallback; no iPhone vibration guarantee |
| 37 sync | Architecture complete | [Sync design](SYNC.md); not provisioned or implemented |
| 38 performance | Measured | Synthetic 1,500 sessions / 22,500 sets; cloud CPU results in `artifacts/performance-results.json`; no mobile timing certification |
| 39–40 accessibility/PWA/regressions | Tested with limits | Chromium layout/focus/labels/reduced-motion/offline/update/import checks; physical devices and complete WCAG audit pending |
| 41 release candidate | Prepared on improvements | QA, privacy, rollback and backend docs; no merge to main |

## Review the preview

Open https://jusumusu.github.io/GymBro2.0/preview/ . Confirm the PREVIEW banner. It cannot open the production database. Export a stable backup first; import a copy into preview if desired. Workouts entered in preview stay there. Turn off optional cloud mode to keep every coaching request local.

## Reverting code safely

Returning to the stable URL immediately returns to the stable journal. The stable `main` branch remains untouched. Prefer `git revert <specific upgrade commit>` on `improvements` and push; do not force-reset shared history. Deployable preview revisions must retain the isolation layer; composition fails if it is missing. To remove the preview, redeploy the stable workflow from `main` through the normal release path.

Keep a JSON backup before changing versions. The new build reads old native v1 backups and verified original v3 exports. New extension fields are additive, but stable 0.1.2 does not understand new built-in movement IDs and cannot import every preview-created backup. Advanced fields can also be dropped by an older plan editor. Do not use the stable app as a downgrade converter; use the untouched original stable journal/backup. Export preview data separately before removing a preview you trained in.

The preview workflow republishes the unchanged stable build at the root plus `/preview/`; byte checks protect root content. It shares the GitHub Pages environment and deployment concurrency. Branch protections may require the owner to allow `improvements` in that environment; they must not be bypassed.
