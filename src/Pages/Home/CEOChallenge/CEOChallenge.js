import React from 'react';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import './style.css';
import { Button } from '@mui/material';

const CEOChallenge = () => {
    return (
        <div className='mt-48 bg-custom-blue h-96'>
            <div className='px-5 lg:px-40 flex items-center gap-10' style={{ height: '100%' }}>
                <div className='w-full lg:w-1/2'>
                    <h1 className='text-white text-3xl font-normal mb-6'><span className='font-thin'>UG Programme in Tech & Business Mgmt</span> <br />
                        <span className='font-extrabold'>The CEO Challenge</span>
                    </h1>
                    <Button
                        size='large'
                        sx={
                            {
                                bgcolor: 'white',
                                color: 'black',
                                border: '1px solid black',
                                font: '400',
                                ":hover": { opacity: '0.8', bgcolor: 'white' },
                                textTransform: 'capitalize',
                                padding: '10px 40px'
                            }
                        }
                        variant='contained'
                        endIcon={<ArrowCircleRightOutlinedIcon />}
                    >Watch Video</Button>
                </div>
                <div className='hidden lg:block lg:w-1/2' style={{ height: '100%' }}>
                    <div className='ceo-curved-sides'>
                        <video className='ceo-curved-sides2' src="https://dsqqu7oxq6o1v.cloudfront.net/motion-array-1177701-mBCKbnRAFv-high.mp4" controls></video>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default CEOChallenge;