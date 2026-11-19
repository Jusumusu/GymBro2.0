# GYM BRO — INTELLIGENT PROGRESSION, WEEKLY REVIEW & UI REFINEMENT

## YOUR ROLE

Act as an integrated team of senior professionals:

- Senior Frontend Engineer
- Senior UI/UX Designer
- Creative Director
- Exercise Science and Strength Training Specialist
- Fitness Product Manager
- Data Visualization Engineer
- Search and Data Engineering Specialist
- PWA Performance Engineer
- Quality Assurance Engineer

Your task is to implement a focused, production-quality update to the existing **Gym Bro** fitness application.

This update has six primary objectives:

1. **Weekly Check-In:** Completely refine its visual design and improve how it analyzes, summarizes, and communicates user progress.
2. **Automatic Progression:** Improve the intelligence and reliability of exercise progression recommendations while remaining consistent with evidence-informed strength and hypertrophy training principles.
3. **Liquid Glass Transparency:** Explore more transparent Liquid Glass styling and present multiple transparency levels for my approval.
4. **Exercise Search Alignment:** Correct the visual alignment, centering, spacing, and focus highlighting surrounding the Exercise Library search field.
5. **Intelligent Exercise Search:** Improve search relevance with partial matching, typo tolerance, exercise aliases, and intelligent result ranking.
6. **Exercise Database Expansion:** Add a substantial number of useful, accurately classified exercises across underrepresented categories.

This is a refinement and feature-quality update, not a complete application rebuild.

**Preserve every existing feature, workout record, user preference, data structure where practical, and the application's established functionality.**

Do not introduce unrelated features, paid services, or dedicated AI hosting infrastructure.

---

# PART 1 — DEVELOPMENT BRANCH, SAFETY & PREVIEW

## 1. Separate Development Branch

Before modifying anything:

1. Inspect the repository, current architecture, Git state, and existing functionality.
2. Identify the latest stable branch and any relevant unmerged work.
3. Create a separate development branch named:

   `feature/weekly-review-progression-search`

4. If the branch already exists, inspect it before continuing.
5. Implement all changes exclusively on the development branch.
6. Do not modify or merge into `main`.
7. Make incremental, logically organized commits.
8. Preserve a reliable rollback path.

## 2. Pull Request

When implementation is complete:

- Push the development branch to GitHub.
- Create a pull request targeting `main`, if permissions allow.
- Include a summary of the implemented improvements.
- Document testing and remaining limitations.
- Do not merge automatically.

## 3. Working Preview

Provide a working browser preview so I can test the updated Gym Bro app on my phone and computer.

Requirements:

- Separate from production.
- Correct GitHub Pages/PWA asset paths.
- No interference with production service workers or caches.
- No destructive interaction with production user data.
- Usable on mobile and desktop.
- Includes all approved and completed improvements.

Use existing preview infrastructure where possible.

Do not introduce paid services without authorization.

Do not invent preview links.

**Do not merge into `main` until I explicitly approve.**

---

# PART 2 — MANDATORY VISUAL DESIGN APPROVAL

## Critical Requirement

Before implementing any meaningful aesthetic change, present **three distinct visual options** for my approval.

This requirement is especially important for:

- Weekly Check-In redesign
- Liquid Glass transparency
- Any substantial Exercise Library search-field redesign

### Approval Workflow

1. Inspect the existing visual design.
2. Develop three polished alternatives.
3. Create actual rendered screenshots or interactive browser previews.
4. Show the alternatives side by side.
5. Explain their differences briefly.
6. Recommend the strongest option.
7. Wait for my selection.
8. Implement the approved design faithfully.

Do not create three nearly identical mockups.

I should be able to:

- Choose one option.
- Combine elements from different concepts.
- Request modifications.
- Request additional variations.

**Do not finalize meaningful aesthetic changes without my explicit approval.**

Technical investigations, backend logic, data preparation, and nonvisual bug fixes can continue independently.

Whenever possible, group related visual decisions into one design review package rather than requiring numerous separate approvals.

---

# PART 3 — WEEKLY CHECK-IN: COMPLETE UX & FUNCTIONAL REFINEMENT

## Current Problem

The existing Weekly Check-In does not look sufficiently polished.

Its presentation feels less refined than the rest of the application.

I also want it to become more useful, intelligent, and personalized.

The Weekly Check-In should be one of Gym Bro's most valuable features.

It should feel like receiving a thoughtful progress review from a knowledgeable personal trainer.

Not simply a collection of statistics.

