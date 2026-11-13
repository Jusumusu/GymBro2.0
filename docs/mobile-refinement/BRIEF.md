# GYM BRO — MUSCLE MAP REDESIGN, RECURRING WORKOUTS, NOTIFICATIONS & MOBILE APP UPDATE REPAIR

## YOUR ROLE

Act as an integrated team of senior professionals:

- Senior Frontend Engineer
- Senior UI/UX Designer
- Product Manager
- Fitness Application Designer
- QA Engineer
- PWA and Service Worker Specialist
- Mobile Web Performance Engineer
- GitHub Pages Deployment Specialist

Your task is to implement a focused, production-quality update to the existing **Gym Bro** fitness application.

This update has four primary objectives:

1. **Muscle Map:** Completely redesign the interactive muscle map with a cleaner, more professional anatomical figure and fix its selection bugs.
2. **Recurring Workouts:** Upgrade the workout schedule with recurring weekly sessions.
3. **Notifications:** Introduce optional workout reminders, including a global Notifications On/Off setting.
4. **Mobile App Updates & Performance:** Diagnose and permanently fix the broken mobile app update experience, improve PWA update reliability, and optimize the app for smooth, dependable operation on mobile devices.

This is a targeted refinement update, not a complete application rebuild.

Preserve all existing features, functionality, workout history, exercise data, settings, and the established Gym Bro visual identity.

The final result should feel like a premium, professionally developed fitness application.

---

# PART 1 — BRANCH MANAGEMENT & LIVE PREVIEW

## 1. Separate Development Branch

Before modifying any files:

1. Inspect the repository, existing architecture, current branch, and Git state.
2. Create a separate development branch named:

   `feature/muscle-map-scheduling-refinement`

3. Base it on the latest stable `main`, unless the repository clearly identifies another appropriate integration branch.
4. If the branch already exists, inspect its state before continuing. Never overwrite unrelated work.
5. Implement all changes exclusively on this branch.
6. Do not modify or merge into `main`.
7. Make incremental commits with meaningful descriptions.
8. Run appropriate tests before and after implementation.

## 2. Pull Request

Once implementation is complete:

- Push the development branch to GitHub.
- Create a pull request targeting `main`, if permissions allow.
- Include a summary of changes, testing results, and known limitations.
- Do not automatically merge the pull request.

## 3. Working Browser Preview

I want to open and interact with the updated app on my computer and phone before approving the changes.

Create a working, branch-specific browser preview.

Requirements:

- The preview must include all four improvements.
- It must work on desktop and mobile.
- It must not replace or interfere with production.
- It must not modify production user data.
- It must use correct asset paths and routing.
- It must not cause service worker or cache conflicts with production.
- Preview storage and test notifications must remain isolated from production wherever technically possible.
- It must support testing the new PWA update behavior.

Use an existing preview deployment system if available.

Otherwise, determine the simplest safe approach compatible with the current GitHub Pages/PWA architecture.

Do not introduce paid hosting or services without authorization.

Do not invent a preview URL.

If a working preview cannot be deployed, explain the exact blocker and provide the best available alternative.

**Do not merge into `main` until I explicitly approve the update.**

---

# PART 2 — COMPLETE MUSCLE MAP REDESIGN

## Current Problems

The existing muscle map does not look sufficiently professional.

The body illustration appears messy, overly complicated, and difficult to interpret.

Individual muscles are not clearly distinguished, and the experience does not feel as refined as the rest of Gym Bro.

There is also a specific bug:

**The chest sometimes appears highlighted or selected even when the user has not selected it.**

The goal is to significantly improve visual quality, clarity, and reliability.

## 1. Replace the Existing Body Illustration

Replace the current body figure with a clean, minimalist, professional anatomical illustration.

Prefer SVG or another suitable scalable vector-based representation with independently selectable muscle regions.

### Design Requirements

The figure should have:

- Balanced anatomical proportions
- Clearly identifiable muscle groups
- Clean muscle boundaries
- Symmetrical appearance
- Consistent outline thickness
- Smooth vector shapes
- Minimal internal anatomical detail
- Excellent scalability
- Consistent styling across the application

The result should look like something found in a premium modern fitness application.

### Avoid

- Excessively detailed muscle fibers
- Medical textbook-style complexity
- Messy outlines
- Overlapping shapes
- Cluttered labels
- Awkward body proportions
- Distracting visual effects
- Tiny interaction areas
- Unnecessary 3D elements

Do not copy proprietary artwork from competing applications.

