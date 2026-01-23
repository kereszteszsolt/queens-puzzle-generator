import {QUEEN} from "../constants";

export function hasCornerQueen(queensBoard: Int8Array, size: number, idx: number): boolean {
    const r = (idx / size) | 0;
    const c = idx - r * size;

    // (r-1,c-1)
    if (r > 0 && c > 0 && queensBoard[(r - 1) * size + (c - 1)] === QUEEN) return true;
    // (r-1,c+1)
    if (r > 0 && c < size - 1 && queensBoard[(r - 1) * size + (c + 1)] === QUEEN) return true;
    // (r+1,c-1)
    if (r < size - 1 && c > 0 && queensBoard[(r + 1) * size + (c - 1)] === QUEEN) return true;
    // (r+1,c+1)
    if (r < size - 1 && c < size - 1 && queensBoard[(r + 1) * size + (c + 1)] === QUEEN) return true;

    return false;
}
