//ScheduleDetails

import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../../contexts/AuthProvider';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';


const ScheduleDetails = () => {
    const { userInfo } = useContext(AuthContext)
    const [adminLoading, setAdminLoading] = useState(false);
    const [itemDetails, setItemDetails] = useState();
    useEffect(() => {
        if (userInfo) {
            setAdminLoading(true);
            axios
                .get(
                    `${process.env.REACT_APP_SERVER_API}/api/v1/language/getContentManageSubDetailsByOrganizationAndName/schedule/organizationsId/${userInfo?.organizationId}`
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
                    `${process.env.REACT_APP_SERVER_API}/api/v1/language/getContentManageSubDetailsByOrganizationAndName/schedule/organizationsId/${userInfo?.organizationId}`
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

        const newManageScheduleInName = form.manageScheduleIn?.value;
        const newPreviewModeName = form.previewMode?.value;
        const newYourCalendarEventsName = form.yourCalendarEvents?.value;
        const newMonthName = form.month?.value;
        const newWeekName = form.week?.value;
        const newDayName = form.day?.value;
        const newListName = form.list?.value;
        const newScheduleNameName = form.scheduleName?.value;
        const newDateRangeName = form.dateRange?.value;
        const newMinimumTimeName = form.minimumTime?.value;
        const newMaximumTimeName = form.maximumTime?.value;
        const newMeetingDurationLengthName = form.meetingDurationLength?.value;
        const newSelectHolidaysName = form.selectHolidays?.value;
        const newSaturdayName = form.saturday?.value;
        const newSundayName = form.sunday?.value;
        const newMondayName = form.monday?.value;
        const newTuesdayName = form.tuesday?.value;
        const newWednesdayName = form.wednesday?.value;
        const newThursdayName = form.thursday?.value;
        const newFridayName = form.friday?.value;
        const newSelectBatchName = form.selectBatch?.value;
        const newSaveName = form.save?.value;
     
        const itemDetail = {
            manageScheduleIn: newManageScheduleInName,
            previewMode: newPreviewModeName,
            yourCalendarEvents: newYourCalendarEventsName,
            month: newMonthName,
            week: newWeekName,
            day: newDayName,
            list: newListName,
            scheduleName: newScheduleNameName,
            dateRange: newDateRangeName,
            minimumTime: newMinimumTimeName,
            maximumTime: newMaximumTimeName,
            meetingDurationLength: newMeetingDurationLengthName,
            selectHolidays: newSelectHolidaysName,
            saturday: newSaturdayName,
            sunday: newSundayName,
            monday: newMondayName,
            tuesday: newTuesdayName,
            wednesday: newWednesdayName,
            thursday: newThursdayName,
            friday: newFridayName,
            selectBatch: newSelectBatchName,
            save: newSaveName,

        };
        console.log(itemDetail)
        const item = await axios.post(
            `${process.env.REACT_APP_SERVER_API}/api/v1/language/addContentManageSubDetails/schedule/organizationId/${userInfo?.organizationId}`,
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
                                <p className='text-lg font-medium'>Manage Schedule in</p>
                                <input name='manageScheduleIn' defaultValue={itemDetails?.manageScheduleIn} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Preview Mode</p>
                                <input name='previewMode' defaultValue={itemDetails?.previewMode} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Your Calendar Events</p>
                                <input name='yourCalendarEvents' defaultValue={itemDetails?.yourCalendarEvents} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>month</p>
                                <input name='month' type='text' defaultValue={itemDetails?.month} className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>week</p>
                                <input name='week' defaultValue={itemDetails?.week} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>day</p>
                                <input name='day' defaultValue={itemDetails?.day} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>list</p>
                                <input name='list' defaultValue={itemDetails?.list} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Schedule Name</p>
                                <input name='scheduleName' defaultValue={itemDetails?.scheduleName} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Date range</p>
                                <input name='dateRange' defaultValue={itemDetails?.dateRange} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Minimum Time</p>
                                <input name='minimumTime' defaultValue={itemDetails?.minimumTime}  type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Maximum Time</p>
                                <input name='maximumTime' defaultValue={itemDetails?.maximumTime}  type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Meeting Duration Length</p>
                                <input name='meetingDurationLength' defaultValue={itemDetails?.meetingDurationLength}  type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Select holidays</p>
                                <input name='selectHolidays' defaultValue={itemDetails?.selectHolidays}  type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Saturday</p>
                                <input name='saturday' defaultValue={itemDetails?.saturday}  type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Sunday</p>
                                <input name='sunday' defaultValue={itemDetails?.sunday}  type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Monday</p>
                                <input name='monday' defaultValue={itemDetails?.monday}  type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Tuesday</p>
                                <input name='tuesday' defaultValue={itemDetails?.tuesday}  type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Wednesday</p>
                                <input name='wednesday' defaultValue={itemDetails?.wednesday}  type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Thursday</p>
                                <input name='thursday' defaultValue={itemDetails?.thursday} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Friday</p>
                                <input name='friday' defaultValue={itemDetails?.friday} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Select Batch</p>
                                <input name='selectBatch' defaultValue={itemDetails?.selectBatch} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>

                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Save</p>
                                <input name='save' defaultValue={itemDetails?.save} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
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

export default ScheduleDetails;