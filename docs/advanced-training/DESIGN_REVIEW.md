# Initial visual review — approval required

Concept A selected; final application UI implemented on the feature branch. The original comparison below is retained for provenance. The user's BRIEF.md requires three visual options and explicit selection before implementation; it permits independent technical work to continue. Source fragment: design-review.html. All figures, dates, counts and weights in the prototypes are synthetic examples, never actual user history or computed recommendations. Buttons demonstrate interaction only; no export, logging, notification or timer functionality is represented as complete.

## A — Quiet focus (recommended)

One dominant task per screen, with secondary options behind a compact supporting surface. Large set inputs and complete-set button, one recent note and an optional timer. Blocks use one current-week card and the existing schedule below. Shortening uses a concise retained/reduced/deferred summary. Feedback uses a bottom sheet. Backups separate local persistence from verified file evidence. Calendar export keeps only scope and reminder choice primary.

Advantages: least clutter, comfortable mobile targets, closest fit to the existing restrained Gym Bro typography, green/lime palette and rounded surfaces. Drawback: detailed comparisons and advanced program settings need an extra action.

## B — Performance desk

Comparative information remains visible: previous/current exercise results, a compact superset overview, weekly block targets, original/proposed estimates and itemized export/backup state. Feedback and history are reviewed together.

Advantages: fast inspection and fewer drill-downs for experienced users. Drawback: denser phone screens and more competing information during workouts.

## C — Guided flow

Task sequences organize each screen: prepare/log/recover, choose/review/confirm, select/export/import. Blocks use a phase timeline; notes use a short prompted sequence.

Advantages: clear next action and good onboarding for backups and calendar imports. Drawback: more steps for routine users; slower repeated set logging than A.

## Review controls

The conversation carousel switches concepts. Each phone has a feature selector covering all six areas and System/Light/Dark appearance. All share realistic 390px phone geometry and reflow down to 320px. The standalone fragment intentionally relies on conversation carousel navigation; it is not an app preview or a hosted production build.

Choose A, B or C, request adjustments or combine elements. Recommendation: A as the shared system, optionally using B's compact previous/current performance comparison inside Focus Mode. This recommendation is not an approval record.

## Evidence

Chromium captures for 3 concepts × 2 themes × 6 features are in artifacts/advanced-training. Automated overflow checks cover 320, 375, 390, 430, 768 and 1024px; actual screenshots use a mobile viewport meta tag. The review has no IndexedDB/localStorage writes. Format or desktop browser checks do not establish physical-device behavior.

## Approval record

On November 14, 2026, after the three concrete alternatives were shown, the user replied **“A”**. Quiet focus is the approved direction across all six features. Implementation uses the established app typography/theme tokens, spacious focus controls, one main task per card, compact supporting details and a mobile feedback bottom sheet. Backup & Data appears near the top of Settings for visibility. The rest timer remains optional and accessible; detailed calendar window/time-zone choices support the required export semantics. No material departure from the selected direction is intended. Main merge approval has not been given.
