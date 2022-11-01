<template>
  <main class="flex flex-col flex-1 gap-6 p-4 w-1/3">
    <header>
      <h1 class="text-3xl font-semibold leading-loose text-white">Dashboard</h1>
      <div class="text-gray-200">{{ moment().format("LL") }}</div>
    </header>
    <hr class="border-gray-700" />
    <StatsCard :coins="CryptoStore.topCrypto" />
    <OrderReport :coins="CryptoStore.matchingFav" />
  </main>
  <aside class="flex flex-col gap-y-6 pt-6 pr-6">
    <RecentView />
  </aside>
</template>

<script setup>
import moment from "moment";
import StatsCard from "../components/StatsCard.vue";
import OrderReport from "../components/OrderReport.vue";
import RecentView from "../components/RecentView.vue";
import MostTypeOfOrder from "../components/MostTypeOfOrder.vue";
import getNews from "../composables/getNews";
import { useCryptoStore } from "../stores/CryptoStore";
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()

const route = useRoute();
const CryptoStore = useCryptoStore();

CryptoStore.getCryptoList();


</script>

<style lang="scss" scoped></style>
