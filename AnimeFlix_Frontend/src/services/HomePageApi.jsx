import axios from "axios";
export default async () => {
    const getBanners = async () => {
        try {
            const response = await axios.get("http://localhost:3000/home", { crossdomain: true });
            const homeData = response.data;
            return homeData
        } catch (error) {
            console.error("Error in fetching banners:", error);
            return null
        }
    };
    const data = await getBanners();
    console.log(data);
    return data

}