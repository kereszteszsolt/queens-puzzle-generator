import {getShuffledArray} from "./getShuffledArray.ts";
import {EMPTY, QUEEN} from "../constants";
import {hasCornerQueen} from "./hasCornerQueen.ts";

export function generateQueenPlacement(size: number): Int8Array {
    const board = new Int8Array(size * size);
    board.fill(EMPTY);

    const usedCols = new Uint8Array(size);

    const cols = getShuffledArray(0, size);

    function backtrack(row: number): boolean {
        if (row === size) return true;

        for (let i = 0; i < cols.length; i++) {
            const col = cols[i]!;
            const idx = row * size + col;

            if (usedCols[col] !== 0) continue;
            if (hasCornerQueen(board, size, idx)) continue;

            board[idx] = QUEEN;
            usedCols[col] = 1;

            if (backtrack(row + 1)) return true;

            board[idx] = EMPTY;
            usedCols[col] = 0;
        }

        return false;
    }

    if (!backtrack(0)) {
        throw new Error("Failed to generate a valid queens placement.");
    }

    return board;
}