<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  size: { type: [Number, String], default: 28 },
  thickness: { type: Number, default: 3 },
  variant: { type: String as () => 'primary' | 'secondary' | 'tertiary', default: 'primary' },
  ariaLabel: { type: String, default: 'Loading' }
});

const sizePx = computed(() => typeof (props as any).size === 'number' ? `${(props as any).size}px` : String((props as any).size));
const border = computed(() => `${(props as any).thickness}px`);
const colorVar = computed(() => {
  switch ((props as any).variant) {
    case 'secondary': return 'var(--color-secondary-500)';
    case 'tertiary': return 'var(--color-tertiary-500)';
    default: return 'var(--color-primary-500)';
  }
});
</script>

<template>
  <div class="spinner-root" :style="{ width: sizePx, height: sizePx }" role="status" :aria-label="ariaLabel">
    <div
        class="spinner-ring"
        :style="{ borderWidth: border, borderTopColor: colorVar }"
    ></div>
  </div>
</template>

<style scoped>
.spinner-root {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.spinner-ring {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border-style: solid;
  /* light neutral base for the ring */
  border-color: rgba(255,255,255,0.35);
  /* colored segment - default fallback */
  border-top-color: var(--color-primary-500);
  animation: spinner-rotate 0.9s linear infinite;
  box-shadow: 0 2px 6px rgba(0,0,0,0.08);
  transform-origin: center;
}

@keyframes spinner-rotate {
  to { transform: rotate(360deg); }
}
</style>