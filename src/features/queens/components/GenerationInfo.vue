<script setup lang="ts">
defineProps({
  generatingMessage: String,
})
</script>

<template>
  Generation Info:
  <div class="board-info board-info-message">
    <div v-html="generatingMessage"></div>
  </div>
</template>

<style scoped>

</style>