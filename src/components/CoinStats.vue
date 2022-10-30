<template>
  <div class="flex justify-between flex-wrap p-6 gap-6 w-full">
    <!-- description -->
    <div
      class="flex flex-col items-center rounded-lg bg-gray-900 w-full min-w-[560px] max-h-96 overflow-y-scroll no-scrollbar"
    >
      <h2
        class="text-sky-300 bg-gray-900 min-w-auto text-3xl font-semibold pt-4"
      >
        What is {{ CryptoStore.cryptoDetails.name }}
      </h2>
      <div
        class="text-md text-gray-300 leading-loose p-10"
        v-html="CryptoStore.cryptoDetails.description"
      ></div>
    </div>
    <div class="flex flex-row justify-between flex-wrap gap-6 w-full">
      <!--  Stats Info -->
      <div class="flex flex-col p-6 bg-gray-900 rounded-lg gap-y-6 w-1/2">
        <div class="flex flex-col">
          <h2 class="text-xl font-semibold leading-loose text-sky-300">
            {{ CryptoStore.cryptoDetails.name }} Value Statistics
          </h2>
          <p class="text-gray-500">
            An overview showing the statistics of
            {{ CryptoStore.cryptoDetails.name }}
          </p>
        </div>
        <hr class="border-gray-700" />
        <div class="flex flex-col gap-y-4">
          <div
            class="flex gap-x-4 items-center"
            v-for="info in CryptoStore.stats"
            :key="info"
          >
            <i
              class="material-icons material-symbols-sharp w-6 h-6 fill-current text-sky-700"
            >
              analytics
            </i>

            <div class="text-sm font-medium text-gray-500 grow">
              {{ info.title }}
            </div>
            <div class="text-sm font-medium text-gray-300">
              {{ info.value }}
            </div>
          </div>
        </div>
      </div>

      <!-- Other Stats Info -->
      <div class="flex flex-col p-6 bg-gray-900 rounded-lg gap-y-6 grow">
        <div class="flex flex-col">
          <h2 class="text-xl font-semibold leading-loose text-sky-300">
            Other Stats Info
          </h2>
          <p class="text-gray-500">
            An overview showing the stats of all cryptocurrencies
          </p>
        </div>
        <hr class="border-gray-700" />
        <div class="flex flex-col gap-y-4 w-400px">
          <div
            class="flex justify-between gap-x-4 items-center"
            v-for="info in CryptoStore.genericStats"
            :key="info"
          >
            <i
              class="material-icons material-symbols-sharp w-6 h-6 fill-current text-sky-700"
            >
              analytics
            </i>
            <div class="text-sm font-medium text-gray-500 grow">
              {{ info.title }}
            </div>
            <div class="text-sm font-medium text-gray-300">
              {{ info.value }}
            </div>
          </div>
        </div>
      </div>

      <!-- links -->
      <div class="flex flex-col p-6 bg-gray-900 rounded-lg gap-y-6 w-1/2">
        <div class="flex flex-col">
          <h2 class="text-xl font-semibold leading-loose text-sky-300">
            {{ CryptoStore.cryptoDetails.name }} Links
          </h2>
        </div>
        <hr class="border-gray-700" />
        <div class="flex flex-col gap-y-4">
          <div
            class="flex justify-between gap-x-4 items-center"
            v-for="info in CryptoStore.cryptoDetails.links"
            :key="info"
          >
            <i
              class="material-icons material-symbols-sharp w-6 h-6 fill-current text-sky-700"
            >
              link
            </i>
            <div class="text-sm font-medium text-gray-500 grow">
              {{ info.type }}
            </div>
            <a
              :href="info.url"
              target="_blank"
              class="text-sm font-medium text-sky-500"
              >{{ info.url }}</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { useCryptoStore } from "../stores/CryptoStore";

const route = useRoute();
const CryptoStore = useCryptoStore();

CryptoStore.getCryptoDetails(route.params.id);

CryptoStore.cryptoMatchingFav(route.params.id);
</script>

<style lang="scss" scoped></style>
