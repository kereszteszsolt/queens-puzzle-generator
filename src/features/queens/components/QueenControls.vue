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
}>();

const selectedSize = ref<number>(-2);
</script>

<template>
  <div class="board-controls">
    <button
        v-if="gameStatus === GameStatuses.WON || gameStatus === GameStatuses.PLAYING || gameStatus === GameStatuses.WELCOME"
        class="btn-generate" @click="$emit('newGame', selectedSize)">
      <span class="btn-icon">🎲</span>
      <span class="btn-text">New Game</span>
    </button>
    <button
        v-if="gameStatus === GameStatuses.BOARD_GENERATED"
        class="btn-generate" @click="$emit('startGame')">
      <span class="btn-icon">🎮</span>
      <span class="btn-text">Start Game</span>
    </button>
    <button
        v-if="gameStatus === GameStatuses.PLAYING"
        class="btn-undo" @click="$emit('undo')" :disabled="!canUndo">
      <span class="btn-icon">↶</span>
      <span class="btn-text">Undo</span>
    </button>
    <button
        v-if="gameStatus === GameStatuses.PLAYING"
        class="btn-clear" @click="$emit('clearBoard')" :disabled="!canUndo">
      <span class="btn-icon">🧹</span>
      <span class="btn-text">Clear Board</span>
    </button>
    <button
        v-if="gameStatus === GameStatuses.PLAYING"
        class="btn-reset" @click="$emit('resetGame')">
      <span class="btn-icon">🔃</span>
      <span class="btn-text">Reset Game</span>
    </button>
  </div>
</template>

<style scoped>
.board-controls {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: space-between;
  width: 100%;
  min-width: 600px;
}

.board-controls:has(button:only-child) {
  justify-content: center;
}

.board-controls button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  font-weight: bold;
  color: white;
  border: 1px solid transparent;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
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
}

.board-controls button .btn-text {
  /* keep default font-size from parent, ensures consistent baseline */
}


/* Updated colors for buttons using root palette variables */
.btn-generate {
  /* keep green role but align to --color-secondary palette */
  background: var(--color-secondary-500);
  color: var(--color-neutral);
}

.btn-generate:hover {
  background: var(--color-secondary-600);
}

/* Undo uses the tertiary (blue) palette; default should be a bit darker (was hover), hover steps darker */
.btn-undo {
  background: var(--color-tertiary-400); /* darker base than before */
  color: white;
}

.btn-undo:hover {
  background: var(--color-tertiary-500); /* hover moves up the palette */
}

.btn-undo:disabled {
  /* subtle, accessible disabled shade from tertiary palette (unchanged) */
  background: var(--color-tertiary-100);
  color: var(--color-tertiary-700);
  cursor: not-allowed;
  box-shadow: none;
}

/* Erase should be a soft/lighter coral; make base a bit darker (was hover), hover steps darker */
.btn-clear {
  background: var(--color-primary-300);
  color: var(--color-secondary-900);
}

.btn-clear:hover {
  background: var(--color-primary-400);
}

/* Add a compact, advanced visual treatment for disabled Clear button: apply a subtle desaturation + brightness tweak */
.btn-clear:disabled {
  background: var(--color-primary-200);
  cursor: not-allowed;
}

/* Reset stays as the error action (strong red) using --color-error */
.btn-reset {
  background: var(--color-error);
  color: white;
}

.btn-reset:hover {
  /* darken slightly on hover for clear affordance */
  filter: brightness(0.9);
}

/* Ensure disabled buttons generally look subdued */
.board-controls button:disabled {
  opacity: 0.85;
}
</style>