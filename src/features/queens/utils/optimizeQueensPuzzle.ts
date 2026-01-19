import {extractQueenIndices} from "./extractQueenIndices.ts";
import {areFixedQueensValidForColors} from "./areFixedQueensValidForColors.ts";
import {validateColorRegions} from "./validateColorRegions.ts";
import {countQueensSolutions} from "./countQueensSolutions.ts";
import {getShuffledArray} from "./getShuffledArray.ts";
import {getTRBLNeighborIndices} from "./getTRBLNeighboursIndices.ts";

export interface OptimizeOptions {
    timeLimitMs?: number      // default: 180_000 (3 minutes)
    iterationLimit?: number;  // default: 2_000_000
}

export interface OptimizeResult {
    board: Int8Array;
    solutions: number;
    iterations: number;
    stoppedBy: "targetReached" | "timeLimit" | "iterationLimit";
}

export interface BoardSnapshot {
    board: Int8Array;
    solutions: number;
}

export async function optimizeQueensPuzzle(
    board: Int8Array,
    queens: Int8Array,
    size: number,
    targetMaxSolutions: number,
    cb: (data: string) => void,
    options: OptimizeOptions = {}
): Promise<OptimizeResult> {
    const startTime = Date.now();

    if (board.length !== size * size) {
        throw new Error(`optimizeQueensPuzzle: board length mismatch.`);
    }
    if (queens.length !== size * size) {
        throw new Error(`optimizeQueensPuzzle: queens length mismatch.`);
    }

    const queenIdx = extractQueenIndices(queens);

    if (!areFixedQueensValidForColors(board, queenIdx, size)) {
        throw new Error("optimizeQueensPuzzle: initial board does not allow the fixed queens (duplicate/missing colors).");
    }
    if (!validateColorRegions(board, size)) {
        throw new Error("optimizeQueensPuzzle: initial board has invalid color regions.");
    }

    let solution = countQueensSolutions(board, size);

    const timeLimit = options.timeLimitMs ?? 180_000; // 3 minutes
    const iterationLimit = options.iterationLimit ?? 2_000_000;

    let iterations = 0;

    let history: BoardSnapshot[] = [];
    let cellsToChooseFrom: Int16Array = getShuffledArray(0, size * size);
    let cellIndex = 0;
    let failedAttempts = 0;

    while (solution > targetMaxSolutions && iterations < iterationLimit  && (Date.now() - startTime) < timeLimit) {
        cb(`Iteration ${iterations}: Current solution count: ${solution} Time elapsed: ${Date.now() - startTime}ms`);
        iterations++;

        // Yield to event loop periodically to allow UI updates
        if (iterations % 10 === 0) {
            await new Promise(resolve => setTimeout(resolve, 0));
        }

        if (cellIndex > cellsToChooseFrom.length) {
            cellsToChooseFrom = getShuffledArray(0, size * size);
            cellIndex = 0;
        }

        const idx = cellsToChooseFrom[cellIndex++]!;
        const neighbors: number[] = getTRBLNeighborIndices(idx, size*size);

        if  (neighbors.length === 0) {
            continue;
        }

        let neighborIdx = neighbors[Math.floor(Math.random() * neighbors.length)]!;
        let currentCellColor = board[idx]!;
        let currentNeighborColor = board[neighborIdx]!;

        if (currentCellColor === currentNeighborColor) {
            continue;
        }

        let result = tryRecolor(board, size, queenIdx, idx, currentNeighborColor, solution);
        if (!result.validChange) {
            result = tryRecolor(board, size, queenIdx, neighborIdx, currentCellColor, solution);
        }
        if (result.validChange) {
            // update if improved
            if (result.newSolutions! < solution) {
                solution =   result.newSolutions!;
                // record history
                history.push({
                    board: board.slice(),
                    solutions: solution
                });

                cb(`Iteration ${iterations}: New best solution count: ${solution}`);

                if (solution <= targetMaxSolutions) {
                    cb(`Target solution count ${targetMaxSolutions} reached at iteration ${iterations}.`);
                    return { board, solutions: solution, iterations, stoppedBy: "targetReached"  };
                }
                continue;
            }
        }
        failedAttempts++;
        if (failedAttempts >= size * size) {
            failedAttempts = 0;
            // revert to a previous state
            if (history.length > 0) {
                const snapshot = history[history.length - 1]!;
                board = snapshot.board.slice();
                solution = snapshot.solutions
                history.pop()
                cb(`Iteration ${iterations}: Reverted to previous state with solution count: ${solution}`);
            }
        }
    }

    const stoppedBy: OptimizeResult["stoppedBy"] =
        iterations >= iterationLimit ? "iterationLimit" : "timeLimit";

    return {board: board, solutions: solution, iterations, stoppedBy};
}

function tryRecolor(
    board: Int8Array,
    size: number,
    queenIdx: Int32Array,
    cellIdx: number,
    newColor: number,
    solution: number,
): { validChange: boolean, newSolutions?: number } {
    const oldColor = board[cellIdx];
    if (oldColor === newColor) return {validChange: false};

    board[cellIdx] = newColor;

    // 1) validate initial queens
    if (!areFixedQueensValidForColors(board, queenIdx, size)) {
        board[cellIdx] = oldColor!;
        return {validChange: false};
    }

    // 2) validate color regions
    if (!validateColorRegions(board, size)) {
        board[cellIdx] = oldColor!;
        return {validChange: false};
    }

    // 3) validate solutions count
    const newSolution = countQueensSolutions(board, size, solution);
    if (newSolution === 0 || newSolution >= solution) {
        board[cellIdx] = oldColor!;
        return {validChange: false};
    }

    return {validChange: true, newSolutions: newSolution};
}