import React from 'react';
import img from '../../../assets/wepik-export-20230516131526jrNm.png';
import Person3Icon from '@mui/icons-material/Person3';
import EmailIcon from '@mui/icons-material/Email';
import CallIcon from '@mui/icons-material/Call';

const GetInTouch = () => {
    return (
        // <div style={{ background: `url(${img})`, objectFit: 'cover' }} className='pt-40 flex items-center justify-center pb-40'>
        <div style={{background:'linear-gradient(270deg, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.274309) 35.55%, rgba(0, 0, 0, 0) 100%), #6278FF'}} className='pt-40 flex items-center justify-center pb-40'>
            <div className='px-10 lg:px-32 flex flex-col lg:flex-row gap-20 justify-between items-center'>
                <div className='w-full text-center'>
                    <h1 className='text-4xl font-bold'>
                        Is This programme for me?
                    </h1>
                    <p className='text font-light mt-3'>
                        Talk to the Experiment Labs Counsellor to understand if you are a good fit
                    </p>
                </div>
                <div className='w-full'>
                    <form className=' p-8 rounded-md border-custom-blue  border-opacity-40 w-full lg:max-w-[480px]'>
                        <div>
                            <label className='ml-5'>Name</label>
                            <div className='flex gap-2  border-2xl bg-[white] px-2 py-2 rounded-3xl'>
                               
                                <input className='w-full bg-transparent border-0 focus:outline-0 text-center' type="text" placeholder='Enter Your name' />
                            </div>
                        </div>
                        <div className='mt-6'>
                            <label className='ml-5'>Email</label>
                            <div className='flex border-2xl gap-2 bg-[white] border px-2 py-2 rounded-3xl'>
                                
                                <input className='w-full bg-transparent border-0 focus:outline-0 text-center' type="email" placeholder='Enter Your email' />
                            </div>
                        </div>
                        <div className='mt-6'>
                            <label className='ml-5'>Phone no</label>
                            <div className='flex gap-2 bg-[white] border-2xl  border px-2 py-2 rounded-3xl'>
                                
                                <input className='w-full bg-transparent border-0 focus:outline-0 text-center' type="text" placeholder='Enter Your mobile number' />
                            </div>
                        </div>
                       {/*  <div className='mt-6 flex gap-2 items-start'>
                            <input type="checkbox" />
                            <label className='text-xs font-light'>I authorize Masters' Union to contact me with updates via Calls, SMS, WhatsApp and Emails. This will override my registry on DND/NDNC.</label>
                        </div> */}
                        <div className='mt-6 flex gap-2 justify-center '>
                            <input className='w-44 bg-pink py-2 rounded-3xl hover:bg-purple hover:transition-all hover:delay-200 hover:ease-out' type="submit" value={'Get In Touch'} />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default GetInTouch;