Use original or appropriately licensed assets.

## 2. Extremely Simple Interaction

The primary interaction should be:

**Tap a muscle → It highlights → Its information appears.**

Users should not need complicated gestures, tiny buttons, or multiple menus.

### Requirements

- Muscles should be directly selectable.
- Selecting a muscle should immediately highlight the correct region.
- The selected region should be unmistakable.
- Unselected muscles should remain neutral unless displaying training activity.
- Selecting another muscle should update the selection immediately.
- Users should be able to deselect a muscle.
- Touch interaction should be accurate and responsive.
- Corresponding left and right muscle regions may highlight together when appropriate.

For small muscle regions, provide enlarged invisible hit areas or an accessible alternative selector.

## 3. Front and Back Views

Support both anatomical views.

### Front View

Include relevant visible regions such as:

- Chest
- Shoulders
- Biceps
- Forearms
- Abdominals
- Obliques
- Quadriceps
- Other supported anterior muscle groups

### Back View

Include:

- Trapezius
- Upper back
- Latissimus dorsi
- Triceps
- Lower back
- Glutes
- Hamstrings
- Calves
- Other supported posterior muscle groups

Use a simple Front/Back segmented control or similarly intuitive toggle.

Do not stretch or distort the illustration.

## 4. Selected Muscle Information

When a muscle group is selected, display a compact information section showing relevant existing information:

- Muscle group name
- Recent training activity
- Weekly training contribution
- Exercises targeting the muscle
- Relevant progress statistics

Keep the interface concise and organized.

Use progressive disclosure for advanced details.

The figure itself should remain the visual focus.

## 5. Fix the Phantom Chest Highlight Bug

Investigate and permanently resolve the issue where the chest appears selected without user interaction.

Do not merely hide the visual symptom.

Inspect possible causes including:

- Incorrect initial component state
- Hardcoded selected states
- SVG fill properties
- Incorrect CSS selectors
- Shared component state
- Stale selections
- Event handlers
- Incorrect muscle identifiers
- Overlay rendering
- Training data being incorrectly interpreted as user selection

### Critical Distinction

Separate:

**User Selection:** A muscle explicitly selected by the user.

**Training Activity:** A muscle highlighted because of recorded exercise activity.

These states must not be confused.

For example, the chest may display training intensity because the user performed bench presses.

That must not make the chest appear actively selected.

### Required Behavior

- No phantom selection on initial load.
- No unintentional chest highlighting.
- Selecting one muscle does not activate unrelated muscles.
- Deselecting clears the active selection.
- Switching between front and back views behaves consistently.
- Reopening the map does not create invalid selections.
- If no activity data exists, the figure displays a clean neutral state.

## 6. Maintain Accurate Muscle Contributions

Preserve the improved compound-exercise logic from previous updates.

The redesigned muscle map must continue representing:

- Primary muscles
- Secondary muscles
- Relevant stabilizing muscles
- Estimated relative training contributions
- Weighted weekly muscle activity

Barbell squats must continue registering meaningful quadriceps and glute involvement.

Use the existing centralized muscle classification system wherever possible.

Do not present weighted contributions as exact scientific measurements of muscle activation or hypertrophy.

## 7. Clear Visual States

Implement distinct visual states:

- Neutral
- Trained
- Selected
- Selected and Trained
- Keyboard Focused

Make each state understandable and visually distinct.

Ensure appropriate contrast in both light and dark modes.

Do not rely exclusively on color.

## 8. Accessibility and Responsiveness

The figure must:

- Scale cleanly across devices
- Maintain correct proportions
- Avoid clipping
- Support touch interaction
- Support keyboard navigation
- Provide accessible muscle names
- Use appropriate contrast
- Have practical interaction targets
- Respect reduced-motion preferences

## 9. Required Testing

Verify:

1. The new illustration renders correctly.
2. Front and back views work.
3. Supported muscles are selectable.
4. Selection highlights the correct regions.
5. The chest does not appear selected unexpectedly.
6. Deselecting works.
7. Training overlays remain distinct from selection.
8. Compound exercise contributions remain accurate.
9. Historical muscle statistics remain intact.
10. Light and dark modes display correctly.
11. Touch and keyboard interaction work.
12. No regions are clipped or distorted.

Inspect the actual rendered illustration rather than relying solely on source code.

---

# PART 3 — RECURRING WORKOUT SCHEDULING

## Current Problem

Users need to schedule repeated workouts manually.

Someone training every Monday, Wednesday, and Friday should not need to recreate those sessions every week.

