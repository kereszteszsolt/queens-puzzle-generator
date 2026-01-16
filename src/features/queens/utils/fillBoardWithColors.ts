import {getShuffledArray} from "./getShuffledArray.ts";

export function fillBoardWithColors(queens: Int8Array, size: number): Int8Array {
    const board = new Int8Array(size * size);

    // assign random colors to each queen
    const shuffledColors = getShuffledArray(1, size+1);
    let colorIndex = 0;
    for (let i = 0; i < size * size; i++) {
        if (queens[i] === -1) {
            board[i] = shuffledColors[colorIndex]!;
            colorIndex++;
        }
    }
    return board;
}