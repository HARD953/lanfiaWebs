import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import "./CarouselHeader.css";

// import required modules
import { EffectCoverflow, Autoplay } from "swiper";

export default function CarouselHeader(props) {
  return (
    <>
      <Swiper
      autoplay={{
          delay: 3000,
          disableOnInteraction: true,
        }}
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={true}
        modules={[Autoplay,EffectCoverflow]}
        className="mySwiperHeaer"
      >
        {props.imagesCible.map((item,index)=>{
           return( <SwiperSlide className='mySwiperHeaer-slide' key={index}  >
            <img className="img-fluid img-header-slider"  src={item.image} />
            </SwiperSlide>)
        })

        }
      
      </Swiper>
    </>
  );
}
