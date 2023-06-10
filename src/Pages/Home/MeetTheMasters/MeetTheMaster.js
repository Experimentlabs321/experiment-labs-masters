import React, { useRef } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import OutboundOutlinedIcon from '@mui/icons-material/OutboundOutlined';
import { Button } from '@mui/material';
import ArrowCircleLeftRoundedIcon from '@mui/icons-material/ArrowCircleLeftRounded';
import ArrowCircleRightRoundedIcon from '@mui/icons-material/ArrowCircleRightRounded';
import './style.css';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import guptaImg from '../../../assets/Masters/guptaImg.png';
import guptaLogo from '../../../assets/Masters/guptaLogo.png';
import handaImg from '../../../assets/Masters/handaImg.png';
import handaLogo from '../../../assets/Masters/handaLogo.png';
import jainImg from '../../../assets/Masters/jainImg.png';
import jainLogo from '../../../assets/Masters/jainLogo.png';
import gargImg from '../../../assets/Masters/gargImg.png';
import gargLogo from '../../../assets/Masters/gargLogo.png';
import moulikImg from '../../../assets/Masters/moulikImg.png';
import moulikLogo from '../../../assets/Masters/moulikLogo.png';

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
                    <h1 className='text-3xl xl:text-4xl font-extrabold font'>Meet Your MENTORS </h1>
                    <p className='text-xl mt-2 font-thin lowercase'>Take a closer look into our classrooms
                    </p>
                </div>
                <div className='hidden lg:block'>
                    <Button endIcon={<ArrowForwardIosIcon />} size='large' variant='contained' sx={{ bgcolor: '#94A4FF', ":hover": { bgcolor: '#6278FF' }, textTransform: 'capitalize', borderRadius: '24px' }}>Meet the Masters</Button>
                </div>
            </div>

            <div className="carousel-button-group">
                <div className='flex justify-center gap-10 lg:mt-5'>
                    <button onClick={handleScrollLeft} className='hidden lg:block' type="button">
                        <ArrowBackIosNewIcon sx={{ fontSize: '28px', color: '#141414', borderRadius: '50%', ":hover": { color: "#397FEB" }, background: '#94A4FF', height: '40px', width: '40px', padding: '5px' }} />
                    </button>
                    <div
                        ref={containerRef}
                        className='flex overflow-x-scroll scroll-smooth gap-5 mtm-container lg:w-[85vw]'
                    >
                        <div style={{
                            backgroundColor: '#FFFFFF',
                            borderBottom: '4px solid #94A4FF',
                            borderRight: '4px solid #94A4FF',
                            color: 'black',
                            borderRadius: '24px'
                        }} className='min-w-[290px] max-w-[290px] px-2 pb-4'>
                            <img src={guptaImg} alt="" />
                            <div className='pt-3'>
                                <h4 className='font-bold text-xl'>Shekhar gupta</h4>
                                <h6 className='text-sm font-normal'>Former worked at</h6>
                            </div>
                            <img src={guptaLogo} alt="" />
                        </div>


                        <div style={{
                            backgroundColor: '#FFFFFF',
                            borderBottom: '4px solid #94A4FF',
                            borderRight: '4px solid #94A4FF',
                            color: 'black',
                            borderRadius: '24px'
                        }} className='min-w-[290px] max-w-[290px] px-2 pb-4'>
                            <img src={handaImg} alt="" />
                            <div className='pt-3'>
                                <h4 className='font-bold text-xl'>Pulkit Handa</h4>
                                <h6 className='text-sm font-normal'>Former worked at</h6>
                            </div>
                            <img src={handaLogo} alt="" />
                        </div>



                        <div style={{
                            backgroundColor: '#FFFFFF',
                            borderBottom: '4px solid #94A4FF',
                            borderRight: '4px solid #94A4FF',
                            color: 'black',
                            borderRadius: '24px'
                        }} className='min-w-[290px] max-w-[290px] px-2 pb-4'>
                            <img src={jainImg} alt="" />
                            <div className='py-3'>
                                <h4 className='font-bold text-xl'>Naman Jain</h4>
                                <h6 className='text-sm font-normal'>Former director of Classplas
                                    dineout, Times Internet</h6>
                            </div>
                            <img src={jainLogo} alt="" />
                        </div>



                        <div style={{
                            backgroundColor: '#FFFFFF',
                            borderBottom: '4px solid #94A4FF',
                            borderRight: '4px solid #94A4FF',
                            color: 'black',
                            borderRadius: '24px'
                        }} className='min-w-[290px] max-w-[290px] px-2 pb-4'>
                            <img src={gargImg} alt="" />
                            <div className='py-3'>
                                <h4 className='font-bold text-xl'>Aayush Garg</h4>
                                <h6 className='text-sm font-normal'>Former worked at</h6>
                            </div>
                            <img src={gargLogo} alt="" />
                        </div>



                        <div style={{
                            backgroundColor: '#FFFFFF',
                            borderBottom: '4px solid #94A4FF',
                            borderRight: '4px solid #94A4FF',
                            color: 'black',
                            borderRadius: '24px'
                        }} className='min-w-[290px] max-w-[290px] px-2 pb-4'>
                            <img src={moulikImg} alt="" />
                            <div className='py-3'>
                                <h4 className='font-bold text-xl'>Siddharth Moulik</h4>
                                <h6 className='text-sm font-normal'>Former worked at</h6>
                            </div>
                            <img src={moulikLogo} alt="" />
                        </div>





                    </div>
                    <button onClick={handleScrollRight} className='hidden lg:block' type="button">
                        <ArrowForwardIosIcon sx={{ fontSize: '28px', color: '#141414', borderRadius: '50%', ":hover": { color: "#397FEB" }, background: '#94A4FF', height: '40px', width: '40px', padding: '5px' }} />
                    </button>
                </div>
            </div>
            <div className='block lg:hidden mt-10'>
                <Button endIcon={<ArrowForwardIosIcon />} size='large' variant='contained' sx={{ bgcolor: '#94A4FF', ":hover": { bgcolor: '#6278FF' }, textTransform: 'capitalize', borderRadius: '24px', width: '100%' }}>Meet the Masters</Button>
            </div>
        </div>
    );
};

export default MeetTheMaster;