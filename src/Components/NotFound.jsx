import React from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { FiArrowLeft } from 'react-icons/fi';
import Lottie from 'lottie-react';
import notFoundAnim from '../../public/assets/404Lottie.json';

const NotFound = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center bg-base-100 text-center px-4 min-h-[calc(100vh-352px)]"
        >
            <div className="max-w-md">
                <Lottie animationData={notFoundAnim} loop={true} className="w-full h-72" />
                <h1 className="text-4xl font-bold mt-6 text-base-content">Page Not Found</h1>
                <p className="mt-4 text-base-content">
                    Sorry, the page you're looking for doesn't exist. You might have followed a broken link or entered a wrong URL.
                </p>
                <Link to="/">
                    <button className={`flex justify-center items-center gap-2 py-2 px-4 mt-5 w-full mx-auto transition rounded-md font-semibold text-black border border-[#211C2A] cursor-pointer hover:shadow-[0_0_0_1px_#211C2A,0_5px_0_0_#211C2A]`}>
                       <FiArrowLeft className="text-lg" /> Back To Home
                    </button>
                </Link>
            </div>
        </motion.div>
    );
};

export default NotFound;
