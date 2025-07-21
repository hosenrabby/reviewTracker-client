import React from 'react';
import Threads from '../../../ReactBits/Threads/Threads';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import Lottie from 'lottie-react';
import lottislider1 from '../../../public/assets/lottiSlider1.json'
import lottislider2 from '../../../public/assets/lottiSlider2.json'
import lottislider3 from '../../../public/assets/lottiSlider3.json'
import BlurText from "../../../ReactBits/BlurText/BlurText";
const Slider = () => {
  return (
    <div className="relative bg-gray-500/10 min-h-[700px] -mt-24 pb-24 md:pb-16 review-bg">
      {/* Background Threads */}
      <div className="absolute inset-0 z-0">
        <Threads amplitude={2.5} distance={0.5} enableMouseInteraction={true} />
      </div>

      {/* Foreground Swiper */}
      <div className="relative md:w-8/12 mx-auto z-10 pt-16 md:pt-0 px-6">
        <Swiper
          modules={[Navigation, Autoplay, EffectFade]}
          slidesPerView={1}
          // navigation
          loop={true}
          autoplay={{ delay: 8000 }}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          speed={1500}
          className="h-full"
        >

          <SwiperSlide>
            <div className="relative w-full flex flex-col-reverse md:flex-row justify-between items-center md:mt-24">
              <div>
                <BlurText
                text="Check All Peoples reviews in one Place"
                delay={200}
                animateBy="words"
                direction="top"
                className="text-5xl md:text-6xl xl:text-7xl font-bold mb-8"
            />
                <p className="leading-relaxed pb-8 text-[#375A64]">Join 500 educators exploring AI, pedagogy, and innovation. Network, learn, and shape the future of learning in dynamic hands-on workshops.</p>
                <button className={`py-2 px-4 ms-2 transition rounded-full font-semibold text-black border border-[#211C2A] cursor-pointer hover:shadow-[0_0_0_1px_#211C2A,0_5px_0_0_#211C2A]`}>
                  Explore Services
                </button>
              </div>

              <Lottie style={{ width: '98%' }} animationData={lottislider1}></Lottie>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="relative w-full flex flex-col-reverse md:flex-row justify-between items-center md:mt-28">
              <div>
                <BlurText
                text="Give Reviews for best service Providers"
                delay={200}
                animateBy="words"
                direction="top"
                className="text-5xl md:text-6xl xl:text-7xl font-bold mb-8"
            />
                <p className="leading-relaxed pb-8 text-[#002DA8]">Join 500 educators exploring AI, pedagogy, and innovation. Network, learn, and shape the future of learning in dynamic hands-on workshops.</p>
              </div>

              <Lottie style={{width:'100%'}} animationData={lottislider2}></Lottie>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="relative w-full flex flex-col-reverse md:flex-row justify-between items-center md:mt-20">
              <div>
                <BlurText
                text="Manage All of your reviews in reviewTracker"
                delay={200}
                animateBy="words"
                direction="top"
                className="text-5xl md:text-6xl xl:text-7xl font-bold mb-8"
            />
                <p className="leading-relaxed pb-8 text-accent">Join 500 educators exploring AI, pedagogy, and innovation. Network, learn, and shape the future of learning in dynamic hands-on workshops.</p>
              </div>

              <Lottie style={{ width: '80%' }} animationData={lottislider3}></Lottie>
            </div>
          </SwiperSlide>

        </Swiper>
      </div>
    </div>
  );
};

export default Slider;
