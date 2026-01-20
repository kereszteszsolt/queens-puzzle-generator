<script setup lang="ts">

import {GameStatuses} from "../models/GameStatus.ts";

defineProps({
  totalPossibleSolutions: Number,
  boardSize: Number,
  formattedTimer: String,
  generatingMessage: String,
  gameStatus: String,
});
</script>

<template>
  <div v-if="gameStatus === GameStatuses.PLAYING" class="board-info">
    <div><strong>Board:</strong> {{boardSize}}x{{boardSize}}</div>
    <div><strong>Possible solutions:</strong> {{ totalPossibleSolutions }}</div>
    <div><strong>Timer:</strong> {{ formattedTimer }}</div>
  </div>
  <div v-else class="board-info board-info-message">
    <div v-html="generatingMessage"></div>
  </div>
</template>

<style scoped>
.board-info {
  display: flex;
  flex-direction: row;
  background: linear-gradient(180deg, #f6f9ff 0%, #e8f0ff 100%);
  border-radius: 10px;
  padding: 12px 16px;
  box-shadow: 0 4px 12px rgba(20, 30, 60, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(93, 130, 255, 0.12);
  text-align: center;
  justify-content: space-between;
  width: 100%;
  color: #123066;
}

.board-info-message {
  justify-content: center;
  font-size: 15px;
  line-height: 1.6;
}

/* Deep selectors for dynamically injected HTML */
.board-info-message :deep(.status-icon) {
  display: inline;
  font-size: 1.1em;
  vertical-align: middle;
  margin-right: 2px;
}

.board-info-message :deep(strong) {
  color: #0f1b3a;
}

.board-info-message :deep(.loading-dots) {
  display: inline-block;
  animation: pulse 1.2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}
</style>