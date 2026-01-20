<script setup lang="ts">
import type {CellState} from "../models/CellState.ts";
import QueenCell from "./QueenCell.vue";
import {GameStatuses} from "../models/GameStatus.ts";

const props = defineProps<{
  queensPuzzle: number[][];
  boardState: CellState[][];
  conflictCells: boolean[][];
  isWon: boolean;
  gameStatus: string;
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
  <div class="queen-board" :class="{'blur': gameStatus === GameStatuses.BOARD_GENERATED}">
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

.queen-board.blur {
  position: relative;
  z-index: 1000;
  filter: blur(2.5px) contrast(1.05) saturate(1.1);
  opacity: 0.9;
  animation: glassDistort 2.5s ease-in-out infinite;
}

.queen-board.blur::before {
  content: '';
  position: absolute;
  inset: -2px;
  background: inherit;
  filter: blur(4px);
  opacity: 0.3;
  z-index: -1;
  animation: wavyShift 3s ease-in-out infinite alternate;
}

.queen-board.blur::after {
  content: '';
  position: absolute;
  inset: 0;

  background: linear-gradient(
      135deg,
      rgba(255, 0, 0, 0.03) 0%,
      transparent 25%,
      rgba(0, 255, 0, 0.02) 50%,
      transparent 75%,
      rgba(0, 0, 255, 0.03) 100%
  );
  mix-blend-mode: overlay;
  pointer-events: none;
  animation: colorShift 4s ease-in-out infinite;
}

@keyframes glassDistort {
  0%, 100% {
    filter: blur(2px) contrast(1.02) saturate(1.05);
    transform: scale(1);
  }
  25% {
    filter: blur(3px) contrast(1.08) saturate(1.15);
    transform: scale(1.003) skewX(0.3deg);
  }
  50% {
    filter: blur(2.5px) contrast(1.05) saturate(1.1);
    transform: scale(1.005) skewY(0.2deg);
  }
  75% {
    filter: blur(3.5px) contrast(1.03) saturate(1.08);
    transform: scale(1.002) skewX(-0.2deg);
  }
}

@keyframes wavyShift {
  0% {
    transform: translate(-1px, 1px) scale(1.01);
  }
  100% {
    transform: translate(1px, -1px) scale(1.02);
  }
}

@keyframes colorShift {
  0%, 100% {
    opacity: 0.4;
    transform: translateX(0);
  }
  50% {
    opacity: 0.6;
    transform: translateX(2px);
  }
}
</style>