import {getShuffledArray} from "./getShuffledArray.ts";
import {EMPTY} from "../constants";
import {hasEmptyCells} from "./hasEmptyCells.ts";
import {getRandomCellIndex} from "./getRandomCellIndex.ts";
import {getTRBLNeighborIndices} from "./getTRBLNeighboursIndices.ts";

export function fillBoardWithColors(queens: Int8Array, size: number): Int8Array {
    if (queens.length !== size * size) {
        throw new Error(`Expected queens length ${size * size}, got ${queens.length}`);
    }

    const board = new Int8Array(size * size);
    board.fill(EMPTY);

    // 1) assign random colors (1...size) to each queen cell
    const shuffledColors = getShuffledArray(1, size + 1); // max exclusive -> 1..size
    let colorIndex = 0;

    for (let idx = 0; idx < size * size; idx++) {
        if (queens[idx] === -1) {
            if (colorIndex >= shuffledColors.length) {
                throw new Error("More queens than colors available.");
            }
            board[idx] = shuffledColors[colorIndex]!;
            colorIndex++;
        }
    }

    // 2) propagate colors until no empty cells
    // safety cap to avoid infinite loops in case of a bug
    const maxSteps = size * size * 50;
    let steps = 0;

    while (hasEmptyCells(board) && steps++ < maxSteps) {
        const idx = getRandomCellIndex(size);
        const v = board[idx];

        const neighbors = getTRBLNeighborIndices(idx, size);

        if (v === EMPTY) {
            // empty cell: if it has any colored neighbor, copy one neighbor's color
            // collect colored neighbors
            let coloredCount = 0;
            let chosenColor = 0;

            for (let i = 0; i < neighbors.length; i++) {
                const nIdx = neighbors[i]!;
                const nv = board[nIdx];
                if (nv !== EMPTY) {
                    coloredCount++;
                    // reservoir sampling to pick 1 colored neighbor uniformly
                    if (Math.random() < 1 / coloredCount) chosenColor = nv!;
                }
            }

            if (coloredCount > 0) {
                board[idx] = chosenColor;
            }
        } else {
            // colored cell: if it has empty neighbor, color ONE empty neighbor with this color
            let emptyCount = 0;
            let chosenEmptyNeighbor = -1;

            for (let i = 0; i < neighbors.length; i++) {
                const nIdx = neighbors[i]!;
                if (board[nIdx] === EMPTY) {
                    emptyCount++;
                    if (Math.random() < 1 / emptyCount) chosenEmptyNeighbor = nIdx;
                }
            }

            if (chosenEmptyNeighbor !== -1) {
                board[chosenEmptyNeighbor] = v!;
            }
        }

        // fallback
        if (steps % (size * size) === 0 && hasEmptyCells(board)) {
            forceOneFill(board, size);
        }
    }

    if (hasEmptyCells(board)) {
        throw new Error("fillBoardWithColors: exceeded maxSteps, board still has EMPTY cells.");
    }

    return board;
}

function forceOneFill(board: Int8Array, size: number): void {
    const total = size * size;

    for (let idx = 0; idx < total; idx++) {
        if (board[idx] !== EMPTY) continue;

        const neighbors = getTRBLNeighborIndices(idx, size);
        for (let i = 0; i < neighbors.length; i++) {
            const nIdx = neighbors[i]!;
            const nv = board[nIdx];
            if (nv !== EMPTY) {
                board[idx] = nv!;
                return;
            }
        }
    }
}
