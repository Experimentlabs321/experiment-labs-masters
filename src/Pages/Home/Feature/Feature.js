import React, { useEffect, useRef, useState } from 'react';
import './style.css';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import WorkRoundedIcon from '@mui/icons-material/WorkRounded';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import { Button } from '@mui/material';
import { ArrowCircleRightOutlined } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const Feature = () => {


    const [courses, setCourses] = useState([
        // Science/Innovation
        // Commerce/Entrepreneurship
        // Humanities/Arts
        // Delete the option   
        {
            category: 'All',
            details: [
                {
                    category: 'Science/Innovation',
                    title: 'Leadership and career planning through innovation',
                    data: [
                        '12 Weeks',
                        'Hybrid',
                        '130+ Hours',
                        'Entrance Based Selection: Olympiad'
                    ],
                    info: [
                        'Experience 12+ careers based on 40+ Skills',
                        'Build your own innovative products and learn about different innovation based careers',
                        'Industry projects from Zomato, Swiggy, Nykaa and many more'
                    ]
                },
                {
                    title: 'Leadership and career planning through Business',
                    category: 'Commerce/Entrepreneurship',
                    data: [
                        '12 Weeks',
                        'Hybrid',
                        '130+ Hours',
                        'Entrance Based Selection: Olympiad'
                    ],
                    info: [
                        'Experience 20+ careers based on 40+ Skills',
                        'Build your own ventures and learn about different business based careers and path to leadership',
                        'Build Strong portfolios, chart out the best indian and international institutions and how to get admissions'
                    ]
                },
                {
                    category: 'Humanities/Arts',
                    title: 'Leadership and career planning through Creativity',
                    data: [
                        '12 Weeks',
                        'Hybrid',
                        '130+ Hours',
                        'Entrance Based Selection: Olympiad'
                    ],
                    info: [
                        'Experience 15+ careers based on 40+ Skills',
                        'Learn about different career options by experiential learning',
                        'Connect with industry experts and mentors to get guidance and advice.'
                    ]
                }

            ]
        },
        {
            category: 'Science/Innovation',
            details: [
                {
                    category: 'Science/Innovation',
                    title: 'Leadership and career planning through innovation',
                    data: [
                        '12 Weeks',
                        'Hybrid',
                        '130+ Hours',
                        'Entrance Based Selection: Olympiad'
                    ],
                    info: [
                        'Experience 12+ careers based on 40+ Skills',
                        'Build your own innovative products and learn about different innovation based careers',
                        'Industry projects from Zomato, Swiggy, Nykaa and many more'
                    ]
                }
            ]
        },
        {
            category: 'Commerce/Entrepreneurship',
            details: [
                {
                    title: 'Leadership and career planning through Business',
                    category: 'Commerce/Entrepreneurship',
                    data: [
                        '12 Weeks',
                        'Hybrid',
                        '130+ Hours',
                        'Entrance Based Selection: Olympiad'
                    ],
                    info: [
                        'Experience 20+ careers based on 40+ Skills',
                        'Build your own ventures and learn about different business based careers and path to leadership',
                        'Build Strong portfolios, chart out the best indian and international institutions and how to get admissions'
                    ]
                }
            ]
        },
        {
            category: 'Humanities/Arts',
            details: [
                {
                    category: 'Humanities/Arts',
                    title: 'Leadership and career planning through Creativity',
                    data: [
                        '12 Weeks',
                        'Hybrid',
                        '130+ Hours',
                        'Entrance Based Selection: Olympiad'
                    ],
                    info: [
                        'Experience 15+ careers based on 40+ Skills',
                        'Learn about different career options by experiential learning',
                        'Connect with industry experts and mentors to get guidance and advice.'
                    ]
                }
            ]
        }

    ]);

    const [selectedIndex, setSelectedIndex] = useState(0);

    const stickyRef = useRef(null);
    const containerRef = useRef(null);

    const [isLargeScreen, setIsLargeScreen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsLargeScreen(window.innerWidth > 1024);
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        if (isLargeScreen) {
            const handleScroll = () => {
                const containerRect = containerRef.current.getBoundingClientRect();
                const stickyRect = stickyRef?.current?.getBoundingClientRect();
                const bottomOffset = containerRect.bottom - stickyRect?.height;

                if (bottomOffset < 0) {
                    stickyRef.current.style.position = 'absolute';
                    stickyRef.current.style.bottom = '0';
                } else {
                    stickyRef.current.style.position = 'sticky';
                    stickyRef.current.style.bottom = 'auto';
                }
            }

            window.addEventListener('scroll', handleScroll);
            return () => window.removeEventListener('scroll', handleScroll);
        }
    }, [isLargeScreen]);

    // console.log(isLargeScreen);

    return (
        <div className='px-5 lg:px-40 mt-20' ref={containerRef}>
            <div ref={stickyRef} style={{ position: `${isLargeScreen ? 'sticky' : 'block'}`, top: 75, backgroundColor: 'white', padding: "30px 0", zIndex: '1000' }}>
                <h1 className='text-4xl font-serif'>Envision. Experiment. Educate. Enable.</h1>
                <h1 className='text-4xl font-serif font-extrabold mt-2'><span className='bg-gradient-to-t from-green to-50% to-transparent'>Hands-on</span> & <span className='bg-gradient-to-t from-green to-50% to-transparent'>Placement</span> Driven Programmes</h1>
                <div className='parent-container'>
                    {
                        courses.map((course, index) => (
                            <div onClick={() => setSelectedIndex(index)} className={`courses ${selectedIndex === index && 'bg-green'}`} key={index}>
                                {course?.category}
                            </div>
                        ))
                    }
                </div>
            </div>



            <div className='hidden lg:grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mt-8'>
                {
                    courses[selectedIndex]?.details?.map((course, index) =>
                        <div style={{ border: "2px solid gray" }} key={index} className='border-2 rounded-xl hover:shadow-green hover:shadow-lg relative'>
                            <div style={{ borderBottom: "2px solid gray" }} className='w-full p-5'>
                                <span className='bg-green px-2 py-1 rounded-lg font-extralight text-dark'>{course.category}</span>
                                <h4 className='text-xl font-bold mt-3 font-sans'>{course.title}</h4>
                            </div>
                            <div className='w-full pt-5 px-5'>
                                <div style={{ borderBottom: "2px solid gray" }} className='pb-5 grid grid-cols-2 justify-between gap-y-4'>
                                    <div className='flex items-center'><span className='bg-green p-[6px] rounded mr-2'><AccessTimeRoundedIcon /></span><span style={{ fontSize: '12px' }} className='font-bold'>{course?.data[0]}</span></div>
                                    <div className='flex items-center'><span className='bg-green p-[6px] rounded mr-2'><LocationOnRoundedIcon /></span><span style={{ fontSize: '12px' }} className='font-bold'>{course?.data[1]}</span></div>
                                    <div className='flex items-center'><span className='bg-green p-[6px] rounded mr-2'><WorkRoundedIcon /></span><span style={{ fontSize: '12px' }} className='font-bold'>{course?.data[2]}</span></div>
                                    <div className='flex items-center'><span className='bg-green p-[6px] rounded mr-2'><CalendarMonthRoundedIcon /></span><span style={{ fontSize: '12px' }} className='font-bold'>{course?.data[3]}</span></div>
                                </div>
                                <div className='pt-5 flex flex-col justify-items-stretch gap-3 mb-16'>
                                    {
                                        course?.info?.map((point, index) => <div className='flex flex-row items-center gap-1'>
                                            <span><PlayArrowRoundedIcon sx={{ color: 'rgb(62 232 181)' }} /></span>
                                            <span style={{ fontSize: '12px', fontWeight: '700' }}>{point}</span>
                                        </div>)
                                    }
                                </div>
                                <div className='absolute bottom-0 right-0 p-5'>
                                    <Link className='mt-5' style={{ color: 'rgb(12 197 219)' }}>Apply Now <ArrowCircleRightOutlined /></Link>
                                </div>

                            </div>
                        </div>
                    )
                }
            </div>

            <div className='block lg:hidden'>
                <div className='feature-slide-parent-container'>
                    {
                        courses[selectedIndex]?.details?.map((course, index) =>
                            <div style={{ border: "2px solid gray" }} key={index} className='border-2 rounded-xl hover:shadow-green hover:shadow-lg relative feature-course'>
                                <div style={{ borderBottom: "2px solid gray" }} className='w-full p-5'>
                                    <span className='bg-green px-2 py-1 rounded-lg font-extralight text-dark'>{course.category}</span>
                                    <h4 className='text-xl font-bold mt-3 font-sans'>{course.title}</h4>
                                </div>
                                <div className='w-full pt-5 px-5'>
                                    <div style={{ borderBottom: "2px solid gray" }} className='pb-5 grid grid-cols-2 justify-between gap-y-4'>
                                        <div className='flex items-center'><span className='bg-green p-[6px] rounded mr-2'><AccessTimeRoundedIcon /></span><span style={{ fontSize: '12px' }} className='font-bold'>{course?.data[0]}</span></div>
                                        <div className='flex items-center'><span className='bg-green p-[6px] rounded mr-2'><LocationOnRoundedIcon /></span><span style={{ fontSize: '12px' }} className='font-bold'>{course?.data[1]}</span></div>
                                        <div className='flex items-center'><span className='bg-green p-[6px] rounded mr-2'><WorkRoundedIcon /></span><span style={{ fontSize: '12px' }} className='font-bold'>{course?.data[2]}</span></div>
                                        <div className='flex items-center'><span className='bg-green p-[6px] rounded mr-2'><CalendarMonthRoundedIcon /></span><span style={{ fontSize: '12px' }} className='font-bold'>{course?.data[3]}</span></div>
                                    </div>
                                    <div className='pt-5 flex flex-col justify-items-stretch gap-3 mb-16'>
                                        {
                                            course?.info?.map((point, index) => <div className='flex flex-row items-center gap-1'>
                                                <span><PlayArrowRoundedIcon sx={{ color: 'rgb(62 232 181)' }} /></span>
                                                <span style={{ fontSize: '12px', fontWeight: '700' }}>{point}</span>
                                            </div>)
                                        }
                                    </div>
                                    <div className='absolute bottom-0 right-0 p-5'>
                                        <Link className='mt-5' style={{ color: 'rgb(12 197 219)' }}>Apply Now <ArrowCircleRightOutlined /></Link>
                                    </div>

                                </div>
                            </div>
                        )
                    }
                </div>
            </div>

        </div>
    );
};

export default Feature;