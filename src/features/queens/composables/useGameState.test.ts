// SPDX-FileCopyrightText: 2026 Keresztes Zsolt <https://kereszteszsolt.hu>
// SPDX-License-Identifier: Apache-2.0

import {ref} from "vue";
import {describe, expect, it} from "vitest";
import {EMPTY} from "../constants";
import {createEmptyBoardState, useGameState} from "./useGameState.ts";

describe("empty game state", () => {
    it("creates independent cells that conform to CellState", () => {
        const board = createEmptyBoardState(3, 1234);
        const cells = board.flat();

        expect(cells).toHaveLength(9);
        expect(new Set(cells).size).toBe(9);
        expect(cells.every(cell => cell.data === EMPTY && cell.lastModified === 1234)).toBe(true);
        expect(cells.every(cell => !("timestamp" in cell))).toBe(true);

        cells[0]!.lastModified = 5678;
        expect(cells[1]!.lastModified).toBe(1234);
    });

    it("uses the current size when the board is reset", () => {
        const size = ref(2);
        const {boardState, resetBoard} = useGameState(size);

        size.value = 4;
        resetBoard();

        expect(boardState.value).toHaveLength(4);
        expect(boardState.value.every(row => row.length === 4)).toBe(true);
        expect(new Set(boardState.value.flat()).size).toBe(16);
    });
});
