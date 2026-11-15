# Five directions for Gym Bro

**Historical review — rejected by the user.** The active review is [Design study 02](round-2/README.md). The recommendation below belongs to the rejected first study and is withdrawn.

These are original, working HTML prototypes, not the final app redesign. Open `gallery.html` from the built development site. Use Direction, Appearance, Screen and Preview width. `comparison.html` displays rendered screens from all five prototypes side by side, with shared screen/theme controls and a swipeable rail on phones. The gallery offers six required screens plus Focus Mode, Training Blocks and Component States. Sample set logging, search, favorites and dialogs run in memory only. Other actions are explicitly mocked. No journal storage, service worker, permissions or AI calls are used.

All directions share the same fictional Alex journal: 12 saved workouts, 36 weekly working sets, three weekly sessions, and bench press at 60 kg × 10. All support light and dark. Native system fonts keep the gallery fast without third-party font requests; their precise appearance depends on the device.

| Direction | Philosophy and strength | Practical advantage | Trade-off | Recommendation |
|---|---|---|---|---|
| A — Monochrome Performance | Geometric, high-contrast type, flat open rows and precise rules. | Efficient scanning; low visual noise; clear active and completed sets. | Can feel severe; less expressive semantic color. | Choose for maximal restraint and logging clarity. |
| B — Modern Athletic | Cobalt identity, bold italic headings, session-first banner, selected navigation capsules. | The next action is prominent; well suited to quick phone use. | Large headings need restraint on dense screens. | **Recommended overall:** the strongest balance of athletic character, readability and familiar controls. |
| C — Soft Premium | Warm paper and botanical tones, serif headings, spacious tonal cards, contained dock. | Welcoming and comfortable; calm feedback and clear form groups. | More vertical scrolling and a less energetic identity. | Choose for an approachable everyday journal; closest to existing warmth. |
| D — Technical Performance | Navy/teal palette, compact outlined information, monospaced headings and numerical fields. | Best for comparing targets, loads and prior performance; compact desktop rail. | More information to scan; secondary data should stay collapsed in implementation. | Choose when training analysis is the priority. |
| E — Editorial Minimalism | Serif-led hierarchy, open sections, rust accents and text-led navigation. | Most distinctive identity; generous spacing separates actions. | Longer screens and less conventional set-table presentation. | Strong creative alternative if brand differentiation matters most. |

These are qualitative design judgments from rendered prototypes, not user-study results. B is strongest for workout speed; E for originality; C for approachability; A for simplicity; D for information comparison. All have a coherent path across simple and dense screens. Each uses worded feedback and checks as well as color, visible keyboard focus, and primary controls of at least 44 px. Measured body, secondary and primary-button text contrast exceeds 4.5:1 in every palette. This is a focused contrast check, not a claim of complete accessibility certification.

Each concept defines primary/secondary accents, light/dark background/surface/text colors, type pairing, spacing, radii, controls, navigation, chart, active/completed rows and dialog/feedback treatments in `gallery.css`. The gallery's system cards summarize those choices. The Component States screen demonstrates loading, empty, success, error and an operable sample confirmation dialog.

## Selection checkpoint

Select A–E, combine specific elements, or request revisions. No final aesthetic is selected. No installed app icon or logo has been replaced. Following selection, apply the approved tokens and patterns across the complete real app, then repeat mobile, keyboard, offline, update and data-preservation checks. This branch contains only independent training fixes and the existing-style highlight correction in the real app.

## Evidence

The rendered gallery screenshots are under `artifacts/training-refinement/gallery/`, named by direction, theme and screen. Each is a full capture of the prototype itself. Desktop home examples use 1280 px browser viewports. Interactive previews are preferable for inspecting the full set table and different screen widths.

Actual-app before/after highlight screenshots and measured geometry are in `artifacts/training-refinement/`. At 390 px, the former row had 0 px left inset and the completion control protruded 6 px right. The corrected row has 9 px on each side and 9 px vertical spacing around inputs. It preserves the existing accent and interaction model.
