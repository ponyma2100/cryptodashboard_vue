import { defineStore } from "pinia";
import { ref } from "vue";
import getCrypto from "../composables/getCrypto";

const { getCoinLists, coinLists, topCoins } = getCrypto();
const { getDetails, coinDetails, stats, genericStats } = getCrypto();

export const useCryptoStore = defineStore("cryptoStore", {
  state: () => ({
    cryptoList: [],
    topCrypto: topCoins,
    cryptoDetails: [],
    stats: [],
    genericStats: [],
    recentList: JSON.parse(localStorage.getItem("recentIds")) || [
      "Qwsogvtv82FCd",
    ],
    // recentLists: [],
    favCryptoIds: JSON.parse(localStorage.getItem("favCryptoIds")) || [
      "Qwsogvtv82FCd",
    ],
  }),
  getters: {
    matchingFav: (state) => {
      if (state.favCryptoIds.length > 0) {
        state.favCryptoIds.find((id) => {
          state.cryptoList.find((coin) => {
            if (coin.uuid === id) {
              coin.fav = true;
            }
          });
        });
        return state.cryptoList;
      } else {
        return state.cryptoList;
      }
    },
    favCrypto: (state) => {
      if (state.favCryptoIds.length > 0) {
        state.favCryptoIds.find((id) => {
          state.cryptoList.find((coin) => {
            if (coin.uuid === id) {
              coin.fav = true;
            }
          });
        });
        return state.cryptoList.filter((c) => c.fav);
      } else {
        return;
      }
    },

    getRecentList: (state) => {
      let recentLists = [];
      state.recentList.find((item) => {
        state.cryptoList.filter((c) => {
          if (c.uuid === item) {
            recentLists.push(c);
          }
        });
      });
      return recentLists.slice(-5);
    },
  },
  actions: {
    async getCryptoList() {
      await getCoinLists();
      this.cryptoList = coinLists.value;
    },
    async getCryptoDetails(id) {
      await getDetails(id);
      this.cryptoDetails = coinDetails.value;
      this.cryptoMatchingFav(id);
      this.stats = stats.value;
      this.genericStats = genericStats.value;
    },

    cryptoMatchingFav(id) {
      if (this.favCryptoIds.length < 0) return;
      this.favCryptoIds.filter((c) => {
        if (c === id) {
          this.cryptoDetails["fav"] = true;
          return this.cryptoDetails;
        } else {
          return this.cryptoDetails;
        }
      });
    },
    addFav(id) {
      console.log("add", id);
      this.cryptoDetails["fav"] = true;

      this.cryptoList.find((c) => {
        if (c.uuid === id && !this.favCryptoIds.includes(c.uuid)) {
          c.fav = true;
          this.favCryptoIds.push(c.uuid);
          localStorage.setItem(
            "favCryptoIds",
            JSON.stringify(this.favCryptoIds)
          );
        }
      });
    },

    removeFav(id) {
      console.log("remove", id);
      this.cryptoDetails["fav"] = false;

      this.cryptoList.find((c) => {
        if (c.uuid === id && this.favCryptoIds.includes(c.uuid)) {
          c.fav = false;
          this.favCryptoIds = this.favCryptoIds.filter((id) => {
            return id !== c.uuid;
          });

          localStorage.setItem(
            "favCryptoIds",
            JSON.stringify(this.favCryptoIds)
          );
        }
      });
    },

    handleRecent(uuid) {
      this.recentList = JSON.parse(localStorage.getItem("recentIds")) || [];

      if (this.recentList.includes(uuid)) return;

      this.recentList.push(uuid);

      localStorage.setItem(
        "recentIds",
        JSON.stringify(this.recentList.slice(-5))
      );
    },
  },
});
