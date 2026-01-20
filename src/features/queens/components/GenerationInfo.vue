<script setup lang="ts">
import type {GenMessage} from "../models/GenMessage.ts";
import {GameStatuses} from "../models/GameStatus.ts";

defineProps<{
  genStatusMessage: GenMessage | null;
  gameStatus: string;
  finalGenMessage: string;
}>();
</script>

<template>
  Optimizing board to requested number of solutions:
  <div class="board-info board-info-message">
    <div v-if="genStatusMessage && gameStatus === GameStatuses.GENERATING">
      <div><strong>Iteration:</strong> {{ genStatusMessage.iteration }}</div>
      <div><strong>Solutions Found:</strong> {{ genStatusMessage.solutionsCount }}</div>
      <div><strong>Elapsed Time (ms):</strong> {{ genStatusMessage.elapsedTimeMs / 1000 }} s</div>
      <div><strong>Success Rate:</strong> {{ (genStatusMessage.successRate * 100).toFixed(2) }}%</div>
      <div v-if="genStatusMessage.timeLimitMs !== undefined"><strong>Time Limit (ms):</strong>
        {{ genStatusMessage.timeLimitMs / 1000 }} s
      </div>
      <div v-if="genStatusMessage.iterationLimit !== undefined"><strong>Iteration Limit:</strong>
        {{ genStatusMessage.iterationLimit }}
      </div>
    </div>
    <div v-if="gameStatus === GameStatuses.BOARD_GENERATED">
      <div v-html="genStatusMessage"></div>
    </div>
    <div v-if="gameStatus === GameStatuses.GENERATING_ERROR">
      <div v-html="genStatusMessage"></div>
    </div>
  </div>
</template>

<style scoped>

</style>