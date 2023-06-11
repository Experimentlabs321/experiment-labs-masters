import React, { useRef } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import OutboundOutlinedIcon from '@mui/icons-material/OutboundOutlined';
import { Button } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import './style.css';
import { Link } from 'react-router-dom';
import meetImg from '../../../assets/people-meeting-seminar-office-concept 1 (1).png';

const ExperienceUnion = () => {

    const containerRef = useRef(null);

    function handleScrollLeft() {
        containerRef.current.scrollLeft -= 300; // scroll left by 100 pixels
    }

    function handleScrollRight() {
        containerRef.current.scrollLeft += 300; // scroll right by 100 pixels
    }

    return (
        <div className='pb-20 mt-44 pt-[130px] px-10 lg:px-28' style={{ background: 'linear-gradient(180deg, #101010 0%, rgba(0, 0, 0, 0.6096) 100%), rgba(0, 64, 148, 0.45)' }}>
            <div className='flex flex-col gap-10 items-start'>
                <div>
                    <h1 className='text-2xl xl:text-4xl font-semibold'><span>Experience the Labs</span></h1>
                </div>
                <div className="carousel-button-group">
                    <div className='flex gap-7'>
                        <button onClick={handleScrollLeft} className='hidden lg:block' type="button">
                            <ArrowBackIosNewIcon sx={{ fontSize: '28px', color: '#141414', borderRadius: '50%', ":hover": { color: "#397FEB" }, background: '#94A4FF', height: '40px', width: '40px', padding: '5px' }} />
                        </button>


                        <div
                            ref={containerRef}
                            className='overflow-x-scroll scroll-smooth gap-8 eu-container pb-10 lg:w-[75vw] hidden lg:flex'
                        >
                            <div style={{
                                border: '5px solid #94A4FF'
                            }} className='bg-transparent lg:min-w-[360px] min-w-[290px] max-w-[290px] lg:max-w-[360px] rounded-3xl p-5'>
                                <img
                                    style={{
                                        borderRight: "5px solid #6278FF",
                                        borderBottom: "5px solid #6278FF",
                                    }}
                                    className='w-full rounded-3xl h-[200px] object-cover'
                                    src={meetImg}
                                    alt=''
                                />
                                <div className='mt-3'>
                                    <h4 className='font-extrabold font text-xl'>Experiment Labs Summer
                                        Startup Week</h4>
                                    <div className='text-xs font-bold my-5 flex gap-8'>
                                        <span className='text-purple font-bold text-xs'>5th jun 2023 - 11th jun 2023</span>
                                        <span className='text-purple font-bold text-xs'>Offline</span>
                                    </div>
                                    <p className='text-sm font-thin mt-2 mb-6'>Join the 7-day saga to experience a
                                        jam ek full of workshops, mentorship
                                        hours, panel discussion etc.
                                    </p>
                                    <Link className="flex justify-center" to='/experience-union'><button className='bg-blue hover:bg-purple text-white rounded-3xl w-1/2 mx-auto py-2'>Register Now</button></Link>
                                </div>
                            </div>
                            <div style={{
                                border: '5px solid #94A4FF'
                            }} className='bg-transparent lg:min-w-[360px] min-w-[290px] max-w-[290px] lg:max-w-[360px] rounded-3xl p-5'>
                                <img
                                    style={{
                                        borderRight: "5px solid #6278FF",
                                        borderBottom: "5px solid #6278FF",
                                    }}
                                    className='w-full rounded-3xl h-[200px] object-cover'
                                    src={meetImg}
                                    alt=''
                                />
                                <div className='mt-3'>
                                    <h4 className='font-extrabold font text-xl'>Experiment Labs Summer
                                        Startup Week</h4>
                                    <div className='text-xs font-bold my-5 flex gap-8'>
                                        <span className='text-purple font-bold text-xs'>5th jun 2023 - 11th jun 2023</span>
                                        <span className='text-purple font-bold text-xs'>Offline</span>
                                    </div>
                                    <p className='text-sm font-thin mt-2 mb-6'>Join the 7-day saga to experience a
                                        jam ek full of workshops, mentorship
                                        hours, panel discussion etc.
                                    </p>
                                    <Link className="flex justify-center" to='/experience-union'><button className='bg-blue hover:bg-purple text-white rounded-3xl w-1/2 mx-auto py-2'>Register Now</button></Link>
                                </div>
                            </div>
                            <div style={{
                                border: '5px solid #94A4FF'
                            }} className='bg-transparent lg:min-w-[360px] min-w-[290px] max-w-[290px] lg:max-w-[360px] rounded-3xl p-5'>
                                <img
                                    style={{
                                        borderRight: "5px solid #6278FF",
                                        borderBottom: "5px solid #6278FF",
                                    }}
                                    className='w-full rounded-3xl h-[200px] object-cover'
                                    src={meetImg}
                                    alt=''
                                />
                                <div className='mt-3'>
                                    <h4 className='font-extrabold font text-xl'>Experiment Labs Summer
                                        Startup Week</h4>
                                    <div className='text-xs font-bold my-5 flex gap-8'>
                                        <span className='text-purple font-bold text-xs'>5th jun 2023 - 11th jun 2023</span>
                                        <span className='text-purple font-bold text-xs'>Offline</span>
                                    </div>
                                    <p className='text-sm font-thin mt-2 mb-6'>Join the 7-day saga to experience a
                                        jam ek full of workshops, mentorship
                                        hours, panel discussion etc.
                                    </p>
                                    <Link className="flex justify-center" to='/experience-union'><button className='bg-blue hover:bg-purple text-white rounded-3xl w-1/2 mx-auto py-2'>Register Now</button></Link>
                                </div>
                            </div>
                            <div style={{
                                border: '5px solid #94A4FF'
                            }} className='bg-transparent lg:min-w-[360px] min-w-[290px] max-w-[290px] lg:max-w-[360px] rounded-3xl p-5'>
                                <img
                                    style={{
                                        borderRight: "5px solid #6278FF",
                                        borderBottom: "5px solid #6278FF",
                                    }}
                                    className='w-full rounded-3xl h-[200px] object-cover'
                                    src={meetImg}
                                    alt=''
                                />
                                <div className='mt-3'>
                                    <h4 className='font-extrabold font text-xl'>Experiment Labs Summer
                                        Startup Week</h4>
                                    <div className='text-xs font-bold my-5 flex gap-8'>
                                        <span className='text-purple font-bold text-xs'>5th jun 2023 - 11th jun 2023</span>
                                        <span className='text-purple font-bold text-xs'>Offline</span>
                                    </div>
                                    <p className='text-sm font-thin mt-2 mb-6'>Join the 7-day saga to experience a
                                        jam ek full of workshops, mentorship
                                        hours, panel discussion etc.
                                    </p>
                                    <Link className="flex justify-center" to='/experience-union'><button className='bg-blue hover:bg-purple text-white rounded-3xl w-1/2 mx-auto py-2'>Register Now</button></Link>
                                </div>
                            </div>
                            <div style={{
                                border: '5px solid #94A4FF'
                            }} className='bg-transparent lg:min-w-[360px] min-w-[290px] max-w-[290px] lg:max-w-[360px] rounded-3xl p-5'>
                                <img
                                    style={{
                                        borderRight: "5px solid #6278FF",
                                        borderBottom: "5px solid #6278FF",
                                    }}
                                    className='w-full rounded-3xl h-[200px] object-cover'
                                    src={meetImg}
                                    alt=''
                                />
                                <div className='mt-3'>
                                    <h4 className='font-extrabold font text-xl'>Experiment Labs Summer
                                        Startup Week</h4>
                                    <div className='text-xs font-bold my-5 flex gap-8'>
                                        <span className='text-purple font-bold text-xs'>5th jun 2023 - 11th jun 2023</span>
                                        <span className='text-purple font-bold text-xs'>Offline</span>
                                    </div>
                                    <p className='text-sm font-thin mt-2 mb-6'>Join the 7-day saga to experience a
                                        jam ek full of workshops, mentorship
                                        hours, panel discussion etc.
                                    </p>
                                    <Link className="flex justify-center" to='/experience-union'><button className='bg-blue hover:bg-purple text-white rounded-3xl w-1/2 mx-auto py-2'>Register Now</button></Link>
                                </div>
                            </div>
                            <div style={{
                                border: '5px solid #94A4FF'
                            }} className='bg-transparent lg:min-w-[360px] min-w-[290px] max-w-[290px] lg:max-w-[360px] rounded-3xl p-5'>
                                <img
                                    style={{
                                        borderRight: "5px solid #6278FF",
                                        borderBottom: "5px solid #6278FF",
                                    }}
                                    className='w-full rounded-3xl h-[200px] object-cover'
                                    src={meetImg}
                                    alt=''
                                />
                                <div className='mt-3'>
                                    <h4 className='font-extrabold font text-xl'>Experiment Labs Summer
                                        Startup Week</h4>
                                    <div className='text-xs font-bold my-5 flex gap-8'>
                                        <span className='text-purple font-bold text-xs'>5th jun 2023 - 11th jun 2023</span>
                                        <span className='text-purple font-bold text-xs'>Offline</span>
                                    </div>
                                    <p className='text-sm font-thin mt-2 mb-6'>Join the 7-day saga to experience a
                                        jam ek full of workshops, mentorship
                                        hours, panel discussion etc.
                                    </p>
                                    <Link className="flex justify-center" to='/experience-union'><button className='bg-blue hover:bg-purple text-white rounded-3xl w-1/2 mx-auto py-2'>Register Now</button></Link>
                                </div>
                            </div>
                            <div style={{
                                border: '5px solid #94A4FF'
                            }} className='bg-transparent lg:min-w-[360px] min-w-[290px] max-w-[290px] lg:max-w-[360px] rounded-3xl p-5'>
                                <img
                                    style={{
                                        borderRight: "5px solid #6278FF",
                                        borderBottom: "5px solid #6278FF",
                                    }}
                                    className='w-full rounded-3xl h-[200px] object-cover'
                                    src={meetImg}
                                    alt=''
                                />
                                <div className='mt-3'>
                                    <h4 className='font-extrabold font text-xl'>Experiment Labs Summer
                                        Startup Week</h4>
                                    <div className='text-xs font-bold my-5 flex gap-8'>
                                        <span className='text-purple font-bold text-xs'>5th jun 2023 - 11th jun 2023</span>
                                        <span className='text-purple font-bold text-xs'>Offline</span>
                                    </div>
                                    <p className='text-sm font-thin mt-2 mb-6'>Join the 7-day saga to experience a
                                        jam ek full of workshops, mentorship
                                        hours, panel discussion etc.
                                    </p>
                                    <Link className="flex justify-center" to='/experience-union'><button className='bg-blue hover:bg-purple text-white rounded-3xl w-1/2 mx-auto py-2'>Register Now</button></Link>
                                </div>
                            </div>


                        </div>


                        <button onClick={handleScrollRight} className='hidden lg:block' type="button">
                            <ArrowForwardIosIcon sx={{ fontSize: '28px', color: '#141414', borderRadius: '50%', ":hover": { color: "#397FEB" }, background: '#94A4FF', height: '40px', width: '40px', padding: '5px' }} />
                        </button>
                    </div>
                </div>


            </div>
            <div


                className='flex eu-container overflow-x-scroll scroll-smooth gap-5 pb-10 lg:hidden'
            >
                <div style={{
                    border: '5px solid #94A4FF'
                }}
                    className='bg-transparent lg:min-w-[360px] min-w-[320px] max-w-[320px] lg:max-w-[360px] rounded-3xl p-5'>
                    <img
                        style={{
                            borderRight: "5px solid #6278FF",
                            borderBottom: "5px solid #6278FF",
                        }}
                        className='w-full rounded-3xl h-[200px] object-cover'
                        src={meetImg}
                        alt=''
                    />
                    <div className='mt-3'>
                        <h4 className='font-extrabold font text-xl'>Experiment Labs Summer
                            Startup Week</h4>
                        <div className='text-xs font-bold my-5 flex gap-3'>
                            <span className='text-purple font-bold text-xs'>5th jun 2023 - 11th jun 2023 </span>
                            <span className='text-purple font-bold text-xs'>Offline</span>
                        </div>
                        <p className='text-sm font-thin mt-2 mb-6'>Join the 7-day saga to experience a
                            jam ek full of workshops, mentorship
                            hours, panel discussion etc.
                        </p>
                        <Link className="flex justify-center" to='/experience-union'><button className='bg-blue hover:bg-purple text-white rounded-3xl w-1/2 mx-auto py-2'>Register Now</button></Link>
                    </div>
                </div>
                <div style={{
                    border: '5px solid #94A4FF'
                }}
                    className='bg-transparent lg:min-w-[360px] min-w-[320px] max-w-[320px] lg:max-w-[360px] rounded-3xl p-5'>
                    <img
                        style={{
                            borderRight: "5px solid #6278FF",
                            borderBottom: "5px solid #6278FF",
                        }}
                        className='w-full rounded-3xl h-[200px] object-cover'
                        src={meetImg}
                        alt=''
                    />
                    <div className='mt-3'>
                        <h4 className='font-extrabold font text-xl'>Experiment Labs Summer
                            Startup Week</h4>
                        <div className='text-xs font-bold my-5 flex gap-3'>
                            <span className='text-purple font-bold text-xs'>5th jun 2023 - 11th jun 2023 </span>
                            <span className='text-purple font-bold text-xs'>Offline</span>
                        </div>
                        <p className='text-sm font-thin mt-2 mb-6'>Join the 7-day saga to experience a
                            jam ek full of workshops, mentorship
                            hours, panel discussion etc.
                        </p>
                        <Link className="flex justify-center" to='/experience-union'><button className='bg-blue hover:bg-purple text-white rounded-3xl w-1/2 mx-auto py-2'>Register Now</button></Link>
                    </div>
                </div>
                <div style={{
                    border: '5px solid #94A4FF'
                }}
                    className='bg-transparent lg:min-w-[360px] min-w-[320px] max-w-[320px] lg:max-w-[360px] rounded-3xl p-5'>
                    <img
                        style={{
                            borderRight: "5px solid #6278FF",
                            borderBottom: "5px solid #6278FF",
                        }}
                        className='w-full rounded-3xl h-[200px] object-cover'
                        src={meetImg}
                        alt=''
                    />
                    <div className='mt-3'>
                        <h4 className='font-extrabold font text-xl'>Experiment Labs Summer
                            Startup Week</h4>
                        <div className='text-xs font-bold my-5 flex gap-3'>
                            <span className='text-purple font-bold text-xs'>5th jun 2023 - 11th jun 2023 </span>
                            <span className='text-purple font-bold text-xs'>Offline</span>
                        </div>
                        <p className='text-sm font-thin mt-2 mb-6'>Join the 7-day saga to experience a
                            jam ek full of workshops, mentorship
                            hours, panel discussion etc.
                        </p>
                        <Link className="flex justify-center" to='/experience-union'><button className='bg-blue hover:bg-purple text-white rounded-3xl w-1/2 mx-auto py-2'>Register Now</button></Link>
                    </div>
                </div>
                <div style={{
                    border: '5px solid #94A4FF'
                }}
                    className='bg-transparent lg:min-w-[360px] min-w-[320px] max-w-[320px] lg:max-w-[360px] rounded-3xl p-5'>
                    <img
                        style={{
                            borderRight: "5px solid #6278FF",
                            borderBottom: "5px solid #6278FF",
                        }}
                        className='w-full rounded-3xl h-[200px] object-cover'
                        src={meetImg}
                        alt=''
                    />
                    <div className='mt-3'>
                        <h4 className='font-extrabold font text-xl'>Experiment Labs Summer
                            Startup Week</h4>
                        <div className='text-xs font-bold my-5 flex gap-3'>
                            <span className='text-purple font-bold text-xs'>5th jun 2023 - 11th jun 2023 </span>
                            <span className='text-purple font-bold text-xs'>Offline</span>
                        </div>
                        <p className='text-sm font-thin mt-2 mb-6'>Join the 7-day saga to experience a
                            jam ek full of workshops, mentorship
                            hours, panel discussion etc.
                        </p>
                        <Link className="flex justify-center" to='/experience-union'><button className='bg-blue hover:bg-purple text-white rounded-3xl w-1/2 mx-auto py-2'>Register Now</button></Link>
                    </div>
                </div>
                <div style={{
                    border: '5px solid #94A4FF'
                }}
                    className='bg-transparent lg:min-w-[360px] min-w-[320px] max-w-[320px] lg:max-w-[360px] rounded-3xl p-5'>
                    <img
                        style={{
                            borderRight: "5px solid #6278FF",
                            borderBottom: "5px solid #6278FF",
                        }}
                        className='w-full rounded-3xl h-[200px] object-cover'
                        src={meetImg}
                        alt=''
                    />
                    <div className='mt-3'>
                        <h4 className='font-extrabold font text-xl'>Experiment Labs Summer
                            Startup Week</h4>
                        <div className='text-xs font-bold my-5 flex gap-3'>
                            <span className='text-purple font-bold text-xs'>5th jun 2023 - 11th jun 2023 </span>
                            <span className='text-purple font-bold text-xs'>Offline</span>
                        </div>
                        <p className='text-sm font-thin mt-2 mb-6'>Join the 7-day saga to experience a
                            jam ek full of workshops, mentorship
                            hours, panel discussion etc.
                        </p>
                        <Link className="flex justify-center" to='/experience-union'><button className='bg-blue hover:bg-purple text-white rounded-3xl w-1/2 mx-auto py-2'>Register Now</button></Link>
                    </div>
                </div>
                <div style={{
                    border: '5px solid #94A4FF'
                }}
                    className='bg-transparent lg:min-w-[360px] min-w-[320px] max-w-[320px] lg:max-w-[360px] rounded-3xl p-5'>
                    <img
                        style={{
                            borderRight: "5px solid #6278FF",
                            borderBottom: "5px solid #6278FF",
                        }}
                        className='w-full rounded-3xl h-[200px] object-cover'
                        src={meetImg}
                        alt=''
                    />
                    <div className='mt-3'>
                        <h4 className='font-extrabold font text-xl'>Experiment Labs Summer
                            Startup Week</h4>
                        <div className='text-xs font-bold my-5 flex gap-3'>
                            <span className='text-purple font-bold text-xs'>5th jun 2023 - 11th jun 2023 </span>
                            <span className='text-purple font-bold text-xs'>Offline</span>
                        </div>
                        <p className='text-sm font-thin mt-2 mb-6'>Join the 7-day saga to experience a
                            jam ek full of workshops, mentorship
                            hours, panel discussion etc.
                        </p>
                        <Link className="flex justify-center" to='/experience-union'><button className='bg-blue hover:bg-purple text-white rounded-3xl w-1/2 mx-auto py-2'>Register Now</button></Link>
                    </div>
                </div>
                <div style={{
                    border: '5px solid #94A4FF'
                }}
                    className='bg-transparent lg:min-w-[360px] min-w-[320px] max-w-[320px] lg:max-w-[360px] rounded-3xl p-5'>
                    <img
                        style={{
                            borderRight: "5px solid #6278FF",
                            borderBottom: "5px solid #6278FF",
                        }}
                        className='w-full rounded-3xl h-[200px] object-cover'
                        src={meetImg}
                        alt=''
                    />
                    <div className='mt-3'>
                        <h4 className='font-extrabold font text-xl'>Experiment Labs Summer
                            Startup Week</h4>
                        <div className='text-xs font-bold my-5 flex gap-3'>
                            <span className='text-purple font-bold text-xs'>5th jun 2023 - 11th jun 2023 </span>
                            <span className='text-purple font-bold text-xs'>Offline</span>
                        </div>
                        <p className='text-sm font-thin mt-2 mb-6'>Join the 7-day saga to experience a
                            jam ek full of workshops, mentorship
                            hours, panel discussion etc.
                        </p>
                        <Link className="flex justify-center" to='/experience-union'><button className='bg-blue hover:bg-purple text-white rounded-3xl w-1/2 mx-auto py-2'>Register Now</button></Link>
                    </div>
                </div>


            </div>
        </div>
    );
};

export default ExperienceUnion;