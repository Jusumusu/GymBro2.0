# GYM BRO — INTERACTIVE ANALYTICS, WORKOUT RELIABILITY & EXERCISE LIBRARY EXPANSION

## YOUR ROLE

Act as an integrated team of senior professionals:

- Senior Frontend Engineer
- Senior UI/UX Designer
- Fitness Application Product Manager
- Exercise Science Specialist
- Data Visualization Engineer
- Quality Assurance Engineer
- PWA and Mobile Performance Specialist

Your task is to implement a focused, production-quality update to the existing **Gym Bro** fitness application.

This update has five primary objectives:

1. **Interactive Graphs:** Allow users to drag their finger across charts to inspect the exact values of individual data points.
2. **Rest Timer Repair:** Investigate and permanently fix the nonfunctional rest timer.
3. **Completed Set Visualization:** Make completed sets in Isolated Workout / Focus Mode clearly recognizable with an elegant green completion state.
4. **Workout Plan Creator Refinement:** Correct visual inconsistencies, alignment problems, and aesthetic issues in the Create New Plan interface.
5. **Exercise Database Expansion:** Significantly expand the exercise library with accurate, comprehensive exercises across all relevant muscle groups, equipment types, and categories.

This is a targeted feature and quality improvement update.

Preserve all existing functionality, workout history, user data, application architecture, and the established design system.

**Do not unnecessarily rebuild the application or introduce unrelated features.**

---

# PART 1 — DEVELOPMENT BRANCH & PREVIEW

## 1. Separate Development Branch

Before modifying anything:

1. Inspect the repository and current Git state.
2. Identify the application's architecture and relevant existing functionality.
3. Create a separate branch named:

   `feature/workout-polish-exercise-library`

4. Base it on the latest appropriate stable branch, accounting for any existing unmerged development work.
5. If the branch already exists, inspect it before making modifications.
6. Implement changes exclusively on this development branch.
7. Do not modify or merge into `main`.
8. Make incremental, meaningful commits.
9. Preserve rollback capability.

## 2. Pull Request

Once implementation is complete:

- Push the development branch.
- Create a pull request targeting `main`, if repository access permits.
- Document changes and testing.
- Do not merge automatically.

## 3. Live Preview

Provide a working, browser-accessible preview so I can test the updated application on my phone and computer.

The preview must:

- Include all five improvements.
- Be separate from production.
- Use correct asset paths and routing.
- Preserve GitHub Pages compatibility.
- Avoid service worker conflicts.
- Avoid modifying production workout data.
- Support testing on mobile and desktop.

Use existing preview deployment infrastructure where available.

Do not introduce paid services without permission.

Do not fabricate preview links.

If preview deployment is unavailable, explain the blocker and provide the best available alternative.

**Do not merge into `main` until I explicitly approve the update.**

---

# PART 2 — MANDATORY DESIGN APPROVAL

## Important Standing Requirement

Before implementing meaningful aesthetic changes, present **three distinct visual concepts** for my approval.

This applies particularly to:

- Completed-set highlighting
- The Create New Plan interface
- Any substantial chart tooltip or interaction redesign
- Any new interface elements required by this update

## Design Review Process

For each meaningful aesthetic change:

1. Create three visually distinct design options.
2. Show actual screenshots, rendered mockups, or interactive prototypes.
3. Explain the advantages and disadvantages of each.
4. Recommend the strongest option.
5. Wait for my selection.
6. Implement the approved design faithfully.

Do not present three nearly identical variations.

Explore meaningful differences in component styling, layout, spacing, and interaction design.

Keep the concepts consistent with Gym Bro's current approved visual direction.

For this update, group related aesthetic decisions into one concise design review package rather than repeatedly interrupting development.

Technical bug fixes, data work, and nonvisual preparations may continue while awaiting aesthetic approval.

**Do not finalize unapproved aesthetic changes.**

---

# PART 3 — INTERACTIVE GRAPHS & DATA INSPECTION

## Current Problem

