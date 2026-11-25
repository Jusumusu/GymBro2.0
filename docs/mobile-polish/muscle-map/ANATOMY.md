# Original anatomy studies for visual review

These are four alternative designs, not a replacement for the released muscle map. No design has been selected. The prototype imports no application controller or storage module, opens no IndexedDB database, and uses the same fictional weekly counts and qualitative row example for every concept. The installed logo and app icons are unchanged.

## Original construction and rights

All body outlines, muscle paths, segmentation, gradients and UI framing in this directory were drawn specifically for this Gym Bro review. No medical illustration, stock figure, photograph, proprietary model, downloaded path set or flattened anatomical image is embedded or traced. The source SVG geometry is editable in `anatomy-review.js`; there are no external image dependencies or new software packages. The existing Manrope and DM Sans font files retain the project's existing font licenses.

The scaffold uses an approximately 7.6-head adult proportion, a shared neutral pose, balanced shoulder/waist/hip relationships, elbows near the waist, fingertips near the upper thigh, differentiated knee and ankle contours, and coherent anterior/posterior views. Human proportions naturally vary. These are simplified fitness illustrations, not diagnostic or clinically validated medical figures.

## The four alternatives

| Concept | Visual approach | Strength | Tradeoff |
| --- | --- | --- | --- |
| A — Essential anatomy | Fine silhouette, broad uninterrupted regions, restrained flat fills | Least visual density; easy to read; smallest geometry set | Shoulder and thigh heads are intentionally grouped |
| B — Clinical detail | Clavicular/sternal pectoral regions, deltoid heads, abdominal segments, superficial quadriceps heads, posterior hamstring/calf subdivisions and tendon landmarks | More descriptive surface anatomy and clearer regional boundaries | Smaller regions need the accessible name picker on a compact phone |
| C — Athletic atlas | Flowing chest, shoulder and thigh contours with larger primary regions; modest anatomical landmarks | Recommended balance of credible proportions, direct interaction and mobile readability | Simplifies deeper anatomy and detailed individual muscle heads |
| D — Sculpted form | More segmented superficial anatomy on a body shaded with local SVG gradients | Dimensional surfaces remain sharp, independently selectable and lightweight | More SVG paint definitions and a stronger visual presence |

C is the recommended direction. A is a good choice for the quietest interface; B favors descriptive detail; D favors depth. The difference is in region construction, segmentation, contours and surface modeling, not four colors applied to one unchanged illustration. All share the anatomical coordinate scaffold for a fair proportional comparison.

## Anatomical decisions

The model distinguishes pectorals, deltoids, biceps, lateral triceps, forearms, rectus abdominis, obliques, glutes, quadriceps, visible adductors, hamstrings, calves and spinal erectors. B and D separate only selected superficial heads; hidden/deep anatomy is not represented as if it were visible on the surface. Anterior calf highlighting is limited to the lateral calf contour rather than labeling the entire front of the shin as gastrocnemius. Untracked shin landmarks remain noninteractive.

