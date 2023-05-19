import React from 'react';
import background from '../../../assets/background.avif';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const ExperienceUnionHero = () => {
    return (
        <div className='bg-[#121212] flex flex-col lg:flex-row justify-between items-center text-white border-b-4 border-b-cyan'>
            <div className='pt-40 lg:pb-0 pb-20 lg:pl-28 pl-10 w-full'>
                <div className='flex items-center gap-3 bg-[#424242] w-fit p-3 rounded-lg'>
                    <CalendarTodayIcon className='text-cyan' />
                    5th June - 11th June, 2023
                </div>
                <h1 className='text-6xl font-semibold mt-4'>Summer <span className='text-transparent bg-clip-text bg-gradient-to-r from-cyan to-green'>Startup <br />Week</span></h1>
                <p className='mt-4 text-2xl'>For students in <span className='text-transparent bg-clip-text bg-gradient-to-r from-cyan to-green'>Grades 9-12</span></p>
                <div className='flex flex-wrap mt-8 gap-3'>
                    <button className='bg-gradient-to-r from-cyan to-green py-3 min-w-[250px] text-2xl rounded-lg hover:transition-all hover:ease-out hover:delay-200 hover:shadow-lg hover:shadow-[#424242]'>Apply Now</button>
                    <button className='hover:shadow-[#424242] border-2 py-3 min-w-[250px] text-2xl rounded-lg  hover:shadow-lg'>Download Brochure</button>
                </div>
            </div>
            <img className='bg-[#4242421d] h-[100vh] w-1/2 object-cover lg:block hidden' src={background} alt="" />
        </div>
    );
};

export default ExperienceUnionHero;