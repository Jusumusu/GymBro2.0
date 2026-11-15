# Gym Bro — Design study 02

**Selection complete:** Contour + Prism with selective glass and **B — Soft square** is implemented in candidate 0.4.0. See [implementation and QA](../IMPLEMENTATION.md). The studies below are retained as review history.

**Active review:** [Contour + Prism with glass](GLASS.md). The user approved the solid combination, then requested a glass treatment before app-wide styling resumes. Direction J is now the studio default; direction I remains the approved solid reference.

**Previous refinement:** the user likes Contour and Prism and requests a combination with a different dark mode. [Contour + Prism](HYBRID.md) is the active review, now the studio’s default. The three directions below are retained as references.

The user rejected the first five proposals and asked for something original, modern, clean and professional. Those proposals remain historical; their previous recommendation is withdrawn. This is a new review, with three fully rendered alternatives and no selected aesthetic.

Open `index.html` for the interactive studio, or `compare.html` for side-by-side rendered screens. Both are isolated documentation in the existing review branch. Public Pages publication is still subject to the github-pages branch restriction documented in the parent DEPLOYMENT.md; no new live URL is claimed.

| Direction | Composition and identity | Practical advantage | Trade-off |
|---|---|---|---|
| 01 — Contour | Graphite session ticket, vermilion details, DM Sans, deliberate open rows. A tightly organized weekly rhythm leads into the movement list. | Strong hierarchy and a clear start action; framed set grid with generous numeric inputs. | The most restrained and structured personality. |
| 02 — Prism | Manrope, a sculpted violet palette, asymmetric weekly summaries and a contained navigation dock. A different two-column library and rounded session treatments. | More expressive while remaining legible; large set inputs and a soft inset active marker. | Taller home composition and more visual presence. |
| 03 — Fieldwork | Mint and ink, a calendar-led journal, a date spine through the upcoming workout, and a divided numerical record. No large session card. | A direct path from date to exercises to start; calm, ruled logging rows with one active rail. | Quiet identity, with less overt athletic energy. |

Contour is the strongest recommendation for a focused workout tool. Prism is the more expressive alternative; Fieldwork is the quietest. These are design judgments from the rendered prototypes, not user-research results. The user can select a direction, combine specific elements, or request another revision. Nothing is automatically approved.

## Coverage

All three have Workout, Active Workout, Gains, Library, Schedule and Settings screens, in light and dark, phone and desktop formats. They use the same fictional Alex journal: 12 saved workouts; three sessions and 36 working sets in the preceding recorded week; a 60 kg × 10 bench reference; a 72→80 kg estimated-strength series; and planned sessions on November 16, 18 and 20. Scheduled sessions and completed historical work are labeled separately.

The UI uses Manrope and DM Sans, locally served under their included SIL Open Font Licenses. No external font services, stock photos or copied brand artwork are used. Existing app icon/logo assets are referenced, not replaced. The actual app's design and source fonts have not changed.

Each direction defines light/dark color, typography, spacing, radius, card, navigation, input, chart, semantic-feedback and active/completed-state tokens in `studio.css`. A sample confirmation/extra component catalog is outside this narrower direction revision; full secondary-screen and state implementation follows selection. The gallery includes real in-memory sample logging, input validation, navigation, catalog search, favorites and appearance switching. Other actions clearly announce that they are prototypes. No real journal, localStorage, IndexedDB, service worker, notification permissions or AI calls are used.

## Validation

`npm run test:design-round-two` passes 252 rendered layout checks: three concepts × two themes × six screens × seven widths/formats (320, 375, 390, 430, 768, 1024 and 1280 desktop). It also verifies font loading, all six palette contrast checks (body, secondary, primary-button and hero text ≥4.5:1), 44 px logging buttons, one active set, valid advance, invalid-entry rejection, search, favorites and storage isolation. No runtime errors or CSP violations were recorded. The comparison has a contained horizontal rail on phones.

Screenshots are under `artifacts/training-refinement/round-2`. The four `board-*` files compare the actual home/active interfaces in both themes. Each screen also has an individual capture and desktop version. Tests use Chromium emulation; physical-device validation follows final implementation. `npm run build:review` retains the approved main application unchanged at the root and places the candidate only under the isolated preview path.
