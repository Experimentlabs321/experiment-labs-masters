import React from 'react';
import './style.css';
import { Button } from '@mui/material';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
//import img from '../../../assets/taket-test/Mask group.png';
import { Link } from 'react-router-dom';
import ReactGA from "react-ga4";

const TakeTest = ({ takeTest }) => {
    return (
        <div style={{
            background: 'linear-gradient(270deg, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.274309) 35.55%, rgba(0, 0, 0, 0) 100%), #6278FF'
        }} className='mt-48 w-full box-border'>
            <div className='p-10 lg:py-0 lg:pl-0 flex flex-row-reverse justify-between items-center gap-10 box-border' style={{ height: '100%' }}>
                <div className='w-full lg:w-1/2 text-center box-border'>
                    <h1 className='text-white text-3xl font-medium mb-10' style={{ whiteSpace: 'pre-line' }}>
                        {takeTest?.takeTestHeading.replace(/ & /g, '\n &\n')}
                    </h1>
                    <Link target='_blank' to={`http://experimentlabs.xyz/personality.html`}>
                        <Button
                            onClick={() => {
                                ReactGA.event({
                                    category: "Click",
                                    action: "Take Test",
                                    label: 'Take Test'
                                });
                            }}
                            size='large'
                            sx={
                                {
                                    bgcolor: '#FF557A',
                                    color: 'white',
                                    fontSize: '22px',
                                    fontWeight: '600',
                                    ":hover": { bgcolor: '#94A4FF' },
                                    textTransform: 'capitalize',
                                    padding: '6px 40px',
                                    borderRadius: '45px'
                                }
                            }
                            variant='contained'
                        >{takeTest?.takeTestButton}</Button>
                    </Link>
                </div>
                <div className='hidden lg:block lg:w-1/2' style={{ height: '100%' }}>
                    {/* <div className='curved-sides'>
                        <video className='curved-sides2' src="https://dsqqu7oxq6o1v.cloudfront.net/motion-array-1177701-mBCKbnRAFv-high.mp4" controls></video>
                    </div> */}
                    <img src={takeTest?.takeTestImage} style={{ height: '100%' }} alt="" />
                </div>

            </div>
        </div>
    );
};

export default TakeTest;