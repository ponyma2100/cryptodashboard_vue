<template>
  <div class="flex w-full min-h-screen font-sans bg-gray-800">
    <main class="flex flex-col flex-1 gap-6 p-4 w-1/3">
      <header>
        <div class="flex items-center">
          <img
            :src="CryptoStore.cryptoDetails.iconUrl"
            alt=""
            class="w-12 h-12 mr-2"
          />
          <h1 class="text-3xl font-semibold leading-loose text-sky-300">
            {{ CryptoStore.cryptoDetails.name }} Price
          </h1>
          <i
            @click="CryptoStore.addFav(CryptoStore.cryptoDetails.uuid)"
            class="material-icons cursor-pointer"
            v-if="!CryptoStore.cryptoDetails.fav"
            >bookmark_add</i
          >
          <i
            v-if="CryptoStore.cryptoDetails.fav"
            @click="CryptoStore.removeFav(CryptoStore.cryptoDetails.uuid)"
            class="material-icons cursor-pointer text-yellow-500"
            >bookmark_remove</i
          >
        </div>
        <p class="text-xl leading-loose text-gray-500">
          {{ CryptoStore.cryptoDetails.name }} live price in US Dollar (USD).
          View value statistics, market cap and supply.
        </p>
      </header>
      <hr class="border-gray-700" />

      <!-- LineChart -->
      <div>
        <Line
          :chartData="chartData"
          :chartOptions="chartOptions"
          style="max-height: 500px"
        />
      </div>
      <CoinStats />
    </main>
  </div>
</template>

<script setup>
import CoinStats from "../components/CoinStats.vue";
import { useRoute } from "vue-router";
import { useCryptoStore } from "../stores/CryptoStore";
import getCrypto from "../composables/getCrypto";
import { Line } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";
import { ref } from "@vue/reactivity";
import { computed, onMounted } from "@vue/runtime-core";

const { getHistory, coinHistory } = getCrypto();
const route = useRoute();
const CryptoStore = useCryptoStore();

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
);

onMounted(async () => {
  await getHistory(route.params.id);
});

const coinPrice = computed(() => {
  return coinHistory.value.map((h) => h.price);
});
const coinTimestamp = computed(() => {
  return coinHistory.value.map((h) =>
    new Date(h.timestamp * 1000).toLocaleDateString()
  );
});

const chartData = computed(() => ({
  labels: coinTimestamp.value,
  datasets: [
    {
      label: "Price in USD",
      data: coinPrice.value,
      fill: false,
      backgroundColor: "#0071bd",
      borderColor: "#0071bd",
    },
  ],
}));

const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
}));
</script>

<style lang="scss" scoped></style>
