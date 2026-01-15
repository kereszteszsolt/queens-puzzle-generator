<script setup lang="ts">
import type {CellState} from "../models/CellState.ts";
import QueenCell from "./QueenCell.vue";

const props = defineProps<{
  queensPuzzle: number[][];
  boardState: CellState[][];
  conflictCells: boolean[][];
  isWon: boolean;
}>();

const emit = defineEmits<{
  (e: 'queen-cell-pointerdown', row: number, col: number): void;
  (e: 'queen-cell-pointerenter', row: number, col: number): void;
  (e: 'queen-cell-pointerup', row: number, col: number): void;
}>();

const getCellBorders = (row: number, col: number) => ({
  top: row > 0 && props.queensPuzzle[row]![col]! !== props.queensPuzzle[row - 1]![col]!,
  right: col < props.queensPuzzle[0]!.length - 1 && props.queensPuzzle[row]![col]! !== props.queensPuzzle[row]![col + 1]!,
  bottom: row < props.queensPuzzle.length - 1 && props.queensPuzzle[row]![col]! !== props.queensPuzzle[row + 1]![col]!,
  left: col > 0 && props.queensPuzzle[row]![col]! !== props.queensPuzzle[row]![col - 1]!
});

const handleQueenCellPointerDown = (row: number, col: number) => {
  emit('queen-cell-pointerdown', row, col);
};
const handleQueenCellPointerUp = (row: number, col: number) => {
  emit('queen-cell-pointerup', row, col);
};
const handleQueenCellPointerEnter = (row: number, col: number) => {
  emit('queen-cell-pointerenter', row, col);
};
</script>

<template>
  <div class="queen-board">
    <div v-for="(row, rowIndex) in props.queensPuzzle" :key="rowIndex" class="row">
      <QueenCell
          v-for="(cell, colIndex) in row"
          :key="colIndex"
          :value="boardState[rowIndex]![colIndex]!.data"
          :color="cell"
          :row="rowIndex"
          :col="colIndex"
          :borders="getCellBorders(rowIndex, colIndex)"
          :has-conflict="conflictCells[rowIndex]![colIndex]!"
          :is-won="props.isWon"
          @queen-cell-pointerdown="handleQueenCellPointerDown"
          @queen-cell-pointerenter="handleQueenCellPointerEnter"
          @queen-cell-pointerup="handleQueenCellPointerUp"
      />
    </div>
  </div>
</template>

<style scoped>
.queen-board {
  display: flex;
  flex-direction: column;
  border: 4px solid black;
}

.row {
  display: flex;
}
</style>