# Gym Bro / five directions

**Selection recorded November 17, 2026:** the user chose **A — Aero**. The recommended balanced glass is being implemented as reviewed. See [implementation results](IMPLEMENTATION.md) and [the working-app review](aero.html). The following is the preserved pre-approval design package, not the current implementation status.

This is a design decision package, before implementation. Your current light-mode session hierarchy and existing navigation remain the foundation. All studies use the same fictional journal. The purple surfaces have been replaced with individually designed neutral light and dark pairs.

| Direction | Character and typography | Light → dark accent | Geometry and surfaces |
| --- | --- | --- | --- |
| **A — Aero** | Liquid athletic; Manrope + DM Sans | Mineral blue `#1c5680` → `#86bded` | Comfortable spacing, 14px cards, lifted capsule navigation; graphite dark |
| **B — Index** | Monochrome performance; Geist + DM Sans | Ink `#202420` → chalk `#eef2ec` | Compact rhythm, 3–4px corners, open ruled panels, quiet rectangular dock |
| **C — Morrow** | Organic premium; DM Sans | Sage `#4b6149` → `#b5c9a9` | Warm ivory, 20px solid cards, softer controls; warm charcoal dark |
| **D — Pulse** | Modern sports; Barlow Condensed + DM Sans | Burnt orange `#aa4321` → `#f0ad7c` | Bold condensed headlines, 8px cards, precise active-set rail, ribbon navigation |
| **E — Still** | Editorial glass; Newsreader + DM Sans | Mineral teal `#2c6266` → `#a2d0cb` | Open surfaces, thin rules, generous spacing and outlined glass selection |

**Recommendation: A — Aero with balanced glass.** It most directly improves the light-mode foundation while giving dark mode a clean graphite identity and keeping logging easy to scan. D is the strongest choice for a more distinctive athletic personality. E is the most editorial alternative. You can combine a direction's typography, palette or control treatment with another; that combination will be shown before implementation if it changes the reviewed result substantially.

## What to review

Use the concept buttons, light/dark selector, screen selector and four material levels. Desktop offers paired appearances and five-way comparisons. “Open prototype” gives a full-window version for phone use. The six primary screens are Workout, Active workout, Gains, Exercise library, Schedule and Settings. Ten additional views cover muscle maps, weekly review, Focus Mode, blocks, records/achievements, summary, Programs, Coach, updater and component states.

Start a sample session; edit its weight/reps/RIR; complete and undo a set; open exercise options; try Focus Mode; search/favorite a movement; inspect backup controls and the updater. Nav, inputs and native details work. Secondary actions outside the mock controller explicitly announce that they are sample controls. No actual workout or preference is saved. No backup is downloaded, AI request made, notification permission requested or app update installed.

## Glass levels

| Treatment | Fill / blur | Use |
| --- | --- | --- |
| Solid | Opaque / none | Clean baseline and accessibility fallback |
| Subtle | 94% / 8px | Very quiet depth |
| Balanced | 80% / 16px | Recommended separation for floating controls |
| Expressive | 66% / 24px | Stronger layering, with restrained saturation |

Glass is limited to navigation, the exercise jump control, sample rest control and menu chrome. Content, fields and analytics remain solid or open over the opaque page. Unsupported backdrop filtering and reduced transparency use solid surfaces. Reduced motion removes transitions and animation. These are CSS approximations, not native Apple Liquid Glass rendering.

Completed work is green with a check; active work has an accent rail/border; records have a separate gold or reserved lime marker. Warnings and errors have their own colors. Logging inputs remain opaque and completion retains a 44px target.

## Verification and limits

The Chromium review suite checks 960 combinations: five concepts × two appearances × sixteen screens × six widths (320, 375, 390, 430, 768, 1120). It checks content overflow and navigation containment, 120 solid-surface contrast pairs at 4.5:1 or better, sample completion/undo and invalid entries, menus, optional RIR, search/favorites, all four materials and the OS transparency fallback. It also verifies zero journal databases, localStorage entries, caches and service workers after the prototype interactions. Actual rendered screenshots accompany this package.

These are isolated visual prototypes, not a replacement application. Training calculations, persistence and the real updater are not exercised by the mock controller. The application's source and offline asset hashes remain unchanged. Domain and backend regression checks pass. Final app-wide, offline/update, physical Safari/PWA and keyboard/device performance checks follow approval and implementation; no physical iPhone certification is claimed here.

The [audit](AUDIT.md) records source principles and isolation. The [brief](BRIEF.md) is preserved verbatim. Local font licenses accompany the study. Main stays on released 0.4.0; this review does not authorize a merge.

Choose **A, B, C, D or E**, specify a glass level if you have a preference, or describe the details you want combined.