## 1. Audit the Existing Weekly Check-In

Before changing anything, inspect:

- Current layout
- Charts and statistics
- Goal-tracking integration
- Progress calculations
- Personal record detection
- Weekly comparisons
- Existing motivational messages
- Scheduling integration
- Training-block integration, where implemented
- Light and dark mode styling

Identify visual and functional problems.

Determine which existing information is genuinely useful and what should be presented differently.

Do not remove useful functionality merely to simplify the design.

## 2. Create Three Weekly Check-In Design Concepts

Produce three professionally designed alternatives.

### Concept A — Minimal Progress Review

A clean, highly organized weekly summary.

Potential elements:

- Strong weekly headline
- Three or four important statistics
- Compact goal progress
- Biggest achievement
- Short coach message
- Next week's focus

Prioritize simplicity and readability.

### Concept B — Personal Coaching Report

A more personalized and narrative experience.

Potential elements:

- Meaningful weekly introduction
- Personalized feedback
- Goal-specific observations
- Achievements
- Progress comparisons
- Practical recommendations

Make the user feel that Gym Bro understands their training.

### Concept C — Performance Dashboard

A more visual, analytical approach.

Potential elements:

- Progress charts
- Strength improvements
- Workout consistency
- Goal progress indicators
- Personal record highlights
- Training trends
- Concise coaching insights

Prioritize clarity without overwhelming the user.

These concepts are starting points. Improve them if a stronger approach exists.

For each concept, show realistic mobile mockups in light and dark modes.

Recommend the strongest design based on usability, readability, and long-term usefulness.

Wait for my approval before implementing the final visual design.

## 3. Improve Personalized Weekly Analysis

The Weekly Check-In must consider the user's actual training goals.

Supported goal categories may include:

- Muscle hypertrophy
- Strength improvement
- Weight loss
- Weight gain
- Workout consistency
- Specific exercise milestones
- Body measurement goals
- General training progress

Support multiple simultaneous goals.

Prioritize the user's primary goal while acknowledging meaningful secondary progress.

## 4. Use Real Training Data

Analyze relevant recorded information such as:

- Completed workouts
- Planned workouts
- Working sets
- Repetitions
- Training loads
- RIR where available
- Training volume
- Personal records
- Exercise progression
- Workout consistency
- Body weight trends
- Body measurements
- Current goals
- Training blocks where implemented

Do not invent improvements, achievements, or trends.

Do not claim a muscle has grown simply because the user increased lifting performance.

Clearly distinguish objective measurements from inferred training progress.

## 5. Goal-Aware Motivational Feedback

Generate motivational messages that are specific to actual progress.

### Example — Strength Improvement

If the user's bench press performance has improved:

"Your bench press is moving in the right direction. You've increased your total reps at the same weight, which is a meaningful sign of progression."

### Example — Workout Consistency

If the user completed three of three planned sessions:

"You completed every planned workout this week. That's another full week of consistency toward your goal."

### Example — Weight Loss

If a user is trying to lose weight and records a decrease:

"Your weight trend is moving toward your target. Keep focusing on consistent habits and the longer-term trend rather than expecting the same change every week."

Avoid treating rapid weekly weight loss as automatically beneficial.

Account for short-term water-weight fluctuations and measurement variability.

Use a seven-day average or other suitable trend method when sufficient data exists.

### Example — Temporary Plateau

If performance has remained approximately stable:

"Your strength has been relatively stable recently. That doesn't necessarily mean you've stopped progressing. Let's focus on consistency and look for meaningful changes over the next few sessions."

These messages are examples. Generate feedback only when the underlying data supports it.

## 6. Better Achievement Recognition

Identify the user's most meaningful accomplishments.

Examples:

- New personal record
- Increased repetitions at a given load
- Improved estimated strength
- Completed weekly workout target
- Reached a goal milestone
- Improved training consistency
- Completed a training block
- Improved a relevant body weight trend

Prioritize quality over quantity.

Show no more than approximately three significant achievements in the main review.

Avoid repeatedly celebrating the same achievement.

## 7. Useful Recommendations for Next Week

Every Weekly Check-In should suggest one or two practical next steps.

Examples:

- Maintain current training consistency.
- Aim for another repetition on a particular exercise.
- Continue following the training block.
- Focus on completing planned sessions.
- Monitor a possible performance plateau.
- Continue collecting data before drawing conclusions.

Recommendations must be appropriate to the user's goals and training history.

Avoid generic advice that adds no value.

## 8. Improve Weekly Comparisons

