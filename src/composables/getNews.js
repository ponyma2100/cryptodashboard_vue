import { ref } from "vue";

const options = {
  method: "GET",
  headers: {
    "X-BingApis-SDK": "true",
    "X-RapidAPI-Key": import.meta.env.VITE_RAPIDAPI_KEY,
    "X-RapidAPI-Host": "bing-news-search1.p.rapidapi.com",
  },
};

const apiKey = import.meta.env.VITE_RAPIDAPI_KEY;

const getNews = () => {
  let newsLists = ref([]);

  // get news
  const getNewsLists = async (cryptoSearch = "cryptocurrency") => {
    try {
      const response = await fetch(
        `https://bing-news-search1.p.rapidapi.com/news/search?q=${cryptoSearch}&count=50&sortBy=time&freshness=Day&textFormat=Raw&safeSearch=Off`,
        options
      );
      const data = await response.json();

      newsLists.value = await data.value;
    } catch (error) {
      console.log(error);
    }
  };

  return { getNews, getNewsLists, newsLists };
};

export default getNews;
