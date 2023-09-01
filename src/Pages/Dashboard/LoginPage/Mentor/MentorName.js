

import icon from '../../../../assets/LoginPage/icon.png';
import React, { useContext, useState } from "react";
import image8 from '../../../../assets/LoginPage/image8.png';
import account from '../../../../assets/LoginPage/account.svg';
import user from '../../../../assets/LoginPage/user.svg';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';




const MentorName = () => {




    return (
        <div className=""

        >
            <p className="flex items-center text-3xl font-semibold gap-2 pt-20 ms-10"><Link to='/mentorType' ><ArrowBackIcon /></Link> <span><img src={icon} alt="icon" /></span>Experiment Labs
            </p>
            <div className="flex">
                <div className="w-[100%] flex flex-col items-center ">

                    <p className=' text-4xl font-extrabold mt-20 '>What is your name ? </p>
                    <p className="flex items-center text-xl font-medium gap-5  py-2 w-[550px] mt-[100px] ps-3 "
                        style={{
                            borderRadius: "10px",
                            border: "0.5px solid #8F8F8F"
                        }}
                    >
                        <span><img src={user} alt="icon" /></span>
                        <input className="w-full focus:outline-0" placeholder="Type your name here" type="text" name="name" />
                    </p>

   



                </div>

            </div>


            <div className='flex justify-end items-center mt-[140px] '
                style={{
                    backgroundImage: `url(${image8})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    minHeight: "42vh"
                }}
            >
                
                <Link to='/aboutSkillsExpertise'
                    style={{
                        borderRadius: "10px",
                        border: "0.5px solid #8F8F8F"

                    }}
                    className="bg-[#065AD8] flex  text-xl font-bold text-[#fff]  justify-center py-2 w-[230px] me-20 mt-48 mb-10">Next</Link>
            </div>



        </div >




    );
};

export default MentorName;

