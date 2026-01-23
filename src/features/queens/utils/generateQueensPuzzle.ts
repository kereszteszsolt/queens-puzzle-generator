import {generateQueenPlacement} from "./generateQueenPlacement.ts";
import {fillBoardWithColors} from "./fillBoardWithColors.ts";
import {optimizeQueensPuzzle, type OptimizeResult} from "./optimizeQueensPuzzle.ts";

export async function generateQueensPuzzle(size: number, solutionLimit: number, cb : any): Promise<OptimizeResult> {
    const queens  = generateQueenPlacement(size);
    const board = fillBoardWithColors(queens, size);
    return optimizeQueensPuzzle(board, queens, size, solutionLimit, cb);
}