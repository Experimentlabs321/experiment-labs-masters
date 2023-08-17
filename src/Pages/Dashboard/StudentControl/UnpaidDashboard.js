//StudentControlDashboard

import React, { useContext, useState } from "react";
import Layout from "../Layout";
import { Link } from "react-router-dom";
import Badge from '@mui/material/Badge';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import filter from "../../../assets/ExecutionMentor/filter.svg"
import gift from "../../../assets/UnpaidStudentDashboard/gift.png";
import arrow from "../../../assets/UnpaidStudentDashboard/arrow.svg";
import arrow2 from "../../../assets/UnpaidStudentDashboard/arrow2.svg";
import icon from "../../../assets/UnpaidStudentDashboard/icon.png";
import mdi_camera from "../../../assets/UnpaidStudentDashboard/mdi_camera.svg";
import mdi_camera1 from "../../../assets/UnpaidStudentDashboard/mdi_camera1.svg";
import tablerEdit from "../../../assets/UnpaidStudentDashboard/tablerEdit.svg";
import imageAdd from "../../../assets/UnpaidStudentDashboard/imageAdd.svg";
import imageAdd1 from "../../../assets/UnpaidStudentDashboard/imageAdd1.svg";
import delete1 from "../../../assets/UnpaidStudentDashboard/delete.svg";
import edit from "../../../assets/UnpaidStudentDashboard/edit.svg";
import add from "../../../assets/UnpaidStudentDashboard/add.svg";
import videoAdd from "../../../assets/UnpaidStudentDashboard/videoAdd.svg";
import icon1 from "../../../assets/UnpaidStudentDashboard/icon1.png";




