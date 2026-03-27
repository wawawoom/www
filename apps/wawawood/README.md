# WaWaWooD Code Review

Last review scope: `apps/wawawood` (frontend app, OG static generation, modal/carousel UX).

## Priority Findings

## Medium Findings

### P2 - Accessibility: modal keyboard/navigation support remains incomplete

- Location: `src/components/Modal/Modal.tsx`
- Current behavior:
  - Close button has `aria-label` (good).
  - Thumbnails are clickable `div` elements.
  - No explicit Escape-key close or focus trap logic in the component.
- Risk:
  - Keyboard users and screen readers may have degraded navigation inside the modal.
- Fix:
  - Replace thumbnail `div` with semantic `button type="button"`.
  - Add Escape key handling.
  - Add focus trap + restore focus to trigger on close.

### P2 - OG generation script is fragile to HTML formatting changes

- Location: `scripts/generate-project-html.mjs`
- Current behavior:
  - Uses regex replacements against generated `dist/index.html`.
- Risk:
  - Minor output format changes from Vite/minification can silently break OG replacement.
- Fix:
  - Parse/manipulate HTML structurally (HTML parser), or maintain a dedicated template for project pages.
  - Add a post-build assertion test for required tags in each generated page.

### P2 - Config duplication for site metadata

- Location:
  - `src/constants/social.ts`
  - `scripts/generate-project-html.mjs`
  - `index.html`
- Current behavior:
  - Site name/origin/default descriptions are defined in multiple places.
- Risk:
  - Drift over time (inconsistent title/description/url between runtime and generated pages).
- Fix:
  - Centralize metadata in one source and consume it in both runtime code and generation script.

## Low Findings

### P3 - Modal carousel CSS has conflicting alignment declarations

- Location: `src/components/Modal/Modal.css` (`.modal-nav`)
- Current behavior:
  - `align-self: flex-start;` and `align-self: center;` are both present in the same block.
- Risk:
  - Confusing maintenance and harder debugging of alignment issues.
- Fix:
  - Keep a single intended value and remove dead declaration.

### P3 - No automated tests in app package

- Location: `apps/wawawood` (no `*.test.*` / `*.spec.*`)
- Risk:
  - Regressions in routing, modal interactions, OG generation, and media behavior are harder to catch early.
- Fix:
  - Add smoke tests:
    - route `/` renders featured hero and list
    - route `/project/:slug` opens modal
    - build generates `dist/project/<slug>/index.html` with expected OG tags

## Suggested Fix Plan

2. Finish modal accessibility (keyboard + focus behavior + semantic thumbnails).
3. Harden OG generation (parser/template + build assertions).
4. Centralize social/SEO metadata constants.
5. Add minimal automated smoke tests.
