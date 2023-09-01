//MentorType

import icon from '../../../../assets/LoginPage/icon.png';
import React, { useContext, useState } from "react";
import image7 from '../../../../assets/LoginPage/image7.png';
import student from '../../../../assets/LoginPage/student.svg';
import Organization from '../../../../assets/LoginPage/Organization.svg';
import Mentor from '../../../../assets/LoginPage/Mentor.svg';
import Affiliate from '../../../../assets/LoginPage/Affiliate.svg';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';




const MentorType = () => {




    return (
        <div className=""
         
        >
            <p className="flex items-center text-3xl font-semibold gap-2 pt-20 ms-10"><Link to='/loginPage' ><ArrowBackIcon /></Link> <span><img src={icon} alt="icon" /></span>Experiment Labs
            </p>
            <div className="flex">
                <div className="w-[100%] flex flex-col items-center ">
                    
                    <p className=' text-4xl font-extrabold  mt-[80px] '>Select Teacher/Mentor Type</p>
                    <div className='grid grid-cols-2 gap-[44px] mt-[90px]'>

                        <p className="flex items-center text-xl font-medium gap-5  py-2 w-[300px] "
                            style={{
                                borderRadius: "10px",
                                border: "0.5px solid #8F8F8F"
                            }}
                        >
                            <input className='w-[50px] h-[25px] ms-2' type="checkbox" id="mentorType" name="mentorType" value="Teaching"/>
                            <span><img src={student} alt="icon" /></span>
                            Teaching
                        </p>
                        <p className="flex items-center text-xl font-medium gap-5  py-2 w-[300px] "
                            style={{
                                borderRadius: "10px",
                                border: "0.5px solid #8F8F8F"
                            }}
                        >
                             <input className='w-[50px] h-[25px] ms-2' type="checkbox" id="mentorType" name="mentorType" value="Evaluation"/>
                            <span><img src={Organization} alt="icon" /></span>
                            Evaluation
                        </p>
                        <p className="flex items-center text-xl font-medium gap-5  py-2 w-[300px] "
                            style={{
                                borderRadius: "10px",
                                border: "0.5px solid #8F8F8F"
                            }}
                        >
                             <input className='w-[50px] h-[25px] ms-2' type="checkbox" id="mentorType" name="mentorType" value="Assigning"/>
                            <span><img src={student} alt="icon" /></span>
                            Assigning
                        </p>
                        <p className="flex items-center text-xl font-medium gap-5  py-2 w-[300px] "
                            style={{
                                borderRadius: "10px",
                                border: "0.5px solid #8F8F8F"
                            }}
                        >
                             <input className='w-[50px] h-[25px] ms-2' type="checkbox" id="mentorType" name="mentorType" value="Content Creation"/>
                            <span><img src={Organization} alt="icon" /></span>
                            Content Creation
                        </p>
                        

                    </div>


                </div>

            </div>

            <div className='flex justify-end items-center  '
                style={{
                    backgroundImage: `url(${image7})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    minHeight: "48vh"
                }}
            >
                
                <Link to='/mentorName'
                    style={{
                        borderRadius: "10px",
                        border: "0.5px solid #8F8F8F"

                    }}
                    className="bg-[#065AD8] flex  text-xl font-bold text-[#fff]  justify-center py-2 w-[230px] me-20 mt-48 mb-10">Next</Link>
            </div>

        
        
          

        </div >




    );
};

export default MentorType;

