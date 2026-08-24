# CG-005: Essential code hardening

## Status

Planned

## User story

As a player and maintainer, I want the existing CrownGrid implementation to use consistent cell state, finite optimizer results, bounded input listeners, correct timer states, and correctly targeted contact assembly so that the current behavior is reliable without a broad refactor.

## Context

Code review found a small number of high-value issues. They should be fixed together as one bounded hardening story rather than split into many cosmetic tickets.

## Acceptance criteria

- [ ] Empty board cells conform to the `CellState` contract by using `lastModified`; initialization creates independent cell objects rather than filling each row with one shared object reference.
- [ ] The optimizer initializes `bestBoard` and `bestSolutions` from the evaluated initial board, returns a finite solution count when the loop does not run or finds no improvement, and never reports `NaN` as the iteration-zero success rate.
- [ ] Touch movement is handled once at a board or declarative component boundary; mounting one cell does not query every cell or attach duplicate listeners, and unmount cleanup removes exactly the listeners that were registered.
- [ ] The timer runs only in the playing state: generation success leaves it stopped until **Start Game**, generation failure leaves it stopped and exposes a usable New Game/retry path, both replay entry points reset and restart consistently, and winning stops it.
- [ ] The About screen keeps fragment-based runtime email construction, targets only the email card, and never rewrites the GitHub or website card through a generic `.contact-value` selector.
- [ ] README, SUPPORT, and Markdown documentation continue to contain no full email address.
- [ ] Add focused automated coverage for state initialization and optimizer finite-result behavior, plus repeatable pointer, timer, and contact-card smoke evidence.
- [ ] `npm run build` and the relevant checks in `docs/testing.md` pass without changing puzzle rules or visible controls.

## Out of scope

Web Workers, new state-management libraries, a broad `useGameController` extraction, visual redesign, persistence, authentication, backend APIs, and unrelated TypeScript cleanup are excluded.

## Verification notes to record when implemented

- exact test command and passing test count;
- representative initial-target and no-improvement optimizer cases;
- listener-count or event-path evidence on a medium board;
- timer and control observations for generated, playing, error/retry, both replay paths, reset, and won states;
- independent GitHub, email, and website contact targets;
- production build result.
