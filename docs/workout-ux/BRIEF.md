# GYM BRO — COMPLETE PRECISION, WORKOUT UX & EXERCISE LIBRARY REFINEMENT

## Your Role

Act as an integrated team of senior professionals:

- Senior Frontend Engineer
- Senior UI/UX Designer
- Exercise Science Specialist
- Product Manager
- Quality Assurance Engineer
- PWA and GitHub Deployment Specialist

Your mission is to implement a focused, production-quality update to the existing **Gym Bro** fitness application.

This update addresses five specific areas:

1. **Muscle Map Accuracy:** Correct anatomical mappings and implement proportional muscle contribution visualization.
2. **Date Box Alignment:** Fix inconsistent alignment, spacing, sizing, and symmetry across calendar components.
3. **Exercise Options Menu:** Redesign exercise options to be compact, intuitive, and visually polished.
4. **Active Workout Experience:** Highlight only the current set and clearly distinguish completed exercises.
5. **Exercise Library Overhaul:** Reorganize the library into an exceptionally clean, intuitive, searchable interface with categories, favorites, and recently used exercises.

This is a refinement update, NOT a redesign or rebuild.

Preserve all existing features, functionality, user data, workout history, application structure, and visual identity.

The goal is to achieve the level of polish, usability, and reliability expected of a premium commercial fitness app.

---

# PART 1 — BRANCH MANAGEMENT & PREVIEW DEPLOYMENT

## 1. Development Branch

Before modifying anything:

1. Inspect the repository and current Git branch.
2. Identify the existing application architecture.
3. Create a separate development branch named:

   `fix/workout-ux-muscle-map`

4. If this branch already exists, inspect its state before continuing. Do not overwrite existing work.
5. Implement all changes exclusively on the development branch.
6. Do not modify or merge into `main`.
7. Make incremental commits with descriptive messages.
8. Run relevant tests before creating a pull request.

## 2. Pull Request

When implementation is complete:

- Push the development branch to GitHub.
- Create a pull request targeting `main`, if permissions allow.
- Include a summary of the changes.
- Document testing performed.
- Identify any unresolved issues.

Do not merge automatically.

## 3. Live Browser Preview — Critical

I want to test the updated application before approving the changes.

Create a working, publicly accessible browser preview of this development branch.

Requirements:

- The preview must contain all five improvements.
- It must run the actual updated application.
- It must work on desktop and mobile browsers.
- It must not replace the production application.
- It must not interfere with existing production user data.
- It must not cause service worker or cache conflicts.
- Asset paths and routing must function correctly.
- It must be compatible with the current GitHub Pages/PWA architecture.

Use an existing preview deployment solution if available.

If none exists, determine the simplest reliable branch-preview deployment mechanism that does not require unauthorized paid infrastructure.

If a working preview cannot be deployed because credentials, permissions, or external services are unavailable, explicitly explain the blocker and provide the best available alternative.

Never invent a preview URL.

**Final output must include a verified clickable preview URL whenever deployment is successful.**

Do not merge changes into `main` without my explicit approval.

---

# PART 2 — MUSCLE MAP ACCURACY & ANATOMICAL CONTRIBUTION

## Current Problem

The existing muscle map is inaccurate for certain compound exercises.

For example, barbell squats currently fail to highlight the glutes despite meaningful glute involvement.

The existing implementation appears to underrepresent secondary muscles and compound exercise contributions.

This creates a misleading representation of training activity.

## 1. Centralized Muscle Contribution System

Inspect the exercise database and current muscle-mapping implementation.

Implement a centralized, reusable exercise-to-muscle contribution system.

Each exercise should support:

- Primary muscles
- Secondary muscles
- Relevant stabilizing muscles
- Estimated relative contribution levels
- Exercise-specific variations where necessary

Use practical, evidence-informed classifications.

Avoid relying exclusively on whether an exercise is labeled an isolation movement or compound movement.

## 2. Relative Muscle Contribution

Implement a weighted system that distinguishes the significance of muscle involvement.

