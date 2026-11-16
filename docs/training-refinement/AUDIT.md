# Training refinement audit

Base: main `636b90630ff996aaab6457c5b8b2e701d01d372f`, released 0.3.0. New branch: feature/training-refinement-visual-redesign. Initial workspace clean; remote only main. No previously canceled feature proposal is being revived. Existing 0.3.0 features are preserved.

## What effort actually means

`src/model.js` stores optional RIR (0–10 or null) per set. The logger and Focus Mode collect it manually; the app does not calculate it. `src/engine.js` calls missing RIR “without effort ratings”. No independent Effort Rating field or resistance-training RPE field is present. Historical unknown/import metadata is retained. RIR estimates additional possible repetitions; resistance-training RPE roughly maps 10/9/8/7 to RIR 0/1/2/3 but is not another measurement to collect.

`draft.readiness` is a separate optional workout-level 1–5 subjective check. `upgrade.readiness` keeps optional sleep/energy/soreness/fatigue/motivation values. Low current readiness or low energy/high fatigue suppresses an increase. This is not an RIR/RPE conversion or recovery percentage. Exercise feedback such as “unusually difficult” is a separate private note and does not secretly override set RIR.

## Why “repeat” appears

The double-progression engine requires completed non-warm-up sets, all prescribed sets, uniform load, all reps at/above the current ceiling, no RIR below 1/failure flag, no recent repeated minimum-target misses, no low readiness/long break, and the next increment within a 7.5% heuristic. Rep-only/manual modes do not raise load. Missing optional RIR additionally requires a second ceiling exposure. This is intentional prior behavior, but contradicts the new requirement and makes optional input behave as a gate. The message is ambiguous about next-session advice versus repeating work now.

The recommendation function is read-only. Applying a suggested load is an intentional logger action affecting unfinished sets; it does not append sets/exercises or edit plans. Creating new work is a separate intentional action. That separation will be tested.

Other confirmed issues: drop sets are included in progression comparisons even though their lower loads/reps may be intentional; mixed working loads reaching the ceiling fall through to a misleading “build repetitions” message. Explicit block RIR targets are displayed but not passed to the progression engine. Recent exposure comparisons do not check whether older rep targets changed before labeling repeated misses.

## Authorized refinement

Remove the missing-RIR repeat requirement; lower stated confidence and explain uncertainty. Retain conservative 0-RIR/failure handling by default, without requiring sets to feel “easy”; 1+ RIR can progress unless an explicit current target is higher. Apply existing block RIR targets to guidance without new storage fields. Use working/failure sets for progression and retain drop/warm-up data for analytics/history. Compare prior misses against their recorded prescriptions where available. Explain mixed loads, remaining ceiling reps, rep-only/manual mode, readiness and large increments precisely as next-session guidance. Keep the existing small-increment guardrail and user override. Preserve old data without migrations.

## Layout investigation

The actual highlight is `.set-row.active-set`, not an outer exercise frame: a zero-inline-padding six-column row has an inset outline at -1px and only 3px mobile gaps. It wraps tightly around inputs/button boundaries. `.exercise-card.active-exercise` exists as legacy CSS but the current logger does not apply that class; it is not the live source of the frame. Measure the real row/input/card geometry before changing it. Keep one authoritative active set; correct padding/grid sizing symmetrically without introducing a new exercise selection model.

## Design gate and infrastructure

Prepare five complete isolated design systems covering the six requested screens, light/dark mode and a shared fictional journal. Gallery interactions are explicitly mocked, with no app database, localStorage, worker, permissions or external services. Actual development app retains existing appearance until selection. Preview composition keeps approved main byte-identical at root and candidate only under /preview/. Existing environment restrictions may need the owner to permit the newly named branch; never claim a URL until actual publication succeeds.
