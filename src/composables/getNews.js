import { ref } from "vue";

const options = {
  method: "GET",
  headers: {
    "X-BingApis-SDK": "true",
    "X-RapidAPI-Key": "1d13827cf3msh221ed2de212c7bcp1960b5jsn4c2b3f1fc626",
    "X-RapidAPI-Host": "bing-news-search1.p.rapidapi.com",
  },
};

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