Gym Bro's graphs display training progress, but users cannot easily interact with individual data points.

I want to be able to drag my finger across a graph and see the exact values represented by each point.

The experience should feel similar to polished analytics graphs in modern fitness and financial applications.

## 1. Touch-Based Graph Interaction

Implement interactive data inspection for existing applicable charts.

When a user touches or drags across a graph:

- Identify the nearest relevant data point.
- Highlight that data point.
- Display its recorded value.
- Display the corresponding date or time period.
- Update the highlighted point smoothly as the finger moves.
- Show a subtle vertical guide line where useful.

The user should not need to tap tiny individual dots.

Dragging across the graph should be smooth and intuitive.

## 2. Tooltip Information

Display a compact, readable tooltip showing the relevant information.

Depending on the chart, this may include:

- Date
- Weight
- Repetitions
- Estimated strength
- Training volume
- Body weight
- Measurement values
- Workout frequency
- Other existing chart metrics

Use the correct units based on user settings.

Do not invent or interpolate recorded measurements as though they were actual data points.

Where a graph contains multiple series, clearly identify the selected series and corresponding value.

## 3. Mobile Interaction

Mobile usability is the highest priority.

Requirements:

- Smooth finger dragging.
- Immediate visual feedback.
- Accurate point selection.
- No accidental selection of unrelated points.
- No tooltip clipping.
- No excessive animation.
- No unnecessary page scrolling during intentional graph interaction.
- Normal vertical page scrolling outside active graph interaction.

Use appropriate pointer or touch-event handling.

Avoid globally disabling touch scrolling.

Handle touch cancellation and interaction ending correctly.

## 4. Desktop Support

Support:

- Mouse hover
- Mouse movement
- Clicking individual points
- Keyboard-accessible inspection where practical

The experience should remain useful on desktop without duplicating the interaction system unnecessarily.

## 5. Tooltip Positioning

Position tooltips intelligently.

If the selected point is near the edge of the chart:

- Keep the tooltip inside the visible chart or screen area.
- Avoid covering the selected point unnecessarily.
- Prevent clipping.
- Maintain readable spacing.

Ensure the tooltip works in both light and dark modes.

## 6. Graph Types

Audit all existing charts and determine which benefit from point inspection.

Prioritize:

- Exercise strength progression
- Exercise volume history
- Body weight tracking
- Body measurements
- Gains Dashboard graphs
- Other date-based training statistics

Use shared interaction logic where practical.

Do not force point-inspection behavior onto chart types where it is not meaningful.

## 7. Visual Design

The interaction should feel:

- Clean
- Smooth
- Precise
- Minimal
- Responsive
- Consistent with Gym Bro's aesthetic

Avoid oversized tooltips or distracting animations.

If the chart interaction requires a meaningful visual redesign, present three visual options before finalizing.

## 8. Graph Testing

Verify:

1. Dragging across a chart selects the correct points.
2. Exact recorded values appear.
3. Dates are correct.
4. Units reflect metric or imperial settings.
5. Tooltips remain visible near chart edges.
6. Mouse interaction works.
7. Touch interaction works.
8. Vertical page scrolling remains usable.
9. Missing data is handled correctly.
10. Empty charts behave gracefully.
11. Multiple series display correct values.
12. Charts remain responsive with large datasets.
13. Light and dark themes remain readable.

Test on actual mobile browsers where available, not only desktop emulation.

---

# PART 4 — REST TIMER REPAIR

## Current Problem

The existing rest timer does not work correctly.

It may fail to start, count down, update, or remain active during workout navigation.

Investigate its actual implementation rather than assuming the cause.

**The goal is to permanently repair the timer, not replace it with a superficial countdown animation.**

## 1. Investigate the Existing Timer

Inspect:

- Timer state management
- Start and stop handlers
- Countdown calculations
- Interval management
- Component mounting and unmounting
- Workout navigation
- Focus Mode integration
- Active-set completion logic
- Application visibility changes
- PWA lifecycle behavior
- Persistent workout state
- Background and foreground transitions

