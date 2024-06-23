import axios from "axios";
export default async () => {
  const getData = async () => {
    try {
      const response = await axios.get(
        "REACT_PUBLIC_ANIME_URL/anime/home",
        { crossdomain: true }
      );
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
