# GYM BRO — ACTIVE WORKOUT EXPERIENCE, REST TIMER & INTERFACE REFINEMENT

## YOUR ROLE

Act as an integrated team of senior professionals:

- Principal Frontend Engineer
- Senior UI/UX Designer
- Mobile Interaction Designer
- Fitness Product Manager
- PWA and Browser API Specialist
- Animation and Interaction Engineer
- Quality Assurance Engineer

Your mission is to implement a focused, production-quality update to the existing **Gym Bro** fitness application.

This update consists of nine improvements:

1. Fix the overlapping Start Date and Duration fields in the Training Block creator.
2. Replace the Next Exercise button in Focus Mode with intuitive horizontal swipe navigation.
3. Introduce smooth animations when completing sets, including the possibility of the active blue highlight sliding to the next set.
4. Completely reorganize and visually refine the Settings interface.
5. Add an audible countdown during the last five seconds of the rest timer, followed by a clear completion alert.
6. Make the rest timer visible and easily accessible in Focus Mode without covering important workout information.
7. Prevent the rest timer from starting after the final set of the entire workout.
8. Investigate and implement a Keep Screen Awake feature for active workouts, where supported.
9. Improve the active workout's top exercise navigation bar with automatic scrolling and an integrated, elegant workout progress indicator.

The goal is to make Gym Bro feel smoother, more intuitive, reliable, and professionally designed.

This is a targeted improvement update, not a full application redesign.

Preserve the application's existing functionality, design identity, data, and navigation structure unless an explicitly approved change requires otherwise.

---

# PART 1 — DEVELOPMENT BRANCH & LIVE PREVIEW

## 1. Separate Development Branch

Before modifying anything:

1. Inspect the current repository and Git state.
2. Identify the latest stable application version.
3. Review the existing workout, timer, Settings, and Training Block implementations.
4. Create a separate development branch named:

   `feature/workout-interactions-ux-refinement`

5. If this branch already exists, inspect its state before continuing.
6. Make every implementation change on this branch.
7. Do not modify or merge into `main`.
8. Create incremental, meaningful commits.
9. Preserve rollback capability.

## 2. Pull Request

When the update is ready:

- Push the development branch to GitHub.
- Create a pull request targeting `main`, if permissions allow.
- Include a clear change summary.
- Document test results and unresolved issues.

Do not merge automatically.

## 3. Live Browser Preview

Provide a working preview of the updated application.

The preview must:

- Work on mobile and desktop browsers.
- Contain all implemented improvements.
- Remain separate from production.
- Preserve existing production data.
- Avoid service worker and cache conflicts.
- Use correct GitHub Pages asset paths and routing.
- Allow me to test the new workout interactions directly.

Use existing preview infrastructure wherever possible.

Do not introduce paid services without permission.

Do not fabricate preview URLs.

**Do not merge into main until I explicitly approve the update.**

---

# PART 2 — MANDATORY VISUAL DESIGN APPROVAL

## Standing Requirement

Before making meaningful aesthetic changes, show me multiple visual alternatives.

For this update, I particularly want to review the design of:

- Focus Mode navigation and swipe indicators
- Set completion animations
- Settings organization
- Rest timer positioning
- Top workout navigation and progress indicator

## Design Review Process

For each significant design decision:

1. Create three polished visual alternatives.
2. Show actual screenshots, rendered prototypes, or interactive examples.
3. Explain the differences briefly.
4. Recommend the strongest approach.
5. Allow me to choose or combine elements.
6. Wait for my explicit approval before finalizing the visual design.

Do not create three nearly identical variations.

Explore genuinely different layouts, interactions, or visual treatments.

Whenever possible, consolidate the design alternatives into one cohesive review gallery rather than overwhelming me with separate decisions.

Technical bug fixes, state logic, and nonvisual implementation work may proceed independently.

**Do not treat your preferred design as automatically approved.**

---

# PART 3 — TRAINING BLOCK CREATOR LAYOUT FIX

## Current Problem

In the Create Training Block interface, the Start Date and Duration fields overlap.

They appear to occupy the same space or collide at certain screen widths.

This makes the form difficult to read and use.

## 1. Diagnose the Layout Issue

Inspect:

- Parent container dimensions
- CSS Grid and Flexbox rules
- Field widths
- Input minimum widths
- Date-picker sizing
- Duration selector sizing
- Padding and margins
- Responsive breakpoints
- Text wrapping
- Positioning rules
- Font scaling

Identify the actual cause.

Do not hide the problem using arbitrary pixel offsets.

## 2. Correct the Layout

Ensure that:

