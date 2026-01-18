<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

defineProps<{
  show: boolean;
  winningTime: number;
}>();

defineEmits<{
  close: [];
  replay: [];
  'new-game': [];
}>();
</script>

<template>
  <div v-if="$props.show" class="win-overlay">
    <div class="win-modal">
      <div class="trophy">🏆</div>
      <h2 class="title">Congratulations!</h2>
      <p class="subtitle">You solved the Queens puzzle!</p>

      <div class="time-pill">
        <p class="time">Time: {{ Math.floor($props.winningTime / 60) }}:{{ ($props.winningTime % 60).toString().padStart(2, '0') }}</p>
      </div>

      <div class="buttons">
        <button class="btn replay" @click="$emit('replay')">🔄 Replay</button>
        <button class="btn new" @click="$emit('new-game')">🎲 New Game</button>
        <button class="btn ok" @click="$emit('close')">OK</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.win-overlay {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  /* translucent dark overlay but keep underlying content visible with blur */
  background: rgba(0,0,0,0.35);
  backdrop-filter: blur(6px) saturate(120%);
}

.win-modal {
  width: min(520px, 92%);
  background: linear-gradient(180deg, #f6f9ff 0%, #e8f0ff 100%); /* light blue gradient matching example */
  border-radius: 18px;
  padding: 28px;
  box-shadow: 0 12px 30px rgba(20, 30, 60, 0.35);
  text-align: center;
  border: 4px solid rgba(93, 130, 255, 0.15); /* subtle colored border */
}

.trophy {
  font-size: 56px;
  margin-bottom: 8px;
  animation: bounce 2s infinite;
}

.title {
  font-size: 28px;
  font-weight: 700;
  color: #123066; /* deep blue */
  margin: 6px 0;
}

.subtitle {
  color: #3b4f7a; /* muted blue */
  font-size: 16px;
  margin-bottom: 16px;
}

.time-pill {
  background: rgba(93, 130, 255, 0.12); /* soft secondary color */
  border-radius: 10px;
  padding: 10px 14px;
  display: inline-block;
  margin-bottom: 20px;
}

.time {
  color: #0f1b3a;
  font-weight: 600;
  margin: 0;
}

.buttons {
  display: flex;
  gap: 12px;
  justify-content: center;
  margin-top: 8px;
}

.btn {
  padding: 10px 18px;
  border-radius: 10px;
  font-weight: 700;
  cursor: pointer;
  border: none;
}

.btn.replay {
  background: linear-gradient(180deg, #ffcc66 0%, #ffb24d 100%);
  color: #122030;
}

.btn.new {
  background: linear-gradient(180deg, #7be16b 0%, #4cd34a 100%);
  color: #06220a;
}

.btn.ok {
  background: linear-gradient(180deg, #4f8cff 0%, #2f6eff 100%);
  color: white;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-8px); }
  60% { transform: translateY(-4px); }
}
</style>