import { EMPTY } from "../constants";
import { getTRBLNeighborIndices } from "./getTRBLNeighboursIndices.ts";

export function validateColorRegions(colorBoard: Int8Array, size: number): boolean {
    const total = size * size;
    if (colorBoard.length !== total) return false;

    const visited = new Uint8Array(total);

    const colorSeen = new Uint8Array(size + 1);

    for (let start = 0; start < total; start++) {
        if (visited[start]) continue;

        const color = colorBoard[start]!;
        if (color === EMPTY) return false;
        if (color < 1 || color > size) return false;

        // one region per color
        if (colorSeen[color]) return false;
        colorSeen[color] = 1;

        // TRBL
        const stack: number[] = [start];
        visited[start] = 1;

        let regionCount = 0;
        const regionCells: number[] = [];

        while (stack.length) {
            const idx = stack.pop()!;
            regionCount++;
            regionCells.push(idx);

            const neigh = getTRBLNeighborIndices(idx, size);
            for (let i = 0; i < neigh.length; i++) {
                const nIdx = neigh[i]!;
                if (!visited[nIdx] && colorBoard[nIdx] === color) {
                    visited[nIdx] = 1;
                    stack.push(nIdx);
                }
            }
        }

        // if color region has more than 1 cell, then each cell must have at least one TRBL neighbor with same color
        if (regionCount > 1) {
            for (let i = 0; i < regionCells.length; i++) {
                const idx = regionCells[i]!;
                const neigh = getTRBLNeighborIndices(idx, size);

                let hasSame = false;
                for (let j = 0; j < neigh.length; j++) {
                    const nIdx = neigh[j]!;
                    if (colorBoard[nIdx] === color) {
                        hasSame = true;
                        break;
                    }
                }
                if (!hasSame) return false;
            }
        }
    }

    return true;
}
