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
        <div class="flex w-full">
          <select
            name=""
            id=""
            v-model="chartInterval"
            @change="handleInterval(chartInterval)"
            class="w-24 mr-10"
          >
            <option value="3h">3h</option>
            <option value="24h" selected>24h</option>
            <option value="7d">7d</option>
            <option value="30d">30d</option>
            <option value="3m">3m</option>
            <option value="1y">1y</option>
            <option value="3y">3y</option>
            <option value="5y">5y</option>
          </select>
          <div
            class="flex justify-center text-gray-300 items-center font-semibold leading-loose"
          >
            <span class="mr-10"
              >Current {{ CryptoStore.cryptoDetails.name }} Price: $
              {{ CryptoStore.cryptoDetails.price }}</span
            >
            <span
              :class="
                Number(CryptoStore.cryptoDetails.change) >= 0
                  ? 'text-accent-red'
                  : 'text-accent-green'
              "
              >Change: {{ CryptoStore.cryptoDetails.change }}</span
            >
          </div>
        </div>
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
import moment from "moment";
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
const chartInterval = ref("24h");

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
  await getHistory(route.params.id, chartInterval.value);
});

const handleInterval = () => {
  getHistory(route.params.id, chartInterval.value);
};

const coinPrice = computed(() => {
  return coinHistory.value.map((h) => h.price);
});
const coinTimestamp = computed(() => {
  return coinHistory.value.map((h) =>
    moment(h.timestamp * 1000).format("YYYY/MM/DD, h:mm")
  );
});

const chartData = computed(() => ({
  labels: coinTimestamp.value.reverse(),
  datasets: [
    {
      label: "Price in USD",
      data: coinPrice.value.reverse(),
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