Where enough historical data exists, compare the current week with relevant earlier periods.

Potential comparisons:

- Completed workouts
- Total working sets
- Training volume
- Exercise performance
- Personal records
- Goal progress
- Body weight trends

Do not portray greater volume as automatically better.

Account for deliberate lighter weeks, reduced session duration, and changes in training structure.

Compare equivalent measurements where possible.

Explain when comparisons are limited by insufficient or noncomparable data.

## 9. Calendar Preferences

Preserve the user's existing week-start preference:

- Sunday–Saturday
- Monday–Sunday

All weekly statistics and displayed date ranges must respect the selected preference.

Changing the preference must not modify actual workout dates or corrupt historical records.

## 10. Historical Check-Ins

Preserve or improve the ability to review previous weeks where supported.

Ensure that historical reviews use correct date ranges and recorded data.

Avoid duplicating personal records or changing historical achievements unexpectedly.

Clearly define whether review content is stored as a historical snapshot or regenerated from current workout data.

## 11. No Paid AI Dependency

The Weekly Check-In must work using local, deterministic analysis.

Use structured calculations and carefully designed messaging rules.

If an existing AI Coach is already available, it may enhance natural-language explanations.

However, do not make Weekly Check-In functionality dependent on external AI services.

Do not introduce paid AI infrastructure.

## 12. Weekly Check-In Testing

Test:

1. User with no workout history.
2. Beginner with limited data.
3. User completing all planned workouts.
4. User missing several workouts.
5. User improving strength.
6. User experiencing temporary stagnation.
7. Weight-loss goal.
8. Weight-gain goal.
9. Hypertrophy goal.
10. Multiple simultaneous goals.
11. New personal records.
12. Training blocks and deload weeks.
13. Sunday-first calendar.
14. Monday-first calendar.
15. Missing body weight records.
16. Historical weekly reviews.
17. Light and dark themes.
18. Small mobile screens.

Verify that calculations are accurate and motivational language remains appropriate.

---

# PART 4 — SMARTER AUTOMATIC PROGRESSION

## Primary Objective

Improve Gym Bro's automatic exercise progression system.

The current functionality should become more intelligent, personalized, and consistent without introducing unnecessary complexity.

**The goal is better training decisions based on recorded performance, not aggressive automatic increases.**

## 1. Audit the Existing Progression Engine

Inspect:

- Current progression algorithms
- Exercise-specific rep ranges
- Weight increments
- Previous performance handling
- RIR integration
- Effort Rating integration, where applicable
- Set completion logic
- Progression targets
- Existing user preferences
- Exercise variations
- Workout history
- Training blocks
- Manual overrides

Identify incorrect recommendations, unnecessary repetition requirements, and opportunities to improve.

Do not replace scientifically reasonable existing behavior just to make the engine appear more complex.

## 2. Evidence-Informed Progressive Overload

Support appropriate progression strategies such as:

- Double progression
- Rep progression
- Load progression
- Maintaining load
- Conservative load reduction
- Changes in training volume where warranted and authorized

Progression decisions should account for:

- Completed repetitions
- Working weight
- Number of working sets
- Rep target range
- RIR where available
- Recent comparable sessions
- Exercise type
- User-defined progression rules
- Available equipment increments

Do not assume every exercise should progress at the same rate.

## 3. Intelligent Rep Ceiling Handling

If a user reaches the top of their target rep range across the required working sets, evaluate whether a load increase is appropriate.

Example:

Bench Press

Target: 3 × 6–10

Completed:

- 60 kg × 10
- 60 kg × 10
- 60 kg × 10

If the configured progression criteria are satisfied, the engine should suggest a sensible next weight.

Do not automatically add extra sets or require repeating an exercise within the same workout.

If only some sets reach the upper limit, consider maintaining the load and progressing repetitions.

## 4. RIR and Effort Handling

Use RIR appropriately when available.

However:

- RIR is subjective.
- It may be missing.
- It may be inaccurate.
- It should not automatically block otherwise reasonable progression.
- Do not require duplicate effort inputs.
- Do not confuse RIR with workout difficulty ratings.

If the user performs the target repetitions with very high effort, account for that when recommending progression.

Explain any conservative recommendations.

## 5. Use Multiple Sessions When Helpful

Avoid overreacting to a single unusually good or bad workout.

Consider recent comparable performance when appropriate.

For example:

- One poor workout should not automatically trigger a load reduction.
- A consistent pattern of improved performance may support progression.
- Several comparable sessions without improvement may justify reviewing progression strategy.

Do not declare a plateau prematurely.

