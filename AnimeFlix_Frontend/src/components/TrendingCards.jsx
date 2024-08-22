import { Swiper, SwiperSlide } from "swiper/react";
import CardsType1 from "./CardsType1";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FreeMode } from "swiper/modules";

import "swiper/css/navigation";
import "swiper/css/free-mode";

import "swiper/css";

export default function ({ trendingAnimes }) {
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/anime/info?id=${encodeURIComponent(id)}`);
    window.location.reload();
  };
  return (
    <>
      {/* <div className="pb-8">
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
              <div className="absolute bg-pink-500  z-50  ">
                <button className="text-5xl">{">"}</button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div> */}
      <div className="grid  w-full grid-cols-2 gap-4 lg:grid-cols-5 ">
        {trendingAnimes.map((trends, index) => (
          <div
            key={index}
            onClick={() => handleClick(trends.id)}
            className="relative w-full transform cursor-pointer items-center gap-2 rounded-lg border border-slate-800 bg-slate-600/50 p-4 shadow-lg transition-transform hover:scale-105 hover:bg-slate-700"
          >
            <div
              className="absolute inset-0 rounded-lg bg-cover bg-center opacity-20"
              style={{
                backgroundImage: `url(${trends.poster})`,
              }}
            ></div>
            <div className="relative flex h-1/4 items-center ">
              <div className="my-auto w-1/5">
                <p className="text-center text-lg font-semibold italic text-orange-400 lg:text-2xl">
                  #{trends.rank}
                </p>
              </div>
              <div className="my-auto w-4/5 pl-4">
                <p className="text-md relative line-clamp-2 text-start font-medium text-orange-50 lg:text-lg">
                  {trends.name}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
