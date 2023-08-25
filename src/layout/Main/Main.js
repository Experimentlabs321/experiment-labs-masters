import React from 'react';
import Footer from '../../Pages/Shared/Footer/Footer';
import { Outlet } from 'react-router-dom';
import NavBar from '../../Pages/Shared/AppBar/NavBar';
import MyHelmet from '../../Components/MyHelmet/MyHelpmet';

const Main = () => {
    return (
        <div style={{ width: '100%' }}>
            <MyHelmet>Experiment Labs | Career Counselling | Sell Online courses</MyHelmet>
            <NavBar />
            <Outlet />
            <Footer />
        </div>
    );
};

export default Main;