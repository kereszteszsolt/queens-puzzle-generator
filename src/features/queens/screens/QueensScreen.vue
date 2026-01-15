<script setup lang="ts">
import {onMounted, ref} from "vue";
import {queensPlacementGenerator} from "../utils/queensPlacementGenerator.ts";

const x = ref<Int8Array | null>(null);
const xl = 15;

onMounted(() => {
  console.log("QueensScreen mounted");
  x.value = queensPlacementGenerator(xl);
  console.log(x.value);
});
</script>

<template>
  Queens Screen
  <div v-if="x">
    <div v-for="r in xl" :key="r">
      <span v-for="c in xl" :key="c">
        {{ x[(r-1)*xl + (c-1)] === -1 ? "Q" : "-:-" }}
      </span>
    </div>
  </div>
</template>

<style scoped>

</style>