Identify the actual root cause.

Document the findings.

## 2. Required Timer Functionality

The timer should support:

- Start
- Pause
- Resume
- Reset
- Skip
- Adjustable duration
- Automatic start after completing a set, if enabled
- Manual start when preferred

Do not automatically force rest timing on users who have disabled it.

Preserve existing user preferences.

## 3. Reliable Countdown Logic

Use reliable elapsed-time or target-time calculations.

Do not rely solely on counting timer interval callbacks, which may be throttled when mobile browsers are backgrounded.

The timer should recover the correct remaining time after:

- Switching application screens
- Opening another exercise
- Backgrounding the application
- Locking the phone
- Returning to the app
- Refreshing the app, where persisted timer state is supported

If the countdown has expired while the app was backgrounded, display its completed state correctly when the app resumes.

Do not show negative countdown values.

## 4. Sticky Timer in Focus Mode

Ensure the timer integrates with Isolated Workout / Focus Mode.

Requirements:

- Remains visible while actively timing rest.
- Does not cover important logging controls.
- Uses a compact, unobtrusive display.
- Allows quick adjustment or dismissal.
- Does not reset when switching between exercises.
- Works correctly with supersets.

Preserve existing timer behavior in normal workout mode.

## 5. Timer Completion

When the timer reaches zero:

- Clearly indicate that rest has ended.
- Stop the countdown correctly.
- Provide appropriate visual feedback.
- Avoid repeatedly triggering completion events.

Where notification or sound capabilities exist, respect the user's settings and browser permissions.

Do not claim that a normal PWA timer can reliably deliver an alert while the app is completely closed.

Do not introduce a paid notification backend.

## 6. Prevent Duplicate Timers

Ensure:

- Only the intended timer instance is active.
- Repeated taps do not create duplicate intervals.
- Navigation does not create additional running timers.
- Completing multiple sets quickly does not produce conflicting countdowns.
- Timer cleanup is handled correctly.

Use a clear state model and appropriate lifecycle cleanup.

## 7. Timer Testing

Test:

1. Manual start.
2. Automatic start.
3. Pause.
4. Resume.
5. Reset.
6. Skip.
7. Custom duration.
8. Timer completion.
9. Switching exercises.
10. Entering and leaving Focus Mode.
11. Backgrounding the app.
12. Returning after the timer expires.
13. Refreshing during a countdown.
14. Completing several sets quickly.
15. Superset navigation.
16. Disabling automatic rest timing.

Use automated timing tests where possible, including simulated clock progression.

Ensure the countdown remains accurate and the UI stays responsive.

---

# PART 5 — COMPLETED SET HIGHLIGHTING IN ISOLATED WORKOUT MODE

## Current Problem

In Isolated Workout / Focus Mode, completed sets are marked with checkmarks.

However, the visual difference between completed and incomplete sets is not obvious enough.

I want completed sets to have a clear, elegant green highlight or an equivalent visual treatment that communicates completion immediately.

## 1. Visual Completion State

When a set is completed:

- Keep the checkmark.
- Add a subtle green background, border, tint, or other refined completion treatment.
- Ensure the completed state is immediately recognizable.
- Keep logged weight and repetitions readable.
- Preserve the ability to edit completed sets.

Avoid excessive bright green backgrounds or distracting animations.

The result should feel like a premium commercial fitness app.

## 2. Distinguish Set States

Maintain three clearly differentiated states:

### Active Set

- Clearly emphasized using the existing active-state styling.
- Only one active set at a time.
- Immediately identifiable.

### Completed Set

- Checkmarked.
- Subtly highlighted in green or another approved success treatment.
- No longer uses the active-set highlight.
- Remains editable.

### Upcoming Set

- Neutral styling.
- No completed-state highlight.
- Clearly distinct from active and completed sets.

Do not allow completed and active styling to become visually confusing.

## 3. Completion Logic

When a user completes a set:

