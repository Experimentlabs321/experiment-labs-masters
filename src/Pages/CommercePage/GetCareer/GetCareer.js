import React from 'react';

import Person3Icon from '@mui/icons-material/Person3';
import EmailIcon from '@mui/icons-material/Email';
import CallIcon from '@mui/icons-material/Call';
import img from '../../../assets/GetCareer/serious-teacher-checking-assignment-two-students1.png'

const GetCareer = () => {
    return (
        // <div style={{ background: `url(${img})`, objectFit: 'cover' }} className='pt-40 flex items-center justify-center pb-40'>
        <div style={{ background: 'linear-gradient(270deg, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.274309) 35.55%, rgba(0, 0, 0, 0) 100%), #6278FF' }} className='pt-20 flex items-center justify-center pb-12'>
            <div className='px-10  flex flex-col lg:flex-row gap-12 items-center'>

                <div className='w-full '>
                    <h1 className='text-4xl mb-8 w-full'>
                        Get Career advice from your future recruiters
                    </h1>
                    <div className='lg:ml-28'>
                        <p className='text font-light mb-8'>
                            Take courses with top CXOs,MDs,startup founders and academicians from <br />
                            HBS,Mckinsey and more!
                        </p>
                        <p className='text font-light mb-8'>
                            Get to experience what a week in the life of your preferred career<br />
                            looks like and what it takes to become a successful leader.
                        </p>
                        <p className='text font-light mt-3'>
                            Get 1-1 mentorship and shadow Masters in your preferred domain

                        </p>
                    </div>

                </div>
                <div className=' '>
                    <img className='rounded-3xl' src={img} alt="" />

                </div>
            </div>
        </div>
    );
};

export default GetCareer;