Illustrative categories:

- High contribution
- Moderate contribution
- Low contribution
- No meaningful contribution

The system should be sufficiently detailed to distinguish different levels of muscle involvement, but not create false scientific precision.

For example:

**Barbell Back Squat**

- Quadriceps: High contribution
- Gluteus maximus: High or substantial contribution
- Adductors: Relevant contribution
- Spinal erectors: Stabilizing contribution

Exact classifications should be selected using appropriate exercise science knowledge and the movement variation.

Do not interpret relative contribution weights as scientifically exact percentages of muscle activation, hypertrophy, or mechanical tension.

## 3. Proportional Muscle Map Highlighting

The visual muscle map should represent contributions through different highlight intensities.

For example:

- Strong involvement: Prominent highlight
- Moderate involvement: Medium highlight
- Minor involvement: Subtle highlight
- No relevant involvement: Neutral appearance

Ensure colors and intensities are visually distinguishable.

Maintain the current design identity.

Support both light and dark themes.

Include a concise, understandable intensity legend.

Avoid overcomplicated visualizations.

## 4. Weekly Muscle Volume

Improve weekly training contribution calculations.

Requirements:

- Use actual completed working sets.
- Include meaningful secondary muscle involvement.
- Apply appropriate weighting.
- Distinguish direct working sets from estimated weighted contributions.
- Do not treat every contributing muscle as having completed a full direct set.
- Prevent minor stabilizer contributions from dominating weekly calculations.
- Avoid double-counting the same exercise record due to multiple library categories.

The visualization should account for both contribution intensity and accumulated training activity.

Use a consistent normalization approach so comparisons remain understandable.

## 5. Exercise Database Audit

Review the entire exercise library for missing or inaccurate muscle relationships.

Pay particular attention to:

- Back squat
- Front squat
- Leg press
- Romanian deadlift
- Conventional deadlift
- Hip thrust
- Lunges
- Bench press
- Incline bench press
- Overhead press
- Pull-ups
- Lat pulldowns
- Barbell rows
- Cable rows
- Isolation exercises

These examples are not exhaustive.

Review all existing exercises.

Preserve stable exercise IDs, user-created exercises, historical data, and existing workout relationships.

If custom exercises contain incomplete muscle metadata, provide a reasonable, editable classification process rather than silently making unsupported assumptions.

## 6. Required Muscle Map Tests

Create representative tests verifying that:

- Three completed barbell squat working sets highlight quadriceps and glutes.
- Relevant secondary muscles receive appropriate contributions.
- Unrelated muscles remain neutral.
- Isolation exercises primarily highlight their intended targets.
- Multiple exercises contribute correctly to weekly totals.
- Editing or deleting workouts updates muscle-map results.
- Switching calendar week preferences produces correct weekly calculations.
- Front and back muscle views remain consistent.
- Light and dark themes display all contribution levels clearly.

---

# PART 3 — EXERCISE LIBRARY COMPLETE UX OVERHAUL

## Current Problem

The exercise library is too long, cluttered, and difficult to navigate.

Users must scroll through too many exercises to find the movement they want.

The organization needs to feel cleaner, more modern, and much easier to use.

## Primary Goal

Transform the exercise library into a premium exercise browser that makes finding an exercise extremely fast and intuitive.

It should support beginners who browse by body part and experienced users who know exactly what they want.

**Do not remove existing exercises to shorten the list. Improve organization and discovery instead.**

## 1. Mandatory Library Layout

Use the following information hierarchy as the default browsing experience.

### A. Search Bar — At the Top

Make the search bar immediately visible when the library opens.

Requirements:

- Search across the entire exercise database.
- Search by exercise name.
- Support aliases and common abbreviations.
- Return relevant results quickly.
- Provide a clear-search action.
- Display useful empty states.
- Keep search functional independently of the selected category.

Users must not need to navigate into a category before searching.

Search should remain responsive with hundreds or thousands of exercises.

### B. Recently Used Exercises — Directly Below Search

