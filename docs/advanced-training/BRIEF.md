# GYM BRO — MAJOR USER EXPERIENCE & TRAINING INTELLIGENCE UPDATE

## YOUR ROLE

Act as an integrated team of senior professionals:

- Principal Frontend Engineer
- Senior UI/UX and Product Designer
- Fitness Application Product Manager
- Exercise Science and Strength Training Specialist
- PWA and Mobile Performance Engineer
- Data Security and Backup Specialist
- Calendar Integration Engineer
- Quality Assurance Engineer

Your mission is to implement six major improvements to the existing **Gym Bro** fitness application while preserving its established functionality, data, structure, and visual identity.

The six improvements are:

1. Backup Protection and Data Recovery
2. Workout Focus Mode
3. Training Blocks and Periodization
4. Time-Adaptive Workouts
5. Exercise Feedback and Personal Notes
6. Phone Calendar Integration

There is also a new, mandatory development requirement:

**Any meaningful aesthetic or UI redesign must be presented to me as three visual design options for approval BEFORE the final design is implemented.**

This is a major feature update, but it is not a complete application rebuild.

Prioritize a clean, intuitive, premium user experience, functionality preservation, reliability, and maintainability.

---

# PART 1 — DEVELOPMENT BRANCH AND APPROVAL

## 1. Separate Git Branch

Before modifying anything:

1. Inspect the current repository, architecture, and Git state.
2. Identify existing features, storage mechanisms, and application dependencies.
3. Create a separate development branch named:

   `feature/advanced-training-experience`

4. If that branch already exists, inspect it and avoid overwriting unrelated work.
5. Implement all changes exclusively on this branch.
6. Do not modify or merge into `main`.
7. Make incremental, logically organized commits.
8. Preserve rollback capability.

## 2. Pull Request

When implementation is complete:

- Push the branch to GitHub.
- Create a pull request targeting `main`, if permissions allow.
- Include the completed features, tests, and known limitations.
- Do not merge automatically.

## 3. Branch-Specific Preview

Provide a working preview where I can test the application on my phone and computer.

The preview must:

- Contain the implemented changes.
- Preserve production functionality.
- Not modify production data.
- Not interfere with production service workers or caches.
- Use correct paths and routing.
- Work on mobile and desktop.
- Remain separate from the live application.

Use existing free preview infrastructure where possible.

Do not introduce paid services without permission.

Do not provide an invented or unverified URL.

**I must explicitly approve the update before it is merged into main.**

---

# PART 2 — MANDATORY VISUAL DESIGN APPROVAL SYSTEM

## Critical New Requirement

From this update onward, whenever a feature involves a meaningful aesthetic change, redesign, or new user interface, you must first present several design options.

Do not independently finalize the visual design without my approval.

This rule applies to:

- New feature screens
- Significant layout changes
- Navigation redesigns
- Major component redesigns
- New dashboards
- New modal designs
- Visual changes to existing workflows
- New design patterns that materially affect the app's appearance

It does not apply to invisible technical changes, straightforward bug fixes that preserve appearance, or minor alignment corrections consistent with the approved design system.

## 1. Generate Three Design Options

For each substantial visual redesign, create **three professionally designed alternatives**.

Each option should be:

- Visually polished
- Consistent with Gym Bro's branding
- Modern and minimal
- Mobile-first
- Practical and usable
- Distinct enough to make the choice meaningful

Do not create three nearly identical designs with different colors.

Explore genuinely different approaches to layout, information hierarchy, spacing, and interaction patterns while preserving the established visual identity.

For example, a new Workout Focus Mode could have:

**Concept A — Minimal Focus**

One large exercise card, prominent set inputs, very little surrounding information.

**Concept B — Performance Focus**

Current exercise, previous performance, active-set inputs, and compact training statistics.

**Concept C — Guided Focus**

A step-by-step workout interface emphasizing the active set and next action.

These are illustrative. Develop better concepts when appropriate.

## 2. Show Actual Visual Previews

Whenever possible, provide:

- Screenshots
- Rendered mockups
- Isolated UI prototypes
- Interactive browser previews

Prefer actual visual output over text-only descriptions.

Show each concept at realistic mobile dimensions.

