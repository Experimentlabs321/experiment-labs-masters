//EditWeekDetails

import React, { useContext, useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import axios from 'axios';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../../contexts/AuthProvider';


const EditWeekDetails = () => {
    const { userInfo } = useContext(AuthContext)
    const [adminLoading, setAdminLoading] = useState(false);
    const [itemDetails, setItemDetails] = useState();
    useEffect(() => {
        if (userInfo) {
            setAdminLoading(true);
            axios
                .get(
                    `${process.env.REACT_APP_SERVER_API}/api/v1/language/getContentManageSubDetailsByOrganizationAndName/editWeekDetails/organizationsId/${userInfo?.organizationId}`
                )
                .then((response) => {
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
                    `${process.env.REACT_APP_SERVER_API}/api/v1/language/getContentManageSubDetailsByOrganizationAndName/editWeekDetails/organizationsId/${userInfo?.organizationId}`
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

        const newEditWeekName = form.editWeek?.value;
        const newWeekNameName = form.weekName?.value;
        const newTaskWeightageDistributionName = form.taskWeightageDistribution?.value;
        const newApplyToAllWeeksName = form.applyToAllWeeks?.value;
        const newSelectEarningParametersName = form.selectEarningParameters?.value;
        const newAnyOtherParameterNotSelectedWillBeCountedOverAndAboveName = form.anyOtherParameterNotSelectedWillBeCountedOverAndAbove?.value;
        const newTypeOfTaskName = form.typeOfTask?.value;
        const newCombinedWeightageName = form.combinedWeightage?.value;
        const newGamificationSettingName = form.gamificationSetting?.value;
        const newEarningParameterName = form.earningParameter?.value;
        const newTotalValueForTheWeekName = form.totalValueForTheWeek?.value;
        const newScheduleListName = form.scheduleList?.value;
        const newWeekStartingDateName = form.weekStartingDate?.value;
        const newWeekEndingDateName = form.weekEndingDate?.value;
        const newUpdateName = form.update?.value;
       
        const itemDetail = {
            editWeek: newEditWeekName,
            weekName: newWeekNameName,
            taskWeightageDistribution: newTaskWeightageDistributionName,
            applyToAllWeeks: newApplyToAllWeeksName,
            selectEarningParameters: newSelectEarningParametersName,
            anyOtherParameterNotSelectedWillBeCountedOverAndAbove: newAnyOtherParameterNotSelectedWillBeCountedOverAndAboveName,
            typeOfTask: newTypeOfTaskName,
            combinedWeightage: newCombinedWeightageName,
            gamificationSetting: newGamificationSettingName,
            earningParameter: newEarningParameterName,
            totalValueForTheWeek: newTotalValueForTheWeekName,
            scheduleList: newScheduleListName,
            weekStartingDate: newWeekStartingDateName,
            weekEndingDate: newWeekEndingDateName,
            update: newUpdateName,
           
        };
        console.log(itemDetail)
        const item = await axios.post(
            `${process.env.REACT_APP_SERVER_API}/api/v1/language/addContentManageSubDetails/editWeekDetails/organizationId/${userInfo?.organizationId}`,
            itemDetail
        );
        console.log(item)
        if (item?.data === "Content Manage Sub Details updated successfully") {
            setItemDetails({ ...itemDetails });
            fetchContentDetails();
            toast.success("Items Name added Successfully");
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
                                <p className='text-lg font-medium'>Edit Week</p>
                                <input name='editWeek' defaultValue={itemDetails?.editWeek} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Week Name</p>
                                <input name='weekName' defaultValue={itemDetails?.weekName}  type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Task Weightage Distribution</p>
                                <input name='taskWeightageDistribution' defaultValue={itemDetails?.taskWeightageDistribution}  type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Apply to all weeks</p>
                                <input name='applyToAllWeeks' defaultValue={itemDetails?.applyToAllWeeks}  type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Select Earning Parameters</p>
                                <input name='selectEarningParameters' defaultValue={itemDetails?.selectEarningParameters}  type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Any other parameter not selected will be counted over and above</p>
                                <input name='anyOtherParameterNotSelectedWillBeCountedOverAndAbove' defaultValue={itemDetails?.anyOtherParameterNotSelectedWillBeCountedOverAndAbove}  type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Type of Task</p>
                                <input name='typeOfTask' defaultValue={itemDetails?.typeOfTask} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Combined Weightage</p>
                                <input name='combinedWeightage' defaultValue={itemDetails?.combinedWeightage} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Gamification Setting</p>
                                <input name='gamificationSetting' defaultValue={itemDetails?.gamificationSetting} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                          
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Earning Parameter</p>
                                <input name='earningParameter' defaultValue={itemDetails?.earningParameter} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Total value for the Week</p>
                                <input name='totalValueForTheWeek' defaultValue={itemDetails?.totalValueForTheWeek} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Schedule List</p>
                                <input name='scheduleList' defaultValue={itemDetails?.scheduleList} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Week Starting Date</p>
                                <input name='weekStartingDate' defaultValue={itemDetails?.weekStartingDate} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Week Ending Date</p>
                                <input name='weekEndingDate' defaultValue={itemDetails?.weekEndingDate} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Update</p>
                                <input name='update' type='text' defaultValue={itemDetails?.update} className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
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

export default EditWeekDetails;