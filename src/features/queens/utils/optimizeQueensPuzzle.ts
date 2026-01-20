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
    let failedAttempts = 0;
    let successfulChanges = 0;
    let failedChanges = 0;

    while (solution > targetMaxSolutions && iterations < iterationLimit  && (Date.now() - startTime) < timeLimit) {
        cb(`Iteration ${iterations}: Current solution count: ${solution} Time elapsed: ${(Date.now() - startTime)} s`);
        iterations++;

        // Yield to event loop periodically to allow UI updates
        if (iterations % 10 === 0) {
            await new Promise(resolve => setTimeout(resolve, 0));
        }

        let newBoard = getChangeSamples(board, size, solution);

        let result = tryRecolor(newBoard, size, queenIdx, solution);
        if (result.validChange) {
            failedAttempts = 0;
            successfulChanges++;
            //    console.log(`Iteration ${iterations}: Valid change found with new solution count: ${result.newSolutions}`);
            // update if improved
            solution = result.newSolutions!;
            board = newBoard;
            // record history
            history.push({
                board: board.slice(),
                solutions: solution
            });

            cb(`Iteration ${iterations}: New best solution count: ${solution}`);

            if (solution <= targetMaxSolutions) {
                cb(`Target solution count ${targetMaxSolutions} reached at iteration ${iterations}.`);
                return {board, solutions: solution, iterations, stoppedBy: "targetReached"};
            }
            continue;
        }
        failedAttempts++;
        failedChanges++;
        console.debug(`Success rate: ${(successfulChanges / (successfulChanges + failedChanges) * 100).toFixed(2)}%`);
        if (failedAttempts >= size*size) {
            failedAttempts = 0;
            // revert to a previous state
            if (history.length > 0) {
                const snapshot = history[history.length - 1]!;
                board = snapshot.board.slice();
                solution = snapshot.solutions
                history.pop();
                cb(`Iteration ${iterations}: Reverted to previous state with solution count: ${solution}`);
            }
        }
    }

    const stoppedBy: OptimizeResult["stoppedBy"] =
        iterations >= iterationLimit ? "iterationLimit" : "timeLimit";

    return {board: board, solutions: solution, iterations, stoppedBy};
}

function tryRecolor(
    newBoard: Int8Array,
    size: number,
    queenIdx: Int32Array,
    solution: number,
): { validChange: boolean, newSolutions?: number } {

    // 1) validate initial queens
    if (!areFixedQueensValidForColors(newBoard, queenIdx, size)) {
        return {validChange: false};
    }

    // 2) validate color regions
    if (!validateColorRegions(newBoard, size)) {
        return {validChange: false};
    }

    // 3) validate solutions count
    const newSolution = countQueensSolutions(newBoard, size, solution);
    if (newSolution === 0 || newSolution >= solution) {
        return {validChange: false};
    }

    return {validChange: true, newSolutions: newSolution};
}

function getChangeSamples(board: Int8Array, size: number, solutions: number): Int8Array {
    const newBoard = board.slice();
    const sBIdxArr = getShuffledArray(0, size * size);

    let changeCount = 0;
    //const changeLimit = Math.floor(Math.random() * 2) + 1;
    const changeLimit = Math.floor(Math.random() * Math.min(solutions, size/3)) + 1;

    for (let i = 0; i < size * size; i++) {
        const idx = sBIdxArr[i]!;
        const neighbors: number[] = getTRBLNeighborIndices(idx, size); // <-- likely size, not size*size

        const currentColor = newBoard[idx];

        for (let n = 0; n < neighbors.length; n++) {
            const nIdx = neighbors[n]!;
            const neighborColor = newBoard[nIdx];

            if (neighborColor !== currentColor) {
                if (Math.random() < 0.5) {
                    newBoard[idx] = neighborColor!;   // <-- change THIS cell
                    changeCount++;
                    break; // one change per idx
                }
            }

            if (changeCount >= changeLimit) return newBoard;
        }

        if (changeCount >= changeLimit) return newBoard;
    }

    return newBoard;
}