Include light and dark modes where appearance differs meaningfully.

If design-rendering or browser tools are unavailable, provide the most concrete reviewable alternative possible and clearly explain the limitation.

Do not claim screenshots or previews exist unless they were actually generated.

## 3. Explain the Differences

For each concept, briefly explain:

- Visual approach
- User experience advantages
- Possible disadvantages
- Suitability for Gym Bro
- Your professional recommendation

Make a recommendation based on usability, simplicity, and visual quality.

## 4. Wait for My Selection

**Do not implement the final visual design until I select an option.**

Allow me to:

- Choose Concept A, B, or C.
- Request adjustments.
- Combine elements from multiple concepts.
- Ask for additional alternatives.

Once I choose, implement the approved design faithfully.

Do not silently substitute a different visual approach.

If a later change materially departs from the approved design, request renewed approval.

## 5. Continue Technical Work Where Possible

Design approval should not unnecessarily block independent backend or technical work.

You may continue:

- Data modeling
- Calculation logic
- Storage improvements
- Scheduling logic
- Testing
- Nonvisual refactoring
- API and integration architecture

However, do not finalize unapproved aesthetic work.

If multiple features share the same design language, consolidate their design options into a coherent review package rather than overwhelming me with separate approval requests.

## 6. Visual Consistency

After a concept is approved, ensure it integrates naturally with the rest of Gym Bro.

Maintain consistency across:

- Typography
- Spacing
- Colors
- Cards
- Buttons
- Icons
- Modal styles
- Navigation
- Animations
- Light mode
- Dark mode

Use the existing design system wherever practical.

**This visual approval procedure is a permanent development rule for future Gym Bro updates.**

---

# PART 3 — BACKUP PROTECTION AND DATA RECOVERY

## Primary Objective

Make users confident that their workout history and progress are safe.

Gym Bro stores valuable long-term information, and losing that data would severely damage the user experience.

Improve backup visibility, reminders, export reliability, and restoration.

## 1. Backup Status in Settings

Add a clearly organized section:

**Settings → Backup & Data**

Display:

- Last successful backup date
- Backup type
- Backup status
- Manual backup action
- Restore from backup action

Distinguish between:

- Data currently saved locally
- A backup file successfully exported
- A verified cloud backup, if supported

Do not claim that data is backed up merely because it exists in local browser storage.

Only display a successful backup timestamp when the app has reliable evidence of an actual completed backup operation.

## 2. Backup Reminders

Implement optional reminders encouraging users to export their data.

Possible intervals:

- Weekly
- Monthly
- Every three months
- Never

Use the last known successful backup or export information to determine when a reminder is appropriate.

Keep reminders unobtrusive.

Avoid repeatedly prompting the user.

Respect the application's global notification settings where relevant.

## 3. Complete Data Export

Ensure export includes supported user-owned data:

- Workout history
- Workout plans
- Custom exercises
- Personal records
- Body measurements
- Goals
- Achievements
- Scheduling information
- Training blocks
- Exercise notes
- Relevant preferences
- Progress photos where technically feasible and explicitly selected

Use a versioned backup format.

Ensure exported files can be restored.

## 4. Reliable Restoration

Implement a safe restore process.

Requirements:

1. Select a backup file.
2. Validate its format and schema.
3. Display a preview of its contents.
4. Explain whether restoration will merge or replace existing records.
5. Require confirmation before destructive changes.
6. Preserve a recovery path where practical.
7. Verify the restoration result.

Never silently overwrite existing workout history.

Handle older backup versions through explicit migrations.

Reject corrupted or unsupported files gracefully.

## 5. Optional Encrypted Backup

Investigate client-side encryption for portable backup files.

Where appropriate, implement password-protected encrypted exports using established browser cryptography APIs and authenticated encryption.

Requirements:

- Encrypt before exporting or uploading.
- Never store encryption passwords in plaintext.
- Use appropriate key derivation.
- Clearly explain that losing the password may make the backup unrecoverable.
- Test encryption and decryption.
- Protect metadata where feasible.

Do not invent a custom cryptographic algorithm.

## 6. Cloud Backup and Device Sync

Evaluate options for future secure cloud backup and cross-device synchronization.

