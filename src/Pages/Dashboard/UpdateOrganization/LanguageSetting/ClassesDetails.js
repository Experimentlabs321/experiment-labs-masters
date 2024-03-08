//ClassesDetails

import React, { useContext, useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import axios from 'axios';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../../contexts/AuthProvider';

const ClassesDetails = () => {
    const { userInfo } = useContext(AuthContext)
    const [adminLoading, setAdminLoading] = useState(false);
    const [itemDetails, setItemDetails] = useState();
    useEffect(() => {
        if (userInfo) {
            setAdminLoading(true);
            axios
                .get(
                    `${process.env.REACT_APP_SERVER_API}/api/v1/language/getContentManageSubDetailsByOrganizationAndName/classes/organizationsId/${userInfo?.organizationId}`
                )
                .then((response) => {

                    console.log(response)
                    setItemDetails(response?.data);

                })
                .finally(() => {
                    setAdminLoading(false);
                });
        }
        setAdminLoading(false);
    }, [userInfo]);
    console.log(itemDetails)
    const fetchContentDetails = () => {
        if (userInfo) {
            setAdminLoading(true);
            axios
                .get(
                    `${process.env.REACT_APP_SERVER_API}/api/v1/language/getContentManageSubDetailsByOrganizationAndName/classes/organizationsId/${userInfo?.organizationId}`
                )
                .then((response) => {
                    setItemDetails(response?.data);
                })
                .finally(() => {
                    setAdminLoading(false);
                });
        }
    };

    const handleSubmit = async (event) => {
        
        event.preventDefault();
        const form = event.target;
    
        const newManageClassesInName = form.manageClassesIn?.value;
        const newGeneralName = form.general?.value;
        const newClassNameName = form.className?.value;
        const newClassTypeName = form.classType?.value;
        const newOnlineName = form.online?.value;
        const newOfflineName = form.offline?.value;
        const newHybridName = form.hybrid?.value;
        const newInstanceTypeName = form.instanceType?.value;
        const newRoomWithRecordingsName = form.roomWithRecordings?.value;
        const newRoomOnlyName = form.roomOnly?.value;
        const newRecordingsOnlyName = form.recordingsOnly?.value;
        const newSelectBatchName = form.selectBatch?.value;
        const newSelectMentorsName = form.selectMentors?.value;
        const newExecutionMentorName = form.executionMentor?.value;
        const newExpertMentorName = form.expertMentor?.value;
        const newLocationName = form.location?.value;
        const newForOfflineAndHybridName = form.forOfflineAndHybrid?.value;
        const newRoomNumberName = form.roomNumber?.value;
        const newAgendaName = form.agenda?.value;
        const newPasswordName = form.password?.value;
        const newEmailName = form.email?.value;
        const newEnableDripName = form.enableDrip?.value;
        const newYesName = form.yes?.value;
        const newNoName = form.no?.value;
        const newClassTimingsName = form.classTimings?.value;
        const newClassStartingDateAndTimeName = form.classStartingDateAndTime?.value;
        const newDurationName = form.duration?.value;
        const newSaveName = form.save?.value; 


        const itemDetail = {
            manageClassesIn: newManageClassesInName,
            general: newGeneralName,
            className: newClassNameName,
            classType: newClassTypeName,
            online: newOnlineName,
            offline: newOfflineName,
            hybrid: newHybridName,
            instanceType: newInstanceTypeName,
            roomWithRecordings: newRoomWithRecordingsName,
            roomOnly: newRoomOnlyName,
            recordingsOnly: newRecordingsOnlyName,
            selectBatch: newSelectBatchName,
            selectMentors: newSelectMentorsName,
            executionMentor: newExecutionMentorName,
            expertMentor: newExpertMentorName,
            location: newLocationName,
            forOfflineAndHybrid: newForOfflineAndHybridName,
            roomNumber: newRoomNumberName,
            agenda: newAgendaName,
            password: newPasswordName,
            email: newEmailName,
            enableDrip: newEnableDripName,
            yes: newYesName,
            no: newNoName,
            classTimings: newClassTimingsName,
            classStartingDateAndTime: newClassStartingDateAndTimeName,
            duration: newDurationName,
            save: newSaveName, 


        };
        console.log(itemDetail)
        const item = await axios.post(
            `${process.env.REACT_APP_SERVER_API}/api/v1/language/addContentManageSubDetails/classes/organizationId/${userInfo?.organizationId}`,
            itemDetail
        );
        console.log(item)
        if (item?.data === "Content Manage Sub Details updated successfully") {
            setItemDetails({ ...itemDetails });
            fetchContentDetails();
            toast.success("Items Names added Successfully");
            form.reset();
        } 


    };

    return (
        <div>
            {
                adminLoading ?
                    <div className='flex justify-center'>
                        <Box sx={{ display: 'flex' }}>
                            <CircularProgress />
                        </Box>
                    </div>
                    :
                    <form onSubmit={handleSubmit} className='mt-2 border p-4 rounded-xl'>
                        <div className=' grid grid-cols-2 gap-4'>

                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Manage Classes in</p>
                                <input name='manageClassesIn' defaultValue={itemDetails?.manageClassesIn} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>General</p>
                                <input name='general' type='text' defaultValue={itemDetails?.general} className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Class Name</p>
                                <input name='className' type='text' defaultValue={itemDetails?.className} className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Class Type</p>
                                <input name='classType' defaultValue={itemDetails?.classType} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Online</p>
                                <input name='online' type='text' defaultValue={itemDetails?.online} className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Offline</p>
                                <input name='offline' type='text' defaultValue={itemDetails?.offline} className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Hybrid</p>
                                <input name='hybrid' type='text' defaultValue={itemDetails?.hybrid} className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Instance Type</p>
                                <input name='instanceType' defaultValue={itemDetails?.instanceType} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                             <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Room with recordings</p>
                                <input name='roomWithRecordings' defaultValue={itemDetails?.roomWithRecordings} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Room Only</p>
                                <input name='roomOnly' type='text' defaultValue={itemDetails?.roomOnly} className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Recordings Only</p>
                                <input name='recordingsOnly' type='text' defaultValue={itemDetails?.recordingsOnly} className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Select Batch</p>
                                <input name='selectBatch' type='text' defaultValue={itemDetails?.selectBatch} className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Select Mentors</p>
                                <input name='selectMentors' type='text' defaultValue={itemDetails?.selectMentors} className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>execution mentor</p>
                                <input name='executionMentor' type='text' defaultValue={itemDetails?.executionMentor} className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Expert Mentor</p>
                                <input name='expertMentor' type='text' defaultValue={itemDetails?.expertMentor} className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Location</p>
                                <input name='location' type='text' defaultValue={itemDetails?.location} className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>For offline & Hybrid</p>
                                <input name='forOfflineAndHybrid' defaultValue={itemDetails?.forOfflineAndHybrid} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Room Number</p>
                                <input name='roomNumber' type='text' defaultValue={itemDetails?.roomNumber} className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Agenda</p>
                                <input name='agenda' type='text' defaultValue={itemDetails?.agenda} className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Password</p>
                                <input name='password' type='text' defaultValue={itemDetails?.password} className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Email</p>
                                <input name='email' type='text' defaultValue={itemDetails?.email} className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Enable Drip</p>
                                <input name='enableDrip' defaultValue={itemDetails?.enableDrip} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Yes</p>
                                <input name='yes' defaultValue={itemDetails?.yes} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>No</p>
                                <input name='no' defaultValue={itemDetails?.no} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Class Timings</p>
                                <input name='classTimings' defaultValue={itemDetails?.classTimings} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Class Starting Date and Time</p>
                                <input name='classStartingDateAndTime' defaultValue={itemDetails?.classStartingDateAndTime} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Duration</p>
                                <input name='duration' type='text' defaultValue={itemDetails?.duration} className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Save</p>
                                <input name='save' type='text' defaultValue={itemDetails?.save} className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>




                        </div>
                        <div className="flex items-center justify-center mt-20 mb-10">
                            <input
                                type="submit"
                                value="Save"

                                className="px-[30px] py-3 bg-[#3E4DAC] hover:bg-opacity-70 text-[#fff] cursor-pointer text-xl font-bold rounded-lg"
                            />

                        </div>

                    </form>
            }
        </div>


    );
};

export default ClassesDetails;