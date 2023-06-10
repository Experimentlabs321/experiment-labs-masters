import React from 'react';
import Footer from '../../Pages/Shared/Footer/Footer';
import { Outlet } from 'react-router-dom';
import NavBar from '../../Pages/Shared/AppBar/NavBar';

const Main = () => {
    return (
        <div style={{width:'100%'}}>
           <NavBar/>
           <Outlet/>
           <Footer/>
        </div>
    );
};

export default Main;