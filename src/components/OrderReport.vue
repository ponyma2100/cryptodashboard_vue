<template>
  <div class="p-6 bg-gray-900 rounded-lg min-w-[460px]">
    <div class="flex justify-between items-center pb-4">
      <h2 class="text-xl font-semibold leading-loose text-white">
        Market cap ranking
      </h2>
      <button
        class="flex py-3 px-4 rounded-lg border border-gray-700 gap-x-2.5"
      >
        <OptionsIcon />
        <span class="text-sm text-white">Filter Order</span>
      </button>
    </div>
    <table class="w-full">
      <thead class="flex">
        <tr
          class="flex justify-between w-full text-sm font-semibold text-white"
        >
          <td class="py-2">SYMBOL</td>
          <td class="py-2">MARKET CAP</td>
          <td class="py-2 text-right">PRICE</td>
          <td class="py-2 text-center">CHANGE</td>
        </tr>
      </thead>

      <tbody
        class="h-[40vh] overflow-y-scroll no-scrollbar border-t border-gray-700"
      >
        <tr
          v-for="coin in coins"
          :key="coin.uuid"
          class="text-sm text-gray-500 hover:bg-gray-700 flex items-center justify-between w-full"
        >
          <td class="mr-3">
            <i
              @click="CryptoStore.addFav(coin.uuid)"
              class="material-icons cursor-pointer"
              v-if="!coin.fav"
              >bookmark_add</i
            >
            <i
              v-if="coin.fav"
              @click="CryptoStore.removeFav(coin.uuid)"
              class="material-icons cursor-pointer text-yellow-500"
              >bookmark_remove</i
            >
          </td>
          <RouterLink
            :to="`/crypto/${coin.uuid}`"
            class="flex items-center justify-between w-full"
            @click="CryptoStore.handleRecent(coin.uuid)"
          >
            <td class="py-4 w-1/4">
              <div class="flex gap-4 items-center">
                <img class="w-[32px] h-auto" :src="`${coin.iconUrl}`" alt="" />
                <span>{{ coin.name }}</span>
              </div>
            </td>
            <td class="py-4 w-1/4 text-center">{{ coin.marketCap }}</td>
            <td class="py-4 tabular-nums w-1/4 text-end">{{ coin.price }}</td>
            <td
              class="text-md font-semibold w-1/4 text-end"
              :class="
                Number(coin.change) >= 0
                  ? 'text-accent-red'
                  : 'text-accent-green'
              "
            >
              {{ coin.change }} %
            </td>
          </RouterLink>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import OptionsIcon from "../icons/options.svg";
import { useCryptoStore } from "../stores/CryptoStore";

const CryptoStore = useCryptoStore();

const props = defineProps({
  coins: Array,
});
</script>

<style lang="scss" scoped></style>
