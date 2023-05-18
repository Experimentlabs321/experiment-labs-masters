import React, { useRef } from 'react';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import ArrowCircleLeftRoundedIcon from '@mui/icons-material/ArrowCircleLeftRounded';
import ArrowCircleRightRoundedIcon from '@mui/icons-material/ArrowCircleRightRounded';
import './style.css';

const Masters = () => {

    const containerRef = useRef(null);

    function handleScrollLeft() {
        containerRef.current.scrollLeft -= 300; // scroll left by 100 pixels
    }

    function handleScrollRight() {
        containerRef.current.scrollLeft += 300; // scroll right by 100 pixels
    }

    return (
        <div className='pt-40 flex flex-col justify-center pb-20 font'>
            <div className='px-10 lg:px-32'>
                <div className='flex flex-col lg:flex-row gap-16 justify-center items-center'>
                    <div>
                        <h2 className='text-3xl my-8'>Learn <span className='font-semibold bg-gradient-to-t from-custom-blue to-transparent to-50%'>Directly </span>
                            from your  <span className='font-semibold bg-gradient-to-t from-custom-blue to-transparent to-50%'>Future Recruiters</span></h2>

                        <div className='mb-8 flex flex-col gap-3'>
                            <div className='flex flex-row items-center gap-1'>
                                <span><PlayArrowRoundedIcon sx={{ color: '#397FEB' }} /></span>
                                <span style={{ fontWeight: '500', fontSize: '15px' }}>Take courses with top CXOs, MDs, startup founders and academicians from HBS, McKinsey and more!</span>
                            </div>
                            <div className='flex flex-row items-center gap-1'>
                                <span><PlayArrowRoundedIcon sx={{ color: '#397FEB' }} /></span>
                                <span style={{ fontWeight: '500', fontSize: '15px' }}>Learn tech, business and related core skills from highly-rated and experienced Professors-in-Residence</span>
                            </div>
                            <div className='flex flex-row items-center gap-1'>
                                <span><PlayArrowRoundedIcon sx={{ color: '#397FEB' }} /></span>
                                <span style={{ fontWeight: '500', fontSize: '15px' }}>Get 1-1 mentorship and shadow Masters in your preferred domain</span>
                            </div>
                        </div>

                    </div>
                    <div className='flex flex-col items-center gap-3'>
                        <iframe
                            className='rounded-2xl w-full h-[290px] lg:min-w-[500px]'
                            style={{ borderRight: "5px solid rgb(57 , 127 , 235, 0.2)", borderBottom: "5px solid rgb(57 , 127 , 235, 0.2)" }}
                            src={`https://dsqqu7oxq6o1v.cloudfront.net/motion-array-1177701-mBCKbnRAFv-high.mp4`}
                            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title="Embedded youtube"
                        />
                    </div>
                </div>


                <div className='mt-16 flex flex-col lg:flex-row'>
                    <div className='mb-10 flex justify-between items-start'>
                        <div>
                            <h1 className='text-xl w-[200px] font-bold font'>Explore Course <span className='bg-gradient-to-t from-custom-blue to-transparent to-50%'>
                                Roster</span></h1>
                            <button className='mt-5 px-6 py-2 bg-custom-blue rounded font-bold hover:bg-opacity-75'>See All</button>
                            <div className="carousel-button-group">
                                <div className='flex justify-left mt-5'>
                                    <button onClick={handleScrollLeft} className='hidden md:block' type="button">
                                        <ArrowCircleLeftRoundedIcon className='opacity-80' sx={{ fontSize: '50px', color: 'rgb(156 163 175)', ":hover": { color: "#397FEB" } }} />
                                    </button>
                                    <button onClick={handleScrollRight} className='hidden md:block' type="button">
                                        <ArrowCircleRightRoundedIcon className='opacity-80' sx={{ fontSize: '50px', color: '#397FEB', ":hover": { color: "#397FEB" } }} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        ref={containerRef}
                        className='flex overflow-x-scroll scroll-smooth gap-5 mtm-container'
                    >
                        <div className='border-2 border-gray-400 bg-[#424242] hover:shadow-xl hover:transition-all hover:duration-200 hover:ease-out hover:shadow-custom-blue min-w-[290px] max-w-[290px]'>
                            <iframe
                                className='w-full h-[150px] object-cover'
                                src={`https://dsqqu7oxq6o1v.cloudfront.net/motion-array-1290096-NRkICuxxxg-high.mp4`}
                                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                title="Embedded youtube"
                            />
                            <div className='p-3'>
                                <h4 className='font-extrabold font'>Full Name</h4>
                                <h6 className='text-sm font-thin'>Work Role, Company</h6>
                                <p className='text-sm font-thin mt-2'>Teaching :</p>
                                <p className='text-xs font-semibold'>Full Subject Name</p>
                            </div>
                        </div>
                        <div className='border-2 border-gray-400 bg-[#424242] hover:shadow-xl hover:transition-all hover:duration-200 hover:ease-out hover:shadow-custom-blue min-w-[290px] max-w-[290px]'>
                            <iframe
                                className='w-full h-[150px] object-cover'
                                src={`https://dsqqu7oxq6o1v.cloudfront.net/motion-array-1290096-NRkICuxxxg-high.mp4`}
                                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                title="Embedded youtube"
                            />
                            <div className='p-3'>
                                <h4 className='font-extrabold font'>Full Name</h4>
                                <h6 className='text-sm font-thin'>Work Role, Company</h6>
                                <p className='text-sm font-thin mt-2'>Teaching :</p>
                                <p className='text-xs font-semibold'>Full Subject Name</p>
                            </div>
                        </div>
                        <div className='border-2 border-gray-400 bg-[#424242] hover:shadow-xl hover:transition-all hover:duration-200 hover:ease-out hover:shadow-custom-blue min-w-[290px] max-w-[290px]'>
                            <iframe
                                className='w-full h-[150px] object-cover'
                                src={`https://dsqqu7oxq6o1v.cloudfront.net/motion-array-1290096-NRkICuxxxg-high.mp4`}
                                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                title="Embedded youtube"
                            />
                            <div className='p-3'>
                                <h4 className='font-extrabold font'>Full Name</h4>
                                <h6 className='text-sm font-thin'>Work Role, Company</h6>
                                <p className='text-sm font-thin mt-2'>Teaching :</p>
                                <p className='text-xs font-semibold'>Full Subject Name</p>
                            </div>
                        </div>
                        <div className='border-2 border-gray-400 bg-[#424242] hover:shadow-xl hover:transition-all hover:duration-200 hover:ease-out hover:shadow-custom-blue min-w-[290px] max-w-[290px]'>
                            <iframe
                                className='w-full h-[150px] object-cover'
                                src={`https://dsqqu7oxq6o1v.cloudfront.net/motion-array-1290096-NRkICuxxxg-high.mp4`}
                                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                title="Embedded youtube"
                            />
                            <div className='p-3'>
                                <h4 className='font-extrabold font'>Full Name</h4>
                                <h6 className='text-sm font-thin'>Work Role, Company</h6>
                                <p className='text-sm font-thin mt-2'>Teaching :</p>
                                <p className='text-xs font-semibold'>Full Subject Name</p>
                            </div>
                        </div>
                        <div className='border-2 border-gray-400 bg-[#424242] hover:shadow-xl hover:transition-all hover:duration-200 hover:ease-out hover:shadow-custom-blue min-w-[290px] max-w-[290px]'>
                            <iframe
                                className='w-full h-[150px] object-cover'
                                src={`https://dsqqu7oxq6o1v.cloudfront.net/motion-array-1290096-NRkICuxxxg-high.mp4`}
                                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                title="Embedded youtube"
                            />
                            <div className='p-3'>
                                <h4 className='font-extrabold font'>Full Name</h4>
                                <h6 className='text-sm font-thin'>Work Role, Company</h6>
                                <p className='text-sm font-thin mt-2'>Teaching :</p>
                                <p className='text-xs font-semibold'>Full Subject Name</p>
                            </div>
                        </div>
                        <div className='border-2 border-gray-400 bg-[#424242] hover:shadow-xl hover:transition-all hover:duration-200 hover:ease-out hover:shadow-custom-blue min-w-[290px] max-w-[290px]'>
                            <iframe
                                className='w-full h-[150px] object-cover'
                                src={`https://dsqqu7oxq6o1v.cloudfront.net/motion-array-1290096-NRkICuxxxg-high.mp4`}
                                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                title="Embedded youtube"
                            />
                            <div className='p-3'>
                                <h4 className='font-extrabold font'>Full Name</h4>
                                <h6 className='text-sm font-thin'>Work Role, Company</h6>
                                <p className='text-sm font-thin mt-2'>Teaching :</p>
                                <p className='text-xs font-semibold'>Full Subject Name</p>
                            </div>
                        </div>
                        <div className='border-2 border-gray-400 bg-[#424242] hover:shadow-xl hover:transition-all hover:duration-200 hover:ease-out hover:shadow-custom-blue min-w-[290px] max-w-[290px]'>
                            <iframe
                                className='w-full h-[150px] object-cover'
                                src={`https://dsqqu7oxq6o1v.cloudfront.net/motion-array-1290096-NRkICuxxxg-high.mp4`}
                                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                title="Embedded youtube"
                            />
                            <div className='p-3'>
                                <h4 className='font-extrabold font'>Full Name</h4>
                                <h6 className='text-sm font-thin'>Work Role, Company</h6>
                                <p className='text-sm font-thin mt-2'>Teaching :</p>
                                <p className='text-xs font-semibold'>Full Subject Name</p>
                            </div>
                        </div>
                        <div className='border-2 border-gray-400 bg-[#424242] hover:shadow-xl hover:transition-all hover:duration-200 hover:ease-out hover:shadow-custom-blue min-w-[290px] max-w-[290px]'>
                            <iframe
                                className='w-full h-[150px] object-cover'
                                src={`https://dsqqu7oxq6o1v.cloudfront.net/motion-array-1290096-NRkICuxxxg-high.mp4`}
                                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                title="Embedded youtube"
                            />
                            <div className='p-3'>
                                <h4 className='font-extrabold font'>Full Name</h4>
                                <h6 className='text-sm font-thin'>Work Role, Company</h6>
                                <p className='text-sm font-thin mt-2'>Teaching :</p>
                                <p className='text-xs font-semibold'>Full Subject Name</p>
                            </div>
                        </div>

                    </div>
                </div>


            </div>
        </div>
    );
};

export default Masters;