//OrganizationServices



import icon from '../../../../assets/LoginPage/icon.png';
import icon1 from '../../../../assets/LoginPage/icon1.svg';
import React, { useContext, useState } from "react";
import image9 from '../../../../assets/LoginPage/image9.png';
import image11 from '../../../../assets/LoginPage/image11.png';

import account from '../../../../assets/LoginPage/account.svg';
import user from '../../../../assets/LoginPage/user.svg';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';




const OrganizationServices = () => {




    return (
        <div className="flex"

        >
            <div className='w-[100%]'>
                <p className="flex items-center text-3xl font-semibold gap-2 ps-10 pt-10"><Link to='/organizationName' ><ArrowBackIcon /></Link> <span><img src={icon} alt="icon" /></span>Experiment Labs
                </p>

                <p className=' text-center text-4xl font-extrabold mt-20 '>What services can we <br /> support you with ? </p>
                <div className='flex justify-center'>
                    <p className=' text-xl font-semibold mt-[35px] text-center text-[#8F8F8FCC] w-[60%]'>Select the services to extend your organization’s helping hand. If not sure of the services, you may Skip. </p>
                </div>

                <div className=' flex flex-col gap-[30px] overflow-auto h-[500px]  mt-[50px] px-[90px]'>
                    <div className='p-[30px]'
                        style={{
                            borderRadius: "10px",
                            border: "1px solid #8F8F8F",
                            background: "#FFF"
                        }}
                    >
                        <p className='flex justify-between items-center'><span><img src={icon1} alt='icon' /></span> <input
                            className="w-[50px] h-[20px]" type="checkbox" id="vehicle1" name="vehicle1" value="Bike" /></p>

                        <p className='text-xl font-bold mt-3'>Gamified Platform</p>
                        <p className='text-[#8F8F8F] text-xl font-medium mt-3'>This provides exiting features of qualifying levels, quests, unboxing gifts, earning points and much more.</p>

                    </div>
                    <div className='p-[30px]'
                        style={{
                            borderRadius: "10px",
                            border: "1px solid #8F8F8F",
                            background: "#FFF"
                        }}
                    >
                        <p className='flex justify-between items-center'><span><img src={icon1} alt='icon' /></span> <input
                            className="w-[50px] h-[20px]" type="checkbox" id="vehicle1" name="vehicle1" value="Bike" /></p>

                        <p className='text-xl font-bold mt-3'>Gamified Platform</p>
                        <p className='text-[#8F8F8F] text-xl font-medium mt-3'>This provides exiting features of qualifying levels, quests, unboxing gifts, earning points and much more.</p>

                    </div>
                    <div className='p-[30px]'
                        style={{
                            borderRadius: "10px",
                            border: "1px solid #8F8F8F",
                            background: "#FFF"
                        }}
                    >
                        <p className='flex justify-between items-center'><span><img src={icon1} alt='icon' /></span> <input
                            className="w-[50px] h-[20px]" type="checkbox" id="vehicle1" name="vehicle1" value="Bike" /></p>

                        <p className='text-xl font-bold mt-3'>Gamified Platform</p>
                        <p className='text-[#8F8F8F] text-xl font-medium mt-3'>This provides exiting features of qualifying levels, quests, unboxing gifts, earning points and much more.</p>

                    </div>

                </div>

            </div>

            <div className='w-[100%]'
                style={{
                    backgroundImage: `url(${image9})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    minHeight: "100vh"
                }}
            >
                <p className="flex items-center justify-end text-[#065AD8] text-3xl font-semibold gap-2 pt-[80px] pe-[150px]"><Link to='' >Skip <span><ArrowForwardIcon /></span> </Link>
                </p>

                <div className='flex justify-center pt-[100px]'>
                    <img className='w-[60%]' src={image11} alt='imag' />
                </div>

                <div className='flex justify-end absolute bottom-0 left-0 w-full mb-10'>
                    <Link to='/organizationSignup'
                        style={{
                            borderRadius: "10px",
                            border: "0.5px solid #8F8F8F"

                        }}
                        className="bg-[#065AD8] flex  text-xl font-bold text-[#fff]  justify-center py-2 w-[230px] me-20 mt-20 ">Next</Link>
                </div>

            </div>


        </div >




    );
};

export default OrganizationServices;

