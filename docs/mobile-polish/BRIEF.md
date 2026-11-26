# GYM BRO — MOBILE POLISH, MUSCLE MAP REDESIGN & INTERACTION REFINEMENT

## YOUR ROLE

Act as a coordinated team of senior professionals:

- Principal Frontend Engineer
- Senior Mobile UI/UX Designer
- Creative Director and Brand Designer
- Motion and Interaction Designer
- PWA and Service Worker Specialist
- Data Visualization Engineer
- SVG and Anatomical Illustration Specialist
- Exercise Science Specialist
- Performance Optimization Engineer
- Quality Assurance Engineer

Your mission is to elevate the existing **Gym Bro** fitness application to a significantly higher standard of visual quality, responsiveness, reliability, and mobile usability.

This update contains 11 specific improvements:

1. Make existing graphs fully interactive through touch dragging and precise data-point inspection.
2. Redesign the Weekly Check-In, particularly its unattractive statistics boxes and misaligned date selector.
3. Completely refine the muscle map using a more accurately proportioned human model, better anatomical muscle outlines, and properly represented trapezius muscles.
4. Explore a new Gym Bro logo, moving away from green and considering alternatives such as light blue.
5. Investigate and fix the screen jumping or spasming when the final set of an exercise is completed.
6. Optimize animations and transitions throughout the application for smooth, responsive, satisfying interactions.
7. Fix the PWA update process so the application never initiates an update-triggered refresh before the user explicitly selects Update.
8. Fix asymmetrical lines in the first section of the Gains Dashboard.
9. Replace the existing Coach experience with a professional In Development placeholder.
10. Redesign and refine the mobile Settings interface, particularly its alignment and category navigation.
11. Conduct a comprehensive mobile-first optimization of the entire application.

This is a visual-quality, reliability, and interaction refinement update.

It is not authorization to rebuild the application from scratch or introduce unrelated features.

Preserve all existing user data, workout history, working functionality, and application architecture wherever practical.

---

# PART 1 — DEVELOPMENT SAFETY AND GIT WORKFLOW

## 1. Repository Investigation

Before modifying anything:

1. Inspect the complete current repository.
2. Review the latest stable code and any relevant pending branches.
3. Identify the existing styling system, component architecture, workout state management, graph implementation, and PWA update mechanism.
4. Review currently implemented features.
5. Identify existing tests and development scripts.
6. Check the Git state for uncommitted changes.

Use the actual repository as the authoritative source of truth.

Do not assume previous bugs are still present if they have already been resolved.

## 2. Development Branch

Create a dedicated branch:

`feature/mobile-polish-muscle-map-refresh`

If this branch already exists, inspect it before continuing and avoid overwriting previous work.

All changes must remain on this branch.

Do not modify or merge into `main`.

Make incremental commits and retain a reliable rollback path.

## 3. Working Preview

Provide a browser-accessible preview of the updated application.

It should:

- Work on mobile and desktop.
- Remain separate from the production application.
- Preserve production user data.
- Avoid collisions with production service workers and browser storage.
- Support testing of the actual revised interactions.
- Use valid asset paths and routing.

Use existing free deployment infrastructure where possible.

Do not introduce paid services.

Do not invent preview links.

If a safe preview deployment is impossible, explain the limitation and provide a local or isolated review alternative.

## 4. Pull Request and Merge Protection

Once implementation and testing are complete:

- Push the development branch.
- Create a pull request targeting `main`, if supported.
- Document changes, test results, and known issues.
- Provide the preview for my review.

**Never merge into `main` without my explicit authorization.**

---

# PART 2 — MANDATORY AESTHETIC APPROVAL

## Permanent Design Requirement

Before implementing any meaningful aesthetic change, present multiple visual alternatives and allow me to choose.

This is especially important for:

- The new muscle map
- The new Gym Bro logo
- Weekly Check-In redesign
- Mobile Settings redesign
- Any substantial changes to animations or visual transitions
- Any other new visual direction introduced during this update

For each significant design area:

1. Develop three genuinely different concepts.
2. Produce actual visual mockups, screenshots, or interactive prototypes.
3. Show how the concepts work in both light and dark modes where applicable.
4. Briefly explain their advantages and disadvantages.
5. Recommend the strongest option.
6. Wait for my selection before final visual implementation.

Do not produce three almost identical designs with minor color differences.

I may choose one, request changes, or combine elements from several concepts.

Where possible, create one interactive design gallery containing all alternatives.

Use realistic fictional data, not my private workout records.

**Do not finalize unapproved visual changes.**

You may continue independently with:

- Bug investigations
- Nonvisual code changes
- Performance diagnostics
- Data preparation
- Technical fixes that preserve approved styling
- Automated tests

Do not allow unnecessary design approval cycles to block important functional repairs.

---

# PART 3 — FULLY INTERACTIVE GRAPHS

## Current Problem

The graphs still do not provide the touch interaction I want.

I should be able to place my finger on a graph, move it horizontally, and immediately see the exact value of the data point corresponding to my finger's position.

This is a required functional improvement, not an optional enhancement.

## 1. Investigate Existing Implementation

Inspect the chart components and determine:

- Whether the current charting library supports touch interaction.
- Whether touch or pointer events are incorrectly configured.
- Whether tooltips are disabled or only respond to mouse hover.
- Whether transparent overlays intercept gestures.
- Whether graph scrolling or clipping prevents interaction.
- Whether a previous attempt implemented this feature incompletely.

Fix the underlying problem.

