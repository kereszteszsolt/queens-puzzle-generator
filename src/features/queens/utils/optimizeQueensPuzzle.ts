import {countQueensSolutions} from "./countQueensSolutions";
import {validateColorRegions} from "./validateColorRegions";
import {areFixedQueensValidForColors} from "./areFixedQueensValidForColors";
import {extractQueenIndices} from "./extractQueenIndices";
import {getTRBLNeighborIndices} from "./getTRBLNeighboursIndices";
import {pickRandomNeighborIndex} from "./pickRandomNeighborIndex";

export interface OptimizeOptions {
    timeLimitMs?: number;      // default: 180_000
    iterationLimit?: number;   // default: 2_000_000
}

export interface OptimizeResult {
    board: Int8Array;
    solutions: number;
    iterations: number;
    stoppedBy: "targetReached" | "timeLimit" | "iterationLimit";
}

export async function optimizeQueensPuzzle(
    board: Int8Array,
    queens: Int8Array,
    size: number,
    targetMaxSolutions: number,
    cb: (data: string) => void,
    options: OptimizeOptions = {}
): Promise<OptimizeResult> {
    const timeLimitMs = options.timeLimitMs ?? 180_000;
    const iterationLimit = options.iterationLimit ?? 2_000_000;
    const start = Date.now();

    if (board.length !== size * size) {
        throw new Error(`optimizeQueensPuzzle: board length mismatch.`);
    }
    if (queens.length !== size * size) {
        throw new Error(`optimizeQueensPuzzle: queens length mismatch.`);
    }

    const queenIdx = extractQueenIndices(queens);

    // Validate initial board
    if (!areFixedQueensValidForColors(board, queenIdx, size)) {
        throw new Error("optimizeQueensPuzzle: initial board does not allow the fixed queens (duplicate/missing colors).");
    }
    if (!validateColorRegions(board, size)) {
        throw new Error("optimizeQueensPuzzle: initial board has invalid color regions.");
    }

    // initial solutions
    let bestSolutions = countQueensSolutions(board, size);
    let bestBoard = board.slice();

    // target already met
    if (bestSolutions > 0 && bestSolutions <= targetMaxSolutions) {
        return {board: bestBoard, solutions: bestSolutions, iterations: 0, stoppedBy: "targetReached"};
    }

    let allCells = Array.from({ length: size*size }, (_, i) => i);
    let iterations = 0;

    while (iterations < iterationLimit && (Date.now() - start) < timeLimitMs) {
        cb(`${iterations} iterations, best solutions: ${bestSolutions}, time elapsed: ${(Date.now() - start) / 1000} s`);
        iterations++;

        // Yield to event loop periodically to allow UI updates
        if (iterations % 10 === 0) {
            await new Promise(resolve => setTimeout(resolve, 0));
        }

        // random cell
        const r_id = (Math.random() * (allCells.length)) | 0;
        const idx = allCells[r_id]!;
        allCells.slice(r_id, 1);
        const baseColor = board[idx];

        // TRBL neighbors with different color
        const neighbors = getTRBLNeighborIndices(idx, size);
        const nIdx = pickRandomNeighborIndex(neighbors, (cand) => board[cand] !== baseColor);
        if (nIdx === -1) continue;

        const {validChange, newSolutions} = tryRecolor(board, size, queenIdx, nIdx, baseColor!, bestSolutions, targetMaxSolutions)
        if (validChange) {
            if (newSolutions! > 0 && newSolutions! < bestSolutions) {
                bestSolutions = newSolutions!;
                bestBoard = board.slice();
                if (bestSolutions <= targetMaxSolutions) {
                    return {board: bestBoard, solutions: bestSolutions, iterations, stoppedBy: "targetReached"};
                }
            }
            allCells = Array.from({ length: size*size }, (_, i) => i); // reset cells
        }
    }

    const stoppedBy: OptimizeResult["stoppedBy"] =
        iterations >= iterationLimit ? "iterationLimit" : "timeLimit";

    return {board: bestBoard, solutions: bestSolutions, iterations, stoppedBy};
}

function tryRecolor(
    board: Int8Array,
    size: number,
    queenIdx: Int32Array,
    cellIdx: number,
    newColor: number,
    currentBestSolutions: number,
    targetMaxSolutions: number
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
    const earlyLimit = Math.max(currentBestSolutions, targetMaxSolutions) - 1;
    const solutions = countQueensSolutions(board, size, earlyLimit);
    console.log('earlyLimit in tryRecolor', earlyLimit);
    console.log('count in tryRecolor', solutions);
    if (solutions === 0 || solutions >= currentBestSolutions) {
        board[cellIdx] = oldColor!;
        return {validChange: false};
    }

    return {validChange: true, newSolutions: solutions};
}