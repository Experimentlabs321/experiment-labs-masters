import React from 'react';
import Footer from '../Shared/Footer';
import { Outlet } from 'react-router-dom';
import KoreaNav from '../Shared/KoreaNav';

const OnePagerKoreaLayout = () => {
    return (
        <div>
            <KoreaNav></KoreaNav>
            <Outlet />
            <Footer />
        </div>
    );
};

export default OnePagerKoreaLayout;