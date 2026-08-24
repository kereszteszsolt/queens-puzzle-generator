# Changelog

All notable repository-level changes are documented here. CrownGrid follows release-oriented documentation rather than claiming a package publication or Git tag that has not been created.

## Unreleased

### Added

- Five focused Vitest checks for independent `CellState` initialization and finite optimizer initial/no-iteration/progress behavior.

### Changed

- Implemented the bounded state, optimizer, board-level touch-input, timer/replay/recovery, and contact-card hardening described by [CG-005](docs/releases/release-0.2-essential-hardening/stories/CG-005-essential-code-hardening.md).
- Extended CI to run the focused test suite before the production build.

## 0.1.0 — 2026-08-24

### Added

- CrownGrid product identity, repository metadata, GitHub Pages base path, browser title, and custom SVG favicon.
- Complete README, support guidance, user guide, architecture, puzzle-generation, development, testing, branding, privacy, and release documentation.
- Release 0.1 evidence and a bounded Release 0.2 hardening proposal.
- Focused Codex agents, reusable repository skills, working agreements, and build-only GitHub Actions verification.

### Changed

- Updated visible product labels and repository links from the previous project name to CrownGrid.
- Corrected privacy wording to describe browser-memory state rather than persistent local storage.

### Preserved

- Puzzle-generation, solution-counting, game-state, and interaction behavior were not refactored.
- The About screen's fragment-based runtime email construction remains in place.
