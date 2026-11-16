# GYM BRO — TRAINING LOGIC REFINEMENT & NEXT-GENERATION VISUAL DESIGN

## YOUR ROLE

Act as an integrated team of senior professionals:

- Senior UI/UX Designer
- Creative Director
- Senior Frontend Engineer
- Exercise Science and Strength Training Specialist
- Fitness Product Manager
- Mobile Interaction Designer
- Quality Assurance Engineer
- PWA Performance Engineer

Your mission is to improve the existing Gym Bro application through three targeted objectives:

1. Investigate, clarify, and refine the Effort Rating and automatic progression system.
2. Correct the alignment, centering, and spacing of the highlighted exercise during active workouts.
3. Explore an entirely new aesthetic and visual identity for Gym Bro, presenting several professionally designed alternatives for my approval.

This specification supersedes the previous canceled update proposal.

Do not reintroduce previously requested changes that are not included in this specification.

Inspect the current repository before making decisions. Some previously reported issues may already have been resolved.

Preserve all existing features, functionality, user data, and working application logic.

---

# PART 1 — DEVELOPMENT BRANCH & APPROVAL

## Development Safety

Before modifying anything:

1. Inspect the current repository, architecture, and Git state.
2. Review the latest stable version of Gym Bro.
3. Create a separate development branch named:

   `feature/training-refinement-visual-redesign`

4. If this branch already exists, inspect its contents before continuing.
5. Implement all changes exclusively on the development branch or isolated design prototype branches.
6. Do not modify or merge into `main`.
7. Make incremental commits with descriptive messages.
8. Maintain a clear rollback path.

## Preview Deployment

Provide a working browser preview that I can access on my phone and computer.

The preview must:

- Run the actual development version.
- Remain separate from production.
- Avoid interfering with production user data.
- Avoid service worker and caching conflicts.
- Support mobile and desktop browsers.
- Preserve GitHub Pages and PWA compatibility.

Use existing preview infrastructure when available.

Do not introduce paid hosting or external services without authorization.

Do not fabricate preview URLs.

Create a pull request targeting `main` when implementation is complete, if repository permissions allow.

**Do not merge into main without my explicit approval.**

---

# PART 2 — EFFORT RATING & PROGRESSIVE OVERLOAD INVESTIGATION

## Current Problem

The application includes a feature called Effort Rating.

It is unclear what this rating represents, how it is calculated, and how it affects workout progression.

I have also noticed that after reaching the upper limit of my prescribed repetition range, the application sometimes recommends that I perform the exercise again or repeat the same performance.

This behavior is confusing and may be interfering with appropriate progressive overload.

## 1. Investigate the Existing Implementation

Before changing the feature, examine its actual behavior and underlying logic.

Determine:

- What Effort Rating represents.
- Whether it corresponds to RIR, RPE, subjective difficulty, or a custom rating system.
- Whether it applies to an individual set, exercise, or entire workout.
- How the rating is collected.
- How it affects progression recommendations.
- Whether it is mandatory or optional.
- How the rating interacts with reaching the upper repetition limit.
- Why the application recommends repeating an exercise or performance after the repetition ceiling is reached.
- Whether the observed behavior is intentional, incorrectly communicated, or caused by a bug.

Trace the behavior through the relevant code, data models, recommendation functions, and user interface.

Do not make assumptions about the existing implementation.

Explain your findings clearly before introducing significant changes to training logic.

## 2. Review RIR and RPE

Evaluate whether the existing Effort Rating provides meaningful information or unnecessarily duplicates existing functionality.

### RIR — Reps in Reserve

RIR estimates how many additional repetitions a person could perform before reaching muscular failure.

For example:

- 0 RIR: No additional repetitions possible.
- 1 RIR: Approximately one additional repetition possible.
- 2 RIR: Approximately two additional repetitions possible.
- 3 RIR: Approximately three additional repetitions possible.
- 4+ RIR: Several additional repetitions possible.

### RPE — Rate of Perceived Exertion

For resistance training, an RIR-based RPE scale can describe how close a set is to muscular failure.

For example:

- RPE 10: Approximately 0 RIR.
- RPE 9: Approximately 1 RIR.
- RPE 8: Approximately 2 RIR.
- RPE 7: Approximately 3 RIR.

These are subjective estimates rather than precise physiological measurements.

If Gym Bro already tracks RIR, investigate whether a separate Effort Rating creates redundant information or contradictory recommendations.

