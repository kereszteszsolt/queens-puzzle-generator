---
name: queens-puzzle-algorithms
description: Implement or review CrownGrid queen placement, color-region growth, validation, solution counting, optimizer changes, progress values, typed-array safety, or performance boundaries.
---

# Queens puzzle algorithms

## Invariants

- A size `N` solution has exactly `N` queens.
- Every row, column, and color region contains exactly one queen.
- Queens may not be diagonally adjacent at a corner.
- A color board contains exactly `N` colors in the range `1..N`.
- Each color forms one orthogonally connected region.
- The generated fixed queen positions occupy distinct colors.
- A returned puzzle has at least one solution.

## Workflow

1. Read `docs/puzzle-generation.md` and the relevant story.
2. Validate all typed-array lengths before indexing.
3. Keep pure utilities independent from Vue and DOM state.
4. Use bounded counting when only a threshold comparison is needed.
5. Initialize current and best values from an actually evaluated board.
6. Keep progress numbers finite and stop reasons accurate.
7. Preserve a copy of the best board rather than a mutable shared reference.
8. Test initial-target, accepted-improvement, no-improvement, time-limit, and invalid-input cases.
9. Record representative sizes and limits in verification evidence.

Do not change the puzzle rules while describing the change as a performance optimization.
