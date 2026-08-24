# CG-005: Essential code hardening

## Status

Implemented

## User story

As a player and maintainer, I want the existing CrownGrid implementation to use consistent cell state, finite optimizer results, bounded input listeners, correct timer states, and correctly targeted contact assembly so that the current behavior is reliable without a broad refactor.

## Context

Code review found a small number of high-value issues. They should be fixed together as one bounded hardening story rather than split into many cosmetic tickets.

## Acceptance criteria

- [x] Empty board cells conform to the `CellState` contract by using `lastModified`; initialization creates independent cell objects rather than filling each row with one shared object reference.
- [x] The optimizer initializes `bestBoard` and `bestSolutions` from the evaluated initial board, returns a finite solution count when the loop does not run or finds no improvement, and never reports `NaN` as the iteration-zero success rate.
- [x] Touch movement is handled once at a board or declarative component boundary; mounting one cell does not query every cell or attach duplicate listeners, and unmount cleanup removes exactly the listeners that were registered.
- [x] The timer runs only in the playing state: generation success leaves it stopped until **Start Game**, generation failure leaves it stopped and exposes a usable New Game/retry path, both replay entry points reset and restart consistently, and winning stops it.
- [x] The About screen keeps fragment-based runtime email construction, targets only the email card, and never rewrites the GitHub or website card through a generic `.contact-value` selector.
- [x] README, the user guide, and Markdown documentation continue to contain no full email address.
- [x] Add focused automated coverage for state initialization and optimizer finite-result behavior, plus repeatable pointer, timer, and contact-card smoke evidence.
- [x] `npm run build` and the relevant checks in `docs/testing.md` pass without changing puzzle rules or visible controls.

## Out of scope

Web Workers, new state-management libraries, a broad `useGameController` extraction, visual redesign, persistence, authentication, backend APIs, and unrelated TypeScript cleanup are excluded.

## Verification evidence

Recorded on 2026-08-24.

- `npm test` with Vitest `4.1.11`: 2 files and 5 tests passed. The cases cover independent empty cells, current-size reset, initial-target optimizer return, a zero-iteration/no-improvement return, and finite iteration-zero progress.
- Representative optimizer fixture: a connected `4×4` row-region board with fixed queens at columns `1, 3, 0, 2`; its evaluated initial solution count remains finite in both the target-reached and `iterationLimit: 0` paths.
- Chromium `1.62.1` listener instrumentation on an `8×8` generated board observed exactly one `touchmove` registration and one matching removal after SPA navigation unmounted the board.
- Chromium desktop and `390×844` smoke paths confirmed pre-start input blocking, two-cell pointer drag, two-cell real touch drag, timer start only after **Start Game**, New Game pause/resume, Reset Game restart, win stop, win-modal Replay restart, main Replay restart, and no page-level horizontal overflow.
- A development-only rejection harness confirmed generation failure leaves the timer absent/stopped, exposes **New Game**, and reopens the board selector. No production test hook was added.
- Independent contact checks preserved the GitHub and website targets while the email card received the fragment-assembled runtime `mailto:` target.
- Markdown privacy scan found no assembled full email address in README, the user guide, or `*.md` files.
- `npm run build`: `vue-tsc -b && vite build` passed with Vite `7.3.6`; 92 modules transformed.

The browser smoke harness was temporary and is not claimed as a checked-in end-to-end suite. The repeatable manual paths remain documented in `docs/testing.md`.
