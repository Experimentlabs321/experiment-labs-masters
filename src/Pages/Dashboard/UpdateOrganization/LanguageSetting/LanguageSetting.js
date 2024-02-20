import React, { useState } from 'react';
import DialogLayout from '../../Shared/DialogLayout';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import AdminDashboardDetails from './AdminDashboardDetails';
import DialogLayoutForFromControl from '../../Shared/DialogLayoutForFromControl';
import AdminAnnouncementsDetails from './AdminAnnouncementsDetails';
import AdminContentManagementDetails from './AdminContentManagementDetails';


const LanguageSetting = () => {
    //admin dashboard
    const [editAdminDashboardNameOpen, setEditAdminDashboardNameOpen] = useState(false);
    const [adminDashboardOpen, setAdminDashboardOpen] = useState(false);
    const [adminDashboardDetailsOpen, setAdminDashboardDetailsOpen] = useState(false);
    const [dashboardNameInput, setDashboardNameInput] = useState('');
    //Announcements
    const [announcementsNameInput, setAnnouncementsNameInput] = useState('');
    const [editAnnouncementsNameOpen, setEditAnnouncementsNameOpen] = useState(false);
    const [adminAnnouncementsDetailsOpen, setAdminAnnouncementsDetailsOpen] = useState(false);
    //Content Management
    const [contentManagementNameInput, setContentManagementNameInput] = useState('');
    const [editContentManagementNameOpen, setEditContentManagementNameOpen] = useState(false);
    const [adminContentManagementDetailsOpen, setAdminContentManagementDetailsOpen] = useState(false);

 
    // student dashboard
    const [editStudentDashboardNameOpen, setEditStudentDashboardNameOpen] = useState(false);
    const [studentDashboardOpen, setStudentDashboardOpen] = useState(false);
    const [studentDashboardDetailsOpen, setStudentDashboardDetailsOpen] = useState(false);


    return (
        <div className="w-[96%] mx-auto my-10">

            {/*  Admin dashboard */}
            <div>
                <div className='w-[100%] flex items-center justify-between border p-2 rounded-xl'>
                    <div className='flex items-center gap-7'>
                        <p className='text-xl font-medium'> Admin Dashboard</p>
                    </div>
                    {
                        (adminDashboardOpen) ? <KeyboardArrowUpIcon className='cursor-pointer' onClick={() => {
                            setAdminDashboardOpen(false);

                        }} /> : <KeyboardArrowDownIcon className='cursor-pointer' onClick={() => {
                            setAdminDashboardOpen(true);

                        }} />
                    }

                </div>


                {
                    (adminDashboardOpen) && <>


                        {/* dashboard */}
                        <div className='mt-2'>
                            <div className='w-[100%] flex items-center justify-between border p-2 rounded-xl'>
                                <div className='flex items-center gap-7'>
                                    <p className='text-xl font-medium'>
                                        {
                                            dashboardNameInput ? dashboardNameInput : "Dashboard"
                                        }

                                    </p>
                                    <button
                                        onClick={() => {
                                            setEditAdminDashboardNameOpen(true);
                                            /*    setChapterData({
                                                 ...chapter,
                                                 index: index,
                                               }); */
                                        }}
                                        className="ml-[24px]"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="18"
                                            height="20"
                                            viewBox="0 0 18 20"
                                            fill="none"
                                        >
                                            <path
                                                d="M13.648 0.961914L17.3711 4.88525L14.5329 7.87744L10.8098 3.95411L13.648 0.961914ZM0.0117188 19.2551H3.73478L12.7781 9.72533L9.05502 5.802L0.0117188 15.3318V19.2551Z"
                                                fill="#282828"
                                            />
                                        </svg>
                                    </button>
                                </div>
                                {
                                    (adminDashboardDetailsOpen) ? <KeyboardArrowUpIcon className='cursor-pointer' onClick={() => {
                                        setAdminDashboardDetailsOpen(false);

                                    }} /> : <KeyboardArrowDownIcon className='cursor-pointer' onClick={() => {
                                        setAdminDashboardDetailsOpen(true);

                                    }} />
                                }


                                {/* <input name='dashboard' type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here'/> */}
                            </div>
                            <DialogLayoutForFromControl
                                open={editAdminDashboardNameOpen}
                                setOpen={setEditAdminDashboardNameOpen}
                                width={400}
                                borderRadius="15px"
                                title={
                                    <p className=" h-[90px] text-[22px] font-[700] flex items-center text-[#3E4DAC] px-[32px] py-5 border-b-2">
                                        Edit Dashboard Name
                                    </p>
                                }
                            >

                                <div>
                                    <input
                                        className="mt-6 border rounded-md w-[358px] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF] "
                                        name="dashboardName"
                                        type="text"
                                        placeholder="dashboard"
                                        value={dashboardNameInput}
                                        onChange={(e) => setDashboardNameInput(e.target.value)}
                                    />
                                    <div className="flex justify-center mt-5">

                                        <button
                                            className="px-[20px] py-3 bg-[#3E4DAC] hover:bg-opacity-70 text-[#fff] cursor-pointer text-xl font-bold rounded-lg"
                                            onClick={() => setEditAdminDashboardNameOpen(false)}

                                        >Add</button>


                                    </div>

                                </div>
                            </DialogLayoutForFromControl>

                            {
                                (adminDashboardDetailsOpen) && (
                                    <AdminDashboardDetails />
                                )
                            }


                        </div>

                        {/* Announcements */}

                        <div className='mt-2'>
                            <div className='w-[100%] flex items-center justify-between border p-2 rounded-xl'>
                                <div className='flex items-center gap-7'>
                                    <p className='text-xl font-medium'>
                                        {
                                            announcementsNameInput ? announcementsNameInput : "Announcements"
                                        }

                                    </p>
                                    <button
                                        onClick={() => {
                                            setEditAnnouncementsNameOpen(true);
                                            /*    setChapterData({
                                                 ...chapter,
                                                 index: index,
                                               }); */
                                        }}
                                        className="ml-[24px]"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="18"
                                            height="20"
                                            viewBox="0 0 18 20"
                                            fill="none"
                                        >
                                            <path
                                                d="M13.648 0.961914L17.3711 4.88525L14.5329 7.87744L10.8098 3.95411L13.648 0.961914ZM0.0117188 19.2551H3.73478L12.7781 9.72533L9.05502 5.802L0.0117188 15.3318V19.2551Z"
                                                fill="#282828"
                                            />
                                        </svg>
                                    </button>
                                </div>
                                {
                                    (adminAnnouncementsDetailsOpen) ? <KeyboardArrowUpIcon className='cursor-pointer' onClick={() => {
                                        setAdminAnnouncementsDetailsOpen(false);

                                    }} /> : <KeyboardArrowDownIcon className='cursor-pointer' onClick={() => {
                                        setAdminAnnouncementsDetailsOpen(true);

                                    }} />
                                }



                            </div>
                            <DialogLayoutForFromControl
                                open={editAnnouncementsNameOpen}
                                setOpen={setEditAnnouncementsNameOpen}
                                width={400}
                                borderRadius="15px"
                                title={
                                    <p className=" h-[90px] text-[22px] font-[700] flex items-center text-[#3E4DAC] px-[32px] py-5 border-b-2">
                                        Edit Announcements Name
                                    </p>
                                }
                            >

                                <div>
                                    <input
                                        className="mt-6 border rounded-md w-[358px] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF] "
                                        name="announcementsName"
                                        type="text"
                                        placeholder="Announcements"
                                        value={announcementsNameInput}
                                        onChange={(e) => setAnnouncementsNameInput(e.target.value)}
                                    />
                                    <div className="flex justify-center mt-5">

                                        <button
                                            className="px-[20px] py-3 bg-[#3E4DAC] hover:bg-opacity-70 text-[#fff] cursor-pointer text-xl font-bold rounded-lg"
                                            onClick={() => setEditAnnouncementsNameOpen(false)}

                                        >Add</button>


                                    </div>

                                </div>
                            </DialogLayoutForFromControl>

                            {
                                (adminAnnouncementsDetailsOpen) && (
                                    <AdminAnnouncementsDetails />
                                )
                            }


                        </div>

                       {/*  Content Management */}
                       <div className='mt-2'>
                            <div className='w-[100%] flex items-center justify-between border p-2 rounded-xl'>
                                <div className='flex items-center gap-7'>
                                    <p className='text-xl font-medium'>
                                        {
                                            contentManagementNameInput ? contentManagementNameInput : "Content Management"
                                        }

                                    </p>
                                    <button
                                        onClick={() => {
                                            setEditContentManagementNameOpen(true);
                                            /*    setChapterData({
                                                 ...chapter,
                                                 index: index,
                                               }); */
                                        }}
                                        className="ml-[24px]"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="18"
                                            height="20"
                                            viewBox="0 0 18 20"
                                            fill="none"
                                        >
                                            <path
                                                d="M13.648 0.961914L17.3711 4.88525L14.5329 7.87744L10.8098 3.95411L13.648 0.961914ZM0.0117188 19.2551H3.73478L12.7781 9.72533L9.05502 5.802L0.0117188 15.3318V19.2551Z"
                                                fill="#282828"
                                            />
                                        </svg>
                                    </button>
                                </div>
                                {
                                    (adminContentManagementDetailsOpen) ? <KeyboardArrowUpIcon className='cursor-pointer' onClick={() => {
                                        setAdminContentManagementDetailsOpen(false);

                                    }} /> : <KeyboardArrowDownIcon className='cursor-pointer' onClick={() => {
                                        setAdminContentManagementDetailsOpen(true);

                                    }} />
                                }



                            </div>
                            <DialogLayoutForFromControl
                                open={editContentManagementNameOpen}
                                setOpen={setEditContentManagementNameOpen}
                                width={400}
                                borderRadius="15px"
                                title={
                                    <p className=" h-[90px] text-[22px] font-[700] flex items-center text-[#3E4DAC] px-[32px] py-5 border-b-2">
                                        Edit Content Management Name
                                    </p>
                                }
                            >

                                <div>
                                    <input
                                        className="mt-6 border rounded-md w-[358px] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF] "
                                        name="contentManagementName"
                                        type="text"
                                        placeholder="Content Management"
                                        value={contentManagementNameInput}
                                        onChange={(e) => setContentManagementNameInput(e.target.value)}
                                    />
                                    <div className="flex justify-center mt-5">

                                        <button
                                            className="px-[20px] py-3 bg-[#3E4DAC] hover:bg-opacity-70 text-[#fff] cursor-pointer text-xl font-bold rounded-lg"
                                            onClick={() => setEditContentManagementNameOpen(false)}

                                        >Add</button>


                                    </div>

                                </div>
                            </DialogLayoutForFromControl>

                            {
                                (adminContentManagementDetailsOpen) && (
                                    <AdminContentManagementDetails />
                                )
                            }


                        </div>

                    </>
                }




            </div>

            {/*   Student dashboard */}

            <div className='mt-5'>
                <div className='w-[100%] flex items-center justify-between border p-2 rounded-xl'>
                    <div className='flex items-center gap-7'>
                        <p className='text-xl font-medium'> Student Dashboard</p>
                    </div>
                    {
                        (studentDashboardOpen) ? <KeyboardArrowUpIcon className='cursor-pointer' onClick={() => {
                            setStudentDashboardOpen(false);

                        }} /> : <KeyboardArrowDownIcon className='cursor-pointer' onClick={() => {
                            setStudentDashboardOpen(true);

                        }} />
                    }

                </div>

                {/* dashboard */}
                {
                    (studentDashboardOpen) && (
                        <div className='mt-3'>
                            <div className='w-[100%] flex items-center justify-between border p-2 rounded-xl'>
                                <div className='flex items-center gap-7'>
                                    <p className='text-xl font-medium'>Dashboard</p>
                                    <button
                                        onClick={() => {
                                            setEditStudentDashboardNameOpen(true);
                                            /*    setChapterData({
                                                 ...chapter,
                                                 index: index,
                                               }); */
                                        }}
                                        className="ml-[24px]"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="18"
                                            height="20"
                                            viewBox="0 0 18 20"
                                            fill="none"
                                        >
                                            <path
                                                d="M13.648 0.961914L17.3711 4.88525L14.5329 7.87744L10.8098 3.95411L13.648 0.961914ZM0.0117188 19.2551H3.73478L12.7781 9.72533L9.05502 5.802L0.0117188 15.3318V19.2551Z"
                                                fill="#282828"
                                            />
                                        </svg>
                                    </button>
                                </div>
                                {
                                    (studentDashboardDetailsOpen) ? <KeyboardArrowUpIcon className='cursor-pointer' onClick={() => {
                                        setStudentDashboardDetailsOpen(false);

                                    }} /> : <KeyboardArrowDownIcon className='cursor-pointer' onClick={() => {
                                        setStudentDashboardDetailsOpen(true);

                                    }} />
                                }


                                {/* <input name='dashboard' type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here'/> */}
                            </div>
                            <DialogLayout
                                open={editStudentDashboardNameOpen}
                                setOpen={setEditStudentDashboardNameOpen}
                                width={400}
                                borderRadius="15px"
                                title={
                                    <p className=" h-[90px] text-[22px] font-[700] flex items-center text-[#3E4DAC] px-[32px] py-5 border-b-2">
                                        Edit Dashboard Name
                                    </p>
                                }
                            >
                                <form
                                    //   onSubmit={handleEditChapterName}
                                    className="px-[32px] py-[24px] "
                                >
                                    <h1 className=" text-[18px] font-[700] mb-[20px] ">
                                        Dashboard Name
                                    </h1>
                                    <input
                                        type="text"
                                        name="dashboardName"
                                        // defaultValue={chapterData?.chapterName}
                                        placeholder="Eg. Onboarding"
                                        className="bg-[#F6F7FF] border-[1px] border-[#CECECE] w-full rounded-[6px] py-[15px] px-[18px] "
                                    />
                                    <div className="w-full flex items-center justify-center mt-[40px]">
                                        <input
                                            type="submit"
                                            value="Update"
                                            className="py-[15px] px-[48px] cursor-pointer text-[20px] font-[700] rounded-[8px] bg-[#3E4DAC] text-white "
                                        />
                                    </div>
                                </form>
                            </DialogLayout>

                            {/*     {
                                (studentDashboardDetailsOpen) && (
                                    <DashboardDetails />
                                )
                            }
 */}

                        </div>
                    )
                }
            </div>



        </div>
    );
};

export default LanguageSetting;