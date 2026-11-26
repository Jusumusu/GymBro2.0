# Interactive chart repair

## Confirmed causes

Released main `234c6f1ef1226b47a032c69897a9a1ad3b6c7873` / 0.8.0 contains a complete-looking inspector module, but the real app still calls a separate static `chart()` renderer. The body, Gains and muscle-history graphs were SVGs with native `<title>` dots and no pointer readout. The inspector was used only in an earlier design study. Against the exact archived preview build `539371b238f9`, a real touch swipe found two body graphs, zero point inspectors and zero readouts; evidence is in `artifacts/mobile-polish/charts/baseline.json` and `before-static-touch.png`.

Actual native touch testing also exposed a latent defect in the existing inspector: touch begins with implicit pointer capture on an SVG child. When horizontal dragging transfers capture to the plot, the child's `lostpointercapture` event bubbles to the plot. The old handler treated that transfer as the end of the whole drag, so subsequent moves stopped updating the selected record. The corrected handler ignores descendant capture-transfer events and still ends/cancels the actual plot gesture normally. The continuous-drag browser check failed before this correction and passes after it.

## Implementation

The real `chart()` now uses the shared immutable inspection model and embeds the exact source data. It retains the approved Aero line, area, axes, captions and recorded-values table. The local readout shows the stored date, value, unit and series. Dates use elapsed-time positions, selection snaps to real records, missing values remain gaps, single-point charts remain usable and same-date series are chosen by vertical proximity. No interpolated measurement is presented as recorded data.

A plot-specific `touch-action: pan-y pinch-zoom` allows normal vertical page scrolling and pinch zoom. Horizontal finger movement owns only that chart. Mouse hover/click and keyboard arrows, Home/End and Page Up/Down expose the same records. The readout is bounded inside its plot with pointer events disabled so it cannot intercept a drag. Pointer moves coalesce geometry/selection work into one animation frame.

`createChartInspectors()` hydrates current markup and releases observers/listeners from removed charts. App rendering and lazy analytics insertion call its `sync()`; page exit calls `stop()`. The app integration was coordinated with the workout engineer so both changes share the existing render lifecycle.

All existing graph callsites use the same renderer:

- Gains: estimated strength, weekly logged load × reps, session frequency, working repetitions and recorded working load.
- Body: recorded weight and selected measurement, including pound/inch conversion from retained kilogram/centimeter records.
- Muscle map: selected-muscle weekly direct/secondary contribution history. The existing model/visual is retained pending the new anatomy selection.

The chart renderer uses the existing min/max drawing buckets while retaining every exact inspection record. A synthetic 50,000-point source produces 641 SVG circles instead of 50,000; generated markup is about 1.76 MB instead of 10.18 MB. `large-history.json` records a local Node string-render observation. Its timings are not a mobile benchmark or a pass/fail threshold.

## Executed verification

- `node --test tests/mobile-polish-charts.test.mjs tests/chart-inspection.test.mjs`: **10 passed** (five new app-renderer cases plus five existing inspector cases).
- `node tests/browser-mobile-polish-charts.mjs`: **10 passed**, **16 light/dark layout cases** at 320, 360, 375, 390, 414, 430, 768 and 1024 px.
- Native CDP touch dragging continuously selected real weights and dates, including irregular/sparse dates and both ends of the chart. Fractional measurement values remained exact.
- Pound/inch readouts match conversion of the saved kilogram/centimeter records. Native vertical touch over the plot scrolls the document; horizontal inspection preserves the document position.
- Mouse hover and keyboard access pass. Actual Gains charts, lazy detailed analytics and selected-muscle history all respond to touch.
- Same-date multi-series input exposes each series independently. Pure cases cover missing/empty/negative/single-point data, safe encoding and bounded long-history drawing.
- Tooltip geometry stays inside the viewport in every measured layout. No uncaught browser exceptions; history, weights, measurements, plans, custom exercises and photo metadata remain unchanged.

The tests used fresh Chromium profiles with synthetic data. Viewport/touch emulation is not physical iPhone, WebKit or Android certification. No real personal records were used. Screenshots and machine-readable results are in `artifacts/mobile-polish/charts/`.

To run against the final composed candidate, use `npm run build:review` then `node tests/browser-mobile-polish-charts.mjs`. For an isolated root, set `GYMBRO_CHART_ROOT` to a directory containing `/preview/`. `GYMBRO_CHART_BASELINE=1` captures the archived static-chart comparison; it is not a successful repaired-app test.
