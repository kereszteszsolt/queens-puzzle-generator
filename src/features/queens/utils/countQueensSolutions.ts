import { EMPTY, QUEEN } from "../constants";
import { buildColorRegions } from "./buildColorRegions";
import { hasCornerQueen } from "./hasCornerQueen";

export function countQueensSolutions(colorBoard: Int8Array, size: number, limit?: number): number {
    if (colorBoard.length !== size * size) {
        throw new Error(`Expected colorBoard length ${size * size}, got ${colorBoard.length}`);
    }

    // 1) cells grouped by color regions
    const regions = buildColorRegions(colorBoard, size);

    // 2) order by increasing size (small regions first) -> faster backtracking
    regions.sort((a, b) => a.length - b.length);

    // 3) solver state
    const queensBoard = new Int8Array(size * size);
    queensBoard.fill(EMPTY);

    const rowUsed = new Uint8Array(size);
    const colUsed = new Uint8Array(size);

    let solutions = 0;
    const hardLimit = limit ?? Number.POSITIVE_INFINITY;

    function dfs(regionIndex: number): boolean {
        // true -> early stop (because limit reached)
        if (regionIndex === regions.length) {
            solutions++;
            return solutions >= hardLimit;
        }

        const cells = regions[regionIndex]!;
        for (let i = 0; i < cells.length; i++) {
            const idx = cells[i]!;
            const r = (idx / size) | 0;
            const c = idx - r * size;

            if (rowUsed[r] || colUsed[c]) continue;
            if (hasCornerQueen(queensBoard, size, idx)) continue;

            // place
            queensBoard[idx] = QUEEN;
            rowUsed[r] = 1;
            colUsed[c] = 1;

            if (dfs(regionIndex + 1)) return true; // limit reached -> bubble up

            // undo
            queensBoard[idx] = EMPTY;
            rowUsed[r] = 0;
            colUsed[c] = 0;
        }

        return false;
    }

    dfs(0);
    return solutions;
}
