<script setup lang="ts">
import { ref } from 'vue';
import {type GameStatus, GameStatuses} from "../models/GameStatus.ts";

defineProps<{
  canUndo: boolean;
  gameStatus: GameStatus;
}>();

defineEmits<{
  (e: 'undo'): void;
  (e: 'resetGame'): void;
  (e: 'clearBoard'): void;
  (e: 'newGame', size?: number): void;
  (e: 'startGame'): void;
  (e: 'replay'): void;
  (e: 'shuffleColors'): void;
}>();

const selectedSize = ref<number>(-2);
</script>

<template>
  <div class="board-controls">
    <button
        v-if="gameStatus === GameStatuses.WON || gameStatus === GameStatuses.PLAYING || gameStatus === GameStatuses.WELCOME || gameStatus === GameStatuses.BOARD_GENERATED"
        class="btn-generate"
        @click="$emit('newGame', selectedSize)"
        title="Generate a new puzzle">
      <span class="btn-icon">🎲</span>
      <span class="btn-text">New Game</span>
    </button>
    <button
        v-if="gameStatus === GameStatuses.WON"
        class="btn-replay"
        @click="$emit('replay')"
        title="Replay the current puzzle">
      <span class="btn-icon">🔄</span>
      <span class="btn-text">Replay</span>
    </button>
    <button
        v-if="gameStatus === GameStatuses.BOARD_GENERATED"
        class="btn-start"
        @click="$emit('startGame')"
        title="Start playing the puzzle">
      <span class="btn-icon">🎮</span>
      <span class="btn-text">Start Game</span>
    </button>
    <button
        v-if="gameStatus === GameStatuses.PLAYING"
        class="btn-reset"
        @click="$emit('resetGame')"
        title="Reset to initial puzzle state">
      <span class="btn-icon">🔃</span>
      <span class="btn-text">Reset Game</span>
    </button>
    <button
        v-if="gameStatus === GameStatuses.PLAYING"
        class="btn-shuffle"
        @click="$emit('shuffleColors')"
        title="Shuffle region colors">
      <span class="btn-icon">🎨</span>
      <span class="btn-text">Shuffle Colors</span>
    </button>
    <button
        v-if="gameStatus === GameStatuses.PLAYING"
        class="btn-clear"
        @click="$emit('clearBoard')"
        :disabled="!canUndo"
        title="Clear all placed queens">
      <span class="btn-icon">🧹</span>
      <span class="btn-text">Clear Board</span>
    </button>
    <button
        v-if="gameStatus === GameStatuses.PLAYING || gameStatus === GameStatuses.WON"
        class="btn-undo"
        @click="$emit('undo')"
        :disabled="!canUndo"
        title="Undo last move">
      <span class="btn-icon">↶</span>
      <span class="btn-text">Undo</span>
    </button>
  </div>
</template>

<style scoped>
.board-controls {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: center;
  align-items: stretch;
  width: 100%;
  max-width: 100%;
}

.board-controls button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.625rem 1rem;
  font-size: 0.95rem;
  font-weight: bold;
  color: white;
  border: 1px solid transparent;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  min-width: 0;
  flex: 1 1 auto;
}

/* Ensure icon and text are vertically centered and use consistent line-height */
.board-controls button .btn-icon,
.board-controls button .btn-text {
  display: inline-flex;
  align-items: center;
  line-height: 1;
}

.board-controls button .btn-icon {
  font-size: 1.125rem; /* slightly larger for icon clarity */
  width: 1.25rem;
  justify-content: center;
  flex-shrink: 0;
}

.board-controls button .btn-text {
  /* keep default font-size from parent, ensures consistent baseline */
}

/* Responsive Design */

/* Large screens - 3 buttons per row, symmetric layout */
@media (min-width: 1024px) {
  .board-controls {
    gap: 1rem;
  }

  .board-controls button {
    padding: 0.75rem 1.25rem;
    font-size: 1rem;
    flex: 1 1 calc((100% / 3) - 0.667rem);
    max-width: calc((100% / 3) - 0.667rem);
  }
}

/* Medium screens - tablets, 3 buttons per row */
@media (max-width: 1023px) and (min-width: 768px) {
  .board-controls {
    gap: 0.75rem;
  }

  .board-controls button {
    padding: 0.625rem 1rem;
    font-size: 0.95rem;
    flex: 1 1 calc((100% / 3) - 0.5rem);
    max-width: calc((100% / 3) - 0.5rem);
  }
}

/* Small tablets - 2 buttons per row */
@media (max-width: 767px) and (min-width: 640px) {
  .board-controls {
    gap: 0.75rem;
  }

  .board-controls button {
    padding: 0.625rem 1rem;
    font-size: 0.95rem;
    flex: 1 1 calc(50% - 0.375rem);
    max-width: calc(50% - 0.375rem);
  }
}

