import {computed, type Ref} from "vue";
import type {CellState} from "../models/CellState.ts";
import {QUEEN} from "../constants";

export function useConflicts(
    boardState: Ref<Array<Array<CellState>>>,
    queensChallenge: Ref<Array<Array<number>>>,
) {
    const conflicts = computed(() => {
        const rows = boardState.value.length;
        const cols = rows > 0 ? boardState.value[0]!.length : 0;

        // initialize false matrix
        const grid: boolean[][] = Array.from({ length: rows }, () => Array(cols).fill(false));

        if (rows === 0 || cols === 0) return grid;
        if (!queensChallenge?.value || queensChallenge.value.length !== rows || queensChallenge.value[0]!.length !== cols) {
            return grid;
        }

        // collect queen positions
        const queens: [number, number][] = [];
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                if (boardState.value[r]![c]!.data === QUEEN) {
                    queens.push([r, c]);
                }
            }
        }

        // quick return if no queens
        if (queens.length === 0) return grid;

        // helper to mark a cell safe-guarded
        const mark = (r: number, c: number) => {
            if (r >= 0 && r < rows && c >= 0 && c < cols) grid[r]![c] = true;
        };

        // 1) diagonal (corner) adjacency: if two queens are diagonally adjacent, mark both
        const diagDirs: [number, number][] = [[-1, -1], [-1, 1], [1, -1], [1, 1]];
        for (const [r, c] of queens) {
            for (const [dr, dc] of diagDirs) {
                const nr = r + dr;
                const nc = c + dc;
                if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
                    if (boardState.value[nr]![nc]!.data === QUEEN) {
                        mark(r, c);
                        mark(nr, nc);
                    }
                }
            }
        }

        // 2) multiple queens in same row / same column -> mark those queens
        // rows: if more than one queen in row, mark entire row
        for (let r = 0; r < rows; r++) {
            let rowQueenCount = 0;
            for (let c = 0; c < cols; c++) {
                if (boardState.value[r]![c]!.data === QUEEN) rowQueenCount++;
            }
            if (rowQueenCount > 1) {
                for (let c = 0; c < cols; c++) mark(r, c);
            }
        }
        // cols: if more than one queen in column, mark entire column
        for (let c = 0; c < cols; c++) {
            let colQueenCount = 0;
            for (let r = 0; r < rows; r++) {
                if (boardState.value[r]![c]!.data === QUEEN) colQueenCount++;
            }
            if (colQueenCount > 1) {
                for (let r = 0; r < rows; r++) mark(r, c);
            }
        }

        // 3) multiple queens with same color -> mark whole color region conflicted
        // Count queens per color
        const colorQueenCount = new Map<number, number>();
        for (const [r, c] of queens) {
            const color = queensChallenge.value[r]![c]!
            colorQueenCount.set(color, (colorQueenCount.get(color) ?? 0) + 1);
        }

        // For each color that has more than one queen, mark all cells of that color
        for (const [color, count] of colorQueenCount.entries()) {
            if (count > 1) {
                for (let r = 0; r < rows; r++) {
                    for (let c = 0; c < cols; c++) {
                        if (queensChallenge.value[r]![c] === color) mark(r, c);
                    }
                }
            }
        }

        return grid;
    });

    return { conflicts };
}