# CrownGrid development guide

## Prerequisites

- Node.js `^20.19.0` or `>=22.12.0`
- npm
- A modern browser with pointer-event and SVG-favicon support

## Install and run

```bash
npm ci
npm run dev
```

Open `http://localhost:5173/crown-grid/`.

Build and preview the production output with:

```bash
npm run build
npm run preview
```

## Repository map

- `src/core` — navigation and informational screens.
- `src/features/queens/components` — rendered game UI.
- `src/features/queens/composables` — reactive state and input behavior.
- `src/features/queens/models` — TypeScript contracts.
- `src/features/queens/utils` — framework-independent puzzle logic.
- `public/favicon.svg` — canonical browser mark.
- `docs` — user, architecture, algorithm, testing, brand, privacy, and release documentation.
- `.codex` and `.agents/skills` — optional development roles and workflows.

## Coding conventions

- Use TypeScript types at component, composable, and utility boundaries.
- Keep feature behavior under `src/features/queens`; avoid moving puzzle logic into `src/core`.
- Keep Vue components declarative. Global DOM queries and unmanaged per-cell listeners require explicit justification.
- Keep typed-array utilities independent from Vue so they can be tested directly.
- Use immutable copies when recording history or returning a best board.
- Represent status with the `GameStatus` type rather than a general string where practical.
- Preserve unrelated behavior in bounded stories.

## Branding and deployment

The display product is `CrownGrid`; the repository, package, and GitHub Pages base are `crown-grid` and `/crown-grid/`. See [brand configuration](brand-configuration.md).

A repository rename requires coordinated updates to:

- `package.json` and `package-lock.json`;
- `vite.config.ts`;
- README clone, play, issue, and repository links;
- source links on Home and About screens;
- release and brand documentation.

Do not change Git remotes automatically.

## Story workflow

1. Read `AGENTS.md` and the relevant `CG-*` story.
2. Confirm whether the story is implemented, planned, or documentation-only.
3. Trace affected components, composables, utilities, and status transitions.
4. Make the smallest complete change.
5. Run the build and relevant manual checks from [testing](testing.md).
6. Record exact evidence and limitations in the story before changing its status.

## AI-assisted roles

- Use `architect` for cross-cutting lifecycle or deployment changes.
- Use `implementation_worker` for one bounded write task.
- Use `algorithm_reviewer` for solver and optimizer correctness.
- Use `reviewer` for final correctness, privacy, accessibility, and evidence.

Skills live in `.agents/skills`. They are instructions for maintainers and agents, not runtime packages.

## License headers

New hand-authored project source files use:

```text
SPDX-FileCopyrightText: 2026 Keresztes Zsolt <https://kereszteszsolt.hu>
SPDX-License-Identifier: Apache-2.0
```

Do not use `2026-Present`. Do not add the header to Markdown, JSON, TOML, YAML, generated lock files, or binary assets.
