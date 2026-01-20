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
        v-if="gameStatus === GameStatuses.WON || gameStatus === GameStatuses.PLAYING || gameStatus === GameStatuses.WELCOME || gameStatus === GameStatuses.BOARD_GENERATED"
        class="btn-generate" @click="$emit('newGame', selectedSize)">
      <span class="btn-icon">🎲</span>
      <span class="btn-text">New Game</span>
    </button>
    <button
        v-if="gameStatus === GameStatuses.BOARD_GENERATED"
        class="btn-start" @click="$emit('startGame')">
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


/* Updated colors for buttons using gradients and shadows for consistency */

/* New Game - Green (secondary palette) */
.btn-generate {
  background: linear-gradient(180deg, #32b432 0%, #228b22 100%);
  color: var(--color-neutral);
  box-shadow: 0 4px 12px rgba(34, 139, 34, 0.3);
}

.btn-generate:hover {
  background: linear-gradient(180deg, #28a428 0%, #1f7e1f 100%);
  box-shadow: 0 6px 16px rgba(34, 139, 34, 0.4);
}

/* Start Game - Coral/Orange (primary palette) */
.btn-start {
  background: linear-gradient(180deg, #ffab70 0%, #ff7f50 100%);
  color: #3d1a0a;
  box-shadow: 0 4px 12px rgba(255, 127, 80, 0.3);
}

.btn-start:hover {
  background: linear-gradient(180deg, #ff9a5c 0%, #e67345 100%);
  box-shadow: 0 6px 16px rgba(255, 127, 80, 0.4);
}

/* Undo - Blue (tertiary palette) */
.btn-undo {
  background: linear-gradient(180deg, #70d0ff 0%, #00bfff 100%);
  color: #0a2a3d;
  box-shadow: 0 4px 12px rgba(0, 191, 255, 0.3);
}

.btn-undo:hover {
  background: linear-gradient(180deg, #5cc8ff 0%, #00a6e6 100%);
  box-shadow: 0 6px 16px rgba(0, 191, 255, 0.4);
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
  box-shadow: 0 4px 12px rgba(255, 171, 153, 0.3);
}

.btn-clear:hover {
  background: linear-gradient(180deg, #ffbcad 0%, #ff9a85 100%);
  box-shadow: 0 6px 16px rgba(255, 171, 153, 0.4);
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
  box-shadow: 0 4px 12px rgba(172, 16, 16, 0.3);
}

.btn-reset:hover {
  background: linear-gradient(180deg, #c01818 0%, #960e0e 100%);
  box-shadow: 0 6px 16px rgba(172, 16, 16, 0.4);
}

/* Ensure disabled buttons generally look subdued */
.board-controls button:disabled {
  opacity: 0.85;
}
</style>