## Primary Objective

Allow users to schedule recurring workout sessions.

The schedule should function like a simple calendar recurrence system designed specifically for fitness.

## 1. Recurring Workout Creation

When scheduling a workout, provide:

**Workout**

Select an existing workout plan.

**Starting Date**

Choose the first scheduled date.

**Time**

Optionally specify a scheduled time.

**Repeat**

- Does not repeat
- Weekly
- Custom weekly schedule

For custom schedules, allow selecting multiple weekdays:

- Sunday
- Monday
- Tuesday
- Wednesday
- Thursday
- Friday
- Saturday

### Example

Workout: Full Body

Repeat: Weekly

Days: Monday, Wednesday, Friday

Time: 18:00

Gym Bro should automatically display those sessions on the selected weekdays every week.

## 2. Recurrence Duration

Support:

- Repeat until stopped
- Repeat until a selected end date

Use sensible defaults.

Keep advanced recurrence settings unobtrusive.

## 3. Editing Recurring Workouts

Support the following scopes where relevant:

- This occurrence only
- This and future occurrences
- Entire recurring series

Explain the effect of each option.

Users should be able to:

- Change the scheduled time
- Change selected weekdays
- Change the associated workout
- Reschedule individual occurrences
- Modify future occurrences
- Stop the recurring schedule

Never silently modify an entire series when the user intended to change one occurrence.

## 4. Skipping and Canceling

Allow users to:

- Skip one occurrence
- Cancel one occurrence
- Reschedule one occurrence
- Stop an entire recurring series

Skipping one session must not delete the recurring schedule.

Stopping recurrence must not delete previously completed workout records.

## 5. Calendar Integration

Recurring workouts should appear automatically in the existing training calendar.

Clearly distinguish:

- Upcoming workouts
- Completed workouts
- Missed workouts
- Skipped workouts
- Canceled occurrences

Use subtle visual indicators.

Avoid clutter.

## 6. Completion Behavior

When a recurring workout is completed:

- Mark the appropriate occurrence as completed.
- Preserve the actual completed workout record.
- Keep future occurrences scheduled.
- Prevent duplicate records.
- Do not mark future sessions as complete.

Preserve actual completion times even when they differ from scheduled times.

## 7. Calendar Preferences

Preserve the existing settings:

- Sunday–Saturday
- Monday–Sunday

Recurring workouts must remain on their actual weekdays regardless of calendar layout.

Changing the first day of the week must not shift recurring sessions.

## 8. Dates and Time Zones

Handle:

- Month transitions
- Year transitions
- Daylight saving changes
- Local workout times
- Start and end dates
- Missing scheduled times

Preserve the intended local weekday and time.

Avoid fixed-millisecond recurrence calculations that create daylight saving errors.

## 9. Recurring Schedule Architecture

Use a stable, maintainable recurrence model.

Prefer storing recurrence rules and generating visible calendar occurrences rather than creating unlimited future workout records.

Support occurrence-specific exceptions.

Keep separate:

- Scheduled occurrences
- Recurring rules
- Completed workout history

Preserve existing schedule data and use backward-compatible migrations where necessary.

## 10. Recurrence Testing

Verify:

1. Weekly Monday workouts recur correctly.
2. Multiple weekdays work.
3. One-time sessions remain unaffected.
4. Future occurrences appear correctly.
5. Duplicate sessions are prevented.
6. Editing one occurrence preserves the series.
7. Editing future occurrences works.
8. Skipping a workout preserves recurrence.
9. Canceling recurrence preserves completed history.
10. Completing a session leaves future occurrences intact.
11. Week-start preferences work correctly.
12. Month and year transitions work.
13. Daylight saving changes do not shift intended times.
14. Schedules persist across restarts.

---

# PART 4 — NOTIFICATIONS & WORKOUT REMINDERS

## Primary Objective

Add optional workout reminders that are simple, useful, and user-controlled.

## 1. Global Notifications On/Off Setting — Mandatory

Add a clearly visible control under:

**Settings → Notifications**

Include a master switch:

**Workout Notifications: On / Off**

### When Notifications Are OFF

- Suppress all workout reminders.
- Cancel or invalidate pending reminders controlled by the app where technically possible.
- Preserve recurring workout schedules.
- Preserve individual reminder preferences.
- Keep all other app functionality working.

### When Notifications Are ON

- Restore appropriate reminder behavior.
- Preserve previously configured reminder timings.
- Recalculate upcoming reminders.
- Respect system/browser permissions.
- Avoid duplicate notifications.