- Start Date and Duration never overlap.
- Both fields remain fully visible.
- Labels are clearly readable.
- Controls have consistent heights.
- Padding and spacing are symmetrical.
- Inputs remain comfortable to tap.
- The layout responds correctly to narrow screens.

Use a responsive arrangement.

For example:

- Two columns on sufficiently wide screens.
- Vertically stacked fields on narrow screens.

Use whichever approach produces the cleanest result within Gym Bro's existing design system.

## 3. Functional Integrity

Do not break:

- Start date selection
- Duration selection
- Training Block creation
- Editing existing blocks
- Date calculations
- Training schedule integration
- Saved Training Block data

## 4. Testing

Verify the layout at:

- 320px
- 375px
- 390px
- 430px
- 768px
- 1024px and above

Test both light and dark modes.

Ensure the mobile keyboard, date picker, and duration menu do not obscure other controls.

A straightforward alignment correction may be implemented without separate design approval if it preserves the existing aesthetic.

---

# PART 4 — SWIPE NAVIGATION IN FOCUS MODE

## Current Problem

Focus Mode currently relies on a Next Exercise button.

I want navigating between exercises to feel more natural and intuitive.

Instead of relying on a dedicated Next Exercise button, users should be able to swipe horizontally between exercises.

## 1. Primary Interaction

Implement horizontal swipe navigation.

Expected behavior:

**Swipe left:** Move to the next exercise.

**Swipe right:** Return to the previous exercise.

The direction must remain intuitive and consistent throughout the workout.

Support both touch interaction and an appropriate desktop navigation alternative.

## 2. Smooth Transitions

When the user swipes:

- The current exercise should transition smoothly.
- The next or previous exercise should appear naturally.
- The animation should communicate movement direction.
- Inputs should remain readable.
- The transition should not feel abrupt or jarring.

Consider a subtle horizontal sliding transition.

Avoid exaggerated animations or unnecessary 3D effects.

## 3. Gesture Reliability

Distinguish horizontal exercise navigation from vertical scrolling.

Requirements:

- Vertical scrolling must continue working.
- Horizontal swipes should be recognized reliably.
- Small accidental movements should not trigger navigation.
- Dragging numeric inputs must not change exercises.
- Interacting with sliders, charts, or menus must not accidentally navigate.
- Horizontal navigation must not interfere with the phone's system gestures.
- Avoid hijacking browser back navigation near screen edges.

Use appropriate gesture thresholds and directional detection.

Support touch cancellation and interrupted gestures.

Do not install unnecessary global gesture listeners.

## 4. Exercise Boundaries

When viewing the first exercise:

- Swiping backward must not navigate to an invalid exercise.

When viewing the final exercise:

- Swiping forward must not accidentally complete the workout.

Use subtle feedback at the beginning or end of the sequence.

Do not wrap automatically from the final exercise to the first unless an existing approved interaction specifically requires it.

## 5. Preserve Workout State

Swiping must not:

- Complete exercises automatically.
- Change logged weights.
- Change repetitions.
- Remove RIR values.
- Reset rest timers.
- Delete workout notes.
- Lose active workout progress.

Users should be able to return to previous exercises and edit recorded sets.

The workout must remain fully navigable out of order.

## 6. Superset Compatibility

If the current workout includes supersets:

- Preserve the existing superset logic.
- Display the appropriate exercise sequence.
- Allow intuitive movement within and between supersets.
- Do not mark skipped exercises complete.
- Keep rest timer behavior consistent with the workout structure.

## 7. Visual Navigation Feedback

Explore subtle ways to indicate that the screen is swipeable.

Potential options:

- Small exercise position dots
- A compact exercise counter
- A partial preview of adjacent exercise cards
- A minimal directional indicator
- An animated first-use gesture hint

Do not clutter Focus Mode with excessive instructions.

The interaction should become obvious after initial use.

## 8. Design Approval

Present three interaction concepts.

Suggested starting points:

**Concept A — Horizontal Exercise Carousel**

Exercise cards slide naturally between positions.

**Concept B — Full-Screen Swipe Panels**

Each exercise occupies a focused panel with a clean horizontal transition.

**Concept C — Minimal Swipe Navigation**

Maintain the existing layout while adding directional swipe transitions and a compact position indicator.

Show realistic interactive prototypes where possible.

Recommend the approach that best balances speed, clarity, and ease of use.

Wait for my selection before finalizing the visual treatment.

## 9. Accessibility

Swipe gestures must not be the only possible navigation mechanism.

Preserve keyboard navigation and a compact accessible alternative for users who cannot or prefer not to swipe.

Remove the prominent Next Exercise button if the approved design no longer requires it, but do not make exercises inaccessible.

