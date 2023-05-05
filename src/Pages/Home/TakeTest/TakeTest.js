import React from 'react';
import './style.css';
import { Button } from '@mui/material';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';

const TakeTest = () => {
    return (
        <div className='mt-48 bg-green h-96 w-full'>
            <div className='px-5 lg:px-40 flex items-center gap-10' style={{ height: '100%' }}>
                <div className='w-full lg:w-1/2'>
                    <h1 className='text-dark text-3xl font-normal mb-6'>Take a free personality Evaluation test <br />
                        And <span className='font-bold'>Book a 1 on 1 counseling session.</span> </h1>
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
                                padding:'10px 40px'
                            }
                        }
                        variant='contained'
                        endIcon={<ArrowCircleRightOutlinedIcon/>}
                    >Take Test</Button>
                </div>
                <div className='hidden lg:block lg:w-1/2' style={{ height: '100%' }}>
                    <div className='curved-sides'>
                        <video className='curved-sides2' src="https://dsqqu7oxq6o1v.cloudfront.net/motion-array-1177701-mBCKbnRAFv-high.mp4" controls></video>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default TakeTest;