Public case study — short summary

NOIR STUDIO is a premium single-page portfolio landing built as a clean, fast, bilingual showcase. The experience focuses on visual polish, stable navigation, system-driven theme behavior, and a mobile-first interface with low complexity.

Looking for the full detail? See CASE-STUDY.md.

---

# NOIR STUDIO — Visual Identity Landing

## Project name
NOIR STUDIO — Visual Identity Landing

## Client brief (original brief from client)
"I need a premium single-page portfolio landing for my creative studio that communicates artistic thinking and contemporary design. The site must feel tactile and premium, support RU/EN, follow system theme by default, and remain fast and stable on first load and scroll."

---

## What was implemented
- Minimal premium landing page for a creative studio
- RU/EN switching with live updates and locale persistence
- Auto theme by system, with user preference override
- Compact sticky header with no layout jumps
- Mobile menu and accessibility-aware interactions
- Performance-focused improvements for initial render and scroll stability
- Structured documentation and public case study

---

## What changed in the codebase
- `index.html` — final structure, header, language switch, mobile menu
- `assets/css/style.css` — final visual polish, stable header, menu animations
- `assets/js/main.js` — i18n flow, theme logic, scroll/performance optimization
- `assets/data/content.json` — RU/EN content blocks
- `CASE-STUDY.md` — public-facing summary and project story
- `LICENSE` — GPL-3

---

## Honest process report
This repo reflects an iterative design flow. The initial version was a basic landing page and the later work focused on fixing user-facing issues such as language switching, theme behavior, header stability, and performance perception. The final state is a reasonable polished baseline, but it is not a final brand platform. It is a strong teaching example of how a small project can evolve from rough idea to working UX with real constraints.

This is exactly why the project is useful as a case study: it shows the difference between a working prototype and a considered, checked, production-style iteration.

---

## GitHub Pages readiness
This project is static and ready for GitHub Pages deployment. To publish it publicly:
1. Open the repository settings.
2. Go to Pages.
3. Set Source to GitHub Actions or deploy from the default branch for a user site.
4. Wait for the build and publish to complete.

This repo is setup without a framework or build step, so deployment is simple.

---

## QA checklist
- RU/EN switch updates all text blocks
- User-chosen theme persists in browser storage
- System theme is used only when no manual choice exists
- Header remains stable during scroll
- Mobile menu opens and closes correctly
- First paint is not dominated by heavy hero work

---

## Changelog
- `v2.1` — final polish: copy refinement, premium tone, menu animation, theme behavior, live i18n
- `v2.0` — i18n and theme persistence
- `v1.x` — initial landing page baseline

---

## License
This project is distributed under the GNU General Public License v3.0 (GPL-3). See `LICENSE` for the full license text.

---

## Full technical report
The README file contains the detailed technical report, timeline, and honest breakdown of the process and trade-offs.

---

## Final verdict
This project works, but it is a product of iteration, not a clean process. The landing page is functional, multilingual, and visually polished enough for a demo, but the real issue is that the task was not locked down early enough: there was no clean contract at the start, and the work evolved in response to issues rather than to a clear specification. That created extra churn, more rework, and weaker confidence in the final result. In the end, the project is useful as a realistic case study because it shows both the value of iterative fixes and the cost of doing them without structure. It is not a perfect production build, but it is a real, honest example of what happens when a project improves under pressure rather than under clear planning.

---

## Post-mortem
### Problem
- The initial brief was not translated into concrete acceptance criteria.
- There was no strict definition of what had to work at each milestone.
- As a result, the work drifted into a sequence of fixes instead of a planned implementation.

### Wrong process
- Multiple corrections happened after the initial implementation, not before it.
- There was no clear split between feature work, visual polish, and QA.
- Review and control were too loose; UI/logic changes were not always validated against a checklist.
- The project lacked a stable baseline with explicit criteria for language switching, theme behavior, and mobile navigation.

### Fix
- The project was brought to a working state with a clean baseline: RU/EN support, theme behavior, improved header stability, and basic performance improvements.
- The code was reorganized around fewer assumptions and more repeatable logic.
- Documentation was added so the process, decisions, and limitations are traceable.

### Lesson
- Without a clear contract, a project can look finished while still being unstable.
- Real quality comes from defining what must work before polishing what looks good.
- The point of iteration is not to patch endlessly — it is to improve a stable target.

### Final state
- The project is functionally solid as a case study and demo.
- It is not a final production-grade commercial build, but it is a credible baseline for further improvement.
- The value of the project is not only in the design but also in the honest account of how it evolved.

### What should have been done first
- Write one clear TЗ with acceptance criteria for locale behavior, theme behavior, menu, and stable header.
- Break the task into feature-level steps: i18n, theme, menu, header stability, polish.
- Set a QA checklist before visual refinement begins.
- Run Lighthouse and basic browser checks before calling the project mature.
