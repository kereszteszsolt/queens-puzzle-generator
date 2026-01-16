import { countQueensSolutions } from "./countQueensSolutions";
import { validateColorRegions } from "./validateColorRegions";
import { areFixedQueensValidForColors } from "./areFixedQueensValidForColors";
import { extractQueenIndices } from "./extractQueenIndices";
import { getTRBLNeighborIndices } from "./getTRBLNeighboursIndices";
import { pickRandomNeighborIndex } from "./pickRandomNeighborIndex";

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

export function optimizeQueensPuzzle(
    board: Int8Array,
    queens: Int8Array,
    size: number,
    targetMaxSolutions: number,
    options: OptimizeOptions = {}
): OptimizeResult {
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
        return { board: bestBoard, solutions: bestSolutions, iterations: 0, stoppedBy: "targetReached" };
    }

    let iterations = 0;

    while (iterations < iterationLimit && (Date.now() - start) < timeLimitMs) {
        iterations++;

        // random cell
        const idx = (Math.random() * (size * size)) | 0;
        const baseColor = board[idx];

        // TRBL neighbors with different color
        const neighbors = getTRBLNeighborIndices(idx, size);
        const nIdx = pickRandomNeighborIndex(neighbors, (cand) => board[cand] !== baseColor);
        if (nIdx === -1) continue;

        const neighborColor = board[nIdx];

        // randomize try order, to avoid bias
        const firstGrow = Math.random() < 0.5;

        if (firstGrow) {
            if (tryRecolor(board, size, queenIdx, nIdx, baseColor!, bestSolutions, targetMaxSolutions)) {
                const newSolutions = countQueensSolutions(board, size, bestSolutions); // early exit ha >= bestSolutions
                if (newSolutions > 0 && newSolutions < bestSolutions) {
                    bestSolutions = newSolutions;
                    bestBoard = board.slice();
                    if (bestSolutions <= targetMaxSolutions) {
                        return { board: bestBoard, solutions: bestSolutions, iterations, stoppedBy: "targetReached" };
                    }
                }
            } else if (tryRecolor(board, size, queenIdx, idx, neighborColor!, bestSolutions, targetMaxSolutions)) {
                const newSolutions = countQueensSolutions(board, size, bestSolutions);
                if (newSolutions > 0 && newSolutions < bestSolutions) {
                    bestSolutions = newSolutions;
                    bestBoard = board.slice();
                    if (bestSolutions <= targetMaxSolutions) {
                        return { board: bestBoard, solutions: bestSolutions, iterations, stoppedBy: "targetReached" };
                    }
                }
            }
        } else {
            if (tryRecolor(board, size, queenIdx, idx, neighborColor!, bestSolutions, targetMaxSolutions)) {
                const newSolutions = countQueensSolutions(board, size, bestSolutions);
                if (newSolutions > 0 && newSolutions < bestSolutions) {
                    bestSolutions = newSolutions;
                    bestBoard = board.slice();
                    if (bestSolutions <= targetMaxSolutions) {
                        return { board: bestBoard, solutions: bestSolutions, iterations, stoppedBy: "targetReached" };
                    }
                }
            } else if (tryRecolor(board, size, queenIdx, nIdx, baseColor!, bestSolutions, targetMaxSolutions)) {
                const newSolutions = countQueensSolutions(board, size, bestSolutions);
                if (newSolutions > 0 && newSolutions < bestSolutions) {
                    bestSolutions = newSolutions;
                    bestBoard = board.slice();
                    if (bestSolutions <= targetMaxSolutions) {
                        return { board: bestBoard, solutions: bestSolutions, iterations, stoppedBy: "targetReached" };
                    }
                }
            }
        }
    }

    const stoppedBy: OptimizeResult["stoppedBy"] =
        iterations >= iterationLimit ? "iterationLimit" : "timeLimit";

    return { board: bestBoard, solutions: bestSolutions, iterations, stoppedBy };
}

function tryRecolor(
    board: Int8Array,
    size: number,
    queenIdx: Int32Array,
    cellIdx: number,
    newColor: number,
    currentBestSolutions: number,
    targetMaxSolutions: number
): boolean {
    const oldColor = board[cellIdx];
    if (oldColor === newColor) return false;

    board[cellIdx] = newColor;

    // 1) validate initial queens
    if (!areFixedQueensValidForColors(board, queenIdx, size)) {
        board[cellIdx] = oldColor!;
        return false;
    }

    // 2) validate color regions
    if (!validateColorRegions(board, size)) {
        board[cellIdx] = oldColor!;
        return false;
    }

    // 3) validate solutions count
    const earlyLimit = Math.min(currentBestSolutions, targetMaxSolutions + 1);
    const solutions = countQueensSolutions(board, size, earlyLimit);
    if (solutions === 0 || solutions >= currentBestSolutions) {
        board[cellIdx] = oldColor!;
        return false;
    }

    return true;
}
