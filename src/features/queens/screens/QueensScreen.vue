<script setup lang="ts">
import {onBeforeUnmount, onMounted, type Ref, ref} from "vue";
import {generateQueenPlacement} from "../utils/generateQueenPlacement.ts";
import QueenBoard from "../components/QueenBoard.vue";
import {int8FlatMatrixTo2D} from "../utils/intFlatMatrixTo2D.ts";
import type {CellState} from "../models/CellState.ts";
import {generateQueensPuzzle} from "../utils/generateQueensPuzzle.ts";

const x = ref<Int8Array | null>(null);
const xl = 15;
const queensPuzzle: Ref<number[][]> = ref([]);
const boardState: Ref<CellState[][]> = ref([]);
const conflicts: Ref<boolean[][]> = ref([]);

onMounted(() => {
  console.log("QueensScreen mounted");
  x.value =  x.value = generateQueensPuzzle(xl, 10);
  queensPuzzle.value = int8FlatMatrixTo2D(x.value, xl)
  conflicts.value = Array.from({length: xl}, () => Array.from({length: xl}, () => false));
  boardState.value = Array.from({length: xl}, () => Array.from({length: xl}, () => ({data: 0, lastModified: 0})));
  console.log(x.value);

  window.addEventListener('pointerup', handleGlobalPointerUp)
});
onBeforeUnmount(() => {
  window.removeEventListener('pointerup', handleGlobalPointerUp)
});

const handleQueenCellPointerDown = (row: number, col: number) => {
  console.log('Pointer down at', row, col);
};
const handleQueenCellPointerUp = (row: number, col: number) => {
  console.log('Pointer up at', row, col);
};
const handleQueenCellPointerEnter = (row: number, col: number) => {
  console.log('Pointer enter at', row, col);
}
const handleGlobalPointerUp = () => {
  console.log('Global pointer up');
}
</script>

<template>
  <div v-if="x" class="queens-game">
    <div>
      <queen-board
          :queens-puzzle="queensPuzzle"
          :board-state="boardState"
          :conflict-cells="conflicts"
          :is-won="false"
          @queen-cell-pointerdown="handleQueenCellPointerDown"
          @queen-cell-pointerup="handleQueenCellPointerUp"
          @queen-cell-pointerenter="handleQueenCellPointerEnter"
      />
    </div>
  </div>
</template>

<style scoped>
.queens-game {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px;
}
</style>