## 2. Finger-Dragging Behavior

When a user touches a graph:

- Activate data-point inspection.
- Select the nearest real recorded data point.
- Highlight the selected point.
- Display its exact value.
- Display its corresponding date.
- Show an appropriate guide line or crosshair if useful.

As the user drags horizontally:

- Move the selection smoothly.
- Update the displayed values.
- Snap intelligently to recorded points.
- Avoid jumping to unrelated data.

The user must not need to tap tiny graph points individually.

## 3. Tooltip Information

Display information appropriate to the graph.

Possible examples:

- Body weight: 78.4 kg
- Bench Press: 65 kg
- Training volume: 4,250 kg
- Estimated strength: 82.5 kg
- Measurement: 37.5 cm

Show dates accurately and respect unit preferences.

If multiple series appear on one graph, clearly identify the selected series.

Do not invent data through interpolation and present it as a recorded measurement.

## 4. Mobile Usability

The graph should work naturally with finger movement.

Important requirements:

- Large enough touch interaction area.
- Smooth point tracking.
- No tooltip clipping.
- No excessive latency.
- Accurate value selection.
- Intelligent behavior near chart edges.
- Normal page scrolling when the user is not intentionally interacting with the chart.

Avoid globally disabling vertical scrolling.

Use appropriate pointer-event and touch-action handling.

## 5. Desktop Support

Preserve or add:

- Mouse hover
- Mouse movement
- Click selection
- Keyboard-accessible inspection where practical

## 6. Consistency

Apply the interaction to relevant existing charts throughout Gym Bro.

Inspect:

- Gains Dashboard
- Strength progression
- Exercise history
- Body weight
- Measurements
- Training volume
- Other applicable charts

Use reusable interaction logic instead of duplicating separate implementations unnecessarily.

## 7. Verification

Test actual touch dragging, not merely the existence of tooltip code.

Acceptance criteria:

- A user can drag across the graph on a touchscreen.
- The selected value updates continuously as the finger moves between points.
- The displayed number matches the stored data.
- The tooltip remains readable and correctly positioned.
- The graph remains usable on small mobile screens.
- Vertical scrolling outside the graph interaction remains functional.
- Missing and sparse data are handled correctly.

---

# PART 4 — WEEKLY CHECK-IN REDESIGN

## Current Problem

The Weekly Check-In currently looks unprofessional.

The biggest issues are:

- The boxes surrounding the summary values at the beginning look unattractive.
- The statistics feel visually disconnected.
- The date box is not correctly centered.
- The layout needs better spacing, hierarchy, and balance.

I want this screen to look like a premium fitness progress report.

## 1. Audit the Current Layout

Inspect:

- Main heading
- Week/date selector
- Summary statistics
- Statistic cards or boxes
- Goal progress
- Charts
- Achievement sections
- Motivational content
- Recommendations
- Mobile spacing
- Light and dark styling

Identify visual inconsistencies.

## 2. Fix the Date Selector

The date box must be properly centered.

Check:

- Parent container alignment
- Actual control width
- Internal padding
- Navigation buttons
- Text centering
- Responsive breakpoints
- Border positioning
- Adjacent components

The date should appear visually centered, not merely technically centered within an uneven container.

Ensure the date controls remain functional.

Do not fix the problem using arbitrary offsets.

## 3. Redesign the Summary Statistics

The current large bordered boxes are unattractive.

Explore alternatives that communicate statistics more elegantly.

Consider:

- Minimal statistics with no surrounding cards
- A single unified summary surface
- Compact metric groups
- Subtle separators
- Editorial typography
- More restrained use of borders

Do not use colorful boxes simply to make the screen appear interesting.

Emphasize the numbers and their meaning.

## 4. Present Three Design Concepts

### Concept A — Minimal Editorial

A clean weekly report using strong typography, whitespace, and subtle dividers instead of individual metric cards.

### Concept B — Unified Performance Summary

One beautifully structured statistics panel containing the most important weekly metrics.

### Concept C — Modern Coaching Review

A balanced design combining a compact statistics area, achievements, and personalized observations.

Improve these concepts if stronger alternatives are identified.

Show the full opening section and enough of the remaining screen to judge the overall design.

Include light and dark versions.

Wait for my approval.

## 5. Functional Refinements

While auditing the screen, identify practical opportunities to improve:

- Week navigation
- Date selection
- Readability of statistics
- Meaningful comparisons
- Missing-data states
- Goal progress presentation
- Consistency of progress messages

Preserve existing scientifically grounded calculations and functionality.

Do not introduce unsupported claims about muscle growth or body composition.

Only make functional improvements directly relevant to this screen.

## 6. Testing

Verify:

- Date selector centering
- Week navigation
- Sunday/Monday week-start preferences
- Correct statistics
- Historical review data
- Empty states
- Responsive layout
- Light/dark mode
- No overlapping elements
- No loss of existing functionality

---

# PART 5 — COMPLETE MUSCLE MAP VISUAL REFINEMENT

## Primary Objective

The current muscle map does not look professional enough.

I want a much more accurately proportioned human figure with elegant, precise muscle outlines.

The new model should be anatomically recognizable, visually attractive, and easy to interact with.

It should resemble a professionally designed anatomical visualization rather than a crude cartoon or generic silhouette.

**This is one of the most important design components in the update.**

## 1. Improve Human Body Proportions

Investigate replacing or substantially refining the existing model.

The body should have realistic, balanced proportions.

Pay attention to:

- Head and neck
- Shoulder width
- Torso proportions
- Chest
- Upper arms
- Forearms
- Waist
- Pelvis and hips
- Thighs
- Knees
- Lower legs

Front and back views should share a coherent design language.

The model should remain readable on a mobile screen.

Avoid exaggerated bodybuilding proportions or distorted anatomy.

## 2. More Accurate Muscle Geometry

Improve the shapes and boundaries of major muscle groups.

Relevant groups include:

- Pectorals
- Deltoids
- Biceps
- Triceps
- Forearms
- Trapezius
- Latissimus dorsi
- Other visible upper-back muscles
- Abdominals
- Obliques
- Glutes
- Quadriceps
- Hamstrings
- Calves

Use anatomically credible positions and silhouettes.

Prioritize clean, recognizable muscle regions over excessive anatomical complexity.

## 3. Add Proper Trapezius Representation

The muscle map must include trapezius muscles.

The traps should be represented in appropriate regions, including the upper back and neck/shoulder area.

Where supported by the existing data model, distinguish upper, middle, and lower trapezius contributions if doing so genuinely improves accuracy and usability.

Do not introduce incompatible muscle categories without updating the related mapping logic.

Ensure relevant exercises register appropriate trap involvement.

Examples include:

- Shrugs
- Rows
- Deadlift variations
- Other pulling movements with meaningful trapezius involvement

Do not assign exact physiological activation percentages without suitable evidence.

## 4. Sleek, Rounded Muscle Outlines

The new muscles should have:

- Smooth curves
- Clean rounded edges
- Consistent line weights
- Natural proportions
- Well-defined boundaries
- Minimal visual clutter
- Elegant highlighted states

Avoid:

- Jagged polygonal regions
- Sharp unnatural corners
- Thick black outlines
- Misaligned body sections
- Overlapping muscle boundaries
- Inconsistent anatomy
- Unnecessary decorative detail

The result should look polished even when no muscle is selected.

## 5. Interactive Muscle Selection

Preserve existing muscle map functionality.

Users must still be able to:

- Select individual muscle groups.
- View the appropriate muscle details.
- Identify trained muscles.
- Switch between front and back views.
- See exercise-related muscle involvement where already supported.

Maintain accurate hit regions.

Do not allow selecting the chest to accidentally highlight unrelated areas.

Use clear distinction between:

- Selected muscle
- Trained muscle
- Primary muscle contribution
- Secondary muscle contribution
- Unselected muscle

Do not infer that visual activation is a precise measure of actual muscle growth.

## 6. Scalable Vector Implementation

Prefer a properly constructed SVG or equivalent scalable vector solution where appropriate.

Advantages should include:

- Crisp rendering on high-resolution phones
- Accurate interactive regions
- Lightweight assets
- Consistent scaling
- Theme compatibility
- Smooth state changes

Avoid using a single flattened image if it prevents independent muscle selection.

Do not use unlicensed anatomical illustrations or proprietary artwork.

Create original vector geometry or use appropriately licensed assets.

Document the chosen source and licensing where applicable.

## 7. Present Four Muscle Map Design Approaches

I want several genuinely different approaches before selecting one.

### Concept A — Minimal Anatomical

A realistic, proportionally accurate human silhouette with sleek, clearly outlined muscle groups.

Minimal internal detail.

Professional and understated.

### Concept B — Premium Medical Illustration

A somewhat more anatomically detailed model with refined muscle shapes, subtle depth, and clean separation between muscle regions.

Avoid excessive complexity.

### Concept C — Modern Athletic Anatomy

A professionally designed athletic figure balancing realistic anatomy with a modern fitness-app aesthetic.

Distinct muscle groups, smooth contours, and attractive highlighting.

### Concept D — Layered 3D-Inspired Vector

A dimensional-looking anatomical figure created with subtle shading, layered vector surfaces, and soft highlights.

It should feel sophisticated without requiring a heavy real-time 3D engine.

These are starting points.

Explore superior alternatives if appropriate.

## 8. Visual Review Requirements

For each concept, present:

- Front view
- Back view
- Neutral state
- Selected muscle state
- Multiple trained muscles highlighted
- Light mode
- Dark mode

Use the same data and muscle selections across concepts for fair comparison.

Include a realistic mobile preview showing the muscle map within the actual Gym Bro interface.

Explain:

- Anatomical accuracy
- Visual strengths
- Interactive usability
- Technical complexity
- Mobile performance

Recommend the strongest option.

**Do not implement the final muscle model until I select a concept.**

## 9. Muscle Map Testing

Verify:

- Accurate front/back anatomy
- Trapezius inclusion
- Correct muscle selection
- Correct primary/secondary mappings
- No phantom highlights
- No overlapping interactive targets causing incorrect selection
- Responsive SVG scaling
- Touch accuracy
- Keyboard accessibility
- Light/dark compatibility
- Consistency with existing workout history and muscle analytics

---

# PART 6 — GYM BRO LOGO REDESIGN

## Primary Objective

I want to update the Gym Bro logo.

The current green direction is no longer the aesthetic I want.

Explore more sophisticated options, potentially using light blue, but do not restrict the exploration to that color.

The logo should feel like part of a premium fitness application.

## 1. Design Goals

The new logo should be:

- Modern
- Clean
- Recognizable
- Simple
- Professional
- Athletic
- Distinctive
- Suitable for small mobile displays

Avoid generic clip-art dumbbells or excessively complex illustrations.

Keep the established **Gym Bro** name.

## 2. Explore Different Visual Approaches