Because Gym Bro currently uses GitHub Pages, do not pretend that automatic cloud synchronization can be achieved through static hosting alone.

If infrastructure is required:

- Keep it optional.
- Do not create paid services without approval.
- Do not introduce unnecessary accounts.
- Design the local data layer so synchronization can be added later.
- Document required infrastructure and security considerations.

Implement usable local backups now, even if cloud synchronization remains an optional future integration.

## 7. Backup Testing

Test:

- Export
- Import
- Historical data preservation
- Corrupted backups
- Older backup formats
- Duplicate records
- Missing fields
- Encryption and decryption
- Large backup files
- Storage interruptions
- Backup timestamp accuracy
- Recovery after updates

---

# PART 4 — WORKOUT FOCUS MODE

## Primary Objective

Create a distraction-free active workout experience.

During training, users should be able to focus entirely on the exercise and set they are currently performing.

## 1. Focus Mode

Add an optional **Focus Mode** that can be activated during workouts.

Display one primary exercise at a time.

Prioritize:

- Exercise name
- Current set
- Weight
- Repetitions
- RIR
- Previous performance
- Set completion button
- Next action

Use large, comfortable mobile controls.

Keep unnecessary information hidden.

## 2. Previous Performance

Show relevant previous performance immediately.

For example:

Last session:
60 kg × 10 reps

Current target:
62.5 kg × 8–10 reps

Only show actual historical data and valid progression recommendations.

Do not invent previous sets or targets.

## 3. Sticky Rest Timer

Add an optional rest timer that remains accessible during Focus Mode.

Requirements:

- Start automatically after set completion if enabled.
- Allow manual starting and stopping.
- Allow time adjustment.
- Display remaining rest time clearly.
- Continue tracking elapsed time correctly if the user switches screens.
- Avoid relying exclusively on background JavaScript timers.

Because the existing app previously simplified or removed its rest timer, the new timer must remain optional.

Do not force timer behavior on users who prefer straightforward workout logging.

## 4. Superset Support

When a workout includes supersets:

- Clearly show the exercises in the current superset.
- Allow quick switching between them.
- Preserve individual set completion states.
- Avoid treating all superset exercises as a single completed exercise.
- Keep rest timer behavior appropriate for the workout structure.

Provide a compact superset overview without abandoning the focused interface.

## 5. Workout Navigation

Users should be able to:

- Move to the next exercise
- Return to the previous exercise
- View the complete workout
- Edit sets
- Skip exercises
- Exit Focus Mode

Exiting Focus Mode must return to the normal workout interface without losing data.

The normal workout mode must remain fully functional.

## 6. Design Approval

Before finalizing Focus Mode's visual appearance, present three distinct design concepts with visual previews.

Wait for my selection.

## 7. Testing

Verify:

- Set logging
- Weight and rep entry
- RIR
- Previous performance
- Rest timer
- Supersets
- Manual navigation
- Workout restoration
- Autosaving
- Small-screen responsiveness
- Switching between Focus Mode and normal mode

---

# PART 5 — TRAINING BLOCKS AND PERIODIZATION

## Primary Objective

Allow users to organize training into structured multiweek programs.

Users should be able to plan training phases lasting approximately 4–8 weeks, with changing rep targets, workload, and lighter training periods.

The feature should integrate with existing workout plans and recurring schedules.

## 1. Training Block Creation

Allow users to create a training block with:

- Block name
- Primary goal
- Start date
- Duration
- Associated workout plans
- Weekly training schedule
- Progression approach

Suggested durations:

- 4 weeks
- 6 weeks
- 8 weeks
- Custom duration where practical

## 2. Weekly Progression

Support planned changes in:

- Working sets
- Rep targets
- Intensity targets
- Exercise progression
- Training workload

For example, a six-week hypertrophy block might use gradually evolving targets before an optional lighter week.

Avoid blindly increasing volume or load every week.

Use sensible programming defaults and allow users to customize them.

## 3. Lighter Weeks

Provide an option for deload or reduced-stress weeks.

Users should be able to reduce:

- Working sets
- Training load
- Proximity to failure
- Overall training demands