const UnpaidDashboard = () => {


    const [selectedTab1, setSelectedTab1] = useState('manageStudentDashboard');

    const handleTabClick1 = (tab) => {
        setSelectedTab1(tab);
    };

    ///
    const [selectedTab2, setSelectedTab2] = useState('unpaidDashboard');

    const handleTabClick2 = (tab) => {
        setSelectedTab2(tab);
    };




    return (
        <div>
            <Layout>
                <div className='flex items-center justify-center gap-7 pt-20 lg:pt-10 '>
                    <div className="UserManagement origin-top-left rotate-[-0.51deg] text-zinc-500 text-[30px] font-medium">Student Control</div>
                    <div className="Input w-[425px] h-16 relative bg-slate-100 rounded-[40px] shadow-inner">
                        <input className="Search w-[329px] left-[32px] top-[12px] absolute text-zinc-500 text-[20px] font-light leading-10 bg-transparent focus:outline-0" placeholder='Search' />
                        <div className="Button w-10 h-10 left-[373px] top-[12px] absolute bg-zinc-500 rounded-[32px] shadow">
                            <SearchIcon className="Search1 w-6 h-6 left-[8px] top-[8px] absolute text-white" />
                        </div>
                    </div>
                    <Badge badgeContent={1} color='error'>
                        <NotificationsIcon color="action" />
                    </Badge>
                </div>

                <div className="w-full">
                    <div className="flex justify-between items-center">
                        <div className='px-10 flex gap-10 pb-3 text-lg mt-10  '>
                            <Link to='/manageStudentDashboard'

                                onClick={() => handleTabClick1('manageStudentDashboard')}
                                style={{
                                    borderRadius: "8px",
                                    border: "1px solid #D9D9D9",
                                    boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                                    padding: "8px",
                                    fontWeight: selectedTab1 === 'manageStudentDashboard' ? 'bold' : 'normal',

                                    backgroundColor: selectedTab1 === 'manageStudentDashboard' ? '#93D6F6' : '#BEBEBE'
                                }}
                            >
                                Manage Student  Dashboard
                            </Link>

                            <Link to='/manageStudents'

                                onClick={() => handleTabClick1('manageStudents')}
                                style={{
                                    borderRadius: "8px",
                                    border: "1px solid #D9D9D9",
                                    boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                                    padding: "8px",
                                    fontWeight: selectedTab1 === 'manageStudents' ? 'bold' : 'normal',

                                    backgroundColor: setSelectedTab1 === 'manageStudents' ? '#93D6F6' : 'none'
                                }}
                            >
                                Manage Students
                            </Link>

                        </div>

                    </div>




                </div>

                <div className="w-full">
                    <div className="flex justify-between items-center">
                        <div className='px-10 flex gap-10 pb-3 text-lg mt-10  '>
                            <Link to='/studentControl'
                                onClick={() => handleTabClick2('studentControlDashboard')}
                                style={{
                                    fontWeight: selectedTab2 === 'studentControlDashboard' ? 'bold' : 'normal',
                                    borderBottom: selectedTab2 === 'studentControlDashboard' ? '2px solid #0A98EA' : 'none',
                                    color: selectedTab2 === 'studentControlDashboard' ? '#0A98EA' : '#BEBEBE'
                                }}
                            >
                                Paid Dashboard
                            </Link>

                            <Link to='/unpaidDashboard'
                                onClick={() => handleTabClick2('unpaidDashboard')}
                                style={{
                                    fontWeight: selectedTab2 === 'unpaidDashboard' ? 'bold' : 'normal',
                                    borderBottom: selectedTab2 === 'unpaidDashboard' ? '2px solid #0A98EA' : 'none',

                                    color: selectedTab2 === 'unpaidDashboard' ? '#0A98EA' : '#BEBEBE'
                                }}
                            >
                                Unpaid Dashboard
                            </Link>

                        </div>

                    </div>




                </div>

                <div className="mx-10  my-10 rounded-2xl bg-[#C4C4C4]"
                    style={{
                        // backgroundImage: `url(${bg1})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        width: '95%',
                        height: '335px',
                    }}
                >

                    <div className="flex justify-between items-center ">
                        <div className="flex flex-col justify-center items-center   w-[90%] ms-10">
                            {/* <img src={gift} alt="icon" /> */}
                            <span className="text-[90px] mb-[-90px] ms-[130px] text-[#8F8F8F]">+</span>
                            <p className="flex flex-col items-center text-[#fff] text-3xl font-extrabold"> <img src={mdi_camera} alt='icon' />Upload Your Web banner : Image/Video/Offers</p>
                        </div>
                        <div className="mt-20 me-5">
                            <img src={arrow} alt='' />
                        </div>
                    </div>
                    <div className="flex justify-end items-center gap-2 w-full  ">
                        <div className="mt-2">
                            <p className="flex"><img src={mdi_camera1} alt="icon" /><span className="mt-[-13px] ms-[-5px] text-3xl text-[#8F8F8F]">+</span></p>
                            <p className="text-[#fff] text-[10px] font-medium">Logo</p>
                        </div>

                        <p className="flex items-center gap-5 text-[#fff] text-base font-medium">Company name</p>
                        <p className="me-10"><img src={tablerEdit} alt="icon" /></p>
                    </div>



                </div>

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
                        <div className="bg-[#D9D9D9] h-[230px] flex flex-col justify-center items-center rounded-lg">
                            <img src={imageAdd} alt="img" />
                            <p className="text-[#8F8F8F] text-sm font-medium w-[50%]">Tap to Upload Course Image</p>
                        </div>
                        <div className="flex gap-3 justify-end my-2">
                            <p><img src={delete1} alt="icon" /></p>
                            <p><img src={edit} alt="icon" /></p>

                        </div>
                        <div className="flex justify-between gap-5 items-center  mb-4">
                            <div>
                                <p className="text-[#3E4DAC] text-base font-semibold">Course Name</p>
                                <p className="text-[#7A7A7A] text-xs font-medium mt-3">Course Description</p>
                            </div>
                            <div>

                            </div>
                        </div>
                        <div className="flex justify-between gap-5">
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
                            >price
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
                        <div className="bg-[#D9D9D9] h-[230px] flex flex-col justify-center items-center rounded-lg">
                            <img src={imageAdd} alt="img" />
                            <p className="text-[#8F8F8F] text-sm font-medium w-[50%]">Tap to Upload Course Image</p>
                        </div>
                        <div className="flex gap-3 justify-end my-2">
                            <p><img src={delete1} alt="icon" /></p>
                            <p><img src={edit} alt="icon" /></p>

                        </div>
                        <div className="flex justify-between gap-5 items-center  mb-4">
                            <div>
                                <p className="text-[#3E4DAC] text-base font-semibold">Course Name</p>
                                <p className="text-[#7A7A7A] text-xs font-medium mt-3">Course Description</p>
                            </div>
                            <div>

                            </div>
                        </div>
                        <div className="flex justify-between gap-5">
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
                            >price
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
                        <div className="bg-[#D9D9D9] h-[230px] flex flex-col justify-center items-center rounded-lg">
                            <img src={imageAdd} alt="img" />
                            <p className="text-[#8F8F8F] text-sm font-medium w-[50%]">Tap to Upload Course Image</p>
                        </div>
                        <div className="flex gap-3 justify-end my-2">
                            <p><img src={delete1} alt="icon" /></p>
                            <p><img src={edit} alt="icon" /></p>

                        </div>
                        <div className="flex justify-between gap-5 items-center  mb-4">
                            <div>
                                <p className="text-[#3E4DAC] text-base font-semibold">Course Name</p>
                                <p className="text-[#7A7A7A] text-xs font-medium mt-3">Course Description</p>
                            </div>
                            <div>

                            </div>
                        </div>
                        <div className="flex justify-between gap-5">
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
                            >price
                            </button>

                        </div>
                    </div>


                    <div className="flex items-end">
                        <p className=" flex items-center p-1 text-base gap-2 font-normal"
                            style={{
                                borderRadius: "8px",
                                border: "1px solid var(--neutral-300, #BFBFBF)",
                                background: "var(--white, #FFF)"
                            }}
                        >Select courses to display <span><img src={add} alt="icon" /></span> </p>
                    </div>

                </div>

                <div className="ms-10 mt-10 mb-[300px]">
                    <p className="text-[#001246] text-lg font-semibold">Key Features</p>
                </div>


                <div className="flex mx-20 justify-between gap-10 mt-[-200px] mb-10">

                    <div className=" flex flex-col items-center justify-between w-[100%] h-[270px] p-3"
                        style={{
                            borderRadius: "15px",
                            border: "1px solid #CECECE",
                            background: "#FFF",
                            boxShadow: "6px 6px 20px 0px rgba(0, 0, 0, 0.25)"
                        }}
                    >


                        <div className="bg-[#D9D9D9] w-[70%] h-[230px] flex flex-col justify-center items-center rounded-lg mt-[-100px]">
                            <img src={imageAdd} alt="img" />
                            <p className="text-[#8F8F8F] text-sm font-medium w-[60%] text-center">Tap to Upload Course Image</p>
                        </div>
                        <div className="flex gap-3 justify-end my-2 w-full me-10">
                            <p><img src={delete1} alt="icon" /></p>
                            <p><img src={edit} alt="icon" /></p>

                        </div>


                        <div className="text-center mb-3">
                            <p className="text-lg font-semibold text-[#8F8F8F]">Feature Description</p>
                        </div>
                    </div>


                    <div className=" flex flex-col items-center justify-between w-[100%] h-[270px] p-3"
                        style={{
                            borderRadius: "15px",
                            border: "1px solid #CECECE",
                            background: "#FFF",
                            boxShadow: "6px 6px 20px 0px rgba(0, 0, 0, 0.25)"
                        }}
                    >


                        <div className="bg-[#D9D9D9] w-[70%] h-[230px] flex flex-col justify-center items-center rounded-lg mt-[-100px]">
                            <img src={imageAdd} alt="img" />
                            <p className="text-[#8F8F8F] text-sm font-medium w-[60%] text-center">Tap to Upload Course Image</p>
                        </div>
                        <div className="flex gap-3 justify-end my-2 w-full me-10">
                            <p><img src={delete1} alt="icon" /></p>
                            <p><img src={edit} alt="icon" /></p>

                        </div>


                        <div className="text-center mb-3">
                            <p className="text-lg font-semibold text-[#8F8F8F]">Feature Description</p>
                        </div>
                    </div>

                    <div className=" flex flex-col items-center justify-between w-[100%] h-[270px] p-3"
                        style={{
                            borderRadius: "15px",
                            border: "1px solid #CECECE",
                            background: "#FFF",
                            boxShadow: "6px 6px 20px 0px rgba(0, 0, 0, 0.25)"
                        }}
                    >


                        <div className="bg-[#D9D9D9] h-[230px] w-[70%] flex flex-col justify-center items-center rounded-lg mt-[-100px]">
                            <img src={imageAdd} alt="img" />
                            <p className="text-[#8F8F8F] text-sm font-medium w-[60%] text-center">Tap to Upload Course Image</p>
                        </div>
                        <div className="flex gap-3 justify-end my-2 w-full me-10">
                            <p><img src={delete1} alt="icon" /></p>
                            <p><img src={edit} alt="icon" /></p>

                        </div>


                        <div className="text-center mb-3">
                            <p className="text-lg font-semibold text-[#8F8F8F]">Feature Description</p>
                        </div>
                    </div>


                </div>

                <div className=" w-full flex justify-end mb-10">

                    <p className=" flex gap-2 items-center py-1 px-3 text-base font-normal me-20"
                        style={{
                            borderRadius: "8px",
                            border: "1px solid var(--neutral-300, #BFBFBF)",
                            background: "var(--white, #FFF)"
                        }}
                    >Add more <span><img src={add} alt="icon" /></span> </p>

                </div>

                <div className="ms-10 my-20">
                    <p className="text-[#001246] text-lg font-semibold">Your Vision</p>
                </div>

                <div className="h-[290px] my-10 mx-10 flex gap-20 items-center justify-between "
                    style={{
                        borderRadius: "15px",
                        border: "1px solid #CECECE",
                        background: "rgba(50, 51, 79, 0.80)",
                        boxShadow: " 4px 4px 10px 0px rgba(0, 0, 0, 0.25)"
                    }}
                >

                    <div className="bg-[#D9D9D9]  h-[370px]  rounded-lg w-full ms-20">
                        <div className="flex flex-col h-[85%] justify-center items-center">
                            <img src={imageAdd} alt="img" />
                            <p className="text-[#8F8F8F] text-sm font-medium w-[60%] text-center">Tap to Upload Image</p>
                        </div>
                        <div className="flex gap-3 justify-end my-2 w-full ">
                            <p><img src={delete1} alt="icon" /></p>
                            <p className="me-10"><img src={edit} alt="icon" /></p>

                        </div>

                    </div>

                    <div className=" bg-[#D9D9D9] h-[200px] w-full rounded-xl">
                        <input
                            style={{
                                background: "rgba(217, 217, 217, 0.50)"
                            }}
                            className="h-[200px] w-full rounded-xl" type="text" placeholder="Write your Vision here....|" />
                    </div>

                    <div className="flex items-start me-16 h-[100%] mt-20">
                        <div className="">
                            <p className="flex"><img src={mdi_camera1} alt="icon" /></p>
                            <p className="text-[#fff] text-[10px] font-medium">Logo</p>
                        </div>
                    </div>

                </div>


                <div className="ms-10 mt-28 mb-20">
                    <p className="text-[#001246] text-lg font-semibold">Student Reviews/Testimonials</p>
                </div>

                <div className="flex ms-10">

                    <p className=" flex gap-2 items-center py-1 px-3 text-base font-normal me-20"
                        style={{
                            borderRadius: "8px",
                            border: "1px solid var(--neutral-300, #BFBFBF)",
                            background: "var(--white, #FFF)"
                        }}
                    >Add Image <span><img src={add} alt="icon" /></span> </p>

                    <p className=" flex gap-2 items-center py-1 px-3 text-base font-normal me-20"
                        style={{
                            borderRadius: "8px",
                            border: "1px solid var(--neutral-300, #BFBFBF)",
                            background: "var(--white, #FFF)"
                        }}
                    >Add Video <span><img src={add} alt="icon" /></span> </p>
                    <p className=" flex gap-2 items-center py-1 px-3 text-base font-normal me-20"
                        style={{
                            borderRadius: "8px",
                            border: "1px solid var(--neutral-300, #BFBFBF)",
                            background: "var(--white, #FFF)"
                        }}
                    >Add Testimonial<span><img src={add} alt="icon" /></span> </p>

                </div>

                <div className="flex justify-between gap-10 my-10 mx-10">


                    <div className="w-full rounded-xl"
                        style={{
                            border: "2px solid rgba(148, 164, 255, 1)"
                        }}
                    >

                        <div className="bg-[#D9D9D9] rounded-lg h-[200px] ">
                            <div className="flex flex-col h-[85%] justify-center items-center">
                                <img src={videoAdd} alt="img" />
                                <p className="text-[#8F8F8F] text-sm font-medium w-[60%] text-center">Upload Video </p>
                            </div>
                            <div className="flex gap-3 justify-end my-2 w-full ">
                                <p><img src={delete1} alt="icon" /></p>
                                <p className="me-10"><img src={edit} alt="icon" /></p>

                            </div>

                        </div>


                        <div className="text-[#8F8F8F] text-lg font-bold ms-10 mt-5 mb-10">
                            <p className="">Type Description here</p>
                        </div>
                    </div>

                    <div className="w-full rounded-xl"
                        style={{
                            border: "2px solid rgba(148, 164, 255, 1)"
                        }}
                    >

                        <div className="bg-[#D9D9D9] rounded-lg h-[200px] ">
                            <div className="flex flex-col h-[85%] justify-center items-center">
                                <img src={imageAdd1} alt="img" />
                                <p className="text-[#8F8F8F] text-sm font-medium w-[60%] text-center">Upload Image </p>
                            </div>
                            <div className="flex gap-3 justify-end my-2 w-full ">
                                <p><img src={delete1} alt="icon" /></p>
                                <p className="me-10"><img src={edit} alt="icon" /></p>

                            </div>

                        </div>


                        <div className="text-[#8F8F8F] text-lg font-bold ms-10 mt-5 mb-10">
                            <p className="">Type Description here</p>
                        </div>
                    </div>

                    <div className="w-full rounded-xl p-5"
                        style={{
                            border: "1px solid #CECECE",
                            background: "#FFF",
                            boxShadow: "4px 4px 10px 0px rgba(0, 0, 0, 0.25)"
                        }}
                    >
                        <div className="flex gap-2">
                            <div>
                                <img src={icon1} alt="icon"/>
                            </div>
                            <div className="mt-10">
                                <p className="text-[#001246] text-base font-extrabold"> Student Name</p>
                                <p className="text-[#8F8F8F] text-sm font-semibold">Class</p>
                                <p className="text-[#8F8F8F] text-sm font-semibold">Course Type/Category</p>
                            </div>
                        </div>
                        <div className="mt-5">
                            <p className="">Testimonial.........................................</p>
                        </div>

                    </div>

                </div>





            </Layout >
        </div >




    );
};

export default UnpaidDashboard;