The app-level toggle and operating-system notification permission are separate concepts.

If the toggle is ON but permission is denied, explain the limitation clearly.

Do not claim reminders are active when required permissions or infrastructure are unavailable.

## 2. Permission Behavior

- Do not request permission automatically on startup.
- Ask only after an intentional user action.
- Handle denial gracefully.
- Do not repeatedly prompt.
- Make the permission state understandable.

## 3. Reminder Timing

Support:

- At workout time
- 15 minutes before
- 30 minutes before
- 1 hour before
- 1 day before

Use a sensible default.

## 4. Workout-Specific Reminders

Allow users to configure reminders when scheduling workouts.

Example:

Workout: Full Body

Time: 18:00

Repeat: Monday, Wednesday, Friday

Reminder: 30 minutes before

The master notification switch must always take precedence.

## 5. Reminder Content

Use concise messages such as:

"Gym Bro — Full Body workout in 30 minutes."

"Your scheduled workout starts soon."

"Time for your Full Body workout."

Do not send reminders for canceled or skipped sessions.

Avoid excessive or repetitive notifications.

## 6. PWA and GitHub Pages Constraints

Gym Bro currently operates as a GitHub Pages-hosted PWA.

Inspect the service worker and notification architecture.

Important:

- Browser notifications require permission.
- Ordinary JavaScript timers do not provide reliable closed-app reminders.
- Service workers are not continuous background processes.
- Mobile support varies by browser and operating system.
- Reliable closed-app push may require a separate backend.

Do not implement unreliable workarounds or introduce paid services without authorization.

Implement the best supported functionality, including:

- In-app reminders
- Active-app browser notifications where supported
- Persistent reminder preferences
- Recurrence-aware reminder calculations
- Clear permission and availability states

Document any backend requirements for reliable background push notifications.

## 7. Reliability

Ensure:

- No duplicate reminders
- No reminders for skipped or canceled sessions
- Edited sessions update reminder calculations
- Disabling notifications suppresses reminders
- Re-enabling does not create a flood of missed reminders
- Past sessions do not trigger new notifications
- Local scheduled times are respected

## 8. Settings Interface

Suggested structure:

**Notifications**

Workout Notifications  
On / Off

Reminder Timing  
30 minutes before

Permission Status  
Allowed / Blocked / Not requested

Show or enable secondary settings only when appropriate.

Keep the interface professional and uncluttered.

## 9. Notifications Testing

Verify:

1. Global preference persists.
2. OFF suppresses reminders.
3. ON restores appropriate reminder behavior.
4. Individual preferences remain saved.
5. Permission handling works.
6. Recurring workouts generate appropriate reminders.
7. Skipped sessions do not generate reminders.
8. Edited sessions update reminders.
9. Duplicates are prevented.
10. Unsupported browsers degrade gracefully.
11. Closed-app limitations are accurately documented.

---

# PART 5 — MOBILE APP UPDATE BUG & PWA RELIABILITY

## Critical Existing Problem

The installed Gym Bro application on my phone is not updating correctly.

When an update is available, the app automatically takes me to the update page or update screen, but that screen immediately closes or disappears.

It closes so quickly that I cannot:

- Read the update information or release notes.
- Understand what has changed.
- Tap the Update button.
- Intentionally initiate or confirm the update.

This makes the update experience confusing and unreliable.

**Investigating and permanently fixing this issue is a high priority for this release.**

Do not simply add a delay or hide the problem.

Identify and correct the actual cause.

## 1. Investigate the Existing Update System

Inspect every part of the existing PWA update architecture, including:

- Service worker registration
- Service worker lifecycle
- Cache versioning
- Asset caching strategies
- Update detection logic
- Update screen components
- Release notes display
- Update button handlers
- Navigation and routing
- Application state management
- App visibility changes
- Page refresh behavior
- Automatic update behavior
- Installed PWA startup behavior
- GitHub Pages deployment configuration

Find the specific reason the update screen disappears.

Investigate possibilities such as:

- Automatic navigation immediately after opening
- An unintended reload
- Incorrect modal state handling
- Service worker activation triggering premature reload
- `controllerchange` event handling
- Multiple event listeners
- Competing lifecycle handlers
- Cached old JavaScript running alongside updated assets
- Component unmounting
- Unintended redirects
- Version comparison bugs
- Update state being reset
- Race conditions
- Browser lifecycle changes on mobile

Do not assume which cause is responsible.

Reproduce the issue and use available debugging evidence to determine the cause.

