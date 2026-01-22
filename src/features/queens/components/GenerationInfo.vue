<script setup lang="ts">
import {computed} from "vue";
import {type GameStatus, GameStatuses} from "../models/GameStatus.ts";

const props = defineProps<{
  totalPossibleSolutions: number;
  boardSize: number;
  formattedTimer: string;
  gameStatus: GameStatus;
}>();

// Helper function to wrap text between quotes with <strong> tags
function boldQuotedText(text: string): string {
  return text.replace(/"([^"]+)"/g, '<strong>"$1"</strong>');
}

const statusMessage = computed(() => {
  switch (props.gameStatus) {
    case GameStatuses.WELCOME:
      return { icon: '👑', iconClass: 'icon-crown', text: boldQuotedText('Click "New Game" to start a puzzle.') };
    case GameStatuses.WON:
      return { icon: '🎉', iconClass: 'icon-party', text: 'Congratulations, you won!', subtext: `Completion time: ${props.formattedTimer}`, trailingIcon: true };
    case GameStatuses.GENERATING:
      return { icon: '⏳', iconClass: 'icon-hourglass', text: 'Generating puzzle', loading: true };
    case GameStatuses.GENERATING_ERROR:
      return { icon: '❌', iconClass: 'icon-error', text: 'Error generating puzzle. Please try again.' };
    case GameStatuses.BOARD_GENERATED:
      return { icon: '✅', iconClass: 'icon-check', text: boldQuotedText('Board generated! Click "Start Game" to begin playing, or "New Game" to generate a new puzzle.') };
    default:
      return null;
  }
});
</script>

<template>
  <div v-if="gameStatus === GameStatuses.PLAYING" class="board-info">
    <div><strong>Board:</strong> {{ boardSize }}x{{ boardSize }}</div>
    <div><strong>Solutions:</strong> {{ totalPossibleSolutions }}</div>
    <div><strong>Timer:</strong> {{ formattedTimer }}</div>
  </div>
  <div v-else-if="statusMessage" class="board-info board-info-message">
    <div class="message-content">
      <div class="message-row">
        <span class="status-icon" :class="statusMessage.iconClass">{{ statusMessage.icon }}</span>
        <span v-html="statusMessage.text"></span><span v-if="statusMessage.loading" class="loading-dots">...</span><span v-if="statusMessage.trailingIcon" class="status-icon" :class="statusMessage.iconClass">{{ statusMessage.icon }}</span>
      </div>
      <div v-if="statusMessage.subtext" class="message-row subtext">
        <strong>{{ statusMessage.subtext }}</strong>
      </div>
    </div>
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

.message-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.message-row {
  text-align: center;
}

.message-row.subtext {
  color: #0f1b3a;
}

.status-icon {
  font-size: 1.1em;
  position: relative;
}

.trailing-group {
  display: inline;
  white-space: nowrap;
}

.status-icon.icon-crown {
  top: -2px;
  margin-right: 1px;
}

.status-icon.icon-party {
  top: -2px;
  margin-right: 1px;
  margin-left: 2px;
}

.status-icon.icon-hourglass {
  top: 0;
}

.status-icon.icon-error {
  top: -2px;
}

.status-icon.icon-check {
  top: 0;
}

.loading-dots {
  display: inline-block;
  animation: pulse 1.2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}
</style>