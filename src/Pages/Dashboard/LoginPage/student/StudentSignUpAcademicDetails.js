


import icon from '../../../../assets/LoginPage/icon.png';
import React, { useContext, useState } from "react";
import image3 from '../../../../assets/LoginPage/image3.png';
import user from '../../../../assets/LoginPage/user.svg';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';




const StudentSignUpAcademicDetails = () => {




    return (
        <div className=""
            style={{
                backgroundImage: `url(${image3})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                minHeight: "100vh"
            }}
        >
            <p className="flex items-center text-3xl font-semibold gap-2 pt-20 ms-10"><Link to='/studentSignup' ><ArrowBackIcon /></Link> <span><img src={icon} alt="icon" /></span>Experiment Labs
            </p>
            <div className="flex">
                <div className="w-[100%] flex flex-col items-center mt-20">

                    <p className=' text-4xl font-extrabold mt-16'>Fill Your Academic Details </p>
                    <p className="flex items-center text-xl font-medium gap-5  py-2 w-[550px] mt-[85px] ps-3 "
                        style={{
                            borderRadius: "10px",
                            border: "0.5px solid #8F8F8F"
                        }}
                    >
                        <span><img src={user} alt="icon" /></span>
                        <select className="w-full focus:outline-0 text-[#8F8F8FCC]" name="Year" id="Year">
                            <option selected >Year/Standard</option>
                            <option value="2000">2000</option>
                            <option value="2001">2001</option>
                            <option value="2002">2002</option>
                        </select>
                       
                    </p>

                    <p className="flex items-center text-xl font-medium gap-5  py-2 w-[550px] mt-[46px] ps-3 "
                        style={{
                            borderRadius: "10px",
                            border: "0.5px solid #8F8F8F"
                        }}
                    >
                        <span><img src={user} alt="icon" /></span>
                        <input className="w-full focus:outline-0" placeholder="Type your Course/Stream name here" type="text" name="TypeYourCourseOrStreamNameHere" />
                    </p>

                    <p className="flex items-center text-xl font-medium gap-5  py-2 w-[550px] mt-[46px] ps-3 "
                        style={{
                            borderRadius: "10px",
                            border: "0.5px solid #8F8F8F"
                        }}
                    >
                        <span><img src={user} alt="icon" /></span>
                        <input className="w-full focus:outline-0" placeholder="Type your School/College name here" type="text" name="TypeYourSchoolOrCollegeNameHere" />
                    </p>



                </div>

            </div>


            <div className='flex justify-between items-center mt-[200px] mx-20 mb-20'>
                <p className='text-[#065AD8] text-2xl font-bold'>Buy Course   ➡️ </p>
                <Link to='/studentSignUpUserDetails'
                    style={{
                        borderRadius: "10px",
                        border: "0.5px solid #8F8F8F"

                    }}
                    className="bg-[#065AD8] flex  text-xl font-bold text-[#fff]  justify-center py-2 w-[230px]">Next</Link>
            </div>



        </div >




    );
};

export default StudentSignUpAcademicDetails;

