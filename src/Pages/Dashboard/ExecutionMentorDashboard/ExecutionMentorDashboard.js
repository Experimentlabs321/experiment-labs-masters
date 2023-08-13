
import React, { useContext, useState } from "react";
import Layout from "../Layout";
import { Link } from "react-router-dom";
import AssignmentUpNev from "../ExecutionMentorAssignments/AssignmentUpNev";
import AssignmentRightNev from "../ExecutionMentorAssignments/AssignmentRightNev";
import hand from '../../../assets/ExecutionMentor/hand.png';
import HumaaansSpace from '../../../assets/ExecutionMentor/HumaaansSpace.png';
import arrowDown from '../../../assets/ExecutionMentor/arrowDown.svg';
import arrowRight from '../../../assets/ExecutionMentor/arrowRight.svg';
import arrowRight1 from '../../../assets/ExecutionMentor/arrowRight1.svg';

import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

Chart.register({
    id: 'category',
    afterUpdate(scale) {
        const maxTicks = scale._maxTicks;
        const maxTicksLimit = scale.options.maxTicksLimit;

        if (maxTicks && maxTicks !== maxTicksLimit) {
            scale.options.ticks.stepSize = Math.ceil(maxTicks / maxTicksLimit);
        }
    },
});




const ExecutionMentorDashboard = () => {

    ///
    const [day, setDay] = useState('Monthly');

    const handleChange = (event) => {
        setDay(event.target.value);
    };

    ////////

    const Monthly = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    const Weekly = ['Sat', 'Sun', 'Mon', 'Tus', 'Wed', 'Thu', 'Fri'];
    const Daily = ['Sat', 'Sun', 'Mon', 'Tus', 'Wed', 'Thu', 'Fri'];

    let labels;
    if (day === 'Monthly') {
        labels = Monthly;
    }
    else if (day === 'Weekly') {
        labels = Weekly;
    }
    else if (day === 'Daily') {
        labels = Daily;
    }

    const data = {

        labels: labels,
        datasets: [
            {
                label: '',
                data: [2.8, 0.5, 1, 5, 2, 2.5, 3, 3.5, 4],
                fill: true,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1,

            },
        ],
    };

    const config = {
        type: 'line',
        data: data,
        options: {
            scales: {
                x: {
                    type: 'category', // Use the 'category' scale for the x-axis
                },
            },
        },
    };





    return (
        <div>
            <Layout>



                <div className=''>

                    <AssignmentUpNev page={''} />

                </div>


                <div className="flex mt-24">
                    <div className="w-full ms-10 mt-10">
                        <div className=" flex items-center text-[#fff]"
                            style={{
                                borderRadius: "20px",
                                background: "linear-gradient(129deg, #6176FA 0%, #394694 100%)"
                            }}
                        >
                            <div className="p-5 ">
                                <p className="flex gap-5 text-[35px] font-bold">Welcome back, Shekhar <span><img src={hand} alt=" " /></span> </p>
                                <p className="text-[15px] font-normal">You’re on the right track and work through all of your feedbacks to keep yourself up to date.<Link to='/performanceFeedback' className="border-b font-bold"> View all</Link></p>
                            </div>
                            <div className="">
                                <div className="w-full">
                                    <img className="w-[100%]" src={HumaaansSpace} alt="HumaaansSpace" />
                                </div>


                            </div>

                        </div>

                        <div className="mt-10 flex gap-10">
                            <div className="w-full">
                                <div className="flex justify-between items-center mb-5">
                                    <p className="text-[15px] font-bold">Your Performance</p>
                                    <p>  <FormControl sx={{ m: 1, minWidth: 80 }} size="small">
                                        <InputLabel id="demo-select-small-label">Overall</InputLabel>
                                        <Select
                                            labelId="demo-select-small-label"
                                            id="demo-select-small"
                                            value={day}
                                            label="day"
                                            onChange={handleChange}
                                        >
                                            <MenuItem value={'Daily'}>Daily</MenuItem>
                                            <MenuItem value={'Weekly'}>Weekly</MenuItem>
                                            <MenuItem value={'Monthly'}>Monthly</MenuItem>
                                        </Select>
                                    </FormControl></p>
                                    {/* <p className="flex items-center gap-2 text-[13px] font-bold text-[#8A8A8A]">Overall <span><img src={arrowDown} alt="arrowDown" /></span></p> */}
                                </div>

                                <Line
                                    style={{ width: '100%' }}
                                    data={config.data}
                                    options={config.options} />



                                {/*  <LineChart
                                    style={chartStyle}
                                    xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                                    series={[
                                        {
                                            data: [2, 5.5, 2, 8.5, 1.5, 5],
                                            area: true,
                                        },
                                    ]}
                                    // width={700}
                                    height={355}
                                /> */}
                            </div>

                            <div className="w-[50%]">
                                <div className="flex justify-between items-center">
                                    <p className="text-[15px] font-bold">Progress</p>
                                    <p className="flex items-center gap-2 text-[13px] font-bold text-[#8A8A8A]">View all <span><img src={arrowDown} alt="arrowDown" /></span></p>
                                </div>
                                <div className="overflow-auto h-[300px] mt-5">


                                    <div className="flex justify-between items-center mt-5">
                                        <div>
                                            <p className="text-[15px] font-bold">Punctual</p>
                                            <p className="text-[10px] font-bold text-[#8A8A8A]">Chapter 3</p>
                                        </div>
                                        <div className="w-[20%]">

                                            <CircularProgressbar
                                                value={60}
                                                text={`${60}%`}
                                                strokeWidth={10}
                                            />
                                        </div>
                                    </div>


                                    <div className="flex justify-between items-center mt-5">
                                        <div>
                                            <p className="text-[15px] font-bold">Task completion </p>
                                            <p className="text-[10px] font-bold text-[#8A8A8A]">Chapter 4</p>
                                        </div>
                                        <div className="w-[20%]">

                                            <CircularProgressbar
                                                value={60}
                                                text={`${60}%`}
                                                strokeWidth={10}
                                            />
                                        </div>
                                    </div>


                                    <div className="flex justify-between items-center mt-5">
                                        <div>
                                            <p className="text-[15px] font-bold">Understanding</p>
                                            <p className="text-[10px] font-bold text-[#8A8A8A]">Chapter 3</p>
                                        </div>
                                        <div className="w-[20%]">

                                            <CircularProgressbar
                                                value={60}
                                                text={`${60}%`}
                                                strokeWidth={10}
                                            />
                                        </div>
                                    </div>


                                    <div className="flex justify-between items-center mt-5">
                                        <div>
                                            <p className="text-[15px] font-bold">On point</p>
                                            <p className="text-[10px] font-bold text-[#8A8A8A]">Chapter 5</p>
                                        </div>
                                        <div className="w-[20%]">

                                            <CircularProgressbar
                                                value={60}
                                                text={`${60}%`}
                                                strokeWidth={10}
                                            />
                                        </div>
                                    </div>

                                </div>

                            </div>


                        </div>


                        <div className="flex justify-between items-center my-10">
                            <p className="text-[15px] font-bold">Performance of the Students</p>
                            <Link to='/students' className="flex items-center gap-2 text-[13px] font-bold text-[#8A8A8A]">View all <span><img src={arrowDown} alt="arrowDown" /></span></Link>
                        </div>

                        <div className="w-[100%] h-[30px] text-[#fff] flex ">
                            <div className="w-[70%] bg-[#081765] flex items-center justify-center rounded-s-xl">70%</div>
                            <div className="w-[10%] bg-[#2063DA] flex items-center justify-center rounded-s-xl ms-[-10px]"></div>
                            <div className="w-[5%] bg-[#BEC9FF] flex items-center justify-center rounded-s-xl ms-[-10px]"></div>
                            <div className="w-[15%] bg-[#F0F7FF] flex items-center justify-center rounded-xl ms-[-10px]"></div>

                        </div>

                        <div className="grid grid-cols-2 gap-10 mt-10">

                            <div className=" bg-[#081765] text-[#fff] p-2 flex justify-between items-center rounded-xl text-sm font-semibold">
                                <p>Students, who are right on track</p>
                                <p className="flex items-center gap-4">25 <span><img src={arrowRight1} alt='' /></span></p>
                            </div>

                            <div className="bg-[#BEC9FF]  p-2 flex justify-between items-center rounded-xl text-sm font-semibold">
                                <p>Students, who are willing to improve</p>
                                <p className="flex items-center gap-4">25 <span><img src={arrowRight} alt='' /></span></p>
                            </div>

                            <div className=" bg-[#2063DA] text-[#fff] p-2 flex justify-between items-center rounded-xl text-sm font-semibold">
                                <p>Students, who need guidance</p>
                                <p className="flex items-center gap-4">25 <span><img src={arrowRight1} alt='' /></span></p>
                            </div>

                            <div className=" bg-[#F0F7FF] p-2 flex justify-between items-center rounded-xl text-sm font-semibold">
                                <p>Students, who need guidance right away</p>
                                <p className="flex items-center gap-4">25 <span><img src={arrowRight} alt='' /></span></p>
                            </div>


                        </div>
                        <div className="flex justify-between items-center my-10">
                            <p className="text-[15px] font-bold">Students who need more guidance and attention</p>
                            <Link  to='/studentsWhoNeedMoreGuidance' className="flex items-center gap-2 text-[13px] font-bold text-[#8A8A8A]">View all <span><img src={arrowDown} alt="arrowDown" /></span></Link>
                        </div>

                        <div className="flex gap-5 w-full">

                            <div className="w-[100%] flex justify-between py-5 mt-5 rounded-[20px] text-[#fff] bg-[#E90000]">
                                <div className="flex gap-3 ">
                                    <div className=" w-[40px] bg-[#fff] text-[#000] rounded-full flex items-center justify-center ms-5">
                                        <p className="text-[15px] font-bold">JA</p>
                                    </div>
                                    <div className="mt-1">
                                        <p className="text-[15px] font-bold">Janki Akhandiya</p>
                                        <p className="text-[10px] font-bold">9.6/10 points</p>
                                    </div>
                                </div>

                                <div className="me-5 text-[10px] font-semibold flex items-end">
                                    <p>View Profile</p>
                                </div>
                            </div>

                            <div className="w-[100%] flex justify-between py-5 mt-5 rounded-[20px] text-[#fff] bg-[#E90000]">
                                <div className="flex gap-3 ">
                                    <div className=" w-[40px] bg-[#fff] text-[#000] rounded-full flex items-center justify-center ms-5">
                                        <p className="text-[15px] font-bold">JA</p>
                                    </div>
                                    <div className="mt-1">
                                        <p className="text-[15px] font-bold">Janki Akhandiya</p>
                                        <p className="text-[10px] font-bold">9.6/10 points</p>
                                    </div>
                                </div>

                                <div className="me-5 text-[10px] font-semibold flex items-end">
                                    <p>View Profile</p>
                                </div>
                            </div>

                            <div className="w-[100%] flex justify-between py-5 mt-5 rounded-[20px] text-[#fff] bg-[#E90000]">
                                <div className="flex gap-3 ">
                                    <div className=" w-[40px] bg-[#fff] text-[#000] rounded-full flex items-center justify-center ms-5">
                                        <p className="text-[15px] font-bold">JA</p>
                                    </div>
                                    <div className="mt-1">
                                        <p className="text-[15px] font-bold">Janki Akhandiya</p>
                                        <p className="text-[10px] font-bold">9.6/10 points</p>
                                    </div>
                                </div>

                                <div className="me-5 text-[10px] font-semibold flex items-end">
                                    <p>View Profile</p>
                                </div>
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

export default ExecutionMentorDashboard;

