import React from 'react';
import img from '../../../assets/wepik-export-20230516131526jrNm.png';
import './style.css';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const Overview = () => {
    return (
        <div style={{ background: `url(${img})`, objectFit: 'cover' }} className='pt-40 flex items-center justify-center pb-20 font'>
            <div className='px-10 lg:px-32'>
                <div className='flex flex-col lg:flex-row gap-16 justify-center items-center'>
                    <div>
                        <p className='bg-custom-blue py-1 px-2 text-sm text-bold inline'>PGP IN TECHNOLOGY & BUSINESS MANAGEMENT</p>
                        <h2 className='text-3xl my-8'>One of the <span className='font-semibold bg-gradient-to-t from-custom-blue to-transparent to-50%'>Best Placement Records</span> of any <br />
                            <span className='font-semibold bg-gradient-to-t from-custom-blue to-transparent to-50%'>B School</span> in the <span className='font-semibold bg-gradient-to-t from-custom-blue to-transparent to-50%'>Country</span></h2>

                        <div className='mb-8 flex flex-col gap-3'>
                            <div className='flex flex-row items-center gap-1'>
                                <span><PlayArrowRoundedIcon sx={{ color: '#397FEB' }} /></span>
                                <span style={{ fontWeight: '500' }}>Domestic Average CTC @ ₹ 33.10 lakhs</span>
                            </div>
                            <div className='flex flex-row items-center gap-1'>
                                <span><PlayArrowRoundedIcon sx={{ color: '#397FEB' }} /></span>
                                <span style={{ fontWeight: '500' }}>Top Recruiters include Bain, BCG, Microsoft</span>
                            </div>
                            <div className='flex flex-row items-center gap-1'>
                                <span><PlayArrowRoundedIcon sx={{ color: '#397FEB' }} /></span>
                                <span style={{ fontWeight: '500' }}>20% Students Placed in EIR and Chief of Staff Roles</span>
                            </div>
                        </div>

                        <div className='flex flex-col lg:flex-row w-full gap-8'>
                            <button className='bg-cyan font-semibold hover:bg-opacity-80 hover:transition-all hover:delay-300 hover:ease-out w-full py-3'>DOWNLOAD PLACEMENT REPORT</button>
                            <button className='border-2 bg-white text-cyan border-cyan font-semibold hover:bg-opacity-80 hover:transition-all hover:delay-300 hover:ease-out w-full py-3'>CONNECT WITH COUNSELLOR</button>
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
                        <p className='text-sm font-thin bg-custom-blue bg-opacity-50'>Hands on Teaching at Masters' Union <span className='font-semibold'>ft. Kenny and Abish</span></p>
                    </div>
                </div>

                <div className='w-full bg-[#424242] mt-16 p-5 flex flex-col justify-center lg:flex-row lg:justify-evenly lg:items-start gap-3 gap-y-10 border-e-4 border-b-4 border-custom-blue border-opacity-30 rounded'>
                    <div className='h-full'>
                        <div className='flex gap-2 items-center text-sm'>
                            <AccessTimeIcon />
                            <span>Duration</span>
                        </div>
                        <div className='mt-2'>
                            <h1 className='text-2xl font-bold'>16 Months</h1>
                            <p className='font-thin mt-2 text-sm'>Includes a 3-Month Internship</p>
                        </div>
                    </div>
                    <div className='lg:border-l border-t lg:border-t-0 lg:pt-0 pt-8 lg:px-8 border-dashed'>
                        <div className='flex gap-2 items-center text-sm'>
                            <LocationOnIcon />
                            <span>Location</span>
                        </div>
                        <div className='mt-2'>
                            <h1 className='text-2xl font-bold'>Gurugram</h1>
                            <p className='font-thin mt-2 text-sm'>DLF CyberPark
                            </p>
                        </div>
                    </div>
                    <div className='lg:border-l border-t lg:border-t-0 lg:pt-0 pt-8 lg:px-8 border-dashed'>
                        <div className='flex gap-2 items-center text-sm'>
                            <LiveTvIcon />
                            <span>Format</span>
                        </div>
                        <div className='mt-2'>
                            <h1 className='text-2xl font-bold'>Full Time</h1>
                            <p className='font-thin mt-2 text-sm'>Opt-in Residential</p>
                        </div>
                    </div>
                    <div className='lg:border-l border-t lg:border-t-0 lg:pt-0 pt-8 lg:px-8 border-dashed h-full'>
                        <div className='flex gap-2 items-center text-sm'>
                            <CalendarTodayIcon />
                            <span>Commencement Date</span>
                        </div>
                        <div className='mt-2'>
                            <h1 className='text-2xl font-bold'>June 2023</h1>
                            <p style={{visibility:'hidden'}} className='font-thin mt-2 text-sm'>Opt-in Residential</p>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    );
};

export default Overview;