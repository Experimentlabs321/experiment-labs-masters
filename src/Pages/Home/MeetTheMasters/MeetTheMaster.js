import React, { useRef } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import OutboundOutlinedIcon from '@mui/icons-material/OutboundOutlined';
import { Button } from '@mui/material';
import ArrowCircleLeftRoundedIcon from '@mui/icons-material/ArrowCircleLeftRounded';
import ArrowCircleRightRoundedIcon from '@mui/icons-material/ArrowCircleRightRounded';
import './style.css';

const MeetTheMaster = () => {

    const containerRef = useRef(null);

    function handleScrollLeft() {
        containerRef.current.scrollLeft -= 300; // scroll left by 100 pixels
    }

    function handleScrollRight() {
        containerRef.current.scrollLeft += 300; // scroll right by 100 pixels
    }

    return (
        <div className='mt-44 px-10 lg:px-28'>
            <div className='mb-10 flex justify-between items-start'>
                <div>
                    <h1 className='text-2xl xl:text-4xl font-extrabold font'>Learn from the <span className='bg-gradient-to-t from-custom-blue to-transparent to-50%'>Masters, Hands-On</span></h1>
                    <p className='text-xl mt-2 font-thin'>Take a closer look into our classrooms
                    </p>
                </div>
                <div className='hidden lg:block'>
                    <Button endIcon={<OutboundOutlinedIcon />} size='large' variant='contained' sx={{ bgcolor: '#397FEB', ":hover": { bgcolor: '#0CC5DB' }, textTransform: 'capitalize' }}>Meet the Masters</Button>
                </div>
            </div>
            <div
                ref={containerRef}
                className='flex overflow-x-scroll scroll-smooth gap-5 mtm-container'
            >
                <div className='border-2 border-gray-400 bg-[#424242] hover:shadow-xl hover:transition-all hover:duration-200 hover:ease-out hover:shadow-custom-blue min-w-[290px] max-w-[290px]'>
                    <iframe
                        className='w-full h-[210px] object-cover'
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
                        className='w-full h-[210px] object-cover'
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
                        className='w-full h-[210px] object-cover'
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
                        className='w-full h-[210px] object-cover'
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
                        className='w-full h-[210px] object-cover'
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
                        className='w-full h-[210px] object-cover'
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
                        className='w-full h-[210px] object-cover'
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
                        className='w-full h-[210px] object-cover'
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
            <div className="carousel-button-group">
                <div className='flex justify-left mt-5'>
                    <button onClick={handleScrollLeft} className='hidden lg:block' type="button">
                        <ArrowCircleLeftRoundedIcon className='opacity-80' sx={{ fontSize: '50px', color: 'rgb(156 163 175)', ":hover": { color: "#397FEB" } }} />
                    </button>
                    <button onClick={handleScrollRight} className='hidden lg:block' type="button">
                        <ArrowCircleRightRoundedIcon className='opacity-80' sx={{ fontSize: '50px', color: '#397FEB', ":hover": { color: "#397FEB" } }} />
                    </button>
                </div>
            </div>
            <div className='block lg:hidden mt-10'>
                <Button endIcon={<OutboundOutlinedIcon />} size='large' variant='contained' sx={{ bgcolor: '#397FEB', ":hover": { bgcolor: '#0CC5DB' }, textTransform: 'capitalize', width: '100%' }}>Meet the Masters</Button>
            </div>
        </div>
    );
};

export default MeetTheMaster;