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
  background: rgba(173, 216, 230, 0.8); /* Light bluish gray glassy effect */
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  text-align: center;
  justify-content: space-between;
  width: 100%;
}
.board-info-message {
  justify-content: space-around;
}
</style>