Create at least five logo concepts.

Possible directions:

### Concept A — Minimal GB Monogram

A clean, distinctive geometric interpretation of the letters GB.

Potentially light blue, charcoal, or monochrome.

### Concept B — Athletic Wordmark

A modern, beautifully typeset Gym Bro wordmark with subtle custom lettering.

### Concept C — Abstract Strength Symbol

An original symbol representing progression, strength, or training without using a generic dumbbell graphic.

### Concept D — Liquid Glass Identity

A restrained, premium monogram or symbol compatible with the app's glass-inspired styling.

### Concept E — Bold Performance Identity

A more athletic and confident logo with strong shapes and high recognizability.

These concepts should represent genuinely different ideas.

Do not simply recolor the same logo five times.

## 3. Color Exploration

Explore:

- Light blue
- Ice blue
- Slate
- Charcoal
- Monochrome
- Other tasteful accent colors

Avoid green as the dominant color.

Do not assume blue is automatically the best choice.

Use your design judgment to develop refined alternatives.

## 4. Logo Application

For each concept, demonstrate:

- App header
- App icon
- Light background
- Dark background
- Small-size rendering
- Splash/loading presentation where relevant

Ensure adequate readability and recognizability at small sizes.

## 5. Technical Requirements

Prefer scalable, lightweight artwork.

Maintain safe icon margins.

Preserve existing manifest and installed PWA functionality.

Do not update app icons, favicons, splash assets, or branding until a design is approved.

After approval, update the relevant assets consistently.

Account for browser and operating-system icon caching.

Do not promise immediate icon replacement on already installed PWAs if the platform controls refresh behavior.

## 6. Approval Requirement

Present all five concepts with meaningful visual comparisons.

Recommend your strongest choice.

Wait for my approval before replacing the existing logo.

---

# PART 7 — FIX SCREEN JUMPING AFTER EXERCISE COMPLETION

## Current Problem

When I complete the last set of an exercise, the screen sometimes makes an abrupt, strange movement or spasm.

This disrupts the smooth appearance of the active highlight transitioning between sets.

The interaction should feel controlled and natural.

## 1. Reproduce the Problem

Investigate the actual transition that occurs when completing the final set of an exercise.

Inspect:

- Active-set state changes
- Exercise completion logic
- Automatic navigation
- Scroll-to-active behavior
- `scrollIntoView` calls
- Animated container dimensions
- Reactivity and rerender timing
- CSS transitions
- Layout animations
- Focus Mode behavior
- Top exercise navigation bar
- Sticky headers
- Browser scroll anchoring
- Element mounting and unmounting
- Concurrent or duplicate event handlers

Identify the root cause rather than applying cosmetic timing delays.

## 2. Prevent Conflicting Movement

Ensure the application does not trigger multiple competing animations or scroll operations.

For example:

- Exercise completion should not simultaneously trigger several conflicting scroll commands.
- Automatic highlight movement should not fight container resizing.
- Sticky headers should not cause the viewport to jump.
- Element focus should not unexpectedly scroll the page.
- Rapid state updates should not leave the active highlight temporarily attached to the wrong element.

Coordinate transitions through one predictable sequence.

## 3. Desired Behavior

After completing the final set of an exercise:

1. Record completion immediately.
2. Apply completed styling.
3. Mark the exercise complete.
4. Identify the next appropriate active set.
5. Transition smoothly to the next exercise.
6. Keep the active set visible without unnecessary screen movement.
7. Reposition the top exercise navigation only when appropriate.

The movement should be subtle and intentional.

## 4. Animation and State Separation

The saved workout state must remain independent of animation timing.

Do not delay data persistence until animations finish.

Do not rely on arbitrary timeouts to coordinate important workout logic.

Use stable element identities and appropriate layout transition techniques.

Avoid forcing full component remounts unnecessarily.

## 5. Edge Cases

Test:

- Completing an ordinary set
- Completing the final set of an exercise
- Completing the final set of the entire workout
- Performing exercises out of order
- Skipping exercises
- Editing completed sets
- Rapid repeated taps
- Focus Mode
- Normal Workout Mode
- Supersets
- Very long workout plans
- Mobile scrolling while completing a set

The screen must not jump, flicker, or unexpectedly reposition.

---

# PART 8 — APPLICATION-WIDE ANIMATION & INTERACTION OPTIMIZATION

## Primary Objective

Make Gym Bro feel exceptionally smooth, responsive, and satisfying.

Audit all relevant transitions and interactions throughout the application.

This does not mean adding more animations everywhere.

The goal is to improve animation quality, timing, consistency, and responsiveness.

## 1. Interaction Audit

Inspect:

- Page transitions
- Navigation
- Exercise switching
- Set completion
- Active highlight movement
- Card expansion and collapse
- Focus Mode
- Modals
- Menus
- Buttons
- Checkboxes
- Charts
- Settings controls
- Muscle map interactions
- Achievement notifications
- Rest timer presentation
- Workout completion

Identify visible stuttering, lag, flickering, abrupt movement, and inconsistent timing.

## 2. Performance Optimization

Investigate:

- Unnecessary rerenders
- Repeated layout measurements
- Expensive paint operations
- Excessive blur effects
- Large DOM updates
- Animation conflicts
- Event listener duplication
- Unnecessary state updates
- Memory leaks
- Scroll performance
- Long main-thread tasks

Optimize actual bottlenecks.

Do not rewrite working components unnecessarily.

## 3. Consistent Motion System