1. Update the stored completion state.
2. Apply the approved completed-set styling.
3. Remove the active highlight from that set.
4. Advance to the next appropriate set.
5. Preserve all logged information.

If a completed set is unchecked:

- Remove its completed-state styling immediately.
- Recalculate the current active set appropriately.
- Update exercise completion indicators.

Handle out-of-order completion, warm-ups, optional sets, and supersets consistently with the existing workout rules.

## 4. Visual Design Approval

Before implementing the final completion style, present three options.

Suggested directions:

**Concept A — Soft Green Fill**

A subtle tinted background with a small checkmark.

**Concept B — Green Outline**

A refined border and checkmark with a mostly neutral background.

**Concept C — Minimal Completion Strip**

A small green side indicator combined with a checkmark and slight text treatment.

These are starting points, not mandatory designs.

Show actual visual mockups with several completed, active, and upcoming sets visible together.

Recommend the clearest option.

Wait for my selection.

## 5. Accessibility

Do not rely on green alone.

Retain checkmarks or other noncolor completion indicators.

Ensure the treatment remains clear in both light and dark modes.

Maintain sufficient contrast.

Respect reduced-motion preferences.

## 6. Testing

Verify:

- Completed sets receive the correct styling.
- Active sets remain visually distinct.
- Upcoming sets remain neutral.
- Unchecking removes completion styling.
- Editing completed sets works.
- Out-of-order completion works.
- Supersets remain clear.
- Completion persists after refresh.
- Theme switching works.
- No layout shifts occur.

---

# PART 6 — CREATE NEW PLAN PAGE: COMPLETE VISUAL REFINEMENT

## Current Problem

The page used to create a new workout plan contains several aesthetic inconsistencies.

Some elements appear unevenly spaced, misaligned, or visually disconnected from the rest of the application.

The page needs a careful visual and UX audit.

## 1. Inspect the Existing Interface

Review every component on the Create New Plan page, including:

- Page title
- Plan name field
- Exercise selection controls
- Exercise list
- Exercise ordering
- Set and rep settings
- Add and remove controls
- Buttons
- Icons
- Cards
- Menus
- Dialogs
- Save and cancel actions

Identify the specific visual issues.

Do not assume that the entire page must be rebuilt.

## 2. Correct Alignment and Symmetry

Inspect:

- Horizontal alignment
- Vertical centering
- Card widths
- Input dimensions
- Padding
- Margins
- Spacing
- Border radii
- Button placement
- Icon positioning
- Text wrapping
- Component proportions

Avoid arbitrary CSS offsets.

Use consistent layout rules and the application's design tokens.

## 3. Improve Visual Hierarchy

The workflow should feel natural:

1. Name the plan.
2. Add exercises.
3. Configure sets and targets.
4. Organize exercise order.
5. Save the plan.

Do not introduce unnecessary steps.

Make primary and secondary actions visually distinct.

Ensure users can easily understand the current configuration.

## 4. Design Approval — Mandatory

Before implementing meaningful aesthetic changes, present three design concepts for the Create New Plan page.

Each concept should improve the existing layout while retaining every function.

Explore differences in:

- Form organization
- Card layout
- Exercise rows
- Spacing
- Visual hierarchy
- Button placement
- Exercise configuration controls

Do not create three nearly identical variants.

Use realistic workout-plan data.

Show how each concept looks on a mobile screen.

Provide light and dark mode previews where relevant.

Recommend the strongest solution and wait for my approval.

Minor technical alignment corrections that preserve the existing design may proceed independently.

## 5. Preserve Functionality

Do not break:

- Plan creation
- Plan editing
- Exercise selection
- Exercise reordering
- Set configuration
- Rep targets
- Custom exercises
- Plan saving
- Plan duplication, if implemented
- Plan deletion, if implemented

Ensure incomplete plan edits are not accidentally lost.

## 6. Testing

Verify:

