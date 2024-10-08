import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Pagination } from "swiper/modules";

import { useRef } from "react";
import BannerSlides from "./BannerSlides";

import "swiper/css/pagination";

function Swiperr({ banners }) {
  const swiperRef = useRef(null);

  const handlePrev = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  const handleNext = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
    }
  };
  return (
    <>
      <Swiper
        ref={swiperRef}
        modules={[Navigation, Pagination]}
        navigation
        pagination={{ dynamicBullets: true }}
        loop={true}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        className="  "
        spaceBetween={50}
        slidesPerView={1}
      >
        {banners.map((banner) => (
          <SwiperSlide className=" h-auto" key={banner.id}>
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

        <button
          className="custom-swiper-button custom-swiper-button-prev hidden "
          onClick={handlePrev}
        >
          <i className="fa-solid fa-chevron-left"></i>
        </button>
        <button
          className="custom-swiper-button custom-swiper-button-next"
          onClick={handleNext}
        >
          <i className="fa-solid fa-chevron-right"></i>
        </button>
      </Swiper>
    </>
  );
}

export default Swiperr;
