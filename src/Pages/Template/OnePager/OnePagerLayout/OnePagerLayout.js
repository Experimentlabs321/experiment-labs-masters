import React from 'react';
import Navbar from '../Shared/Navbar';
import { Outlet } from '@mui/icons-material';
import Footer from '../Shared/Footer';

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