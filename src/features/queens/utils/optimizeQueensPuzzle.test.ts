// SPDX-FileCopyrightText: 2026 Keresztes Zsolt <https://kereszteszsolt.hu>
// SPDX-License-Identifier: Apache-2.0

import {describe, expect, it} from "vitest";
import type {GenMessage} from "../models/GenMessage.ts";
import {countQueensSolutions} from "./countQueensSolutions.ts";
import {optimizeQueensPuzzle} from "./optimizeQueensPuzzle.ts";

const size = 4;
const board = new Int8Array([
    1, 1, 1, 1,
    2, 2, 2, 2,
    3, 3, 3, 3,
    4, 4, 4, 4,
]);
const queens = new Int8Array([
    0, -1, 0, 0,
    0, 0, 0, -1,
    -1, 0, 0, 0,
    0, 0, -1, 0,
]);

describe("optimizeQueensPuzzle finite results", () => {
    it("returns the evaluated initial board when it already meets the target", async () => {
        const initialSolutions = countQueensSolutions(board, size);

        const result = await optimizeQueensPuzzle(
            board.slice(),
            queens,
            size,
            initialSolutions,
            () => undefined,
        );

        expect(result.stoppedBy).toBe("targetReached");
        expect(result.iterations).toBe(0);
        expect(result.solutions).toBe(initialSolutions);
        expect(Number.isFinite(result.solutions)).toBe(true);
        expect(result.board).toEqual(board);
    });

    it("returns the finite initial best when no optimization iteration can run", async () => {
        const initialSolutions = countQueensSolutions(board, size);
        expect(initialSolutions).toBeGreaterThan(1);

        const result = await optimizeQueensPuzzle(
            board.slice(),
            queens,
            size,
            initialSolutions - 1,
            () => undefined,
            {iterationLimit: 0, timeLimitMs: 1_000},
        );

        expect(result.stoppedBy).toBe("iterationLimit");
        expect(result.iterations).toBe(0);
        expect(result.solutions).toBe(initialSolutions);
        expect(Number.isFinite(result.solutions)).toBe(true);
        expect(result.board).toEqual(board);
    });

    it("reports finite iteration-zero progress", async () => {
        const messages: GenMessage[] = [];

        await optimizeQueensPuzzle(
            board.slice(),
            queens,
            size,
            1,
            message => messages.push(message),
            {iterationLimit: 1, timeLimitMs: 1_000},
        );

        expect(messages).toHaveLength(1);
        expect(messages[0]!.iteration).toBe(0);
        expect(messages[0]!.successRate).toBe(0);
        expect(Number.isFinite(messages[0]!.successRate)).toBe(true);
        expect(Number.isFinite(messages[0]!.bestSolutionsCount)).toBe(true);
    });
});
