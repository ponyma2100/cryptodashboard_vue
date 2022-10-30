<template>
  <div class="flex w-full min-h-screen font-sans bg-gray-800">
    <Sidebar />
    <RouterView />
  </div>
</template>

<script setup>
import Sidebar from "./components/Sidebar.vue";
</script>

<style lang="scss" scoped></style>