Create a compact **Recently Used** section.

Requirements:

- Show approximately 4–6 recently used exercises.
- Sort according to actual recent usage.
- Allow one-tap selection.
- Avoid duplicate entries.
- Update automatically as exercises are performed or selected, according to a clearly defined and consistent usage policy.
- Persist the information across sessions.
- Hide the section gracefully if no history exists.

Use compact rows or a similarly space-efficient layout.

Avoid oversized cards.

### C. Favorite Exercises

Provide a **Favorites** section beneath recently used exercises.

Requirements:

- Users can favorite and unfavorite exercises.
- Favorite status persists.
- Favorited exercises are immediately accessible.
- Exercise selection requires minimal taps.
- The same exercise must not create duplicate database records.
- Avoid unnecessary visual duplication between Favorites and Recently Used.

Where appropriate, use a small star or heart control.

Ensure the favorite control is intuitive and does not interfere with selecting the exercise itself.

If no favorites exist, avoid displaying a large empty section.

### D. Browse by Body Part

Below the quick-access sections, provide organized categories.

Recommended hierarchy:

**Upper Body**
- Chest
- Back
- Shoulders
- Biceps
- Triceps
- Forearms

**Lower Body**
- Quadriceps
- Hamstrings
- Glutes
- Calves
- Hips

**Core**
- Abdominals
- Obliques
- Lower Back

**Additional Categories**
- Full Body
- Cardio
- Other categories actually supported by existing exercise data

This structure is a starting point, not a mandatory visual implementation.

Use your professional UX judgment to choose between category cards, collapsible sections, segmented controls, or other suitable navigation patterns.

The primary requirement is fast, intuitive browsing.

Avoid unnecessarily deep navigation.

## 2. Intelligent Categorization

Use the same corrected muscle-contribution metadata as the muscle map.

Exercises must be discoverable through all relevant muscle categories.

Examples:

- Squats under Quadriceps and Glutes
- Romanian deadlifts under Hamstrings and Glutes
- Bench press under Chest
- Rows under Back
- Overhead press under Shoulders
- Pull-ups under Back

An exercise may appear in several relevant categories without creating duplicate exercise records.

Use stable exercise identifiers across categories, search results, favorites, and history.

Do not categorize exercises solely according to incidental stabilizer involvement.

## 3. Additional Filters

Provide optional filters where useful.

Potential options:

- Equipment
- Muscle group
- Movement pattern
- Bodyweight
- Custom exercises

Allow filters to work together logically.

Include a convenient way to clear active filters.

Keep secondary filters visually unobtrusive until needed.

Avoid displaying a large wall of filter buttons.

## 4. Exercise Result Design

Redesign exercise rows or cards to be compact and easy to scan.

Consider displaying:

- Exercise name
- Primary muscle group
- Equipment type
- Small appropriate icon or thumbnail
- Favorite status

Do not overcrowd individual rows.

Keep typography and spacing consistent.

Prioritize readable exercise names and comfortable touch targets.

Use consistent styling throughout the library.

## 5. Exercise Selection Workflows

The exercise library is accessed in different contexts.

Verify that it works correctly when:

- Creating workout plans
- Editing workout plans
- Adding exercises during workouts
- Replacing exercises during workouts
- Browsing exercise information
- Selecting custom exercises

Selecting an exercise must return the user to the correct workflow.

Preserve unsaved workout progress.

Do not reset workout state or accidentally modify unrelated plan data.

## 6. Favorites and Recent History Data Safety

Favorites and recently used exercises must integrate safely with existing storage.

Requirements:

- Preserve existing IDs.
- Avoid duplicated exercise records.
- Preserve personal records.
- Preserve historical workout associations.
- Handle deleted or renamed custom exercises gracefully.
- Maintain backward compatibility with existing user data.

Do not introduce destructive migrations.

## 7. Responsive Design

Ensure that the library works correctly on:

- Small phones
- Standard smartphones
- Large smartphones
- Tablets
- Desktop browsers

