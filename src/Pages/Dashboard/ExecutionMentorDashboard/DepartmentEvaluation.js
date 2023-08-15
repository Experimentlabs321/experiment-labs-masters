//DepartmentEvaluation



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
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';





const DepartmentEvaluation = () => {


    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    return (
        <div>
            <Layout>



                <div className=''>

                    <AssignmentUpNev page={''} />

                </div>


                <div className="flex mt-24">
                    <div className="w-full ms-5 mt-10">



                        <div className="w-full flex gap-10 mb-5">

                            <div className="w-[10%]">
                                <Link to='/' className="text-[20px] font-bold flex items-center gap-2 text-[#001246]"><img src={arrowBack} alt="icon" /></Link>
                            </div>


                            <div className="bg-[#081765] text-[#fff] p-5 rounded-2xl w-[100%]">
                                <p>Name of the Lab</p>
                                <div>
                                    <FormControl sx={{ m: 1, minWidth: 150 }} size="small">
                                        <InputLabel style={{ color: 'white' }} id="demo-select-small-label">Product lab</InputLabel>
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
                            </div>

                            <div className="bg-[#F0F7FF] rounded-2xl p-5 w-[100%]">
                                <p className="text-sm font-semibold">Students</p>
                                <p className="text-[20px] font-semibold">25</p>
                            </div>
                            <div className="bg-[#F0F7FF] rounded-2xl p-5 w-[100%]" >
                                <p className="text-sm font-semibold">Assignment</p>
                                <p className="text-[20px] font-semibold">120</p>
                            </div>
                            <div className="bg-[#F0F7FF] rounded-2xl p-5 w-[100%]">
                                <p className="text-sm font-semibold">Pending assignments</p>
                                <p className="text-[20px] font-semibold">40</p>
                            </div>




                        </div>


                        <div className="flex justify-between items-center my-10">
                            <p className="text-[24px] text-[#3C3C3C] font-bold flex gap-5 items-center">Assignments <img src={mingcute} alt="icon" /></p>

                        </div>

                        <div className="w-full ms-5">
                            <table className="w-full">
                                <tr>
                                    <th className="text-[#3C3C3C] text-xl font-semibold">S.No</th>
                                    <th className="text-[#3C3C3C] text-xl font-semibold">Name</th>
                                    <th className="text-[#3C3C3C] text-xl font-semibold">Department</th>
                                    <th className="text-[#3C3C3C] text-xl font-semibold">Week</th>
                                    <th className="text-[#3C3C3C] text-xl font-semibold">Tittle</th>
                                    <th className="text-[#3C3C3C] text-xl font-semibold">Format</th>

                                </tr>
                                <tr>
                                    <td className="pt-5 text-[#3C3C3C] text-xl font-normal" >1</td>
                                    <td className="pt-5 text-[#3C3C3C] text-xl font-normal" >Harsh Kadyan</td>
                                    <td className="pt-5 text-[#8A8A8A] text-xl font-normal" >Product Lab</td>
                                    <td className="pt-5 text-[#8A8A8A] text-xl font-normal" >Week 4</td>
                                    <td className="pt-5 text-[#3C3C3C] text-xl font-normal" >Ideation for...</td>
                                    <td className="pt-5 text-[#3C3C3C] text-xl font-normal" >PDF</td>
                                    <td className="pt-5 " ><p className="text-[#081765] bg-[#F0F7FF] flex items-center gap-2 rounded-md p-1 w-[70%]"><img src={eye1} alt="icon" /> View Details</p></td>
                                </tr>
                                <tr>
                                    <td className="pt-5 text-[#3C3C3C] text-xl font-normal" >2</td>
                                    <td className="pt-5 text-[#3C3C3C] text-xl font-normal" >Harsh Kadyan</td>
                                    <td className="pt-5 text-[#8A8A8A] text-xl font-normal" >Product Lab</td>
                                    <td className="pt-5 text-[#8A8A8A] text-xl font-normal" >Week 4</td>
                                    <td className="pt-5 text-[#3C3C3C] text-xl font-normal" >Ideation for...</td>
                                    <td className="pt-5 text-[#3C3C3C] text-xl font-normal" >PDF</td>
                                    <td className="pt-5 " ><p className="text-[#081765] bg-[#F0F7FF] flex items-center gap-2 rounded-md p-1 w-[70%]"><img src={eye1} alt="icon" /> View Details</p></td>
                                </tr>
                                <tr>
                                    <td className="pt-5 text-[#3C3C3C] text-xl font-normal" >3</td>
                                    <td className="pt-5 text-[#3C3C3C] text-xl font-normal" >Harsh Kadyan</td>
                                    <td className="pt-5 text-[#8A8A8A] text-xl font-normal" >Product Lab</td>
                                    <td className="pt-5 text-[#8A8A8A] text-xl font-normal" >Week 4</td>
                                    <td className="pt-5 text-[#3C3C3C] text-xl font-normal" >Ideation for...</td>
                                    <td className="pt-5 text-[#3C3C3C] text-xl font-normal" >PDF</td>
                                    <td className="pt-5 " ><p className="text-[#081765] bg-[#F0F7FF] flex items-center gap-2 rounded-md p-1 w-[70%]"><img src={eye1} alt="icon" /> View Details</p></td>
                                </tr>
                                <tr>
                                    <td className="pt-5 text-[#3C3C3C] text-xl font-normal" >4</td>
                                    <td className="pt-5 text-[#3C3C3C] text-xl font-normal" >Harsh Kadyan</td>
                                    <td className="pt-5 text-[#8A8A8A] text-xl font-normal" >Product Lab</td>
                                    <td className="pt-5 text-[#8A8A8A] text-xl font-normal" >Week 4</td>
                                    <td className="pt-5 text-[#3C3C3C] text-xl font-normal" >Ideation for...</td>
                                    <td className="pt-5 text-[#3C3C3C] text-xl font-normal" >PDF</td>
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

export default DepartmentEvaluation;

