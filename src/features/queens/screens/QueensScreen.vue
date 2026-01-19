<script setup lang="ts">
import {onBeforeUnmount, onMounted, type Ref, ref, watch} from "vue";
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
import {useWin} from "../composables/useWin.ts";
import WinModal from "../components/WinModal.vue";
import {useConflicts} from "../composables/useConflicts.ts";

const queensPuzzle: Ref<number[][]> = ref([]);
const generationResult: Ref<OptimizeResult | null> = ref(null);

const size = ref(8);
let maxSolutions = 10;
let isGenerating = ref(false);
let messages = ref<string>('');

const {boardState, history, undo, clearBoard, resetBoard, pushHistorySnapshot} = useGameState(size)
const {
  handlePointerDown,
  handlePointerUp,
  handlePointerEnter,
  handleGlobalPointerUp
} = usePointerInteractions(boardState, queensPuzzle, pushHistorySnapshot, undo);
const {timer, formattedTimer, startTimer, stopTimer, resetTimer} = useTimer();
const { win } = useWin(boardState, queensPuzzle);
const { conflicts } = useConflicts(boardState, queensPuzzle);

const showChooseModal = ref(false);
const showWinModal = ref(false);

function handleResetGame() {
  resetBoard();
  resetTimer();
}

function setMsg(message: string) {
  messages.value = message;
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
    const result = await generateQueensPuzzle(size.value, maxSolutions, setMsg);
    generationResult.value = result;
    queensPuzzle.value = int8FlatMatrixTo2D(result.board, size.value);
    resetBoard();
  } catch (error) {
    console.error("Error generating new puzzle:", error);
  } finally {
    isGenerating.value = false;
    // console.debug('solutions',generationResult.value?.solutions,
    // 'stopped by', generationResult.value?.stoppedBy);
    setMsg('Board generated. Good luck!');
    startTimer();
  }
}

// timeout id for delayed modal show (so we can clear it)
let winModalTimeout: number | undefined;

// When win becomes true: stop timer and show modal (after 0.5s delay)
watch(win, (val) => {
  // clear any existing timeout to avoid multiple triggers
  if (winModalTimeout !== undefined) {
    clearTimeout(winModalTimeout);
    winModalTimeout = undefined;
  }

  if (val) {
    stopTimer();
    setMsg('You won!');
    // add 1500s delay before showing the modal to allow UI transitions to settle
    winModalTimeout = window.setTimeout(() => {
      showWinModal.value = true;
      winModalTimeout = undefined;
    }, 1500);
  } else {
    // If somehow win becomes false, hide modal immediately
    showWinModal.value = false;
  }
});

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
          :generating-message="messages"
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
          v-if="queensPuzzle.length > 3 && !isGenerating"
          :queens-puzzle="queensPuzzle"
          :board-state="boardState"
          :conflict-cells="conflicts"
          :is-won="win"
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
    <win-modal
        :show="showWinModal"
        :winning-time="timer"
        @close="showWinModal = false"
        @replay="resetBoard"
        @new-game="() => { showWinModal = false; showChooseModal = true }"
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