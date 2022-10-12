import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";

import "./CardUserGive.css";

// import required modules
import { EffectCards ,Autoplay} from "swiper";

export default function CardUserGive() {
  return (
    <>
      <Swiper
      
      autoplay={{
        delay: 5000,
        disableOnInteraction: true,
      }}
        effect={"cards"}
        grabCursor={true}
        modules={[Autoplay,EffectCards]}
        className="mySwiper"
      >
        <SwiperSlide  className="mySwiper-slide" >
            <h1>
                Dons en 
                Argent
            </h1>
        </SwiperSlide>
        <SwiperSlide  className="mySwiper-slide">
            
            <h1>
                Dons en 
                Natures
            </h1>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
