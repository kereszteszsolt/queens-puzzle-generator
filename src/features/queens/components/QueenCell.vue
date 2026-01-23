<script setup lang="ts">
import {computed} from "vue";
import {QUEEN, X_MARK} from "../constants";

const props = defineProps<{
  value: number;
  row: number;
  col: number;
  color: number;
  borders: {
    top: boolean;
    right: boolean;
    bottom: boolean;
    left: boolean;
  }
  hasConflict: boolean;
  isWon: boolean;
}>()
const emit = defineEmits<{
  (e: 'queen-cell-pointerdown', row: number, col: number): void;
  (e: 'queen-cell-pointerenter', row: number, col: number): void;
  (e: 'queen-cell-pointerup', row: number, col: number): void;
}>();

const bgClass = computed(() => `bg-cell-${props.color.toString().padStart(2, '0')}`);
const bgClassConflict = computed(() => `bg-cell-${props.color.toString().padStart(2, '0')}-conflict`);
const borderStyles = computed(() => ({
  borderTop: props.borders.top ? '2px solid black' : '0.5px solid rgba(0,0,0,0.3)',
  borderRight: props.borders.right ? '2px solid black' : '0.5px solid rgba(0,0,0,0.3)',
  borderBottom: props.borders.bottom ? '2px solid black' : '0.5px solid rgba(0,0,0,0.3)',
  borderLeft: props.borders.left ? '2px solid black' : '0.5px solid rgba(0,0,0,0.3)',
}));
const cellStyle = computed(() => {
  const base: Record<string, string> = {
    ...borderStyles.value as Record<string, string>,
  };
  if (props.hasConflict) {
    base.backgroundImage = 'repeating-linear-gradient(45deg, transparent, transparent 4px, rgba(0,0,0,0.2) 4px, rgba(0,0,0,0.2) 8px)';
    // slight overlay so pattern blends with background color
    base.backgroundBlendMode = 'overlay';
  }
  return base;
});
const showWinCrown = computed(() => props.isWon && props.value === QUEEN);

function handlePointerDown() {
  emit('queen-cell-pointerdown', props.row, props.col);
}

function handlePointerEnter() {
  emit('queen-cell-pointerenter', props.row, props.col);
}

function handlePointerUp() {
  emit('queen-cell-pointerup', props.row, props.col);
}
</script>

<template>
  <div class="cell-content"
       :class="props.hasConflict ? bgClassConflict : bgClass"
       :style="cellStyle"
       @pointerdown="handlePointerDown"
       @pointerup="handlePointerUp"
       @pointerenter="handlePointerEnter"
  >
    <span v-if="showWinCrown" class="crown">👑</span>
    <span v-else-if="props.value === QUEEN">♛</span>
    <span v-else-if="props.value === X_MARK">X</span>
  </div>
</template>

<style scoped>
.cell-content{
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: clamp(14px, 4vw, 21px);
  color: black;
  user-select: none;
  aspect-ratio: 1 / 1;
  box-sizing: border-box;
  position: relative;
}
.crown {
  font-size: clamp(15px, 4.5vw, 22px);
  animation: crown-bounce 2s infinite;
  transform-origin: center;
}

@keyframes crown-bounce {
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-8px); }
  60% { transform: translateY(-4px); }
}

/* Cell background palette for queens game - Slightly darker lighter colors */
/* Base colors */
.bg-cell-01 { background-color: #F48FB1; } /* Pink */
.bg-cell-02 { background-color: #FF8A65; } /* Deep Orange */
.bg-cell-03 { background-color: #FFD54F; } /* Amber */
.bg-cell-04 { background-color: #DCE775; } /* Lime */
.bg-cell-05 { background-color: #81C784; } /* Green */
.bg-cell-06 { background-color: #4DB6AC; } /* Teal */
.bg-cell-07 { background-color: #4DD0E1; } /* Cyan */
.bg-cell-08 { background-color: #64B5F6; } /* Blue */
.bg-cell-09 { background-color: #7986CB; } /* Indigo */
.bg-cell-10 { background-color: #BA68C8; } /* Purple */
.bg-cell-11 { background-color: #A1887F; } /* Brown */
.bg-cell-12 { background-color: #E53935; } /* Red */
.bg-cell-13 { background-color: #1A237E; } /* Navy */
.bg-cell-14 { background-color: #D81B60; } /* Magenta */
.bg-cell-15 { background-color: #8E24AA; } /* Deep Purple */

/* Lighter variants for suggestions (hint) */
.bg-cell-01-hint { background-color: #F8BCD0; }
.bg-cell-02-hint { background-color: #FFC5A8; }
.bg-cell-03-hint { background-color: #FFE8A8; }
.bg-cell-04-hint { background-color: #E8F2B8; }
.bg-cell-05-hint { background-color: #B3D4B5; }
.bg-cell-06-hint { background-color: #9CCFC8; }
.bg-cell-07-hint { background-color: #9CD8E2; }
.bg-cell-08-hint { background-color: #A4CFF3; }
.bg-cell-09-hint { background-color: #AEB4E0; }
.bg-cell-10-hint { background-color: #C7A8D4; }
.bg-cell-11-hint { background-color: #C0B0AC; }
.bg-cell-12-hint { background-color: #EF8886; }
.bg-cell-13-hint { background-color: #FEE886; }
.bg-cell-14-hint { background-color: #E876A0; }
.bg-cell-15-hint { background-color: #BB7CCC; }

/* Lighter variants for conflicts */
.bg-cell-01-conflict { background-color: #FAC8D8; }
.bg-cell-02-conflict { background-color: #FFD2B4; }
.bg-cell-03-conflict { background-color: #FFEDB4; }
.bg-cell-04-conflict { background-color: #ECF5C4; }
.bg-cell-05-conflict { background-color: #BFD9C0; }
.bg-cell-06-conflict { background-color: #A8D8D1; }
.bg-cell-07-conflict { background-color: #A8E0EB; }
.bg-cell-08-conflict { background-color: #B0D7F8; }
.bg-cell-09-conflict { background-color: #BABFE8; }
.bg-cell-10-conflict { background-color: #D1B4DC; }
.bg-cell-11-conflict { background-color: #C9BBB6; }
.bg-cell-12-conflict { background-color: #F29C9A; }
.bg-cell-13-conflict { background-color: #FEEC9A; }
.bg-cell-14-conflict { background-color: #EC8DB0; }
.bg-cell-15-conflict { background-color: #C792D5; }
</style>