Avoid:

- Horizontal scrolling caused by broken layouts
- Overlapping category controls
- Unreadable filter chips
- Excessively tall cards
- Excessive nested scrolling
- Clipped exercise names

Support light and dark modes.

## 8. Exercise Library Acceptance Criteria

Verify the following:

1. Every existing exercise remains accessible.
2. Search works across all categories.
3. Recently Used displays relevant historical exercises.
4. Favorites can be added and removed.
5. Favorites and recent history persist correctly.
6. Categories show appropriate exercises.
7. Compound exercises appear under relevant multiple categories.
8. Equipment filters work.
9. Filters can be cleared.
10. Custom exercises remain accessible.
11. Selecting an exercise works in every relevant workflow.
12. Exercise replacement preserves the active workout.
13. The interface remains responsive with hundreds of exercises.
14. No existing workout history is modified.
15. The UI works in light and dark modes.

**Success criterion:** The user can usually find a familiar exercise within seconds, without scrolling through the entire database.

---

# PART 4 — DATE BOX ALIGNMENT

## Current Problem

Some date boxes appear off-center, unevenly spaced, or asymmetrical.

This makes the interface feel inconsistent.

## Required Improvements

Review all date-related components, including:

- Workout calendar
- Weekly date selector
- Weekly Check-In
- Workout history
- Other date controls

Correct:

- Inconsistent widths
- Uneven heights
- Off-center numbers
- Misaligned weekday labels
- Inconsistent padding
- Uneven gaps
- Different border radii
- Incorrect selected-state alignment
- Text wrapping problems

Use consistent layout rules and reusable styling wherever practical.

Prefer CSS Grid or Flexbox layouts rather than manual positional offsets.

Ensure date boxes remain visually balanced across different viewport sizes.

## Calendar Preferences

Preserve the existing setting supporting:

- Sunday–Saturday
- Monday–Sunday

Ensure that changing the week-start preference does not break layout or calculations.

Verify:

- Month transitions
- Year transitions
- Different screen widths
- Selected and unselected dates
- Current-day styling

Avoid changing historical workout timestamps.

## Quality Standard

All date boxes must look symmetrical, consistently spaced, and professionally aligned.

---

# PART 5 — EXERCISE OPTIONS MENU REFINEMENT

## Current Problem

The options menu opened from each exercise is too large, visually cluttered, and insufficiently organized.

## Required Improvements

Make the menu:

- Smaller
- Cleaner
- More compact
- Easier to understand
- Consistent with Gym Bro's visual identity
- Comfortable to operate on mobile

## 1. Audit Existing Actions

Before changing anything, inventory all currently available exercise actions.

Separate them into:

- Frequent actions
- Secondary actions
- Advanced actions
- Destructive actions

Retain every existing capability.

## 2. Simplify the Primary Menu

Display only the most useful actions immediately.

For example:

- Replace Exercise
- Edit Exercise
- More Options

This example is illustrative.

Select the best structure based on the actual application.

Consider moving less commonly used controls into a secondary menu or context-sensitive interface.

Avoid unnecessary nested menus.

## 3. Visual Design

Requirements:

- Reduced overall menu height
- Concise labels
- Consistent icons
- Comfortable touch targets
- Clear visual hierarchy
- Balanced spacing
- Proper alignment
- Consistent corners and borders
- No viewport overflow
- Reliable menu dismissal

Use a popover or bottom sheet according to the device and interaction context.

Do not obscure important controls unnecessarily.

## 4. Interaction Requirements

Verify:

- Menus open reliably.
- Menus close predictably.
- All actions remain functional.
- Secondary options remain discoverable.
- Destructive actions require appropriate confirmation.
- Menus support keyboard interaction where relevant.
- Focus behavior is accessible.
- Opening menus does not unexpectedly scroll the page.

---

# PART 6 — ACTIVE WORKOUT EXPERIENCE

## Current Problem

During an active workout, the visual distinction between the current set and other sets is not clear enough.

