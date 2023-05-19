import { Button } from '@mui/material';
import React from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import Stories from 'react-insta-stories';
import OutboundOutlinedIcon from '@mui/icons-material/OutboundOutlined';
import './style.css';
import logo2 from '../../../assets/Logos/Group 2859890.png';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import { Navigation, Pagination, Scrollbar, A11y, FreeMode } from 'swiper';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import ArrowCircleLeftRoundedIcon from '@mui/icons-material/ArrowCircleLeftRounded';
import ArrowCircleRightRoundedIcon from '@mui/icons-material/ArrowCircleRightRounded';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CleanHandsTwoToneIcon from '@mui/icons-material/CleanHandsTwoTone';
import CurrencyExchangeTwoToneIcon from '@mui/icons-material/CurrencyExchangeTwoTone';
import MoneyTwoToneIcon from '@mui/icons-material/MoneyTwoTone';
import img from '../../../assets/wepik-export-20230516131526jrNm.png';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const DualManagement = () => {



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

    return (
        <div className='mt-28 px-5 py-10 lg:px-30 xl:px-32 font' ref={containerRef}>
            <h1 className='font-bold text-4xl font block lg:hidden mb-6 lg:mb-0'>Hands-on. <span className='bg-gradient-to-t from-custom-blue to-transparent to-50%'>Disruptive. Experiential.</span></h1>
            <div ref={stickyRef} style={{ top: 90, backgroundColor: '#121212', padding: "35px 0", zIndex: '1000', width: '100%' }} className='hidden lg:block'>
                <h1 className='font-bold text-3xl'>Curriculum with <span className='bg-gradient-to-t from-custom-blue to-transparent to-50%'>Dual Focus on Tech And Management</span></h1>

            </div>
            <div className='flex flex-col lg:flex-row gap-10 items-start w-full'>

                <div ref={stickyRef2} style={{ top: 190, backgroundColor: '#121212', zIndex: '1' }} className='hidden lg:flex flex-col gap-5 w-full max-w-[370px] min-w-[300px] sticky'>

                    <h1 className='text-lg'>New Age Concentrations</h1>

                    <div className='bg-[#424242] border-r-4 border-b-4 p-4 rounded-md lg:w-[370px] w-full'>
                        <p className='p-1 rounded-md bg-custom-blue bg-opacity-40 inline font-bold'>CORE CONCENTRATIONS</p>
                        <div className='my-6 flex flex-col gap-y-1'>
                            <div className='flex flex-row items-start gap-1'>
                                <span><PlayArrowRoundedIcon sx={{ color: '#397FEB' }} /></span>
                                <span className='text-sm font-light'>Computing, Business Analytics & Statistics | <span className='font-bold'>CBAS</span></span>
                            </div>
                            <div className='flex flex-row items-start gap-1'>
                                <span><PlayArrowRoundedIcon sx={{ color: '#397FEB' }} /></span>
                                <span className='text-sm font-light'>Communications | <span className='font-bold'>COM</span></span>
                            </div>
                            <div className='flex flex-row items-start gap-1'>
                                <span><PlayArrowRoundedIcon sx={{ color: '#397FEB' }} /></span>
                                <span className='text-sm font-light'>Finance & Fintech | <span className='font-bold'>FIFI</span></span>
                            </div>
                            <div className='flex flex-row items-start gap-1'>
                                <span><PlayArrowRoundedIcon sx={{ color: '#397FEB' }} /></span>
                                <span className='text-sm font-light'>Marketing, Branding & Design | <span className='font-bold'>MABD</span></span>
                            </div>
                            <div className='flex flex-row items-start gap-1'>
                                <span><PlayArrowRoundedIcon sx={{ color: '#397FEB' }} /></span>
                                <span className='text-sm font-light'>Management & Strategy | <span className='font-bold'>MABD</span></span>
                            </div>
                        </div>
                        <p className='p-1 rounded-md bg-custom-blue bg-opacity-40 inline font-bold'>SKILL CONCENTRATIONS</p>
                        <div className='my-6 flex flex-col gap-y-1'>
                            <div className='flex flex-row items-start gap-1'>
                                <span><PlayArrowRoundedIcon sx={{ color: '#397FEB' }} /></span>
                                <span className='text-sm font-light'>Design & User Experience | <span className='font-bold'>DUX</span></span>
                            </div>
                            <div className='flex flex-row items-start gap-1'>
                                <span><PlayArrowRoundedIcon sx={{ color: '#397FEB' }} /></span>
                                <span className='text-sm font-light'>Programming & Software Development | <span className='font-bold'>PSD</span></span>
                            </div>
                        </div>
                        <p className='p-1 rounded-md bg-custom-blue bg-opacity-40 inline font-bold'>INDUSTRY CONCENTRATIONS</p>
                        <div className='mt-6 flex flex-col gap-y-1'>
                            <div className='flex flex-row items-start gap-1'>
                                <span><PlayArrowRoundedIcon sx={{ color: '#397FEB' }} /></span>
                                <span className='text-sm font-light'>Advance Data Analytics | <span className='font-bold'>ADA</span></span>
                            </div>
                            <div className='flex flex-row items-start gap-1'>
                                <span><PlayArrowRoundedIcon sx={{ color: '#397FEB' }} /></span>
                                <span className='text-sm font-light'>Banking, PE & VC | <span className='font-bold'>BPV</span></span>
                            </div>
                            <div className='flex flex-row items-start gap-1'>
                                <span><PlayArrowRoundedIcon sx={{ color: '#397FEB' }} /></span>
                                <span className='text-sm font-light'>Digital & E-Commerce | <span className='font-bold'>DEC</span></span>
                            </div>
                            <div className='flex flex-row items-start gap-1'>
                                <span><PlayArrowRoundedIcon sx={{ color: '#397FEB' }} /></span>
                                <span className='text-sm font-light'>Technology, Product & Project Management | <span className='font-bold'>TPM</span></span>
                            </div>
                        </div>
                    </div>

                </div>

                <div className='flex lg:hidden flex-col gap-5 w-full'>

                    <h1 className='text-lg'>New Age Concentrations</h1>

                    <div className='bg-[#424242] border-r-4 border-b-4 p-4 rounded-md lg:w-[370px] w-full'>
                        <p className='p-1 rounded-md bg-custom-blue bg-opacity-40 inline font-bold'>CORE CONCENTRATIONS</p>
                        <div className='my-6 flex flex-col gap-y-1'>
                            <div className='flex flex-row items-start gap-1'>
                                <span><PlayArrowRoundedIcon sx={{ color: '#397FEB' }} /></span>
                                <span className='text-sm font-light'>Computing, Business Analytics & Statistics | <span className='font-bold'>CBAS</span></span>
                            </div>
                            <div className='flex flex-row items-start gap-1'>
                                <span><PlayArrowRoundedIcon sx={{ color: '#397FEB' }} /></span>
                                <span className='text-sm font-light'>Communications | <span className='font-bold'>COM</span></span>
                            </div>
                            <div className='flex flex-row items-start gap-1'>
                                <span><PlayArrowRoundedIcon sx={{ color: '#397FEB' }} /></span>
                                <span className='text-sm font-light'>Finance & Fintech | <span className='font-bold'>FIFI</span></span>
                            </div>
                            <div className='flex flex-row items-start gap-1'>
                                <span><PlayArrowRoundedIcon sx={{ color: '#397FEB' }} /></span>
                                <span className='text-sm font-light'>Marketing, Branding & Design | <span className='font-bold'>MABD</span></span>
                            </div>
                            <div className='flex flex-row items-start gap-1'>
                                <span><PlayArrowRoundedIcon sx={{ color: '#397FEB' }} /></span>
                                <span className='text-sm font-light'>Management & Strategy | <span className='font-bold'>MABD</span></span>
                            </div>
                        </div>
                        <p className='p-1 rounded-md bg-custom-blue bg-opacity-40 inline font-bold'>SKILL CONCENTRATIONS</p>
                        <div className='my-6 flex flex-col gap-y-1'>
                            <div className='flex flex-row items-start gap-1'>
                                <span><PlayArrowRoundedIcon sx={{ color: '#397FEB' }} /></span>
                                <span className='text-sm font-light'>Design & User Experience | <span className='font-bold'>DUX</span></span>
                            </div>
                            <div className='flex flex-row items-start gap-1'>
                                <span><PlayArrowRoundedIcon sx={{ color: '#397FEB' }} /></span>
                                <span className='text-sm font-light'>Programming & Software Development | <span className='font-bold'>PSD</span></span>
                            </div>
                        </div>
                        <p className='p-1 rounded-md bg-custom-blue bg-opacity-40 inline font-bold'>INDUSTRY CONCENTRATIONS</p>
                        <div className='mt-6 flex flex-col gap-y-1'>
                            <div className='flex flex-row items-start gap-1'>
                                <span><PlayArrowRoundedIcon sx={{ color: '#397FEB' }} /></span>
                                <span className='text-sm font-light'>Advance Data Analytics | <span className='font-bold'>ADA</span></span>
                            </div>
                            <div className='flex flex-row items-start gap-1'>
                                <span><PlayArrowRoundedIcon sx={{ color: '#397FEB' }} /></span>
                                <span className='text-sm font-light'>Banking, PE & VC | <span className='font-bold'>BPV</span></span>
                            </div>
                            <div className='flex flex-row items-start gap-1'>
                                <span><PlayArrowRoundedIcon sx={{ color: '#397FEB' }} /></span>
                                <span className='text-sm font-light'>Digital & E-Commerce | <span className='font-bold'>DEC</span></span>
                            </div>
                            <div className='flex flex-row items-start gap-1'>
                                <span><PlayArrowRoundedIcon sx={{ color: '#397FEB' }} /></span>
                                <span className='text-sm font-light'>Technology, Product & Project Management | <span className='font-bold'>TPM</span></span>
                            </div>
                        </div>
                    </div>

                </div>

                <div className='hidden lg:block'>
                    <VerticalTimeline
                        layout={'1-column-left'}
                        lineColor={'#424242'}
                    >
                        <VerticalTimelineElement
                            className="vertical-timeline-element--work"
                            iconStyle={{ color: '#397EFB', backgroundColor: '#121212' }}
                            contentStyle={{ background: '#121212', minWidth: '500px', maxWidth:'600px', width: '100%' }}
                            contentArrowStyle={{ background: '#121212' }}

                        >

                            <div className='w-full'>
                                <div className="space-y-4 text-white w-full">

                                    <span className='font-bold text-white mb-4 text-xl'>
                                        Week 1
                                    </span>

                                    <details className="w-full border rounded-lg">
                                        <summary className="px-4 py-6 focus:outline-none focus-visible:ring-cyan-600"><span className='bg-custom-blue p-1 font-bold mr-2 rounded-md bg-opacity-60'>In Class</span>
                                            Core and Skill Concentrations</summary>
                                        <p className="px-4 py-6 pt-0 ml-4 -mt-4">Lectus iaculis orci metus vitae ligula dictum per. Nisl per nullam taciti at adipiscing est. </p>
                                    </details>
                                    <details className="w-full border rounded-lg">
                                        <summary className="px-4 py-6 focus:outline-none focus-visible:ring-cyan-600"><span className='bg-custom-blue p-1 font-bold mr-2 rounded-md bg-opacity-60'>In Class</span>
                                            Core and Skill Concentrations</summary>
                                        <p className="px-4 py-6 pt-0 ml-4 -mt-4">Tincidunt ut hac condimentum rhoncus phasellus nostra. Magna porttitor egestas tincidunt neque vehicula potenti. </p>
                                    </details>
                                </div>
                            </div>


                        </VerticalTimelineElement>

                        <VerticalTimelineElement
                            className="vertical-timeline-element--work"
                            iconStyle={{ color: '#397EFB', backgroundColor: '#121212' }}
                            contentStyle={{ background: '#121212', minWidth: '500px', maxWidth:'600px', width: '100%' }}
                            contentArrowStyle={{ background: '#121212' }}

                        >

                            <div className='w-full'>
                                <div className="space-y-4 text-white w-full">

                                    <span className='font-bold text-white mb-4 text-xl'>
                                        Week 2
                                    </span>

                                    <details className="w-full border rounded-lg">
                                        <summary className="px-4 py-6 focus:outline-none focus-visible:ring-cyan-600"><span className='bg-custom-blue p-1 font-bold mr-2 rounded-md bg-opacity-60'>In Class</span>
                                            Core and Skill Concentrations</summary>
                                        <p className="px-4 py-6 pt-0 ml-4 -mt-4">Lectus iaculis orci metus vitae ligula dictum per. Nisl per nullam taciti at adipiscing est. </p>
                                    </details>
                                    <details className="w-full border rounded-lg">
                                        <summary className="px-4 py-6 focus:outline-none focus-visible:ring-cyan-600"><span className='bg-custom-blue p-1 font-bold mr-2 rounded-md bg-opacity-60'>In Class</span>
                                            Core and Skill Concentrations</summary>
                                        <p className="px-4 py-6 pt-0 ml-4 -mt-4">Tincidunt ut hac condimentum rhoncus phasellus nostra. Magna porttitor egestas tincidunt neque vehicula potenti. </p>
                                    </details>
                                </div>
                            </div>


                        </VerticalTimelineElement>

                        <VerticalTimelineElement
                            className="vertical-timeline-element--work"
                            iconStyle={{ color: '#397EFB', backgroundColor: '#121212' }}
                            contentStyle={{ background: '#121212', minWidth: '500px', maxWidth:'600px', width: '100%' }}
                            contentArrowStyle={{ background: '#121212' }}

                        >

                            <div className='w-full'>
                                <div className="space-y-4 text-white w-full">

                                    <span className='font-bold text-white mb-4 text-xl'>
                                        Week 3
                                    </span>

                                    <details className="w-full border rounded-lg">
                                        <summary className="px-4 py-6 focus:outline-none focus-visible:ring-cyan-600"><span className='bg-custom-blue p-1 font-bold mr-2 rounded-md bg-opacity-60'>In Class</span>
                                            Core and Skill Concentrations</summary>
                                        <p className="px-4 py-6 pt-0 ml-4 -mt-4">Lectus iaculis orci metus vitae ligula dictum per. Nisl per nullam taciti at adipiscing est. </p>
                                    </details>
                                    <details className="w-full border rounded-lg">
                                        <summary className="px-4 py-6 focus:outline-none focus-visible:ring-cyan-600"><span className='bg-custom-blue p-1 font-bold mr-2 rounded-md bg-opacity-60'>In Class</span>
                                            VIP Challenge</summary>
                                        <p className="px-4 py-6 pt-0 ml-4 -mt-4">Tincidunt ut hac condimentum rhoncus phasellus nostra. Magna porttitor egestas tincidunt neque vehicula potenti. </p>
                                    </details>
                                </div>
                            </div>


                        </VerticalTimelineElement>

                        <VerticalTimelineElement
                            className="vertical-timeline-element--work"
                            iconStyle={{ color: '#397EFB', backgroundColor: '#121212' }}
                            contentStyle={{ background: '#121212', minWidth: '500px', maxWidth:'600px', width: '100%' }}
                            contentArrowStyle={{ background: '#121212' }}

                        >

                            <div className='w-full'>
                                <div className="space-y-4 text-white w-full">

                                    <span className='font-bold text-white mb-4 text-xl'>
                                        Week 4
                                    </span>

                                    <details className="w-full border rounded-lg">
                                        <summary className="px-4 py-6 focus:outline-none focus-visible:ring-cyan-600"><span className='bg-custom-blue p-1 font-bold mr-2 rounded-md bg-opacity-60'>In Class</span>
                                            Skill & Industry Concentrations</summary>
                                        <p className="px-4 py-6 pt-0 ml-4 -mt-4">Lectus iaculis orci metus vitae ligula dictum per. Nisl per nullam taciti at adipiscing est. </p>
                                    </details>
                                    <details className="w-full border rounded-lg">
                                        <summary className="px-4 py-6 focus:outline-none focus-visible:ring-cyan-600"><span className='bg-custom-blue p-1 font-bold mr-2 rounded-md bg-opacity-60'>In Class</span>
                                            VIP Challenge</summary>
                                        <p className="px-4 py-6 pt-0 ml-4 -mt-4">Tincidunt ut hac condimentum rhoncus phasellus nostra. Magna porttitor egestas tincidunt neque vehicula potenti. </p>
                                    </details>
                                </div>
                            </div>


                        </VerticalTimelineElement>

                        <VerticalTimelineElement
                            className="vertical-timeline-element--work"
                            iconStyle={{ color: '#397EFB', backgroundColor: '#121212' }}
                            contentStyle={{ background: '#121212', minWidth: '500px', maxWidth:'600px', width: '100%' }}
                            contentArrowStyle={{ background: '#121212' }}

                        >

                            <div className='w-full'>
                                <div className="space-y-4 text-white w-full">

                                    <span className='font-bold text-white mb-4 text-xl'>
                                        Week 5
                                    </span>

                                    <details className="w-full border rounded-lg">
                                        <summary className="px-4 py-6 focus:outline-none focus-visible:ring-cyan-600"><span className='bg-custom-blue p-1 font-bold mr-2 rounded-md bg-opacity-60'>In Class</span>
                                            Skill & Industry Concentrations</summary>
                                        <p className="px-4 py-6 pt-0 ml-4 -mt-4">Lectus iaculis orci metus vitae ligula dictum per. Nisl per nullam taciti at adipiscing est. </p>
                                    </details>
                                    <details className="w-full border rounded-lg">
                                        <summary className="px-4 py-6 focus:outline-none focus-visible:ring-cyan-600"><span className='bg-custom-blue p-1 font-bold mr-2 rounded-md bg-opacity-60'>In Class</span>
                                            VIP Challenge</summary>
                                        <p className="px-4 py-6 pt-0 ml-4 -mt-4">Tincidunt ut hac condimentum rhoncus phasellus nostra. Magna porttitor egestas tincidunt neque vehicula potenti. </p>
                                    </details>
                                </div>
                            </div>


                        </VerticalTimelineElement>

                        <VerticalTimelineElement
                            className="vertical-timeline-element--work"
                            iconStyle={{ color: '#397EFB', backgroundColor: '#121212' }}
                            contentStyle={{ background: '#121212', minWidth: '500px', maxWidth:'600px', width: '100%' }}
                            contentArrowStyle={{ background: '#121212' }}

                        >

                            <div className='w-full'>
                                <div className="space-y-4 text-white w-full">

                                    <span className='font-bold text-white mb-4 text-xl'>
                                        Week 6
                                    </span>

                                    <details className="w-full border rounded-lg">
                                        <summary className="px-4 py-6 focus:outline-none focus-visible:ring-cyan-600"><span className='bg-custom-blue p-1 font-bold mr-2 rounded-md bg-opacity-60'>In Class</span>
                                            Skill & Industry Concentrations</summary>
                                        <p className="px-4 py-6 pt-0 ml-4 -mt-4">Lectus iaculis orci metus vitae ligula dictum per. Nisl per nullam taciti at adipiscing est. </p>
                                    </details>
                                    <details className="w-full border rounded-lg">
                                        <summary className="px-4 py-6 focus:outline-none focus-visible:ring-cyan-600"><span className='bg-custom-blue p-1 font-bold mr-2 rounded-md bg-opacity-60'>In Class</span>
                                            VIP Challenge</summary>
                                        <p className="px-4 py-6 pt-0 ml-4 -mt-4">Tincidunt ut hac condimentum rhoncus phasellus nostra. Magna porttitor egestas tincidunt neque vehicula potenti. </p>
                                    </details>
                                </div>
                            </div>


                        </VerticalTimelineElement>

                        <VerticalTimelineElement
                            className="vertical-timeline-element--work"
                            iconStyle={{ color: '#397EFB', backgroundColor: '#121212' }}
                            contentStyle={{ background: '#121212', minWidth: '500px', maxWidth:'600px', width: '100%' }}
                            contentArrowStyle={{ background: '#121212' }}

                        >

                            <div className='w-full'>
                                <div className="space-y-4 text-white w-full">

                                    <span className='font-bold text-white mb-4 text-xl'>
                                        Week 7
                                    </span>

                                    <details className="w-full border rounded-lg">
                                        <summary className="px-4 py-6 focus:outline-none focus-visible:ring-cyan-600"><span className='bg-custom-blue p-1 font-bold mr-2 rounded-md bg-opacity-60'>In Class</span>
                                            Skill & Industry Concentrations</summary>
                                        <p className="px-4 py-6 pt-0 ml-4 -mt-4">Lectus iaculis orci metus vitae ligula dictum per. Nisl per nullam taciti at adipiscing est. </p>
                                    </details>
                                    <details className="w-full border rounded-lg">
                                        <summary className="px-4 py-6 focus:outline-none focus-visible:ring-cyan-600"><span className='bg-custom-blue p-1 font-bold mr-2 rounded-md bg-opacity-60'>In Class</span>
                                            VIP Challenge</summary>
                                        <p className="px-4 py-6 pt-0 ml-4 -mt-4">Tincidunt ut hac condimentum rhoncus phasellus nostra. Magna porttitor egestas tincidunt neque vehicula potenti. </p>
                                    </details>
                                </div>
                            </div>


                        </VerticalTimelineElement>

                        <VerticalTimelineElement
                            className="vertical-timeline-element--work"
                            iconStyle={{ color: '#397EFB', backgroundColor: '#121212' }}
                            contentStyle={{ background: '#121212', minWidth: '500px', maxWidth:'600px', width: '100%' }}
                            contentArrowStyle={{ background: '#121212' }}

                        >

                            <div className='w-full'>
                                <div className="space-y-4 text-white w-full">

                                    <span className='font-bold text-white mb-4 text-xl'>
                                        Week 8
                                    </span>

                                    <details className="w-full border rounded-lg">
                                        <summary className="px-4 py-6 focus:outline-none focus-visible:ring-cyan-600"><span className='bg-custom-blue p-1 font-bold mr-2 rounded-md bg-opacity-60'>In Class</span>
                                            Skill & Industry Concentrations</summary>
                                        <p className="px-4 py-6 pt-0 ml-4 -mt-4">Lectus iaculis orci metus vitae ligula dictum per. Nisl per nullam taciti at adipiscing est. </p>
                                    </details>
                                    <details className="w-full border rounded-lg">
                                        <summary className="px-4 py-6 focus:outline-none focus-visible:ring-cyan-600"><span className='bg-custom-blue p-1 font-bold mr-2 rounded-md bg-opacity-60'>In Class</span>

                                            One Day Profit Challenge</summary>
                                        <p className="px-4 py-6 pt-0 ml-4 -mt-4">Tincidunt ut hac condimentum rhoncus phasellus nostra. Magna porttitor egestas tincidunt neque vehicula potenti. </p>
                                    </details>
                                </div>
                            </div>


                        </VerticalTimelineElement>

                    </VerticalTimeline>
                </div>


                <div className='block lg:hidden w-full'>
                    <div
                        className='w-full'
                    >
                        <div
                            className='mb-10 w-full'
                        >

                            <div className='w-full'>
                                <div className="space-y-4 text-white w-full">

                                    <span className='font-bold text-white mb-4 text-xl'>
                                        Week 1
                                    </span>

                                    <details className="w-full border rounded-lg">
                                        <summary className="px-4 py-6 focus:outline-none focus-visible:ring-cyan-600"><span className='bg-custom-blue p-1 font-bold mr-2 rounded-md bg-opacity-60'>In Class</span>
                                            Core and Skill Concentrations</summary>
                                        <p className="px-4 py-6 pt-0 ml-4 -mt-4">Lectus iaculis orci metus vitae ligula dictum per. Nisl per nullam taciti at adipiscing est. </p>
                                    </details>
                                    <details className="w-full border rounded-lg">
                                        <summary className="px-4 py-6 focus:outline-none focus-visible:ring-cyan-600"><span className='bg-custom-blue p-1 font-bold mr-2 rounded-md bg-opacity-60'>In Class</span>
                                            Core and Skill Concentrations</summary>
                                        <p className="px-4 py-6 pt-0 ml-4 -mt-4">Tincidunt ut hac condimentum rhoncus phasellus nostra. Magna porttitor egestas tincidunt neque vehicula potenti. </p>
                                    </details>
                                </div>
                            </div>


                        </div>

                        <div
                            className='mb-10 w-full'
                        >

                            <div className='w-full'>
                                <div className="space-y-4 text-white w-full">

                                    <span className='font-bold text-white mb-4 text-xl'>
                                        Week 2
                                    </span>

                                    <details className="w-full border rounded-lg">
                                        <summary className="px-4 py-6 focus:outline-none focus-visible:ring-cyan-600"><span className='bg-custom-blue p-1 font-bold mr-2 rounded-md bg-opacity-60'>In Class</span>
                                            Core and Skill Concentrations</summary>
                                        <p className="px-4 py-6 pt-0 ml-4 -mt-4">Lectus iaculis orci metus vitae ligula dictum per. Nisl per nullam taciti at adipiscing est. </p>
                                    </details>
                                    <details className="w-full border rounded-lg">
                                        <summary className="px-4 py-6 focus:outline-none focus-visible:ring-cyan-600"><span className='bg-custom-blue p-1 font-bold mr-2 rounded-md bg-opacity-60'>In Class</span>
                                            Core and Skill Concentrations</summary>
                                        <p className="px-4 py-6 pt-0 ml-4 -mt-4">Tincidunt ut hac condimentum rhoncus phasellus nostra. Magna porttitor egestas tincidunt neque vehicula potenti. </p>
                                    </details>
                                </div>
                            </div>


                        </div>

                        <div
                            className='mb-10 w-full'

                        >

                            <div className='w-full'>
                                <div className="space-y-4 text-white w-full">

                                    <span className='font-bold text-white mb-4 text-xl'>
                                        Week 3
                                    </span>

                                    <details className="w-full border rounded-lg">
                                        <summary className="px-4 py-6 focus:outline-none focus-visible:ring-cyan-600"><span className='bg-custom-blue p-1 font-bold mr-2 rounded-md bg-opacity-60'>In Class</span>
                                            Core and Skill Concentrations</summary>
                                        <p className="px-4 py-6 pt-0 ml-4 -mt-4">Lectus iaculis orci metus vitae ligula dictum per. Nisl per nullam taciti at adipiscing est. </p>
                                    </details>
                                    <details className="w-full border rounded-lg">
                                        <summary className="px-4 py-6 focus:outline-none focus-visible:ring-cyan-600"><span className='bg-custom-blue p-1 font-bold mr-2 rounded-md bg-opacity-60'>In Class</span>
                                            VIP Challenge</summary>
                                        <p className="px-4 py-6 pt-0 ml-4 -mt-4">Tincidunt ut hac condimentum rhoncus phasellus nostra. Magna porttitor egestas tincidunt neque vehicula potenti. </p>
                                    </details>
                                </div>
                            </div>


                        </div>

                        <div
                            className='mb-10 w-full'

                        >

                            <div className='w-full'>
                                <div className="space-y-4 text-white w-full">

                                    <span className='font-bold text-white mb-4 text-xl'>
                                        Week 4
                                    </span>

                                    <details className="w-full border rounded-lg">
                                        <summary className="px-4 py-6 focus:outline-none focus-visible:ring-cyan-600"><span className='bg-custom-blue p-1 font-bold mr-2 rounded-md bg-opacity-60'>In Class</span>
                                            Skill & Industry Concentrations</summary>
                                        <p className="px-4 py-6 pt-0 ml-4 -mt-4">Lectus iaculis orci metus vitae ligula dictum per. Nisl per nullam taciti at adipiscing est. </p>
                                    </details>
                                    <details className="w-full border rounded-lg">
                                        <summary className="px-4 py-6 focus:outline-none focus-visible:ring-cyan-600"><span className='bg-custom-blue p-1 font-bold mr-2 rounded-md bg-opacity-60'>In Class</span>
                                            VIP Challenge</summary>
                                        <p className="px-4 py-6 pt-0 ml-4 -mt-4">Tincidunt ut hac condimentum rhoncus phasellus nostra. Magna porttitor egestas tincidunt neque vehicula potenti. </p>
                                    </details>
                                </div>
                            </div>


                        </div>

                        <div
                            className='mb-10 w-full'

                        >

                            <div className='w-full'>
                                <div className="space-y-4 text-white w-full">

                                    <span className='font-bold text-white mb-4 text-xl'>
                                        Week 5
                                    </span>

                                    <details className="w-full border rounded-lg">
                                        <summary className="px-4 py-6 focus:outline-none focus-visible:ring-cyan-600"><span className='bg-custom-blue p-1 font-bold mr-2 rounded-md bg-opacity-60'>In Class</span>
                                            Skill & Industry Concentrations</summary>
                                        <p className="px-4 py-6 pt-0 ml-4 -mt-4">Lectus iaculis orci metus vitae ligula dictum per. Nisl per nullam taciti at adipiscing est. </p>
                                    </details>
                                    <details className="w-full border rounded-lg">
                                        <summary className="px-4 py-6 focus:outline-none focus-visible:ring-cyan-600"><span className='bg-custom-blue p-1 font-bold mr-2 rounded-md bg-opacity-60'>In Class</span>
                                            VIP Challenge</summary>
                                        <p className="px-4 py-6 pt-0 ml-4 -mt-4">Tincidunt ut hac condimentum rhoncus phasellus nostra. Magna porttitor egestas tincidunt neque vehicula potenti. </p>
                                    </details>
                                </div>
                            </div>


                        </div>

                        <div

                            className='mb-10 w-full'
                        >

                            <div className='w-full'>
                                <div className="space-y-4 text-white w-full">

                                    <span className='font-bold text-white mb-4 text-xl'>
                                        Week 6
                                    </span>

                                    <details className="w-full border rounded-lg">
                                        <summary className="px-4 py-6 focus:outline-none focus-visible:ring-cyan-600"><span className='bg-custom-blue p-1 font-bold mr-2 rounded-md bg-opacity-60'>In Class</span>
                                            Skill & Industry Concentrations</summary>
                                        <p className="px-4 py-6 pt-0 ml-4 -mt-4">Lectus iaculis orci metus vitae ligula dictum per. Nisl per nullam taciti at adipiscing est. </p>
                                    </details>
                                    <details className="w-full border rounded-lg">
                                        <summary className="px-4 py-6 focus:outline-none focus-visible:ring-cyan-600"><span className='bg-custom-blue p-1 font-bold mr-2 rounded-md bg-opacity-60'>In Class</span>
                                            VIP Challenge</summary>
                                        <p className="px-4 py-6 pt-0 ml-4 -mt-4">Tincidunt ut hac condimentum rhoncus phasellus nostra. Magna porttitor egestas tincidunt neque vehicula potenti. </p>
                                    </details>
                                </div>
                            </div>


                        </div>

                        <div
                            className='mb-10 w-full'

                        >

                            <div className='w-full'>
                                <div className="space-y-4 text-white w-full">

                                    <span className='font-bold text-white mb-4 text-xl'>
                                        Week 7
                                    </span>

                                    <details className="w-full border rounded-lg">
                                        <summary className="px-4 py-6 focus:outline-none focus-visible:ring-cyan-600"><span className='bg-custom-blue p-1 font-bold mr-2 rounded-md bg-opacity-60'>In Class</span>
                                            Skill & Industry Concentrations</summary>
                                        <p className="px-4 py-6 pt-0 ml-4 -mt-4">Lectus iaculis orci metus vitae ligula dictum per. Nisl per nullam taciti at adipiscing est. </p>
                                    </details>
                                    <details className="w-full border rounded-lg">
                                        <summary className="px-4 py-6 focus:outline-none focus-visible:ring-cyan-600"><span className='bg-custom-blue p-1 font-bold mr-2 rounded-md bg-opacity-60'>In Class</span>
                                            VIP Challenge</summary>
                                        <p className="px-4 py-6 pt-0 ml-4 -mt-4">Tincidunt ut hac condimentum rhoncus phasellus nostra. Magna porttitor egestas tincidunt neque vehicula potenti. </p>
                                    </details>
                                </div>
                            </div>


                        </div>

                        <div

                            className='mb-10 w-full'
                        >

                            <div className='w-full'>
                                <div className="space-y-4 text-white w-full">

                                    <span className='font-bold text-white mb-4 text-xl'>
                                        Week 8
                                    </span>

                                    <details className="w-full border rounded-lg">
                                        <summary className="px-4 py-6 focus:outline-none focus-visible:ring-cyan-600"><span className='bg-custom-blue p-1 font-bold mr-2 rounded-md bg-opacity-60'>In Class</span>
                                            Skill & Industry Concentrations</summary>
                                        <p className="px-4 py-6 pt-0 ml-4 -mt-4">Lectus iaculis orci metus vitae ligula dictum per. Nisl per nullam taciti at adipiscing est. </p>
                                    </details>
                                    <details className="w-full border rounded-lg">
                                        <summary className="px-4 py-6 focus:outline-none focus-visible:ring-cyan-600"><span className='bg-custom-blue p-1 font-bold mr-2 rounded-md bg-opacity-60'>In Class</span>

                                            One Day Profit Challenge</summary>
                                        <p className="px-4 py-6 pt-0 ml-4 -mt-4">Tincidunt ut hac condimentum rhoncus phasellus nostra. Magna porttitor egestas tincidunt neque vehicula potenti. </p>
                                    </details>
                                </div>
                            </div>


                        </div>

                    </div>
                </div>


            </div>
        </div>
    );
};

export default DualManagement;