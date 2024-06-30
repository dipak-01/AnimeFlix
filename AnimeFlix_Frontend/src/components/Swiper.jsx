 import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { Pagination } from "swiper/modules";

import { useState, useEffect } from "react";
import BannerSlides from "./BannerSlides";

import "swiper/css/pagination";
import "swiper/css/navigation";
 import "swiper/css";

function Swiperr({ banners }) {
 
  return (
    <>
      <Swiper
       

        pagination={{ dynamicBullets: true }}
         modules={[Pagination, Autoplay]}
        loop={true}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        className="mySwiper  "
        spaceBetween={50}
        slidesPerView={1}

       >
        {banners.map((banner, index) => (
          <SwiperSlide className="h-[600px]" key={index}>
            <BannerSlides
            id={banner.id}
              poster={banner.poster}
              description={banner.description}
              name={banner.name}
              rank={banner.rank}
              otherInfo={banner.otherInfo}
              episodes={banner.episodes}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}

export default Swiperr;