If Effort Rating represents a genuinely different metric, determine whether it provides sufficient value to justify keeping it.

## 3. Simplify the Training Experience

My preference is for Gym Bro to remain intelligent without requiring unnecessary user input.

If Effort Rating duplicates RIR, recommend consolidating the two systems.

Consider the following approaches:

- Use RIR as the primary measure of set difficulty.
- Make additional subjective effort feedback optional.
- Retain exercise-level feedback only when it serves a distinct purpose.
- Provide simple explanations for beginners who are unfamiliar with RIR.

Do not automatically remove a useful feature before establishing its purpose.

Preserve existing historical rating data, even if the interface or future logging behavior changes.

If a meaningful change to the interface is proposed, include it in the design approval process.

## 4. Audit Progressive Overload Logic

Conduct a thorough review of the application's progression recommendations.

The progression system should consider:

- Exercise-specific rep ranges
- Working sets
- Weight used
- Completed repetitions
- RIR, where available
- Previous workout performance
- User-defined progression rules
- Available weight increments
- Training goals
- Exercise-specific progression strategies

For exercises using double progression, reaching the top of the prescribed repetition range should generally trigger an appropriate review of whether the working weight can be increased.

Do not require arbitrary additional workouts solely because an undocumented Effort Rating threshold has not been reached.

At the same time, do not recommend increasing weight automatically whenever a single set reaches the upper rep limit.

Account for performance across the relevant working sets and any configured intensity targets.

## 5. Expected Progression Scenarios

The following examples illustrate desirable behavior for a conventional double-progression strategy.

### Scenario A — Rep Ceiling Reached Across All Sets

Bench Press

Target: 3 sets of 6–10 reps

Completed:

- 60 kg × 10
- 60 kg × 10
- 60 kg × 10

If all progression criteria are satisfied, Gym Bro should recommend an appropriate weight increase for the next session.

Example:

"You've reached the top of your rep range across all three sets. Consider increasing the weight to 62.5 kg next time."

### Scenario B — Partial Rep Ceiling

Completed:

- 60 kg × 10
- 60 kg × 10
- 60 kg × 8

Gym Bro may recommend maintaining the current weight and increasing repetitions before progressing.

### Scenario C — Rep Ceiling With Maximum Effort

Completed:

- 60 kg × 10
- 60 kg × 10
- 60 kg × 10

All sets were performed at approximately 0 RIR.

Depending on the user's progression strategy and intended RIR targets, maintaining the weight or recommending a conservative increase may be appropriate.

Explain the reasoning.

Do not automatically assume all sets must feel easy before progression is allowed.

### Scenario D — Missing RIR

The user reaches the upper rep limit but has not entered RIR.

Do not unnecessarily block progression solely because an optional effort metric is missing.

Use available performance data and the configured progression strategy.

Communicate any relevant uncertainty.

These examples are illustrative. Respect existing exercise-specific progression configurations and user preferences.

## 6. Prevent Unnecessary Repeated Exercise Requirements

Distinguish between:

- Recommending the same working weight next session.
- Recommending an additional set.
- Repeating an exercise within the current workout.
- Requiring another qualifying workout before increasing weight.

These are different actions and must not be treated interchangeably.

A progression recommendation must never unexpectedly add another set or exercise to the current workout.

Any additional training volume should require an intentional user decision.

Do not automatically change saved workout plans or progression targets without following the application's established confirmation rules.

## 7. Explain Recommendations Clearly

Every meaningful progression recommendation should have a short, understandable explanation.

Examples:

- "Increase weight: You reached your rep target across all working sets."
- "Maintain weight: Aim to complete two more total reps before increasing."
- "Maintain weight: Your current performance is below the configured progression target."
- "Consider a smaller increase: Your previous sets were close to failure."

Avoid vague messages such as:

"Effort too high."

"Repeat exercise."

"Progression unavailable."

The user should understand why a recommendation was generated and retain control over whether to follow it.

## 8. Required Testing

Test the progression engine under the following conditions:

- All sets reach the rep ceiling.
- Only one set reaches the rep ceiling.
- Some sets fall below the minimum rep target.
- RIR is missing.
- RIR is 0, 1, 2, 3, or higher.
- Effort Rating and RIR disagree.
- The user performs additional repetitions.
- Working weight changes.
- Warm-up sets are present.
- Sets are intentionally skipped.
- Workouts are shortened using Time-Adaptive Mode, where implemented.
- Training blocks use different rep ranges.
- Available weight increments vary.
- Previous workout data is edited.
- A user manually overrides a recommendation.