Upper trapezius extends from the lower neck toward the shoulders. Middle trapezius occupies the central scapular region, and lower trapezius narrows toward the lower thoracic region. The three are labeled separately in the posterior illustration. The small upper-trapezius shoulder slope is also visible from the anterior view. This follows the broad location and upper/middle/lower organization described by [OpenStax, Muscles of the Pectoral Girdle and Upper Limbs](https://openstax.org/books/anatomy-and-physiology-2e/pages/11-5-muscles-of-the-pectoral-girdle-and-upper-limbs) and [NCBI Bookshelf, Anatomy, Back, Trapezius](https://www.ncbi.nlm.nih.gov/books/NBK518994/).

The trapezius contributes to scapular motion and stabilization; upper, middle and lower fibers have different mechanical roles. A diagram subdividing the shape cannot establish separate measured training totals or precise activation percentages. The [anatomical/kinesiologic review of trapezius](https://pmc.ncbi.nlm.nih.gov/articles/PMC6849087/) is useful context for avoiding that inference. These sources informed anatomical facts, not copied or licensed illustration assets.

## Stable data mappings

The current app has fourteen canonical contribution groups. Every concept uses those same fourteen group names across its front and back views. No `Traps`, `Upper traps` or other incompatible historical category is introduced.

| Visible region | Existing group | Behavior |
| --- | --- | --- |
| Upper, middle and lower trapezius; visible scapular area; lats | `Back` | Selection outlines the existing Back group. No separate trap/lats history is inferred. |
| Rectus abdominis | `Core` | Display label is Abdominals; stored identity remains Core. |
| Quadriceps subdivisions | `Quads` | Display label is Quadriceps; existing contribution grouping remains. |
| Lumbar erector region | `Spinal erectors` | Remains distinct from Back. |
| All other regions | Existing corresponding group | Bilateral regions share one canonical muscle identity. |

The actual catalog already classifies `gb-db-shrug` and `gb-bb-shrug` with Back as primary; rows have Back primary with arm/shoulder/forearm contributions; conventional `deadlift` and `gb-trap-deadlift` include low Back stabilization. Those facts were checked in `src/exercise-catalog.js`, `src/muscle-contributions.js` and the resolved `library()` definitions. Trap involvement is therefore not globally absent.

Some hinge variants such as `rdl`, `db-rdl`, `gb-stiff-leg-deadlift` and `gb-sumo-deadlift` do not currently carry a separate Back stabilization entry. Their existing spinal-erector/forearm entries must not be silently reinterpreted as trapezius work. A future contribution audit may consider a conservative Back stabilizer classification for appropriate variants, using the established ordinal scheme and preserving stable exercise IDs. These review files change no exercise classification or saved historical record.

An aggregated Back total cannot identify which of its anatomical subregions performed all the recorded work. The prototype says this beside the figures and in Back details. If a selected design is implemented, this limitation must remain explicit; a fully separate trap history would require an approved compatible data/mapping design.

## Interaction and visual states

- Neutral anatomy has no training color. Selected muscles use a separate dashed outline.
- Weekly activity uses a consistent fictional work fixture. Fill indicates relative recorded work, not recovery, growth, or a measured physiological activation.
- The row example distinguishes primary Back, hatched secondary Biceps/Shoulders and subtler stabilizing Core/Spinal erectors/Forearms. It illustrates the existing broad groups, not an EMG map.
- Bilateral regions select their canonical group together. Selecting Chest cannot select Shoulder, Back or another canonical group.
- SVG paths are independent keyboard buttons with an accessible name and pressed state. Enter/Space toggles selection and retains keyboard focus.
- Fourteen named buttons provide a full-size alternative to narrow anatomical regions, including deeper/small groups that cannot be given a 44px figure target without overlapping unrelated anatomy.
- Front/back tabs and light/dark controls are functional. Reduced Motion disables decorative color transitions.

## Local and embedded use

`index.html?concept=c&theme=light&state=trained&selected=Back` opens the recommended study. `concept=a|b|c|d`, `theme=light|dark`, `state=neutral|trained|exercise`, optional `selected=<canonical group>`, and `side=front|back` are supported. `sheet=1` renders matched front/back neutral, selected and trained panels. `window.muscleReviewReady` is set after initial rendering.

`anatomy-review.js` exports `renderAnatomy({concept, side, state, selected, theme, interactive})`, `regionsFor(concept, side)`, `conceptInfo`, canonical names and the fictional fixture. Include `anatomy-review.css` when embedding a figure. All paints use SVG presentation attributes or external CSS; the review does not require inline-style CSP exceptions.

## Executed verification

The reproducible browser command is `node tests/browser-mobile-polish-muscle-review.mjs`. It tests the original review SVGs using the repository's existing Chromium helper and a fresh browser profile. Exact results and actual screenshots are written to `artifacts/mobile-polish/muscle-review/results.json`.

The geometry audit samples all eight front/back maps on a 3-coordinate-unit grid and rejects overlapping fills belonging to different canonical muscles. It also checks all fourteen groups and upper/middle/lower trapezius identities. This is a useful hit-region regression, not a proof of clinical anatomical accuracy or every subpixel boundary.

Browser QA covers actual touch input, keyboard state/focus, fixed canonical selection, distinct contribution fills, eight responsive widths in both themes, source CSP-compatible paints, no journal databases and reduced motion. Matched comparison sheets show neutral/selected/trained front/back figures for each concept/theme; 390px screenshots show the model in the current Gym Bro page context. These are browser screenshots of the real prototype, not generated pictures of an interface.

No physical iPhone, Safari/WebKit engine, Android device or installed Home Screen PWA was available for this review. The figures have not received professional medical-illustrator or clinician validation. Final anatomy, branding or visual integration remains pending explicit user selection.