- Empty plan creation
- Plan naming
- Adding exercises
- Removing exercises
- Reordering exercises
- Editing sets and targets
- Saving the plan
- Editing an existing plan
- Long exercise names
- Small screens
- Keyboard behavior
- Light/dark mode
- Correct data persistence

---

# PART 7 — MAJOR EXERCISE DATABASE EXPANSION

## Current Problem

The existing exercise database is missing many exercises.

This limits customization and makes the application feel less comprehensive than leading fitness apps.

## Primary Objective

Significantly expand the exercise library with a broad, accurate, professionally organized collection of strength-training exercises.

**Do not simply add as many names as possible without validating them.**

The priority is comprehensive coverage, quality, consistency, and usability.

A large collection of poorly classified or duplicated exercises is not an improvement.

## 1. Audit the Current Database

Before adding exercises:

- Count existing exercise records.
- Identify existing categories.
- Identify muscle groups with limited coverage.
- Identify missing equipment types.
- Identify common exercise variations that are absent.
- Identify duplicate or inconsistently named exercises.
- Inspect the current exercise schema.
- Review how the library connects to workout history, plans, and the muscle map.

Create a coverage report.

## 2. Comprehensive Muscle Group Coverage

Expand all relevant categories.

### Chest

Include appropriate variations of:

- Barbell presses
- Dumbbell presses
- Incline presses
- Decline presses
- Machine presses
- Cable flyes
- Dumbbell flyes
- Push-ups
- Dips
- Other relevant chest movements

### Back

Include:

- Pull-ups
- Chin-ups
- Lat pulldowns
- Barbell rows
- Dumbbell rows
- Cable rows
- Machine rows
- Chest-supported rows
- Pullovers
- Back extensions
- Other appropriate pulling movements

### Shoulders

Include:

- Overhead presses
- Dumbbell presses
- Machine presses
- Lateral raises
- Rear-delt flyes
- Cable raises
- Face pulls
- Other relevant shoulder movements

### Biceps

Include:

- Barbell curls
- Dumbbell curls
- Hammer curls
- Incline curls
- Preacher curls
- Cable curls
- Machine curls
- Other useful variations

### Triceps

Include:

- Cable pushdowns
- Overhead extensions
- Skull crushers
- Close-grip presses
- Dips
- Machine extensions
- Other relevant variations

### Forearms and Grip

Include:

- Wrist curls
- Reverse wrist curls
- Reverse curls
- Farmer carries
- Grip-focused exercises
- Relevant forearm movements

### Quadriceps

Include:

- Back squats
- Front squats
- Goblet squats
- Hack squats
- Leg presses
- Split squats
- Lunges
- Leg extensions
- Step-ups
- Other relevant variations

### Hamstrings

Include:

- Romanian deadlifts
- Stiff-leg deadlifts
- Seated leg curls
- Lying leg curls
- Standing leg curls
- Nordic curls
- Other relevant movements

### Glutes

Include:

- Hip thrusts
- Glute bridges
- Squat variations
- Lunges
- Split squats
- Cable kickbacks
- Hip extensions
- Abduction exercises
- Other relevant movements

### Calves

Include:

- Standing calf raises
- Seated calf raises
- Leg press calf raises
- Single-leg calf raises
- Machine variations

### Core

Include:

- Crunches
- Cable crunches
- Hanging leg raises
- Reverse crunches
- Planks
- Side planks
- Ab wheel rollouts
- Pallof presses
- Rotational exercises
- Other relevant core movements

### Additional Categories

Where supported by the existing application, include:

- Full Body
- Olympic lifting variations
- Bodyweight training
- Functional training
- Carry variations
- Mobility and warm-up exercises
- Cardio equipment exercises

Do not expand into unrelated exercise types at the expense of the app's primary strength-training purpose.

## 3. Equipment Coverage

Support relevant equipment categories, including:

- Barbell
- Dumbbell
- Cable
- Smith machine
- Plate-loaded machine
- Selectorized machine
- Kettlebell
- Bodyweight
- Resistance band
- EZ bar
- Trap bar
- Assisted machine
- Other appropriate gym equipment

