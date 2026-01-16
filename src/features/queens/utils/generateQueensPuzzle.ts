import {generateQueenPlacement} from "./generateQueenPlacement.ts";
import {fillBoardWithColors} from "./fillBoardWithColors.ts";

export function generateQueensPuzzle(size: number, solutionLimit?: number): Int8Array {
    const queens  = generateQueenPlacement(size)
    return fillBoardWithColors(queens, size)
}