## 2. Redesign and Stabilize the Update Experience

Create a clean, reliable, professional update flow.

When a new app version is available, the user should see a clear update notice.

Suggested experience:

**Gym Bro Update Available**

Version information, where available.

**What's New**

A short, readable summary of improvements.

**Actions**

- Update Now
- Later

Use a compact modal, panel, or dedicated screen that fits the application's existing design.

### Critical Requirements

- The update screen must remain visible until the user intentionally acts or an explicitly explained lifecycle event requires otherwise.
- It must never close immediately without explanation.
- The user must have enough time to read all update information.
- Release notes must be readable and scrollable.
- The Update button must be visible and easy to tap.
- The Later option must work.
- The interface must not be obscured by the bottom navigation.
- The screen must work correctly in light and dark mode.
- The update notice must not repeatedly reopen in a loop.

Do not automatically dismiss or redirect away from the update screen merely because a background update was detected or downloaded.

## 3. Correct Update Button Behavior

When the user taps **Update Now**, Gym Bro should:

1. Confirm that the update is available.
2. Preserve relevant active application data.
3. Safely initiate the appropriate update or activation process.
4. Wait for the necessary service worker transition when applicable.
5. Reload or navigate only when required and safe.
6. Open the updated version of the application.
7. Preserve existing workout history, settings, and plans.
8. Avoid repeatedly showing the same update prompt.

Use a clear loading or progress state if an update operation takes noticeable time.

Do not show fake progress percentages.

If an update fails, provide a helpful error message and a safe retry option.

Do not create reload loops.

## 4. Do Not Force Updates Unexpectedly

An update should not interrupt a user in the middle of a workout.

If an update becomes available during an active session:

- Preserve the active workout.
- Show a nonintrusive update notice or defer it appropriately.
- Allow the user to finish logging.
- Never discard incomplete sets or unsaved input.
- Do not force an immediate reload.

If the user selects Later, continue the current session normally.

The update should remain discoverable through an appropriate interface without becoming intrusive.

## 5. Service Worker Lifecycle Audit

Review and correct service worker update handling.

Pay particular attention to:

- Registration
- Waiting workers
- Installing workers
- Activation
- `updatefound`
- `controllerchange`
- `skipWaiting`
- `clients.claim`
- Cache cleanup
- Application reload behavior

Do not blindly call `skipWaiting()` or trigger page reloads without considering user data and the intended update flow.

Coordinate update activation with the user's explicit decision whenever supported by the underlying architecture.

Ensure there are no duplicate event handlers causing multiple reloads.

Prevent old and new application assets from being mixed incompatibly.

If current service worker behavior is responsible for the screen closing, fix the underlying lifecycle logic.

## 6. Cache Management

Audit all PWA caching behavior.

Look for:

- Stale JavaScript
- Outdated CSS
- Old HTML shells
- Incorrect asset URLs
- Conflicting cache versions
- Incomplete precaching
- Inconsistent cache cleanup
- Cached update metadata
- Service workers controlling unintended paths
- Production and preview environments sharing cache scope

Ensure new deployments are recognized reliably.

Keep the update mechanism safe for offline use.

Do not indiscriminately clear all browser storage to force updates.

**Application caches and user workout data must be treated separately.**

Clearing obsolete app assets must not delete workout history, plans, personal records, or user preferences.

## 7. Version Detection

Implement or repair a reliable version detection mechanism.

Requirements:

- Detect when a newer deployed app version is available.
- Avoid false-positive update prompts.
- Avoid repeated prompts for the same installed version.
- Display accurate version information where available.
- Keep version identifiers consistent with the deployed build.
- Avoid relying exclusively on stale cached version metadata.

Use a simple, maintainable strategy compatible with GitHub Pages.

Ensure the update flow handles users skipping several releases.

## 8. Release Notes Experience

The update screen should display useful information about the new version.

For example:

**What's New in Gym Bro**

- Redesigned interactive muscle map
- Recurring weekly workout schedules
- Workout reminder settings
- Mobile performance and stability improvements

Requirements:

- Short, clear descriptions
- Consistent formatting
- Comfortable reading on mobile
- Proper scrolling for longer release notes
- No clipped content
- No unexpected closing
- Accurate release information

Do not invent release notes from unrelated changes.

Store release information in a maintainable way so future updates can use the same system.

## 9. Mobile Installation and Update Compatibility

Test the update flow in relevant mobile environments.

Where available, include:

- Android Chrome
- Installed Android PWA
- iPhone Safari
- Installed iPhone Home Screen web app

