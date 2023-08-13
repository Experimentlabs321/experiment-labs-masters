//StudentsWhoNeedMoreGuidance


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

import { Doughnut } from 'react-chartjs-2';





const StudentsWhoNeedMoreGuidance = () => {


    const data = {
      
        datasets: [
            {
                data: [10, 12, 38,40],
                backgroundColor: ['#001246', '#0054B4', '#9CAAFF','#3E4DAC'],
                hoverBackgroundColor: ['#001246', '#0054B4', '#9CAAFF','#3E4DAC'],
            },
        ],
    };

    const options = {
        maintainAspectRatio: false,
        responsive: true,
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
                                <Link to='/executionMentorDashboard' className="text-[20px] font-bold flex items-center gap-2 text-[#001246]"><span><img src={arrowBack} alt="icon" /></span> Top performing students</Link>

                                <div className="flex gap-5 ">
                                    <p className="flex items-center gap-2 bg-[#F0F7FF] text-[#001246] p-2 rounded-md text-base font-normal"><img src={filter1} alt="icon" />Filter</p>
                                    <p className="flex items-center gap-2 bg-[#001246] p-2 rounded-md text-base font-normal text-[#fff]"><img src={exportData} alt="icon" />Export Data</p>
                                </div>


                            </div>

                            <div className="flex w-full">
                                <div className="w-[50%] mt-10">
                                    
                                    <div className="w-[100%] h-[100%] " style={{  margin: 'auto' }}>
                                    
                                        <Doughnut data={data} options={options} />
                                    </div>

                                </div>
                                <div className="grid grid-cols-2 w-full gap-12 my-10">
                                    <div className="p-4 h-[100%]"
                                        style={{
                                            borderRadius: "10px",
                                            border: "1px solid #DBDBDB"
                                        }}
                                    >
                                        <p className="text-[#292929] text-base font-normal">Total Students</p>
                                        <p className="text-[#001246] text-[20px] font-medium">34</p>
                                    </div>
                                    <div className="p-4 h-[100%]"
                                        style={{
                                            borderRadius: "10px",
                                            border: "1px solid #DBDBDB"
                                        }}
                                    >
                                        <p className="text-[#292929] text-base font-normal">Low Students</p>
                                        <p className="text-[#001246] text-[20px] font-medium">34</p>
                                    </div>
                                    <div className="p-4 h-[100%]"
                                        style={{
                                            borderRadius: "10px",
                                            border: "1px solid #DBDBDB"
                                        }}
                                    >
                                        <p className="text-[#292929] text-base font-normal">Academically strong students</p>
                                        <p className="text-[#001246] text-[20px] font-medium">34</p>
                                    </div>
                                    <div className="p-4 h-[100%]"
                                        style={{
                                            borderRadius: "10px",
                                            border: "1px solid #DBDBDB"
                                        }}
                                    >
                                        <p className="text-[#292929] text-base font-normal">Students who need guidance</p>
                                        <p className="text-[#001246] text-[20px] font-medium">34</p>
                                    </div>



                                </div>

                            </div>

                        </div>







                        <div className="flex justify-between items-center my-10">
                            <p className="text-[24px] text-[#3C3C3C] font-bold flex gap-5 items-center">Student History <img src={mingcute} alt="icon" /></p>

                        </div>

                        <div className="w-full ms-5">
                            <table className="w-full">
                                <tr>
                                    <th className="text-[#3C3C3C] text-xl font-semibold">S.No</th>
                                    <th className="text-[#3C3C3C] text-xl font-semibold">Name</th>
                                    <th className="text-[#3C3C3C] text-xl font-semibold">Department</th>
                                    <th className="text-[#3C3C3C] text-xl font-semibold">Progress</th>
                                    <th className="text-[#3C3C3C] text-xl font-semibold">From</th>
                                    <th className="text-[#3C3C3C] text-xl font-semibold">To</th>

                                </tr>
                                <tr>
                                    <td className="pt-5 text-[#3C3C3C] text-xl font-normal" >1</td>
                                    <td className="pt-5 text-[#3C3C3C] text-xl font-normal" >Harsh Kadyan</td>
                                    <td className="pt-5 text-[#8A8A8A] text-xl font-normal" >Product Lab</td>
                                    <td className="pt-5 text-[#8A8A8A] text-xl font-normal" >Week 4</td>
                                    <td className="pt-5 text-[#3C3C3C] text-xl font-normal" >12 Apr 2023</td>
                                    <td className="pt-5 text-[#3C3C3C] text-xl font-normal" >23 Apr 2023</td>
                                    <td className="pt-5 " ><p className="text-[#081765] bg-[#F0F7FF] flex items-center gap-2 rounded-md p-1 w-[70%]"><img src={eye1} alt="icon" /> View Details</p></td>
                                </tr>
                                <tr>
                                    <td className="pt-5 text-[#3C3C3C] text-xl font-normal" >2</td>
                                    <td className="pt-5 text-[#3C3C3C] text-xl font-normal" >Harsh Kadyan</td>
                                    <td className="pt-5 text-[#8A8A8A] text-xl font-normal" >Product Lab</td>
                                    <td className="pt-5 text-[#8A8A8A] text-xl font-normal" >Week 4</td>
                                    <td className="pt-5 text-[#3C3C3C] text-xl font-normal" >12 Apr 2023</td>
                                    <td className="pt-5 text-[#3C3C3C] text-xl font-normal" >23 Apr 2023</td>
                                    <td className="pt-5 " ><p className="text-[#081765] bg-[#F0F7FF] flex items-center gap-2 rounded-md p-1 w-[70%]"><img src={eye1} alt="icon" /> View Details</p></td>
                                </tr>
                                <tr>
                                    <td className="pt-5 text-[#3C3C3C] text-xl font-normal" >3</td>
                                    <td className="pt-5 text-[#3C3C3C] text-xl font-normal" >Harsh Kadyan</td>
                                    <td className="pt-5 text-[#8A8A8A] text-xl font-normal" >Product Lab</td>
                                    <td className="pt-5 text-[#8A8A8A] text-xl font-normal" >Week 4</td>
                                    <td className="pt-5 text-[#3C3C3C] text-xl font-normal" >12 Apr 2023</td>
                                    <td className="pt-5 text-[#3C3C3C] text-xl font-normal" >23 Apr 2023</td>
                                    <td className="pt-5 " ><p className="text-[#081765] bg-[#F0F7FF] flex items-center gap-2 rounded-md p-1 w-[70%]"><img src={eye1} alt="icon" /> View Details</p></td>
                                </tr>
                                <tr>
                                    <td className="pt-5 text-[#3C3C3C] text-xl font-normal" >4</td>
                                    <td className="pt-5 text-[#3C3C3C] text-xl font-normal" >Harsh Kadyan</td>
                                    <td className="pt-5 text-[#8A8A8A] text-xl font-normal" >Product Lab</td>
                                    <td className="pt-5 text-[#8A8A8A] text-xl font-normal" >Week 4</td>
                                    <td className="pt-5 text-[#3C3C3C] text-xl font-normal" >12 Apr 2023</td>
                                    <td className="pt-5 text-[#3C3C3C] text-xl font-normal" >23 Apr 2023</td>
                                    <td className="pt-5 " ><p className="text-[#081765] bg-[#F0F7FF] flex items-center gap-2 rounded-md p-1 w-[70%]"><img src={eye1} alt="icon" /> View Details</p></td>
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

export default StudentsWhoNeedMoreGuidance;

