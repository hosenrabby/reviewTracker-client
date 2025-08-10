import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import { FaStar } from "react-icons/fa";

const reviews = [
    {
        id: 1,
        name: "Emily Stone",
        date: "6/15/2023",
        image: "https://randomuser.me/api/portraits/women/44.jpg",
        rating: 5,
        comment:
            "It's intuitive, fast, and incredibly accurate! Excellent service and very professional. Highly recommend!"
    },
    {
        id: 2,
        name: "John Doe",
        date: "7/10/2023",
        image: "https://randomuser.me/api/portraits/men/32.jpg",
        rating: 4,
        comment:
            "Great experience overall. A few small hiccups, but the team handled them well."
    },
    {
        id: 3,
        name: "Sophia Lee",
        date: "8/02/2023",
        image: "https://randomuser.me/api/portraits/women/65.jpg",
        rating: 5,
        comment:
            "Absolutely fantastic service! I will definitely use it again and recommend it to others."
    }
];

const ReviewSlider = () => {
    return (
        <div className=" mx-auto px-4 py-4 rounded-2xl">
            <Swiper
                modules={[Pagination, Autoplay]}
                slidesPerView={1}
                pagination={{ clickable: true }}
                autoplay={{ delay: 4000, disableOnInteraction: false }}
                loop
                className="pb-10" // space for dots
            >
                {reviews.map((review) => (
                    <SwiperSlide key={review.id}>
                        <div className="rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                            {/* Top Section - Review Text */}
                            <div className="bg-gradient-to-b from-gray-900 to-blue-900 p-6 py-10 text-white">
                                <p className="italic text-lg leading-relaxed">
                                    "{review.comment}"
                                </p>
                            </div>

                            {/* Bottom Section - Reviewer Info */}
                            <div className="flex items-center justify-between bg-white p-4">
                                <div className="flex items-center gap-3">
                                    <img
                                        src={review.image}
                                        alt={review.name}
                                        className="w-12 h-12 rounded-full border-2 border-white shadow"
                                    />
                                    <div>
                                        <p className="font-semibold">{review.name}</p>
                                        <div className="flex text-yellow-400">
                                            {Array.from({ length: review.rating }).map((_, idx) => (
                                                <FaStar key={idx} />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right text-sm">
                                    <p className="font-medium text-gray-700">Review Date</p>
                                    <p className="text-gray-500">{review.date}</p>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default ReviewSlider;
