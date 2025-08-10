import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { motion } from 'framer-motion';
import 'swiper/css';
import 'swiper/css/autoplay';
import BlurText from '../../../ReactBits/BlurText/BlurText';

const partners = [
    {
        name: "Google",
        logo: "https://yt3.googleusercontent.com/2eI1TjX447QZFDe6R32K0V2mjbVMKT5mIfQR-wK5bAsxttS_7qzUDS1ojoSKeSP0NuWd6sl7qQ=s900-c-k-c0x00ffffff-no-rj",
    },
    {
        name: "Amazon",
        logo: "https://www.tfe.agency/wp-content/uploads/2022/03/amazon.png",
    },
    {
        name: "Meta",
        logo: "https://static.vecteezy.com/system/resources/previews/004/201/564/non_2x/meta-social-network-emblem-blue-stylish-letter-m-or-mobius-band-vector.jpg",
    },
    {
        name: "Microsoft",
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpfaGb1Iq3x4gKkiT5ZHxKeqxLR1m5ZvtrOQ&s",
    },
    {
        name: "Netflix",
        logo: "https://cdn.worldvectorlogo.com/logos/netflix-3.svg",
    },
    {
        name: "LinkedIn",
        logo: "https://cdn.worldvectorlogo.com/logos/linkedin-icon-2.svg",
    },
];

const OurPartners = () => {
    return (
        <section className="w-11/12 md:w-9/12 mx-auto my-20">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                viewport={{ once: true }}
            >
                <BlurText
                    text="Meet Our Partners"
                    delay={400}
                    animateBy="words"
                    direction="top"
                    className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 justify-center mt-6"
                />

                <Swiper
                    modules={[Autoplay]}
                    spaceBetween={30}
                    slidesPerView={2}
                    autoplay={{ delay: 2000 }}
                    loop={true}
                    breakpoints={{
                        640: { slidesPerView: 3 },
                        768: { slidesPerView: 4 },
                        1024: { slidesPerView: 5 },
                    }}
                >
                    {partners.map((partner, idx) => (
                        <SwiperSlide key={idx}>
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                className="bg-white rounded-xl shadow-lg p-6 flex flex-col justify-center items-center h-32 my-4"
                            >
                                <img
                                    src={partner.logo}
                                    alt={partner.name}
                                    className="max-h-12 object-contain"
                                />
                                <p className='text-3xl font-semibold mt-4'>{partner.name}</p>
                            </motion.div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </motion.div>
        </section>
    );
};

export default OurPartners;
