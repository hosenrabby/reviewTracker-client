import React from 'react';
import Navbar from '../Components/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Components/Footer';
import ScrollToTop from '../Components/ScrollToTop';

const RootLayout = () => {
    return (
        <>
            <ScrollToTop />
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </>
    );
};

export default RootLayout;