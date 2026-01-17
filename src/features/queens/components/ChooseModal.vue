<script setup lang="ts">

defineProps<{
  show: boolean;
}>();

defineEmits<{
  (e: 'close'): void;
  (e: 'choose', payload: { size: number; maxSolutions: number }): void;
}>();
</script>

<template>
  <div v-if="$props.show" class="win-overlay">
    <div class="win-modal">
      <h2 class="title">Choose board size</h2>
      <p class="subtitle">Select a board size and constraint.</p>

      <div class="group">
        <h3 class="group-title">Unique solution (max 1)</h3>
        <div class="size-grid">
          <button v-for="s in [4,5,6,7,8,9,10,11,12,13,14,15]" :key="'ten-'+s" :class="['size-btn', {selected: false}]" @click="$emit('choose', { size: s, maxSolutions: 1 })">
            {{ s }}
          </button>
        </div>
      </div>

      <div class="group">
        <h3 class="group-title">Up to 10 solutions</h3>
        <div class="size-grid">
          <button v-for="s in [4,5,6,7,8,9,10,11,12,13,14,15]" :key="'ten-'+s" :class="['size-btn', {selected: false}]" @click="$emit('choose', { size: s, maxSolutions: 10 })">
            {{ s }}
          </button>
        </div>
      </div>

      <div class="group">
        <h3 class="group-title">No limit (15x15 -> 2 279 184)</h3>
        <div class="size-grid">
          <button v-for="s in [4,5,6,7,8,9,10,11,12,13,14,15]" :key="'nolimit-'+s" :class="['size-btn', {selected: false}]" @click="$emit('choose', { size: s, maxSolutions: 2279184 })">
            {{ s }}
          </button>
        </div>
      </div>

      <p class="info-msg">Note: board 10 may take a few seconds to generate; board 11 may take from 1 to 60 seconds. Larger sizes (12-15) may take longer.</p>

      <div class="buttons">
        <button class="btn ok" @click="$emit('close')">Close</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Reuse WinModal visual language */
.win-overlay {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  background: rgba(0,0,0,0.35);
  backdrop-filter: blur(6px) saturate(120%);
}

.win-modal {
  width: min(640px, 96%);
  background: linear-gradient(180deg, #f6f9ff 0%, #e8f0ff 100%);
  border-radius: 18px;
  padding: 24px;
  box-shadow: 0 12px 30px rgba(20, 30, 60, 0.35);
  text-align: center;
  border: 4px solid rgba(93, 130, 255, 0.12);
}

.title {
  font-size: 22px;
  font-weight: 700;
  color: #123066;
  margin: 6px 0 10px 0;
}

.subtitle {
  color: #3b4f7a;
  font-size: 14px;
  margin-bottom: 12px;
}

.group { margin-bottom: 12px; }
.group-title { font-size: 14px; color: #244067; margin: 6px 0; }

.size-grid {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 12px;
}

.size-btn {
  padding: 10px 14px;
  border-radius: 10px;
  font-weight: 700;
  cursor: pointer;
  border: none;
  background: linear-gradient(180deg, #ffffff 0%, #f0f6ff 100%);
  color: #123066;
  box-shadow: 0 8px 18px rgba(20, 30, 60, 0.08);
  min-width: 48px;
  transition: transform 0.16s ease, box-shadow 0.16s ease;
}

.size-btn:hover { transform: translateY(-3px); box-shadow: 0 12px 28px rgba(20,30,60,0.12); }
.size-btn.selected { background: linear-gradient(180deg, #4f8cff 0%, #2f6eff 100%); color: white; }

.info-msg {
  color: #244067;
  font-size: 13px;
  margin-top: 6px;
}

.buttons { display: flex; gap: 12px; justify-content: center; margin-top: 12px; }

.btn { padding: 10px 18px; border-radius: 10px; font-weight: 700; cursor: pointer; border: none; }
.btn.ok { background: linear-gradient(180deg, #4f8cff 0%, #2f6eff 100%); color: white; }
</style>