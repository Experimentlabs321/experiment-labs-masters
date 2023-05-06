import { Button } from '@mui/material';
import React from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import Stories from 'react-insta-stories';
import OutboundOutlinedIcon from '@mui/icons-material/OutboundOutlined';
import './style.css';
import logo2 from '../../../assets/Logos/Group 2859889.png';

const AllCourses = () => {

    const [selectedIndex, setSelectedIndex] = useState(0);

    const stickyRef = useRef(null);
    const stickyRef2 = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            const containerRect = containerRef.current.getBoundingClientRect();
            const stickyRect = stickyRef.current.getBoundingClientRect();
            const stickyRect2 = stickyRef2.current.getBoundingClientRect();
            const bottomOffset = containerRect.bottom - stickyRect.height;
            const bottomOffset2 = containerRect.bottom - stickyRect2.height;

            // console.log(bottomOffset, bottomOffset2);

            if ((bottomOffset < 0) && (window.innerWidth > 1024)) {
                stickyRef.current.style.position = 'absolute';
                stickyRef2.current.style.position = 'absolute';
                stickyRef.current.style.bottom = '0';
                stickyRef2.current.style.bottom = '0';
            } else {
                stickyRef.current.style.position = 'sticky';
                stickyRef2.current.style.position = 'sticky';
                stickyRef.current.style.bottom = 'auto';
                stickyRef2.current.style.bottom = 'auto';
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const [selected, setSelected] = useState(0);
    const [lastScrolledTo, setLastScrolledTo] = useState(0);

    const handleClick = (id) => {
        setSelected(id);
        setLastScrolledTo(id);
        const element = document.getElementById(id);
        window.scrollTo({
            top: element.offsetTop - 260,
            behavior: "smooth"
        });

    };


    useEffect(() => {
        const handleScroll = () => {
            const elements = document.querySelector(".getId").children;
            const scrollPosition = window.scrollY + window.innerHeight;



            for (let i = 0; i < elements.length; i++) {
                const element = elements[i];
                const elementPosition = element.offsetTop - 260 + element.offsetHeight;

                if (scrollPosition >= elementPosition) {
                    setSelected(Number(element.id));
                }
            }


            console.log('selected ---->', selected);
            console.log('lastScrolledTO ---->', lastScrolledTo);

        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div className='mt-28 px-10 py-10 lg:px-32' ref={containerRef}>
            <h1 className='font-bold text-4xl font-serif block lg:hidden mb-6 lg:mb-0'>Hands-on. <span className='bg-gradient-to-t from-green to-transparent to-50%'>Disruptive. Experiential.</span></h1>
            <div ref={stickyRef} style={{ top: 70, backgroundColor: 'white', padding: "35px 0", zIndex: '1000', width: '100%' }} className='hidden lg:block'>
                <h1 className='font-bold text-4xl font-serif'>Hands-on. <span className='bg-gradient-to-t from-green to-transparent to-50%'>Disruptive. Experiential.</span></h1>
                <h6 className='text-lg mt-2 font-light'>See how we teach across all our courses</h6>

            </div>
            <div className='flex flex-row gap-10 items-start'>
                <div ref={stickyRef2} style={{ position: 'sticky', top: 220, backgroundColor: 'white', zIndex: '1' }} className='hidden lg:flex flex-col gap-5 min-w-[300px] sticky'>
                    <span onClick={() => handleClick(0)} className={`${selected === 0 && 'shadow-lg shadow-green border-2'} border-dark text-dark hover:border-2 rounded-xl py-4 pl-4 transition-all duration-100 ease-in cursor-pointer`}>0 to 1 Journey</span>
                    <span onClick={() => handleClick(1)} className={`${selected === 1 && 'shadow-lg shadow-green border-2'} border-dark text-dark hover:border-2 rounded-xl py-4 pl-4 transition-all duration-100 ease-in cursor-pointer`}>Creator Challenge</span>
                    <span onClick={() => handleClick(2)} className={`${selected === 2 && 'shadow-lg shadow-green border-2'} border-dark text-dark hover:border-2 rounded-xl py-4 pl-4 transition-all duration-100 ease-in cursor-pointer`}>Local Consulting Challenge</span>
                    <span onClick={() => handleClick(3)} className={`${selected === 3 && 'shadow-lg shadow-green border-2'} border-dark text-dark hover:border-2 rounded-xl py-4 pl-4 transition-all duration-100 ease-in cursor-pointer`}>Venture Initiation Program</span>
                    <span onClick={() => handleClick(4)} className={`${selected === 4 && 'shadow-lg shadow-green border-2'} border-dark text-dark hover:border-2 rounded-xl py-4 pl-4 transition-all duration-100 ease-in cursor-pointer`}>Startup Weekends</span>
                    <span onClick={() => handleClick(5)} className={`${selected === 5 && 'shadow-lg shadow-green border-2'} border-dark text-dark hover:border-2 rounded-xl py-4 pl-4 transition-all duration-100 ease-in cursor-pointer`}>CXO Mentorship Programme</span>
                    <span onClick={() => handleClick(6)} className={`${selected === 6 && 'shadow-lg shadow-green border-2'} border-dark text-dark hover:border-2 rounded-xl py-4 pl-4 transition-all duration-100 ease-in cursor-pointer`}>Student Investment Fund</span>
                </div>
                <div className='hidden w-full lg:flex flex-col gap-5 getId'>
                    <div className='w-full rounded-lg bg-green bg-opacity-20 flex p-10 items-start gap-10' id={0}>
                        <div>
                            <h1 className='text-2xl font-bold font-serif text-dark'>Launch and Build your own Products & Business</h1>
                            <p className='text-sm font-light my-3'>From finding the right idea to building the product to getting sales and building financial models you will learn how different careers look like in a corporation.</p>
                            <p className='text-sm font-light my-3'>Get exposure to over <span className='font-semibold'>50+ Career option.</span>
                            </p>

                            <p className='hidden lg:block'>Some of our Student Brands</p>

                            <div className='flex lg:hidden justify-between items-center'>
                                <p>Some of our Student Brands</p>
                                <Button className='hidden lg:block' endIcon={<OutboundOutlinedIcon />} size='large' variant='text' sx={{ color: '#0CC5DB', ":hover": { color: '#3EE8B5' }, textTransform: 'capitalize', width: '160px' }}>See All</Button>
                            </div>

                            <div className='hidden lg:grid grid-cols-2 lg:grid-cols-3 gap-4 pt-4 pb-8 pr-5'>
                                <img className='h-12 hover:shadow-md hover:shadow-green transition-all duration-100 ease-in cursor-pointer p-2 rounded-lg' src={logo2} alt="logo" />
                                <img className='h-12 hover:shadow-md hover:shadow-green transition-all duration-100 ease-in cursor-pointer p-2 rounded-lg' src={logo2} alt="logo" />
                                <img className='h-12 hover:shadow-md hover:shadow-green transition-all duration-100 ease-in cursor-pointer p-2 rounded-lg' src={logo2} alt="logo" />
                                <img className='h-12 hover:shadow-md hover:shadow-green transition-all duration-100 ease-in cursor-pointer p-2 rounded-lg' src={logo2} alt="logo" />
                                <img className='h-12 hover:shadow-md hover:shadow-green transition-all duration-100 ease-in cursor-pointer p-2 rounded-lg' src={logo2} alt="logo" />
                                <img className='h-12 hover:shadow-md hover:shadow-green transition-all duration-100 ease-in cursor-pointer p-2 rounded-lg' src={logo2} alt="logo" />
                            </div>
                            <div className='grid lg:hidden grid-cols-2 lg:grid-cols-3 gap-4 pt-4 pb-8 pr-5'>
                                <img className='h-12 hover:shadow-md hover:shadow-green transition-all duration-100 ease-in cursor-pointer p-2 rounded-lg' src={logo2} alt="logo" />
                                <img className='h-12 hover:shadow-md hover:shadow-green transition-all duration-100 ease-in cursor-pointer p-2 rounded-lg' src={logo2} alt="logo" />
                            </div>
                            <div className='hidden lg:block'>
                                <Button endIcon={<OutboundOutlinedIcon />} size='large' variant='contained' sx={{ bgcolor: '#0CC5DB', ":hover": { bgcolor: '#3EE8B5' }, textTransform: 'capitalize', width: '160px' }}>See All</Button>
                            </div>
                        </div>
                        <div className='z-0 hidden lg:block'>
                            <iframe
                                loop={true}
                                height={450}
                                width={280}
                                keyboardNavigation={true}
                                style={{ borderRadius: '15px', border: '1px solid gray' }}
                                currentIndex={selectedIndex}
                                src='https://dsqqu7oxq6o1v.cloudfront.net/motion-array-1388812-A012_06252056_C069-high.mp4'
                                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                title="Embedded video"
                            />
                        </div>
                    </div>
                    <div className='w-full h-96 bg-green bg-opacity-20' id={1}></div>
                    <div className='w-full h-96 bg-green bg-opacity-20' id={2}></div>
                    <div className='w-full h-96 bg-green bg-opacity-20' id={3}></div>
                    <div className='w-full h-96 bg-green bg-opacity-20' id={4}></div>
                    <div className='w-full h-96 bg-green bg-opacity-20' id={5}></div>
                    <div className='w-full h-96 bg-green bg-opacity-20' id={6}></div>
                </div>

                <div className='block lg:hidden'>
                    <div className='getId all-parent-container'>
                        <div className='w-full rounded-lg bg-green all-courses bg-opacity-20 flex p-10 items-start gap-10' id={0}>
                            <div>
                                <h1 className='text-2xl font-bold font-serif text-dark'>Launch and Build your own Products & Business</h1>
                                <p className='text-sm font-light my-3'>From finding the right idea to building the product to getting sales and building financial models you will learn how different careers look like in a corporation.</p>
                                <p className='text-sm font-light my-3'>Get exposure to over <span className='font-semibold'>50+ Career option.</span>
                                </p>

                                <p className='hidden lg:block'>Some of our Student Brands</p>

                                <div className='flex lg:hidden justify-between items-center'>
                                    <p>Some of our Student Brands</p>
                                    <Button className='hidden lg:block' endIcon={<OutboundOutlinedIcon />} size='large' variant='text' sx={{ color: '#0CC5DB', ":hover": { color: '#3EE8B5' }, textTransform: 'capitalize', width: '160px' }}>See All</Button>
                                </div>

                                <div className='hidden lg:grid grid-cols-2 lg:grid-cols-3 gap-4 pt-4 pb-8 pr-5'>
                                    <img className='h-12 hover:shadow-md hover:shadow-green transition-all duration-100 ease-in cursor-pointer p-2 rounded-lg' src={logo2} alt="logo" />
                                    <img className='h-12 hover:shadow-md hover:shadow-green transition-all duration-100 ease-in cursor-pointer p-2 rounded-lg' src={logo2} alt="logo" />
                                    <img className='h-12 hover:shadow-md hover:shadow-green transition-all duration-100 ease-in cursor-pointer p-2 rounded-lg' src={logo2} alt="logo" />
                                    <img className='h-12 hover:shadow-md hover:shadow-green transition-all duration-100 ease-in cursor-pointer p-2 rounded-lg' src={logo2} alt="logo" />
                                    <img className='h-12 hover:shadow-md hover:shadow-green transition-all duration-100 ease-in cursor-pointer p-2 rounded-lg' src={logo2} alt="logo" />
                                    <img className='h-12 hover:shadow-md hover:shadow-green transition-all duration-100 ease-in cursor-pointer p-2 rounded-lg' src={logo2} alt="logo" />
                                </div>
                                <div className='grid lg:hidden grid-cols-2 lg:grid-cols-3 gap-4 pt-4 pb-8 pr-5'>
                                    <img className='h-12 hover:shadow-md hover:shadow-green transition-all duration-100 ease-in cursor-pointer p-2 rounded-lg' src={logo2} alt="logo" />
                                    <img className='h-12 hover:shadow-md hover:shadow-green transition-all duration-100 ease-in cursor-pointer p-2 rounded-lg' src={logo2} alt="logo" />
                                </div>
                                <div className='hidden lg:block'>
                                    <Button endIcon={<OutboundOutlinedIcon />} size='large' variant='contained' sx={{ bgcolor: '#0CC5DB', ":hover": { bgcolor: '#3EE8B5' }, textTransform: 'capitalize', width: '160px' }}>See All</Button>
                                </div>
                            </div>
                            <div className='z-0 hidden lg:block'>
                                <iframe
                                    loop={true}
                                    height={450}
                                    width={280}
                                    keyboardNavigation={true}
                                    style={{ borderRadius: '15px', border: '1px solid gray' }}
                                    currentIndex={selectedIndex}
                                    src='https://dsqqu7oxq6o1v.cloudfront.net/motion-array-1388812-A012_06252056_C069-high.mp4'
                                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    title="Embedded video"
                                />
                            </div>
                        </div>
                        <div className='w-full h-96 bg-green all-courses bg-opacity-20' id={1}></div>
                        <div className='w-full h-96 bg-green all-courses bg-opacity-20' id={2}></div>
                        <div className='w-full h-96 bg-green all-courses bg-opacity-20' id={3}></div>
                        <div className='w-full h-96 bg-green all-courses bg-opacity-20' id={4}></div>
                        <div className='w-full h-96 bg-green all-courses bg-opacity-20' id={5}></div>
                        <div className='w-full h-96 bg-green all-courses bg-opacity-20' id={6}></div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AllCourses;