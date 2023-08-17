//StudentControlDashboard

import React, { useContext, useState } from "react";
import Layout from "../Layout";
import { Link } from "react-router-dom";
import Badge from '@mui/material/Badge';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import filter from "../../../assets/ExecutionMentor/filter.svg"





const StudentControlDashboard = () => {


    const [selectedTab1, setSelectedTab1] = useState('manageStudentDashboard');

    const handleTabClick1 = (tab) => {
        setSelectedTab1(tab);
    };

    ///
    const [selectedTab2, setSelectedTab2] = useState('studentControlDashboard');

    const handleTabClick2 = (tab) => {
        setSelectedTab2(tab);
    };




    return (
        <div>
            <Layout>
                <div className='flex items-center justify-center gap-7 pt-20 lg:pt-10 '>
                    <div className="UserManagement origin-top-left rotate-[-0.51deg] text-zinc-500 text-[30px] font-medium">Student Control</div>
                    <div className="Input w-[425px] h-16 relative bg-slate-100 rounded-[40px] shadow-inner">
                        <input className="Search w-[329px] left-[32px] top-[12px] absolute text-zinc-500 text-[20px] font-light leading-10 bg-transparent focus:outline-0" placeholder='Search' />
                        <div className="Button w-10 h-10 left-[373px] top-[12px] absolute bg-zinc-500 rounded-[32px] shadow">
                            <SearchIcon className="Search1 w-6 h-6 left-[8px] top-[8px] absolute text-white" />
                        </div>
                    </div>
                    <Badge badgeContent={1} color='error'>
                        <NotificationsIcon color="action" />
                    </Badge>
                </div>

                <div className="w-full">
                    <div className="flex justify-between items-center">
                        <div className='px-10 flex gap-10 pb-3 text-lg mt-10  '>
                            <Link to='/manageStudentDashboard'

                                onClick={() => handleTabClick1('manageStudentDashboard')}
                                style={{
                                    borderRadius: "8px",
                                    border: "1px solid #D9D9D9",
                                    boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                                    padding: "8px",
                                    fontWeight: selectedTab1 === 'manageStudentDashboard' ? 'bold' : 'normal',
                                   
                                    backgroundColor: selectedTab1 === 'manageStudentDashboard' ? '#93D6F6' : '#BEBEBE'
                                }}
                            >
                                Manage Student  Dashboard
                            </Link>

                            <Link to='/manageStudents'
                                
                                onClick={() => handleTabClick1('manageStudents')}
                                style={{
                                    borderRadius: "8px",
                                    border: "1px solid #D9D9D9",
                                    boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                                    padding: "8px",
                                    fontWeight: selectedTab1 === 'manageStudents' ? 'bold' : 'normal',
                                   
                                    backgroundColor: setSelectedTab1 === 'manageStudents' ? '#93D6F6' : 'none'
                                }}
                            >
                                Manage Students
                            </Link>

                        </div>

                    </div>




                </div>

                <div className="w-full">
                    <div className="flex justify-between items-center">
                        <div className='px-10 flex gap-10 pb-3 text-lg mt-10  '>
                            <Link to='/paidDashboard'
                                onClick={() => handleTabClick2('studentControlDashboard')}
                                style={{
                                    fontWeight: selectedTab2 === 'studentControlDashboard' ? 'bold' : 'normal',
                                    borderBottom: selectedTab2 === 'studentControlDashboard' ? '2px solid #0A98EA' : 'none',
                                    color: selectedTab2 === 'studentControlDashboard' ? '#0A98EA' : '#BEBEBE'
                                }}
                            >
                                Paid Dashboard
                            </Link>

                            <Link to='/unpaidDashboard'
                                onClick={() => handleTabClick2('unpaidDashboard')}
                                style={{
                                    fontWeight: selectedTab2 === 'unpaidDashboard' ? 'bold' : 'normal',
                                    borderBottom: selectedTab2 === 'unpaidDashboard' ? '2px solid black' : 'none',
                                    color: setSelectedTab2 === 'unpaidDashboard' ? 'none' : '#BEBEBE'
                                }}
                            >
                                Unpaid Dashboard
                            </Link>

                        </div>

                    </div>




                </div>










            </Layout >
        </div >




    );
};

export default StudentControlDashboard;

