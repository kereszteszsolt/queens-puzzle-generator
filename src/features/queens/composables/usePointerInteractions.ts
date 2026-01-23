import type {Ref} from "vue";
import {EMPTY, QUEEN, X_MARK} from "../constants";
import type {CellState} from "../models/CellState.ts";
import {GameStatuses} from "../models/GameStatus.ts";

export function usePointerInteractions(
    boardState: Ref<CellState[][]>,
    queensChallenge: Ref<number[][]>,
    pushHistorySnapshot: () => void,
    undo: () => void,
    gameStatus: Ref<string>,
) {
    let isPointerDown = false;
    let paintActive = false;
    let eraseActive = false;
    let moveInProgress = false;
    let lastTapTime = 0;
    let lastTapCell: [number, number] | null = null;
    const DOUBLE_CLICK_MS = 350;

    function startMove() {
        moveInProgress = true;
    }

    function stopMove() {
        if (!moveInProgress) return;
        moveInProgress = false;
        pushHistorySnapshot();
    }

    function autoPlaceXs(r: number, c: number, timestamp: number) {
        const rows = boardState.value.length;
        const cols = boardState.value[0]!.length;
        for (let rr = 0; rr < rows; rr++) {
            for (let cc = 0; cc < cols; cc++) {
                //if in same row or column or same color region if empty
                if ((rr === r || cc === c) || queensChallenge.value[rr]![cc] === queensChallenge.value[r]![c]) {
                    if (boardState.value[rr]![cc]!.data === EMPTY) {
                        boardState.value[rr]![cc] = {data: X_MARK, lastModified: timestamp};
                    }
                }
            }
        }
        //place xs on immediate diagonal neighbors if empty
        const diag: [number, number][] = [[r - 1, c - 1], [r - 1, c + 1], [r + 1, c - 1], [r + 1, c + 1]];
        for (const [nr, nc] of diag) {
            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
                if (boardState.value[nr]![nc]!.data === EMPTY) {
                    boardState.value[nr]![nc] = {data: X_MARK, lastModified: timestamp};
                }
            }
        }
    }

    function autoRemoveXs(queenTimestamp: number, newTimestamp: number) {
        const rows = boardState.value.length;
        const cols = boardState.value[0]!.length;
        for (let rr = 0; rr < rows; rr++) {
            for (let cc = 0; cc < cols; cc++) {
                if (boardState.value[rr]![cc]!.data === X_MARK && boardState.value[rr]![cc]!.lastModified == queenTimestamp) {
                    boardState.value[rr]![cc] = {data: EMPTY, lastModified: newTimestamp};
                }
            }
        }
    }

    function handlePointerDown(r: number, c: number) {
        // Prevent interactions when game is not in playing or won state
        if (gameStatus.value !== GameStatuses.PLAYING && gameStatus.value !== GameStatuses.WON) {
            return;
        }

        const now = Date.now();
        const isDouble = lastTapCell && lastTapCell[0] === r && lastTapCell[1] === c && (now - lastTapTime) <= DOUBLE_CLICK_MS;

        if (isDouble) {
            undo() // revert the last action to avoid false history states (false X placements)
            boardState.value[r]![c]! = {data: QUEEN, lastModified: now};
            autoPlaceXs(r, c, now);
            startMove();
            stopMove();

            isPointerDown = true;
            paintActive = false;
            eraseActive = false;
            lastTapCell = null;
            return;
        }

        isPointerDown = true;
        lastTapTime = now;
        lastTapCell = [r, c];

        startMove();

        const original = boardState.value[r]![c]!.data;
        if (original === EMPTY) {
            paintActive = true;
            eraseActive = false;
            boardState.value[r]![c]! = {data: X_MARK, lastModified: now};
        } else if (original === X_MARK) {
            paintActive = false;
            eraseActive = true;
            boardState.value[r]![c]! = {data: EMPTY, lastModified: now};
        } else if (original === QUEEN) {
            const queenTimestamp = boardState.value[r]![c]!.lastModified;
            boardState.value[r]![c]! = {data: EMPTY, lastModified: now};
            paintActive = false;
            eraseActive = false;
            autoRemoveXs(queenTimestamp, now);
            // reset last tap to avoid confusion - user just removed a queen
            lastTapCell = null;
            lastTapTime =0;
        }
    }

    function handlePointerUp() {
        isPointerDown = false;
        paintActive = false;
        eraseActive = false;
        stopMove();
    }

    function handleCellInteraction(r: number, c: number) {
        if (paintActive && boardState.value[r]![c]!.data === EMPTY) {
            boardState.value[r]![c]! = {data: X_MARK, lastModified: Date.now()};
        } else if (eraseActive && boardState.value[r]![c]!.data === X_MARK) {
            boardState.value[r]![c]! = {data: EMPTY, lastModified: Date.now()};
        }
    }

    function handlePointerEnter(r: number, c: number) {
        // Prevent interactions when game is not in playing or won state
        if (gameStatus.value !== GameStatuses.PLAYING && gameStatus.value !== GameStatuses.WON) {
            return;
        }

        if (!isPointerDown) return;
        handleCellInteraction(r, c);
    }

    // Handle pointer move for touch devices - they don't fire pointerenter reliably
    function handlePointerMove(r: number, c: number) {
        // Prevent interactions when game is not in playing or won state
        if (gameStatus.value !== GameStatuses.PLAYING && gameStatus.value !== GameStatuses.WON) {
            return;
        }

        if (!isPointerDown) return;
        if (!paintActive && !eraseActive) return;

        handleCellInteraction(r, c);
    }

    function handleGlobalPointerUp() {
        if (isPointerDown) {
            isPointerDown = false;
            paintActive = false;
            eraseActive = false;
            stopMove();
        }
    }

    return {
        handlePointerDown,
        handlePointerUp,
        handlePointerEnter,
        handlePointerMove,
        handleGlobalPointerUp,
    };
}