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
import {type GameStatus, GameStatuses} from "../models/GameStatus.ts";
import GenerationInfo from "../components/GenerationInfo.vue";
import type {GenMessage} from "../models/GenMessage.ts";

const queensPuzzle: Ref<number[][]> = ref([]);
const generationResult: Ref<OptimizeResult | null> = ref(null);

const size = ref(8);
let maxSolutions = 10;
let isGenerating = ref(false);
let genStateMessage: Ref<GenMessage | null> = ref(null);
let statusMessages = ref<string>('');
let finalGenMessage = ref<string>('');
let gameStatus: Ref<GameStatus> = ref(GameStatuses.WELCOME);

const {boardState, history, undo, clearBoard, resetBoard, pushHistorySnapshot} = useGameState(size)
const {
  handlePointerDown,
  handlePointerUp,
  handlePointerEnter,
  handleGlobalPointerUp
} = usePointerInteractions(boardState, queensPuzzle, pushHistorySnapshot, undo);
const {timer, formattedTimer, startTimer, stopTimer, resetTimer} = useTimer();
const {win} = useWin(boardState, queensPuzzle);
const {conflicts} = useConflicts(boardState, queensPuzzle);

const showChooseModal = ref(false);
const showWinModal = ref(false);

function handleResetGame() {
  resetBoard();
  resetTimer();
  startTimer();
}

function handleStartGame() {
  gameStatus.value = GameStatuses.PLAYING;
  startTimer();
}

function handleNewGame() {
  if (gameStatus.value === GameStatuses.PLAYING) {
    stopTimer();
  }
  showChooseModal.value = true;
}

function handleCancelNewGame() {
  showChooseModal.value = false;
  if (gameStatus.value === GameStatuses.PLAYING) {
    startTimer();
  }
}

function setGeneratingMsg(data: GenMessage) {
  genStateMessage.value = data;
}

function setStatusMsg(message: string) {
  statusMessages.value = message;
}

function setFinalGenMsg(message: string) {
  finalGenMessage.value = message;
}

function formatStopReason(reason: OptimizeResult["stoppedBy"]) {
  switch (reason) {
    case "targetReached":
      return "🎯 Target reached";
    case "timeLimit":
      return "⏱️ Stopped due to time limit";
    case "iterationLimit":
      return "🔁 Iteration limit reached";
    default:
      return "Unknown reason";
  }
}

function buildFinalGenMessage(result: OptimizeResult): string {
  return `
    <h3 class="card-title">✅ Board Generation Completed</h3>
    <p class="card-subtitle">${formatStopReason(result.stoppedBy)}</p>
    <div class="stats-grid">
      <div class="stat-item">
        <span class="stat-label">Board Size</span>
        <span class="stat-value">${result.size} × ${result.size}</span>
      </div>
      <div class="stat-item">
        <span class="stat-label">Solutions</span>
        <span class="stat-value">${result.solutions}</span>
      </div>
      <div class="stat-item">
        <span class="stat-label">Target</span>
        <span class="stat-value">≤ ${result.targetMaxSolutions}</span>
      </div>
      <div class="stat-item">
        <span class="stat-label">Elapsed Time</span>
        <span class="stat-value">${(result.elapsedTimeMs / 1000).toFixed(1)}s</span>
      </div>
      <div class="stat-item">
        <span class="stat-label">Iterations</span>
        <span class="stat-value">${result.iterations.toLocaleString()}</span>
      </div>
      <div class="stat-item">
        <span class="stat-label">Time Limit</span>
        <span class="stat-value">${result.timeLimitMs / 1000}s</span>
      </div>
      <div class="stat-item">
        <span class="stat-label">Iteration Limit</span>
        <span class="stat-value">${result.iterationLimit.toLocaleString()}</span>
      </div>
    </div>
  `;
}