Establish a coherent motion language for the application.

Use consistent principles for:

- Transition duration
- Easing
- Direction
- Scale
- Opacity
- Feedback
- Reduced-motion behavior

Animations should feel connected to user actions.

Avoid:

- Excessive bouncing
- Unnecessary 3D transformations
- Distracting effects
- Delayed input feedback
- Long transitions
- Unexpected viewport movement

Prefer transform and opacity animations when appropriate for performance.

## 4. Responsiveness

The interface should respond immediately to user actions.

The user should never feel that a button press was ignored because an animation is still running.

Maintain reliable state handling during rapid interactions.

## 5. Reduced Motion

Respect operating-system reduced-motion preferences.

Provide simpler or instant transitions where appropriate.

## 6. Design Approval

If animation optimization changes the established visual motion language significantly, present three motion approaches with working examples.

For example:

- Minimal and instantaneous
- Balanced and fluid
- More expressive but restrained

Do not introduce new decorative animation styles without approval.

Fixing objectively broken animations does not require waiting for a new aesthetic concept.

---

# PART 9 — PWA UPDATE PROCESS: NO AUTOMATIC REFRESH BEFORE APPROVAL

## Critical Current Problem

Gym Bro's update interface appears, but the application refreshes or updates automatically before I have time to press the Update button.

This is unacceptable.

**An available update must not trigger an update-induced application refresh until I explicitly select Update.**

The user must remain in control of the update process.

## 1. Thorough Root-Cause Investigation

Inspect the complete PWA lifecycle:

- Service worker registration
- Service worker installation
- Waiting service workers
- Activation
- `skipWaiting`
- `clients.claim`
- `controllerchange`
- `updatefound`
- Version detection
- Cache versioning
- Application update state
- Update modal lifecycle
- Navigation
- Automatic reload handlers
- Duplicate event listeners
- Old and new asset compatibility
- GitHub Pages deployment configuration

Identify the precise cause of the premature refresh.

Do not merely add a delay before the refresh.

## 2. Correct Update Flow

The expected behavior is:

### Step 1 — Update Detected

Gym Bro detects that a new version is available.

The existing app remains usable.

### Step 2 — Update Prompt Appears

Display a clear update interface containing:

- New version information, where available
- What's New
- Update Now button
- Later button

The user must have enough time to read the information.

Do not automatically dismiss the prompt.

### Step 3 — User Chooses Later

If the user selects Later:

- Close the prompt.
- Keep the current application session usable.
- Do not trigger an update-related reload.
- Preserve the active workout.
- Allow the update to be initiated later.

### Step 4 — User Selects Update Now

Only after this explicit action should Gym Bro initiate the controlled update activation process.

If a service worker is waiting, coordinate activation safely.

Reload only when appropriate and only once.

Avoid infinite refresh loops.

## 3. Service Worker Coordination

Investigate whether the existing implementation activates waiting service workers immediately or reloads when a controller changes.

Where appropriate, use a controlled waiting-worker update strategy.

Do not trigger unconditional `skipWaiting` or automatic reload logic merely because an update was found.

Account for service worker lifecycle events that may occur independently of the UI.

Keep the user-visible update decision consistent with browser capabilities.

## 4. Protect Active Workouts

Do not interrupt an active workout without user approval.

Before an approved update-triggered reload:

- Ensure existing workout data is saved.
- Preserve logged sets.
- Preserve weights and repetitions.
- Preserve RIR.
- Preserve exercise selection where practical.
- Preserve other relevant session state.

After reload, restore the workout safely.

Do not clear local storage or user data to fix version mismatches.

## 5. No Forced Modal Closure

The update popup must remain open until:

- The user presses Update.
- The user presses Later.
- The user explicitly dismisses the prompt through an approved control.

Do not automatically close it immediately after rendering.

Do not connect modal visibility to transient events that unintentionally hide it.

## 6. Correct Version and Release Notes

Ensure the displayed version information is accurate.

Do not invent release notes.

If structured release notes are unavailable, provide a concise accurate summary generated from the actual application release information.

## 7. Error Handling

Handle:

- Interrupted downloads
- Offline conditions
- Failed installation
- Failed activation
- Incompatible cached assets
- Multiple tabs
- Multiple update checks
- Reload interruption
- Missing waiting worker
- Browser-specific service worker behavior

Provide a clear retry path where feasible.

Do not leave the application stuck in an update loop.

## 8. Browser Limitations

Some browser or operating-system behavior may occur outside the application's full control.

Do not make unsupported guarantees about every reload, navigation, browser restart, or installed PWA lifecycle.

The requirement is specifically to eliminate application-triggered premature updates and refreshes.

Document platform limitations accurately.

## 9. Required Old-Version-to-New-Version Testing

This is essential.

Do not test only by opening the newest build.

Test an actual update sequence:

1. Install or open an older build.
2. Preserve realistic workout data.
3. Publish or make a newer build available in the test environment.
4. Trigger version detection.
5. Verify the update popup appears.
6. Wait without pressing anything.
7. Verify the page does not reload automatically.
8. Press Later.
9. Verify the current session remains usable.
10. Reopen the update prompt.
11. Press Update Now.
12. Verify the application updates correctly.
13. Verify exactly one controlled reload where necessary.
14. Confirm user data and active workout state survive.

Where possible, test installed Android and iPhone PWAs.

Do not mark the issue resolved based solely on code inspection.

---

# PART 10 — GAINS DASHBOARD LINE SYMMETRY

## Current Problem