Verify that progression logic does not create unrequested additional sets or duplicate exercises.

Document any confirmed bugs and the changes made to resolve them.

---

# PART 3 — HIGHLIGHTED EXERCISE ALIGNMENT & SPACING

## Current Problem

During a workout, the highlighted exercise does not appear properly centered.

The frame surrounding the highlighted area is not visually aligned with the exercise card.

The highlighted area also feels cramped, with insufficient space between its frame and the exercise content.

This creates an awkward, unfinished appearance.

## 1. Diagnose the Underlying Layout Problem

Inspect the current rendered interface and relevant styling.

Investigate:

- Parent container dimensions
- Active exercise borders
- Exercise card boundaries
- Padding
- Margins
- CSS box sizing
- Outline positioning
- Nested borders
- Absolute positioning
- Border radius differences
- Active-state styling
- Responsive behavior

Determine the actual reason for the visual misalignment.

Avoid arbitrary pixel offsets or temporary CSS workarounds.

## 2. Refine the Highlighted Exercise

The highlighted area should be:

- Properly centered
- Visually symmetrical
- Evenly spaced
- Correctly aligned with the exercise card
- Comfortable to read
- Clearly distinguished from surrounding exercises
- Consistent with the rest of the application

Create sufficient breathing room around exercise content.

Ensure that the outer highlight and inner card do not collide visually or create an awkward double-border effect.

The highlight should look like an intentional part of the interface rather than an additional frame placed over an existing component.

## 3. Preserve Existing Workout Behavior

Do not unnecessarily redesign the current workout interaction model.

Preserve existing:

- Active exercise selection
- Active-set highlighting
- Automatic advancement
- Completed-set indicators
- Completed-exercise indicators
- Manual exercise navigation
- Workout logging
- Focus Mode, where implemented
- Superset handling
- Autosaving

Exactly one active set should remain highlighted when an active set exists.

Do not cause additional sets to appear active merely because the surrounding exercise is highlighted.

## 4. Responsive Visual Testing

Inspect the corrected exercise component at several mobile screen sizes.

Verify:

- Equal horizontal spacing
- Balanced vertical spacing
- Correct border alignment
- Consistent corner radii
- No cramped content
- No clipping
- No overflow
- No unexpected layout shifts
- Proper light and dark mode appearance

Provide before-and-after screenshots.

A straightforward alignment correction that preserves the existing design may be completed independently.

Any substantially different visual treatment must be included in the design approval process.

---

# PART 4 — COMPLETE AESTHETIC REDESIGN EXPLORATION

## Primary Objective

I am considering changing the entire aesthetic of Gym Bro.

I am open to exploring new:

- Colors
- Typography
- Visual styles
- Card designs
- Navigation styling
- Layouts
- Component designs
- Chart aesthetics
- Interaction treatments
- Overall brand identity

Do not limit this exploration to changing the current accent color.

Approach this as a professional digital product design and visual rebranding project.

Gym Bro should look and feel like a world-class consumer fitness application.

The aesthetic should be clean, modern, intuitive, distinctive, and premium.

## 1. Create Five Meaningfully Different Design Concepts

Develop at least five substantially different visual directions.

The following concepts are suggestions and starting points.

You may improve or replace them with stronger original ideas.

### CONCEPT A — MONOCHROME PERFORMANCE

A sophisticated black, white, and charcoal aesthetic.

Characteristics:

- Restrained color palette
- Strong typography
- Precise geometric layouts
- Minimal decoration
- Subtle borders
- High contrast
- Premium athletic identity

### CONCEPT B — MODERN ATHLETIC

A contemporary sports-performance aesthetic.

Characteristics:

- Neutral surfaces
- Distinctive accent color
- Bold typography
- Dynamic visual hierarchy
- Energetic but restrained styling
- Clean workout progress indicators

### CONCEPT C — SOFT PREMIUM

A calm, approachable, sophisticated visual identity.

Characteristics:

- Warm neutrals
- Muted accent colors
- Comfortable spacing
- Refined rounded components
- Subtle visual depth
- Elegant typography
- Welcoming appearance

### CONCEPT D — TECHNICAL PERFORMANCE

A precise, data-driven fitness aesthetic.

Characteristics:

- Graphite or deep navy surfaces
- Carefully structured information
- Crisp numerical typography
- Refined charts
- Clear component boundaries
- Intelligent-looking training statistics

Avoid making the application resemble complex enterprise software.

### CONCEPT E — EDITORIAL MINIMALISM

A design-led, contemporary aesthetic inspired by premium digital products.

Characteristics:

- Elegant typography
- Generous whitespace
- Minimal card boundaries
- Carefully selected accent colors
- Strong visual hierarchy
- Distinctive composition
- Refined navigation

## 2. Make Concepts Genuinely Different

Do not create five nearly identical applications using different color schemes.

Explore meaningful differences in:

- Typography
- Layout composition
- Visual density
- Component shape
- Use of whitespace
- Card presentation
- Navigation appearance
- Information hierarchy
- Chart presentation
- Workout screen styling

Each concept should have its own recognizable visual identity.

All concepts must remain practical for real gym use.

## 3. Use Professional Fitness Apps as Quality Benchmarks

Consider the visual and usability standards established by applications such as:

- Hevy
- Strong
- Fitbod
- Nike Training Club
- Apple Fitness
- Alpha Progression

Use these products as benchmarks for quality, simplicity, readability, and interaction design.

Do not directly copy their interfaces, artwork, or branding.

Develop an original identity for Gym Bro.

## 4. Develop a Complete Design System for Each Concept

Define:

- Primary and secondary accent colors
- Background colors
- Surface colors
- Text colors
- Typography
- Font weights
- Spacing scale
- Border radii
- Button styles
- Card styles
- Input fields
- Iconography
- Navigation
- Chart styling
- Active and completed states
- Modal styling
- Loading states
- Empty states
- Success and error feedback

Each concept must represent a coherent design system rather than an isolated attractive screen.

## 5. Show Multiple Screens

For every concept, provide representative visual examples of:

1. Main Workout screen
2. Active workout screen
3. Gains Dashboard
4. Exercise Library
5. Workout Schedule
6. Settings

Where appropriate, also demonstrate:

- Muscle Map
- Weekly Check-In
- Training Blocks
- Focus Mode
- Workout Summary
- Achievements

Use the actual application structure and implemented features as the source of truth.

Show how each aesthetic handles both simple screens and information-heavy screens.

Use the same representative fictional workout data across concepts so comparisons are fair.

## 6. Light and Dark Mode

Preserve Gym Bro's existing appearance preferences.

Every proposed aesthetic should support both light and dark modes.

Both themes must look intentionally designed.

Do not simply invert the colors of the dark interface.

Present representative previews of both appearance modes for every concept.

## 7. Branding

You may explore improvements to:

- Gym Bro wordmark
- Typography
- Existing GB logo presentation
- Visual identity
- Header styling
- App icon

Do not rename the application.

Do not replace the existing logo or installed app icon without separate explicit approval.

## 8. Visual Quality

Avoid relying excessively on:

- Glassmorphism
- Gradients
- Neon effects
- Oversized rounded cards
- Unnecessary shadows
- Distracting animations
- Decorative statistics
- Generic fitness-app templates

These techniques may be used selectively when they genuinely improve a concept.

The application should feel premium because of thoughtful design, not because of excessive decoration.

---

# PART 5 — VISUAL DESIGN APPROVAL — MANDATORY

## 1. Present Actual Design Previews

Before implementing the final aesthetic, show me the five proposed design concepts.

Prefer:

- Interactive HTML prototypes
- Rendered screenshots
- High-quality visual mockups
- Side-by-side comparisons
- Browser-accessible design previews

Do not rely solely on written descriptions.

I need to see what the application will actually look like before making a decision.

## 2. Interactive Design Gallery

Where technically possible, create a dedicated browser-accessible design gallery.

The gallery should allow me to:

- Switch between all five concepts.
- Switch between light and dark mode.
- Navigate representative application screens.
- Compare typography and layouts.
- Review active exercise highlighting.
- Evaluate how the workout logging interface looks and feels.

Clearly label prototypes and mock functionality.

Keep the design gallery isolated from production user data and functionality.

## 3. Concept Comparison

For each aesthetic, provide:

- Concept name
- Design philosophy
- Visual strengths
- Practical usability advantages
- Potential disadvantages
- Professional recommendation

Compare the concepts based on:

- Visual quality
- Originality
- Readability
- Simplicity
- Workout logging efficiency
- Mobile usability
- Accessibility
- Long-term design consistency

