# Contour + Prism

The user likes Contour and Prism, requests a combination, and specifically dislikes Contour's dark mode. This revision combines the two as one concrete design for review.

## What comes from each

- Contour: session-first home composition, clear weekly rhythm, open exercise rows, compact active-workout heading, large tabular set inputs and a direct start action.
- Prism: Manrope typography, softer corners, tonal previous-performance panel, contained navigation dock and rounded exercise selectors.
- Light: a neutral paper background, graphite session ticket, warm coral action and fine active-set boundary. Soft lavender-gray secondary surfaces connect it visually to Prism.
- Dark: neutral charcoal background, plum surfaces and lavender actions/highlights. Contour's green-tinted background and brown active field have been replaced. The active row uses Prism's soft inset marker.

Shared dimensions and component structure make the two themes feel like the same application. Contrast is designed independently in each theme; light retains warm actions while dark uses lavender. Semantics are also expressed with text, selection markers and checks.

## Preview

The current studio defaults to the combined direction: `index.html?direction=I`. `hybrid.html` compares light and dark for each of the six screens. Previous directions remain available for reference. These are isolated, fictional-data prototypes; the actual app's final aesthetic has not been applied.

Coverage: Workout, Active Workout, Gains, Library, Schedule and Settings; phone and desktop; light and dark. Existing app icons and installed branding remain unchanged. No new services, dependencies or external font requests were added.

`npm run test:design-hybrid` passes 84 layout checks across the six screens, two themes and seven viewport/formats. It verifies Manrope loading, text/action contrast of at least 4.5:1 including the session-card action, one active row, 44 px logging buttons, valid completion, invalid-entry rejection, catalog search/favorites, and absence of journal storage, service worker registrations, CSP violations and runtime errors. It also captures both-theme comparison boards. Physical-device testing and full app implementation follow agreement on the combined design.

Individual `I-*` screenshots and `board-hybrid-*` comparison images are under `artifacts/training-refinement/round-2/`. Public Pages preview remains subject to the existing environment branch allowance; a successful build alone does not establish publication.