The lines in the first section of the Gains Dashboard appear asymmetrical.

Their alignment, lengths, or spacing do not look consistent.

This is a visible design defect.

## 1. Investigate

Inspect the first dashboard section.

Identify exactly which lines, separators, borders, or graph elements are misaligned.

Check:

- Container dimensions
- Padding
- Margins
- Border rendering
- Grid layout
- Flex alignment
- SVG dimensions where relevant
- Pixel rounding
- Responsive breakpoints

## 2. Correct

Ensure:

- Symmetrical spacing
- Consistent line widths
- Correct centering
- Balanced proportions
- Even borders
- No unexpected clipping

Use structural layout corrections.

Avoid arbitrary offsets that only work on one screen size.

## 3. Verify

Inspect actual screenshots at common mobile widths.

Test both light and dark modes.

Provide before-and-after screenshots.

Preserve the underlying dashboard information and charts.

---

# PART 11 — COACH SECTION: PROFESSIONAL DEVELOPMENT PLACEHOLDER

## Current Problem

I am not satisfied with the current Coach experience.

For now, I want to set this feature aside.

Do not try to improve or expand the AI coaching functionality during this update.

Instead, make the Coach section clearly communicate that it is under development.

## 1. Replace the Current Visible Experience

Display a clean, professional placeholder.

Suggested copy:

**Gym Bro Coach**

Personalized coaching is in development.

We're working on a more useful, intuitive coaching experience for a future update.

Keep the language concise and confident.

Do not make promises about release dates or specific future capabilities.

## 2. Visual Design

The placeholder should fit the current approved Gym Bro visual identity.

Consider:

- A subtle icon or illustration
- Strong heading
- Short explanation
- Comfortable whitespace
- Restrained use of color

Avoid a large empty page or generic error appearance.

If a significant new visual design is needed, show three options for approval.

## 3. Preserve Existing Data

Do not permanently delete existing Coach-related code or historical data without a technical reason and explicit authorization.

Disable or hide unfinished controls where appropriate.

Do not expose nonfunctional buttons.

Keep the implementation easy to restore or replace later.

Do not introduce paid AI services or external AI infrastructure.

## 4. Testing

Verify:

- The Coach section opens correctly.
- The placeholder is visible.
- No broken controls remain.
- The layout is responsive.
- Light and dark modes work.
- Navigation remains functional.
- Existing user data is not deleted.

---

# PART 12 — MOBILE SETTINGS REDESIGN

## Current Problem

Settings still look unfinished on mobile.

There are alignment problems, inconsistent spacing, and visual issues with the category navigation at the top.

The category controls do not look sufficiently professional.

I want Settings to feel clean, organized, and intentionally designed for phone screens.

## 1. Complete Mobile Audit

Inspect:

- Settings header
- Category navigation
- Tab placement
- Section titles
- Setting rows
- Toggle alignment
- Icons
- Input fields
- Descriptions
- Dividers
- Button placement
- Mobile scrolling
- Bottom navigation
- Safe areas

Identify visual and functional inconsistencies.

## 2. Improve Category Navigation

Pay particular attention to the category controls at the top.

Investigate whether the current design has:

- Excessive visual density
- Uneven spacing
- Misaligned labels
- Poor active-state styling
- Awkward horizontal scrolling
- Inconsistent component dimensions
- Unnecessary borders
- Weak information hierarchy

Redesign the category navigation to feel more professional.

## 3. Present Three Settings Concepts

### Concept A — Clean Grouped Settings

Use a single organized settings page with elegant sections and clearly grouped controls.

Keep the layout simple and compact.

### Concept B — Refined Category Navigation

Preserve categories but replace the current top navigation with a more polished and intuitive tab or segmented navigation system.

### Concept C — Dedicated Category Screens

Use a minimal category overview with individual settings pages.

Prioritize strong organization and reduced visual clutter.

These are starting points.

Explore stronger alternatives if appropriate.

## 4. Mobile-First Layout

Requirements:

- Clean alignment
- Consistent margins
- Comfortable touch targets
- Clear section hierarchy
- Predictable navigation
- Minimal visual clutter
- No overlapping text
- No cramped controls
- Professional spacing
- Consistent component styling

The Settings interface should work beautifully on small phones.

## 5. Preserve All Settings

Do not remove settings simply to make the page cleaner.

Preserve existing:

- Appearance controls
- Workout preferences
- Rest timer settings
- Notifications
- Units
- Calendar preferences
- Backup and restore
- Data export/import
- Screen wake-lock preference, where implemented
- Other current configuration options

Use the repository as the source of truth.

## 6. Design Approval

Present all three concepts as actual mobile mockups.

Show light and dark mode.

Use the full range of current settings so that concepts reflect realistic complexity.

Wait for my selection.

## 7. Testing

Verify:

- Every existing setting remains accessible.
- Toggles work.
- Preferences persist.
- Navigation is intuitive.
- Small screens display correctly.
- Safe areas are respected.
- Category controls remain usable.
- Light/dark modes look consistent.
- No regression occurs in setting-related functionality.

---

# PART 13 — COMPREHENSIVE MOBILE-FIRST OPTIMIZATION

## Primary Objective

Gym Bro is primarily used on smartphones.

The application should be designed, tested, and refined with mobile as the primary experience.

Desktop must remain functional, but mobile usability should receive priority.

## 1. Responsive Layout Audit

Inspect every major screen.

Pay attention to:

- Workout
- Focus Mode
- Exercise Library
- Create Plan
- Training Blocks
- Gains Dashboard
- Weekly Check-In
- Muscle Map
- Settings
- Coach placeholder
- App Update interface

Verify consistent layouts.

## 2. Mobile Screen Sizes

Test representative widths:

- 320px
- 360px
- 375px
- 390px
- 414px
- 430px
- 768px

Also verify usable desktop layouts.

Do not rely exclusively on one mobile viewport.

## 3. Touch Interaction

Review:

- Button hit areas
- Drag interactions
- Swipe navigation
- Chart dragging
- Scrolling
- Exercise selection
- Numeric inputs
- Modal controls
- Checkboxes
- Muscle selection

Ensure touch interactions are forgiving and reliable.

## 4. Keyboard Behavior

When the mobile keyboard opens:

- Inputs must remain visible.
- Buttons must not become inaccessible.
- The page must not jump unnecessarily.
- Bottom navigation must behave appropriately.
- Focus handling must not cause unexpected scrolling.

Test weight and repetition entry carefully.

## 5. Navigation and Safe Areas

Ensure:

- Bottom navigation is positioned correctly.
- Content is not hidden behind navigation.
- iPhone safe areas are respected.
- Headers do not overlap content.
- Menus remain within the viewport.
- Modals are usable on short screens.

## 6. Performance

Audit:

- Startup time
- Large exercise library rendering
- Chart interactions
- Muscle map rendering
- Frequent workout state updates
- Autosaving
- Animation performance
- Settings rendering
- PWA cache behavior
- Memory usage

Reduce unnecessary renders and expensive operations.

Avoid importing heavy libraries solely for minor effects.

## 7. Offline and PWA Stability

Preserve:

- Offline workout access
- Workout saving
- PWA installation
- Update detection
- Safe update activation
- Local data integrity

Do not compromise reliability for visual polish.

## 8. Real-Device Testing

Where available, test:

- iPhone Safari
- Installed iPhone Home Screen PWA
- Android Chrome
- Installed Android PWA

Clearly distinguish real-device testing from browser emulation.

Do not claim that a phone-specific issue was verified on real hardware if testing was only simulated.

---

# PART 14 — DATA INTEGRITY & FEATURE PRESERVATION

This update must preserve existing functionality and historical data.

Including, where implemented:

- Workout history
- Active workouts
- Workout plans
- Custom exercises
- Training blocks
- Exercise library
- Progressive overload
- RIR
- Exercise notes
- Muscle map mappings
- Personal records
- Gains Dashboard
- Weekly Check-In history
- Weight tracking
- Measurements
- Progress photos
- Goals
- Achievements
- Rest timer
- Recurring schedules
- Notifications
- Backup and restore
- Appearance preferences
- Settings
- PWA installation data

Do not clear local storage.

Do not rename stable exercise identifiers unnecessarily.

Do not overwrite user workout records.

Use backward-compatible migrations where changes are required.

Keep production data isolated from preview environments.

Do not introduce unrelated features or paid infrastructure.

---

# PART 15 — COMPREHENSIVE TESTING

Create or improve automated and browser-based tests covering the changes.

## Interactive Graphs

Verify:

- Touch dragging
- Correct selected point
- Exact values
- Correct dates
- Tooltip movement
- Responsive positioning
- Scrolling behavior
- Mouse interaction

## Weekly Check-In

Verify:

- Date alignment
- Statistics layout
- Accurate values
- Week navigation
- Historical data
- Light/dark modes
- Responsive screens

## Muscle Map

Verify:

- Anatomical proportions
- Trapezius inclusion
- SVG rendering
- Muscle selection
- Highlight states
- Primary/secondary mappings
- Mobile touch targets
- Front/back views

## Branding

Verify:

- Approved logo is used
- Icon dimensions
- Header presentation
- Theme contrast
- PWA manifest assets
- No outdated green branding remains where replacement was approved

## Workout Animations

Verify:

- Normal set completion
- Final exercise set
- Automatic progression
- Focus Mode transitions
- No screen spasm
- No duplicate animations
- No unwanted scrolling
- Reduced-motion support

## PWA Updates

Verify:

- Update detection
- Prompt remains open
- No premature refresh
- Later works
- Update Now works
- Active workout preservation
- Offline behavior
- Update failure handling
- No reload loops
- Old-build-to-new-build behavior

## Gains Dashboard

Verify:

- Symmetrical lines
- Correct spacing
- Light/dark mode
- Responsive layouts
- Existing charts remain functional

## Coach

Verify:

- Professional placeholder
- No broken buttons
- Correct layout
- No unwanted data removal

## Settings

Verify:

- Correct mobile layout
- Professional category navigation
- Every existing setting available
- Functional toggles
- Persisted preferences
- Light/dark compatibility

## General Regression Testing

Verify the application still supports:

- Creating workouts
- Logging sets
- Saving workouts
- Editing plans
- Selecting exercises
- Focus Mode
- Rest timer
- Progression tracking
- Muscle map interaction
- Gains Dashboard
- Weekly reviews
- Backups
- Settings
- Offline use
- PWA updates

Run applicable existing tests and add targeted tests for the reported bugs.

Do not claim tests passed unless they actually ran.

---

# PART 16 — IMPLEMENTATION WORKFLOW

Follow this sequence.

## Phase 1 — Repository Audit

Inspect the current app and identify the state of all relevant components.

Document confirmed issues and existing implementation limitations.

## Phase 2 — High-Priority Bug Investigation

Prioritize:

1. Premature PWA refresh.
2. Exercise-completion screen spasm.
3. Nonfunctional graph touch interactions.

Investigate root causes before applying fixes.

## Phase 3 — Technical Repairs

Implement reliable fixes for:

- Graph interaction
- Exercise transition stability
- PWA update control
- Gains Dashboard line alignment

Preserve the current approved visual styling where possible.

## Phase 4 — Visual Concept Development

Prepare separate design alternatives for:

- Muscle map
- Gym Bro logo
- Weekly Check-In
- Mobile Settings
- Any substantially revised animation language
- Coach placeholder, if it requires a new visual direction

Create a unified design review gallery where practical.

## Phase 5 — Design Approval Checkpoint

Present the concepts with actual visual previews.

Explain the differences and recommend the strongest options.

**Wait for my explicit aesthetic selections.**

Continue independent technical work where possible.

## Phase 6 — Approved Visual Implementation

Implement the selected:

- Muscle map
- Logo
- Weekly Check-In design
- Settings design
- Relevant interaction treatments

Do not introduce meaningful unapproved aesthetic deviations.

## Phase 7 — Application-Wide Motion Refinement

Optimize transitions and animations.

Resolve identified jank and interaction conflicts.

## Phase 8 — Mobile-First QA

Inspect the rendered application at relevant mobile sizes.

Correct alignment, spacing, overflow, navigation, and touch usability issues.

## Phase 9 — Regression and PWA Testing

Run the appropriate tests.

Test the actual update experience from an older build to a newer build.

Verify historical data and active workout preservation.

## Phase 10 — Branch Preview

Deploy a safe, separate preview.

Confirm that the URL works.

## Phase 11 — Final Report

Summarize completed work, approved designs, testing, limitations, and merge status.

Do not merge into main.

---

# PART 17 — REQUIRED DELIVERABLES

## Before Visual Approval

Provide:

1. Three Weekly Check-In concepts.
2. Four professionally developed muscle map concepts.
3. Five Gym Bro logo concepts.
4. Three mobile Settings concepts.
5. Relevant motion and animation alternatives if meaningful changes are proposed.
6. Representative light/dark previews.
7. Front/back muscle models.
8. Logo examples in actual app contexts.
9. An interactive design gallery where technically possible.
10. Your professional recommendations.

I must have the opportunity to choose and request modifications before final aesthetic implementation.

## After Implementation

Provide:

### 1. Development Branch
Exact branch name.

### 2. Pull Request
Clickable PR URL, if created.

### 3. Live Preview
Verified working browser preview.

### 4. Interactive Graphs
Explain how touch interaction was implemented and tested.

### 5. Weekly Check-In
Show the selected design and date alignment correction.

### 6. Muscle Map
Explain the new anatomical model, trapezius implementation, muscle mapping, and interaction improvements.

### 7. Logo
Provide the approved logo and explain where it was applied.

### 8. Workout Transition Bug
Identify the cause of the screen spasm and document the fix.

### 9. Animation Optimization
Describe the important performance and motion improvements.

### 10. PWA Update Repair
Explain the original cause of automatic refreshing, the new controlled update flow, and the actual old-to-new-version tests performed.

### 11. Gains Dashboard
Show the corrected symmetry.

### 12. Coach
Show the professional In Development placeholder.

### 13. Settings
Demonstrate the approved mobile Settings redesign.

### 14. Mobile Optimization
Summarize responsive, touch, performance, and usability improvements.

### 15. Testing
List actual tests performed, their outcomes, and unverified scenarios.

### 16. Data Protection
Explain how existing records were protected.

### 17. Known Limitations
Document remaining issues and platform restrictions.

### 18. Merge Status
Confirm nothing has been merged into `main`.

Do not invent screenshots, preview links, test results, or completed features.

---

# FINAL QUALITY STANDARD

The goal of this update is to make Gym Bro look, feel, and behave like a professionally developed mobile fitness product.

**Graphs** should respond naturally to finger movement and display accurate recorded values.

**Weekly Check-In** should feel like a premium progress report, with elegant statistics and perfectly aligned dates.

**Muscle Map** should feature beautifully drawn, anatomically credible human figures with smooth outlines, realistic proportions, trapezius muscles, and accurate interaction regions.

**Logo** should establish a modern, recognizable visual identity without relying on the existing green styling.

**Workout Animations** should feel smooth, controlled, and satisfying, without jumping or flickering.

**PWA Updates** must never trigger an update-related refresh before the user explicitly chooses Update.

**Gains Dashboard** should be symmetrical, balanced, and visually precise.

**Coach** should display a clean In Development message without exposing an unfinished experience.

**Settings** should be clean, beautifully aligned, and intuitive on mobile.

**The Entire Application** should feel responsive, polished, lightweight, and reliable on smartphones.

## NON-NEGOTIABLE REQUIREMENTS

1. Work exclusively on a separate development branch.
2. Present multiple visual concepts before implementing meaningful aesthetic changes.
3. Wait for my explicit design selection.
4. Preserve all existing workout history and user data.
5. Fix root causes rather than hiding bugs with cosmetic workarounds.
6. Prioritize mobile usability and performance.
7. Do not introduce unrelated features or paid infrastructure.
8. Provide a safe working preview wherever possible.
9. Test actual PWA update behavior using old and new builds.
10. Do not merge into `main` until I explicitly authorize it.

**Do not stop when the application merely compiles. Inspect the rendered experience, verify real interactions, correct visual inconsistencies, and refine the result until it meets a professional standard.**