import { EMPTY } from "../constants";

export function areFixedQueensValidForColors(
    colorBoard: Int8Array,
    queenIdx: Int32Array,
    size: number
): boolean {
    const used = new Uint8Array(size + 1);

    for (let i = 0; i < queenIdx.length; i++) {
        const idx = queenIdx[i]!;
        const color = colorBoard[idx]!;
        if (color === EMPTY) return false;
        if (color < 1 || color > size) return false;
        if (used[color]) return false;
        used[color] = 1;
    }
    return true;
}
