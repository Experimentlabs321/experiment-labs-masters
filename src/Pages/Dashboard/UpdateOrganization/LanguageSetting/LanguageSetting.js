import React, { useContext, useEffect, useState } from 'react';
import DialogLayout from '../../Shared/DialogLayout';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import AdminDashboardDetails from './AdminDashboardDetails';
import DialogLayoutForFromControl from '../../Shared/DialogLayoutForFromControl';
import AdminAnnouncementsDetails from './AdminAnnouncementsDetails';
import AdminContentManagementDetails from './AdminContentManagementDetails';
import AdminPointsRedemptionsDetails from './AdminPointsRedemptionsDetails';
import AdminSkillsManagementDetails from './AdminSkillsManagementDetails';
import AdminFeedbackDetails from './AdminFeedbackDetails';
import AdminUpdateOrganizationDetails from './AdminUpdateOrganizationDetails';
import AdminScheduleDetails from './AdminScheduleDetails';
import AdminAssignmentsDetails from './AdminAssignmentsDetails';
import AdminCreateCertificateDetails from './AdminCreateCertificateDetails';
import AdminMyLearnersDetails from './AdminMyLearnersDetails';
import AdminOffersDetails from './AdminOffersDetails';
import ContentManagementPage from './ContentManagementPage';
import axios from 'axios';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../../contexts/AuthProvider';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import PointsAndRedemptionsPage from './PointsAndRedemptionsPage';
import SkillsManagementPage from './SkillsManagementPage';
import FeedbackPage from './FeedbackPage';



