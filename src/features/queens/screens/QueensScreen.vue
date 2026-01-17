.queens-game > queen-board,
<script setup lang="ts">
import {onBeforeUnmount, onMounted, type Ref, ref} from "vue";
import QueenBoard from "../components/QueenBoard.vue";
import {int8FlatMatrixTo2D} from "../utils/intFlatMatrixTo2D.ts";
import QueenControls from "../components/QueenControls.vue";
import QueenInfo from "../components/QueenInfo.vue";
import {useGameState} from "../composables/useGameState.ts";
import {usePointerInteractions} from "../composables/usePointerInteractions.ts";
import {generateQueensPuzzle} from "../utils/generateQueensPuzzle.ts";
import type {OptimizeResult} from "../utils/optimizeQueensPuzzle.ts";

const queensPuzzle: Ref<number[][]> = ref([]);
const conflicts: Ref<boolean[][]> = ref([]);
const generationResult: Ref<OptimizeResult | null> = ref(null);

let size = 8;
let maxSolutions = 10;

const {boardState, history, undo, clearBoard, resetBoard, pushHistorySnapshot} = useGameState(size)
const {
  handlePointerDown,
  handlePointerUp,
  handlePointerEnter,
  handleGlobalPointerUp
} = usePointerInteractions(boardState, queensPuzzle, pushHistorySnapshot, undo);

onMounted(() => {
  console.log("QueensScreen mounted");
  const generationResult = generateQueensPuzzle(size, maxSolutions);
  queensPuzzle.value = int8FlatMatrixTo2D(generationResult.board, size);
  conflicts.value = Array.from({length: size}, () => Array.from({length: size}, () => false));

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
          :total-possible-solutions="generationResult && generationResult.solutions || 0"
          :board-size="generationResult && generationResult.board.length || 0"
          :generating-message="'message'"
          :formatted-timer="'00:00'"
      />
      <queen-controls
          :can-undo="history.length > 1"
          @new-game="() => {}"
          @undo="undo"
          @clear-board="clearBoard"
          @reset-game="() => {}"
      />
    </div>
    <queen-board
        v-if="queensPuzzle"
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