# Workout experience audit — 0.7.0 baseline

Historical audit before visual approval. A — Continuity was selected on November 23 and is integrated; see STATUS.md for the current implementation.

Stable main: `2ce9a22c675d30fda5501dcc2e3edfeefef66295`, production 0.7.0 / `054060a0162f`. This update is isolated on `feature/workout-interactions-ux-refinement`; no main merge is authorized.

## Findings and boundaries

- **Final-set rest reproduced.** `advanced-controller.js` checked the completed exercise and superset round, but did not check whether any required work remained in the full workout. Completing the last outstanding set started a new timer. The baseline browser artifact records `finalSetStartedRest: true`.
- **Block layout.** The shared grid used two `1fr` tracks until the 340px breakpoint. A 375px phone gave the date and duration only 146.5px each; native date and number controls also had different intrinsic heights. Chromium did not reproduce the reported overlap at default font scale. The repair stacks these fields through 600px, constrains the label/track minima, and gives both controls the same height. Native iPhone picker rendering remains unverified; no arbitrary positional offset is used.
- **Timer architecture retained.** `draft.restTimer` contains an absolute deadline and optional paused milliseconds. `createRestClock` owns one visible-document repaint interval. Focus and normal mode render the same `restPanel`; the new alert observer samples this same timer and never decrements state. A stable optional timer ID distinguishes resets from pause/resume. Expired legacy timers remain valid.
- **Focus navigation.** Focus already stores UI selection separately from logged values, has Previous/Next buttons and an editable set picker, and alternates supersets through `activeSet`. Guarded pointer/keyboard navigation calls the existing controller. Significant visual transitions and replacing the existing prominent navigation await selection.
- **Top bar.** Full rerenders discarded horizontal scroll. The follower records it before DOM replacement, restores it on unrelated draws and follows only a changed active exercise. It scrolls the bar, not the page. Inputs and cursor-only navigation retain existing workout persistence.
- **Progress.** The old normal/Focus displays counted every row, including warm-ups and skipped work. The shared measure now counts non-warm-up rows that are not explicitly skipped, deferred or optional. Completed required sets / required total is used in both existing progress displays and all design studies. Opening an exercise never adds progress. A new visual track remains unselected.
- **Focus timer clearance.** The current floating timer remains pending placement approval. Measured height reserves scrollable space under it, including pause/resume controls and safe-area padding. No second Focus timer is created.

## Complete Settings inventory

The actual rendered control inventory is `artifacts/workout-interactions/baseline/settings.json`. The design studies use rendered section fragments from the app with synthetic data, preserving every existing form/control. Their saves are confined to demo memory.

| Current area | Controls/actions retained | Suggested review grouping |
|---|---|---|
| Appearance | Dark/light/system; coach style; optional haptics; save/status | Appearance |
| Training profile | Name; primary/secondary goal; experience; sessions/week; session minutes; split; units; canonical equipment increment; available equipment; muscle priority; preferred days; restrictions; excluded exercises; editable progression; auto-rest; rest duration; save | Training profile |
| Calendar Preferences | Sunday/Monday start; save | Calendar |
| Training tools | Plate calculator; recovery check-in; goals; calendar | Training profile / tools |
| Notifications | Enable scheduled reminders; default reminder lead time; browser permission action/status | Notifications |
| Backup & Data | Export backup; restore/import; verify saved file; recover prior journal; CSV export; persistent-storage request; backup reminder frequency; verified/requested dates | Data & backup |
| Under the hood | Version; schema; research link; local/privacy explanation; preview build and OS motion/transparency notices | About & app |
| Offline availability | Offline-shell status; safe update helper; update status | About & app |
| Undo, when available | Undo deletion/discard | Retained in functional Settings; design studies keep the underlying control when present |
| New workout preferences | Keep Screen Awake; countdown sound; completion sound; completion vibration; capability/audio status | Workout & alerts |

Coach connection, sharing consent and AI privacy controls currently live on Coach; the redesign does not silently relocate or remove them. No search field or fictitious setting is added. Settings architecture remains unchanged in the functional preview apart from the new existing-style preferences section until a design is approved.

## Browser API evidence

Compatibility source: [MDN browser-compat-data, WakeLock](https://github.com/mdn/browser-compat-data/blob/main/api/WakeLock.json), retrieved November 22, 2026; snapshot in `artifacts/workout-interactions/wake-lock-compat.json`. It lists Chrome 84+, Safari 16.4+, Firefox 126+, and iOS Safari 16.4–18.3 as partial because standalone Home Screen apps did not support it; full iOS support is listed from 18.4. Chromium Android follows Chrome support. Installed PWAs still depend on their engine, secure context, visibility and device power policy. Chrome on iOS generally uses WebKit; runtime feature detection is authoritative. None of these entries certifies this app on a physical device.

Wake lock defaults off and uses one controller with one in-flight request. It releases on completion, save, discard, preference-off, hidden document and page exit; stale asynchronous responses are also released. An automatic device release/refusal does not create a retry loop. Visibility or a subsequent user interaction can retry. It never bypasses power restrictions.

Web Audio is initialized/resumed from workout interactions or the explicit preference-save gesture, with separate default-off countdown/completion preferences. Only the current countdown second can sound, each once per timer. Completion uses a different two-tone signal; pause/cancel/reset silence voices. Hidden/expired resume does not replay a backlog. Vibration needs both rest opt-in and the existing haptics preference. Notifications continue to control scheduled reminders independently. Locked/background audio and system notifications are not promised.

## Design approval

No new final visual treatment is selected. A/B/C studies consolidate five decisions: Focus navigation, set animation, Settings organization, Focus timer placement and navigation/progress. All retain Aero and can be mixed. The actual app keeps its existing layouts and instant completion states pending selection.
