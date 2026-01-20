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
  <div class="generation-card">
    <!-- Generating state -->
    <div v-if="genStatusMessage && gameStatus === GameStatuses.GENERATING" class="generation-content">
      <h3 class="card-title">⚙️ Optimizing Board</h3>
      <p class="card-subtitle">Generating puzzle with requested number of solutions</p>

      <div class="stats-grid">
        <div class="stat-item">
          <span class="stat-label">Iteration</span>
          <span class="stat-value">{{ genStatusMessage.iteration }}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">Solutions Found</span>
          <span class="stat-value">{{ genStatusMessage.solutionsCount }}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">Elapsed Time</span>
          <span class="stat-value">{{ (genStatusMessage.elapsedTimeMs / 1000).toFixed(1) }}s</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">Success Rate</span>
          <span class="stat-value">{{ (genStatusMessage.successRate * 100).toFixed(1) }}%</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">Board Size</span>
          <span class="stat-value">{{ genStatusMessage.size }} × {{ genStatusMessage.size }}</span>
        </div>
        <div v-if="genStatusMessage.timeLimitMs !== undefined" class="stat-item">
          <span class="stat-label">Time Limit</span>
          <span class="stat-value">{{ genStatusMessage.timeLimitMs / 1000 }}s</span>
        </div>
        <div v-if="genStatusMessage.iterationLimit !== undefined" class="stat-item">
          <span class="stat-label">Iteration Limit</span>
          <span class="stat-value">{{ genStatusMessage.iterationLimit }}</span>
        </div>
      </div>

      <p class="card-note">
        Generation will stop when the target is reached or upon hitting the time/iteration limit.
        In that case, the closest solution will be returned.
      </p>
    </div>

    <!-- Board generated state -->
    <div v-if="gameStatus === GameStatuses.BOARD_GENERATED" class="generation-content">
      <div v-html="finalGenMessage"></div>
    </div>

    <!-- Error state -->
    <div v-if="gameStatus === GameStatuses.GENERATING_ERROR" class="generation-content error">
      <div v-html="finalGenMessage"></div>
    </div>
  </div>
</template>

<style scoped>
.generation-card {
  background: linear-gradient(180deg, #f6f9ff 0%, #e8f0ff 100%);
  border-radius: 14px;
  padding: 20px 24px;
  box-shadow: 0 8px 24px rgba(20, 30, 60, 0.12);
  backdrop-filter: blur(10px);
  border: 2px solid rgba(93, 130, 255, 0.12);
  width: 100%;
  text-align: center;
}

.generation-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.card-title {
  font-size: 20px;
  font-weight: 700;
  color: #123066;
  margin: 0;
}

.card-subtitle {
  font-size: 14px;
  color: #3b4f7a;
  margin: 0;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 12px;
  width: 100%;
  margin-top: 8px;
}

.stat-item {
  background: rgba(93, 130, 255, 0.08);
  border-radius: 10px;
  padding: 12px 10px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.stat-label {
  font-size: 11px;
  font-weight: 600;
  color: #3b4f7a;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.stat-value {
  font-size: 18px;
  font-weight: 700;
  color: #123066;
}

.card-note {
  font-size: 12px;
  color: #5a6a8a;
  font-style: italic;
  margin-top: 8px;
  line-height: 1.5;
  max-width: 420px;
}

.generation-content.error {
  color: #ac1010;
}

/* Styles for the final gen message HTML content */
.generation-content :deep(.final-gen-message) {
  text-align: center;
}

.generation-content :deep(.final-gen-message h3) {
  font-size: 18px;
  font-weight: 700;
  color: #123066;
  margin: 0 0 12px 0;
}

.generation-content :deep(.final-gen-message ul) {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 8px 16px;
  justify-content: center;
}

.generation-content :deep(.final-gen-message li) {
  background: rgba(93, 130, 255, 0.08);
  border-radius: 8px;
  padding: 8px 14px;
  font-size: 13px;
  color: #123066;
}

.generation-content :deep(.final-gen-message.error h3) {
  color: #ac1010;
}

.generation-content :deep(.final-gen-message.error p) {
  color: #5a3030;
  font-size: 13px;
}
</style>