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
import HearStraight from '../HearStraight';

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
            <h1 className='font-bold text-4xl font block lg:hidden mb-6 lg:mb-0'>Curriculum with Dual Focus on Tech And Management</h1>
            <div ref={stickyRef} style={{ top: 90,backgroundColor: '#141414', padding: "35px 0", zIndex: '1000', width: '100%' }} className='hidden lg:block'>
                <h1 className='font-bold text-3xl'>Curriculum with Dual Focus on Tech And Management</h1>

            </div>
            <div className='flex flex-col lg:flex-row gap-10 items-start w-full'>

                <div ref={stickyRef2} style={{ top: 190, zIndex: '1' }} className='hidden lg:flex flex-col gap-5 w-full max-w-[370px] min-w-[300px] sticky'>

                    <h1 className='text-lg'>New Age Concentrations</h1>

                    <div className=' p-4 rounded-md lg:w-[370px] w-full'>
                        <p className='p-1 rounded-full pl-3 text-sm w-[250px] bg-[#9747FF]  font-bold'>CORE TOPICS</p>
                        <div className='my-6 flex flex-col gap-y-1'>
                            <div className='flex flex-row items-start gap-1'>
                                <span><PlayArrowRoundedIcon sx={{ color: '#FFFFFF' }} /></span>
                                <span className='text-sm font-light'>What is Innovation and Product Development</span>
                            </div>
                            <div className='flex flex-row items-start gap-1'>
                                <span><PlayArrowRoundedIcon sx={{ color: '#FFFFFF' }} /></span>
                                <span className='text-sm font-light'>Finding the Right ideas and problem Solving</span>
                            </div>
                            <div className='flex flex-row items-start gap-1'>
                                <span><PlayArrowRoundedIcon sx={{ color: '#FFFFFF' }} /></span>
                                <span className='text-sm font-light'>Design Thinking and impact Measurement</span>
                            </div>
                            <div className='flex flex-row items-start gap-1'>
                                <span><PlayArrowRoundedIcon sx={{ color: '#FFFFFF' }} /></span>
                                <span className='text-sm font-light'>Technology 101 and Engineering</span>
                            </div>
                            <div className='flex flex-row items-start gap-1'>
                                <span><PlayArrowRoundedIcon sx={{ color: '#FFFFFF' }} /></span>
                                <span className='text-sm font-light'>Understanding Audiences, Case studies & Strategies</span>
                            </div>
                            <div className='flex flex-row items-start lg:ml-8 gap-1'>
                                {/*                                 <span><PlayArrowRoundedIcon sx={{ color: '#FFFFFF' }} /></span>
 */}                                <span className='text-sm font-light'>And Many More...</span>
                            </div>
                        </div>
                        <p className='p-1 rounded-full pl-3 text-sm w-[250px] bg-[#9747FF]  font-bold'>SKILL CONCENTRATIONS</p>
                        <div className='my-6 flex flex-col gap-y-1'>
                            <div className='flex flex-row items-start gap-1'>
                                <span><PlayArrowRoundedIcon sx={{ color: '#FFFFFF' }} /></span>
                                <span className='text-sm font-light'>Critical Thinking</span>
                            </div>
                            <div className='flex flex-row items-start gap-1'>
                                <span><PlayArrowRoundedIcon sx={{ color: '#FFFFFF' }} /></span>
                                <span className='text-sm font-light'>Tech mindset</span>
                            </div>
                            <div className='flex flex-row items-start gap-1'>
                                <span><PlayArrowRoundedIcon sx={{ color: '#FFFFFF' }} /></span>
                                <span className='text-sm font-light'>Communications</span>
                            </div>
                            <div className='flex flex-row items-start gap-1'>
                                <span><PlayArrowRoundedIcon sx={{ color: '#FFFFFF' }} /></span>
                                <span className='text-sm font-light'>Analytics</span>
                            </div>

                            <div className='flex flex-row items-start lg:ml-8 gap-1'>
                                {/*                                 <span><PlayArrowRoundedIcon sx={{ color: '#FFFFFF' }} /></span>
 */}                                <span className='text-sm font-light'>And Many More...</span>
                            </div>
                        </div>
                        <p className='p-1 rounded-full pl-3 text-sm w-[250px] bg-[#9747FF]  font-bold'>EXPLORE CAREERS IN</p>
                        <div className='mt-6 flex flex-col gap-y-1'>
                            <div className='flex flex-row items-start gap-1'>
                                <span><PlayArrowRoundedIcon sx={{ color: '#FFFFFF' }} /></span>
                                <span className='text-sm font-light'>Product Management</span>
                            </div>
                            <div className='flex flex-row items-start gap-1'>
                                <span><PlayArrowRoundedIcon sx={{ color: '#FFFFFF' }} /></span>
                                <span className='text-sm font-light'>Consuliting</span>
                            </div>
                            <div className='flex flex-row items-start gap-1'>
                                <span><PlayArrowRoundedIcon sx={{ color: '#FFFFFF' }} /></span>
                                <span className='text-sm font-light'>Design</span>
                            </div>
                            <div className='flex flex-row items-start gap-1'>
                                <span><PlayArrowRoundedIcon sx={{ color: '#FFFFFF' }} /></span>
                                <span className='text-sm font-light'>Engineering</span>
                            </div>
                            <div className='flex flex-row items-start gap-1'>
                                <span><PlayArrowRoundedIcon sx={{ color: '#FFFFFF' }} /></span>
                                <span className='text-sm font-light'>Research</span>
                            </div>
                            <div className='flex flex-row items-start lg:ml-8 gap-1'>
                                {/*                                 <span><PlayArrowRoundedIcon sx={{ color: '#FFFFFF' }} /></span>
 */}                                <span className='text-sm font-light'>And Many More...</span>
                            </div>
                        </div>
                    </div>

                </div>

                <div className='flex lg:hidden flex-col gap-5 w-full'>

                    <h1 className='text-lg'>New Age Concentrations</h1>

                    <div className=' p-4 rounded-md lg:w-[370px] w-full'>
                        <p className='p-1 rounded-full pl-3 text-sm w-[250px] bg-[#9747FF]  font-bold'>CORE TOPICS</p>
                        <div className='my-6 flex flex-col gap-y-1'>
                            <div className='flex flex-row items-start gap-1'>
                                <span><PlayArrowRoundedIcon sx={{ color: '#FFFFFF' }} /></span>
                                <span className='text-sm font-light'>What is Innovation and Product Development</span>
                            </div>
                            <div className='flex flex-row items-start gap-1'>
                                <span><PlayArrowRoundedIcon sx={{ color: '#FFFFFF' }} /></span>
                                <span className='text-sm font-light'>Finding the Right ideas and problem Solving</span>
                            </div>
                            <div className='flex flex-row items-start gap-1'>
                                <span><PlayArrowRoundedIcon sx={{ color: '#FFFFFF' }} /></span>
                                <span className='text-sm font-light'>Design Thinking and impact Measurement</span>
                            </div>
                            <div className='flex flex-row items-start gap-1'>
                                <span><PlayArrowRoundedIcon sx={{ color: '#FFFFFF' }} /></span>
                                <span className='text-sm font-light'>Technology 101 and Engineering</span>
                            </div>
                            <div className='flex flex-row items-start gap-1'>
                                <span><PlayArrowRoundedIcon sx={{ color: '#FFFFFF' }} /></span>
                                <span className='text-sm font-light'>Understanding Audiences, Case studies & Strategies</span>
                            </div>
                            <div className='flex flex-row items-start lg:ml-8 gap-1'>
                                {/*                                 <span><PlayArrowRoundedIcon sx={{ color: '#FFFFFF' }} /></span>
 */}                                <span className='text-sm font-light'>And Many More...</span>
                            </div>
                        </div>
                        <p className='p-1 rounded-full pl-3 text-sm w-[250px] bg-[#9747FF]  font-bold'>SKILL CONCENTRATIONS</p>
                        <div className='my-6 flex flex-col gap-y-1'>
                            <div className='flex flex-row items-start gap-1'>
                                <span><PlayArrowRoundedIcon sx={{ color: '#FFFFFF' }} /></span>
                                <span className='text-sm font-light'>Critical Thinking</span>
                            </div>
                            <div className='flex flex-row items-start gap-1'>
                                <span><PlayArrowRoundedIcon sx={{ color: '#FFFFFF' }} /></span>
                                <span className='text-sm font-light'>Tech mindset</span>
                            </div>
                            <div className='flex flex-row items-start gap-1'>
                                <span><PlayArrowRoundedIcon sx={{ color: '#FFFFFF' }} /></span>
                                <span className='text-sm font-light'>Communications</span>
                            </div>
                            <div className='flex flex-row items-start gap-1'>
                                <span><PlayArrowRoundedIcon sx={{ color: '#FFFFFF' }} /></span>
                                <span className='text-sm font-light'>Analytics</span>
                            </div>

                            <div className='flex flex-row items-start lg:ml-8 gap-1'>
                                {/*                                 <span><PlayArrowRoundedIcon sx={{ color: '#FFFFFF' }} /></span>
 */}                                <span className='text-sm font-light'>And Many More...</span>
                            </div>
                        </div>
                        <p className='p-1 rounded-full pl-3 text-sm w-[250px] bg-[#9747FF]  font-bold'>EXPLORE CAREERS IN</p>
                        <div className='mt-6 flex flex-col gap-y-1'>
                            <div className='flex flex-row items-start gap-1'>
                                <span><PlayArrowRoundedIcon sx={{ color: '#FFFFFF' }} /></span>
                                <span className='text-sm font-light'>Product Management</span>
                            </div>
                            <div className='flex flex-row items-start gap-1'>
                                <span><PlayArrowRoundedIcon sx={{ color: '#FFFFFF' }} /></span>
                                <span className='text-sm font-light'>Consuliting</span>
                            </div>
                            <div className='flex flex-row items-start gap-1'>
                                <span><PlayArrowRoundedIcon sx={{ color: '#FFFFFF' }} /></span>
                                <span className='text-sm font-light'>Design</span>
                            </div>
                            <div className='flex flex-row items-start gap-1'>
                                <span><PlayArrowRoundedIcon sx={{ color: '#FFFFFF' }} /></span>
                                <span className='text-sm font-light'>Engineering</span>
                            </div>
                            <div className='flex flex-row items-start gap-1'>
                                <span><PlayArrowRoundedIcon sx={{ color: '#FFFFFF' }} /></span>
                                <span className='text-sm font-light'>Research</span>
                            </div>
                            <div className='flex flex-row items-start lg:ml-8 gap-1'>
                                {/*                                 <span><PlayArrowRoundedIcon sx={{ color: '#FFFFFF' }} /></span>
 */}                                <span className='text-sm font-light'>And Many More...</span>
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
                            iconStyle={{ color: '#397EFB', backgroundColor: '#94A4FF' }}
                            contentStyle={{ background: '#141414', minWidth: '500px', maxWidth: '600px', width: '100%' }}
                            contentArrowStyle={{ background: '#141414' }}

                        >

                            <div className='w-full'>
                                <div className="space-y-4 text-white w-full">

                                    <span className='font-bold text-white mb-4 text-xl'>
                                        Week 1
                                    </span>

                                    <details className="w-full border rounded-2xl">
                                        <summary className="px-4 py-6 focus:outline-none focus-visible:ring-cyan-600">Introduction - Why this lab?</summary>
                                        <p className="px-4 py-6 pt-0 ml-4 -mt-4">Unlock your next milestone with our Develop product sense and gain Practical skills for success in the real world</p>
                                    </details>
                                    {/* <details className="w-full border rounded-lg">
                                        <summary className="px-4 py-6 focus:outline-none focus-visible:ring-cyan-600"><span className='bg-custom-blue p-1 font-bold mr-2 rounded-md bg-opacity-60'>In Class</span>
                                            Core and Skill Concentrations</summary>
                                        <p className="px-4 py-6 pt-0 ml-4 -mt-4">Tincidunt ut hac condimentum rhoncus phasellus nostra. Magna porttitor egestas tincidunt neque vehicula potenti. </p>
                                    </details> */}
                                </div>
                            </div>


                        </VerticalTimelineElement>

                        <VerticalTimelineElement
                            className="vertical-timeline-element--work"
                            iconStyle={{ color: '#397EFB', backgroundColor: '#94A4FF' }}
                            contentStyle={{ background: '#141414', minWidth: '500px', maxWidth: '600px', width: '100%' }}
                            contentArrowStyle={{ background: '#141414' }}

                        >

                            <div className='w-full'>
                                <div className="space-y-4 text-white w-full">

                                    <span className='font-bold text-white mb-4 text-xl'>
                                        Week 2
                                    </span>

                                    <details className="w-full border rounded-lg">
                                        <summary className="px-4 py-6 focus:outline-none focus-visible:ring-cyan-600">Approach to Problem Identification</summary>
                                        <p className="px-4 py-6 pt-0 ml-4 -mt-4">Unlocking Solutions through Empathy: Our approach to problem identification involves deep empathy, validating challenges, and understanding diverse perspectives. </p>
                                    </details>
                                    {/* <details className="w-full border rounded-lg">
                                        <summary className="px-4 py-6 focus:outline-none focus-visible:ring-cyan-600"><span className='bg-custom-blue p-1 font-bold mr-2 rounded-md bg-opacity-60'>In Class</span>
                                            Core and Skill Concentrations</summary>
                                        <p className="px-4 py-6 pt-0 ml-4 -mt-4">Tincidunt ut hac condimentum rhoncus phasellus nostra. Magna porttitor egestas tincidunt neque vehicula potenti. </p>
                                    </details> */}
                                </div>
                            </div>


                        </VerticalTimelineElement>

                        <VerticalTimelineElement
                            className="vertical-timeline-element--work"
                            iconStyle={{ color: '#397EFB', backgroundColor: '#94A4FF' }}
                            contentStyle={{ background: '#141414', minWidth: '500px', maxWidth: '600px', width: '100%' }}
                            contentArrowStyle={{ background: '#141414' }}

                        >

                            <div className='w-full'>
                                <div className="space-y-4 text-white w-full">

                                    <span className='font-bold text-white mb-4 text-xl'>
                                        Week 3
                                    </span>

                                    <details className="w-full border rounded-lg">
                                        <summary className="px-4 py-6 focus:outline-none focus-visible:ring-cyan-600">Problem Validation - Discovery</summary>
                                        <p className="px-4 py-6 pt-0 ml-4 -mt-4">Eliminate doubts, validate ideas, and embrace acceptance on your educational journey. </p>
                                    </details>
                                    {/*  <details className="w-full border rounded-lg">
                                        <summary className="px-4 py-6 focus:outline-none focus-visible:ring-cyan-600"><span className='bg-custom-blue p-1 font-bold mr-2 rounded-md bg-opacity-60'>In Class</span>
                                            VIP Challenge</summary>
                                        <p className="px-4 py-6 pt-0 ml-4 -mt-4">Tincidunt ut hac condimentum rhoncus phasellus nostra. Magna porttitor egestas tincidunt neque vehicula potenti. </p>
                                    </details> */}
                                </div>
                            </div>


                        </VerticalTimelineElement>

                        <VerticalTimelineElement
                            className="vertical-timeline-element--work"
                            iconStyle={{ color: '#397EFB', backgroundColor: '#94A4FF' }}
                            contentStyle={{ background: '#141414', minWidth: '500px', maxWidth: '600px', width: '100%' }}
                            contentArrowStyle={{ background: '#141414' }}

                        >

                            <div className='w-full'>
                                <div className="space-y-4 text-white w-full">

                                    <span className='font-bold text-white mb-4 text-xl'>
                                        Week 4
                                    </span>

                                    <details className="w-full border rounded-lg">
                                        <summary className="px-4 py-6 focus:outline-none focus-visible:ring-cyan-600">Problem Solving</summary>
                                        <p className="px-4 py-6 pt-0 ml-4 -mt-4"> Enhance critical thinking skills and practical implementation through our problem-solving courses. Gain the ability to analyze complex issues and solutions for real-world challenges</p>
                                    </details>
                                    {/*  <details className="w-full border rounded-lg">
                                        <summary className="px-4 py-6 focus:outline-none focus-visible:ring-cyan-600"><span className='bg-custom-blue p-1 font-bold mr-2 rounded-md bg-opacity-60'>In Class</span>
                                            VIP Challenge</summary>
                                        <p className="px-4 py-6 pt-0 ml-4 -mt-4">Tincidunt ut hac condimentum rhoncus phasellus nostra. Magna porttitor egestas tincidunt neque vehicula potenti. </p>
                                    </details> */}
                                </div>
                            </div>


                        </VerticalTimelineElement>

                        <VerticalTimelineElement
                            className="vertical-timeline-element--work"
                            iconStyle={{ color: '#397EFB', backgroundColor: '#94A4FF' }}
                            contentStyle={{ background: '#141414', minWidth: '500px', maxWidth: '600px', width: '100%' }}
                            contentArrowStyle={{ background: '#141414' }}

                        >

                            <div className='w-full'>
                                <div className="space-y-4 text-white w-full">

                                    <span className='font-bold text-white mb-4 text-xl'>
                                        Week 5
                                    </span>

                                    <details className="w-full border rounded-lg">
                                        <summary className="px-4 py-6 focus:outline-none focus-visible:ring-cyan-600">UI/ UX - The design thinking</summary>
                                        <p className="px-4 py-6 pt-0 ml-4 -mt-4">Immerse yourself in the world of UI/UX - The Design Thinking. Gain a fresh perspective and ignite a new vision in user-centric design.</p>
                                    </details>
                                    {/*  <details className="w-full border rounded-lg">
                                        <summary className="px-4 py-6 focus:outline-none focus-visible:ring-cyan-600"><span className='bg-custom-blue p-1 font-bold mr-2 rounded-md bg-opacity-60'>In Class</span>
                                            VIP Challenge</summary>
                                        <p className="px-4 py-6 pt-0 ml-4 -mt-4">Tincidunt ut hac condimentum rhoncus phasellus nostra. Magna porttitor egestas tincidunt neque vehicula potenti. </p>
                                    </details> */}
                                </div>
                            </div>


                        </VerticalTimelineElement>

                        <VerticalTimelineElement
                            className="vertical-timeline-element--work"
                            iconStyle={{ color: '#397EFB', backgroundColor: '#94A4FF' }}
                            contentStyle={{ background: '#141414', minWidth: '500px', maxWidth: '600px', width: '100%' }}
                            contentArrowStyle={{ background: '#141414' }}

                        >

                            <div className='w-full'>
                                <div className="space-y-4 text-white w-full">

                                    <span className='font-bold text-white mb-4 text-xl'>
                                        Week 6
                                    </span>

                                    <details className="w-full border rounded-lg">
                                        <summary className="px-4 py-6 focus:outline-none focus-visible:ring-cyan-600">Impact Measurement</summary>
                                        <p className="px-4 py-6 pt-0 ml-4 -mt-4">Gain insights and perform a reality check with Impact Measurement and Analytics. Evaluate the effectiveness of educational initiatives with data-driven analysis. </p>
                                    </details>
                                    {/*   <details className="w-full border rounded-lg">
                                        <summary className="px-4 py-6 focus:outline-none focus-visible:ring-cyan-600"><span className='bg-custom-blue p-1 font-bold mr-2 rounded-md bg-opacity-60'>In Class</span>
                                            VIP Challenge</summary>
                                        <p className="px-4 py-6 pt-0 ml-4 -mt-4">Tincidunt ut hac condimentum rhoncus phasellus nostra. Magna porttitor egestas tincidunt neque vehicula potenti. </p>
                                    </details> */}
                                </div>
                            </div>


                        </VerticalTimelineElement>

                        <VerticalTimelineElement
                            className="vertical-timeline-element--work"
                            iconStyle={{ color: '#397EFB', backgroundColor: '#94A4FF' }}
                            contentStyle={{ background: '#141414', minWidth: '500px', maxWidth: '600px', width: '100%' }}
                            contentArrowStyle={{ background: '#141414' }}

                        >

                            <div className='w-full'>
                                <div className="space-y-4 text-white w-full">

                                    <span className='font-bold text-white mb-4 text-xl'>
                                        Week 7
                                    </span>

                                    <details className="w-full border rounded-lg">
                                        <summary className="px-4 py-6 focus:outline-none focus-visible:ring-cyan-600">Technology 101 for PMs</summary>
                                        <p className="px-4 py-6 pt-0 ml-4 -mt-4">Develop a tech mindset and thrive in the new era with Technology 101 for PMs. Gain essential knowledge to navigate the intersection of technology and project management. </p>
                                    </details>
                                    {/* <details className="w-full border rounded-lg">
                                        <summary className="px-4 py-6 focus:outline-none focus-visible:ring-cyan-600"><span className='bg-custom-blue p-1 font-bold mr-2 rounded-md bg-opacity-60'>In Class</span>
                                            VIP Challenge</summary>
                                        <p className="px-4 py-6 pt-0 ml-4 -mt-4">Tincidunt ut hac condimentum rhoncus phasellus nostra. Magna porttitor egestas tincidunt neque vehicula potenti. </p>
                                    </details> */}
                                </div>
                            </div>


                        </VerticalTimelineElement>

                        <VerticalTimelineElement
                            className="vertical-timeline-element--work"
                            iconStyle={{ color: '#397EFB', backgroundColor: '#94A4FF' }}
                            contentStyle={{ background: '#141414', minWidth: '500px', maxWidth: '600px', width: '100%' }}
                            contentArrowStyle={{ background: '#141414' }}

                        >

                            <div className='w-full'>
                                <div className="space-y-4 text-white w-full">

                                    <span className='font-bold text-white mb-4 text-xl'>
                                        Week 8
                                    </span>

                                    <details className="w-full border rounded-lg">
                                        <summary className="px-4 py-6 focus:outline-none focus-visible:ring-cyan-600">Product roadmap & execution</summary>
                                        <p className="px-4 py-6 pt-0 ml-4 -mt-4">Navigate your educational journey with Product Roadmap & Execution. Master the art of documentation and build a strategic mindset for success.</p>
                                    </details>
                                    {/* <details className="w-full border rounded-lg">
                                        <summary className="px-4 py-6 focus:outline-none focus-visible:ring-cyan-600"><span className='bg-custom-blue p-1 font-bold mr-2 rounded-md bg-opacity-60'>In Class</span>

                                            One Day Profit Challenge</summary>
                                        <p className="px-4 py-6 pt-0 ml-4 -mt-4">Tincidunt ut hac condimentum rhoncus phasellus nostra. Magna porttitor egestas tincidunt neque vehicula potenti. </p>
                                    </details> */}
                                </div>
                            </div>


                        </VerticalTimelineElement>

                        <VerticalTimelineElement
                            className="vertical-timeline-element--work"
                            iconStyle={{ color: '#397EFB', backgroundColor: '#94A4FF' }}
                            contentStyle={{ background: '#141414', minWidth: '500px', maxWidth: '600px', width: '100%' }}
                            contentArrowStyle={{ background: '#141414' }}

                        >

                            <div className='w-full'>
                                <div className="space-y-4 text-white w-full">

                                    <span className='font-bold text-white mb-4 text-xl'>
                                        Week 9
                                    </span>

                                    <details className="w-full border rounded-lg">
                                        <summary className="px-4 py-6 focus:outline-none focus-visible:ring-cyan-600">Getting your first customers -Acquisition</summary>
                                        <p className="px-4 py-6 pt-0 ml-4 -mt-4">Master the art of acquiring your first customers through networking, learning, and unlearning. Build a strong customer base and propel your business forward.</p>
                                    </details>
                                    {/* <details className="w-full border rounded-lg">
                                        <summary className="px-4 py-6 focus:outline-none focus-visible:ring-cyan-600"><span className='bg-custom-blue p-1 font-bold mr-2 rounded-md bg-opacity-60'>In Class</span>

                                            One Day Profit Challenge</summary>
                                        <p className="px-4 py-6 pt-0 ml-4 -mt-4">Tincidunt ut hac condimentum rhoncus phasellus nostra. Magna porttitor egestas tincidunt neque vehicula potenti. </p>
                                    </details> */}
                                </div>
                            </div>


                        </VerticalTimelineElement>
                        <VerticalTimelineElement
                            className="vertical-timeline-element--work"
                            iconStyle={{ color: '#397EFB', backgroundColor: '#94A4FF' }}
                            contentStyle={{ background: '#141414', minWidth: '500px', maxWidth: '600px', width: '100%' }}
                            contentArrowStyle={{ background: '#141414' }}

                        >

                            <div className='w-full'>
                                <div className="space-y-4 text-white w-full">

                                    <span className='font-bold text-white mb-4 text-xl'>
                                        Week 10
                                    </span>

                                    <details className="w-full border rounded-lg">
                                        <summary className="px-4 py-6 focus:outline-none focus-visible:ring-cyan-600">Case studies & Analysis</summary>
                                        <p className="px-4 py-6 pt-0 ml-4 -mt-4">Explore the world of Case Studies & Analysis for insightful learning, net practice, and unlearning and relearning methodologies</p>
                                    </details>
                                    {/* <details className="w-full border rounded-lg">
                                        <summary className="px-4 py-6 focus:outline-none focus-visible:ring-cyan-600"><span className='bg-custom-blue p-1 font-bold mr-2 rounded-md bg-opacity-60'>In Class</span>

                                            One Day Profit Challenge</summary>
                                        <p className="px-4 py-6 pt-0 ml-4 -mt-4">Tincidunt ut hac condimentum rhoncus phasellus nostra. Magna porttitor egestas tincidunt neque vehicula potenti. </p>
                                    </details> */}
                                </div>
                            </div>


                        </VerticalTimelineElement>
                        <VerticalTimelineElement
                            className="vertical-timeline-element--work"
                            iconStyle={{ color: '#397EFB', backgroundColor: '#94A4FF' }}
                            contentStyle={{ background: '#141414', minWidth: '500px', maxWidth: '600px', width: '100%' }}
                            contentArrowStyle={{ background: '#141414' }}

                        >

                            <div className='w-full'>
                                <div className="space-y-4 text-white w-full">

                                    <span className='font-bold text-white mb-4 text-xl'>
                                        Week 11
                                    </span>

                                    <details className="w-full border rounded-lg">
                                        <summary className="px-4 py-6 focus:outline-none focus-visible:ring-cyan-600">Product Interviews/ Strategies</summary>
                                        <p className="px-4 py-6 pt-0 ml-4 -mt-4">Master Product Interviews and Strategies through effective communication and hands-on practice. Boost your skills and excel in the competitive market</p>
                                    </details>
                                    {/* <details className="w-full border rounded-lg">
                                        <summary className="px-4 py-6 focus:outline-none focus-visible:ring-cyan-600"><span className='bg-custom-blue p-1 font-bold mr-2 rounded-md bg-opacity-60'>In Class</span>

                                            One Day Profit Challenge</summary>
                                        <p className="px-4 py-6 pt-0 ml-4 -mt-4">Tincidunt ut hac condimentum rhoncus phasellus nostra. Magna porttitor egestas tincidunt neque vehicula potenti. </p>
                                    </details> */}
                                </div>
                            </div>


                        </VerticalTimelineElement>
                        <VerticalTimelineElement
                            className="vertical-timeline-element--work"
                            iconStyle={{ color: '#397EFB', backgroundColor: '#94A4FF' }}
                            contentStyle={{ background: '#141414', minWidth: '500px', maxWidth: '600px', width: '100%' }}
                            contentArrowStyle={{ background: '#141414' }}

                        >

                            <div className='w-full'>
                                <div className="space-y-4 text-white w-full">

                                    <span className='font-bold text-white mb-4 text-xl'>
                                        Week 12
                                    </span>

                                    <details className="w-full border rounded-lg">
                                        <summary className="px-4 py-6 focus:outline-none focus-visible:ring-cyan-600">Demo Day</summary>
                                        <p className="px-4 py-6 pt-0 ml-4 -mt-4">Master Product Interviews and Strategies through effective communication and hands-on practice. Boost your skills and excel in the competitive market</p>
                                    </details>
                                    {/* <details className="w-full border rounded-lg">
                                        <summary className="px-4 py-6 focus:outline-none focus-visible:ring-cyan-600"><span className='bg-custom-blue p-1 font-bold mr-2 rounded-md bg-opacity-60'>In Class</span>

                                            One Day Profit Challenge</summary>
                                        <p className="px-4 py-6 pt-0 ml-4 -mt-4">Tincidunt ut hac condimentum rhoncus phasellus nostra. Magna porttitor egestas tincidunt neque vehicula potenti. </p>
                                    </details> */}
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

                                    <details className="w-full border rounded-2xl">
                                        <summary className="px-4 py-6 focus:outline-none focus-visible:ring-cyan-600">Introduction - Why this lab?</summary>
                                        <p className="px-4 py-6 pt-0 ml-4 -mt-4">Unlock your next milestone with our Develop product sense and gain Practical skills for success in the real world</p>
                                    </details>
                                    {/* <details className="w-full border rounded-lg">
                                        <summary className="px-4 py-6 focus:outline-none focus-visible:ring-cyan-600"><span className='bg-custom-blue p-1 font-bold mr-2 rounded-md bg-opacity-60'>In Class</span>
                                            Core and Skill Concentrations</summary>
                                        <p className="px-4 py-6 pt-0 ml-4 -mt-4">Tincidunt ut hac condimentum rhoncus phasellus nostra. Magna porttitor egestas tincidunt neque vehicula potenti. </p>
                                    </details> */}
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
                                        <summary className="px-4 py-6 focus:outline-none focus-visible:ring-cyan-600">Approach to Problem Identification</summary>
                                        <p className="px-4 py-6 pt-0 ml-4 -mt-4">Unlocking Solutions through Empathy: Our approach to problem identification involves deep empathy, validating challenges, and understanding diverse perspectives. </p>
                                    </details>
                                    {/* <details className="w-full border rounded-lg">
                                        <summary className="px-4 py-6 focus:outline-none focus-visible:ring-cyan-600"><span className='bg-custom-blue p-1 font-bold mr-2 rounded-md bg-opacity-60'>In Class</span>
                                            Core and Skill Concentrations</summary>
                                        <p className="px-4 py-6 pt-0 ml-4 -mt-4">Tincidunt ut hac condimentum rhoncus phasellus nostra. Magna porttitor egestas tincidunt neque vehicula potenti. </p>
                                    </details> */}
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
                                        <summary className="px-4 py-6 focus:outline-none focus-visible:ring-cyan-600">Problem Validation - Discovery</summary>
                                        <p className="px-4 py-6 pt-0 ml-4 -mt-4">Eliminate doubts, validate ideas, and embrace acceptance on your educational journey.</p>
                                    </details>
                                    {/*  <details className="w-full border rounded-lg">
                                        <summary className="px-4 py-6 focus:outline-none focus-visible:ring-cyan-600"><span className='bg-custom-blue p-1 font-bold mr-2 rounded-md bg-opacity-60'>In Class</span>
                                            VIP Challenge</summary>
                                        <p className="px-4 py-6 pt-0 ml-4 -mt-4">Tincidunt ut hac condimentum rhoncus phasellus nostra. Magna porttitor egestas tincidunt neque vehicula potenti. </p>
                                    </details> */}
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
                                        <summary className="px-4 py-6 focus:outline-none focus-visible:ring-cyan-600">Problem Solving</summary>
                                        <p className="px-4 py-6 pt-0 ml-4 -mt-4">Enhance critical thinking skills and practical implementation through our problem-solving courses. Gain the ability to analyze complex issues and solutions for real-world challenges </p>
                                    </details>
                                    {/*  <details className="w-full border rounded-lg">
                                        <summary className="px-4 py-6 focus:outline-none focus-visible:ring-cyan-600"><span className='bg-custom-blue p-1 font-bold mr-2 rounded-md bg-opacity-60'>In Class</span>
                                            VIP Challenge</summary>
                                        <p className="px-4 py-6 pt-0 ml-4 -mt-4">Tincidunt ut hac condimentum rhoncus phasellus nostra. Magna porttitor egestas tincidunt neque vehicula potenti. </p>
                                    </details> */}
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
                                        <summary className="px-4 py-6 focus:outline-none focus-visible:ring-cyan-600">UI/ UX - The design thinking</summary>
                                        <p className="px-4 py-6 pt-0 ml-4 -mt-4">Lectus iaculis orci metus vitae ligula dictum per. Nisl per nullam taciti at adipiscing est. </p>
                                    </details>
                                    {/*  <details className="w-full border rounded-lg">
                                        <summary className="px-4 py-6 focus:outline-none focus-visible:ring-cyan-600"><span className='bg-custom-blue p-1 font-bold mr-2 rounded-md bg-opacity-60'>In Class</span>
                                            VIP Challenge</summary>
                                        <p className="px-4 py-6 pt-0 ml-4 -mt-4">Tincidunt ut hac condimentum rhoncus phasellus nostra. Magna porttitor egestas tincidunt neque vehicula potenti. </p>
                                    </details> */}
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
                                        <summary className="px-4 py-6 focus:outline-none focus-visible:ring-cyan-600">Impact Measurement</summary>
                                        <p className="px-4 py-6 pt-0 ml-4 -mt-4">Gain insights and perform a reality check with Impact Measurement and Analytics. Evaluate the effectiveness of educational initiatives with data-driven analysis.</p>
                                    </details>
                                    {/*   <details className="w-full border rounded-lg">
                                        <summary className="px-4 py-6 focus:outline-none focus-visible:ring-cyan-600"><span className='bg-custom-blue p-1 font-bold mr-2 rounded-md bg-opacity-60'>In Class</span>
                                            VIP Challenge</summary>
                                        <p className="px-4 py-6 pt-0 ml-4 -mt-4">Tincidunt ut hac condimentum rhoncus phasellus nostra. Magna porttitor egestas tincidunt neque vehicula potenti. </p>
                                    </details> */}
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
                                        <summary className="px-4 py-6 focus:outline-none focus-visible:ring-cyan-600">Technology 101 for PMs</summary>
                                        <p className="px-4 py-6 pt-0 ml-4 -mt-4">Develop a tech mindset and thrive in the new era with Technology 101 for PMs. Gain essential knowledge to navigate the intersection of technology and project management. </p>
                                    </details>
                                    {/* <details className="w-full border rounded-lg">
                                        <summary className="px-4 py-6 focus:outline-none focus-visible:ring-cyan-600"><span className='bg-custom-blue p-1 font-bold mr-2 rounded-md bg-opacity-60'>In Class</span>
                                            VIP Challenge</summary>
                                        <p className="px-4 py-6 pt-0 ml-4 -mt-4">Tincidunt ut hac condimentum rhoncus phasellus nostra. Magna porttitor egestas tincidunt neque vehicula potenti. </p>
                                    </details> */}
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
                                        <summary className="px-4 py-6 focus:outline-none focus-visible:ring-cyan-600">Product roadmap & execution</summary>
                                        <p className="px-4 py-6 pt-0 ml-4 -mt-4">Navigate your educational journey with Product Roadmap & Execution. Master the art of documentation and build a strategic mindset for success.</p>
                                    </details>
                                    {/* <details className="w-full border rounded-lg">
                                        <summary className="px-4 py-6 focus:outline-none focus-visible:ring-cyan-600"><span className='bg-custom-blue p-1 font-bold mr-2 rounded-md bg-opacity-60'>In Class</span>

                                            One Day Profit Challenge</summary>
                                        <p className="px-4 py-6 pt-0 ml-4 -mt-4">Tincidunt ut hac condimentum rhoncus phasellus nostra. Magna porttitor egestas tincidunt neque vehicula potenti. </p>
                                    </details> */}
                                </div>
                            </div>


                        </div>
                        <div

                            className='mb-10 w-full'
                        >

                            <div className='w-full'>
                                <div className="space-y-4 text-white w-full">

                                    <span className='font-bold text-white mb-4 text-xl'>
                                        Week 9
                                    </span>

                                    <details className="w-full border rounded-lg">
                                        <summary className="px-4 py-6 focus:outline-none focus-visible:ring-cyan-600">Getting your first customers -Acquisition</summary>
                                        <p className="px-4 py-6 pt-0 ml-4 -mt-4">Master the art of acquiring your first customers through networking, learning, and unlearning. Build a strong customer base and propel your business forward.</p>
                                    </details>
                                    {/* <details className="w-full border rounded-lg">
                                        <summary className="px-4 py-6 focus:outline-none focus-visible:ring-cyan-600"><span className='bg-custom-blue p-1 font-bold mr-2 rounded-md bg-opacity-60'>In Class</span>

                                            One Day Profit Challenge</summary>
                                        <p className="px-4 py-6 pt-0 ml-4 -mt-4">Tincidunt ut hac condimentum rhoncus phasellus nostra. Magna porttitor egestas tincidunt neque vehicula potenti. </p>
                                    </details> */}
                                </div>
                            </div>


                        </div>
                        <div

                            className='mb-10 w-full'
                        >

                            <div className='w-full'>
                                <div className="space-y-4 text-white w-full">

                                    <span className='font-bold text-white mb-4 text-xl'>
                                        Week 10
                                    </span>

                                    <details className="w-full border rounded-lg">
                                        <summary className="px-4 py-6 focus:outline-none focus-visible:ring-cyan-600">Case studies & Analysis</summary>
                                        <p className="px-4 py-6 pt-0 ml-4 -mt-4">Explore the world of Case Studies & Analysis for insightful learning, net practice, and unlearning and relearning methodologies</p>
                                    </details>
                                    {/* <details className="w-full border rounded-lg">
                                        <summary className="px-4 py-6 focus:outline-none focus-visible:ring-cyan-600"><span className='bg-custom-blue p-1 font-bold mr-2 rounded-md bg-opacity-60'>In Class</span>

                                            One Day Profit Challenge</summary>
                                        <p className="px-4 py-6 pt-0 ml-4 -mt-4">Tincidunt ut hac condimentum rhoncus phasellus nostra. Magna porttitor egestas tincidunt neque vehicula potenti. </p>
                                    </details> */}
                                </div>
                            </div>


                        </div>
                        <div

                            className='mb-10 w-full'
                        >

                            <div className='w-full'>
                                <div className="space-y-4 text-white w-full">

                                    <span className='font-bold text-white mb-4 text-xl'>
                                        Week 11
                                    </span>

                                    <details className="w-full border rounded-lg">
                                        <summary className="px-4 py-6 focus:outline-none focus-visible:ring-cyan-600">Product Interviews/ Strategies</summary>
                                        <p className="px-4 py-6 pt-0 ml-4 -mt-4">Master Product Interviews and Strategies through effective communication and hands-on practice. Boost your skills and excel in the competitive market</p>
                                    </details>
                                    {/* <details className="w-full border rounded-lg">
                                        <summary className="px-4 py-6 focus:outline-none focus-visible:ring-cyan-600"><span className='bg-custom-blue p-1 font-bold mr-2 rounded-md bg-opacity-60'>In Class</span>

                                            One Day Profit Challenge</summary>
                                        <p className="px-4 py-6 pt-0 ml-4 -mt-4">Tincidunt ut hac condimentum rhoncus phasellus nostra. Magna porttitor egestas tincidunt neque vehicula potenti. </p>
                                    </details> */}
                                </div>
                            </div>
                            <div className='w-full'>
                                <div className="space-y-4 text-white w-full">

                                    <span className='font-bold text-white mb-4 text-xl'>
                                        Week 12
                                    </span>

                                    <details className="w-full border rounded-lg">
                                        <summary className="px-4 py-6 focus:outline-none focus-visible:ring-cyan-600">Demo Day</summary>
                                        <p className="px-4 py-6 pt-0 ml-4 -mt-4">Master Product Interviews and Strategies through effective communication and hands-on practice. Boost your skills and excel in the competitive market</p>
                                    </details>
                                    {/* <details className="w-full border rounded-lg">
                                        <summary className="px-4 py-6 focus:outline-none focus-visible:ring-cyan-600"><span className='bg-custom-blue p-1 font-bold mr-2 rounded-md bg-opacity-60'>In Class</span>

                                            One Day Profit Challenge</summary>
                                        <p className="px-4 py-6 pt-0 ml-4 -mt-4">Tincidunt ut hac condimentum rhoncus phasellus nostra. Magna porttitor egestas tincidunt neque vehicula potenti. </p>
                                    </details> */}
                                </div>
                            </div>


                        </div>

                    </div>
                </div>


            </div>

            <HearStraight></HearStraight>
        </div>
    );
};

export default DualManagement;