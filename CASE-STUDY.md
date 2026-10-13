# CASE STUDY — NOIR STUDIO

## Hook
NOIR STUDIO is a premium single-page portfolio landing built as a clean, fast, bilingual brand showcase. The project focuses on visual polish, stable navigation, system-driven theme behavior, and a mobile-first UX — all without unnecessary complexity.

## Public summary
This project was treated as a real-world design-and-UX iteration. The goal was not just to make a page “look good,” but to ship a small landing experience that feels premium, loads quickly, and behaves predictably across language/theme states. The work includes brand content, a light/dark theme system, bilingual content, and a mobile menu. The result is a solid baseline that demonstrates the process: problem → iteration → polish → constraints → next-step improvements.

## Client brief
A premium one-page portfolio landing for a creative studio. The site had to feel tactile and premium, work in RU/EN, respect the user's system theme by default, and remain stable and fast on first load and scroll.

## The challenge
- Prevent header jank and layout shifts during scroll
- Add a proper language switcher with real RU/EN state
- Respect system theme by default, while preserving user-driven theme preference
- Keep the initial page fast and clean on load
- Deliver a small but premium experience without overengineering

## Approach
- Compact, minimal header with stable sticky behavior
- Real locale switching from JSON content; localStorage persistence
- Theme follows system unless user overrides it
- Reveal animations and scroll handling optimized to reduce jank
- Mobile menu with simple, predictable behavior

## What we delivered
- Fully working landing page
- RU/EN switcher with live updates
- Theme auto + user override
- Mobile-friendly burger menu
- Better perceived performance through deferred work and reduced heavy effects
- Honest documentation of process and constraints

## Deployment status
This project is structured as a static site and is ready for GitHub Pages deployment. For a real public deployment, enable GitHub Pages in the repository settings (Settings → Pages → Branch: main / root) or use an equivalent static host. The repo is already compatible with that setup because it contains only static HTML, CSS, JS, and JSON assets.

## Screenshots
The project is prepared for real capture after Pages is enabled. The following are placeholders to be replaced with actual screenshots once the page is live.

### Hero section
Placeholder: screenshot of the full hero section with premium typography, call-to-action buttons, and image area.

### Mobile menu
Placeholder: screenshot of the collapsed mobile menu state with RU/EN and theme controls.

### Theme switch
Placeholder: screenshot showing light and dark theme states.

### Language switch
Placeholder: screenshot of RU and EN states for the same content block.

## Lighthouse status
Lighthouse was not run on a live public URL here because this environment does not provide a browser automation layer or live Pages host. The site is prepared for a proper audit, and the recommended command is:

npx lighthouse http://localhost:8000 --output=json --output=html --output-path=./lighthouse/

After the repo is published, run the same check against the live Pages URL and compare to baseline metrics for FCP, LCP, CLS, and interaction timing.

## Timeline (summary)
- Analysis + planning: ~10 min
- Theme + UI fixes: ~15 min
- Language switching + content flow: ~20 min
- Header/menu polish: ~10–15 min
- Final documentation + case study: ~10 min

## Outcome and honest notes
The result is a solid baseline — not a final premium brand platform, but a polished reference implementation. It demonstrates a clean UX flow, working localization, stable navigation, and a decent visual tone. The site is functionally good, and the remaining gaps are mostly around production-scale polish, more rigorous review, and measurable performance data after deployment.

The honest lesson from this project: a lot of work happened after the first version because the initial task was not locked down into clear acceptance criteria. That is the real reason the process felt noisy. The end product is better because of the iteration, but the process itself was too loose.

## What I would do next
- Add CI checks and smoke tests
- Run Lighthouse on the real URL after enabling Pages
- Add a true visual QA pass on desktop/mobile breakpoints
- Add CTA and conversion refinements after measurement

## Link to the full technical report
README.md contains the deeper technical report, timeline, and project process analysis.

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

---

If you want the final step, I can also prepare a real GitHub Pages deployment branch or a post-deploy screenshot pack once the repo Pages setting is enabled externally.
