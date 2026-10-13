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

If you want the final step, I can also prepare a real GitHub Pages deployment branch or a post-deploy screenshot pack once the repo Pages setting is enabled externally.
