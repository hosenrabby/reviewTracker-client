// src/pages/AboutUs.jsx
import { motion } from "framer-motion";
import { Link } from "react-router";
import { FaStar } from "react-icons/fa";
import BlurText from "../../../ReactBits/BlurText/BlurText";

const AboutUs = () => {
    return (
        <>
            <title>ReviewTracker | About Us</title>
            <div className="max-w-6xl mx-auto px-4 py-16">
                {/* Hero Section */}
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <BlurText
                        text="About Review Tracker"
                        delay={400}
                        animateBy="words"
                        direction="top"
                        className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 justify-center mt-6"
                    />
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        Review Tracker is your go-to platform for tracking, managing, and
                        showcasing authentic customer reviews. Whether you run a business or
                        offer services, our app helps you build trust and grow with real
                        feedback.
                    </p>
                </motion.div>

                {/* Mission Section */}
                <motion.div
                    className="grid md:grid-cols-2 gap-8 items-center mb-16"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <img src="https://images.unsplash.com/photo-1556761175-4b46a572b786" alt="Our Mission" className="rounded-2xl shadow-lg" />
                    <div>
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-8 justify-center mt-6">
                            Our Mission
                        </h2>
                        <p className="text-gray-600 mb-4">
                            We aim to create a transparent connection between businesses and
                            customers. Our platform empowers users to share honest experiences
                            while giving businesses the tools they need to improve.
                        </p>
                        <p className="text-gray-600">
                            With our interactive carousel, rating system, and modern UI, your
                            reviews become more than just text — they become a visual story of
                            trust and satisfaction.
                        </p>
                    </div>
                </motion.div>

                {/* Features Section */}
                <motion.div
                    className="mb-16"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                >
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-8 text-center mt-6">
                        Why Choose Review Tracker?
                    </h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            {
                                title: "Interactive Review Carousel",
                                desc: "Smooth animations powered by Framer Motion make browsing reviews a delightful experience."
                            },
                            {
                                title: "Real-Time Ratings",
                                desc: "Powered by React Stars, ratings are visually appealing and easy to understand."
                            },
                            {
                                title: "Responsive & Modern Design",
                                desc: "TailwindCSS + DaisyUI ensure your reviews look great on any device."
                            }
                        ].map((feature, index) => (
                            <motion.div
                                key={index}
                                className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition"
                                whileHover={{ scale: 1.05 }}
                            >
                                <FaStar className="text-yellow-400 text-3xl mb-4" />
                                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                                <p className="text-gray-600">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Call to Action */}
                <motion.div
                    className="text-center"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-8 text-center mt-6">
                        Ready to Share Your Experience?
                    </h2>
                    <p className="text-gray-600 mb-6">
                        Join our growing community of satisfied customers and trusted
                        businesses.
                    </p>
                    <Link to="/services">
                        <button className={`py-2 px-4 transition rounded-md font-semibold text-black border border-[#211C2A] cursor-pointer hover:shadow-[0_0_0_1px_#211C2A,0_5px_0_0_#211C2A]`}>
                            Add Review
                        </button>
                    </Link>
                </motion.div>
            </div>
        </>
    );
};

export default AboutUs;
