---
name: accessibility-responsive-ui
description: Review or deliver CrownGrid keyboard, pointer, touch, semantics, responsive layout, conflict feedback, modal behavior, status messaging, and small-screen usability.
---

# Accessibility and responsive UI

1. Read `AGENTS.md`, the relevant story, and the current component event path.
2. Keep controls as semantic buttons or links with accurate labels and disabled states.
3. Ensure status changes remain understandable without relying only on color.
4. Preserve conflict patterns and readable region boundaries.
5. Avoid duplicate per-cell global or DOM listeners; own listeners at the narrowest stable boundary.
6. Check pointer, touch, and keyboard behavior separately where the control supports them.
7. Verify modal focus, Escape behavior, and background interaction when those behaviors change.
8. Test desktop and approximately `390px` width without horizontal page overflow.
9. Verify Home, Queens, About, and contact-card links under the production base path.
10. Record exact manual evidence when automated browser tests do not exist.

Do not redesign the application solely to satisfy a small interaction defect.
