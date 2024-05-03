//CourseDetailsPage

import React, { useContext, useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import axios from 'axios';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../../contexts/AuthProvider';

const CourseDetailsPage = () => {

    const { userInfo } = useContext(AuthContext)
    const [adminLoading, setAdminLoading] = useState(false);
    const [itemDetails, setItemDetails] = useState();

    useEffect(() => {
        if (userInfo) {
            setAdminLoading(true);
            axios
                .get(
                    `${process.env.REACT_APP_SERVERLESS_API}/api/v1/language/getContentManageSubDetailsByOrganizationAndName/courseDetails/organizationsId/${userInfo?.organizationId}`
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

    const fetchContentDetails = () => {
        if (userInfo) {
            setAdminLoading(true);
            axios
                .get(
                    `${process.env.REACT_APP_SERVERLESS_API}/api/v1/language/getContentManageSubDetailsByOrganizationAndName/courseDetails/organizationsId/${userInfo?.organizationId}`
                )
                .then((response) => {
                    setItemDetails(response?.data);
                })
                .finally(() => {
                    setAdminLoading(false);
                });
        }
    };

    console.log(itemDetails)

    const handleSubmit = async (event) => {

        event.preventDefault();
        const form = event.target;

        const newMyCoursesName = form.myCourses?.value;
        const newAddChapterName = form.addChapter?.value;
        const newEditCourseName = form.editCourse?.value;
        const newAddTaskName = form.addTask?.value;
        const newEditTaskName = form.editTask?.value;
        const newDeleteTaskName = form.deleteTask?.value;
        const newAreYouSureYouWantToDeleteTheWeekName = form.areYouSureYouWantToDeleteTheWeek?.value;
        const newYesName = form.yes?.value;
        const newNoName = form.no?.value;
        const newChapterNameName = form.chapterName?.value;
        const newAddName = form.add?.value;
        const newEditChapterNameName = form.editChapterName?.value;
        const newUpdateName = form.update?.value;
       
        const itemDetail = {
            myCourses: newMyCoursesName,
            addChapter: newAddChapterName,
            editCourse: newEditCourseName,
            addTask: newAddTaskName,
            editTask: newEditTaskName,
            deleteTask: newDeleteTaskName,
            areYouSureYouWantToDeleteTheWeek: newAreYouSureYouWantToDeleteTheWeekName,
            yes: newYesName,
            no: newNoName,
            chapterName: newChapterNameName,
            add: newAddName,
            editChapterName: newEditChapterNameName,
            update: newUpdateName,
           
        };
        console.log(itemDetail)
        const item = await axios.post(
            `${process.env.REACT_APP_SERVERLESS_API}/api/v1/language/addContentManageSubDetails/courseDetails/organizationId/${userInfo?.organizationId}`,
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
                                <p className='text-lg font-medium'>My Courses</p>
                                <input name='myCourses' defaultValue={itemDetails?.myCourses} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Add Chapter</p>
                                <input name='addChapter' defaultValue={itemDetails?.addChapter} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Edit Course</p>
                                <input name='editCourse' defaultValue={itemDetails?.editCourse} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Add Task</p>
                                <input name='addTask' defaultValue={itemDetails?.addTask} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Edit Task</p>
                                <input name='editTask' defaultValue={itemDetails?.editTask} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Delete Task</p>
                                <input name='deleteTask' defaultValue={itemDetails?.deleteTask} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Are you sure you want to delete the week</p>
                                <input name='areYouSureYouWantToDeleteTheWeek' defaultValue={itemDetails?.areYouSureYouWantToDeleteTheWeek} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Yes</p>
                                <input name='yes' defaultValue={itemDetails?.yes} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>No</p>
                                <input name='no' type='text' defaultValue={itemDetails?.no} className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Chapter Name</p>
                                <input name='chapterName' defaultValue={itemDetails?.chapterName} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Add</p>
                                <input name='add' type='text' defaultValue={itemDetails?.add} className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Edit Chapter Name</p>
                                <input name='editChapterName' defaultValue={itemDetails?.editChapterName} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
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

export default CourseDetailsPage;