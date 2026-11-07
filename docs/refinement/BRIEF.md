# Gym Bro — UI Refinement, Appearance Settings & Intelligent Weekly Check-In

## Your Role

Act as a senior frontend engineer, UI/UX designer, QA specialist, and fitness product designer.

Your task is to implement a focused, production-quality update to the existing Gym Bro application.

This update has four primary objectives:

1. Add light mode and dark mode settings.
2. Perform a comprehensive visual consistency and alignment audit.
3. Add a configurable first day of the week.
4. Redesign the Weekly Check-In into a personalized, goal-aware, motivating progress review.

**This is a targeted update, not a complete application redesign.**

Preserve all existing features, functionality, user data, and the current overall design identity.

---

# 1. Git Branch & Development Safety

Before modifying any files:

- Inspect the repository and identify the current application architecture.
- Create a new branch named `feature/appearance-calendar-weekly-review`.
- Do not modify the main branch directly.
- Do not automatically merge or deploy changes.
- Preserve all existing user data and storage formats.
- Make incremental commits with meaningful descriptions.
- Run the existing test suite before and after implementing changes.

If the requested branch already exists, avoid overwriting existing work.

---

# 2. Light Mode & Dark Mode

Add an **Appearance** section to Settings.

Users should be able to choose between:

- Light Mode
- Dark Mode
- System Default (recommended additional option)

The selected preference must be saved and persist after restarting or reinstalling the application where browser storage is retained.

## Design Requirements

Implement a complete, consistent theme system.

Both modes should have:

- Appropriate background colors
- Clearly differentiated surfaces
- Readable text
- Accessible contrast
- Consistent accent colors
- Appropriate borders and shadows
- Proper button states
- Consistent form controls
- Readable charts
- Proper modal styling
- Visually balanced navigation
- Consistent status indicators

Dark mode should preserve the current premium fitness-app aesthetic.

Light mode should feel equally intentional and professionally designed, not simply like inverted dark mode.

Avoid hardcoded colors in individual components wherever possible. Use reusable theme tokens or CSS variables.

## Theme Behavior

- Apply the selected theme immediately.
- Avoid flashes of the wrong theme during startup.
- Ensure all screens and components respond correctly.
- Respect system appearance when System Default is selected.
- Update PWA theme-related styling where applicable.
- Ensure switching themes never changes or resets workout information.

Test every screen in both themes, including empty states, modal dialogs, charts, workout logging, Settings, Tracking, and the AI Coach where implemented.

---

# 3. Comprehensive Visual Alignment & Consistency Audit

The existing application has several small visual inconsistencies.

Some components appear off-center, asymmetrical, unevenly spaced, or misaligned.

Conduct a **meticulous, screen-by-screen visual audit** of the entire application.

Do not limit your inspection to the homepage.

## Review and Correct

### Alignment
- Horizontally and vertically centered components
- Icons aligned with adjacent text
- Buttons aligned consistently
- Headings aligned with their content
- Cards using consistent padding
- Text inputs aligned with labels
- Navigation icons and labels properly positioned
- Consistent modal alignment
- Correct alignment of chart labels and statistics

### Spacing
- Consistent margins and padding
- Uniform gaps between related elements
- Balanced spacing within cards
- Appropriate spacing between sections
- No unnecessary empty space
- No cramped layouts

### Symmetry and Proportions
- Equal-sized components where intended
- Balanced layouts
- Consistent button heights
- Consistent card dimensions
- Consistent border radii
- Correct visual centering, including optical alignment where appropriate

### Typography
- Consistent font sizes
- Clear heading hierarchy
- Consistent font weights
- Proper text wrapping
- No clipped text
- Consistent line heights
- Consistent numerical alignment

### Responsive Layouts
Test at approximately:

- 320px
- 375px
- 390px
- 430px
- 768px
- 1024px and larger

Check for:

- Horizontal overflow
- Clipped content
- Text escaping containers
- Off-center components
- Bottom navigation covering content
- Incorrect safe-area spacing
- Overlapping elements
- Inconsistent responsive behavior

## Visual Quality Standard

The interface should look deliberately designed down to the smallest details.

Avoid arbitrary one-off CSS fixes that cause inconsistencies elsewhere.

Use a coherent spacing scale, component system, and reusable styling rules.

Where browser preview or screenshot tools are available, inspect the actual rendered application across screen sizes and themes.

Fix identified visual issues and verify that corrections do not introduce regressions.

**The goal is pixel-level polish, not a redesign of the application's identity.**

---

# 4. Configurable First Day of the Week

Add a new setting under Settings → Calendar Preferences.

Label:

**Start of Week**

Provide two options:

- Sunday
- Monday

Explain that these correspond to Sunday–Saturday and Monday–Sunday calendar layouts.

Use neutral labels rather than implying that one convention applies exclusively to a religion.

Default to the application's existing behavior for current users, preserving their experience unless they deliberately change it.

New users may receive a locale-appropriate default.

## Required Behavior

When Sunday is selected:

The calendar displays Sunday through Saturday.

