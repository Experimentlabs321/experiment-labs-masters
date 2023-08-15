//AssignmentEvaluation2.js



import React, { useContext, useState } from "react";
import Layout from "../Layout";
import { Link } from "react-router-dom";
import AssignmentUpNev from "./AssignmentUpNev";
import AssignmentRightNev from "./AssignmentRightNev";
import arrowRight from '../../../assets/ExecutionMentor/arrowRight.svg'



const AssignmentEvaluation2 = () => {
    const [selectedTab, setSelectedTab] = useState('mentorAssignments');

    const handleTabClick = (tab) => {
        setSelectedTab(tab);
    };
    ///
    const [pointGiven, setPointGiven] = useState(false);



    return (
        <div>
            <Layout>



                <div className=''>

                    <AssignmentUpNev />

                </div>


                <div className="flex mt-24">
                    <form className="w-full">
                        <div className="flex justify-between">
                            <div className='px-10 flex gap-10 pb-3 text-lg mt-10'>
                                <Link to='/mentorAssignments'
                                    onClick={() => handleTabClick('Assignments')}
                                    style={{
                                        fontWeight: selectedTab === 'mentorAssignments' ? 'bold' : 'normal',
                                        borderBottom: selectedTab === 'mentorAssignments' ? '2px solid black' : 'none'
                                    }}
                                >
                                    Assignments
                                </Link>
                                <Link to='/assignmentsQuiz'
                                    onClick={() => handleTabClick('Quiz')}
                                    style={{
                                        fontWeight: selectedTab === 'Quiz' ? 'bold' : 'normal',
                                        borderBottom: selectedTab === 'Quiz' ? '2px solid black' : 'none'
                                    }}
                                >
                                    Quiz
                                </Link>
                                <Link to='/assignmentsLiveTest'
                                    onClick={() => handleTabClick('Live Test')}
                                    style={{
                                        fontWeight: selectedTab === 'Live Test' ? 'bold' : 'normal',
                                        borderBottom: selectedTab === 'Live Test' ? '2px solid black' : 'none'
                                    }}
                                >
                                    Live Test
                                </Link>
                            </div>
                            <div className="mt-10 ">
                                <p className="bg-[#FFEAE9] text-base font-bold px-3 py-1 rounded-md"> <span className="me-3 ">+</span>Add additional feedback</p>
                            </div>

                        </div>



                        <div className="ms-10 bg-[#F0F7FF] rounded-[20px] h-[300px] my-5 p-5">
                            <p>
                                PDF/MOV
                            </p>
                        </div>



                        <div className=" ms-10 my-10 flex justify-between ">
                            {
                                !pointGiven && (
                                    <div>

                                        <div className=" bg-[#F0F7FF] p-3 flex gap-2 items-center justify-between rounded-md ">
                                            <div className="">
                                                <p>Communication skills</p>
                                                <p className="text-[#B7B7B7] text-[10px] font-bold">Marks</p>
                                            </div>
                                            <img onClick={() => setPointGiven(true)} src={arrowRight} alt='' />

                                        </div>

                                        <div className="mt-5 bg-[#F0F7FF] p-3 flex gap-2 items-center justify-between rounded-md ">
                                            <div className="">
                                                <p>Earning</p>
                                                <p className="text-[#B7B7B7] text-[10px] font-bold">Marks</p>
                                            </div>
                                            <img onClick={() => setPointGiven(true)} src={arrowRight} alt='' />

                                        </div>

                                        <div className="mt-5 bg-[#F0F7FF] p-3 flex gap-2 items-center justify-between rounded-md ">
                                            <div className="">
                                                <p>Communication skills</p>
                                                <p className="text-[#B7B7B7] text-[10px] font-bold">Marks</p>
                                            </div>
                                            <img onClick={() => setPointGiven(true)} src={arrowRight} alt='' />

                                        </div>

                                    </div>
                                )
                            }
                            {
                                pointGiven && (
                                    <div>
                                        <div className=" bg-[#F0F7FF] p-3 flex gap-2 items-center justify-between rounded-md ">
                                            <div className="">
                                                <p>Points Given</p>
                                                <p className="text-[#B7B7B7] text-[10px] font-bold">Marks</p>
                                            </div>
                                            <img src={arrowRight} alt='' />

                                        </div>
                                    </div>

                                )
                            }


                            <div>

                                <div className="flex items-center justify-between p-2 "
                                    style={{
                                        borderRadius: "5px",
                                        border: "1px solid #D9D9D9"
                                    }}
                                >
                                    <div className="text-xs font-semibold flex items-center gap-2 ">
                                        <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />
                                        <label for="vehicle1"> Verbal communication</label>
                                    </div>
                                    <input className="w-[15%] text-[10px] font-bold" type="text" placeholder="marks" />

                                </div>

                                <div className="flex items-center justify-between p-2 mt-5 "
                                    style={{
                                        borderRadius: "5px",
                                        border: "1px solid #D9D9D9"
                                    }}
                                >
                                    <div className="text-xs font-semibold flex items-center gap-2 ">
                                        <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />
                                        <label for="vehicle1">Non - Verbal communication</label>
                                    </div>
                                    <input className="w-[15%] text-[10px] font-bold" type="text" placeholder="marks" />

                                </div>

                                <div className="flex items-center justify-between p-2 mt-5"
                                    style={{
                                        borderRadius: "5px",
                                        border: "1px solid #D9D9D9"
                                    }}
                                >
                                    <div className="text-xs font-semibold flex items-center gap-2 ">
                                        <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />
                                        <label for="vehicle1"> Verbal communication</label>
                                    </div>
                                    <input className="w-[15%] text-[10px] font-bold" type="text" placeholder="marks" />

                                </div>

                            </div>

                            <div>

                                <div className="flex items-center justify-between p-2 "
                                    style={{
                                        borderRadius: "5px",
                                        border: "1px solid #D9D9D9"
                                    }}
                                >
                                    <div className="text-xs font-semibold flex items-center gap-2 ">
                                        <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />
                                        <label for="vehicle1">Active Listening</label>
                                    </div>
                                    <input className="w-[15%] text-[10px] font-bold" type="text" placeholder="marks" />

                                </div>

                                <div className="flex items-center justify-between p-2 mt-5 "
                                    style={{
                                        borderRadius: "5px",
                                        border: "1px solid #D9D9D9"
                                    }}
                                >
                                    <div className="text-xs font-semibold flex items-center gap-2 ">
                                        <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />
                                        <label for="vehicle1"> Verbal communication</label>
                                    </div>
                                    <input className="w-[15%] text-[10px] font-bold" type="text" placeholder="marks" />

                                </div>

                                <div className="flex items-center justify-between p-2 mt-5"
                                    style={{
                                        borderRadius: "5px",
                                        border: "1px solid #D9D9D9"
                                    }}
                                >
                                    <div className="text-xs font-semibold flex items-center gap-2 ">
                                        <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />
                                        <label for="vehicle1"> Verbal communication</label>
                                    </div>
                                    <input className="w-[15%] text-[10px] font-bold" type="text" placeholder="marks" />

                                </div>
                                <div className="mt-5 flex gap-3 justify-center">
                                    <input
                                        style={{
                                            borderRadius: "8.856px",
                                            border: "1px solid #CECECE",
                                            background: "#3E4DAC"
                                        }}
                                        className=" text-[#fff] text-base font-bold px-5 py-2" type="submit" value='Save' />
                                    <input
                                        style={{
                                            borderRadius: "8.856px",
                                            border: "1px solid #CECECE",
                                            background: "#FF557A"
                                        }}
                                        className=" text-[#fff] text-base font-bold px-5 py-2" type="submit" value='Save all' />

                                </div>

                            </div>

                        </div>

                    </form>

                    <div>
                        <AssignmentRightNev />

                    </div>


                </div>




            </Layout >
        </div >




    );
};

export default AssignmentEvaluation2;

