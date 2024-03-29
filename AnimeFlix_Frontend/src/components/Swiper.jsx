import HomePageApi from '../services/HomePageApi';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { Pagination } from 'swiper/modules';
 
import { useState, useEffect } from 'react';
import BannerSlides from './BannerSlides';

import 'swiper/css/pagination';
import 'swiper/css/navigation';
// Import Swiper styles
import 'swiper/css';
 

function Swiperr({banners}) {
 
  // const [banners, setBanners] = useState([]);
  // const [loading, setLoading] = useState(true);
  // useEffect(() => {
  //   const getBanners = async () => {
  //     try {
  //       const response = await HomePageApi();
  //       const banners = response.spotlightAnimes;
  //       console.log(banners);
  //       setBanners(banners);
  //       setLoading(false);
  //     } catch (error) {
  //       console.error("Error in fetching banners:", error);
  //     }
  //   };

  //   getBanners();
  // }, []);
  // if (loading) {
  //   return <div>Loading...</div>;
  // }
  return (
    <>
      <Swiper
        // banners={banners}
        // autoHeight={true}
     
        pagination={{ dynamicBullets: true }}
        // enabled={true}
        modules={[Pagination, Autoplay]}
        loop={true}
        autoplay={{ delay: 4000, disableOnInteraction: false, }}
        className="mySwiper  "
        spaceBetween={50}
        slidesPerView={1}

      // onSwiper={(swiper) => console.log(swiper)}
      >

        {banners.map((banner, index) => (
          <SwiperSlide className='h-[600px]' key={index}>
            <BannerSlides poster={banner.poster}
              description={banner.description}
              name={banner.name}
              rank={banner.rank}
              otherInfo={banner.otherInfo}
              episodes={banner.episodes} />
          </SwiperSlide>
        ))}


      </Swiper>

    </>
  );
};

export default Swiperr;