import React from 'react';
import background from '../../../assets/background.avif';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import darkbg from '../../../assets/darkbg.jpg';
import Person3Icon from '@mui/icons-material/Person3';
import EmailIcon from '@mui/icons-material/Email';
import CallIcon from '@mui/icons-material/Call';
import ListIcon from '@mui/icons-material/List';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';

const SummerStartUp = () => {
    return (
        <div className='text-white'>
            <div style={{ background: `url(${darkbg})`, width: '100%', objectFit: 'cover' }} className='border-t-2 border-b-4 border-cyan px-10 lg:px-28 py-20 pt-40'>
                <div className='px-10 lg:px-32 flex flex-col lg:flex-row gap-20 justify-between items-center'>
                    <div className='w-full'>
                        <h1 className='text-2xl font-bold'>
                            <span className='text-transparent bg-clip-text bg-gradient-to-r from-cyan to-green'>Cost</span> and <span className='text-transparent bg-clip-text bg-gradient-to-r from-cyan to-green'>Logistics</span>
                        </h1>
                        <div className='mt-6 p-5 border rounded-lg border-dashed'>
                            <h1 className='text-3xl font-bold'>
                                SUMMER STARTUP WEEK FEE <br />

                                <span className='text-transparent bg-clip-text bg-gradient-to-r from-cyan to-green'>INR 19,999/-</span>
                            </h1>
                        </div>
                        <h4 className='text-2xl font-bold my-8'>
                            <span className='text-transparent bg-clip-text bg-gradient-to-r from-cyan to-green'>Fee</span> Includes
                        </h4>
                        <div className='flex flex-col gap-4'>
                            <span className='flex gap-2 items-start'><ArrowCircleRightIcon sx={{ color: "rgb(12 197 219)" }} /> <span>Students will be required to be on campus from <span className='text-transparent bg-clip-text bg-gradient-to-r from-cyan to-green'>10AM to 6PM</span> for all 7 days.</span></span>
                            <span className='flex gap-2 items-start'><ArrowCircleRightIcon sx={{ color: "rgb(12 197 219)" }} /> <span><span className='text-transparent bg-clip-text bg-gradient-to-r from-cyan to-green'>Breakfast</span> and <span className='text-transparent bg-clip-text bg-gradient-to-r from-cyan to-green'>Lunch</span> costs are included in the fee.</span></span>
                            <span className='flex gap-2 items-start'><ArrowCircleRightIcon sx={{ color: "rgb(12 197 219)" }} /><span>Masters' Union will not be providing <span className='text-transparent bg-clip-text bg-gradient-to-r from-cyan to-green'>residential facility</span> to the students. However, arrangements can be made on chargeable basis <span className='text-transparent bg-clip-text bg-gradient-to-r from-cyan to-green'>(INR 14,999 for 6 nights stay and dinner included).</span></span></span>
                        </div>
                    </div>
                    <div className='w-full'>
                        <form className='bg-[#424242] p-8 rounded-md border-2 border-custom-blue border-opacity-40 w-full lg:max-w-[480px]'>
                            <div>
                                <label>Name<span className='text-red-600'>*</span></label>
                                <div className='flex gap-2 mt-4 border px-3 py-3 rounded-md'>
                                    <Person3Icon />
                                    <input className='w-full bg-transparent border-0 focus:outline-0' type="text" placeholder='Enter Your name' />
                                </div>
                            </div>
                            <div className='mt-6'>
                                <label>Email<span className='text-red-600'>*</span></label>
                                <div className='flex gap-2 mt-4 border px-3 py-3 rounded-md'>
                                    <EmailIcon />
                                    <input className='w-full bg-transparent border-0 focus:outline-0' type="email" placeholder='Enter Your email' />
                                </div>
                            </div>
                            <div className='mt-6'>
                                <label>Mobile Number<span className='text-red-600'>*</span></label>
                                <div className='flex gap-2 mt-4 border px-3 py-3 rounded-md'>
                                    <CallIcon />
                                    <input className='w-full bg-transparent border-0 focus:outline-0' type="text" placeholder='Enter Your mobile number' />
                                </div>
                            </div>

                            <div className='mt-6'>
                                <label>Class<span className='text-red-600'>*</span></label>
                                <div className='flex gap-2 mt-4 border px-3 py-3 rounded-md'>
                                    <ListIcon />
                                    <select className='w-full bg-[#424242] border-0 focus:outline-0' type="" placeholder='Enter Your mobile number'>
                                        <option>Select the option</option>
                                        <option value="Class 9">Class 9</option>
                                        <option value="Class 10">Class 10</option>
                                        <option value="Class 11">Class 11</option>
                                        <option value="Class 12">Class 12</option>
                                    </select>
                                </div>
                            </div>

                            <div className='mt-8 flex gap-2 items-start'>
                                <input className='w-full bg-gradient-to-r from-cyan to-green hover:shadow-lg hover:shadow-[#121212] py-3 rounded-md hover:bg-opacity-60 hover:transition-all hover:delay-200 hover:ease-out font-bold' type="submit" value={'Submit'} />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className='bg-[#121212] flex flex-col-reverse lg:flex-row-reverse px-10 lg:px-32 py-20 justify-start lg:justify-evenly gap-y-16 lg:items-center text-white border-b-2 border-b-cyan'>
                <div className='max-w-[500px]'>
                    <h1 className='text-3xl font-semibold mt-4'>What is   <span className='text-transparent bg-clip-text bg-gradient-to-r from-cyan to-green'>Masters’ Union Summer <br />Startup Week?</span></h1>
                    <p className='mt-4'>The Masters' Union Summer Startup Week is a highly immersive <span className='text-transparent bg-clip-text bg-gradient-to-r from-cyan to-green'>7-day experience</span> that provides students with a comprehensive understanding of the <span className='text-transparent bg-clip-text bg-gradient-to-r from-cyan to-green'>business and technology domains.</span> The program aims to inspire and guide young minds by providing them with hands-on experience of building a start-up and mentorship from industry leaders.</p>

                </div>
                <img className='bg-[#4242421d] h-[280px] w-full lg:min-w-[515px] lg:max-w-[515px] object-cover rounded-lg' src={background} alt="" />
            </div>
        </div>
    );
};

export default SummerStartUp;