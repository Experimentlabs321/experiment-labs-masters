import React from 'react';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import './style.css';
import { Button } from '@mui/material';

const CEOChallenge = () => {
    return (
        <div style={{background:'linear-gradient(-270deg, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.274309) 35.55%, rgba(0, 0, 0, 0) 100%), #6278FF'}} className='mt-48 h-96 font'>
            <div className='px-5 flex flex-col justify-center items-center text-center' style={{ height: '100%' }}>
               
               <h1 className='font-bold text-4xl'>Unlock the world of Potential Career Options!</h1>
               <p className='mt-5 mb-8 text-2xl font-light'>Download our career PDF and delve deeper into the <br />career options available for you</p>
               <button className='bg-pink hover:bg-purple py-2 px-8 font-bold text-lg rounded-3xl'>DOWNLOAD  Career Handbook</button>

            </div>
        </div>
    );
};

export default CEOChallenge;