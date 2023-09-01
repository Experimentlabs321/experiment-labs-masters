//StudentSignUpPricePlans



import icon from '../../../../assets/LoginPage/icon.png';
import React, { useContext, useState } from "react";
import image6 from '../../../../assets/LoginPage/image6.png';
import movieLab from '../../../../assets/LoginPage/movieLab.png';
import EntrepreneurshipLab from '../../../../assets/LoginPage/EntrepreneurshipLab.png';
import ProductLab from '../../../../assets/LoginPage/ProductLab.png';
import ChampionsClub from '../../../../assets/LoginPage/Championsclub.png';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';




const StudentSignUpPricePlans = () => {



    const [monthly, setMonthly] = useState(false);
    const [yearly, setYearly] = useState(true);


    const toggleSelection1 = () => {
        setMonthly(true);
        setYearly(false)
    };
    const toggleSelection2 = () => {
        setMonthly(false);
        setYearly(true)
    };





    return (
        <div className=" flex flex-col">
            <div className='h-[470px] '
                style={{
                    background: "var(--downgl, linear-gradient(180deg, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.27) 35.55%, rgba(0, 0, 0, 0.00) 100%), #6278FF)",
                }}
            >
                <div className='flex justify-between mx-20 mt-[50px]'>
                    <p className="flex items-center text-3xl font-semibold gap-2 text-[#fff] "><Link to='/studentSignUpSelectCourses' ><ArrowBackIcon /></Link> <span><img src={icon} alt="icon" /></span>Experiment Labs
                    </p>
                    <p className='text-[#fff] text-2xl font-bold'>
                        Skip <span> <ArrowForwardIcon /></span>
                    </p>
                </div>

                <div className='flex justify-center items-center mt-[50px]'>
                    <p className=' text-[40px] font-extrabold ms-[300px] text-[#fff]'>Select your Price Plans  </p>
                    <p className='py-3 px-2 text-sm font-semibold ms-[180px]'
                        style={{
                            borderRadius: "30px",
                            background: "#FFF",
                            boxShadow: "4px 4px 8px 0px rgba(0, 0, 0, 0.25) inset"
                        }}
                    ><span
                        onClick={toggleSelection1}
                        className={`${monthly ? 'bg-[#6177FC] py-2 px-5 rounded-[30px] text-[#fff]' : 'px-1'}`}>Monthly</span>
                        <span
                            onClick={toggleSelection2}
                            className={`${yearly ? 'bg-[#6177FC] py-2 px-5 rounded-[30px] text-[#fff]' : 'px-1'}`}>Yearly</span></p>
                </div>
            </div>


            <div className='h-[450px]'
                style={{
                    backgroundImage: `url(${image6})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    minHeight: "40vh"
                }}
            >
                <div className="flex">
                    <div className="w-[100%] flex flex-col items-center mt-[-230px]">

                        <div className='w-full  '>
                            <div className='flex gap-[40px] mx-[90px] '>
                                <div className='h-[100%] w-[60%]'
                                    style={{
                                        background: "#FFF",
                                        boxShadow: "10px 10px 20px 0px rgba(0, 0, 0, 0.25)"
                                    }}
                                >
                                    <p className='text-base font-semibold text-center mt-9'>One Course</p>
                                    <p className='text-[40px] font-extrabold text-center mt-4'>Rs. 30,000</p>
                                    <p className='text-sm font-semibold text-center mt-3 text-[#8F8F8F]'>Yearly</p>
                                    <div className='flex justify-center mt-[40px]'>
                                        <p className=' text-center text-[#fff] w-[120px] py-2 font-semibold'
                                            style={{
                                                border: "0.5px solid #8F8F8F",
                                                background: "#065AD8"
                                            }}
                                        >
                                            Get Started
                                        </p>
                                    </div>
                                    <div className=' ms-[50px] my-[40px] text-[#282828] text-sm font-semibold flex flex-col gap-2'>
                                        <p>✔️ Duration</p>
                                        <p>✔️ Eligibility </p>
                                        <p>✔️ Unlimited Industry Projects</p>
                                        <p>✔️ Live Class sessions</p>
                                        <p>✔️ Mentor guidance throughout</p>
                                        <p>✔️ Land into Actual Sales</p>
                                        <p>✔️ Get a chance of Recognition</p>
                                    </div>






                                </div>
                                <div className='h-[100%] w-[60%]'
                                    style={{
                                        background: "#FFF",
                                        boxShadow: "10px 10px 20px 0px rgba(0, 0, 0, 0.25)"
                                    }}
                                >
                                    <p className='text-base font-semibold text-center mt-9'>Multiple Courses- upto 3</p>
                                    <p className='text-[40px] font-extrabold text-center mt-4'>Rs. 60,000</p>
                                    <p className='text-sm font-semibold text-center mt-3 text-[#8F8F8F]'>Yearly</p>
                                    <div className='flex justify-center mt-[40px]'>
                                        <p className=' text-center text-[#fff] w-[120px] py-2 font-semibold'
                                            style={{
                                                border: "0.5px solid #8F8F8F",
                                                background: "#065AD8"
                                            }}
                                        >
                                            Get Started
                                        </p>
                                    </div>
                                    <div className=' ms-[50px] my-[40px] text-[#282828] text-sm font-semibold flex flex-col gap-2'>
                                        <p>✔️ Duration</p>
                                        <p>✔️ Eligibility </p>
                                        <p>✔️ Unlimited Industry Projects</p>
                                        <p>✔️ Live Class sessions</p>
                                        <p>✔️ Mentor guidance throughout</p>
                                        <p>✔️ Land into Actual Sales</p>
                                        <p>✔️ Get a chance of Recognition</p>
                                        <p>✔️ Get a chance of Recognition</p>
                                        <p>✔️ Get a chance of Recognition</p>
                                    </div>






                                </div>
                                <div className='h-[100%] w-[60%]'
                                    style={{
                                        background: "#FFF",
                                        boxShadow: "10px 10px 20px 0px rgba(0, 0, 0, 0.25)"
                                    }}
                                >
                                    <p className='text-base font-semibold text-center mt-9'>All Courses Pack</p>
                                    <p className='text-[40px] font-extrabold text-center mt-4'>Rs. 90,000</p>
                                    <p className='text-sm font-semibold text-center mt-3 text-[#8F8F8F]'>Yearly</p>
                                    <div className='flex justify-center mt-[40px]'>
                                        <p className=' text-center text-[#fff] w-[120px] py-2 font-semibold'
                                            style={{
                                                border: "0.5px solid #8F8F8F",
                                                background: "#065AD8"
                                            }}
                                        >
                                            Get Started
                                        </p>
                                    </div>
                                    <div className=' ms-[50px] my-[40px] text-[#282828] text-sm font-semibold flex flex-col gap-2'>
                                        <p>✔️ Duration</p>
                                        <p>✔️ Eligibility </p>
                                        <p>✔️ Unlimited Industry Projects</p>
                                        <p>✔️ Live Class sessions</p>
                                        <p>✔️ Mentor guidance throughout</p>
                                        <p>✔️ Land into Actual Sales</p>
                                        <p>✔️ Get a chance of Recognition</p>
                                        <p>✔️ Get a chance of Recognition</p>
                                        <p>✔️ Get a chance of Recognition</p>
                                        <p>✔️ Get a chance of Recognition</p>
                                        <p>✔️ Get a chance of Recognition</p>
                                    </div>






                                </div>
                               




                            </div>

                        </div>



                    </div>

                </div>

            </div>






        </div >




    );
};

export default StudentSignUpPricePlans;

