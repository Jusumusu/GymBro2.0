# Approved C — Athletic Atlas integration

The user selected `Weekly B · Anatomy C · Identity D · Settings B` on November 25, 2026. This change integrates the reviewed C model into the actual muscle-map route. It is not the review demo overlaid on the app and has no runtime dependency on documentation, fictional fixtures or review controls.

## Production implementation

`src/anatomy.js` contains the exact original C paths copied from the approved review: the 320 × 680 scaffold, head, anatomical landmarks and 24 anterior / 24 posterior selectable regions. The geometry, relative proportions and C contour style are retained. Fourteen existing canonical muscle groups remain unchanged. All upper, middle and lower trapezius regions retain `Back`; there is no new trap history, exercise identifier, data schema or migration.

`src/muscle-map.js` renders that geometry using the existing real journal analytics. Every region's intensity comes from the existing `muscleSets` and `muscleIntensity` calculations. Selection adds the independent dashed outline. A selected untrained muscle keeps its neutral fill; choosing a muscle does not fabricate trained work. Warm-ups and skipped sets remain excluded by the existing analytics.

The detail panel retains actual direct/secondary/stabilizing totals, recorded recent exercises, six-week trend chart, clear selection and all fourteen name controls. The existing controller still switches anatomical sides and selects the canonical group; changing side clears selection as it did before. The aggregate warning explicitly names upper/middle/lower trapezius and says separate historical Back-subregion totals are not inferred.

`src/anatomy-atlas.css` is included by the app entry point after existing styles. It scopes the approved C neutral body, blue activity shades, dashed selection and fine anatomical landmarks to `.atlas-map`. It also faithfully integrates the reviewed front/back segmented treatment, replacing the legacy green selected underline on this control. The rest of the Aero palette/material and app controls are unchanged. The stylesheet respects Reduced Motion and supplies full-size named touch alternatives for narrow anatomical regions.

## Data protection

Map selection, clearing, front/back switching, name selection and keyboard interactions use the existing transient UI state. They do not commit or migrate the journal. Browser QA instruments actual IndexedDB state transactions and observes zero writes during map interactions, while checking exact retention of history, plans, custom exercises, active draft values/RIR/notes, timer and preferences. Separate preview storage and the existing worker/cache scope remain in force.

The existing catalog mappings are deliberately preserved: recorded rows and shrugs contribute direct Back work; conventional deadlifts contribute the existing ordinal stabilizing Back units. An integration fixture with two completed working sets each for shrug, row and deadlift produces four direct Back sets and 0.2 stabilizing units; completed warm-up rows are excluded. Neither the figure nor its UI invents separate measured trap activation percentages.

## Executed verification

- `node --test tests/mobile-polish-atlas.test.mjs`: four new tests pass, covering exact approved-C geometry/canonical identities, neutral versus selected state, actual analytics/Back totals, safe invalid inputs and escaped custom names.
- `node --test tests/mobile-refinement.test.mjs tests/mobile-polish-atlas.test.mjs`: all 24 new and retained tests pass.
- `node tests/browser-mobile-polish-atlas.mjs`: eight actual-app browser checks pass. The script builds and serves an isolated source snapshot under `work/mobile-polish/atlas/`, leaving the shared root build untouched.
- Actual native Chromium touch selects only Chest or Back; Enter/Space retain focus and viewport position; name selection and fourteen minimum-44px controls remain functional.
- All three trapezius subdivisions select canonical Back and expose the real history/trend. A native Path2D grid audit samples 29,520 positions across both production maps and finds no fill overlap belonging to different canonical groups.
- Thirty-six actual app layouts cover front/back in light/dark at 320, 360, 375, 390, 414, 430, 768, 1024 and 1440px, with correct aspect ratio and no horizontal overflow. Actual 390px and 1440px screenshots are recorded for both views/themes.
- Empty history shows neutral selected muscles and zero totals. Reduced Motion disables region transitions. The new model and stylesheet reopen offline with the full saved journal. Browser exceptions: zero.

Evidence is in `artifacts/mobile-polish/atlas/results.json` and the accompanying screenshots. `viewportWidth` distinguishes the browser viewport from the rendered SVG's `width`.

The artwork is original to Gym Bro; factual construction references and the anatomy limitations are documented in `docs/mobile-polish/muscle-map/ANATOMY.md`. The model is an illustrative fitness interface, not a diagnostic medical atlas. Chromium QA does not certify a physical iPhone, Safari/WebKit, Android or installed PWA. No main merge is authorized for this feature branch.
