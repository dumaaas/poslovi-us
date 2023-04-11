import logoPic from "../../public/logo-white.png";
import Image from "next/image";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";

// Import Swiper styles
import "swiper/css";
export default function ClientBanner(props) {
  return (
    <div>
      {props.clients && (
        <div className="py-6 bg-red-500">
          <div className="container flex items-center justify-between gap-[60px]">
            <div class="text-sm font-medium text-white"> Ko nam veruje? </div>
            <Swiper
              slidesPerView={5}
              centeredSlides={true}
              loop={true}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              loopedSlidesLimit={false}
              modules={[Autoplay]}
              onSlideChange={() => console.log("slide change")}
              onSwiper={(swiper) => console.log(swiper)}
              className="flex-1 flex items-center justify-between gap-[20px]"
            >
              {props.clients.map((item) => {
                return (
                  <SwiperSlide key={item.id}>
                    {" "}
                    <img
                      src={item.url}
                      alt="prologs-logo"
                      className="lg:w-[100px] w-[100px]"
                    />
                  </SwiperSlide>
                );
              })}
            </Swiper>
            <div class="text-sm font-medium text-white"> I 2000+ više </div>
          </div>
        </div>
      )}
    </div>
  );
}
