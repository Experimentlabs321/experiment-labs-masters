import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import OutboundOutlinedIcon from '@mui/icons-material/OutboundOutlined';
import { Button } from '@mui/material';
import ArrowCircleLeftRoundedIcon from '@mui/icons-material/ArrowCircleLeftRounded';
import ArrowCircleRightRoundedIcon from '@mui/icons-material/ArrowCircleRightRounded';

const MeetTheMaster = () => {

    const responsive = {

        superLargeDesktop: {
            breakpoint: { max: 4000, min: 1460 },
            items: 4,
        },
        desktop: {
            breakpoint: { max: 1459, min: 1181 },
            items: 3,
        },
        tablet: {
            breakpoint: { max: 1181, min: 768 },
            items: 2,
        },
        mobile: {
            breakpoint: { max: 767, min: 401 },
            items: 1,
        },
        smallMobile: {
            breakpoint: { max: 400, min: 0 },
            items: 1,
        },
    };

    const ButtonGroup = ({ next, previous, goToSlide, ...rest }) => {
        const { carouselState: { currentSlide } } = rest;
        return (
            <div className="carousel-button-group">
                <div className='flex justify-left mt-5'>
                    <button className='hidden md:block' type="button" onClick={()=>previous()}>
                        <ArrowCircleLeftRoundedIcon className='opacity-80' sx={{ fontSize: '50px', color: 'rgb(156 163 175)', ":hover": { color: "#397FEB" } }} />
                    </button>
                    <button className='hidden md:block' type="button" onClick={()=>next()}>
                        <ArrowCircleRightRoundedIcon className='opacity-80' sx={{ fontSize: '50px', color: '#397FEB', ":hover": { color: "#397FEB" } }} />
                    </button>
                </div>
            </div>
        );
    };




    return (
        <div className='mt-44 px-10 lg:px-32'>
            <div className='mb-10 flex justify-between items-start'>
                <div>
                    <h1 className='text-2xl xl:text-4xl font-extrabold font-serif'>Learn from the <span className='bg-gradient-to-t from-custom-blue to-transparent to-50%'>Masters, Hands-On</span></h1>
                    <p className='text-xl mt-2 font-thin'>Take a closer look into our classrooms
                    </p>
                </div>
                <div className='hidden md:block'>
                    <Button endIcon={<OutboundOutlinedIcon />} size='large' variant='contained' sx={{ bgcolor: '#397FEB', ":hover": { bgcolor: '#0CC5DB' }, textTransform: 'capitalize' }}>Meet the Masters</Button>
                </div>
            </div>
            <Carousel
                className='w-full pr-10 relative'
                responsive={responsive}
                partialVisbile={true}
                arrows={true}
                renderButtonGroupOutside={true}
                removeArrowOnDeviceType={["tablet", "desktop", "superLargeDesktop"]}
                customButtonGroup={<ButtonGroup />}
            >
                <div className='border-2 border-dark hover:shadow-xl hover:transition-all hover:duration-200 hover:ease-out hover:shadow-custom-blue pmr-10 w-full md:w-[290px]'>
                    <iframe
                        className='w-full h-[280px] object-cover'
                        src={`https://dsqqu7oxq6o1v.cloudfront.net/motion-array-1290096-NRkICuxxxg-high.mp4`}
                        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title="Embedded youtube"
                    />
                    <div className='p-3'>
                        <h4 className='font-extrabold font-serif'>Full Name</h4>
                        <h6 className='text-sm font-thin'>Work Role, Company</h6>
                        <p className='text-sm font-thin mt-2'>Teaching :</p>
                        <p className='text-xs font-semibold'>Full Subject Name</p>
                    </div>
                </div>
                <div className='border-2 border-dark hover:shadow-xl hover:transition-all hover:duration-200 hover:ease-out hover:shadow-custom-blue mr-10 w-full md:w-[290px]'>
                    <iframe
                        className='w-full h-[280px] object-cover'
                        src={`https://dsqqu7oxq6o1v.cloudfront.net/motion-array-1290096-NRkICuxxxg-high.mp4`}
                        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title="Embedded youtube"
                    />
                    <div className='p-3'>
                        <h4 className='font-extrabold font-serif'>Full Name</h4>
                        <h6 className='text-sm font-thin'>Work Role, Company</h6>
                        <p className='text-sm font-thin mt-2'>Teaching :</p>
                        <p className='text-xs font-semibold'>Full Subject Name</p>
                    </div>
                </div>
                <div className='border-2 border-dark hover:shadow-xl hover:transition-all hover:duration-200 hover:ease-out hover:shadow-custom-blue mr-10 w-full md:w-[290px]'>
                    <iframe
                        className='w-full h-[280px] object-cover'
                        src={`https://dsqqu7oxq6o1v.cloudfront.net/motion-array-1290096-NRkICuxxxg-high.mp4`}
                        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title="Embedded youtube"
                    />
                    <div className='p-3'>
                        <h4 className='font-extrabold font-serif'>Full Name</h4>
                        <h6 className='text-sm font-thin'>Work Role, Company</h6>
                        <p className='text-sm font-thin mt-2'>Teaching :</p>
                        <p className='text-xs font-semibold'>Full Subject Name</p>
                    </div>
                </div>
                <div className='border-2 border-dark hover:shadow-xl hover:transition-all hover:duration-200 hover:ease-out hover:shadow-custom-blue mr-10 w-full md:w-[290px]'>
                    <iframe
                        className='w-full h-[280px] object-cover'
                        src={`https://dsqqu7oxq6o1v.cloudfront.net/motion-array-1290096-NRkICuxxxg-high.mp4`}
                        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title="Embedded youtube"
                    />
                    <div className='p-3'>
                        <h4 className='font-extrabold font-serif'>Full Name</h4>
                        <h6 className='text-sm font-thin'>Work Role, Company</h6>
                        <p className='text-sm font-thin mt-2'>Teaching :</p>
                        <p className='text-xs font-semibold'>Full Subject Name</p>
                    </div>
                </div>
                <div className='border-2 border-dark hover:shadow-xl hover:transition-all hover:duration-200 hover:ease-out hover:shadow-custom-blue mr-10 w-full md:w-[290px]'>
                    <iframe
                        className='w-full h-[280px] object-cover'
                        src={`https://dsqqu7oxq6o1v.cloudfront.net/motion-array-1290096-NRkICuxxxg-high.mp4`}
                        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title="Embedded youtube"
                    />
                    <div className='p-3'>
                        <h4 className='font-extrabold font-serif'>Full Name</h4>
                        <h6 className='text-sm font-thin'>Work Role, Company</h6>
                        <p className='text-sm font-thin mt-2'>Teaching :</p>
                        <p className='text-xs font-semibold'>Full Subject Name</p>
                    </div>
                </div>
                <div className='border-2 border-dark hover:shadow-xl hover:transition-all hover:duration-200 hover:ease-out hover:shadow-custom-blue mr-10 w-full md:w-[290px]'>
                    <iframe
                        className='w-full h-[280px] object-cover'
                        src={`https://dsqqu7oxq6o1v.cloudfront.net/motion-array-1290096-NRkICuxxxg-high.mp4`}
                        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title="Embedded youtube"
                    />
                    <div className='p-3'>
                        <h4 className='font-extrabold font-serif'>Full Name</h4>
                        <h6 className='text-sm font-thin'>Work Role, Company</h6>
                        <p className='text-sm font-thin mt-2'>Teaching :</p>
                        <p className='text-xs font-semibold'>Full Subject Name</p>
                    </div>
                </div>
                <div className='border-2 border-dark hover:shadow-xl hover:transition-all hover:duration-200 hover:ease-out hover:shadow-custom-blue mr-10 w-full md:w-[290px]'>
                    <iframe
                        className='w-full h-[280px] object-cover'
                        src={`https://dsqqu7oxq6o1v.cloudfront.net/motion-array-1290096-NRkICuxxxg-high.mp4`}
                        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title="Embedded youtube"
                    />
                    <div className='p-3'>
                        <h4 className='font-extrabold font-serif'>Full Name</h4>
                        <h6 className='text-sm font-thin'>Work Role, Company</h6>
                        <p className='text-sm font-thin mt-2'>Teaching :</p>
                        <p className='text-xs font-semibold'>Full Subject Name</p>
                    </div>
                </div>
                <div className='border-2 border-dark hover:shadow-xl hover:transition-all hover:duration-200 hover:ease-out hover:shadow-custom-blue mr-10 w-full md:w-[290px]'>
                    <iframe
                        className='w-full h-[280px] object-cover'
                        src={`https://dsqqu7oxq6o1v.cloudfront.net/motion-array-1290096-NRkICuxxxg-high.mp4`}
                        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title="Embedded youtube"
                    />
                    <div className='p-3'>
                        <h4 className='font-extrabold font-serif'>Full Name</h4>
                        <h6 className='text-sm font-thin'>Work Role, Company</h6>
                        <p className='text-sm font-thin mt-2'>Teaching :</p>
                        <p className='text-xs font-semibold'>Full Subject Name</p>
                    </div>
                </div>

            </Carousel>
            <div className='block md:hidden mt-10'>
                <Button endIcon={<OutboundOutlinedIcon />} size='large' variant='contained' sx={{ bgcolor: '#397FEB', ":hover": { bgcolor: '#0CC5DB' }, textTransform: 'capitalize', width: '100%' }}>Meet the Masters</Button>
            </div>
        </div>
    );
};

export default MeetTheMaster;