## 10. Testing

Verify:

- Forward swiping
- Backward swiping
- First exercise boundary
- Final exercise boundary
- Vertical scrolling
- Numeric input interaction
- Supersets
- Completed exercises
- Workout restoration
- Desktop accessibility
- Mobile gesture conflicts

---

# PART 5 — SMOOTH ACTIVE-SET COMPLETION ANIMATION

## Current Problem

When a user completes a set, the active highlighted area moves to the next set without a sufficiently smooth transition.

I want this interaction to feel polished and satisfying.

One possible solution is having the blue highlighted background slide naturally from the completed set to the next incomplete set.

## 1. Primary Objective

Create a smooth visual transition when completing a set.

The interaction should communicate:

1. The current set was successfully completed.
2. The completed set now has its finished-state styling.
3. The next set becomes active.

The user should immediately understand what happened.

## 2. Explore Animation Approaches

Create three distinct animation prototypes.

### Concept A — Sliding Highlight

The active blue highlight smoothly moves from the completed set to the next set.

The completed set transitions to its established success styling.

The movement should feel continuous rather than like a fade-out followed by a separate fade-in.

### Concept B — Completion Pulse

The completed set receives a subtle confirmation animation.

The next set becomes highlighted through a smooth, restrained transition.

### Concept C — Flowing Progression

The highlight transitions between rows while the completed set receives a small checkmark animation and gentle success-color change.

These are suggestions. Explore better alternatives if appropriate.

## 3. Animation Requirements

The animation must:

- Feel smooth and responsive.
- Be visually restrained.
- Preserve clarity.
- Avoid excessive glow.
- Avoid unexpected movement of surrounding content.
- Work in light and dark mode.
- Maintain the application's approved color system.

Use performant animation techniques where possible.

Prefer transform and opacity animations over repeatedly animating expensive layout properties when appropriate.

Use a short, purposeful animation duration.

Avoid delaying actual workout state changes merely to display animation.

## 4. Active and Completed States

Maintain three distinct states:

**Active Set**
- Uses the existing approved active highlight.
- Clearly identified as the current set.

**Completed Set**
- Uses the established success appearance.
- Retains the checkmark.
- Remains editable.

**Upcoming Set**
- Neutral appearance.
- No active or completed highlight.

At most one set may display active-set emphasis at a time.

## 5. State and Animation Coordination

The underlying workout state must remain authoritative.

The animation should reflect successful state changes rather than determining whether those changes occur.

Handle:

- Completing sets normally
- Completing sets out of order
- Reopening a completed set
- Skipping sets
- Moving between exercises
- Completing the final set
- Rapid repeated taps
- Switching into Focus Mode
- Leaving Focus Mode
- Workout refreshes

Avoid animations moving toward nonexistent or offscreen elements.

If the destination set is not visible, use an appropriate transition instead of forcing a confusing screen jump.

Do not allow animations to create duplicate set-completion events.

## 6. Accessibility

Respect reduced-motion preferences.

Provide an immediate or simplified state transition when reduced motion is requested.

Do not rely exclusively on animation to communicate completion.

## 7. Design Approval

Show me three working or visually representative animation options.

Allow me to choose the one I prefer before final implementation.

Do not finalize the animation without approval.

---

# PART 6 — SETTINGS PAGE COMPLETE ORGANIZATION

## Current Problem

The Settings interface has become cluttered and visually inconsistent.

As more features have been added, Settings has become harder to navigate.

I want Settings to look clean, organized, professional, and intuitive.

## 1. Audit Existing Settings

Inspect every current setting.

Create a complete inventory of:

- Appearance options
- Units
- Calendar preferences
- Notifications
- Rest timer preferences
- Workout preferences
- Progression preferences
- Data export/import
- Backups
- Privacy settings
- PWA and update settings
- Other existing options

Use the actual repository as the source of truth.

Do not remove existing controls merely to simplify the appearance.

## 2. Create Logical Sections

Organize related settings into clear categories.

A possible structure:

### Appearance
- Light mode
- Dark mode
- System preference
- Other existing visual preferences

### Workout Preferences
- Default rest duration
- Automatic rest timer
- Keep Screen Awake
- Other workout behavior preferences

### Notifications & Alerts
- Workout reminders
- Rest timer sounds
- Rest completion alerts
- Notification preferences

### Calendar & Scheduling
- Start of week
- Scheduling preferences
- Other supported calendar options

### Training Preferences
- Units
- Progression preferences
- Other implemented training configuration

### Data & Backup
- Export data
- Import data
- Backup status
- Backup reminders
- Restore options

### About & App
- Version information
- Updates
- App information
- Other existing controls

