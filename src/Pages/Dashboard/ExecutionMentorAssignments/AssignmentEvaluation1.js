
import React, { useContext, useState } from "react";
import Layout from "../Layout";
import { Link } from "react-router-dom";
import AssignmentUpNev from "./AssignmentUpNev";
import AssignmentRightNev from "./AssignmentRightNev";




const AssignmentEvaluation1 = () => {
    const [selectedTab, setSelectedTab] = useState('mentorAssignments');

    const handleTabClick = (tab) => {
        setSelectedTab(tab);
    };
    ///



    return (
        <div>
            <Layout>


              
                    <div className=''>

                        <AssignmentUpNev />

                    </div>
           

                <div className="flex mt-24">
                    <div className="w-full">
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
                           {/*  <div className="mt-10 text-[#F50000] text-lg font-medium">
                                <p>Pending evaluations - 22</p>
                            </div> */}
                        </div>


                        <div className="flex ms-10 justify-between items-center text-lg font-bold mt-10 mb-7">
                            <div className="flex items-center gap-4">
                                <p className="h-2 w-2 bg-black rounded-full"></p>
                                <p className="">

                                    Subject Name
                                </p>

                            </div>
                            <p>Total weighted marks of the Assignment</p>
                        </div>
                        <div className="ms-10">
                            <p>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an
                            </p>
                        </div>

                        <div className="flex justify-between items-center ms-10 mt-10 text-lg font-bold">
                            <p>Grade method</p>
                            <p>Name of the Lab</p>
                        </div>

                        <div className=" py-10 ms-10 my-10 bg-[#F0F7FF] rounded-[20px] flex flex-col gap-5  items-center">
                            <p className="text-lg font-bold">Topic of the assignment</p>
                            <div className="border flex gap-10 py-2  w-[50%] text-lg font-bold"
                                style={{
                                    borderRadius: "20px",
                                    border: "2px solid #081765"
                                }}
                            >
                                <p className="ms-5 ">
                                    PDF/MOV
                                </p>
                                <p>Topic</p>
                            </div>

                            <Link to='/assignmentEvaluation2' className=" bg-[#081765] text-[#fff] px-5 py-1 rounded-md text-base font-medium ">
                              View now
                            </Link>



                        </div>

                    </div>

                    <div>
                        <AssignmentRightNev />

                    </div>


                </div>




            </Layout >
        </div >




    );
};

export default AssignmentEvaluation1;

