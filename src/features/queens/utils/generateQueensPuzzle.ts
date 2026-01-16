import {generateQueenPlacement} from "./generateQueenPlacement.ts";
import {fillBoardWithColors} from "./fillBoardWithColors.ts";
import {optimizeQueensPuzzle, type OptimizeResult} from "./optimizeQueensPuzzle.ts";

export function generateQueensPuzzle(size: number, solutionLimit: number): Int8Array {
    const queens  = generateQueenPlacement(size)
    const board = fillBoardWithColors(queens, size)
    const startTime = Date.now()
    const results : OptimizeResult = optimizeQueensPuzzle(board, queens, size, solutionLimit)
    console.debug(`Optimization took ${(Date.now() - startTime)/1000} seconds, solutions: ${results.solutions.toString()} queens.`)
    console.debug(results.iterations, results.stoppedBy);
    return results.board
}