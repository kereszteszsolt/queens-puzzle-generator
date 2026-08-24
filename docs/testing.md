# CrownGrid testing and verification

## Current automated checks

The supplied baseline contains a TypeScript/Vite production build but no unit-test or lint script. The minimum repository check is therefore:

```bash
npm ci
npm run build
```

The GitHub Actions workflow runs this build on pushes and pull requests. Do not describe the repository as having automated unit coverage until a test runner and focused suites are added.

## Development smoke check

```bash
npm run dev
```

Open `http://localhost:5173/crown-grid/` and complete the checks below.

## Manual smoke matrix

### Navigation and identity

- Home, Queens, and About routes load without a full-page error.
- The navigation and Home hero display `CrownGrid`.
- The browser title and favicon use CrownGrid identity.
- Unknown application routes redirect to Home under the configured base path.
- GitHub links point to `kereszteszsolt/crown-grid`.

### Generation

- Generate at least one small board, such as `4×4` with a target of `10` solutions.
- Generate at least one medium board, such as `8×8` with a target of `5` solutions.
- Confirm progress values are readable and the generated board reports a finite solution count.
- Confirm generation success shows **Start Game** and keeps the board non-interactive until selected.
- Record the current generation-error behavior. Until CG-005 is implemented, the error path may lack a retry control and may leave an interval running; do not report this check as passing.

### Player interaction

- Single click/tap adds and removes `X` marks.
- Double click/tap places a queen and creates automatic marks.
- Removing that queen removes only marks associated with its placement.
- Dragging paints or erases marks without creating duplicate history entries for every traversed cell.
- Undo, Clear Board, Reset Game, and Shuffle Colors behave as labelled. Check both Replay entry points separately; the win-modal timer discrepancy is a known CG-005 finding.
- Input is blocked before Start Game.

### Rule feedback

- Two queens in one row highlight a conflict.
- Two queens in one column highlight a conflict.
- Two queens in one color region highlight a conflict.
- Corner-adjacent queens highlight a conflict.
- A valid completed placement stops the timer and opens the win modal.

### Responsive and contact behavior

- Test desktop and a mobile viewport near `390px` width.
- Navigation remains usable and the board does not create page-level horizontal overflow.
- About contact cards retain their correct GitHub, email, and website targets.
- The email target is assembled at runtime from fragments; no full email address is added to README or support documentation.

## Algorithm-focused evidence for future changes

A future test suite should prioritize pure utilities:

- generated queen placement has one queen per row and column and no corner adjacency;
- region fill produces `N` valid connected colors;
- solution counting respects an early-stop limit;
- optimizer results are finite when the initial board already meets the target or no improving iteration is accepted;
- invalid typed-array lengths and invalid regions fail clearly.

The planned Release 0.2 hardening story should add focused coverage for state initialization and optimizer best-state behavior without introducing a broad framework migration.
