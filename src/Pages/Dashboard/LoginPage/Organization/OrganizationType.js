//OrganizationType


import icon from '../../../../assets/LoginPage/icon.png';
import React, { useContext, useState } from "react";
import image7 from '../../../../assets/LoginPage/image7.png';
import student from '../../../../assets/LoginPage/student.svg';
import Organization from '../../../../assets/LoginPage/Organization.svg';
import Mentor from '../../../../assets/LoginPage/Mentor.svg';
import Affiliate from '../../../../assets/LoginPage/Affiliate.svg';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';




const OrganizationType = () => {




    return (
        <div className=""
         
        >
            <p className="flex items-center text-3xl font-semibold gap-2 pt-20 ms-10"><Link to='/loginPage' ><ArrowBackIcon /></Link> <span><img src={icon} alt="icon" /></span>Experiment Labs
            </p>
            <div className="flex">
                <div className="w-[100%] flex flex-col items-center ">
                    
                    <p className=' text-4xl font-extrabold  mt-[80px] '>Select the Organization Type</p>
                    <div className='grid grid-cols-2 gap-[44px] mt-[90px]'>

                        <Link to='/organizationName' className="flex items-center text-xl font-medium gap-5 justify-center py-2 w-[230px] "
                            style={{
                                borderRadius: "10px",
                                border: "0.5px solid #8F8F8F"
                            }}
                        >
                            <span><img src={student} alt="icon" /></span>
                            School
                        </Link>
                        <Link to='/organizationName' className="flex items-center text-xl font-medium gap-5 justify-center py-2 w-[230px] "
                            style={{
                                borderRadius: "10px",
                                border: "0.5px solid #8F8F8F"
                            }}
                        >
                            <span><img src={Organization} alt="icon" /></span>
                            College
                        </Link>
                        <Link to='/organizationName' className="flex items-center text-xl font-medium gap-5 justify-center py-2 w-[230px] "
                            style={{
                                borderRadius: "10px",
                                border: "0.5px solid #8F8F8F"
                            }}
                        >
                            <span><img src={student} alt="icon" /></span>
                            Institute
                        </Link>
                        <Link to='/organizationName' className="flex items-center text-xl font-medium gap-5 justify-center py-2 w-[230px] "
                            style={{
                                borderRadius: "10px",
                                border: "0.5px solid #8F8F8F"
                            }}
                        >
                            <span><img src={Organization} alt="icon" /></span>
                            University
                        </Link>
                        <Link to='/organizationName' className="flex items-center text-xl font-medium gap-5 justify-center py-2 w-[230px] "
                            style={{
                                borderRadius: "10px",
                                border: "0.5px solid #8F8F8F"
                            }}
                        >
                            <span><img src={student} alt="icon" /></span>
                            Company
                        </Link>
                        <Link to='/organizationName' className="flex items-center text-xl font-medium gap-5 justify-center py-2 w-[230px] "
                            style={{
                                borderRadius: "10px",
                                border: "0.5px solid #8F8F8F"
                            }}
                        >
                            <span><img src={Organization} alt="icon" /></span>
                            Coaching
                        </Link>
                       

                    </div>


                </div>

            </div>

            <div>
                <img className='w-full h-[355px]' src={image7} alt='image'/>
            </div>

        
        
          

        </div >




    );
};

export default OrganizationType;

