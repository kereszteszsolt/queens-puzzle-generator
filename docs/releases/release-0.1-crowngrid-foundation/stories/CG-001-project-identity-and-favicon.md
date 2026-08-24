# CG-001: Project identity and favicon

## Status

Implemented

## User story

As a maintainer, I want one CrownGrid identity across presentation and deployment surfaces so that the repository can be renamed to `crown-grid` without retaining the previous product identity.

## Acceptance criteria

- [x] Use `CrownGrid` as the display name and `Queens Puzzle Generator & Game` as the descriptor.
- [x] Use `crown-grid` as the repository and npm package identity.
- [x] Use `/crown-grid/` as the Vite and GitHub Pages base path.
- [x] Update browser title, Home, navigation, About, package metadata, and repository links.
- [x] Add a custom dependency-free SVG favicon with a crown and grid motif.
- [x] Keep the existing application palette and avoid a broad interface redesign.
- [x] Preserve puzzle-generation and game-interaction behavior.
- [x] Preserve the About screen's runtime email fragments and assembly code.

## Evidence

- `package.json`, `package-lock.json`, `vite.config.ts`, and `index.html` use the approved identity.
- `public/favicon.svg` contains the CrownGrid mark.
- Visible product labels and repository links point to CrownGrid.
- No puzzle algorithm or composable was refactored by this story.
