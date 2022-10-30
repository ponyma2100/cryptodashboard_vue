<template>
  <div class="flex w-full min-h-screen font-sans bg-gray-800">
    <main class="flex flex-col flex-1 gap-6 p-4 w-1/3">
      <header>
        <h1 class="text-3xl font-semibold leading-loose text-white">
          WatchList
        </h1>
        <div class="text-gray-200">{{ moment().format("LL") }}</div>
      </header>
      <hr class="border-gray-700" />
      <OrderReport :coins="CryptoStore.favCrypto" />
    </main>
  </div>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import moment from "moment";
import OrderReport from "../components/OrderReport.vue";
import { useCryptoStore } from "../stores/CryptoStore";

const CryptoStore = useCryptoStore();

CryptoStore.getCryptoList();
</script>

<style lang="scss" scoped></style>