Exercises should be discoverable through equipment filtering.

## 4. Exercise Variations

Include legitimate variations when they meaningfully differ in:

- Equipment
- Movement pattern
- Setup
- Range of motion
- Muscle emphasis
- Grip or stance
- Training purpose

For example:

- Barbell bench press
- Incline barbell bench press
- Dumbbell bench press
- Incline dumbbell bench press
- Chest press machine

These should be separate exercises when their differences are relevant to training history and progression.

Avoid creating duplicate entries merely because an exercise has multiple common names.

Use aliases instead.

## 5. Required Exercise Metadata

Every new exercise should have appropriate structured metadata.

Include:

- Stable unique ID
- Exercise name
- Common aliases
- Primary muscle groups
- Secondary muscle groups
- Relevant stabilizers where appropriate
- Estimated relative muscle contributions
- Equipment type
- Movement pattern
- Exercise category
- Relevant tracking type
- Optional setup instructions
- Optional technique cues
- Optional exercise substitutions

Use the existing schema where appropriate.

Do not invent highly specific biomechanical measurements.

## 6. Muscle Map Integration

This is critical.

Every new exercise must integrate correctly with the existing muscle map and muscle-volume tracking system.

For example:

- Squats must meaningfully register quadriceps and glutes.
- Romanian deadlifts must register hamstrings and glutes.
- Bench presses must register chest and relevant assisting muscles.
- Rows must register appropriate back muscles.

Use evidence-informed relative contribution classifications.

Do not treat compound exercises as working only one muscle.

Do not label muscle-contribution weights as exact EMG percentages or exact hypertrophy stimulus.

Ensure naming and classification remain consistent throughout the app.

## 7. Exercise Library Organization

Preserve and improve the existing library organization.

Exercises should be discoverable through:

- Search
- Recently Used
- Favorites
- Upper Body
- Lower Body
- Core
- Individual muscle groups
- Equipment filters
- Relevant additional categories

Do not turn the expanded library into one enormous scrolling list.

Keep navigation clean, fast, and intuitive.

## 8. Search and Aliases

Ensure newly added exercises are searchable through common names.

For example, an exercise may be known by:

- Its formal name
- A common gym abbreviation
- An alternative equipment-based name

Use consistent aliases rather than duplicate database records.

Maintain fast search performance.

## 9. Custom Exercise Compatibility

Preserve all existing custom exercises.

Do not overwrite user-created records.

Do not change their IDs.

Do not merge them into newly added built-in exercises automatically.

If a user-created exercise shares a name with a new built-in exercise, handle the distinction safely.

## 10. Historical Data Integrity

Preserve:

- Existing workout history
- Personal records
- Exercise-specific targets
- Saved plans
- Historical statistics
- Exercise notes
- Existing exercise IDs

Never change historical exercise references merely to reorganize the library.

If legacy exercise mappings require correction, implement safe and tested compatibility logic.

## 11. No Unnecessary Exercise Images

Do not add large image libraries or externally hosted demonstration videos unless they are properly licensed and genuinely useful.

The priority for this update is a complete, accurate, lightweight exercise database.

Avoid increasing app size unnecessarily.

## 12. Database Quality Assurance

After expansion:

1. Count the new total exercises.
2. Count how many were added.
3. Identify duplicate records.
4. Verify category coverage.
5. Verify equipment classifications.
6. Verify muscle mappings.
7. Verify stable IDs.
8. Test search aliases.
9. Test filters.
10. Confirm historical compatibility.

Create an automated validation script where practical.

Check for missing required metadata and invalid muscle identifiers.

## 13. Exercise Database Acceptance Criteria

The database should:

- Cover all major muscle groups.
- Include common gym exercises.
- Include meaningful equipment variations.
- Remain easy to browse.
- Avoid duplicate records.
- Integrate with the muscle map.
- Support existing workout-plan workflows.
- Preserve historical exercise records.
- Remain responsive on mobile.

Provide a final coverage summary explaining which exercise categories were expanded and which areas may still need work.