These categories are suggestions.

Inspect the real settings before finalizing the best structure.

Avoid unnecessary nesting.

## 3. Visual Hierarchy

Improve:

- Section headings
- Spacing
- Grouped controls
- Divider placement
- Input alignment
- Toggle consistency
- Iconography
- Description text
- Navigation between settings sections

Use a coherent design system.

Avoid making every individual setting a large card.

Use compact, readable rows where appropriate.

## 4. Improve Discoverability

A user should be able to find a setting quickly.

Frequently used controls should be easy to access.

Advanced or less frequently used settings may be grouped into secondary sections.

However, do not bury common settings behind multiple unnecessary screens.

Consider a Settings search function only if the actual number of settings justifies it.

Do not add functionality simply to make Settings seem more sophisticated.

## 5. Preserve Behavior

All existing settings must continue to work.

Ensure:

- Changes save reliably.
- Toggle states reflect actual stored preferences.
- Changes apply immediately where appropriate.
- Settings remain consistent after refreshing.
- No unrelated data is reset.
- Navigation remains predictable.

## 6. Three Design Concepts

Before the visual redesign, provide three approaches.

### Concept A — Grouped Minimal Settings

A single clean page with clearly separated sections and compact controls.

### Concept B — Category-Based Settings

A small number of primary settings categories leading to dedicated, organized subpages.

### Concept C — Hybrid Settings

Frequently used settings on the main page with more advanced controls organized into secondary categories.

Show actual mobile mockups.

Include light and dark versions.

Recommend the strongest option based on clarity, efficiency, and future scalability.

Wait for my approval.

## 7. Testing

Verify:

- Every existing setting remains available.
- Every toggle works.
- Preferences persist.
- No duplicate controls produce contradictory states.
- Navigation works.
- Layouts are responsive.
- Text remains readable.
- Settings remain usable on small screens.

---

# PART 7 — REST TIMER: FINAL FIVE-SECOND COUNTDOWN

## Primary Objective

Improve rest timer completion feedback.

During the last five seconds, provide a countdown that helps the user anticipate the end of rest.

When the timer reaches zero, provide a clear completion alert.

## 1. Five-Second Countdown

When the timer reaches five seconds remaining:

- Provide clear visual feedback.
- Play a brief countdown sound each second when sound is enabled and permitted.
- Continue through 5, 4, 3, 2, 1.
- Clearly distinguish the final completion signal from the preceding countdown sounds.

Example:

5 → beep

4 → beep

3 → beep

2 → beep

1 → beep

0 → distinct completion sound or alert

Do not play overlapping or excessively loud sounds.

## 2. Sound Preferences

Add appropriate settings for:

- Countdown sounds On/Off
- Rest completion sound On/Off
- Optional vibration, where supported

Keep these controls simple.

Sound should be easy to disable.

Respect relevant existing notification and alert preferences while distinguishing an in-app rest timer alert from scheduled workout push notifications.

## 3. Browser and PWA Limitations

Investigate the actual supported behavior of the browser audio APIs.

On mobile, sound playback may require an earlier user interaction.

Use a proper audio initialization strategy compatible with user-initiated workout actions.

Do not assume audio can always play while the app is backgrounded or the phone is locked.

Provide graceful fallbacks.

Do not claim system-level alert reliability that has not been verified.

## 4. Precise Timer Behavior

The countdown must be based on accurate remaining time.

Do not use accumulating interval ticks as the only source of truth.

Prevent:

- Duplicate beeps
- Skipped countdown states
- Repeated completion sounds
- Negative timer values
- Audio continuing after cancellation
- Multiple sound sequences after pause and resume

If the app is backgrounded and the timer has already expired when it resumes, show the completed state without replaying a long backlog of sounds.

## 5. Pause and Restart Behavior

When paused:

- Stop countdown sounds.
- Preserve remaining time.

When resumed:

- Continue correctly.
- Do not duplicate prior countdown events.

When reset or skipped:

- Cancel pending sounds and completion events.

## 6. Rest Completion Feedback

At zero:

- Stop the timer.
- Display a clearly completed state.
- Play a distinct sound when enabled and supported.
- Provide vibration where supported and enabled.
- Avoid triggering the alert repeatedly.

## 7. Testing

Test:

1. Normal countdown.
2. Final five-second sounds.
3. Completion signal.
4. Muted settings.
5. Pausing at three seconds.
6. Resuming.
7. Resetting.
8. Skipping.
9. Switching exercises.
10. Backgrounding the app.
11. Locking and reopening the phone.
12. Rapid timer restarts.
13. Browser audio restrictions.
14. No duplicate alerts.

---

