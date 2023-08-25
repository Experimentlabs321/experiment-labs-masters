//ExpertMentorStudentFeedback

import React, { useContext, useState } from "react";
import Layout from "../Layout";
import "react-circular-progressbar/dist/styles.css";
import SearchIcon from '@mui/icons-material/Search';
import notification from '../../../assets/ExecutionMentor/notification.svg';
import IconNav from '../../../assets/ExpertMentorDashboard/Iconnav.svg';
import ranking from '../../../assets/ExpertMentorDashboard/ranking.svg';
import pace from '../../../assets/ExpertMentorDashboard/pace.png';
import AssignmentUpNev from "../ExecutionMentorAssignments/AssignmentUpNev";
import AssignmentRightNev from "../ExecutionMentorAssignments/AssignmentRightNev";

import Delivery from '../../../assets/ExecutionMentor/Delivery.png';
import Energy from '../../../assets/ExecutionMentor/Energy.png';
import Understanding from '../../../assets/ExecutionMentor/Understanding.png';
import Rating1 from '../../../assets/ExecutionMentor/Rating.svg';
import arrowBack from '../../../assets/ExecutionMentor/arrow-back.svg';
import Comments from '../../../assets/ExecutionMentor/Comments.svg';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import ForumTwoToneIcon from '@mui/icons-material/ForumTwoTone';


