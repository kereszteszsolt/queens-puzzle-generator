.queens-game > queen-board,
<script setup lang="ts">
import {onBeforeUnmount, onMounted, type Ref, ref} from "vue";
import QueenBoard from "../components/QueenBoard.vue";
import {int8FlatMatrixTo2D} from "../utils/intFlatMatrixTo2D.ts";
import type {CellState} from "../models/CellState.ts";
import {generateQueensPuzzle} from "../utils/generateQueensPuzzle.ts";
import QueenControls from "../components/QueenControls.vue";
import QueenInfo from "../components/QueenInfo.vue";
import {useGameState} from "../composables/useGameState.ts";
import {usePointerInteractions} from "../composables/usePointerInteractions.ts";

const x = ref<Int8Array | null>(null);
const xl = 8;
const queensPuzzle: Ref<number[][]> = ref([]);
const conflicts: Ref<boolean[][]> = ref([]);

const {boardState, history, undo, clearBoard, resetBoard, pushHistorySnapshot} = useGameState(xl)
const {
  handlePointerDown,
  handlePointerUp,
  handlePointerEnter,
  handleGlobalPointerUp
} = usePointerInteractions(boardState, queensPuzzle, pushHistorySnapshot, undo);

onMounted(() => {
  console.log("QueensScreen mounted");
  x.value = generateQueensPuzzle(xl, 1);
  queensPuzzle.value = int8FlatMatrixTo2D(x.value, xl)
  conflicts.value = Array.from({length: xl}, () => Array.from({length: xl}, () => false));
  boardState.value = Array.from({length: xl}, () => Array.from({length: xl}, () => ({data: 0, lastModified: 0})));
  console.log(x.value);

  window.addEventListener('pointerup', handleGlobalPointerUp)
});
onBeforeUnmount(() => {
  window.removeEventListener('pointerup', handleGlobalPointerUp)
});

</script>

<template>
  <div class="queens-game">
    <div class="queens-game-header">
      <queen-info
          :total-possible-solutions="1234"
          :board-size="10"
          :generating-message="'message'"
          :formatted-timer="'00:00'"
      />
      <queen-controls
          :can-undo="true"
          @new-game="() => {}"
          @undo="undo"
          @clear-board="clearBoard"
          @reset-game="() => {}"
      />
    </div>
    <queen-board
        v-if="x"
        :queens-puzzle="queensPuzzle"
        :board-state="boardState"
        :conflict-cells="conflicts"
        :is-won="false"
        @queen-cell-pointerdown="handlePointerDown"
        @queen-cell-pointerup="handlePointerUp"
        @queen-cell-pointerenter="handlePointerEnter"
    />
  </div>
</template>

<style scoped>
.queens-game {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  height: 100%;
  /* make the container shrink to its content width and center it horizontally */
  width: fit-content;
  margin-inline: auto;
}

.queens-game-header {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 16px;
}
</style>