---

# PART 8 — INTEGRATION BETWEEN FEATURES

Ensure all five improvements work together.

### Interactive Graphs + Historical Data

Graph interactions must show values from actual stored records.

Do not modify workout statistics to support tooltip rendering.

### Rest Timer + Isolated Workout

Timer behavior must remain consistent when switching between normal workout mode and Focus Mode.

### Completed Sets + Progress Tracking

Completed-set styling must reflect actual stored completion state.

It must not become an independent visual state that can disagree with workout data.

### Workout Plan Creator + Expanded Library

The plan creator must work smoothly with the expanded exercise database.

Search, filters, and exercise selection must remain responsive.

### Expanded Library + Muscle Map

Use consistent centralized muscle classifications.

Avoid separate, contradictory mappings for different parts of the application.

---

# PART 9 — DATA INTEGRITY

Preserve all existing:

- Workout history
- Active workouts
- Workout plans
- Custom exercises
- Personal records
- Goals
- Achievements
- Muscle contribution data
- Tracking statistics
- Body measurements
- Progress photos
- Training blocks
- Recurring schedules
- Exercise notes
- Settings
- Appearance preferences
- Notification preferences
- Backup information

Do not reset local storage.

Do not silently discard unsupported records.

Use backward-compatible migrations where necessary.

Avoid unnecessary changes to persistence formats.

Maintain GitHub Pages and PWA compatibility.

Do not introduce paid AI services or new paid infrastructure.

---

# PART 10 — PERFORMANCE & RESPONSIVENESS

All improvements must work smoothly on mobile devices.

Test representative widths:

- 320px
- 375px
- 390px
- 430px
- 768px
- 1024px and larger

Review:

- Touch responsiveness
- Graph dragging
- Long exercise lists
- Search performance
- Timer responsiveness
- Workout logging
- Create Plan forms
- Keyboard interactions
- Bottom navigation
- Safe-area spacing
- Modal positioning
- Light/dark theme consistency

Avoid unnecessary rerenders, large dependencies, and expensive calculations during routine user interactions.

Use measured performance evidence where available.

Preserve offline functionality.

Do not reintroduce PWA update problems or caching regressions.

---

# PART 11 — COMPREHENSIVE QUALITY ASSURANCE

Perform automated tests, integration tests, and visual testing where supported.

## Graph Tests

- Finger dragging
- Nearest-point identification
- Exact data values
- Correct dates
- Correct units
- Tooltip positioning
- Multiple series
- Missing data
- Desktop mouse support
- Mobile scrolling behavior

## Timer Tests

- Start, pause, resume, reset
- Automatic start
- Manual start
- Navigation
- Backgrounding
- App restoration
- Timer completion
- Superset behavior
- Duplicate timer prevention

## Completed Set Tests

- Green completion styling
- Active-set distinction
- Unchecking
- Editing
- Out-of-order sets
- Autosave
- Focus Mode
- Light/dark modes

## Create New Plan Tests

- Visual alignment
- Form controls
- Exercise selection
- Reordering
- Saving
- Editing
- Responsive layout
- Keyboard behavior
- Data persistence

## Exercise Database Tests

- Stable IDs
- Duplicate detection
- Muscle mappings
- Equipment classifications
- Search
- Aliases
- Categories
- Favorites
- Recently Used
- Custom exercises
- Historical compatibility
- Large dataset performance

## Regression Testing

Verify that the update does not break:

- Workout logging
- Workout saving
- Progression calculations
- Gains Dashboard
- Muscle Map
- Exercise Library
- Training Schedule
- Weekly Check-In
- Settings
- Notifications
- Data export/import
- Offline functionality
- PWA updates

Do not claim tests passed unless they were actually executed.

Fix confirmed regressions before finalizing.

---

# PART 12 — IMPLEMENTATION WORKFLOW

Follow this process.

## Phase 1 — Repository Audit

Inspect relevant features, architecture, existing tests, and data structures.

