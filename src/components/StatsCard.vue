<template>
  <carousel class="flex gap-8" :items-to-show="2.5">
    <slide
      v-for="coin in coins"
      :key="coin.uuid"
      class="flex flex-col p-4 w-2/3 bg-gray-900 rounded-lg gap-y-3 mr-2 hover:bg-gray-700 cursor-pointer"
    >
      <RouterLink :to="`/crypto/${coin.uuid}`" @click="CryptoStore.handleRecent(coin.uuid)">
        <div class="flex items-center gap-x-3">
          <img class="w-[30px] h-auto" :src="`${coin.iconUrl}`" alt="" />
          <span class="text-gray-500">{{ coin.name }}</span>
          <span
            class="text-md font-semibold"
            :class="
              Number(coin.change) >= 0 ? 'text-accent-red' : 'text-accent-green'
            "
            >{{ coin.change }} %</span
          >
          <div
            class="p-0.5 rounded-full"
            :class="
              Number(coin.change) >= 0
                ? 'bg-accent-red/20'
                : 'bg-accent-green/20'
            "
          >
            <ArrowUpIcon
              v-if="Number(coin.change) >= 0"
              class="fill-current text-accent-red"
            />
            <ArrowDownIcon v-else class="fill-current text-accent-green" />
          </div>
        </div>
        <div class="text-2xl font-semibold text-white">
          <span>{{ coin.price }}</span>
        </div>
      </RouterLink>
    </slide>
  </carousel>
</template>

<script setup>
import ArrowUpIcon from "../icons/arrow-up.svg";
import ArrowDownIcon from "../icons/arrow-down.svg";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";
import { useCryptoStore } from "../stores/CryptoStore";
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()

const route = useRoute();
const CryptoStore = useCryptoStore();


const props = defineProps({
  coins: Array,
});
</script>

<style></style>