Account for platform-specific differences.

Do not assume every browser supports identical installation or service worker behavior.

Where a particular update action is unsupported, provide accurate guidance rather than a broken button.

Test both:

- Updating the application while installed
- Opening an older installed version after a new deployment

## 10. Update Recovery

Ensure the application can recover if:

- The network connection drops during an update.
- The browser closes during an update.
- The user backgrounds the application.
- A service worker fails to install.
- Cached assets are incomplete.
- A previous version remains active.
- The user dismisses an update.
- A newer update becomes available before an earlier update is installed.

Avoid leaving the application in a blank, broken, or permanently loading state.

Provide a recovery path without destroying personal data.

---

# PART 6 — MOBILE PERFORMANCE & SMOOTHNESS

Alongside repairing the update flow, perform a focused mobile performance audit.

The goal is to make Gym Bro feel smooth, reliable, and responsive on everyday smartphones.

## 1. Startup and Loading

Review:

- Initial app loading
- JavaScript bundle size
- Asset loading
- Font loading
- Service worker startup
- Storage initialization
- Rendering of the first screen

Improve unnecessary delays.

Avoid showing blank screens during startup.

Use appropriate loading or skeleton states only where beneficial.

Prevent visible layout shifts and theme flashing.

## 2. Navigation and Scrolling

Verify that:

- Bottom navigation responds immediately.
- Screen transitions are smooth.
- Scrolling does not stutter unnecessarily.
- Long exercise lists remain responsive.
- Modals open and close reliably.
- Popovers do not cause unexpected page jumps.
- The keyboard does not obscure important controls.
- Fixed elements respect mobile safe areas.

Avoid expensive animations and unnecessary rendering work.

## 3. Workout Logging Performance

Ensure that:

- Checking a set feels immediate.
- Weight and repetition inputs respond without lag.
- Completing a set does not freeze the interface.
- Autosaving does not block user interaction.
- The app remains responsive during long workouts.
- Progress is preserved when the app is backgrounded or reopened.

Do not sacrifice data integrity for performance.

## 4. Rendering Optimization

Inspect for:

- Unnecessary component rerenders
- Expensive calculations on every interaction
- Repeated processing of workout history
- Large unoptimized lists
- Unnecessary DOM updates
- Oversized graphics
- Memory leaks
- Redundant event listeners

Optimize actual bottlenecks rather than making speculative code changes.

Use profiling tools where available.

## 5. Offline and Network Behavior

Core workout functionality should continue working offline.

Verify that temporary network failures do not interrupt:

- Active workout tracking
- Exercise selection
- Existing workout history
- Saved plans
- Local calculations
- Offline-accessible application screens

Ensure the app recovers gracefully when connectivity returns.

## 6. Mobile Memory and Stability

Check for issues caused by:

- Large historical datasets
- Repeatedly opening and closing screens
- SVG rendering
- Service worker lifecycle changes
- Long workout sessions
- Backgrounding and restoring the PWA

Avoid memory leaks and unnecessary background processing.

## 7. Performance Acceptance Criteria

The updated app should:

- Open reliably.
- Respond promptly to common interactions.
- Scroll smoothly through exercise lists.
- Maintain stable navigation.
- Keep workout logging responsive.
- Avoid unnecessary full-page reloads.
- Handle update notifications without interrupting workouts.
- Preserve saved data after app restarts.
- Remain usable offline for supported core functionality.

Use measurable performance checks where tools permit.

Document actual improvements rather than claiming performance gains without evidence.

---

# PART 7 — PWA UPDATE & NOTIFICATION COMPATIBILITY

Because this release modifies both the update mechanism and notification functionality, verify that they work together correctly.

Requirements:

- Updating the app must not reset notification preferences.
- Updating the app must not remove recurring schedules.
- Service worker changes must not accidentally duplicate notifications.
- The update screen must not conflict with notification permission prompts.
- Disabling workout notifications must not disable update detection.
- Update prompts and workout reminders must have clearly separate responsibilities.
- Production and preview service workers must remain isolated.
- Background update checks must not unexpectedly close the application.

Do not introduce a paid notification backend or dedicated AI infrastructure as part of this update.

---

# PART 8 — VISUAL CONSISTENCY & UX

All changes must match Gym Bro's established premium design language.

Maintain consistent:

- Typography
- Spacing
- Colors
- Border radii
- Cards
- Buttons
- Icons
- Navigation
- Form controls
- Dialogs
- Light mode
- Dark mode

