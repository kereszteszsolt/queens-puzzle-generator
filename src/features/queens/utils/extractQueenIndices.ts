import { QUEEN } from "../constants";

export function extractQueenIndices(queens: Int8Array): Int32Array {
    let count = 0;
    for (let i = 0; i < queens.length; i++) if (queens[i] === QUEEN) count++;

    const out = new Int32Array(count);
    let k = 0;
    for (let i = 0; i < queens.length; i++) {
        if (queens[i] === QUEEN) out[k++] = i;
    }
    return out;
}
