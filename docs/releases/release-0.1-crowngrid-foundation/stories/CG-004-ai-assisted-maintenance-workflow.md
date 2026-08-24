# CG-004: Focused AI-assisted maintenance workflow

## Status

Implemented

## User story

As a maintainer, I want a small set of project-specific agents and skills so that AI-assisted changes respect CrownGrid's Vue architecture, puzzle invariants, privacy boundary, and release evidence.

## Acceptance criteria

- [x] Add root working agreements in `AGENTS.md`.
- [x] Define four focused roles: architect, implementation worker, algorithm reviewer, and reviewer.
- [x] Define four focused skills: Vue delivery, puzzle algorithms, accessibility/responsive UI, and release evidence.
- [x] Keep these files development-only and outside runtime dependencies.
- [x] Record Apache-2.0 source-header guidance using `2026`, not `2026-Present`.
- [x] Add a build-only GitHub Actions workflow matching the repository's actual scripts.
- [x] Require exact evidence before a planned story is marked implemented.

## Evidence

- `.codex`, `.agents/skills`, `AGENTS.md`, and `.github/workflows/ci.yml` contain the bounded workflow.
