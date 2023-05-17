import React from 'react';
import './style.css';

const ScienceSecondNav = () => {
    return (
        <div className='bg-[#44444492] mt-[75px] sm:mt-[105px] md:mt-20 px-10 lg:px-32 font z-50'>
            <div className='flex justify-start md:justify-center gap-10 items-center overflow-x-scroll hidden-scroll'>
                <div className='bg-custom-blue bg-opacity-20 p-3 border-b-2 border-custom-blue'>Overview</div>
                <div>Masters</div>
                <div>Curriculum</div>
                <div>Campus</div>
                <div>FAQs</div>
                <div>News</div>
            </div>
        </div>
    );
};

export default ScienceSecondNav;