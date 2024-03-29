import { Swiper, SwiperSlide } from "swiper/react";
import CardsType1 from "./CardsType1";
import HomePageApi from "../services/HomePageApi";
import { useState, useEffect } from "react";
import { FreeMode } from 'swiper/modules';


import "swiper/css/navigation";
import 'swiper/css/free-mode';

import "swiper/css";



export default function () {
    const [trendingAnimes, settrendingAnimes] = useState([]);

    useEffect(() => {
        const fetchtrendingAnimes = async () => {
            const data = await HomePageApi();
             settrendingAnimes(data.trendingAnimes);
        };

        fetchtrendingAnimes();
    }, []);

    return (
        <>
            <div className="pb-8">
                <Swiper
                    slidesPerView={8}
                    spaceBetween={30}
                    freeMode={true}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[FreeMode]}
                    className="mySwiper"
                >
                    {trendingAnimes.map((trends, index) => (
                        <SwiperSlide className="w-[80px] h-[220px]" key={index} ><CardsType1 name={trends.name} rank={trends.rank} poster={trends.poster} /></SwiperSlide>
                    ))

                    }

                </Swiper>
            </div>
        </>
    );
}
