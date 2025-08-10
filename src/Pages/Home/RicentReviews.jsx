import React from 'react';
import ReviewSlider from '../../Components/ReviewSlider';

const RicentReviews = () => {
    return (
        <>

            <div className='w-11/12 md:w-9/12 mt-16 mx-auto flex flex-col md:flex-col lg:flex-row justify-between items-center gap-4 md:gap-5 lg:gap-10'>

                <div className='w-11/12 md:w-5/12 border border-gray-500 rounded-2xl'>
                    <ReviewSlider />
                </div>

                <div className='mx-10 py-6'>
                    <h1 className='text-3xl md:text-5xl text-base-content font-bold'>Recent reviews from this valuable customers.</h1>
                    <p className='text-base-content mt-8'>This website showcases top global companies offering premium services in banking, fitness, fashion, travel, technology, and luxury lifestyle. And get theme rivews</p>
                </div>
            </div>
        </>
    );
};

export default RicentReviews;