Explain that lighter weeks may be appropriate depending on fatigue, performance, and program structure, rather than universally necessary on a fixed schedule.

## 4. Recurring Schedule Integration

Training blocks must work with existing recurring workouts.

For example:

Monday: Full Body A

Wednesday: Full Body B

Friday: Full Body C

The block should apply its appropriate weekly targets to these recurring sessions.

Avoid generating duplicate scheduled workouts.

Preserve historical completed workouts.

Editing a block must not silently overwrite completed training records.

## 5. Training Block Progress

Display:

- Current week
- Remaining weeks
- Completed sessions
- Goal progress
- Relevant performance trends
- Upcoming lighter weeks

Integrate useful information into the Gains Dashboard and Weekly Check-In without cluttering those screens.

## 6. Flexibility

Support:

- Pausing a block
- Resuming a block
- Editing future weeks
- Ending a block
- Duplicating a block
- Converting an existing routine into a block

Handle missed or rescheduled workouts without incorrectly advancing training weeks.

## 7. Design Approval

Present three visual concepts for the Training Blocks interface before finalizing its design.

## 8. Testing

Verify:

- Block creation
- Week progression
- Recurring schedules
- Set and rep targets
- Lighter weeks
- Missed workouts
- Paused blocks
- Edited blocks
- Historical workout preservation
- Calendar integration

---

# PART 6 — TIME-ADAPTIVE WORKOUTS

## Primary Objective

Allow users to shorten a planned workout when they have limited time.

Example:

**"I only have 25 minutes."**

Gym Bro should suggest a shorter version of the workout that preserves important exercises and makes the best use of the available time.

This should work without paid AI infrastructure.

## 1. Available Time Selection

Before or during a workout, allow users to select an available duration.

Examples:

- 20 minutes
- 25 minutes
- 30 minutes
- 45 minutes
- 60 minutes
- Custom duration

## 2. Intelligent Workout Prioritization

Create a local, deterministic recommendation engine.

Consider:

- Primary training goal
- Exercise importance
- Compound versus accessory movements
- Expected set duration
- Rest requirements
- Planned working sets
- Already completed sets
- Workout structure
- Muscle-group coverage
- Relevant user preferences

Preserve high-priority exercises where appropriate.

Suggest removing or reducing lower-priority work first.

Do not automatically assume compound exercises should always override every isolation movement; account for the user's stated training goal.

## 3. Preview Before Applying

Before shortening the workout, show:

- Original estimated duration
- Proposed estimated duration
- Exercises retained
- Sets reduced
- Exercises deferred
- Reasoning behind the changes

Require user confirmation.

Clearly label duration estimates as estimates.

## 4. Protect Existing Workout Data

This is critical.

When adapting an active workout:

- Preserve all completed sets.
- Preserve recorded weights and repetitions.
- Preserve RIR and notes.
- Do not delete completed exercises.
- Do not modify the original saved plan.
- Do not erase historical workout data.

Treat the shortened workout as a temporary session-level variation.

## 5. Reversibility

Allow the user to:

- Accept the shortened workout
- Reject it
- Adjust the proposed changes
- Return to the original plan where feasible

Keep completed work intact in every scenario.

## 6. Integration

Time-adaptive workouts should work with:

- Normal workout mode
- Focus Mode
- Training blocks
- Recurring workouts
- Existing progression tracking

Ensure that reducing sets for time reasons is not incorrectly interpreted as a performance failure or training regression.

## 7. Design Approval

Present three visual concepts for the time-adaptive workout selection and preview experience.

## 8. Testing

Verify:

- Different duration targets
- Correct exercise prioritization
- Realistic duration estimates
- Preservation of completed sets
- Plan integrity
- Undo and restoration
- Superset handling
- Training block compatibility
- Workout saving

---

# PART 7 — EXERCISE FEEDBACK AND PERSONAL NOTES

## Primary Objective

Allow users to quickly record practical feedback about individual exercises.

The app should remember relevant information and use it to improve future workout experiences.

## 1. Quick Feedback

Add an unobtrusive exercise feedback action.

Support feedback such as:

- Exercise felt good
- Exercise felt unusually difficult
- Equipment was uncomfortable
- Equipment was unavailable
- Technique needs attention
- Discomfort experienced
- Personal note

