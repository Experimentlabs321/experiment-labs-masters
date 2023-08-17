//UnpaidStudentDashboard

import React, { useContext, useState } from "react";
import Layout from "../Layout";
import bg1 from "../../../assets/UnpaidStudentDashboard/bg1.png"
import bg2 from "../../../assets/UnpaidStudentDashboard/bg2.png"
import gift from "../../../assets/UnpaidStudentDashboard/gift.png"
import arrow from "../../../assets/UnpaidStudentDashboard/arrow.svg"
import arrow2 from "../../../assets/UnpaidStudentDashboard/arrow2.svg"
import icon from "../../../assets/UnpaidStudentDashboard/icon.png"
import courseImage from "../../../assets/UnpaidStudentDashboard/courseImage.png"
import image1 from "../../../assets/UnpaidStudentDashboard/image1.png"
import image2 from "../../../assets/UnpaidStudentDashboard/image2.png"
import image3 from "../../../assets/UnpaidStudentDashboard/image3.png"
import image4 from "../../../assets/UnpaidStudentDashboard/image4.png"
import ForwardIcon from '@mui/icons-material/Forward';





const UnpaidStudentDashboard = () => {
    const [hero, setHero] = useState(true)

    return (

        <div>
            <Layout>
                {hero && (
                    <div className="mx-10  my-10 rounded-2xl "
                        style={{
                            backgroundImage: `url(${bg1})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            width: '95%',
                            height: '335px',
                        }}
                    >

                        <div className="flex justify-between items-center ">
                            <div className="flex items-center text-[#fff] text-3xl font-extrabold mt-20 w-[60%] ms-10">
                                <img src={gift} alt="icon" />
                                <p>Get Exciting Offers to Unbox and Redeem</p>
                            </div>
                            <div onClick={() => setHero(false)} className="mt-20 me-5">
                                <img src={arrow} alt='' />
                            </div>
                        </div>
                        <div className="flex justify-end w-full ">
                            <p className="flex items-center gap-5 me-10 text-[#fff] text-base font-medium"><img src={icon} alt="icon" />Experiment Labs</p>
                        </div>



                    </div>)
                }

                {
                    !hero && (
                        <div className="mx-10  my-10 rounded-2xl"
                            style={{
                                backgroundImage: `url(${bg2})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                width: '95%',
                                height: '335px',
                            }}
                        >


                            <div className="flex justify-between items-center ">
                                <div onClick={() => setHero(true)} className="mt-[150px] me-5">
                                    <img src={arrow2} alt='' />
                                </div>
                                <div className="mt-[120px] text-[#fff] text-3xl font-extrabold p-5 rounded-s-lg  w-[60%] ms-10"
                                    style={{ background: "rgba(0, 0, 0, 0.70)" }}
                                >

                                    <p className="w-[70%]">Enhance your Industry Skills along with academics</p>
                                    <div className="flex justify-end w-full ">
                                        <p className="flex items-center gap-5 me-10 text-[#fff] text-base font-medium"><img src={icon} alt="icon" />Experiment Labs</p>
                                    </div>

                                </div>

                            </div>




                        </div>)
                }

                <div className="ms-10 my-10">
                    <p className="text-[#001246] text-lg font-semibold">All Courses</p>
                </div>

                <div className="flex justify-between mx-12 my-10 gap-4">


                    <div
                        className=" p-5"
                        style={{
                            borderRadius: "20px",
                            background: "#F6F7FF",
                            boxShadow: "4.021121978759766px 4.021121978759766px 10px 0px rgba(39, 39, 39, 0.15)"
                        }}
                    >
                        <div><img src={courseImage} alt="img" /></div>
                        <div className="flex justify-between items-center my-4">
                            <div>
                                <p className="text-[#3E4DAC] text-base font-semibold">Course Name</p>
                                <p className="text-[#7A7A7A] text-xs font-medium mt-3">Course Description</p>
                            </div>
                            <div>
                                <button
                                    className="py-2 px-3 text-xs font-semibold"
                                    style={{
                                        borderRadius: "16.166px",
                                        border: "0.5px solid #8F8F8F",
                                        background: "#FFDB70"
                                    }}
                                >Enroll Now
                                </button>
                            </div>
                        </div>
                        <div className="flex justify-between">
                            <button
                                className="py-2 px-3 text-xs font-semibold"
                                style={{
                                    borderRadius: "16.166px",
                                    border: "0.5px solid #8F8F8F",
                                    background: "#E1D7FF"
                                }}
                            >Course Category
                            </button>
                            <button
                                className=" px-3 py-2 text-xs font-semibold"
                                style={{
                                    borderRadius: "16.166px",
                                    border: "0.5px solid #8F8F8F",
                                    background: "#CEDBFF"
                                }}
                            >Rs.  20,000/-
                            </button>

                        </div>
                    </div>


                    <div
                        className=" p-5"
                        style={{
                            borderRadius: "20px",
                            background: "#F6F7FF",
                            boxShadow: "4.021121978759766px 4.021121978759766px 10px 0px rgba(39, 39, 39, 0.15)"
                        }}
                    >
                        <div><img src={courseImage} alt="img" /></div>
                        <div className="flex justify-between items-center my-4">
                            <div>
                                <p className="text-[#3E4DAC] text-base font-semibold">Course Name</p>
                                <p className="text-[#7A7A7A] text-xs font-medium mt-3">Course Description</p>
                            </div>
                            <div>
                                <button
                                    className="py-2 px-3 text-xs font-semibold"
                                    style={{
                                        borderRadius: "16.166px",
                                        border: "0.5px solid #8F8F8F",
                                        background: "#FFDB70"
                                    }}
                                >Enroll Now
                                </button>
                            </div>
                        </div>
                        <div className="flex justify-between">
                            <button
                                className="py-2 px-3 text-xs font-semibold"
                                style={{
                                    borderRadius: "16.166px",
                                    border: "0.5px solid #8F8F8F",
                                    background: "#E1D7FF"
                                }}
                            >Course Category
                            </button>
                            <button
                                className=" px-3 py-2 text-xs font-semibold"
                                style={{
                                    borderRadius: "16.166px",
                                    border: "0.5px solid #8F8F8F",
                                    background: "#CEDBFF"
                                }}
                            >Rs.  20,000/-
                            </button>

                        </div>
                    </div>


                    <div
                        className=" p-5"
                        style={{
                            borderRadius: "20px",
                            background: "#F6F7FF",
                            boxShadow: "4.021121978759766px 4.021121978759766px 10px 0px rgba(39, 39, 39, 0.15)"
                        }}
                    >
                        <div><img src={courseImage} alt="img" /></div>
                        <div className="flex justify-between items-center my-4">
                            <div>
                                <p className="text-[#3E4DAC] text-base font-semibold">Course Name</p>
                                <p className="text-[#7A7A7A] text-xs font-medium mt-3">Course Description</p>
                            </div>
                            <div>
                                <button
                                    className="py-2 px-3 text-xs font-semibold"
                                    style={{
                                        borderRadius: "16.166px",
                                        border: "0.5px solid #8F8F8F",
                                        background: "#FFDB70"
                                    }}
                                >Enroll Now
                                </button>
                            </div>
                        </div>
                        <div className="flex justify-between">
                            <button
                                className="py-2 px-3 text-xs font-semibold"
                                style={{
                                    borderRadius: "16.166px",
                                    border: "0.5px solid #8F8F8F",
                                    background: "#E1D7FF"
                                }}
                            >Course Category
                            </button>
                            <button
                                className=" px-3 py-2 text-xs font-semibold"
                                style={{
                                    borderRadius: "16.166px",
                                    border: "0.5px solid #8F8F8F",
                                    background: "#CEDBFF"
                                }}
                            >Rs.  20,000/-
                            </button>

                        </div>
                    </div>

                </div>
                <div className="mb-10 flex justify-end">
                    <p className="flex items-center gap-2 px-4 py-1 text-[13px] font-semibold me-6"
                    style={{borderRadius: "16.166px",
                        border: "1px solid #3E4DAC"}}
                    > View All <span><ForwardIcon/></span></p>
                </div>

                <div className="ms-10 mt-10 mb-40">
                    <p className="text-[#001246] text-lg font-semibold">Key Features</p>
                </div>

                <div className="w-full h-[110px]"
                style={{background: "rgba(62, 77, 172, 0.29)"
                }}
                >

                </div>

                <div className="flex mx-20 justify-between gap-10 mt-[-200px]">

                    <div className=" flex flex-col items-center justify-between w-[100%] h-[270px] p-3"
                    style={{borderRadius: "15px",
                        border: "1px solid #CECECE",
                        background: "#FFF",
                        boxShadow: "6px 6px 20px 0px rgba(0, 0, 0, 0.25)"}}
                    >
                        <div className="mt-[-50px]"><img src={image1} alt="image"/></div>
                        <div className="text-center">
                            <p className="text-lg font-semibold">Get a chance to book <span className="text-[#6278FF] text-lg font-bold">your preferred time slots</span></p>
                        </div>
                    </div>

                    <div className=" flex flex-col items-center justify-between w-[100%] h-[270px] p-3"
                    style={{borderRadius: "15px",
                        border: "1px solid #CECECE",
                        background: "#FFF",
                        boxShadow: "6px 6px 20px 0px rgba(0, 0, 0, 0.25)"}}
                    >
                        <div className="mt-[-90px]"><img src={image2} alt="image"/></div>
                        <div className="text-center">
                            <p className="text-lg font-semibold">See your <span className="text-[#6278FF] text-lg font-bold">National, State, City and Class Performance</span> and <span className="text-[#6278FF] text-lg font-bold">Rank</span></p>
                        </div>
                    </div>

                    <div className=" flex flex-col items-center justify-between w-[100%] h-[270px] p-3"
                    style={{borderRadius: "15px",
                        border: "1px solid #CECECE",
                        background: "#FFF",
                        boxShadow: "6px 6px 20px 0px rgba(0, 0, 0, 0.25)"}}
                    >
                        <div className="mt-[-50px]"><img src={image3} alt="image"/></div>
                        <div className="text-center">
                            <p className="text-lg font-semibold">Earn points from classes, assignments, etc, and get a chance to turn them into <span className="text-[#6278FF] text-lg font-bold">Real Cash</span></p>
                        </div>
                    </div>

                   

                </div>

                <div className="ms-10 my-20">
                    <p className="text-[#001246] text-lg font-semibold">Your Vision</p>
                </div>

                <div className="h-[300px] my-10 mx-10 flex gap-20 items-center justify-between "
                    style={{
                        borderRadius: "15px",
                        border: "1px solid #CECECE",
                        background: "rgba(50, 51, 79, 0.80)",
                        boxShadow: " 4px 4px 10px 0px rgba(0, 0, 0, 0.25)"
                    }}
                >

                    <div className="rounded-lg w-full ms-20">
                       
                            <img src={image4}  alt="img" />
                            
                        
                       

                    </div>

                    <div className=" text-[#fff] text-lg font-semibold h-[200px] w-full rounded-xl">
                       <p>Our Vision is to revolutionize education through gamified learning and immersive experiences, empowering students to develop essential skills via constant mentorship, explore career options, and earn rewards while unlocking their full potential.</p>
                    </div>

                    <div className="flex items-start me-16 h-[100%] mt-20 w-[10%]">
                        <div className="">
                            <p className="flex"><img src={icon}  alt="icon" /></p>
                           
                        </div>
                    </div>

                </div>







            </Layout>
        </div >




    );
};

export default UnpaidStudentDashboard;

