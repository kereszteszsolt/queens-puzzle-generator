# Release 0.1: CrownGrid foundation

## Status

Implemented in this repository package on 2026-08-24.

## Objective

Establish CrownGrid as a coherent, documented repository without refactoring the supplied puzzle engine.

## Story map

| Story | Title | Status |
| --- | --- | --- |
| [CG-001](stories/CG-001-project-identity-and-favicon.md) | Project identity and favicon | Implemented |
| [CG-002](stories/CG-002-readme-support-and-contact.md) | README, support, and contact boundary | Implemented |
| [CG-003](stories/CG-003-technical-documentation.md) | Technical and user documentation | Implemented |
| [CG-004](stories/CG-004-ai-assisted-maintenance-workflow.md) | Focused AI-assisted maintenance workflow | Implemented |

## Release boundary

Release 0.1 changes repository identity, visible naming, deployment metadata, documentation, favicon, support presentation, agent instructions, skills, and build CI. It does not refactor generator, solver, optimizer, game-state, timer, or pointer-interaction behavior.

The About screen's existing email fragments and runtime assembly remain present. The full email address is not added to README, the user guide, or other Markdown documentation.

## Verification boundary

The repository provides `npm ci` and `npm run build` as the automated baseline plus a manual smoke matrix in `docs/testing.md`. No unit-test or lint command existed in the supplied source, so Release 0.1 does not claim automated behavioral coverage.
