# 0.7.0 development audit

Baseline: released main `30b63d0`, 0.6.0; 198 available exercises, 219 definitions (21 unsupported tracking definitions remain inactive). Full immutable baseline is in catalog-baseline.json. Synthetic fixtures only.

Confirmed before changes:
- Recurring scheduled occurrences are absent from Weekly Check-In's legacy-only schedule matching.
- All five requested typo queries return zero results. Search is substring-only, in catalog order; a selected muscle filter is silently ignored during a query.
- Completed zero-added-load sets at their ceiling produce “0 more total reps”. Load-mode confidence and repeated-miss checks can use incompatible prior loads.
- Use load changes unfinished warm-up, drop, skipped and deferred rows along with working sets.
- The phone search input has 12px inner padding plus the containing frame's 10px padding. Its icon is hidden below 768px. Search icon is undefined and falls back to a dumbbell. Desktop geometry and both themes were captured at seven widths; no baseline horizontal overflow was found.
- Weekly performance comparisons include intentional lighter/shortened exposures; weight averages with just two entries per week can be promoted as a win without coverage or rapid-change context.

Preserve the existing missing-RIR behavior, explicit 0-RIR targets, 7.5% increment guard, manual choice, stored identities, supported tracking semantics, and all prior journal data. New analysis is deterministic, local, read-only and date-bounded. Historical reviews regenerate from saved facts and current preferences; they are not stored coaching snapshots.

Three Weekly Check-In layouts and three independently selectable glass levels will be rendered in paired light/dark review. No new layout or glass level is approved. Main remains unchanged; no merge is authorized.
