<script setup lang="ts">
import type {CellState} from "../models/CellState.ts";
import QueenCell from "./QueenCell.vue";
import {GameStatuses} from "../models/GameStatus.ts";
import {computed, onBeforeUnmount, onMounted, ref} from "vue";

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
  (e: 'queen-cell-touchmove', row: number, col: number): void;
}>();

const gridSize = computed(() => props.queensPuzzle.length);
const boardElement = ref<HTMLElement | null>(null);
let touchTarget: HTMLElement | null = null;

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

function handleBoardTouchMove(event: TouchEvent) {
  const touch = event.touches[0];
  if (!touch) return;

  const target = document.elementFromPoint(touch.clientX, touch.clientY) as HTMLElement | null;
  const cell = target?.closest<HTMLElement>('[data-row][data-col]');
  if (!cell) return;

  const row = Number(cell.dataset.row);
  const col = Number(cell.dataset.col);
  if (!Number.isInteger(row) || !Number.isInteger(col)) return;

  emit('queen-cell-touchmove', row, col);
}

onMounted(() => {
  touchTarget = boardElement.value;
  touchTarget?.addEventListener('touchmove', handleBoardTouchMove, {passive: true});
});

onBeforeUnmount(() => {
  touchTarget?.removeEventListener('touchmove', handleBoardTouchMove);
  touchTarget = null;
});
</script>

<template>
  <div class="queen-board-wrapper">
    <div class="queen-board"
         ref="boardElement"
         :class="{'blur': gameStatus === GameStatuses.BOARD_GENERATED}"
         :style="{ gridTemplateColumns: `repeat(${gridSize}, 1fr)`, touchAction: 'none' }">
      <template v-for="(row, rowIndex) in props.queensPuzzle" :key="rowIndex">
        <QueenCell
            v-for="(cell, colIndex) in row"
            :key="`${rowIndex}-${colIndex}`"
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
      </template>
    </div>
  </div>
</template>

<style scoped>
.queen-board-wrapper {
  max-width: min(95vw, 600px);
  width: 100%;
  margin: 0 auto;
  transition: max-width 0.6s ease-in-out, width 0.6s ease-in-out;
}

/* Shrink the board wrapper to 25% (75% less) when board is generated (blur state) */
.queen-board-wrapper:has(.queen-board.blur) {
  max-width: min(calc(95vw * 0.25), calc(600px * 0.25));
  width: 25%;
}

.queen-board {
  display: grid;
  border: 3px solid black;
  overflow: hidden;
  border-radius: 2px;
  width: 100%;
  transition: all 0.6s ease-in-out;
}

/* Blur hatás - looking through water/wrong glasses effect (pure CSS) */
.queen-board.blur {
  position: relative;
  z-index: 1000;
  /* Uneven blur + chromatic aberration effect like wrong glasses */
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
  /* Simulate refraction with color shift */
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
