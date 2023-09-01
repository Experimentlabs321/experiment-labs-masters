
import icon from '../../../assets/LoginPage/icon.png';
import React, { useContext, useState } from "react";
import image2 from '../../../assets/LoginPage/image2.png';
import student from '../../../assets/LoginPage/student.svg';
import Organization from '../../../assets/LoginPage/Organization.svg';
import Mentor from '../../../assets/LoginPage/Mentor.svg';
import Affiliate from '../../../assets/LoginPage/Affiliate.svg';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';




const SelectProfile = () => {




    return (
        <div className=""
            style={{
                backgroundImage: `url(${image2})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                minHeight: "100vh"
            }}
        >
            <p className="flex items-center text-3xl font-semibold gap-2 pt-20 ms-10"><Link to='/loginPage' ><ArrowBackIcon /></Link> <span><img src={icon} alt="icon" /></span>Experiment Labs
            </p>
            <div className="flex">
                <div className="w-[100%] flex flex-col items-center mt-24">
                    <p className='text-[#8F8F8F] text-3xl font-semibold'>Welcome !</p>
                    <p className=' text-4xl font-extrabold mt-20'>Select your Profile(s) </p>
                    <div className='grid grid-cols-2 gap-[44px] mt-[46px]'>

                        <Link to='/studentSignup' className="flex items-center text-xl font-medium gap-5 justify-center py-2 w-[230px] "
                            style={{
                                borderRadius: "10px",
                                border: "0.5px solid #8F8F8F"
                            }}
                        >
                            <span><img src={student} alt="icon" /></span>
                            Student
                        </Link>
                        <Link to='/organizationType' className="flex items-center text-xl font-medium gap-5 justify-center py-2 w-[230px] "
                            style={{
                                borderRadius: "10px",
                                border: "0.5px solid #8F8F8F"
                            }}
                        >
                            <span><img src={Organization} alt="icon" /></span>
                            Organization
                        </Link>
                        <Link to='/mentorType' className="flex items-center text-xl font-medium gap-5 justify-center py-1 w-[230px] "
                            style={{
                                borderRadius: "10px",
                                border: "0.5px solid #8F8F8F"
                            }}
                        >
                            <span><img src={Mentor} alt="icon" /></span>
                            Mentor
                        </Link>
                        <Link to='/affiliateType' className="flex items-center text-xl font-medium gap-5 justify-center py-1 w-[230px] "
                            style={{
                                borderRadius: "10px",
                                border: "0.5px solid #8F8F8F"
                            }}
                        >
                            <span><img src={Affiliate} alt="icon" /></span>
                            Affiliate
                        </Link>

                    </div>


                </div>

            </div>

        
            <div className='flex justify-between items-center mt-60 mx-20 mb-20'>
                <p className='text-[#065AD8] text-2xl font-bold'>Log  in to your existing Account  ➡️ </p>
                <p className='text-3xl font-bold'>Help ?</p>
            </div>
          

           







        </div >




    );
};

export default SelectProfile;

