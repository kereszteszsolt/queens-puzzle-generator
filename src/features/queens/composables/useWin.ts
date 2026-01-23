import {computed, type Ref} from "vue";
import type {CellState} from "../models/CellState.ts";
import {QUEEN} from "../constants";


export function useWin(
    boardState: Ref<CellState[][]>,
    queensChallenge: Ref<number[][]>,
) {
    const win = computed(() => {
        // Basic guards
        if (!boardState?.value || boardState.value.length === 0) return false;
        if (!boardState.value[0] || boardState.value[0]!.length === 0) return false;

        const rows = boardState.value.length;
        const cols = boardState.value[0]!.length;

        if (!queensChallenge?.value || queensChallenge.value.length !== rows || queensChallenge.value[0]!.length !== cols) {
            return false;
        }

        let queensCount = 0;
        const colorsSet = new Set<number>();

        const rowCounts = new Array<number>(rows).fill(0);
        const colCounts = new Array<number>(cols).fill(0);

        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                if (boardState.value[r]![c]!.data === QUEEN) {
                    queensCount++;
                    colorsSet.add(queensChallenge.value[r]![c]!);
                    rowCounts[r]!++;
                    colCounts[c]!++;
                }
            }
        }

        // Must place exactly one queen per row and use unique colors for all queens
        if (queensCount !== rows || colorsSet.size !== queensCount) {
            return false;
        }

        for (let r = 0; r < rows; r++) {
            if (rowCounts[r] !== 1) return false;
        }
        for (let c = 0; c < cols; c++) {
            if (colCounts[c] !== 1) return false;
        }

        // check diagonal adjacency (corner adjacency) - forbidden
        const diagDirs: [number, number][] = [[-1, -1], [-1, 1], [1, -1], [1, 1]];
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                if (boardState.value[r]![c]!.data === QUEEN) {
                    for (const [dr, dc] of diagDirs) {
                        const nr = r + dr;
                        const nc = c + dc;
                        if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
                            if (boardState.value[nr]![nc]!.data === QUEEN) {
                                return false;
                            }
                        }
                    }
                }
            }
        }

        return true;
    });

    return {
        win,
    };
}