## 6. Exercise-Specific Progression

Consider that different exercises benefit from different progression rules.

For example:

- Barbell compound lifts
- Dumbbell exercises
- Isolation movements
- Bodyweight exercises
- Assisted exercises
- Cable and machine exercises

Account for practical weight increments.

Avoid recommending weights that the user's equipment cannot support.

Support user-defined increments where available.

## 7. Shortened Workouts and Training Blocks

If existing functionality supports Time-Adaptive Workouts and Training Blocks, the progression engine must understand them.

A deliberately shortened workout should not automatically be interpreted as a performance failure.

A planned deload should not be interpreted as lost strength.

Skipped sets, warm-ups, and optional sets should be handled according to their actual roles.

## 8. Explain Every Recommendation

Recommendations should include concise, understandable reasoning.

Examples:

**Increase Load**

"You reached the top of your rep range across all working sets. Consider increasing to 62.5 kg next session."

**Maintain Load**

"You completed 10, 9, and 8 reps. Keep the same weight and aim to increase your total repetitions."

**Review Progress**

"Your last few sessions have been relatively consistent. Continue at the current weight while monitoring your performance."

Avoid vague messages such as:

- "Repeat exercise."
- "Effort insufficient."
- "Progression failed."

Users should understand exactly what the system recommends and why.

## 9. User Control

The progression engine should recommend changes rather than silently impose them.

Allow users to:

- Accept recommendations
- Reject recommendations
- Edit targets
- Override recommended weights
- Disable automatic suggestions where supported

Do not unexpectedly modify saved workout plans.

## 10. Training Science and Safety

Use conservative, evidence-informed principles.

Do not claim mathematical predictions of exact muscle growth.

Do not treat estimated strength as a guaranteed one-repetition maximum.

Do not prescribe extreme progression rates.

Avoid unnecessary increases in training volume.

Distinguish between actual performance changes and statistical noise.

## 11. Automated Progression Testing

Create deterministic test cases covering:

- Rep ceiling achieved across all sets.
- Partial rep ceiling achievement.
- Missed rep targets.
- Missing RIR.
- Low RIR.
- High RIR.
- Mixed working weights.
- Warm-up sets.
- Deload weeks.
- Shortened workouts.
- Exercises with small equipment increments.
- Exercises with large equipment increments.
- Incomplete workout history.
- Edited historical records.
- Progression recommendations previously rejected by the user.
- Repeated plateau-like performance.
- New or unfamiliar exercises.

Verify that recommendations are consistent, explainable, and do not unexpectedly add sets or exercises.

---

# PART 5 — LIQUID GLASS TRANSPARENCY REFINEMENT

## Current Problem

The existing Liquid Glass effect is not transparent enough.

I want to explore more transparent glass surfaces that look modern, refined, and visually appealing.

However, transparency should not compromise readability or usability.

## 1. Present Three Transparency Levels

Before changing the actual application's appearance, create three visual alternatives.

### Concept A — Subtle Transparency

A restrained glass effect with relatively strong surface opacity.

Characteristics:

- High readability
- Gentle background blur
- Minimal visual distraction
- Subtle depth

### Concept B — Balanced Transparency

A more noticeable translucent effect.

Characteristics:

- Clearly visible background layering
- Refined blur
- Soft edge highlights
- Premium floating appearance
- Balanced readability

### Concept C — High Transparency

A more expressive Liquid Glass treatment.

Characteristics:

- More visible underlying content
- Lighter surface opacity
- Greater sense of depth
- Clearer glass-like appearance
- Carefully controlled contrast

Do not equate greater transparency with better design.

Adjust blur, borders, shadows, and text contrast to maintain usability.

## 2. Actual Visual Comparisons

Show the three levels on the same representative screens and components.

At minimum, demonstrate:

- Bottom navigation
- Floating controls
- Exercise options menu
- Modal or overlay
- Active workout screen

Show each level in both light and dark mode.

Use the same underlying UI and content so I can compare the glass effects fairly.

If possible, provide an interactive design preview with a transparency slider or preset selector.

## 3. Transparency Must Be Intentional

Use glass selectively.

Avoid applying transparent backgrounds to every component.

Workout logging fields, charts, and data-heavy screens should remain clear and easy to read.

Pay particular attention to contrast when translucent controls appear above charts, text, or exercise cards.

## 4. Technical Requirements

Use appropriate web technologies.

Review:

- Background opacity
- `backdrop-filter`
- Blur intensity
- Border highlights
- Shadow softness
- Background contrast
- Mobile GPU performance
- Browser compatibility