# PART 8 — REST TIMER VISIBILITY IN FOCUS MODE

## Current Problem

Rest time is not sufficiently visible or accessible in Focus Mode.

I want to see how much rest time remains without leaving the focused workout interface.

However, the timer must not cover or interfere with important workout information.

## 1. Required Behavior

When a rest timer is active:

- Display remaining rest time in Focus Mode.
- Keep the countdown easy to read.
- Allow quick pause, resume, or skip.
- Preserve the timer when switching exercises.
- Avoid covering set inputs.
- Avoid blocking exercise navigation.
- Do not obscure previous performance.
- Respect phone safe areas.

## 2. Explore Different Placements

Create three visual concepts.

### Concept A — Compact Header Timer

Integrate a small timer into the Focus Mode header.

### Concept B — Floating Timer

Use a compact floating timer positioned where it does not block important content.

### Concept C — Integrated Set Footer

Place the timer near the active-set controls or below the current exercise.

These are starting points.

Consider other placements if they provide a better experience.

## 3. Smart Visibility

The timer should be prominent while active but unobtrusive when inactive.

Do not permanently occupy large amounts of screen space.

Use consistent visual styling with the selected Gym Bro theme.

## 4. Integration

Use the existing rest timer state.

Do not create a separate timer implementation for Focus Mode.

Normal workout mode and Focus Mode must share the same authoritative countdown.

Switching modes must not reset or duplicate the timer.

## 5. Approval

Present the three placements using realistic mobile screenshots.

Explain tradeoffs.

Wait for my preferred option before finalizing.

---

# PART 9 — DO NOT START REST TIMER AFTER FINAL WORKOUT SET

## Current Problem

The rest timer sometimes starts after completing the final set of the workout.

This is unnecessary because there is no additional work remaining.

## Required Behavior

When the user completes the final outstanding working set of the entire workout:

- Mark the set complete.
- Update workout progress.
- Trigger the normal workout-completion flow.
- Do not start a new rest timer.

If a timer is already running because of an unusual state transition, reconcile it appropriately without losing workout data.

## Important Distinction

The final set of an individual exercise is not necessarily the final set of the entire workout.

If other exercises remain, normal rest behavior may still apply according to the user's preferences.

Determine completion from actual workout state, not merely the last visible row.

Handle:

- Exercises performed out of order
- Skipped exercises
- Warm-up sets
- Optional sets
- Supersets
- Manually added sets
- Shortened workouts
- Reopened completed sets

Do not introduce unexpected rest periods after finishing the workout.

## Testing

Verify:

1. Timer starts after a normal set when enabled.
2. Timer behaves correctly between exercises.
3. Timer does not start after the final workout set.
4. Skipped or optional sets do not incorrectly prevent workout completion.
5. Out-of-order exercise completion works.
6. Supersets behave correctly.
7. Finishing the workout cancels or resolves active rest state appropriately.
8. Reopening an exercise does not cause duplicate timers.

---

# PART 10 — KEEP SCREEN AWAKE DURING WORKOUTS

## Primary Objective

Investigate and implement a user-controlled way to prevent the phone's screen from automatically sleeping during an active workout.

I want Gym Bro to remain visible while I'm training without having to repeatedly unlock my phone.

## 1. Technical Investigation

Investigate the browser Screen Wake Lock API.

Determine support in:

- Android Chrome
- Installed Android PWAs
- iPhone Safari
- Installed iPhone Home Screen web apps
- Other relevant mobile browsers

Account for the actual deployment environment.

Gym Bro is hosted through GitHub Pages, which supports HTTPS, but browser and operating-system behavior may still vary.

Do not assume universal support.

## 2. New Workout Setting

Where supported, add:

**Settings → Workout Preferences → Keep Screen Awake**

Use an On/Off toggle.

Suggested description:

"Prevent your screen from automatically sleeping during an active workout when supported by your device."

Choose a sensible default, considering battery use and usability.

Persist the preference.

## 3. Wake Lock Lifecycle

When Keep Screen Awake is enabled:

1. Request a screen wake lock when the user starts an active workout, following any browser interaction requirements.
2. Maintain the lock while the workout is active and the document is visible, where supported.
3. Release it when the workout finishes or is canceled.
4. Release it when the user disables the setting.
5. Handle automatic release by the browser.
6. Attempt to reacquire the lock when the application becomes visible again if the workout is still active and the preference remains enabled.

Use a single coordinated wake-lock controller.

Avoid duplicate or conflicting requests.

## 4. Battery and Platform Restrictions

Wake locks may fail or be released because of:

- Low battery
- Power-saving mode
- Browser restrictions
- Hidden application state
- Operating-system behavior
- Unsupported devices

