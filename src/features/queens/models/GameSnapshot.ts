import type {CellState} from "./CellState.ts";

export interface GameSnapshot {
    boardState: CellState[][];
}