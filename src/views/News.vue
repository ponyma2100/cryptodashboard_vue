<template>
  <div class="flex w-full min-h-screen font-sans bg-gray-800">
    <main class="flex flex-col flex-1 gap-6 p-4 w-1/3">
      <header>
        <h1 class="text-3xl font-semibold leading-loose text-white">
          Latest Crypto News
        </h1>
        <div class="text-gray-200">
          {{ moment().format("LL") }}
        </div>
      </header>
      <hr class="border-gray-700" />
      <div class="flex w-3/4">
        <button
          @click="handleSearch('All')"
          class="flex justify-center items-center bg-gray-700 text-gray-200 w-full h-10 rounded-2xl p-3 mr-3"
          :class="
            activeButton === 'All' ? 'text-white border-2 border-sky-700' : ''
          "
        >
          All
        </button>
        <button
          v-for="coin in topCoins.slice(0, 5)"
          :key="coin.uuid"
          class="flex justify-center items-center bg-gray-700 text-gray-200 w-full h-10 rounded-2xl p-3 mr-3"
          @click="handleSearch(coin.name)"
          :class="
            activeButton === coin.name
              ? 'text-white border-2 border-sky-700'
              : ''
          "
        >
          {{ coin.name }}
        </button>
      </div>
      <div class="flex flex-row flex-wrap gap-10 p-10">
        <div
          v-for="news in newsLists"
          :key="news.name"
          class="backdrop-opacity-10 bg-gray-900 rounded-lg hover:bg-gray-700 cursor-pointer w-2/4 max-w-lg min-h-[200px] p-2"
        >
          <a :href="news.url" target="_blank">
            <div class="flex justify-around py-2 min-h-1/2">
              <h3 class="text-gray-100 font-semibold">{{ news.name }}</h3>
              <img
                :src="`${news.image.thumbnail.contentUrl}`"
                alt=""
                v-if="news.image"
              />
            </div>
            <div class="flex flex-col py-2">
              <span class="text-gray-500">
                {{
                  news.description.length > 100
                    ? `${news.description.substring(0, 100)}...`
                    : news.description
                }}
              </span>

              <span class="text-gray-500/40">{{
                moment(news.datePublished).startOf("ss").fromNow()
              }}</span>
            </div>
          </a>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { onMounted, ref } from "@vue/runtime-core";
import moment from "moment";
import getNews from "../composables/getNews";
import getCrypto from "../composables/getCrypto";

const { getNewsLists, newsLists } = getNews();
const { getCoinLists, topCoins } = getCrypto();
getNewsLists();
getCoinLists();

const activeButton = ref("All");

const handleSearch = async (cryptoName) => {
  activeButton.value = cryptoName;

  await getNewsLists(cryptoName);
};
</script>

<style lang="scss" scoped></style>
