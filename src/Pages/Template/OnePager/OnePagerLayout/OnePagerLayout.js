import React from 'react';
import Navbar from '../Shared/Navbar';
import Footer from '../Shared/Footer';
import { Outlet } from 'react-router-dom';

const OnePagerLayout = () => {
    return (
        <div>
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    );
};

export default OnePagerLayout;