async function newQueensPuzzle(payload: { size: number; maxSolutions: number }): Promise<void> {
  const {size: newSize, maxSolutions: newMaxSolutions} = payload;
  showChooseModal.value = false;

  if (isGenerating.value) {
    // Prevent multiple simultaneous puzzle generations
    return;
  }

  stopTimer();
  resetTimer();
  isGenerating.value = true;
  gameStatus.value = GameStatuses.GENERATING;
  generationResult.value = null;

  // Update the size and maxSolutions
  size.value = newSize;
  maxSolutions = newMaxSolutions;

  // Allow the DOM to update so the loading message is visible before heavy work
  await new Promise(resolve => setTimeout(resolve, 50));

  try {
    generationResult.value = await generateQueensPuzzle(size.value, maxSolutions, setGeneratingMsg);
    queensPuzzle.value = int8FlatMatrixTo2D(generationResult.value.board, size.value);
    resetBoard();
  } catch (error) {
    console.error("Error generating new puzzle:", error);
    gameStatus.value = GameStatuses.GENERATING_ERROR;
    setFinalGenMsg(`<h3 class="card-title error-title">❌ Puzzle Generation Failed</h3>
                    <p class="card-subtitle">${(error as Error).message}</p>
                    <p class="card-note">Please try again with different settings.</p>`);
  } finally {
    isGenerating.value = false;
    gameStatus.value = GameStatuses.BOARD_GENERATED
    setFinalGenMsg(buildFinalGenMessage(generationResult.value!));
    startTimer();
  }
}

function getStatusMessage(status: GameStatus): string {
  switch (status) {
    case GameStatuses.WELCOME:
      return 'Click "New Game" to start a puzzle.';
    case GameStatuses.PLAYING:
      return '';
    case GameStatuses.WON:
      return `🎉 <b>Congratulations, You won!</b> 🎉 <br> Completion time: <strong>${formattedTimer.value}</strong>`;
    case GameStatuses.GENERATING:
      return 'Generating puzzle...';
    case GameStatuses.GENERATING_ERROR:
      return 'Error generating puzzle. Please try again.';
    case GameStatuses.BOARD_GENERATED:
      return 'Board generated. Click "Start Game" to begin playing.';
    default:
      return '';
  }
}

// Watch on gameStatus and set the message dynamically
watch(gameStatus, (newStatus) => {
  setStatusMsg(getStatusMessage(newStatus));
}, {immediate: true});

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
    gameStatus.value = GameStatuses.WON
    // add 1500s delay before showing the modal to allow UI transitions to settle
    winModalTimeout = window.setTimeout(() => {
      showWinModal.value = true;
      winModalTimeout = undefined;
    }, 1500);
  } else {
    // If somehow win becomes false, hide modal immediately
    showWinModal.value = false;
    gameStatus.value = GameStatuses.PLAYING;
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
          :generating-message="statusMessages"
          :formatted-timer="formattedTimer"
          :game-status="gameStatus"
      />
      <queen-controls
          :can-undo="history.length > 1"
          :game-status="gameStatus"
          @new-game="handleNewGame"
          @undo="undo"
          @clear-board="clearBoard"
          @reset-game="handleResetGame"
          @start-game="handleStartGame"
      />
    </div>

    <spinner v-if="gameStatus === GameStatuses.GENERATING" class="spinner"/>
    <generation-info
        v-if="gameStatus === GameStatuses.GENERATING ||
        gameStatus === GameStatuses.BOARD_GENERATED ||
        gameStatus === GameStatuses.GENERATING_ERROR"
        :genStatusMessage="genStateMessage"
        :gameStatus="gameStatus"
        :finalGenMessage="finalGenMessage"
    ></generation-info>
    <div v-if="gameStatus === GameStatuses.WELCOME">Click "New Game" to start a puzzle.</div>

    <queen-board
        v-if="gameStatus === GameStatuses.PLAYING || gameStatus === GameStatuses.WON || gameStatus === GameStatuses.BOARD_GENERATED"
        :queens-puzzle="queensPuzzle"
        :board-state="boardState"
        :conflict-cells="conflicts"
        :is-won="win"
        :game-status="gameStatus"
        @queen-cell-pointerdown="handlePointerDown"
        @queen-cell-pointerup="handlePointerUp"
        @queen-cell-pointerenter="handlePointerEnter"
    />

    <choose-modal
        :show="showChooseModal"
        @choose="newQueensPuzzle"
        @close="handleCancelNewGame"
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