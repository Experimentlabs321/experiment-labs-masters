import React from 'react';
import img from '../../../assets/wepik-export-20230516131526jrNm.png';
import Person3Icon from '@mui/icons-material/Person3';
import EmailIcon from '@mui/icons-material/Email';
import CallIcon from '@mui/icons-material/Call';

const GetInTouch = () => {
    return (
        <div style={{ background: `url(${img})`, objectFit: 'cover' }} className='pt-40 flex items-center justify-center pb-40'>
            <div className='px-10 lg:px-32 flex flex-col lg:flex-row gap-20 justify-between items-center'>
                <div className='w-full'>
                    <h1 className='text-4xl font-bold'>
                        Is This <span className='bg-gradient-to-t from-custom-blue to-transparent to-50%'>PGP TBM</span> Right for Me?
                    </h1>
                    <p className='text font-light mt-3'>
                        Talk to the Masters’ Union admissions team to understand if you are a good fit for <span className='font-bold'>PGP TBM</span>
                    </p>
                </div>
                <div className='w-full'>
                    <form className='bg-[#424242] p-8 rounded-md border-custom-blue border-r-4 border-b-4 border-opacity-40 w-full lg:max-w-[480px]'>
                        <div>
                            <label>Name<span className='text-red-600'>*</span></label>
                            <div className='flex gap-2 mt-4 border px-3 py-3 rounded-md'>
                                <Person3Icon />
                                <input className='w-full bg-transparent border-0 focus:outline-0' type="text" placeholder='Enter Your name' />
                            </div>
                        </div>
                        <div className='mt-6'>
                            <label>Email<span className='text-red-600'>*</span></label>
                            <div className='flex gap-2 mt-4 border px-3 py-3 rounded-md'>
                                <EmailIcon />
                                <input className='w-full bg-transparent border-0 focus:outline-0' type="email" placeholder='Enter Your email' />
                            </div>
                        </div>
                        <div className='mt-6'>
                            <label>Mobile Number<span className='text-red-600'>*</span></label>
                            <div className='flex gap-2 mt-4 border px-3 py-3 rounded-md'>
                                <CallIcon />
                                <input className='w-full bg-transparent border-0 focus:outline-0' type="text" placeholder='Enter Your mobile number' />
                            </div>
                        </div>
                        <div className='mt-6 flex gap-2 items-start'>
                            <input type="checkbox" />
                            <label className='text-xs font-light'>I authorize Masters' Union to contact me with updates via Calls, SMS, WhatsApp and Emails. This will override my registry on DND/NDNC.</label>
                        </div>
                        <div className='mt-6 flex gap-2 items-start'>
                            <input className='w-full bg-custom-blue py-3 rounded-md hover:bg-opacity-60 hover:transition-all hover:delay-200 hover:ease-out' type="submit" value={'Get In Touch'} />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default GetInTouch;