Users should immediately understand which set they are performing and which exercises are already complete.

## 1. Highlight Exactly One Active Set

Implement three distinct visual states.

### Active Set

- Clearly highlighted
- Uses Gym Bro's accent color
- Immediately recognizable
- Only one set may have this appearance at a time

### Completed Set

- No active highlight
- Subtle completion indicator
- Remains editable
- Clearly distinguishable from upcoming sets

### Upcoming Set

- Neutral background
- No active highlighting
- Clearly readable

## 2. Active-Set Logic

During a workout:

1. Determine the next appropriate incomplete set.
2. Highlight that set.
3. Once completed, remove its highlight.
4. Advance to the next relevant set.
5. When an exercise is completed, continue to the next unfinished exercise.

Support:

- Manual active-set selection
- Warm-up sets
- Supersets
- Skipped sets
- Out-of-order completion
- Edited sets
- Reopened sets
- Workout restoration after refresh

Manual selection must not automatically mark intervening sets as complete.

Keep active-set state consistent when exercises or sets are added, removed, replaced, or reordered.

Never display multiple active sets simultaneously.

## 3. Completed Exercise Indicators

When all required sets of an exercise have been completed, display an elegant finished-state indicator.

Possible approaches:

- Small checkmark near exercise title
- Minimal completed label
- Subtle change to the exercise card

Use the least visually intrusive solution that still makes completion obvious.

Avoid excessive green fills, oversized icons, or distracting animations.

Completed exercises must remain expandable and editable.

If a completed set is unchecked, update the exercise completion state immediately.

## 4. Visual Clarity

The workout interface should communicate:

- Current exercise
- Current set
- Completed sets
- Completed exercises
- Remaining work

Avoid adding unnecessary progress widgets.

The goal is clarity with minimal visual clutter.

---

# PART 7 — VISUAL CONSISTENCY & RESPONSIVENESS

Ensure all five improvements fit the existing application.

Maintain consistent:

- Typography
- Spacing
- Alignment
- Colors
- Shadows
- Borders
- Corner radii
- Icons
- Interaction feedback
- Animations
- Light/dark mode styling

Do not introduce unrelated visual changes.

Test common viewport widths:

- 320px
- 375px
- 390px
- 430px
- 768px
- 1024px and above

Check for overflow, clipping, unusual whitespace, and inconsistent alignment.

Where browser-based visual tools are available, inspect actual rendered screens and interactions.

Do not rely solely on code-level inspection.

---

# PART 8 — DATA INTEGRITY & REGRESSION PREVENTION

Preserve all existing user data.

This includes:

- Workout history
- Active workouts
- Custom plans
- Custom exercises
- Personal records
- Measurements
- Goals
- Achievements
- Settings
- Historical analytics

Do not change persistent data structures without safe backward-compatible handling.

Do not reset local storage.

Do not silently delete unsupported records.

If migration is necessary, implement and test it.

Preserve existing PWA functionality and GitHub Pages compatibility.

Do not add a paid AI service or unrelated infrastructure as part of this update.

---

# PART 9 — COMPREHENSIVE TESTING

Test every requested improvement and its interactions with existing features.

## Muscle Map Tests

- Accurate primary muscles
- Meaningful secondary muscle contributions
- Squat-to-glute mapping
- Weighted contribution calculations
- Weekly muscle statistics
- Correct front/back highlighting
- Editing historical workouts
- Light/dark color legibility

## Exercise Library Tests

- Search
- Aliases
- Categories
- Muscle-group filters
- Equipment filters
- Favorites
- Recently used exercises
- Custom exercises
- Exercise selection
- Exercise replacement
- Workout plan integration
- Large exercise databases
- Persistence across refreshes

## Date Alignment Tests

- Consistent box dimensions
- Proper centering
- Sunday-first calendar
- Monday-first calendar
- Month transitions
- Year transitions
- Mobile responsiveness

## Exercise Menu Tests

