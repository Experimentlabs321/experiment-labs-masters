
import React, { useContext, useState } from "react";
import Layout from "../Layout";
import { Link } from "react-router-dom";
import AssignmentUpNev from "./AssignmentUpNev";
import AssignmentRightNev from "./AssignmentRightNev";
import eye from '../../../assets/ExecutionMentor/eye.svg'



const MentorAssignments = () => {
    const [selectedTab, setSelectedTab] = useState('mentorAssignments');

    const handleTabClick = (tab) => {
        setSelectedTab(tab);
    };
    ///



    return (
        <div>
            <Layout>



                <div className=''>

                    <AssignmentUpNev page={'assignment'} />

                </div>


                <div className="flex mt-24">
                    <div className="w-full">
                        <div className="flex justify-between">
                            <div className='px-10 flex gap-10 pb-3 text-lg mt-10'>
                                <Link to='/mentorAssignments'
                                    onClick={() => handleTabClick('Assignments')}
                                    style={{
                                        fontWeight: selectedTab === 'Assignments' || 'mentorAssignments' ? 'bold' : 'normal',
                                        borderBottom: selectedTab === 'Assignments' || 'mentorAssignments' ? '2px solid black' : 'none'
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
                            <div className="mt-10 text-[#F50000] text-lg font-medium">
                                <p>Pending evaluations - 22</p>
                            </div>
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

                        <div className="grid grid-cols-3 gap-3 ms-5 my-10">


                            <div className="bg-[#F0F7FF] rounded-[20px] flex gap-2 flex-col items-center py-5">
                                <p className="text-lg font-bold">Product Lab</p>
                                <p className="text-[15px] font-medium">Name of the student</p>
                                <p className="text-[15px] font-medium">Week 4</p>
                                <p className="text-[15px] font-bold">Topic</p>
                                <div className="flex gap-3 mt-5">
                                    <p className="text-[15px] font-semibold text-[#038400] border-b border-b-[#038400]">Accept</p>
                                    <p className="text-[15px] font-semibold text-[#F00] border-b border-b-[#F00]">Decline</p>
                                </div>
                                <Link to='/assignmentEvaluation1' className="flex gap-2 bg-[#081765] text-[#fff] p-2 rounded-md mb-2 mt-3">
                                    <img src={eye} alt='eye' />
                                    <p className="text-base font-normal">View assignment</p>
                                </Link>
                            </div>


                            <div className="bg-[#F0F7FF] rounded-[20px] flex gap-2 flex-col items-center py-5">
                                <p className="text-lg font-bold">Product Lab</p>
                                <p className="text-[15px] font-medium">Name of the student</p>
                                <p className="text-[15px] font-medium">Week 4</p>
                                <p className="text-[15px] font-bold">Topic</p>
                                <div className="flex gap-3 mt-5">
                                    <p className="text-[15px] font-semibold text-[#038400] border-b border-b-[#038400]">Accept</p>
                                    <p className="text-[15px] font-semibold text-[#F00] border-b border-b-[#F00]">Decline</p>
                                </div>
                                <Link to='/assignmentEvaluation1' className="flex gap-2 bg-[#081765] text-[#fff] p-2 rounded-md mb-2 mt-3">
                                    <img src={eye} alt='eye' />
                                    <p className="text-base font-normal">View assignment</p>
                                </Link>
                            </div>


                            <div className="bg-[#F0F7FF] rounded-[20px] flex gap-2 flex-col items-center py-5">
                                <p className="text-lg font-bold">Product Lab</p>
                                <p className="text-[15px] font-medium">Name of the student</p>
                                <p className="text-[15px] font-medium">Week 4</p>
                                <p className="text-[15px] font-bold">Topic</p>
                                <div className="flex gap-3 mt-5">
                                    <p className="text-[15px] font-semibold text-[#038400] border-b border-b-[#038400]">Accept</p>
                                    <p className="text-[15px] font-semibold text-[#F00] border-b border-b-[#F00]">Decline</p>
                                </div>
                                <Link to='/assignmentEvaluation1' className="flex gap-2 bg-[#081765] text-[#fff] p-2 rounded-md mb-2 mt-3">
                                    <img src={eye} alt='eye' />
                                    <p className="text-base font-normal">View assignment</p>
                                </Link>
                            </div>


                            <div className="bg-[#F0F7FF] rounded-[20px] flex gap-2 flex-col items-center py-5">
                                <p className="text-lg font-bold">Product Lab</p>
                                <p className="text-[15px] font-medium">Name of the student</p>
                                <p className="text-[15px] font-medium">Week 4</p>
                                <p className="text-[15px] font-bold">Topic</p>
                                <div className="flex gap-3 mt-5">
                                    <p className="text-[15px] font-semibold text-[#038400] border-b border-b-[#038400]">Accept</p>
                                    <p className="text-[15px] font-semibold text-[#F00] border-b border-b-[#F00]">Decline</p>
                                </div>
                                <Link to='/assignmentEvaluation1' className="flex gap-2 bg-[#081765] text-[#fff] p-2 rounded-md mb-2 mt-3">
                                    <img src={eye} alt='eye' />
                                    <p className="text-base font-normal">View assignment</p>
                                </Link>
                            </div>


                            <div className="bg-[#F0F7FF] rounded-[20px] flex gap-2 flex-col items-center py-5">
                                <p className="text-lg font-bold">Product Lab</p>
                                <p className="text-[15px] font-medium">Name of the student</p>
                                <p className="text-[15px] font-medium">Week 4</p>
                                <p className="text-[15px] font-bold">Topic</p>
                                <div className="flex gap-3 mt-5">
                                    <p className="text-[15px] font-semibold text-[#038400] border-b border-b-[#038400]">Accept</p>
                                    <p className="text-[15px] font-semibold text-[#F00] border-b border-b-[#F00]">Decline</p>
                                </div>
                                <Link to='/assignmentEvaluation1' className="flex gap-2 bg-[#081765] text-[#fff] p-2 rounded-md mb-2 mt-3">
                                    <img src={eye} alt='eye' />
                                    <p className="text-base font-normal">View assignment</p>
                                </Link>
                            </div>


                            <div className="bg-[#F0F7FF] rounded-[20px] flex gap-2 flex-col items-center py-5">
                                <p className="text-lg font-bold">Product Lab</p>
                                <p className="text-[15px] font-medium">Name of the student</p>
                                <p className="text-[15px] font-medium">Week 4</p>
                                <p className="text-[15px] font-bold">Topic</p>
                                <div className="flex gap-3 mt-5">
                                    <p className="text-[15px] font-semibold text-[#038400] border-b border-b-[#038400]">Accept</p>
                                    <p className="text-[15px] font-semibold text-[#F00] border-b border-b-[#F00]">Decline</p>
                                </div>
                                <Link to='/assignmentEvaluation1' className="flex gap-2 bg-[#081765] text-[#fff] p-2 rounded-md mb-2 mt-3">
                                    <img src={eye} alt='eye' />
                                    <p className="text-base font-normal">View assignment</p>
                                </Link>
                            </div>


                            <div className="bg-[#F0F7FF] rounded-[20px] flex gap-2 flex-col items-center py-5">
                                <p className="text-lg font-bold">Product Lab</p>
                                <p className="text-[15px] font-medium">Name of the student</p>
                                <p className="text-[15px] font-medium">Week 4</p>
                                <p className="text-[15px] font-bold">Topic</p>
                                <div className="flex gap-3 mt-5">
                                    <p className="text-[15px] font-semibold text-[#038400] border-b border-b-[#038400]">Accept</p>
                                    <p className="text-[15px] font-semibold text-[#F00] border-b border-b-[#F00]">Decline</p>
                                </div>
                                <Link to='/assignmentEvaluation1' className="flex gap-2 bg-[#081765] text-[#fff] p-2 rounded-md mb-2 mt-3">
                                    <img src={eye} alt='eye' />
                                    <p className="text-base font-normal">View assignment</p>
                                </Link>
                            </div>


                            <div className="bg-[#F0F7FF] rounded-[20px] flex gap-2 flex-col items-center py-5">
                                <p className="text-lg font-bold">Product Lab</p>
                                <p className="text-[15px] font-medium">Name of the student</p>
                                <p className="text-[15px] font-medium">Week 4</p>
                                <p className="text-[15px] font-bold">Topic</p>
                                <div className="flex gap-3 mt-5">
                                    <p className="text-[15px] font-semibold text-[#038400] border-b border-b-[#038400]">Accept</p>
                                    <p className="text-[15px] font-semibold text-[#F00] border-b border-b-[#F00]">Decline</p>
                                </div>
                                <Link to='/assignmentEvaluation1' className="flex gap-2 bg-[#081765] text-[#fff] p-2 rounded-md mb-2 mt-3">
                                    <img src={eye} alt='eye' />
                                    <p className="text-base font-normal">View assignment</p>
                                </Link>
                            </div>


                            <div className="bg-[#F0F7FF] rounded-[20px] flex gap-2 flex-col items-center py-5">
                                <p className="text-lg font-bold">Product Lab</p>
                                <p className="text-[15px] font-medium">Name of the student</p>
                                <p className="text-[15px] font-medium">Week 4</p>
                                <p className="text-[15px] font-bold">Topic</p>
                                <div className="flex gap-3 mt-5">
                                    <p className="text-[15px] font-semibold text-[#038400] border-b border-b-[#038400]">Accept</p>
                                    <p className="text-[15px] font-semibold text-[#F00] border-b border-b-[#F00]">Decline</p>
                                </div>
                                <Link to='/assignmentEvaluation1' className="flex gap-2 bg-[#081765] text-[#fff] p-2 rounded-md mb-2 mt-3">
                                    <img src={eye} alt='eye' />
                                    <p className="text-base font-normal">View assignment</p>
                                </Link>
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

export default MentorAssignments;