Recommend the strongest direction, but allow me to make the final decision.

## 4. Explicit Approval Checkpoint

Once the concepts are ready, present them to me and wait for my selection.

Allow me to:

- Choose one concept.
- Combine elements from multiple concepts.
- Request modifications.
- Request additional design alternatives.

Do not treat your recommendation as my approval.

Do not finalize the new aesthetic before receiving explicit authorization.

Independent investigations, technical fixes, and isolated design prototypes may proceed before approval.

This visual approval requirement applies to meaningful aesthetic changes throughout Gym Bro.

---

# PART 6 — IMPLEMENTATION AFTER DESIGN APPROVAL

Once I select a visual direction, implement it faithfully across the existing application.

## 1. Centralized Design System

Establish reusable design tokens and components.

Avoid inconsistent hardcoded values and one-off styling rules.

Maintain a coherent system for:

- Colors
- Typography
- Spacing
- Borders
- Shadows
- Component dimensions
- Icons
- Animations
- Responsive behavior

## 2. Complete Application Coverage

Apply the approved aesthetic consistently throughout all existing screens and components.

Do not leave secondary screens using outdated styling.

Review:

- Workout interface
- Active exercise highlighting
- Exercise inputs
- Progression recommendations
- Exercise Library
- Training Schedule
- Training Blocks
- Gains Dashboard
- Muscle Map
- Weekly Check-In
- Achievements
- Goals
- Settings
- Menus and dialogs
- Backup interfaces
- Notification settings
- Application update screens

Only include features that actually exist in the current repository.

## 3. Preserve Functionality

The redesign must not remove or compromise existing features.

Do not unnecessarily change the application's underlying information architecture.

Do not add new navigation steps merely to accommodate a visual design.

Routine workout actions should remain at least as fast and intuitive as before.

---

# PART 7 — VISUAL QUALITY ASSURANCE

Perform a meticulous visual audit after implementing the approved aesthetic.

Inspect:

- Horizontal and vertical alignment
- Optical centering
- Symmetry
- Card proportions
- Border placement
- Padding and margins
- Consistent spacing
- Icon alignment
- Typography hierarchy
- Text wrapping
- Input dimensions
- Button heights
- Chart readability
- Date box alignment
- Bottom navigation
- Modal positioning
- Safe-area handling

Ensure all screens look like parts of the same professionally designed application.

Correct identified problems using reusable styling and consistent layout principles.

Inspect the actual rendered application rather than relying solely on source code.

---

# PART 8 — MOBILE PERFORMANCE & RESPONSIVENESS

Gym Bro is primarily used during workouts on mobile devices.

The redesigned application must remain fast and responsive.

Test representative viewport widths:

- 320px
- 375px
- 390px
- 430px
- 768px
- 1024px and above

Verify:

- Smooth navigation
- Responsive workout logging
- Appropriate touch targets
- Correct keyboard behavior
- Stable scrolling
- Proper bottom navigation positioning
- No horizontal overflow
- No clipped content
- No layout shifts
- Reliable screen transitions
- Consistent light and dark modes

Avoid expensive visual effects that negatively affect performance.

Preserve offline functionality, PWA installation, and the existing update mechanism.

Do not reintroduce previously resolved mobile update issues.

---

# PART 9 — DATA SAFETY & FEATURE PRESERVATION

Preserve all existing user information and implemented functionality.

Including, where present:

- Workout history
- Active workouts
- Workout plans
- Exercise records
- RIR and historical effort ratings
- Progression history
- Personal records
- Measurements
- Progress photos
- Goals
- Achievements
- Training blocks
- Recurring schedules
- Exercise notes and feedback
- Weekly Check-Ins
- Backup preferences
- Notification settings
- Appearance settings

Do not reset local storage.

Do not introduce unnecessary changes to persistent data structures.

If the Effort Rating system changes, preserve historical records and use backward-compatible migrations where needed.

Do not introduce paid services, dedicated cloud AI infrastructure, or unrelated functionality.

Maintain GitHub Pages compatibility.

---

# PART 10 — TESTING & REGRESSION PREVENTION

Run applicable automated and manual tests.

## Training Logic

Verify:

- Effort Rating interpretation
- RIR handling
- Rep ceiling behavior
- Progressive overload recommendations
- Missing effort data
- Different progression strategies
- Weight increments
- Manual overrides
- No unrequested additional exercises or sets
- Historical data compatibility

