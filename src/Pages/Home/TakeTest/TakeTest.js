import React from 'react';
import './style.css';
import { Button } from '@mui/material';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import img from '../../../assets/taket-test/Mask group.png'

const TakeTest = () => {
    return (
        <div style={{
            backgroundImage: "linear-gradient(to top left, #000000 -95%, rgba(0, 0, 0, 0.6096) 10.55%, rgba(0, 0, 0, 0) 90%)",
            backgroundColor: '#6278FF',
        }} className='mt-48 w-full box-border'>
            <div className='p-10 lg:py-0 lg:pl-0 flex flex-row-reverse justify-between items-center gap-10 box-border' style={{ height: '100%' }}>
                <div className='w-full lg:w-1/2 text-center box-border'>
                    <h1 className='text-white text-3xl font-thin mb-10'>Take a <span className='font-bold text-pink'>free</span> personality Evaluation test <br />
                        <span>&</span> <br /> Book a<span className='font-bold'> 1 on 1 counseling session.</span> </h1>
                    <Button
                        size='large'
                        sx={
                            {
                                bgcolor: '#FF557A',
                                color: 'white',
                                fontSize:'22px',
                                fontWeight: '600',
                                ":hover": { bgcolor: '#94A4FF' },
                                textTransform: 'capitalize',
                                padding: '6px 40px',
                                borderRadius:'45px'
                            }
                        }
                        variant='contained'
                    >Take Test</Button>
                </div>
                <div className='hidden lg:block lg:w-1/2' style={{ height: '100%' }}>
                    {/* <div className='curved-sides'>
                        <video className='curved-sides2' src="https://dsqqu7oxq6o1v.cloudfront.net/motion-array-1177701-mBCKbnRAFv-high.mp4" controls></video>
                    </div> */}
                    <img src={img} style={{height:'100%'}} alt="" />
                </div>

            </div>
        </div>
    );
};

export default TakeTest;