const ExpertMentorStudentFeedback = () => {
    const [selectedTab1, setSelectedTab1] = useState('All');

    const handleTabClick1 = (tab) => {
        setSelectedTab1(tab);
    };
    const [selectedTab2, setSelectedTab2] = useState('All');

    const handleTabClick2 = (tab) => {
        setSelectedTab2(tab);
    };





    return (
        <div>
            <Layout>



                <div className="px-20  py-4 flex items-center  fixed w-[100%] justify-between bg-[#FFF] top-0  border-b ">
                    <div>
                        <p className="flex items-center gap-2 text-lg font-semibold text-[#3E4DAC]"> Student Feedback</p>
                    </div>


                    <div className="flex items-center gap-5 me-80 ">
                        <div className=" p-2"
                            style={{
                                borderRadius: "8px",
                                background: "#F8F9FE",
                                boxShadow: "2px 2px 10px 0px rgba(149, 156, 225, 0.50)"
                            }}
                        >
                            <SearchIcon />
                            <input type="text rounded-lg p-2" placeholder="Search" />
                        </div>

                        <div>
                            <img src={IconNav} alt="Iconnav" />
                        </div>
                    </div>


                </div >

                <div className="mt-20 ms-10">
                    <p>
                        <select className="my-10 py-3 px-5 text-[#676767] text-lg font-semibold" name="" id=""
                            style={{
                                borderRadius: "8px",
                                background: "#F8F9FE",
                                boxShadow: "2px 2px 10px 0px rgba(149, 156, 225, 0.50)"
                            }}
                        >
                            <option value="Product lab">Product lab </option>
                            <option value="saab">Saab</option>
                            <option value="opel">Opel</option>
                            <option value="audi">Audi</option>
                        </select>
                    </p>

                    <p className="text-[#3E4DAC] text-xl font-bold">Curriculum With Dual Focus On Tech And Management </p>
                    <p className="text-[#3E4DAC] text-base font-medium mt-2">New Age Concentration</p>

                    <p className="text-[#3E4DAC] text-xl font-bold mt-10 flex items-center gap-3"><span><img src={ranking} alt="icon" /></span> Rating</p>

                </div>

                <div className="flex justify-between items-center">
                    <div className="mt-10">
                        <div className="flex justify-between items-center">
                            <div className='px-10 flex gap-10 pb-3 text-lg  '>
                                <button

                                    onClick={() => handleTabClick1('All')}
                                    style={{
                                        fontWeight: selectedTab1 === 'All' ? 'bold' : 'normal',
                                        borderBottom: selectedTab1 === 'All' ? '2px solid black' : 'none',
                                        color: selectedTab1 === 'All' ? '#081765' : '#BEBEBE'
                                    }}
                                >
                                    All
                                </button>
                                <button

                                    onClick={() => handleTabClick1('Labwise')}
                                    style={{
                                        fontWeight: selectedTab1 === 'Labwise' ? 'bold' : 'normal',
                                        borderBottom: selectedTab1 === 'Labwise' ? '2px solid black' : 'none',
                                        color: selectedTab1 === 'Labwise' ? '#081765' : '#BEBEBE'
                                    }}
                                >
                                    Labwise
                                </button>
                                <button

                                    onClick={() => handleTabClick1('Batchwise')}
                                    style={{
                                        fontWeight: selectedTab1 === 'Batchwise' ? 'bold' : 'normal',
                                        borderBottom: selectedTab1 === 'Batchwise' ? '2px solid black' : 'none',
                                        color: selectedTab1 === 'Batchwise' ? '#081765' : '#BEBEBE'
                                    }}
                                >
                                    Batchwise
                                </button>




                            </div>

                        </div>




                    </div>

                    <div className="mt-10 me-10">
                        <p>Total Students - 1000</p>
                    </div>

                </div>




                {
                    (selectedTab1 === 'All') && (
                        <>
                            <div className="mx-10 mb-10 ">
                                <div className="flex justify-between gap-5 items-center ">
                                    <div className="flex flex-col items-center h-[100%] justify-end">
                                        <div className="mb-[-40px]">
                                            <div><img src={pace} alt='' /></div>
                                        </div>
                                        <p className="text-lg font-bold">Pace</p>
                                        <div className="my-3">
                                            <Stack spacing={1}>
                                                <Rating size="large" name="half-rating" defaultValue={2.5} precision={0.5} />

                                            </Stack>
                                        </div>
                                        <p className="text-lg font-normal">20  students</p>
                                        <p className="text-lg font-normal">Needs Improvement </p>

                                        <p className="mt-3 text-lg font-bold">01.Truti Jain</p>
                                        <p className="text-[#8A8A8A] text-base">Product lab | Batch -3</p>
                                        <p className="text-[#8A8A8A] text-base">Week -3</p>

                                        <p className="mt-3 text-lg font-bold">01.Truti Jain</p>
                                        <p className="text-[#8A8A8A] text-base">Product lab | Batch -3</p>
                                        <p className="text-[#8A8A8A] text-base">Week -3</p>

                                        <p className="mt-3 text-lg font-bold">01.Truti Jain</p>
                                        <p className="text-[#8A8A8A] text-base">Product lab | Batch -3</p>
                                        <p className="text-[#8A8A8A] text-base">Week -3</p>

                                        <p className="mt-3 text-lg font-bold">01.Truti Jain</p>
                                        <p className="text-[#8A8A8A] text-base">Product lab | Batch -3</p>
                                        <p className="text-[#8A8A8A] text-base">Week -3</p>

                                        <p className="mt-3 text-lg font-bold">01.Truti Jain</p>
                                        <p className="text-[#8A8A8A] text-base">Product lab | Batch -3</p>
                                        <p className="text-[#8A8A8A] text-base">Week -3</p>

                                        <button className="bg-[#6278FF] rounded-md text-[#fff] text-base font-medium mt-5 px-10 py-2">View More</button>

                                    </div>

                                    <div className="flex flex-col items-center h-[100%] mt-8 justify-end">
                                        <div>
                                            <div><img src={Delivery} alt='' /></div>
                                        </div>
                                        <p className="text-lg font-bold">Delivery</p>
                                        <div className="my-3">
                                            <Stack spacing={1}>
                                                <Rating size="large" name="half-rating" defaultValue={2.5} precision={0.5} />

                                            </Stack>
                                        </div>
                                        <p className="text-lg font-normal">200  students</p>
                                        <p className="text-lg font-normal">Needs Improvement </p>

                                        <p className="mt-3 text-lg font-bold">01.Truti Jain</p>
                                        <p className="text-[#8A8A8A] text-base">Product lab | Batch -3</p>
                                        <p className="text-[#8A8A8A] text-base">Week -3</p>

                                        <p className="mt-3 text-lg font-bold">01.Truti Jain</p>
                                        <p className="text-[#8A8A8A] text-base">Product lab | Batch -3</p>
                                        <p className="text-[#8A8A8A] text-base">Week -3</p>

                                        <p className="mt-3 text-lg font-bold">01.Truti Jain</p>
                                        <p className="text-[#8A8A8A] text-base">Product lab | Batch -3</p>
                                        <p className="text-[#8A8A8A] text-base">Week -3</p>

                                        <p className="mt-3 text-lg font-bold">01.Truti Jain</p>
                                        <p className="text-[#8A8A8A] text-base">Product lab | Batch -3</p>
                                        <p className="text-[#8A8A8A] text-base">Week -3</p>

                                        <p className="mt-3 text-lg font-bold">01.Truti Jain</p>
                                        <p className="text-[#8A8A8A] text-base">Product lab | Batch -3</p>
                                        <p className="text-[#8A8A8A] text-base">Week -3</p>

                                        <button className="bg-[#6278FF] rounded-md text-[#fff] text-base font-medium mt-5 px-10 py-2">View More</button>

                                    </div>

                                    <div className="flex flex-col items-center h-[100%] mt-1 justify-end">
                                        <div>
                                            <div><img src={Energy} alt='' /></div>
                                        </div>
                                        <p className="text-lg font-bold">Energy</p>
                                        <div className="my-3">
                                            <Stack spacing={1}>
                                                <Rating size="large" name="half-rating" defaultValue={2.5} precision={0.5} />

                                            </Stack>
                                        </div>
                                        <p className="text-lg font-normal">200  students</p>
                                        <p className="text-lg font-normal">Needs Improvement </p>

                                        <p className="mt-3 text-lg font-bold">01.Truti Jain</p>
                                        <p className="text-[#8A8A8A] text-base">Product lab | Batch -3</p>
                                        <p className="text-[#8A8A8A] text-base">Week -3</p>

                                        <p className="mt-3 text-lg font-bold">01.Truti Jain</p>
                                        <p className="text-[#8A8A8A] text-base">Product lab | Batch -3</p>
                                        <p className="text-[#8A8A8A] text-base">Week -3</p>

                                        <p className="mt-3 text-lg font-bold">01.Truti Jain</p>
                                        <p className="text-[#8A8A8A] text-base">Product lab | Batch -3</p>
                                        <p className="text-[#8A8A8A] text-base">Week -3</p>

                                        <p className="mt-3 text-lg font-bold">01.Truti Jain</p>
                                        <p className="text-[#8A8A8A] text-base">Product lab | Batch -3</p>
                                        <p className="text-[#8A8A8A] text-base">Week -3</p>

                                        <p className="mt-3 text-lg font-bold">01.Truti Jain</p>
                                        <p className="text-[#8A8A8A] text-base">Product lab | Batch -3</p>
                                        <p className="text-[#8A8A8A] text-base">Week -3</p>

                                        <button className="bg-[#6278FF] rounded-md text-[#fff] text-base font-medium mt-5 px-10 py-2">View More</button>

                                    </div>

                                    <div className="flex flex-col items-center h-[100%] mt-10 justify-end">
                                        <div>
                                            <div><img src={Understanding} alt='' /></div>
                                        </div>
                                        <p className="text-lg font-bold">Understanding</p>
                                        <div className="my-3">
                                            <Stack spacing={1}>
                                                <Rating size="large" name="half-rating" defaultValue={2.5} precision={0.5} />

                                            </Stack>
                                        </div>
                                        <p className="text-lg font-normal">200  students</p>
                                        <p className="text-lg font-normal">Needs Improvement </p>

                                        <p className="mt-3 text-lg font-bold">01.Truti Jain</p>
                                        <p className="text-[#8A8A8A] text-base">Product lab | Batch -3</p>
                                        <p className="text-[#8A8A8A] text-base">Week -3</p>

                                        <p className="mt-3 text-lg font-bold">01.Truti Jain</p>
                                        <p className="text-[#8A8A8A] text-base">Product lab | Batch -3</p>
                                        <p className="text-[#8A8A8A] text-base">Week -3</p>

                                        <p className="mt-3 text-lg font-bold">01.Truti Jain</p>
                                        <p className="text-[#8A8A8A] text-base">Product lab | Batch -3</p>
                                        <p className="text-[#8A8A8A] text-base">Week -3</p>

                                        <p className="mt-3 text-lg font-bold">01.Truti Jain</p>
                                        <p className="text-[#8A8A8A] text-base">Product lab | Batch -3</p>
                                        <p className="text-[#8A8A8A] text-base">Week -3</p>

                                        <p className="mt-3 text-lg font-bold">01.Truti Jain</p>
                                        <p className="text-[#8A8A8A] text-base">Product lab | Batch -3</p>
                                        <p className="text-[#8A8A8A] text-base">Week -3</p>

                                        <button className="bg-[#6278FF] rounded-md text-[#fff] text-base font-medium mt-5 px-10 py-2">View More</button>

                                    </div>
                                </div>

                            </div>

                            <div className="flex  justify-between  mx-10 ">
                                <div className='pe-10 flex gap-10 pb-3 text-lg mt-10  '>
                                    <button
                                        onClick={() => handleTabClick2('All')}
                                        style={{
                                            fontWeight: selectedTab2 === 'All' ? 'bold' : 'normal',
                                            borderBottom: selectedTab2 === 'All' ? '2px solid black' : 'none',
                                            color: selectedTab2 === 'All' ? '#081765' : '#BEBEBE'
                                        }}
                                    >
                                        All
                                    </button>

                                    <button
                                        onClick={() => handleTabClick2('Labwise')}
                                        style={{
                                            fontWeight: selectedTab2 === 'Labwise' ? 'bold' : 'normal',
                                            borderBottom: selectedTab2 === 'Labwise' ? '2px solid black' : 'none',
                                            color: selectedTab2 === 'Labwise' ? '#081765' : '#BEBEBE'
                                        }}
                                    >
                                        Labwise
                                    </button>
                                    <button
                                        onClick={() => handleTabClick2('Batchwise')}
                                        style={{
                                            fontWeight: selectedTab2 === 'Batchwise' ? 'bold' : 'normal',
                                            borderBottom: selectedTab2 === 'Batchwise' ? '2px solid black' : 'none',
                                            color: selectedTab2 === 'Batchwise' ? '#081765' : '#BEBEBE'
                                        }}
                                    >
                                        Batchwise
                                    </button>

                                </div>
                                <div className="mt-10">
                                    <p className="bg-[#081765] text-sm font-semibold text-[#fff] px-5 py-1 rounded-lg "> Revert to all</p>
                                </div>

                            </div>

                            <div className="grid grid-cols-2 my-10 gap-10 overflow-auto h-[500px] mx-10">

                                <div className="p-5"
                                    style={{
                                        borderRadius: "10px",
                                        border: "1px solid #E3E3E3",
                                        background: "#FFF",
                                        boxShadow: "4px 4px 4px 0px rgba(0, 0, 0, 0.25)"
                                    }}
                                >
                                    <p className=" text-base font-semibold">Delivery of content was  understandable </p>
                                    <p className="text-[#838383] text-base font-normal my-2">Product Lab | Batch 3</p>
                                    <p className="flex justify-between text-[#838383] text-base font-normal mt-5   "> Mahima Negi <span> 11.45 am</span></p>
                                </div>
                                <div className="p-5"
                                    style={{
                                        borderRadius: "10px",
                                        border: "1px solid #E3E3E3",
                                        background: "#FFF",
                                        boxShadow: "4px 4px 4px 0px rgba(0, 0, 0, 0.25)"
                                    }}
                                >
                                    <p className=" text-base font-semibold">Delivery of content was  understandable </p>
                                    <p className="text-[#838383] text-base font-normal my-2">Product Lab | Batch 3</p>
                                    <p className="flex justify-between text-[#838383] text-base font-normal mt-5   "> Mahima Negi <span> 11.45 am</span></p>
                                </div>
                                <div className="p-5"
                                    style={{
                                        borderRadius: "10px",
                                        border: "1px solid #E3E3E3",
                                        background: "#FFF",
                                        boxShadow: "4px 4px 4px 0px rgba(0, 0, 0, 0.25)"
                                    }}
                                >
                                    <p className=" text-base font-semibold">Delivery of content was  understandable </p>
                                    <p className="text-[#838383] text-base font-normal my-2">Product Lab | Batch 3</p>
                                    <p className="flex justify-between text-[#838383] text-base font-normal mt-5   "> Mahima Negi <span> 11.45 am</span></p>
                                </div>
                                <div className="p-5"
                                    style={{
                                        borderRadius: "10px",
                                        border: "1px solid #E3E3E3",
                                        background: "#FFF",
                                        boxShadow: "4px 4px 4px 0px rgba(0, 0, 0, 0.25)"
                                    }}
                                >
                                    <p className=" text-base font-semibold">Delivery of content was  understandable </p>
                                    <p className="text-[#838383] text-base font-normal my-2">Product Lab | Batch 3</p>
                                    <p className="flex justify-between text-[#838383] text-base font-normal mt-5   "> Mahima Negi <span> 11.45 am</span></p>
                                </div>
                                <div className="p-5"
                                    style={{
                                        borderRadius: "10px",
                                        border: "1px solid #E3E3E3",
                                        background: "#FFF",
                                        boxShadow: "4px 4px 4px 0px rgba(0, 0, 0, 0.25)"
                                    }}
                                >
                                    <p className=" text-base font-semibold">Delivery of content was  understandable </p>
                                    <p className="text-[#838383] text-base font-normal my-2">Product Lab | Batch 3</p>
                                    <p className="flex justify-between text-[#838383] text-base font-normal mt-5   "> Mahima Negi <span> 11.45 am</span></p>
                                </div>
                                <div className="p-5"
                                    style={{
                                        borderRadius: "10px",
                                        border: "1px solid #E3E3E3",
                                        background: "#FFF",
                                        boxShadow: "4px 4px 4px 0px rgba(0, 0, 0, 0.25)"
                                    }}
                                >
                                    <p className=" text-base font-semibold">Delivery of content was  understandable </p>
                                    <p className="text-[#838383] text-base font-normal my-2">Product Lab | Batch 3</p>
                                    <p className="flex justify-between text-[#838383] text-base font-normal mt-5   "> Mahima Negi <span> 11.45 am</span></p>
                                </div>
                                <div className="p-5"
                                    style={{
                                        borderRadius: "10px",
                                        border: "1px solid #E3E3E3",
                                        background: "#FFF",
                                        boxShadow: "4px 4px 4px 0px rgba(0, 0, 0, 0.25)"
                                    }}
                                >
                                    <p className=" text-base font-semibold">Delivery of content was  understandable </p>
                                    <p className="text-[#838383] text-base font-normal my-2">Product Lab | Batch 3</p>
                                    <p className="flex justify-between text-[#838383] text-base font-normal mt-5   "> Mahima Negi <span> 11.45 am</span></p>
                                </div>
                                <div className="p-5"
                                    style={{
                                        borderRadius: "10px",
                                        border: "1px solid #E3E3E3",
                                        background: "#FFF",
                                        boxShadow: "4px 4px 4px 0px rgba(0, 0, 0, 0.25)"
                                    }}
                                >
                                    <p className=" text-base font-semibold">Delivery of content was  understandable </p>
                                    <p className="text-[#838383] text-base font-normal my-2">Product Lab | Batch 3</p>
                                    <p className="flex justify-between text-[#838383] text-base font-normal mt-5   "> Mahima Negi <span> 11.45 am</span></p>
                                </div>

                            </div>


                        </>
                    )
                }

            </Layout>
        </div >




    );
};

export default ExpertMentorStudentFeedback;

