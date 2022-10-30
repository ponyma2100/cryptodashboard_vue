import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import WatchList from "../views/WatchList.vue";
import News from "../views/News.vue";
import CryptoDetails from "../views/CryptoDetails.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      meta: {
        title: "Home",
      },
    },
    {
      path: "/watchlist",
      name: "watchlist",
      component: WatchList,
      meta: {
        title: "WatchList",
      },
    },
    {
      path: "/news",
      name: "news",
      component: News,
      meta: {
        title: "News",
      },
    },
    {
      path: "/crypto/:id",
      name: "CryptoDetails",
      component: CryptoDetails,

      props: true,
      deep: true,
    },
  ],
});

export default router;
