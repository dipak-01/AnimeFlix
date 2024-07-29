import { Swiper, SwiperSlide } from "swiper/react";
import CardsType1 from "./CardsType1";

import { FreeMode } from "swiper/modules";

import "swiper/css/navigation";
import "swiper/css/free-mode";

import "swiper/css";

export default function ({ trendingAnimes }) {
  return (
    <>
      <div className="pb-8">
        <Swiper
           
          spaceBetween={0}
          freeMode={true}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            300: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            400: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            492: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            686: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
            880: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
            1074: {
              slidesPerView: 5,
              spaceBetween: 20,
            },
            1268: {
              slidesPerView: 6,
              spaceBetween: 10,
            },
            1462: {
              slidesPerView: 7,
              spaceBetween: 20,
            },
            1656: {
              slidesPerView: 7,
              spaceBetween: 20,
            },
          }}
          modules={[FreeMode]}
          className="mySwiper"
        >
          {trendingAnimes.map((trends, index) => (
            <SwiperSlide
              className="m-0  h-60 gap-0 lg:h-72 lg:gap-4"
              key={index}
            >
              <CardsType1
                id={trends.id}
                name={trends.name}
                rank={trends.rank}
                poster={trends.poster}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}
