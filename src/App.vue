<script setup lang="ts">

import NavBar from "./core/components/NavBar.vue";
</script>

<template>
  <div>
    <nav-bar />
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<style scoped>
main {
  padding: 4rem 1rem 1rem;
}
</style>