Avoid redesigning unrelated areas.

### Muscle Map

The anatomical figure must be the visual centerpiece.

Keep interaction straightforward:

**Tap → Highlight → View information.**

### Scheduling

Creating a recurring workout should require only a few intuitive actions.

Keep advanced settings secondary.

### Notifications

The master On/Off switch should be immediately understandable.

### Mobile Updates

The update screen should be readable, stable, unobtrusive, and easy to interact with.

The user must remain in control of when a pending update is applied.

---

# PART 9 — DATA INTEGRITY & SAFETY

Preserve all existing:

- Workout history
- Active workouts
- Exercise records
- Muscle contribution data
- Workout plans
- Personal records
- Goals
- Achievements
- Scheduling data
- App settings
- Tracking statistics
- Appearance preferences
- Notification preferences

Do not reset local storage.

Do not silently discard records.

Use safe, backward-compatible migrations when necessary.

Never delete user data as a shortcut to solving caching or update issues.

Test updating from existing app versions containing real or representative historical data.

Ensure active workouts are recoverable after permitted reloads or app restarts.

---

# PART 10 — COMPREHENSIVE QUALITY ASSURANCE

Perform automated testing, integration testing, and visual testing where supported.

## A. Muscle Map Tests

- New anatomical illustration
- Front/back views
- Accurate muscle selection
- Chest selection bug
- Selected versus trained states
- Compound exercise contributions
- Touch targets
- Keyboard accessibility
- Light/dark mode
- Responsive scaling

## B. Recurring Workout Tests

- Single weekly recurrence
- Multiple weekday recurrence
- Editing individual occurrences
- Editing recurring series
- Skipping sessions
- Canceling sessions
- Workout completion
- Calendar preferences
- Date transitions
- Daylight saving changes
- Data persistence

## C. Notification Tests

- Global On/Off setting
- Reminder preferences
- Permission handling
- Recurring reminders
- Canceled reminders
- Edited reminders
- Duplicate prevention
- Browser compatibility
- Graceful fallback

## D. Mobile Update Tests — High Priority

Test the following scenarios:

1. Open an older installed PWA after a new version is deployed.
2. Verify that the update screen remains visible.
3. Verify that release notes can be read completely.
4. Verify that the Update button is clickable.
5. Tap Update and confirm that the new version loads correctly.
6. Tap Later and confirm the application continues working.
7. Confirm the same update does not repeatedly appear after successful installation.
8. Trigger an update while a workout is active.
9. Verify that unsaved workout inputs are protected.
10. Disconnect the network during update detection or installation.
11. Reopen the app after an interrupted update.
12. Test multiple consecutive deployments.
13. Check for duplicate reloads.
14. Check service worker lifecycle events.
15. Verify that old and new assets do not become incompatible.
16. Verify that existing user data survives updating.
17. Verify that cached versions are eventually replaced correctly.
18. Test both installed-PWA and normal-browser behavior where supported.
19. Confirm the update screen does not close without intentional user action.
20. Check for layout, scrolling, and touch problems on mobile.

Use a controlled test setup with multiple application versions to exercise the actual service worker update lifecycle.

Do not rely only on freshly installing the latest version.

## E. Mobile Performance Tests

Check:

- Startup time
- Navigation responsiveness
- Exercise library scrolling
- Muscle map responsiveness
- Workout logging
- Autosave behavior
- Background and foreground transitions
- Memory usage where measurable
- Offline availability
- PWA startup after installation
- Interaction with update dialogs

Use realistic historical workout data where possible.

## F. General Regression Testing

Verify that the update does not break:

- Workout logging
- Workout plans
- Exercise library
- Exercise selection
- Workout history
- Gains Dashboard
- Weekly Check-In
- Progress calculations
- Settings
- Data export/import
- Existing PWA functionality

Test responsive layouts at approximately:

- 320px
- 375px
- 390px
- 430px
- 768px
- 1024px and above

Inspect the actual rendered application.

Do not claim tests passed unless they were executed.

---

# PART 11 — IMPLEMENTATION WORKFLOW

Follow this sequence.

## Phase 1 — Repository Audit

Inspect the existing architecture, data models, service worker, PWA configuration, deployment process, muscle map, scheduling system, and notification functionality.

Identify existing functionality and compatibility risks.

## Phase 2 — Mobile Update Bug Diagnosis

Investigate the broken update screen immediately.

Determine why it closes before the user can read the content or select Update.

Document the cause and identify the safest correction.

