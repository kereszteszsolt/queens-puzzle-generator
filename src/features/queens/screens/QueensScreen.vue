<script setup lang="ts">
import {onBeforeUnmount, onMounted, type Ref, ref} from "vue";
import QueenBoard from "../components/QueenBoard.vue";
import {int8FlatMatrixTo2D} from "../utils/intFlatMatrixTo2D.ts";
import QueenControls from "../components/QueenControls.vue";
import QueenInfo from "../components/QueenInfo.vue";
import {useGameState} from "../composables/useGameState.ts";
import {usePointerInteractions} from "../composables/usePointerInteractions.ts";
import type {OptimizeResult} from "../utils/optimizeQueensPuzzle.ts";
import {useTimer} from "../composables/useTimer.ts";
import ChooseModal from "../components/ChooseModal.vue";
import {generateQueensPuzzle} from "../utils/generateQueensPuzzle.ts";
import Spinner from "../../../core/components/Spinner.vue";

const queensPuzzle: Ref<number[][]> = ref([]);
const conflicts: Ref<boolean[][]> = ref([]);
const generationResult: Ref<OptimizeResult | null> = ref(null);

const size = ref(8);
let maxSolutions = 10;
let isGenerating = ref(false);

const {boardState, history, undo, clearBoard, resetBoard, pushHistorySnapshot} = useGameState(size)
const {
  handlePointerDown,
  handlePointerUp,
  handlePointerEnter,
  handleGlobalPointerUp
} = usePointerInteractions(boardState, queensPuzzle, pushHistorySnapshot, undo);
const {formattedTimer, startTimer, stopTimer, resetTimer} = useTimer();
const showChooseModal = ref(false);

function handleResetGame() {
  resetBoard();
  resetTimer();
}

async function newQueensPuzzle(payload: { size: number; maxSolutions: number }): Promise<void> {
  const { size: newSize, maxSolutions: newMaxSolutions } = payload;
  showChooseModal.value = false;

  if (isGenerating.value) {
    // Prevent multiple simultaneous puzzle generations
    return;
  }

  stopTimer();
  resetTimer();
  isGenerating.value = true;
  generationResult.value = null;

  // Update the size and maxSolutions
  size.value = newSize;
  maxSolutions = newMaxSolutions;

  // Allow the DOM to update so the loading message is visible before heavy work
  await new Promise(resolve => setTimeout(resolve, 50));

  try {
    const result = await generateQueensPuzzle(size.value, maxSolutions);
    generationResult.value = result;
    queensPuzzle.value = int8FlatMatrixTo2D(result.board, size.value);
    conflicts.value = Array.from({length: size.value}, () => Array(size.value).fill(false));
    resetBoard();
  } catch (error) {
    console.error("Error generating new puzzle:", error);
  } finally {
    isGenerating.value = false;
    console.debug('solutions',generationResult.value?.solutions,
        'stopped by', generationResult.value?.stoppedBy);
    startTimer();
  }
}

onMounted(async () => {
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
          :board-size="size"
          :generating-message="'message'"
          :formatted-timer="formattedTimer"
      />
      <queen-controls
          :can-undo="history.length > 1"
          @new-game="() => {showChooseModal = true}"
          @undo="undo"
          @clear-board="clearBoard"
          @reset-game="handleResetGame"
      />
    </div>
    <div v-if="queensPuzzle.length > 0">
      <queen-board
          v-if="queensPuzzle.length > 4 && !isGenerating"
          :queens-puzzle="queensPuzzle"
          :board-state="boardState"
          :conflict-cells="conflicts"
          :is-won="false"
          @queen-cell-pointerdown="handlePointerDown"
          @queen-cell-pointerup="handlePointerUp"
          @queen-cell-pointerenter="handlePointerEnter"
      />
      <spinner v-else class="spinner"/>
    </div>
    <div v-else>Click "New Game" to start a puzzle.</div>

    <choose-modal
        :show="showChooseModal"
        @choose="newQueensPuzzle"
        @close="() => showChooseModal = false"
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