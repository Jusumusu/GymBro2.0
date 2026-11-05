# Research and recommendation policy

Gym Bro's rules are **evidence-informed coaching heuristics**, not a clinically validated algorithm. The app supports general adult resistance-training journaling, not injury diagnosis, treatment, exact recovery scoring, or direct muscle-growth measurement.

## Source access

The environment's required HTTPS proxy refused connections during this build. No live publisher pages, reference apps, or full-text articles could be consulted. The established citations below are starting points from prior knowledge; their full texts and bibliographic details require independent verification before stronger efficacy claims. No proprietary interface or algorithm was copied.

The supplied ACSM 2026 reference, DOI https://doi.org/10.1249/MSS.0000000000003897, and supplied 2025 autoregulation review, DOI https://doi.org/10.1016/j.jesf.2025.07.006, remain **unverified**. Their existence, titles, methods, and findings must be checked. No algorithm threshold is attributed to these unverified sources.

## Research directions and product implications

| Reference | Broad interpretation | Implementation | Uncertainty |
|---|---|---|---|
| ACSM (2009), *Progression Models in Resistance Training for Healthy Adults*. https://doi.org/10.1249/MSS.0b013e3181915670 | Progression should reflect experience, goals, and performance. | Goal-specific ranges and small equipment-compatible increments. | Older guidance; does not validate this algorithm. |
| Schoenfeld, Ogborn & Krieger (2017), weekly volume and muscle mass systematic review/meta-analysis. https://doi.org/10.1080/02640414.2016.1210197 | Higher weekly volume can support hypertrophy on average. | Weekly direct challenging-set counts for review. | Individual tolerance, diminishing returns, and study populations vary. No automatic volume escalation. |
| Schoenfeld et al. (2017), low- versus high-load training meta-analysis. https://doi.org/10.1519/JSC.0000000000002200 | Hypertrophy can occur across loading ranges; higher loads favor strength specificity. | Strength, hypertrophy, endurance, and general-fitness defaults differ. | Exact ranges are coaching defaults, not universal optima. |
| Schoenfeld, Grgic & Krieger (2019), frequency and hypertrophy review/meta-analysis. https://doi.org/10.1080/02640414.2018.1555906 | Frequency distributes training; volume-equated benefits are less clear. | User-controlled schedule and editable splits. | More sessions do not prove better growth. |
| Refalo et al., proximity-to-failure and hypertrophy review/meta-analysis. https://doi.org/10.1007/s40279-022-01784-y | Effort matters; universal failure training is not established as necessary. | Optional RIR and conservative failure handling. | RIR is subjective and imperfect, especially for beginners. |

## Original engineering decisions

These exact rules are **unvalidated heuristics**, auditable in `src/engine.js`:

- No history means no prescribed weight. Starting loads come from the user. Each exercise ID has its own history; substitutions never inherit a different exercise's baseline.
- Goal defaults: strength 3–6, hypertrophy/balanced/recomposition/fat-loss 6–10, endurance 12–20, general fitness 8–12 reps. Isolation exercises usually start at 8–12 or higher. Existing plan targets remain editable and are not silently rewritten on goal changes.
- Beginners start with two working sets, others three. Session time limits exercise count. These are starting templates, not exact physiological prescriptions.
- Only explicitly completed non-warm-up sets count. All target sets must reach the rep ceiling at a uniform load before increasing. Missing minimum reps, incomplete prescribed sets, failure-set types, or RIR <1 block increases.
- Missing RIR requires two ceiling exposures. Otherwise, the next available increment is suggested when it is ≤7.5% above the previous load. That cap is a coaching guardrail, not a proven safety threshold. Users can edit equipment increments and all actual loads.
- Readiness ≤2/5 blocks progression. Three declining comparable exposure scores prompt a workload review; four stable exposures suggest a possible plateau. These are not diagnoses. No plan is forced to change.
- Breaks ≥21 days suggest 90% of prior load; ≥42 days suggest 80%, rounded down to the available increment. Very small loads may round to zero; users choose and override. Historical records remain intact.
- Epley estimate: `kg × (1 + reps / 30)`, for externally loaded sets of 1–10 reps only. Not a tested max, not valid across equipment, not an estimate of total bodyweight-lift strength.
- Weekly direct sets include non-warm-up sets at 0–4 RIR or unknown effort. Unknown effort is an assumption. Secondary involvement is separately estimated at 0.5 sets per set, **not an exact scientific multiplier**.
- Body-weight rolling averages use actual recorded measurements only. Weight change does not distinguish fat, muscle, water, or other tissue.
- Confidence means completeness: limited by default, moderate after ≥3 exposures with complete last-exposure RIR. It is not a calibrated probability or research evidence grade.

The app does not use unvalidated machine learning, infer hypertrophy from tonnage, force deloads, or publish invented strength standards. Dynamic volume adaptation remains a follow-up.

## Required research follow-up

Verify the supplied 2025/2026 DOIs, review full texts and current consensus, obtain an independent exercise-science review, investigate load- versus repetition-progression trials, validate RIR reliability assumptions, and prospectively evaluate the rules. This document is an honest source-and-uncertainty record, not a completed systematic review.

## 0.2 preview rule changes

Double progression remains the default. Per-exercise increment/rest overrides and reps-only/load/manual modes are optional. Conservative load mode can offer one small increment after two exposures and all minimum reps with reported RIR ≥3; the 7.5% jump guardrail and effort/missed-target checks remain. Reps-only mode does not increase load. After two minimum-target misses, an optional equipment-rounded lighter candidate is offered only within 15% of prior load; it is never applied automatically. These thresholds are coaching guardrails, not proven individualized optima.

Four identical exposures can prompt plateau review; increasing actual reps above ten is still progress even though e1RM is deliberately limited to 1–10 reps. Performance records distinguish observed working load, reps at matched load and estimated strength; the first observation establishes a baseline, and repeated exercise blocks yield at most one record event per exposure. Recent repeated misses prevent an immediate rebound load increase.

Readiness fields are subjective and individually optional. Missing fields remain null, not an assumed middle or low score. Low reported energy/high fatigue can suppress a progression increase, without calculating a recovery percentage. Muscle distribution uses performed challenging working sets, with 0.5 secondary-set estimates explicitly labeled as heuristics. Local and cloud coach language must preserve these distinctions; live LLM quality has not been evaluated.