Use solid or reduced-effect fallbacks where unsupported.

Respect reduced-transparency or other accessibility preferences where detectable.

Do not sacrifice mobile performance.

## 5. Approval Requirement

Present all three options with screenshots or interactive previews.

Recommend the best balance of transparency, clarity, and performance.

**Wait for my selection before implementing the final glass treatment.**

Do not independently choose a transparency level.

---

# PART 6 — EXERCISE LIBRARY SEARCH BOX ALIGNMENT

## Current Problem

The highlighted frame surrounding the Exercise Library search field is visually misaligned.

Its spacing relative to the surrounding container is uneven.

The search field and its highlighted or focused border do not look properly centered or proportioned.

This makes the interface look unfinished.

## 1. Investigate the Layout

Inspect:

- Search input dimensions
- Outer container
- Padding
- Margins
- Border widths
- Focus outlines
- Box sizing
- Border radii
- Icon placement
- Internal text padding
- Parent container alignment
- Responsive layout rules

Determine the actual cause.

Do not apply arbitrary pixel offsets.

## 2. Correct the Alignment

Ensure:

- Equal horizontal spacing
- Consistent vertical spacing
- Proper centering
- Visually balanced focus highlighting
- Consistent corner radii
- No awkward double borders
- Correct search icon alignment
- Proper input text alignment
- No clipping or overflow

The focused state should feel like part of the search component rather than a separate incorrectly positioned frame.

## 3. Preserve Existing Styling

A straightforward alignment fix should preserve the current approved visual design.

If a significant redesign of the search component is necessary, present three alternatives before implementation.

## 4. Responsive Testing

Verify alignment at multiple mobile and desktop sizes.

Test:

- Empty input
- Focused input
- Populated input
- Clear-search control
- Search results displayed
- Light mode
- Dark mode

Ensure the search field remains properly positioned when the mobile keyboard opens.

---

# PART 7 — INTELLIGENT EXERCISE SEARCH ENGINE

## Primary Objective

Improve exercise search so users can find the intended movement even when they only enter part of the name or make a spelling mistake.

Search should be forgiving, intelligent, fast, and predictable.

## 1. Partial Matching

Support matching when the entered query is part of an exercise name.

Examples:

Input: `bench`

Results should include relevant exercises such as:

- Barbell Bench Press
- Dumbbell Bench Press
- Incline Bench Press

Input: `pulld`

Results should include relevant lat pulldown variations.

Input: `squat`

Results should include appropriate squat exercises.

Partial matching should work across the entire exercise name, not only the beginning.

## 2. Typo Tolerance

Support common misspellings.

Examples:

- `benhc` → Bench Press
- `sqaute` → Squat
- `deadlfift` → Deadlift
- `lat pulldwon` → Lat Pulldown
- `bicep crul` → Biceps Curl

Use a suitable fuzzy-matching strategy.

Potential approaches include:

- Edit distance
- Token-aware fuzzy matching
- Prefix matching
- N-gram matching
- A lightweight search library where justified

Choose a maintainable solution appropriate for a local PWA.

Do not introduce an unnecessary external search service.

## 3. Intelligent Result Ranking

Order results based on relevance.

Suggested ranking priorities:

1. Exact exercise-name match
2. Exact alias match
3. Name prefix match
4. Matching words or tokens
5. Strong partial match
6. Close fuzzy match
7. Weaker related matches

When relevance scores are similar, consider sensible tie-breakers such as favorites or recently used exercises.

Do not allow a weak fuzzy match to outrank a clear exact match merely because an exercise was recently used.

## 4. Exercise Aliases

Use common alternative names.

Examples:

- RDL → Romanian Deadlift
- OHP → Overhead Press
- DB Bench → Dumbbell Bench Press
- Lat Pulldown → Relevant pulldown exercises

Aliases should point to the same stable exercise record rather than creating duplicate exercises.

## 5. Multiword Queries

Support searching by multiple terms.

Examples:

- `incline dumbbell`
- `cable tricep`
- `seated row`
- `single leg squat`

Results should prioritize exercises that match multiple relevant terms.

Allow reasonable word-order flexibility.

## 6. Avoid Irrelevant Results

Typo tolerance must not create excessive false positives.

Use conservative relevance thresholds, especially for short queries.

For example, entering one or two characters should not return a massive collection of loosely related exercises.

Prioritize predictable results.

## 7. Search UX

Ensure:

- Results update quickly as users type.
- No unnecessary loading screens.
- Search remains responsive.
- Clearing the query restores normal library browsing.
- Search works across all categories.
- Active filters are respected or clearly managed.
- Exercise selection remains straightforward.
- No duplicate results.
- Custom exercises remain searchable.

Where appropriate, visually highlight the matching part of an exercise name.

Do not make result highlighting visually excessive.

## 8. Performance

Search should work smoothly with hundreds or thousands of exercises.

Use:

- Normalized searchable text
- Efficient indexing where beneficial
- Appropriate memoization
- Sensible input handling
- Efficient fuzzy-match candidate selection

Avoid running expensive comparisons unnecessarily on every render.

Ensure search remains available offline.

## 9. Search Testing

Test:

- Exact matching
- Prefix matching
- Partial matching
- Typographical errors
- Multiword matching
- Aliases
- Capitalization differences
- Extra spaces
- Empty queries
- Very short queries
- Custom exercises
- Categories and filters
- Favorites and recent exercises
- Duplicate prevention
- Large datasets
- Mobile responsiveness

Create a regression test suite containing common exercise search queries and expected rankings.

---

# PART 8 — FURTHER EXERCISE DATABASE EXPANSION

## Primary Objective

Continue expanding the existing exercise database.

The previous updates have already added exercises, so inspect what currently exists before adding more.

Do not repeat earlier additions.

The goal is to build a comprehensive, well-maintained exercise library covering common and useful variations across all major muscle groups.

## 1. Audit Existing Coverage

Before adding exercises:

1. Count existing entries.
2. Identify duplicates.
3. Review muscle-group coverage.
4. Review equipment coverage.
5. Identify missing common exercises.
6. Identify missing legitimate variations.
7. Review inconsistent names and aliases.
8. Inspect exercise-to-muscle metadata.
9. Check compatibility with the muscle map and workout builder.

Produce a coverage summary.

## 2. Expand Underrepresented Categories

Review and expand where needed:

### Upper Body

- Chest
- Back
- Shoulders
- Biceps
- Triceps
- Forearms

### Lower Body

- Quadriceps
- Hamstrings
- Glutes
- Calves
- Hips
- Adductors and abductors

### Core

- Abdominals
- Obliques
- Lower back
- Anti-rotation exercises
- Core stability movements

### Additional Relevant Categories

- Full Body
- Bodyweight
- Functional strength
- Carry exercises
- Warm-up and mobility
- Other exercise types supported by the current app

Prioritize common exercises that a user would realistically encounter in a commercial gym.

## 3. Equipment Variations

Expand relevant exercises for:

- Barbell
- Dumbbell
- Cable
- Smith machine
- Plate-loaded machines
- Selectorized machines
- Kettlebell
- Resistance bands
- EZ bar
- Trap bar
- Bodyweight
- Assisted machines
- Other common gym equipment

Only create distinct exercise entries when the variation is meaningful.

Use aliases for alternative names rather than duplicating identical movements.

## 4. Required Metadata

Every new exercise must have appropriate structured data.

Include:

- Stable unique ID
- Standardized exercise name
- Common aliases
- Primary muscles
- Secondary muscles
- Relative contribution classifications
- Equipment
- Movement pattern
- Body-part categories
- Tracking type
- Relevant substitutions where supported

Preserve existing schema conventions where appropriate.

## 5. Muscle Map Integration

Every new exercise must work correctly with the muscle map.

Compound exercises should identify meaningful secondary muscle involvement.

Examples:

- Squats should register quadriceps and glutes.
- Romanian deadlifts should register hamstrings and glutes.
- Rows should register relevant back muscles.
- Presses should register appropriate assisting muscles.

Avoid unsupported precision in muscle activation estimates.

## 6. Exercise Quality Over Quantity

Do not manufacture hundreds of near-identical exercises merely to increase the database count.

Prioritize:

- Commonly used exercises
- Missing muscle groups
- Meaningful equipment variations
- Accurate classification
- Good naming
- Searchability
- Compatibility with existing features

Add as many well-supported, genuinely useful exercises as is practical.

## 7. Preserve Historical Data

Do not modify existing stable exercise identifiers.

Preserve:

- Workout history
- Personal records
- Exercise-specific notes
- Exercise goals
- Saved plans
- Custom exercises
- Muscle-volume statistics

Do not automatically replace user-created exercises with similarly named built-in exercises.

## 8. Automated Validation

Create or improve database validation tests.

Check:

- Unique IDs
- Duplicate exercise names and aliases
- Valid muscle identifiers
- Valid equipment categories
- Valid tracking types
- Required fields
- Search integration
- Muscle-map compatibility

