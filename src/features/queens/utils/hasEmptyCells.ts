import { EMPTY } from "../constants";

export function hasEmptyCells(board: Int8Array): boolean {
    for (let i = 0; i < board.length; i++) {
        if (board[i] === EMPTY) return true;
    }
    return false;
}