When Monday is selected:

The calendar displays Monday through Sunday.

The selected preference must apply consistently to:

- Training calendar
- Weekly workout summaries
- Weekly Check-In
- Weekly training goals
- Workout streak calculations where calendar weeks matter
- Weekly analytics
- Weekly charts and date-grouped statistics
- Any other calendar-dependent features

## Important Implementation Requirements

Separate calendar display settings from workout timestamps.

Changing the first day of the week must not modify historical workout dates.

Use consistent week-boundary logic throughout the application.

Avoid scattered, inconsistent implementations.

Handle:

- Month transitions
- Year transitions
- Time zones
- Daylight saving transitions
- Weeks spanning two months
- Weeks spanning two years
- Previously saved weekly data

The setting must persist across sessions.

Use tests to confirm that weekly totals and date ranges are correct under both configurations.

---

# 5. Redesign the Weekly Check-In

This is the most important functional improvement in this update.

Transform the current Weekly Check-In from a basic progress summary into a **personalized, intelligent, motivating weekly coaching experience**.

The check-in should make users feel that the application understands their goals, recognizes their progress, and helps them stay motivated.

It should be informative, encouraging, and honest.

Avoid generic motivational messages that could apply to anyone.

## Core Principles

Every Weekly Check-In should answer:

1. What did I accomplish this week?
2. How much progress did I make toward my goals?
3. What improvements or achievements should I be proud of?
4. What could I improve next week?
5. What should I focus on next?

Use actual recorded user data.

Never invent achievements, trends, or performance improvements.

---

# 6. Goal-Aware Weekly Reviews

The Weekly Check-In must consider the user's actual goals.

Examples include:

- Losing weight
- Gaining weight
- Building muscle
- Increasing strength
- Improving consistency
- Completing a specific number of workouts
- Achieving a particular exercise milestone
- Improving general fitness

Support multiple simultaneous goals when they exist.

Prioritize the user's primary goal while recognizing secondary goals.

## Example: Weight Loss

Suppose a user's goal is to lose weight and their recorded weight decreased by 2 kg during the week.

Instead of only showing:

"Weight change: -2 kg"

The check-in should provide something more meaningful, such as:

"You've moved 2 kg closer to your weight goal this week. That's a meaningful change, and your consistency deserves recognition. Keep focusing on sustainable habits rather than trying to repeat a specific number every week."

Do not automatically frame rapid weight loss as healthier or better.

Account for the fact that short-term changes may reflect water weight, measurement conditions, or normal fluctuations.

Where sufficient information exists, use smoothed trends instead of relying on one isolated measurement.

## Example: Strength Goal

If the user's bench press performance improves:

"Your bench press is moving in the right direction. You've increased your total repetitions at the same weight, which is a useful sign of progress. Keep building on that consistency."

Only report the increase when it is supported by comparable recorded workouts.

## Example: Workout Consistency

If a user completes all planned sessions:

"You completed all three planned workouts this week. That's another week of consistency toward your training goal."

If the user misses a workout:

"You completed two of your three planned sessions. That's still useful work. Next week, aim to get back to your full schedule."

Avoid shaming, guilt, or discouragement.

## Example: Muscle Gain

If the user's goal is hypertrophy:

Recognize improvements such as:

- Increased repetitions
- Increased working weights
- Consistent training volume
- Achieving planned workout frequency
- Progress toward relevant strength targets

Do not claim that muscle mass increased solely because training volume or lifting performance increased.

Distinguish direct measurements from indirect indicators.

---

# 7. Weekly Check-In Structure

Create a visually polished, easy-to-read review.

Suggested structure:

## A. Personalized Weekly Headline

A short, relevant statement summarizing the week.

Examples:

- "A strong week of consistency."
- "You're building momentum."
- "Your strength is trending upward."
- "Progress toward your weight goal."
- "A quieter week, but you're still moving forward."

The headline must reflect recorded activity.

## B. Weekly Overview

Show important statistics such as:

- Completed workouts
- Planned workouts
- Workout consistency
- Total working sets
- Relevant training volume
- Weight trend, when applicable
- Strength improvements
- Personal records
- Goal progress

Only display meaningful available metrics.

Do not overwhelm the user with unnecessary statistics.

## C. Your Biggest Wins

Highlight up to three meaningful achievements.

Examples:

- A new personal record
- Completing all planned workouts
- Progressing toward a weight target
- Improving exercise performance
- Maintaining consistency
- Reaching an achievement milestone

Prioritize achievements related to the user's goals.

## D. Personalized Coach Message

Provide a concise, natural-language coaching message based on the week's actual results.

The tone should be:

- Encouraging
- Specific
- Supportive
- Practical
- Positive without exaggeration
- Honest about uncertainty

Avoid repetitive stock phrases.

Avoid excessive praise for trivial events.

Avoid making users feel unsuccessful because of a missed session or temporary setback.

## E. Focus for Next Week

Provide one or two actionable recommendations.

Examples:

- "Aim to complete your three scheduled sessions."
- "Try to add one repetition to your final bench press set."
- "Continue tracking your weight under similar conditions."
- "Maintain your current training volume and monitor recovery."

Recommendations should be consistent with current goals and training history.

## F. Goal Progress

Show clear, visual progress indicators toward relevant targets.

Where appropriate, include:

- Current progress
- Remaining distance to goal
- Recent trend
- Milestones achieved

Do not invent timelines or promise results.

---

# 8. Weekly Check-In Intelligence

Build a reliable system that interprets weekly data before generating motivational language.

Use deterministic calculations for:

- Workout frequency
- Weekly training volume
- Rep and load progression
- Personal records
- Weight changes
- Goal completion
- Relevant consistency metrics
- Achievement milestones

Then use this structured information to produce the personalized review.

If the existing AI Coach is operational, integrate the Weekly Check-In with its established architecture.

The AI Coach may help generate natural-sounding summaries and explain progress.

However:

- Do not rely on the LLM for numerical calculations.
- Do not send unnecessary personal data.
- Do not invent performance results.
- Do not require a cloud AI connection for basic Weekly Check-In functionality.
- Provide an excellent local, offline-capable fallback using deterministic insights and well-written messages.

If available data is limited, acknowledge that naturally.

For example:

"You're getting started. As you log more workouts, your weekly reviews will become more personalized."

## Historical Reviews

Allow users to access previous weekly check-ins where supported by the application architecture.

Ensure the review for a given week uses the correct week boundaries and underlying historical data.

Avoid duplicate achievements or inconsistent statistics when revisiting a historical week.

Decide explicitly whether reviews are saved snapshots or recalculated views, and implement that behavior consistently.

---

# 9. Motivational Experience

Make the Weekly Check-In emotionally rewarding without becoming childish or overly gamified.

Use:

- Thoughtful progress indicators
- Subtle visual emphasis on meaningful wins
- Elegant achievement presentation
- Clear goal progress
- Encouraging written feedback
- Optional subtle animations

Avoid:

- Excessive confetti
- Generic motivational quotes
- Unnecessary notifications
- Unrealistic praise
- Guilt-based messages
- Comparing users against others without permission
- Treating every metric fluctuation as meaningful progress

The experience should resemble receiving a thoughtful progress review from a knowledgeable personal trainer.

**Motivation should come from recognizing authentic progress and helping users understand what it means.**

---

# 10. Testing Requirements

Create or update tests covering the following.

## Appearance

- Light mode activates correctly.
- Dark mode activates correctly.
- System Default follows device preferences.
- Preferences persist.
- Charts and dialogs use the correct theme.
- No unreadable text or invisible controls.
- No visual flashing on startup.

## Calendar

- Sunday-first weeks calculate correctly.
- Monday-first weeks calculate correctly.
- Weekly summaries match the chosen setting.
- Month and year transitions work.
- Historical workout dates remain unchanged.
- Changing preferences does not corrupt statistics.

## Weekly Check-In

Test multiple scenarios:

1. User progressing toward a weight loss goal.
2. User progressing toward a weight gain goal.
3. User improving strength.
4. User maintaining training consistency.
5. User setting a personal record.
6. User missing one or more workouts.
7. User with multiple goals.
8. User with insufficient historical data.
9. User with no workouts that week.
10. User whose progress temporarily stalls.
11. User whose weight fluctuates.
12. User switching calendar week settings.
13. User reviewing a previous week.
14. User with incomplete or missing weight entries.

Verify that all displayed insights are supported by actual records.

Check that motivational language remains appropriate and does not encourage unhealthy behavior.

## Visual QA

Review every important screen in both themes and at multiple device sizes.

Check:

- Alignment
- Symmetry
- Typography
- Responsiveness
- Chart readability
- Buttons
- Forms
- Modals
- Navigation
- Overflow
- Safe areas

Fix the issues found.

---

# 11. Final Deliverables

After implementation, provide:

1. **Summary of changes** — What was implemented.
2. **Appearance system** — How the themes work.
3. **Visual audit** — Which alignment and consistency problems were corrected.
4. **Calendar preferences** — How week selection is handled.
5. **Weekly Check-In** — How goals, achievements, progress, and motivational feedback are calculated and presented.
6. **Testing results** — Tests actually performed and their outcomes.
7. **Remaining limitations** — Any unfinished or unverified functionality.
8. **Deployment instructions** — How to safely merge and publish the update.

Do not claim that a test passed unless it was executed.

---

# FINAL INSTRUCTIONS

Implement this update directly in the existing repository on a dedicated branch.

Preserve all existing functionality.

Do not introduce unrelated features or make unnecessary architectural changes.

Do not stop at the first working implementation. Review the actual interface carefully and refine it.

Pay particular attention to the small visual inconsistencies that make an application look unfinished.

The Weekly Check-In should be the centerpiece of this release: specific to the user's goals, grounded in real progress, intelligently encouraging, and genuinely useful.

**The final result should feel like a professionally polished Gym Bro update that improves the daily experience without complicating the application.**