## 9. Database Report

At completion, provide:

- Previous exercise count
- New exercise count
- Number of exercises added
- Categories expanded
- Equipment variations added
- Duplicate records detected or corrected
- Remaining coverage gaps

Do not claim records were added unless they exist in the repository.

---

# PART 9 — INTEGRATION REQUIREMENTS

These six improvements must work together.

## Weekly Check-In + Progression Engine

Weekly reviews should use actual progression data and recognize meaningful improvements.

Do not confuse a progression recommendation with a completed achievement.

## Weekly Check-In + Goals

Motivational feedback must reflect the user's goals rather than generic performance metrics.

## Search Engine + Exercise Database

New exercises must automatically become searchable.

Their aliases, categories, and metadata must integrate with existing filters.

## Exercise Database + Muscle Map

Maintain one consistent source of muscle classifications wherever practical.

Avoid contradictory exercise mappings.

## Liquid Glass + Search Field

The search field's focus state must remain properly aligned and readable under the approved glass treatment.

## Progression Engine + Historical Data

Do not modify past workout records to simplify recommendations.

Use recorded performance as the authoritative source of truth.

---

# PART 10 — DATA INTEGRITY & FUNCTIONALITY PRESERVATION

Preserve all existing data and functionality, including:

- Workout history
- Active workouts
- Workout plans
- Exercise records
- Custom exercises
- Personal records
- Goals
- Body weight records
- Body measurements
- Progress photos
- Achievements
- Weekly Check-Ins
- Progression history
- Training blocks
- Recurring schedules
- Muscle-map data
- Settings
- Appearance preferences
- Notification preferences
- Backup information

Use the repository as the source of truth for what has actually been implemented.

Do not reset local storage.

Use backward-compatible migrations when required.

Do not introduce paid AI services or unnecessary external dependencies.

Preserve GitHub Pages and PWA compatibility.

---

# PART 11 — MOBILE PERFORMANCE & VISUAL QUALITY

Gym Bro is primarily used on smartphones.

All improvements must work smoothly on mobile devices.

Test representative widths:

- 320px
- 375px
- 390px
- 430px
- 768px
- 1024px and above

Review:

- Weekly Check-In readability
- Search field alignment
- Search responsiveness
- Search result scrolling
- Touch interactions
- Graph readability
- Liquid Glass performance
- Navigation
- Safe-area spacing
- Mobile keyboard behavior
- Light and dark themes
- PWA caching
- Offline functionality

Avoid unnecessary rendering work and excessive visual effects.

Do not compromise mobile performance for greater glass transparency.

---

# PART 12 — TESTING & REGRESSION PREVENTION

Run appropriate automated, integration, and visual tests.

## Weekly Check-In

Verify:

- Accurate weekly statistics
- Goal-aware messaging
- Personal record detection
- Strength progression
- Weight trends
- Training consistency
- Missing data handling
- Historical reviews
- Week-start preferences
- Light/dark styling

## Automatic Progression

Verify:

- Rep ceiling logic
- Weight increases
- Maintaining load
- RIR handling
- Missing RIR
- Exercise-specific increments
- Multiple-session analysis
- Deload compatibility
- Shortened workout compatibility
- Manual overrides
- No unexpected additional sets

## Liquid Glass

Verify:

- Approved transparency level
- Readability
- Contrast
- Background visibility
- Mobile rendering performance
- Browser fallbacks
- Light/dark compatibility

## Search Field

Verify:

- Alignment
- Focus state
- Input spacing
- Search icon positioning
- No clipping
- Responsive sizing

## Exercise Search

Verify:

- Partial matching
- Typo tolerance
- Alias matching
- Relevance ranking
- Multiword queries
- Custom exercises
- Large database performance
- Filtering
- Duplicate prevention

## Exercise Database

Verify:

- Exercise IDs
- Metadata validity
- Category coverage
- Muscle classification
- Search integration
- Historical compatibility

## General Regression Testing

Verify that changes do not break:

- Workout logging
- Plan creation
- Exercise selection
- Active workout tracking
- Focus Mode
- Rest timer
- Muscle Map
- Gains Dashboard
- Training Calendar
- Weekly Check-In
- Data export/import
- Settings
- Notifications
- Offline PWA functionality
- Existing application update system

Only claim tests were successful when they were actually executed.

---

# PART 13 — IMPLEMENTATION WORKFLOW

Follow this sequence.

## Phase 1 — Repository Audit

