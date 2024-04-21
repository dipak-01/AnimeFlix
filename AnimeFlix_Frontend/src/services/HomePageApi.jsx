import axios from "axios";
export default async () => {
  const getData = async () => {
    try {
      const response = await axios.get(
        "https://aniwatch-api-euo9.onrender.com/anime/home",
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
  console.log(data);
  return data;
};
