import React from 'react';
import background from '../../../assets/background.avif';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const SummerStartUp = () => {
    return (
        <div className='bg-[#121212] flex flex-col-reverse lg:flex-row-reverse px-10 lg:px-32 py-20 justify-start lg:justify-evenly gap-y-16 lg:items-center text-white border-b-2 border-b-cyan'>
            <div className='max-w-[500px]'>
                <h1 className='text-3xl font-semibold mt-4'>What is   <span className='text-transparent bg-clip-text bg-gradient-to-r from-cyan to-green'>Masters’ Union Summer <br />Startup Week?</span></h1>
                <p className='mt-4'>The Masters' Union Summer Startup Week is a highly immersive <span className='text-transparent bg-clip-text bg-gradient-to-r from-cyan to-green'>7-day experience</span> that provides students with a comprehensive understanding of the <span className='text-transparent bg-clip-text bg-gradient-to-r from-cyan to-green'>business and technology domains.</span> The program aims to inspire and guide young minds by providing them with hands-on experience of building a start-up and mentorship from industry leaders.</p>
                
            </div>
            <img className='bg-[#4242421d] h-[280px] w-full lg:min-w-[515px] lg:max-w-[515px] object-cover rounded-lg' src={background} alt="" />
        </div>
    );
};

export default SummerStartUp;