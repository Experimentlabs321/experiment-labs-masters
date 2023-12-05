import { Button } from '@mui/material';
import React from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import Stories from 'react-insta-stories';
import OutboundOutlinedIcon from '@mui/icons-material/OutboundOutlined';
import './style.css';
//import logo2 from '../../../assets/Logos/Group 2859890.png';

import ArrowCircleLeftRoundedIcon from '@mui/icons-material/ArrowCircleLeftRounded';
import ArrowCircleRightRoundedIcon from '@mui/icons-material/ArrowCircleRightRounded';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CleanHandsTwoToneIcon from '@mui/icons-material/CleanHandsTwoTone';
import CurrencyExchangeTwoToneIcon from '@mui/icons-material/CurrencyExchangeTwoTone';
import MoneyTwoToneIcon from '@mui/icons-material/MoneyTwoTone';
//import oneLogo1 from '../../../assets/logog/Gift a song 1.png';
//import oneLogo2 from '../../../assets/logog/logo2 1.png';
//import oneLogo3 from '../../../assets/logog/logo-png 1.png';
//import techLearnt from '../../../assets/logog/Group 2860107.png';
import CheckIcon from '@mui/icons-material/Check';
//import pathImg from '../../../assets/logog/Clip path group.png';
//import collegeImg from '../../../assets/logog/colleges.png';
//import competition from '../../../assets/logog/competition.png';
//import gamifiedImg from '../../../assets/logog/gamifiedImg.png';
//import prizeImg from '../../../assets/logog/prizeImg.png';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import axios from 'axios';
import emailjs from '@emailjs/browser';
import { toast } from 'react-hot-toast';
import ReactGA from "react-ga4";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const AllCourses = ({allCoursesData}) => {


    const [stories, setStories] = useState([
        {
            url: 'https://dsqqu7oxq6o1v.cloudfront.net/motion-array-1388812-A012_06252056_C069-high.mp4',
            type: 'video'
        },
        {
            url: 'https://dsqqu7oxq6o1v.cloudfront.net/motion-array-1075852-dV3Kxdk8Sn-high.mp4',
            type: 'video'
        },
        {
            url: 'https://dsqqu7oxq6o1v.cloudfront.net/motion-array-1290096-NRkICuxxxg-high.mp4',
            type: 'video'
        },
        {
            url: 'https://dsqqu7oxq6o1v.cloudfront.net/motion-array-1347899-LeKv7SHCYU-high.mp4',
            type: 'video'
        },
    ]);


    const [selectedIndex, setSelectedIndex] = useState(0);

    const onNext = () => {
        setSelectedIndex((selectedIndex + 1) % 4);
    };

    const onPrevious = () => {
        let i = (selectedIndex - 1);
        if (i === -1) {
            i += 4;
        }

        setSelectedIndex(i);
    };

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
                stickyRef.current.style.position = 'block';
                stickyRef2.current.style.position = 'block';
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
            top: element.offsetTop - 220,
            behavior: "smooth"
        });

    };


    useEffect(() => {
        const handleScroll = () => {
            const elements = document.querySelector(".getId").children;
            const scrollPosition = window.scrollY + window.innerHeight;



            for (let i = 0; i < elements.length; i++) {
                const element = elements[i];
                const elementPosition = element.offsetTop - 220 + element.offsetHeight;

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


    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        ReactGA.event({
            category: "Click",
            action: `Apply Now From Segment `+ selected,
            label:'Apply Now'
        });
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const form = useRef();


    const handleSubmit = event => {
        event.preventDefault();
        ReactGA.event({
            category: "Click",
            action: "Submit Data From Segment " + selected,
            label:'Submit Data'
        });
        const form = event.target;
        const name = form.name.value;
        const number = form.number.value;
        const email = form.email.value;
        const option = form.option.value;
        const city = form.city.value;

        const data = {
            Name: name,
            Number: '+91' + number,
            Email: email,
            Option: option,
            City: city,
            Time: new Date(),
        };

        console.log(data);

        fetch("https://sheet.best/api/sheets/5c4ca56d-67bb-4f49-a538-9fdde568c68d", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((data) => {
                // The response comes here
                console.log(data);
            })
            .catch((error) => {
                // Errors are reported there
                console.log(error);
            });


        const templateParams = {
            from_name: name,
            message: `
            Name: ${name},
            Number: ${'+91' + number},
            Email: ${email},
            ${option},
            City: ${city},
            Time: ${new Date()},
            `
        };

        emailjs.send('service_s3bklnu', 'template_l0yacbb', templateParams, 'U0g6Ht1DVmnBbENk0')
            .then((result) => {
                console.log(result.text);
                // toast.success("Message Sent");
                event.target.reset();
            }, (error) => {
                console.log(error.text);
            });

    }

    return (
        <div style={{ width: '100%' }} className='mt-28 px-5 py-10 lg:px-30 xl:px-32' ref={containerRef}>
            <h1 className='font-bold text-4xl block lg:hidden mb-6 lg:mb-0'>Hands-on. <span className=' '>Disruptive. Experiential.</span></h1>
            <div ref={stickyRef} style={{ top: 70, backgroundColor: '#141414', padding: "35px 0", zIndex: '1000', width: '100%' }} className='hidden lg:block'>
                <h1 className='font-bold text-4xl'>Hands-on. <span className=' '>Disruptive. Experiential.</span></h1>
                <h6 className='text-lg mt-2 font-light'>See how we teach across all our courses</h6>

            </div>
            <div className='flex flex-row gap-10 items-start'>

                <div ref={stickyRef2} style={{ position: 'sticky', top: 220, backgroundColor: '#141414', zIndex: '1' }} className='hidden lg:flex flex-col gap-1 min-w-[420px] sticky'>
                    <span onClick={() => handleClick(0)} className={`${selected === 0 && 'shadow-lg border-4 border-purple font-semibold'} hover:border-4 border-purple rounded-xl py-4 pl-4 transition-all duration-100 ease-in cursor-pointer bg-dark`}>0 to 1 Journey</span>
                    <span onClick={() => handleClick(1)} className={`${selected === 1 && 'shadow-lg border-4 border-purple font-semibold'} hover:border-4 border-purple rounded-xl py-4 pl-4 transition-all duration-100 ease-in cursor-pointer bg-dark`}>Technical Skills</span>
                    <span onClick={() => handleClick(2)} className={`${selected === 2 && 'shadow-lg border-4 border-purple font-semibold text-sm'} hover:border-4 border-purple rounded-xl py-4 pl-4 transition-all duration-100 ease-in cursor-pointer bg-dark`}>Emotional & Personality Development</span>
                    <span onClick={() => handleClick(3)} className={`${selected === 3 && 'shadow-lg border-4 border-purple font-semibold'} hover:border-4 border-purple rounded-xl py-4 pl-4 transition-all duration-100 ease-in cursor-pointer bg-dark`}>Hands on Career Exploration</span>
                    <span onClick={() => handleClick(4)} className={`${selected === 4 && 'shadow-lg border-4 border-purple font-semibold'} hover:border-4 border-purple rounded-xl py-4 pl-4 transition-all duration-100 ease-in cursor-pointer bg-dark`}>Portfolio Building</span>
                    <span onClick={() => handleClick(5)} className={`${selected === 5 && 'shadow-lg border-4 border-purple font-semibold'} hover:border-4 border-purple rounded-xl py-4 pl-4 transition-all duration-100 ease-in cursor-pointer bg-dark`}>Global Competitions</span>
                    <span onClick={() => handleClick(6)} className={`${selected === 6 && 'shadow-lg border-4 border-purple font-semibold'} hover:border-4 border-purple rounded-xl py-4 pl-4 transition-all duration-100 ease-in cursor-pointer bg-dark`}>Gamified Problems</span>
                    <span onClick={() => handleClick(7)} className={`${selected === 7 && 'shadow-lg border-4 border-purple font-semibold'} hover:border-4 border-purple rounded-xl py-4 pl-4 transition-all duration-100 ease-in cursor-pointer bg-dark`}>Prize Money</span>
                </div>

                {/* Big Screen */}

                <div className='hidden w-full lg:flex flex-col gap-24 getId'>
                    {/* First one  */}
                    <div style={{
                        background: "linear-gradient(180deg, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.274309) 35.55%, rgba(0, 0, 0, 0) 100%), #6278FF",
                        border: '3px solid #BCC5FF'
                    }}
                        className='w-full rounded-xl flex p-10 items-start gap-10' id={0}>
                        <div>
                            <h1 className='text-3xl font-bold text-white'>Launch and Build your own Products & Business</h1>
                            <p className='text-lg font-thin my-6'>From finding the right idea to building the product to getting sales and building financial models you will learn how different careers look like in a corporation.</p>
                            <p className='text-lg font-thin mb-6'>Get exposure to over <span className='font-semibold'>50+ Career option.</span>
                            </p>

                            <p className='hidden lg:block text-2xl font-semibold'>Some of our Student Brands</p>


                            <div className='flex items-end justify-between mt-8 gap-10'>
                                <div className='flex flex-wrap gap-7'>
                                    <img className='cursor-pointer h-[70px]' src={allCoursesData?.allCoursesData} alt="logo" />
                                    <img className='cursor-pointer h-[70px]' src={allCoursesData.images?.oneLogo2} alt="logo" />
                                    <img className='cursor-pointer h-[70px]' src={allCoursesData.images?.oneLogo3} alt="logo" />
                                </div>

                                <Button size='large' variant='contained' sx={{ bgcolor: '#FF557A', borderRadius: '24px', ":hover": { bgcolor: '#94A4FF' }, textTransform: 'capitalize', minWidth: '160px' }} onClick={handleClickOpen}>Apply Now</Button>
                            </div>


                        </div>
                    </div>






                    {/* second one */}
                    <div style={{
                        background: "linear-gradient(180deg, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.274309) 35.55%, rgba(0, 0, 0, 0) 100%), #6278FF",
                        border: '3px solid #BCC5FF'
                    }} className='w-full rounded-xl flex p-10 items-start gap-10' id={1}>
                        <div>
                            <h1 className='text-3xl font-bold text-white'>Technical Skills as a Gateway to Academic & Career Success</h1>
                            <p className='text-lg font-thin my-8'>At Experiment Labs we equip learners essential technical skills, the building blocks of career exploration. From coding to data analysis, unlock your potential and shape your future with a solid foundation in high-demand technical skills.</p>

                            <p className='text-lg font-thin mb-8'>Get exposure to over <span className='font-semibold'>20+ Technical Skills.</span>
                            </p>

                            <p className='hidden lg:block text-2xl font-semibold'>Technologies Learnt</p>


                            <div className='flex justify-between items-end mt-8 gap-10'>
                                <div>
                                    <img src={allCoursesData.images?.techLearnt} alt="" />
                                </div>

                                <Button size='large' variant='contained' sx={{ bgcolor: '#FF557A', borderRadius: '24px', ":hover": { bgcolor: '#94A4FF' }, textTransform: 'capitalize', minWidth: '160px' }} onClick={handleClickOpen}>Apply Now</Button>
                            </div>


                        </div>
                    </div>








                    {/* Third one */}

                    <div style={{
                        background: "linear-gradient(180deg, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.274309) 35.55%, rgba(0, 0, 0, 0) 100%), #6278FF",
                        border: '3px solid #BCC5FF'
                    }} className='w-full rounded-xl flex p-10 items-start gap-10' id={2}>
                        <div>
                            <h1 className='text-3xl font-bold text-white'>Master Soft Skills and become a champion leader</h1>
                            <p className='text-lg font-thin my-8'>Experiment Labs provides a transformative platform for building soft skills, fostering self-discovery, and empowering individuals to identify their ideal career path with confidence and clarity.</p>

                            <p className='text-lg font-thin mb-8'>Get exposure to over <span className='font-semibold'>20+ Soft Skills.</span>
                            </p>

                            <p className='hidden lg:block text-2xl font-semibold'>Soft Skills Learnt</p>


                            <div className='flex justify-between items-end mt-8'>
                                <div>
                                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-1'>
                                        <span className='flex gap-1 items-start font-semibold'><CheckIcon sx={{ fontSize: '16px' }} />Leadership</span>
                                        <span className='flex gap-1 items-start font-semibold'><CheckIcon sx={{ fontSize: '16px' }} />Negotiation</span>
                                        <span className='flex gap-1 items-start font-semibold'><CheckIcon sx={{ fontSize: '16px' }} />Time Management</span>
                                        <span className='flex gap-1 items-start font-semibold'><CheckIcon sx={{ fontSize: '16px' }} />Humility</span>
                                        <span className='flex gap-1 items-start font-semibold'><CheckIcon sx={{ fontSize: '16px' }} />Observation Skills</span>
                                        <span className='flex gap-1 items-start font-semibold'><CheckIcon sx={{ fontSize: '16px' }} />Empathy</span>
                                        <span className='flex gap-1 items-start font-semibold'><CheckIcon sx={{ fontSize: '16px' }} />Communication</span>
                                        <span className='flex gap-1 items-start font-semibold'><CheckIcon sx={{ fontSize: '16px', color: 'transparent' }} />Many More.......</span>
                                        <span className='flex gap-1 items-start font-semibold'><CheckIcon sx={{ fontSize: '16px' }} />First Principle Thinking</span>
                                    </div>
                                </div>

                                <Button size='large' variant='contained' sx={{ bgcolor: '#FF557A', borderRadius: '24px', ":hover": { bgcolor: '#94A4FF' }, textTransform: 'capitalize', minWidth: '160px' }} onClick={handleClickOpen}>Apply Now</Button>
                            </div>


                        </div>
                    </div>








                    {/* Fourth one  */}
                    <div style={{
                        background: "linear-gradient(180deg, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.274309) 35.55%, rgba(0, 0, 0, 0) 100%), #6278FF",
                        border: '3px solid #BCC5FF'
                    }} className='w-full rounded-xl py-10 pl-10 items-start gap-10' id={3}>
                        <div>
                            <h1 className='text-3xl font-bold text-white pr-10'>Explore Careers by practically Experiencing them</h1>
                            <p className='text-lg font-thin mt-8 pr-10'>Experiment Labs offers hands-on learning experiences across 50+ fields, enabling individuals to practically explore careers and gain invaluable insights to make informed decisions about their professional journey.</p>

                            <div className='flex justify-between items-start'>
                                <div>
                                    <p className='text-lg font-thin my-6'>Get exposure to  <span className='font-semibold'>over 50+ Career option.</span>
                                    </p>

                                    <p className='hidden lg:block text-2xl font-semibold'>Chart your leadership journey in the career of your choice</p>
                                </div>


                                <div className='flex flex-col items-end'>
                                    <div>
                                        <img src={allCoursesData.images?.pathImg} alt="pathImg" />
                                    </div>

                                    <Button size='large' variant='contained' sx={{ bgcolor: '#FF557A', borderRadius: '24px', ":hover": { bgcolor: '#94A4FF' }, textTransform: 'capitalize', minWidth: '160px', marginRight: '40px' }} onClick={handleClickOpen}>Apply Now</Button>
                                </div>
                            </div>


                        </div>
                    </div>





                    {/* Fifth one */}
                    <div style={{
                        background: "linear-gradient(180deg, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.274309) 35.55%, rgba(0, 0, 0, 0) 100%), #6278FF",
                        border: '3px solid #BCC5FF'
                    }} className='w-full rounded-xl p-10 items-start gap-10' id={4}>


                        <div>
                            <h1 className='text-3xl font-bold text-white'>Build your profile for admissions to Ivy League Colleges</h1>
                            <p className='text-lg font-thin my-8'>Experiment Labs enriches your profile for Ivy League College admissions by offering hands-on experience in multiple fields, complementing your Statement of Purpose (SOP) and Letters of Recommendation (LOR) with practical skills and demonstrated passion.</p>

                            <p className='hidden lg:block text-2xl font-semibold'>Get Admissions to Ivy League Colleges</p>


                            <div className='flex justify-between items-end mt-8 gap-10'>
                                <div className='flex flex-col gap-1 items-end'>
                                    <img style={{ maxHeight: '115px' }} src={allCoursesData.images?.collegeImg} alt="" />
                                    <span>and many more.</span>
                                </div>

                                <Button size='large' variant='contained' sx={{ bgcolor: '#FF557A', borderRadius: '24px', ":hover": { bgcolor: '#94A4FF' }, textTransform: 'capitalize', minWidth: '160px' }} onClick={handleClickOpen}>Apply Now</Button>
                            </div>


                        </div>

                    </div>





                    {/* Sixth One */}
                    <div style={{
                        background: "linear-gradient(180deg, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.274309) 35.55%, rgba(0, 0, 0, 0) 100%), #6278FF",
                        border: '3px solid #BCC5FF'
                    }} className='w-full rounded-xl p-10 items-start gap-10' id={5}>

                        <div>
                            <h1 className='text-3xl font-bold text-white'>Prepare for global competitions worth $20 Mn</h1>
                            <p className='text-lg font-thin my-8'>From finding the right idea to building the product to getting sales and building financial models you will learn how different careers look like in a corporation.</p>

                            <p className='text-lg font-thin mb-8'>Get exposure to over <span className='font-semibold'>50+ Career option.</span>
                            </p>

                            <p className='hidden lg:block text-2xl font-semibold'>Global Competitions</p>


                            <div className='flex justify-between items-end mt-8 gap-10'>
                                <div className='flex flex-col gap-1 items-end'>
                                    <img style={{ maxHeight: '115px' }} src={allCoursesData.images?.competition} alt="" />
                                    <span>and many more.</span>
                                </div>

                                <Button size='large' variant='contained' sx={{ bgcolor: '#FF557A', borderRadius: '24px', ":hover": { bgcolor: '#94A4FF' }, textTransform: 'capitalize', minWidth: '160px' }} onClick={handleClickOpen}>Apply Now</Button>
                            </div>


                        </div>

                    </div>






                    {/* Seventh One */}
                    <div style={{
                        background: "linear-gradient(180deg, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.274309) 35.55%, rgba(0, 0, 0, 0) 100%), #6278FF",
                        border: '3px solid #BCC5FF'
                    }} className='w-full rounded-xl p-10 items-start gap-10' id={6}>


                        <div>
                            <h1 className='text-3xl font-bold text-white'>Gamified Live learning platform,</h1>
                            <p className='text-lg font-thin my-8'>We enable students to earn and redeem their own points to deliver hands on experience. Instant gratification that unlocks the next step in the journey</p>



                            <div className='flex justify-center gap-2 items-end mt-8'>
                                <div>
                                    <img src={allCoursesData.images?.gamifiedImg} alt="" />
                                </div>

                                <Button size='large' variant='contained' sx={{ bgcolor: '#FF557A', borderRadius: '24px', ":hover": { bgcolor: '#94A4FF' }, textTransform: 'capitalize', minWidth: '160px' }} onClick={handleClickOpen}>Apply Now</Button>
                            </div>


                        </div>



                    </div>


                    {/* Eight One */}
                    <div style={{
                        background: "linear-gradient(180deg, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.274309) 35.55%, rgba(0, 0, 0, 0) 100%), #6278FF",
                        border: '3px solid #BCC5FF'
                    }} className='w-full rounded-xl p-10 items-start gap-10' id={7}>


                        <div>
                            <h1 className='text-3xl font-bold text-white'>What you will get ?</h1>


                            <div className='flex justify-center gap-2 items-end mt-8'>
                                <div>
                                    <img src={allCoursesData.images?.prizeImg} alt="" />
                                </div>

                                <Button size='large' variant='contained' sx={{ bgcolor: '#FF557A', borderRadius: '24px', ":hover": { bgcolor: '#94A4FF' }, textTransform: 'capitalize', width: '160px' }} onClick={handleClickOpen}>Apply Now</Button>
                            </div>


                        </div>



                    </div>

                </div>





                {/* small screen */}

                <div className='lg:hidden w-full flex flex-row items-start overflow-x-scroll gap-10 getId mt-8'>
                    {/* First one  */}
                    <div style={{
                        background: "linear-gradient(180deg, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.274309) 35.55%, rgba(0, 0, 0, 0) 100%), #6278FF",
                        border: '3px solid #BCC5FF',
                        minWidth: '450px',
                        minHeight: '625px'

                    }}
                        className='w-full rounded-xl flex p-10 items-start gap-10' id={0}>
                        <div>
                            <h1 className='text-3xl font-bold text-white'>Launch and Build your own Products & Business</h1>
                            <p className='text-lg font-thin my-6'>From finding the right idea to building the product to getting sales and building financial models you will learn how different careers look like in a corporation.</p>
                            <p className='text-lg font-thin mb-6'>Get exposure to over <span className='font-semibold'>50+ Career option.</span>
                            </p>

                            <p className='hidden lg:block text-2xl font-semibold'>Some of our Student Brands</p>


                            <div className='flex flex-col mt-8 gap-10'>
                                <div className='flex flex-wrap gap-7'>
                                    <img className='cursor-pointer h-[70px]' src={allCoursesData.images?.oneLogo1} alt="logo" />
                                    <img className='cursor-pointer h-[70px]' src={allCoursesData.images?.oneLogo2} alt="logo" />
                                    <img className='cursor-pointer h-[70px]' src={allCoursesData.images?.oneLogo3} alt="logo" />
                                </div>

                                <Button size='large' variant='contained' sx={{ bgcolor: '#FF557A', borderRadius: '24px', ":hover": { bgcolor: '#94A4FF' }, textTransform: 'capitalize', maxWidth: '160px' }} onClick={handleClickOpen}>Apply Now</Button>
                            </div>


                        </div>
                    </div>






                    {/* second one */}
                    <div style={{
                        background: "linear-gradient(180deg, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.274309) 35.55%, rgba(0, 0, 0, 0) 100%), #6278FF",
                        border: '3px solid #BCC5FF',
                        minWidth: '450px',
                        minHeight: '625px'

                    }} className='w-full rounded-xl flex p-10 items-start gap-10' id={1}>
                        <div>
                            <h1 className='text-3xl font-bold text-white'>Technical Skills as a Gateway to Academic & Career Success</h1>
                            <p className='text-lg font-thin my-8'>At Experiment Labs we equip learners essential technical skills, the building blocks of career exploration. From coding to data analysis, unlock your potential and shape your future with a solid foundation in high-demand technical skills.</p>

                            <p className='text-lg font-thin mb-8'>Get exposure to over <span className='font-semibold'>20+ Technical Skills.</span>
                            </p>

                            <p className='hidden lg:block text-2xl font-semibold'>Technologies Learnt</p>


                            <div className='flex flex-col mt-8 gap-10'>
                                <div>
                                    <img src={allCoursesData.images?.techLearnt} alt="" />
                                </div>

                                <Button size='large' variant='contained' sx={{ bgcolor: '#FF557A', borderRadius: '24px', ":hover": { bgcolor: '#94A4FF' }, textTransform: 'capitalize', maxWidth: '160px' }} onClick={handleClickOpen}>Apply Now</Button>
                            </div>


                        </div>
                    </div>








                    {/* Third one */}

                    <div style={{
                        background: "linear-gradient(180deg, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.274309) 35.55%, rgba(0, 0, 0, 0) 100%), #6278FF",
                        border: '3px solid #BCC5FF',
                        minWidth: '450px',
                        minHeight: '625px'

                    }} className='w-full rounded-xl flex p-10 items-start gap-10' id={2}>
                        <div>
                            <h1 className='text-3xl font-bold text-white'>Master Soft Skills and become a champion leader</h1>
                            <p className='text-lg font-thin my-8'>Experiment Labs provides a transformative platform for building soft skills, fostering self-discovery, and empowering individuals to identify their ideal career path with confidence and clarity.</p>

                            <p className='text-lg font-thin mb-8'>Get exposure to over <span className='font-semibold'>20+ Soft Skills.</span>
                            </p>

                            <p className='hidden lg:block text-2xl font-semibold'>Soft Skills Learnt</p>


                            <div className='flex flex-col mt-8'>
                                <div>
                                    <div className='grid grid-cols-2 gap-x-8 gap-y-1 mb-8'>
                                        <span className='flex gap-1 items-start font-semibold'><CheckIcon sx={{ fontSize: '16px' }} />Leadership</span>
                                        <span className='flex gap-1 items-start font-semibold'><CheckIcon sx={{ fontSize: '16px' }} />Negotiation</span>
                                        <span className='flex gap-1 items-start font-semibold'><CheckIcon sx={{ fontSize: '16px' }} />Time Management</span>
                                        <span className='flex gap-1 items-start font-semibold'><CheckIcon sx={{ fontSize: '16px' }} />Humility</span>
                                        <span className='flex gap-1 items-start font-semibold'><CheckIcon sx={{ fontSize: '16px' }} />Observation Skills</span>
                                        {/* <span className='flex gap-1 items-start font-semibold'><CheckIcon sx={{ fontSize: '16px' }} />Empathy</span>
                                        <span className='flex gap-1 items-start font-semibold'><CheckIcon sx={{ fontSize: '16px' }} />Communication</span> */}
                                        <span className='flex gap-1 items-start font-semibold'><CheckIcon sx={{ fontSize: '16px', color: 'transparent' }} />Many More.......</span>
                                        {/* <span className='flex gap-1 items-start font-semibold'><CheckIcon sx={{ fontSize: '16px' }} />First Principle Thinking</span> */}
                                    </div>
                                </div>

                                <Button size='large' variant='contained' sx={{ bgcolor: '#FF557A', borderRadius: '24px', ":hover": { bgcolor: '#94A4FF' }, textTransform: 'capitalize', maxWidth: '160px' }} onClick={handleClickOpen}>Apply Now</Button>
                            </div>


                        </div>
                    </div>








                    {/* Fourth one  */}
                    <div style={{
                        background: "linear-gradient(180deg, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.274309) 35.55%, rgba(0, 0, 0, 0) 100%), #6278FF",
                        border: '3px solid #BCC5FF',
                        minWidth: '450px',
                        minHeight: '625px'

                    }} className='w-full rounded-xl p-10 items-start gap-10' id={3}>
                        <div>
                            <h1 className='text-3xl font-bold text-white'>Explore Careers by practically Experiencing them</h1>
                            <p className='text-lg font-thin mt-8'>Experiment Labs offers hands-on learning experiences across 50+ fields, enabling individuals to practically explore careers and gain invaluable insights to make informed decisions about their professional journey.</p>

                            <div className='flex flex-col'>
                                <div>
                                    <p className='text-lg font-thin my-6'>Get exposure to  <span className='font-semibold'>over 50+ Career option.</span>
                                    </p>

                                    <p className='hidden lg:block text-2xl font-semibold'>Chart your leadership journey in the career of your choice</p>
                                </div>


                                <div className='flex flex-col items-start'>
                                    <div>
                                        <img className='w-1/2' src={allCoursesData.images?.pathImg} alt="pathImg" />
                                    </div>

                                    <Button size='large' variant='contained' sx={{ bgcolor: '#FF557A', borderRadius: '24px', ":hover": { bgcolor: '#94A4FF' }, textTransform: 'capitalize', minWidth: '160px', marginRight: '40px' }} onClick={handleClickOpen}>Apply Now</Button>
                                </div>
                            </div>


                        </div>
                    </div>





                    {/* Fifth one */}
                    <div style={{
                        background: "linear-gradient(180deg, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.274309) 35.55%, rgba(0, 0, 0, 0) 100%), #6278FF",
                        border: '3px solid #BCC5FF',
                        minWidth: '450px',
                        minHeight: '625px'

                    }} className='w-full rounded-xl p-10 items-start gap-10' id={4}>


                        <div>
                            <h1 className='text-3xl font-bold text-white'>Build your profile for admissions to Ivy League Colleges</h1>
                            <p className='text-lg font-thin my-8'>Experiment Labs enriches your profile for Ivy League College admissions by offering hands-on experience in multiple fields, complementing your Statement of Purpose (SOP) and Letters of Recommendation (LOR) with practical skills and demonstrated passion.</p>

                            <p className='hidden lg:block text-2xl font-semibold'>Get Admissions to Ivy League Colleges</p>


                            <div className='flex flex-col mt-8 gap-10'>
                                <div className='flex flex-col gap-1'>
                                    <img className='w-full' src={allCoursesData.images?.collegeImg} alt="" />
                                    <span>and many more.</span>
                                </div>

                                <Button size='large' variant='contained' sx={{ bgcolor: '#FF557A', borderRadius: '24px', ":hover": { bgcolor: '#94A4FF' }, textTransform: 'capitalize', maxWidth: '160px' }} onClick={handleClickOpen}>Apply Now</Button>
                            </div>


                        </div>

                    </div>





                    {/* Sixth One */}
                    <div style={{
                        background: "linear-gradient(180deg, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.274309) 35.55%, rgba(0, 0, 0, 0) 100%), #6278FF",
                        border: '3px solid #BCC5FF',
                        minWidth: '450px',
                        minHeight: '625px'

                    }} className='w-full rounded-xl p-10 items-start gap-10' id={5}>

                        <div>
                            <h1 className='text-3xl font-bold text-white'>Prepare for global competitions worth $20 Mn</h1>
                            <p className='text-lg font-thin my-8'>From finding the right idea to building the product to getting sales and building financial models you will learn how different careers look like in a corporation.</p>

                            <p className='text-lg font-thin mb-8'>Get exposure to over <span className='font-semibold'>50+ Career option.</span>
                            </p>

                            <p className='hidden lg:block text-2xl font-semibold'>Global Competitions</p>


                            <div className='flex flex-col mt-8 gap-10'>
                                <div className='flex flex-col gap-1'>
                                    <img className='w-full' src={allCoursesData.images?.competition} alt="" />
                                    <span>and many more.</span>
                                </div>

                                <Button size='large' variant='contained' sx={{ bgcolor: '#FF557A', borderRadius: '24px', ":hover": { bgcolor: '#94A4FF' }, textTransform: 'capitalize', maxWidth: '160px' }} onClick={handleClickOpen}>Apply Now</Button>
                            </div>


                        </div>

                    </div>






                    {/* Seventh One */}
                    <div style={{
                        background: "linear-gradient(180deg, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.274309) 35.55%, rgba(0, 0, 0, 0) 100%), #6278FF",
                        border: '3px solid #BCC5FF',
                        minWidth: '450px',
                        minHeight: '625px'

                    }} className='w-full rounded-xl p-10 items-start gap-10' id={6}>


                        <div>
                            <h1 className='text-3xl font-bold text-white'>Gamified Live learning platform,</h1>
                            <p className='text-lg font-thin my-8'>We enable students to earn and redeem their own points to deliver hands on experience. Instant gratification that unlocks the next step in the journey</p>



                            <div className='flex flex-col justify-center gap-10 items-start mt-8'>
                                <div>
                                    <img className='w-full mx-auto' src={allCoursesData.images?.gamifiedImg} alt="" />
                                </div>

                                <Button size='large' variant='contained' sx={{ bgcolor: '#FF557A', borderRadius: '24px', ":hover": { bgcolor: '#94A4FF' }, textTransform: 'capitalize', minWidth: '160px' }} onClick={handleClickOpen}>Apply Now</Button>
                            </div>


                        </div>



                    </div>


                    {/* Eight One */}
                    <div style={{
                        background: "linear-gradient(180deg, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.274309) 35.55%, rgba(0, 0, 0, 0) 100%), #6278FF",
                        border: '3px solid #BCC5FF',
                        minWidth: '450px',
                        minHeight: '625px'

                    }} className='w-full rounded-xl p-10 items-start gap-10' id={7}>


                        <div>
                            <h1 className='text-3xl font-bold text-white'>What you will get ?</h1>


                            <div className='flex flex-col justify-center gap-10 items-start mt-8'>
                                <div>
                                    <img className='mx-auto w-full' src={allCoursesData.images?.prizeImg} alt="" />
                                </div>

                                <Button size='large' variant='contained' sx={{ bgcolor: '#FF557A', borderRadius: '24px', ":hover": { bgcolor: '#94A4FF' }, textTransform: 'capitalize', width: '160px' }} onClick={handleClickOpen}>Apply Now</Button>
                            </div>


                        </div>



                    </div>

                </div>


                {/* <div className='lg:hidden w-full mt-6'>
                    <Swiper
                        modules={[Navigation, Pagination, Scrollbar, A11y, FreeMode]}
                        style={{ minWidth: '100%' }}
                        direction='horizontal'
                        spaceBetween={10}
                        slidesPerView={1}
                        scrollbar={{
                            draggable: true,
                        }}
                        freeMode={{ enabled: true, sticky: false }}
                        onSlideChange={() => console.log('slide change')}
                        onSwiper={(swiper) => console.log(swiper)}
                    >

                        
                        <SwiperSlide style={{ maxWidth: '400px', minWidth: '400px', minHeight: '575px', maxHeight: '575px' }}>
                            <div className='w-[340px] max-w-[340px] rounded-xl bg-dark flex flex-col-reverse justify-end min-h-[560px] max-h-[560px]' id={0}>
                                <div className='p-3'>
                                    <h1 className='text-2xl font-bold text-white'>Launch and Build your own Products & Business</h1>
                                    <p className='text-sm font-light my-3'>From finding the right idea to building the product to getting sales and building financial models you will learn how different careers look like in a corporation.</p>
                                    <p className='text-sm font-light my-3'>Get exposure to over <span className='font-semibold'>50+ Career option.</span>
                                    </p>

                                    <p className='hidden lg:block'>Some of our Student Brands</p>

                                    <div className='flex lg:hidden justify-between items-center'>
                                        <p>Some of our Student Brands</p>
                                        <Button className='hidden lg:block' endIcon={<OutboundOutlinedIcon />} size='large' variant='text' sx={{ color: '#0CC5DB', ":hover": { color: '#3EE8B5' }, textTransform: 'capitalize', width: '160px' }}>See All</Button>
                                    </div>

                                    <div className='grid lg:hidden grid-cols-2 lg:grid-cols-3 gap-4 pt-4 pb-8 pr-5'>
                                        <img className='h-6 hover:shadow-md hover:shadow-custom-blue transition-all duration-100 ease-in cursor-pointer p-2 rounded-xl' src={logo2} alt="logo" />
                                        <img className='h-6 hover:shadow-md hover:shadow-custom-blue transition-all duration-100 ease-in cursor-pointer p-2 rounded-xl' src={logo2} alt="logo" />
                                    </div>

                                </div>

                                <div className='w-full'>
                                    <iframe
                                        style={{ borderTopLeftRadius: '8px', borderTopRightRadius: '8px', width: '100%', height: '200px', objectFit: 'cover', border: '1px solid gray' }}
                                        currentIndex={selectedIndex}
                                        src='https://dsqqu7oxq6o1v.cloudfront.net/motion-array-1388812-A012_06252056_C069-high.mp4'
                                        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        title="Embedded video"
                                    />
                                </div>
                            </div>
                        </SwiperSlide>





                        
                        <SwiperSlide style={{ maxWidth: '400px', minWidth: '400px' }}>
                            <div className='w-[340px] max-w-[340px] rounded-xl bg-dark flex flex-col-reverse justify-end min-h-[560px] max-h-[560px]' id={1}>
                                <div className='p-3'>
                                    <h1 className='text-2xl font-bold text-white'>Become a Creator-preneur</h1>
                                    <p className='text-sm font-light my-3'>From finding the right idea to building the product to getting sales and building financial models you will learn how different careers look like in a corporation.</p>

                                    <div className='flex lg:hidden justify-between items-center'>
                                        <p>Some of our Student Brands</p>
                                        <Button className='hidden lg:block' endIcon={<OutboundOutlinedIcon />} size='large' variant='text' sx={{ color: '#0CC5DB', ":hover": { color: '#3EE8B5' }, textTransform: 'capitalize', width: '160px' }}>See All</Button>
                                    </div>

                                    <div className='grid lg:hidden grid-cols-1 gap-4 pl-2 pt-4 pb-8 pr-5'>
                                        <div className='flex items-center gap-3'>
                                            <img alt="" className="w-6 h-6 rounded-full ring-2 ring-offset-4 dark:bg-gray-500 ring-custom-blue ring-offset-gray-800" src="https://source.unsplash.com/40x40/?portrait?1" />
                                            <div>
                                                <h1 className='text-sm'>Full Name</h1>
                                                <p className='text-xs font-light'>Work Role</p>
                                            </div>
                                        </div>
                                        <div className='flex items-center gap-3'>
                                            <img alt="" className="w-6 h-6 rounded-full ring-2 ring-offset-4 dark:bg-gray-500 ring-custom-blue ring-offset-gray-800" src="https://source.unsplash.com/40x40/?portrait?1" />
                                            <div>
                                                <h1 className='text-sm'>Full Name</h1>
                                                <p className='text-xs font-light'>Work Role</p>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                <div className='w-full'>
                                    <iframe
                                        style={{ borderTopLeftRadius: '8px', borderTopRightRadius: '8px', width: '100%', height: '200px', objectFit: 'cover', border: '1px solid gray' }}
                                        currentIndex={selectedIndex}
                                        src='https://dsqqu7oxq6o1v.cloudfront.net/motion-array-1388812-A012_06252056_C069-high.mp4'
                                        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        title="Embedded video"
                                    />
                                </div>
                            </div>
                        </SwiperSlide>


                       
                        <SwiperSlide style={{ maxWidth: '400px', minWidth: '400px', minHeight: '575px', maxHeight: '575px' }}>
                            <div className='w-[340px] max-w-[340px] rounded-xl bg-dark flex flex-col-reverse justify-end min-h-[560px] max-h-[560px]' id={2}>
                                <div className='p-3'>
                                    <h1 className='text-2xl font-bold text-white'>Champion and Transform Local Businesses</h1>
                                    <p className='text-sm font-light my-3'>Step into the shoes of a consultant by adopting existing local businesses, transforming their strategy and processes, and accelerating their business success.</p>

                                    <p>Meet Our Client Partners</p>

                                    <div className='grid lg:hidden grid-cols-3 gap-4 pt-4 pb-8 pr-5'>
                                        <img className='h-6 hover:shadow-md hover:shadow-custom-blue transition-all duration-100 ease-in cursor-pointer p-2 rounded-xl' src={logo2} alt="logo" />
                                        <img className='h-6 hover:shadow-md hover:shadow-custom-blue transition-all duration-100 ease-in cursor-pointer p-2 rounded-xl' src={logo2} alt="logo" />
                                        <img className='h-6 hover:shadow-md hover:shadow-custom-blue transition-all duration-100 ease-in cursor-pointer p-2 rounded-xl' src={logo2} alt="logo" />
                                    </div>

                                </div>

                                <div className='w-full'>
                                    <iframe
                                        style={{ borderTopLeftRadius: '8px', borderTopRightRadius: '8px', width: '100%', height: '200px', objectFit: 'cover', border: '1px solid gray' }}
                                        currentIndex={selectedIndex}
                                        src='https://dsqqu7oxq6o1v.cloudfront.net/motion-array-1388812-A012_06252056_C069-high.mp4'
                                        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        title="Embedded video"
                                    />
                                </div>
                            </div>
                        </SwiperSlide>


                       
                        <SwiperSlide style={{ maxWidth: '400px', minWidth: '400px', minHeight: '575px', maxHeight: '575px' }}>
                            <div className='w-[340px] max-w-[340px] rounded-xl bg-dark flex flex-col-reverse justify-end min-h-[560px] max-h-[560px]' id={3}>
                                <div className='p-3'>
                                    <h1 className='text-2xl font-bold text-white'>Launch and Build your own Products & Business</h1>
                                    <p className='text-sm font-light my-3'>Students build and run a startup, end-to-end. 10% of our first cohort went on to work full-time on their startups, with 3 of them raising angel investments.</p>

                                    <p>Our Startup Showcase</p>

                                    <div className='grid lg:hidden grid-cols-2 lg:grid-cols-3 gap-4 pt-4 pb-8 pr-5'>
                                        <div className='flex flex-col items-center'>
                                            <img className='h-6 hover:shadow-md hover:shadow-custom-blue transition-all duration-100 ease-in cursor-pointer p-2 rounded-xl' src={logo2} alt="logo" />
                                            <p className='text-sm'>$1m + raised</p>
                                        </div>
                                        <div className='flex flex-col items-center'>
                                            <img className='h-6 hover:shadow-md hover:shadow-custom-blue transition-all duration-100 ease-in cursor-pointer p-2 rounded-xl' src={logo2} alt="logo" />
                                            <p className='text-sm'>$1m + raised</p>
                                        </div>
                                    </div>

                                </div>

                                <div className='w-full'>
                                    <iframe
                                        style={{ borderTopLeftRadius: '8px', borderTopRightRadius: '8px', width: '100%', height: '200px', objectFit: 'cover', border: '1px solid gray' }}
                                        currentIndex={selectedIndex}
                                        src='https://dsqqu7oxq6o1v.cloudfront.net/motion-array-1388812-A012_06252056_C069-high.mp4'
                                        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        title="Embedded video"
                                    />
                                </div>
                            </div>
                        </SwiperSlide>


                       
                        <SwiperSlide style={{ maxWidth: '400px', minWidth: '400px', minHeight: '575px', maxHeight: '575px' }}>
                            <div className='w-[340px] max-w-[340px] rounded-xl bg-dark flex flex-col-reverse justify-end min-h-[560px] max-h-[560px]' id={4}>
                                <div className='p-3'>
                                    <h1 className='text-xl font-bold text-white'>Hustle Through a Weekend of Iteration and Innovation</h1>
                                    <p className='text-sm font-light my-3'>Students engage with peers to bridge gaps, share ideas, and develop their best prototypes in under 48 hours.</p>
                                    <p className='mb-3'>Engage With Themes Across</p>

                                    <div className='grid grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-y-2'>

                                        <div className='flex gap-2 items-center'>
                                            <CheckCircleIcon />
                                            <p className='text-xs font-light'>Martech Hackathon</p>
                                        </div>
                                        <div className='flex gap-2 items-center'>
                                            <CheckCircleIcon />
                                            <p className='text-xs font-light'>Blockchain Hackathon</p>
                                        </div>
                                        <div className='flex gap-2 items-center'>
                                            <CheckCircleIcon />
                                            <p className='text-xs font-light'>Metaverse Hackathon</p>
                                        </div>
                                        <div className='flex gap-2 items-center'>
                                            <CheckCircleIcon />
                                            <p className='text-xs font-light'>Edtech Hackathon</p>
                                        </div>
                                        <div className='flex gap-2 items-center'>
                                            <CheckCircleIcon />
                                            <p className='text-xs font-light'>Fintech Hackathon</p>
                                        </div>
                                        <div className='flex gap-2 items-center'>
                                            <CheckCircleIcon />
                                            <p className='text-xs font-light'>Crypto Hackathon</p>
                                        </div>
                                        <div className='flex gap-2 items-center'>
                                            <CheckCircleIcon />
                                            <p className='text-xs font-light'>AI/ML Hackathon</p>
                                        </div>

                                    </div>
                                </div>

                                <div className='w-full'>
                                    <iframe
                                        style={{ borderTopLeftRadius: '8px', borderTopRightRadius: '8px', width: '100%', height: '200px', objectFit: 'cover', border: '1px solid gray' }}
                                        currentIndex={selectedIndex}
                                        src='https://dsqqu7oxq6o1v.cloudfront.net/motion-array-1388812-A012_06252056_C069-high.mp4'
                                        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        title="Embedded video"
                                    />
                                </div>
                            </div>
                        </SwiperSlide>

                        <SwiperSlide style={{ maxWidth: '400px', minWidth: '400px', minHeight: '575px', maxHeight: '575px' }}>
                            <div className='w-[340px] max-w-[340px] rounded-xl bg-dark flex flex-col-reverse justify-end min-h-[560px] max-h-[560px]' id={5}>
                                <div className='p-3'>
                                    <div>
                                        <h1 className='text-2xl font-bold text-white'>Get Mentored by Top CXOs</h1>
                                        <p className='text-sm font-light my-3'>Experience one-on-one mentorship, coaching and guidance from CXOs across industries.</p>
                                        <p className='mb-3'>Our Mentors Include</p>

                                        <div className='grid grid-cols-1 gap-4 gap-y-6 pl-2 pt-6 pb-8 pr-5'>
                                            <div className='flex items-center gap-3'>
                                                <img alt="" className="w-6 h-6 rounded-full ring-2 ring-offset-4 dark:bg-gray-500 ring-custom-blue ring-offset-gray-800" src="https://source.unsplash.com/40x40/?portrait?1" />
                                                <div>
                                                    <h1 className='text-sm'>Full Name</h1>
                                                    <p className='text-xs font-light'>Work Role</p>
                                                </div>
                                            </div>
                                            <div className='flex items-center gap-3'>
                                                <img alt="" className="w-6 h-6 rounded-full ring-2 ring-offset-4 dark:bg-gray-500 ring-custom-blue ring-offset-gray-800" src="https://source.unsplash.com/40x40/?portrait?1" />
                                                <div>
                                                    <h1 className='text-sm'>Full Name</h1>
                                                    <p className='text-xs font-light'>Work Role</p>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>

                                <div className='w-full'>
                                    <iframe
                                        style={{ borderTopLeftRadius: '8px', borderTopRightRadius: '8px', width: '100%', height: '200px', objectFit: 'cover', border: '1px solid gray' }}
                                        currentIndex={selectedIndex}
                                        src='https://dsqqu7oxq6o1v.cloudfront.net/motion-array-1388812-A012_06252056_C069-high.mp4'
                                        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        title="Embedded video"
                                    />
                                </div>
                            </div>
                        </SwiperSlide>


                       
                        <SwiperSlide style={{ maxWidth: '400px', minWidth: '400px', minHeight: '575px', maxHeight: '575px' }}>
                            <div className='w-[340px] max-w-[340px] rounded-xl bg-dark flex flex-col-reverse justify-end min-h-[560px] max-h-[560px]' id={6}>

                                <div className='p-3'>
                                    <h1 className='text-2xl font-bold text-white'>Run a 5 Cr. Investment Fund
                                    </h1>
                                    <p className='text-sm font-light my-3'>The Masters’ Union Investment Fund has a working capital of over 5 Crores...</p>
                                    <p className='mb-3'>Our Portfolio Includes</p>

                                    <div className='grid grid-cols-1 gap-4 gap-y-3 pt-3 pb-8 pr-5'>
                                        <div className='flex items-center gap-3'>
                                            <div className='border-2 border-custom-blue p-1 rounded-full'>
                                                <CleanHandsTwoToneIcon className='text-2xl text-custom-blue' />
                                            </div>
                                            <div>
                                                <h1 className='text-sm'>Investments in Public Equities</h1>
                                                <p className='text-xs font-light'>Poonawala Group • ITC • CDSL and 27 more!</p>
                                            </div>
                                        </div>
                                        <div className='flex items-center gap-3'>
                                            <div className='border-2 border-custom-blue p-1 rounded-full'>
                                                <CurrencyExchangeTwoToneIcon className='text-2xl text-custom-blue' />
                                            </div>
                                            <div>
                                                <h1 className='text-sm'>Investments as a VC</h1>
                                                <p className='text-xs font-light'>AlphaMint Labs • BluSmart and 4 more!</p>
                                            </div>
                                        </div>
                                        <div className='flex items-center gap-3'>
                                            <div className='border-2 border-custom-blue p-1 rounded-full'>
                                                <MoneyTwoToneIcon className='text-2xl text-custom-blue' />
                                            </div>
                                            <div>
                                                <h1 className='text-sm'>Alternate Investments</h1>
                                                <p className='text-xs font-light'>Antler India (LPs) • Gold • REITs • InvITs • Forex</p>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div className='w-full'>
                                    <iframe
                                        style={{ borderTopLeftRadius: '8px', borderTopRightRadius: '8px', width: '100%', height: '200px', objectFit: 'cover', border: '1px solid gray' }}
                                        currentIndex={selectedIndex}
                                        src='https://dsqqu7oxq6o1v.cloudfront.net/motion-array-1388812-A012_06252056_C069-high.mp4'
                                        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        title="Embedded video"
                                    />
                                </div>
                            </div>
                        </SwiperSlide>


                        <SwiperSlide style={{ maxWidth: '0', minWidth: '0' }}></SwiperSlide>

                    </Swiper>
                </div> */}

                {/* <div className='block lg:hidden'>
                    <div className='getId all-parent-container'>

                       

                        <div className='rounded-xl bg-custom-blue all-courses bg-opacity-5 flex flex-col-reverse items-start' id={0}>
                            <div className='p-3'>
                                <h1 className='text-2xl font-bold text-white'>Launch and Build your own Products & Business</h1>
                                <p className='text-sm font-light my-3'>From finding the right idea to building the product to getting sales and building financial models you will learn how different careers look like in a corporation.</p>
                                <p className='text-sm font-light my-3'>Get exposure to over <span className='font-semibold'>50+ Career option.</span>
                                </p>

                                <p className='hidden lg:block'>Some of our Student Brands</p>

                                <div className='flex lg:hidden justify-between items-center'>
                                    <p>Some of our Student Brands</p>
                                    <Button className='hidden lg:block' endIcon={<OutboundOutlinedIcon />} size='large' variant='text' sx={{ color: '#0CC5DB', ":hover": { color: '#3EE8B5' }, textTransform: 'capitalize', width: '160px' }}>See All</Button>
                                </div>

                                <div className='grid lg:hidden grid-cols-2 lg:grid-cols-3 gap-4 pt-4 pb-8 pr-5'>
                                    <img className='h-12 hover:shadow-md hover:shadow-custom-blue transition-all duration-100 ease-in cursor-pointer p-2 rounded-xl' src={logo2} alt="logo" />
                                    <img className='h-12 hover:shadow-md hover:shadow-custom-blue transition-all duration-100 ease-in cursor-pointer p-2 rounded-xl' src={logo2} alt="logo" />
                                </div>

                            </div>

                            <div className='w-full'>
                                <iframe
                                    style={{ borderTopLeftRadius: '8px', borderTopRightRadius: '8px', width: '100%', height: '200px', objectFit: 'cover', border: '1px solid gray' }}
                                    currentIndex={selectedIndex}
                                    src='https://dsqqu7oxq6o1v.cloudfront.net/motion-array-1388812-A012_06252056_C069-high.mp4'
                                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    title="Embedded video"
                                />
                            </div>
                        </div>

                       

                        <div className='rounded-xl bg-custom-blue all-courses bg-opacity-5 flex flex-col-reverse items-start' id={1}>
                            <div className='p-3'>
                                <h1 className='text-2xl font-bold text-white'>Become a Creator-preneur</h1>
                                <p className='text-sm font-light my-3'>From finding the right idea to building the product to getting sales and building financial models you will learn how different careers look like in a corporation.</p>

                                <div className='flex lg:hidden justify-between items-center'>
                                    <p>Some of our Student Brands</p>
                                    <Button className='hidden lg:block' endIcon={<OutboundOutlinedIcon />} size='large' variant='text' sx={{ color: '#0CC5DB', ":hover": { color: '#3EE8B5' }, textTransform: 'capitalize', width: '160px' }}>See All</Button>
                                </div>

                                <div className='grid lg:hidden grid-cols-2 lg:grid-cols-3 gap-4 pt-4 pb-8 pr-5'>
                                    <img className='h-12 hover:shadow-md hover:shadow-custom-blue transition-all duration-100 ease-in cursor-pointer p-2 rounded-xl' src={logo2} alt="logo" />
                                    <img className='h-12 hover:shadow-md hover:shadow-custom-blue transition-all duration-100 ease-in cursor-pointer p-2 rounded-xl' src={logo2} alt="logo" />
                                </div>

                            </div>

                            <div className='w-full'>
                                <iframe
                                    style={{ borderTopLeftRadius: '8px', borderTopRightRadius: '8px', width: '100%', height: '200px', objectFit: 'cover', border: '1px solid gray' }}
                                    currentIndex={selectedIndex}
                                    src='https://dsqqu7oxq6o1v.cloudfront.net/motion-array-1388812-A012_06252056_C069-high.mp4'
                                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    title="Embedded video"
                                />
                            </div>
                        </div>

                        <div className='bg-custom-blue all-courses bg-opacity-5' id={2}></div>
                        <div className='bg-custom-blue all-courses bg-opacity-5' id={3}></div>
                        <div className='bg-custom-blue all-courses bg-opacity-5' id={4}></div>
                        <div className='bg-custom-blue all-courses bg-opacity-5' id={5}></div>
                        <div className='bg-custom-blue all-courses bg-opacity-5' id={6}></div>
                    </div>
                </div> */}

            </div>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >

                <div className='bg-dark w-full min-w-[300px] sm:min-w-[350px] lg:w-[500px] p-5 cursor-pointer'>
                    <div className='w-full'>
                        <h4 onClick={handleClose} className='text-xl text-white text-right hover:text-purple'>x</h4>
                        <h1 className='text-2xl font-semibold text-pink text-center'>Learn More</h1>
                    </div>
                    <form ref={form} onSubmit={handleSubmit} autoComplete='off' className='lg:px-10'>
                        <div className='flex flex-col items-center mt-6 gap-1 text-white'>
                            <label htmlFor="name">Enter Name</label>
                            <input required className="text-center w-full py-2 rounded-3xl text-black focus:outline-none" placeholder='Enter your Name' type="text" name="name" id="name" />
                        </div>
                        <div className='flex flex-col items-center mt-6 gap-1 text-white'>
                            <label htmlFor="number">Enter Number</label>
                            <input required className="text-center w-full py-2 rounded-3xl text-black focus:outline-none" placeholder='Enter your number' type="number" name="number" id="number" />
                        </div>
                        <div className='flex flex-col items-center mt-6 gap-1 text-white'>
                            <label htmlFor="email">Enter Email</label>
                            <input required className="text-center w-full py-2 rounded-3xl text-black focus:outline-none" placeholder='Enter your email' type="email" name="email" id="email" />
                        </div>
                        <div className='flex flex-col items-center mt-6 gap-1 text-white'>
                            <label htmlFor="option">Select One</label>
                            <select required className="text-center w-full py-2 rounded-3xl text-black focus:outline-none" name="option" id="option">
                                <option value="Student">Student</option>
                                <option value="Parent">Parent</option>
                                <option value="Counselor">Counselor</option>
                                <option value="Others">Others</option>
                            </select>
                        </div>
                        <div className='flex flex-col items-center mt-6 gap-1 text-white'>
                            <label htmlFor="city">Enter City</label>
                            <input required className="text-center w-full py-2 rounded-3xl text-black focus:outline-none" placeholder='Enter your city' type="text" name="city" id="city" />
                        </div>
                        <div className='flex flex-col items-center mt-6 gap-1 text-white'>
                            <input className='text-white py-2 font-bold rounded-3xl bg-pink hover:bg-purple w-1/2 text-center' type="submit" value={'Submit'} />
                        </div>
                    </form>
                </div>

            </Dialog>
        </div>
    );
};

export default AllCourses;