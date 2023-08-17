
import React, { useContext, useState } from "react";
import Layout from "../Layout";
import { Link } from "react-router-dom";
import AssignmentUpNev from "../ExecutionMentorAssignments/AssignmentUpNev";
import AssignmentRightNev from "../ExecutionMentorAssignments/AssignmentRightNev";
import filter1 from '../../../assets/ExecutionMentor/filter1.svg';
import exportData from '../../../assets/ExecutionMentor/exportData.svg';
import mingcute from '../../../assets/ExecutionMentor/mingcute.svg';
import eye1 from '../../../assets/ExecutionMentor/eye1.svg';
import arrowBack from '../../../assets/ExecutionMentor/arrow-back.svg';



import "react-circular-progressbar/dist/styles.css";


import ReactApexChart from 'react-apexcharts';




const PerformanceFeedback = () => {

    ///
    const [day, setDay] = useState('Monthly');

    const handleChange = (event) => {
        setDay(event.target.value);
    };

    ////////

    const series = [
        {
            name: 'series1',
            data: [2.8, 2, 3.5, 3.2 , 3 , 2.8 , 2.5, 2.3, 2]
        },

    ];

    const Monthly = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul' , 'Aug' , 'Sep'];
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
            categories: labels
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



                        <div className="w-full ">
                            <div className="flex justify-between items-center mb-5">
                                <Link to='/executionMentorDashboard' className="text-[20px] font-bold flex items-center gap-2"><span><img src={arrowBack} alt="icon" /></span> Performance</Link>

                                <div className="flex gap-5 ">
                                    <p className="flex items-center gap-2 bg-[#F0F7FF] p-2 rounded-md text-base font-normal"><img src={filter1} alt="icon" />Filter</p>
                                    <p className="flex items-center gap-2 bg-[#001246] p-2 rounded-md text-base font-normal text-[#fff]"><img src={exportData} alt="icon" />Export Data</p>
                                </div>


                            </div>
                            <div id="chart">
                                <ReactApexChart options={options} series={series} type="area" height={350} />
                            </div>
                         

                        </div>





                        <div className="flex justify-between items-center my-10">
                            <p className="text-[24px] font-bold flex gap-5 items-center">Performance feedback <img src={mingcute} alt="icon" /></p>

                        </div>

                        <div className="w-full ms-5">
                            <table className="w-full">
                                <tr>
                                    <th>Month</th>
                                    <th>Name</th>
                                    <th>Department</th>
                                    <th>Feedback</th>
                                </tr>
                                <tr>
                                    <td className="pt-5" >Jan</td>
                                    <td className="pt-5" >Harsh Kadyan</td>
                                    <td className="pt-5" >Product Lab</td>
                                    <td className="pt-5" >23 Apr 2023</td>
                                    <td className="pt-5 " ><p className="text-[#081765] bg-[#F0F7FF] flex items-center gap-2 rounded-md p-1 w-[60%]"><img src={eye1} alt="icon" /> View Details</p></td>
                                </tr>
                                <tr>
                                    <td className="pt-5" >Jan</td>
                                    <td className="pt-5" >Harsh Kadyan</td>
                                    <td className="pt-5" >Product Lab</td>
                                    <td className="pt-5" >23 Apr 2023</td>
                                    <td className="pt-5 " ><p className="text-[#081765] bg-[#F0F7FF] flex items-center gap-2 rounded-md p-1 w-[60%]"><img src={eye1} alt="icon" /> View Details</p></td>
                                </tr>
                                <tr>
                                    <td className="pt-5" >Jan</td>
                                    <td className="pt-5" >Harsh Kadyan</td>
                                    <td className="pt-5" >Product Lab</td>
                                    <td className="pt-5" >23 Apr 2023</td>
                                    <td className="pt-5 " ><p className="text-[#081765] bg-[#F0F7FF] flex items-center gap-2 rounded-md p-1 w-[60%]"><img src={eye1} alt="icon" /> View Details</p></td>
                                </tr>
                                <tr>
                                    <td className="pt-5" >Jan</td>
                                    <td className="pt-5" >Harsh Kadyan</td>
                                    <td className="pt-5" >Product Lab</td>
                                    <td className="pt-5" >23 Apr 2023</td>
                                    <td className="pt-5 " ><p className="text-[#081765] bg-[#F0F7FF] flex items-center gap-2 rounded-md p-1 w-[60%]"><img src={eye1} alt="icon" /> View Details</p></td>
                                </tr>



                            </table>

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

export default PerformanceFeedback;

