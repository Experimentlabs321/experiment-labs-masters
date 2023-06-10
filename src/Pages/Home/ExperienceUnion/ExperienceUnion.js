import React, { useRef } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import OutboundOutlinedIcon from '@mui/icons-material/OutboundOutlined';
import { Button } from '@mui/material';
import ArrowCircleLeftRoundedIcon from '@mui/icons-material/ArrowCircleLeftRounded';
import ArrowCircleRightRoundedIcon from '@mui/icons-material/ArrowCircleRightRounded';
import './style.css';
import { Link } from 'react-router-dom';

const ExperienceUnion = () => {

    const containerRef = useRef(null);

    function handleScrollLeft() {
        containerRef.current.scrollLeft -= 300; // scroll left by 100 pixels
    }

    function handleScrollRight() {
        containerRef.current.scrollLeft += 300; // scroll right by 100 pixels
    }

    return (
        <div className='pb-20 mt-44 pt-[130px] px-10 lg:px-28' style={{background:'linear-gradient(180deg, #101010 0%, rgba(0, 0, 0, 0.6096) 100%), rgba(0, 64, 148, 0.45)'}}>
            <div className='flex flex-col gap-10 items-start'>
                <div>
                    <h1 className='text-2xl xl:text-4xl font-semibold'><span>Experience the Labs</span></h1>
                </div>
                <div className="carousel-button-group">
                    <div className='flex gap-7'>
                        <button onClick={handleScrollLeft} className='hidden lg:block' type="button">
                            <ArrowCircleLeftRoundedIcon className='opacity-80' sx={{ fontSize: '50px', color: 'rgb(156 163 175)', ":hover": { color: "#397FEB" } }} />
                        </button>


                        <div
                            ref={containerRef}
                            className='overflow-x-scroll scroll-smooth gap-8 eu-container pb-10 lg:w-[75vw] lg:flex hidden'
                        >
                            <div className='border-2 border-gray-400 hover:shadow-xl hover:transition-all hover:duration-200 hover:ease-out lg:min-w-[360px] min-w-[290px] max-w-[290px] lg:max-w-[360px] rounded-xl'>
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
                                    <Link to='/experience-union'><button className='bg-transparent border-2 hover:bg-cyan hover:text-white border-cyan text-cyan rounded-xl w-full py-2'>Registration Closed</button></Link>
                                </div>
                            </div>
                            <div className='border-2 border-gray-400 bg-transparent hover:shadow-xl hover:transition-all hover:duration-200 hover:ease-out lg:min-w-[360px] min-w-[290px] max-w-[290px] lg:max-w-[360px] rounded-xl'>
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
                                    <Link to='/experience-union'><button className='bg-transparent border-2 hover:bg-cyan hover:text-white border-cyan text-cyan rounded-xl w-full py-2'>Registration Closed</button></Link>
                                </div>
                            </div>
                            <div className='border-2 border-gray-400 bg-transparent hover:shadow-xl hover:transition-all hover:duration-200 hover:ease-out lg:min-w-[360px] min-w-[290px] max-w-[290px] lg:max-w-[360px] rounded-xl'>
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
                                    <Link to='/experience-union'><button className='bg-transparent border-2 hover:bg-cyan hover:text-white border-cyan text-cyan rounded-xl w-full py-2'>Registration Closed</button></Link>
                                </div>
                            </div>
                            <div className='border-2 border-gray-400 bg-transparent hover:shadow-xl hover:transition-all hover:duration-200 hover:ease-out lg:min-w-[360px] min-w-[290px] max-w-[290px] lg:max-w-[360px] rounded-xl'>
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
                                    <Link to='/experience-union'><button className='bg-transparent border-2 hover:bg-cyan hover:text-white border-cyan text-cyan rounded-xl w-full py-2'>Registration Closed</button></Link>
                                </div>
                            </div>
                            <div className='border-2 border-gray-400 bg-transparent hover:shadow-xl hover:transition-all hover:duration-200 hover:ease-out lg:min-w-[360px] min-w-[290px] max-w-[290px] lg:max-w-[360px] rounded-xl'>
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
                                    <Link to='/experience-union'><button className='bg-transparent border-2 hover:bg-cyan hover:text-white border-cyan text-cyan rounded-xl w-full py-2'>Registration Closed</button></Link>
                                </div>
                            </div>
                            <div className='border-2 border-gray-400 bg-transparent hover:shadow-xl hover:transition-all hover:duration-200 hover:ease-out lg:min-w-[360px] min-w-[290px] max-w-[290px] lg:max-w-[360px] rounded-xl'>
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
                                    <Link to='/experience-union'><button className='bg-transparent border-2 hover:bg-cyan hover:text-white border-cyan text-cyan rounded-xl w-full py-2'>Registration Closed</button></Link>
                                </div>
                            </div>
                            <div className='border-2 border-gray-400 bg-transparent hover:shadow-xl hover:transition-all hover:duration-200 hover:ease-out lg:min-w-[360px] min-w-[290px] max-w-[290px] lg:max-w-[360px] rounded-xl'>
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
                                    <Link to='/experience-union'><button className='bg-transparent border-2 hover:bg-cyan hover:text-white border-cyan text-cyan rounded-xl w-full py-2'>Registration Closed</button></Link>
                                </div>
                            </div>


                        </div>


                        <button onClick={handleScrollRight} className='hidden lg:block' type="button">
                            <ArrowCircleRightRoundedIcon className='opacity-80' sx={{ fontSize: '50px', color: '#397FEB', ":hover": { color: "#397FEB" } }} />
                        </button>
                    </div>
                </div>


            </div>
            <div
               
                className='flex eu-container overflow-x-scroll scroll-smooth gap-5 pb-10 lg:hidden'
            >
                <div className='border-2 border-gray-400 hover:shadow-xl hover:transition-all hover:duration-200 hover:ease-out min-w-[290px] max-w-[290px] rounded-xl'>
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
                        <Link to='/experience-union'><button className='bg-transparent border-2 hover:bg-cyan hover:text-white border-cyan text-cyan rounded-xl w-full py-2'>Registration Closed</button></Link>
                    </div>
                </div>
                <div className='border-2 border-gray-400 bg-transparent hover:shadow-xl hover:transition-all hover:duration-200 hover:ease-out min-w-[290px] max-w-[290px] rounded-xl'>
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
                        <Link to='/experience-union'><button className='bg-transparent border-2 hover:bg-cyan hover:text-white border-cyan text-cyan rounded-xl w-full py-2'>Registration Closed</button></Link>
                    </div>
                </div>
                <div className='border-2 border-gray-400 bg-transparent hover:shadow-xl hover:transition-all hover:duration-200 hover:ease-out min-w-[290px] max-w-[290px] rounded-xl'>
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
                        <Link to='/experience-union'><button className='bg-transparent border-2 hover:bg-cyan hover:text-white border-cyan text-cyan rounded-xl w-full py-2'>Registration Closed</button></Link>
                    </div>
                </div>
                <div className='border-2 border-gray-400 bg-transparent hover:shadow-xl hover:transition-all hover:duration-200 hover:ease-out min-w-[290px] max-w-[290px] rounded-xl'>
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
                        <Link to='/experience-union'><button className='bg-transparent border-2 hover:bg-cyan hover:text-white border-cyan text-cyan rounded-xl w-full py-2'>Registration Closed</button></Link>
                    </div>
                </div>
                <div className='border-2 border-gray-400 bg-transparent hover:shadow-xl hover:transition-all hover:duration-200 hover:ease-out min-w-[290px] max-w-[290px] rounded-xl'>
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
                        <Link to='/experience-union'><button className='bg-transparent border-2 hover:bg-cyan hover:text-white border-cyan text-cyan rounded-xl w-full py-2'>Registration Closed</button></Link>
                    </div>
                </div>
                <div className='border-2 border-gray-400 bg-transparent hover:shadow-xl hover:transition-all hover:duration-200 hover:ease-out min-w-[290px] max-w-[290px] rounded-xl'>
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
                        <Link to='/experience-union'><button className='bg-transparent border-2 hover:bg-cyan hover:text-white border-cyan text-cyan rounded-xl w-full py-2'>Registration Closed</button></Link>
                    </div>
                </div>
                <div className='border-2 border-gray-400 bg-transparent hover:shadow-xl hover:transition-all hover:duration-200 hover:ease-out min-w-[290px] max-w-[290px] rounded-xl'>
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
                        <Link to='/experience-union'><button className='bg-transparent border-2 hover:bg-cyan hover:text-white border-cyan text-cyan rounded-xl w-full py-2'>Registration Closed</button></Link>
                    </div>
                </div>


            </div>
        </div>
    );
};

export default ExperienceUnion;