Handle these situations gracefully.

Do not attempt to bypass the device's system safety or power controls.

If unavailable, explain the limitation clearly.

Do not repeatedly generate intrusive error messages.

## 5. User Experience

If enabled and supported, the feature should work quietly.

Do not show unnecessary permanent indicators.

A subtle status indicator in Workout Settings or relevant workout controls may be appropriate.

If the device cannot keep the screen awake, provide a concise explanation.

## 6. Testing

Verify:

- Wake lock is requested at workout start.
- Wake lock remains active when supported.
- Disabling the option releases it.
- Workout completion releases it.
- Workout cancellation releases it.
- Backgrounding behaves correctly.
- Returning to the app restores the lock where supported.
- Low-battery or unsupported-device failures are handled.
- No lingering wake locks remain after workouts.
- No duplicate requests or repeated errors occur.

Document which environments were actually tested.

---

# PART 11 — ACTIVE WORKOUT TOP BAR & PROGRESS INDICATOR

## Current Problem

The horizontal exercise navigation bar at the top of an active workout does not automatically follow the exercise being performed.

As the user moves through the workout, the active exercise may become hidden outside the visible portion of the bar.

I also want a clean, elegant progress indicator integrated into this area.

## 1. Automatic Horizontal Tracking

When the active exercise changes:

- Automatically scroll the top exercise bar to keep the active exercise visible.
- Prefer centering the active exercise when practical.
- Use smooth scrolling.
- Avoid sudden jumps.
- Do not scroll the entire page unnecessarily.
- Do not move if the active item is already appropriately visible.

The behavior must work when navigating through:

- Set completion
- Automatic exercise advancement
- Manual exercise selection
- Focus Mode swipes
- Superset transitions
- Workout restoration

## 2. Preserve Manual Scrolling

Users should still be able to swipe or scroll through the exercise bar manually.

Automatic centering must not continuously fight the user's gestures.

Avoid unnecessary recentering on unrelated state updates.

Keep the scroll behavior predictable.

## 3. Exercise Status Indicators

The top bar should make the workout structure easy to understand.

Clearly distinguish:

- Current exercise
- Completed exercises
- Upcoming exercises

Use compact, consistent indicators.

Avoid oversized badges or distracting colors.

## 4. Integrate a Workout Progress Bar

Add an elegant progress indicator connected to actual workout completion.

Potential approaches:

### Concept A — Thin Progress Line

A slim progress bar directly beneath the exercise navigation.

### Concept B — Integrated Progress Track

A line or track visually integrated with the exercise sequence.

### Concept C — Compact Progress Indicator

A refined progress line combined with a small percentage or completed-set count.

These are starting points.

Explore other options if they provide better clarity.

## 5. Accurate Progress Calculation

Base progress on actual completed workout requirements.

Prefer a clearly defined measure such as:

Completed required working sets / Total required working sets.

Do not inflate progress simply because an exercise was opened.

Handle:

- Warm-up sets
- Optional sets
- Skipped exercises
- Added sets
- Removed sets
- Out-of-order completion
- Supersets
- Shortened workouts

Do not claim the workout is 100% complete while required training work remains unfinished.

Use a consistent definition across the top bar and any existing workout progress displays.

## 6. Smooth Progress Animation

When a set is completed:

- Update the progress indicator.
- Animate the change subtly.
- Keep the currently active exercise visible.
- Maintain consistency with the active-set completion animation.

Do not delay actual state updates for animations.

Respect reduced-motion preferences.

## 7. Interaction

Users should still be able to tap an exercise in the top bar to navigate directly to it.

This must remain compatible with horizontal swipe navigation in Focus Mode.

Ensure that tap, swipe, and automatic scrolling behavior do not conflict.

## 8. Design Approval

Present three visual alternatives for the combined exercise navigation and progress indicator.

Use representative states:

- Beginning of workout
- Middle of workout
- Almost finished
- Completed

Recommend the clearest, most compact design.

Wait for approval before final visual implementation.

## 9. Testing

Verify:

1. Active exercise is kept visible.
2. Automatic scrolling works smoothly.
3. Manual bar scrolling remains usable.
4. Tapping an exercise works.
5. Focus Mode swipe navigation updates the bar.
6. Completed exercise indicators are correct.
7. Progress calculations are accurate.
8. Progress updates after set completion.
9. Editing completed sets recalculates progress.
10. Added and skipped sets are handled correctly.
11. Long workout plans remain usable.
12. Small mobile screens do not overflow.
13. No unexpected vertical page scrolling occurs.

---

# PART 12 — CROSS-FEATURE INTEGRATION