## Workout Interface

Verify:

- Correct highlight alignment
- Comfortable exercise spacing
- Active-set highlighting
- Completed-set indicators
- Completed-exercise indicators
- Automatic advancement
- Manual navigation
- Workout persistence
- Focus Mode, where implemented

## Visual Design

Verify:

- Implementation matches the approved concept
- Light and dark modes
- Consistent components
- Accessible contrast
- Responsive layouts
- Proper alignment
- Typography
- No clipping or overflow

## General Regression Testing

Verify existing application features remain functional.

Test critical workflows, including:

- Workout creation and logging
- Exercise selection
- Workout saving
- Progression tracking
- Training analytics
- Calendar and scheduling
- Settings
- Data backup and restoration
- Offline functionality
- PWA updates

Do not claim tests passed unless they were actually executed.

Clearly identify any testing limitations.

---

# PART 11 — DEVELOPMENT WORKFLOW

## Phase 1 — Repository Audit

Inspect the current application, architecture, existing functionality, and known issues.

Confirm which previously reported issues have already been fixed.

## Phase 2 — Effort Rating Investigation

Determine what Effort Rating represents, how it influences progression, and why the reported behavior occurs.

Explain the findings and recommend improvements.

## Phase 3 — Training Logic Refinement

Correct confirmed bugs and refine progression behavior.

Preserve user control and historical data.

## Phase 4 — Highlight Alignment

Correct the cramped and misaligned exercise highlight.

Verify the rendered component.

## Phase 5 — Aesthetic Exploration

Develop five distinct visual identities.

Create coherent design systems and representative screen prototypes.

## Phase 6 — Design Review

Present the concepts, visual previews, comparisons, and recommendations.

Provide a design gallery URL where possible.

**Wait for my explicit selection before finalizing the new aesthetic.**

## Phase 7 — Approved Design Implementation

Implement the selected concept faithfully.

Apply the new aesthetic consistently across the entire application.

## Phase 8 — Visual Refinement

Conduct a detailed alignment, spacing, typography, and consistency audit.

## Phase 9 — Functional and Performance Testing

Verify training logic, interface behavior, responsiveness, data preservation, and PWA functionality.

## Phase 10 — Branch Preview

Deploy the completed development version separately from production.

## Phase 11 — Final Review

Provide implementation details, testing results, known limitations, and preview links.

Wait for my approval before merging into main.

---

# PART 12 — REQUIRED DELIVERABLES

## Before Design Approval

Provide:

1. An explanation of the existing Effort Rating system.
2. Findings regarding the rep ceiling and repeated exercise behavior.
3. Recommended progression logic improvements.
4. Before-and-after examples of the exercise highlight correction, where completed.
5. Five distinct aesthetic design concepts.
6. Representative screen previews.
7. Light and dark mode examples.
8. A design comparison and professional recommendation.
9. A verified design gallery URL, if available.

## After Design Approval and Implementation

Provide:

1. Exact development branch name.
2. Pull request URL, if successfully created.
3. Verified working application preview.
4. Explanation of the Effort Rating and progression improvements.
5. Explanation of the highlight alignment correction.
6. Summary of the approved aesthetic.
7. Before-and-after screenshots.
8. Testing results.
9. Data preservation details.
10. Known limitations.
11. Confirmation that nothing has been merged into main.

Never fabricate results, screenshots, or deployment links.

---

# FINAL QUALITY STANDARD

The objective of this update is to make Gym Bro more intelligent, visually refined, and professionally designed without introducing unnecessary complexity.

**Training Intelligence:** Progression recommendations should make sense, be clearly explained, and not unnecessarily require repeated exercises.

**Workout Interface:** The highlighted exercise should be properly centered, comfortably spaced, and visually balanced.

**Aesthetic:** Explore genuinely different visual identities capable of competing with the best-designed fitness applications.

**User Experience:** Maintain simplicity, clarity, responsiveness, and ease of use.

**Data Safety:** Preserve all existing functionality and historical records.

**Design Approval:** Present visual alternatives before implementing significant aesthetic changes.

**Development Safety:** Work on a separate branch and provide a working preview before merging.

Do not introduce unrelated features from earlier update proposals.

Do not settle for the first acceptable solution.

Investigate carefully, design creatively, test thoroughly, and refine the application to a professional standard.

**Do not merge into main until I have reviewed the completed update and explicitly approved it.**