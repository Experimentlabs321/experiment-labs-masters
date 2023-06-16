import React, { useRef } from 'react';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import ArrowCircleLeftRoundedIcon from '@mui/icons-material/ArrowCircleLeftRounded';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowCircleRightRoundedIcon from '@mui/icons-material/ArrowCircleRightRounded';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import img from '../../../assets/wepik-export-20230516131526jrNm.png';
import img1 from '../../../assets/Curriculum/pexels-anil-sharma-1.png'
import './style.css';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { ArrowBackIos } from '@mui/icons-material';

const Curriculum = () => {

    const containerRef = useRef(null);

    function handleScrollLeft() {
        containerRef.current.scrollLeft -= 300; // scroll left by 100 pixels
    }

    function handleScrollRight() {
        containerRef.current.scrollLeft += 300; // scroll right by 100 pixels
    }

    return (
        <div className='pt-40 flex flex-col justify-center pb-40 font'>
            <div className='px-10 lg:px-28'>
                <div className='flex flex-col lg:flex-row gap-1 justify-center items-end'>
                    <div>
                        <h2 className='text-3xl my-8'>Highly Individualized Curriculum</h2>
                        <p className='mb-8 text-[#7D7D7D]'>
                            The Creativity Lab by Experiment Labs is an extremely flexible programme that can be highly customized to meet the needs of each student’s career aspirations.
                        </p>
                        <div className='mb-8 grid grid-cols-1 lg:grid-cols-2 gap-2'>
                            <div className='flex flex-row items-center gap-3'>
                                <span><PlayArrowRoundedIcon sx={{ color: 'white' }} /></span>
                                <span style={{ fontWeight: '500', fontSize: '15px' }}>Tailored Teaching Methods to Achieve Desired Results</span>
                            </div>
                            <div className='flex flex-row items-center gap-3'>
                                <span><PlayArrowRoundedIcon sx={{ color: 'white' }} /></span>
                                <span style={{ fontWeight: '500', fontSize: '15px' }}>Explore 50+ Careers Hands on</span>
                            </div>
                            <div className='flex flex-row items-center gap-3'>
                                <span><PlayArrowRoundedIcon sx={{ color: 'white' }} /></span>
                                <span style={{ fontWeight: '500', fontSize: '15px' }}>Detailed Evaluation of Technical skills Soft skills and Academic Learning </span>
                            </div>
                            <div className='flex flex-row items-center gap-3'>
                                <span><PlayArrowRoundedIcon sx={{ color: 'white' }} /></span>
                                <span style={{ fontWeight: '500', fontSize: '15px' }}>Hands on Practical Experience</span>
                            </div>
                            <div className='flex flex-row items-center gap-3'>
                                <span><PlayArrowRoundedIcon sx={{ color: 'white' }} /></span>
                                <span style={{ fontWeight: '500', fontSize: '15px' }}>Get prepared to enter lvy League colleges</span>
                            </div>
                            <div className='flex flex-row items-center gap-3'>
                                <span><PlayArrowRoundedIcon sx={{ color: 'white' }} /></span>
                                <span style={{ fontWeight: '500', fontSize: '15px' }}>Careers of the Future</span>
                            </div>
                            <div className='flex flex-row items-center gap-3'>
                                <span><PlayArrowRoundedIcon sx={{ color: 'white' }} /></span>
                                <span style={{ fontWeight: '500', fontSize: '15px' }}>Get 1-1 Support and Live learning</span>
                            </div>
                            <div className='flex flex-row items-center gap-3'>
                                <span><PlayArrowRoundedIcon sx={{ color: 'white' }} /></span>
                                <span style={{ fontWeight: '500', fontSize: '15px' }}>Build Personality and confidence</span>
                            </div>
                        </div>

                    </div>
                    <div className='flex flex-col gap-3'>
                        <img className='rounded-2xl' src={img1} alt='' />

                        {/*  <iframe
                            className='rounded-2xl w-full h-[290px] lg:min-w-[500px]'
                           // style={{ borderRight: "5px solid rgb(57 , 127 , 235, 0.2)", borderBottom: "5px solid rgb(57 , 127 , 235, 0.2)" }}
                            src={`https://dsqqu7oxq6o1v.cloudfront.net/motion-array-1177701-mBCKbnRAFv-high.mp4`}
                            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title="Embedded youtube"
                        /> */}
                    </div>
                </div>

                <div className=' flex justify-between mt-5'>
                    <h1 className='text-xl'>FAQs</h1>

                    <button className='px-5 py-1 bg-[#FF557A] rounded-3xl hover:bg-opacity-75'>More info</button>
                </div>

                <div className='mt-16 flex flex-col lg:flex-row'>

                    <div className='mb-10 flex justify-between items-start'>
                        <div>
                            {/* <h1 className='text-xl w-[200px] font-bold font'>Explore Course <span className='bg-gradient-to-t from-custom-blue to-transparent to-50%'>
                                Roster</span></h1> */}
                            {/* <button className='mt-5 px-6 py-2 bg-custom-blue rounded font-bold hover:bg-opacity-75'>See All</button> */}
                            <div className="carousel-button-group">
                                <div className='flex justify-start gap-5 mt-5'>
                                    {/* <button onClick={handleScrollLeft} className='hidden bg-[#94A4FF] rounded-full lg:block' type="button">
                                        <ArrowBackIos className='opacity-80'  sx={{ fontSize: '60px', color: 'black', ":hover": { color: "#397FEB" } }}/>
                                    </button> */}
                                    <button onClick={handleScrollLeft} className='hidden lg:block' type="button">
                                        <ArrowBackIosNewIcon sx={{ fontSize: '28px', color: '#141414', borderRadius: '50%', ":hover": { color: "#397FEB" }, background: '#94A4FF', height: '40px', width: '40px', padding: '5px' }} />
                                    </button>
                                    <div
                                        ref={containerRef}
                                        className='flex overflow-x-scroll scroll-smooth gap-5 mtm-container w-[80vw]'

                                    >
                                        <div className='border-2  rounded-2xl border-gray-400 bg-[#7683CC] hover:shadow-xl hover:transition-all hover:duration-200 hover:ease-out hover:shadow-custom-blue min-w-[290px] max-w-[290px]'>
                                            <div className='border-gray-400 p-3'>
                                                <h1 className='text-xl font-bold'>Building Marketing Strategies</h1>
                                            </div>
                                            <div className='p-3'>
                                                <h4 className='font-extrabold font'>Full Name</h4>
                                                <h6 className='text-sm font-thin'>Work Role, Company</h6>
                                                <p className='text-sm font-thin mt-2'>Teaching :</p>
                                                <p className='text-xs font-semibold'>Full Subject Name</p>
                                            </div>
                                        </div>
                                        <div className='border-2 rounded-2xl border-gray-400 bg-[#7683CC] hover:shadow-xl hover:transition-all hover:duration-200 hover:ease-out hover:shadow-custom-blue min-w-[290px] max-w-[290px]'>
                                            <div className=' border-gray-400 p-3'>
                                                <h1 className='text-xl font-bold'>Building Marketing Strategies</h1>
                                            </div>
                                            <div className='p-3'>
                                                <h4 className='font-extrabold font'>Full Name</h4>
                                                <h6 className='text-sm font-thin'>Work Role, Company</h6>
                                                <p className='text-sm font-thin mt-2'>Teaching :</p>
                                                <p className='text-xs font-semibold'>Full Subject Name</p>
                                            </div>
                                        </div>
                                        <div className='border-2 rounded-2xl border-gray-400 bg-[#7683CC] hover:shadow-xl hover:transition-all hover:duration-200 hover:ease-out hover:shadow-custom-blue min-w-[290px] max-w-[290px]'>
                                            <div className=' border-gray-400 p-3'>
                                                <h1 className='text-xl font-bold'>Building Marketing Strategies</h1>
                                            </div>
                                            <div className='p-3'>
                                                <h4 className='font-extrabold font'>Full Name</h4>
                                                <h6 className='text-sm font-thin'>Work Role, Company</h6>
                                                <p className='text-sm font-thin mt-2'>Teaching :</p>
                                                <p className='text-xs font-semibold'>Full Subject Name</p>
                                            </div>
                                        </div>
                                        <div className='border-2 rounded-2xl border-gray-400 bg-[#7683CC] hover:shadow-xl hover:transition-all hover:duration-200 hover:ease-out hover:shadow-custom-blue min-w-[290px] max-w-[290px]'>
                                            <div className=' border-gray-400 p-3'>
                                                <h1 className='text-xl font-bold'>Building Marketing Strategies</h1>
                                            </div>
                                            <div className='p-3'>
                                                <h4 className='font-extrabold font'>Full Name</h4>
                                                <h6 className='text-sm font-thin'>Work Role, Company</h6>
                                                <p className='text-sm font-thin mt-2'>Teaching :</p>
                                                <p className='text-xs font-semibold'>Full Subject Name</p>
                                            </div>
                                        </div>
                                        {/* <button onClick={handleScrollRight} className='hidden lg:block' type="button">
                                        <ArrowCircleRightRoundedIcon className='opacity-80' sx={{ fontSize: '50px', color: '#397FEB', ":hover": { color: "#397FEB" } }} />
                                    </button> */}
                                        <div className='border-2 rounded-2xl border-gray-400 bg-[#7683CC] hover:shadow-xl hover:transition-all hover:duration-200 hover:ease-out hover:shadow-custom-blue min-w-[290px] max-w-[290px]'>
                                            <div className=' border-gray-400 p-3'>
                                                <h1 className='text-xl font-bold'>Building Marketing Strategies</h1>
                                            </div>
                                            <div className='p-3'>
                                                <h4 className='font-extrabold font'>Full Name</h4>
                                                <h6 className='text-sm font-thin'>Work Role, Company</h6>
                                                <p className='text-sm font-thin mt-2'>Teaching :</p>
                                                <p className='text-xs font-semibold'>Full Subject Name</p>
                                            </div>
                                        </div>
                                        <div className='border-2 rounded-2xl border-gray-400 bg-[#7683CC] hover:shadow-xl hover:transition-all hover:duration-200 hover:ease-out hover:shadow-custom-blue min-w-[290px] max-w-[290px]'>
                                            <div className=' border-gray-400 p-3'>
                                                <h1 className='text-xl font-bold'>Building Marketing Strategies</h1>
                                            </div>
                                            <div className='p-3'>
                                                <h4 className='font-extrabold font'>Full Name</h4>
                                                <h6 className='text-sm font-thin'>Work Role, Company</h6>
                                                <p className='text-sm font-thin mt-2'>Teaching :</p>
                                                <p className='text-xs font-semibold'>Full Subject Name</p>
                                            </div>
                                        </div>
                                        <div className='border-2 rounded-2xl border-gray-400 bg-[#7683CC] hover:shadow-xl hover:transition-all hover:duration-200 hover:ease-out hover:shadow-custom-blue min-w-[290px] max-w-[290px]'>
                                            <div className=' border-gray-400 p-3'>
                                                <h1 className='text-xl font-bold'>Building Marketing Strategies</h1>
                                            </div>
                                            <div className='p-3'>
                                                <h4 className='font-extrabold font'>Full Name</h4>
                                                <h6 className='text-sm font-thin'>Work Role, Company</h6>
                                                <p className='text-sm font-thin mt-2'>Teaching :</p>
                                                <p className='text-xs font-semibold'>Full Subject Name</p>
                                            </div>
                                        </div>
                                        <div className='border-2 rounded-2xl border-gray-400 bg-[#7683CC] hover:shadow-xl hover:transition-all hover:duration-200 hover:ease-out hover:shadow-custom-blue min-w-[290px] max-w-[290px]'>
                                            <div className=' border-gray-400 p-3'>
                                                <h1 className='text-xl font-bold'>Building Marketing Strategies</h1>
                                            </div>
                                            <div className='p-3'>
                                                <h4 className='font-extrabold font'>Full Name</h4>
                                                <h6 className='text-sm font-thin'>Work Role, Company</h6>
                                                <p className='text-sm font-thin mt-2'>Teaching :</p>
                                                <p className='text-xs font-semibold'>Full Subject Name</p>
                                            </div>
                                        </div>

                                    </div>
                                    <button onClick={handleScrollRight} className='hidden lg:block' type="button">
                                        <ArrowForwardIosIcon sx={{ fontSize: '28px', color: '#141414', borderRadius: '50%', ":hover": { color: "#397FEB" }, background: '#94A4FF', height: '40px', width: '40px', padding: '5px' }} />
                                    </button>
                                    {/* <button onClick={handleScrollRight} className='hidden lg:block' type="button">
                                        <ArrowCircleRightRoundedIcon className='opacity-80' sx={{ fontSize: '50px', color: '#397FEB', ":hover": { color: "#397FEB" } }} />
                                    </button> */}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>


            </div>
        </div>
    );
};

export default Curriculum;