These improvements must work together as one cohesive workout experience.

## Focus Mode + Top Exercise Bar

Swiping between exercises should update the active exercise and automatically reposition the top bar.

## Set Completion + Progress Indicator

Completing a set should:

1. Update the saved workout state.
2. Apply the completed-set styling.
3. Animate the active highlight appropriately.
4. Update workout progress.
5. Advance the active set when appropriate.
6. Start the rest timer only when appropriate.

## Rest Timer + Focus Mode

Both workout modes must use the same timer state.

Switching between modes must not reset or duplicate the timer.

## Rest Timer + Final Set

Completing the entire workout must not initiate unnecessary rest.

## Keep Screen Awake + Active Workouts

The wake-lock feature should operate only when appropriate and should not remain active after the workout ends.

## Settings + New Preferences

Integrate new timer, audio, and screen-awake preferences into the reorganized Settings interface.

Do not create duplicate or contradictory controls.

## Accessibility

All new gestures and animated interactions must retain accessible non-gesture alternatives and respect reduced-motion settings.

---

# PART 13 — DATA INTEGRITY & FUNCTIONALITY PRESERVATION

Preserve all existing features and user data.

Including:

- Workout history
- Active workouts
- Workout plans
- Training blocks
- Exercise records
- Personal records
- RIR
- Progression history
- Exercise notes
- Recurring schedules
- Training analytics
- Gains Dashboard
- Weekly Check-Ins
- Achievements
- Goals
- Measurements
- Appearance preferences
- Notification settings
- Backup data
- Rest timer preferences

Do not reset local storage.

Do not delete historical records.

Do not silently overwrite user preferences.

Use backward-compatible migrations if necessary.

Preserve GitHub Pages and PWA functionality.

Do not introduce paid infrastructure or dedicated AI hosting.

---

# PART 14 — MOBILE PERFORMANCE & RESPONSIVENESS

Gym Bro is primarily a mobile workout application.

The updated experience must work smoothly on everyday phones.

Test:

- 320px
- 375px
- 390px
- 430px
- 768px
- 1024px and larger

Pay particular attention to:

- iPhone Safari
- Installed iPhone Home Screen PWAs
- Android Chrome
- Installed Android PWAs

Verify:

- Smooth gestures
- Accurate timer behavior
- Correct animations
- Fast set logging
- Stable navigation
- Correct safe-area spacing
- Proper keyboard interaction
- No horizontal overflow
- No clipped content
- Responsive Settings layouts
- Consistent light and dark modes
- Reliable workout persistence

Avoid unnecessary dependencies, expensive animations, and repeated layout calculations.

Use browser performance tools where available.

Preserve the existing PWA update process.

Do not reintroduce previously fixed update-screen issues.

---

# PART 15 — COMPREHENSIVE TESTING

Create or expand automated tests for the new functionality.

Use browser-based interaction testing where available.

## Required Test Groups

### Training Block Layout
- No overlapping fields
- Correct responsive layout
- Functional input controls
- Light/dark compatibility

### Focus Mode Navigation
- Swipe left/right
- Gesture thresholds
- Vertical scrolling
- Input interactions
- Superset navigation
- Boundaries
- Accessible alternatives

### Set Completion Animation
- Correct completion state
- Smooth transitions
- No duplicate completions
- Out-of-order sets
- Reduced motion
- Responsive performance

### Settings
- Every setting retained
- Correct categorization
- Functional controls
- Persistence
- Clean responsive styling

### Rest Timer
- Final five-second countdown
- Sound and alert preferences
- Completion signal
- Accurate elapsed time
- Pause/resume
- Focus Mode visibility
- No rest after final workout set
- No duplicate timer instances

### Screen Wake Lock
- Support detection
- Request lifecycle
- Release behavior
- Visibility changes
- Failure handling
- Workout completion cleanup

### Top Exercise Bar
- Auto-follow active exercise
- Manual scrolling
- Active-state indication
- Progress accuracy
- Swipe integration
- Smooth updates

## Regression Tests

Verify existing functionality remains intact:

- Workout logging
- Workout saving
- Focus Mode
- Exercise library
- Workout-plan management
- Training blocks
- Progressive overload
- Muscle map
- Gains Dashboard
- Calendar
- Weekly Check-In
- Settings
- Data export/import
- PWA updating
- Offline functionality

Do not claim tests passed unless they actually ran.

Document any mobile-specific behavior that could not be verified.

---

# PART 16 — REQUIRED DEVELOPMENT WORKFLOW

Follow this process.

## Phase 1 — Repository Audit

Inspect the existing workout interface, Focus Mode, timer architecture, Settings, Training Block layout, and exercise navigation bar.