- Every existing action remains accessible
- Correct open/close behavior
- Proper menu positioning
- Compact appearance
- Destructive action confirmation
- No overflow
- Accessibility

## Active Workout Tests

- Exactly one active set
- Automatic advancement
- Manual selection
- Completed-set styling
- Completed-exercise indicators
- Unchecking completed sets
- Warm-ups
- Supersets
- Reordering
- Workout persistence
- Workout restoration

## Overall Regression Tests

Verify that no changes break:

- Navigation
- Workout saving
- Progression calculations
- Training history
- Existing charts
- Settings
- Exercise management
- PWA behavior
- Data import/export

Run available automated tests and manually inspect critical workflows.

Document which tests were executed and any scenarios that could not be verified.

Fix confirmed regressions before finalizing.

---

# PART 10 — IMPLEMENTATION WORKFLOW

Follow this sequence:

### Phase 1 — Repository Audit

Inspect the codebase, existing functionality, data structures, design system, and tests.

### Phase 2 — Exercise and Muscle Metadata

Correct muscle relationships and build reusable weighted contribution logic.

### Phase 3 — Exercise Library Redesign

Implement:

- Prominent top search
- Recently Used
- Favorites
- Body-part categories
- Relevant filters
- Compact exercise results
- Improved navigation
- Correct selection behavior

### Phase 4 — Muscle Map Visualization

Integrate corrected exercise metadata and weighted contributions into muscle-map displays and weekly statistics.

### Phase 5 — Date Layout Refinement

Correct alignment, symmetry, and responsive behavior.

### Phase 6 — Exercise Options Redesign

Simplify menus while retaining existing functionality.

### Phase 7 — Active Workout Refinement

Implement precise active-set highlighting and completed-exercise indicators.

### Phase 8 — Visual Quality Assurance

Inspect actual screens across multiple devices and both appearance modes.

### Phase 9 — Functional & Regression Testing

Verify all five improvements and important existing features.

### Phase 10 — Preview Deployment

Publish a branch-specific working preview and verify it independently from production.

### Phase 11 — Final Report

Summarize implementation, test results, remaining limitations, and links.

---

# PART 11 — REQUIRED FINAL DELIVERABLES

Provide the following at completion.

## 1. Development Branch

State the exact branch name and confirm all changes are committed there.

## 2. Pull Request

Provide a clickable pull request URL if successfully created.

## 3. Live Preview

Provide a verified, working URL where I can interact with the updated application.

If deployment is unavailable, explain precisely why.

## 4. Changes Implemented

Summarize improvements to:

- Muscle map
- Exercise library
- Date alignment
- Exercise options
- Active workout interface

## 5. Testing Results

List:

- Tests performed
- Passed tests
- Failed tests and corrections
- Unverified scenarios

## 6. Data Integrity

Explain whether storage formats changed and how historical data was protected.

## 7. Remaining Limitations

Identify any incomplete functionality or known issues.

## 8. Merge Status

Explicitly confirm that nothing has been merged into `main`.

---

# FINAL INSTRUCTIONS

This update is exclusively about improving existing functionality and user experience.

Do not redesign Gym Bro unnecessarily.

Do not remove features.

Do not compromise historical user data.

Do not introduce unrelated dependencies or paid services.

Do not stop after producing working code.

Inspect the actual application, correct visual inconsistencies, test important interactions, and refine the results.

The final experience should meet these standards:

**Muscle map:** Anatomically meaningful, including compound exercise contributions.

**Exercise library:** Extremely easy to navigate, with search, Recently Used, and Favorites immediately accessible.

**Dates:** Consistently aligned and visually symmetrical.

**Exercise options:** Compact, intuitive, and free from unnecessary clutter.

**Active workout:** Exactly one highlighted active set and elegant completed-exercise indicators.

**Deployment:** All changes on a separate branch with a working browser preview for review.

**Approval:** Do not merge into `main` without my explicit authorization.

The goal is to make Gym Bro feel like a polished commercial fitness application, where even the smallest interactions have been thoughtfully designed and thoroughly tested.