Keep the interaction extremely fast.

Do not require lengthy forms.

## 2. Exercise-Specific Memory

Associate feedback with the correct exercise and relevant workout.

Examples:

- "Seat position 4 works best."
- "Cable machine was unavailable."
- "Try a slightly narrower grip next time."
- "Shoulder discomfort during this movement."

Preserve timestamps and historical context.

## 3. Surface Useful Notes Next Time

When the user performs the exercise again, show a concise reminder when relevant.

For example:

"Previous note: Seat position 4."

Avoid displaying every old note by default.

Prioritize useful recent information.

Allow users to dismiss, edit, or delete notes.

## 4. Exercise Alternatives

If the user repeatedly reports equipment problems or difficulty with a movement, suggest relevant alternatives for review.

Use the existing exercise library and muscle mappings.

Do not automatically replace exercises or modify workout plans.

Require confirmation before applying changes.

## 5. Discomfort Handling

If the user reports pain or discomfort:

- Record the feedback clearly.
- Avoid medical diagnosis.
- Do not suggest pushing through significant pain.
- Offer the option to stop, skip, or review an alternative.
- Use cautious, nonmedical language.
- Encourage professional evaluation when symptoms warrant it.

Do not interpret discomfort reports as precise medical information.

## 6. Privacy

Treat exercise notes and discomfort information as private user data.

Include it in supported backups.

Allow users to edit and delete feedback.

Do not transmit this information to external services without an appropriate reason and consent.

## 7. Design Approval

Present three compact UI concepts for entering and reviewing exercise feedback.

Prioritize minimal taps and unobtrusive presentation.

## 8. Testing

Verify:

- Feedback creation
- Editing and deletion
- Association with correct exercises
- Persistence
- Historical notes
- Reminder display
- Alternative suggestions
- Backup compatibility
- Data privacy
- No interruption to normal workout logging

---

# PART 8 — PHONE CALENDAR INTEGRATION

## Primary Objective

Allow users to add scheduled and recurring Gym Bro workouts to their phone calendars.

This should help users receive reliable reminders through existing calendar systems, even when Gym Bro itself is closed.

## 1. Calendar Export

Implement standards-compliant iCalendar (`.ics`) export.

Support:

- Individual scheduled workouts
- Recurring workout schedules
- Workout names
- Scheduled times
- Relevant descriptions
- Recurrence rules
- End dates
- Appropriate reminders

Use standard calendar event properties and stable event identifiers where appropriate.

Handle time zones and daylight saving time correctly.

## 2. Apple Calendar Compatibility

Make exported events usable with Apple Calendar.

Provide a simple export/share flow appropriate to supported browsers and installed PWAs.

Clearly explain any required import steps.

## 3. Google Calendar Compatibility

Make the exported file compatible with Google Calendar.

Provide straightforward instructions or appropriate supported import functionality.

Do not imply that exporting an `.ics` file automatically creates continuous two-way synchronization.

## 4. Recurring Workout Integration

Recurring workouts should export correctly.

For example:

Full Body Workout

Monday, Wednesday, Friday

18:00

Repeat weekly

Calendar exports should preserve recurrence accurately, including supported end dates and occurrence exceptions.

Avoid generating thousands of unnecessary individual events.

## 5. Calendar Reminders

Where supported, include standard calendar reminder information.

Allow users to choose reminder timing.

Explain that calendar notification delivery is controlled by the user's calendar application, its settings, and operating-system permissions.

Do not guarantee alerts that the external calendar system may suppress.

## 6. Avoid Duplicate Events

Use stable identifiers and predictable export behavior.

Warn users that reimporting event files may create duplicates depending on their calendar application.

Do not claim automatic deduplication or synchronization unless it has actually been implemented and verified.

## 7. Future Synchronization

Design the calendar integration so future direct synchronization could be added.

However:

- Do not introduce external account authentication unnecessarily.
- Do not create paid backend services.
- Do not request broad calendar permissions when simple export is sufficient.
- Do not publicly expose private workout schedules through calendar feeds.
- Do not claim that calendar changes automatically update Gym Bro unless that capability exists.

