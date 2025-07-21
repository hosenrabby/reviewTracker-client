import React, { use, useEffect, useState } from 'react';
import Slider from './Slider';
import BestCompanies from './BestCompanies';
import RicentReviews from './RicentReviews';
import HowItWorks from './HowItWorks';
import PricingPlan from './PricingPlan';
import axios from 'axios';
import CounterUp from './CountUp';
import OurPartners from './OurPartners';
import Spinner from '../../Components/Spinner';
import { AuthContext } from '../../Context/AuthContext';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const Home = () => {
    const { loading } = use(AuthContext)
    const axiosInstanceIntercept = useAxiosSecure()
    const [serviceData, setServiceData] = useState([])

    useEffect(() => {
        axiosInstanceIntercept.get('/servicesByLimit').then(res => { setServiceData(res.data) })
    }, [])
    // console.log(loading)
    if (loading) {
        return <Spinner></Spinner>
    }
    return (
        <>
            <title>ReviewTracker | Home </title>
            <main className='min-h-[calc(100vh-352px)]'>
                <Slider></Slider>
                <BestCompanies serviceData={serviceData}></BestCompanies>
                <RicentReviews ></RicentReviews>
                <HowItWorks></HowItWorks>
                <CounterUp></CounterUp>
                <OurPartners></OurPartners>
                <PricingPlan></PricingPlan>
            </main >
        </>
    );
};

export default Home;