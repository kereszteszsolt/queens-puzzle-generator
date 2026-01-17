import type {CellState} from "../models/CellState.ts";
import {type Ref, ref} from "vue";
import type {GameSnapshot} from "../models/GameSnapshot.ts";
import {EMPTY} from "../constants";

export function useGameState(sizeRef: Ref<number>) {
    let boardState = ref<CellState[][]>(getEmptyBoardState());

    let history = ref<GameSnapshot[]>([{
        boardState: JSON.parse(JSON.stringify(boardState.value)),
    }]);

    function pushHistorySnapshot() {
        const last = history.value[history.value.length - 1]!;
        const lastSerialized = JSON.stringify(last.boardState);
        const curSerialized = JSON.stringify(boardState.value);
        if (lastSerialized === curSerialized) return; // don't push duplicate
        history.value.push({
            boardState: JSON.parse(JSON.stringify(boardState.value)),
        });
    }

    function undo() {
        if (history.value.length <= 1) return;
        // pop current snapshot (last) and restore previous
        history.value.pop();
        const last = history.value[history.value.length - 1]!;
        boardState.value = JSON.parse(JSON.stringify(last.boardState));
    }

    function clearBoard() {
        boardState.value = getEmptyBoardState();
        // push the cleared state to history
        history.value.push({
            boardState: JSON.parse(JSON.stringify(boardState.value))
        });
    }

    function resetBoard() {
        // reset board to initial empty state
        boardState.value =  getEmptyBoardState();
        // reset history to initial snapshot
        history.value = [{
            boardState: JSON.parse(JSON.stringify(boardState.value)),
        }];
    }

    function getEmptyBoardState(): CellState[][] {
        let now = Date.now();
        const size = sizeRef.value;
        return Array.from({length: size}, () => Array(size).fill({data: EMPTY, timestamp: now}));
    }


    return {
        boardState,
        history,
        undo,
        clearBoard,
        resetBoard,
        pushHistorySnapshot
    };
}