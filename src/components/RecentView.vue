<template>
  <div class="flex flex-col p-6 bg-gray-900 rounded-lg gap-y-6 min-w-[460px]">
    <div class="flex justify-between items-center">
      <h2 class="text-xl font-semibold leading-loose text-white">
        Recently Viewed
      </h2>
    </div>
    <hr class="border-gray-700" />
    <div class="flex flex-col gap-y-4">
      <div
        v-for="coin in CryptoStore.getRecentList"
        :key="coin.name"
        
      >
      <RouterLink :to="`/crypto/${coin.uuid}`"  class="flex gap-x-4 items-center  hover:bg-gray-700 cursor-pointer"  >
        <img class="w-[32px] h-auto" :src="`${coin.iconUrl}`" alt=""/>
        <div class="flex flex-col gap-y-0.5">
          <div class="text-sm font-medium text-white">{{ coin.name }}</div>
          <div class="text-xs text-gray-500">{{ coin.price }}</div>
        </div>
        <div
          class="text-md font-semibold w-1/4 grow text-end"
          :class="
            Number(coin.change) >= 0 ? 'text-accent-red' : 'text-accent-green'
          "
        >
          {{ coin.change }} %
        </div>
      </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCryptoStore } from "../stores/CryptoStore";

const CryptoStore = useCryptoStore();

const props = defineProps({
  coins: Array,
});
</script>

<style lang="scss" scoped></style>
