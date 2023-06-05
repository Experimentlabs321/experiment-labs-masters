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
import MoreVertIcon from '@mui/icons-material/MoreVert';
import img1 from '../../../assets/feature/Rectangle Thumpsup.png';
import img2 from '../../../assets/feature/Rectangle 26.png';
import img3 from '../../../assets/feature/Rectangle 27.png';

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
                    ],
                    img: img1
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
                    ],
                    img: img2
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
                    ],
                    img: img3
                }

            ]
        },
        {
            category: 'Innovation Track',
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
                    ],
                    img: img1
                }
            ]
        },
        {
            category: 'Business Track',
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
                    ],
                    img: img2
                }
            ]
        },
        {
            category: 'Creative Track',
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
                    ],
                    img: img3
                }
            ]
        }

    ]);

    const [selectedIndex, setSelectedIndex] = useState(0);
    const [mouseEnteredIndex, setMouseEnteredIndex] = useState(-1);

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


    console.log('Mouse Entered Index-----> ', mouseEnteredIndex);

    return (
        <div className='px-5 lg:px-40 mt-20' ref={containerRef}>

            <div ref={stickyRef} style={{ position: `${isLargeScreen ? 'sticky' : 'block'}`, top: 75, backgroundColor: '#141414', padding: "30px 0", zIndex: '1000' }}>
                <h1 className='text-4xl font-medium'>Envision. Experiment. Educate. Enable.</h1>
                <h1 className='text-4xl mt-2 font-medium'>Hands-on & Placement Driven Programmes</h1>
                <div className='parent-container lg:justify-center flex-wrap'>
                    {
                        courses.map((course, index) => (
                            <div onClick={() => setSelectedIndex(index)} className={`courses ${selectedIndex !== index && 'bg-dark'} ${selectedIndex === index && 'bg-purple text-white'}`} key={index}>
                                {course?.category}
                            </div>
                        ))
                    }
                </div>
            </div>



            <div className='hidden lg:grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mt-8 relative px-2'>
                {
                    courses[selectedIndex]?.details?.map((course, index) =>
                        <Link onMouseEnter={() => setMouseEnteredIndex(index)} onMouseLeave={() => setMouseEnteredIndex(-1)} to={'/science-innovation'}>
                            <div style={{
                                backgroundImage: "linear-gradient(to top left, #000000 -95%, rgba(0, 0, 0, 0.6096) 10.55%, rgba(0, 0, 0, 0) 90%)",
                                backgroundColor: '#6278FF',
                                borderRadius: '24px',
                                padding: '31px 10px 40px',


                            }}>

                                <div className='flex justify-between items-center pl-[9px] pr-[14px]'>
                                    <p style={{
                                        fontSize: '16px',
                                        fontWeight: '500',
                                        padding: '5px 20px',
                                        border: '2px solid #94A4FF',
                                        borderRadius: '45px'
                                    }}>
                                        {course.category}
                                    </p>
                                    <MoreVertIcon />
                                </div>

                                <p className='pl-[9px] pr-[14px]'
                                    style={{
                                        fontSize: '18px',
                                        fontWeight: '700',
                                        marginTop: '27px',
                                        marginBottom: '40px'
                                    }}
                                >{course?.title}</p>
                                <img src={course?.img} alt="" />
                            </div>

                            <Link to={'/science-innovation'}>
                                <div style={{ borderRadius: '24px' }} className={`${index === mouseEnteredIndex ? 'absolute top-0 z-50 max-w-[400px] min-w-[380px] w-[380px]' : 'hidden'} bg-[#94A4FF] pt-1 pl-1`}>
                                    <div style={{
                                        backgroundImage: "linear-gradient(to top left, #000000 -95%, rgba(0, 0, 0, 0.6096) 10.55%, rgba(0, 0, 0, 0) 90%)",
                                        backgroundColor: '#6278FF',
                                        borderRadius: '24px',
                                    }}
                                        key={index}
                                        className='min-h-[480px] max-h-[480px]'>
                                        <div className='w-full p-5'>
                                            <div style={{ borderBottom: "2px solid #94A4FF" }} className='pb-5'>
                                                <h4 className='text-xl font-bold mt-3 font-sans'>{course.title}</h4>
                                            </div>
                                        </div>
                                        <div className='w-full px-5'>
                                            <div style={{ borderBottom: "2px solid #94A4FF" }} className='pb-5 grid grid-cols-2 justify-between gap-y-4'>
                                                <div className='flex items-center'><span className='p-[6px] rounded mr-2 bg-opacity-40'><AccessTimeRoundedIcon sx={{ color: '#94A4FF' }} /></span><span style={{ fontSize: '12px' }} className='font-bold'>{course?.data[0]}</span></div>
                                                <div className='flex items-center'><span className='p-[6px] rounded mr-2 bg-opacity-40'><LocationOnRoundedIcon sx={{ color: '#94A4FF' }} /></span><span style={{ fontSize: '12px' }} className='font-bold'>{course?.data[1]}</span></div>
                                                <div className='flex items-center'><span className='p-[6px] rounded mr-2 bg-opacity-40'><WorkRoundedIcon sx={{ color: '#94A4FF' }} /></span><span style={{ fontSize: '12px' }} className='font-bold'>{course?.data[2]}</span></div>
                                                <div className='flex items-center'><span className='p-[6px] rounded mr-2 bg-opacity-40'><CalendarMonthRoundedIcon sx={{ color: '#94A4FF' }} /></span><span style={{ fontSize: '12px' }} className='font-bold'>{course?.data[3]}</span></div>
                                            </div>
                                            <div className='pt-5 flex flex-col justify-items-stretch gap-3 mb-16'>
                                                {
                                                    course?.info?.map((point, index) => <div className='flex flex-row items-center gap-1'>
                                                        <span><PlayArrowRoundedIcon sx={{ color: '#94A4FF', opacity: '0.4' }} /></span>
                                                        <span style={{ fontSize: '12px', fontWeight: '700' }}>{point}</span>
                                                    </div>)
                                                }
                                            </div>
                                            <div className='absolute bottom-0 right-0 p-6'>
                                                <Link style={{ borderRadius: '22.5px', fontSize: '16px' }} className='mt-5 px-5 py-2 bg-pink text-white hover:bg-purple' >Apply Now </Link>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </Link>


                        </Link>
                    )
                }
            </div>

            <div className='block lg:hidden'>
                <div className='feature-slide-parent-container'>
                    {
                        courses[selectedIndex]?.details?.map((course, index) =>
                            <div style={{
                                backgroundImage: "linear-gradient(to top left, #000000 -95%, rgba(0, 0, 0, 0.6096) 10.55%, rgba(0, 0, 0, 0) 90%)",
                                backgroundColor: '#6278FF',
                                borderRadius: '24px',
                            }} key={index} className='relative feature-course'>
                                <Link to={'/science-innovation'}>
                                    <div className='w-full p-5'>
                                        <div style={{ borderBottom: "2px solid #94A4FF" }} className='pb-5'>
                                            <h4 className='text-xl font-bold mt-3 font-sans'>{course.title}</h4>
                                        </div>
                                    </div>
                                    <div className='w-full px-5'>
                                        <div style={{ borderBottom: "2px solid #94A4FF" }} className='pb-5 grid grid-cols-2 justify-between gap-y-4'>
                                            <div className='flex items-center'><span className='bg-opacity-40 p-[6px] rounded mr-2'><AccessTimeRoundedIcon sx={{ color: '#94A4FF' }} /></span><span style={{ fontSize: '12px' }} className='font-bold'>{course?.data[0]}</span></div>
                                            <div className='flex items-center'><span className='bg-opacity-40 p-[6px] rounded mr-2'><LocationOnRoundedIcon sx={{ color: '#94A4FF' }} /></span><span style={{ fontSize: '12px' }} className='font-bold'>{course?.data[1]}</span></div>
                                            <div className='flex items-center'><span className='bg-opacity-40 p-[6px] rounded mr-2'><WorkRoundedIcon sx={{ color: '#94A4FF' }} /></span><span style={{ fontSize: '12px' }} className='font-bold'>{course?.data[2]}</span></div>
                                            <div className='flex items-center'><span className='bg-opacity-40 p-[6px] rounded mr-2'><CalendarMonthRoundedIcon sx={{ color: '#94A4FF' }} /></span><span style={{ fontSize: '12px' }} className='font-bold'>{course?.data[3]}</span></div>
                                        </div>
                                        <div className='pt-5 flex flex-col justify-items-stretch gap-3 mb-16'>
                                            {
                                                course?.info?.map((point, index) => <div className='flex flex-row items-center gap-1'>
                                                    <span><PlayArrowRoundedIcon sx={{ color: '#94A4FF', opacity: '0.4' }} /></span>
                                                    <span style={{ fontSize: '12px', fontWeight: '700' }}>{point}</span>
                                                </div>)
                                            }
                                        </div>
                                        <div className='absolute bottom-0 right-0 p-6'>
                                            <Link style={{ borderRadius: '22.5px', fontSize: '16px' }} className='mt-5 px-5 py-2 bg-pink text-white hover:bg-purple' >Apply Now </Link>
                                        </div>

                                    </div>
                                </Link>
                            </div>
                        )
                    }
                </div>
            </div>

        </div>
    );
};

export default Feature;