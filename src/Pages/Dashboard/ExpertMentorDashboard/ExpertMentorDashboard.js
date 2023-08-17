//ExpertMentorDashboard

import React, { useContext, useState } from "react";
import Layout from "../Layout";
import ExpertMentorUpNev from "./ExpertMentorUpNev";
import ExpertMentorRightNev from "./ExpertMentorRightNev";
import img1 from '../../../assets/ExpertMentorDashboard/img1.png';
import img2 from '../../../assets/ExpertMentorDashboard/img2.svg';
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import ReactApexChart from 'react-apexcharts';


const ExpertMentorDashboard = () => {

    const [seeAll, setSeeAll] = useState(false);
    const series = [
        {
            name: 'series1',
            data: [0, 75, 40, 90, 51]
        },

    ];

    const options = {
        chart: {
            height: 350,
            type: 'area'
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth'
        },
        xaxis: {
            type: 'text',
            categories: [
                " ",
                "Peace",
                "Energy",
                "Delivery",
                "Understanding",

            ]
        },
        /*   tooltip: {
              x: {
                  format: 'dd/MM/yy HH:mm'
              }
          } */
    };




    return (
        <div>
            <Layout>



                <div className=''>

                    <ExpertMentorUpNev page={''} />

                </div>


                <div className="flex mt-24">
                    <div className="w-full ms-10 mt-10">

                        <div className="bg-[#F8F9FE] flex items-center rounded-2xl gap-8 px-10 py-2">
                            <div>
                                <img src={img1} alt="image" />
                            </div>
                            <div>
                                <p className="text-[#404EA6] text-2xl font-bold">WELCOME !</p>
                                <p className="text-[#191B1D] text-lg font-bold">
                                    How about Grab a Coffee/Tea and start your day with knowing more about your self via student feedbacks. Congratulations for your commendable guidance 🥳
                                </p>
                            </div>
                        </div>

                        <div className="text-[#404EA6] font-bold text-lg my-10">
                            <p>Feedback</p>
                        </div>

                        {!seeAll && (
                            <div className="bg-[#F8F9FE] rounded-2xl flex gap-5 justify-between py-8 px-5">

                                <div className='text-sm font-normal '>
                                    <div className='flex gap-3 items-center '>
                                        <p className='rounded-full bg-[#3076FF] h-[10px] w-[10px]'></p>
                                        <p className="text-base font-medium">Batch-1</p>

                                    </div>
                                    <p className='ms-5 text-base font-medium '>Week-1</p>
                                    <p className='ms-5 text-base font-medium text-[#979797]'>20 participants</p>

                                </div>

                                <div className='text-sm font-normal'>
                                    <div className='flex gap-3 items-center '>
                                        <p className='rounded-full bg-[#3076FF] h-[10px] w-[10px]'></p>
                                        <p className="text-base font-medium">Batch-1</p>

                                    </div>
                                    <p className='ms-5 text-base font-medium '>Week-1</p>
                                    <p className='ms-5 text-base font-medium text-[#979797]'>20 participants</p>

                                </div>

                                <div className='text-sm font-normal'>
                                    <div className='flex gap-3 items-center '>
                                        <p className='rounded-full bg-[#3076FF] h-[10px] w-[10px]'></p>
                                        <p className="text-base font-medium">Batch-1</p>

                                    </div>
                                    <p className='ms-5 text-base font-medium '>Week-1</p>
                                    <p className='ms-5 text-base font-medium text-[#979797]'>20 participants</p>

                                </div>
                                <div className=' flex justify-center items-center'>

                                    <button onClick={() => setSeeAll(true)} className="bg-[#3076FF] text-[#fff] px-10 py-2 text-sm font-bold rounded-md">See all</button>
                                </div>
                                <div className=' flex justify-center items-center'>

                                    <button className="bg-[#3076FF] text-[#fff] px-10 py-2 text-sm font-bold rounded-md">See Previous Feedback</button>
                                </div>

                            </div>
                        )

                        }

                        {
                            seeAll && (

                                <div className="mt-10 flex gap-10">
                                    <div className="w-full">

                                        <div id="chart">
                                            <ReactApexChart options={options} series={series} type="area" height={350} />
                                        </div>





                                    </div>

                                    <div className="w-[50%]">


                                        <div className="flex gap-10  items-center mt-5">

                                            <div className="w-[15%]">

                                                <CircularProgressbar
                                                    value={60}
                                                    text={`${60}%`}
                                                    strokeWidth={10}
                                                    styles={{
                                                        path: {
                                                            stroke: '#404EA6',
                                                        },
                                                    }}
                                                />
                                            </div>
                                            <div>
                                                <p className="text-[15px] font-bold text-[#404EA6]">Pace</p>

                                            </div>

                                        </div>


                                        <div className="flex gap-10  items-center mt-5">

                                            <div className="w-[15%]">

                                                <CircularProgressbar
                                                    value={60}
                                                    text={`${60}%`}
                                                    strokeWidth={10}
                                                    styles={{
                                                        path: {
                                                            stroke: '#404EA6',
                                                        },
                                                    }}
                                                />
                                            </div>
                                            <div>
                                                <p className="text-[15px] font-bold text-[#404EA6]">Energy</p>

                                            </div>

                                        </div>


                                        <div className="flex gap-10  items-center mt-5">

                                            <div className="w-[15%]">

                                                <CircularProgressbar
                                                    value={60}
                                                    text={`${60}%`}
                                                    strokeWidth={10}
                                                    styles={{
                                                        path: {
                                                            stroke: '#404EA6',
                                                        },
                                                    }}
                                                />
                                            </div>
                                            <div>
                                                <p className="text-[15px] font-bold text-[#404EA6]">Delivery</p>

                                            </div>

                                        </div>

                                        <div className="flex gap-10  items-center mt-5">

                                            <div className="w-[15%]">

                                                <CircularProgressbar
                                                    value={60}
                                                    text={`${60}%`}
                                                    strokeWidth={10}
                                                    styles={{
                                                        path: {
                                                            stroke: '#404EA6',
                                                        },
                                                    }}
                                                />
                                            </div>
                                            <div>
                                                <p className="text-[15px] font-bold text-[#404EA6]">Understanding</p>

                                            </div>

                                        </div>

                                    </div>


                                </div>
                            )
                        }




                        <div className="my-10 flex justify-between gap-10">

                            <div className='w-full p-5'
                                style={{
                                    borderRadius: "16px",
                                    border: "1px solid #EAEAEA",
                                    background: "var(--primary-100, #FFF)",
                                    boxShadow: "4px 4px 10px 0px rgba(0, 0, 0, 0.25)"
                                }}
                            >
                                <p className='text-center text-lg font-bold mb-5 text-[#404EA6]'>Today’s Class</p>

                                <div className="flex gap-5">
                                    <div><img src={img2} alt="image" /></div>
                                    <div className="text-base font-medium">
                                        <p className="text-[#676767] mb-2">Week-3</p>
                                        <p className="mb-5">Approach to Idea Finding</p>
                                        <p className="text-[#676767]">Thursday | Session 4 |</p>
                                        <p className="text-[#676767] mb-5">2 : 00 hours</p>
                                        <button className="bg-[#6278FF] rounded-xl text-[#fff] px-3 py-1 font-bold">Join Class</button>
                                    </div>

                                </div>
                            </div>

                            <div className='w-full p-5'
                                style={{
                                    borderRadius: "16px",
                                    border: "1px solid #EAEAEA",
                                    background: "var(--primary-100, #FFF)",
                                    boxShadow: "4px 4px 10px 0px rgba(0, 0, 0, 0.25)"
                                }}
                            >
                                <p className='text-center text-lg font-bold mb-5 text-[#404EA6]'>Upcoming Class</p>

                                <div className="flex gap-5">
                                    <div><img src={img2} alt="image" /></div>
                                    <div className="text-base font-medium">
                                        <p className="text-[#676767] mb-2">Week-3</p>
                                        <p className="mb-5">Product Development</p>
                                        <p className="text-[#676767]">Thursday | Session 4 |</p>
                                        <p className="text-[#676767] mb-5">2 : 00 hours</p>
                                        <button className="bg-[#6278FF] rounded-xl text-[#fff] px-3 py-1 font-bold">Set Reminder</button>
                                    </div>

                                </div>
                            </div>

                        </div>


                    </div>


                    <div>
                        <ExpertMentorRightNev />

                    </div>


                </div>




            </Layout>
        </div >




    );
};

export default ExpertMentorDashboard;

