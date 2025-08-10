import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
const CounterUp = () => {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.5
    });
        const axiosInstanceIntercept = useAxiosSecure()
        const [serviceData, setServiceData] = useState([])
        const [reviewData, setReviewData] = useState([])
        const [userData, setUserData] = useState([])
        useEffect(() => {
            axiosInstanceIntercept.get('/all-services').then(res => { setServiceData(res.data) })
            axiosInstanceIntercept.get('/all-reviews').then(res => { setReviewData(res.data) })
            axiosInstanceIntercept.get('/all-users').then(res => { setUserData(res.data) })
        }, [])
    return (
        <div className="w-10/12 mx-auto py-12 px-4 my-10">
            <div ref={ref} className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                <div>
                    <h2 className="text-4xl md:text-6xl font-bold text-base-content">{inView ? <CountUp start={0} end={userData.length} duration={3.5}></CountUp>:0}+</h2>
                    <h3 className="text-3xl font-semibold text-gray-900 mt-2">Users</h3>
                    <p className="text-gray-500 mt-2">
                        We always provide people a complete solution upon focused of any business
                    </p>
                </div>
                <div>
                    <h2 className="text-4xl md:text-6xl font-bold text-base-content">{inView ? <CountUp start={0} end={serviceData.length} duration={3.5}></CountUp>:0}+</h2>
                    <h3 className="text-3xl font-semibold text-gray-900 mt-2">Services</h3>
                    <p className="text-gray-500 mt-2">
                        We always provide people a complete solution upon focused of any business
                    </p>
                </div>
                <div>
                    <h2 className="text-4xl md:text-6xl font-bold text-base-content">{inView ? <CountUp start={0} end={reviewData.length} duration={3.5}></CountUp>:0}+</h2>
                    <h3 className="text-3xl font-semibold text-gray-900 mt-2">Reviews</h3>
                    <p className="text-gray-500 mt-2">
                        We always provide people a complete solution upon focused of any business
                    </p>
                </div>
                <div>
                    <h2 className="text-4xl md:text-6xl font-bold text-base-content">{inView ? <CountUp start={0} end={999} duration={3.5}></CountUp>:0}+</h2>
                    <h3 className="text-3xl font-semibold text-gray-900 mt-2">Happy Clients</h3>
                    <p className="text-gray-500 mt-2">
                        We always provide people a complete solution upon focused of any business
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CounterUp;