//StudentProgressOverallBatchPerformance

import React, { useContext, useState } from "react";
import Layout from "../../Layout";
import "react-circular-progressbar/dist/styles.css";
import SearchIcon from '@mui/icons-material/Search';
import IconNav from '../../../../assets/ExpertMentorDashboard/Iconnav.svg';
import ReactApexChart from 'react-apexcharts';
import Overall from "./Overall";
import "react-circular-progressbar/dist/styles.css";
import eye from '../../../../assets/ExpertMentorDashboard/eye.svg';
import img2 from '../../../../assets/ExpertMentorDashboard/img2.png';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import WeeklyPerformance from "./WeeklyPerformance";



const StudentProgressOverallBatchPerformance = () => {
    const [selectedTab1, setSelectedTab1] = useState('Weekly Performance');

    const handleTabClick1 = (tab) => {
        setSelectedTab1(tab);
    };


    //
    const colors = ['#008FFB'];
    //Product Lab
    const [chartDataProductLab, setChartDataProductLab] = useState({
        series: [
            {
                data: [21, 22, 10, 28, 16],
            },
        ],
        options: {
            chart: {
                height: 350,
                type: 'bar',
                events: {
                    click: function (chart, w, e) {
                        // console.log(chart, w, e)
                    },
                },
            },
            colors: colors,
            plotOptions: {
                bar: {
                    columnWidth: '45%',
                    distributed: true,
                },
            },
            dataLabels: {
                enabled: false,
                style: {
                    colors: ['#fff'],
                },
            },
            legend: {
                show: false,
            },
            xaxis: {
                categories: [

                    'Batch-1',
                    'Batch-2',
                    'Batch-3',
                    'Batch-4',
                    'Batch-5',


                ],
                labels: {
                    style: {

                        fontSize: '12px',
                        colors: '#fff'

                    },
                },
            },
        },
    });
    //Business Lab
    const [chartDataBusinessLab, setChartDataBusinessLab] = useState({
        series: [
            {
                data: [21, 22, 10, 28, 16],
            },
        ],
        options: {
            chart: {
                height: 350,
                type: 'bar',
                events: {
                    click: function (chart, w, e) {
                        // console.log(chart, w, e)
                    },
                },
            },
            colors: colors,
            plotOptions: {
                bar: {
                    columnWidth: '45%',
                    distributed: true,
                },
            },
            dataLabels: {
                enabled: false,
                style: {
                    colors: ['#fff'],
                },
            },
            legend: {
                show: false,
            },
            xaxis: {
                categories: [

                    'Batch-1',
                    'Batch-2',
                    'Batch-3',
                    'Batch-4',
                    'Batch-5',


                ],
                labels: {
                    style: {

                        fontSize: '12px',
                        colors: '#fff'

                    },
                },
            },
        },
    });
    //Creativity Lab
    const [chartDataCreativityLab, setChartDataCreativityLab] = useState({
        series: [
            {
                data: [21, 22, 10, 28, 16],
            },
        ],
        options: {
            chart: {
                height: 350,
                type: 'bar',
                events: {
                    click: function (chart, w, e) {
                        // console.log(chart, w, e)
                    },
                },
            },
            colors: colors,
            plotOptions: {
                bar: {
                    columnWidth: '45%',
                    distributed: true,
                },
            },
            dataLabels: {
                enabled: false,
                style: {
                    colors: ['#fff'],
                },
            },
            legend: {
                show: false,
            },
            xaxis: {
                categories: [

                    'Batch-1',
                    'Batch-2',
                    'Batch-3',
                    'Batch-4',
                    'Batch-5',


                ],
                labels: {
                    style: {

                        fontSize: '12px',
                        colors: '#fff'

                    },
                },
            },
        },
    });

    //
        //////
        const pieParams = { height: 60, width: 100, margin: { right: 1 } };
        const palette = ['#6278FF', '#BEBEBE'];
    
        ///////
        const data = [
            { value: 20, label: 'Batch - 1', color: '#261686' },
            { value: 10, label: 'Batch - 2', color: '#1721E2' },
            { value: 15, label: 'Batch - 3', color: '#888EFF' },
    
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
                        <p className="flex items-center gap-2 text-lg font-semibold text-[#3E4DAC]">Overall Batch performance comparison</p>
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

                <div className="flex mt-32 mx-10 ">
                    <div className="">
                        <p className="text-[#fff] text-xl font-semibold px-20 py-3 "
                            style={{
                                borderRadius: "17.617px",
                                background: "#1721E2",
                                boxShadow: "4px 4px 10px 0px rgba(0, 0, 0, 0.50)"
                            }}
                        >Product Lab</p>
                    </div>
                    <div className="p-10"
                        style={{
                            borderRadius: "17.617px",
                            background: "#131313",
                            boxShadow: "4px 4px 10px 0px rgba(0, 0, 0, 0.50)"
                        }}
                    >
                        <div className=" text-[#fff]">
                            <ReactApexChart options={chartDataProductLab.options} series={chartDataProductLab.series} type="bar" height={350} width={650} />
                        </div>


                    </div>


                </div>

                <div className="flex mt-10 mx-10">
                    <div className="">
                        <p className="text-[#fff] text-xl font-semibold px-20 py-3 "
                            style={{
                                borderRadius: "17.617px",
                                background: "#1721E2",
                                boxShadow: "4px 4px 10px 0px rgba(0, 0, 0, 0.50)"
                            }}
                        >Business Lab</p>
                    </div>
                    <div className="p-10"
                        style={{
                            borderRadius: "17.617px",
                            background: "#131313",
                            boxShadow: "4px 4px 10px 0px rgba(0, 0, 0, 0.50)"
                        }}
                    >
                        <div className=" text-[#fff]">
                            <ReactApexChart options={chartDataBusinessLab.options} series={chartDataBusinessLab.series} type="bar" height={350} width={650} />
                        </div>


                    </div>


                </div>

                <div className="flex mt-10 mx-10">
                    <div className="">
                        <p className="text-[#fff] text-xl font-semibold px-20 py-3 "
                            style={{
                                borderRadius: "17.617px",
                                background: "#1721E2",
                                boxShadow: "4px 4px 10px 0px rgba(0, 0, 0, 0.50)"
                            }}
                        >Creativity Lab</p>
                    </div>
                    <div className="p-10"
                        style={{
                            borderRadius: "17.617px",
                            background: "#131313",
                            boxShadow: "4px 4px 10px 0px rgba(0, 0, 0, 0.50)"
                        }}
                    >
                        <div className=" text-[#fff]">
                            <ReactApexChart options={chartDataCreativityLab.options} series={chartDataCreativityLab.series} type="bar" height={350} width={650} />
                        </div>


                    </div>


                </div>

                <div className="mt-20 mx-10">
                    <p className="text-[#3E4DAC] text-xl font-bold">Batchwise  performance</p>
                </div>

                <div className="w-full mt-10">
                    <div className="flex justify-between items-center">
                        <div className='px-10 flex  pb-3 text-lg font-semibold my-10  '>
                            <button
                                className="px-10 rounded-s-lg py-2"

                                onClick={() => handleTabClick1('Weekly Performance')}
                                style={{


                                    background: "#F8F9FE",
                                    boxShadow: "2px 2px 10px 0px rgba(149, 156, 225, 0.50)",
                                    //   fontWeight: selectedTab1 === 'Weekly Performance' ? 'bold' : 'normal',

                                    backgroundColor: selectedTab1 === 'Weekly Performance' ? '#93D6F6' : ''
                                }}
                            >
                                Weekly Performance
                            </button>
                            <button
                                className="px-10 rounded-e-lg py-2 "

                                onClick={() => handleTabClick1('Overall')}
                                style={{
                                    background: "#F8F9FE",
                                    boxShadow: "2px 2px 10px 0px rgba(149, 156, 225, 0.50)",
                                   // fontWeight: selectedTab1 === 'Overall' ? 'bold' : 'normal',

                                    backgroundColor: selectedTab1 === 'Overall' ? '#93D6F6' : ''
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
                            <Overall />

                        </>
                    )
                }
                
                {
                    (selectedTab1 === 'Weekly Performance') && (
                        <>
                           <WeeklyPerformance/>

                        </>
                    )
                }

                <div>
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


                <div className=" flex p-5 text-xl font-normal mx-10"
                    style={{
                        borderRadius: "8px",
                        background: "#F8F9FE",
                        boxShadow: "2px 2px 10px 0px rgba(149, 156, 225, 0.50)"
                    }}
                >
                    <p className="w-[50%] border-e-2">S.No</p>
                    <p className="w-[100%] text-center border-e-2">Name </p>
                    <p className="w-[100%] text-center border-e-2">Department</p>
                    <p className="w-[100%] text-center border-e-2">Challenge submission</p>
                    <p className="w-[100%] text-center border-e-2">Duration</p>
                    <p className="w-[100%] text-center border-e-2">Rank</p>
                    <p className="w-[100%] text-center mx-5"></p>


                </div>

                <div className=" flex p-5 text-xl font-normal mx-10 my-5"
                    style={{
                        borderRadius: "8px",
                        background: "#F8F9FE",
                        boxShadow: "2px 2px 10px 0px rgba(149, 156, 225, 0.50)"
                    }}
                >
                    <p className="w-[50%] border-e-2">1</p>
                    <p className="w-[100%] text-center border-e-2">Harsh Kadyan</p>
                    <p className="w-[100%] text-center border-e-2">Product Lab</p>
                    <p className="w-[100%] text-center border-e-2">Week 4</p>
                    <p className="w-[100%] text-center border-e-2">12 Apr 2023</p>
                    <p className="w-[100%] text-center border-e-2">12</p>
                    <p className="w-[100%] bg-[#F2EAFF] rounded-lg mx-5 flex gap-5 text-[#8147E7] ps-2 font-normal"><span><img src={eye} alt="icon"/></span> View Details </p>


                </div>
                <div className=" flex p-5 text-xl font-normal mx-10 my-5"
                    style={{
                        borderRadius: "8px",
                        background: "#F8F9FE",
                        boxShadow: "2px 2px 10px 0px rgba(149, 156, 225, 0.50)"
                    }}
                >
                    <p className="w-[50%] border-e-2">1</p>
                    <p className="w-[100%] text-center border-e-2">Harsh Kadyan</p>
                    <p className="w-[100%] text-center border-e-2">Product Lab</p>
                    <p className="w-[100%] text-center border-e-2">Week 4</p>
                    <p className="w-[100%] text-center border-e-2">12 Apr 2023</p>
                    <p className="w-[100%] text-center border-e-2">12</p>
                    <p className="w-[100%] bg-[#F2EAFF] rounded-lg mx-5 flex gap-5 text-[#8147E7] ps-2 font-normal"><span><img src={eye} alt="icon"/></span> View Details </p>


                </div>
                <div className=" flex p-5 text-xl font-normal mx-10 my-5"
                    style={{
                        borderRadius: "8px",
                        background: "#F8F9FE",
                        boxShadow: "2px 2px 10px 0px rgba(149, 156, 225, 0.50)"
                    }}
                >
                    <p className="w-[50%] border-e-2">1</p>
                    <p className="w-[100%] text-center border-e-2">Harsh Kadyan</p>
                    <p className="w-[100%] text-center border-e-2">Product Lab</p>
                    <p className="w-[100%] text-center border-e-2">Week 4</p>
                    <p className="w-[100%] text-center border-e-2">12 Apr 2023</p>
                    <p className="w-[100%] text-center border-e-2">12</p>
                    <p className="w-[100%] bg-[#F2EAFF] rounded-lg mx-5 flex gap-5 text-[#8147E7] ps-2 font-normal"><span><img src={eye} alt="icon"/></span> View Details </p>


                </div>
                <div className=" flex p-5 text-xl font-normal mx-10 my-5"
                    style={{
                        borderRadius: "8px",
                        background: "#F8F9FE",
                        boxShadow: "2px 2px 10px 0px rgba(149, 156, 225, 0.50)"
                    }}
                >
                    <p className="w-[50%] border-e-2">1</p>
                    <p className="w-[100%] text-center border-e-2">Harsh Kadyan</p>
                    <p className="w-[100%] text-center border-e-2">Product Lab</p>
                    <p className="w-[100%] text-center border-e-2">Week 4</p>
                    <p className="w-[100%] text-center border-e-2">12 Apr 2023</p>
                    <p className="w-[100%] text-center border-e-2">12</p>
                    <p className="w-[100%] bg-[#F2EAFF] rounded-lg mx-5 flex gap-5 text-[#8147E7] ps-2 font-normal"><span><img src={eye} alt="icon"/></span> View Details </p>


                </div>
                <div className=" flex p-5 text-xl font-normal mx-10 my-5"
                    style={{
                        borderRadius: "8px",
                        background: "#F8F9FE",
                        boxShadow: "2px 2px 10px 0px rgba(149, 156, 225, 0.50)"
                    }}
                >
                    <p className="w-[50%] border-e-2">1</p>
                    <p className="w-[100%] text-center border-e-2">Harsh Kadyan</p>
                    <p className="w-[100%] text-center border-e-2">Product Lab</p>
                    <p className="w-[100%] text-center border-e-2">Week 4</p>
                    <p className="w-[100%] text-center border-e-2">12 Apr 2023</p>
                    <p className="w-[100%] text-center border-e-2">12</p>
                    <p className="w-[100%] bg-[#F2EAFF] rounded-lg mx-5 flex gap-5 text-[#8147E7] ps-2 font-normal"><span><img src={eye} alt="icon"/></span> View Details </p>


                </div>
                <div className=" flex p-5 text-xl font-normal mx-10 my-5"
                    style={{
                        borderRadius: "8px",
                        background: "#F8F9FE",
                        boxShadow: "2px 2px 10px 0px rgba(149, 156, 225, 0.50)"
                    }}
                >
                    <p className="w-[50%] border-e-2">1</p>
                    <p className="w-[100%] text-center border-e-2">Harsh Kadyan</p>
                    <p className="w-[100%] text-center border-e-2">Product Lab</p>
                    <p className="w-[100%] text-center border-e-2">Week 4</p>
                    <p className="w-[100%] text-center border-e-2">12 Apr 2023</p>
                    <p className="w-[100%] text-center border-e-2">12</p>
                    <p className="w-[100%] bg-[#F2EAFF] rounded-lg mx-5 flex gap-5 text-[#8147E7] ps-2 font-normal"><span><img src={eye} alt="icon"/></span> View Details </p>


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
                </div>






            </Layout>
        </div >




    );
};

export default StudentProgressOverallBatchPerformance;