/* Small screens - mobile, 2 buttons per row */
@media (max-width: 639px) {
  .board-controls {
    gap: 0.5rem;
  }

  .board-controls button {
    padding: 0.5rem 0.875rem;
    font-size: 0.9rem;
    flex: 1 1 calc(50% - 0.25rem);
    max-width: calc(50% - 0.25rem);
  }

  .board-controls button .btn-icon {
    font-size: 1rem;
    width: 1.125rem;
  }
}

/* Extra small screens - very narrow devices, 2 buttons per row */
@media (max-width: 400px) {
  .board-controls {
    gap: 0.5rem;
  }

  .board-controls button {
    padding: 0.5rem 0.75rem;
    font-size: 0.85rem;
    gap: 0.375rem;
    flex: 1 1 calc(50% - 0.25rem);
    max-width: calc(50% - 0.25rem);
  }

  .board-controls button .btn-text {
    font-size: 0.85rem;
  }

  .board-controls button .btn-icon {
    font-size: 1rem;
    width: 1rem;
  }
}


/* Updated colors for buttons using gradients and shadows for consistency */

/* New Game - Green (secondary palette) */
.btn-generate {
  background: linear-gradient(180deg, #32b432 0%, #228b22 100%);
  color: var(--color-neutral);
  box-shadow: 0 4px 12px rgba(20, 60, 20, 0.35);
}

.btn-generate:hover {
  background: linear-gradient(180deg, #28a428 0%, #1f7e1f 100%);
  box-shadow: 0 6px 16px rgba(20, 60, 20, 0.45);
}

/* Start Game - Coral/Orange (primary palette) */
.btn-start {
  background: linear-gradient(180deg, #ffab70 0%, #ff7f50 100%);
  color: #3d1a0a;
  box-shadow: 0 4px 12px rgba(80, 40, 20, 0.35);
}

.btn-start:hover {
  background: linear-gradient(180deg, #ff9a5c 0%, #e67345 100%);
  box-shadow: 0 6px 16px rgba(80, 40, 20, 0.45);
}

/* Replay - Yellow/Gold (from WinModal) */
.btn-replay {
  background: linear-gradient(180deg, #ffcc66 0%, #ffb24d 100%);
  color: #3d2a0a;
  box-shadow: 0 4px 12px rgba(80, 60, 20, 0.35);
}

.btn-replay:hover {
  background: linear-gradient(180deg, #ffc24d 0%, #ffa033 100%);
  box-shadow: 0 6px 16px rgba(80, 60, 20, 0.45);
}

/* Undo - Blue (tertiary palette) */
.btn-undo {
  background: linear-gradient(180deg, #70d0ff 0%, #00bfff 100%);
  color: #0a2a3d;
  box-shadow: 0 4px 12px rgba(20, 50, 80, 0.35);
}

.btn-undo:hover {
  background: linear-gradient(180deg, #5cc8ff 0%, #00a6e6 100%);
  box-shadow: 0 6px 16px rgba(20, 50, 80, 0.45);
}

.btn-undo:disabled {
  background: linear-gradient(180deg, #e6f7ff 0%, #c1eaff 100%);
  color: var(--color-tertiary-700);
  cursor: not-allowed;
  box-shadow: none;
  opacity: 0.7;
}

/* Clear Board - Light Coral (primary palette lighter) */
.btn-clear {
  background: linear-gradient(180deg, #ffccc1 0%, #ffab99 100%);
  color: #4a1a0a;
  box-shadow: 0 4px 12px rgba(80, 40, 40, 0.35);
}

.btn-clear:hover {
  background: linear-gradient(180deg, #ffbcad 0%, #ff9a85 100%);
  box-shadow: 0 6px 16px rgba(80, 40, 40, 0.45);
}

.btn-clear:disabled {
  background: linear-gradient(180deg, #ffece6 0%, #ffccc1 100%);
  color: #994d33;
  cursor: not-allowed;
  box-shadow: none;
  opacity: 0.7;
}

/* Reset Game - Red (error color) */
.btn-reset {
  background: linear-gradient(180deg, #d42020 0%, #ac1010 100%);
  color: white;
  box-shadow: 0 4px 12px rgba(60, 20, 20, 0.35);
}

.btn-reset:hover {
  background: linear-gradient(180deg, #c01818 0%, #960e0e 100%);
  box-shadow: 0 6px 16px rgba(60, 20, 20, 0.45);
}

/* Shuffle Colors - Purple/Magenta (unique palette) */
.btn-shuffle {
  background: linear-gradient(180deg, #bb6bd9 0%, #9b4dbb 100%);
  color: white;
  box-shadow: 0 4px 12px rgba(60, 20, 80, 0.35);
}

.btn-shuffle:hover {
  background: linear-gradient(180deg, #a855c7 0%, #8b3da8 100%);
  box-shadow: 0 6px 16px rgba(60, 20, 80, 0.45);
}

/* Ensure disabled buttons generally look subdued */
.board-controls button:disabled {
  opacity: 0.85;
}
</style>