For this update, prioritize reliable calendar export.

## 8. Design Approval

Present three visual concepts for calendar export controls where the integration requires substantial new UI.

## 9. Testing

Verify:

- Single-session export
- Recurring weekly export
- Multiple weekdays
- Start and end dates
- Time zones
- Daylight saving transitions
- Reminder properties
- Canceled occurrences
- Apple Calendar compatibility where testable
- Google Calendar compatibility where testable
- Mobile sharing and download behavior
- No changes to internal workout history

Clearly distinguish actual platform testing from format validation.

---

# PART 9 — INTEGRATION BETWEEN FEATURES

These six improvements should feel like one cohesive product rather than disconnected modules.

## Important Interactions

### Training Blocks + Recurring Workouts

Training blocks should use existing scheduled workout occurrences without creating duplicates.

### Training Blocks + Time-Adaptive Workouts

A shortened workout must not corrupt long-term block progression.

Record that the session was intentionally modified.

### Focus Mode + Time-Adaptive Workouts

Users must be able to switch into a shortened workout while preserving recorded sets and remaining in a usable workout interface.

### Exercise Feedback + Future Workouts

Useful exercise notes should appear when relevant in both normal workout mode and Focus Mode.

### Backups + All Features

Export and restore must correctly preserve the new training block, feedback, scheduling, and preference data.

### Phone Calendar + Recurring Workouts

Calendar exports should use the same authoritative recurrence rules as Gym Bro's schedule.

### Notifications + Calendar Export

Make clear that Gym Bro notifications and external calendar notifications are separate mechanisms.

Respect Gym Bro's global notification preference for reminders controlled by Gym Bro.

Do not imply that disabling Gym Bro notifications also disables reminders already created in Apple or Google Calendar.

---

# PART 10 — MOBILE EXPERIENCE AND PERFORMANCE

All six features must work smoothly on mobile devices.

Review:

- Touch targets
- Keyboard behavior
- Screen transitions
- Scrolling
- Form usability
- Modal positioning
- Safe-area handling
- Bottom navigation
- Light/dark mode
- PWA caching
- Offline functionality

Test representative viewport widths:

- 320px
- 375px
- 390px
- 430px
- 768px
- 1024px and larger

Keep the application lightweight.

Avoid unnecessary dependencies.

Ensure new screens do not introduce slow loading or excessive rendering.

Preserve the improved mobile update mechanism and service worker behavior.

Never reset local storage to resolve a compatibility problem.

---

# PART 11 — DATA SAFETY

Preserve all existing:

- Workout history
- Active workouts
- Workout plans
- Recurring schedules
- Custom exercises
- Personal records
- Gains Dashboard history
- Measurements
- Progress photos
- Goals
- Achievements
- Weekly Check-Ins
- Settings
- Appearance preferences
- Notification preferences

Add new data structures safely.

Use versioned schemas and backward-compatible migrations where necessary.

Do not overwrite historical workouts when editing a plan or training block.

Keep user data recoverable.

Ensure previews and production environments do not accidentally share destructive storage operations.

---

# PART 12 — TESTING AND QUALITY ASSURANCE

Perform a full regression and integration audit.

## Required Testing Areas

### Backup Protection
- Export
- Restore
- Backup reminders
- Schema compatibility
- Corrupted files
- Encryption where implemented
- Data preservation

### Focus Mode
- Active-set logging
- Exercise navigation
- Rest timer
- Supersets
- Autosave
- Restoration
- Normal-mode switching

### Training Blocks
- Block creation
- Weekly targets
- Recurring schedule integration
- Lighter weeks
- Pause/resume
- Historical data preservation

### Time-Adaptive Workouts
- Duration selection
- Session modification
- Preservation of completed sets
- Plan integrity
- Recommendations
- Reversibility

### Exercise Feedback
- Input
- Editing
- Persistence
- Future reminders
- Alternatives
- Privacy

### Calendar Integration
- Individual events
- Recurring events
- Time zones
- Reminders
- Calendar file validity
- Mobile compatibility

### General Application
- Workout logging
- Exercise library
- Muscle map
- Training calendar
- Progress analytics
- Goals
- Weekly Check-In
- Notifications
- Existing PWA update behavior
- Data export/import
- Light/dark appearance

