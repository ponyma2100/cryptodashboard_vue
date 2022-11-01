<template>
  <div class="flex flex-col gap-y-4 items-center py-8 w-24 bg-gray-900">
    <button class="p-2 bg-opacity-20 rounded-xl bg-primary">
      <StoreIcon />
    </button>
    <div class="flex flex-col gap-y-4 items-end self-end">
      <div
        v-for="menu in menus"
        :key="menu"
        :class="
          activeMenu === menu.name ? 'bg-gray-800 rounded-xl relative ' : ''
        "
      >
        <RouterLink :to="{ name: menu.name }">
          <button
            class="p-4 my-4 mr-4 ml-3 rounded-xl"
            :class="
              activeMenu === menu.name
                ? 'text-white shadow-primary bg-primary'
                : 'text-primary'
            "
          >
            <Component :is="menu.icon" class="w-6 h-6 fill-current" />
          </button>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import StoreIcon from "../icons/store.svg";
import HomeIcon from "../icons/home.svg";
import WatchIcon from "../icons/watchlist.svg";
import NotificationIcon from "../icons/notification.svg";
import { ref } from "@vue/reactivity";
import { useRouter, useRoute } from "vue-router";
const router = useRouter();

const route = useRoute();

const activeMenu = ref("");

router.afterEach((to, from) => {
  if (to.name === "CryptoDetails") {
    activeMenu.value = from.name;
  } else {
    activeMenu.value = route.name;
  }
});

const menus = [
  { name: "home", icon: HomeIcon },
  { name: "watchlist", icon: WatchIcon },
  { name: "news", icon: NotificationIcon },
];
</script>

<style lang="scss" scoped></style>