## Phase 3 — PWA Update Repair

Implement a stable update flow with:

- Reliable update detection
- Persistent update screen
- Readable release notes
- Functional Update and Later actions
- Safe service worker transitions
- Proper caching behavior
- Protection of active workouts

## Phase 4 — Muscle Map Redesign

Replace the figure, implement clean selection, separate selection from training overlays, and fix the chest bug.

## Phase 5 — Recurring Workout Architecture

Implement recurrence rules, generated occurrences, exceptions, and safe persistence.

## Phase 6 — Scheduling Interface

Add recurring workout controls and integrate them into the calendar.

## Phase 7 — Notifications

Implement the global On/Off toggle, reminder preferences, permission handling, and supported reminder behavior.

## Phase 8 — Mobile Performance Optimization

Audit and optimize startup, navigation, workout logging, scrolling, rendering, and offline reliability.

## Phase 9 — Visual Refinement

Review all modified screens for alignment, simplicity, responsiveness, and design consistency.

## Phase 10 — Comprehensive Testing

Run relevant automated, functional, mobile, visual, update-lifecycle, and regression tests.

Fix confirmed issues.

## Phase 11 — Branch-Specific Preview

Deploy and verify a working preview without modifying production.

Where possible, provide a way to validate the update flow across two test versions.

## Phase 12 — Final Report

Document changes, test results, remaining limitations, preview access, and merge status.

---

# PART 12 — FINAL DELIVERABLES

Provide the following at completion.

## 1. Development Branch

The exact branch name containing all changes.

## 2. Pull Request

A clickable GitHub pull request link, if successfully created.

## 3. Live Preview

A verified, working URL where I can test the updated application.

## 4. Muscle Map Improvements

Explain:

- Which illustration was implemented
- How muscle selection works
- How the chest selection bug was fixed
- How training-contribution data is preserved

## 5. Recurring Scheduling

Explain:

- How recurring workouts are created
- How they repeat
- How occurrences are edited, skipped, or canceled
- How workout history is preserved

## 6. Notifications

Explain:

- How the master On/Off toggle works
- How reminder preferences are saved
- Which notification capabilities are functional
- Which features depend on browser support
- Whether any backend would be required for closed-app notifications

## 7. Mobile Update Bug Resolution — Mandatory

Explain:

- The identified root cause of the update screen closing unexpectedly
- The specific code changes that resolved it
- How the new update flow works
- How release notes are displayed
- How users initiate or defer updates
- How active workouts are protected
- How service worker caching and versioning are handled
- Which mobile environments were actually tested

If the original issue could not be reproduced, state that honestly and document the evidence and safeguards added.

## 8. Mobile Performance Results

Summarize:

- Performance problems identified
- Optimizations implemented
- Measured improvements where available
- Remaining performance concerns

## 9. Testing Report

List tests performed, outcomes, failed scenarios, and any unverified behavior.

## 10. Data Integrity

Confirm whether storage schemas changed and how workout history and user data were protected.

## 11. Known Limitations

Document any unresolved issues or external requirements.

## 12. Merge Status

Explicitly confirm that nothing has been merged into `main`.

---

# FINAL QUALITY STANDARD

The finished update must meet these requirements:

**Muscle Map:** A professional, minimalist, interactive vector-based anatomical illustration with accurate muscle selection and no phantom chest highlighting.

**Recurring Workouts:** Users can schedule workouts once and have them repeat automatically on selected weekdays.

**Notifications:** A simple master On/Off setting controlling workout reminders, with reliable behavior within supported browser capabilities.

**Mobile Updating:** The update interface must remain open, allow users to read release notes, and provide a working Update button. Updates must be reliable, user-controlled, and safe for existing workout data.

**Mobile Performance:** Smooth navigation, responsive logging, reliable persistence, efficient rendering, and dependable PWA behavior.

**Visual Quality:** Consistent, modern, clean, and polished in both light and dark modes.

**Data Safety:** No loss of workouts, plans, goals, achievements, history, or settings.

**Development Safety:** All changes must remain on the separate development branch, with a reviewable preview before merging.

Do not introduce unrelated features, unnecessary architectural changes, paid services, or dedicated AI infrastructure.

Do not stop after achieving a successful build.

Investigate the actual problems, inspect the rendered application, test real interactions, and refine the implementation until it is reliable.

**Most importantly: Fix the mobile update problem at its source. Do not use temporary hacks that simply make the symptom less noticeable.**

**Do not merge into `main` until I have reviewed the updated application and explicitly approved it.**