Identify existing behavior and root causes of reported bugs.

## Phase 2 — Technical Bug Fixes

Fix:

- Training Block field overlap
- Rest timer incorrectly starting after the final workout set
- Any underlying rest timer state issues

Implement the underlying functionality for wake lock, navigation, and progress calculation where possible without finalizing unapproved visual designs.

## Phase 3 — Design Exploration

Prepare three professional visual options for each major design area:

- Focus Mode swipe transitions
- Set completion animation
- Settings organization
- Rest timer placement
- Top exercise navigation and progress indicator

Consolidate these into a clear review package.

## Phase 4 — Visual Review & Approval

Present the concepts with screenshots or interactive prototypes.

Recommend the strongest choices.

**Wait for my selections before implementing the final aesthetic treatments.**

Continue independent nonvisual technical work if appropriate.

## Phase 5 — Approved UI Implementation

Implement the approved visual and interaction concepts faithfully.

Ensure they fit the existing Gym Bro design system.

## Phase 6 — Functional Integration

Connect all changes to the existing workout state, timer, settings, and PWA lifecycle.

Avoid duplicate logic.

## Phase 7 — Visual Refinement

Review actual rendered screens and correct alignment, spacing, typography, and responsiveness issues.

## Phase 8 — Comprehensive Testing

Run automated, integration, and browser tests.

Fix confirmed problems.

## Phase 9 — Branch-Specific Preview

Deploy and verify a working preview that does not affect production.

## Phase 10 — Final Report

Summarize the changes, testing results, known limitations, and preview access.

Do not merge into main.

---

# PART 17 — FINAL DELIVERABLES

## Before Aesthetic Approval

Provide:

1. Three Focus Mode navigation concepts.
2. Three set completion animation concepts.
3. Three Settings organization concepts.
4. Three rest timer placement concepts.
5. Three exercise navigation/progress-bar concepts.
6. Actual screenshots or interactive previews where possible.
7. Professional recommendations.
8. A design gallery URL, if successfully deployed.

## After Implementation

Provide:

### 1. Development Branch
Exact branch name.

### 2. Pull Request
Clickable PR URL, if created.

### 3. Live Preview
Verified URL to the updated application.

### 4. Training Block Layout
Explanation of the overlap fix.

### 5. Focus Mode
Explanation of swipe navigation and gesture behavior.

### 6. Set Animation
Description of the selected animation and completion-state handling.

### 7. Settings
Summary of the new organization and confirmation that all existing settings remain available.

### 8. Rest Timer
Explanation of countdown sounds, completion alerts, Focus Mode placement, and final-set behavior.

### 9. Keep Screen Awake
Explanation of the implementation and browser support or limitations.

### 10. Exercise Navigation
Explanation of automatic scrolling, progress calculation, and exercise selection behavior.

### 11. Design Approval Record
Which concepts were presented and selected.

### 12. Testing Results
Tests actually performed and their outcomes.

### 13. Data Integrity
Confirmation of preservation measures and any migration details.

### 14. Known Limitations
Unresolved issues, browser limitations, or unverified behavior.

### 15. Merge Status
Explicit confirmation that nothing has been merged into `main`.

Do not invent previews, links, test results, or completed functionality.

---

# FINAL QUALITY STANDARD

This update should make Gym Bro's workout experience feel exceptionally smooth, intuitive, and reliable.

The user should be able to:

- Create training blocks without broken layouts.
- Swipe effortlessly between exercises in Focus Mode.
- Experience satisfying, polished set-completion transitions.
- Navigate a clean, professionally organized Settings interface.
- Hear a useful five-second rest countdown and completion alert when enabled and supported.
- See rest time without leaving Focus Mode.
- Finish a workout without an unnecessary rest timer.
- Keep the screen awake during workouts where supported.
- Follow workout progress through a responsive, automatically scrolling exercise navigation bar.

Everything should work together naturally.

Do not implement features in isolation without considering their interactions.

Do not introduce unrelated changes.

Do not sacrifice reliability for visual effects.

Do not change existing workout data or training logic unnecessarily.

## NON-NEGOTIABLE RULES

1. Work on a separate Git development branch.
2. Present three alternatives before finalizing meaningful aesthetic changes.
3. Wait for my explicit design approval.
4. Preserve all existing functionality and user data.
5. Maintain strong mobile performance.
6. Do not introduce paid infrastructure.
7. Provide a working preview wherever technically possible.
8. Do not merge into `main` until I explicitly authorize it.

**The goal is to make Gym Bro feel effortless to use during an actual workout, with professional-quality transitions, navigation, visual clarity, and reliable behavior.**