Where possible, use automated tests and browser-based visual inspection.

Fix confirmed issues before presenting the update.

Never claim a test passed unless it was actually executed.

---

# PART 13 — REQUIRED IMPLEMENTATION WORKFLOW

Follow this process.

## Phase 1 — Repository Audit

Inspect the codebase, existing features, design system, data structures, test infrastructure, and deployment configuration.

Identify implementation risks.

## Phase 2 — Feature Architecture

Design the shared data and logic for:

- Backups
- Training blocks
- Focus Mode
- Time-adaptive workouts
- Exercise feedback
- Calendar exports

Identify interactions with existing systems.

## Phase 3 — Initial Visual Design Review

Before implementing significant UI changes:

1. Prepare three cohesive visual design concepts for the new experiences.
2. Show actual screenshots, prototypes, or rendered mockups where possible.
3. Explain differences.
4. Recommend the strongest option.
5. Request my selection.

**Do not finalize the aesthetic implementation before approval.**

Continue nonvisual technical work where feasible.

## Phase 4 — Core Technical Implementation

Implement the necessary storage, calculations, backup logic, recurrence integration, and feature infrastructure.

## Phase 5 — Approved UI Implementation

Once I select a visual direction, implement the new interfaces consistently with the approved concepts.

## Phase 6 — Feature Integration

Connect the new features to existing workouts, plans, schedules, analytics, and settings.

## Phase 7 — Quality Assurance

Run automated tests, check important workflows, and inspect the actual rendered app.

Fix identified issues.

## Phase 8 — Visual Refinement

Ensure implementation matches the approved design.

Correct spacing, typography, alignment, responsiveness, and inconsistent states.

Do not introduce significant new aesthetic choices without approval.

## Phase 9 — Branch Preview

Deploy a working preview without modifying production.

Verify the preview on mobile and desktop.

## Phase 10 — Final Report

Provide implementation details, testing results, preview links, limitations, and merge status.

---

# PART 14 — FINAL DELIVERABLES

At completion, provide:

## 1. Development Branch

Exact branch name containing the changes.

## 2. Pull Request

Clickable PR link if created successfully.

## 3. Live Preview

Verified working URL for reviewing the updated application.

## 4. Design Approval Record

Identify:

- Concepts presented
- Concept selected
- Approved changes
- Any deviations from the approved design

## 5. Feature Summary

Explain each completed improvement:

- Backup protection
- Focus Mode
- Training blocks
- Time-adaptive workouts
- Exercise feedback
- Phone calendar integration

## 6. Technical Changes

Explain important architecture and data-model changes.

## 7. Testing Report

List tests actually performed, results, and any unverified behavior.

## 8. Data Integrity

Explain how existing user information was protected.

## 9. Known Limitations

Document unresolved issues and features requiring external infrastructure.

## 10. Merge Status

Confirm that nothing has been merged into `main`.

---

# FINAL QUALITY STANDARD

Gym Bro should feel like a premium, professionally developed fitness product.

The new features must be useful, reliable, visually consistent, and easy to understand.

Avoid building complex functionality that makes routine workouts harder to use.

Prioritize:

1. Data protection
2. Workout reliability
3. User experience
4. Training usefulness
5. Visual polish
6. Performance
7. Maintainability

The six features must work together naturally.

Do not remove existing functionality.

Do not introduce paid services or dedicated cloud AI infrastructure without authorization.

Do not use placeholder functionality and describe it as complete.

Do not stop after the first successful build.

Thoroughly inspect, implement, test, and refine the application.

## THREE NON-NEGOTIABLE APPROVAL RULES

**DESIGN APPROVAL:** Whenever making a meaningful aesthetic change, first show me three visual alternatives and wait for my selection before finalizing the design.

**BRANCH APPROVAL:** Keep all work on the dedicated development branch and provide a working preview wherever technically possible.

**MERGE APPROVAL:** Do not merge anything into `main` until I explicitly authorize the merge.

The goal is not simply to add six new features.

The goal is to make Gym Bro more useful, reliable, intelligent, and enjoyable while keeping its interface clean and exceptionally easy to use.