Identify the current causes of reported problems.

## Phase 2 — Technical Repairs

Investigate and fix the rest timer.

Implement the shared graph interaction logic.

Prepare the exercise database expansion architecture.

## Phase 3 — Design Exploration

Create three visual options for:

- Completed-set styling
- Create New Plan refinement
- Any substantial new chart interaction styling

Present screenshots or interactive prototypes.

Wait for my approval before implementing the final visual designs.

## Phase 4 — Exercise Database Expansion

Add comprehensive exercise coverage with accurate classifications and stable identifiers.

Validate the expanded dataset.

## Phase 5 — Approved Visual Implementation

Implement the selected visual concepts.

Ensure all updated components fit Gym Bro's existing design system.

## Phase 6 — Feature Integration

Verify the interaction between:

- Charts and training history
- Timer and Focus Mode
- Set completion and workout state
- Exercise library and plan creation
- Exercise metadata and muscle map

## Phase 7 — Mobile & Visual QA

Inspect actual rendered screens.

Correct alignment, spacing, readability, and responsive issues.

## Phase 8 — Functional Testing

Run automated and manual tests.

Fix discovered bugs.

## Phase 9 — Branch Preview

Deploy a safe, isolated preview.

Verify it works on mobile and desktop.

## Phase 10 — Final Report

Document implementation, testing, database coverage, limitations, and preview access.

Do not merge into main.

---

# PART 13 — FINAL DELIVERABLES

Provide:

## 1. Development Branch

The exact branch name containing all changes.

## 2. Pull Request

A clickable pull request link if successfully created.

## 3. Live Preview

A verified working URL where I can test the updated application.

## 4. Interactive Graphs

Explain:

- How finger dragging works.
- Which charts support it.
- What information is displayed.
- How mobile scrolling is handled.

## 5. Rest Timer

Explain:

- The identified root cause of the malfunction.
- The code changes made.
- How the timer handles navigation and app backgrounding.
- Which scenarios were tested.

## 6. Completed Set Styling

Document the selected visual concept and resulting behavior.

## 7. Create New Plan Page

Document the approved design refinements and corrected inconsistencies.

## 8. Exercise Database

Report:

- Previous exercise count
- New exercise count
- Number of exercises added
- Categories expanded
- Equipment coverage
- Muscle-mapping validation
- Duplicate detection results
- Remaining coverage limitations

## 9. Design Approval Record

Identify the presented concepts and my approved selections.

## 10. Testing Results

List tests performed, outcomes, and unverified scenarios.

## 11. Data Safety

Explain how existing workout history and user records were preserved.

## 12. Known Limitations

Clearly document unresolved issues or technical constraints.

## 13. Merge Status

Confirm that nothing has been merged into `main`.

Do not fabricate preview URLs, test results, screenshots, or completed functionality.

---

# FINAL QUALITY STANDARD

This update should make Gym Bro feel more polished, complete, reliable, and professional.

**Graphs:** Smooth, intuitive touch interaction with accurate point values.

**Rest Timer:** Fully functional, reliable, and properly integrated with the workout experience.

**Completed Sets:** Immediately recognizable through a subtle, elegant green completion treatment.

**Create New Plan:** Clean, symmetrical, intuitive, and visually consistent.

**Exercise Library:** Broad, comprehensive exercise coverage with accurate muscle data, useful categories, and fast navigation.

Do not simply make changes that appear correct in code.

Inspect the actual user experience, test the interactions, verify data integrity, and refine the implementation.

## NON-NEGOTIABLE REQUIREMENTS

1. Work on a separate Git development branch.
2. Present three visual options before implementing meaningful aesthetic changes.
3. Wait for my explicit design approval.
4. Preserve all existing functionality and user data.
5. Do not introduce unrelated features or paid infrastructure.
6. Provide a working preview wherever technically possible.
7. Do not merge into `main` without my explicit approval.

**The goal is to improve Gym Bro's quality and completeness without sacrificing the simplicity that makes it enjoyable to use.**