const LanguageSetting = () => {
    const { userInfo } = useContext(AuthContext)
    const [organizationNavDetails, setOrganizationNavDetails] = useState();
    const [adminLoading, setAdminLoading] = useState(false);

    //console.log(userInfo?.organizationId)
    //console.log(organizationNavDetails)
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
    //Points & Redemptions
    const [pointsRedemptionsNameInput, setPointsRedemptionsNameInput] = useState('');
    const [editPointsRedemptionsNameOpen, setEditPointsRedemptionsNameOpen] = useState(false);
    const [adminPointsRedemptionsDetailsOpen, setAdminPointsRedemptionsDetailsOpen] = useState(false);
    //Skills Management
    const [skillsManagementNameInput, setSkillsManagementNameInput] = useState('');
    const [editSkillsManagementNameOpen, setEditSkillsManagementNameOpen] = useState(false);
    const [adminSkillsManagementDetailsOpen, setAdminSkillsManagementDetailsOpen] = useState(false);
    //Feedback
    const [feedbackNameInput, setFeedbackNameInput] = useState('');
    const [editFeedbackNameOpen, setEditFeedbackNameOpen] = useState(false);
    const [adminFeedbackDetailsOpen, setAdminFeedbackDetailsOpen] = useState(false);
    //Update Organization
    const [updateOrganizationNameInput, setUpdateOrganizationNameInput] = useState('');
    const [editUpdateOrganizationNameOpen, setEditUpdateOrganizationNameOpen] = useState(false);
    const [adminUpdateOrganizationDetailsOpen, setAdminUpdateOrganizationDetailsOpen] = useState(false);
    //Schedule
    const [scheduleNameInput, setScheduleNameInput] = useState('');
    const [editScheduleNameOpen, setEditScheduleNameOpen] = useState(false);
    const [adminScheduleDetailsOpen, setAdminScheduleDetailsOpen] = useState(false);
    //Assignments
    const [assignmentsNameInput, setAssignmentsNameInput] = useState('');
    const [editAssignmentsNameOpen, setEditAssignmentsNameOpen] = useState(false);
    const [adminAssignmentsDetailsOpen, setAdminAssignmentsDetailsOpen] = useState(false);
    //Create Certificate
    const [createCertificateNameInput, setCreateCertificateNameInput] = useState('');
    const [editCreateCertificateNameOpen, setEditCreateCertificateNameOpen] = useState(false);
    const [adminCreateCertificateDetailsOpen, setAdminCreateCertificateDetailsOpen] = useState(false);
    //My Learners
    const [myLearnersNameInput, setMyLearnersNameInput] = useState('');
    const [editMyLearnersNameOpen, setEditMyLearnersNameOpen] = useState(false);
    const [adminMyLearnersDetailsOpen, setAdminMyLearnersDetailsOpen] = useState(false);
    //My Learners
    const [offersNameInput, setOffersNameInput] = useState('');
    const [editOffersNameOpen, setEditOffersNameOpen] = useState(false);
    const [adminOffersDetailsOpen, setAdminOffersDetailsOpen] = useState(false);


    // student dashboard
    const [editStudentDashboardNameOpen, setEditStudentDashboardNameOpen] = useState(false);
    const [studentDashboardOpen, setStudentDashboardOpen] = useState(false);
    const [studentDashboardDetailsOpen, setStudentDashboardDetailsOpen] = useState(false);

    useEffect(() => {
        if (userInfo) {
            setAdminLoading(true);
            axios
                .get(
                    `${process.env.REACT_APP_SERVER_API}/api/v1/language/getNavItemsByOrganization/organizationId/${userInfo?.organizationId}`
                )
                .then((response) => {
                    setOrganizationNavDetails(response?.data);
                    setDashboardNameInput(response?.data?.dashboard?.newName);
                    setAnnouncementsNameInput(response?.data?.announcements?.newName);
                    setContentManagementNameInput(response?.data?.contentManagement?.newName);
                    setPointsRedemptionsNameInput(response?.data?.pointsAndRedemptions?.newName);
                    setSkillsManagementNameInput(response?.data?.skillsManagement?.newName);
                    setFeedbackNameInput(response?.data?.feedback?.newName);
                    setUpdateOrganizationNameInput(response?.data?.updateOrganization?.newName);
                    setScheduleNameInput(response?.data?.schedule?.newName);
                    setAssignmentsNameInput(response?.data?.assignments?.newName);
                    setCreateCertificateNameInput(response?.data?.createCertificate?.newName);
                    setMyLearnersNameInput(response?.data?.myLearners?.newName);
                    setOffersNameInput(response?.data?.offers?.newName);
                })
                .finally(() => {
                    setAdminLoading(false);
                });
        }
        setAdminLoading(false);
    }, [userInfo]);


    const handleSubmitNavName = async (itemName, NewItemName) => {
        const newItem = {
            newName: NewItemName,
        };

        const UpdateItemName = await axios.post(
            `${process.env.REACT_APP_SERVER_API}/api/v1/language/addNavItemsName/${itemName}/organizationId/${userInfo?.organizationId}`,
            newItem
        );

        console.log(UpdateItemName);

        if (UpdateItemName?.data === "NavItem updated successfully") {
            toast.success("Item Name Update Successfully");
            setEditAdminDashboardNameOpen(false);
        }
        else {
            toast.error("Update fail");
            //  setEditAdminDashboardNameOpen(false);
        }
    };



    return (
        <div className="w-[96%] mx-auto my-10">



            {/*  Admin dashboard */}
            <div>
                <div className={`w-[100%] flex items-center justify-between border p-2 rounded-xl ${adminDashboardOpen ? "bg-slate-100" : ""} `}>
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
                    adminLoading ?

                        <div className='flex justify-center'>
                            <Box sx={{ display: 'flex' }}>
                                <CircularProgress />
                            </Box>
                        </div>
                        :
                        <div>
                            {
                                (adminDashboardOpen) && <>


                                    {/* dashboard */}
                                    <div className='mt-2'>
                                        <div className={`w-[100%] flex items-center justify-between border p-2 rounded-xl ${adminDashboardDetailsOpen ? "bg-slate-100" : ""} `}>
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
                                                <p className=" h-[90px] text-[19px] font-[700] flex items-center text-[#3E4DAC] px-[32px] py-5 border-b-2">
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
                                                        onClick={(e) => {
                                                            //  setEditAdminDashboardNameOpen(false);
                                                            handleSubmitNavName("dashboard", dashboardNameInput);
                                                        }}
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
                                        <div className={`w-[100%] flex items-center justify-between border p-2 rounded-xl ${adminAnnouncementsDetailsOpen ? "bg-slate-100" : ""} `}>
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
                                                <p className=" h-[90px] text-[19px] font-[700] flex items-center text-[#3E4DAC] px-[32px] py-5 border-b-2">
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

                                                        onClick={(e) => {
                                                            setEditAnnouncementsNameOpen(false)
                                                            handleSubmitNavName("announcements", announcementsNameInput);
                                                        }}

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
                                        <div className={`w-[100%] flex items-center justify-between border p-2 rounded-xl ${adminContentManagementDetailsOpen ? "bg-slate-100" : ""} `}>
                                            <div className='flex items-center gap-7'>
                                                <p className='text-xl font-medium'>
                                                    {
                                                        contentManagementNameInput ? contentManagementNameInput : "Content Management"
                                                    }
                                                </p>
                                                <button
                                                    onClick={() => {
                                                        setEditContentManagementNameOpen(true);

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
                                                <p className=" h-[90px] text-[19px] font-[700] flex items-center text-[#3E4DAC] px-[32px] py-5 border-b-2">
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

                                                        onClick={(e) => {
                                                            setEditContentManagementNameOpen(false)
                                                            handleSubmitNavName("contentManagement", contentManagementNameInput);
                                                        }}
                                                    >Add</button>


                                                </div>

                                            </div>
                                        </DialogLayoutForFromControl>

                                        {
                                            (adminContentManagementDetailsOpen) && (<div className='mb-5'>
                                                <AdminContentManagementDetails />
                                                <ContentManagementPage />
                                            </div>

                                            )
                                        }


                                    </div>

                                    {/*   Points & Redemptions */}
                                    <div className='mt-2'>
                                        <div className={`w-[100%] flex items-center justify-between border p-2 rounded-xl ${adminPointsRedemptionsDetailsOpen ? "bg-slate-100" : ""} `}>
                                            <div className='flex items-center gap-7'>
                                                <p className='text-xl font-medium'>
                                                    {
                                                        pointsRedemptionsNameInput ? pointsRedemptionsNameInput : "Points & Redemptions"
                                                    }

                                                </p>
                                                <button
                                                    onClick={() => {
                                                        setEditPointsRedemptionsNameOpen(true);
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
                                                (adminPointsRedemptionsDetailsOpen) ? <KeyboardArrowUpIcon className='cursor-pointer' onClick={() => {
                                                    setAdminPointsRedemptionsDetailsOpen(false);

                                                }} /> : <KeyboardArrowDownIcon className='cursor-pointer' onClick={() => {
                                                    setAdminPointsRedemptionsDetailsOpen(true);

                                                }} />
                                            }
                                        </div>
                                        <DialogLayoutForFromControl
                                            open={editPointsRedemptionsNameOpen}
                                            setOpen={setEditPointsRedemptionsNameOpen}
                                            width={400}
                                            borderRadius="15px"
                                            title={
                                                <p className=" h-[90px] text-[19px] font-[700] flex items-center text-[#3E4DAC] px-[32px] py-5 border-b-2">
                                                    Edit Points & Redemptions Name
                                                </p>
                                            }
                                        >

                                            <div>
                                                <input
                                                    className="mt-6 border rounded-md w-[358px] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF] "
                                                    name="pointsRedemptionsName"
                                                    type="text"
                                                    placeholder="Points & Redemptions"
                                                    value={pointsRedemptionsNameInput}
                                                    onChange={(e) => setPointsRedemptionsNameInput(e.target.value)}
                                                />
                                                <div className="flex justify-center mt-5">

                                                    <button
                                                        className="px-[20px] py-3 bg-[#3E4DAC] hover:bg-opacity-70 text-[#fff] cursor-pointer text-xl font-bold rounded-lg"

                                                        onClick={(e) => {
                                                            setEditPointsRedemptionsNameOpen(false)
                                                            handleSubmitNavName("pointsAndRedemptions", pointsRedemptionsNameInput);
                                                        }}
                                                    >Add</button>


                                                </div>

                                            </div>
                                        </DialogLayoutForFromControl>

                                        {
                                            (adminPointsRedemptionsDetailsOpen) && (
                                                <>
                                                    <AdminPointsRedemptionsDetails />
                                                    <PointsAndRedemptionsPage />
                                                </>

                                            )
                                        }


                                    </div>

                                    {/* Skills Management */}
                                    <div className='mt-2'>
                                        <div className={`w-[100%] flex items-center justify-between border p-2 rounded-xl ${adminSkillsManagementDetailsOpen ? "bg-slate-100" : ""} `}>
                                            <div className='flex items-center gap-7'>
                                                <p className='text-xl font-medium'>
                                                    {
                                                        skillsManagementNameInput ? skillsManagementNameInput : "Skills Management"
                                                    }

                                                </p>
                                                <button
                                                    onClick={() => {
                                                        setEditSkillsManagementNameOpen(true);

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
                                                (adminSkillsManagementDetailsOpen) ? <KeyboardArrowUpIcon className='cursor-pointer' onClick={() => {
                                                    setAdminSkillsManagementDetailsOpen(false);

                                                }} /> : <KeyboardArrowDownIcon className='cursor-pointer' onClick={() => {
                                                    setAdminSkillsManagementDetailsOpen(true);

                                                }} />
                                            }
                                        </div>
                                        <DialogLayoutForFromControl
                                            open={editSkillsManagementNameOpen}
                                            setOpen={setEditSkillsManagementNameOpen}
                                            width={400}
                                            borderRadius="15px"
                                            title={
                                                <p className=" h-[90px] text-[19px] font-[700] flex items-center text-[#3E4DAC] px-[32px] py-5 border-b-2">
                                                    Edit Skills Management Name
                                                </p>
                                            }
                                        >

                                            <div>
                                                <input
                                                    className="mt-6 border rounded-md w-[358px] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF] "
                                                    name="skillsManagement"
                                                    type="text"
                                                    placeholder="Skills Management"
                                                    value={skillsManagementNameInput}
                                                    onChange={(e) => setSkillsManagementNameInput(e.target.value)}
                                                />
                                                <div className="flex justify-center mt-5">

                                                    <button
                                                        className="px-[20px] py-3 bg-[#3E4DAC] hover:bg-opacity-70 text-[#fff] cursor-pointer text-xl font-bold rounded-lg"

                                                        onClick={(e) => {
                                                            setEditSkillsManagementNameOpen(false)
                                                            handleSubmitNavName("skillsManagement", skillsManagementNameInput);
                                                        }}
                                                    >Add</button>


                                                </div>

                                            </div>
                                        </DialogLayoutForFromControl>

                                        {
                                            (adminSkillsManagementDetailsOpen) && (
                                                <>
                                                    <AdminSkillsManagementDetails />
                                                    <SkillsManagementPage />
                                                </>

                                            )
                                        }


                                    </div>

                                    {/* Feedback */}
                                    <div className='mt-2'>
                                        <div className={`w-[100%] flex items-center justify-between border p-2 rounded-xl ${adminFeedbackDetailsOpen ? "bg-slate-100" : ""} `}>
                                            <div className='flex items-center gap-7'>
                                                <p className='text-xl font-medium'>
                                                    {
                                                        feedbackNameInput ? feedbackNameInput : "Feedback"
                                                    }

                                                </p>
                                                <button
                                                    onClick={() => {
                                                        setEditFeedbackNameOpen(true);

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
                                                (adminFeedbackDetailsOpen) ? <KeyboardArrowUpIcon className='cursor-pointer' onClick={() => {
                                                    setAdminFeedbackDetailsOpen(false);

                                                }} /> : <KeyboardArrowDownIcon className='cursor-pointer' onClick={() => {
                                                    setAdminFeedbackDetailsOpen(true);

                                                }} />
                                            }
                                        </div>
                                        <DialogLayoutForFromControl
                                            open={editFeedbackNameOpen}
                                            setOpen={setEditFeedbackNameOpen}
                                            width={400}
                                            borderRadius="15px"
                                            title={
                                                <p className=" h-[90px] text-[19px] font-[700] flex items-center text-[#3E4DAC] px-[32px] py-5 border-b-2">
                                                    Edit Feedback Name
                                                </p>
                                            }
                                        >

                                            <div>
                                                <input
                                                    className="mt-6 border rounded-md w-[358px] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF] "
                                                    name="feedback"
                                                    type="text"
                                                    placeholder="Feedback"
                                                    value={feedbackNameInput}
                                                    onChange={(e) => setFeedbackNameInput(e.target.value)}
                                                />
                                                <div className="flex justify-center mt-5">

                                                    <button
                                                        className="px-[20px] py-3 bg-[#3E4DAC] hover:bg-opacity-70 text-[#fff] cursor-pointer text-xl font-bold rounded-lg"

                                                        onClick={(e) => {
                                                            setEditFeedbackNameOpen(false)
                                                            handleSubmitNavName("feedback", feedbackNameInput);
                                                        }}
                                                    >Add</button>


                                                </div>

                                            </div>
                                        </DialogLayoutForFromControl>

                                        {
                                            (adminFeedbackDetailsOpen) && (
                                                <>
                                                    <AdminFeedbackDetails />
                                                    <FeedbackPage />
                                                </>

                                            )
                                        }


                                    </div>

                                    {/* Update Organization */}
                                    <div className='mt-2'>
                                        <div className={`w-[100%] flex items-center justify-between border p-2 rounded-xl ${adminUpdateOrganizationDetailsOpen ? "bg-slate-100" : ""} `}>
                                            <div className='flex items-center gap-7'>
                                                <p className='text-xl font-medium'>
                                                    {
                                                        updateOrganizationNameInput ? updateOrganizationNameInput : "Update Organization"
                                                    }

                                                </p>
                                                <button
                                                    onClick={() => {
                                                        setEditUpdateOrganizationNameOpen(true);

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
                                                (adminUpdateOrganizationDetailsOpen) ? <KeyboardArrowUpIcon className='cursor-pointer' onClick={() => {
                                                    setAdminUpdateOrganizationDetailsOpen(false);

                                                }} /> : <KeyboardArrowDownIcon className='cursor-pointer' onClick={() => {
                                                    setAdminUpdateOrganizationDetailsOpen(true);

                                                }} />
                                            }
                                        </div>
                                        <DialogLayoutForFromControl
                                            open={editUpdateOrganizationNameOpen}
                                            setOpen={setEditUpdateOrganizationNameOpen}
                                            width={400}
                                            borderRadius="15px"
                                            title={
                                                <p className=" h-[90px] text-[19px] font-[700] flex items-center text-[#3E4DAC] px-[32px] py-5 border-b-2">
                                                    Edit Update Organization Name
                                                </p>
                                            }
                                        >

                                            <div>
                                                <input
                                                    className="mt-6 border rounded-md w-[358px] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF] "
                                                    name="updateOrganizationName"
                                                    type="text"
                                                    placeholder="Update Organization"
                                                    value={updateOrganizationNameInput}
                                                    onChange={(e) => setUpdateOrganizationNameInput(e.target.value)}
                                                />
                                                <div className="flex justify-center mt-5">

                                                    <button
                                                        className="px-[20px] py-3 bg-[#3E4DAC] hover:bg-opacity-70 text-[#fff] cursor-pointer text-xl font-bold rounded-lg"

                                                        onClick={(e) => {
                                                            setEditUpdateOrganizationNameOpen(false)
                                                            handleSubmitNavName("updateOrganization", updateOrganizationNameInput);
                                                        }}
                                                    >Add</button>


                                                </div>

                                            </div>
                                        </DialogLayoutForFromControl>

                                        {
                                            (adminUpdateOrganizationDetailsOpen) && (
                                                <AdminUpdateOrganizationDetails />
                                            )
                                        }


                                    </div>

                                    {/* Schedule */}
                                    <div className='mt-2'>
                                        <div className={`w-[100%] flex items-center justify-between border p-2 rounded-xl ${adminScheduleDetailsOpen ? "bg-slate-100" : ""} `}>
                                            <div className='flex items-center gap-7'>
                                                <p className='text-xl font-medium'>
                                                    {
                                                        scheduleNameInput ? scheduleNameInput : "Schedule"
                                                    }

                                                </p>
                                                <button
                                                    onClick={() => {
                                                        setEditScheduleNameOpen(true);
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
                                                (adminScheduleDetailsOpen) ? <KeyboardArrowUpIcon className='cursor-pointer' onClick={() => {
                                                    setAdminScheduleDetailsOpen(false);

                                                }} /> : <KeyboardArrowDownIcon className='cursor-pointer' onClick={() => {
                                                    setAdminScheduleDetailsOpen(true);

                                                }} />
                                            }
                                        </div>
                                        <DialogLayoutForFromControl
                                            open={editScheduleNameOpen}
                                            setOpen={setEditScheduleNameOpen}
                                            width={400}
                                            borderRadius="15px"
                                            title={
                                                <p className=" h-[90px] text-[19px] font-[700] flex items-center text-[#3E4DAC] px-[32px] py-5 border-b-2">
                                                    Edit Schedule Name
                                                </p>
                                            }
                                        >
                                            <div>
                                                <input
                                                    className="mt-6 border rounded-md w-[358px] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF] "
                                                    name="ScheduleName"
                                                    type="text"
                                                    placeholder="Schedule"
                                                    value={scheduleNameInput}
                                                    onChange={(e) => setScheduleNameInput(e.target.value)}
                                                />
                                                <div className="flex justify-center mt-5">

                                                    <button
                                                        className="px-[20px] py-3 bg-[#3E4DAC] hover:bg-opacity-70 text-[#fff] cursor-pointer text-xl font-bold rounded-lg"

                                                        onClick={(e) => {
                                                            setEditScheduleNameOpen(false)
                                                            handleSubmitNavName("schedule", scheduleNameInput);
                                                        }}
                                                    >Add</button>


                                                </div>

                                            </div>
                                        </DialogLayoutForFromControl>

                                        {
                                            (adminScheduleDetailsOpen) && (
                                                <AdminScheduleDetails />
                                            )
                                        }


                                    </div>

                                    {/* Assignments */}
                                    <div className='mt-2'>
                                        <div className={`w-[100%] flex items-center justify-between border p-2 rounded-xl ${adminAssignmentsDetailsOpen ? "bg-slate-100" : ""} `}>
                                            <div className='flex items-center gap-7'>
                                                <p className='text-xl font-medium'>
                                                    {
                                                        assignmentsNameInput ? assignmentsNameInput : "Assignments"
                                                    }

                                                </p>
                                                <button
                                                    onClick={() => {
                                                        setEditAssignmentsNameOpen(true);

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
                                                (adminAssignmentsDetailsOpen) ? <KeyboardArrowUpIcon className='cursor-pointer' onClick={() => {
                                                    setAdminAssignmentsDetailsOpen(false);

                                                }} /> : <KeyboardArrowDownIcon className='cursor-pointer' onClick={() => {
                                                    setAdminAssignmentsDetailsOpen(true);

                                                }} />
                                            }
                                        </div>
                                        <DialogLayoutForFromControl
                                            open={editAssignmentsNameOpen}
                                            setOpen={setEditAssignmentsNameOpen}
                                            width={400}
                                            borderRadius="15px"
                                            title={
                                                <p className=" h-[90px] text-[19px] font-[700] flex items-center text-[#3E4DAC] px-[32px] py-5 border-b-2">
                                                    Edit Assignments Name
                                                </p>
                                            }
                                        >

                                            <div>
                                                <input
                                                    className="mt-6 border rounded-md w-[358px] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF] "
                                                    name="assignments"
                                                    type="text"
                                                    placeholder="Assignments"
                                                    value={assignmentsNameInput}
                                                    onChange={(e) => setAssignmentsNameInput(e.target.value)}
                                                />
                                                <div className="flex justify-center mt-5">

                                                    <button
                                                        className="px-[20px] py-3 bg-[#3E4DAC] hover:bg-opacity-70 text-[#fff] cursor-pointer text-xl font-bold rounded-lg"
                                                        onClick={(e) => {
                                                            setEditAssignmentsNameOpen(false)
                                                            handleSubmitNavName("assignments", assignmentsNameInput);
                                                        }}
                                                    >Add</button>


                                                </div>

                                            </div>
                                        </DialogLayoutForFromControl>

                                        {
                                            (adminAssignmentsDetailsOpen) && (
                                                <AdminAssignmentsDetails />
                                            )
                                        }


                                    </div>
                                    {/* Create Certificate */}
                                    <div className='mt-2'>
                                        <div className={`w-[100%] flex items-center justify-between border p-2 rounded-xl ${adminCreateCertificateDetailsOpen ? "bg-slate-100" : ""} `}>
                                            <div className='flex items-center gap-7'>
                                                <p className='text-xl font-medium'>
                                                    {
                                                        createCertificateNameInput ? createCertificateNameInput : "Create Certificate"
                                                    }

                                                </p>
                                                <button
                                                    onClick={() => {
                                                        setEditCreateCertificateNameOpen(true);

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
                                                (adminCreateCertificateDetailsOpen) ? <KeyboardArrowUpIcon className='cursor-pointer' onClick={() => {
                                                    setAdminCreateCertificateDetailsOpen(false);

                                                }} /> : <KeyboardArrowDownIcon className='cursor-pointer' onClick={() => {
                                                    setAdminCreateCertificateDetailsOpen(true);

                                                }} />
                                            }



                                        </div>
                                        <DialogLayoutForFromControl
                                            open={editCreateCertificateNameOpen}
                                            setOpen={setEditCreateCertificateNameOpen}
                                            width={400}
                                            borderRadius="15px"
                                            title={
                                                <p className=" h-[90px] text-[19px] font-[700] flex items-center text-[#3E4DAC] px-[32px] py-5 border-b-2">
                                                    Edit Create Certificate Name
                                                </p>
                                            }
                                        >

                                            <div>
                                                <input
                                                    className="mt-6 border rounded-md w-[358px] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF] "
                                                    name="CreateCertificate"
                                                    type="text"
                                                    placeholder="CreateCertificate"
                                                    value={createCertificateNameInput}
                                                    onChange={(e) => setCreateCertificateNameInput(e.target.value)}
                                                />
                                                <div className="flex justify-center mt-5">

                                                    <button
                                                        className="px-[20px] py-3 bg-[#3E4DAC] hover:bg-opacity-70 text-[#fff] cursor-pointer text-xl font-bold rounded-lg"

                                                        onClick={(e) => {
                                                            setEditCreateCertificateNameOpen(false)
                                                            handleSubmitNavName("createCertificate", createCertificateNameInput);
                                                        }}
                                                    >Add</button>


                                                </div>

                                            </div>
                                        </DialogLayoutForFromControl>

                                        {
                                            (adminCreateCertificateDetailsOpen) && (
                                                <AdminCreateCertificateDetails />
                                            )
                                        }


                                    </div>
                                    {/* My Learners */}
                                    <div className='mt-2'>
                                        <div className={`w-[100%] flex items-center justify-between border p-2 rounded-xl ${adminMyLearnersDetailsOpen ? "bg-slate-100" : ""} `}>
                                            <div className='flex items-center gap-7'>
                                                <p className='text-xl font-medium'>
                                                    {
                                                        myLearnersNameInput ? myLearnersNameInput : "My Learners"
                                                    }

                                                </p>
                                                <button
                                                    onClick={() => {
                                                        setEditMyLearnersNameOpen(true);

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
                                                (adminMyLearnersDetailsOpen) ? <KeyboardArrowUpIcon className='cursor-pointer' onClick={() => {
                                                    setAdminMyLearnersDetailsOpen(false);

                                                }} /> : <KeyboardArrowDownIcon className='cursor-pointer' onClick={() => {
                                                    setAdminMyLearnersDetailsOpen(true);

                                                }} />
                                            }



                                        </div>
                                        <DialogLayoutForFromControl
                                            open={editMyLearnersNameOpen}
                                            setOpen={setEditMyLearnersNameOpen}
                                            width={400}
                                            borderRadius="15px"
                                            title={
                                                <p className=" h-[90px] text-[19px] font-[700] flex items-center text-[#3E4DAC] px-[32px] py-5 border-b-2">
                                                    Edit My Learners Name
                                                </p>
                                            }
                                        >

                                            <div>
                                                <input
                                                    className="mt-6 border rounded-md w-[358px] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF] "
                                                    name="myLearners"
                                                    type="text"
                                                    placeholder="My Learners"
                                                    value={myLearnersNameInput}
                                                    onChange={(e) => setMyLearnersNameInput(e.target.value)}
                                                />
                                                <div className="flex justify-center mt-5">

                                                    <button
                                                        className="px-[20px] py-3 bg-[#3E4DAC] hover:bg-opacity-70 text-[#fff] cursor-pointer text-xl font-bold rounded-lg"

                                                        onClick={(e) => {
                                                            setEditMyLearnersNameOpen(false)
                                                            handleSubmitNavName("myLearners", myLearnersNameInput);
                                                        }}
                                                    >Add</button>


                                                </div>

                                            </div>
                                        </DialogLayoutForFromControl>

                                        {
                                            (adminMyLearnersDetailsOpen) && (
                                                <AdminMyLearnersDetails />
                                            )
                                        }


                                    </div>
                                    {/* Offers */}
                                    <div className='mt-2'>
                                        <div className={`w-[100%] flex items-center justify-between border p-2 rounded-xl ${adminOffersDetailsOpen ? "bg-slate-100" : ""} `}>
                                            <div className='flex items-center gap-7'>
                                                <p className='text-xl font-medium'>
                                                    {
                                                        offersNameInput ? offersNameInput : "Offers"
                                                    }

                                                </p>
                                                <button
                                                    onClick={() => {
                                                        setEditOffersNameOpen(true);

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
                                                (adminOffersDetailsOpen) ? <KeyboardArrowUpIcon className='cursor-pointer' onClick={() => {
                                                    setAdminOffersDetailsOpen(false);

                                                }} /> : <KeyboardArrowDownIcon className='cursor-pointer' onClick={() => {
                                                    setAdminOffersDetailsOpen(true);

                                                }} />
                                            }
                                        </div>
                                        <DialogLayoutForFromControl
                                            open={editOffersNameOpen}
                                            setOpen={setEditOffersNameOpen}
                                            width={400}
                                            borderRadius="15px"
                                            title={
                                                <p className=" h-[90px] text-[19px] font-[700] flex items-center text-[#3E4DAC] px-[32px] py-5 border-b-2">
                                                    Edit Offers Name
                                                </p>
                                            }
                                        >

                                            <div>
                                                <input
                                                    className="mt-6 border rounded-md w-[358px] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF] "
                                                    name="offers"
                                                    type="text"
                                                    placeholder="Offers"
                                                    value={offersNameInput}
                                                    onChange={(e) => setOffersNameInput(e.target.value)}
                                                />
                                                <div className="flex justify-center mt-5">

                                                    <button
                                                        className="px-[20px] py-3 bg-[#3E4DAC] hover:bg-opacity-70 text-[#fff] cursor-pointer text-xl font-bold rounded-lg"

                                                        onClick={(e) => {
                                                            setEditOffersNameOpen(false)
                                                            handleSubmitNavName("offers", offersNameInput);
                                                        }}
                                                    >Add</button>


                                                </div>

                                            </div>
                                        </DialogLayoutForFromControl>

                                        {
                                            (adminOffersDetailsOpen) && (
                                                <AdminOffersDetails />
                                            )
                                        }


                                    </div>

                                </>
                            }
                        </div>

                }







            </div>

            {/*   Student dashboard */}

            <div className='mt-10'>
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
                                    <p className=" h-[90px] text-[19px] font-[700] flex items-center text-[#3E4DAC] px-[32px] py-5 border-b-2">
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