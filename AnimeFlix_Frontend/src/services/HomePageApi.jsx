import axios from "axios";
export default async () => {
  const getData = async () => {
    try {
      const response =
        (await axios.get(
          `${import.meta.env.VITE_ANIME_URL_SECONDARY}/home`,
          {
            crossdomain: true,
          },
        )) ||
        (await axios.get(`${import.meta.env.VITE_ANIME_URL}/home`, {
          crossdomain: true,
        }));
      const homeData = response.data;
      return homeData;
    } catch (error) {
      console.error("Error in fetching banners:", error);
      return null;
    }
  };
  const data = await getData();

  return data;
};
