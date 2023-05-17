import React, { useRef } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import OutboundOutlinedIcon from '@mui/icons-material/OutboundOutlined';
import { Button } from '@mui/material';
import ArrowCircleLeftRoundedIcon from '@mui/icons-material/ArrowCircleLeftRounded';
import ArrowCircleRightRoundedIcon from '@mui/icons-material/ArrowCircleRightRounded';
import './style.css';

const ExperienceUnion = () => {

    const containerRef = useRef(null);

    function handleScrollLeft() {
        containerRef.current.scrollLeft -= 300; // scroll left by 100 pixels
    }

    function handleScrollRight() {
        containerRef.current.scrollLeft += 300; // scroll right by 100 pixels
    }

    return (
        <div className='mt-44 px-10 lg:px-28 font'>
            <div className='mb-10 flex justify-between items-start'>
                <div>
                    <h1 className='text-2xl xl:text-4xl font-bold'><span className='bg-gradient-to-t from-custom-blue to-transparent to-50%'>Experience the Union</span></h1>
                </div>
                <div className="carousel-button-group">
                    <div className='flex'>
                        <button onClick={handleScrollLeft} className='hidden md:block' type="button">
                            <ArrowCircleLeftRoundedIcon className='opacity-80' sx={{ fontSize: '50px', color: 'rgb(156 163 175)', ":hover": { color: "#397FEB" } }} />
                        </button>
                        <button onClick={handleScrollRight} className='hidden md:block' type="button">
                            <ArrowCircleRightRoundedIcon className='opacity-80' sx={{ fontSize: '50px', color: '#397FEB', ":hover": { color: "#397FEB" } }} />
                        </button>
                    </div>
                </div>
            </div>
            <div
                ref={containerRef}
                className='flex overflow-x-scroll scroll-smooth gap-5 eu-container pb-10'
            >
                <div className='border-2 border-gray-400 bg-[#424242] hover:shadow-xl hover:transition-all hover:duration-200 hover:ease-out hover:shadow-custom-blue min-w-[290px] max-w-[290px] rounded-xl'>
                    <img
                        className='w-full h-[200px] object-cover rounded-t-xl'
                        src={`https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8dGVjaHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60`}
                        alt=''
                    />
                    <div className='p-3'>
                        <h4 className='font-extrabold font text-xl'>The Masters' Union Startup Weekend</h4>
                        <div className='text-xs font-bold mt-5 flex gap-3'>
                            <span className='px-2 p-1 bg-custom-blue bg-opacity-40 rounded-full text-xs font-light'>6th May 2023 - 7th May 2023</span>
                            <span className='px-2 p-1 bg-custom-blue bg-opacity-40 rounded-full text-xs font-light'>Offline</span>
                        </div>
                        <p className='text-sm font-thin mt-2 mb-6'>Masters' Union is starting May with a bang with The Masters' Union Startup Weekend! Get ready to find your perfect co-founder, build a product, pitch to investors, and become the next big thing in the startup world.</p>
                        <button className='border-2 border-cyan text-cyan rounded-xl w-full py-2'>Registration Closed</button>
                    </div>
                </div>
                <div className='border-2 border-gray-400 bg-[#424242] hover:shadow-xl hover:transition-all hover:duration-200 hover:ease-out hover:shadow-custom-blue min-w-[290px] max-w-[290px] rounded-xl'>
                    <img
                        className='w-full h-[200px] object-cover rounded-t-xl'
                        src={`https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8dGVjaHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60`}
                        alt=''
                    />
                    <div className='p-3'>
                        <h4 className='font-extrabold font text-xl'>The Masters' Union Startup Weekend</h4>
                        <div className='text-xs font-bold mt-5 flex gap-3'>
                            <span className='px-2 p-1 bg-custom-blue bg-opacity-40 rounded-full text-xs font-light'>6th May 2023 - 7th May 2023</span>
                            <span className='px-2 p-1 bg-custom-blue bg-opacity-40 rounded-full text-xs font-light'>Offline</span>
                        </div>
                        <p className='text-sm font-thin mt-2 mb-6'>Masters' Union is starting May with a bang with The Masters' Union Startup Weekend! Get ready to find your perfect co-founder, build a product, pitch to investors, and become the next big thing in the startup world.</p>
                        <button className='border-2 border-cyan text-cyan rounded-xl w-full py-2'>Registration Closed</button>
                    </div>
                </div>
                <div className='border-2 border-gray-400 bg-[#424242] hover:shadow-xl hover:transition-all hover:duration-200 hover:ease-out hover:shadow-custom-blue min-w-[290px] max-w-[290px] rounded-xl'>
                    <img
                        className='w-full h-[200px] object-cover rounded-t-xl'
                        src={`https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8dGVjaHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60`}
                        alt=''
                    />
                    <div className='p-3'>
                        <h4 className='font-extrabold font text-xl'>The Masters' Union Startup Weekend</h4>
                        <div className='text-xs font-bold mt-5 flex gap-3'>
                            <span className='px-2 p-1 bg-custom-blue bg-opacity-40 rounded-full text-xs font-light'>6th May 2023 - 7th May 2023</span>
                            <span className='px-2 p-1 bg-custom-blue bg-opacity-40 rounded-full text-xs font-light'>Offline</span>
                        </div>
                        <p className='text-sm font-thin mt-2 mb-6'>Masters' Union is starting May with a bang with The Masters' Union Startup Weekend! Get ready to find your perfect co-founder, build a product, pitch to investors, and become the next big thing in the startup world.</p>
                        <button className='border-2 border-cyan text-cyan rounded-xl w-full py-2'>Registration Closed</button>
                    </div>
                </div>
                <div className='border-2 border-gray-400 bg-[#424242] hover:shadow-xl hover:transition-all hover:duration-200 hover:ease-out hover:shadow-custom-blue min-w-[290px] max-w-[290px] rounded-xl'>
                    <img
                        className='w-full h-[200px] object-cover rounded-t-xl'
                        src={`https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8dGVjaHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60`}
                        alt=''
                    />
                    <div className='p-3'>
                        <h4 className='font-extrabold font text-xl'>The Masters' Union Startup Weekend</h4>
                        <div className='text-xs font-bold mt-5 flex gap-3'>
                            <span className='px-2 p-1 bg-custom-blue bg-opacity-40 rounded-full text-xs font-light'>6th May 2023 - 7th May 2023</span>
                            <span className='px-2 p-1 bg-custom-blue bg-opacity-40 rounded-full text-xs font-light'>Offline</span>
                        </div>
                        <p className='text-sm font-thin mt-2 mb-6'>Masters' Union is starting May with a bang with The Masters' Union Startup Weekend! Get ready to find your perfect co-founder, build a product, pitch to investors, and become the next big thing in the startup world.</p>
                        <button className='border-2 border-cyan text-cyan rounded-xl w-full py-2'>Registration Closed</button>
                    </div>
                </div>
                <div className='border-2 border-gray-400 bg-[#424242] hover:shadow-xl hover:transition-all hover:duration-200 hover:ease-out hover:shadow-custom-blue min-w-[290px] max-w-[290px] rounded-xl'>
                    <img
                        className='w-full h-[200px] object-cover rounded-t-xl'
                        src={`https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8dGVjaHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60`}
                        alt=''
                    />
                    <div className='p-3'>
                        <h4 className='font-extrabold font text-xl'>The Masters' Union Startup Weekend</h4>
                        <div className='text-xs font-bold mt-5 flex gap-3'>
                            <span className='px-2 p-1 bg-custom-blue bg-opacity-40 rounded-full text-xs font-light'>6th May 2023 - 7th May 2023</span>
                            <span className='px-2 p-1 bg-custom-blue bg-opacity-40 rounded-full text-xs font-light'>Offline</span>
                        </div>
                        <p className='text-sm font-thin mt-2 mb-6'>Masters' Union is starting May with a bang with The Masters' Union Startup Weekend! Get ready to find your perfect co-founder, build a product, pitch to investors, and become the next big thing in the startup world.</p>
                        <button className='border-2 border-cyan text-cyan rounded-xl w-full py-2'>Registration Closed</button>
                    </div>
                </div>
                <div className='border-2 border-gray-400 bg-[#424242] hover:shadow-xl hover:transition-all hover:duration-200 hover:ease-out hover:shadow-custom-blue min-w-[290px] max-w-[290px] rounded-xl'>
                    <img
                        className='w-full h-[200px] object-cover rounded-t-xl'
                        src={`https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8dGVjaHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60`}
                        alt=''
                    />
                    <div className='p-3'>
                        <h4 className='font-extrabold font text-xl'>The Masters' Union Startup Weekend</h4>
                        <div className='text-xs font-bold mt-5 flex gap-3'>
                            <span className='px-2 p-1 bg-custom-blue bg-opacity-40 rounded-full text-xs font-light'>6th May 2023 - 7th May 2023</span>
                            <span className='px-2 p-1 bg-custom-blue bg-opacity-40 rounded-full text-xs font-light'>Offline</span>
                        </div>
                        <p className='text-sm font-thin mt-2 mb-6'>Masters' Union is starting May with a bang with The Masters' Union Startup Weekend! Get ready to find your perfect co-founder, build a product, pitch to investors, and become the next big thing in the startup world.</p>
                        <button className='border-2 border-cyan text-cyan rounded-xl w-full py-2'>Registration Closed</button>
                    </div>
                </div>
                <div className='border-2 border-gray-400 bg-[#424242] hover:shadow-xl hover:transition-all hover:duration-200 hover:ease-out hover:shadow-custom-blue min-w-[290px] max-w-[290px] rounded-xl'>
                    <img
                        className='w-full h-[200px] object-cover rounded-t-xl'
                        src={`https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8dGVjaHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60`}
                        alt=''
                    />
                    <div className='p-3'>
                        <h4 className='font-extrabold font text-xl'>The Masters' Union Startup Weekend</h4>
                        <div className='text-xs font-bold mt-5 flex gap-3'>
                            <span className='px-2 p-1 bg-custom-blue bg-opacity-40 rounded-full text-xs font-light'>6th May 2023 - 7th May 2023</span>
                            <span className='px-2 p-1 bg-custom-blue bg-opacity-40 rounded-full text-xs font-light'>Offline</span>
                        </div>
                        <p className='text-sm font-thin mt-2 mb-6'>Masters' Union is starting May with a bang with The Masters' Union Startup Weekend! Get ready to find your perfect co-founder, build a product, pitch to investors, and become the next big thing in the startup world.</p>
                        <button className='border-2 border-cyan text-cyan rounded-xl w-full py-2'>Registration Closed</button>
                    </div>
                </div>


            </div>


        </div>
    );
};

export default ExperienceUnion;