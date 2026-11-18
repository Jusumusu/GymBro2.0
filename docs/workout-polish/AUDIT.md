# Workout polish audit and implementation boundary

Baseline: released main `5fd52d1703f7cabb81e54218f5ddbae80c79f4d2`, app 0.5.0. Work is confined to `feature/workout-polish-exercise-library`. Main is not authorized for this update.

## Timer investigation

The existing timer already persists an epoch deadline in the active draft. Screen changes and refresh do not reset that deadline; `remainingRest` clamps expired timers to zero. Manual start and normal countdown worked in the baseline Chromium run. Automatic start is explicitly controlled by the existing profile preference; supersets wait for a completed round. The existing interface has adjustment and stop, but no pause, resume or reset.

An initial lifecycle hypothesis was rejected by the browser evidence: the old repaint interval is cleared on pagehide, but the app deliberately reloads on a persisted pageshow to reacquire its single-writer lock. Dispatching those events caused a real reload and a correctly recovered countdown. The baseline evidence therefore does **not** demonstrate the user's reported failure, and no unsupported root-cause claim is made. A physical-device reproduction remains useful. No device/browser details were supplied.

Prepared repair: explicit persisted pause duration, exact-millisecond resume, original-duration reset, bounded adjustments, backward-compatible metadata validation and one lifecycle-aware repaint interval. The writer-lock reload protection remains. New controls are demonstrated in the review package; their final appearance and app integration await selection. The timer needs no notification backend and cannot promise delivery while the app is closed.

## Charts

All seven applicable date-based charts use `ui.chart`: estimated exercise 1RM, body weight, body measurements, weekly load × reps, weekly session frequency, working reps per exposure and highest recorded working load. The current graph has native SVG titles and a latest-12 table; it lacks continuous touch, mouse and keyboard inspection. Muscle distribution bars and completion rings are aggregates, so point inspection is inappropriate there. There are currently no multi-series date charts.

A shared immutable model and pointer/keyboard adapter are prepared independently of the final layout. They select original points, retain per-series labels/units, leave missing observations as gaps, space dates by elapsed time and bound path drawing for large histories without discarding inspection records. Existing chart/statistics producers remain unchanged until visual approval.

## Focus Mode

The stored completion flag and active-set selection already cover warm-ups, skips and supersets. The current set chooser only renders small numbered chips and a checkmark. Completed chips have no distinct success class, and a selected completed set uses the same selected styling as a pending set. The review shows completed, one current and upcoming sets together, including logged load/reps and editable completion.

## Plan creator

This is a native dialog, not a separate route. It already supports exercise search, ordered rows, sets/rep ranges, warm-ups, rest, progression, supersets, per-set targets, save/edit/delete and keyboard reorder. Search temporarily hides the form, preserving its inputs. The current layout mixes a standalone exercise picker, ordering buttons, a three-column grid, advanced disclosure and remove action without a consistent row hierarchy. At narrow widths long names compete with these actions. Closing a dirty dialog currently discards unsaved edits without a guard. The three concepts preserve every setting and demonstrate a keep-editing/discard guard.

## Catalog

The reproducible baseline is in `catalog-baseline.json`: **43** built-ins, **5** equipment types, **14** canonical muscle regions. No direct-primary entries exist for forearms, obliques, adductors or lower back. Some common variations are absent; aliases are maintained separately from most records. Existing IDs/order, ordinal contribution classifications, custom-overrides-by-ID and the original 40 protected legacy IDs must remain stable. Ordinal muscle weights are coaching classifications, not activation or hypertrophy percentages.

## Approval

`review/` contains three isolated, interactive combined options in both themes: A Inline precision (recommended), B Field notebook, C Session console. These use fictional data in memory, import no storage/controller module and install no worker. Screenshots under `artifacts/workout-polish/concepts/` were rendered in Chromium at 390px. All three plan layouts were checked at 320, 375, 390, 430, 768, 1024 and 1440px. These are browser emulations, not physical iOS/Safari certification.

Final visual integration and all-five-feature acceptance remain pending the user's explicit selection. Earlier Aero approval does not select a concept for this update.
