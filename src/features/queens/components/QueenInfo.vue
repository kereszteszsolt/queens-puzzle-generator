<script setup lang="ts">

const props = defineProps({
  totalPossibleSolutions: Number,
  boardSize: Number,
  generatingMessage: String,
  formattedTimer: String,
});
</script>

<template>
  <div class="board-info">
    <div><strong>Board:</strong> {{boardSize}}x{{boardSize}} ({{ totalPossibleSolutions }})</div>
    <div><strong>Timer:</strong> {{ formattedTimer }}</div>
    <div><strong>Status:</strong> {{ generatingMessage }}</div>
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
</style>