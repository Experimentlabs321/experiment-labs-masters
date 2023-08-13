//StudentFeedback


import React, { useContext, useState } from "react";
import Layout from "../Layout";
import { Link } from "react-router-dom";
import AssignmentUpNev from "../ExecutionMentorAssignments/AssignmentUpNev";
import AssignmentRightNev from "../ExecutionMentorAssignments/AssignmentRightNev";
import pace from '../../../assets/ExecutionMentor/pace.png';
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





const StudentFeedback = () => {
    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    /*---------1------ */
    const [selectedTab1, setSelectedTab1] = useState('All');

    const handleTabClick1 = (tab) => {
        setSelectedTab1(tab);
    };
    /*---------2------ */
    const [selectedTab2, setSelectedTab2] = useState('All');

    const handleTabClick2 = (tab) => {
        setSelectedTab2(tab);
    };

    return (

        <div>
            <Layout>



                <div className=''>

                    <AssignmentUpNev page={''} />

                </div>


                <div className="flex mt-24">
                    <div className="w-full ms-5 mt-10">



                        <div className="w-full ">
                            <div className="flex justify-between items-center mb-5">
                                <Link to='/students' className="text-[20px] font-bold flex items-center gap-2 text-[#001246]"><span><img src={arrowBack} alt="icon" /></span>Mentor Feedback</Link>

                                <div className="flex gap-5 ">
                                    <p>Total Students - 1000</p>
                                </div>
                            </div>

                        </div>

                        <div>
                            <FormControl sx={{ m: 1, minWidth: 150 }} size="small">
                                <InputLabel id="demo-select-small-label">Product lab</InputLabel>
                                <Select
                                    labelId="demo-select-small-label"
                                    id="demo-select-small"
                                    value={age}
                                    label="Age"
                                    onChange={handleChange}
                                >
                                    <MenuItem value="">

                                    </MenuItem>
                                    <MenuItem selected value={10}>Product lab</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>
                        </div>

                        <div className="mt-10  ">
                            <p className="text-[#081765] text-[20px] font-bold">Curriculum With Dual Focus On Tech And Management</p>
                            <p className="text-[#081765] text-[18px] font-bold mt-4">New Age Concentrations</p>
                            <p className="flex  gap-5 items-center text-[#2063DA] text-xl font-bold mt-10"><img src={Rating1} alt="icon" /> Rating</p>
                        </div>


                        <div className="flex  justify-between  ">
                            <div className='pe-10 flex gap-10 pb-3 text-lg mt-10  '>
                                <Link to='/studentFeedback'
                                    onClick={() => handleTabClick1('All')}
                                    style={{
                                        fontWeight: selectedTab1 === 'All' ? 'bold' : 'normal',
                                        borderBottom: selectedTab1 === 'All' ? '2px solid black' : 'none',
                                        color: selectedTab1 === 'All' ? '#081765' : '#BEBEBE'
                                    }}
                                >
                                    All
                                </Link>

                                <Link to=''
                                    onClick={() => handleTabClick1('Labwise')}
                                    style={{
                                        fontWeight: selectedTab1 === 'Labwise' ? 'bold' : 'normal',
                                        borderBottom: selectedTab1 === 'Labwise' ? '2px solid black' : 'none',
                                        color: selectedTab1 === 'Labwise' ? '#081765' : '#BEBEBE'
                                    }}
                                >
                                    Labwise
                                </Link>
                                <Link to=''
                                    onClick={() => handleTabClick1('Batchwise')}
                                    style={{
                                        fontWeight: selectedTab1 === 'Batchwise' ? 'bold' : 'normal',
                                        borderBottom: selectedTab1 === 'Batchwise' ? '2px solid black' : 'none',
                                        color: selectedTab1 === 'Batchwise' ? '#081765' : '#BEBEBE'
                                    }}
                                >
                                    Batchwise
                                </Link>

                            </div>
                            <div className="mt-10">
                                <p> Total Students - 1000</p>
                            </div>

                        </div>

                        <div className="flex justify-between gap-5 items-center ">
                            <div className="flex flex-col items-center h-[300px] justify-end">
                                <div className="mb-[-40px]">
                                    <div><img src={pace} alt='' /></div>
                                </div>
                                <p className="text-lg font-bold">Pace</p>
                                <div className="my-3">
                                    <Stack spacing={1}>
                                        <Rating size="large" name="half-rating" defaultValue={2.5} precision={0.5} />

                                    </Stack>
                                </div>
                                <p className="text-lg font-normal">200  students</p>

                            </div>

                            <div className="flex flex-col items-center h-[300px] justify-end">
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

                            </div>

                            <div className="flex flex-col items-center h-[300px] justify-end">
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

                            </div>

                            <div className="flex flex-col items-center h-[300px] justify-end">
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

                            </div>
                        </div>

                        <div className="my-10">
                            <p className="text-[#081765] text-[20px] font-bold"> <ForumTwoToneIcon /> Comments</p>
                        </div>

                        <div className="flex  justify-between  ">
                            <div className='pe-10 flex gap-10 pb-3 text-lg mt-10  '>
                                <Link to='/studentFeedback'
                                    onClick={() => handleTabClick2('All')}
                                    style={{
                                        fontWeight: selectedTab2 === 'All' ? 'bold' : 'normal',
                                        borderBottom: selectedTab2 === 'All' ? '2px solid black' : 'none',
                                        color: selectedTab2 === 'All' ? '#081765' : '#BEBEBE'
                                    }}
                                >
                                    All
                                </Link>

                                <Link to=''
                                    onClick={() => handleTabClick2('Labwise')}
                                    style={{
                                        fontWeight: selectedTab2 === 'Labwise' ? 'bold' : 'normal',
                                        borderBottom: selectedTab2 === 'Labwise' ? '2px solid black' : 'none',
                                        color: selectedTab2 === 'Labwise' ? '#081765' : '#BEBEBE'
                                    }}
                                >
                                    Labwise
                                </Link>
                                <Link to=''
                                    onClick={() => handleTabClick2('Batchwise')}
                                    style={{
                                        fontWeight: selectedTab2 === 'Batchwise' ? 'bold' : 'normal',
                                        borderBottom: selectedTab2 === 'Batchwise' ? '2px solid black' : 'none',
                                        color: selectedTab2 === 'Batchwise' ? '#081765' : '#BEBEBE'
                                    }}
                                >
                                    Batchwise
                                </Link>

                            </div>
                            <div className="mt-10">
                                <p className="bg-[#081765] text-sm font-semibold text-[#fff] px-5 py-1 rounded-lg "> Revert to all</p>
                            </div>

                        </div>

                        <div className="grid grid-cols-2 my-10 gap-10 overflow-auto h-[500px]">

                            <div className="p-5"
                            style={{borderRadius: "10px",
                                border: "1px solid #E3E3E3",
                                background: "#FFF",
                                boxShadow: "4px 4px 4px 0px rgba(0, 0, 0, 0.25)"}}
                            >
                                <p className=" text-base font-semibold">Delivery of content was  understandable </p>
                                <p className="text-[#838383] text-base font-normal my-2">Product Lab | Batch 3</p>
                                <p className="flex justify-between text-[#838383] text-base font-normal mt-5   "> Mahima Negi <span> 11.45 am</span></p>
                            </div>
                            <div className="p-5"
                            style={{borderRadius: "10px",
                                border: "1px solid #E3E3E3",
                                background: "#FFF",
                                boxShadow: "4px 4px 4px 0px rgba(0, 0, 0, 0.25)"}}
                            >
                                <p className=" text-base font-semibold">Delivery of content was  understandable </p>
                                <p className="text-[#838383] text-base font-normal my-2">Product Lab | Batch 3</p>
                                <p className="flex justify-between text-[#838383] text-base font-normal mt-5   "> Mahima Negi <span> 11.45 am</span></p>
                            </div>
                            <div className="p-5"
                            style={{borderRadius: "10px",
                                border: "1px solid #E3E3E3",
                                background: "#FFF",
                                boxShadow: "4px 4px 4px 0px rgba(0, 0, 0, 0.25)"}}
                            >
                                <p className=" text-base font-semibold">Delivery of content was  understandable </p>
                                <p className="text-[#838383] text-base font-normal my-2">Product Lab | Batch 3</p>
                                <p className="flex justify-between text-[#838383] text-base font-normal mt-5   "> Mahima Negi <span> 11.45 am</span></p>
                            </div>
                            <div className="p-5"
                            style={{borderRadius: "10px",
                                border: "1px solid #E3E3E3",
                                background: "#FFF",
                                boxShadow: "4px 4px 4px 0px rgba(0, 0, 0, 0.25)"}}
                            >
                                <p className=" text-base font-semibold">Delivery of content was  understandable </p>
                                <p className="text-[#838383] text-base font-normal my-2">Product Lab | Batch 3</p>
                                <p className="flex justify-between text-[#838383] text-base font-normal mt-5   "> Mahima Negi <span> 11.45 am</span></p>
                            </div>
                            <div className="p-5"
                            style={{borderRadius: "10px",
                                border: "1px solid #E3E3E3",
                                background: "#FFF",
                                boxShadow: "4px 4px 4px 0px rgba(0, 0, 0, 0.25)"}}
                            >
                                <p className=" text-base font-semibold">Delivery of content was  understandable </p>
                                <p className="text-[#838383] text-base font-normal my-2">Product Lab | Batch 3</p>
                                <p className="flex justify-between text-[#838383] text-base font-normal mt-5   "> Mahima Negi <span> 11.45 am</span></p>
                            </div>
                            <div className="p-5"
                            style={{borderRadius: "10px",
                                border: "1px solid #E3E3E3",
                                background: "#FFF",
                                boxShadow: "4px 4px 4px 0px rgba(0, 0, 0, 0.25)"}}
                            >
                                <p className=" text-base font-semibold">Delivery of content was  understandable </p>
                                <p className="text-[#838383] text-base font-normal my-2">Product Lab | Batch 3</p>
                                <p className="flex justify-between text-[#838383] text-base font-normal mt-5   "> Mahima Negi <span> 11.45 am</span></p>
                            </div>
                            <div className="p-5"
                            style={{borderRadius: "10px",
                                border: "1px solid #E3E3E3",
                                background: "#FFF",
                                boxShadow: "4px 4px 4px 0px rgba(0, 0, 0, 0.25)"}}
                            >
                                <p className=" text-base font-semibold">Delivery of content was  understandable </p>
                                <p className="text-[#838383] text-base font-normal my-2">Product Lab | Batch 3</p>
                                <p className="flex justify-between text-[#838383] text-base font-normal mt-5   "> Mahima Negi <span> 11.45 am</span></p>
                            </div>
                            <div className="p-5"
                            style={{borderRadius: "10px",
                                border: "1px solid #E3E3E3",
                                background: "#FFF",
                                boxShadow: "4px 4px 4px 0px rgba(0, 0, 0, 0.25)"}}
                            >
                                <p className=" text-base font-semibold">Delivery of content was  understandable </p>
                                <p className="text-[#838383] text-base font-normal my-2">Product Lab | Batch 3</p>
                                <p className="flex justify-between text-[#838383] text-base font-normal mt-5   "> Mahima Negi <span> 11.45 am</span></p>
                            </div>

                        </div>



                    </div>


                    <div>
                        <AssignmentRightNev />

                    </div>


                </div>




            </Layout>
        </div >




    );
};

export default StudentFeedback;

