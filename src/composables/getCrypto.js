import { ref } from "vue";
import GraphIcon from "../icons/graph.svg";

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "1d13827cf3msh221ed2de212c7bcp1960b5jsn4c2b3f1fc626",
    "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
  },
};

const getCrypto = () => {
  let coinLists = ref([]);
  let topCoins = ref([]);
  let coinDetails = ref({});
  let coinHistory = ref([])
  let stats = ref([]);
  let genericStats = ref([]);

  // get coinslist
  const getCoinLists = async () => {
    try {
      const response = await fetch(
        "https://coinranking1.p.rapidapi.com/coins?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h&tiers%5B0%5D=1&orderBy=marketCap&orderDirection=desc&limit=50&offset=0",
        options
      );
      const res = await response.json();
      const data = await res.data;

      coinLists.value = await data.coins;
      coinLists.value.map((coin) => (coin["fav"] = false));

      topCoins.value = coinLists.value.slice(0, 9);
    } catch (error) {
      console.log(error);
    }
  };

  // get details
  const getDetails = async (id = "Qwsogvtv82FCd") => {
    try {
      const response = await fetch(
        `https://coinranking1.p.rapidapi.com/coin/${id}?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h`,
        options
      );
      const res = await response.json();
      const data = await res.data;

      coinDetails.value = await data.coin;
      coinDetails.value["fav"] = false;

      stats.value = [
        {
          title: "Price to USD",
          value: `$ ${coinDetails.value.price}`,
          icon: GraphIcon,
        },
        { title: "Rank", value: coinDetails.value.rank, icon: GraphIcon },
        {
          title: "24h Volume",
          value: `$ ${coinDetails.value["24hVolume"]}`,
          icon: GraphIcon,
        },
        {
          title: "Market Cap",
          value: `$ ${coinDetails.value.marketCap}`,
          icon: GraphIcon,
        },
        {
          title: "All-time-high(daily avg.)",
          value: `$ ${coinDetails.value.allTimeHigh.price}`,
          icon: GraphIcon,
        },
      ];

      genericStats.value = [
        {
          title: "Number Of Markets",
          value: coinDetails.value.numberOfMarkets,
          icon: GraphIcon,
        },
        {
          title: "Number Of Exchanges",
          value: coinDetails.value.numberOfExchanges,
          icon: GraphIcon,
        },
        {
          title: "Aprroved Supply",
          value: coinDetails.value.supply.confirmed,
          icon: GraphIcon,
        },
        {
          title: "Total Supply",
          value: `$ ${coinDetails.value.supply.total}`,
          icon: GraphIcon,
        },
        {
          title: "Circulating Supply",
          value: `$ ${coinDetails.value.supply.circulating}`,
          icon: GraphIcon,
        },
      ];
    } catch (error) {
      console.log(error);
    }
  };
  const getHistory = async (id = "Qwsogvtv82FCd", timePeriod="24h") => {
    try {
      const response = await fetch(
        `https://coinranking1.p.rapidapi.com/coin/${id}/history?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=${timePeriod}`,
        options
      );
      const res = await response.json();
      const data = await res.data;

      coinHistory.value = await data.history;

    } catch (error) {
      console.log(error);
    }
  };

  return {
    getCrypto,
    getCoinLists,
    getDetails,
    getHistory,
    coinLists,
    topCoins,
    coinDetails,
    stats,
    genericStats,
    coinHistory
  };
};

export default getCrypto;
