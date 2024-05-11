import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';


// Import Swiper styles
import 'swiper/css';
 
import 'swiper/css/navigation';
 
// import required modules
import { Navigation } from 'swiper/modules';
export default function App() {
    const dates = eachDayOfInterval({
        start: startOfMonth(new Date()),
        end: endOfMonth(new Date()),
      });
  return (
    <>
      <Swiper
        slidesPerView={7}
        spaceBetween={4}
        navigation={{
          clickable: true,
        }}
        modules={[Navigation]}
        className="mySwiper w-2/3"
      >
        {dates.map((date, index) => (
        <SwiperSlide key={index} className='text-lg border rounded-sm bg-hookers-green-600 my-4 py-2  '> 
          {format(date, 'eeee, do')}
        </SwiperSlide>
      ))}
      </Swiper>
    </>
  );
}

 