Inspect the existing application and establish the actual state of all six relevant features.

Identify previously completed improvements and avoid duplicating them.

## Phase 2 — Technical Investigation

Audit:

- Weekly Check-In calculations
- Automatic progression
- Exercise search architecture
- Exercise database coverage
- Search-field layout
- Liquid Glass styling

Document important findings.

## Phase 3 — Design Concepts

Create three visual alternatives for:

1. Weekly Check-In
2. Liquid Glass transparency

If the search-field correction requires substantial visual changes, include its alternatives in the same review package.

Provide visual mockups or interactive previews.

## Phase 4 — Design Approval Checkpoint

Present the options and professional recommendations.

**Wait for my explicit selections before implementing the final visual designs.**

Continue independent nonvisual technical work where practical.

## Phase 5 — Progression Engine Improvements

Improve the automatic progression system.

Implement deterministic tests.

Preserve historical data and user control.

## Phase 6 — Exercise Search Improvements

Implement partial matching, typo tolerance, aliases, and intelligent result ranking.

Test relevance and performance.

## Phase 7 — Exercise Database Expansion

Add genuinely useful exercises across underrepresented categories.

Validate their metadata and muscle mappings.

## Phase 8 — Approved Visual Implementation

Implement the selected Weekly Check-In design and Liquid Glass transparency level.

Correct the Exercise Library search-field alignment.

Preserve the existing design system where not explicitly changed.

## Phase 9 — Integration & QA

Verify all six improvements together.

Review existing features for regressions.

## Phase 10 — Mobile Performance Testing

Inspect actual mobile layouts and interactions.

Correct performance and visual problems.

## Phase 11 — Branch Preview

Deploy a safe, isolated preview for review.

## Phase 12 — Final Report

Provide changes, tests, design approval record, exercise coverage, and preview access.

Do not merge into main.

---

# PART 14 — FINAL DELIVERABLES

Provide the following.

## Before Aesthetic Approval

1. Three Weekly Check-In design concepts.
2. Three Liquid Glass transparency levels.
3. Light and dark mode previews.
4. Actual screenshots or interactive prototypes.
5. Professional recommendations.
6. A design preview URL where available.
7. A clear opportunity for me to select or combine designs.

## After Implementation

### 1. Development Branch

Exact branch name.

### 2. Pull Request

Clickable PR link, if created.

### 3. Live Preview

Verified URL to the updated application.

### 4. Weekly Check-In

Explain the functional improvements and selected visual design.

### 5. Automatic Progression

Explain how recommendations became smarter, the training principles applied, and how the logic was tested.

### 6. Liquid Glass

Identify the selected transparency level and how readability and performance were preserved.

### 7. Search Alignment

Explain the underlying cause and correction.

### 8. Exercise Search

Explain partial matching, fuzzy matching, aliases, and result ranking.

### 9. Exercise Database

Report previous and new exercise counts, added variations, category coverage, and validation results.

### 10. Testing

List actual tests performed and their outcomes.

### 11. Data Integrity

Explain how existing records were preserved.

### 12. Known Limitations

List unresolved issues and external constraints.

### 13. Merge Status

Explicitly confirm nothing was merged into `main`.

Do not fabricate previews, screenshots, test results, or completed features.

---

# FINAL QUALITY STANDARD

This update should make Gym Bro feel more intelligent, polished, comprehensive, and professional.

**Weekly Check-In:** Beautifully designed, personalized, motivating, and grounded in real training data.

**Automatic Progression:** Scientifically sensible, adaptive, explainable, and reliable.

**Liquid Glass:** More transparent, elegant, readable, and performant, using the level I explicitly approve.

**Search Alignment:** Perfectly centered, balanced, and visually integrated.

**Exercise Search:** Fast, forgiving of typos, effective with partial names, and intelligently ranked.

**Exercise Database:** Broad coverage, meaningful variations, accurate classifications, and no unnecessary duplicates.

## NON-NEGOTIABLE RULES

1. Work exclusively on a separate development branch.
2. Present three options before implementing meaningful aesthetic changes.
3. Wait for my explicit design approval.
4. Preserve all existing functionality and historical data.
5. Do not introduce unrelated features or paid infrastructure.
6. Provide a working preview wherever technically possible.
7. Do not merge into `main` without my explicit authorization.

Do not stop after the first implementation that compiles.

Inspect the actual user experience, verify the calculations, test real interactions, and refine the results.

**The objective is not simply to add more features, but to make Gym Bro noticeably smarter, easier to use, and more professionally finished.**