
import React from 'react';
import Footer from '../../Pages/Shared/Footer/Footer';
import ScienceInnovationNav from '../../Pages/Shared/ScienceInnovationNav/ScienceInnovationNav';
import { Outlet } from 'react-router-dom';

const ScienceInnovation = () => {
    return (
        <div>
            <ScienceInnovationNav />
            <Outlet/>
            <Footer />
        </div>
    );
};

export default ScienceInnovation;