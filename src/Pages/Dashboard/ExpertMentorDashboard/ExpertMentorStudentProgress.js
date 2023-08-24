//ExpertMentorStudentProgress



import React, { useContext, useState } from "react";
import Layout from "../Layout";
import "react-circular-progressbar/dist/styles.css";
import SearchIcon from '@mui/icons-material/Search';

import IconNav from '../../../assets/ExpertMentorDashboard/Iconnav.svg';
import img2 from '../../../assets/ExpertMentorDashboard/img2.png';
import { Link } from "react-router-dom";
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import ReactApexChart from 'react-apexcharts';


const ExpertMentorStudentProgress = () => {
    const [selectedTab1, setSelectedTab1] = useState('Weekly Peformance');

    const handleTabClick1 = (tab) => {
        setSelectedTab1(tab);
    };



    //////
    const pieParams = { height: 60, width: 100, margin: { right: 1 } };
    const palette = ['#6278FF', '#BEBEBE'];

    ///////
    const data = [
        { value: 20, label: 'Batch - 1',color: '#261686' },
        { value: 10, label: 'Batch - 2', color: '#1721E2'},
        { value: 15, label: 'Batch - 3',color: '#888EFF' },

    ];

    const size = {
        width: 290,
        height: 200,
    };

    return (
        <div>
            <Layout>



                <div className="px-20  py-4 flex items-center  fixed w-[100%] justify-between bg-[#FFF] top-0  border-b ">
                    <div>
                        <p className="flex items-center gap-2 text-lg font-semibold text-[#3E4DAC]"> Batchwise  performance</p>
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

                <div className="w-full mt-20">
                    <div className="flex justify-between items-center">
                        <div className='px-10 flex gap-10 pb-3 text-lg mt-10  '>
                            <button

                                onClick={() => handleTabClick1('Weekly Peformance')}
                                style={{
                                    borderRadius: "8px",
                                    border: "1px solid #D9D9D9",
                                    boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                                    padding: "8px",
                                    fontWeight: selectedTab1 === 'Weekly Peformance' ? 'bold' : 'normal',

                                    backgroundColor: selectedTab1 === 'Weekly Peformance' ? '#93D6F6' : '#BEBEBE'
                                }}
                            >
                                Weekly Peformance
                            </button>
                            <button

                                onClick={() => handleTabClick1('Overall')}
                                style={{
                                    borderRadius: "8px",
                                    border: "1px solid #D9D9D9",
                                    boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                                    padding: "8px",
                                    fontWeight: selectedTab1 === 'Overall' ? 'bold' : 'normal',

                                    backgroundColor: selectedTab1 === 'Overall' ? '#93D6F6' : '#BEBEBE'
                                }}
                            >
                                Overall
                            </button>



                        </div>

                    </div>




                </div>


                {
                    (selectedTab1 === 'Overall') && (
                        <>
                            <div className="my-10 flex mx-10">
                                <div className="w-[65%]">
                                    <table className=" w-[90%]  text-xl font-medium text-[#fff] bg-[]"
                                        style={{
                                            borderRadius: "20px",
                                            background: "#0E2749",
                                            boxShadow: "5px 5px 10px 0px rgba(0, 0, 0, 0.25)"
                                        }}
                                    >
                                        <tr>
                                            <th className="border border-[#D9D9D9] p-4"> </th>
                                            <th className="border border-[#D9D9D9] p-4"> Product Lab</th>
                                            <th className="border border-[#D9D9D9] p-4"> Business Lab</th>
                                            <th className="border border-[#D9D9D9] p-4"> Creative Lab</th>
                                        </tr>
                                        <tr>
                                            <td className="border border-[#D9D9D9] p-4">Batch-1</td>
                                            <td className="border border-[#D9D9D9] p-4">50 % achieved</td>
                                            <td className="border border-[#D9D9D9] p-4"></td>
                                            <td className="border border-[#D9D9D9] p-4"></td>
                                        </tr>
                                        <tr>
                                            <td className="border border-[#D9D9D9] p-4">Batch-1</td>
                                            <td className="border border-[#D9D9D9] p-4"></td>
                                            <td className="border border-[#D9D9D9] p-4"></td>
                                            <td className="border border-[#D9D9D9] p-4"></td>
                                        </tr>
                                        <tr>
                                            <td className="border border-[#D9D9D9] p-4">Batch-1</td>
                                            <td className="border border-[#D9D9D9] p-4"></td>
                                            <td className="border border-[#D9D9D9] p-4"></td>
                                            <td className="border border-[#D9D9D9] p-4"></td>
                                        </tr>
                                        <tr>
                                            <td className="border border-[#D9D9D9] p-4">Batch-1</td>
                                            <td className="border border-[#D9D9D9] p-4"></td>
                                            <td className="border border-[#D9D9D9] p-4"></td>
                                            <td className="border border-[#D9D9D9] p-4"></td>
                                        </tr>
                                        <tr>
                                            <td className="border border-[#D9D9D9] p-4">Batch-1</td>
                                            <td className="border border-[#D9D9D9] p-4"></td>
                                            <td className="border border-[#D9D9D9] p-4"></td>
                                            <td className="border border-[#D9D9D9] p-4"></td>
                                        </tr>
                                    </table>
                                </div>
                                <div className="w-[30%] flex flex-col items-center gap-2 p-4"
                                    style={{
                                        borderRadius: "20px",
                                        background: "#FFF",
                                        boxShadow: "4px 4px 10px 0px rgba(0, 0, 0, 0.50)"
                                    }}
                                >
                                    <p className="text-lg font-semibold">Best performer </p>
                                    <p>
                                        <img src={img2} alt="img" />
                                    </p>
                                    <p className="text-[#3E4DAC] text-xl font-bold">BATCH - 2</p>
                                    <p className="text-[#676767] text-base font-medium">Overall achieved - 90%</p>
                                    <p className="text-[#676767] text-base font-medium">Product Lab</p>
                                    <p className="text-[#676767] text-xs font-medium">Give Feedback to the class to boost their endeavours !</p>


                                </div>

                            </div>

                            <div className="ms-10">
                                <p className="text-[#3E4DAC] text-xl font-bold">Lab Earnings : Student Performance</p>
                                <p>
                                    <select className="my-10 py-3 px-5 text-[#676767] text-lg font-semibold" name="" id=""
                                        style={{
                                            borderRadius: "8px",
                                            background: "#F8F9FE",
                                            boxShadow: "2px 2px 10px 0px rgba(149, 156, 225, 0.50)"
                                        }}
                                    >
                                        <option value="Product lab">Product lab</option>
                                        <option value="saab">Saab</option>
                                        <option value="opel">Opel</option>
                                        <option value="audi">Audi</option>
                                    </select>
                                </p>
                                <p className="text-[#3E4DAC] text-xl font-bold">Curriculum With Dual Focus On Tech And Management </p>
                                <p className="text-[#3E4DAC] text-base font-medium mt-2">New Age Concentration</p>

                                <p>
                                    <select className="my-10 py-3 px-5 text-[#676767] text-lg font-semibold" name="" id=""
                                        style={{
                                            borderRadius: "8px",
                                            background: "#F8F9FE",
                                            boxShadow: "2px 2px 10px 0px rgba(149, 156, 225, 0.50)"
                                        }}
                                    >
                                        <option value="Batch -1 ">Batch -1 </option>
                                        <option value="saab">Saab</option>
                                        <option value="opel">Opel</option>
                                        <option value="audi">Audi</option>
                                    </select>
                                </p>
                            </div>

                            <div>
                                <div className=" mx-10 my-10 ">
                                    <table className=" w-[95%]  text-xl font-medium "
                                        style={{
                                            borderRadius: "20px",
                                            background: "linear-gradient(180deg, #DBE7FD 0%, #F0F5FF 100%)",
                                            boxShadow: "4px 10px 25px 0px rgba(93, 110, 255, 0.60)"
                                        }}
                                    >
                                        <tr className="text-[#3E4DAC]">
                                            <th className="border border-e-[#676767] border-b-[#676767] p-4"> </th>
                                            <th className="border border-x-[#676767] border-b-[#676767] p-4"> Attendance</th>
                                            <th className="border border-x-[#676767] border-b-[#676767] p-4"> Challenge
                                                Submission</th>
                                            <th className="border border-x-[#676767] border-b-[#676767] p-4"> Creativity</th>
                                            <th className="border border-x-[#676767] border-b-[#676767] p-4"> Delight</th>
                                            <th className="border border-x-[#676767] border-b-[#676767] p-4"> Sales & Recognition</th>
                                            <th className="border  border-b-[#676767] p-4"> Total</th>
                                        </tr>
                                        <tr>
                                            <td className="border border-y-[#676767] border-e-[#676767] p-4">1. Sakshi</td>
                                            <td className="border border-[#676767] p-4"></td>
                                            <td className="border border-[#676767] p-4"></td>
                                            <td className="border border-[#676767] p-4"></td>
                                            <td className="border border-[#676767] p-4"></td>
                                            <td className="border border-[#676767] p-4"></td>
                                            <td className="border border-y-[#676767] border-s-[#676767] p-4"></td>
                                        </tr>
                                        <tr>
                                            <td className="border border-y-[#676767] border-e-[#676767] p-4">1. Sakshi</td>
                                            <td className="border border-[#676767] p-4"></td>
                                            <td className="border border-[#676767] p-4"></td>
                                            <td className="border border-[#676767] p-4"></td>
                                            <td className="border border-[#676767] p-4"></td>
                                            <td className="border border-[#676767] p-4"></td>
                                            <td className="border border-y-[#676767] border-s-[#676767] p-4"></td>
                                        </tr>
                                        <tr>
                                            <td className="border border-y-[#676767] border-e-[#676767] p-4">1. Sakshi</td>
                                            <td className="border border-[#676767] p-4"></td>
                                            <td className="border border-[#676767] p-4"></td>
                                            <td className="border border-[#676767] p-4"></td>
                                            <td className="border border-[#676767] p-4"></td>
                                            <td className="border border-[#676767] p-4"></td>
                                            <td className="border border-y-[#676767] border-s-[#676767] p-4"></td>
                                        </tr>
                                        <tr>
                                            <td className="border border-y-[#676767] border-e-[#676767] p-4">1. Sakshi</td>
                                            <td className="border border-[#676767] p-4"></td>
                                            <td className="border border-[#676767] p-4"></td>
                                            <td className="border border-[#676767] p-4"></td>
                                            <td className="border border-[#676767] p-4"></td>
                                            <td className="border border-[#676767] p-4"></td>
                                            <td className="border border-y-[#676767] border-s-[#676767] p-4"></td>
                                        </tr>
                                        <tr>
                                            <td className="border border-y-[#676767] border-e-[#676767] p-4">1. Sakshi</td>
                                            <td className="border border-[#676767] p-4"></td>
                                            <td className="border border-[#676767] p-4"></td>
                                            <td className="border border-[#676767] p-4"></td>
                                            <td className="border border-[#676767] p-4"></td>
                                            <td className="border border-[#676767] p-4"></td>
                                            <td className="border border-y-[#676767] border-s-[#676767] p-4"></td>
                                        </tr>
                                        <tr>
                                            <td className="border border-y-[#676767] border-e-[#676767] p-4">1. Sakshi</td>
                                            <td className="border border-[#676767] p-4"></td>
                                            <td className="border border-[#676767] p-4"></td>
                                            <td className="border border-[#676767] p-4"></td>
                                            <td className="border border-[#676767] p-4"></td>
                                            <td className="border border-[#676767] p-4"></td>
                                            <td className="border border-y-[#676767] border-s-[#676767] p-4"></td>
                                        </tr>
                                        <tr>
                                            <td className="border border-y-[#676767] border-e-[#676767] p-4">1. Sakshi</td>
                                            <td className="border border-[#676767] p-4"></td>
                                            <td className="border border-[#676767] p-4"></td>
                                            <td className="border border-[#676767] p-4"></td>
                                            <td className="border border-[#676767] p-4"></td>
                                            <td className="border border-[#676767] p-4"></td>
                                            <td className="border border-y-[#676767] border-s-[#676767] p-4"></td>
                                        </tr>
                                        <tr>
                                            <td className="border border-y-[#676767] border-e-[#676767] p-4">1. Sakshi</td>
                                            <td className="border border-[#676767] p-4"></td>
                                            <td className="border border-[#676767] p-4"></td>
                                            <td className="border border-[#676767] p-4"></td>
                                            <td className="border border-[#676767] p-4"></td>
                                            <td className="border border-[#676767] p-4"></td>
                                            <td className="border border-y-[#676767] border-s-[#676767] p-4"></td>
                                        </tr>
                                        <tr>
                                            <td className="border  border-e-[#676767] p-4">1. Sakshi</td>
                                            <td className="border border-e-[#676767] p-4"></td>
                                            <td className="border border-e-[#676767] p-4"></td>
                                            <td className="border border-e-[#676767] p-4"></td>
                                            <td className="border border-e-[#676767] p-4"></td>
                                            <td className="border border-e-[#676767] p-4"></td>
                                            <td className="border  p-4"></td>
                                        </tr>


                                    </table>
                                </div>
                            </div>

                            <div className="mx-10  my-10">
                                <p className="text-[#3E4DAC] text-xl font-bold my-20">Remarks : Batch - 1</p>
                                <div className="flex justify-center">
                                    <div className=" grid grid-cols-2 gap-20 w-[90%]">



                                        <div className="flex items-center w-[70%]">
                                            <p>
                                                <PieChart
                                                    colors={palette}
                                                    series={[{ data: [{ value: 75 }, { value: 25 }] }]}
                                                    {...pieParams}
                                                />
                                            </p>

                                            <p className="text-[#3E4DAC] text-xl font-medium">75 % - Student attendance
                                                Great work  </p>
                                        </div>
                                        <div className="flex items-center w-[70%]">
                                            <p><PieChart
                                                colors={palette}
                                                series={[{ data: [{ value: 75 }, { value: 25 }] }]}
                                                {...pieParams}
                                            /></p>
                                            <p className="text-[#3E4DAC] text-xl font-medium">40% - Student Challenge submission
                                                Need to work on this </p>
                                        </div>
                                        <div className="flex items-center w-[70%]">
                                            <p> <PieChart
                                                colors={palette}
                                                series={[{ data: [{ value: 75 }, { value: 25 }] }]}
                                                {...pieParams}
                                            /></p>
                                            <p className="text-[#3E4DAC] text-xl font-medium">75 % - Creativity
                                                Great work  </p>
                                        </div>
                                        <div className="flex items-center w-[70%]">
                                            <p>  <PieChart
                                                colors={palette}
                                                series={[{ data: [{ value: 75 }, { value: 25 }] }]}
                                                {...pieParams}
                                            /></p>
                                            <p className="text-[#3E4DAC] text-xl font-medium">75 % - Delight
                                                Great work  </p>
                                        </div>

                                    </div>
                                </div>

                            </div>

                            <div className="mb-10 mx-10">
                                <p className="text-[#3E4DAC] text-xl font-bold my-20 ms-10">Overall Batch comparison</p>


                                <div className="flex justify-between gap-5">
                                  
                                    <div className=" flex flex-col items-center justify-center p"
                                     style={{
                                        borderRadius: "17.617px",
                                        background: "#F5F294",
                                        boxShadow: "4px 4px 10px 0px rgba(0, 0, 0, 0.50)"
                                    }}
                                    >
                                        <p className="text-xl font-semibold w-full text-center py-2"
                                            style={{
                                                borderRadius: "17.617px",
                                                background: "#F5F294",
                                                boxShadow: "4px 4px 10px 0px rgba(0, 0, 0, 0.50)"
                                            }}
                                        >Product Lab</p>
                                        <p className="py-10 px-2">
                                            <PieChart
                                                series={[
                                                    {
                                                        arcLabel: (item) => `${item.label} (${item.value})`,
                                                        arcLabelMinAngle: 45,
                                                        data,
                                                    },
                                                ]}
                                                sx={{
                                                    [`& .MuiPieArcLabel-root`]: {
                                                        fill: 'white',
                                                        fontWeight: 'bold',
                                                    },
                                                }}
                                                {...size}
                                            />
                                        </p>

                                    </div>
                                  
                                    <div className=" flex flex-col items-center justify-center "
                                     style={{
                                        borderRadius: "17.617px",
                                        background: "#F5F294",
                                        boxShadow: "4px 4px 10px 0px rgba(0, 0, 0, 0.50)"
                                    }}
                                    >
                                        <p className="text-xl font-semibold w-full text-center py-2"
                                            style={{
                                                borderRadius: "17.617px",
                                                background: "#F5F294",
                                                boxShadow: "4px 4px 10px 0px rgba(0, 0, 0, 0.50)"
                                            }}
                                        >Business Lab</p>
                                        <p className="py-10 px-2">
                                            <PieChart
                                                series={[
                                                    {
                                                        arcLabel: (item) => `${item.label} (${item.value})`,
                                                        arcLabelMinAngle: 45,
                                                        data,
                                                    },
                                                ]}
                                                sx={{
                                                    [`& .MuiPieArcLabel-root`]: {
                                                        fill: 'white',
                                                        fontWeight: 'bold',
                                                    },
                                                }}
                                                {...size}
                                            />
                                        </p>

                                    </div>
                                  
                                    <div className=" flex flex-col items-center justify-center "
                                     style={{
                                        borderRadius: "17.617px",
                                        background: "#F5F294",
                                        boxShadow: "4px 4px 10px 0px rgba(0, 0, 0, 0.50)"
                                    }}
                                    >
                                        <p className="text-xl font-semibold w-full text-center py-2"
                                            style={{
                                                borderRadius: "17.617px",
                                                background: "#F5F294",
                                                boxShadow: "4px 4px 10px 0px rgba(0, 0, 0, 0.50)"
                                            }}
                                        >Creative Lab</p>
                                        <p className="py-10 px-2">
                                            <PieChart
                                                series={[
                                                    {
                                                        arcLabel: (item) => `${item.label} (${item.value})`,
                                                        arcLabelMinAngle: 45,
                                                        data,
                                                    },
                                                ]}
                                                sx={{
                                                    [`& .MuiPieArcLabel-root`]: {
                                                        fill: 'white',
                                                        fontWeight: 'bold',
                                                    },
                                                }}
                                                {...size}
                                            />
                                        </p>

                                    </div>

                                </div>
                            </div>




                        </>
                    )
                }






            </Layout>
        </div >




    );
};

export default ExpertMentorStudentProgress;

