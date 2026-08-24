---
name: vue-feature-delivery
description: Deliver a bounded CrownGrid Vue feature or fix across screens, components, composables, routes, state contracts, branding, or Vite deployment. Use when user-visible behavior or application lifecycle changes.
---

# Vue feature delivery

1. Read `AGENTS.md` and the relevant `CG-*` story.
2. Trace the action through route, screen, component emits, composables, and rendered state.
3. Keep components declarative and keep puzzle algorithms out of templates.
4. Use `GameStatus` for lifecycle guards and review timer/control visibility together.
5. Register pointer, touch, window, and timer resources once and clean up the same resources.
6. Keep `createWebHistory(import.meta.env.BASE_URL)` aligned with the Vite base.
7. Preserve fragment-based runtime email construction and avoid publishing an address in Markdown.
8. Add focused tests or repeatable smoke evidence for changed behavior.
9. Run `npm run build` and the relevant checks in `docs/testing.md`.
10. Update story status only when implementation and evidence satisfy every criterion.

Do not add a state library, backend, persistence layer, or broad component extraction without an explicit story.
