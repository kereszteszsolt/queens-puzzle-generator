import {extractQueenIndices} from "./extractQueenIndices.ts";
import {areFixedQueensValidForColors} from "./areFixedQueensValidForColors.ts";
import {validateColorRegions} from "./validateColorRegions.ts";
import {countQueensSolutions} from "./countQueensSolutions.ts";
import {getShuffledArray} from "./getShuffledArray.ts";
import {getTRBLNeighborIndices} from "./getTRBLNeighboursIndices.ts";
import type {GenMessage} from "../models/GenMessage.ts";

export interface OptimizeOptions {
    timeLimitMs?: number      // default: 180_000 (3 minutes)
    iterationLimit?: number;  // default: 2_000_000
}

export interface OptimizeResult {
    board: Int8Array;
    solutions: number;
    iterations: number;
    stoppedBy: "targetReached" | "timeLimit" | "iterationLimit";
    size: number;
    targetMaxSolutions: number;
    iterationLimit: number;
    timeLimitMs: number;
    elapsedTimeMs: number;
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
    cb: (data: GenMessage) => void,
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
        cb({
            iteration: iterations,
            solutionsCount: solution,
            elapsedTimeMs: Date.now() - startTime,
            currentBoard: board,
            timeLimitMs: timeLimit,
            iterationLimit: iterationLimit,
            successRate: successfulChanges / (successfulChanges + failedChanges),
            targetMaxSolutions: targetMaxSolutions,
            size: size
        });
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
            // update if improved
            solution = result.newSolutions!;
            board = newBoard;
            // record history
            history.push({
                board: board.slice(),
                solutions: solution
            });

            if (solution <= targetMaxSolutions) {
                return {board, solutions: solution, iterations, stoppedBy: "targetReached", size, elapsedTimeMs: Date.now() - startTime, iterationLimit, timeLimitMs: timeLimit, targetMaxSolutions};
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
            }
        }
    }

    const stoppedBy: OptimizeResult["stoppedBy"] =
        iterations >= iterationLimit ? "iterationLimit" : "timeLimit";

    return {board: board, solutions: solution, iterations, stoppedBy, size, targetMaxSolutions, iterationLimit, timeLimitMs: timeLimit, elapsedTimeMs: Date.now() - startTime};
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
    const changeLimit = Math.floor(Math.random() * Math.min(solutions, size/3)) + 1;

    for (let i = 0; i < size * size; i++) {
        const idx = sBIdxArr[i]!;
        const neighbors: number[] = getTRBLNeighborIndices(idx, size);

        const currentColor = newBoard[idx];

        for (let n = 0; n < neighbors.length; n++) {
            const nIdx = neighbors[n]!;
            const neighborColor = newBoard[nIdx];

            if (neighborColor !== currentColor) {
                if (Math.random() < 0.5) {
                    newBoard[idx] = neighborColor!;
                    changeCount++;
                    break;
                }
            }

            if (changeCount >= changeLimit) return newBoard;
        }

        if (changeCount >= changeLimit) return newBoard;
    }

    return newBoard;
}
